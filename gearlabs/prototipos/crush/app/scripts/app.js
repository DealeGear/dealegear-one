// Variáveis globais
let currentUser = null;
let currentLanguage = 'pt-BR';
let i18nData = null;
let activeTab = 'discover-tab';
let currentChatUser = null;
let users = [];
let matches = [];
let quests = [];
let messages = {};

// Inicialização do app
document.addEventListener('DOMContentLoaded', () => {
    // Carregar dados de i18n
    loadI18nData();
    
    // Verificar se o usuário já tem perfil
    checkUserProfile();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Carregar dados mockados
    loadMockData();
    
    // Aplicar idioma inicial
    applyLanguage(currentLanguage);
});

// Carregar dados de i18n
function loadI18nData() {
    // Simulando o carregamento do arquivo JSON
    i18nData = {
        "pt-BR": {
            "app": {
                "title": "Crush"
            },
            "onboarding": {
                "subtitle": "Encontre seu par geek perfeito!"
            },
            "profile": {
                "name": "Nome",
                "age": "Idade",
                "interests": "Interesses",
                "avatar": "Avatar (URL)",
                "save": "Salvar Perfil"
            },
            "interests": {
                "games": "Games",
                "anime": "Anime",
                "comics": "HQs/Comics",
                "scifi": "Ficção Científica",
                "fantasy": "Fantasia",
                "tech": "Tecnologia"
            },
            "nav": {
                "discover": "Descobrir",
                "matches": "Matches",
                "chat": "Chat",
                "quests": "Quests"
            },
            "discover": {
                "like": "Curtir",
                "pass": "Passar"
            },
            "match": {
                "title": "Novo Match!",
                "message": "Você combinou com {name}!",
                "close": "Fechar"
            },
            "chat": {
                "placeholder": "Digite uma mensagem...",
                "send": "Enviar",
                "empty": "Selecione um match para começar a conversar"
            },
            "quests": {
                "join": "Entrar",
                "joined": "Você entrou nesta quest!",
                "participants": "Participantes: {count}"
            }
        },
        "en-US": {
            "app": {
                "title": "Crush"
            },
            "onboarding": {
                "subtitle": "Find your perfect geek match!"
            },
            "profile": {
                "name": "Name",
                "age": "Age",
                "interests": "Interests",
                "avatar": "Avatar (URL)",
                "save": "Save Profile"
            },
            "interests": {
                "games": "Games",
                "anime": "Anime",
                "comics": "Comics",
                "scifi": "Sci-Fi",
                "fantasy": "Fantasy",
                "tech": "Technology"
            },
            "nav": {
                "discover": "Discover",
                "matches": "Matches",
                "chat": "Chat",
                "quests": "Quests"
            },
            "discover": {
                "like": "Like",
                "pass": "Pass"
            },
            "match": {
                "title": "New Match!",
                "message": "You matched with {name}!",
                "close": "Close"
            },
            "chat": {
                "placeholder": "Type a message...",
                "send": "Send",
                "empty": "Select a match to start chatting"
            },
            "quests": {
                "join": "Join",
                "joined": "You joined this quest!",
                "participants": "Participants: {count}"
            }
        },
        "es-ES": {
            "app": {
                "title": "Crush"
            },
            "onboarding": {
                "subtitle": "¡Encuentra tu pareja geek perfecta!"
            },
            "profile": {
                "name": "Nombre",
                "age": "Edad",
                "interests": "Intereses",
                "avatar": "Avatar (URL)",
                "save": "Guardar Perfil"
            },
            "interests": {
                "games": "Juegos",
                "anime": "Anime",
                "comics": "Cómics",
                "scifi": "Ciencia Ficción",
                "fantasy": "Fantasía",
                "tech": "Tecnología"
            },
            "nav": {
                "discover": "Descubrir",
                "matches": "Matches",
                "chat": "Chat",
                "quests": "Misiones"
            },
            "discover": {
                "like": "Me Gusta",
                "pass": "Pasar"
            },
            "match": {
                "title": "¡Nuevo Match!",
                "message": "¡Hiciste match con {name}!",
                "close": "Cerrar"
            },
            "chat": {
                "placeholder": "Escribe un mensaje...",
                "send": "Enviar",
                "empty": "Selecciona un match para empezar a chatear"
            },
            "quests": {
                "join": "Unirse",
                "joined": "¡Te uniste a esta misión!",
                "participants": "Participantes: {count}"
            }
        }
    };
}

