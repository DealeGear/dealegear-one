// Dados fictícios do jogo
const gameData = {
    // Configurações do jogo
    settings: {
        darkMode: false,
        language: 'pt',
        notifications: true,
        autosave: true
    },
    
    // Dados do jogador
    player: {
        name: 'Jogador',
        role: null,
        level: 1,
        xp: 300,
        maxXp: 1000,
        stats: {
            money: 2500,
            reputation: 45,
            popularity: 30,
            politicalInfluence: 15,
            technicalKnowledge: 25
        }
    },
    
    // Dados da cidade
    city: {
        population: 125430,
        districts: 4,
        day: 42,
        gears: {
            economy: 75,
            ecology: 60,
            politics: 50,
            wellness: 65
        }
    },
    
    // Papéis disponíveis
    roles: {
        employee: {
            name: 'Empregado',
            icon: 'fa-briefcase',
            description: 'Trabalhe para melhorar sua vida financeira e influenciar a economia local.',
            objectives: [
                { id: 1, title: 'Conseguir um emprego estável', description: 'Encontre um emprego com salário digno', progress: 0, maxProgress: 100 },
                { id: 2, title: 'Economizar dinheiro para investimentos', description: 'Economize R$ 5.000 para investir', progress: 2500, maxProgress: 5000 }
            ]
        },
        'public-worker': {
            name: 'Funcionário Público',
            icon: 'fa-landmark',
            description: 'Trabalhe para o governo e ajude a implementar políticas públicas.',
            objectives: [
                { id: 3, title: 'Implementar um projeto comunitário', description: 'Crie um projeto que beneficie a comunidade', progress: 0, maxProgress: 100 },
                { id: 4, title: 'Melhorar a eficiência do serviço público', description: 'Aumente a eficiência em 20%', progress: 5, maxProgress: 20 }
            ]
        },
        entrepreneur: {
            name: 'Empresário',
            icon: 'fa-chart-line',
            description: 'Crie e gerencie negócios, influenciando a economia da cidade.',
            objectives: [
                { id: 5, title: 'Abrir seu primeiro negócio', description: 'Abra um negócio próprio', progress: 0, maxProgress: 100 },
                { id: 6, title: 'Contratar seus primeiros funcionários', description: 'Contrate pelo menos 3 funcionários', progress: 0, maxProgress: 3 }
            ]
        },
        mayor: {
            name: 'Prefeito',
            icon: 'fa-city',
            description: 'Administre a cidade, tomando decisões que afetam todos os cidadãos.',
            objectives: [
                { id: 7, title: 'Balançar o orçamento da cidade', description: 'Alcance um orçamento equilibrado', progress: 30, maxProgress: 100 },
                { id: 8, title: 'Implementar uma política pública popular', description: 'Crie uma política com 70% de aprovação', progress: 0, maxProgress: 70 }
            ]
        }
    },
    
    // Decisões disponíveis
    decisions: [
        {
            id: 1,
            title: 'Crise no Transporte Público',
            description: 'O sistema de transporte público está enfrentando uma grave crise com falta de investimento. Como você lidaria com isso?',
            role: 'mayor',
            impacts: {
                economy: -10,
                ecology: 5,
                politics: 15,
                wellness: 10
            },
            choices: [
                { 
                    text: 'Aumentar impostos para investir no transporte', 
                    type: 'positive',
                    impacts: { economy: -5, politics: -10, wellness: 15 }
                },
                { 
                    text: 'Privatizar o serviço de transporte', 
                    type: 'negative',
                    impacts: { economy: 10, politics: -15, wellness: -5 }
                },
                { 
                    text: 'Buscar parcerias público-privadas', 
                    type: 'neutral',
                    impacts: { economy: 5, politics: 5, wellness: 5 }
                }
            ]
        },
        {
            id: 2,
            title: 'Oportunidade de Negócio',
            description: 'Uma grande empresa está interessada em se instalar na cidade, mas exigirá isenção fiscal por 5 anos.',
            role: 'entrepreneur',
            impacts: {
                economy: 20,
                ecology: -10,
                politics: -5,
                wellness: 5
            },
            choices: [
                { 
                    text: 'Apoiar a instalação da empresa', 
                    type: 'positive',
                    impacts: { economy: 15, politics: -5, wellness: 10 }
                },
                { 
                    text: 'Propor uma contraproposta com menos benefícios', 
                    type: 'neutral',
                    impacts: { economy: 5, politics: 5, wellness: 5 }
                },
                { 
                    text: 'Organizar protestos contra a isenção fiscal', 
                    type: 'negative',
                    impacts: { economy: -10, politics: 15, wellness: -5 }
                }
            ]
        },
        {
            id: 3,
            title: 'Greve dos Professores',
            description: 'Os professores da rede pública entraram em greve exigindo melhores salários e condições de trabalho.',
            role: 'public-worker',
            impacts: {
                economy: -15,
                ecology: 0,
                politics: -20,
                wellness: -10
            },
            choices: [
                { 
                    text: 'Apoiar a greve e participar das manifestações', 
                    type: 'positive',
                    impacts: { economy: -5, politics: -10, wellness: 5 }
                },
                { 
                    text: 'Mediar a negociação entre governo e professores', 
                    type: 'neutral',
                    impacts: { economy: 0, politics: 15, wellness: 10 }
                },
                { 
                    text: 'Cruzar o piquete e continuar trabalhando', 
                    type: 'negative',
                    impacts: { economy: 5, politics: -15, wellness: -15 }
                }
            ]
        },
        {
            id: 4,
            title: 'Promoção no Trabalho',
            description: 'Uma oportunidade de promoção surgiu na sua empresa, mas exigirá mais horas de trabalho e responsabilidade.',
            role: 'employee',
            impacts: {
                economy: 15,
                ecology: 0,
                politics: 0,
                wellness: -10
            },
            choices: [
                { 
                    text: 'Aceitar a promoção imediatamente', 
                    type: 'positive',
                    impacts: { economy: 20, wellness: -15 }
                },
                { 
                    text: 'Negociar melhores condições antes de aceitar', 
                    type: 'neutral',
                    impacts: { economy: 10, wellness: -5 }
                },
                { 
                    text: 'Recusar a promoção para manter qualidade de vida', 
                    type: 'negative',
                    impacts: { economy: 0, wellness: 10 }
                }
            ]
        }
    ],
    
    // Histórico de decisões
    history: [],
    
    // Eventos aleatórios
    randomEvents: [
        {
            id: 1,
            title: 'Festival de Cultura',
            description: 'A cidade está organizando um festival de cultura para celebrar a diversidade local.',
            type: 'positive',
            impacts: { wellness: 10, economy: 5 }
        },
        {
            id: 2,
            title: 'Chuvas Fortes',
            description: 'Chuvas fortes causaram enchentes em vários bairros da cidade.',
            type: 'negative',
            impacts: { wellness: -15, economy: -10 }
        },
        {
            id: 3,
            title: 'Descoberta de Recursos Naturais',
            description: 'Foram encontrados recursos naturais valiosos na região.',
            type: 'positive',
            impacts: { economy: 20, ecology: -10 }
        },
        {
            id: 4,
            title: 'Protesto Ambiental',
            description: 'Grupos ambientalistas estão protestando contra a poluição industrial.',
            type: 'neutral',
            impacts: { ecology: 5, politics: -10 }
        }
    ],
    
    // Textos para internacionalização
    translations: {
        pt: {
            // Tela Inicial
            appTitle: 'GearCity',
            appDescription: 'Simulação Social, Econômica e Política',
            startGame: 'Iniciar Jogo',
            loadGame: 'Carregar Partida',
            
            // Seleção de Papel
            chooseRole: 'Escolha seu Papel',
            initialObjectives: 'Objetivos iniciais:',
            
            // Tela da Cidade
            myCity: 'Minha Cidade',
            economy: 'Economia',
            ecology: 'Ecologia',
            politics: 'Política',
            wellness: 'Bem-Estar',
            population: 'População',
            districts: 'Distritos',
            day: 'Dia',
            
            // Tela de Decisões
            decisions: 'Decisões',
            
            // Tela de Perfil
            myProfile: 'Meu Perfil',
            level: 'Nível',
            money: 'Dinheiro',
            reputation: 'Reputação',
            popularity: 'Popularidade',
            politicalInfluence: 'Influência Política',
            technicalKnowledge: 'Conhecimento Técnico',
            currentObjectives: 'Objetivos Atuais',
            
            // Tela de Histórico
            history: 'Histórico de Decisões',
            
            // Tela de Configurações
            settings: 'Configurações',
            darkMode: 'Modo Escuro',
            darkModeDesc: 'Alterna entre o tema claro e escuro',
            language: 'Idioma',
            languageDesc: 'Escolha o idioma do jogo',
            notifications: 'Notificações',
            notificationsDesc: 'Receber notificações de eventos',
            autosave: 'Salvar Jogo Automaticamente',
            autosaveDesc: 'O jogo será salvo automaticamente',
            saveSettings: 'Salvar Configurações',
            resetGame: 'Reiniciar Jogo',
            
            // Menu
            city: 'Cidade',
            decisionsMenu: 'Decisões',
            profile: 'Perfil',
            historyMenu: 'Histórico',
            config: 'Config.'
        },
        en: {
            // Tela Inicial
            appTitle: 'GearCity',
            appDescription: 'Social, Economic and Political Simulation',
            startGame: 'Start Game',
            loadGame: 'Load Game',
            
            // Seleção de Papel
            chooseRole: 'Choose Your Role',
            initialObjectives: 'Initial objectives:',
            
            // Tela da Cidade
            myCity: 'My City',
            economy: 'Economy',
            ecology: 'Ecology',
            politics: 'Politics',
            wellness: 'Wellness',
            population: 'Population',
            districts: 'Districts',
            day: 'Day',
            
            // Tela de Decisões
            decisions: 'Decisions',
            
            // Tela de Perfil
            myProfile: 'My Profile',
            level: 'Level',
            money: 'Money',
            reputation: 'Reputation',
            popularity: 'Popularity',
            politicalInfluence: 'Political Influence',
            technicalKnowledge: 'Technical Knowledge',
            currentObjectives: 'Current Objectives',
            
            // Tela de Histórico
            history: 'Decision History',
            
            // Tela de Configurações
            settings: 'Settings',
            darkMode: 'Dark Mode',
            darkModeDesc: 'Toggle between light and dark theme',
            language: 'Language',
            languageDesc: 'Choose the game language',
            notifications: 'Notifications',
            notificationsDesc: 'Receive event notifications',
            autosave: 'Auto Save Game',
            autosaveDesc: 'The game will be saved automatically',
            saveSettings: 'Save Settings',
            resetGame: 'Reset Game',
            
            // Menu
            city: 'City',
            decisionsMenu: 'Decisions',
            profile: 'Profile',
            historyMenu: 'History',
            config: 'Settings'
        }
    }
};

