import { Database } from "sqlite";
import { Request, Response } from "express";

export const createProjectGroup = async (req: Request, res: Response, db: Database) => {
    const { semester, projectGroupName } = req.body;
    const semesterRegex = /^(SS|WS)\d{2,4}$/; // Format: SS24 or WS2425

    if (!semester || !projectGroupName) {
        return res.status(400).json({ message: "Please fill in semester and project group name" });
    }
    else if (!semesterRegex.test(semester)) {
        return res.status(400).json({ message: "Invalid semester format. Please use SSYY or WSYYYY format" });
    }
    
    try {
        await db.run("INSERT INTO projectGroup (semester, projectGroupName) VALUES (?, ?)", [semester, projectGroupName]);
        await db.exec(`
            CREATE TABLE IF NOT EXISTS "${projectGroupName}" (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              projectName TEXT
            )
          `);
        res.status(201).json({ message: "Project group created successfully" });
    } catch (error) {
        console.error("Error during project group creation:", error);
        res.status(500).json({ message: "Project group creation failed", error });
    }
}

export const createProject = async (req: Request, res: Response, db: Database) => {
    const { projectGroupName, projectName } = req.body;

    if (!projectGroupName || !projectName) {
        return res.status(400).json({ message: "Please fill in project group name and project name" });
    }

    try {
        const user = await db.get('SELECT * FROM projectGroup WHERE projectGroupName = ?', [projectGroupName]);
        if (!user) {
            return res.status(400).json({ message: 'Project Group Not Found' });
        }

        await db.run(`INSERT INTO ${projectGroupName} (projectName) VALUES (?)`, [projectName]);
        await db.exec(`
            CREATE TABLE IF NOT EXISTS "${projectName}" (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                memberName TEXT,
                memberRole TEXT,
                memberEmail TEXT
            )
        `);
        res.status(201).json({ message: "Project created successfully" });
    } catch (error) {
        console.error("Error during project creation:", error);
        res.status(500).json({ message: "Project creation failed", error });
    }
};
