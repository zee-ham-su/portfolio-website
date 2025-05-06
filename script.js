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

  // Add animation when elements come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.details-container, .certification, .blog-post, .text-container');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      // Check if element is in viewport
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add('animate');
      }
    });
  };

  // Add CSS class for animated elements
  const style = document.createElement('style');
  style.innerHTML = `
    .details-container, .certification, .blog-post, .text-container {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .details-container.animate, .certification.animate, .blog-post.animate, .text-container.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Run animation check on load and scroll
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Run animation check once on page load
  animateOnScroll();
});