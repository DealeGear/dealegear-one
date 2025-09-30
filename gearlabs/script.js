// Dados de tradução
const translations = {
    pt: {
        heroTitle: "O Poder dos Protótipos",
        heroDescription: "Cada protótipo é uma oportunidade de aprendizado, um passo em direção à inovação. Através da experimentação e do desenvolvimento contínuo, transformamos ideias simples em soluções que podem impactar positivamente a vida das pessoas. Acreditamos que todo grande projeto começa com um pequeno protótipo.",
        ctaButton: "Comece agora",
        prototypesTitle: "Nossos Protótipos",
        challengesTitle: "Desafios de Inovação",
        challenge1Title: "Motor elétrico de alto desempenho",
        challenge1Desc: "Desenvolver um motor elétrico que supere as limitações atuais em eficiência, potência e durabilidade, tornando-se uma alternativa viável para aplicações industriais e de transporte.",
        challenge2Title: "Alternativa ao uso de hélio em dirigíveis",
        challenge2Desc: "Criar uma solução inovadora que possa substituir o hélio na flutuação de dirigíveis, considerando custos, segurança e impacto ambiental.",
        challenge3Title: "Energia limpa para comunidades isoladas",
        challenge3Desc: "Projetar um sistema de geração de energia sustentável e de baixo custo para comunidades rurais e isoladas, utilizando recursos locais disponíveis.",
        footerAbout: "Sobre",
        footerContact: "Contato",
        footerDocs: "Documentação",
        footerCommunity: "Comunidade",
        footerCopyright: "© 2024 GearLabs. Todos os direitos reservados.",
        prototypes: [
            { id: 1, name: "3GTO", description: "Realidade virtual que conecta aventura e tecnologia", image: "img/3gto-capa.jpg", link: "prototipos/3gto/index.html" },
            { id: 2, name: "Aloi", description: "Plantas que trazem saúde e inovação", image: "img/aloi-capa.jpg", link: "prototipos/aloi/index.html" },
            { id: 3, name: "Aventuras Peludas", description: "As aventuras de uma poodle excêntrica chamada Amelia", image: "img/aventuras_peludas_capa.jpg", link: "prototipos/aventuras_peludas/index.html" },
            { id: 4, name: "Baristas", description: "Uma cafeteria aconchegante com cafés especiais e muitas novidades", image: "img/baristas-capa.jpg", link: "prototipos/baristas/index.html" },
            { id: 5, name: "BaristaPro", description: "Gestão eficiente de cafeterias com foco em viabilidade e performance", image: "img/baristapro-capa.jpg", link: "prototipos/barista_pro/index.html" },
            { id: 6, name: "Bosque das Frutíferas", description: "Trazendo natureza, educação e bem-estar para as cidades", image: "img/bosquedasfrutiferas-capa.jpg", link: "prototipos/bosquedasfrutiferas/index.html" },
            { id: 7, name: "Conexa", description: "Pós-vendas digital para pequenos negócios", image: "img/conexa-capa.jpg", link: "prototipos/conexa/index.html" },
            { id: 8, name: "Crush", description: "Conexões geek e relacionamentos divertidos", image: "img/crush-capa.jpg", link: "prototipos/crush/index.html" },
            { id: 9, name: "Dyris", description: "Acompanhe sua saúde ao longo da vida, prevena riscos e personalizse cuidados", image: "img/dyris-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 10, name: "DogZen", description: "Conforto acústico para pets", image: "img/dogzen-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 11, name: "Dust Protocol", description: "um jogo cyberpunk distópico: humanos sob renda básica e IA total, e o jogador, como membro do Neon Silence, tenta invadir Plastic Eden para restaurar a agência humana", image: "img/dustprotocol-capa.jpg", link: "prototipos/dustprotocol/index.html" },
            { id: 12, name: "E-Motion", description: "Motores mais eficientes e duráveis", image: "img/emotion-capa.jpg", link: "prototipos/emotion/index.html" },
            { id: 13, name: "Evora", description: "Um protótipo híbrido que une cidade virtual e modelos físicos para ensinar sobre ecossistemas urbanos e inspirar soluções para desafios reais", image: "img/evora-capa.jpg", link: "prototipos/evora/index.html" },
            { id: 14, name: "Fabr", description: "Uma plataforma de fabricação colaborativa, onde pessoas combinam habilidades para criar algo novo", image: "img/fabr-capa.jpg", link: "prototipos/fabr/index.html" },
            { id: 15, name: "GearCity", description: "protótipo de simulação social, onde diferentes papéis se conectam como engrenagens, movimentando a cidade de forma colaborativa e imprevisível.", image: "img/gearcity-capa.jpg", link: "prototipos/gearcity/index.html" },
            { id: 16, name: "Ignis", description: "Um concentrador óptico solar que leva a luz do sol para dentro de edifícios, gerando calor para energia, aquecimento e processos industriais. O painel de controle simulado permite monitorar sensores e visualizar dados em tempo real.", image: "img/ignis-capa.jpg", link: "prototipos/ignis/index.html" },
            { id: 17, name: "Mecanico Fantasma", description: "Monitoramento e analise de sons mecânicos de veículos, identificando divergências e prevenindo falhas", image: "img/mecanicofantasma-capa.jpg", link: "prototipos/mecanicofantasma/index.html" },
            { id: 18, name: "Mike e Tio Bob", description: "As aventuras de dois dinossauros pelo tempo", image: "img/mike-bob-capa.jpg", link: "prototipos/mike-bob/index.html" },
            { id: 19, name: "MyHeart", description: "Simulador cardiácico, com visualizações gráficas e ajustes personalizados.", image: "img/myheart-capa.jpg", link: "prototipos/myheart/index.html" },
            { id: 20, name: "Oxygen", description: "Explorando novas formas de gerar energia eficiente e sustentável", image: "img/oxygen-capa.jpg", link: "prototipos/oxygen/index.html" },
            { id: 21, name: "Raiz Urbana", description: "Ensinando agricultura urbana de forma simples e acessível", image: "img/raiz_urbana_capa.jpg", link: "prototipos/raiz_urbana/index.html" },
            { id: 22, name: "SIMCO", description: "Simulador da Função Coloretal", image: "img/simco-capa.jpg", link: "prototipos/simco/index.html" },
            { id: 23, name: "Stairs", description: "Suba os degraus do conhecimento e transforme suas ideias em realidade", image: "img/stairs-capa.jpg", link: "prototipos/stairs/index.html" },
            { id: 24, name: "Synapse", description: "Conexão interativa de ideias para colaboração criativa e descoberta coletiva", image: "img/synapse-capa.jpg", link: "prototipos/synapse/index.html" },
            { id: 25, name: "UnderSea", description: "Drones subaquáticos para explorar, monitorar e estudar os oceanos de forma autônoma", image: "img/undersea-capa.jpg", link: "prototipos/undersea/index.html" },
            { id: 26, name: "VersoEspresso", description: "Café quente, páginas vivas e ideias infinitas", image: "img/versoespresso-capa.jpg", link: "prototipos/versoespresso/index.html" },
            { id: 27, name: "Viver é uma Arte", description: "Criação e exposição de arte a áreas carentes, proporcionando bem-estar e renda", image: "img/viverarte-capa.jpg", link: "prototipos/vivererte/index.html" }
        ]
    },
    en: {
        heroTitle: "The Power of Prototypes",
        heroDescription: "Every prototype is a learning opportunity, a step towards innovation. Through experimentation and continuous development, we transform simple ideas into solutions that can positively impact people's lives. We believe that every great project starts with a small prototype.",
        ctaButton: "Get Started",
        prototypesTitle: "Our Prototypes",
        challengesTitle: "Innovation Challenges",
        challenge1Title: "High-performance electric motor",
        challenge1Desc: "Develop an electric motor that overcomes current limitations in efficiency, power, and durability, becoming a viable alternative for industrial and transportation applications.",
        challenge2Title: "Alternative to helium in airships",
        challenge2Desc: "Create an innovative solution that can replace helium in airship buoyancy, considering costs, safety, and environmental impact.",
        challenge3Title: "Clean energy for isolated communities",
        challenge3Desc: "Design a sustainable and low-cost energy generation system for rural and isolated communities, using locally available resources.",
        footerAbout: "About",
        footerContact: "Contact",
        footerDocs: "Documentation",
        footerCommunity: "Community",
        footerCopyright: "© 2024 GearLabs. All rights reserved.",
        prototypes: [
            { id: 1, name: "3GTO", description: "Virtual reality connecting adventure and technology", image: "img/3gto-capa.jpg", link: "prototipos/3gto/index.html" },
            { id: 2, name: "Aloi", description: "Plants that bring health and innovation", image: "img/aloi-capa.jpg", link: "prototipos/aloi/index.html" },
            { id: 3, name: "Furry Adventures", description: "The adventures of an eccentric poodle named Amelia", image: "img/aventuras_peludas_capa.jpg", link: "prototipos/aventuras_peludas/index.html" },
            { id: 4, name: "Baristas", description: "A cozy coffee shop with specialty coffees and many novelties", image: "img/baristas-capa.jpg", link: "prototipos/baristas/index.html" },
            { id: 5, name: "BaristaPro", description: "Efficient coffee shop management focusing on viability and performance", image: "img/baristapro-capa.jpg", link: "prototipos/barista_pro/index.html" },
            { id: 6, name: "Fruit Grove", description: "Bringing nature, education, and well-being to cities", image: "img/bosquedasfrutiferas-capa.jpg", link: "prototipos/bosquedasfrutiferas/index.html" },
            { id: 7, name: "Conexa", description: "Digital after-sales for small businesses", image: "img/conexa-capa.jpg", link: "prototipos/conexa/index.html" },
            { id: 8, name: "Crush", description: "Geek connections and fun relationships", image: "img/crush-capa.jpg", link: "prototipos/crush/index.html" },
            { id: 9, name: "Dyris", description: "Track your health throughout life, prevent risks and personalize care", image: "img/dyris-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 10, name: "DogZen", description: "Acoustic comfort for pets", image: "img/dogzen-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 11, name: "Dust Protocol", description: "A dystopian cyberpunk game: humans under basic income and total AI, and the player, as a member of Neon Silence, tries to invade Plastic Eden to restore human agency", image: "img/dustprotocol-capa.jpg", link: "prototipos/dustprotocol/index.html" },
            { id: 12, name: "E-Motion", description: "More efficient and durable engines", image: "img/emotion-capa.jpg", link: "prototipos/emotion/index.html" },
            { id: 13, name: "Evora", description: "A hybrid prototype that combines virtual city and physical models to teach about urban ecosystems and inspire solutions to real challenges", image: "img/evora-capa.jpg", link: "prototipos/evora/index.html" },
            { id: 14, name: "Fabr", description: "A collaborative manufacturing platform where people combine skills to create something new", image: "img/fabr-capa.jpg", link: "prototipos/fabr/index.html" },
            { id: 15, name: "GearCity", description: "A social simulation prototype where different roles connect like gears, moving the city collaboratively and unpredictably.", image: "img/gearcity-capa.jpg", link: "prototipos/gearcity/index.html" },
            { id: 16, name: "Ignis", description: "A solar optical concentrator that brings sunlight into buildings, generating heat for energy, heating, and industrial processes. The simulated control panel allows monitoring sensors and visualizing real-time data.", image: "img/ignis-capa.jpg", link: "prototipos/ignis/index.html" },
            { id: 17, name: "Ghost Mechanic", description: "Monitoring and analysis of vehicle mechanical sounds, identifying divergences and preventing failures", image: "img/mecanicofantasma-capa.jpg", link: "prototipos/mecanicofantasma/index.html" },
            { id: 18, name: "Mike and Uncle Bob", description: "The adventures of two dinosaurs through time", image: "img/mike-bob-capa.jpg", link: "prototipos/mike-bob/index.html" },
            { id: 19, name: "MyHeart", description: "Cardiac simulator with graphical visualizations and custom adjustments.", image: "img/myheart-capa.jpg", link: "prototipos/myheart/index.html" },
            { id: 20, name: "Oxygen", description: "Exploring new ways to generate efficient and sustainable energy", image: "img/oxygen-capa.jpg", link: "prototipos/oxygen/index.html" },
            { id: 21, name: "Urban Root", description: "Teaching urban agriculture in a simple and accessible way", image: "img/raiz_urbana_capa.jpg", link: "prototipos/raiz_urbana/index.html" },
            { id: 22, name: "SIMCO", description: "Colorectal Function Simulator", image: "img/simco-capa.jpg", link: "prototipos/simco/index.html" },
            { id: 23, name: "Stairs", description: "Climb the steps of knowledge and turn your ideas into reality", image: "img/stairs-capa.jpg", link: "prototipos/stairs/index.html" },
            { id: 24, name: "Synapse", description: "Interactive connection of ideas for creative collaboration and collective discovery", image: "img/synapse-capa.jpg", link: "prototipos/synapse/index.html" },
            { id: 25, name: "UnderSea", description: "Underwater drones to explore, monitor, and study oceans autonomously", image: "img/undersea-capa.jpg", link: "prototipos/undersea/index.html" },
            { id: 26, name: "VersoEspresso", description: "Hot coffee, living pages, and infinite ideas", image: "img/versoespresso-capa.jpg", link: "prototipos/versoespresso/index.html" },
            { id: 27, name: "Living is an Art", description: "Creation and exhibition of art in needy areas, providing well-being and income", image: "img/viverarte-capa.jpg", link: "prototipos/vivererte/index.html" }
        ]
    },
    es: {
        heroTitle: "El Poder de los Prototipos",
        heroDescription: "Cada prototipo es una oportunidad de aprendizaje, un paso hacia la innovación. A través de la experimentación y el desarrollo continuo, transformamos ideas simples en soluciones que pueden impactar positivamente la vida de las personas. Creemos que todo gran proyecto comienza con un pequeño prototipo.",
        ctaButton: "Comenzar ahora",
        prototypesTitle: "Nuestros Prototipos",
        challengesTitle: "Desafíos de Innovación",
        challenge1Title: "Motor eléctrico de alto rendimiento",
        challenge1Desc: "Desarrollar un motor eléctrico que supere las limitaciones actuales en eficiencia, potencia y durabilidad, convirtiéndose en una alternativa viable para aplicaciones industriales y de transporte.",
        challenge2Title: "Alternativa al uso de helio en dirigibles",
        challenge2Desc: "Crear una solución innovadora que pueda reemplazar el helio en la flotación de dirigibles, considerando costos, seguridad e impacto ambiental.",
        challenge3Title: "Energía limpia para comunidades aisladas",
        challenge3Desc: "Diseñar un sistema de generación de energía sostenible y de bajo costo para comunidades rurales y aisladas, utilizando recursos locales disponibles.",
        footerAbout: "Acerca de",
        footerContact: "Contacto",
        footerDocs: "Documentación",
        footerCommunity: "Comunidad",
        footerCopyright: "© 2024 GearLabs. Todos los derechos reservados.",
        prototypes: [
            { id: 1, name: "3GTO", description: "Realidad virtual que conecta aventura y tecnología", image: "img/3gto-capa.jpg", link: "prototipos/3gto/index.html" },
            { id: 2, name: "Aloi", description: "Plantas que traen salud e innovación", image: "img/aloi-capa.jpg", link: "prototipos/aloi/index.html" },
            { id: 3, name: "Aventuras Peludas", description: "Las aventuras de una caniche excéntrica llamada Amelia", image: "img/aventuras_peludas_capa.jpg", link: "prototipos/aventuras_peludas/index.html" },
            { id: 4, name: "Baristas", description: "Una cafetería acogedora con cafés especiales y muchas novedades", image: "img/baristas-capa.jpg", link: "prototipos/baristas/index.html" },
            { id: 5, name: "BaristaPro", description: "Gestión eficiente de cafeterías con enfoque en viabilidad y rendimiento", image: "img/baristapro-capa.jpg", link: "prototipos/barista_pro/index.html" },
            { id: 6, name: "Bosque de Frutales", description: "Llevando naturaleza, educación y bienestar a las ciudades", image: "img/bosquedasfrutiferas-capa.jpg", link: "prototipos/bosquedasfrutiferas/index.html" },
            { id: 7, name: "Conexa", description: "Posventa digital para pequeños negocios", image: "img/conexa-capa.jpg", link: "prototipos/conexa/index.html" },
            { id: 8, name: "Crush", description: "Conexiones geek y relaciones divertidas", image: "img/crush-capa.jpg", link: "prototipos/crush/index.html" },
            { id: 9, name: "Dyris", description: "Acompaña tu salud a lo largo de la vida, previene riesgos y personaliza cuidados", image: "img/dyris-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 10, name: "DogZen", description: "Confort acústico para mascotas", image: "img/dogzen-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 11, name: "Dust Protocol", description: "Un juego cyberpunk distópico: humanos bajo renta básica e IA total, y el jugador, como miembro de Neon Silence, intenta invadir Plastic Eden para restaurar la agencia humana", image: "img/dustprotocol-capa.jpg", link: "prototipos/dustprotocol/index.html" },
            { id: 12, name: "E-Motion", description: "Motores más eficientes y duraderos", image: "img/emotion-capa.jpg", link: "prototipos/emotion/index.html" },
            { id: 13, name: "Evora", description: "Un prototipo híbrido que une ciudad virtual y modelos físicos para enseñar sobre ecosistemas urbanos e inspirar soluciones a desafíos reales", image: "img/evora-capa.jpg", link: "prototipos/evora/index.html" },
            { id: 14, name: "Fabr", description: "Una plataforma de fabricación colaborativa donde las personas combinan habilidades para crear algo nuevo", image: "img/fabr-capa.jpg", link: "prototipos/fabr/index.html" },
            { id: 15, name: "GearCity", description: "Un prototipo de simulación social donde diferentes roles se conectan como engranajes, moviendo la ciudad de forma colaborativa e impredecible.", image: "img/gearcity-capa.jpg", link: "prototipos/gearcity/index.html" },
            { id: 16, name: "Ignis", description: "Un concentrador óptico solar que lleva la luz del sol dentro de edificios, generando calor para energía, calefacción y procesos industriales. El panel de control simulado permite monitorear sensores y visualizar datos en tiempo real.", image: "img/ignis-capa.jpg", link: "prototipos/ignis/index.html" },
            { id: 17, name: "Mecánico Fantasma", description: "Monitoreo y análisis de sonidos mecánicos de vehículos, identificando divergencias y previniendo fallas", image: "img/mecanicofantasma-capa.jpg", link: "prototipos/mecanicofantasma/index.html" },
            { id: 18, name: "Mike y Tío Bob", description: "Las aventuras de dos dinosaurios a través del tiempo", image: "img/mike-bob-capa.jpg", link: "prototipos/mike-bob/index.html" },
            { id: 19, name: "MyHeart", description: "Simulador cardíaco con visualizaciones gráficas y ajustes personalizados.", image: "img/myheart-capa.jpg", link: "prototipos/myheart/index.html" },
            { id: 20, name: "Oxygen", description: "Explorando nuevas formas de generar energía eficiente y sostenible", image: "img/oxygen-capa.jpg", link: "prototipos/oxygen/index.html" },
            { id: 21, name: "Raíz Urbana", description: "Enseñando agricultura urbana de forma simple y accesible", image: "img/raiz_urbana_capa.jpg", link: "prototipos/raiz_urbana/index.html" },
            { id: 22, name: "SIMCO", description: "Simulador de la Función Colorrectal", image: "img/simco-capa.jpg", link: "prototipos/simco/index.html" },
            { id: 23, name: "Stairs", description: "Sube los escalones del conocimiento y transforma tus ideas en realidad", image: "img/stairs-capa.jpg", link: "prototipos/stairs/index.html" },
            { id: 24, name: "Synapse", description: "Conexión interactiva de ideas para colaboración creativa y descubrimiento colectivo", image: "img/synapse-capa.jpg", link: "prototipos/synapse/index.html" },
            { id: 25, name: "UnderSea", description: "Drones subacuáticos para explorar, monitorear y estudiar los océanos de forma autónoma", image: "img/undersea-capa.jpg", link: "prototipos/undersea/index.html" },
            { id: 26, name: "VersoEspresso", description: "Café caliente, páginas vivas e ideas infinitas", image: "img/versoespresso-capa.jpg", link: "prototipos/versoespresso/index.html" },
            { id: 27, name: "Vivir es un Arte", description: "Creación y exhibición de arte en áreas necesitadas, proporcionando bienestar e ingresos", image: "img/viverarte-capa.jpg", link: "prototipos/vivererte/index.html" }
        ]
    }
};

