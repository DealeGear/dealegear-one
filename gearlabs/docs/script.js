document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menuToggle');
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    const prototypeCards = document.querySelectorAll('.prototype-card');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Função para mostrar uma seção específica
    function showSection(sectionId) {
        // Esconde todas as seções
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostra a seção selecionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Atualiza os links de navegação (apenas para links internos)
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
                if (href === `#${sectionId}`) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Função para carregar os dados de um protótipo
    function loadPrototypeData(prototypeId) {
        const prototype = prototypesData[prototypeId];
        if (!prototype) return;
        
        // Atualiza o título do protótipo
        document.getElementById('prototype-title').textContent = prototype.title;
        
        // Carrega o conteúdo de cada aba
        Object.keys(prototype).forEach(key => {
            if (key !== 'title') {
                const contentElement = document.getElementById(`${key}-content`);
                if (contentElement && prototype[key].content) {
                    contentElement.innerHTML = prototype[key].content;
                }
            }
        });
        
        // Mostra a seção de detalhes do protótipo
        showSection('prototype-details');
        
        // Ativa a primeira aba
        document.querySelector('.tab-btn').click();
    }
    
    // Event Listeners
    
    // Toggle do menu em dispositivos móveis
    menuToggle.addEventListener('click', function() {
        // Criar menu mobile dinamicamente se não existir
        let mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <ul>
                    <li><a href="../../index.html">Landpage</a></li>
                    <li><a href="https://www.dealegear.com.br" target="_blank">Portal</a></li>
                    <li><a href="../index.html">GearLabs</a></li>
                    <li><a href="#home">Início</a></li>
                    <li><a href="#about">Sobre</a></li>
                    <li><a href="#prototypes">Protótipos</a></li>
                </ul>
            `;
            document.body.appendChild(mobileMenu);
            
            // Adicionar estilos para o menu mobile
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background-color: var(--white-color);
                    box-shadow: var(--shadow);
                    z-index: 999;
                    transform: translateY(-100%);
                    transition: transform 0.3s ease;
                }
                
                .mobile-menu.active {
                    transform: translateY(0);
                }
                
                .mobile-menu ul {
                    padding: 1rem;
                }
                
                .mobile-menu li {
                    margin-bottom: 1rem;
                }
                
                .mobile-menu a {
                    font-weight: 500;
                    color: var(--dark-color);
                    display: block;
                    padding: 0.5rem;
                }
            `;
            document.head.appendChild(style);
        }
        
        mobileMenu.classList.toggle('active');
    });
    
    // Navegação principal
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for um link externo, não previne o comportamento padrão
            if (href.startsWith('http') || href.startsWith('../../') || href === '../index.html') {
                return;
            }
            
            e.preventDefault();
            const sectionId = href.substring(1);
            showSection(sectionId);
            
            // Fecha o menu mobile se estiver aberto
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Cards dos protótipos na seção de protótipos
    prototypeCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const prototypeId = card.getAttribute('data-prototype');
                loadPrototypeData(prototypeId);
            });
        }
    });
    
    // Abas na seção de detalhes do protótipo
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Atualiza os botões das abas
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Atualiza o conteúdo das abas
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Formulário de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de inscrição na newsletter
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Inscrevendo...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Inscrito!';
                submitBtn.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    emailInput.value = '';
                }, 2000);
            }, 1500);
        });
    }
    
    // Fecha o menu mobile ao clicar fora dele
    document.addEventListener('click', function(e) {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && 
            mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Inicialização
    showSection('home');
});