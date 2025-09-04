// Variáveis globais
let currentLang = 'pt';
let currentProject = null;
let isDarkMode = false;

// Inicialização do documento
document.addEventListener('DOMContentLoaded', function() {
    // Carregar projetos na barra lateral
    loadProjects();
    
    // Configurar eventos
    setupEventListeners();
    
    // Verificar preferência de modo escuro
    checkDarkModePreference();
    
    // Inicializar tooltips
    initializeTooltips();
});

// Carregar projetos na barra lateral
function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    projects.forEach(project => {
        const li = document.createElement('li');
        li.className = 'project-item';
        li.dataset.projectId = project.id;
        
        const icon = document.createElement('i');
        icon.className = `fas ${project.icon}`;
        
        const name = document.createElement('span');
        name.textContent = project.name;
        
        li.appendChild(icon);
        li.appendChild(name);
        
        li.addEventListener('click', function() {
            selectProject(project.id);
        });
        
        projectsList.appendChild(li);
    });
}

// Selecionar um projeto
function selectProject(projectId) {
    // Remover classe active de todos os itens
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adicionar classe active ao item selecionado
    const selectedItem = document.querySelector(`.project-item[data-project-id="${projectId}"]`);
    selectedItem.classList.add('active');
    
    // Fechar sidebar no mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
    
    // Carregar conteúdo do projeto
    currentProject = projects.find(p => p.id === projectId);
    loadProjectContent(projectId);
}

// Carregar conteúdo do projeto
function loadProjectContent(projectId) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    
    // Cabeçalho do projeto
    const projectHeader = document.createElement('div');
    projectHeader.className = 'project-header';
    
    const projectTitle = document.createElement('h1');
    projectTitle.textContent = currentProject.name;
    projectHeader.appendChild(projectTitle);
    
    contentDiv.appendChild(projectHeader);
    
    // Carregar seções do projeto
    currentProject.sections.forEach(sectionId => {
        const section = document.createElement('div');
        section.className = 'section';
        
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'section-title';
        sectionTitle.dataset.i18n = sectionId;
        sectionTitle.textContent = i18n[currentLang][sectionId];
        
        const sectionContent = document.createElement('div');
        sectionContent.className = 'section-content';
        sectionContent.dataset.i18n = `content.${projectId}.${sectionId}`;
        sectionContent.textContent = i18n[currentLang].content[projectId][sectionId];
        
        section.appendChild(sectionTitle);
        section.appendChild(sectionContent);
        
        contentDiv.appendChild(section);
    });
    
    // Rolar para o topo
    window.scrollTo(0, 0);
}

// Configurar event listeners
function setupEventListeners() {
    // Botões de idioma
    document.getElementById('lang-pt').addEventListener('click', () => changeLanguage('pt'));
    document.getElementById('lang-en').addEventListener('click', () => changeLanguage('en'));
    document.getElementById('lang-es').addEventListener('click', () => changeLanguage('es'));
    
    // Botão de modo escuro
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
    
    // Botão de menu mobile
    document.getElementById('mobile-menu-toggle').addEventListener('click', toggleMobileMenu);
    
    // Botão de busca
    document.getElementById('search-btn').addEventListener('click', performSearch);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Botão voltar ao topo
    document.getElementById('back-to-top').addEventListener('click', scrollToTop);
    
    // Monitorar rolagem para mostrar/ocultar botão voltar ao topo
    window.addEventListener('scroll', function() {
        const backToTopButton = document.getElementById('back-to-top');
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

// Mudar idioma
function changeLanguage(lang) {
    currentLang = lang;
    
    // Atualizar botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Atualizar atributo lang do HTML
    document.documentElement.lang = lang;
    
    // Atualizar textos com data-i18n
    updateTexts();
    
    // Recarregar conteúdo do projeto se houver um selecionado
    if (currentProject) {
        loadProjectContent(currentProject.id);
    }
    
    // Atualizar placeholder do campo de busca
    document.getElementById('search-input').placeholder = i18n[currentLang].search;
}

// Atualizar textos com base no idioma
function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.dataset.i18n.split('.');
        let value = i18n[currentLang];
        
        for (const key of keys) {
            if (value[key] !== undefined) {
                value = value[key];
            } else {
                value = null;
                break;
            }
        }
        
        if (value !== null) {
            element.textContent = value;
        }
    });
}

