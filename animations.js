// Animations and Effects
document.addEventListener('DOMContentLoaded', () => {
  initSectionAnimations();
  initServiceCardAnimations();
  initPortfolioHoverEffects();
});

// Section animations using Intersection Observer
function initSectionAnimations() {
  // Elements to observe
  const sectionHeaders = document.querySelectorAll('.section-header');
  const fadeElements = document.querySelectorAll('.about-features, .service-card, .testimonial-card, .contact-form-container, .contact-info');
  const slideElements = document.querySelectorAll('.about-image, .portfolio-item');
  
  // Create observers
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Add delay for staggered animation effect
        if (entry.target.classList.contains('service-card')) {
          const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Add delay for staggered animation effect
        if (entry.target.classList.contains('portfolio-item')) {
          const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
        slideObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe elements
  sectionHeaders.forEach(header => {
    headerObserver.observe(header);
  });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  slideElements.forEach(element => {
    slideObserver.observe(element);
  });
}

// Service card hover animations
function initServiceCardAnimations() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const serviceIcon = card.querySelector('.service-icon');
      
      // Animate icon on hover
      serviceIcon.style.transform = 'scale(1.1) rotate(5deg)';
      setTimeout(() => {
        serviceIcon.style.transform = '';
      }, 300);
    });
  });
}

// Portfolio hover effects
function initPortfolioHoverEffects() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    const img = item.querySelector('img');
    const info = item.querySelector('.portfolio-info');
    
    // Add tilt effect on hover
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
    
    // Reset on mouse leave
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
}

// 3D Parallax Scroll Effect
function initParallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Apply parallax to various elements
    document.querySelectorAll('[data-parallax]').forEach(element => {
      const depth = element.getAttribute('data-depth') || 0.2;
      const movement = -(scrollPosition * depth);
      element.style.transform = `translate3d(0, ${movement}px, 0)`;
    });
  });
}

// Text Animation for Hero Section
function animateHeroText() {
  const heroTitle = document.querySelector('.hero h1');
  const heroText = document.querySelector('.hero p');
  const heroCta = document.querySelector('.hero-cta');
  
  if (heroTitle && heroText && heroCta) {
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          heroCta.style.opacity = '1';
          heroCta.style.transform = 'translateY(0)';
        }, 300);
      }, 300);
    }, 500);
  }
}

// Initialize extra animations
document.addEventListener('DOMContentLoaded', () => {
  initParallaxEffect();
  animateHeroText();
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
      button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
      button.style.boxShadow = '';
    });
  });
});