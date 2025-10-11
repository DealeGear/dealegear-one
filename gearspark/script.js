document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const ideasGrid = document.getElementById('ideasGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mobileFilterBtns = document.querySelectorAll('.mobile-filter-btn');
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // Estado da aplicação
    let currentFilter = 'all';
    let currentLang = localStorage.getItem('gearmap-lang') || 'pt';
    let currentTheme = localStorage.getItem('gearmap-theme') || 'light';
    let ideasData = {};
    
    // Inicialização
    init();
    
    async function init() {
        // Carregar dados do JSON
        await loadContent();
        
        // Aplicar tema salvo
        applyTheme(currentTheme);
        
        // Aplicar idioma salvo
        applyLanguage(currentLang);
        
        // Renderizar ideias iniciais
        renderIdeas(currentFilter);
        
        // Adicionar event listeners
        setupEventListeners();
    }
    
    async function loadContent() {
        try {
            const response = await fetch('content.json');
            const data = await response.json();
            ideasData = data;
        } catch (error) {
            console.error('Erro ao carregar conteúdo:', error);
        }
    }
    
    function setupEventListeners() {
        // Toggle tema
        themeToggle.addEventListener('click', toggleTheme);
        
        // Menu mobile
        mobileMenuToggle.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        
        // Filtros desktop
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                applyFilter(filter);
            });
        });
        
        // Filtros mobile
        mobileFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                applyFilter(filter);
                closeMobileMenu();
            });
        });
        
        // Idiomas
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                applyLanguage(lang);
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
    }
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('gearmap-theme', theme);
        
        // Atualizar ícone
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function applyFilter(filter) {
        currentFilter = filter;
        
        // Atualizar botões ativos
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });
        
        mobileFilterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });
        
        // Renderizar ideias com animação
        renderIdeas(filter);
    }
    
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('gearmap-lang', lang);
        
        // Atualizar atributo lang do HTML
        document.documentElement.setAttribute('lang', lang);
        
        // Atualizar botões ativos
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        // Atualizar textos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedValue(ideasData[lang], key);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Re-renderizar ideias
        renderIdeas(currentFilter);
    }
    
    function getNestedValue(obj, path) {
        return path.split('.').reduce((o, p) => o && o[p], obj);
    }
    
    function renderIdeas(filter) {
        // Limpar grid
        ideasGrid.innerHTML = '';
        
        // Obter ideias para renderizar
        let ideasToRender = [];
        
        if (filter === 'all') {
            // Obter todas as ideias de todas as categorias
            const categories = ['hobby', 'income', 'career', 'startup'];
            categories.forEach(category => {
                const categoryIdeas = ideasData[currentLang].categories[category].ideas;
                ideasToRender = [...ideasToRender, ...categoryIdeas.map(idea => ({...idea, category}))];
            });
        } else {
            // Obter ideias da categoria selecionada
            const categoryIdeas = ideasData[currentLang].categories[filter].ideas;
            ideasToRender = categoryIdeas.map(idea => ({...idea, category: filter}));
        }
        
        // Renderizar cards com animação escalonada
        ideasToRender.forEach((idea, index) => {
            setTimeout(() => {
                const card = createIdeaCard(idea);
                ideasGrid.appendChild(card);
            }, index * 50);
        });
    }
    
    function createIdeaCard(idea) {
        const card = document.createElement('div');
        card.className = 'idea-card';
        
        const badgeClass = `badge-${idea.category}`;
        const categoryName = ideasData[currentLang].categories[idea.category].title;
        
        card.innerHTML = `
            <span class="idea-badge ${badgeClass}">${categoryName}</span>
            <h3 class="idea-title">${idea.title}</h3>
            <p class="idea-description">${idea.description}</p>
        `;
        
        return card;
    }
});