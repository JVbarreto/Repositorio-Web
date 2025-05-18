// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    const icon = themeToggle.querySelector('i');
    icon.className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Save theme preference
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.dataset.theme = savedTheme;
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Form Validation and Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    let isValid = true;
    const errors = {};
    
    if (!data.name || data.name.length < 2) {
        errors.name = 'Nome deve ter pelo menos 2 caracteres';
        isValid = false;
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Email inválido';
        isValid = false;
    }
    
    if (!data.message || data.message.length < 10) {
        errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
        isValid = false;
    }
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    if (!isValid) {
        // Display error messages
        Object.entries(errors).forEach(([field, message]) => {
            const input = document.getElementById(field);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentNode.appendChild(errorDiv);
        });
        return;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll just log it and show a success message
    console.log('Form data:', data);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Mensagem enviada com sucesso!';
    contactForm.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}); 