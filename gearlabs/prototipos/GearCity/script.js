// Variáveis globais
let currentLang = 'pt';
let texts = {};

// Carregar textos do JSON
async function loadTexts() {
    try {
        const response = await fetch('texts.json');
        texts = await response.json();
        updatePageTexts();
    } catch (error) {
        console.error('Erro ao carregar textos:', error);
    }
}

// Atualizar textos da página
function updatePageTexts() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const keys = element.getAttribute('data-translate').split('.');
        let text = texts[currentLang];
        
        for (const key of keys) {
            if (text && text[key] !== undefined) {
                text = text[key];
            } else {
                text = null;
                break;
            }
        }
        
        if (text) {
            element.textContent = text;
        }
    });
    
    // Atualizar botão de idioma
    document.getElementById('langBtn').textContent = `🌐 ${currentLang.toUpperCase()}`;
}

// Alternar idioma
function toggleLanguage() {
    const languages = ['pt', 'en', 'es'];
    const currentIndex = languages.indexOf(currentLang);
    currentLang = languages[(currentIndex + 1) % languages.length];
    updatePageTexts();
    localStorage.setItem('language', currentLang);
}

// Alternar tema
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Controlar menu hambúrguer
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
}

// Rolagem suave
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Fechar menu mobile se estiver aberto
    const navMobile = document.getElementById('navMobile');
    const hamburger = document.getElementById('hamburger');
    if (navMobile.classList.contains('active')) {
        navMobile.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Simulador de escolhas
function handleChoice(choice) {
    const results = {
        ration: {
            pt: "💧 Racionamento implementado! A população economiza água, mas a satisfação diminui. Economia: -5%, Satisfação: -15%",
            en: "💧 Rationing implemented! Population saves water, but satisfaction decreases. Economy: -5%, Satisfaction: -15%",
            es: "💧 ¡Racionamiento implementado! La población ahorra agua, pero la satisfacción disminuye. Economía: -5%, Satisfacción: -15%"
        },
        invest: {
            pt: "🏗️ Investimento em infraestrutura! Custo alto, mas solução permanente. Economia: -20%, Satisfação: +10%",
            en: "🏗️ Infrastructure investment! High cost, but permanent solution. Economy: -20%, Satisfaction: +10%",
            es: "🏗️ ¡Inversión en infraestructura! Costo alto, pero solución permanente. Economía: -20%, Satisfacción: +10%"
        },
        tax: {
            pt: "💸 Impostos aumentados! Recursos para obras, mas descontentamento geral. Economia: +10%, Satisfação: -25%",
            en: "💸 Taxes increased! Resources for works, but general discontent. Economy: +10%, Satisfaction: -25%",
            es: "💸 ¡Impuestos aumentados! Recursos para obras, pero descontento general. Economía: +10%, Satisfacción: -25%"
        }
    };
    
    const resultElement = document.getElementById('choiceResult');
    resultElement.textContent = results[choice][currentLang];
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Observador de interseção para animações
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Carregar preferências salvas
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('language') || 'pt';
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('themeBtn').textContent = '☀️';
    }
    
    currentLang = savedLang;
    
    // Carregar textos
    loadTexts();
    
    // Configurar eventos
    document.getElementById('langBtn').addEventListener('click', toggleLanguage);
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    document.getElementById('hamburger').addEventListener('click', toggleMenu);
    
    // Rolagem suave para links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll(link.getAttribute('href'));
        });
    });
    
    // Simulador de escolhas
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            handleChoice(btn.getAttribute('data-choice'));
        });
    });
    
    // Configurar animações de scroll
    setupScrollAnimations();
    
    // Adicionar efeito parallax nas engrenagens do hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const gears = document.querySelectorAll('.hero-gears .gear');
        
        gears.forEach((gear, index) => {
            const speed = 0.5 + (index * 0.2);
            gear.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

// Adicionar animação CSS para resultados
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);