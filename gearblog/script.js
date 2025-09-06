document.addEventListener('DOMContentLoaded', function() {
    // Alternância de tema (modo claro/escuro)
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Verificar se há uma preferência de tema salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Menu móvel
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navegação entre páginas
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const articlesSection = document.querySelector('.articles-section');
    const articlePage = document.getElementById('article-page');
    const backToHomeBtn = document.querySelector('.back-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            articlesSection.classList.add('hidden');
            articlePage.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    });
    
    backToHomeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        articlePage.classList.add('hidden');
        articlesSection.classList.remove('hidden');
        window.scrollTo(0, 0);
    });
    
    // Formulário de comentários
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.querySelector('.comments-list');
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;
        
        if (name && email && comment) {
            // Criar elemento de comentário
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            // Data atual
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            // Conteúdo do comentário
            newComment.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${name}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <p class="comment-text">${comment}</p>
            `;
            
            // Adicionar à lista de comentários
            commentsList.prepend(newComment);
            
            // Limpar formulário
            commentForm.reset();
            
            // Exibir mensagem de sucesso (opcional)
            const successMessage = document.createElement('div');
            successMessage.style.padding = '10px';
            successMessage.style.marginTop = '10px';
            successMessage.style.backgroundColor = '#d4edda';
            successMessage.style.color = '#155724';
            successMessage.style.borderRadius = '4px';
            successMessage.textContent = 'Comentário enviado com sucesso!';
            
            commentForm.appendChild(successMessage);
            
            // Remover mensagem após 3 segundos
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
    
    // Ativar link de navegação atual
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-menu ul li a');
    const menuLength = menuItem.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add('active');
        }
    }
    
    // Rolagem suave para âncoras - CORREÇÃO
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links que são apenas "#"
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});