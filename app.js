const express = require("express");
const path = require("path");
const connectdb = require("./config/db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("./model/user");
const { error } = require("console");

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
  res.render("create-account", { errors: [], formData: {} });
});

// Logout Route (dummy - no logic, just redirects to home)
app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.post(
  "/create-account",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    const { name, email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.render("create-account", {
        errors: errors.array(),
        formData: { name, email },
      });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render("create-account", {
          errors: [{ msg: "User already exists with this email" }],
          formData: { name, email },
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user
      const newUser = new User({
        fullname: name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Redirect to login page after successful registration
      res.redirect("/login");
    } catch (error) {
      console.log("user save failed " + error);
      next(error); // Pass to error handler
    }
  },
);

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404");
});

// 500 Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Note App running at http://localhost:${PORT}`);
});
