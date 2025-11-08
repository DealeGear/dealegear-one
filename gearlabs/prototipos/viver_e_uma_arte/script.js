// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll
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

// Filtro da Galeria
const filterBtns = document.querySelectorAll('.filter-btn');
const galeriaItems = document.querySelectorAll('.galeria-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galeriaItems.forEach(item => {
            if (filter === 'todas' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Slider de Depoimentos
const depoimentos = document.querySelectorAll('.depoimento');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentDepoimento = 0;

function showDepoimento(index) {
    depoimentos.forEach((depoimento, i) => {
        depoimento.classList.remove('active');
        if (i === index) {
            depoimento.classList.add('active');
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentDepoimento = (currentDepoimento - 1 + depoimentos.length) % depoimentos.length;
    showDepoimento(currentDepoimento);
});

nextBtn.addEventListener('click', () => {
    currentDepoimento = (currentDepoimento + 1) % depoimentos.length;
    showDepoimento(currentDepoimento);
});

// Auto-play slider
setInterval(() => {
    currentDepoimento = (currentDepoimento + 1) % depoimentos.length;
    showDepoimento(currentDepoimento);
}, 5000);

// Animação ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        if (email) {
            // Simulação de envio
            alert('Obrigado por se inscrever! Você receberá nossas novidades em breve.');
            e.target.reset();
        }
    });
}

// Botões de inscrição em eventos
const inscreverBtns = document.querySelectorAll('.evento-card .btn');
inscreverBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const eventoCard = btn.closest('.evento-card');
        const eventoTitle = eventoCard.querySelector('h3').textContent;
        
        // Simulação de inscrição
        if (confirm(`Deseja se inscrever no evento "${eventoTitle}"?`)) {
            alert('Inscrição realizada com sucesso! Entraremos em contato com mais informações.');
        }
    });
});

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
});

// Adicionar classe ao header quando rolar
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