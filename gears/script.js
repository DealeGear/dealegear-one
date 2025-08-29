// Elementos do DOM
const initialPage = document.getElementById('initialPage');
const landingPage = document.getElementById('landingPage');
const loadBtn = document.getElementById('loadBtn');
const backBtn = document.getElementById('backBtn');
const categoryOptions = document.querySelectorAll('.category-options .option-card');
const templateOptions = document.getElementById('templateOptions');
const templateInfo = document.getElementById('templateInfo');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Event Listeners
categoryOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove a classe selected de todas as opções
        categoryOptions.forEach(opt => opt.classList.remove('selected'));
        // Adiciona a classe selected à opção clicada
        option.classList.add('selected');
        // Salva a categoria selecionada
        appData.selectedCategory = option.dataset.category;
        // Carrega os projetos da categoria selecionada
        loadProjects(appData.selectedCategory);
        // Reseta a seleção de projeto
        appData.selectedProject = null;
        // Verifica se ambos categoria e projeto estão selecionados
        checkSelection();
    });
});

loadBtn.addEventListener('click', () => {
    if (appData.selectedCategory && appData.selectedProject) {
        generateLandingPage();
    }
});

backBtn.addEventListener('click', () => {
    // Volta para a página inicial
    landingPage.style.display = 'none';
    initialPage.style.display = 'block';
    
    // Reseta as seleções
    categoryOptions.forEach(opt => opt.classList.remove('selected'));
    appData.selectedCategory = null;
    appData.selectedProject = null;
    loadBtn.disabled = true;
    
    // Limpa a área de projetos
    templateOptions.innerHTML = '';
    templateInfo.innerHTML = '<p>Selecione uma categoria acima para ver os projetos disponíveis</p>';
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove a classe active de todos os botões e conteúdos
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Adiciona a classe active ao botão clicado
        btn.classList.add('active');
        
        // Mostra o conteúdo correspondente
        const tabId = btn.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Funções
function loadProjects(category) {
    // Limpa a área de projetos
    templateOptions.innerHTML = '';
    
    // Atualiza a informação da categoria
    const categoryNames = {
        startup: "Startup",
        produto: "Produto Digital",
        servico: "Serviço",
        social: "Projeto Social",
        ecommerce: "E-commerce",
        educacao: "Educação"
    };
    
    templateInfo.innerHTML = `<p>Projetos disponíveis para a categoria <strong>${categoryNames[category]}</strong>:</p>`;
    
    // Carrega os projetos da categoria
    const projects = appData.projects[category];
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'option-card';
        projectCard.dataset.project = project.id;
        
        projectCard.innerHTML = `
            <i class="fas fa-project-diagram" style="color: ${project.color}"></i>
            <h4>${project.title}</h4>
            <p>${project.description}</p>
        `;
        
        projectCard.addEventListener('click', () => {
            // Remove a classe selected de todos os projetos
            document.querySelectorAll('.template-options .option-card').forEach(opt => opt.classList.remove('selected'));
            // Adiciona a classe selected ao projeto clicado
            projectCard.classList.add('selected');
            // Salva o projeto selecionado
            appData.selectedProject = project.id;
            // Verifica se ambos categoria e projeto estão selecionados
            checkSelection();
        });
        
        templateOptions.appendChild(projectCard);
    });
}

function checkSelection() {
    if (appData.selectedCategory && appData.selectedProject) {
        loadBtn.disabled = false;
    } else {
        loadBtn.disabled = true;
    }
}

function generateLandingPage() {
    // Obtém os dados da categoria e projeto selecionados
    const categoryData = appData.categories[appData.selectedCategory];
    const projectData = appData.projects[appData.selectedCategory].find(p => p.id === appData.selectedProject);
    
    // Atualiza o cabeçalho do projeto
    document.getElementById('projectCategory').textContent = categoryData.title;
    document.getElementById('projectTitle').textContent = projectData.title;
    document.getElementById('projectDescription').textContent = projectData.description;
    
    // Atualiza os dados da aba de Objetivos
    document.getElementById('purposeText').textContent = categoryData.purpose;
    document.getElementById('visionText').textContent = categoryData.vision;
    document.getElementById('missionText').textContent = categoryData.mission;
    
    // Atualiza os dados da aba de Planejamento Inicial
    document.getElementById('valueProposition').textContent = categoryData.valueProposition;
    document.getElementById('hypothesis1').textContent = categoryData.hypothesis1;
    document.getElementById('hypothesis2').textContent = categoryData.hypothesis2;
    document.getElementById('hypothesis3').textContent = categoryData.hypothesis3;
    
    // Atualiza os dados da aba de Recursos (dependendo da categoria)
    updateResourcesTab(appData.selectedCategory);
    
    // Atualiza os dados da aba de Estratégia de Execução (dependendo da categoria)
    updateStrategyTab(appData.selectedCategory);
    
    // Atualiza os dados da aba de Mensuração (dependendo da categoria)
    updateMetricsTab(appData.selectedCategory);
    
    // Aplica a cor do projeto
    applyProjectStyle(projectData);
    
    // Esconde a página inicial e mostra a landing page
    initialPage.style.display = 'none';
    landingPage.style.display = 'block';
}