// Estado da aplicação
const appState = {
    currentScreen: 'home-screen',
    currentLanguage: 'pt',
    gameStarted: false,
    selectedRole: null
};

// Funções de utilidade
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// Função para alternar entre telas
function showScreen(screenId) {
    // Esconde todas as telas
    $$('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostra a tela selecionada
    $(`#${screenId}`).classList.add('active');
    
    // Atualiza o estado da aplicação
    appState.currentScreen = screenId;
    
    // Atualiza o menu de navegação
    updateNavigation(screenId);
    
    // Carrega os dados específicos da tela
    loadScreenData(screenId);
}

// Função para atualizar a navegação
function updateNavigation(screenId) {
    // Remove a classe active de todos os botões de navegação
    $$('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adiciona a classe active ao botão correspondente à tela atual
    const navBtn = $(`.nav-btn[data-screen="${screenId}"]`);
    if (navBtn) {
        navBtn.classList.add('active');
    }
}

// Função para carregar dados específicos de cada tela
function loadScreenData(screenId) {
    switch (screenId) {
        case 'city-screen':
            loadCityScreen();
            break;
        case 'decisions-screen':
            loadDecisionsScreen();
            break;
        case 'profile-screen':
            loadProfileScreen();
            break;
        case 'history-screen':
            loadHistoryScreen();
            break;
        case 'settings-screen':
            loadSettingsScreen();
            break;
    }
}

// Função para carregar a tela da cidade
function loadCityScreen() {
    // Atualiza as engrenagens
    updateGears();
    
    // Atualiza as estatísticas da cidade
    updateCityStats();
}

// Função para atualizar as engrenagens
function updateGears() {
    const gears = gameData.city.gears;
    
    // Atualiza os valores das engrenagens
    Object.keys(gears).forEach(gearType => {
        const gearElement = $(`.gear.${gearType} .gear-value`);
        if (gearElement) {
            gearElement.textContent = `${gears[gearType]}%`;
        }
    });
    
    // Ajusta a velocidade de rotação das engrenagens com base nos valores
    // Isso é apenas visual, a velocidade real é controlada por CSS
    const economyGear = $('.gear.economy::after');
    const ecologyGear = $('.gear.ecology::after');
    const politicsGear = $('.gear.politics::after');
    const wellnessGear = $('.gear.wellness::after');
    
    // Ajusta a duração da animação com base nos valores
    // Valores mais altos = rotação mais rápida
    if (economyGear) {
        economyGear.style.animationDuration = `${5 - (gears.economy / 25)}s`;
    }
    if (ecologyGear) {
        ecologyGear.style.animationDuration = `${6 - (gears.ecology / 25)}s`;
    }
    if (politicsGear) {
        politicsGear.style.animationDuration = `${7 - (gears.politics / 25)}s`;
    }
    if (wellnessGear) {
        wellnessGear.style.animationDuration = `${8 - (gears.wellness / 25)}s`;
    }
}

// Função para atualizar as estatísticas da cidade
function updateCityStats() {
    const city = gameData.city;
    
    // Atualiza a população
    const populationElement = $('.stat-item:has(.fa-users) strong');
    if (populationElement) {
        populationElement.textContent = city.population.toLocaleString('pt-BR');
    }
    
    // Atualiza os distritos
    const districtsElement = $('.stat-item:has(.fa-building) strong');
    if (districtsElement) {
        districtsElement.textContent = city.districts;
    }
    
    // Atualiza o dia
    const dayElement = $('.stat-item:has(.fa-calendar-day) strong');
    if (dayElement) {
        dayElement.textContent = city.day;
    }
}

// Função para carregar a tela de decisões
function loadDecisionsScreen() {
    const decisionsContainer = $('.decisions-container');
    decisionsContainer.innerHTML = '';
    
    // Filtra as decisões com base no papel do jogador
    const playerRole = gameData.player.role;
    const filteredDecisions = gameData.decisions.filter(decision => decision.role === playerRole);
    
    // Se não houver decisões para o papel do jogador, mostra uma mensagem
    if (filteredDecisions.length === 0) {
        decisionsContainer.innerHTML = `
            <div class="no-decisions">
                <i class="fas fa-inbox"></i>
                <p>Não há decisões disponíveis para o seu papel no momento.</p>
            </div>
        `;
        return;
    }
    
    // Renderiza as decisões
    filteredDecisions.forEach(decision => {
        const decisionCard = createDecisionCard(decision);
        decisionsContainer.appendChild(decisionCard);
    });
}

// Função para criar um card de decisão
function createDecisionCard(decision) {
    const card = document.createElement('div');
    card.className = 'decision-card';
    card.dataset.decisionId = decision.id;
    
    // Cabeçalho da decisão
    const title = document.createElement('div');
    title.className = 'decision-title';
    title.textContent = decision.title;
    
    // Descrição da decisão
    const description = document.createElement('div');
    description.className = 'decision-description';
    description.textContent = decision.description;
    
    // Impactos da decisão
    const impacts = document.createElement('div');
    impacts.className = 'decision-impacts';
    
    // Adiciona os impactos
    Object.keys(decision.impacts).forEach(impactType => {
        const impactValue = decision.impacts[impactType];
        const impactItem = document.createElement('div');
        impactItem.className = 'impact-item';
        
        // Determina o ícone e a classe com base no tipo de impacto
        let icon, className;
        switch (impactType) {
            case 'economy':
                icon = 'fa-coins';
                break;
            case 'ecology':
                icon = 'fa-leaf';
                break;
            case 'politics':
                icon = 'fa-balance-scale';
                break;
            case 'wellness':
                icon = 'fa-heart';
                break;
        }
        
        // Determina a classe com base no valor do impacto
        if (impactValue > 0) {
            className = 'impact-positive';
        } else if (impactValue < 0) {
            className = 'impact-negative';
        } else {
            className = 'impact-neutral';
        }
        
        impactItem.innerHTML = `
            <i class="fas ${icon} ${className}"></i>
            <span>${getTranslation(impactType)}: ${impactValue > 0 ? '+' : ''}${impactValue}</span>
        `;
        
        impacts.appendChild(impactItem);
    });
    
    // Ações da decisão
    const actions = document.createElement('div');
    actions.className = 'decision-actions';
    
    // Adiciona as opções de escolha
    decision.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = `decision-btn ${choice.type}`;
        button.textContent = choice.text;
        button.dataset.decisionId = decision.id;
        button.dataset.choiceIndex = index;
        
        // Adiciona o evento de clique
        button.addEventListener('click', handleDecisionChoice);
        
        actions.appendChild(button);
    });
    
    // Monta o card
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(impacts);
    card.appendChild(actions);
    
    return card;
}

