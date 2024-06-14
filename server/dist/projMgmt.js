"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = exports.getProjectGroups = exports.getSemesters = exports.createProject = exports.createProjectGroup = void 0;
const createProjectGroup = async (req, res, db) => {
    const { semester, projectGroupName } = req.body;
    const semesterRegex = /^(SS|WS)\d{2,4}$/; // Format: SS24 or WS2425
    if (!semester || !projectGroupName) {
        return res.status(400).json({ message: "Please fill in semester and project group name" });
    }
    else if (!semesterRegex.test(semester)) {
        return res.status(400).json({ message: "Invalid semester format. Please use SSYY or WSYYYY format" });
    }
    try {
        await db.run("INSERT INTO projectGroup (semester, projectGroupName) VALUES (?, ?)", [semester, projectGroupName]);
        await db.exec(`
            CREATE TABLE IF NOT EXISTS "${projectGroupName}" (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              projectName TEXT
            )
        `);
        res.status(201).json({ message: "Project group created successfully" });
    }
    catch (error) {
        console.error("Error during project group creation:", error);
        res.status(500).json({ message: "Project group creation failed", error });
    }
};
exports.createProjectGroup = createProjectGroup;
const createProject = async (req, res, db) => {
    const { projectGroupName, projectName } = req.body;
    if (!projectGroupName || !projectName) {
        return res.status(400).json({ message: "Please fill in project group name and project name" });
    }
    try {
        const user = await db.get('SELECT * FROM projectGroup WHERE projectGroupName = ?', [projectGroupName]);
        if (!user) {
            return res.status(400).json({ message: 'Project Group Not Found' });
        }
        await db.run(`INSERT INTO ${projectGroupName} (projectName) VALUES (?)`, [projectName]);
        await db.exec(`
            CREATE TABLE IF NOT EXISTS "${projectName}" (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                memberName TEXT,
                memberRole TEXT,
                memberEmail TEXT
            )
        `);
        res.status(201).json({ message: "Project created successfully" });
    }
    catch (error) {
        console.error("Error during project creation:", error);
        res.status(500).json({ message: "Project creation failed", error });
    }
};
exports.createProject = createProject;
const getSemesters = async (req, res, db) => {
    try {
        const semesters = await db.all("SELECT DISTINCT semester FROM projectGroup");
        res.json(semesters);
    }
    catch (error) {
        console.error("Error during semester retrieval:", error);
        res.status(500).json({ message: "Failed to retrieve semesters", error });
    }
};
exports.getSemesters = getSemesters;
const getProjectGroups = async (req, res, db) => {
    const { semester } = req.query;
    let query = "SELECT * FROM projectGroup";
    let params = [];
    if (semester) {
        query += " WHERE semester = ?";
        params.push(semester);
    }
    try {
        const projectGroups = await db.all(query, params);
        res.json(projectGroups);
    }
    catch (error) {
        console.error("Error during project group retrieval:", error);
        res.status(500).json({ message: "Failed to retrieve project groups", error });
    }
};
exports.getProjectGroups = getProjectGroups;
const getProjects = async (req, res, db) => {
    const { projectGroupName } = req.query;
    if (!projectGroupName) {
        return res.status(400).json({ message: "Project group name is required" });
    }
    try {
        const projects = await db.all(`SELECT * FROM "${projectGroupName}"`);
        res.json(projects);
    }
    catch (error) {
        console.error("Error during project retrieval:", error);
        res.status(500).json({ message: `Failed to retrieve projects for project group ${projectGroupName}`, error });
    }
};
exports.getProjects = getProjects;
