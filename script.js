function generateResume() {

    let name = document.getElementById("name").value;

    if(name === ""){
        alert("Please enter your name");
        return;
    }

    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let skills = document.getElementById("skills").value;
    let project = document.getElementById("project").value;
    let education = document.getElementById("education").value;

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