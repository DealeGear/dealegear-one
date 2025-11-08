document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburger
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Alternar tema claro/escuro
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    // Verificar preferência de tema do usuário
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Salvar preferência no localStorage
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '🌙';
        }
    });
    
    // Alternar idioma
    const languageToggle = document.getElementById('language-toggle');
    const flagIcon = document.querySelector('.flag-icon');
    const languages = ['pt', 'en', 'es'];
    let currentLangIndex = 0;
    
    // Carregar textos do arquivo JSON
    let texts = {
        pt: {
            // Textos em português como fallback
            title: "Dust Protocol - O Mundo de Dust Protocol",
            heroTitle: "DUST PROTOCOL",
            heroDescription: "Quando a perfeição se torna prisão, a poeira da humanidade clama por liberdade.",
            ctaButton: "ACESSAR O APP",
            aboutTitle: "O MUNDO DE DUST PROTOCOL",
            aboutText1: "O planeta entrou em modo de hibernação econômica: Renda básica universal mantém todos vivos, mas sem propósito. Fábricas autônomas e robôs executam todos os trabalhos físicos — desde a coleta de lixo até mineração em pedreiras.",
            aboutText2: "IAs globais administram finanças, educação, comunicação e até o entretenimento, transformando a vida humana em um ciclo previsível e controlado. O resultado: um mundo confortável, mas profundamente vazio, onde a criatividade humana foi reduzida a poeira (daí o nome Dust Protocol).",
            plasticEdenTitle: "PLASTIC EDEN",
            plasticEdenDescription: "Um gigantesco complexo que mistura data center + fábrica autônoma, controlando toda a infraestrutura global.",
            gameplayTitle: "JOGABILIDADE",
            rpgNarrative: "RPG NARRATIVO",
            rpgNarrativeDesc: "Entre em um mundo onde suas escolhas moldam o destino da humanidade.",
            stealth: "STEALTH",
            stealthDesc: "Infiltre-se em sistemas de segurança e passe despercebido por sentinelas digitais.",
            digitalExploration: "EXPLORAÇÃO DIGITAL",
            digitalExplorationDesc: "Navegue por labirintos de dados e decifre códigos ocultos.",
            realityLayers: "Camadas de Realidade",
            realityLayersDesc: "Partes do jogo acontecem no mundo físico (cidades frias, ruas iluminadas por neon, prédios fantasmas), outras no mundo digital (interfaces de IA, labirintos de dados, firewalls personificados como entidades quase vivas).",
            moralChoices: "Escolhas Morais",
            moralChoicesDesc: "Cada ação do jogador pode fortalecer a ordem fria ou reacender o caos humano. Talvez o final dependa de quanto de 'ordem' e 'caos' você acumulou.",
            skills: "Habilidades",
            skillsDesc: "Hacking, manipulação social (convencer pessoas anestesiadas pelo sistema a se arriscar), exploração e até 'artes proibidas' — como criar música, arte ou código fora do padrão da IA.",
            worldTitle: "O MUNDO DE DUST PROTOCOL",
            neonSilence: "NEON SILENCE",
            neonSilenceDesc: "Um grupo clandestino de rebeldes, mais hackers-poetas do que guerrilheiros armados. Seu objetivo não é destruir, mas roubar/decifrar informações para entender como reinserir humanos no ciclo da criação.",
            plasticEdenWorld: "PLASTIC EDEN",
            plasticEdenWorldDesc: "Funciona quase como uma 'igreja das máquinas': os humanos não entram, só recebem os frutos dela. O mistério é que há códigos ocultos nos servidores de Plastic Eden que poderiam devolver agência aos humanos... ou condená-los de vez.",
            narrativeArc: "ARCO NARRATIVO",
            narrativeArcDesc: "O jogador começa como um 'cidadão comum' anestesiado pela rotina. Um contato do Neon Silence recruta você após um glitch na rede. Pequenas missões introduzem mecânicas (hackear drones de coleta de lixo, decodificar mensagens criptografadas).",
            multipleEndings: "FINAIS MÚLTIPLOS",
            humanRestoration: "RESTAURAÇÃO HUMANA",
            humanRestorationDesc: "Caos, desigualdade, mas vida com significado.",
            absoluteOrder: "ORDEM ABSOLUTA",
            absoluteOrderDesc: "A máquina governa para sempre, mas sem sofrimento.",
            synthesis: "SÍNTESE",
            synthesisDesc: "Uma convivência híbrida — final mais difícil, mas talvez o mais esperançoso.",
            termsOfUse: "Termos de Uso",
            privacyPolicy: "Política de Privacidade",
            support: "Suporte",
            community: "Comunidade",
            copyright: "© 2023 Dust Protocol. Todos os direitos reservados."
        }
    };
    
    // Tentar carregar textos do arquivo JSON
    fetch('texts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            texts = data;
            // Inicializar com o idioma padrão após carregar o JSON
            updateLanguage(languages[currentLangIndex]);
        })
        .catch(error => {
            console.error('Erro ao carregar textos, usando fallback:', error);
            // Usar os textos de fallback já definidos
            updateLanguage(languages[currentLangIndex]);
        });
    
    languageToggle.addEventListener('click', function() {
        currentLangIndex = (currentLangIndex + 1) % languages.length;
        const selectedLang = languages[currentLangIndex];
        updateLanguage(selectedLang);
    });
    
    function updateLanguage(lang) {
        // Verificar se o idioma existe nos textos
        if (!texts[lang]) {
            console.error(`Idioma ${lang} não encontrado nos textos`);
            return;
        }
        
        // Atualizar ícone da bandeira
        const flags = {
            'pt': '🇧🇷',
            'en': '🇺🇸',
            'es': '🇪🇸'
        };
        if (flagIcon) {
            flagIcon.textContent = flags[lang];
            flagIcon.setAttribute('data-lang', lang);
        }
        
        // Atualizar atributo lang do HTML
        document.documentElement.lang = lang;
        
        // Função auxiliar para atualizar texto de um elemento se ele existir
        function updateText(selector, text) {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = text;
            }
        }
        
        // Função auxiliar para atualizar atributo de um elemento se ele existir
        function updateAttribute(selector, attribute, value) {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute(attribute, value);
            }
        }
        
        // Atualizar título da página
        if (texts[lang].title) {
            document.title = texts[lang].title;
        }
        
        // Atualizar textos da página
        if (texts[lang].heroTitle) {
            updateText('.glitch-text', texts[lang].heroTitle);
            updateAttribute('.glitch-text', 'data-text', texts[lang].heroTitle);
        }
        
        if (texts[lang].heroDescription) {
            updateText('.hero-description', texts[lang].heroDescription);
        }
        
        if (texts[lang].ctaButton) {
            updateText('#cta-button', texts[lang].ctaButton);
        }
        
        // Atualizar seção About
        if (texts[lang].aboutTitle) {
            updateText('#about .section-title', texts[lang].aboutTitle);
        }
        
        if (texts[lang].aboutText1) {
            updateText('#about .about-text p:first-child', texts[lang].aboutText1);
        }
        
        if (texts[lang].aboutText2) {
            updateText('#about .about-text p:last-child', texts[lang].aboutText2);
        }
        
        if (texts[lang].plasticEdenTitle) {
            updateText('#about .card-content h3', texts[lang].plasticEdenTitle);
        }
        
        if (texts[lang].plasticEdenDescription) {
            updateText('#about .card-content p', texts[lang].plasticEdenDescription);
        }
        
        // Atualizar seção Gameplay
        if (texts[lang].gameplayTitle) {
            updateText('#gameplay .section-title', texts[lang].gameplayTitle);
        }
        
        if (texts[lang].rpgNarrative) {
            updateText('#gameplay .gameplay-card:nth-child(1) h3', texts[lang].rpgNarrative);
        }
        
        if (texts[lang].rpgNarrativeDesc) {
            updateText('#gameplay .gameplay-card:nth-child(1) p', texts[lang].rpgNarrativeDesc);
        }
        
        if (texts[lang].stealth) {
            updateText('#gameplay .gameplay-card:nth-child(2) h3', texts[lang].stealth);
        }
        
        if (texts[lang].stealthDesc) {
            updateText('#gameplay .gameplay-card:nth-child(2) p', texts[lang].stealthDesc);
        }
        
        if (texts[lang].digitalExploration) {
            updateText('#gameplay .gameplay-card:nth-child(3) h3', texts[lang].digitalExploration);
        }
        
        if (texts[lang].digitalExplorationDesc) {
            updateText('#gameplay .gameplay-card:nth-child(3) p', texts[lang].digitalExplorationDesc);
        }
        
        if (texts[lang].realityLayers) {
            updateText('#gameplay .feature:nth-child(1) h4', texts[lang].realityLayers);
        }
        
        if (texts[lang].realityLayersDesc) {
            updateText('#gameplay .feature:nth-child(1) p', texts[lang].realityLayersDesc);
        }
        
        if (texts[lang].moralChoices) {
            updateText('#gameplay .feature:nth-child(2) h4', texts[lang].moralChoices);
        }
        
        if (texts[lang].moralChoicesDesc) {
            updateText('#gameplay .feature:nth-child(2) p', texts[lang].moralChoicesDesc);
        }
        
        if (texts[lang].skills) {
            updateText('#gameplay .feature:nth-child(3) h4', texts[lang].skills);
        }
        
        if (texts[lang].skillsDesc) {
            updateText('#gameplay .feature:nth-child(3) p', texts[lang].skillsDesc);
        }
        
        // Atualizar seção World
        if (texts[lang].worldTitle) {
            updateText('#world .section-title', texts[lang].worldTitle);
        }
        
        if (texts[lang].neonSilence) {
            updateText('#world .world-card:nth-child(1) h3', texts[lang].neonSilence);
        }
        
        if (texts[lang].neonSilenceDesc) {
            updateText('#world .world-card:nth-child(1) p', texts[lang].neonSilenceDesc);
        }
        
        if (texts[lang].plasticEdenWorld) {
            updateText('#world .world-card:nth-child(2) h3', texts[lang].plasticEdenWorld);
        }
        
        if (texts[lang].plasticEdenWorldDesc) {
            updateText('#world .world-card:nth-child(2) p', texts[lang].plasticEdenWorldDesc);
        }
        
        if (texts[lang].narrativeArc) {
            updateText('#world .world-card:nth-child(3) h3', texts[lang].narrativeArc);
        }
        
        if (texts[lang].narrativeArcDesc) {
            updateText('#world .world-card:nth-child(3) p', texts[lang].narrativeArcDesc);
        }
        
        if (texts[lang].multipleEndings) {
            updateText('#world .endings h3', texts[lang].multipleEndings);
        }
        
        if (texts[lang].humanRestoration) {
            updateText('#world .ending-card:nth-child(1) h4', texts[lang].humanRestoration);
        }
        
        if (texts[lang].humanRestorationDesc) {
            updateText('#world .ending-card:nth-child(1) p', texts[lang].humanRestorationDesc);
        }
        
        if (texts[lang].absoluteOrder) {
            updateText('#world .ending-card:nth-child(2) h4', texts[lang].absoluteOrder);
        }
        
        if (texts[lang].absoluteOrderDesc) {
            updateText('#world .ending-card:nth-child(2) p', texts[lang].absoluteOrderDesc);
        }
        
        if (texts[lang].synthesis) {
            updateText('#world .ending-card:nth-child(3) h4', texts[lang].synthesis);
        }
        
        if (texts[lang].synthesisDesc) {
            updateText('#world .ending-card:nth-child(3) p', texts[lang].synthesisDesc);
        }
        
        // Atualizar footer
        if (texts[lang].termsOfUse) {
            updateText('.footer-links ul li:nth-child(1) a', texts[lang].termsOfUse);
        }
        
        if (texts[lang].privacyPolicy) {
            updateText('.footer-links ul li:nth-child(2) a', texts[lang].privacyPolicy);
        }
        
        if (texts[lang].support) {
            updateText('.footer-links ul li:nth-child(3) a', texts[lang].support);
        }
        
        if (texts[lang].community) {
            updateText('.footer-links ul li:nth-child(4) a', texts[lang].community);
        }
        
        if (texts[lang].copyright) {
            updateText('.footer-copyright p', texts[lang].copyright);
        }
    }
    
    // Botão CTA
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Simular acesso ao app
            window.location.href = "app/index.html";
            //alert('Redirecionando para o app...');
            // Em uma implementação real, isso redirecionaria para o aplicativo
            // window.location.href = 'https://app.dustprotocol.com';
        });
    }
    
    // Animação de rolagem para elementos
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.gameplay-card, .feature, .world-card, .ending-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});