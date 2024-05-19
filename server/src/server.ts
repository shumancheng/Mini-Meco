import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, login } from './auth';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', register);
app.post('/login', login);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