// Função para lidar com a escolha de uma decisão
function handleDecisionChoice(event) {
    const button = event.currentTarget;
    const decisionId = parseInt(button.dataset.decisionId);
    const choiceIndex = parseInt(button.dataset.choiceIndex);
    
    // Encontra a decisão
    const decision = gameData.decisions.find(d => d.id === decisionId);
    if (!decision) return;
    
    // Encontra a escolha
    const choice = decision.choices[choiceIndex];
    if (!choice) return;
    
    // Aplica os impactos da escolha
    applyChoiceImpacts(choice.impacts);
    
    // Adiciona a decisão ao histórico
    addToHistory(decision, choice);
    
    // Remove a decisão da lista de decisões disponíveis
    const decisionIndex = gameData.decisions.findIndex(d => d.id === decisionId);
    if (decisionIndex !== -1) {
        gameData.decisions.splice(decisionIndex, 1);
    }
    
    // Recarrega a tela de decisões
    loadDecisionsScreen();
    
    // Mostra uma notificação
    showNotification('Decisão registrada com sucesso!');
    
    // Salva o jogo se o autosave estiver ativado
    if (gameData.settings.autosave) {
        saveGame();
    }
    
    // Verifica se algum objetivo foi concluído
    checkObjectives();
}

// Função para aplicar os impactos de uma escolha
function applyChoiceImpacts(impacts) {
    // Aplica os impactos nas engrenagens da cidade
    Object.keys(impacts).forEach(impactType => {
        if (gameData.city.gears[impactType] !== undefined) {
            // Garante que o valor fique entre 0 e 100
            gameData.city.gears[impactType] = Math.max(0, Math.min(100, gameData.city.gears[impactType] + impacts[impactType]));
        }
    });
    
    // Aplica os impactos nas estatísticas do jogador, se houver
    // Isso seria implementado com base nos requisitos específicos de cada decisão
}

