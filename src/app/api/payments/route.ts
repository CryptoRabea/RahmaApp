import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let whereClause: any = {};
    
    if (status && status !== 'all') {
      whereClause.status = status.toUpperCase();
    }

    // Since we don't have a dedicated payment table, we'll get bookings with payment info
    const bookings = await db.booking.findMany({
      where: {
        ...whereClause,
        paymentProof: { not: null }
      },
      include: {
        service: {
          select: {
            title: true
          }
        },
        client: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform bookings into payment verification format
    const paymentVerifications = bookings.map(booking => ({
      id: booking.id,
      bookingId: booking.id,
      clientName: booking.client.name,
      clientEmail: booking.client.email,
      serviceTitle: booking.service.title,
      amount: booking.totalAmount,
      paymentMethod: 'Vodafone Cash', // This would come from booking data
      proofImage: booking.paymentProof,
      uploadedAt: booking.updatedAt.toISOString(),
      status: booking.paymentVerified ? 'VERIFIED' : 'PENDING',
      verifiedBy: booking.paymentVerified ? 'Admin' : null,
      verifiedAt: booking.paymentVerified ? booking.updatedAt.toISOString() : null,
      rejectionReason: null
    }));

    return NextResponse.json(paymentVerifications);
  } catch (error) {
    console.error('Error fetching payment verifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment verifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, action, reason } = body; // action: 'verify' or 'reject'

    if (!bookingId || !action) {
      return NextResponse.json(
        { error: 'Booking ID and action are required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    
    if (action === 'verify') {
      updateData.paymentVerified = true;
      updateData.status = 'CONFIRMED';
    } else if (action === 'reject') {
      updateData.paymentVerified = false;
      updateData.status = 'CANCELLED';
      // In a real app, you might store rejection reason in a separate field
    }

    const booking = await db.booking.update({
      where: { id: bookingId },
      data: updateData,
      include: {
        service: {
          include: {
            supplier: true
          }
        },
        client: true
      }
    });

    // If verified, add funds to supplier's balance (minus platform commission)
    if (action === 'verify') {
      const platformCommission = 0.1; // 10% commission
      const supplierEarnings = booking.totalAmount * (1 - platformCommission);
      
      await db.user.update({
        where: { id: booking.service.supplierId },
        data: {
          balance: {
            increment: supplierEarnings
          }
        }
      });
    }

    return NextResponse.json({ 
      message: `Payment ${action === 'verify' ? 'verified' : 'rejected'} successfully`,
      booking 
    });
  } catch (error) {
    console.error('Error updating payment verification:', error);
    return NextResponse.json(
      { error: 'Failed to update payment verification' },
      { status: 500 }
    );
  }
}