// Estado da aplicação
let currentLanguage = 'pt';
let currentTheme = 'light';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
    }

    // Verificar idioma salvo
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        document.documentElement.lang = currentLanguage;
    }

    // Carregar protótipos
    loadPrototypes();

    // Fechar menus ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-dropdown')) {
            document.getElementById('languageMenu').classList.remove('active');
        }
    });
});

// Funções de tema
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Funções de idioma
function toggleLanguageMenu() {
    document.getElementById('languageMenu').classList.toggle('active');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    updateTranslations();
    loadPrototypes();
    document.getElementById('languageMenu').classList.remove('active');
}

function updateTranslations() {
    const t = translations[currentLanguage];
    
    // Atualizar textos estáticos
    document.getElementById('heroTitle').textContent = t.heroTitle;
    document.getElementById('heroDescription').textContent = t.heroDescription;
    document.getElementById('ctaButton').textContent = t.ctaButton;
    document.getElementById('prototypesTitle').textContent = t.prototypesTitle;
    document.getElementById('challengesTitle').textContent = t.challengesTitle;
    document.getElementById('challenge1Title').textContent = t.challenge1Title;
    document.getElementById('challenge1Desc').textContent = t.challenge1Desc;
    document.getElementById('challenge2Title').textContent = t.challenge2Title;
    document.getElementById('challenge2Desc').textContent = t.challenge2Desc;
    document.getElementById('challenge3Title').textContent = t.challenge3Title;
    document.getElementById('challenge3Desc').textContent = t.challenge3Desc;
    document.getElementById('footerAbout').textContent = t.footerAbout;
    document.getElementById('footerContact').textContent = t.footerContact;
    document.getElementById('footerDocs').textContent = t.footerDocs;
    document.getElementById('footerCommunity').textContent = t.footerCommunity;
    document.getElementById('footerCopyright').textContent = t.footerCopyright;
}

