import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("section");
  if (!sectionId) {
    return NextResponse.json({ error: "Section ID required" }, { status: 400 });
  }

  const seats = await prisma.seat.findMany({
    where: { sectionId },
    orderBy: [
      { rowNumber: 'asc' },
      { seatNumber: 'asc' }
    ]
  });

  return NextResponse.json({ 
    seats: seats.map((s) => ({
      id: s.id,
      section_id: s.sectionId,
      row_number: s.rowNumber,
      seat_number: s.seatNumber,
      status: s.status
    }))
  });
}
