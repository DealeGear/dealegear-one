// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const projectsList = document.getElementById('projectsList');
const mainContent = document.getElementById('mainContent');
const langButtons = document.querySelectorAll('.lang-btn');

// State
let currentLang = localStorage.getItem('geardocs-lang') || 'pt';
let currentProject = null;
let contentData = null;

// Projects list
const projects = [
    '3GTO', 'Aloy', 'Aventuras Peludas', 'Baristas', 'BaristaPro', 
    'Bosque das Frutíferas', 'Conexa', 'Crush', 'Dyris', 'DogZen', 
    'Dust Protocol', 'E-Motion', 'Evora', 'Fabr', 'GearCity', 
    'Mecânico Fantasma', 'Mike & Tio Bob', 'My Heart', 'Oxygen', 
    'Raiz Urbana', 'SIMCO', 'Stairs', 'Synapse', 'UnderSea', 
    'Verso Espresso', 'Viver é uma Arte'
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    renderProjectsList();
    setupEventListeners();
    setLanguage(currentLang);
});

// Load content from JSON
async function loadContent() {
    try {
        const response = await fetch('content.json');
        contentData = await response.json();
    } catch (error) {
        console.error('Error loading content:', error);
        // Fallback content if JSON fails to load
        contentData = generateFallbackContent();
    }
}

// Generate fallback content if JSON fails to load
function generateFallbackContent() {
    const sections = {
        pt: ["Introdução", "Conceito e Inspiração", "Estrutura e Funcionamento", "Como Usar", "Variações Possíveis", "Ferramentas e Recursos", "Links e Referências"],
        en: ["Introduction", "Concept and Inspiration", "Structure and Functionality", "How to Use", "Possible Variations", "Tools and Resources", "Links and References"],
        es: ["Introducción", "Concepto e Inspiración", "Estructura y Funcionamiento", "Cómo Usar", "Variaciones Posibles", "Herramientas y Recursos", "Enlaces y Referencias"]
    };
    
    const translations = {
        pt: {
            welcome: "Bem-vindo ao GearDocs",
            selectProject: "Selecione um projeto na barra lateral para visualizar sua documentação.",
            projects: "Projetos",
            language: "Idioma"
        },
        en: {
            welcome: "Welcome to GearDocs",
            selectProject: "Select a project from the sidebar to view its documentation.",
            projects: "Projects",
            language: "Language"
        },
        es: {
            welcome: "Bienvenido a GearDocs",
            selectProject: "Seleccione un proyecto de la barra lateral para ver su documentación.",
            projects: "Proyectos",
            language: "Idioma"
        }
    };
    
    const projectsData = {};
    projects.forEach(project => {
        projectsData[project] = {};
        ['pt', 'en', 'es'].forEach(lang => {
            projectsData[project][lang] = {};
            sections[lang].forEach(section => {
                projectsData[project][lang][section] = generateLoremIpsum();
            });
        });
    });
    
    return {
        sections,
        translations,
        projects: projectsData
    };
}

// Generate Lorem Ipsum text
function generateLoremIpsum() {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.";
}

// Render projects list
function renderProjectsList() {
    projectsList.innerHTML = '';
    projects.sort().forEach(project => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = project;
        a.dataset.project = project;
        
        if (project === currentProject) {
            a.classList.add('active');
        }
        
        li.appendChild(a);
        projectsList.appendChild(li);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Menu toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Project links
    projectsList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const project = e.target.dataset.project;
            loadProject(project);
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Set language
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('geardocs-lang', lang);
    
    // Update active language button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update UI text
    updateUIText();
    
    // Reload current project if exists
    if (currentProject) {
        loadProject(currentProject);
    }
}

// Update UI text based on current language
function updateUIText() {
    if (!contentData || !contentData.translations) return;
    
    const translations = contentData.translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}

// Load project content
function loadProject(project) {
    currentProject = project;
    
    // Update active project in sidebar
    document.querySelectorAll('.projects-list a').forEach(a => {
        if (a.dataset.project === project) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
    
    // Get project content
    let projectContent;
    if (contentData && contentData.projects && contentData.projects[project]) {
        projectContent = contentData.projects[project][currentLang];
    } else {
        // Fallback content
        projectContent = {};
        if (contentData && contentData.sections) {
            contentData.sections[currentLang].forEach(section => {
                projectContent[section] = generateLoremIpsum();
            });
        }
    }
    
    // Render project content
    renderProjectContent(project, projectContent);
}

// Render project content
function renderProjectContent(project, content) {
    const sections = contentData ? contentData.sections[currentLang] : 
        ["Introdução", "Conceito e Inspiração", "Estrutura e Funcionamento", "Como Usar", "Variações Possíveis", "Ferramentas e Recursos", "Links e Referências"];
    
    let html = `
        <div class="project-content">
            <h1 class="project-title">${project}</h1>
    `;
    
    sections.forEach(section => {
        const sectionContent = content && content[section] ? content[section] : generateLoremIpsum();
        const icon = getSectionIcon(section);
        
        html += `
            <div class="section">
                <h2 class="section-title">
                    <i class="${icon}"></i>
                    ${section}
                </h2>
                <div class="section-content">
                    <p>${sectionContent}</p>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    mainContent.innerHTML = html;
}

// Get appropriate icon for each section
function getSectionIcon(section) {
    const icons = {
        "Introdução": "fas fa-info-circle",
        "Introduction": "fas fa-info-circle",
        "Introducción": "fas fa-info-circle",
        "Conceito e Inspiração": "fas fa-lightbulb",
        "Concept and Inspiration": "fas fa-lightbulb",
        "Concepto e Inspiración": "fas fa-lightbulb",
        "Estrutura e Funcionamento": "fas fa-cogs",
        "Structure and Functionality": "fas fa-cogs",
        "Estructura y Funcionamiento": "fas fa-cogs",
        "Como Usar": "fas fa-question-circle",
        "How to Use": "fas fa-question-circle",
        "Cómo Usar": "fas fa-question-circle",
        "Variações Possíveis": "fas fa-random",
        "Possible Variations": "fas fa-random",
        "Variaciones Posibles": "fas fa-random",
        "Ferramentas e Recursos": "fas fa-tools",
        "Tools and Resources": "fas fa-tools",
        "Herramientas y Recursos": "fas fa-tools",
        "Links e Referências": "fas fa-link",
        "Links and References": "fas fa-link",
        "Enlaces y Referencias": "fas fa-link"
    };
    
    return icons[section] || "fas fa-file-alt";
}