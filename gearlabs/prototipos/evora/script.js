document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const currentLang = document.getElementById('currentLang');
    const langOptions = document.querySelectorAll('[data-lang]');
    const translateElements = document.querySelectorAll('[data-translate]');
    
    // Carregar traduções
    let translations = {};
    
    // Verificar preferência de tema
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Verificar idioma salvo
    const savedLanguage = localStorage.getItem('language') || 'pt';
    currentLang.textContent = savedLanguage.toUpperCase();
    
    // Carregar arquivo de traduções
    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            updatePageLanguage(savedLanguage);
        })
        .catch(error => console.error('Erro ao carregar traduções:', error));
    
    // Menu Toggle
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Alternar tema
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Alternar dropdown de idioma
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function() {
        langDropdown.classList.remove('active');
    });
    
    // Selecionar idioma
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            currentLang.textContent = selectedLang.toUpperCase();
            localStorage.setItem('language', selectedLang);
            updatePageLanguage(selectedLang);
            langDropdown.classList.remove('active');
        });
    });
    
    // Função para atualizar o idioma da página
    function updatePageLanguage(lang) {
        if (!translations[lang]) return;
        
        document.documentElement.lang = lang;
        
        translateElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
    
    // Inicializar animações ao rolar a página
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar seções para animação
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Simulação do Three.js para a seção de Modo Virtual
    function initVirtualDemo() {
        const container = document.getElementById('virtualDemo');
        if (!container) return;
        
        // Verificar se o container está visível
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            // Placeholder para implementação do Three.js
            // Em um projeto real, aqui seria implementada a cena 3D
            container.innerHTML = `
                <div class="demo-placeholder">
                    <i class="fas fa-city"></i>
                    <span data-translate="virtualDemoText">Simulação Virtual da Cidade</span>
                </div>
                <div class="demo-controls">
                    <button class="demo-btn" id="dayNightToggle">
                        <i class="fas fa-sun"></i> <span data-translate="toggleDayNight">Alternar Dia/Noite</span>
                    </button>
                    <button class="demo-btn" id="weatherToggle">
                        <i class="fas fa-cloud-rain"></i> <span data-translate="toggleWeather">Alterar Clima</span>
                    </button>
                </div>
            `;
            
            // Atualizar traduções nos novos elementos
            updatePageLanguage(localStorage.getItem('language') || 'pt');
            
            // Adicionar eventos aos botões de demonstração
            const dayNightToggle = document.getElementById('dayNightToggle');
            const weatherToggle = document.getElementById('weatherToggle');
            
            if (dayNightToggle) {
                dayNightToggle.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('fa-sun')) {
                        icon.className = 'fas fa-moon';
                    } else {
                        icon.className = 'fas fa-sun';
                    }
                });
            }
            
            if (weatherToggle) {
                weatherToggle.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    const icons = ['fa-cloud-rain', 'fa-sun', 'fa-cloud', 'fa-bolt'];
                    const currentIcon = Array.from(icon.classList).find(cls => cls.startsWith('fa-'));
                    const currentIndex = icons.indexOf(currentIcon);
                    const nextIndex = (currentIndex + 1) % icons.length;
                    
                    icon.className = `fas ${icons[nextIndex]}`;
                });
            }
        }
    }
    
    // Inicializar a demonstração virtual quando a seção estiver visível
    const virtualSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initVirtualDemo();
                virtualSectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const virtualModeSection = document.getElementById('virtual-mode');
    if (virtualModeSection) {
        virtualSectionObserver.observe(virtualModeSection);
    }
});