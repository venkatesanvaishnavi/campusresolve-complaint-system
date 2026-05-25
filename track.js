const API = "http://localhost:5001";

async function loadMyComplaints() {

    const user = localStorage.getItem("user");

    const res = await fetch(`${API}/complaints`);

    const data = await res.json();

    console.log(data);

    const container = document.getElementById("myComplaints");

    container.innerHTML = "";

    // FILTER ONLY CURRENT USER COMPLAINTS
    const myComplaints = data.filter(c => c.user === user);

    if (myComplaints.length === 0) {

        container.innerHTML = `
            <p>No complaints found.</p>
        `;

        return;
    }

    myComplaints.forEach(c => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <h3>${c.title}</h3>

            <p>${c.desc}</p>

            <p>
                <b>Status:</b>
                ${c.status}
            </p>
        `;

        container.appendChild(div);
    });
}


// LOGOUT
function logout() {

    localStorage.clear();

    window.location.href = "login.html";
}


// AUTO LOAD
window.onload = loadMyComplaints;