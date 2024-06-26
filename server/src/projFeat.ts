import { Database } from "sqlite";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendStandupsEmail = async (req: Request, res: Response, db: Database) => {
    const { projectName, userName, doneText, plansText, challengesText } = req.body;

  
    try {
        const query = `SELECT memberEmail FROM "${projectName}"`;
        const members = await db.all(query);
      
  
      if (members.length === 0) {
        return res.status(400).json({ message: "No members in the project group" });
      }
  
      const recipientEmails = members.map(member => member.memberEmail).join(",");
  
      const transporter = nodemailer.createTransport({
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
    } catch (error) {
      console.error("Error sending standup email:", error);
      res.status(500).json({ message: "Failed to send standup email", error });
    }
  };