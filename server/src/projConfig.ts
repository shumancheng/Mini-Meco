import { Database } from "sqlite";
import { Request, Response } from "express";

export const ChangeEmail = async (req: Request, res: Response, db: Database) => {
    const { newEmail, oldEmail } = req.body;

    try {
        await db.run(`UPDATE member SET memberEmail = ? WHERE memberEmail = ?`, [newEmail, oldEmail]);
        res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
        console.error("Error updating email:", error);
        res.status(500).json({ message: "Failed to update email", error });
    }
}

export const ChangePassword = async (req: Request, res: Response, db: Database) => {
    const { email, password } = req.body;

    try {
        await db.run(`UPDATE member SET password = ? WHERE memberEmail = ?`, [password, email]);
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Failed to update password", error });
    }
}