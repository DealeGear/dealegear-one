// Script para adicionar funcionalidade ao botão CTA
document.addEventListener('DOMContentLoaded', function() {
    //const ctaButton = document.getElementById('cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Criar uma mensagem de confirmação
            const confirmation = document.createElement('div');
            confirmation.style.position = 'fixed';
            confirmation.style.top = '50%';
            confirmation.style.left = '50%';
            confirmation.style.transform = 'translate(-50%, -50%)';
            confirmation.style.backgroundColor = '#6a4c93';
            confirmation.style.color = 'white';
            confirmation.style.padding = '20px 40px';
            confirmation.style.borderRadius = '10px';
            confirmation.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            confirmation.style.zIndex = '1000';
            confirmation.style.fontFamily = "'Nunito', sans-serif";
            confirmation.style.fontSize = '1.2rem';
            confirmation.style.textAlign = 'center';
            //confirmation.innerHTML = 'Em breve você será redirecionado para as aventuras!<br><small>Esta é uma demonstração</small>';
            
            document.body.appendChild(confirmation);
            
            // Remover a mensagem após 3 segundos
            setTimeout(() => {
                confirmation.style.opacity = '0';
                confirmation.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    document.body.removeChild(confirmation);
                }, 500);
            }, 3000);
        });
    }
    
    // Adicionar efeito de animação aos cards quando entram na tela
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});