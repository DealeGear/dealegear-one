// Estado da aplicação
let currentLang = 'pt';
let currentTheme = 'light';
let appData = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Carregar dados do JSON
        await loadData();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Carregar preferências salvas
        const savedLang = getStoredPreference('gearlabs-lang', 'pt');
        const savedTheme = getStoredPreference('gearlabs-theme', 'light');
        
        setLanguage(savedLang);
        setTheme(savedTheme);
        
        // Carregar protótipos
        loadPrototypes();
        
        // Inicializar animações
        setTimeout(observeCards, 100);
        
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        showError('Erro ao carregar dados da aplicação');
    }
}

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Falha ao carregar dados');
        }
        appData = await response.json();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Dados de fallback em caso de erro
        appData = {
            translations: {
                pt: {
                    heroText: "Protótipos ajudam a desenvolver habilidades em projetos.",
                    prototypesTitle: "Protótipos",
                    ctaTitle: "O Poder dos Protótipos",
                    ctaText: "Cada protótipo é uma oportunidade de aprendizado.",
                    ctaButton: "Comece agora",
                    footerAbout: "Sobre",
                    footerContact: "Contato",
                    footerDocs: "Documentação",
                    footerCommunity: "Comunidade",
                    viewProject: "Ver Projeto"
                }
            },
            prototypes: {
                pt: []
            }
        };
        throw error;
    }
}

function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleSidebar = document.getElementById('themeToggleSidebar');
    
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleSidebar) themeToggleSidebar.addEventListener('click', toggleTheme);
    
    // Language select
    const langSelect = document.getElementById('langSelect');
    const langSelectSidebar = document.getElementById('langSelectSidebar');
    
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
    
    if (langSelectSidebar) {
        langSelectSidebar.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // CTA Button
    const ctaButton = document.getElementById('ctaButton');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const prototypesSection = document.querySelector('.prototypes-section');
            if (prototypesSection) {
                prototypesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Fechar sidebar quando clicar em um link
    document.addEventListener('click', (e) => {
        if (e.target.matches('.sidebar a')) {
            closeSidebar();
        }
    });

    // Smooth scroll para links internos
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        // ESC para fechar sidebar
        if (e.key === 'Escape') {
            closeSidebar();
        }
        
        // Enter para ativar cards focados
        if (e.key === 'Enter' && e.target.classList.contains('prototype-card')) {
            e.target.click();
        }
    });

    // Efeito parallax no hero
    window.addEventListener('scroll', handleParallaxScroll);
}

function handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeButtons = [
        document.getElementById('themeToggle'),
        document.getElementById('themeToggleSidebar')
    ].filter(Boolean);
    
    themeButtons.forEach(button => {
        button.textContent = theme === 'light' ? '🌙' : '☀️';
    });

    // Salvar preferência
    storePreference('gearlabs-theme', theme);
}

function setLanguage(lang) {
    if (!appData || !appData.translations[lang]) {
        console.warn('Idioma não encontrado:', lang);
        return;
    }
    
    currentLang = lang;
    
    // Atualizar selects
    const langSelect = document.getElementById('langSelect');
    const langSelectSidebar = document.getElementById('langSelectSidebar');
    
    if (langSelect) langSelect.value = lang;
    if (langSelectSidebar) langSelectSidebar.value = lang;
    
    // Atualizar textos
    updateTexts();
    
    // Recarregar protótipos
    loadPrototypes();

    // Salvar preferência
    storePreference('gearlabs-lang', lang);
}

function updateTexts() {
    if (!appData || !appData.translations[currentLang]) return;
    
    const texts = appData.translations[currentLang];
    
    Object.keys(texts).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = texts[key];
        }
    });
}

