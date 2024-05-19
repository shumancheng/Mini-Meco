import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initializeDb } from './database';

let db: any;

const init = async () => {
  db = await initializeDb();
};

init().catch(err => {
  console.error('Failed to initialize the database:', err);
  process.exit(1);
});

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'User registration failed', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.status(200).json({ token });
};
