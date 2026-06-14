console.log("NEW SERVER FILE LOADED");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();


console.log(__dirname);
console.log(path.join(__dirname, "../index.html"));


// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, "../")));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});



// API Status Check
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "AI Resume API Working"
    });
});

// Generate Resume Summary API
app.post("/api/generate-summary", (req, res) => {
    const { name, skills } = req.body;

    if (!name || !skills) {
        return res.status(400).json({
            error: "Name and skills are required"
        });
    }

    const summary = `${name} is a motivated professional with skills in ${skills}. Passionate about technology and problem solving.`;

    res.json({
        summary: summary
    });
});

// ATS Score Analyzer API
app.post("/api/analyze", (req, res) => {
    const { skills, project } = req.body;

    if (!skills && !project) {
        return res.status(400).json({
            error: "Skills or project required"
        });
    }

    let score = 60;

    if (skills) {
        if (skills.includes("Java")) score += 10;
        if (skills.includes("JavaScript")) score += 10;
        if (skills.includes("Python")) score += 10;
    }

    if (project && project.length > 20) {
        score += 10;
    }

    if (score > 100) score = 100;

    res.json({
        atsScore: score,
        suggestion: "Add more real-world projects and optimize resume keywords for ATS systems."
    });
});

// Start Server
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});