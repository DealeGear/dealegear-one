// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scroll para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const headerOffset = 80; // Altura do header fixo
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Adicionar smooth scroll a todos os links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Ignora links vazios
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80; // Altura do header fixo
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de fade-in ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.objective-card, .benefit-item, .investment-option').forEach(el => {
    observer.observe(el);
});

// Mudar cor do header ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = '#1b5e20';
    } else {
        header.style.background = '#2e7d32';
    }
});

// REMOVIDO: Efeito parallax no hero (causava problemas de sobreposição)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
// });

// Botão de investimento - ação simulada
document.querySelector('.btn-primary').addEventListener('click', function() {
    if (this.textContent === 'Quero Investir') {
        // Simular ação de investimento
        this.textContent = 'Obrigado pelo interesse!';
        this.style.background = '#4caf50';
        
        setTimeout(() => {
            this.textContent = 'Quero Investir';
            this.style.background = '#f57c00';
        }, 3000);
    }
});

// Botão de contribuição - ação simulada
document.querySelectorAll('.btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent === 'Contribua Agora' || this.textContent === 'Contribua') {
            this.textContent = 'Agradecemos sua contribuição!';
            this.style.background = '#4caf50';
            this.style.color = '#ffffff';
            
            setTimeout(() => {
                this.textContent = 'Contribua Agora';
                this.style.background = 'transparent';
                this.style.color = '#ffffff';
            }, 3000);
        }
    });
});

// Adicionar contador de visitas simulado
let visitCount = localStorage.getItem('visitCount') || 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);

console.log(`Bem-vindo ao Bosque das Frutíferas! Visitas: ${visitCount}`);