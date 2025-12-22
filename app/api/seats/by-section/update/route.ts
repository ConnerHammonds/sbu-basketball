import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { seatIds } = body;

    if (!seatIds || !Array.isArray(seatIds)) {
      return NextResponse.json({ error: "Missing seat IDs" }, { status: 400 });
    }

    // Update all seats to reserved status
    await prisma.seat.updateMany({
      where: {
        id: { in: seatIds }
      },
      data: {
        status: 'reserved'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
