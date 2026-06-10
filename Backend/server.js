const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("AI Resume Architect Backend Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "AI Resume API Working"
    });
});