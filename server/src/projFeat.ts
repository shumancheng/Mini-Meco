import { Database } from "sqlite";
import { Request, Response } from "express";

export const sendStandupsEmail = async (req: Request, res: Response, db: Database) => {
    const { doneText, plansText, challengesText } = req.body;
    if (!doneText || !plansText || !challengesText) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    
};