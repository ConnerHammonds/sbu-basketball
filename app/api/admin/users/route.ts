import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET - Fetch all admin users
export async function GET(request: NextRequest) {
  try {
    const admins = await prisma.user.findMany({
      where: {
        role: 'admin',
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin accounts' },
      { status: 500 }
    );
  }
}

// POST - Add a new admin user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
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
      // If user exists and is already an admin, return error
      if (existingUser.role === 'admin') {
        return NextResponse.json(
          { error: 'User is already an admin' },
          { status: 400 }
        );
      }
      
      // If user exists but is not an admin, promote them
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          role: 'admin',
          emailVerified: true,
        },
      });

      return NextResponse.json({
        message: 'User promoted to admin successfully',
        admin: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          createdAt: updatedUser.createdAt,
        },
      });
    }

    // Use Better Auth's signup endpoint to create the account properly
    const baseURL = process.env.BETTER_AUTH_URL || 'http://localhost:3000';
    let signUpData: any;
    let userId: string | null = null;

    try {
      const signUpResponse = await fetch(`${baseURL}/api/auth/sign-up/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      if (!signUpResponse.ok) {
        const error = await signUpResponse.json();
        throw new Error(error.message || 'Failed to create account');
      }

      signUpData = await signUpResponse.json();
      userId = signUpData.user.id;
      
      // Wait a moment for the user to be committed to the database
      await new Promise(resolve => setTimeout(resolve, 100));

      // Update the newly created user to be an admin
      const updatedUser = await prisma.user.update({
        where: { id: userId },
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
    } catch (error: any) {
      // Rollback: Delete the user if update failed
      if (userId) {
        try {
          await prisma.user.delete({
            where: { id: userId },
          });
          console.log(`Rolled back user creation for ${email}`);
        } catch (deleteError) {
          console.error('Failed to rollback user creation:', deleteError);
        }
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create admin account' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing admin user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, email, name } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Admin ID is required' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if the new email is already taken by another user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== id) {
      return NextResponse.json(
        { error: 'Email is already in use by another account' },
        { status: 400 }
      );
    }

    const updatedAdmin = await prisma.user.update({
      where: { id },
      data: {
        email,
        name: name || null,
      },
    });

    return NextResponse.json({
      message: 'Admin account updated successfully',
      admin: {
        id: updatedAdmin.id,
        email: updatedAdmin.email,
        name: updatedAdmin.name,
        createdAt: updatedAdmin.createdAt,
      },
    });
  } catch (error) {
    console.error('Error updating admin:', error);
    return NextResponse.json(
      { error: 'Failed to update admin account' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an admin user completely
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Admin ID is required' },
        { status: 400 }
      );
    }

    // Check how many admins exist
    const adminCount = await prisma.user.count({
      where: { role: 'admin' },
    });

    if (adminCount <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the last admin account' },
        { status: 400 }
      );
    }

    // Delete the user (cascades to accounts and sessions)
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Admin account deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json(
      { error: 'Failed to delete admin account' },
      { status: 500 }
    );
  }
}
