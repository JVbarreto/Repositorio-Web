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
if (backToTopBtn) {
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
        const firstFocusable = document.querySelector('a, button, input, [tabindex="0"]');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    });
}

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

// GitHub Projects Configuration
const GITHUB_USERNAME = 'JVbarreto';
const EXCLUDED_REPOS = ['Repositorio-Web', 'Presentinho-Sussu']; // Excluir o próprio portfólio e presentinho
// Token de autenticação (opcional - necessário apenas para evitar rate limit)
// Para usar um token, defina via variável de ambiente ou configure via servidor
// Gere um token em: https://github.com/settings/tokens
// NOTA: NUNCA commite tokens no código! Use variáveis de ambiente ou um backend proxy.
const GITHUB_TOKEN = undefined; // Token removido por segurança - a API funciona sem token para repositórios públicos
// Repositórios que sempre devem aparecer (mesmo se forem privados ou forks)
const FORCE_SHOW_REPOS = ['wa-team-talk'];

// Mapeamento de linguagens para categorias
const languageCategoryMap = {
    'HTML': 'web',
    'CSS': 'web',
    'JavaScript': 'web',
    'TypeScript': 'web',
    'Python': 'python',
    'Java': 'java'
};

// Função para determinar a categoria do projeto
function getProjectCategory(languages, topics) {
    // Verificar se há tópicos que indiquem categoria
    if (topics && topics.length > 0) {
        const topicLower = topics.join(' ').toLowerCase();
        if (topicLower.includes('python')) return 'python';
        if (topicLower.includes('java')) return 'java';
        if (topicLower.includes('web') || topicLower.includes('frontend') || topicLower.includes('html')) return 'web';
    }
    
    // Verificar linguagem principal
    if (languages && Object.keys(languages).length > 0) {
        const mainLanguage = Object.keys(languages)[0];
        return languageCategoryMap[mainLanguage] || 'web';
    }
    
    return 'web';
}

// Função para obter tecnologias do projeto
function getProjectTechnologies(languages, topics) {
    const techs = new Set();
    
    if (languages) {
        Object.keys(languages).forEach(lang => {
            if (lang === 'HTML') techs.add('HTML');
            else if (lang === 'CSS') techs.add('CSS');
            else if (lang === 'JavaScript') techs.add('JavaScript');
            else if (lang === 'TypeScript') techs.add('TypeScript');
            else if (lang === 'Python') techs.add('Python');
            else if (lang === 'Java') techs.add('Java');
            else if (lang === 'Shell') techs.add('Shell');
        });
    }
    
    // Adicionar tecnologias comuns baseadas em tópicos
    if (topics) {
        topics.forEach(topic => {
            const topicLower = topic.toLowerCase();
            if (topicLower.includes('api')) techs.add('API REST');
            if (topicLower.includes('react')) techs.add('React');
            if (topicLower.includes('node')) techs.add('Node.js');
            if (topicLower.includes('sql')) techs.add('SQL');
            if (topicLower.includes('mongodb')) techs.add('MongoDB');
            if (topicLower.includes('google-maps')) techs.add('Google Maps API');
        });
    }
    
    return Array.from(techs);
}

// Função para obter linguagem principal do repositório
function getMainLanguage(languages) {
    if (!languages || Object.keys(languages).length === 0) {
        return null;
    }
    
    // Ordenar linguagens por quantidade de código
    const sortedLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1]);
    
    return sortedLanguages[0][0]; // Retornar a linguagem principal
}

// Função para criar card de projeto
function createProjectCard(repo) {
    // Usar language do repo ou buscar da propriedade languages
    const repoLanguage = repo.language || getMainLanguage(repo.languages);
    const languagesObj = repo.languages || (repoLanguage ? { [repoLanguage]: 1 } : {});
    
    const category = getProjectCategory(languagesObj, repo.topics || []);
    const technologies = getProjectTechnologies(languagesObj, repo.topics || []);
    
    // Criar descrição se não houver
    const description = repo.description || 'Projeto desenvolvido com tecnologias modernas.';
    
    // Formatar nome do projeto
    const projectName = repo.name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    
    const projectCard = document.createElement('article');
    projectCard.className = 'project-item card reveal';
    projectCard.dataset.category = category;
    
    // Tecnologias HTML - adicionar linguagem principal se não estiver na lista
    if (repoLanguage && !technologies.includes(repoLanguage)) {
        technologies.unshift(repoLanguage);
    }
    
    const techHTML = technologies.length > 0 
        ? technologies.slice(0, 5).map(tech => `<span role="listitem">${tech}</span>`).join('')
        : '<span role="listitem">Projeto</span>';
    
    // Link para demo se houver homepage
    const demoLink = repo.homepage 
        ? `<a href="${repo.homepage}" 
                   target="_blank" 
                   class="btn btn-primary"
                   rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Demo
                </a>`
        : '';
    
    projectCard.innerHTML = `
        <div class="project-content">
            <h3>${projectName}</h3>
            <p>${description}</p>
            <div class="project-tech" role="list">
                ${techHTML}
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" 
                   target="_blank" 
                   class="btn btn-secondary"
                   rel="noopener noreferrer">
                    <i class="fab fa-github"></i> Código
                </a>
                ${demoLink}
            </div>
        </div>
    `;
    
    return projectCard;
}