function updateResourcesTab(category) {
    // Atualiza as funcionalidades do MVP dependendo da categoria
    if (category === 'startup') {
        document.getElementById('mvpFeature1').textContent = 'Painel de controle básico';
        document.getElementById('mvpFeature2').textContent = 'Integração com APIs essenciais';
        document.getElementById('mvpFeature3').textContent = 'Sistema de autenticação de usuários';
    } else if (category === 'produto') {
        document.getElementById('mvpFeature1').textContent = 'Interface principal do produto';
        document.getElementById('mvpFeature2').textContent = 'Funcionalidades essenciais do núcleo';
        document.getElementById('mvpFeature3').textContent = 'Sistema de feedback do usuário';
    } else if (category === 'servico') {
        document.getElementById('mvpFeature1').textContent = 'Formulário de solicitação de serviço';
        document.getElementById('mvpFeature2').textContent = 'Painel de acompanhamento de pedidos';
        document.getElementById('mvpFeature3').textContent = 'Sistema de avaliação de serviço';
    } else if (category === 'social') {
        document.getElementById('mvpFeature1').textContent = 'Plataforma de registro de beneficiários';
        document.getElementById('mvpFeature2').textContent = 'Sistema de acompanhamento de impactos';
        document.getElementById('mvpFeature3').textContent = 'Ferramenta de comunicação com stakeholders';
    } else if (category === 'ecommerce') {
        document.getElementById('mvpFeature1').textContent = 'Catálogo de produtos com busca e filtros';
        document.getElementById('mvpFeature2').textContent = 'Carrinho de compras e checkout simplificado';
        document.getElementById('mvpFeature3').textContent = 'Sistema de pagamento e acompanhamento de pedidos';
    } else if (category === 'educacao') {
        document.getElementById('mvpFeature1').textContent = 'Plataforma de acesso a cursos e módulos';
        document.getElementById('mvpFeature2').textContent = 'Sistema de progresso e avaliação de aprendizado';
        document.getElementById('mvpFeature3').textContent = 'Ferramentas de interação entre alunos e instrutores';
    }
}

