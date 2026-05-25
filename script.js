async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://127.0.0.1:5001/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("user", email);
            localStorage.setItem("role", data.role);
            window.location.href = data.redirect;
        } else {
            alert("Invalid login");
        }

    } catch {
        alert("Server not responding");
    }
}

async function submitComplaint() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;

    const user = localStorage.getItem("email");

    await fetch("http://localhost:5001/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, desc, user })
    });

    alert("Complaint submitted!");
}