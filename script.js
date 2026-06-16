function downloadResume() {
    const element = document.querySelector(".resume");

    console.log("Resume Text:", element.innerText);
    console.log("Resume HTML:", element.innerHTML);

    html2pdf()
        .set({
            margin: 10,
            filename: "Resume.pdf",
            html2canvas: {
                scale: 2,
                logging: true
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


function printResume() {
    window.print();
}

function generateResume() {

    // ---------------- INPUT VALUES ----------------
    let certification = document.getElementById("certification").value;
    let languages = document.getElementById("languages").value;
    let summary = document.getElementById("summary").value;

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let education = document.getElementById("education").value;
    let skills = document.getElementById("skills").value;
    let project = document.getElementById("project").value;
    let experience = document.getElementById("experience").value;
    let linkedin = document.getElementById("linkedin").value;
    let github = document.getElementById("github").value;
    let photo = document.getElementById("photo").files[0];

    // ---------------- VALIDATION ----------------
    if (!name || !email || !phone || !education || !skills || !project) {
        alert("Please fill required fields");
        return;
    }

    // ---------------- TEMPLATE & THEME ----------------
    let resume = document.querySelector(".resume");

    let template = document.getElementById("template").value;
    let theme = document.getElementById("theme").value;

    resume.classList.remove("simple", "professional", "modern");
    resume.classList.add(template);

    resume.classList.remove("blue", "green", "red");
    resume.classList.add(theme);

    // ---------------- LOCAL STORAGE ----------------
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("education", education);
    localStorage.setItem("skills", skills);
    localStorage.setItem("project", project);
    localStorage.setItem("experience", experience);
    localStorage.setItem("certification", certification);
    localStorage.setItem("languages", languages);
    localStorage.setItem("summary", summary);
    localStorage.setItem("linkedin", linkedin);
    localStorage.setItem("github", github);

    // ---------------- PHOTO ----------------
   // ---------------- PHOTO ----------------
if (photo) {
    const reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("showPhoto").src = e.target.result;
    };

    reader.readAsDataURL(photo);
} 
    // ---------------- ATS SCORE ----------------
let score = 0;
if (name) score++;
if (email) score++;
if (education) score++;
if (skills) score++;
if (project) score++;
if (experience) score++;
if (certification) score++;

score = Math.round((score / 7) * 100);

document.getElementById("atsScore").innerHTML =
    "ATS Score: " + score + "/100";
    // ---------------- COMPLETION ----------------
    let completedFields = 0;

    if (name) completedFields++;
    if (email) completedFields++;
    if (phone) completedFields++;
    if (education) completedFields++;
    if (skills) completedFields++;
    if (project) completedFields++;
    if (experience) completedFields++;
    if (linkedin) completedFields++;
    if (github) completedFields++;
    if (certification) completedFields++;
    if (languages) completedFields++;
    if (summary) completedFields++;

    let completion = Math.round((completedFields / 12) * 100);

    document.getElementById("completion").innerHTML =
        "Resume Completion: " + completion + "%";

    // ---------------- STRENGTH ----------------
    let strength = "";
    if (score < 60) strength = "Weak";
    else if (score < 100) strength = "Good";
    else strength = "Excellent";

    document.getElementById("strength").innerHTML =
        "Resume Strength: " + strength;

    // ---------------- PREVIEW ----------------
    document.getElementById("showName").innerHTML = "Name: " + name;
    document.getElementById("showEmail").innerHTML = "Email: " + email;
    document.getElementById("showPhone").innerHTML = "Phone: " + phone;
    document.getElementById("showEducation").innerHTML = "Education: " + education;
    document.getElementById("showSkills").innerHTML = "Skills: " + skills;
    document.getElementById("showProject").innerHTML = "Project: " + project;
    document.getElementById("showExperience").innerHTML = "Experience: " + experience;
    document.getElementById("showLinkedin").innerHTML = "LinkedIn: " + linkedin;
    document.getElementById("showGitHub").innerHTML = "GitHub: " + github;

    document.getElementById("progressBar").style.width = completion + "%";

    document.getElementById("showCertification").innerHTML =
    "Certification: " + certification;

   document.getElementById("showLanguages").innerHTML =
    "Languages: " + languages;

   document.getElementById("showSummary").innerHTML =
    "Summary: " + summary;

    // ---------------- AI SUMMARY API ----------------
    fetch("http://localhost:3000/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, skills })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("showSummary").innerText =
            "AI Summary: " + data.summary;
    })
    .catch(err => console.log(err));

    // ---------------- ATS API ----------------
   fetch("http://localhost:3000/api/analyze", {
       method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, project })
   })
    .then(res => res.json())
    .then(data => {
        document.getElementById("atsScore").innerText =
            "ATS Score: " + data.atsScore + "/100";

       document.getElementById("atsSuggestion").innerText =
           data.suggestion;
    })
    .catch(err => console.log(err));
}

function clearForm() {
    localStorage.clear();
    location.reload();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

window.onload = function () {
    document.getElementById("name").value = localStorage.getItem("name") || "";
    document.getElementById("email").value = localStorage.getItem("email") || "";
    document.getElementById("phone").value = localStorage.getItem("phone") || "";
    document.getElementById("education").value = localStorage.getItem("education") || "";
    document.getElementById("skills").value = localStorage.getItem("skills") || "";
    document.getElementById("project").value = localStorage.getItem("project") || "";
    document.getElementById("experience").value = localStorage.getItem("experience") || "";
    document.getElementById("linkedin").value = localStorage.getItem("linkedin") || "";
    document.getElementById("github").value = localStorage.getItem("github") || "";
    document.getElementById("certification").value = localStorage.getItem("certification") || "";
    document.getElementById("languages").value = localStorage.getItem("languages") || "";
    document.getElementById("summary").value = localStorage.getItem("summary") || "";
};

function analyzeJobMatch() {

    let skills = document.getElementById("skills").value.toLowerCase();
    let project = document.getElementById("project").value.toLowerCase();

    let jobDescription =
        document.getElementById("jobDescription").value.toLowerCase();

    let resumeText = skills + " " + project;

    let keywords = [
        "javascript",
        "react",
        "node",
        "express",
        "mongodb",
        "java",
        "python",
        "sql",
        "html",
        "css"
    ];

    let matched = 0;
    let missing = [];

    keywords.forEach(keyword => {

        if (
            jobDescription.includes(keyword) &&
            resumeText.includes(keyword)
        ) {
            matched++;
        }
        else if (jobDescription.includes(keyword)) {
            missing.push(keyword);
        }
    });

    let score = Math.round(
        (matched / keywords.length) * 100
    );

    document.getElementById("matchScore").innerHTML =
        "Job Match Score: " + score + "%";

    document.getElementById("missingKeywords").innerHTML =
        "Missing Keywords: " + missing.join(", ");
}

