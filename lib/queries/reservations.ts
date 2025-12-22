import { getDb, saveDb } from "../db";

export function createReservation(userId: number, seatId: number) {
  const db = getDb();

  db.exec(`
    INSERT INTO reservations (user_id, seat_id, status)
    VALUES (${userId}, ${seatId}, 'confirmed');
  `);

  saveDb();
}

export function seatHasReservation(seatId: number): boolean {
  const db = getDb();

  const res = db.exec(`
    SELECT * FROM reservations
    WHERE seat_id = ${seatId}
      AND status = 'confirmed'
  `);

  return res.length > 0;
}
