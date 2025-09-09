// ===== GESTÃO DO MENU LATERAL (MOBILE) =====
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Criar overlay dinamicamente
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Função para abrir o sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar o sidebar
    function closeSidebarFunc() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    menuToggle.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFunc);
    overlay.addEventListener('click', closeSidebarFunc);
    
    // Fechar sidebar ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 640) {
                closeSidebarFunc();
            }
        });
    });
    
    // ===== SMOOTH SCROLL =====
    // Adicionar smooth scroll aos links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Ajuste para o menu fixo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== DESTAQUE DA SEÇÃO ATIVA =====
    // Função para destacar a seção ativa no menu durante o scroll
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 150; // Offset para considerar o menu fixo
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', highlightActiveSection);
    
    // ===== LISTA DINÂMICA DE PROTÓTIPOS =====
    // Array de protótipos (pode ser alimentado por API futuramente)
    const prototypes = [
        {
            name: 'Aventuras Peludas',
            description: 'Plataforma de gerenciamento de pets com rastreamento de saúde e atividades',
            status: 'active',
            icon: 'fa-paw'
        },
        {
            name: 'BaristaPro',
            description: 'Sistema inteligente para gestão de cafeterias e controle de estoque',
            status: 'development',
            icon: 'fa-coffee'
        },
        {
            name: 'Baristas',
            description: 'Rede social para amantes de café compartilharem experiências',
            status: 'prototype',
            icon: 'fa-mug-hot'
        },
        {
            name: 'Bosque das Frutíferas',
            description: 'Aplicativo de cultivo sustentável e troca de sementes',
            status: 'active',
            icon: 'fa-seedling'
        },
        {
            name: 'Dyris',
            description: 'Ferramenta de análise de dados em tempo real para negócios',
            status: 'development',
            icon: 'fa-chart-line'
        },
        {
            name: 'Fabr',
            description: 'Plataforma de fabricação digital e prototipagem rápida',
            status: 'prototype',
            icon: 'fa-industry'
        },
        {
            name: 'Mecanico Fantasma',
            description: 'Sistema de diagnóstico automotivo com IA',
            status: 'active',
            icon: 'fa-car'
        },
        {
            name: 'MyHeart',
            description: 'Monitor de saúde cardíaca com alertas inteligentes',
            status: 'development',
            icon: 'fa-heartbeat'
        },
        {
            name: 'Mike e Tio Bob',
            description: 'Plataforma educacional para crianças com histórias interativas',
            status: 'active',
            icon: 'fa-book-open'
        },
        {
            name: 'Oxygen',
            description: 'Sistema de monitoramento de qualidade do ar',
            status: 'prototype',
            icon: 'fa-wind'
        },
        {
            name: 'Raiz Urbana',
            description: 'App de agricultura urbana e hortas comunitárias',
            status: 'active',
            icon: 'fa-tree'
        },
        {
            name: 'SIMCO',
            description: 'Sistema integrado de gestão comercial',
            status: 'development',
            icon: 'fa-shopping-cart'
        },
        {
            name: 'Stairs',
            description: 'Plataforma de fitness com desafios diários',
            status: 'prototype',
            icon: 'fa-running'
        },
        {
            name: 'Synapse',
            description: 'Rede neural para processamento de linguagem natural',
            status: 'development',
            icon: 'fa-brain'
        },
        {
            name: 'UnderSea',
            description: 'Explorador virtual de ecossistemas marinhos',
            status: 'active',
            icon: 'fa-fish'
        },
        {
            name: 'Verso Espresso',
            description: 'Marketplace de cafés especiais e produtores',
            status: 'prototype',
            icon: 'fa-store'
        },
        {
            name: 'Viver é uma Arte',
            description: 'Plataforma de bem-estar e mindfulness',
            status: 'active',
            icon: 'fa-spa'
        },
        {
            name: '3GTO',
            description: 'Sistema de gestão de projetos em 3D',
            status: 'development',
            icon: 'fa-cube'
        }
    ];
    
    // Função para renderizar os protótipos
    function renderPrototypes() {
        const prototypesGrid = document.getElementById('prototypesGrid');
        
        // Limpar o container
        prototypesGrid.innerHTML = '';
        
        // Iterar sobre os protótipos e criar os cards
        prototypes.forEach((prototype, index) => {
            const card = document.createElement('div');
            card.className = 'prototype-card';
            
            // Definir a classe de status
            const statusClass = `status-${prototype.status}`;
            const statusText = {
                'active': 'Ativo',
                'development': 'Em Desenvolvimento',
                'prototype': 'Protótipo'
            }[prototype.status];
            
            // Estrutura HTML do card
            card.innerHTML = `
                <h3>
                    <i class="fas ${prototype.icon}"></i>
                    ${prototype.name}
                </h3>
                <p>${prototype.description}</p>
                <span class="prototype-status ${statusClass}">${statusText}</span>
            `;
            
            // Adicionar evento de clique (para futura implementação de páginas detalhadas)
            card.addEventListener('click', () => {
                // Placeholder para futura navegação para página detalhada
                console.log(`Clicou no protótipo: ${prototype.name}`);
                // window.location.href = `/prototipos/${prototype.name.toLowerCase().replace(/\s+/g, '-')}`;
            });
            
            // Adicionar o card ao grid
            prototypesGrid.appendChild(card);
        });
    }
    
    // Chamar a função para renderizar os protótipos
    renderPrototypes();
    
    // ===== ANIMAÇÃO AO SCROLL =====
    // Função para adicionar animação aos elementos quando entram na viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.prototype-card, .objective-item, .arch-layer');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Adicionar evento de scroll para animação
    window.addEventListener('scroll', animateOnScroll);
    
    // Chamar a função uma vez para animar elementos visíveis no carregamento
    animateOnScroll();
    
    // ===== MELHORIAS DE ACESSIBILIDADE =====
    // Adicionar suporte a teclado para navegação
    document.addEventListener('keydown', function(e) {
        // Fechar sidebar com ESC
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarFunc();
        }
    });
    
    // ===== DETECÇÃO DE TAMANHO DE TELA =====
    // Função para ajustar comportamentos baseado no tamanho da tela
    function handleResize() {
        if (window.innerWidth > 640 && sidebar.classList.contains('active')) {
            closeSidebarFunc();
        }
    }
    
    // Adicionar evento de resize
    window.addEventListener('resize', handleResize);
    
    // ===== PREVENÇÃO DE SCROLL DUPLICADO =====
    // Prevenir scroll duplo quando o sidebar está aberto
    let scrollPosition = 0;
    
    menuToggle.addEventListener('click', function() {
        if (!sidebar.classList.contains('active')) {
            scrollPosition = window.pageYOffset;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
        }
    });
    
    function closeSidebarWithScroll() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }
    
    // Atualizar listeners para usar a nova função
    closeSidebar.addEventListener('click', closeSidebarWithScroll);
    overlay.addEventListener('click', closeSidebarWithScroll);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 640) {
                closeSidebarWithScroll();
            }
        });
    });
});