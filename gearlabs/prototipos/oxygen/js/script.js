// Rolagem suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de botões ao passar o mouse
const buttons = document.querySelectorAll('.cta-button, .access-button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animação de cards ao passar o mouse
const cards = document.querySelectorAll('.area-card, .impact-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Destaque no menu ao rolar a página
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.footer-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animação de números na seção de impacto
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.impact-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.innerText.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.innerText = Math.floor(current) + number.innerText.replace(/\d/g, '');
                requestAnimationFrame(updateNumber);
            } else {
                number.innerText = target + number.innerText.replace(/\d/g, '');
            }
        };
        
        updateNumber();
    });
};

// Disparar animação quando a seção de impacto estiver visível
const impactSection = document.querySelector('.impact');
if (impactSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(impactSection);
}

// Tratamento de erros para imagens
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.log('Erro ao carregar imagem:', this.src);
        // Imagem de fallback já está definida no atributo onerror
    });
});