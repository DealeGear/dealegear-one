// ===== VARIÁVEIS GLOBAIS =====
let currentLanguage = 'pt'; // Idioma padrão
let texts = {}; // Objeto para armazenar os textos carregados do JSON

// Elementos do DOM
const languageButtons = document.querySelectorAll('.language-selector button');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// ===== FUNÇÕES =====

/**
 * Carrega o arquivo JSON com os textos em diferentes idiomas
 */
async function loadTexts() {
    try {
        // Em um ambiente real, usaríamos fetch para carregar o arquivo JSON
        // const response = await fetch('texts.json');
        // texts = await response.json();
        
        // Para este exemplo, vamos simular a carga do JSON
        texts = {
            "pt": {
                "menu": {
                    "inicio": "Início",
                    "comoFunciona": "Como Funciona",
                    "aplicacoes": "Aplicações",
                    "beneficios": "Benefícios",
                    "contato": "Contato"
                },
                "hero": {
                    "titulo": "Ignis – O Sol Transformado em Energia Útil",
                    "subtitulo": "Tecnologia inovadora de concentração solar para aplicações térmicas industriais e comerciais",
                    "botao": "Saiba Mais"
                },
                "comoFunciona": {
                    "titulo": "Como Funciona",
                    "passo1": {
                        "titulo": "Coletores Solares",
                        "descricao": "Sistema de espelhos parabólicos que captam a radiação solar durante todo o dia."
                    },
                    "passo2": {
                        "titulo": "Concentração Térmica",
                        "descricao": "A luz solar é concentrada em um ponto focal, gerando temperaturas elevadas."
                    },
                    "passo3": {
                        "titulo": "Condução Óptica",
                        "descricao": "O calor é transferido através de um sistema de fluidos com alta eficiência."
                    },
                    "passo4": {
                        "titulo": "Uso Final",
                        "descricao": "A energia térmica é utilizada diretamente nos processos industriais."
                    }
                },
                "aplicacoes": {
                    "titulo": "Aplicações",
                    "aplicacao1": {
                        "titulo": "Geração de Vapor",
                        "descricao": "Produção de vapor para processos industriais sem custos de combustível."
                    },
                    "aplicacao2": {
                        "titulo": "Painéis Híbridos",
                        "descricao": "Sistemas combinados que geram energia elétrica e térmica simultaneamente."
                    },
                    "aplicacao3": {
                        "titulo": "Fogões Industriais",
                        "descricao": "Soluções para cozimento industrial em larga escala com energia solar."
                    },
                    "aplicacao4": {
                        "titulo": "Climatização",
                        "descricao": "Sistemas de refrigeração e aquecimento movidos a energia solar térmica."
                    }
                },
                "beneficios": {
                    "titulo": "Benefícios",
                    "beneficio1": {
                        "titulo": "Sustentabilidade",
                        "descricao": "Zero emissões de carbono durante a operação, contribuindo para um planeta mais limpo."
                    },
                    "beneficio2": {
                        "titulo": "Economia",
                        "descricao": "Redução de até 80% nos custos com energia térmica a longo prazo."
                    },
                    "beneficio3": {
                        "titulo": "Eficiência",
                        "descricao": "Tecnologia com rendimento energético superior a 70%, muito acima da média do mercado."
                    },
                    "beneficio4": {
                        "titulo": "Durabilidade",
                        "descricao": "Sistemas projetados para operar por mais de 25 anos com mínima manutenção."
                    }
                },
                "cta": {
                    "titulo": "Ignis é o futuro da energia térmica solar. Junte-se à revolução.",
                    "botao": "Painel"
                },
                "footer": {
                    "documentacao": "Documentação",
                    "sobre": "Sobre",
                    "blog": "Blog",
                    "contato": "Contato",
                    "copyright": "Ignis © 2025 – Energia transformada pelo sol"
                }
            },
            "en": {
                "menu": {
                    "inicio": "Home",
                    "comoFunciona": "How It Works",
                    "aplicacoes": "Applications",
                    "beneficios": "Benefits",
                    "contato": "Contact"
                },
                "hero": {
                    "titulo": "Ignis – The Sun Transformed into Useful Energy",
                    "subtitulo": "Innovative solar concentration technology for industrial and commercial thermal applications",
                    "botao": "Learn More"
                },
                "comoFunciona": {
                    "titulo": "How It Works",
                    "passo1": {
                        "titulo": "Solar Collectors",
                        "descricao": "System of parabolic mirrors that capture solar radiation throughout the day."
                    },
                    "passo2": {
                        "titulo": "Thermal Concentration",
                        "descricao": "Sunlight is concentrated at a focal point, generating high temperatures."
                    },
                    "passo3": {
                        "titulo": "Optical Conduction",
                        "descricao": "Heat is transferred through a high-efficiency fluid system."
                    },
                    "passo4": {
                        "titulo": "Final Use",
                        "descricao": "Thermal energy is used directly in industrial processes."
                    }
                },
                "aplicacoes": {
                    "titulo": "Applications",
                    "aplicacao1": {
                        "titulo": "Steam Generation",
                        "descricao": "Steam production for industrial processes without fuel costs."
                    },
                    "aplicacao2": {
                        "titulo": "Hybrid Panels",
                        "descricao": "Combined systems that generate electrical and thermal energy simultaneously."
                    },
                    "aplicacao3": {
                        "titulo": "Industrial Stoves",
                        "descricao": "Solutions for large-scale industrial cooking with solar energy."
                    },
                    "aplicacao4": {
                        "titulo": "Air Conditioning",
                        "descricao": "Cooling and heating systems powered by solar thermal energy."
                    }
                },
                "beneficios": {
                    "titulo": "Benefits",
                    "beneficio1": {
                        "titulo": "Sustainability",
                        "descricao": "Zero carbon emissions during operation, contributing to a cleaner planet."
                    },
                    "beneficio2": {
                        "titulo": "Economy",
                        "descricao": "Reduction of up to 80% in thermal energy costs in the long term."
                    },
                    "beneficio3": {
                        "titulo": "Efficiency",
                        "descricao": "Technology with energy efficiency above 70%, well above the market average."
                    },
                    "beneficio4": {
                        "titulo": "Durability",
                        "descricao": "Systems designed to operate for over 25 years with minimal maintenance."
                    }
                },
                "cta": {
                    "titulo": "Ignis is the future of solar thermal energy. Join the revolution.",
                    "botao": "Dashboard"
                },
                "footer": {
                    "documentacao": "Documentation",
                    "sobre": "About",
                    "blog": "Blog",
                    "contato": "Contact",
                    "copyright": "Ignis © 2025 – Energy transformed by the sun"
                }
            },
            "es": {
                "menu": {
                    "inicio": "Inicio",
                    "comoFunciona": "Cómo Funciona",
                    "aplicacoes": "Aplicaciones",
                    "beneficios": "Beneficios",
                    "contato": "Contacto"
                },
                "hero": {
                    "titulo": "Ignis – El Sol Transformado en Energía Útil",
                    "subtitulo": "Tecnología innovadora de concentración solar para aplicaciones térmicas industriales y comerciales",
                    "botao": "Saber Más"
                },
                "comoFunciona": {
                    "titulo": "Cómo Funciona",
                    "passo1": {
                        "titulo": "Colectores Solares",
                        "descricao": "Sistema de espejos parabólicos que captan la radiación solar durante todo el día."
                    },
                    "passo2": {
                        "titulo": "Concentración Térmica",
                        "descricao": "La luz solar se concentra en un punto focal, generando altas temperaturas."
                    },
                    "passo3": {
                        "titulo": "Conducción Óptica",
                        "descricao": "El calor se transfiere a través de un sistema de fluidos con alta eficiencia."
                    },
                    "passo4": {
                        "titulo": "Uso Final",
                        "descricao": "La energía térmica se utiliza directamente en los procesos industriales."
                    }
                },
                "aplicacoes": {
                    "titulo": "Aplicaciones",
                    "aplicacao1": {
                        "titulo": "Generación de Vapor",
                        "descricao": "Producción de vapor para procesos industriales sin costos de combustible."
                    },
                    "aplicacao2": {
                        "titulo": "Paneles Híbridos",
                        "descricao": "Sistemas combinados que generan energía eléctrica y térmica simultáneamente."
                    },
                    "aplicacao3": {
                        "titulo": "Cocinas Industriales",
                        "descricao": "Soluciones para cocción industrial a gran escala con energía solar."
                    },
                    "aplicacao4": {
                        "titulo": "Climatización",
                        "descricao": "Sistemas de refrigeración y calefacción impulsados por energía solar térmica."
                    }
                },
                "beneficios": {
                    "titulo": "Beneficios",
                    "beneficio1": {
                        "titulo": "Sostenibilidad",
                        "descricao": "Cero emisiones de carbono durante la operación, contribuyendo a un planeta más limpio."
                    },
                    "beneficio2": {
                        "titulo": "Economía",
                        "descricao": "Reducción de hasta el 80% en los costos de energía térmica a largo plazo."
                    },
                    "beneficio3": {
                        "titulo": "Eficiencia",
                        "descricao": "Tecnología con rendimiento energético superior al 70%, muy por encima del promedio del mercado."
                    },
                    "beneficio4": {
                        "titulo": "Durabilidad",
                        "descricao": "Sistemas diseñados para operar durante más de 25 años con mantenimiento mínimo."
                    }
                },
                "cta": {
                    "titulo": "Ignis es el futuro de la energía solar térmica. Únase a la revolución.",
                    "botao": "Panel"
                },
                "footer": {
                    "documentacao": "Documentación",
                    "sobre": "Acerca de",
                    "blog": "Blog",
                    "contato": "Contacto",
                    "copyright": "Ignis © 2025 – Energía transformada por el sol"
                }
            }
        };
        
        // Aplica os textos iniciais após o carregamento
        updateTexts();
    } catch (error) {
        console.error('Erro ao carregar os textos:', error);
    }
}

