const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session middleware must be BEFORE routes
app.use(
    session({
        secret: "supersecretkey",
        resave: false,
        saveUninitialized: false,
    })
);

// -------------------- ROUTES --------------------
app.get("/", (req, res) => {
    // This now directly serves home.html, fixing the Cannot GET / error
    res.sendFile(path.join(__dirname, "public/home.html"));
});

// Load users file
function loadUsers() {
    if (!fs.existsSync("users.json")) {
        fs.writeFileSync("users.json", JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync("users.json"));
}

// Save users to file
function saveUsers(users) {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

// -------------------- REGISTER --------------------
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const users = loadUsers();
    const existing = users.find((u) => u.username === username);

    if (existing) {
        return res.send("User already exists!");
    }

    const hashed = await bcrypt.hash(password, 10);

    users.push({ username, password: hashed });
    saveUsers(users);

    res.redirect("/login.html");
});

// -------------------- LOGIN --------------------
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const users = loadUsers();
    const user = users.find((u) => u.username === username);

    if (!user) return res.send("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.send("Incorrect password!");

    req.session.user = username;
    // --- FIX APPLIED HERE: Must redirect to the custom route /dashboard ---
    res.redirect("/dashboard");
});

// -------------------- PROTECTED ROUTE --------------------
// This custom route ensures the session check runs before the file is served.
app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login.html");
    }
    res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

// -------------------- LOGOUT --------------------
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login.html");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));