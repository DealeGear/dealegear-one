// Dados mockados para o dashboard
const mockData = {
    // Dados para a seção de Visão Geral - Países tecnologicamente avançados
    countries: [
        { name: 'Brasil', population: 213, gdpPerCapita: 14500, hdi: 0.765, techInvestment: 1.3 },
        { name: 'Estados Unidos', population: 332, gdpPerCapita: 63500, hdi: 0.926, techInvestment: 3.1 },
        { name: 'Japão', population: 126, gdpPerCapita: 40200, hdi: 0.925, techInvestment: 3.3 },
        { name: 'Alemanha', population: 83, gdpPerCapita: 46200, hdi: 0.947, techInvestment: 3.0 },
        { name: 'Coreia do Sul', population: 52, gdpPerCapita: 31400, hdi: 0.916, techInvestment: 4.8 },
        { name: 'China', population: 1412, gdpPerCapita: 12500, hdi: 0.761, techInvestment: 2.4 },
        { name: 'Reino Unido', population: 68, gdpPerCapita: 40300, hdi: 0.932, techInvestment: 1.7 },
        { name: 'França', population: 65, gdpPerCapita: 38500, hdi: 0.901, techInvestment: 2.2 },
        { name: 'Canadá', population: 38, gdpPerCapita: 43200, hdi: 0.929, techInvestment: 1.8 },
        { name: 'Austrália', population: 26, gdpPerCapita: 54900, hdi: 0.944, techInvestment: 1.9 }
    ],
    
    // Dados de idiomas mais relevantes para negócios globais
    languages: [
        { language: 'Inglês', speakers: 1132, percentage: 17, businessRelevance: 95 },
        { language: 'Chinês Mandarim', speakers: 1117, percentage: 16, businessRelevance: 85 },
        { language: 'Espanhol', speakers: 534, percentage: 8, businessRelevance: 75 },
        { language: 'Hindi', speakers: 615, percentage: 9, businessRelevance: 65 },
        { language: 'Português', speakers: 258, percentage: 4, businessRelevance: 70 }
    ],
    
    // Dados para a seção de Negócios no Brasil
    sectorsGrowth: {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [
            {
                label: 'Tecnologia',
                data: [15, 18, 22, 28, 35],
                borderColor: '#1a73e8',
                backgroundColor: 'rgba(26, 115, 232, 0.1)'
            },
            {
                label: 'Energias Renováveis',
                data: [12, 15, 18, 25, 32],
                borderColor: '#34a853',
                backgroundColor: 'rgba(52, 168, 83, 0.1)'
            },
            {
                label: 'E-commerce',
                data: [20, 25, 35, 45, 55],
                borderColor: '#ea4335',
                backgroundColor: 'rgba(234, 67, 53, 0.1)'
            }
        ]
    },
    
    sectorsStatus: [
        { sector: 'Varejo Tradicional', status: 'Saturado', growth: -2, competition: 'Alta', techAdoption: 45 },
        { sector: 'E-commerce', status: 'Crescimento', growth: 25, competition: 'Média', techAdoption: 85 },
        { sector: 'FinTech', status: 'Crescimento', growth: 35, competition: 'Alta', techAdoption: 90 },
        { sector: 'EdTech', status: 'Crescimento', growth: 30, competition: 'Média', techAdoption: 75 },
        { sector: 'HealthTech', status: 'Crescimento', growth: 28, competition: 'Média', techAdoption: 70 },
        { sector: 'Clean Energy', status: 'Crescimento', growth: 40, competition: 'Baixa', techAdoption: 65 }
    ],
    
    techAdoption: {
        labels: ['IA', 'Cloud Computing', 'IoT', 'Big Data', 'Blockchain', '5G'],
        datasets: [
            {
                label: 'Tecnologia',
                data: [85, 90, 75, 80, 60, 70],
                backgroundColor: 'rgba(26, 115, 232, 0.2)'
            },
            {
                label: 'Saúde',
                data: [60, 65, 50, 70, 40, 55],
                backgroundColor: 'rgba(234, 67, 53, 0.2)'
            },
            {
                label: 'Energia',
                data: [40, 50, 65, 60, 30, 75],
                backgroundColor: 'rgba(52, 168, 83, 0.2)'
            }
        ]
    },
    
    // Dados para a seção de Oportunidades Globais
    rdInvestment: [
        { country: 'Coreia do Sul', investment: 4.9, patents: 6400 },
        { country: 'Israel', investment: 4.8, patents: 3200 },
        { country: 'Japão', investment: 3.3, patents: 48000 },
        { country: 'Alemanha', investment: 3.0, patents: 18000 },
        { country: 'Estados Unidos', investment: 3.1, patents: 59000 },
        { country: 'China', investment: 2.4, patents: 69500 },
        { country: 'França', investment: 2.2, patents: 8100 },
        { country: 'Canadá', investment: 1.8, patents: 3400 },
        { country: 'Austrália', investment: 1.9, patents: 2100 },
        { country: 'Brasil', investment: 1.3, patents: 800 }
    ],
    
    niches: [
        { continent: 'América do Norte', niche: 'Inteligência Artificial', growth: 'Alto', potential: 'Muito Alto', marketSize: '$150B' },
        { continent: 'Ásia', niche: 'FinTech', growth: 'Alto', potential: 'Muito Alto', marketSize: '$120B' },
        { continent: 'Europa', niche: 'Energias Renováveis', growth: 'Médio', potential: 'Alto', marketSize: '$90B' },
        { continent: 'Europa', niche: 'HealthTech', growth: 'Médio', potential: 'Alto', marketSize: '$80B' },
        { continent: 'América do Norte', niche: 'Computação Quântica', growth: 'Alto', potential: 'Muito Alto', marketSize: '$30B' },
        { continent: 'América do Sul', niche: 'AgriTech', growth: 'Médio', potential: 'Alto', marketSize: '$20B' },
        { continent: 'Ásia', niche: 'Biotecnologia', growth: 'Alto', potential: 'Alto', marketSize: '$60B' },
        { continent: 'Oceania', niche: 'Tecnologia Espacial', growth: 'Médio', potential: 'Alto', marketSize: '$40B' }
    ],
    
    // Dados para o Feed de Notícias
    news: [
        {
            title: 'Brazilian tech startups raise $2.5 billion in Q2 2023, breaking records',
            source: 'TechCrunch',
            content: 'Brazilian technology startups have raised a record $2.5 billion in the second quarter of 2023, with fintech and enterprise software companies leading the investments. This represents a 35% increase compared to the same period last year, highlighting Brazil\'s growing position in the global tech ecosystem.',
            translatedTitle: 'Startups brasileiras de tecnologia captam US$ 2,5 bilhões no Q2 de 2023, quebrando recordes',
            translatedContent: 'Startups brasileiras de tecnologia captaram um recorde de US$ 2,5 bilhões no segundo trimestre de 2023, com empresas de fintech e software empresarial liderando os investimentos. Isso representa um aumento de 35% em comparação com o mesmo período do ano passado, destacando a crescente posição do Brasil no ecossistema tecnológico global.',
            sentiment: 'positive'
        },
        {
            title: 'South Korea leads global 5G adoption with 45% population coverage',
            source: 'Reuters',
            content: 'South Korea has achieved 45% population coverage with 5G technology, making it the global leader in 5G adoption. The country\'s investment in next-generation telecommunications infrastructure has positioned its tech companies at the forefront of innovation in IoT, autonomous vehicles, and smart cities.',
            translatedTitle: 'Coreia do Sul lidera adoção global de 5G com 45% de cobertura populacional',
            translatedContent: 'A Coreia do Sul alcançou 45% de cobertura populacional com tecnologia 5G, tornando-se líder global na adoção do 5G. O investimento do país em infraestrutura de telecomunicações de próxima geração posicionou suas empresas de tecnologia na vanguarda da inovação em IoT, veículos autônomos e cidades inteligentes.',
            sentiment: 'positive'
        },
        {
            title: 'Germany announces €10 billion investment in AI research and development',
            source: 'Bloomberg',
            content: 'The German government has announced a €10 billion investment plan for artificial intelligence research and development over the next five years. The initiative aims to strengthen Germany\'s position in the global AI race and create up to 100,000 new jobs in the technology sector.',
            translatedTitle: 'Alemanha anuncia investimento de €10 bilhões em pesquisa e desenvolvimento de IA',
            translatedContent: 'O governo alemão anunciou um plano de investimento de €10 bilhões para pesquisa e desenvolvimento de inteligência artificial nos próximos cinco anos. A iniciativa visa fortalecer a posição da Alemanha na corrida global por IA e criar até 100.000 novos empregos no setor de tecnologia.',
            sentiment: 'positive'
        }
    ],
    
    // Dados para o Gerador de Ideias
    businessIdeas: [
        {
            title: 'Plataforma de Educação em IA para Empresas Brasileiras',
            description: 'Desenvolva uma plataforma que ofereça treinamento personalizado em inteligência artificial para empresas de diferentes setores no Brasil, ajudando-as a digitalizar processos e melhorar a eficiência.',
            requiredSkills: ['Tecnologia', 'Educação', 'IA'],
            requiredInvestment: 'high',
            timeCommitment: 'full-time',
            potential: 'Muito Alto'
        },
        {
            title: 'Solução de FinTech para Pagamentos Internacionais',
            description: 'Crie uma solução financeira que facilite pagamentos internacionais para pequenas e médias empresas brasileiras, reduzindo custos e burocracia nas transações com mercados tecnologicamente avançados.',
            requiredSkills: ['Finanças', 'Tecnologia', 'Marketing'],
            requiredInvestment: 'high',
            timeCommitment: 'full-time',
            potential: 'Alto'
        },
        {
            title: 'Consultoria em Transformação Digital para Agronegócio',
            description: 'Ofereça serviços de consultoria especializados em transformação digital para o setor agrícola brasileiro, implementando soluções de IoT, análise de dados e automação.',
            requiredSkills: ['Agricultura', 'Tecnologia', 'Consultoria'],
            requiredInvestment: 'medium',
            timeCommitment: 'full-time',
            potential: 'Alto'
        },
        {
            title: 'Marketplace de Tecnologia Brasileira para Exportação',
            description: 'Desenvolva uma plataforma que conecte empresas de tecnologia brasileiras com compradores internacionais, facilitando a exportação de software e serviços tecnológicos.',
            requiredSkills: ['Tecnologia', 'Comércio Exterior', 'Marketing'],
            requiredInvestment: 'medium',
            timeCommitment: 'full-time',
            potential: 'Muito Alto'
        }
    ],
    // Novos dados para as funcionalidades adicionadas
    glossary: [
        { term: 'PIB', definition: 'Produto Interno Bruto - valor de todos os bens e serviços finais produzidos em um país em um determinado período.' },
        { term: 'IDH', definition: 'Índice de Desenvolvimento Humano - medida comparativa de expectativa de vida, educação e renda.' },
        { term: 'P&D', definition: 'Pesquisa e Desenvolvimento - atividades voltadas para a inovação e introdução de novos produtos/serviços.' },
        { term: 'IA', definition: 'Inteligência Artificial - ramo da ciência da computação que desenvolve sistemas capazes de realizar tarefas que normalmente exigem inteligência humana.' },
        { term: 'IoT', definition: 'Internet das Coisas - rede de objetos físicos equipados com sensores, software e outras tecnologias para conectar e trocar dados com outros dispositivos e sistemas pela internet.' }
    ],
    tutorials: [
        { title: 'Como Interpretar Indicadores Tecnológicos', content: 'Os indicadores tecnológicos mostram o nível de adoção e investimento em tecnologia por país. Fique atento a métricas como investimento em P&D, número de patentes e taxa de adoção de tecnologias emergentes como IA e IoT.' },
        { title: 'Entendendo Oportunidades em Mercados Tecnológicos', content: 'Mercados tecnológicos avançados oferecem oportunidades em setores como IA, FinTech, HealthTech e Energias Renováveis. Analise o tamanho do mercado, taxa de crescimento e barreiras de entrada antes de investir.' },
        { title: 'Estratégias para Expansão Internacional', content: 'Para expandir para mercados tecnologicamente avançados, estude as regulamentações locais, parcerias estratégicas e adaptação cultural. Comece com mercados com menor barreira linguística e cultural.' }
    ],
    caseStudies: [
        { title: 'Nubank: Revolucionando o Sistema Financeiro Brasileiro', sector: 'FinTech', result: 'Avaliação de US$ 30 bilhões', content: 'A Nubank transformou o sistema financeiro brasileiro com uma abordagem digital e sem taxas, alcançando mais de 70 milhões de clientes e se tornando um unicórnio brasileiro de sucesso global.' },
        { title: 'iFood: Liderança em Food Delivery na América Latina', sector: 'E-commerce', result: 'Avaliação de US$ 15 bilhões', content: 'O iFood dominou o mercado de delivery na América Latina através de tecnologia avançada e expansão agressiva, processando mais de 80 milhões de pedidos mensais.' }
    ],
    sentimentData: {
        technology: 0.8,
        healthcare: 0.75,
        education: 0.7,
        agriculture: 0.65,
        finance: 0.75
    }
};

