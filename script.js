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


    document.getElementById("showName").innerHTML =
        "Name: " + name;

    document.getElementById("showEmail").innerHTML =
        "Email: " + email;s

    document.getElementById("showPhone").innerHTML =
        "Phone: " + phone;

    document.getElementById("showSkills").innerHTML =
        "Skills: " + skills;

    document.getElementById("showProject").innerHTML =
        "Project: " + project;
}