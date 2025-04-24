// Gallery and Lightbox Functionality
document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
});

function initLightbox() {
  const portfolioLinks = document.querySelectorAll('.portfolio-link');
  const lightbox = document.querySelector('.portfolio-lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxDescription = document.querySelector('.lightbox-description');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentIndex = 0;
  const items = [];
  
  // Collect all portfolio items data
  portfolioLinks.forEach((link, index) => {
    items.push({
      img: link.getAttribute('data-img'),
      title: link.getAttribute('data-title'),
      description: link.getAttribute('data-description')
    });
    
    // Open lightbox when clicking on a portfolio item
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      openLightbox();
    });
  });
  
  // Open lightbox function
  function openLightbox() {
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  // Close lightbox
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  });
  
  // Navigate to previous item
  lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
    updateLightboxContent();
  });
  
  // Navigate to next item
  lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
    updateLightboxContent();
  });
  
  // Update lightbox content based on current index
  function updateLightboxContent() {
    const item = items[currentIndex];
    
    // Fade effect
    lightboxImg.style.opacity = 0;
    
    setTimeout(() => {
      lightboxImg.src = item.img;
      lightboxTitle.textContent = item.title;
      lightboxDescription.textContent = item.description;
      
      // Fade in after image is loaded
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = 1;
      };
    }, 300);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
      updateLightboxContent();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
      updateLightboxContent();
    }
  });
  
  // Click outside to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}