// Função para adicionar uma decisão ao histórico
function addToHistory(decision, choice) {
    const historyItem = {
        id: gameData.history.length + 1,
        date: new Date(),
        day: gameData.city.day,
        decisionTitle: decision.title,
        choiceText: choice.text,
        choiceType: choice.type,
        impacts: choice.impacts
    };
    
    gameData.history.unshift(historyItem);
}

// Função para carregar a tela de perfil
function loadProfileScreen() {
    // Atualiza as informações do jogador
    updatePlayerInfo();
    
    // Atualiza as estatísticas do jogador
    updatePlayerStats();
    
    // Atualiza a barra de XP
    updateXpBar();
    
    // Atualiza a lista de objetivos
    updateObjectivesList();
}

// Função para atualizar as informações do jogador
function updatePlayerInfo() {
    const player = gameData.player;
    const role = player.role ? gameData.roles[player.role] : null;
    
    // Atualiza o nome do jogador
    const playerNameElement = $('#player-name');
    if (playerNameElement) {
        playerNameElement.textContent = player.name;
    }
    
    // Atualiza o papel do jogador
    const playerRoleElement = $('#player-role');
    if (playerRoleElement) {
        playerRoleElement.textContent = role ? role.name : 'Nenhum papel selecionado';
    }
    
    // Atualiza o nível do jogador
    const playerLevelElement = $('#player-level');
    if (playerLevelElement) {
        playerLevelElement.textContent = player.level;
    }
}

// Função para atualizar as estatísticas do jogador
function updatePlayerStats() {
    const stats = gameData.player.stats;
    
    // Atualiza o dinheiro
    const moneyElement = $('#money-stat');
    if (moneyElement) {
        moneyElement.textContent = `R$ ${stats.money.toLocaleString('pt-BR')}`;
    }
    
    // Atualiza a reputação
    const reputationElement = $('#reputation-stat');
    if (reputationElement) {
        reputationElement.textContent = stats.reputation;
    }
    
    // Atualiza a popularidade
    const popularityElement = $('#popularity-stat');
    if (popularityElement) {
        popularityElement.textContent = stats.popularity;
    }
    
    // Atualiza a influência política
    const politicalInfluenceElement = $('#political-influence-stat');
    if (politicalInfluenceElement) {
        politicalInfluenceElement.textContent = stats.politicalInfluence;
    }
    
    // Atualiza o conhecimento técnico
    const technicalKnowledgeElement = $('#technical-knowledge-stat');
    if (technicalKnowledgeElement) {
        technicalKnowledgeElement.textContent = stats.technicalKnowledge;
    }
}

// Função para atualizar a barra de XP
function updateXpBar() {
    const player = gameData.player;
    
    // Atualiza a barra de XP
    const xpFillElement = $('#xp-fill');
    if (xpFillElement) {
        const xpPercentage = (player.xp / player.maxXp) * 100;
        xpFillElement.style.width = `${xpPercentage}%`;
    }
    
    // Atualiza o texto de XP
    const currentXpElement = $('#current-xp');
    const maxXpElement = $('#max-xp');
    if (currentXpElement && maxXpElement) {
        currentXpElement.textContent = player.xp;
        maxXpElement.textContent = player.maxXp;
    }
}

// Função para atualizar a lista de objetivos
function updateObjectivesList() {
    const objectivesListElement = $('#objectives-list');
    objectivesListElement.innerHTML = '';
    
    // Se o jogador não tiver um papel, mostra uma mensagem
    if (!gameData.player.role) {
        objectivesListElement.innerHTML = `
            <div class="no-objectives">
                <p>Selecione um papel para ver seus objetivos.</p>
            </div>
        `;
        return;
    }
    
    // Obtém os objetivos do papel do jogador
    const role = gameData.roles[gameData.player.role];
    const objectives = role.objectives;
    
    // Renderiza os objetivos
    objectives.forEach(objective => {
        const objectiveItem = createObjectiveItem(objective);
        objectivesListElement.appendChild(objectiveItem);
    });
}

