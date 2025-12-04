import { getDb, saveDb } from "../db";

export function updateSeatStatus(seatId: number, status: string) {
  const db = getDb();

  db.exec(`
    UPDATE seats
    SET status = '${status}'
    WHERE id = ${seatId};
  `);

  saveDb();
}

export function getSeatsBySection(sectionId: string) {
  const db = getDb();
  const res = db.exec(`
    SELECT * FROM seats
    WHERE section_id = '${sectionId}';
  `);

  if (res.length === 0) return [];

  const rows = res[0].values as any[][];
  const columns = res[0].columns as string[];

  return rows.map((row: any[]) => {
    const obj: Record<string, any> = {};

    columns.forEach((col: string, i: number) => {
      obj[col] = row[i];
    });

    return obj;
  });
}
