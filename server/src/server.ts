import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, login, forgotPassword, resetPassword } from './auth';
import { initializeDb } from './database';
import dotenv from 'dotenv';
import { createProjectGroup, createProject, getProjectGroups, getProjects, getSemesters, joinProject, leaveProject, getUserProjects } from './projMgmt';
import { sendStandupsEmail, saveHappiness, createSprint, getHappinessData } from './projFeat';

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

initializeDb().then((db) => {
  console.log("Database initialized, starting server...");

  app.get('/', (req, res) => {
    res.send('Server is running!');
  });

  app.get('/semesters', (req, res) => { getSemesters(req, res, db) });
  app.get('/project-groups', (req, res) => { getProjectGroups(req, res, db) });
  app.get('/projects', (req, res) => { getProjects(req, res, db) });
  app.get('/userProjects', (req, res) => { getUserProjects(req, res, db) });
  app.get('/getHappinessData', (req, res) => { getHappinessData(req, res, db) });

  app.post('/register', (req, res) => register(req, res, db));
  app.post('/login', (req, res) => login(req, res, db));
  app.post('/forgotPassword', (req, res) => forgotPassword(req, res, db));
  app.post('/resetPassword', (req, res) => resetPassword(req, res, db));
  app.post('/project-admin/createProjectGroup', (req, res) => createProjectGroup(req, res, db));
  app.post('/project-admin/createProject', (req, res) => createProject(req, res, db));
  app.post('/settings/joinProject', (req, res) => joinProject(req, res, db));
  app.post('/settings/leaveProject', (req, res) => leaveProject(req, res, db));
  app.post('/projects/sendStandupsEmail', (req, res) => sendStandupsEmail(req, res, db));
  app.post('/happiness/saveHappiness', (req, res) => saveHappiness(req, res, db));
  app.post('/happiness/createSprint', (req, res) => createSprint(req, res, db));

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to initialize the database:', error);
});
