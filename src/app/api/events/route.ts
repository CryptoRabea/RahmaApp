import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'date';
    const featured = searchParams.get('featured');

    let whereClause: any = {};
    
    if (category && category !== 'all') {
      whereClause.service = {
        category: category.toUpperCase()
      };
    }
    
    if (search) {
      whereClause.OR = [
        { service: { title: { contains: search } } },
        { service: { description: { contains: search } } },
        { service: { location: { contains: search } } }
      ];
    }

    if (featured === 'true') {
      whereClause.service = {
        ...whereClause.service,
        isFeatured: true
      };
    }

    // For demo purposes, return mock data
    const mockEvents = [
      {
        id: '1',
        title: 'Summer Music Festival',
        description: 'Experience the best live music performances this summer with top artists from around the world.',
        category: 'MUSIC',
        price: 75,
        date: '2024-03-25',
        location: 'Central Park Amphitheater',
        organizerId: 'org1',
        isFeatured: true,
        maxAttendees: 500,
        currentAttendees: 245
      },
      {
        id: '2',
        title: 'Tech Innovation Summit',
        description: 'Join industry leaders and innovators for the latest in technology, AI, and startup culture.',
        category: 'TECHNOLOGY',
        price: 120,
        date: '2024-04-02',
        location: 'Convention Center Hall A',
        organizerId: 'org2',
        isFeatured: true,
        maxAttendees: 300,
        currentAttendees: 187
      },
      {
        id: '3',
        title: 'Food & Wine Festival',
        description: 'Taste exquisite cuisines from top chefs paired with fine wines from renowned vineyards.',
        category: 'FOOD_DRINK',
        price: 45,
        date: '2024-04-15',
        location: 'Riverside Park',
        organizerId: 'org3',
        isFeatured: false,
        maxAttendees: 800,
        currentAttendees: 423
      }
    ];

    // Apply filters
    let filteredEvents = mockEvents;

    if (category && category !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.category === category.toUpperCase());
    }

    if (search) {
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (featured === 'true') {
      filteredEvents = filteredEvents.filter(event => event.isFeatured);
    }

    // Sort events
    switch (sort) {
      case 'date':
        filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'price-low':
        filteredEvents.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredEvents.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filteredEvents.sort((a, b) => b.currentAttendees - a.currentAttendees);
        break;
    }

    return NextResponse.json(filteredEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, price, date, location, organizerId, maxAttendees } = body;

    if (!title || !description || !category || !price || !date || !location || !organizerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For demo purposes, return mock created event
    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      category: category.toUpperCase(),
      price: parseFloat(price),
      date,
      location,
      organizerId,
      isFeatured: false,
      maxAttendees: parseInt(maxAttendees) || 100,
      currentAttendees: 0,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}