// Alternar modo escuro
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('dark-mode-toggle').innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'true');
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('dark-mode-toggle').innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'false');
    }
}

// Verificar preferência de modo escuro
function checkDarkModePreference() {
    const darkModePreference = localStorage.getItem('darkMode');
    
    if (darkModePreference === 'true' || 
        (!darkModePreference && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDarkMode = true;
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('dark-mode-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Alternar menu mobile
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Realizar busca
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchTerm) {
        return;
    }
    
    const results = [];
    
    // Buscar em projetos
    projects.forEach(project => {
        // Buscar no nome do projeto
        if (project.name.toLowerCase().includes(searchTerm)) {
            results.push({
                type: 'project',
                project: project,
                text: project.name
            });
        }
        
        // Buscar nas seções do projeto
        project.sections.forEach(sectionId => {
            const sectionText = i18n[currentLang].content[project.id][sectionId];
            if (sectionText.toLowerCase().includes(searchTerm)) {
                results.push({
                    type: 'section',
                    project: project,
                    section: sectionId,
                    text: getExcerpt(sectionText, searchTerm, 100)
                });
            }
        });
    });
    
    // Mostrar resultados
    showSearchResults(results, searchTerm);
}

// Obter excerto do texto
function getExcerpt(text, searchTerm, maxLength) {
    const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) return text.substring(0, maxLength);
    
    const start = Math.max(0, index - 30);
    const end = Math.min(text.length, index + searchTerm.length + 70);
    
    let excerpt = text.substring(start, end);
    
    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt = excerpt + '...';
    
    return excerpt;
}

// Mostrar resultados da busca
function showSearchResults(results, searchTerm) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    
    const resultsHeader = document.createElement('div');
    resultsHeader.className = 'search-results-header';
    
    const resultsTitle = document.createElement('h2');
    resultsTitle.textContent = `${i18n[currentLang].search}: "${searchTerm}"`;
    resultsHeader.appendChild(resultsTitle);
    
    const resultsCount = document.createElement('p');
    resultsCount.textContent = `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'} encontrados`;
    resultsHeader.appendChild(resultsCount);
    
    contentDiv.appendChild(resultsHeader);
    
    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'Nenhum resultado encontrado para sua busca.';
        contentDiv.appendChild(noResults);
        return;
    }
    
    const resultsList = document.createElement('div');
    resultsList.className = 'search-results-list';
    
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        
        const resultTitle = document.createElement('h3');
        resultTitle.textContent = result.project.name;
        
        if (result.type === 'section') {
            const sectionName = document.createElement('span');
            sectionName.className = 'search-result-section';
            sectionName.textContent = ` - ${i18n[currentLang][result.section]}`;
            resultTitle.appendChild(sectionName);
        }
        
        const resultText = document.createElement('p');
        resultText.textContent = result.text;
        
        const resultLink = document.createElement('a');
        resultLink.href = '#';
        resultLink.className = 'search-result-link';
        resultLink.textContent = 'Ver projeto';
        resultLink.addEventListener('click', function(e) {
            e.preventDefault();
            selectProject(result.project.id);
            
            // Rolar para a seção específica se for uma busca de seção
            if (result.type === 'section') {
                setTimeout(() => {
                    const sectionElement = document.querySelector(`.section-title[data-i18n="${result.section}"]`);
                    if (sectionElement) {
                        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        });
        
        resultItem.appendChild(resultTitle);
        resultItem.appendChild(resultText);
        resultItem.appendChild(resultLink);
        
        resultsList.appendChild(resultItem);
    });
    
    contentDiv.appendChild(resultsList);
}

// Rolar para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Inicializar tooltips
function initializeTooltips() {
    // Esta função pode ser expandida para incluir tooltips
    // Por enquanto, está aqui como placeholder
}