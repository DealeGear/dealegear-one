// Project and section data
const projects = [
    { id: 'myHeart', name: 'MyHeart', icon: 'fa-heartbeat' },
    { id: 'baristaPro', name: 'BaristaPro', icon: 'fa-coffee' },
    { id: 'synapse', name: 'Synapse', icon: 'fa-brain' },
    { id: '3gto', name: '3GTO', icon: 'fa-cube' },
    { id: 'baristas', name: 'Baristas', icon: 'fa-mug-hot' },
    { id: 'dyris', name: 'Dyris', icon: 'fa-eye' },
    { id: 'fabr', name: 'Fabr', icon: 'fa-industry' },
    { id: 'underSea', name: 'UnderSea', icon: 'fa-water' },
    { id: 'oxygen', name: 'Oxygen', icon: 'fa-wind' },
    { id: 'bosqueFrutiferas', name: 'Bosque das Frutíferas', icon: 'fa-tree' },
    { id: 'mecanicoFantasma', name: 'Mecanico Fantasma', icon: 'fa-ghost' },
    { id: 'viverEhUmaArte', name: 'Viver é uma Arte', icon: 'fa-palette' },
    { id: 'aventurasPeludas', name: 'Aventuras Peludas', icon: 'fa-paw' },
    { id: 'raizUrbana', name: 'Raiz Urbana', icon: 'fa-seedling' },
    { id: 'versoEspresso', name: 'Verso Espresso', icon: 'fa-book-open' },
    { id: 'mikeETioBob', name: 'Mike e Tio Bob', icon: 'fa-optin-monster' },
    { id: 'simco', name: 'SIMCO', icon: 'fa-users' }
];

const sections = [
    { id: 'overview', icon: 'fa-info-circle' },
    { id: 'objective', icon: 'fa-bullseye' },
    { id: 'application', icon: 'fa-rocket' },
    { id: 'architecture', icon: 'fa-sitemap' },
    { id: 'userGuide', icon: 'fa-book' },
    { id: 'nextSteps', icon: 'fa-road' },
    { id: 'background', icon: 'fa-layer-group' },
    { id: 'references', icon: 'fa-link' }
];

// Translations
const translations = {
    pt: {
        projects: 'Projetos',
        selectProject: 'Escolha um projeto na barra lateral para visualizar sua documentação.',
        community: 'Comunidade',
        portal: 'Portal',
        overview: 'Visão Geral',
        objective: 'Objetivo',
        application: 'Aplicação',
        architecture: 'Arquitetura',
        userGuide: 'Guia do Usuário',
        nextSteps: 'Próximos Passos',
        background: 'Contexto',
        references: 'Referências'
    },
    en: {
        projects: 'Projects',
        selectProject: 'Select a project from the sidebar to view its documentation.',
        community: 'Community',
        portal: 'Portal',
        overview: 'Overview',
        objective: 'Objective',
        application: 'Application',
        architecture: 'Architecture',
        userGuide: 'User Guide',
        nextSteps: 'Next Steps',
        background: 'Background',
        references: 'References'
    }
};

