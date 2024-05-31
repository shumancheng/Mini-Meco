"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = async (req, res, db) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill in username, email and password!' });
    }
    else if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    else if (!email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email address' });
    }
    else if (name.length < 3) {
        return res.status(400).json({ message: 'Name must be at least 3 characters long' });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'User registration failed', error });
    }
};
exports.register = register;
const login = async (req, res, db) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};
exports.login = login;
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail', // email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const forgotPassword = async (req, res, db) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }
        const token = crypto_1.default.randomBytes(20).toString('hex');
        const expiration = Date.now() + 3600000; // 1 hour from now
        await db.run('UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?', [token, expiration, email]);
        const mailOptions = {
            to: email,
            from: 'minimeco.server@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://localhost:5173/reset/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('There was an error sending the email:', err);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Password reset link sent successfully' });
        });
    }
    catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, db) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }
    try {
        const user = await db.get('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > ?', [token, Date.now()]);
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await db.run('UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE id = ?', [hashedPassword, user.id]);
        res.status(200).json({ message: 'Password has been reset' });
    }
    catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.resetPassword = resetPassword;
