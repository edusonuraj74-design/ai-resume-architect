const API_BASE = "http://localhost:3000";

// ===================== RESUME DOWNLOAD =====================
function downloadResume() {
    const element = document.getElementById("resume");

    if (!element) return alert("Resume not found!");

    html2pdf()
        .set({
            margin: 10,
            filename: "AI_Resume.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                scrollY: 0
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        })
        .from(element)
        .save();
}

// ===================== PRINT =====================
function printResume() {
    window.print();
}

// ===================== GENERATE RESUME =====================
async function generateResume() {

    const get = (id) => document.getElementById(id)?.value || "";

    let name = get("name");
    let email = get("email");
    let phone = get("phone");
    let education = get("education");
    let skills = get("skills");
    let project = get("project");
    let experience = get("experience");
    let certification = get("certification");
    let languages = get("languages");
    let summary = get("summary");
    let linkedin = get("linkedin");
    let github = get("github");

    let photo = document.getElementById("photo")?.files[0];


// resume.classList.add(template);

    // ---------------- VALIDATION ----------------
    if (!name || !email || !phone) {
        alert("Please fill required fields!");
        return;
    }

   const resume = document.getElementById("resume");
if (!resume) return alert("Resume container missing!");

let template = get("template") || "simple";
let theme = get("theme") || "blue";

resume.classList.remove(
    "simple",
    "professional",
    "modern",
    "creative"
);

// resume.classList.add(template);

resume.classList.remove(
    "blue",
    "green",
    "red"
);

resume.classList.add(theme);

    // ---------------- TEMPLATE ----------------
    // let template = get("template") || "simple";
    // let theme = get("theme") || "blue";

    // resume.classList.remove("simple", "professional", "modern", "creative");
    // resume.classList.add(template);

    // resume.classList.remove("blue", "green", "red");
    // resume.classList.add(theme);

    // ---------------- SAVE LOCAL ----------------
    const fields = {
        name, email, phone, education, skills,
        project, experience, certification,
        languages, summary, linkedin, github
    };

    for (let key in fields) {
        localStorage.setItem(key, fields[key]);
    }

    // ---------------- PHOTO ----------------
    if (photo) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("showPhoto").src = e.target.result;
        };
        reader.readAsDataURL(photo);
    }

    // ---------------- SKILLS ----------------
    const skillArray = skills.split(",").map(s => s.trim()).filter(Boolean);

    document.getElementById("showSkills").innerHTML =
        skillArray.map(s => `<span class="skill-tag">${s}</span>`).join(" ");

    // ---------------- PREVIEW ----------------
    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    };

    set("showName", name);
    set("showEmail", email);
    set("showPhone", phone);
    set("showEducation", education);
    set("showProject", project);
    set("showExperience", experience);
    set("showLinkedin", linkedin);
    set("showGitHub", github);
    set("showCertification", certification);
    set("showLanguages", languages);
    set("showSummary", summary);

    // ================= ATS SCORE (LOCAL) =================
    // ================= ATS SCORE (LOCAL) =================

let allFields = [
    name,
    email,
    education,
    skills,
    project,
    experience,
    certification
];

let filled = allFields.filter(Boolean).length;

let atsScore = Math.round((filled / allFields.length) * 100);

set("atsScore", `ATS Score: ${atsScore}/100`);

// Resume Completion
let completion = Math.round(
    (Object.values(fields).filter(Boolean).length /
    Object.keys(fields).length) * 100
);

set("completion", `Resume Completion: ${completion}%`);

document.getElementById("progressBar").style.width =
    completion + "%";

// Strength
set(
    "strength",
    atsScore < 50
        ? "Weak"
        : atsScore < 80
        ? "Good"
        : "Excellent"
);

// Dashboard Update
const dashboardATS =
    document.getElementById("dashboardATS");

const dashboardCompletion =
    document.getElementById("dashboardCompletion");

if (dashboardATS) {
    dashboardATS.innerText = atsScore;
}

if (dashboardCompletion) {
    dashboardCompletion.innerText = completion + "%";
}

// Analytics Update
const analyticsATS =
    document.getElementById("analyticsATS");

const analyticsStrength =
    document.getElementById("analyticsStrength");

const analyticsCompletion =
    document.getElementById("analyticsCompletion");

if (analyticsATS) {
    analyticsATS.innerText =
        `ATS Score: ${atsScore}/100`;
}

if (analyticsStrength) {
    analyticsStrength.innerText =
        `Strength: ${
            atsScore < 50
                ? "Weak"
                : atsScore < 80
                ? "Good"
                : "Excellent"
        }`;
}

