const API = "http://localhost:5001";


// LOAD COMPLAINTS
async function loadComplaints() {

    const res = await fetch(`${API}/complaints`);

    const data = await res.json();

    console.log(data);

    const container = document.getElementById("complaintsList");

    container.innerHTML = "";

    data.forEach(c => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `

            <h3>${c.title}</h3>

            <p>${c.desc}</p>

            <p><b>User:</b> ${c.user}</p>

            <label>Status:</label>

            <select onchange="updateStatus(${c.id}, this.value)">

                <option ${c.status === "Pending" ? "selected" : ""}>
                    Pending
                </option>

                <option ${c.status === "Looking Into It" ? "selected" : ""}>
                    Looking Into It
                </option>

                <option ${c.status === "Resolved" ? "selected" : ""}>
                    Resolved
                </option>

            </select>
        `;

        container.appendChild(div);
    });
}


// UPDATE STATUS
async function updateStatus(id, status) {

    await fetch(`${API}/update-status`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id,
            status
        })
    });

    loadComplaints();
}


// LOGOUT
function logout() {

    window.location.href = "login.html";
}


// AUTO LOAD
window.onload = loadComplaints;