// Função para criar um item de objetivo
function createObjectiveItem(objective) {
    const item = document.createElement('div');
    item.className = 'objective-item';
    item.dataset.objectiveId = objective.id;
    
    // Checkbox do objetivo
    const checkbox = document.createElement('div');
    checkbox.className = 'objective-checkbox';
    checkbox.innerHTML = objective.progress >= objective.maxProgress ? 
        '<i class="fas fa-check-square"></i>' : 
        '<i class="far fa-square"></i>';
    
    // Conteúdo do objetivo
    const content = document.createElement('div');
    content.className = 'objective-content';
    
    const title = document.createElement('h4');
    title.textContent = objective.title;
    
    const description = document.createElement('p');
    description.textContent = objective.description;
    
    // Barra de progresso
    const progressContainer = document.createElement('div');
    progressContainer.className = 'objective-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'objective-progress-fill';
    const progressPercentage = (objective.progress / objective.maxProgress) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    progressContainer.appendChild(progressBar);
    
    // Monta o item
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(progressContainer);
    
    item.appendChild(checkbox);
    item.appendChild(content);
    
    return item;
}

// Função para carregar a tela de histórico
function loadHistoryScreen() {
    const historyContainer = $('.history-container');
    historyContainer.innerHTML = '';
    
    // Se não houver histórico, mostra uma mensagem
    if (gameData.history.length === 0) {
        historyContainer.innerHTML = `
            <div class="no-history">
                <i class="fas fa-history"></i>
                <p>Você ainda não fez nenhuma decisão.</p>
            </div>
        `;
        return;
    }
    
    // Renderiza o histórico
    gameData.history.forEach(historyItem => {
        const historyElement = createHistoryElement(historyItem);
        historyContainer.appendChild(historyElement);
    });
}

// Função para criar um elemento de histórico
function createHistoryElement(historyItem) {
    const element = document.createElement('div');
    element.className = 'history-item';
    
    // Data do histórico
    const date = document.createElement('div');
    date.className = 'history-date';
    date.textContent = `Dia ${historyItem.day} - ${formatDate(historyItem.date)}`;
    
    // Título da decisão
    const title = document.createElement('div');
    title.className = 'history-title';
    title.textContent = historyItem.decisionTitle;
    
    // Escolha feita
    const choice = document.createElement('div');
    choice.className = 'history-choice';
    choice.textContent = `Escolha: ${historyItem.choiceText}`;
    
    // Impactos da escolha
    const impacts = document.createElement('div');
    impacts.className = 'history-impacts';
    
    // Adiciona os impactos
    Object.keys(historyItem.impacts).forEach(impactType => {
        const impactValue = historyItem.impacts[impactType];
        const impactElement = document.createElement('span');
        impactElement.className = 'history-impact';
        
        // Determina a classe com base no valor do impacto
        if (impactValue > 0) {
            impactElement.classList.add('positive');
        } else if (impactValue < 0) {
            impactElement.classList.add('negative');
        } else {
            impactElement.classList.add('neutral');
        }
        
        impactElement.textContent = `${getTranslation(impactType)}: ${impactValue > 0 ? '+' : ''}${impactValue}`;
        
        impacts.appendChild(impactElement);
    });
    
    // Monta o elemento
    element.appendChild(date);
    element.appendChild(title);
    element.appendChild(choice);
    element.appendChild(impacts);
    
    return element;
}

// Função para formatar a data
function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

// Função para carregar a tela de configurações
function loadSettingsScreen() {
    // Atualiza o toggle do modo escuro
    const darkModeToggle = $('#dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.checked = gameData.settings.darkMode;
    }
    
    // Atualiza o seletor de idioma
    const languageSelect = $('#language-select');
    if (languageSelect) {
        languageSelect.value = gameData.settings.language;
    }
    
    // Atualiza o toggle de notificações
    const notificationsToggle = $('#notifications-toggle');
    if (notificationsToggle) {
        notificationsToggle.checked = gameData.settings.notifications;
    }
    
    // Atualiza o toggle de autosave
    const autosaveToggle = $('#autosave-toggle');
    if (autosaveToggle) {
        autosaveToggle.checked = gameData.settings.autosave;
    }
}

// Função para obter uma tradução
function getTranslation(key) {
    return gameData.translations[appState.currentLanguage][key] || key;
}

