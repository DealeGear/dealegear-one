// Menu Hamburguer para Dispositivos Móveis
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle do menu mobile ao clicar no botão
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar o menu mobile ao clicar em um link
    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Animação de Reveal ao Rolar a Página
window.addEventListener('scroll', reveal);
    
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for(let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        
        if(revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Mudar o estilo do cabeçalho ao rolar a página
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if(window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '';
        header.style.boxShadow = '';
    }
});

// Rolagem suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});