// SHOW USER
document.getElementById("userEmail").innerText =
    localStorage.getItem("user");

// SUBMIT COMPLAINT
async function submitComplaint() {

    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;

    const user = localStorage.getItem("user");

    if (!title || !desc) {
        alert("Fill all fields");
        return;
    }

    const res = await fetch("http://localhost:5001/submit", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            desc,
            user
        })
    });

    const data = await res.json();

    console.log(data);

    alert("Complaint submitted!");
}


// NAVIGATION
function goToTrack() {
    window.location.href = "track.html";
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}


// LOGOUT
function logout() {

    localStorage.clear();

    window.location.href = "login.html";
}