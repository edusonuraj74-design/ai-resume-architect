function downloadResume() {
    window.print();
}

function printResume() {
    window.print();
}

function generateResume() {

    let certification =
  document.getElementById("certification").value;

  let languages =
document.getElementById("languages").value;

let summary =
document.getElementById("summary").value;


    let resume = document.querySelector(".resume");

   let template = document.getElementById("template").value;

resume.classList.remove(
    "simple",
    "professional",
    "modern"
);

resume.classList.add(template);

let theme = document.getElementById("theme").value;

resume.classList.remove(
    "blue",
    "green",
    "red"
);

resume.classList.add(theme);

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

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    if (email === "") {
        alert("Please enter your email");
        return;
    }

    if (phone === "") {
        alert("Please enter your phone number");
        return;
    }

    if (education === "") {
        alert("Please enter your education");
        return;
    }

    if (skills === "") {
        alert("Please enter your skills");
        return;
    }

    if (project === "") {
        alert("Please enter your project");
        return;
    }

    // Local Storage
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
   

    if (photo) {
        document.getElementById("showPhoto").src =
            URL.createObjectURL(photo);
    }

    // ATS Score
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

 let completedFields = 0;

if(name) completedFields++;
if(email) completedFields++;
if(phone) completedFields++;
if(education) completedFields++;
if(skills) completedFields++;
if(project) completedFields++;
if(experience) completedFields++;
if(linkedin) completedFields++;
if(github) completedFields++;
if(certification) completedFields++;
if(languages) completedFields++;
if(summary) completedFields++;

let completion =
Math.round((completedFields / 12) * 100);

document.getElementById("completion").innerHTML =
    "Resume Completion: " + completion + "%";

if(score < 60){
    strength = "Weak";
}
else if(score < 100){
    strength = "Good";
}
else{
    strength = "Excellent";
}

document.getElementById("showCertification").innerHTML =
    "Certification: " + certification;

    document.getElementById("showLanguages").innerHTML =
    "Languages: " + languages;

    document.getElementById("showSummary").innerHTML =
    "Summary: " + summary;

document.getElementById("strength").innerHTML =
    "Resume Strength: " + strength;

let skillArray = skills.split(",");

document.getElementById("skillCount").innerHTML =
    "Total Skills: " + skillArray.length;

document.getElementById("atsSuggestion").innerHTML =
    "Suggestion: Add more skills and projects.";

    // Preview
    document.getElementById("showName").innerHTML =
        "Name: " + name;

    document.getElementById("showEmail").innerHTML =
        "Email: " + email;

    document.getElementById("showPhone").innerHTML =
        "Phone: " + phone;

    document.getElementById("showEducation").innerHTML =
        "Education: " + education;

    document.getElementById("showSkills").innerHTML =
        "Skills: " + skills;

    document.getElementById("showProject").innerHTML =
        "Project: " + project;

    document.getElementById("showExperience").innerHTML =
        "Experience: " + experience;

    document.getElementById("showLinkedin").innerHTML =
        "LinkedIn: " + linkedin;

    document.getElementById("showGitHub").innerHTML =
        "GitHub: " + github;
}

function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("education").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("project").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("github").value = "";
    document.getElementById("linkedin").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("certification").value = "";
    document.getElementById("languages").value = "";
    document.getElementById("summary").value = "";

    

    


   


    document.getElementById("showName").innerHTML = "";
    document.getElementById("showEmail").innerHTML = "";
    document.getElementById("showPhone").innerHTML = "";
    document.getElementById("showEducation").innerHTML = "";
    document.getElementById("showSkills").innerHTML = "";
    document.getElementById("showProject").innerHTML = "";
    document.getElementById("atsScore").innerHTML = "";
    document.getElementById("atsSuggestion").innerHTML = "";
    document.getElementById("skillCount").innerHTML = "";
    document.getElementById("showLinkedin").innerHTML = "";
    document.getElementById("showGitHub").innerHTML = "";
    document.getElementById("showExperience").innerHTML = "";
    document.getElementById("strength").innerHTML = "";
    document.getElementById("showCertification").innerHTML = "";
    document.getElementById("showLanguages").innerHTML = "";
    document.getElementById("showSummary").innerHTML = "";

    localStorage.clear();

    
   

}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

}
window.onload = function() {

    document.getElementById("name").value =
        localStorage.getItem("name") || "";

    document.getElementById("email").value =
        localStorage.getItem("email") || "";

    document.getElementById("phone").value =
        localStorage.getItem("phone") || "";

    document.getElementById("education").value =
        localStorage.getItem("education") || "";

    document.getElementById("skills").value =
        localStorage.getItem("skills") || "";

    document.getElementById("project").value =
        localStorage.getItem("project") || "";

    document.getElementById("experience").value =
        localStorage.getItem("experience") || "";

    document.getElementById("linkedin").value =
        localStorage.getItem("linkedin") || "";

    document.getElementById("github").value =
        localStorage.getItem("github") || "";

    document.getElementById("certification").value =
    localStorage.getItem("certification") || "";

    document.getElementById("languages").value =
        localStorage.getItem("languages") || "";

    document.getElementById("summary").value =
        localStorage.getItem("summary") || "";
}