// Verificar se o usuário já tem perfil
function checkUserProfile() {
    const savedProfile = localStorage.getItem('crushProfile');
    
    if (savedProfile) {
        currentUser = JSON.parse(savedProfile);
        showMainScreen();
    } else {
        showOnboardingScreen();
    }
}

// Mostrar tela de onboarding
function showOnboardingScreen() {
    document.getElementById('onboarding-screen').classList.remove('hidden');
    document.getElementById('main-screen').classList.add('hidden');
}

// Mostrar tela principal
function showMainScreen() {
    document.getElementById('onboarding-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
    
    // Renderizar conteúdo inicial
    renderDiscoverTab();
    renderMatchesTab();
    renderQuestsTab();
}

// Configurar event listeners
function setupEventListeners() {
    // Formulário de perfil
    document.getElementById('profile-form').addEventListener('submit', saveProfile);
    
    // Preview de avatar
    document.getElementById('avatar').addEventListener('input', updateAvatarPreview);
    
    // Navegação entre abas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Botões de idioma
    document.getElementById('lang-pt').addEventListener('click', () => changeLanguage('pt-BR'));
    document.getElementById('lang-en').addEventListener('click', () => changeLanguage('en-US'));
    document.getElementById('lang-es').addEventListener('click', () => changeLanguage('es-ES'));
    
    // Fechar notificação de match
    document.getElementById('close-notification').addEventListener('click', closeMatchNotification);
    
    // Envio de mensagem
    document.getElementById('send-message').addEventListener('click', sendMessage);
    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Salvar perfil do usuário
function saveProfile(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const avatar = document.getElementById('avatar').value || 'https://picsum.photos/seed/avatar/150/150.jpg';
    
    const interests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
        interests.push(checkbox.value);
    });
    
    currentUser = {
        id: Date.now(),
        name,
        age: parseInt(age),
        avatar,
        interests
    };
    
    // Salvar no localStorage
    localStorage.setItem('crushProfile', JSON.stringify(currentUser));
    
    // Mostrar tela principal
    showMainScreen();
}

// Atualizar preview do avatar
function updateAvatarPreview() {
    const avatarUrl = document.getElementById('avatar').value || 'https://picsum.photos/seed/avatar/150/150.jpg';
    document.getElementById('avatar-preview').src = avatarUrl;
}

// Trocar de aba
function switchTab(tabId) {
    // Esconder todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remover classe ativa de todos os botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar a aba selecionada
    document.getElementById(tabId).classList.remove('hidden');
    
    // Adicionar classe ativa ao botão selecionado
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
    
    // Atualizar aba ativa
    activeTab = tabId;
}

// Mudar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Atualizar botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang.split('-')[0]}`).classList.add('active');
    
    // Aplicar idioma
    applyLanguage(lang);
}

// Aplicar idioma
function applyLanguage(lang) {
    if (!i18nData || !i18nData[lang]) return;
    
    const translations = i18nData[lang];
    
    // Traduzir elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.dataset.i18n.split('.');
        let value = translations;
        
        for (const key of keys) {
            if (value[key] !== undefined) {
                value = value[key];
            } else {
                value = null;
                break;
            }
        }
        
        if (value !== null) {
            if (element.tagName === 'INPUT') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });
}

// Carregar dados mockados
function loadMockData() {
    // Usuários para descobrir
    users = [
        {
            id: 1,
            name: "Ana",
            age: 25,
            avatar: "https://picsum.photos/seed/user1/300/300.jpg",
            interests: ["games", "anime", "tech"]
        },
        {
            id: 2,
            name: "Bruno",
            age: 28,
            avatar: "https://picsum.photos/seed/user2/300/300.jpg",
            interests: ["comics", "scifi", "fantasy"]
        },
        {
            id: 3,
            name: "Carla",
            age: 23,
            avatar: "https://picsum.photos/seed/user3/300/300.jpg",
            interests: ["anime", "fantasy", "games"]
        },
        {
            id: 4,
            name: "Daniel",
            age: 30,
            avatar: "https://picsum.photos/seed/user4/300/300.jpg",
            interests: ["tech", "scifi", "comics"]
        },
        {
            id: 5,
            name: "Elisa",
            age: 27,
            avatar: "https://picsum.photos/seed/user5/300/300.jpg",
            interests: ["fantasy", "anime", "games"]
        }
    ];
    
    // Quests
    quests = [
        {
            id: 1,
            title: "Missão: Montar equipe para maratona de anime",
            description: "Precisamos de mais pessoas para nossa maratona de anime deste fim de semana. Venha se juntar a nós!",
            participants: ["Carlos", "Mariana", "Ricardo"]
        },
        {
            id: 2,
            title: "Side Quest: Debate sobre multiversos",
            description: "Vamos debater as teorias de multiversos na ficção científica. Traça suas melhores referências!",
            participants: ["Fernanda", "Pedro"]
        },
        {
            id: 3,
            title: "Missão: Grupo de estudo de programação",
            description: "Estou formando um grupo para estudar JavaScript juntos. Todos os níveis são bem-vindos!",
            participants: ["Roberto", "Juliana", "Thiago", "Patrícia"]
        },
        {
            id: 4,
            title: "Side Quest: Campeonato de games",
            description: "Campeonato de Street Fighter no sábado. Premiação para o campeão!",
            participants: ["Gustavo", "Lucas"]
        }
    ];
    
    // Carregar matches salvos
    const savedMatches = localStorage.getItem('crushMatches');
    if (savedMatches) {
        matches = JSON.parse(savedMatches);
    }
    
    // Carregar mensagens salvas
    const savedMessages = localStorage.getItem('crushMessages');
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
    }
}

