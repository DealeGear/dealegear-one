// Estado da aplicação
let currentLang = 'pt';
let currentTheme = 'light';
let texts = {};

// Carregar textos
async function loadTexts() {
    try {
        const response = await fetch('texts.json');
        texts = await response.json();
        applyLanguage(currentLang);
    } catch (error) {
        console.error('Erro ao carregar textos:', error);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadTexts();
    initializeApp();
    setupEventListeners();
    drawConnectors();
});

// Inicializar aplicação
function initializeApp() {
    // Carregar preferências salvas
    currentLang = localStorage.getItem('gearmap-lang') || 'pt';
    currentTheme = localStorage.getItem('gearmap-theme') || 'light';
    
    // Aplicar tema
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Atualizar botão de idioma ativo
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Menu toggle
    document.getElementById('menuToggle').addEventListener('click', openMenu);
    document.getElementById('closeMenu').addEventListener('click', closeMenu);
    document.getElementById('overlay').addEventListener('click', closeMenu);
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Language selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
    });
    
    // Steps click
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('click', () => openStepModal(step));
    });
    
    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('stepModal').addEventListener('click', (e) => {
        if (e.target.id === 'stepModal') closeModal();
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            closeModal();
        }
    });
}

// Funções do menu
function openMenu() {
    document.getElementById('sideMenu').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    document.getElementById('sideMenu').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Funções de tema
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('gearmap-theme', currentTheme);
}

// Funções de idioma
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gearmap-lang', lang);
    applyLanguage(lang);
    
    // Atualizar botão ativo
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function applyLanguage(lang) {
    if (!texts[lang]) return;
    
    const langTexts = texts[lang];
    
    // Aplicar textos com atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = getNestedValue(langTexts, key);
        if (text) element.textContent = text;
    });
    
    // Atualizar atributo lang do HTML
    document.documentElement.lang = lang;
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Funções do modal
function openStepModal(stepElement) {
    const path = stepElement.closest('.path-card').dataset.path;
    const stepKey = stepElement.dataset.step;
    
    const stepData = texts[currentLang].stepDescriptions[path][stepKey];
    
    if (stepData) {
        document.getElementById('modalTitle').textContent = stepData.title;
        document.getElementById('modalDescription').textContent = stepData.description;
        document.getElementById('stepModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    document.getElementById('stepModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Desenhar conectores SVG
function drawConnectors() {
    const svg = document.querySelector('.paths-connector');
    const cards = document.querySelectorAll('.path-card');
    
    if (cards.length < 2) return;
    
    // Limpar SVG existente
    while (svg.lastChild && svg.lastChild.nodeName !== 'defs') {
        svg.removeChild(svg.lastChild);
    }
    
    // Criar linhas conectando os cards
    for (let i = 0; i < cards.length - 1; i++) {
        const card1 = cards[i];
        const card2 = cards[i + 1];
        
        const rect1 = card1.getBoundingClientRect();
        const rect2 = card2.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        
        const x1 = rect1.right - svgRect.left;
        const y1 = rect1.top + rect1.height / 2 - svgRect.top;
        const x2 = rect2.left - svgRect.left;
        const y2 = rect2.top + rect2.height / 2 - svgRect.top;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const midX = (x1 + x2) / 2;
        
        path.setAttribute('d', `M ${x1} ${y1} Q ${midX} ${y1}, ${midX} ${(y1 + y2) / 2} T ${x2} ${y2}`);
        path.setAttribute('stroke', 'var(--connector-color)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '5,5');
        path.setAttribute('opacity', '0.3');
        
        // Animação
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = `drawLine 2s ease-out ${i * 0.3}s forwards`;
        
        svg.appendChild(path);
    }
    
    // Adicionar CSS para animação
    if (!document.querySelector('#connector-animation')) {
        const style = document.createElement('style');
        style.id = 'connector-animation';
        style.textContent = `
            @keyframes drawLine {
                to {
                    stroke-dashoffset: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Redesenhar conectores ao redimensionar
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(drawConnectors, 250);
});