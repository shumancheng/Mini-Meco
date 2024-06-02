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
    host: 'smtp.mailersend.net',
    port: 587,
    auth: {
        user: "MS_5JSHZT@trial-k68zxl211y34j905.mlsender.net",
        pass: "WwuZu9Je52ufgBYq",
    },
});
const sendPasswordResetEmail = async (email, token) => {
    const mailOptions = {
        from: '"Mini-Meco" <minimeco.server@gmail.com>',
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link to reset your password: http://localhost:5173/resetPassword?token=${token}`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent: %s', info.messageId);
    }
    catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('There was an error sending the email');
    }
};
const forgotPassword = async (req, res, db) => {
    const { email } = req.body;
    try {
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }
        const token = crypto_1.default.randomBytes(20).toString('hex');
        const expire = Date.now() + 3600000; // 1 hour
        await db.run('UPDATE users SET resetPasswordToken = ?, resetPasswordExpire = ? WHERE email = ?', [token, expire, email]);
        await sendPasswordResetEmail(email, token);
        res.status(200).json({ message: 'Password reset email sent' });
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
