import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reservationId } = await params;

    // Find the reservation first to get the seat ID
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { seat: true },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    // Delete the reservation
    await prisma.reservation.delete({
      where: { id: reservationId },
    });

    // Update the seat status back to available
    await prisma.seat.update({
      where: { id: reservation.seatId },
      data: { status: 'available' },
    });

    return NextResponse.json({ 
      success: true,
      message: 'Reservation deleted and seat made available' 
    });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    );
  }
}
