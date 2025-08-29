// Alternância de idioma
const langToggle = document.getElementById('langToggle');
const html = document.documentElement;
let currentLang = html.getAttribute('data-lang');

// Função para atualizar o texto dos elementos
function updateText() {
    const elements = document.querySelectorAll('[data-pt][data-en]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
            element.value = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Atualizar o botão de idioma
    langToggle.textContent = currentLang === 'pt' ? 'EN' : 'PT';
}

// Event listener para o botão de idioma
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    html.setAttribute('data-lang', currentLang);
    html.setAttribute('lang', currentLang);
    updateText();
});

// Menu mobile hambúrguer
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de fade-in para elementos ao rolar
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

// Adicionar fade-in aos elementos das seções
document.querySelectorAll('.role-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito parallax no hero
/*window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});*/

// Animação do cursor (opcional - efeito de brilho)
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 500);
});

// Adicionar estilo para o efeito de cursor
const style = document.createElement('style');
style.textContent = `
    .cursor-glow {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorFade 0.5s ease-out forwards;
    }
    
    @keyframes cursorFade {
        to {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);