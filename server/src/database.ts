import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
    const db = await open({
        filename: './server/Database/myDatabase.db', // Specify the database file
        driver: sqlite3.Database,
    });
})();
