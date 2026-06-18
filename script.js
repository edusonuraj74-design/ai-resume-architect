function downloadResume() {

    const element = document.querySelector(".resume");

    if (!element) {
        alert("Resume not found!");
        return;
    }

    // wait for render (VERY IMPORTANT)
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

    }, 500);
}


function printResume() {
    window.print();
}

function generateResume() {

    // ---------------- INPUT VALUES ----------------
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let education = document.getElementById("education").value;
    let skills = document.getElementById("skills").value;
    let project = document.getElementById("project").value;
    let experience = document.getElementById("experience").value;
    let certification = document.getElementById("certification").value;
    let languages = document.getElementById("languages").value;
    let summary = document.getElementById("summary").value;
    let linkedin = document.getElementById("linkedin").value;
    let github = document.getElementById("github").value;
    let photo = document.getElementById("photo").files[0];

    // ---------------- VALIDATION ----------------
    if (!name || !email || !phone || !education || !skills || !project) {
        alert("Please fill all required fields!");
        return;
    }

    // ---------------- RESUME ELEMENT ----------------
    let resume = document.querySelector(".resume");

    if (!resume) {
        alert("Resume container missing!");
        return;
    }

    // ---------------- TEMPLATE + THEME ----------------
    let template = document.getElementById("template").value;
    let theme = document.getElementById("theme").value;

    resume.classList.remove("simple", "professional", "modern");
    resume.classList.add(template);

    resume.classList.remove("blue", "green", "red");
    resume.classList.add(theme);

    // ---------------- LOCAL STORAGE ----------------
    let fields = {
        name, email, phone, education, skills,
        project, experience, certification,
        languages, summary, linkedin, github
    };

    for (let key in fields) {
        localStorage.setItem(key, fields[key]);
    }

    // ---------------- PHOTO ----------------
    if (photo) {
        let reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("showPhoto").src = e.target.result;
        };

        reader.readAsDataURL(photo);
    }

    // ---------------- ATS SCORE ----------------
    let score = 0;
    let total = 7;

    if (name) score++;
    if (email) score++;
    if (education) score++;
    if (skills) score++;
    if (project) score++;
    if (experience) score++;
    if (certification) score++;

    let atsScore = Math.round((score / total) * 100);

    document.getElementById("atsScore").innerText =
        "ATS Score: " + atsScore + "/100";

    // ---------------- COMPLETION ----------------
    let completed = Object.values(fields).filter(v => v).length;
    let completion = Math.round((completed / Object.keys(fields).length) * 100);

    document.getElementById("completion").innerText =
        "Resume Completion: " + completion + "%";

    document.getElementById("progressBar").style.width = completion + "%";

    // ---------------- STRENGTH ----------------
    let strength = "";
    if (atsScore < 50) strength = "Weak";
    else if (atsScore < 80) strength = "Good";
    else strength = "Excellent";

    document.getElementById("strength").innerText =
        "Resume Strength: " + strength;

    // ---------------- PREVIEW ----------------
    document.getElementById("showName").innerText = name;
    document.getElementById("showEmail").innerText = email;
    document.getElementById("showPhone").innerText = phone;
    document.getElementById("showEducation").innerText = education;
    document.getElementById("showProject").innerText = project;
    document.getElementById("showExperience").innerText = experience;
    document.getElementById("showLinkedin").innerText = linkedin;
    document.getElementById("showGitHub").innerText = github;
    document.getElementById("showCertification").innerText = certification;
    document.getElementById("showLanguages").innerText = languages;
    document.getElementById("showSummary").innerText = summary;

    // ---------------- SKILLS TAGS ----------------
    let skillArray = skills.split(",");
    document.getElementById("showSkills").innerHTML =
        skillArray.map(skill =>
            `<span class="skill-tag">${skill.trim()}</span>`
        ).join(" ");

    // ---------------- AI SUMMARY API ----------------
    fetch("http://localhost:3000/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, skills })
    })
    .then(res => res.json())
    .then(data => {
        if (data.summary) {
            document.getElementById("showSummary").innerText =
                "AI Summary: " + data.summary;
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
            document.getElementById("atsScore").innerText =
                "ATS Score: " + data.atsScore + "/100";
        }

        if (data.suggestion) {
            document.getElementById("atsSuggestion").innerText =
                data.suggestion;
        }
    })
    .catch(err => console.log("ATS error:", err));
}

function clearForm() {
    localStorage.clear();
    location.reload();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// ---------------- LOGIN ----------------
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    if (user === "admin" && pass === "1234") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        document.getElementById("loginError").innerText =
            "Wrong username or password";
    }
}

function logout() {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

// ---------------- LOAD SAVED DATA ----------------
window.onload = function () {
    let keys = [
        "name","email","phone","education","skills",
        "project","experience","linkedin","github",
        "certification","languages","summary"
    ];

    keys.forEach(key => {
        let el = document.getElementById(key);
        if (el) el.value = localStorage.getItem(key) || "";
    });
};
function analyzeJobMatch() {

    let skills = document.getElementById("skills").value.toLowerCase();
    let project = document.getElementById("project").value.toLowerCase();
    let jobDescription = document.getElementById("jobDescription").value.toLowerCase();

    if (!jobDescription) {
        alert("Please paste job description first");
        return;
    }

    let resumeText = skills + " " + project;

    let keywords = [
        "javascript","react","node","express","mongodb",
        "java","python","sql","html","css"
    ];

    let matched = 0;
    let missing = [];

    keywords.forEach(keyword => {
        if (jobDescription.includes(keyword) && resumeText.includes(keyword)) {
            matched++;
        } 
        else if (jobDescription.includes(keyword)) {
            missing.push(keyword);
        }
    });

    let score = Math.round((matched / keywords.length) * 100);

    document.getElementById("matchScore").innerText =
        "Job Match Score: " + score + "%";

    document.getElementById("missingKeywords").innerText =
        "Missing Keywords: " + missing.join(", ");
}


