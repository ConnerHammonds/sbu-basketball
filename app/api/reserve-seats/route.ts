import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // update this import based on your setup

// GET → fetch seats for a section
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("section");

  if (!sectionId) {
    return NextResponse.json({ error: "Missing section" }, { status: 400 });
  }

  const seats = await db.seats.findMany({
    where: { section_id: sectionId },
    orderBy: [{ row_number: "asc" }, { seat_number: "asc" }],
  });

  return NextResponse.json({ seats });
}

// POST → reserve seats
export async function POST(req: Request) {
  try {
    const { userId, seats } = await req.json();

    if (!userId || !Array.isArray(seats)) {
      return NextResponse.json(
        { error: "Invalid body" },
        { status: 400 }
      );
    }

    // For each seat, create reservation + update seat status
    for (const seatId of seats) {
      await db.reservations.create({
        data: {
          user_id: userId,
          seat_id: seatId,
          status: "confirmed",
        },
      });

      await db.seats.update({
        where: { id: seatId },
        data: { status: "reserved" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reservation error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
