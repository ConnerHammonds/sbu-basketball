import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database', 'sbu-basketball.db');
const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');

let db: Database;

// Initialize database
export async function initDb() {
  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`
  });
  
  // Create database directory if it doesn't exist
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Load existing database or create new one
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
    
    // Initialize schema
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema);
    
    // Save to file
    const data = db.export();
    fs.writeFileSync(dbPath, data);
    
    console.log('Database initialized successfully');
  }
  
  return db;
}

// Save database to file
export function saveDb() {
  if (db) {
    const data = db.export();
    fs.writeFileSync(dbPath, data);
  }
}

// Get database instance
export function getDb(): Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return db;
}

export default { initDb, saveDb, getDb };