// Inicialização do dashboard quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeThemeToggle();
    initializeHighContrast();
    initializeModals();
    loadOverviewData();
    loadBusinessData();
    loadGlobalOpportunities();
    loadNews();
    setupIdeaGenerator();
    setupMapInteractions();
    setupScenarioSimulator();
    loadHeatmapData();
    setupComparisonTools();
});

// Configuração da navegação
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navToggle = document.querySelector('.nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Alternar menu em dispositivos móveis
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const nav = document.querySelector('header nav');
            nav.classList.toggle('active');
        });
    }
    
    // Navegação por clique nos links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Atualizar links ativos
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar seção correspondente
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // Fechar menu em mobile após clique
            if (window.innerWidth <= 768) {
                document.querySelector('header nav').classList.remove('active');
                sidebar.classList.remove('active');
            }
        });
    });
}

// Configuração do toggle de tema
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            
            // Atualizar ícone com animação
            if (newTheme === 'dark') {
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                `;
            } else {
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                `;
            }
            
            // Salvar preferência
            localStorage.setItem('theme', newTheme);
        });
        
        // Carregar tema salvo
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                themeToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                `;
            } else {
                themeToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                `;
            }
        }
    }
}

// Configuração do modo alto contraste
function initializeHighContrast() {
    const contrastToggle = document.getElementById('contrastToggle');
    if (contrastToggle) {
        contrastToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'high-contrast' ? 'light' : 'high-contrast';
            document.body.setAttribute('data-theme', newTheme);
            
            // Salvar preferência
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Configuração dos modais
function initializeModals() {
    // Glossário
    const glossaryToggle = document.getElementById('glossaryToggle');
    const glossaryModal = document.getElementById('glossaryModal');
    const glossaryContent = document.getElementById('glossaryContent');
    
    if (glossaryToggle && glossaryModal) {
        // Carregar conteúdo do glossário
        mockData.glossary.forEach(item => {
            const termElement = document.createElement('div');
            termElement.innerHTML = `<h3>${item.term}</h3><p>${item.definition}</p>`;
            glossaryContent.appendChild(termElement);
        });
        
        glossaryToggle.addEventListener('click', function() {
            glossaryModal.classList.add('active');
        });
    }
    
    // Tutoriais
    const tutorialToggle = document.getElementById('tutorialToggle');
    const tutorialModal = document.getElementById('tutorialModal');
    const tutorialContent = document.getElementById('tutorialContent');
    
    if (tutorialToggle && tutorialModal) {
        // Carregar conteúdo dos tutoriais
        mockData.tutorials.forEach(tutorial => {
            const tutorialElement = document.createElement('div');
            tutorialElement.innerHTML = `<h3>${tutorial.title}</h3><p>${tutorial.content}</p>`;
            tutorialContent.appendChild(tutorialElement);
        });
        
        tutorialToggle.addEventListener('click', function() {
            tutorialModal.classList.add('active');
        });
    }
    
    // Fechar modais
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

// Carregar dados da seção Visão Geral
function loadOverviewData() {
    // Gráfico de população
    const populationCtx = document.getElementById('populationChart').getContext('2d');
    new Chart(populationCtx, {
        type: 'bar',
        data: {
            labels: mockData.countries.map(country => country.name),
            datasets: [{
                label: 'População (milhões)',
                data: mockData.countries.map(country => country.population),
                backgroundColor: '#1a73e8'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Países Líderes em Tecnologia'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `População: ${context.raw} milhões`;
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de idiomas
    const languagesCtx = document.getElementById('languagesChart').getContext('2d');
    new Chart(languagesCtx, {
        type: 'pie',
        data: {
            labels: mockData.languages.map(lang => lang.language),
            datasets: [{
                data: mockData.languages.map(lang => lang.businessRelevance),
                backgroundColor: [
                    '#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9334e6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Relevância para Negócios Globais (%)'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const lang = mockData.languages[context.dataIndex];
                            return `${lang.language}: ${lang.businessRelevance}% relevância (${lang.speakers} milhões de falantes)`;
                        }
                    }
                }
            }
        }
    });
    
    // Tabela de países
    const countriesTable = document.querySelector('#countriesTable tbody');
    mockData.countries.forEach(country => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${country.name}</td>
            <td>$${country.gdpPerCapita.toLocaleString()}</td>
            <td>${country.hdi}</td>
            <td>${country.population.toLocaleString()}</td>
        `;
        countriesTable.appendChild(row);
    });
}

// Carregar dados da seção Negócios no Brasil
function loadBusinessData() {
    // Gráfico de crescimento de setores
    const sectorsCtx = document.getElementById('sectorsChart').getContext('2d');
    new Chart(sectorsCtx, {
        type: 'line',
        data: mockData.sectorsGrowth,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Crescimento de Setores Tecnológicos no Brasil (%)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Crescimento (%)'
                    }
                }
            }
        }
    });
    
    // Tabela de setores
    const sectorsTable = document.querySelector('#sectorsTable tbody');
    mockData.sectorsStatus.forEach(sector => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sector.sector}</td>
            <td><span class="status-badge ${sector.status === 'Crescimento' ? 'growth' : 'saturated'}">${sector.status}</span></td>
            <td>${sector.growth > 0 ? '+' : ''}${sector.growth}%</td>
            <td>${sector.competition}</td>
        `;
        sectorsTable.appendChild(row);
    });
    
    // Gráfico de radar de adoção tecnológica
    const techRadarCtx = document.getElementById('techRadarChart').getContext('2d');
    new Chart(techRadarCtx, {
        type: 'radar',
        data: mockData.techAdoption,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Adoção de Tecnologias Emergentes por Setor (%)'
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
    
    // Filtro por região
    document.getElementById('regionFilter').addEventListener('change', function() {
        // Simular filtragem de dados por região
        alert(`Filtrando dados por região: ${this.value}`);
        // Em uma implementação real, isso recarregaria os dados com base na região selecionada
    });
}

// Carregar dados da seção Oportunidades Globais
function loadGlobalOpportunities() {
    // Gráfico de investimento em P&D
    const rdCtx = document.getElementById('rdInvestmentChart').getContext('2d');
    new Chart(rdCtx, {
        type: 'bar',
        data: {
            labels: mockData.rdInvestment.map(item => item.country),
            datasets: [{
                label: 'Investimento em P&D (% do PIB)',
                data: mockData.rdInvestment.map(item => item.investment),
                backgroundColor: '#34a853'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Investimento em Pesquisa e Desenvolvimento'
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const item = mockData.rdInvestment[context.dataIndex];
                            return `Patentes: ${item.patents.toLocaleString()}`;
                        }
                    }
                }
            }
        }
    });
    
    // Tabela de nichos
    const nichesTable = document.querySelector('#nichesTable tbody');
    mockData.niches.forEach(niche => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${niche.continent}</td>
            <td>${niche.niche}</td>
            <td>${niche.growth}</td>
            <td>${niche.potential}</td>
        `;
        nichesTable.appendChild(row);
    });
    
    // Filtro por continente
    document.getElementById('continentFilter').addEventListener('change', function() {
        // Simular filtragem de dados por continente
        alert(`Filtrando dados por continente: ${this.value}`);
        // Em uma implementação real, isso recarregaria os dados com base no continente selecionado
    });
}

// Carregar notícias
function loadNews() {
    const newsContainer = document.getElementById('newsContainer');
    
    mockData.news.forEach((newsItem, index) => {
        const sentimentClass = `sentiment-${newsItem.sentiment || 'neutral'}`;
        const sentimentText = newsItem.sentiment === 'positive' ? 'Positivo' : 
                            newsItem.sentiment === 'negative' ? 'Negativo' : 'Neutro';
        
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-header">
                <div>
                    <h3 class="news-title" id="news-title-${index}">${newsItem.title}</h3>
                    <div class="news-source">Fonte: ${newsItem.source} <span class="sentiment-badge ${sentimentClass}">${sentimentText}</span></div>
                </div>
                <button class="translate-btn" data-index="${index}">Traduzir</button>
            </div>
            <div class="news-content" id="news-content-${index}">${newsItem.content}</div>
        `;
        newsContainer.appendChild(newsCard);
    });
    
    // Configurar botões de tradução
    document.querySelectorAll('.translate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const titleElement = document.getElementById(`news-title-${index}`);
            const contentElement = document.getElementById(`news-content-${index}`);
            const newsItem = mockData.news[index];
            
            if (this.textContent === 'Traduzir') {
                titleElement.textContent = newsItem.translatedTitle;
                contentElement.textContent = newsItem.translatedContent;
                this.textContent = 'Ver Original';
            } else {
                titleElement.textContent = newsItem.title;
                contentElement.textContent = newsItem.content;
                this.textContent = 'Traduzir';
            }
        });
    });
}

// Configurar o gerador de ideias
function setupIdeaGenerator() {
    const ideaForm = document.getElementById('ideaForm');
    const resultsContainer = document.getElementById('resultsContainer');
    
    ideaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const skills = document.getElementById('skills').value.toLowerCase();
        const interests = document.getElementById('interests').value.toLowerCase();
        const investment = document.getElementById('investment').value;
        const time = document.getElementById('time').value;
        
        // Filtrar ideias com base nos critérios
        const matchedIdeas = mockData.businessIdeas.filter(idea => {
            const skillsMatch = idea.requiredSkills.some(skill => 
                skills.includes(skill.toLowerCase()));
            const investmentMatch = idea.requiredInvestment === investment;
            const timeMatch = idea.timeCommitment === time;
            
            return skillsMatch && investmentMatch && timeMatch;
        });
        
        // Exibir resultados
        displayResults(matchedIdeas);
    });
    
    function displayResults(ideas) {
        resultsContainer.innerHTML = '';
        
        if (ideas.length === 0) {
            resultsContainer.innerHTML = `
                <div class="idea-card">
                    <h3 class="idea-title">Nenhuma ideia encontrada</h3>
                    <p>Tente ajustar seus critérios para encontrar melhores correspondências.</p>
                </div>
            `;
            return;
        }
        
        ideas.forEach(idea => {
            const ideaCard = document.createElement('div');
            ideaCard.className = 'idea-card';
            ideaCard.innerHTML = `
                <h3 class="idea-title">${idea.title}</h3>
                <p>${idea.description}</p>
                <p><strong>Habilidades necessárias:</strong> ${idea.requiredSkills.join(', ')}</p>
                <p><strong>Investimento inicial:</strong> ${getInvestmentLabel(idea.requiredInvestment)}</p>
                <p><strong>Comprometimento de tempo:</strong> ${getTimeLabel(idea.timeCommitment)}</p>
                <p><strong>Potencial de mercado:</strong> ${idea.potential}</p>
            `;
            resultsContainer.appendChild(ideaCard);
        });
    }
    
    function getInvestmentLabel(investment) {
        const labels = {
            'low': 'Até R$ 5.000',
            'medium': 'De R$ 5.000 a R$ 20.000',
            'high': 'Acima de R$ 20.000'
        };
        return labels[investment] || investment;
    }
    
    function getTimeLabel(time) {
        const labels = {
            'part-time': 'Meio período',
            'full-time': 'Tempo integral'
        };
        return labels[time] || time;
    }
}

