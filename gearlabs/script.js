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
        footerHome: "DealeGear",
        footerLicence: "Licença",
        footerDocs: "Documentação",
        //footerCommunity: "Telegram",
        footerCopyright: "© 2022-2025 DealeGear - São Paulo - Brasil",
        licence: "Licença",
        documentation: "Documentação",
        dealegear: "DealeGear",
        scrollToTopBtn: "Topo",
        prototypes: [
            { id: 1, name: "3GTO", description: "3GTO é um jogo imersivo que combina VR e veículos em três mundos (água, cidade, floresta), criado como entretenimento para negócios.", image: "img/3gto-capa.jpg", link: "prototipos/3gto/index.html" },
            { id: 2, name: "Aloi", description: "Protótipo open source que simula a extração e análise de substâncias bioativas obtidas de plantas nativas brasileiras", image: "img/aloi-capa.jpg", link: "prototipos/aloi/index.html" },
            { id: 3, name: "Aventuras Peludas", description: "As aventuras de uma poodle chamada Amélia, sonhadora incansável ou imortal highlander — ninguém sabe ao certo", image: "img/aventuras_peludas_capa.jpg", link: "prototipos/aventuras_peludas/index.html" },
            { id: 4, name: "Baristas", description: "Um clube exclusivo onde o café é experiência, o encontro é conexão e cada xícara conta uma história", image: "img/baristas-capa.jpg", link: "prototipos/baristas/index.html" },
            { id: 5, name: "BaristaPro", description: "Sistema de Gestão de Cafeterias: Completo, impulsionado por inteligência artificial e desenhado para gerar insights podersos para facilitar a gestão do negócio", image: "img/baristapro-capa.jpg", link: "prototipos/barista_pro/index.html" },
            { id: 6, name: "Bosque das Frutíferas", description: "Incentivando a conexão com a natureza nas grandes cidades, promovendo educação e elevando o bem-estar das pessoas.", image: "img/bosquedasfrutiferas-capa.jpg", link: "prototipos/bosquedasfrutiferas/index.html" },
            { id: 7, name: "Conexa", description: "Pós-venda digital open source: atendimento via WhatsApp, gestão de redes, relatórios e automação para micro negócios", image: "img/conexa-capa.jpg", link: "prototipos/conexa/index.html" },
            { id: 8, name: "Crush", description: "App open source para geeks se conectarem, participarem de missões e viverem relacionamentos divertidos", image: "img/crush-capa.jpg", link: "prototipos/crush/index.html" },
            { id: 9, name: "Dyris", description: "Sistema open source que acompanha hábitos e saúde ao longo da vida, prevenindo riscos e personalizando cuidados", image: "img/dyris-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 10, name: "DogZen", description: "Casinha anti-ruído para cães, projetada para bem-estar, conforto e fácil replicação por makers e pesquisadores", image: "img/dogzen-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 11, name: "Dust Protocol", description: "Jogo cyberpunk distópico: humanos, sob o julgo da AGI, tentam destruir Plastic Eden e recuperar sua liberdade.", image: "img/dustprotocol-capa.jpg", link: "prototipos/dustprotocol/index.html" },
            { id: 12, name: "E-Motion", description: "Motores multi-uso mais eficientes e sustentáveis, unindo combustão modernizada e tecnologia elétrica de ponta", image: "img/emotion-capa.jpg", link: "prototipos/emotion/index.html" },
            { id: 13, name: "Evora", description: "Um protótipo híbrido que une cidade virtual e modelos físicos para ensinar sobre ecossistemas urbanos e inspirar soluções para desafios reais", image: "img/evora-capa.jpg", link: "prototipos/evora/index.html" },
            { id: 14, name: "Fabr", description: "Uma plataforma de fabricação colaborativa, onde pessoas combinam habilidades para criar algo novo", image: "img/fabr-capa.jpg", link: "prototipos/fabr/index.html" },
            { id: 15, name: "GearCity", description: "Protótipo de simulação social, onde diferentes papéis se conectam como engrenagens, movimentando a cidade de forma colaborativa e imprevisível.", image: "img/gearcity-capa.jpg", link: "prototipos/gearcity/index.html" },
            { id: 16, name: "Ignis", description: "Concentrador óptico solar que leva luz do sol a edifícios, gerando calor para energia, aquecimento e processos industriais", image: "img/ignis-capa.jpg", link: "prototipos/ignis/index.html" },
            { id: 17, name: "Mecanico Fantasma", description: "Monitoramento e analise de sons mecânicos de veículos, identificando divergências e prevenindo falhas", image: "img/mecanicofantasma-capa.jpg", link: "prototipos/mecanicofantasma/index.html" },
            { id: 18, name: "Mike e Tio Bob", description: "Dois dinossauros atrapalhados, Myke e Tio Bob, embarcam numa máquina do tempo e vivem uma aventura jurássica", image: "img/mike-bob-capa.jpg", link: "prototipos/mike-bob/index.html" },
            { id: 19, name: "MyHeart", description: "Simulador cardiácico com visualizações gráficas e ajustes para simular comportamentos anormais", image: "img/myheart-capa.jpg", link: "prototipos/myheart/index.html" },
            { id: 20, name: "Oxygen", description: "Soluções energéticas híbridas e sustentáveis, unindo renováveis e baixo impacto para gerar energia limpa e eficiente", image: "img/oxygen-capa.jpg", link: "prototipos/oxygen/index.html" },
            { id: 21, name: "Raiz Urbana", description: "Ensinando agricultura em ambientes urbanos, de forma simples e acessível para todos.", image: "img/raiz_urbana_capa.jpg", link: "prototipos/raiz_urbana/index.html" },
            { id: 22, name: "SIMCO", description: "Simulador da função colorretal, voltado para estudos aprofundados e suporte à prevenção de doenças", image: "img/simco-capa.jpg", link: "prototipos/simco/index.html" },
            { id: 23, name: "Stairs", description: "Suba os degraus do conhecimento e transforme suas ideias em projetos de sucesso", image: "img/stairs-capa.jpg", link: "prototipos/stairs/index.html" },
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
        footerHome: "DealeGear",
        footerLicence: "Licence",
        footerDocs: "Documentation",
        //footerCommunity: "Telegram",
        footerCopyright: "© 2022-2025 DealeGear - São Paulo - Brasil",
        licence: "Licence",
        documentation: "Documentation",
        dealegear: "DealeGear",
        scrollToTopBtn: "Top",
        prototypes: [
            { id: 1, name: "3GTO", description: "3GTO is an immersive game mixing VR and vehicles across three worlds—water, city, forest—designed as entertainment for businesses", image: "img/3gto-capa.jpg", link: "prototipos/3gto/index.html" },
            { id: 2, name: "Aloi", description: "Open-source prototype simulating extraction and analysis of bioactive compounds obtained from Brazilian native plants", image: "img/aloi-capa.jpg", link: "prototipos/aloi/index.html" },
            { id: 3, name: "Furry Adventures", description: "The adventures of a poodle named Amélia, tireless dreamer or immortal highlander — no one really knows", image: "img/aventuras_peludas_capa.jpg", link: "prototipos/aventuras_peludas/index.html" },
            { id: 4, name: "Baristas", description: "An exclusive club where coffee is experience, meetings are connection, and every cup tells a story", image: "img/baristas-capa.jpg", link: "prototipos/baristas/index.html" },
            { id: 5, name: "BaristaPro", description: "Coffee Shop Management System: Complete, AI-powered, and designed to generate powerful insights to streamline business management", image: "img/baristapro-capa.jpg", link: "prototipos/barista_pro/index.html" },
            { id: 6, name: "Fruit Grove", description: "Encouraging connection with nature in big cities, promoting education, and enhancing people's well-being", image: "img/bosquedasfrutiferas-capa.jpg", link: "prototipos/bosquedasfrutiferas/index.html" },
            { id: 7, name: "Conexa", description: "Open source digital after-sales: WhatsApp support, social media management, reports, and automation for micro businesses", image: "img/conexa-capa.jpg", link: "prototipos/conexa/index.html" },
            { id: 8, name: "Crush", description: "Open-source app for geeks to connect, join quests, and enjoy fun relationshi", image: "img/crush-capa.jpg", link: "prototipos/crush/index.html" },
            { id: 9, name: "Dyris", description: "Open-source system that tracks habits and health throughout life, preventing risks and personalizing care.", image: "img/dyris-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 10, name: "DogZen", description: "Noise-reducing dog house designed for well-being, comfort, and easy replication by makers and researchers", image: "img/dogzen-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 11, name: "Dust Protocol", description: "Cyberpunk dystopian game: humans under the rule of the AGI try to destroy Plastic Eden to regain their freedom", image: "img/dustprotocol-capa.jpg", link: "prototipos/dustprotocol/index.html" },
            { id: 12, name: "E-Motion", description: "More efficient and sustainable multi-use engines, combining modernized combustion and cutting-edge electric technology", image: "img/emotion-capa.jpg", link: "prototipos/emotion/index.html" },
            { id: 13, name: "Evora", description: "A hybrid prototype that combines virtual city and physical models to teach about urban ecosystems and inspire solutions to real challenges", image: "img/evora-capa.jpg", link: "prototipos/evora/index.html" },
            { id: 14, name: "Fabr", description: "A collaborative manufacturing platform where people combine skills to create something new", image: "img/fabr-capa.jpg", link: "prototipos/fabr/index.html" },
            { id: 15, name: "GearCity", description: "A social simulation prototype where different roles connect like gears, moving the city collaboratively and unpredictably.", image: "img/gearcity-capa.jpg", link: "prototipos/gearcity/index.html" },
            { id: 16, name: "Ignis", description: "Solar optical concentrator that directs sunlight into buildings, generating heat for energy, heating, and industrial processes", image: "img/ignis-capa.jpg", link: "prototipos/ignis/index.html" },
            { id: 17, name: "Ghost Mechanic", description: "Monitoring and analysis of vehicle mechanical sounds, identifying divergences and preventing failures", image: "img/mecanicofantasma-capa.jpg", link: "prototipos/mecanicofantasma/index.html" },
            { id: 18, name: "Mike and Uncle Bob", description: "Two clumsy dinosaurs, Myke and Tio Bob, board a time machine and live a Jurassic adventure", image: "img/mike-bob-capa.jpg", link: "prototipos/mike-bob/index.html" },
            { id: 19, name: "MyHeart", description: "Cardiac simulator with graphic visualizations and adjustments to simulate abnormal behaviors", image: "img/myheart-capa.jpg", link: "prototipos/myheart/index.html" },
            { id: 20, name: "Oxygen", description: "Hybrid and sustainable energy solutions, combining renewables and low impact to generate clean and efficient power", image: "img/oxygen-capa.jpg", link: "prototipos/oxygen/index.html" },
            { id: 21, name: "Urban Root", description: "Teaching agriculture in urban environments, in a simple and accessible way for everyone", image: "img/raiz_urbana_capa.jpg", link: "prototipos/raiz_urbana/index.html" },
            { id: 22, name: "SIMCO", description: "Colorectal function simulator, aimed at advanced studies and supporting disease prevention", image: "img/simco-capa.jpg", link: "prototipos/simco/index.html" },
            { id: 23, name: "Stairs", description: "Climb the steps of knowledge and turn your ideas into successful projects", image: "img/stairs-capa.jpg", link: "prototipos/stairs/index.html" },
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
        footerHome: "DealeGear",
        footerLicence: "Licencia",
        footerDocs: "Documentación",
        //footerCommunity: "Telegram",
        footerCopyright: "© 2022-2025 DealeGear - São Paulo - Brasil",
        licence: "Licencia",
        documentation: "Documentación", 
        dealegear: "DealeGear",
        scrollToTopBtn: "Inicio",
        prototypes: [
            { id: 1, name: "3GTO", description: "3GTO es un juego inmersivo que une RV y vehículos en tres mundos (agua, ciudad, bosque), creado como entretenimiento para negocios", image: "img/3gto-capa.jpg", link: "prototipos/3gto/index.html" },
            { id: 2, name: "Aloi", description: "Prototipo open source que simula la extracción y análisis de compuestos bioactivos obtenidos de plantas nativas brasileñas", image: "img/aloi-capa.jpg", link: "prototipos/aloi/index.html" },
            { id: 3, name: "Aventuras Peludas", description: "Las aventuras de una caniche llamada Amélia, soñadora incansable o highlander inmortal — nadie lo sabe con certeza", image: "img/aventuras_peludas_capa.jpg", link: "prototipos/aventuras_peludas/index.html" },
            { id: 4, name: "Baristas", description: "Un club exclusivo donde el café es experiencia, el encuentro es conexión y cada taza cuenta una historia", image: "img/baristas-capa.jpg", link: "prototipos/baristas/index.html" },
            { id: 5, name: "BaristaPro", description: "Sistema de Gestión para Cafeterías: Completo, impulsado por inteligencia artificial y diseñado para generar poderosas perspectivas que faciliten la gestión del negocio", image: "img/baristapro-capa.jpg", link: "prototipos/barista_pro/index.html" },
            { id: 6, name: "Bosque de Frutales", description: "Fomentando la conexión con la naturaleza en las grandes ciudades, promoviendo la educación y elevando el bienestar de las personas", image: "img/bosquedasfrutiferas-capa.jpg", link: "prototipos/bosquedasfrutiferas/index.html" },
            { id: 7, name: "Conexa", description: "Postventa digital open source: atención vía WhatsApp, gestión de redes, informes y automatización para microempresas", image: "img/conexa-capa.jpg", link: "prototipos/conexa/index.html" },
            { id: 8, name: "Crush", description: "App open source para geeks conectarse, participar en misiones y disfrutar relaciones divertidas.", image: "img/crush-capa.jpg", link: "prototipos/crush/index.html" },
            { id: 9, name: "Dyris", description: "Sistema open source que registra hábitos y salud a lo largo de la vida, previniendo riesgos y personalizando cuidados.", image: "img/dyris-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 10, name: "DogZen", description: "Caseta anti-ruido para perros, diseñada para bienestar, comodidad y fácil replicación por creadores e investigadores", image: "img/dogzen-capa.jpg", link: "prototipos/dyris/index.html" },
            { id: 11, name: "Dust Protocol", description: "Juego cyberpunk distópico: humanos bajo el yugo de la AGI intentan destruir Plastic Eden para recuperar su libertad", image: "img/dustprotocol-capa.jpg", link: "prototipos/dustprotocol/index.html" },
            { id: 12, name: "E-Motion", description: "Motores multiuso más eficientes y sostenibles, combinando combustión modernizada y tecnología eléctrica de vanguardia", image: "img/emotion-capa.jpg", link: "prototipos/emotion/index.html" },
            { id: 13, name: "Evora", description: "Un prototipo híbrido que une ciudad virtual y modelos físicos para enseñar sobre ecosistemas urbanos e inspirar soluciones a desafíos reales", image: "img/evora-capa.jpg", link: "prototipos/evora/index.html" },
            { id: 14, name: "Fabr", description: "Una plataforma de fabricación colaborativa donde las personas combinan habilidades para crear algo nuevo", image: "img/fabr-capa.jpg", link: "prototipos/fabr/index.html" },
            { id: 15, name: "GearCity", description: "Un prototipo de simulación social donde diferentes roles se conectan como engranajes, moviendo la ciudad de forma colaborativa e impredecible.", image: "img/gearcity-capa.jpg", link: "prototipos/gearcity/index.html" },
            { id: 16, name: "Ignis", description: "Concentrador óptico solar que dirige la luz del sol hacia edificios, generando calor para energía, calefacción y procesos industriales", image: "img/ignis-capa.jpg", link: "prototipos/ignis/index.html" },
            { id: 17, name: "Mecánico Fantasma", description: "Monitoreo y análisis de sonidos mecánicos de vehículos, identificando divergencias y previniendo fallas", image: "img/mecanicofantasma-capa.jpg", link: "prototipos/mecanicofantasma/index.html" },
            { id: 18, name: "Mike y Tío Bob", description: "Dos dinosaurios torpes, Myke y Tío Bob, suben a una máquina del tiempo y viven una aventura jurásica", image: "img/mike-bob-capa.jpg", link: "prototipos/mike-bob/index.html" },
            { id: 19, name: "MyHeart", description: "Simulador cardíaco con visualizaciones gráficas y ajustes para simular comportamientos anormales", image: "img/myheart-capa.jpg", link: "prototipos/myheart/index.html" },
            { id: 20, name: "Oxygen", description: "Soluciones energéticas híbridas y sostenibles, uniendo renovables y bajo impacto para generar energía limpia y eficient", image: "img/oxygen-capa.jpg", link: "prototipos/oxygen/index.html" },
            { id: 21, name: "Raíz Urbana", description: "Enseñando agricultura en entornos urbanos, de forma sencilla y accesible para todos", image: "img/raiz_urbana_capa.jpg", link: "prototipos/raiz_urbana/index.html" },
            { id: 22, name: "SIMCO", description: "Simulador de la función colorrectal, orientado a estudios avanzados y apoyo a la prevención de enfermedades", image: "img/simco-capa.jpg", link: "prototipos/simco/index.html" },
            { id: 23, name: "Stairs", description: "Sube los escalones del conocimiento y convierte tus ideas en proyectos exitosos", image: "img/stairs-capa.jpg", link: "prototipos/stairs/index.html" },
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
    document.getElementById('footerHome').textContent = t.footerHome;
    document.getElementById('footerLicence').textContent = t.footerLicence;
    document.getElementById('footerDocs').textContent = t.footerDocs;
    //document.getElementById('footerCommunity').textContent = t.footerCommunity;
    document.getElementById('footerCopyright').textContent = t.footerCopyright;
    document.getElementById('licence').textContent = t.licence;
    document.getElementById('documentation').textContent = t.documentation;
    document.getElementById('dealegear').textContent = t.dealegear;
    document.getElementById('scrollToTopBtn').textContent = t.scrollToTopBtn;
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
//Função de scroll to top
// Pega o botão
const scrollBtn = document.getElementById("scrollToTopBtn");

// Quando o usuário rolar a página 20px do topo, mostra o botão
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}

// Quando o usuário clica no botão, rola suavemente para o topo
scrollBtn.addEventListener("click", function() {
    // Para rolagem suave (smooth scroll) em navegadores modernos
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

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
            <a href="${prototype.link}" class="prototype-link" >
                Ver protótipo <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}




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
