// Estado da aplicação
const state = {
    currentLang: 'pt',
    currentTheme: 'light',
    texts: {},
    isOpen: {
        menu: false,
        modal: false
    }
};

// Elementos DOM
const elements = {
    menuToggle: document.getElementById('menuToggle'),
    sideMenu: document.getElementById('sideMenu'),
    closeMenu: document.getElementById('closeMenu'),
    overlay: document.getElementById('overlay'),
    themeToggle: document.getElementById('themeToggle'),
    modal: document.getElementById('modal'),
    modalClose: document.getElementById('modalClose'),
    modalTitle: document.getElementById('modalTitle'),
    modalDescription: document.getElementById('modalDescription'),
    modalExploreBtn: document.getElementById('modalExploreBtn'),
    langBtns: document.querySelectorAll('.lang-btn'),
    trailCards: document.querySelectorAll('.trail-card'),
    stepItems: document.querySelectorAll('.step-item'),
    exploreBtns: document.querySelectorAll('.explore-btn'),
    body: document.body,
    html: document.documentElement
};

// Carregar textos
async function loadTexts() {
    try {
        const response = await fetch('texts.json');
        state.texts = await response.json();
        applyLanguage(state.currentLang);
    } catch (error) {
        console.error('Erro ao carregar textos:', error);
    }
}

// Aplicar idioma
function applyLanguage(lang) {
    state.currentLang = lang;
    elements.html.lang = lang;
    
    // Atualizar botões de idioma
    elements.langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Atualizar textos
    document.querySelectorAll('[data-translate]').forEach(element => {
        const keys = element.dataset.translate.split('.');
        let text = state.texts[lang];
        
        for (const key of keys) {
            text = text?.[key];
        }
        
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Salvar preferência
    localStorage.setItem('gearmap-lang', lang);
}

// Alternar tema
function toggleTheme() {
    state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    elements.body.setAttribute('data-theme', state.currentTheme);
    localStorage.setItem('gearmap-theme', state.currentTheme);
}

// Carregar tema salvo
function loadTheme() {
    const savedTheme = localStorage.getItem('gearmap-theme') || 'light';
    state.currentTheme = savedTheme;
    elements.body.setAttribute('data-theme', savedTheme);
}

// Abrir/Fechar menu
function toggleMenu(open) {
    state.isOpen.menu = open;
    elements.sideMenu.classList.toggle('open', open);
    elements.overlay.classList.toggle('active', open);
    elements.body.style.overflow = open ? 'hidden' : '';
}

// Abrir modal
function openModal(title, description) {
    elements.modalTitle.textContent = title;
    elements.modalDescription.textContent = description;
    elements.modal.classList.add('active');
    elements.body.style.overflow = 'hidden';
    state.isOpen.modal = true;
}

// Fechar modal
function closeModal() {
    elements.modal.classList.remove('active');
    elements.body.style.overflow = '';
    state.isOpen.modal = false;
}

// Obter descrição da etapa
function getStepDescription(path, step) {
    const descriptions = state.texts[state.currentLang]?.stepDescriptions;
    if (descriptions && descriptions[path] && descriptions[path][step]) {
        return descriptions[path][step];
    }
    return { title: step, description: 'Descrição não disponível' };
}

// Desenhar conectores SVG
function drawConnectors() {
    const svg = document.querySelector('.connectors');
    const cards = document.querySelectorAll('.trail-card');
    
    if (cards.length < 2) return;
    
    // Limpar SVG existente
    svg.innerHTML = svg.innerHTML.replace(/<path[^>]*>/g, '');
    
    // Adicionar paths conectivos
    const paths = [];
    for (let i = 0; i < cards.length - 1; i++) {
        const card1 = cards[i].getBoundingClientRect();
        const card2 = cards[i + 1].getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        
        const x1 = card1.right - svgRect.left;
        const y1 = card1.top + card1.height / 2 - svgRect.top;
        const x2 = card2.left - svgRect.left;
        const y2 = card2.top + card2.height / 2 - svgRect.top;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${(y1 + y2) / 2} T ${x2} ${y2}`);
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '5,5');
        path.setAttribute('opacity', '0.2');
        
        // Adicionar animação
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = `drawPath 2s ease-out ${i * 0.2}s forwards`;
        
        svg.appendChild(path);
    }
    
    // Adicionar estilo de animação
    if (!document.getElementById('pathAnimation')) {
        const style = document.createElement('style');
        style.id = 'pathAnimation';
        style.textContent = `
            @keyframes drawPath {
                to {
                    stroke-dashoffset: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Event Listeners
elements.menuToggle.addEventListener('click', () => toggleMenu(true));
elements.closeMenu.addEventListener('click', () => toggleMenu(false));
elements.overlay.addEventListener('click', () => {
    if (state.isOpen.menu) toggleMenu(false);
    if (state.isOpen.modal) closeModal();
});
elements.themeToggle.addEventListener('click', toggleTheme);
elements.modalClose.addEventListener('click', closeModal);
elements.modalExploreBtn.addEventListener('click', () => {
    console.log('Explorar clicado');
    // Aqui pode adicionar a lógica de navegação
});

// Idioma
elements.langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        applyLanguage(btn.dataset.lang);
    });
});

// Cliques nos cards de trilha
elements.trailCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.step-item') && !e.target.closest('.explore-btn')) {
            const path = card.dataset.path;
            const pathData = state.texts[state.currentLang].paths[path];
            openModal(
                pathData.title,
                `${pathData.description}\n\nEsta trilha contém ${card.querySelectorAll('.step-item').length} etapas para guiá-lo em sua jornada.`
            );
        }
    });
});

// Cliques nas etapas
elements.stepItems.forEach(step => {
    step.addEventListener('click', (e) => {
        e.stopPropagation();
        const path = step.closest('.trail-card').dataset.path;
        const stepName = step.dataset.step;
        const description = getStepDescription(path, stepName);
        openModal(description.title, description.description);
    });
});

// Cliques nos botões explorar
elements.exploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const path = btn.closest('.trail-card').dataset.path;
        const pathData = state.texts[state.currentLang].paths[path];
        openModal(
            `Explorar ${pathData.title}`,
            `Prepare-se para iniciar sua jornada em ${pathData.title.toLowerCase()}. Esta trilha foi desenhada para ${pathData.description.toLowerCase()}.`
        );
    });
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (state.isOpen.modal) closeModal();
        if (state.isOpen.menu) toggleMenu(false);
    }
});

// Redesenhar conectores no resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(drawConnectors, 250);
});

// Inicialização
async function init() {
    // Carregar preferências salvas
    const savedLang = localStorage.getItem('gearmap-lang') || 'pt';
    loadTheme();
    
    // Carregar textos e aplicar idioma
    await loadTexts();
    applyLanguage(savedLang);
    
    // Desenhar conectores após carregar
    setTimeout(drawConnectors, 100);
    
    // Adicionar animação de entrada
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// Iniciar aplicação
init();