/**
 * Atualiza todos os textos da página com base no idioma selecionado
 */
function updateTexts() {
    // Verifica se os textos foram carregados
    if (!texts[currentLanguage]) {
        console.error('Textos não disponíveis para o idioma:', currentLanguage);
        return;
    }
    
    // Seleciona todos os elementos com o atributo data-text
    const elementsWithDataText = document.querySelectorAll('[data-text]');
    
    // Para cada elemento, atualiza o texto com base no caminho em data-text
    elementsWithDataText.forEach(element => {
        const path = element.getAttribute('data-text');
        const textValue = getTextByPath(path);
        
        if (textValue) {
            element.textContent = textValue;
        }
    });
    
    // Atualiza o atributo lang do HTML
    document.documentElement.lang = currentLanguage;
}

/**
 * Obtém o texto a partir do caminho (ex: "hero.titulo")
 * @param {string} path - Caminho para o texto no objeto texts
 * @returns {string} - Texto correspondente ao caminho
 */
function getTextByPath(path) {
    const keys = path.split('.');
    let current = texts[currentLanguage];
    
    for (const key of keys) {
        if (current && current[key] !== undefined) {
            current = current[key];
        } else {
            return null;
        }
    }
    
    return typeof current === 'string' ? current : null;
}

/**
 * Define o idioma atual e atualiza os textos
 * @param {string} language - Idioma a ser definido (pt, en, es)
 */
