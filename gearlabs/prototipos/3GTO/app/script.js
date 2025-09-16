document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let translations = {};
    let currentLanguage = localStorage.getItem('language') || 'pt';
    
    // Função para carregar as traduções
    async function loadTranslations() {
        try {
            const response = await fetch('translations.json');
            translations = await response.json();
            applyLanguage(currentLanguage);
        } catch (error) {
            console.error('Erro ao carregar traduções:', error);
        }
    }
    
    // Função para aplicar o idioma
    function applyLanguage(language) {
        if (!translations[language]) {
            language = 'pt'; // Fallback para português
        }
        
        // Atualiza todos os elementos com o atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
        
        // Atualiza o atributo lang do HTML
        document.documentElement.lang = language;
        
        // Atualiza o botão de idioma ativo
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`lang-${language}`).classList.add('active');
        
        // Salva a preferência no localStorage
        localStorage.setItem('language', language);
        currentLanguage = language;
        
        // Anuncia a mudança de idioma para leitores de tela
        announceLanguageChange(language);
    }
    
    // Função para anunciar mudança de idioma
    function announceLanguageChange(language) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = `Idioma alterado para ${language.toUpperCase()}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Função para detectar o idioma do navegador
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.substring(0, 2);
        
        // Verifica se o idioma do navegador é suportado
        if (['pt', 'en', 'es'].includes(shortLang)) {
            return shortLang;
        }
        
        return 'pt'; // Fallback para português
    }
    
    // Função para copiar código para o clipboard
    function setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', function() {
                const codeBlock = this.previousElementSibling.querySelector('code');
                const textToCopy = codeBlock.textContent;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Feedback visual
                    const originalText = this.textContent;
                    this.textContent = 'Copiado!';
                    this.classList.add('copied');
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Erro ao copiar texto: ', err);
                });
            });
        });
    }
    
    // Função para verificar suporte a WebUSB/WebSerial
    function checkBrowserSupport() {
        const hasWebUSB = 'usb' in navigator;
        const hasWebSerial = 'serial' in navigator;
        
        if (!hasWebUSB && !hasWebSerial) {
            document.getElementById('browser-support').style.display = 'block';
        }
    }
    
    // Configuração dos eventos de clique nos botões de idioma
    function setupLanguageButtons() {
        document.getElementById('lang-pt').addEventListener('click', () => applyLanguage('pt'));
        document.getElementById('lang-en').addEventListener('click', () => applyLanguage('en'));
        document.getElementById('lang-es').addEventListener('click', () => applyLanguage('es'));
    }
    
    // Inicialização
    function init() {
        // Detecta o idioma do navegador se não houver preferência salva
        if (!localStorage.getItem('language')) {
            currentLanguage = detectBrowserLanguage();
        }
        
        // Carrega as traduções
        loadTranslations();
        
        // Configura os botões de idioma
        setupLanguageButtons();
        
        // Configura os botões de copiar
        setupCopyButtons();
        
        // Verifica suporte do navegador
        checkBrowserSupport();
    }
    
    // Inicia a aplicação
    init();
});