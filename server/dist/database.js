"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDb = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
const initializeDb = async () => {
    try {
        const dbPath = path_1.default.resolve(__dirname, '../database.sqlite');
        const db = await (0, sqlite_1.open)({
            filename: dbPath,
            driver: sqlite3_1.default.Database
        });
        return db;
    }
    catch (error) {
        console.error('Failed to initialize the database:', error);
        throw error;
    }
};
exports.initializeDb = initializeDb;
