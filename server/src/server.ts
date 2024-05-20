import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, login } from './auth';
import { initializeDb } from './database';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

initializeDb().then((db) => {
  console.log("Database initialized, starting server...");

  app.get('/', (req, res) => {
    res.send('Welcome to the Authentication API');
  });

  app.post('/register', (req, res) => register(req, res, db));
  app.post('/login', (req, res) => login(req, res, db));

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to initialize the database:', error);
});
