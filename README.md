# 📝 Note App - Modern UI Project

A beautiful, responsive note-taking application UI built with **Node.js**, **Express**, and **EJS templates**. Features a modern design with dark/light mode toggle using pure CSS.

## ✨ Features

- 🎨 **Modern UI Design** - Clean, professional interface with smooth animations
- 🌓 **Dark/Light Mode** - Pure CSS theme toggle with CSS variables
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🔍 **Search Bar** - UI-ready search functionality
- 📋 **Note Cards** - Beautiful grid layout with hover effects
- ⚡ **Fast & Lightweight** - No JavaScript for UI, pure HTML/CSS

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Development Mode

For auto-restart on file changes:
```bash
npm run dev
```

## 📁 Project Structure

```
note_app/
├── app.js                 # Express server with all routes
├── package.json          # Project dependencies
├── views/                # EJS template files
│   ├── index.ejs        # Home page
│   ├── add-note.ejs     # Add note form
│   └── about.ejs        # About page
└── public/              # Static assets
    └── css/
        └── style.css    # Main stylesheet
```

## 🛣️ Routes

All routes are defined in `app.js`:

| Route | Description |
|-------|-------------|
| `/` | Home page with notes grid |
| `/add-note` | Add new note form |
| `/about` | About page |
| `/logout` | Logout (redirects to home) |

## 🎨 Design Features

### Navbar
- Sticky navigation
- Logo with search bar
- Navigation links: Home, Add Note, About, Logout
- Theme toggle button

### Home Page
- Hero section with welcome message
- Notes grid (4 cards per row on desktop)
- Hover effects revealing edit/delete buttons
- Smooth animations

### Add Note Page
- Centered form design
- Note title and description fields
- Modern input styling

### About Page
- Professional description
- Feature cards grid
- Call-to-action section

### Responsive Breakpoints
- **Desktop**: 4 cards per row
- **Tablet (≤1024px)**: 3 cards per row
- **Small Tablet (≤768px)**: 2 cards per row
- **Mobile (≤480px)**: 1 card per row

## 🌓 Theme Toggle

Click the moon/sun icon in the navbar to switch between dark and light modes. The theme is implemented using CSS variables for smooth transitions.

## 🛠️ Technologies Used

- **Backend**: Node.js, Express
- **Template Engine**: EJS
- **Styling**: Pure CSS with CSS Variables
- **Fonts**: Google Fonts (Inter)
- **Icons**: SVG icons

## 📝 Notes

- This is a **UI-only** project
- No JavaScript for UI logic
- No backend database integration (yet)
- All routes are in `app.js` (no separate routes folder)
- No controllers

## 🔮 Future Enhancements

- Add backend database (MongoDB/PostgreSQL)
- Implement CRUD operations
- Add user authentication
- Make search bar functional
- Add note categories/tags

## 📄 License

ISC

## 👨‍💻 Author

Created with ❤️ for learning purposes

---

**Enjoy using Note App! 🎉**
