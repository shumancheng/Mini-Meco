import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initializeDb() {
  const db = await open({
    filename: './myDatabase.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      resetPasswordToken TEXT,
      resetPasswordExpire INTEGER
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS projectGroup (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      semester TEXT,
      projectGroupName TEXT UNIQUE
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_projects (
      userEmail TEXT,
      projectName TEXT,
      PRIMARY KEY (userEmail, projectName),
      FOREIGN KEY (userEmail) REFERENCES users(email)
    )
    `);
  

  return db;
}