// Configurar interações com mapas
function setupMapInteractions() {
    const brazilMap = document.getElementById('brazilMap');
    const mapTooltip = document.getElementById('mapTooltip');
    const worldMap = document.getElementById('worldMap');
    const worldMapTooltip = document.getElementById('worldMapTooltip');
    
    // Interações com o mapa do Brasil
    if (brazilMap) {
        const stateAreas = brazilMap.querySelectorAll('.state-area');
        
        stateAreas.forEach(area => {
            area.addEventListener('mouseover', function(e) {
                const state = this.getAttribute('data-state');
                const population = this.getAttribute('data-population');
                const gdp = this.getAttribute('data-gdp');
                
                mapTooltip.innerHTML = `
                    <strong>${state}</strong><br>
                    População: ${population} milhões<br>
                    PIB: R$ ${gdp} trilhões
                `;
                
                mapTooltip.style.opacity = '1';
                mapTooltip.style.left = `${e.pageX + 10}px`;
                mapTooltip.style.top = `${e.pageY + 10}px`;
            });
            
            area.addEventListener('mousemove', function(e) {
                mapTooltip.style.left = `${e.pageX + 10}px`;
                mapTooltip.style.top = `${e.pageY + 10}px`;
            });
            
            area.addEventListener('mouseout', function() {
                mapTooltip.style.opacity = '0';
            });
        });
    }
    
    // Interações com o mapa mundial
    if (worldMap) {
        const countryAreas = worldMap.querySelectorAll('.country-area');
        
        countryAreas.forEach(area => {
            area.addEventListener('mouseover', function(e) {
                const country = this.getAttribute('data-country');
                const sector = this.getAttribute('data-sector');
                const potential = this.getAttribute('data-potential');
                
                worldMapTooltip.innerHTML = `
                    <strong>${country}</strong><br>
                    Setor: ${sector}<br>
                    Potencial: ${potential}
                `;
                
                worldMapTooltip.style.opacity = '1';
                worldMapTooltip.style.left = `${e.pageX + 10}px`;
                worldMapTooltip.style.top = `${e.pageY + 10}px`;
            });
            
            area.addEventListener('mousemove', function(e) {
                worldMapTooltip.style.left = `${e.pageX + 10}px`;
                worldMapTooltip.style.top = `${e.pageY + 10}px`;
            });
            
            area.addEventListener('mouseout', function() {
                worldMapTooltip.style.opacity = '0';
            });
        });
    }
}

