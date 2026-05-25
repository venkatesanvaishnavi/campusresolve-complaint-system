const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5001;

// TEMP STORAGE
let complaints = [];

// LOGIN
app.post('/login', (req, res) => {

    const { email, password } = req.body;

    // AUTHORITY LOGIN
    if (email === "authority@srmist.edu.in") {

        if (password === "Authority") {

            return res.json({
                success: true,
                redirect: "authority.html"
            });

        } else {

            return res.json({
                success: false,
                message: "Invalid authority password"
            });
        }
    }

    // STUDENT LOGIN
    if (email.endsWith("@srmist.edu.in")) {

        return res.json({
            success: true,
            redirect: "dashboard.html"
        });
    }

    return res.json({
        success: false,
        message: "Invalid login"
    });
});


// SUBMIT COMPLAINT
app.post('/submit', (req, res) => {

    const { title, desc, user } = req.body;

    const complaint = {
        id: complaints.length + 1,
        title,
        desc,
        user,
        status: "Pending"
    };

    complaints.push(complaint);

    console.log("COMPLAINT ADDED:");
    console.log(complaints);

    res.json({
        success: true
    });
});


// GET ALL COMPLAINTS
app.get('/complaints', (req, res) => {

    console.log("SENDING COMPLAINTS");

    res.json(complaints);
});


// UPDATE STATUS
app.post('/update-status', (req, res) => {

    const { id, status } = req.body;

    const complaint = complaints.find(c => c.id === id);

    if (complaint) {

        complaint.status = status;

        console.log("UPDATED:");
        console.log(complaints);

        return res.json({
            success: true
        });
    }

    res.json({
        success: false
    });
});


// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});