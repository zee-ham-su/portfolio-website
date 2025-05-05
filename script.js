function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Add smooth page transitions
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

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

    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load dark mode preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        toggleDarkMode();
    }
});

// Add event listener to the toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);

// Highlight active section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll to Top Button
const scrollToTopButton = document.getElementById('scrollToTop');

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
};

scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Project Filter/Search
const searchBar = document.getElementById('searchBar');
const projectTitles = document.querySelectorAll('.project-title');
const projectContainers = document.querySelectorAll('.details-container');

searchBar.addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    projectTitles.forEach((title, index) => {
        const container = projectContainers[index];
        if (title.textContent.toLowerCase().includes(searchText)) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
});