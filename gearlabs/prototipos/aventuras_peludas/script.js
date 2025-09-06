document.addEventListener('DOMContentLoaded', function() {
    // Menu de navegação suave
    /*const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });*/
    
    // Animação dos cards de episódios
    const episodeCards = document.querySelectorAll('.episode-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    episodeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simular ação de entrar no mundo de Amélia
            const episodesSection = document.querySelector('#episodios');
            
            window.scrollTo({
                top: episodesSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Adicionar efeito visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Adicionar efeito de parallax na seção hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // Adicionar animação ao rolar para a seção de história
    const historySection = document.querySelector('#personagem');
    const parchment = document.querySelector('.parchment');
    
    const historyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                parchment.style.opacity = '1';
                parchment.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    if (parchment) {
        parchment.style.opacity = '0';
        parchment.style.transform = 'translateY(30px)';
        parchment.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        historyObserver.observe(historySection);
    }
});