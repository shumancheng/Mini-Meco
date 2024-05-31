"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDb = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
async function initializeDb() {
    const db = await (0, sqlite_1.open)({
        filename: './myDatabase.db',
        driver: sqlite3_1.default.Database,
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      resetPasswordToken TEXT,
      resetPasswordExpires INTEGER
    )
  `);
    return db;
}
exports.initializeDb = initializeDb;
