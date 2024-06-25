"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendStandupsEmail = void 0;
const sendStandupsEmail = async (req, res, db) => {
    const { doneText, plansText, challengesText } = req.body;
    if (!doneText || !plansText || !challengesText) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
};
exports.sendStandupsEmail = sendStandupsEmail;
