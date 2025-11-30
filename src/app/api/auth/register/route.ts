import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password, role } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password (in a real app)
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    // For demo purposes, we'll store plain text (NOT RECOMMENDED)
    const hashedPassword = password;

    // Create new user
    const user = await db.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: role || 'CLIENT',
        isVerified: false,
      },
    });

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user as any;
    
    return NextResponse.json({
      message: 'Registration successful',
      user: userWithoutPassword,
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}