// Renderizar aba Descobrir
function renderDiscoverTab() {
    const container = document.querySelector('#discover-tab .card-container');
    container.innerHTML = '';
    
    if (users.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">Não há mais usuários para descobrir no momento.</p>`;
        return;
    }
    
    // Pegar o primeiro usuário
    const user = users[0];
    
    // Criar card
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}">
        <div class="user-card-info">
            <h3>${user.name}, ${user.age}</h3>
            <p>Interesses:</p>
            <div class="user-interests">
                ${user.interests.map(interest => `<span class="interest-tag">${getInterestTranslation(interest)}</span>`).join('')}
            </div>
        </div>
        <div class="card-actions">
            <button class="btn-pass" data-user-id="${user.id}">❌</button>
            <button class="btn-like" data-user-id="${user.id}">❤️</button>
        </div>
    `;
    
    container.appendChild(card);
    
    // Adicionar event listeners
    card.querySelector('.btn-like').addEventListener('click', () => likeUser(user.id));
    card.querySelector('.btn-pass').addEventListener('click', () => passUser(user.id));
}

// Obter tradução de interesse
function getInterestTranslation(interest) {
    const translations = i18nData[currentLanguage].interests;
    return translations[interest] || interest;
}

// Curtir usuário
function likeUser(userId) {
    // Simulação de match (1 em cada 3 curtidas)
    const isMatch = Math.random() < 0.33;
    
    if (isMatch) {
        const user = users.find(u => u.id === userId);
        
        // Adicionar aos matches
        matches.push(user);
        localStorage.setItem('crushMatches', JSON.stringify(matches));
        
        // Mostrar notificação de match
        showMatchNotification(user);
        
        // Inicializar conversa
        if (!messages[userId]) {
            messages[userId] = [];
            localStorage.setItem('crushMessages', JSON.stringify(messages));
        }
    }
    
    // Remover usuário da lista
    users = users.filter(u => u.id !== userId);
    
    // Renderizar próximo usuário
    renderDiscoverTab();
}

// Passar usuário
function passUser(userId) {
    // Remover usuário da lista
    users = users.filter(u => u.id !== userId);
    
    // Renderizar próximo usuário
    renderDiscoverTab();
}

// Mostrar notificação de match
function showMatchNotification(user) {
    const notification = document.getElementById('match-notification');
    const message = document.getElementById('match-message');
    
    // Traduzir mensagem
    const matchMessage = i18nData[currentLanguage].match.message.replace('{name}', user.name);
    message.textContent = matchMessage;
    
    // Mostrar notificação
    notification.classList.remove('hidden');
    
    // Atualizar aba de matches
    renderMatchesTab();
}

// Fechar notificação de match
function closeMatchNotification() {
    document.getElementById('match-notification').classList.add('hidden');
}

// Renderizar aba Matches
function renderMatchesTab() {
    const container = document.querySelector('#matches-tab .matches-container');
    container.innerHTML = '';
    
    if (matches.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">Você ainda não tem matches. Continue explorando!</p>`;
        return;
    }
    
    matches.forEach(match => {
        const matchItem = document.createElement('div');
        matchItem.className = 'match-item';
        matchItem.innerHTML = `
            <img src="${match.avatar}" alt="${match.name}">
            <div class="match-item-info">
                <h4>${match.name}, ${match.age}</h4>
            </div>
        `;
        
        matchItem.addEventListener('click', () => openChat(match));
        container.appendChild(matchItem);
    });
}

