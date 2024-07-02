"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHappinessData = exports.saveHappiness = exports.createSprint = exports.sendStandupsEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendStandupsEmail = async (req, res, db) => {
    const { projectName, userName, doneText, plansText, challengesText } = req.body;
    try {
        const query = `SELECT memberEmail FROM "${projectName}"`;
        const members = await db.all(query);
        if (members.length === 0) {
            return res.status(400).json({ message: "No members in the project group" });
        }
        const recipientEmails = members.map(member => member.memberEmail).join(",");
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp-auth.fau.de',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER_FAU,
                pass: process.env.EMAIL_PASS_FAU,
            },
        });
        const mailOptions = {
            from: '"Mini-Meco" <shu-man.cheng@fau.de>',
            to: recipientEmails,
            subject: `Standup Update for ${projectName}`,
            text: `Standup report from ${userName}\n\nDone: ${doneText}\nPlans: ${plansText}\nChallenges: ${challengesText}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Standup email sent successfully" });
    }
    catch (error) {
        console.error("Error sending standup email:", error);
        res.status(500).json({ message: "Failed to send standup email", error });
    }
};
exports.sendStandupsEmail = sendStandupsEmail;
const createSprint = async (req, res, db) => {
    const { projectGroupName, sprintName, startDate, endDate } = req.body;
    try {
        await db.run(`INSERT INTO sprints (projectGroupName, sprintName, startDate, endDate) VALUES (?, ?, ?, ?)`, [projectGroupName, sprintName, startDate, endDate]);
        res.status(201).json({ message: "Sprint created successfully" });
    }
    catch (error) {
        console.error("Error creating sprint:", error);
        res.status(500).json({ message: "Failed to create sprint", error });
    }
};
exports.createSprint = createSprint;
const saveHappiness = async (req, res, db) => {
    const { projectGroupName, projectName, happiness } = req.body;
    const timestamp = new Date().toISOString();
    try {
        await db.run(`INSERT INTO happiness (projectGroupName, projectName, happiness, timestamp ) VALUES (?, ?, ?, ? )`, [projectGroupName, projectName, happiness, timestamp]);
        res.status(200).json({ message: "Happiness updated successfully" });
    }
    catch (error) {
        console.error("Error updating happiness:", error);
        res.status(500).json({ message: "Failed to update happiness", error });
    }
};
exports.saveHappiness = saveHappiness;
const getHappinessData = async (req, res, db) => {
    const { projectName } = req.query;
    try {
        const currentDate = new Date();
        const projectGroupName = await db.get(`SELECT projectGroupName FROM project WHERE projectName = ?`, [projectName]);
        const previousSprint = await db.get(`SELECT * FROM sprints WHERE projectGroupName = ? AND endDate < ? ORDER BY endDate DESC LIMIT 1`, [projectGroupName, currentDate]);
        const nextSprint = await db.get(`SELECT * FROM sprints WHERE projectGroupName = ? AND startDate > ? ORDER BY startDate ASC LIMIT 1`, [projectGroupName, currentDate]);
        if (!previousSprint || !nextSprint) {
            return res.status(400).json({ message: "No previous or next sprint found" });
        }
        const happinessData = await db.all(`SELECT * FROM happiness WHERE projectName = ? AND timestamp > ? AND timestamp < ?`, [projectName, previousSprint.endDate, nextSprint.startDate]);
        res.json(happinessData);
    }
    catch (error) {
        console.error("Error retrieving happiness data:", error);
        res.status(500).json({ message: "Failed to retrieve happiness data", error });
    }
};
exports.getHappinessData = getHappinessData;
