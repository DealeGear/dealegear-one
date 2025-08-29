// Modo escuro
document.addEventListener('DOMContentLoaded', function() {
    // Cria o botão de modo escuro no header
    const headerActions = document.querySelector('.header-actions');
    const darkModeBtn = document.createElement('button');
    darkModeBtn.className = 'dark-mode-btn';
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.title = 'Alternar modo escuro';
    headerActions.appendChild(darkModeBtn);
    
    // Verifica se o modo escuro está salvo no localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Aplica o modo escuro se estiver salvo
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Adiciona o evento de clique ao botão
    darkModeBtn.addEventListener('click', function() {
        // Alterna a classe dark-mode no body
        document.body.classList.toggle('dark-mode');
        
        // Salva a preferência no localStorage
        const isDarkModeActive = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkModeActive);
        
        // Altera o ícone do botão
        if (isDarkModeActive) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});