if (analyticsCompletion) {
    analyticsCompletion.innerText =
        `Resume Completion: ${completion}%`;
}

    // ================= AI SUMMARY API =================
    try {
        let res = await fetch(`${API_BASE}/api/generate-summary`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, skills })
        });

        let data = await res.json();

        if (data.summary) {
            set("showSummary", "AI: " + data.summary);
        }

    } catch (e) {
        console.log("AI error:", e);
    }

    // ================= ATS API =================
    try {
        let res = await fetch(`${API_BASE}/api/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ skills, project })
        });

        let data = await res.json();

        if (data.atsScore) set("atsScore", `ATS Score: ${data.atsScore}/100`);
        if (data.suggestion) set("atsSuggestion", data.suggestion);

    } catch (e) {
        console.log("ATS error:", e);
    }
}

// ===================== CLEAR =====================
function clearForm() {
    localStorage.clear();
    location.reload();
}

// ===================== DARK MODE =====================
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// ===================== LOGIN =====================
function login() {
    let user = document.getElementById("loginUser")?.value;
    let pass = document.getElementById("loginPass")?.value;

    if (user === "Sonu" && pass === "1234") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "flex";

    showSection("dashboard");
    } else {
        document.getElementById("loginError").innerText = "Wrong username or password";
    }
}

// ===================== LOGOUT =====================
function logout() {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

// ===================== LOAD DATA =====================
window.onload = function () {

    
    const keys = [
        "name","email","phone","education","skills",
        "project","experience","linkedin","github",
        "certification","languages","summary"
    ];
    livePreview();

    keys.forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = localStorage.getItem(key) || "";
    });
};

function changeTemplate() {

    const resume = document.getElementById("resume");

    const template =
        document.getElementById("template").value;

    resume.classList.remove(
        "simple",
        "professional",
        "modern",
        "creative"
    );

    resume.classList.add(template);
}

function changeTheme() {

    const resume = document.getElementById("resume");
    const theme = document.getElementById("theme");

    if (!resume || !theme) return;

    resume.classList.remove("blue", "green", "red");
    resume.classList.add(theme.value);
}

// ===================== JOB MATCH =====================
function analyzeJobMatch() {

    let skills = (document.getElementById("skills")?.value || "").toLowerCase();
    let project = (document.getElementById("project")?.value || "").toLowerCase();
    let job = (document.getElementById("jobDescription")?.value || "").toLowerCase();

    if (!job) return alert("Paste job description first");

    let resumeText = skills + " " + project;

    let keywords = ["javascript","react","node","express","mongodb","python","sql","html","css"];

    let matched = 0;
    let missing = [];

    keywords.forEach(k => {
        if (job.includes(k) && resumeText.includes(k)) matched++;
        else if (job.includes(k)) missing.push(k);
    });

    let score = Math.round((matched / keywords.length) * 100);

    document.getElementById("matchScore").innerText = `Match Score: ${score}%`;
    document.getElementById("missingKeywords").innerText = `Missing: ${missing.join(", ")}`;
}

function suggestSkills() {

    const skills =
        document.getElementById("skills")
        .value
        .toLowerCase();

    let suggestions = [];

    if (skills.includes("html"))
        suggestions.push("Responsive Design");

    if (skills.includes("css"))
        suggestions.push("Tailwind CSS");

    if (skills.includes("javascript"))
        suggestions.push("React");

    if (skills.includes("react"))
        suggestions.push("Redux");

    if (skills.includes("node"))
        suggestions.push("Express.js");

    if (skills.includes("mongodb"))
        suggestions.push("Mongoose");

    if (skills.includes("python"))
        suggestions.push("Django");

    if (skills.includes("java"))
        suggestions.push("Spring Boot");

    const box =
        document.getElementById("skillSuggestions");

    box.innerHTML =
        suggestions.map(skill =>
            `<span class="suggestion-tag">${skill}</span>`
        ).join("");
}

function livePreview() {

    const fields = [
        "name","email","phone","education","skills",
        "project","experience","certification",
        "languages","summary","linkedin","github"
    ];

    fields.forEach(id => {
        let el = document.getElementById(id);

        if (el) {
            el.addEventListener("input", generateResume);
        }
    });

}

    // ===================== SIDEBAR NAVIGATION =====================

function showSection(section) {

    const dashboard = document.getElementById("dashboard");
    const resumeSection = document.getElementById("resumeSection");
    const analytics = document.getElementById("analytics");
    const settings = document.getElementById("settings");

    if (dashboard) dashboard.style.display = "none";
    if (resumeSection) resumeSection.style.display = "none";
    if (analytics) analytics.style.display = "none";
    if (settings) settings.style.display = "none";

    if (section === "dashboard") {
        dashboard.style.display = "block";
    }

    if (section === "resume") {
        resumeSection.style.display = "flex";
    }

    if (section === "analytics") {
        analytics.style.display = "block";
    }

    if (section === "settings") {
        settings.style.display = "block";
    }
}
