"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = exports.ChangeEmail = void 0;
const ChangeEmail = async (req, res, db) => {
    const { newEmail, oldEmail } = req.body;
    try {
        const projects = await db.all(`SELECT projectName FROM user_projects WHERE userEmail = ?`, [oldEmail]);
        await db.run(`UPDATE users SET email = ? WHERE email = ?`, [newEmail, oldEmail]);
        await db.run(`UPDATE user_projects SET userEmail = ? WHERE userEmail = ?`, [newEmail, oldEmail]);
        await db.run(`UPDATE happiness SET userEmail = ? WHERE userEmail = ?`, [newEmail, oldEmail]);
        for (let i = 0; i < projects.length; i++) {
            await db.run(`UPDATE "${projects[i].projectName}" SET memberEmail = ? WHERE memberEmail = ?`, [newEmail, oldEmail]);
        }
        res.status(200).json({ message: "Email updated successfully" });
    }
    catch (error) {
        console.error("Error updating email:", error);
        res.status(500).json({ message: "Failed to update email", error });
    }
};
exports.ChangeEmail = ChangeEmail;
const ChangePassword = async (req, res, db) => {
    const { email, password } = req.body;
    try {
        await db.run(`UPDATE member SET password = ? WHERE memberEmail = ?`, [password, email]);
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Failed to update password", error });
    }
};
exports.ChangePassword = ChangePassword;
