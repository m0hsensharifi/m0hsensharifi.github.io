
const html = document.documentElement;
const themeButton = document.getElementById("theme-toggle");

// Read saved theme
const savedTheme = localStorage.getItem("portfolio-theme");

// Default theme: Dark
html.setAttribute("data-theme", savedTheme || "dark");

// Update button text
function updateThemeButton() {
    const currentTheme = html.getAttribute("data-theme");

    themeButton.textContent =
        currentTheme === "dark" ? "☀️ Light" : "🌙 Dark";
}

// Toggle theme
themeButton.addEventListener("click", function () {

    const currentTheme = html.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);

    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeButton();
});

// Initialize button
updateThemeButton();