function loadPrototypes() {
    const grid = document.getElementById('prototypesGrid');
    if (!grid || !appData || !appData.prototypes[currentLang]) return;
    
    // Mostrar loading
    showLoading(grid);
    
    // Simular carregamento para melhor UX
    setTimeout(() => {
        grid.innerHTML = '';
        const prototypes = appData.prototypes[currentLang];
        
        prototypes.forEach((prototype, index) => {
            const card = createPrototypeCard(prototype);
            grid.appendChild(card);
        });
        
        // Reinicializar observador de animações
        setTimeout(observeCards, 100);
    }, 500);
}

// Função modificada para usar fotos reais ao invés de ícones
function createPrototypeCard(prototype) {
    const card = document.createElement('div');
    card.className = 'prototype-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.onclick = () => window.open(prototype.link, '_blank');

    const buttonText = appData.translations[currentLang].viewProject || 'Ver Projeto';

    card.innerHTML = `
        <div class="card-image-photo" style="background-image: url('${prototype.image}')">
            <div class="card-overlay">
                <div class="card-overlay-content">
                    <h3 class="card-title-overlay">${escapeHtml(prototype.name)}</h3>
                </div>
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${escapeHtml(prototype.name)}</h3>
            <p class="card-description">${escapeHtml(prototype.description)}</p>
            <button class="card-button" onclick="event.stopPropagation(); window.open('${prototype.link}', '_blank')">
                ${buttonText}
            </button>
        </div>
    `;

    return card;
}

function getProjectIcon(name) {
    // Mapear ícones baseados no nome do projeto
    const icons = {
        '3GTO': '🥽',
        'Aloi': '🌿',
        'Aventuras Peludas': '🐕',
        'Furry Adventures': '🐕',
        'Baristas': '☕',
        'BaristaPro': '📊',
        'Bosque das Frutíferas': '🌳',
        'Fruit Tree Grove': '🌳',
        'Bosque de Frutales': '🌳',
        'Conexa': '🔗',
        'Crush': '💘',
        'Dyris': '❤️',
        'DogZen': '🐾',
        'Dust Protocol': '🎮',
        'E-Motion': '⚡',
        'Evora': '🏙️',
        'Fabr': '🔧',
        'GearCity': '⚙️',
        'Ignis': '☀️',
        'Mecânico Fantasma': '🔊',
        'Ghost Mechanic': '🔊',
        'Mecánico Fantasma': '🔊',
        'Mike e Tio Bob': '🦕',
        'Mike and Uncle Bob': '🦕',
        'Mike y Tío Bob': '🦕',
        'MyHeart': '💓',
        'Oxygen': '🌬️',
        'Raiz Urbana': '🌱',
        'Urban Root': '🌱',
        'Raíz Urbana': '🌱',
        'SIMCO': '🩺',
        'Stairs': '📚',
        'Synapse': '🧠',
        'UnderSea': '🤖',
        'VersoEspresso': '📖',
        'Viver é uma Arte': '🎨',
        'Living is an Art': '🎨',
        'Vivir es un Arte': '🎨'
    };

    return icons[name] || '⭐';
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function showLoading(container) {
    if (!container) return;
    
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

function showError(message) {
    const grid = document.getElementById('prototypesGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="loading">
                <p style="color: var(--text-secondary); text-align: center;">
                    ${message}
                </p>
            </div>
        `;
    }
}

// Animação de entrada dos cards quando aparecem na tela
function observeCards() {
    const cards = document.querySelectorAll('.prototype-card');
    
    if (!cards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Utilitários para localStorage
function storePreference(key, value) {
    try {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        }
    } catch (error) {
        console.warn('Não foi possível salvar preferência:', error);
    }
}

function getStoredPreference(key, defaultValue) {
    try {
        if (window.localStorage) {
            return window.localStorage.getItem(key) || defaultValue;
        }
    } catch (error) {
        console.warn('Não foi possível carregar preferência:', error);
    }
    return defaultValue;
}

// Utilitário para escape de HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Debounce para otimizar eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce no scroll para melhor performance
const debouncedParallaxScroll = debounce(handleParallaxScroll, 16);
window.removeEventListener('scroll', handleParallaxScroll);
window.addEventListener('scroll', debouncedParallaxScroll);