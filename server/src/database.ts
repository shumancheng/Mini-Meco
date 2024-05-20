import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initializeDb() {
  console.log("Opening database...");

  const db = await open({
    filename: './myDatabase.db',  // Adjust path as needed
    driver: sqlite3.Database,
  });

  console.log("Database opened successfully");

  console.log("Creating users table if not exists...");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  console.log("Users table created or already exists");

  return db;
}