// Função para aplicar o idioma
function applyLanguage() {
    const translations = gameData.translations[appState.currentLanguage];
    
    // Atualiza os elementos com textos traduzíveis
    document.title = `${translations.appTitle} - ${translations.appDescription}`;
    
    // Tela Inicial
    if ($('.logo h1')) $('.logo h1').textContent = translations.appTitle;
    if ($('.logo-container p')) $('.logo-container p').textContent = translations.appDescription;
    if ($('#start-game-btn')) $('#start-game-btn').textContent = translations.startGame;
    if ($('#load-game-btn')) $('#load-game-btn').textContent = translations.loadGame;
    
    // Tela de Seleção de Papel
    if ($('#role-selection-screen h2')) $('#role-selection-screen h2').textContent = translations.chooseRole;
    if ($('.role-objectives h4')) $$('.role-objectives h4').forEach(el => el.textContent = translations.initialObjectives);
    
    // Tela da Cidade
    if ($('#city-screen h2')) $('#city-screen h2').textContent = translations.myCity;
    if ($('.gear.economy h3')) $('.gear.economy h3').textContent = translations.economy;
    if ($('.gear.ecology h3')) $('.gear.ecology h3').textContent = translations.ecology;
    if ($('.gear.politics h3')) $('.gear.politics h3').textContent = translations.politics;
    if ($('.gear.wellness h3')) $('.gear.wellness h3').textContent = translations.wellness;
    
    // Tela de Decisões
    if ($('#decisions-screen h2')) $('#decisions-screen h2').textContent = translations.decisions;
    
    // Tela de Perfil
    if ($('#profile-screen h2')) $('#profile-screen h2').textContent = translations.myProfile;
    if ($('.player-level')) $('.player-level').innerHTML = `${translations.level} <span id="player-level">${gameData.player.level}</span>`;
    if ($('.stat-card:nth-child(1) h4')) $('.stat-card:nth-child(1) h4').textContent = translations.money;
    if ($('.stat-card:nth-child(2) h4')) $('.stat-card:nth-child(2) h4').textContent = translations.reputation;
    if ($('.stat-card:nth-child(3) h4')) $('.stat-card:nth-child(3) h4').textContent = translations.popularity;
    if ($('.stat-card:nth-child(4) h4')) $('.stat-card:nth-child(4) h4').textContent = translations.politicalInfluence;
    if ($('.stat-card:nth-child(5) h4')) $('.stat-card:nth-child(5) h4').textContent = translations.technicalKnowledge;
    if ($('.objectives-container h3')) $('.objectives-container h3').textContent = translations.currentObjectives;
    
    // Tela de Histórico
    if ($('#history-screen h2')) $('#history-screen h2').textContent = translations.history;
    
    // Tela de Configurações
    if ($('#settings-screen h2')) $('#settings-screen h2').textContent = translations.settings;
    if ($('.setting-item:nth-child(1) h3')) $('.setting-item:nth-child(1) h3').textContent = translations.darkMode;
    if ($('.setting-item:nth-child(1) p')) $('.setting-item:nth-child(1) p').textContent = translations.darkModeDesc;
    if ($('.setting-item:nth-child(2) h3')) $('.setting-item:nth-child(2) h3').textContent = translations.language;
    if ($('.setting-item:nth-child(2) p')) $('.setting-item:nth-child(2) p').textContent = translations.languageDesc;
    if ($('.setting-item:nth-child(3) h3')) $('.setting-item:nth-child(3) h3').textContent = translations.notifications;
    if ($('.setting-item:nth-child(3) p')) $('.setting-item:nth-child(3) p').textContent = translations.notificationsDesc;
    if ($('.setting-item:nth-child(4) h3')) $('.setting-item:nth-child(4) h3').textContent = translations.autosave;
    if ($('.setting-item:nth-child(4) p')) $('.setting-item:nth-child(4) p').textContent = translations.autosaveDesc;
    if ($('#save-settings-btn')) $('#save-settings-btn').textContent = translations.saveSettings;
    if ($('#reset-game-btn')) $('#reset-game-btn').textContent = translations.resetGame;
    
    // Menu
    if ($('.nav-btn:nth-child(1) span')) $('.nav-btn:nth-child(1) span').textContent = translations.city;
    if ($('.nav-btn:nth-child(2) span')) $('.nav-btn:nth-child(2) span').textContent = translations.decisionsMenu;
    if ($('.nav-btn:nth-child(3) span')) $('.nav-btn:nth-child(3) span').textContent = translations.profile;
    if ($('.nav-btn:nth-child(4) span')) $('.nav-btn:nth-child(4) span').textContent = translations.historyMenu;
    if ($('.nav-btn:nth-child(5) span')) $('.nav-btn:nth-child(5) span').textContent = translations.config;
}

