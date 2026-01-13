window.onload = () => {
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
    }, 1500);
};

// PAGE ROUTER
function navigate(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("visible"));
    document.getElementById(id).classList.add("visible");
}

// APPLICATION SYSTEM
document.getElementById("applyForm").onsubmit = (e) => {
    e.preventDefault();

    let application = {
        first: document.getElementById("firstName").value,
        last: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        dob: document.getElementById("dob").value,
        resume: document.getElementById("resume").value || "No file"
    };

    let apps = JSON.parse(localStorage.getItem("applications") || "[]");
    apps.push(application);
    localStorage.setItem("applications", JSON.stringify(apps));

    alert("Application Submitted!");
    navigate("home");
};

// ADMIN LOGIN
function adminLogin() {
    let u = document.getElementById("adminUser").value;
    let p = document.getElementById("adminPass").value;

    if (u === "ADMIN" && p === "Waffles2013.") {
        loadApps();
        navigate("admin");
    } else {
        alert("Incorrect login!");
    }
}

// LOAD FOR ADMIN
function loadApps() {
    let apps = JSON.parse(localStorage.getItem("applications") || "[]");
    let box = document.getElementById("applications");
    box.innerHTML = "";

    apps.forEach((a, i) => {
        box.innerHTML += `
            <div class="appBox">
                <b>${a.first} ${a.last}</b><br>
                Email: ${a.email}<br>
                Phone: ${a.phone}<br>
                DOB: ${a.dob}<br><br>
                <button onclick="delApp(${i})" class="btn danger">Delete</button>
            </div>
        `;
    });
}

function delApp(i) {
    let apps = JSON.parse(localStorage.getItem("applications") || "[]");
    apps.splice(i, 1);
    localStorage.setItem("applications", JSON.stringify(apps));
    loadApps();
}

function logout() {
    navigate("home");
}
