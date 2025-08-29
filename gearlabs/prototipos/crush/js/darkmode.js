// Módulo de gerenciamento de tema
const darkModeModule = (function() {
    let currentTheme = 'dark';
    
    // Elementos
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    // Inicializar
    function init() {
        // Carregar tema salvo
        const savedTheme = localStorage.getItem('crushTheme');
        if (savedTheme) {
            currentTheme = savedTheme;
            applyTheme(currentTheme);
        }
        
        // Adicionar event listener
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }
    
    // Alternar tema
    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('crushTheme', currentTheme);
        
        // Adicionar efeito de transição
        body.style.transition = 'background 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 500);
    }
    
    // Aplicar tema
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if (themeToggle) {
                themeToggle.textContent = '☀️';
            }
        } else {
            body.classList.remove('light-mode');
            if (themeToggle) {
                themeToggle.textContent = '🌙';
            }
        }
    }
    
    // Obter tema atual
    function getCurrentTheme() {
        return currentTheme;
    }
    
    // API pública
    return {
        init,
        toggleTheme,
        applyTheme,
        getCurrentTheme
    };
})();