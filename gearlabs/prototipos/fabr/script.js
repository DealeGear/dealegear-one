// Dados dos projetos
const projetos = [
    {
        titulo: "Máquina de Reciclagem de Plásticos",
        modulos: ["Química", "Mecânica", "Eletrônica"],
        status: "Buscando colaboradores",
        descricao: "Protótipo modular para triturar e extrusar plástico reciclado."
    },
    {
        titulo: "Mini Turbina Eólica Urbana",
        modulos: ["Aerodinâmica", "CAD", "Eletrônica de Potência"],
        status: "Em andamento",
        descricao: "Turbina de baixo custo para geração distribuída em áreas urbanas."
    },
    {
        titulo: "Robô Móvel para Inspeção Industrial",
        modulos: ["Visão Computacional", "Mecatrônica"],
        status: "Aberto",
        descricao: "Robô para monitoramento remoto de áreas industriais."
    }
];

// Dados das habilidades
const habilidades = [
    { nome: "Impressão 3D", trending: true },
    { nome: "Soldagem", trending: false },
    { nome: "Programação embarcada", trending: true },
    { nome: "CAD Mecânico", trending: true },
    { nome: "Eletrônica de Potência", trending: false },
    { nome: "Química de Materiais", trending: false },
    { nome: "Corte a Laser", trending: true },
    { nome: "Prototipagem Rápida", trending: false },
    { nome: "Automação Industrial", trending: true },
    { nome: "Design de Produto", trending: false }
];

// Função para renderizar os projetos
function renderProjetos() {
    const container = document.getElementById('projetos-container');
    
    projetos.forEach(projeto => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Determina a classe CSS com base no status
        let statusClass = 'status-open';
        if (projeto.status === 'Em andamento') {
            statusClass = 'status-progress';
        } else if (projeto.status === 'Buscando colaboradores') {
            statusClass = 'status-seeking';
        }
        
        // Cria os módulos como tags
        const modulosHTML = projeto.modulos.map(modulo => 
            `<span class="module-tag">${modulo}</span>`
        ).join('');
        
        card.innerHTML = `
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <div class="project-modules">${modulosHTML}</div>
            <span class="project-status ${statusClass}">${projeto.status}</span>
        `;
        
        container.appendChild(card);
    });
}

// Função para renderizar as habilidades
function renderHabilidades() {
    const container = document.getElementById('habilidades-container');
    
    habilidades.forEach(habilidade => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        
        if (habilidade.trending) {
            tag.classList.add('trending');
        }
        
        tag.textContent = habilidade.nome;
        container.appendChild(tag);
    });
}

// Função para configurar o accordion do FAQ
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os itens
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').classList.remove('active');
            });
            
            // Abre o item clicado se não estava ativo
            if (!isActive) {
                faqItem.classList.add('active');
                question.classList.add('active');
            }
        });
    });
}

// Função para configurar a animação da timeline
function setupTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Função para configurar o toggle de modo claro/escuro
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    // Verifica se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Atualiza o ícone
        if (body.classList.contains('light-mode')) {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Função para configurar o menu mobile
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animação do botão hambúrguer
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'rotate(0) translateY(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translateY(0)';
        }
    });
}

// Função para configurar o scroll suave para links âncora
function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcula a posição com offset para o header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    
                    // Reseta o botão hambúrguer
                    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'rotate(0) translateY(0)';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'rotate(0) translateY(0)';
                }
            }
        });
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    renderProjetos();
    renderHabilidades();
    setupFAQ();
    setupTimelineAnimation();
    setupThemeToggle();
    setupMobileMenu();
    setupSmoothScroll();
});