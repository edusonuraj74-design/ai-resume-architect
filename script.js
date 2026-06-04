function downloadResume() {
    window.print();
}

function printResume() {
    window.print();
}

function generateResume() {

    let name = document.getElementById("name").value;

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let skills = document.getElementById("skills").value;
    let project = document.getElementById("project").value;
    let education = document.getElementById("education").value;
    let photo = document.getElementById("photo").files[0];

    if (photo) {
        document.getElementById("showPhoto").src =
            URL.createObjectURL(photo);
    }

    let score = 0;

    if (name) score += 20;
    if (email) score += 20;
    if (education) score += 20;
    if (skills) score += 20;
    if (project) score += 20;

    document.getElementById("atsScore").innerHTML =
        "ATS Score: " + score + "/100";

    if (score < 60) {
        document.getElementById("atsSuggestion").innerHTML =
            "Suggestion: Add more skills and projects.";
    }
    else if (score < 100) {
        document.getElementById("atsSuggestion").innerHTML =
            "Suggestion: Good resume, add more details.";
    }
    else {
        document.getElementById("atsSuggestion").innerHTML =
            "Suggestion: Excellent Resume!";
    }

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
}

function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("education").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("project").value = "";
    document.getElementById("photo").value = "";

    document.getElementById("showName").innerHTML = "";
    document.getElementById("showEmail").innerHTML = "";
    document.getElementById("showPhone").innerHTML = "";
    document.getElementById("showEducation").innerHTML = "";
    document.getElementById("showSkills").innerHTML = "";
    document.getElementById("showProject").innerHTML = "";
    document.getElementById("atsScore").innerHTML = "";
    document.getElementById("atsSuggestion").innerHTML = "";
}

function toggleDarkMode() {
    document.body.style.backgroundColor = "black";
}