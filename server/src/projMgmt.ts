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
        res.status(201).json({ message: "Project group created successfully" });
    } catch (error) {
        console.error("Error during project group creation:", error);
        res.status(500).json({ message: "Project group creation failed", error });
    }
}