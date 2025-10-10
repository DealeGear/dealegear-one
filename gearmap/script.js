// Global state
let currentLang = 'pt';
let currentTheme = 'light';
let texts = {};

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const sideMenu = document.getElementById('sideMenu');
const themeToggle = document.getElementById('themeToggle');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalExplore = document.getElementById('modalExplore');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTexts();
    initializeEventListeners();
    loadSavedPreferences();
    updateLanguage();
    drawConnections();
});

// Load texts from JSON
async function loadTexts() {
    try {
        const response = await fetch('texts.json');
        texts = await response.json();
    } catch (error) {
        console.error('Error loading texts:', error);
        // Fallback texts
        texts = {
            pt: {
                hero: {
                    title: "Descubra Seu Caminho",
                    subtitle: "Explore trilhas personalizadas para transformar ideias em realidade"
                },
                menu: {
                    home: "Início",
                    maps: "Mapas",
                    ecosystem: "Ecossistema",
                    about: "Sobre",
                    language: "Idioma"
                },
                paths: {
                    title: "Mapa de Trilhas",
                    hobby: {
                        title: "Hobby",
                        description: "Crie por prazer, sem pressão"
                    },
                    income: {
                        title: "Renda Extra",
                        description: "Transforme habilidades em valor"
                    },
                    career: {
                        title: "Carreira",
                        description: "Construa seu futuro profissional"
                    },
                    startup: {
                        title: "Startup",
                        description: "Inove e transforme o mercado"
                    }
                },
                steps: {
                    planning: "Planejamento",
                    organization: "Organização",
                    execution: "Execução",
                    monitoring: "Monitoramento e Controle",
                    communication: "Comunicação",
                    risk: "Gestão de Riscos"
                },
                ecosystem: {
                    title: "Ecossistema DealeGear",
                    hub: {
                        title: "GearHub",
                        description: "Centro de integração onde projetos se conectam"
                    },
                    labs: {
                        title: "GearLabs",
                        description: "Ambiente experimental para protótipos e inovações"
                    },
                    vision: {
                        title: "GearVision",
                        description: "Espaço de planejamento estratégico e visão criativa"
                    }
                },
                buttons: {
                    explore: "Explorar",
                    learnMore: "Saiba Mais"
                }
            }
        };
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Menu
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.add('active');
    });

    menuClose.addEventListener('click', () => {
        sideMenu.classList.remove('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            sideMenu.classList.remove('active');
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            changeLanguage(lang);
        });
    });

    // Path cards
    document.querySelectorAll('.path-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('explore-btn') && !e.target.closest('.step')) {
                showPathInfo(card.dataset.path);
            }
        });
    });

    // Step clicks
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('click', (e) => {
            e.stopPropagation();
            const path = step.closest('.path-card').dataset.path;
            const stepName = step.dataset.step;
            showStepInfo(path, stepName);
        });
    });

    // Explore buttons
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const path = btn.closest('.path-card').dataset.path;
            explorePath(path);
        });
    });

    // Ecosystem cards
    document.querySelectorAll('.ecosystem-card').forEach(card => {
        card.addEventListener('click', () => {
            showPillarInfo(card.dataset.pillar);
        });
    });

    // Modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    modalExplore.addEventListener('click', () => {
        closeModal();
        // Add explore logic here
    });
}

// Theme functions
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
    savePreferences();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// Language functions
function changeLanguage(lang) {
    currentLang = lang;
    updateLanguage();
    savePreferences();
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function updateLanguage() {
    if (!texts[currentLang]) return;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const text = getTextByKey(key);
        if (text) {
            element.textContent = text;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

function getTextByKey(key) {
    const keys = key.split('.');
    let value = texts[currentLang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return null;
        }
    }
    
    return value;
}

// Modal functions
function showPathInfo(path) {
    const pathTexts = texts[currentLang]?.paths?.[path];
    if (!pathTexts) return;

    modalTitle.textContent = pathTexts.title;
    modalDescription.textContent = pathTexts.description;
    modalOverlay.classList.add('active');
}

function showStepInfo(path, step) {
    const stepTexts = texts[currentLang]?.stepDescriptions?.[path]?.[step];
    if (!stepTexts) {
        // Fallback to generic step description
        const stepName = getTextByKey(`steps.${step}`);
        modalTitle.textContent = stepName;
        modalDescription.textContent = `Descrição detalhada sobre ${stepName} no caminho ${path}.`;
    } else {
        modalTitle.textContent = stepTexts.title;
        modalDescription.textContent = stepTexts.description;
    }
    modalOverlay.classList.add('active');
}

function showPillarInfo(pillar) {
    const pillarTexts = texts[currentLang]?.ecosystem?.[pillar];
    if (!pillarTexts) return;

    modalTitle.textContent = pillarTexts.title;
    modalDescription.textContent = pillarTexts.description;
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

function explorePath(path) {
    // Add navigation logic here
    console.log(`Exploring path: ${path}`);
    // For now, just show a message
    const pathTexts = texts[currentLang]?.paths?.[path];
    if (pathTexts) {
        modalTitle.textContent = `Explorando: ${pathTexts.title}`;
        modalDescription.textContent = `Navegando para recursos e exemplos do caminho ${pathTexts.title}.`;
        modalOverlay.classList.add('active');
    }
}

// Draw connections between paths
function drawConnections() {
    const svg = document.querySelector('.connections-svg');
    if (!svg) return;

    const paths = document.querySelectorAll('.path-card');
    if (paths.length < 2) return;

    // Clear existing connections
    svg.innerHTML = svg.innerHTML.replace(/<path[^>]*>/g, '');

    // Draw connections between adjacent paths
    for (let i = 0; i < paths.length - 1; i++) {
        const from = paths[i].getBoundingClientRect();
        const to = paths[i + 1].getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        const x1 = from.right - svgRect.left;
        const y1 = from.top + from.height / 2 - svgRect.top;
        const x2 = to.left - svgRect.left;
        const y2 = to.top + to.height / 2 - svgRect.top;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
        path.setAttribute('d', d);
        path.setAttribute('stroke', 'url(#lineGradient)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '5,5');
        
        // Add animation
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'stroke-dashoffset');
        animate.setAttribute('from', '10');
        animate.setAttribute('to', '0');
        animate.setAttribute('dur', '1s');
        animate.setAttribute('repeatCount', 'indefinite');
        path.appendChild(animate);

        svg.appendChild(path);
    }
}

// Preferences
function savePreferences() {
    localStorage.setItem('gearmap-lang', currentLang);
    localStorage.setItem('gearmap-theme', currentTheme);
}

function loadSavedPreferences() {
    const savedLang = localStorage.getItem('gearmap-lang');
    const savedTheme = localStorage.getItem('gearmap-theme');

    if (savedLang) {
        currentLang = savedLang;
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === savedLang);
        });
    }

    if (savedTheme) {
        currentTheme = savedTheme;
        applyTheme();
    }
}

// Redraw connections on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(drawConnections, 250);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            sideMenu.classList.remove('active');
        }
    });
});