// Dados iniciais para as ferramentas
const ferramentas = [
    { titulo: "GearHub", descricao: "Crie seus projetos com a ajuda de frameworks e templates", url: "gearhub/index.html" },
    { titulo: "GearLabs", descricao: "Veja nossos protótipos e aprenda mais sobre como criar algo novo", url: "gearlabs/index.html" },
    { titulo: "GearVision", descricao: "Uma plataforma de informações do mundo dos projetos", url: "gearvision/index.html" },
    
];


// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initSmoothScroll();
    renderFerramentas();
    //initFormValidation();
    initFAQ();
    //initTestimonials();
    initMobileMenu();
    initTimelineAnimation();
    initProjectObjective();
});

// Toggle de tema claro/escuro
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}

// Scroll suave para âncoras
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Renderizar ferramentas dinamicamente
function renderFerramentas() {
    const container = document.getElementById('ferramentas-container');
    
    ferramentas.forEach((ferramenta, index) => {
        const card = document.createElement('a'); // agora é link
        card.className = 'tool-card';
        card.href = ferramenta.url;
        card.target = "_self"; // abre em nova aba
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h3>${ferramenta.titulo}</h3>
            <p>${ferramenta.descricao}</p>
        `;
        
        container.appendChild(card);
    });
}


// Validação do formulário
/*function initFormValidation() {
    const form = document.getElementById('projectForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const formData = {
            projectName: document.getElementById('projectName').value,
            category: document.getElementById('category').value,
            objective: document.getElementById('objective').value,
            resources: document.getElementById('resources').value
        };
        
        // Validação simples
        if (!formData.projectName || !formData.category || !formData.objective || !formData.resources) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Simular envio e mostrar modal de sucesso
        showSuccessModal();
        
        // Limpar formulário
        form.reset();
    });
}*/

// Textos pré-definidos para o campo 'Objetivo principal'
const objectiveTexts = {
    'hobby': 'Meu objetivo é desenvolver um projeto criativo para meu próprio prazer, sem fins lucrativos.',
    'renda': 'Meu objetivo é criar um projeto que me gere uma fonte de renda extra, complementando meus ganhos atuais.',
    'carreira': 'Meu objetivo é desenvolver um projeto para construir um portfólio e me ajudar na transição ou crescimento da minha carreira profissional.',
    'startup': 'Meu objetivo é criar um projeto com potencial para se tornar um negócio escalável e inovador no mercado.'
};

// Lógica para preencher o campo 'Objetivo principal' com base na categoria
function initProjectObjective() {
    const categorySelect = document.getElementById('category');
    const objectiveTextarea = document.getElementById('objective');

    if (categorySelect && objectiveTextarea) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            objectiveTextarea.value = objectiveTexts[selectedCategory] || '';
        });
    }
}
// Mostrar modal de sucesso
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    
    // Fechar modal ao clicar no X ou fora dele
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// Inicializar FAQ accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os itens
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Abrir item clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Inicializar carrossel de depoimentos
/*function initTestimonials() {
    const wrapper = document.getElementById('testimonialsWrapper');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentIndex = 0;
    const totalTestimonials = document.querySelectorAll('.testimonial-card').length;
    
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        wrapper.style.transform = `translateX(${translateX}%)`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateCarousel();
    });
    
    // Auto-play opcional
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateCarousel();
    }, 5000);
}*/

// Menu mobile
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Animação da timeline ao rolar
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Adicionar efeito parallax suave ao hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroIllustration = document.querySelector('.hero-illustration');
    
    if (heroIllustration) {
        heroIllustration.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Adicionar micro-interações aos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.step-card, .project-card, .tool-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