function updateStrategyTab(category) {
    // Atualiza as estratégias dependendo da categoria
    if (category === 'startup') {
        document.getElementById('marketing1').textContent = 'Marketing de conteúdo: criação de whitepapers e estudos de caso';
        document.getElementById('marketing2').textContent = 'Redes sociais: foco em LinkedIn e Twitter para alcance B2B';
        document.getElementById('marketing3').textContent = 'SEO: otimização para termos técnicos do segmento';
        document.getElementById('marketing4').textContent = 'Email marketing: nutrição de leads com conteúdo especializado';
        
        document.getElementById('partnership1').textContent = 'Aceleradoras e incubadoras de empresas';
        document.getElementById('partnership2').textContent = 'Investidores anjos e venture capitalists';
        document.getElementById('partnership3').textContent = 'Empresas de tecnologia complementar';
    } else if (category === 'produto') {
        document.getElementById('marketing1').textContent = 'Marketing de conteúdo: tutoriais e dicas de uso do produto';
        document.getElementById('marketing2').textContent = 'Redes sociais: Instagram e YouTube para demonstrações visuais';
        document.getElementById('marketing3').textContent = 'SEO: otimização para problemas que o produto resolve';
        document.getElementById('marketing4').textContent = 'Email marketing: atualizações de funcionalidades e dicas';
        
        document.getElementById('partnership1').textContent = 'Influenciadores digitais do nicho';
        document.getElementById('partnership2').textContent = 'Plataformas de distribuição de software';
        document.getElementById('partnership3').textContent = 'Comunidades online relacionadas ao produto';
    } else if (category === 'servico') {
        document.getElementById('marketing1').textContent = 'Marketing de conteúdo: cases de sucesso e depoimentos';
        document.getElementById('marketing2').textContent = 'Redes sociais: LinkedIn para alcance profissional';
        document.getElementById('marketing3').textContent = 'SEO: otimização para serviços específicos do segmento';
        document.getElementById('marketing4').textContent = 'Email marketing: newsletter com insights do mercado';
        
        document.getElementById('partnership1').textContent = 'Associações comerciais e industriais';
        document.getElementById('partnership2').textContent = 'Empresas de consultoria complementar';
        document.getElementById('partnership3').textContent = 'Eventos e feiras do setor';
    } else if (category === 'social') {
        document.getElementById('marketing1').textContent = 'Marketing de conteúdo: histórias de impacto e depoimentos';
        document.getElementById('marketing2').textContent = 'Redes sociais: Facebook e Instagram para engajamento comunitário';
        document.getElementById('marketing3').textContent = 'SEO: otimização para causas sociais relacionadas';
        document.getElementById('marketing4').textContent = 'Email marketing: atualizações sobre o impacto gerado';
        
        document.getElementById('partnership1').textContent = 'ONGs e organizações da sociedade civil';
        document.getElementById('partnership2').textContent = 'Empresas com programas de responsabilidade social';
        document.getElementById('partnership3').textContent = 'Governo e instituições públicas';
    } else if (category === 'ecommerce') {
        document.getElementById('marketing1').textContent = 'Marketing de conteúdo: guias de compra e reviews de produtos';
        document.getElementById('marketing2').textContent = 'Redes sociais: Instagram e Pinterest para inspiração de compras';
        document.getElementById('marketing3').textContent = 'SEO: otimização para produtos e categorias específicas';
        document.getElementById('marketing4').textContent = 'Email marketing: promoções sazonais e recomendações personalizadas';
        
        document.getElementById('partnership1').textContent = 'Influenciadores e afiliados do segmento';
        document.getElementById('partnership2').textContent = 'Marketplaces e plataformas de venda';
        document.getElementById('partnership3').textContent = 'Fornecedores e marcas exclusivas';
    } else if (category === 'educacao') {
        document.getElementById('marketing1').textContent = 'Marketing de conteúdo: webinars e materiais educativos gratuitos';
        document.getElementById('marketing2').textContent = 'Redes sociais: LinkedIn e YouTube para compartilhamento de conhecimento';
        document.getElementById('marketing3').textContent = 'SEO: otimização para termos educacionais e de aprendizado';
        document.getElementById('marketing4').textContent = 'Email marketing: dicas de aprendizado e novidades da plataforma';
        
        document.getElementById('partnership1').textContent = 'Instituições de ensino e universidades';
        document.getElementById('partnership2').textContent = 'Empresas para programas de treinamento corporativo';
        document.getElementById('partnership3').textContent = 'Especialistas e instrutores renomados';
    }
}

