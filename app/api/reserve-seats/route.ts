import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET → fetch seats for a section
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("section");

  if (!sectionId) {
    return NextResponse.json({ error: "Missing section" }, { status: 400 });
  }

  const seats = await prisma.seat.findMany({
    where: { sectionId },
    orderBy: [{ rowNumber: "asc" }, { seatNumber: "asc" }],
  });

  return NextResponse.json({ seats });
}

// POST → reserve seats
export async function POST(req: Request) {
  try {
    const { seatIds } = await req.json();

    if (!Array.isArray(seatIds)) {
      return NextResponse.json(
        { error: "Invalid body" },
        { status: 400 }
      );
    }

    // Update all seats to reserved status
    await prisma.seat.updateMany({
      where: { id: { in: seatIds } },
      data: { status: "reserved" },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reservation error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
