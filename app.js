const express = require("express");
const path = require("path");
const connectdb = require("./config/db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("./model/user");
const session = require("express-session");

const app = express();
const PORT = 4000;

// Database connection
connectdb();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =========================
// SESSION SETUP
// =========================
app.use(
  session({
    secret: "yourSecretKey", // secret key for session
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// =========================
// MIDDLEWARE
// =========================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =========================
// AUTH MIDDLEWARE
// =========================
function isAuth(req, res, next) {
  if (req.session.userId) {
    next(); // <-- FIX: add parentheses, call next()
  } else {
    res.redirect("/login");
  }
}

// =========================
// ROUTES
// =========================

// Home Page (Protected)
app.get("/", isAuth, (req, res) => {
  res.render("index", { name: req.session.userName }); // show logged-in user name
});

// Add Note Page (Protected)
app.get("/add-note", isAuth, (req, res) => {
  res.render("add-note");
});

// About Page (Protected)
app.get("/about", isAuth, (req, res) => {
  res.render("about");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login", { error: "" }); // initialize error
});

// Create Account Page
app.get("/create-account", (req, res) => {
  res.render("create-account", { errors: [], formData: {} });
});

// Logout Route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Session destroy failed: " + err); // FIX: use correct err variable
      return res.status(500).render("500");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

// =========================
// CREATE ACCOUNT POST
// =========================
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
      console.log("User save failed: " + error);
      next(error); // Pass to 500 error handler
    }
  }
);

// =========================
// LOGIN POST
// =========================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password. Try Again!" }); // FIX: add return
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password. Try Again!" }); // FIX: add return
    }

    // Set session
    req.session.userId = user._id;
    req.session.userName = user.fullname;

    // Redirect to home page after login
    res.redirect("/"); // FIX: redirect instead of render, better UX
  } catch (error) {
    console.log("Login failed: " + error);
    res.status(500).render("500");
  }
});

// =========================
// ERROR HANDLERS
// =========================

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404");
});

// 500 Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500");
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Note App running at http://localhost:${PORT}`);
});
