// Função para animar elementos ao rolar a página
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Adicionar classe fade-in aos elementos que devem ser animados
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe fade-in aos cards de tópicos
    const topicCards = document.querySelectorAll('.topico-card');
    topicCards.forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Adicionar classe fade-in aos itens do cronograma
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Adicionar classe fade-in à seção de contato
    const contatoSection = document.querySelector('.contato-form');
    if (contatoSection) {
        contatoSection.classList.add('fade-in');
    }
    
    // Executar a animação ao carregar a página
    animateOnScroll();
    
    // Executar a animação ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
});

// Menu fixo com efeito de scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '15px 0';
    }
});

// Suavização do scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Validação do formulário de contato
document.getElementById('form-contato').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    
    if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // Simulação de envio do formulário
    showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    
    // Limpar formulário
    this.reset();
});

// Função para validar e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para exibir notificações
function showNotification(message, type) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Adicionar estilos
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.color = '#fff';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Definir cor de fundo com base no tipo
    if (type === 'success') {
        notification.style.backgroundColor = 'var(--verde-medio)';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}