// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initPreloader();
  initMobileMenu();
  initScrollEffects();
  initCustomCursor();
  initThemeToggle();
  initServices();
  initTestimonials();
  initPortfolio();
  initMap();
  initContactForm();
  initLazyLoading();
});

// Preloader
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  
  window.addEventListener('load', () => {
    document.body.classList.add('loading');
    
    setTimeout(() => {
      preloader.classList.add('hide');
      document.body.classList.remove('loading');
    }, 1500);
  });
}

// Mobile Menu
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });
  
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

// Scroll Effects
function initScrollEffects() {
  const header = document.querySelector('.header');
  const backToTop = document.querySelector('.back-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      backToTop.classList.add('active');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('active');
    }
    
    // Highlight active nav link
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Back to top button
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Scroll animations using Intersection Observer
  const fadeElements = document.querySelectorAll('.about-content, .services-grid, .portfolio-grid, .contact-content');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  // Parallax effect
  const parallaxElements = document.querySelectorAll('[data-parallax="true"]');
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.1;
      const yPos = window.scrollY * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Custom Cursor
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const links = document.querySelectorAll('a, button, .service-card, .portfolio-item');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.classList.add('active');
  });
  
  document.addEventListener('mouseout', () => {
    cursor.classList.remove('active');
  });
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('expand');
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('expand');
    });
  });
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use OS preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save theme preference
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// Services Section
function initServices() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceType = card.getAttribute('data-service');
      // Additional functionality can be added here
    });
  });
}

// Testimonials Slider
function initTestimonials() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const cards = document.querySelectorAll('.testimonial-card');
  let currentIndex = 0;
  const cardWidth = 100; // 100%
  
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });
  
  // Arrow navigation
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
    updateSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  });
  
  // Auto slide
  setInterval(() => {
    currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  }, 5000);
}

// Portfolio Filter and Lightbox
function initPortfolio() {
  // Portfolio filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Initialize portfolio with "all" filter
  document.querySelector('.filter-btn[data-filter="all"]').click();
}

// Map Initialization
function initMap() {
  if (typeof L !== 'undefined') {
    const map = L.map('map').setView([40.712776, -74.005974], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([40.712776, -74.005974]).addTo(map)
      .bindPopup('BuildMaster Headquarters')
      .openPopup();
  }
}

// Contact Form Validation
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const newMessageBtn = document.getElementById('new-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        // Store form data in local storage
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value,
          date: new Date().toISOString()
        };
        
        // Save to local storage
        const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
        inquiries.push(formData);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        
        // Show success message
        formSuccess.classList.add('active');
        
        // Reset form
        contactForm.reset();
      }
    });
    
    newMessageBtn.addEventListener('click', () => {
      formSuccess.classList.remove('active');
    });
  }
  
  // Download brochure link
  const downloadBtn = document.getElementById('download-brochure');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('In a real website, this would download a PDF brochure. This is a demo functionality.');
    });
  }
}

// Form Validation
function validateForm() {
  let isValid = true;
  
  // Name validation
  const name = document.getElementById('name');
  const nameError = document.getElementById('name-error');
  
  if (name.value.trim() === '') {
    name.classList.add('error');
    nameError.textContent = 'Please enter your name';
    nameError.classList.add('active');
    isValid = false;
  } else {
    name.classList.remove('error');
    nameError.classList.remove('active');
  }
  
  // Email validation
  const email = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(email.value)) {
    email.classList.add('error');
    emailError.textContent = 'Please enter a valid email address';
    emailError.classList.add('active');
    isValid = false;
  } else {
    email.classList.remove('error');
    emailError.classList.remove('active');
  }
  
  // Phone validation
  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phone-error');
  const phonePattern = /^[\d\s\-\(\)]+$/;
  
  if (!phonePattern.test(phone.value)) {
    phone.classList.add('error');
    phoneError.textContent = 'Please enter a valid phone number';
    phoneError.classList.add('active');
    isValid = false;
  } else {
    phone.classList.remove('error');
    phoneError.classList.remove('active');
  }
  
  // Subject validation
  const subject = document.getElementById('subject');
  const subjectError = document.getElementById('subject-error');
  
  if (subject.value.trim() === '') {
    subject.classList.add('error');
    subjectError.textContent = 'Please enter a subject';
    subjectError.classList.add('active');
    isValid = false;
  } else {
    subject.classList.remove('error');
    subjectError.classList.remove('active');
  }
  
  // Message validation
  const message = document.getElementById('message');
  const messageError = document.getElementById('message-error');
  
  if (message.value.trim() === '') {
    message.classList.add('error');
    messageError.textContent = 'Please enter your message';
    messageError.classList.add('active');
    isValid = false;
  } else {
    message.classList.remove('error');
    messageError.classList.remove('active');
  }
  
  return isValid;
}

// Lazy Loading Images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy-load');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger load
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without Intersection Observer
    lazyImages.forEach(img => {
      img.classList.add('loaded');
    });
  }
}