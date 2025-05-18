// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = mobileMenu.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navMenu.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

const handleScroll = () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
};

window.addEventListener('scroll', handleScroll);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

const errorMessages = {
    name: {
        valueMissing: 'Por favor, insira seu nome',
        tooShort: 'O nome deve ter pelo menos 2 caracteres',
        tooLong: 'O nome não pode ter mais de 50 caracteres'
    },
    email: {
        valueMissing: 'Por favor, insira seu email',
        typeMismatch: 'Por favor, insira um email válido',
        patternMismatch: 'Por favor, insira um email válido'
    },
    message: {
        valueMissing: 'Por favor, insira sua mensagem',
        tooShort: 'A mensagem deve ter pelo menos 10 caracteres',
        tooLong: 'A mensagem não pode ter mais de 500 caracteres'
    }
};

const validateInput = (input) => {
    const errorElement = document.getElementById(`${input.id}-error`);
    
    if (!input.validity.valid) {
        let message = '';
        for (const key in input.validity) {
            if (input.validity[key] && key !== 'valid') {
                message = errorMessages[input.id][key];
                break;
            }
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        return true;
    }
};

formInputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => validateInput(input));
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (!isValid) return;

    const button = contactForm.querySelector('button');
    button.classList.add('loading');
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form Data:', formData);
        
        // Show success message
        button.classList.remove('loading');
        button.classList.add('success');
        button.querySelector('.button-text').textContent = 'Mensagem Enviada!';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.classList.remove('success');
            button.querySelector('.button-text').textContent = 'Enviar Mensagem';
        }, 3000);
        
    } catch (error) {
        console.error('Error:', error);
        button.classList.remove('loading');
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    }
});

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.experience-item, .skill-category, .project-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial check
revealOnScroll();

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);

// Add hover effect for project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Theme Toggle Implementation
const initTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
}

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize theme
initTheme();

// Add event listener to theme toggle button
document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

// Update theme icon on load
const themeIcon = document.querySelector('.theme-toggle i');
themeIcon.className = document.documentElement.getAttribute('data-theme') === 'light' ? 'fas fa-moon' : 'fas fa-sun';
