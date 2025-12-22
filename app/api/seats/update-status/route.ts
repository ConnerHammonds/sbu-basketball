import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { seatId, status } = await req.json();

    if (!seatId || !status) {
      return NextResponse.json(
        { error: "seatId and status are required" },
        { status: 400 }
      );
    }

    await prisma.seat.update({
      where: { id: seatId },
      data: { status }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating seat status:", error);
    return NextResponse.json(
      { error: "Failed to update seat status" },
      { status: 500 }
    );
  }
}
