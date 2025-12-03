import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'price-low';

    let whereClause: any = {};
    
    if (category && category !== 'ALL') {
      whereClause.category = category;
    }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } }
      ];
    }

    const services = await db.service.findMany({
      where: whereClause,
      include: {
        supplier: {
          select: {
            name: true,
            rating: true
          }
        },
        _count: {
          select: {
            bookings: true,
            reviews: true
          }
        }
      },
      orderBy: getOrderBy(sort)
    });

    // Calculate average rating for each service
    const servicesWithRating = await Promise.all(
      services.map(async (service) => {
        const reviews = await db.review.findMany({
          where: { serviceId: service.id },
          select: { rating: true }
        });
        
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
          : 0;

        return {
          ...service,
          supplier: {
            ...service.supplier,
            rating: avgRating
          },
          averageRating: avgRating
        };
      })
    );

    return NextResponse.json(servicesWithRating);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, price, location, supplierId } = body;

    if (!title || !description || !category || !price || !supplierId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const service = await db.service.create({
      data: {
        title,
        description,
        category,
        price: parseFloat(price),
        location,
        supplierId,
        availability: true
      },
      include: {
        supplier: {
          select: {
            name: true,
            rating: true
          }
        }
      }
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

function getOrderBy(sort: string) {
  switch (sort) {
    case 'price-low':
      return { price: 'asc' };
    case 'price-high':
      return { price: 'desc' };
    case 'rating':
      return { reviews: { _count: 'desc' } };
    case 'newest':
      return { createdAt: 'desc' };
    default:
      return { price: 'asc' };
  }
}