// Abrir chat
function openChat(user) {
    currentChatUser = user;
    
    // Mudar para aba de chat
    switchTab('chat-tab');
    
    // Atualizar título do chat
    document.getElementById('chat-title').textContent = `${user.name}`;
    
    // Habilitar input de mensagem
    document.getElementById('message-input').disabled = false;
    document.getElementById('send-message').disabled = false;
    
    // Carregar mensagens
    renderChatMessages();
}

// Renderizar mensagens do chat
function renderChatMessages() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    
    if (!currentChatUser) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">${i18nData[currentLanguage].chat.empty}</p>`;
        return;
    }
    
    const userId = currentChatUser.id;
    const userMessages = messages[userId] || [];
    
    if (userMessages.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">Nenhuma mensagem ainda. Seja o primeiro a dizer oi!</p>`;
        return;
    }
    
    userMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender === 'me' ? 'sent' : 'received'}`;
        messageDiv.textContent = msg.text;
        container.appendChild(messageDiv);
    });
    
    // Rolar para o final
    container.scrollTop = container.scrollHeight;
}

// Enviar mensagem
function sendMessage() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    
    if (!text || !currentChatUser) return;
    
    const userId = currentChatUser.id;
    
    // Inicializar array de mensagens se necessário
    if (!messages[userId]) {
        messages[userId] = [];
    }
    
    // Adicionar mensagem
    messages[userId].push({
        sender: 'me',
        text: text,
        timestamp: new Date()
    });
    
    // Salvar no localStorage
    localStorage.setItem('crushMessages', JSON.stringify(messages));
    
    // Limpar input
    input.value = '';
    
    // Renderizar mensagens
    renderChatMessages();
    
    // Simular resposta automática após 1 segundo
    setTimeout(() => {
        simulateResponse(userId);
    }, 1000);
}

// Simular resposta automática
function simulateResponse(userId) {
    const responses = [
        "Oi! Como você está?",
        "Que legal! Eu também gosto muito disso.",
        "Você já jogou o último jogo da série?",
        "Qual seu anime favorito?",
        "Vamos marcar de assistir um filme juntos?",
        "Eu adoraria conhecer mais sobre você!",
        "Que interessante! Nunca pensei sobre isso dessa forma.",
        "Você tem algum hobby geek favorito?"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Adicionar resposta
    messages[userId].push({
        sender: 'other',
        text: randomResponse,
        timestamp: new Date()
    });
    
    // Salvar no localStorage
    localStorage.setItem('crushMessages', JSON.stringify(messages));
    
    // Renderizar mensagens se ainda estiver no mesmo chat
    if (currentChatUser && currentChatUser.id === userId) {
        renderChatMessages();
    }
}

// Renderizar aba Quests
function renderQuestsTab() {
    const container = document.querySelector('#quests-tab .quests-container');
    container.innerHTML = '';
    
    quests.forEach(quest => {
        const questCard = document.createElement('div');
        questCard.className = 'quest-card';
        questCard.innerHTML = `
            <h3>${quest.title}</h3>
            <p>${quest.description}</p>
            <div class="quest-participants">
                ${quest.participants.map(p => `<span class="participant">${p}</span>`).join('')}
            </div>
            <div class="quest-actions">
                <button class="btn-join" data-quest-id="${quest.id}">${i18nData[currentLanguage].quests.join}</button>
            </div>
        `;
        
        container.appendChild(questCard);
        
        // Adicionar event listener
        questCard.querySelector('.btn-join').addEventListener('click', () => joinQuest(quest.id));
    });
}

// Entrar em uma quest
function joinQuest(questId) {
    const quest = quests.find(q => q.id === questId);
    
    if (!quest || !currentUser) return;
    
    // Verificar se o usuário já está na quest
    if (quest.participants.includes(currentUser.name)) {
        return;
    }
    
    // Adicionar usuário aos participantes
    quest.participants.push(currentUser.name);
    
    // Salvar no localStorage
    localStorage.setItem('crushQuests', JSON.stringify(quests));
    
    // Re-renderizar quests
    renderQuestsTab();
    
    // Mostrar notificação
    showNotification(i18nData[currentLanguage].quests.joined);
}

// Mostrar notificação genérica
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.width = '80%';
    notification.style.maxWidth = '300px';
    notification.style.zIndex = '1000';
    notification.style.animation = 'pulse 1s';
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}