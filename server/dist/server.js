"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./auth");
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
(0, database_1.initializeDb)().then((db) => {
    console.log("Database initialized, starting server...");
    app.get('/', (req, res) => {
        res.send('Welcome to the Authentication API');
    });
    app.post('/register', (req, res) => (0, auth_1.register)(req, res, db));
    app.post('/login', (req, res) => (0, auth_1.login)(req, res, db));
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Failed to initialize the database:', error);
});
