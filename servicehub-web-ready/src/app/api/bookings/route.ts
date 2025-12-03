import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const supplierId = searchParams.get('supplierId');
    const status = searchParams.get('status');

    let whereClause: any = {};
    
    if (clientId) whereClause.clientId = clientId;
    if (supplierId) {
      whereClause.service = { supplierId };
    }
    if (status) whereClause.status = status;

    const bookings = await db.booking.findMany({
      where: whereClause,
      include: {
        service: {
          include: {
            supplier: {
              select: {
                name: true,
                email: true
              }
            }
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

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceId, clientId, bookingDate, notes, totalAmount } = body;

    if (!serviceId || !clientId || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if service is available
    const service = await db.service.findUnique({
      where: { id: serviceId }
    });

    if (!service || !service.availability) {
      return NextResponse.json(
        { error: 'Service not available' },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: {
        serviceId,
        clientId,
        bookingDate: bookingDate ? new Date(bookingDate) : null,
        notes,
        totalAmount: parseFloat(totalAmount),
        status: 'PENDING'
      },
      include: {
        service: {
          include: {
            supplier: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        client: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}