// Função para alternar o modo escuro
function toggleDarkMode() {
    gameData.settings.darkMode = !gameData.settings.darkMode;
    
    if (gameData.settings.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Função para mostrar uma notificação
function showNotification(message) {
    // Cria o elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Adiciona ao corpo do documento
    document.body.appendChild(notification);
    
    // Mostra a notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para verificar se algum objetivo foi concluído
function checkObjectives() {
    if (!gameData.player.role) return;
    
    const role = gameData.roles[gameData.player.role];
    const objectives = role.objectives;
    
    objectives.forEach(objective => {
        if (objective.progress >= objective.maxProgress) {
            // O objetivo já foi concluído
            return;
        }
        
        // Verifica se o objetivo foi concluído com base nas estatísticas atuais
        let completed = false;
        
        switch (objective.id) {
            case 1: // Conseguir um emprego estável
                // Este objetivo seria concluído através de uma decisão específica
                break;
            case 2: // Economizar dinheiro para investimentos
                if (gameData.player.stats.money >= objective.maxProgress) {
                    objective.progress = objective.maxProgress;
                    completed = true;
                }
                break;
            case 3: // Implementar um projeto comunitário
                // Este objetivo seria concluído através de uma decisão específica
                break;
            case 4: // Melhorar a eficiência do serviço público
                // Este objetivo seria concluído através de uma decisão específica
                break;
            case 5: // Abrir seu primeiro negócio
                // Este objetivo seria concluído através de uma decisão específica
                break;
            case 6: // Contratar seus primeiros funcionários
                // Este objetivo seria concluído através de uma decisão específica
                break;
            case 7: // Balançar o orçamento da cidade
                // Este objetivo seria concluído através de uma decisão específica
                break;
            case 8: // Implementar uma política pública popular
                // Este objetivo seria concluído através de uma decisão específica
                break;
        }
        
        if (completed) {
            // Adiciona XP ao jogador
            addXp(100);
            
            // Mostra uma notificação
            showNotification(`Objetivo concluído: ${objective.title}!`);
            
            // Salva o jogo se o autosave estiver ativado
            if (gameData.settings.autosave) {
                saveGame();
            }
        }
    });
    
    // Atualiza a tela de perfil se estiver visível
    if (appState.currentScreen === 'profile-screen') {
        updateObjectivesList();
    }
}

// Função para adicionar XP ao jogador
function addXp(amount) {
    const player = gameData.player;
    player.xp += amount;
    
    // Verifica se o jogador subiu de nível
    while (player.xp >= player.maxXp) {
        player.xp -= player.maxXp;
        player.level++;
        player.maxXp = Math.floor(player.maxXp * 1.5);
        
        // Mostra uma notificação
        showNotification(`Parabéns! Você alcançou o nível ${player.level}!`);
        
        // Aumenta as estatísticas do jogador
        player.stats.reputation += 5;
        player.stats.popularity += 3;
        player.stats.politicalInfluence += 2;
        player.stats.technicalKnowledge += 4;
    }
    
    // Atualiza a barra de XP se a tela de perfil estiver visível
    if (appState.currentScreen === 'profile-screen') {
        updateXpBar();
        updatePlayerStats();
    }
}

// Função para salvar o jogo
function saveGame() {
    // Salva os dados do jogo no localStorage
    localStorage.setItem('gearCitySave', JSON.stringify({
        player: gameData.player,
        city: gameData.city,
        history: gameData.history,
        decisions: gameData.decisions,
        settings: gameData.settings
    }));
    
    // Mostra uma notificação
    showNotification('Jogo salvo com sucesso!');
}

// Função para carregar o jogo
function loadGame() {
    // Carrega os dados do jogo do localStorage
    const saveData = localStorage.getItem('gearCitySave');
    
    if (!saveData) {
        showNotification('Nenhum jogo salvo encontrado!');
        return;
    }
    
    try {
        const parsedData = JSON.parse(saveData);
        
        // Restaura os dados do jogo
        gameData.player = parsedData.player;
        gameData.city = parsedData.city;
        gameData.history = parsedData.history || [];
        gameData.decisions = parsedData.decisions || gameData.decisions;
        gameData.settings = { ...gameData.settings, ...parsedData.settings };
        
        // Atualiza o estado da aplicação
        appState.gameStarted = true;
        appState.selectedRole = gameData.player.role;
        
        // Aplica as configurações
        if (gameData.settings.darkMode) {
            document.body.classList.add('dark-mode');
        }
        
        appState.currentLanguage = gameData.settings.language;
        applyLanguage();
        
        // Mostra a tela da cidade
        showScreen('city-screen');
        
        // Mostra uma notificação
        showNotification('Jogo carregado com sucesso!');
    } catch (error) {
        console.error('Erro ao carregar o jogo:', error);
        showNotification('Erro ao carregar o jogo salvo!');
    }
}

// Função para reiniciar o jogo
function resetGame() {
    // Confirma se o jogador realmente quer reiniciar o jogo
    if (!confirm('Tem certeza de que deseja reiniciar o jogo? Todo o progresso será perdido.')) {
        return;
    }
    
    // Reseta os dados do jogo
    gameData.player = {
        name: 'Jogador',
        role: null,
        level: 1,
        xp: 300,
        maxXp: 1000,
        stats: {
            money: 2500,
            reputation: 45,
            popularity: 30,
            politicalInfluence: 15,
            technicalKnowledge: 25
        }
    };
    
    gameData.city = {
        population: 125430,
        districts: 4,
        day: 42,
        gears: {
            economy: 75,
            ecology: 60,
            politics: 50,
            wellness: 65
        }
    };
    
    gameData.history = [];
    
    // Restaura as decisões originais
    gameData.decisions = [
        {
            id: 1,
            title: 'Crise no Transporte Público',
            description: 'O sistema de transporte público está enfrentando uma grave crise com falta de investimento. Como você lidaria com isso?',
            role: 'mayor',
            impacts: {
                economy: -10,
                ecology: 5,
                politics: 15,
                wellness: 10
            },
            choices: [
                { 
                    text: 'Aumentar impostos para investir no transporte', 
                    type: 'positive',
                    impacts: { economy: -5, politics: -10, wellness: 15 }
                },
                { 
                    text: 'Privatizar o serviço de transporte', 
                    type: 'negative',
                    impacts: { economy: 10, politics: -15, wellness: -5 }
                },
                { 
                    text: 'Buscar parcerias público-privadas', 
                    type: 'neutral',
                    impacts: { economy: 5, politics: 5, wellness: 5 }
                }
            ]
        },
        {
            id: 2,
            title: 'Oportunidade de Negócio',
            description: 'Uma grande empresa está interessada em se instalar na cidade, mas exigirá isenção fiscal por 5 anos.',
            role: 'entrepreneur',
            impacts: {
                economy: 20,
                ecology: -10,
                politics: -5,
                wellness: 5
            },
            choices: [
                { 
                    text: 'Apoiar a instalação da empresa', 
                    type: 'positive',
                    impacts: { economy: 15, politics: -5, wellness: 10 }
                },
                { 
                    text: 'Propor uma contraproposta com menos benefícios', 
                    type: 'neutral',
                    impacts: { economy: 5, politics: 5, wellness: 5 }
                },
                { 
                    text: 'Organizar protestos contra a isenção fiscal', 
                    type: 'negative',
                    impacts: { economy: -10, politics: 15, wellness: -5 }
                }
            ]
        },
        {
            id: 3,
            title: 'Greve dos Professores',
            description: 'Os professores da rede pública entraram em greve exigindo melhores salários e condições de trabalho.',
            role: 'public-worker',
            impacts: {
                economy: -15,
                ecology: 0,
                politics: -20,
                wellness: -10
            },
            choices: [
                { 
                    text: 'Apoiar a greve e participar das manifestações', 
                    type: 'positive',
                    impacts: { economy: -5, politics: -10, wellness: 5 }
                },
                { 
                    text: 'Mediar a negociação entre governo e professores', 
                    type: 'neutral',
                    impacts: { economy: 0, politics: 15, wellness: 10 }
                },
                { 
                    text: 'Cruzar o piquete e continuar trabalhando', 
                    type: 'negative',
                    impacts: { economy: 5, politics: -15, wellness: -15 }
                }
            ]
        },
        {
            id: 4,
            title: 'Promoção no Trabalho',
            description: 'Uma oportunidade de promoção surgiu na sua empresa, mas exigirá mais horas de trabalho e responsabilidade.',
            role: 'employee',
            impacts: {
                economy: 15,
                ecology: 0,
                politics: 0,
                wellness: -10
            },
            choices: [
                { 
                    text: 'Aceitar a promoção imediatamente', 
                    type: 'positive',
                    impacts: { economy: 20, wellness: -15 }
                },
                { 
                    text: 'Negociar melhores condições antes de aceitar', 
                    type: 'neutral',
                    impacts: { economy: 10, wellness: -5 }
                },
                { 
                    text: 'Recusar a promoção para manter qualidade de vida', 
                    type: 'negative',
                    impacts: { economy: 0, wellness: 10 }
                }
            ]
        }
    ];
    
    // Atualiza o estado da aplicação
    appState.gameStarted = false;
    appState.selectedRole = null;
    
    // Mostra a tela inicial
    showScreen('home-screen');
    
    // Mostra uma notificação
    showNotification('Jogo reiniciado com sucesso!');
}

// Função para gerar eventos aleatórios
function generateRandomEvent() {
    // Verifica se o jogo já começou
    if (!appState.gameStarted) return;
    
    // 30% de chance de gerar um evento aleatório
    if (Math.random() < 0.3) {
        // Seleciona um evento aleatório
        const randomIndex = Math.floor(Math.random() * gameData.randomEvents.length);
        const event = gameData.randomEvents[randomIndex];
        
        // Aplica os impactos do evento
        Object.keys(event.impacts).forEach(impactType => {
            if (gameData.city.gears[impactType] !== undefined) {
                // Garante que o valor fique entre 0 e 100
                gameData.city.gears[impactType] = Math.max(0, Math.min(100, gameData.city.gears[impactType] + event.impacts[impactType]));
            }
        });
        
        // Mostra uma notificação sobre o evento
        showNotification(`Evento: ${event.title}`);
        
        // Atualiza a tela da cidade se estiver visível
        if (appState.currentScreen === 'city-screen') {
            updateGears();
        }
        
        // Salva o jogo se o autosave estiver ativado
        if (gameData.settings.autosave) {
            saveGame();
        }
    }
}

// Função para avançar um dia no jogo
function advanceDay() {
    // Verifica se o jogo já começou
    if (!appState.gameStarted) return;
    
    // Incrementa o dia
    gameData.city.day++;
    
    // Gera um evento aleatório
    generateRandomEvent();
    
    // Atualiza a tela da cidade se estiver visível
    if (appState.currentScreen === 'city-screen') {
        updateCityStats();
    }
}

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', () => {
    // Configura os event listeners
    
    // Botão de iniciar jogo
    const startGameBtn = $('#start-game-btn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            showScreen('role-selection-screen');
        });
    }
    
    // Botão de carregar jogo
    const loadGameBtn = $('#load-game-btn');
    if (loadGameBtn) {
        loadGameBtn.addEventListener('click', () => {
            loadGame();
        });
    }
    
    // Cards de seleção de papel
    const roleCards = $$('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            const role = card.dataset.role;
            selectRole(role);
        });
    });
    
    // Botões de navegação
    const navBtns = $$('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const screenId = btn.dataset.screen;
            showScreen(screenId);
        });
    });
    
    // Configurações
    const darkModeToggle = $('#dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            toggleDarkMode();
        });
    }
    
    const languageSelect = $('#language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', () => {
            appState.currentLanguage = languageSelect.value;
            gameData.settings.language = languageSelect.value;
            applyLanguage();
        });
    }
    
    const notificationsToggle = $('#notifications-toggle');
    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', () => {
            gameData.settings.notifications = notificationsToggle.checked;
        });
    }
    
    const autosaveToggle = $('#autosave-toggle');
    if (autosaveToggle) {
        autosaveToggle.addEventListener('change', () => {
            gameData.settings.autosave = autosaveToggle.checked;
        });
    }
    
    const saveSettingsBtn = $('#save-settings-btn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            saveGame();
            showNotification('Configurações salvas com sucesso!');
        });
    }
    
    const resetGameBtn = $('#reset-game-btn');
    if (resetGameBtn) {
        resetGameBtn.addEventListener('click', () => {
            resetGame();
        });
    }
    
    // Verifica se há um jogo salvo
    const savedGame = localStorage.getItem('gearCitySave');
    if (savedGame) {
        // Pergunta se o jogador deseja carregar o jogo salvo
        if (confirm('Deseja carregar o jogo salvo?')) {
            loadGame();
        }
    }
    
    // Inicia o ciclo de dias (a cada 30 segundos)
    setInterval(advanceDay, 30000);
});

// Função para selecionar um papel
function selectRole(role) {
    // Define o papel do jogador
    gameData.player.role = role;
    appState.selectedRole = role;
    appState.gameStarted = true;
    
    // Mostra a tela da cidade
    showScreen('city-screen');
    
    // Mostra uma notificação
    const roleData = gameData.roles[role];
    showNotification(`Você selecionou o papel de ${roleData.name}!`);
    
    // Salva o jogo se o autosave estiver ativado
    if (gameData.settings.autosave) {
        saveGame();
    }
}

// Adiciona estilos CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        box-shadow: 0 4px 12px var(--shadow-color);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 80%;
        text-align: center;
    }
    
    .notification.show {
        opacity: 1;
    }
    
    .no-decisions, .no-history, .no-objectives {
        text-align: center;
        padding: 30px;
        color: var(--text-secondary);
    }
    
    .no-decisions i, .no-history i {
        font-size: 48px;
        margin-bottom: 15px;
        color: var(--text-secondary);
    }
`;
document.head.appendChild(notificationStyles);