// Sample content for each section
const sectionContent = {
    overview: {
        pt: (projectName) => `
            <p>O <span class="highlight">${projectName}</span> é um projeto inovador que visa transformar a maneira como interagimos com tecnologias emergentes.</p>
            <p>Esta documentação fornece informações detalhadas sobre todos os aspectos do projeto, desde sua concepção até implementação e uso.</p>
            <h3>Principais Características</h3>
            <ul>
                <li>Interface intuitiva e responsiva</li>
                <li>Alta performance e escalabilidade</li>
                <li>Integração com sistemas existentes</li>
                <li>Segurança robusta e proteção de dados</li>
            </ul>
        `,
        en: (projectName) => `
            <p><span class="highlight">${projectName}</span> is an innovative project that aims to transform the way we interact with emerging technologies.</p>
            <p>This documentation provides detailed information about all aspects of the project, from its conception to implementation and use.</p>
            <h3>Key Features</h3>
            <ul>
                <li>Intuitive and responsive interface</li>
                <li>High performance and scalability</li>
                <li>Integration with existing systems</li>
                <li>Robust security and data protection</li>
            </ul>
        `
    },
    objective: {
        pt: (projectName) => `
            <p>O objetivo principal do <span class="highlight">${projectName}</span> é resolver problemas complexos através de soluções tecnológicas inovadoras.</p>
            <h3>Metas Específicas</h3>
            <ul>
                <li>Desenvolver uma plataforma escalável que atenda a múltiplos casos de uso</li>
                <li>Garantir acessibilidade e inclusão para todos os usuários</li>
                <li>Minimizar o impacto ambiental através de práticas sustentáveis</li>
                <li>Estabelecer novos padrões de qualidade e eficiência no setor</li>
            </ul>
        `,
        en: (projectName) => `
            <p>The main objective of <span class="highlight">${projectName}</span> is to solve complex problems through innovative technological solutions.</p>
            <h3>Specific Goals</h3>
            <ul>
                <li>Develop a scalable platform that serves multiple use cases</li>
                <li>Ensure accessibility and inclusion for all users</li>
                <li>Minimize environmental impact through sustainable practices</li>
                <li>Establish new standards of quality and efficiency in the sector</li>
            </ul>
        `
    },
    application: {
        pt: (projectName) => `
            <p>O <span class="highlight">${projectName}</span> pode ser aplicado em diversos contextos, oferecendo benefícios significativos em cada um deles.</p>
            <h3>Setores de Aplicação</h3>
            <ul>
                <li><strong>Educação:</strong> Ferramentas para aprendizado personalizado e colaborativo</li>
                <li><strong>Saúde:</strong> Soluções para monitoramento e tratamento de pacientes</li>
                <li><strong>Negócios:</strong> Otimização de processos e tomada de decisão</li>
                <li><strong>Entretenimento:</strong> Experiências imersivas e interativas</li>
            </ul>
            <p>Para mais informações sobre casos de uso específicos, consulte nossa <a href="#">galeria de exemplos</a>.</p>
        `,
        en: (projectName) => `
            <p><span class="highlight">${projectName}</span> can be applied in various contexts, offering significant benefits in each of them.</p>
            <h3>Application Sectors</h3>
            <ul>
                <li><strong>Education:</strong> Tools for personalized and collaborative learning</li>
                <li><strong>Health:</strong> Solutions for patient monitoring and treatment</li>
                <li><strong>Business:</strong> Process optimization and decision making</li>
                <li><strong>Entertainment:</strong> Immersive and interactive experiences</li>
            </ul>
            <p>For more information about specific use cases, see our <a href="#">examples gallery</a>.</p>
        `
    },
    architecture: {
        pt: (projectName) => `
            <p>A arquitetura do <span class="highlight">${projectName}</span> foi projetada para ser modular, escalável e de fácil manutenção.</p>
            <h3>Componentes Principais</h3>
            <ul>
                <li><strong>Frontend:</strong> Interface responsiva construída com tecnologias modernas</li>
                <li><strong>Backend:</strong> API RESTful com microserviços</li>
                <li><strong>Banco de Dados:</strong> Solução híbrida com SQL e NoSQL</li>
                <li><strong>Infraestrutura:</strong> Implantação em nuvem com contêineres</li>
            </ul>
            <p>Para detalhes técnicos completos, consulte nossa <a href="#">documentação técnica</a>.</p>
        `,
        en: (projectName) => `
            <p>The architecture of <span class="highlight">${projectName}</span> was designed to be modular, scalable, and easy to maintain.</p>
            <h3>Main Components</h3>
            <ul>
                <li><strong>Frontend:</strong> Responsive interface built with modern technologies</li>
                <li><strong>Backend:</strong> RESTful API with microservices</li>
                <li><strong>Database:</strong> Hybrid solution with SQL and NoSQL</li>
                <li><strong>Infrastructure:</strong> Cloud deployment with containers</li>
            </ul>
            <p>For complete technical details, see our <a href="#">technical documentation</a>.</p>
        `
    },
    userGuide: {
        pt: (projectName) => `
            <p>Este guia ajuda os usuários a começar a usar o <span class="highlight">${projectName}</span> de forma eficaz.</p>
            <h3>Primeiros Passos</h3>
            <ol>
                <li>Crie sua conta no sistema</li>
                <li>Configure seu perfil e preferências</li>
                <li>Explore o painel principal e suas funcionalidades</li>
                <li>Consulte os tutoriais em vídeo para orientação visual</li>
            </ol>
            <h3>Dicas e Truques</h3>
            <ul>
                <li>Use atalhos de teclado para aumentar sua produtividade</li>
                <li>Personalize seu workspace para atender às suas necessidades</li>
                <li>Ative as notificações para ficar atualizado sobre novidades</li>
            </ul>
            <p>Para suporte adicional, visite nossa <a href="#">central de ajuda</a>.</p>
        `,
        en: (projectName) => `
            <p>This guide helps users get started with <span class="highlight">${projectName}</span> effectively.</p>
            <h3>Getting Started</h3>
            <ol>
                <li>Create your account in the system</li>
                <li>Set up your profile and preferences</li>
                <li>Explore the main dashboard and its features</li>
                <li>Check out video tutorials for visual guidance</li>
            </ol>
            <h3>Tips and Tricks</h3>
            <ul>
                <li>Use keyboard shortcuts to increase your productivity</li>
                <li>Customize your workspace to meet your needs</li>
                <li>Enable notifications to stay updated on news</li>
            </ul>
            <p>For additional support, visit our <a href="#">help center</a>.</p>
        `
    },
    nextSteps: {
        pt: (projectName) => `
            <p>O desenvolvimento do <span class="highlight">${projectName}</span> continua evoluindo, com planos ambiciosos para o futuro.</p>
            <h3>Roadmap</h3>
            <ul>
                <li><strong>Q3 2023:</strong> Lançamento da versão 2.0 com novas funcionalidades</li>
                <li><strong>Q4 2023:</strong> Expansão para novos mercados internacionais</li>
                <li><strong>Q1 2024:</strong> Integração com plataformas de terceiros</li>
                <li><strong>Q2 2024:</strong> Implementação de IA para recursos avançados</li>
            </ul>
            <p>Estamos sempre abertos a sugestões da comunidade. Participe do nosso <a href="#">fórum de discussões</a> para contribuir.</p>
        `,
        en: (projectName) => `
            <p>The development of <span class="highlight">${projectName}</span> continues to evolve, with ambitious plans for the future.</p>
            <h3>Roadmap</h3>
            <ul>
                <li><strong>Q3 2023:</strong> Release of version 2.0 with new features</li>
                <li><strong>Q4 2023:</strong> Expansion to new international markets</li>
                <li><strong>Q1 2024:</strong> Integration with third-party platforms</li>
                <li><strong>Q2 2024:</strong> Implementation of AI for advanced features</li>
            </ul>
            <p>We are always open to suggestions from the community. Join our <a href="#">discussion forum</a> to contribute.</p>
        `
    },
    background: {
        pt: (projectName) => `
            <p>O <span class="highlight">${projectName}</span> nasceu da necessidade de resolver desafios complexos que não eram adequadamente abordados pelas soluções existentes.</p>
            <h3>Histórico</h3>
            <p>O projeto foi iniciado em 2020 por uma equipe multidisciplinar de especialistas com experiência em diversas áreas. Após extensiva pesquisa e desenvolvimento, a primeira versão foi lançada em 2021.</p>
            <h3>Princípios Orientadores</h3>
            <ul>
                <li>Inovação contínua e melhoria constante</li>
                <li>Foco no usuário e experiência de qualidade</li>
                <li>Transparência e ética em todas as operações</li>
                <li>Sustentabilidade e responsabilidade social</li>
            </ul>
        `,
        en: (projectName) => `
            <p><span class="highlight">${projectName}</span> was born from the need to solve complex challenges that were not adequately addressed by existing solutions.</p>
            <h3>History</h3>
            <p>The project was started in 2020 by a multidisciplinary team of experts with experience in various fields. After extensive research and development, the first version was released in 2021.</p>
            <h3>Guiding Principles</h3>
            <ul>
                <li>Continuous innovation and constant improvement</li>
                <li>User focus and quality experience</li>
                <li>Transparency and ethics in all operations</li>
                <li>Sustainability and social responsibility</li>
            </ul>
        `
    },
    references: {
        pt: (projectName) => `
            <p>Esta seção contém referências e recursos úteis relacionados ao <span class="highlight">${projectName}</span>.</p>
            <h3>Documentação</h3>
            <ul>
                <li><a href="#">Guia de Instalação</a></li>
                <li><a href="#">Referência da API</a></li>
                <li><a href="#">Notas de Versão</a></li>
                <li><a href="#">Perguntas Frequentes</a></li>
            </ul>
            <h3>Comunidade</h3>
            <ul>
                <li><a href="#">Fórum Oficial</a></li>
                <li><a href="#">Canal do Discord</a></li>
                <li><a href="#">Eventos e Meetups</a></li>
                <li><a href="#">Blog do Projeto</a></li>
            </ul>
            <h3>Recursos Externos</h3>
            <ul>
                <li><a href="#">Artigos e Publicações</a></li>
                <li><a href="#">Estudos de Caso</a></li>
                <li><a href="#">Vídeos Tutoriais</a></li>
            </ul>
        `,
        en: (projectName) => `
            <p>This section contains references and useful resources related to <span class="highlight">${projectName}</span>.</p>
            <h3>Documentation</h3>
            <ul>
                <li><a href="#">Installation Guide</a></li>
                <li><a href="#">API Reference</a></li>
                <li><a href="#">Release Notes</a></li>
                <li><a href="#">Frequently Asked Questions</a></li>
            </ul>
            <h3>Community</h3>
            <ul>
                <li><a href="#">Official Forum</a></li>
                <li><a href="#">Discord Channel</a></li>
                <li><a href="#">Events and Meetups</a></li>
                <li><a href="#">Project Blog</a></li>
            </ul>
            <h3>External Resources</h3>
            <ul>
                <li><a href="#">Articles and Publications</a></li>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">Video Tutorials</a></li>
            </ul>
        `
    }
};