function updateMetricsTab(category) {
    // Atualiza as métricas dependendo da categoria
    if (category === 'startup') {
        document.getElementById('leanMetric1').textContent = 'Taxa de conversão de leads para clientes pagantes';
        document.getElementById('leanMetric2').textContent = 'Percentual de crescimento mensal da receita';
        document.getElementById('leanMetric3').textContent = 'Taxa de retenção de clientes após 90 dias';
        document.getElementById('leanMetric4').textContent = 'NPS (Net Promoter Score) de satisfação do cliente';
        
        document.getElementById('feedback1').textContent = 'Coleta: pesquisas pós-venda, análise de churn, entrevistas com clientes';
        document.getElementById('feedback2').textContent = 'Análise: identificação de padrões de cancelamento, oportunidades de upsell';
        document.getElementById('feedback3').textContent = 'Ação: melhorias no produto, ajustes no modelo de precificação, novos recursos';
        document.getElementById('feedback4').textContent = 'Validação: medição do impacto nas taxas de retenção e LTV';
    } else if (category === 'produto') {
        document.getElementById('leanMetric1').textContent = 'Taxa de conversão de visitantes para usuários registrados';
        document.getElementById('leanMetric2').textContent = 'Percentual de usuários ativos diários/semanais';
        document.getElementById('leanMetric3').textContent = 'Taxa de retenção de usuários após 30 dias';
        document.getElementById('leanMetric4').textContent = 'NPS (Net Promoter Score) de satisfação do usuário';
        
        document.getElementById('feedback1').textContent = 'Coleta: pesquisas de usabilidade, análises de comportamento, avaliações na loja';
        document.getElementById('feedback2').textContent = 'Análise: identificação de gargalos de uso, recursos mais populares';
        document.getElementById('feedback3').textContent = 'Ação: melhorias na interface, otimização de fluxos, novos recursos';
        document.getElementById('feedback4').textContent = 'Validação: medição do impacto no engajamento e retenção';
    } else if (category === 'servico') {
        document.getElementById('leanMetric1').textContent = 'Taxa de conversão de prospects para clientes';
        document.getElementById('leanMetric2').textContent = 'Percentual de clientes que utilizam o serviço mensalmente';
        document.getElementById('leanMetric3').textContent = 'Taxa de retenção de clientes após o primeiro serviço';
        document.getElementById('leanMetric4').textContent = 'NPS (Net Promoter Score) de satisfação com o serviço';
        
        document.getElementById('feedback1').textContent = 'Coleta: pesquisas pós-serviço, avaliações online, entrevistas com clientes';
        document.getElementById('feedback2').textContent = 'Análise: identificação de pontos de dor, oportunidades de melhoria';
        document.getElementById('feedback3').textContent = 'Ação: treinamento de equipe, ajuste de processos, novos serviços';
        document.getElementById('feedback4').textContent = 'Validação: medição do impacto na satisfação e fidelização';
    } else if (category === 'social') {
        document.getElementById('leanMetric1').textContent = 'Taxa de conversão de visitantes para voluntários/doadores';
        document.getElementById('leanMetric2').textContent = 'Percentual de beneficiários ativos no programa';
        document.getElementById('leanMetric3').textContent = 'Taxa de continuidade dos beneficiários após 6 meses';
        document.getElementById('leanMetric4').textContent = 'Índice de satisfação dos beneficiários e stakeholders';
        
        document.getElementById('feedback1').textContent = 'Coleta: pesquisas com beneficiários, reuniões com comunidades, relatórios de impacto';
        document.getElementById('feedback2').textContent = 'Análise: identificação de necessidades não atendidas, eficácia das intervenções';
        document.getElementById('feedback3').textContent = 'Ação: ajuste de programas, novas iniciativas, parcerias estratégicas';
        document.getElementById('feedback4').textContent = 'Validação: medição do impacto nos indicadores de desenvolvimento social';
    } else if (category === 'ecommerce') {
        document.getElementById('leanMetric1').textContent = 'Taxa de conversão de visitantes para compradores';
        document.getElementById('leanMetric2').textContent = 'Valor médio do pedido (AOV)';
        document.getElementById('leanMetric3').textContent = 'Taxa de abandono de carrinho';
        document.getElementById('leanMetric4').textContent = 'Taxa de retenção de clientes';
        
        document.getElementById('feedback1').textContent = 'Coleta: pesquisas pós-compra, análises de comportamento de navegação';
        document.getElementById('feedback2').textContent = 'Análise: identificação de gargalos no processo de compra, produtos mais populares';
        document.getElementById('feedback3').textContent = 'Ação: otimização da experiência de compra, personalização de recomendações';
        document.getElementById('feedback4').textContent = 'Validação: medição do impacto nas taxas de conversão e ticket médio';
    } else if (category === 'educacao') {
        document.getElementById('leanMetric1').textContent = 'Taxa de conclusão de cursos';
        document.getElementById('leanMetric2').textContent = 'Tempo médio de aprendizado';
        document.getElementById('leanMetric3').textContent = 'Taxa de engajamento dos alunos';
        document.getElementById('leanMetric4').textContent = 'NPS (Net Promoter Score) de satisfação dos alunos';
        
        document.getElementById('feedback1').textContent = 'Coleta: pesquisas de satisfação, análises de desempenho, fóruns de discussão';
        document.getElementById('feedback2').textContent = 'Análise: identificação de pontos de dificuldade, padrões de aprendizado';
        document.getElementById('feedback3').textContent = 'Ação: ajuste de metodologias, personalização de trilhas, novos recursos';
        document.getElementById('feedback4').textContent = 'Validação: medição do impacto na taxa de conclusão e retenção de conhecimento';
    }
}

function applyProjectStyle(project) {
    // Aplica a cor principal do projeto
    document.documentElement.style.setProperty('--primary-color', project.color);
    
    // Atualiza as características do MVP dependendo do projeto
    const projectName = project.title;
    document.getElementById('mvpFeatures').textContent = `Funcionalidades incluídas no MVP para ${projectName}:`;
}

// Simulação do upload de diagrama
document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            const diagramArea = document.querySelector('.diagram-area');
            diagramArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 48px; margin-bottom: 15px;"></i>
                <p>Diagrama carregado com sucesso!</p>
                <p style="font-size: 14px; color: #7f8c8d;">diagrama_projeto_${appData.selectedCategory}_${Date.now()}.png</p>
                <button class="upload-btn" style="margin-top: 10px;">Substituir Diagrama</button>
            `;
            
            // Adiciona o evento de clique novamente ao novo botão
            const newUploadBtn = diagramArea.querySelector('.upload-btn');
            newUploadBtn.addEventListener('click', function() {
                diagramArea.innerHTML = `
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Nenhum diagrama carregado ainda</p>
                    <button class="upload-btn">Fazer Upload de Diagrama</button>
                `;
                
                // Adiciona o evento de clique novamente ao novo botão
                const resetUploadBtn = diagramArea.querySelector('.upload-btn');
                resetUploadBtn.addEventListener('click', arguments.callee);
            });
        });
    }
}); 