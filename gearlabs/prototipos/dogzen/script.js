// ====== FUNÇÃO PRINCIPAL PARA CARREGAR CONTEÚDO ======
document.addEventListener('DOMContentLoaded', function() {
    // Carregar conteúdo do JSON
    loadContent();
    
    // Inicializar funcionalidades
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeScrollEffects();
});

// ====== CARREGAMENTO DINÂMICO DE CONTEÚDO ======
async function loadContent() {
    try {
        // Simulando requisição JSON (em produção, seria fetch('./content.json'))
        const content = {
            "hero": {
                "title": "DogZen",
                "tagline": "Protótipo de casinha anti-ruído para cães",
                "button": "Ver Detalhes Técnicos"
            },
            "overview": {
                "title": "Visão Geral do Projeto",
                "problem": {
                    "title": "O Problema",
                    "description": "Cães são extremamente sensíveis a ruídos altos e repentinos, como trovões, fogos de artifício e barulhos urbanos. Esses sons podem causar estresse, ansiedade e até traumas permanentes, afetando significativamente a qualidade de vida dos animais."
                },
                "solution": {
                    "title": "A Solução DogZen",
                    "description": "DogZen é um protótipo de casinha acústica projetada para proporcionar um ambiente seguro e silencioso para cães. Utilizando materiais isolantes e design otimizado, reduz significativamente a penetração de ruídos externos, criando um refúgio tranquilo."
                }
            },
            "architecture": {
                "title": "Arquitetura e Design",
                "structure": {
                    "title": "Estrutura Básica",
                    "description": "A casinha possui formato de casinha tradicional com paredes duplas para isolamento acústico. O design inclui entrada em túnel para reduzir entrada de som e ventilação controlada para conforto térmico."
                },
                "materials": {
                    "title": "Materiais Sugeridos",
                    "list": [
                        "Painéis de MDF leve (estrutura externa)",
                        "Espuma acústica de alta densidade (isolamento)",
                        "Tecido acústico revestido (internamente)",
                        "Borracha de vedação (portas e juntas)",
                        "Madeira compensada (base e estrutura)"
                    ]
                },
                "modular": {
                    "title": "Design Modular",
                    "description": "O projeto foi pensado em módulos que podem ser facilmente montados, desmontados e transportados. Cada parede é independente e se encaixa através de um sistema de ranhuras, facilitando a replicação e personalização."
                },
                "specs": {
                    "title": "Especificações Técnicas",
                    "items": [
                        {"label": "Altura", "value": "80cm"},
                        {"label": "Largura", "value": "100cm"},
                        {"label": "Profundidade", "value": "90cm"},
                        {"label": "Peso", "value": "~25kg"},
                        {"label": "Redução de Ruído", "value": "25-30dB"},
                        {"label": "Capacidade", "value": "Cães até 30kg"}
                    ]
                }
            },
            "technical": {
                "title": "Funcionamento Técnico",
                "acoustic": {
                    "title": "Isolamento Acústico",
                    "description": "O sistema utiliza múltiplas camadas de materiais com diferentes densidades para absorver e bloquear ondas sonoras. A espuma acústica interna absorve frequências médias e altas, enquanto a estrutura de madeira bloqueia baixas frequências."
                },
                "sensors": {
                    "title": "Sensores Integrados",
                    "description": "O protótipo pode ser equipado com sensores de temperatura, umidade e nível de ruído interno. Um microfone externo monitora os sons ambiente e aciona sistemas de conforto quando detecta ruídos elevados."
                },
                "thermal": {
                    "title": "Conforto Térmico",
                    "description": "Sistema de ventilação passiva com entradas de ar estrategicamente posicionadas para evitar superaquecimento. O isolamento térmico dos materiais também ajuda a manter temperatura interna estável."
                }
            },
            "guide": {
                "title": "Guia de Replicação",
                "steps": {
                    "title": "Instruções de Montagem",
                    "list": [
                        "Corte os painéis de MDF nas dimensões especificadas",
                        "Instale a espuma acústica nas paredes internas",
                        "Monte a estrutura base usando parafusos e cola de madeira",
                        "Fixe as paredes laterais na base com encaixes precisos",
                        "Instale o teto com sistema de vedação",
                        "Aplique o tecido acústico nas superfícies internas",
                        "Instale as borrachas de vedação em todas as juntas",
                        "Teste o isolamento com fontes sonoras externas"
                    ]
                },
                "tools": {
                    "title": "Ferramentas Necessárias",
                    "list": [
                        "Serra circular ou serra de mesa",
                        "Furadeira e brocas",
                        "Parafusadeira",
                        "Martelo de borracha",
                        "Fita métrica e esquadro",
                        "Lixadeira e lixas",
                        "Pistola de cola quente",
                        "Estilete preciso"
                    ]
                },
                "improvements": {
                    "title": "Sugestões de Melhorias",
                    "list": [
                        "Adicionar sistema de iluminação LED interna",
                        "Integrar ventilador silencioso para melhor circulação",
                        "Desenvolver versão portátil com rodas",
                        "Criar sistema de monitoramento via app",
                        "Adicionar câmara interna para observação",
                        "Implementar materiais recicláveis e sustentáveis",
                        "Desenvolver versão para cães de grande porte"
                    ]
                }
            },
            "community": {
                "title": "Próximos Passos e Comunidade",
                "collaboration": {
                    "title": "Junte-se ao Projeto",
                    "description": "DogZen é um projeto open source e estamos buscando colaboradores para evoluí-lo. Se você é designer, engenheiro, veterinário ou entusiasta, sua contribuição é valiosa. Juntos podemos criar uma solução acessível e eficaz para todos os cães."
                },
                "links": {
                    "title": "Links Úteis",
                    "github": "Repositório GitHub",
                    "contact": "Entre em Contato",
                    "docs": "Documentação Completa"
                }
            },
            "footer": {
                "text": "DogZen 2025 - Um projeto open source para o bem-estar dos cães"
            }
        };

        // Renderizar conteúdo na página
        renderContent(content);
    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
    }
}

