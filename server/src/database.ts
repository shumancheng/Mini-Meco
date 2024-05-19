import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export const initializeDb = async () => {
  try {
    const dbPath = path.resolve(__dirname, '../database.sqlite');
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS credentials (
        username TEXT NOT NULL,
        email TEXT UNIQUE,
        password TEXT NOT NULL
      )
    `);


    return db;
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    throw error;
  }
};