# Database Setup

This directory contains the SQL database schema and seed data for the SBU Basketball Arena seating system.

## Files

- **schema.sql** - Database structure and table definitions
- **seed.sql** - Initial data to populate the database
- **sbu-basketball.db** - SQLite database file (auto-generated)

## Database Schema

### Tables

1. **users** - Customer information
2. **sections** - Arena sections (A1, A2, A3, etc.)
3. **seats** - Individual seats with status tracking
4. **reservations** - Temporary seat reservations
5. **orders** - Completed purchases
6. **order_items** - Items within each order

### Seat Statuses

- `available` - Seat is open for selection
- `reserved` - Temporarily held (15 min expiration)
- `selected` - Currently in user's cart
- `sold` - Purchased and unavailable

## Setup Instructions

### 1. Install Dependencies

```bash
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3
```

### 2. Initialize Database

The database will be automatically created when you first run the application. The schema is applied automatically.

### 3. Seed Database (Optional)

To populate with test data:

```bash
sqlite3 database/sbu-basketball.db < database/seed.sql
```

Or use Node.js:

```javascript
import db from "./lib/db";
import fs from "fs";

const seed = fs.readFileSync("./database/seed.sql", "utf-8");
db.exec(seed);
```

## Usage in Code

```typescript
import db from "@/lib/db";

// Get all available seats for a section
const seats = db
  .prepare("SELECT * FROM seats WHERE section_id = ? AND status = ?")
  .all("A1", "available");

// Update seat status
db.prepare("UPDATE seats SET status = ? WHERE id = ?").run("reserved", seatId);
```

## Database Location

The SQLite database file is stored at: `database/sbu-basketball.db`

This file should be added to `.gitignore` to avoid committing local database changes.
