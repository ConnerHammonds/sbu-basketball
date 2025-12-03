import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const plain = process.env.ADMIN_PASSWORD || 'admin123';
    const hash = bcrypt.hashSync(plain, 10);

    await prisma.user.upsert({
      where: { email },
      update: { password: hash, role: 'admin', name: 'Admin' },
      create: { email, password: hash, role: 'admin', name: 'Admin' }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Admin user ensured: ${email}` 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
