import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Internal endpoint to create admin accounts using Better Auth
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Use Better Auth's signUp to create the user properly
    const signUpResponse = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:3000'}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        name: name || null,
      }),
    });

    if (!signUpResponse.ok) {
      const error = await signUpResponse.json();
      return NextResponse.json(
        { error: error.message || 'Failed to create account' },
        { status: signUpResponse.status }
      );
    }

    const userData = await signUpResponse.json();

    // Update the user to be an admin
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        role: 'admin',
        emailVerified: true,
      },
    });

    return NextResponse.json({
      message: 'Admin account created successfully',
      admin: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating admin via Better Auth:', error);
    return NextResponse.json(
      { error: 'Failed to create admin account' },
      { status: 500 }
    );
  }
}
