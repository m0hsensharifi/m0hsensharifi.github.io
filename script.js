
const html = document.documentElement;
const themeButton = document.getElementById("theme-toggle");

// =========================
// THEME
// =========================

const savedTheme = localStorage.getItem("portfolio-theme");

html.setAttribute("data-theme", savedTheme || "dark");

function updateThemeButton() {
    const currentTheme = html.getAttribute("data-theme");

    themeButton.textContent =
        currentTheme === "dark" ? "☀️ Light" : "🌙 Dark";
}

themeButton.addEventListener("click", function () {
    const currentTheme = html.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeButton();
});

updateThemeButton();

// =========================
// PROFILE PHOTO
// =========================

const photoInput = document.getElementById("photo-upload");
const profileImage = document.getElementById("profile-image");
const profilePlaceholder = document.getElementById("profile-placeholder");

function showProfileImage(source) {
    profileImage.onload = function () {
        profileImage.classList.add("visible");
        profilePlaceholder.classList.add("hidden");
    };

    profileImage.onerror = function () {
        profileImage.classList.remove("visible");
        profilePlaceholder.classList.remove("hidden");
    };

    profileImage.src = source;
}

// Load public profile photo from repository
showProfileImage("profile.jpg");

// Preview a photo selected from the computer
photoInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        showProfileImage(e.target.result);
    };

    reader.readAsDataURL(file);
});
