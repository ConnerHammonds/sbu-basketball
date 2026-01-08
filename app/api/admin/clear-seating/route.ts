import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Delete all reservations first (due to foreign key constraints)
    await prisma.reservation.deleteMany({});

    // Reset all seats to available status
    await prisma.seat.updateMany({
      data: {
        status: 'available',
      },
    });

    // Optionally delete all customers (they have no reservations now)
    await prisma.customer.deleteMany({});

    return NextResponse.json({
      message: 'Seating chart cleared successfully',
      deletedReservations: true,
      resetSeats: true,
      deletedCustomers: true,
    });
  } catch (error) {
    console.error('Error clearing seating chart:', error);
    return NextResponse.json(
      { error: 'Failed to clear seating chart' },
      { status: 500 }
    );
  }
}