// Função para buscar repositórios do GitHub
async function fetchGitHubProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    try {
        // Mostrar loading
        projectsGrid.innerHTML = '<div class="loading-projects"><i class="fas fa-spinner fa-spin"></i><p>Carregando projetos do GitHub...</p></div>';
        
        console.log("🔄 Iniciando carregamento de projetos para:", GITHUB_USERNAME);
        
        // Buscar repositórios públicos
        const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=all`;
        console.log("📍 URL da API:", url);
        
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        // Adicionar token se disponível
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
            console.log("🔑 Token de autenticação adicionado");
        }
        
        const response = await fetch(url, { headers });
        console.log("📊 Status da resposta:", response.status);
        
        if (!response.ok) {
            if (response.status === 403) {
                console.error('❌ Rate limit da API do GitHub excedido. Tente novamente mais tarde.');
                throw new Error('Rate limit da API do GitHub excedido. Tente novamente mais tarde.');
            }
            throw new Error(`Erro ao buscar repositórios: ${response.status}`);
        }
        
        const repos = await response.json();
        console.log("✅ Repositórios obtidos da API:", repos.length);
        console.log("📋 Detalhes dos repositórios:", repos);
        
        // Listar TODOS os repositórios com seus nomes exatos
        console.log("📚 LISTA COMPLETA DE REPOSITÓRIOS:");
        repos.forEach((repo, index) => {
            console.log(`  ${index + 1}. ${repo.name} (Private: ${repo.private}, Fork: ${repo.fork})`);
        });
        
        // Filtrar repositórios excluídos, apenas públicos e não forks
        const filteredRepos = repos.filter(repo => {
            // Se está na lista de força, sempre mostrar
            if (FORCE_SHOW_REPOS.includes(repo.name)) {
                console.log(`✅ ${repo.name}: Forçado a aparecer`);
                return true;
            }
            
            const isNotFork = !repo.fork;
            const isNotExcluded = !EXCLUDED_REPOS.includes(repo.name);
            const isPublic = !repo.private;
            
            console.log(`📦 ${repo.name}: Fork=${repo.fork}, Excluded=${EXCLUDED_REPOS.includes(repo.name)}, Private=${repo.private}`);
            
            return isNotFork && isNotExcluded && isPublic;
        }).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        
        console.log(`🎯 Repositórios após filtros: ${filteredRepos.length}`);
        console.log("📂 Repos filtrados:", filteredRepos);
        
        // Mostrar quais foram excluídos
        const excludedRepos = repos.filter(repo => 
            !FORCE_SHOW_REPOS.includes(repo.name) && (
                repo.fork || 
                EXCLUDED_REPOS.includes(repo.name) ||
                repo.private
            )
        );
        if (excludedRepos.length > 0) {
            console.log(`⛔ Repositórios excluídos (${excludedRepos.length}):`);
            excludedRepos.forEach(r => {
                const reason = [];
                if (r.fork) reason.push("Fork");
                if (r.private) reason.push("Privado");
                if (EXCLUDED_REPOS.includes(r.name)) reason.push("Na lista de exclusão");
                console.log(`   - ${r.name}: ${reason.join(", ")}`);
            });
        }
        
        // Buscar informações detalhadas de linguagens para cada repositório
        // Limitar a 10 requisições simultâneas para evitar rate limiting
        const reposWithLanguages = [];
        const batchSize = 10;
        
        for (let i = 0; i < filteredRepos.length; i += batchSize) {
            const batch = filteredRepos.slice(i, i + batchSize);
            const batchResults = await Promise.all(
                batch.map(async (repo) => {
                    try {
                        const langHeaders = {
                            'Accept': 'application/vnd.github.v3+json'
                        };
                        if (GITHUB_TOKEN) {
                            langHeaders['Authorization'] = `token ${GITHUB_TOKEN}`;
                        }
                        
                        const langResponse = await fetch(repo.languages_url, { headers: langHeaders });
                        if (langResponse.ok) {
                            const languages = await langResponse.json();
                            return { ...repo, languages };
                        } else if (langResponse.status === 403) {
                            console.warn(`Rate limit ao buscar linguagens para ${repo.name}`);
                            return repo;
                        }
                    } catch (error) {
                        console.error(`Erro ao buscar linguagens para ${repo.name}:`, error);
                    }
                    return repo;
                })
            );
            reposWithLanguages.push(...batchResults);
            
            // Pequeno delay entre batches para evitar rate limiting
            if (i + batchSize < filteredRepos.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        
        // Limpar grid
        projectsGrid.innerHTML = '';
        
        // Se não houver projetos, mostrar mensagem
        if (reposWithLanguages.length === 0) {
            console.warn('⚠️ Nenhum projeto encontrado após o carregamento.');
            projectsGrid.innerHTML = '<div class="error-message"><p>Nenhum projeto encontrado.</p></div>';
            return;
        }
        
        console.log(`🎨 Criando ${reposWithLanguages.length} cards de projeto`);
        
        // Criar cards para cada repositório
        reposWithLanguages.forEach((repo, index) => {
            try {
                const projectCard = createProjectCard(repo);
                projectCard.classList.add('show'); // Adicionar classe ANTES de inserir no DOM
                projectCard.style.display = 'block'; // Garantir que não está escondido
                projectCard.style.opacity = '1'; // Garantir opacidade
                projectCard.style.pointerEvents = 'auto'; // Garantir que é clicável
                projectsGrid.appendChild(projectCard);
                console.log(`✨ Card ${index + 1} criado e inserido:`, repo.name, projectCard);
            } catch (error) {
                console.error(`❌ Erro ao criar card para ${repo.name}:`, error);
            }
        });
        
        // Re-aplicar observer para animações
        document.querySelectorAll('.projects-grid .reveal').forEach(element => {
            revealObserver.observe(element);
        });
        
    } catch (error) {
        console.error("❌ Erro ao carregar projetos:", error);
        console.error("Stack:", error.stack);
        projectsGrid.innerHTML = `
            <div class="error-message">
                <p><i class="fas fa-exclamation-triangle"></i> Erro ao carregar projetos do GitHub.</p>
                <p>Verifique sua conexão ou tente novamente mais tarde.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">${error.message}</p>
            </div>
        `;
    }
}

// Carregar projetos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 DOMContentLoaded disparado");
    console.log("👁️ revealObserver disponível?", typeof revealObserver !== 'undefined');
    
    // GitHub API loading disabled - using static projects from HTML instead
    // Uncomment below to enable dynamic GitHub project loading:
    // setTimeout(() => {
    //     console.log("⏰ Executando fetchGitHubProjects após delay");
    //     fetchGitHubProjects();
    // }, 500);
});

// Controle do Carrossel - Navegação por Arrastar
function initProjectsCarousel() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;
    
    // Mouse events
    projectsGrid.addEventListener('mousedown', (e) => {
        // Não iniciar drag se clicou em um link ou botão
        if (e.target.closest('a, button')) {
            return;
        }
        isDown = true;
        projectsGrid.style.cursor = 'grabbing';
        startX = e.pageX - projectsGrid.offsetLeft;
        scrollLeft = projectsGrid.scrollLeft;
        isDragging = false;
    });
    
    projectsGrid.addEventListener('mouseleave', () => {
        isDown = false;
        projectsGrid.style.cursor = 'grab';
    });
    
    projectsGrid.addEventListener('mouseup', () => {
        isDown = false;
        projectsGrid.style.cursor = 'grab';
        projectsGrid.style.pointerEvents = 'auto';
        // Reset após um pequeno delay para permitir cliques
        setTimeout(() => {
            isDragging = false;
        }, 100);
    });
    
    projectsGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectsGrid.offsetLeft;
        const walk = (x - startX) * 1.5; // Velocidade do scroll
        
        // Só marca como dragging se moveu significativamente
        if (Math.abs(walk) > 5) {
            isDragging = true;
            projectsGrid.style.pointerEvents = 'none';
        }
        
        projectsGrid.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events para mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    projectsGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - projectsGrid.offsetLeft;
        touchScrollLeft = projectsGrid.scrollLeft;
        isDragging = false;
    }, { passive: true });
    
    projectsGrid.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const x = e.touches[0].pageX - projectsGrid.offsetLeft;
        const walk = (x - touchStartX) * 1.2;
        projectsGrid.scrollLeft = touchScrollLeft - walk;
        isDragging = true;
    }, { passive: true });
    
    projectsGrid.addEventListener('touchend', () => {
        touchStartX = 0;
    });
    
    // Smooth scroll snap
    projectsGrid.addEventListener('scroll', () => {
        // Adiciona suavidade ao scroll
        projectsGrid.style.scrollBehavior = 'smooth';
    });
    
    // Previne scroll vertical acidental
    projectsGrid.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            projectsGrid.scrollLeft += e.deltaY;
        }
    }, { passive: false });
}

// Inicializar carrossel quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initProjectsCarousel();
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
