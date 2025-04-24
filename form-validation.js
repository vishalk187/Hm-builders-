// Form Validation
document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
});

function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  // Form fields
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  
  // Error messages
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');
  
  // Success message container
  const formSuccess = document.getElementById('form-success');
  const newMessageBtn = document.getElementById('new-message');
  
  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[\d\s\-\(\)]+$/;
  
  // Add input event listeners for real-time validation
  if (nameInput) {
    nameInput.addEventListener('input', () => validateInput(nameInput, nameError, 'Please enter your name'));
  }
  
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
      } else {
        hideError(emailInput, emailError);
      }
    });
  }
  
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (!phonePattern.test(phoneInput.value)) {
        showError(phoneInput, phoneError, 'Please enter a valid phone number');
      } else {
        hideError(phoneInput, phoneError);
      }
    });
  }
  
  if (subjectInput) {
    subjectInput.addEventListener('input', () => validateInput(subjectInput, subjectError, 'Please enter a subject'));
  }
  
  if (messageInput) {
    messageInput.addEventListener('input', () => validateInput(messageInput, messageError, 'Please enter your message'));
  }
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    isValid = validateInput(nameInput, nameError, 'Please enter your name') && isValid;
    
    if (!emailPattern.test(emailInput.value)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      isValid = false;
    } else {
      hideError(emailInput, emailError);
    }
    
    if (!phonePattern.test(phoneInput.value)) {
      showError(phoneInput, phoneError, 'Please enter a valid phone number');
      isValid = false;
    } else {
      hideError(phoneInput, phoneError);
    }
    
    isValid = validateInput(subjectInput, subjectError, 'Please enter a subject') && isValid;
    isValid = validateInput(messageInput, messageError, 'Please enter your message') && isValid;
    
    if (isValid) {
      // Store form data in local storage
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
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
      
      // Confetti effect for fun
      createConfetti();
    }
  });
  
  // Reset form and hide success message
  if (newMessageBtn) {
    newMessageBtn.addEventListener('click', () => {
      formSuccess.classList.remove('active');
    });
  }
  
  // Helper functions
  function validateInput(input, errorElement, errorMessage) {
    if (!input.value.trim()) {
      showError(input, errorElement, errorMessage);
      return false;
    } else {
      hideError(input, errorElement);
      return true;
    }
  }
  
  function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('active');
    
    // Shake effect
    input.style.animation = 'none';
    setTimeout(() => {
      input.style.animation = 'shake 0.5s';
    }, 10);
  }
  
  function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.classList.remove('active');
  }
  
  // Fun confetti effect on successful form submission
  function createConfetti() {
    const confettiCount = 100;
    const container = document.querySelector('.form-success');
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 5 + 3}px`;
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.borderRadius = '2px';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '0';
      confetti.style.opacity = '0';
      confetti.style.transform = 'translateY(-100px)';
      confetti.style.animation = `confetti ${Math.random() * 2 + 1}s forwards ${Math.random() * 0.5}s`;
      
      container.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }
  
  function getRandomColor() {
    const colors = ['#e67e22', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Add confetti animation to stylesheet
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes confetti {
      0% {
        transform: translateY(-100px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg);
        opacity: 0;
      }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
}