function setLanguage(language) {
    if (['pt', 'en', 'es'].includes(language)) {
        currentLanguage = language;
        
        // Atualiza os botões de idioma
        languageButtons.forEach(button => {
            if (button.id === `lang-${language}`) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Atualiza os textos na página
        updateTexts();
        
        // Salva a preferência de idioma no localStorage
        localStorage.setItem('preferredLanguage', language);
    }
}

/**
 * Alterna o menu móvel (abre/fecha)
 */
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    
    // Altera o ícone do menu hambúrguer
    const icon = hamburger.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

/**
 * Verifica a preferência de modo escuro do usuário
 */
function checkDarkModePreference() {
    // Verifica se há uma preferência salva no localStorage
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
    } else if (savedMode === null) {
        // Se não houver preferência salva, verifica a preferência do sistema
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }
}

/**
 * Inicializa os event listeners
 */
function initEventListeners() {
    // Event listeners para os botões de idioma
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const language = button.id.replace('lang-', '');
            setLanguage(language);
        });
    });
    
    // Event listener para o menu hambúrguer
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Event listeners para os links do menu mobile (fechar o menu após clicar)
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Detecta cliques fora do menu mobile para fechá-lo
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

/**
 * Função de inicialização
 */
function init() {
    // Verifica a preferência de modo escuro
    checkDarkModePreference();
    
    // Carrega os textos do JSON
    loadTexts();
    
    // Verifica se há um idioma preferido salvo
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        
        // Atualiza os botões de idioma
        languageButtons.forEach(button => {
            if (button.id === `lang-${currentLanguage}`) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Inicializa os event listeners
    initEventListeners();
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);