// Script para adicionar funcionalidades à página
document.addEventListener('DOMContentLoaded', function() {
    // Animação de scroll suave para links de âncora
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
    
    // Adicionar efeito de animação aos cards quando entram na tela
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.category-card, .course-card, .step');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar animação inicial
    const cards = document.querySelectorAll('.category-card, .course-card, .step');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Executar animação no carregamento e no scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Adicionar funcionalidade aos botões de curso
    const courseButtons = document.querySelectorAll('.course-card .btn-primary');
    courseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Criar uma notificação de confirmação
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = 'Você está sendo redirecionado para o curso...';
            
            document.body.appendChild(notification);
            
            // Remover a notificação após 3 segundos
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        });
    });
    
    // Adicionar funcionalidade ao botão CTA principal
    const ctaButton = document.querySelector('.cta-section .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Criar um modal de cadastro
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Crie sua conta gratuita</h2>
                    <form id="signup-form">
                        <div class="form-group">
                            <label for="name">Nome completo</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input type="password" id="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Criar Conta</button>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Fechar modal ao clicar no X
            document.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Fechar modal ao clicar fora dele
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Processar formulário
            document.getElementById('signup-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simular envio do formulário
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = 'Conta criada com sucesso! Redirecionando...';
                
                modal.querySelector('.modal-content').innerHTML = '';
                modal.querySelector('.modal-content').appendChild(successMessage);
                
                // Fechar modal após 2 segundos
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 2000);
            });
        });
    }
    
    // Adicionar estilos para elementos criados dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #2c3e50;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-family: 'Poppins', sans-serif;
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            position: relative;
            font-family: 'Poppins', sans-serif;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-content h2 {
            margin-bottom: 20px;
            color: #2c3e50;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: 600;
        }
        
        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: 'Poppins', sans-serif;
        }
        
        .success-message {
            text-align: center;
            color: #2ecc71;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});