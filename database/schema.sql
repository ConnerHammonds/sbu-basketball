-- SBU Basketball Arena Database Schema

-- Users table
CREATE TABLE
IF NOT EXISTS users
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR
(255) UNIQUE NOT NULL,
    name VARCHAR
(255) NOT NULL,
    phone VARCHAR
(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sections table
CREATE TABLE
IF NOT EXISTS sections
(
    id VARCHAR
(10) PRIMARY KEY,
    name VARCHAR
(50) NOT NULL,
    total_seats INTEGER NOT NULL,
    price_tier VARCHAR
(20) DEFAULT 'standard'
);

-- Seats table
CREATE TABLE
IF NOT EXISTS seats
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id VARCHAR
(10) NOT NULL,
    row_number INTEGER NOT NULL,
    seat_number INTEGER NOT NULL,
    status VARCHAR
(20) DEFAULT 'available' CHECK
(status IN
('available', 'reserved', 'selected', 'sold')),
    FOREIGN KEY
(section_id) REFERENCES sections
(id),
    UNIQUE
(section_id, row_number, seat_number)
);

-- Reservations table
CREATE TABLE
IF NOT EXISTS reservations
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    seat_id INTEGER NOT NULL,
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    status VARCHAR
(20) DEFAULT 'pending' CHECK
(status IN
('pending', 'confirmed', 'cancelled', 'expired')),
    FOREIGN KEY
(user_id) REFERENCES users
(id),
    FOREIGN KEY
(seat_id) REFERENCES seats
(id)
);

-- Orders table
CREATE TABLE
IF NOT EXISTS orders
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL
(10, 2) NOT NULL,
    payment_status VARCHAR
(20) DEFAULT 'pending' CHECK
(payment_status IN
('pending', 'completed', 'failed', 'refunded')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY
(user_id) REFERENCES users
(id)
);

-- Order items table
CREATE TABLE
IF NOT EXISTS order_items
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    seat_id INTEGER NOT NULL,
    price DECIMAL
(10, 2) NOT NULL,
    FOREIGN KEY
(order_id) REFERENCES orders
(id),
    FOREIGN KEY
(seat_id) REFERENCES seats
(id)
);

-- Insert default sections
INSERT OR
IGNORE INTO sections (id, name, total_seats, price_tier)
VALUES
    ('A1', 'Section A1', 96, 'premium'),
    ('A2', 'Section A2', 96, 'premium'),
    ('A3', 'Section A3', 96, 'premium'),
    ('B1', 'Section B1', 96, 'standard'),
    ('B2', 'Section B2', 96, 'standard'),
    ('C1', 'Section C1', 96, 'standard'),
    ('C2', 'Section C2', 96, 'standard'),
    ('D1', 'Section D1', 96, 'standard'),
    ('D2', 'Section D2', 96, 'standard'),
    ('D3', 'Section D3', 96, 'standard');
