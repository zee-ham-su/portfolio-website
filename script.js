// Wait for DOM content to load before running the script
document.addEventListener("DOMContentLoaded", function() {
  // Show body content with fade-in effect once loaded
  document.body.classList.add("loaded");
  
  // Toggle hamburger menu
  function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

  // Make toggleMenu function globally accessible
  window.toggleMenu = toggleMenu;

  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check if user has previously set a preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  } else if (currentTheme === 'light') {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
  } else if (prefersDarkScheme.matches) {
    // If user prefers dark mode in system settings
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
  
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    let theme = 'light';
    
    if (document.body.classList.contains('dark-mode')) {
      theme = 'dark';
      this.textContent = '☀️';
      this.classList.add('rotate');
    } else {
      this.textContent = '🌙';
      this.classList.remove('rotate');
    }
    
    localStorage.setItem('theme', theme);
  });

  // Letter-by-letter animation for name
  const animateName = () => {
    const nameElement = document.getElementById('animated-name');
    if (!nameElement) return;
    
    const nameText = nameElement.textContent;
    nameElement.innerHTML = '';
    nameElement.style.opacity = '1';
    
    [...nameText].forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      span.style.transition = `opacity 0.3s ease ${index * 0.07}s, transform 0.3s ease ${index * 0.07}s`;
      
      nameElement.appendChild(span);
      
      // Trigger reflow to enable animation
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 50);
    });
  };
  
  // Run name animation after a short delay
  setTimeout(animateName, 500);

  // Project search functionality
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("keyup", function() {
      const searchTerm = searchBar.value.toLowerCase();
      const projects = document.querySelectorAll("#projects .details-container");
      
      projects.forEach(project => {
        const title = project.querySelector(".project-title").textContent.toLowerCase();
        if (title.indexOf(searchTerm) > -1) {
          project.style.display = "";
        } else {
          project.style.display = "none";
        }
      });
    });
  }

  // Scroll to top button functionality
  const scrollToTopButton = document.getElementById("scrollToTop");
  
  window.addEventListener("scroll", function() {
    if (window.scrollY > 500) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  });

  scrollToTopButton.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Add smooth scroll behavior to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced animation when elements come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.details-container, .certification, .blog-post, .text-container, .profile-badge');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      // Check if element is in viewport
      if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
        element.classList.add('animate');
      }
    });
  };

  // Add CSS class for animated elements
  const style = document.createElement('style');
  style.innerHTML = `
    .details-container, .certification, .blog-post, .text-container, .profile-badge {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .details-container.animate, .certification.animate, .blog-post.animate, .text-container.animate, .profile-badge.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Staggered animations for child elements */
    .details-container.animate:nth-child(1) { transition-delay: 0.1s; }
    .details-container.animate:nth-child(2) { transition-delay: 0.2s; }
    .details-container.animate:nth-child(3) { transition-delay: 0.3s; }
    .profile-badge.animate:nth-child(1) { transition-delay: 0.1s; }
    .profile-badge.animate:nth-child(2) { transition-delay: 0.2s; }
    .profile-badge.animate:nth-child(3) { transition-delay: 0.3s; }
  `;
  document.head.appendChild(style);

  // Run animation check on load and scroll
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Run animation check once on page load
  animateOnScroll();

  // Add button hover effects that follow mouse position
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      button.style.setProperty('--x', x + 'px');
      button.style.setProperty('--y', y + 'px');
    });
  });
});