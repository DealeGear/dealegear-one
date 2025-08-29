// Menu Mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Rolagem Suave
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

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animação ao Rolar
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

// Adicionar classe fade-in aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.about-content',
        '.create-book-content',
        '.cafe-item',
        '.product-card',
        '.course-card',
        '.event-card'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
});

// Botão Saiba Mais
document.querySelector('.hero-btn').addEventListener('click', () => {
    document.querySelector('#sobre').scrollIntoView({
        behavior: 'smooth'
    });
});

// Botões de CTA
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent === 'Começar Agora' || btn.textContent === 'Inscreva-se Gratuitamente') {
        btn.addEventListener('click', () => {
            // Simulação de ação
            btn.textContent = 'Em breve...';
            btn.style.background = 'var(--secondary-brown)';
            setTimeout(() => {
                btn.textContent = btn.textContent === 'Começar Agora' ? 'Começar Agora' : 'Inscreva-se Gratuitamente';
                btn.style.background = '';
            }, 2000);
        });
    }
});

// Efeito Parallax no Hero
/*window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});*/

// Destaque de seção ativa no menu
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Adicionar classe ativa ao link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--orange);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);