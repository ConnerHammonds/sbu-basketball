import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import ReservationConfirmationEmail from "@/emails/reservation-confirmation";

export async function POST(req: Request) {
  try {
    const { seatIds, userData } = await req.json();

    // Validate input
    if (!seatIds || !Array.isArray(seatIds)) {
      return NextResponse.json({ error: "Invalid seat IDs" }, { status: 400 });
    }

    if (!userData?.name || !userData?.email) {
      return NextResponse.json({ error: "User name and email are required" }, { status: 400 });
    }

    // Fetch seat details before updating (we need this for the email)
    const seats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds }
      },
      include: {
        section: true
      }
    });

    if (seats.length === 0) {
      return NextResponse.json({ error: "No valid seats found" }, { status: 404 });
    }

    // Check if any seats are already reserved or sold
    const unavailableSeats = seats.filter(seat => seat.status !== 'available');
    if (unavailableSeats.length > 0) {
      return NextResponse.json({ 
        error: "Some seats are no longer available",
        unavailableSeats: unavailableSeats.map(s => ({ id: s.id, status: s.status }))
      }, { status: 409 });
    }

    // 1. Create or update customer record
    const customer = await prisma.customer.upsert({
      where: { email: userData.email },
      create: {
        email: userData.email,
        name: userData.name,
        phone: userData.phone || null,
      },
      update: {
        name: userData.name,
        phone: userData.phone || null,
      },
    });

    // 2. Create reservation records for each seat
    const reservations = await Promise.all(
      seatIds.map((seatId: number) =>
        prisma.reservation.create({
          data: {
            customerId: customer.id,
            seatId: seatId,
            status: 'reserved',
            reservedAt: new Date(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
          },
        })
      )
    );

    // 3. Update all selected seats to reserved status
    await prisma.seat.updateMany({
      where: {
        id: { in: seatIds }
      },
      data: {
        status: 'reserved'
      }
    });

    // Send ONE confirmation email with all seats
    // Note: We don't await this - reservation succeeds even if email fails
    (async () => {
      try {
        const reservationDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        // Format all seats for the email
        const seatsForEmail = seats.map(seat => ({
          sectionName: seat.section.name,
          seatNumber: seat.seatNumber,
          rowNumber: seat.rowNumber
        }));

        const totalSeats = seatsForEmail.length;
        const subject = totalSeats === 1 
          ? `Seat Reservation Confirmed - Section ${seatsForEmail[0].sectionName}`
          : `${totalSeats} Seats Reserved - SBU Basketball`;

        // Render the React Email component to HTML
        const html = await render(
          ReservationConfirmationEmail({
            userName: userData.name,
            userEmail: userData.email,
            seats: seatsForEmail,
            reservationDate
          })
        );

        // Render plain text version
        const text = await render(
          ReservationConfirmationEmail({
            userName: userData.name,
            userEmail: userData.email,
            seats: seatsForEmail,
            reservationDate
          }),
          { plainText: true }
        );

        await sendEmail({
          to: userData.email,
          subject,
          html,
          text
        });

        console.log(`Confirmation email sent to ${userData.email} for ${seats.length} seat(s)`);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the reservation if email fails
      }
    })();

    return NextResponse.json({ 
      success: true,
      message: 'Seats reserved successfully. Confirmation email will be sent shortly.'
    });
  } catch (error: any) {
    console.error('Reservation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
