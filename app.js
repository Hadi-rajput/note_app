const express = require("express");
const path = require("path");
const connectdb = require("./config/db");

const app = express();
const PORT = 4000;
connectdb();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ========================================
// ROUTES - All routes defined here in app.js
// ========================================

// Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// Add Note Page
app.get("/add-note", (req, res) => {
  res.render("add-note");
});

// About Page
app.get("/about", (req, res) => {
  res.render("about");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

// Create Account Page
app.get("/create-account", (req, res) => {
  res.render("create-account");
});

// Logout Route (dummy - no logic, just redirects to home)
app.get("/logout", (req, res) => {
  res.redirect("/");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send(`
        <html>
            <head>
                <title>404 - Not Found</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    h1 { color: #ef4444; }
                    a { color: #6366f1; text-decoration: none; }
                </style>
            </head>
            <body>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/">← Go Back Home</a>
            </body>
        </html>
    `);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Note App running at http://localhost:${PORT}`);
});
