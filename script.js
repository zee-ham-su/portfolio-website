function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Add a toggle button for dark mode
const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
darkModeToggle.textContent = 'Toggle Dark Mode';
document.body.appendChild(darkModeToggle);

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('nav, .details-container, .btn').forEach((el) => {
        el.classList.toggle('dark-mode');
    });
    darkModeToggle.classList.toggle('dark-mode');
}

// Add event listener to the toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);