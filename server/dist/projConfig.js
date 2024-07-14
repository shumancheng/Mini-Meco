"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addURL = exports.ChangePassword = exports.ChangeEmail = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ChangeEmail = async (req, res, db) => {
    const { newEmail, oldEmail } = req.body;
    if (!newEmail) {
        return res.status(400).json({ message: 'Please fill in new email!' });
    }
    else if (!newEmail.includes('@')) {
        return res.status(400).json({ message: 'Invalid email address' });
    }
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
    if (!password) {
        return res.status(400).json({ message: 'Please fill in new password!' });
    }
    else if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        await db.run(`UPDATE users SET password = ? WHERE email = ?`, [hashedPassword, email]);
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Failed to update password", error });
    }
};
exports.ChangePassword = ChangePassword;
const addURL = async (req, res, db) => {
    const { email, URL, project } = req.body;
    if (!URL) {
        return res.status(400).json({ message: 'Please fill in URL!' });
    }
    else if (!URL.includes('git')) {
        return res.status(400).json({ message: 'Invalid URL' });
    }
    try {
        await db.run(`UPDATE user_projects SET url = ? WHERE userEmail = ? AND projectName = ?`, [URL, email, project]);
        res.status(200).json({ message: "URL added successfully" });
    }
    catch (error) {
        console.error("Error adding URL:", error);
        res.status(500).json({ message: "Failed to add URL", error });
    }
};
exports.addURL = addURL;
