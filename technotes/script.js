// Global variables
let currentLanguage = 'pt';
let currentSection = 'introducao';
let textsData = null;

// DOM elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const languageSelect = document.getElementById('languageSelect');
const contentText = document.getElementById('contentText');
const contentTitle = document.getElementById('contentTitle');
const themeToggle = document.getElementById('themeToggle');
const navItems = document.querySelectorAll('.nav-item');

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadTexts();
    initializeTheme();
    initializeLanguage();
    setupEventListeners();
    loadSection('introducao');
});

// Load texts from JSON
async function loadTexts() {
    try {
        const response = await fetch('texts.json');
        textsData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading texts:', error);
        // Fallback content
        textsData = {
            introducao: {
                pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis lorem sed urna varius tincidunt.',
                en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis lorem sed urna varius tincidunt.',
                es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis lorem sed urna varius tincidunt.'
            },
            objetivo: {
                pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            estrutura: {
                pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            desenvolvimento: {
                pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            documentacao: {
                pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            roadmap: {
                pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
        };
        return false;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Hamburger menu
    hamburger.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Language selector
    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('preferredLanguage', currentLanguage);
        updateContent();
        updateMenuLabels();
    });

    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            loadSection(section);
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
}

// Toggle sidebar
function toggleSidebar() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Close sidebar
function closeSidebar() {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Load section content
function loadSection(section) {
    currentSection = section;
    updateContent();
    updateTitle();
}

// Update title based on current section
function updateTitle() {
    const title = getMenuText(`menu_${currentSection}`);
    contentTitle.textContent = title;
    contentTitle.setAttribute('data-content-title', currentSection);
}

// Update content based on current language and section
function updateContent() {
    if (!textsData || !textsData[currentSection]) {
        console.warn('Content not available for section:', currentSection);
        return;
    }
    
    const content = textsData[currentSection][currentLanguage];
    if (content) {
        // Add fade animation
        contentText.style.opacity = '0';
        setTimeout(() => {
            contentText.innerHTML = formatContent(content);
            contentText.style.opacity = '1';
        }, 200);
    }
}

// Format content with proper HTML structure
function formatContent(text) {
    // Split by paragraphs
    const paragraphs = text.split('\n\n');
    return paragraphs.map(p => {
        if (p.startsWith('## ')) {
            return `<h3>${p.substring(3)}</h3>`;
        } else if (p.startsWith('- ')) {
            const items = p.split('\n').map(item => `<li>${item.substring(2)}</li>`).join('');
            return `<ul>${items}</ul>`;
        } else if (p.includes('`')) {
            // Simple code formatting
            return `<p>${p.replace(/`([^`]+)`/g, '<code>$1</code>')}</p>`;
        } else {
            return `<p>${p}</p>`;
        }
    }).join('');
}

// Initialize language from localStorage
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        languageSelect.value = currentLanguage;
    }
    updateMenuLabels();
}

// Update menu labels based on language
function updateMenuLabels() {
    const labels = {
        menu_introducao: {
            pt: 'Introdução',
            en: 'Introduction',
            es: 'Introducción'
        },
        menu_objetivo: {
            pt: 'Objetivo do Projeto',
            en: 'Project Objective',
            es: 'Objetivo del Proyecto'
        },
        menu_estrutura: {
            pt: 'Estrutura do Sistema',
            en: 'System Structure',
            es: 'Estructura del Sistema'
        },
        menu_desenvolvimento: {
            pt: 'Desenvolvimento',
            en: 'Development',
            es: 'Desarrollo'
        },
        menu_documentacao: {
            pt: 'Documentação Técnica',
            en: 'Technical Documentation',
            es: 'Documentación Técnica'
        },
        menu_roadmap: {
            pt: 'Roadmap',
            en: 'Roadmap',
            es: 'Roadmap'
        },
        language: {
            pt: 'Idioma:',
            en: 'Language:',
            es: 'Idioma:'
        }
    };

    // Update menu items
    Object.keys(labels).forEach(key => {
        const elements = document.querySelectorAll(`[data-menu="${key.replace('menu_', '')}"], [data-lang="${key}"]`);
        elements.forEach(el => {
            if (labels[key][currentLanguage]) {
                el.textContent = labels[key][currentLanguage];
            }
        });
    });
    
    // Update current section title
    updateTitle();
}

// Get menu text
function getMenuText(key) {
    const texts = {
        menu_introducao: {
            pt: 'Introdução',
            en: 'Introduction',
            es: 'Introducción'
        },
        menu_objetivo: {
            pt: 'Objetivo do Projeto',
            en: 'Project Objective',
            es: 'Objetivo del Proyecto'
        },
        menu_estrutura: {
            pt: 'Estrutura do Sistema',
            en: 'System Structure',
            es: 'Estructura del Sistema'
        },
        menu_desenvolvimento: {
            pt: 'Desenvolvimento',
            en: 'Development',
            es: 'Desarrollo'
        },
        menu_documentacao: {
            pt: 'Documentação Técnica',
            en: 'Technical Documentation',
            es: 'Documentación Técnica'
        },
        menu_roadmap: {
            pt: 'Roadmap',
            en: 'Roadmap',
            es: 'Roadmap'
        }
    };
    
    return texts[key]?.[currentLanguage] || key;
}

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('class', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.setAttribute('class', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Smooth scroll for content area
contentText?.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        contentText.scrollTop += e.deltaY * 0.5;
    }
}, { passive: false });