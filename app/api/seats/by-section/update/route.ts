import { NextResponse } from "next/server";
import { updateSeatStatus } from "@/lib/queries/seats";
import { createReservation, seatHasReservation } from "@/lib/queries/reservations";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, seats } = body;

  if (!userId || !seats) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const db = getDb();

  // Look up the seat IDs
  const seatIds: number[] = seats.map((s: any) => {
    const res = db.exec(`
      SELECT id FROM seats
      WHERE row_number = ${s.row_number}
        AND seat_number = ${s.seat_number};
    `);

    return res[0].values[0][0];
  });

  // Reserve all seats
  seatIds.forEach(seatId => {
    if (!seatHasReservation(seatId)) {
      updateSeatStatus(seatId, "reserved");
      createReservation(userId, seatId);
    }
  });

  return NextResponse.json({ success: true });
}
