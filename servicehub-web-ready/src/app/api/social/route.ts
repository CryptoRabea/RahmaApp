import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'all', 'posts', 'promotions'
    const limit = parseInt(searchParams.get('limit') || '20');

    let whereClause: any = {};
    
    if (type === 'posts') {
      whereClause.isPromotion = false;
    } else if (type === 'promotions') {
      whereClause.isPromotion = true;
    }

    const posts = await db.socialPost.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
            role: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching social posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorId, content, images, isPromotion } = body;

    if (!authorId || !content) {
      return NextResponse.json(
        { error: 'Author ID and content are required' },
        { status: 400 }
      );
    }

    const post = await db.socialPost.create({
      data: {
        authorId,
        content,
        images: images ? JSON.stringify(images) : null,
        isPromotion: isPromotion || false,
        likes: 0
      },
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
            role: true
          }
        }
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating social post:', error);
    return NextResponse.json(
      { error: 'Failed to create social post' },
      { status: 500 }
    );
  }
}