// ====== FUNÇÃO PARA RENDERIZAR CONTEÚDO ======
function renderContent(content) {
    // Hero Section
    document.getElementById('heroTitle').textContent = content.hero.title;
    document.getElementById('heroTagline').textContent = content.hero.tagline;
    document.getElementById('heroBtn').textContent = content.hero.button;
    
    // Overview Section
    document.getElementById('overviewTitle').textContent = content.overview.title;
    document.getElementById('overviewProblemTitle').textContent = content.overview.problem.title;
    document.getElementById('overviewProblemDesc').textContent = content.overview.problem.description;
    document.getElementById('overviewSolutionTitle').textContent = content.overview.solution.title;
    document.getElementById('overviewSolutionDesc').textContent = content.overview.solution.description;
    
    // Architecture Section
    document.getElementById('architectureTitle').textContent = content.architecture.title;
    document.getElementById('architectureStructureTitle').textContent = content.architecture.structure.title;
    document.getElementById('architectureStructureDesc').textContent = content.architecture.structure.description;
    document.getElementById('architectureMaterialsTitle').textContent = content.architecture.materials.title;
    renderList('architectureMaterialsList', content.architecture.materials.list);
    document.getElementById('architectureModularTitle').textContent = content.architecture.modular.title;
    document.getElementById('architectureModularDesc').textContent = content.architecture.modular.description;
    document.getElementById('architectureSpecsTitle').textContent = content.architecture.specs.title;
    renderSpecs('architectureSpecsList', content.architecture.specs.items);
    
    // Technical Section
    document.getElementById('technicalTitle').textContent = content.technical.title;
    document.getElementById('technicalAcousticTitle').textContent = content.technical.acoustic.title;
    document.getElementById('technicalAcousticDesc').textContent = content.technical.acoustic.description;
    document.getElementById('technicalSensorsTitle').textContent = content.technical.sensors.title;
    document.getElementById('technicalSensorsDesc').textContent = content.technical.sensors.description;
    document.getElementById('thermalTitle').textContent = content.technical.thermal.title;
    document.getElementById('thermalDesc').textContent = content.technical.thermal.description;
    
    // Guide Section
    document.getElementById('guideTitle').textContent = content.guide.title;
    document.getElementById('guideStepsTitle').textContent = content.guide.steps.title;
    renderSteps('guideStepsList', content.guide.steps.list);
    document.getElementById('guideToolsTitle').textContent = content.guide.tools.title;
    renderList('guideToolsList', content.guide.tools.list);
    document.getElementById('guideImprovementsTitle').textContent = content.guide.improvements.title;
    renderList('guideImprovementsList', content.guide.improvements.list);
    
    // Community Section
    document.getElementById('communityTitle').textContent = content.community.title;
    document.getElementById('communityCollabTitle').textContent = content.community.collaboration.title;
    document.getElementById('communityCollabDesc').textContent = content.community.collaboration.description;
    document.getElementById('communityLinksTitle').textContent = content.community.links.title;
    document.getElementById('githubLink').textContent = content.community.links.github;
    document.getElementById('contactLink').textContent = content.community.links.contact;
    document.getElementById('docsLink').textContent = content.community.links.docs;
    
    // Footer
    document.getElementById('footerText').textContent = content.footer.text;
}

// ====== FUNÇÕES AUXILIARES DE RENDERIZAÇÃO ======
function renderList(elementId, items) {
    const element = document.getElementById(elementId);
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        element.appendChild(li);
    });
}

function renderSteps(elementId, items) {
    const element = document.getElementById(elementId);
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        element.appendChild(li);
    });
}

function renderSpecs(elementId, items) {
    const element = document.getElementById(elementId);
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'spec-item';
        div.innerHTML = `
            <span class="spec-label">${item.label}:</span>
            <span class="spec-value">${item.value}</span>
        `;
        element.appendChild(div);
    });
}

// ====== MENU MOBILE ======
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Animação do botão hambúrguer
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = nav.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : 'rotate(0) translateY(0)';
        spans[1].style.opacity = nav.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = nav.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0) translateY(0)';
    });
    
    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// ====== SMOOTH SCROLL ======
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====== EFEITOS DE SCROLL ======
function initializeScrollEffects() {
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animação de elementos ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}