// Funções do menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Funções de navegação
function showSection(section) {
    const prototypesSection = document.getElementById('prototypes');
    const challengesSection = document.getElementById('challenges');
    
    if (section === 'prototypes') {
        prototypesSection.style.display = 'block';
        challengesSection.style.display = 'none';
    } else if (section === 'challenges') {
        prototypesSection.style.display = 'none';
        challengesSection.style.display = 'block';
    }
}

// Carregar protótipos
function loadPrototypes() {
    const grid = document.getElementById('prototypesGrid');
    const prototypes = translations[currentLanguage].prototypes;
    
    // Limpar grid
    grid.innerHTML = '';
    
    // Criar cards
    prototypes.forEach(prototype => {
        const card = createPrototypeCard(prototype);
        grid.appendChild(card);
    });
}

// Criar card de protótipo
function createPrototypeCard(prototype) {
    const card = document.createElement('div');
    card.className = 'prototype-card';
    
    // Usar placeholder se a imagem não existir
    const imageUrl = prototype.image || `https://picsum.photos/seed/${prototype.name}/400/300.jpg`;
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${prototype.name}" class="prototype-image" 
             onerror="this.src='https://picsum.photos/seed/${prototype.name}/400/300.jpg'">
        <div class="prototype-content">
            <h3 class="prototype-name">${prototype.name}</h3>
            <p class="prototype-description">${prototype.description}</p>
            <a href="${prototype.link}" class="prototype-link" target="_blank">
                Ver protótipo <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}

// Smooth scroll para âncoras
/*document.querySelectorAll('a[href^="#"]').forEach(anchor => {

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
});*/



// Smooth scroll para âncoras - Novo código
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // ignora se for só "#"
        if (href === "#") return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
