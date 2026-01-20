// Immediate theme application to prevent flash (runs as soon as script is loaded in head)
(function() {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode. Only apply light-theme if explicitly set to 'light'
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
    } else {
        document.documentElement.classList.remove('light-theme');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;

    // Sync UI state with applied theme
    // We treat "no theme" as "dark" (default)
    const isLight = document.documentElement.classList.contains('light-theme');
    
    if (isLight) {
        body.classList.add('light-theme');
        if (themeToggle) themeToggle.checked = false; // Unchecked for light mode
        if (themeIcon) themeIcon.textContent = '🌙';
    } else {
        body.classList.remove('light-theme');
        if (themeToggle) themeToggle.checked = true; // Checked for dark mode
        if (themeIcon) themeIcon.textContent = '☀️';
    }

    // Toggle theme functionality
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                // Switch to Dark Mode
                document.documentElement.classList.remove('light-theme');
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.textContent = '☀️';
            } else {
                // Switch to Light Mode
                document.documentElement.classList.add('light-theme');
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.textContent = '🌙';
            }
        });
    }
});
