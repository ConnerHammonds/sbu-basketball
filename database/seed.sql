-- Seed data for SBU Basketball Arena Database

-- Generate seats for all sections
-- Section A1 (8 rows x 16 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'A1', row, seat, 'available'
FROM (                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS rows
CROSS JOIN (                                                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS seats;

-- Section A2 (8 rows x 16 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'A2', row, seat, 'available'
FROM (                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS rows
CROSS JOIN (                                                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS seats;

-- Section A3 (8 rows x 16 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'A3', row, seat, 'available'
FROM (                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS rows
CROSS JOIN (                                                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS seats;

-- Section B1 (16 rows x 8 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'B1', row, seat, 'available'
FROM (                                                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS rows
CROSS JOIN (                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS seats;

-- Section B2 (16 rows x 8 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'B2', row, seat, 'available'
FROM (                                                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS rows
CROSS JOIN (                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS seats;

-- Section C1 (16 rows x 8 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'C1', row, seat, 'available'
FROM (                                                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS rows
CROSS JOIN (                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS seats;

-- Section C2 (16 rows x 8 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'C2', row, seat, 'available'
FROM (                                                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS rows
CROSS JOIN (                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS seats;

-- Section D1 (8 rows x 16 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'D1', row, seat, 'available'
FROM (                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS rows
CROSS JOIN (                                                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS seats;

-- Section D2 (8 rows x 16 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'D2', row, seat, 'available'
FROM (                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS rows
CROSS JOIN (                                                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS seats;

-- Section D3 (8 rows x 16 seats)
INSERT INTO seats
    (section_id, row_number, seat_number, status)
SELECT 'D3', row, seat, 'available'
FROM (                                SELECT 1 AS row
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8) AS rows
CROSS JOIN (                                                                SELECT 1 AS seat
    UNION
        SELECT 2
    UNION
        SELECT 3
    UNION
        SELECT 4
    UNION
        SELECT 5
    UNION
        SELECT 6
    UNION
        SELECT 7
    UNION
        SELECT 8
    UNION
        SELECT 9
    UNION
        SELECT 10
    UNION
        SELECT 11
    UNION
        SELECT 12
    UNION
        SELECT 13
    UNION
        SELECT 14
    UNION
        SELECT 15
    UNION
        SELECT 16) AS seats;

-- Sample test user
INSERT INTO users
    (email, name, phone)
VALUES
    ('test@example.com', 'Test User', '555-0100');
