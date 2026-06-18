// ===================== RESUME DOWNLOAD =====================
function downloadResume() {
    const element = document.querySelector(".resume");

    if (!element) {
        alert("Resume not found!");
        return;
    }

    setTimeout(() => {
        html2pdf()
            .set({
                margin: 10,
                filename: "Resume.pdf",
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
    }, 300);
}

// ===================== PRINT =====================
function printResume() {
    window.print();
}

// ===================== GENERATE RESUME =====================
function generateResume() {

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

    // ---------------- VALIDATION ----------------
    if (!name || !email || !phone || !education || !skills || !project) {
        alert("Please fill all required fields!");
        return;
    }

    const resume = document.querySelector(".resume");
    if (!resume) {
        alert("Resume container missing!");
        return;
    }

    // ---------------- TEMPLATE + THEME ----------------
    let template = document.getElementById("template")?.value || "simple";
    let theme = document.getElementById("theme")?.value || "blue";

    resume.classList.remove("simple", "professional", "modern");
    resume.classList.add(template);

    resume.classList.remove("blue", "green", "red");
    resume.classList.add(theme);

    // ---------------- LOCAL STORAGE ----------------
    const fields = {
        name, email, phone, education, skills,
        project, experience, certification,
        languages, summary, linkedin, github
    };

    Object.keys(fields).forEach(key => {
        localStorage.setItem(key, fields[key]);
    });

    // ---------------- PHOTO ----------------
    if (photo) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById("showPhoto");
            if (img) img.src = e.target.result;
        };
        reader.readAsDataURL(photo);
    }

    // ---------------- ATS SCORE ----------------
    let score = 0;
    const total = 7;

    [name, email, education, skills, project, experience, certification]
        .forEach(v => v && score++);

    let atsScore = Math.round((score / total) * 100);

    const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val || "";
    };

    setText("atsScore", `ATS Score: ${atsScore}/100`);

    // ---------------- COMPLETION ----------------
    const completed = Object.values(fields).filter(v => v).length;
    const completion = Math.round((completed / Object.keys(fields).length) * 100);

    setText("completion", `Resume Completion: ${completion}%`);

    const bar = document.getElementById("progressBar");
    if (bar) bar.style.width = completion + "%";

    // ---------------- STRENGTH ----------------
    let strength =
        atsScore < 50 ? "Weak" :
        atsScore < 80 ? "Good" : "Excellent";

    setText("strength", `Resume Strength: ${strength}`);

    // ---------------- PREVIEW ----------------
    setText("showName", name);
    setText("showEmail", email);
    setText("showPhone", phone);
    setText("showEducation", education);
    setText("showProject", project);
    setText("showExperience", experience);
    setText("showLinkedin", linkedin);
    setText("showGitHub", github);
    setText("showCertification", certification);
    setText("showLanguages", languages);
    setText("showSummary", summary);

    // ---------------- SKILLS ----------------
    const skillArray = skills.split(",").map(s => s.trim()).filter(Boolean);

    const skillBox = document.getElementById("showSkills");
    if (skillBox) {
        skillBox.innerHTML = skillArray
            .map(skill => `<span class="skill-tag">${skill}</span>`)
            .join(" ");
    }

    // ---------------- AI API (SUMMARY) ----------------
    fetch("http://localhost:3000/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, skills })
    })
    .then(res => res.json())
    .then(data => {
        if (data.summary) {
            setText("showSummary", "AI Summary: " + data.summary);
        }
    })
    .catch(err => console.log("AI error:", err));

    // ---------------- ATS API ----------------
    fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, project })
    })
    .then(res => res.json())
    .then(data => {

        if (data.atsScore) {
            setText("atsScore", `ATS Score: ${data.atsScore}/100`);
        }

        if (data.suggestion) {
            setText("atsSuggestion", data.suggestion);
        }
    })
    .catch(err => console.log("ATS error:", err));
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

    if (user === "admin" && pass === "1234") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        const err = document.getElementById("loginError");
        if (err) err.innerText = "Wrong username or password";
    }
}

// ===================== LOGOUT =====================
function logout() {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

// ===================== LOAD SAVED DATA =====================
window.onload = function () {

    const keys = [
        "name","email","phone","education","skills",
        "project","experience","linkedin","github",
        "certification","languages","summary"
    ];

    keys.forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = localStorage.getItem(key) || "";
    });
};

// ===================== JOB MATCH =====================
function analyzeJobMatch() {

    let skills = (document.getElementById("skills")?.value || "").toLowerCase();
    let project = (document.getElementById("project")?.value || "").toLowerCase();
    let jobDescription = (document.getElementById("jobDescription")?.value || "").toLowerCase();

    if (!jobDescription) {
        alert("Please paste job description first");
        return;
    }

    let resumeText = skills + " " + project;

    let keywords = [
        "javascript", "react", "node", "express", "mongodb",
        "java", "python", "sql", "html", "css"
    ];

    let matched = 0;
    let missing = [];

    keywords.forEach(keyword => {
        if (jobDescription.includes(keyword) && resumeText.includes(keyword)) {
            matched++;
        } else if (jobDescription.includes(keyword)) {
            missing.push(keyword);
        }
    });

    let score = Math.round((matched / keywords.length) * 100);

    const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val || "";
    };

    setText("matchScore", `Job Match Score: ${score}%`);
    setText("missingKeywords", `Missing Keywords: ${missing.join(", ")}`);
}

