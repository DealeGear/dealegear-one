// Sistema de Internacionalização
class I18n {
    constructor() {
        this.currentLang = 'pt-BR';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setupLanguageToggle();
        this.updatePage();
        this.setupScrollEffects();
        this.setupSmoothScroll();
    }

    async loadTranslations() {
        try {
            const response = await fetch('data/i18n.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Erro ao carregar traduções:', error);
        }
    }

    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        const currentLangSpan = document.getElementById('currentLang');
        
        langToggle.addEventListener('click', () => {
            const languages = ['pt-BR', 'en-US', 'es-ES'];
            const currentIndex = languages.indexOf(this.currentLang);
            this.currentLang = languages[(currentIndex + 1) % languages.length];
            
            // Atualizar o texto do botão
            const langMap = {
                'pt-BR': 'PT',
                'en-US': 'EN',
                'es-ES': 'ES'
            };
            currentLangSpan.textContent = langMap[this.currentLang];
            
            this.updatePage();
        });
    }

    updatePage() {
        // Atualizar título da página
        const titleElement = document.getElementById('page-title');
        if (titleElement && this.translations[this.currentLang].title) {
            titleElement.textContent = this.translations[this.currentLang].title;
        }

        // Atualizar todos os elementos com data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Atualizar atributo lang do HTML
        document.documentElement.lang = this.currentLang;
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Adicionar classe fade-in aos elementos que devem animar
        const animatedElements = document.querySelectorAll('.feature-card, .step, .quest-card, .about-content');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    const navMenu = document.querySelector('.nav-menu');
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}

// Menu Mobile
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            
            // Animação do ícone
            const icon = this.menuToggle.querySelector('i');
            if (this.navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu ao clicar em um link
        const navLinks = this.navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                const icon = this.menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Efeitos de Hover e Interatividade
class InteractiveEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupCardEffects();
        this.setupButtonEffects();
        this.setupParallax();
    }

    setupCardEffects() {
        const cards = document.querySelectorAll('.feature-card, .quest-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRipple(e, card);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Criar efeito de onda
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new I18n();
    new MobileMenu();
    new InteractiveEffects();
    
    // Adicionar efeito de digitação ao título hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;
        
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});

// Adicionar estilos CSS dinamicamente para efeitos
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: btn-ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes btn-ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        left: 0 !important;
    }
`;
document.head.appendChild(style);