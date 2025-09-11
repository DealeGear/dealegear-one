document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const languageSelect = document.getElementById('language-select');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const projectsList = document.getElementById('projects-list');
    const projectContent = document.getElementById('project-content');
    
    // State
    let currentLanguage = localStorage.getItem('language') || 'pt';
    let currentTheme = localStorage.getItem('theme') || 'light';
    let currentProject = null;
    let projectsData = [];
    
    // Initialize
    function init() {
        // Set initial theme
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Set initial language
        languageSelect.value = currentLanguage;
        
        // Load projects data
        fetchProjectsData();
        
        // Event listeners
        languageSelect.addEventListener('change', handleLanguageChange);
        themeToggle.addEventListener('click', toggleTheme);
        menuToggle.addEventListener('click', toggleSidebar);
        
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
    
    // Fetch projects data from JSON
    async function fetchProjectsData() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            projectsData = data.projects;
            renderProjectsList();
            
            // Load the first project by default
            if (projectsData.length > 0) {
                loadProject(projectsData[0].id);
            }
        } catch (error) {
            console.error('Error loading projects data:', error);
            projectContent.innerHTML = `
                <div class="error-message">
                    <h2>Erro ao carregar dados</h2>
                    <p>Não foi possível carregar os dados dos projetos. Tente novamente mais tarde.</p>
                </div>
            `;
        }
    }
    
    // Render projects list in sidebar
    function renderProjectsList() {
        projectsList.innerHTML = '';
        
        projectsData.forEach(project => {
            const li = document.createElement('li');
            const isActive = currentProject === project.id;
            
            li.innerHTML = `
                <a href="#" data-project-id="${project.id}" class="${isActive ? 'active' : ''}">
                    <i class="fas ${project.icon}"></i>
                    <span>${project.name[currentLanguage]}</span>
                </a>
            `;
            
            projectsList.appendChild(li);
        });
        
        // Add click event to project links
        document.querySelectorAll('[data-project-id]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = e.currentTarget.getAttribute('data-project-id');
                loadProject(projectId);
                
                // Close sidebar on mobile after selection
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            });
        });
    }
    
    // Load project content
    function loadProject(projectId) {
        currentProject = projectId;
        const project = projectsData.find(p => p.id === projectId);
        
        if (!project) return;
        
        // Update active state in sidebar
        document.querySelectorAll('[data-project-id]').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-project-id') === projectId) {
                link.classList.add('active');
            }
        });
        
        // Render project content
        renderProjectContent(project);
    }
    
    // Render project content
    function renderProjectContent(project) {
        const sections = [
            { id: 'overview', icon: 'fa-eye', title: getSectionTitle('overview') },
            { id: 'objective', icon: 'fa-bullseye', title: getSectionTitle('objective') },
            { id: 'application', icon: 'fa-laptop-code', title: getSectionTitle('application') },
            { id: 'architecture', icon: 'fa-sitemap', title: getSectionTitle('architecture') },
            { id: 'userGuide', icon: 'fa-book', title: getSectionTitle('userGuide') },
            { id: 'nextSteps', icon: 'fa-arrow-right', title: getSectionTitle('nextSteps') },
            { id: 'background', icon: 'fa-history', title: getSectionTitle('background') },
            { id: 'references', icon: 'fa-link', title: getSectionTitle('references') }
        ];
        
        let contentHTML = `
            <div class="project-header">
                <h1><i class="fas ${project.icon}"></i> ${project.name[currentLanguage]}</h1>
            </div>
        `;
        
        sections.forEach(section => {
            const sectionContent = project.sections[section.id][currentLanguage];
            contentHTML += `
                <div class="section-card">
                    <h2><i class="fas ${section.icon}"></i> ${section.title}</h2>
                    <div class="section-content">
                        ${sectionContent}
                    </div>
                </div>
            `;
        });
        
        projectContent.innerHTML = contentHTML;
    }
    
    // Get section title based on current language
    function getSectionTitle(sectionId) {
        const titles = {
            overview: {
                pt: 'Visão Geral',
                en: 'Overview',
                es: 'Visión General'
            },
            objective: {
                pt: 'Objetivo',
                en: 'Objective',
                es: 'Objetivo'
            },
            application: {
                pt: 'Aplicação',
                en: 'Application',
                es: 'Aplicación'
            },
            architecture: {
                pt: 'Arquitetura',
                en: 'Architecture',
                es: 'Arquitectura'
            },
            userGuide: {
                pt: 'Guia do Usuário',
                en: 'User Guide',
                es: 'Guía del Usuario'
            },
            nextSteps: {
                pt: 'Próximos Passos',
                en: 'Next Steps',
                es: 'Próximos Pasos'
            },
            background: {
                pt: 'Contexto',
                en: 'Background',
                es: 'Contexto'
            },
            references: {
                pt: 'Referências',
                en: 'References',
                es: 'Referencias'
            }
        };
        
        return titles[sectionId][currentLanguage];
    }
    
    // Handle language change
    function handleLanguageChange() {
        currentLanguage = languageSelect.value;
        localStorage.setItem('language', currentLanguage);
        
        // Update projects list
        renderProjectsList();
        
        // Reload current project content if exists
        if (currentProject) {
            loadProject(currentProject);
        }
    }
    
    // Toggle theme
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Toggle sidebar on mobile
    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }
    
    // Initialize the app
    init();
});