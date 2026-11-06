
const photoInput = document.getElementById("photo-input");
const uploadTrigger = document.getElementById("upload-trigger");
const profileImage = document.getElementById("profile-image");
const avatarPlaceholder = document.getElementById("avatar-placeholder");
const themeToggle = document.getElementById("theme-toggle");

uploadTrigger.addEventListener("click", () => photoInput.click());

function showPhoto(data) {
  profileImage.src = data;
  profileImage.hidden = false;
  avatarPlaceholder.hidden = true;
}

const savedPhoto = localStorage.getItem("portfolioPhoto");
if (savedPhoto) showPhoto(savedPhoto);

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Please choose an image smaller than 2 MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      localStorage.setItem("portfolioPhoto", reader.result);
      showPhoto(reader.result);
    } catch {
      alert("The image could not be saved. Please choose a smaller image.");
    }
  };
  reader.readAsDataURL(file);
});

const savedTheme = localStorage.getItem("portfolioTheme");
if (savedTheme === "light") document.body.classList.add("light");

function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains("light") ? "☾" : "☀";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("portfolioTheme", theme);
  updateThemeIcon();
});

const commandForm = document.getElementById("command-form");
const commandInput = document.getElementById("command-input");
const commandOutput = document.getElementById("command-output");

const commands = {
  help: "Available commands:\nwhoami  - About me\nskills   - Technical areas\nexperience - Work experience\ncontact  - Contact links\ndate     - Current year\nclear    - Clear terminal",
  whoami: "Mohsen Sharifi\nJunior DevOps & Infrastructure Engineer",
  skills: "Linux | Infrastructure Operations | Monitoring | Zabbix | Splunk | Networking | DevOps",
  experience: "Professional experience details will be added soon.",
  contact: "LinkedIn: linkedin.com/in/m0hsensharifi/\nGitHub: github.com/m0hsensharifi",
  date: "2026"
};

commandForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const command = commandInput.value.trim().toLowerCase();
  if (!command) return;

  if (command === "clear") {
    commandOutput.textContent = "";
  } else {
    commandOutput.textContent = commands[command] || `Command not found: ${command}\nType help to see available commands.`;
  }

  commandInput.value = "";
});