// Configurar o simulador de cenários
function setupScenarioSimulator() {
    const runScenarioBtn = document.getElementById('runScenario');
    if (runScenarioBtn) {
        runScenarioBtn.addEventListener('click', function() {
            const investment = parseFloat(document.getElementById('investmentAmount').value);
            const growthRate = parseFloat(document.getElementById('growthRate').value) / 100;
            const years = parseInt(document.getElementById('timePeriod').value);
            const sector = document.getElementById('sectorSelect').value;
            
            // Calcular projeção
            let result = investment;
            let yearlyResults = [];
            
            for (let i = 1; i <= years; i++) {
                result = result * (1 + growthRate);
                yearlyResults.push({
                    year: i,
                    value: result
                });
            }
            
            // Exibir resultados
            const resultElement = document.getElementById('scenarioResult');
            resultElement.innerHTML = `
                <h3>Projeção para ${years} anos no setor ${sector}</h3>
                <p>Investimento inicial: R$ ${investment.toLocaleString('pt-BR')}</p>
                <p>Valor projetado: R$ ${result.toLocaleString('pt-BR')}</p>
                <p>Retorno total: ${((result - investment) / investment * 100).toFixed(2)}%</p>
                
                <h4>Evolução Anual</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Ano</th>
                            <th>Valor (R$)</th>
                            <th>Crescimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${yearlyResults.map((yr, index) => `
                            <tr>
                                <td>${yr.year}</td>
                                <td>R$ ${yr.value.toLocaleString('pt-BR')}</td>
                                <td>${index === 0 ? '-' : ((yr.value - yearlyResults[index-1].value) / yearlyResults[index-1].value * 100).toFixed(2)}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        });
    }
}