// DOM elements
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const projectList = document.getElementById('projectList');
const projectTitle = document.getElementById('projectTitle');
const projectDescription = document.getElementById('projectDescription');
const sectionsContainer = document.getElementById('sectionsContainer');

// State
let currentProject = null;
let currentLang = 'pt';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize the app
function init() {
    renderProjects();
    setupEventListeners();
    applyTheme();
}

// Render projects in the sidebar
function renderProjects() {
    projectList.innerHTML = '';
    
    projects.forEach(project => {
        const li = document.createElement('li');
        li.className = 'project-item';
        li.dataset.projectId = project.id;
        
        li.innerHTML = `
            <i class="fas ${project.icon} project-icon"></i>
            <span class="project-name">${project.name}</span>
        `;
        
        li.addEventListener('click', () => selectProject(project.id));
        projectList.appendChild(li);
    });
}

// Select a project and render its sections
function selectProject(projectId) {
    // Update active project in sidebar
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.projectId === projectId) {
            item.classList.add('active');
        }
    });
    
    // Find the selected project
    currentProject = projects.find(p => p.id === projectId);
    
    if (!currentProject) return;
    
    // Update project header
    projectTitle.textContent = currentProject.name;
    projectDescription.textContent = translations[currentLang].selectProject;
    
    // Render sections
    renderSections();
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render sections for the selected project
function renderSections() {
    sectionsContainer.innerHTML = '';
    
    sections.forEach(section => {
        const sectionCard = document.createElement('div');
        sectionCard.className = 'section-card';
        sectionCard.id = section.id;
        
        const sectionTitle = translations[currentLang][section.id] || section.id;
        
        sectionCard.innerHTML = `
            <div class="section-header">
                <i class="fas ${section.icon} section-icon"></i>
                <h2 class="section-title">${sectionTitle}</h2>
            </div>
            <div class="section-content">
                ${sectionContent[section.id][currentLang](currentProject.name)}
            </div>
        `;
        
        sectionsContainer.appendChild(sectionCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Menu toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });
    
    // Overlay click
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        applyTheme();
    });
    
    // Language toggle
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        document.documentElement.lang = currentLang;
        updateLanguage();
    });
    
    // Window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });
}

// Apply theme (dark/light mode)
function applyTheme() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Update language
function updateLanguage() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Re-render sections if a project is selected
    if (currentProject) {
        renderSections();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);