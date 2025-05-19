// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Mobile Menu Toggle with Accessibility
function toggleMenu() {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    if (!isExpanded) {
        // Focus first menu item when opening
        navMenu.querySelector('a').focus();
    }
}

function closeMenu() {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
    }
});

// Theme Toggle with Accessibility and Animation
function toggleTheme() {
    const isDark = document.body.dataset.theme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    
    const icon = themeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    
    // Announce theme change to screen readers
    const message = `Tema alterado para ${isDark ? 'claro' : 'escuro'}`;
    announceToScreenReader(message);
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.dataset.theme = savedTheme;
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Back to Top Button with Smooth Scroll and Accessibility
function toggleBackToTop() {
    const isVisible = window.scrollY > 300;
    backToTopBtn.classList.toggle('visible', isVisible);
    backToTopBtn.setAttribute('aria-hidden', !isVisible);
}

window.addEventListener('scroll', toggleBackToTop);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // Focus on first focusable element
    document.querySelector('a, button, input, [tabindex="0"]').focus();
});

// Enhanced Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Set focus to the target section
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            closeMenu();
        }
    });
});

// Improved Scroll Reveal Animation with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optionally unobserve after animation
            // revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// Enhanced Typed.js Effect
if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
        strings: [
            'Desenvolvedor Full Stack em formação',
            'Estudante de ADS',
            'Apaixonado por tecnologia'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        // Accessibility improvements
        contentType: 'html',
        cursorChar: '|',
        attr: 'aria-label'
    });
}

// Enhanced Project Filter with Animation and Accessibility
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

function filterProjects(filter) {
    const message = `Mostrando projetos ${filter === 'all' ? 'todos' : 'da categoria ' + filter}`;
    announceToScreenReader(message);
    
    projectItems.forEach(item => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.style.display = matches ? 'block' : 'none';
        item.setAttribute('aria-hidden', !matches);
        
        if (matches) {
            setTimeout(() => item.classList.add('show'), 10);
        } else {
            item.classList.remove('show');
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button state
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        
        filterProjects(filter);
    });
});

// Enhanced Form Validation with Accessibility
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    const wrapper = input.parentElement;
    
    input.addEventListener('focus', () => {
        wrapper.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            wrapper.classList.remove('focused');
        }
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    const wrapper = input.parentElement;
    let isValid = true;
    let errorMessage = '';
    
    switch (input.id) {
        case 'name':
            if (input.value.length < 2) {
                isValid = false;
                errorMessage = 'Nome deve ter pelo menos 2 caracteres';
            }
            break;
            
        case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                isValid = false;
                errorMessage = 'Email inválido';
            }
            break;
            
        case 'message':
            if (input.value.length < 10) {
                isValid = false;
                errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
            }
            break;
    }
    
    updateInputValidationState(input, isValid, errorMessage);
    return isValid;
}

function updateInputValidationState(input, isValid, errorMessage) {
    const wrapper = input.parentElement;
    const existingError = wrapper.querySelector('.error-message');
    
    input.setAttribute('aria-invalid', !isValid);
    
    if (!isValid) {
        input.classList.add('invalid');
        
        if (!existingError) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.setAttribute('role', 'alert');
            error.id = `${input.id}-error`;
            error.textContent = errorMessage;
            wrapper.appendChild(error);
            input.setAttribute('aria-describedby', error.id);
        } else {
            existingError.textContent = errorMessage;
        }
    } else {
        input.classList.remove('invalid');
        input.removeAttribute('aria-describedby');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Screen Reader Announcements
function announceToScreenReader(message) {
    let announcement = document.getElementById('sr-announcement');
    if (!announcement) {
        announcement = document.createElement('div');
        announcement.id = 'sr-announcement';
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.position = 'absolute';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.padding = '0';
        announcement.style.margin = '-1px';
        announcement.style.overflow = 'hidden';
        announcement.style.clip = 'rect(0, 0, 0, 0)';
        announcement.style.whiteSpace = 'nowrap';
        announcement.style.border = '0';
        document.body.appendChild(announcement);
    }
    announcement.textContent = message;
}

// Enhanced Form Submission with Loading State
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all inputs
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
            input.focus();
        }
    });
    
    if (!isValid) {
        announceToScreenReader('Por favor, corrija os erros no formulário');
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        announceToScreenReader('Mensagem enviada com sucesso!');
        contactForm.reset();
        
        // Reset form state
        formInputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
        
    } catch (error) {
        announceToScreenReader('Erro ao enviar mensagem. Por favor, tente novamente.');
        console.error('Form submission error:', error);
        
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
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