// Carregar heatmap de oportunidades
function loadHeatmapData() {
    const heatmapContainer = document.getElementById('opportunityHeatmap');
    if (heatmapContainer) {
        const opportunities = [
            { sector: 'Inteligência Artificial', potential: 'high', trend: 'crescimento' },
            { sector: 'FinTech', potential: 'high', trend: 'crescimento' },
            { sector: 'Energias Renováveis', potential: 'medium', trend: 'crescimento' },
            { sector: 'HealthTech', potential: 'medium', trend: 'crescimento' },
            { sector: 'E-commerce', potential: 'medium', trend: 'estabilidade' },
            { sector: 'EdTech', potential: 'low', trend: 'crescimento' }
        ];
        
        opportunities.forEach(opp => {
            const item = document.createElement('div');
            item.className = `heatmap-item heatmap-${opp.potential}`;
            item.innerHTML = `
                <h3>${opp.sector}</h3>
                <p>Potencial: ${opp.potential === 'high' ? 'Alto' : opp.potential === 'medium' ? 'Médio' : 'Baixo'}</p>
                <p>Tendência: ${opp.trend}</p>
            `;
            heatmapContainer.appendChild(item);
        });
    }
}

// Configurar ferramentas de comparação
function setupComparisonTools() {
    const compareCountriesBtn = document.getElementById('compareCountries');
    const comparisonModal = document.getElementById('comparisonModal');
    
    if (compareCountriesBtn && comparisonModal) {
        compareCountriesBtn.addEventListener('click', function() {
            // Exibir modal de comparação
            comparisonModal.classList.add('active');
            
            // Popular dados de comparação
            const comparisonResults = document.getElementById('comparisonResults');
            comparisonResults.innerHTML = '';
            
            // Selecionar alguns países para comparação
            const countriesToCompare = mockData.countries.slice(0, 3);
            const averageGdp = mockData.countries.reduce((sum, country) => sum + country.gdpPerCapita, 0) / mockData.countries.length;
            const averageHdi = mockData.countries.reduce((sum, country) => sum + country.hdi, 0) / mockData.countries.length;
            const averageTechInvestment = mockData.countries.reduce((sum, country) => sum + country.techInvestment, 0) / mockData.countries.length;
            
            countriesToCompare.forEach(country => {
                const comparisonCard = document.createElement('div');
                comparisonCard.className = 'comparison-card';
                
                const gdpDiff = ((country.gdpPerCapita - averageGdp) / averageGdp * 100).toFixed(1);
                const hdiDiff = ((country.hdi - averageHdi) / averageHdi * 100).toFixed(1);
                const techDiff = ((country.techInvestment - averageTechInvestment) / averageTechInvestment * 100).toFixed(1);
                
                comparisonCard.innerHTML = `
                    <h3>${country.name}</h3>
                    <div class="comparison-value">$${country.gdpPerCapita.toLocaleString()}</div>
                    <div class="comparison-diff ${gdpDiff >= 0 ? 'diff-positive' : 'diff-negative'}">
                        ${gdpDiff >= 0 ? '+' : ''}${gdpDiff}% vs. média
                    </div>
                    <div class="comparison-value">${country.hdi}</div>
                    <div class="comparison-diff ${hdiDiff >= 0 ? 'diff-positive' : 'diff-negative'}">
                        ${hdiDiff >= 0 ? '+' : ''}${hdiDiff}% vs. média
                    </div>
                    <div class="comparison-value">${country.techInvestment}%</div>
                    <div class="comparison-diff ${techDiff >= 0 ? 'diff-positive' : 'diff-negative'}">
                        ${techDiff >= 0 ? '+' : ''}${techDiff}% vs. média
                    </div>
                `;
                
                comparisonResults.appendChild(comparisonCard);
            });
        });
    }
}