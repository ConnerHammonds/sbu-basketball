import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("section");
  if (!sectionId) {
    return NextResponse.json({ error: "Section ID required" }, { status: 400 });
  }

  const seats = await db.seats.findMany({
    where: { section_id: sectionId },
    orderBy: [{ row_number: "asc" }, { seat_number: "asc" }]
  });

  return NextResponse.json({ seats });
}
