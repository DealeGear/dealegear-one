// Módulo principal do aplicativo
const crushApp = (function() {
    // Elementos DOM
    const elements = {
        pages: {
            profile: document.getElementById('profile-page'),
            discover: document.getElementById('discover-page'),
            matches: document.getElementById('matches-page'),
            chat: document.getElementById('chat-page'),
            quests: document.getElementById('quests-page'),
            achievements: document.getElementById('achievements-page')
        },
        navButtons: {
            profile: document.getElementById('profile-nav'),
            discover: document.getElementById('discover-nav'),
            matches: document.getElementById('matches-nav'),
            quests: document.getElementById('quests-nav')
        },
        profileForm: document.getElementById('profile-form'),
        notification: document.getElementById('notification'),
        notificationText: document.querySelector('.notification-text'),
        notificationClose: document.querySelector('.notification-close'),
        discoverImage: document.getElementById('discover-image'),
        discoverName: document.getElementById('discover-name'),
        discoverAge: document.getElementById('discover-age'),
        discoverInterests: document.getElementById('discover-interests'),
        likeBtn: document.getElementById('like-btn'),
        passBtn: document.getElementById('pass-btn'),
        superlikeBtn: document.getElementById('superlike-btn'),
        matchesList: document.getElementById('matches-list'),
        chatPage: document.getElementById('chat-page'),
        chatAvatar: document.getElementById('chat-avatar'),
        chatName: document.getElementById('chat-name'),
        chatStatus: document.getElementById('chat-status'),
        chatMessages: document.getElementById('chat-messages'),
        chatInput: document.getElementById('chat-input'),
        sendBtn: document.getElementById('send-btn'),
        backToMatches: document.getElementById('back-to-matches'),
        questsList: document.getElementById('quests-list'),
        achievementsGrid: document.getElementById('achievements-grid'),
        matchModal: document.getElementById('match-modal'),
        matchUser1: document.getElementById('match-user1'),
        matchUser2: document.getElementById('match-user2'),
        matchName: document.getElementById('match-name'),
        startChatBtn: document.getElementById('start-chat-btn')
    };
    
    // Sons
    const sounds = {
        match: new Audio('assets/sounds/match.mp3'),
        message: new Audio('assets/sounds/message.mp3')
    };
    
    // Inicialização
    function init() {
        // Carregar dados
        dataModule.loadFromLocalStorage();
        
        // Inicializar módulos
        darkModeModule.init();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Verificar se o usuário já tem perfil
        if (dataModule.appData.currentUser) {
            showPage('discover');
            updateDiscoverCard();
        } else {
            showPage('profile');
        }
        
        // Adicionar botão de conquistas ao header
        addAchievementsButton();
    }
    
    // Adicionar botão de conquistas
    function addAchievementsButton() {
        const achievementsBtn = document.createElement('button');
        achievementsBtn.className = 'nav-btn';
        achievementsBtn.innerHTML = '<span>🏆</span> Conquistas';
        achievementsBtn.dataset.page = 'achievements';
        achievementsBtn.addEventListener('click', () => showPage('achievements'));
        document.querySelector('.nav-buttons').appendChild(achievementsBtn);
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Navegação
        Object.keys(elements.navButtons).forEach(key => {
            const btn = elements.navButtons[key];
            if (btn) {
                btn.addEventListener('click', () => showPage(btn.dataset.page));
            }
        });
        
        // Formulário de perfil
        if (elements.profileForm) {
            elements.profileForm.addEventListener('submit', handleProfileSubmit);
        }
        
        // Seleção de interesses
        document.querySelectorAll('.interest-item').forEach(item => {
            item.addEventListener('click', function() {
                const checkbox = this.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                this.classList.toggle('selected', checkbox.checked);
            });
        });
        
        // Botões de curtir e passar
        if (elements.likeBtn) {
            elements.likeBtn.addEventListener('click', handleLike);
        }
        if (elements.passBtn) {
            elements.passBtn.addEventListener('click', handlePass);
        }
        if (elements.superlikeBtn) {
            elements.superlikeBtn.addEventListener('click', handleSuperLike);
        }
        
        // Chat
        if (elements.sendBtn) {
            elements.sendBtn.addEventListener('click', sendMessage);
        }
        if (elements.chatInput) {
            elements.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }
        if (elements.backToMatches) {
            elements.backToMatches.addEventListener('click', () => showPage('matches'));
        }
        
        // Notificação
        if (elements.notificationClose) {
            elements.notificationClose.addEventListener('click', hideNotification);
        }
        
        // Modal de match
        if (elements.startChatBtn) {
            elements.startChatBtn.addEventListener('click', () => {
                elements.matchModal.classList.remove('show');
                showPage('matches');
            });
        }
        
        // Fechar modal ao clicar fora
        if (elements.matchModal) {
            elements.matchModal.addEventListener('click', (e) => {
                if (e.target === elements.matchModal) {
                    elements.matchModal.classList.remove('show');
                }
            });
        }
    }
    
    // Mostrar página
    function showPage(pageName) {
        // Esconder todas as páginas
        Object.values(elements.pages).forEach(page => {
            if (page) page.classList.remove('active');
        });
        
        // Remover classe ativa de todos os botões de navegação
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Mostrar a página selecionada
        if (elements.pages[pageName]) {
            elements.pages[pageName].classList.add('active');
        }
        
        // Adicionar classe ativa ao botão correspondente
        const activeBtn = document.querySelector(`[data-page="${pageName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Ações específicas por página
        switch(pageName) {
            case 'discover':
                updateDiscoverCard();
                break;
            case 'matches':
                renderMatches();
                break;
            case 'quests':
                renderQuests();
                break;
            case 'achievements':
                renderAchievements();
                break;
        }
    }
    
    // Lidar com envio do formulário de perfil
    function handleProfileSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const avatarFile = document.getElementById('avatar').files[0];
        
        // Coletar interesses selecionados
        const selectedInterests = [];
        document.querySelectorAll('.interest-item input:checked').forEach(checkbox => {
            selectedInterests.push(checkbox.value);
        });
        
        // Criar objeto de usuário
        dataModule.appData.currentUser = {
            id: 0,
            name,
            age,
            interests: selectedInterests,
            avatar: avatarFile ? URL.createObjectURL(avatarFile) : `https://picsum.photos/seed/currentuser/400/400.jpg`,
            likedBy: [],
            superLikedBy: []
        };
        
        // Salvar no localStorage
        dataModule.saveToLocalStorage();
        
        // Mostrar notificação
        showNotification('Perfil criado com sucesso! 🎉');
        
        // Navegar para a página de descoberta
        setTimeout(() => {
            showPage('discover');
        }, 1500);
    }
    
    // Atualizar card de descoberta
    function updateDiscoverCard() {
        if (dataModule.appData.users.length === 0) return;
        
        // Verificar se já passou por todos os usuários
        if (dataModule.appData.currentUserIndex >= dataModule.appData.users.length) {
            dataModule.appData.currentUserIndex = 0;
        }
        
        const user = dataModule.appData.users[dataModule.appData.currentUserIndex];
        
        if (elements.discoverImage) {
            elements.discoverImage.src = user.avatar;
        }
        if (elements.discoverName) {
            elements.discoverName.textContent = user.name;
        }
        if (elements.discoverAge) {
            elements.discoverAge.textContent = `Idade: ${user.age}`;
        }
        
        // Renderizar interesses
        if (elements.discoverInterests) {
            elements.discoverInterests.innerHTML = '';
            user.interests.forEach(interest => {
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = getInterestLabel(interest);
                elements.discoverInterests.appendChild(tag);
            });
        }
        
        // Atualizar indicador online
        const onlineIndicator = document.querySelector('.online-indicator');
        if (onlineIndicator) {
            onlineIndicator.style.display = user.isOnline ? 'block' : 'none';
        }
    }
    
    // Obter rótulo do interesse
    function getInterestLabel(interest) {
        const labels = {
            'games': '🎮 Games',
            'sci-fi': '🚀 Sci-Fi',
            'animes': '🌸 Animes',
            'hqs': '📚 HQs'
        };
        return labels[interest] || interest;
    }
    
    // Lidar com curtir
    function handleLike() {
        const user = dataModule.appData.users[dataModule.appData.currentUserIndex];
        
        // Adicionar usuário atual à lista de curtidas do usuário
        if (!user.likedBy.includes(dataModule.appData.currentUser.id)) {
            user.likedBy.push(dataModule.appData.currentUser.id);
            dataModule.appData.stats.likesGiven++;
            
            // Verificar se é um match
            if (dataModule.appData.currentUser.likedBy.includes(user.id)) {
                createMatch(user);
            }
        }
        
        // Avançar para o próximo usuário
        dataModule.appData.currentUserIndex++;
        updateDiscoverCard();
        checkAndShowAchievements();
        dataModule.saveToLocalStorage();
    }
    
    // Lidar com super like
    function handleSuperLike() {
        const user = dataModule.appData.users[dataModule.appData.currentUserIndex];
        
        // Adicionar super like
        if (!user.superLikedBy.includes(dataModule.appData.currentUser.id)) {
            user.superLikedBy.push(dataModule.appData.currentUser.id);
            
            // Incrementar contador
            if (!dataModule.appData.stats.superLikesGiven) {
                dataModule.appData.stats.superLikesGiven = 0;
            }
            dataModule.appData.stats.superLikesGiven++;
            
            // Mostrar animação especial
            elements.superlikeBtn.style.transform = 'scale(1.5)';
            setTimeout(() => {
                elements.superlikeBtn.style.transform = '';
            }, 300);
            
            // Verificar se é um match
            if (dataModule.appData.currentUser.likedBy.includes(user.id) || 
                dataModule.appData.currentUser.superLikedBy.includes(user.id)) {
                createMatch(user, true);
            }
        }
        
        // Avançar para o próximo usuário
        dataModule.appData.currentUserIndex++;
        updateDiscoverCard();
        checkAndShowAchievements();
        dataModule.saveToLocalStorage();
    }
    
    // Criar match
    function createMatch(user, isSuperLike = false) {
        const matchId = `match-${dataModule.appData.currentUser.id}-${user.id}`;
        
        if (!dataModule.appData.matches.find(match => match.id === matchId)) {
            dataModule.appData.matches.push({
                id: matchId,
                users: [dataModule.appData.currentUser.id, user.id],
                isSuperLike: isSuperLike,
                createdAt: new Date()
            });
            
            // Incrementar contador de matches
            dataModule.appData.stats.matchesMade++;
            
            // Inicializar array de mensagens para este match
            if (!dataModule.appData.messages[matchId]) {
                dataModule.appData.messages[matchId] = [];
            }
            
            // Mostrar modal de match
            showMatchModal(user);
            
            // Tocar som de match
            if (sounds.match) {
                sounds.match.play().catch(e => console.log('Erro ao tocar som:', e));
            }
            
            // Mostrar notificação
            showNotification(`Novo match com ${user.name}! ${isSuperLike ? '⭐' : '💕'}`);
        }
    }
    
    // Mostrar modal de match
    function showMatchModal(user) {
        if (elements.matchModal && elements.matchUser1 && elements.matchUser2 && elements.matchName) {
            elements.matchUser1.src = dataModule.appData.currentUser.avatar;
            elements.matchUser2.src = user.avatar;
            elements.matchName.textContent = user.name;
            elements.matchModal.classList.add('show');
        }
    }
    
    // Lidar com passar
    function handlePass() {
        // Animação de passar
        const card = document.querySelector('.discover-card');
        card.style.transform = 'translateX(-100%) rotate(-30deg)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.opacity = '';
            
            // Apenas avançar para o próximo usuário
            dataModule.appData.currentUserIndex++;
            updateDiscoverCard();
        }, 300);
    }
    
    // Verificar e mostrar conquistas
    function checkAndShowAchievements() {
        const newAchievements = dataModule.checkAchievements();
        
        newAchievements.forEach(achievement => {
            showNotification(`Conquista desbloqueada: ${achievement.title}! 🏆`);
        });
        
        if (newAchievements.length > 0) {
            dataModule.saveToLocalStorage();
        }
    }
    
    // Renderizar matches
    function renderMatches() {
        if (!elements.matchesList) return;
        
        elements.matchesList.innerHTML = '';
        
        if (dataModule.appData.matches.length === 0) {
            elements.matchesList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">💔</div>
                    <p>Você ainda não tem matches. Continue curtindo perfis para encontrar alguém!</p>
                </div>
            `;
            return;
        }
        
        dataModule.appData.matches.forEach(match => {
            // Encontrar o outro usuário no match
            const otherUserId = match.users.find(id => id !== dataModule.appData.currentUser.id);
            const otherUser = dataModule.appData.users.find(user => user.id === otherUserId);
            
            if (!otherUser) return;
            
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';
            
            // Verificar se há mensagens não lidas
            const matchId = match.id;
            const unreadCount = dataModule.appData.messages[matchId] ? 
                dataModule.appData.messages[matchId].filter(msg => 
                    msg.sender !== dataModule.appData.currentUser.id && !msg.read
                ).length : 0;
            
            matchCard.innerHTML = `
                <img src="${otherUser.avatar}" alt="${otherUser.name}" class="match-avatar">
                <div class="match-info">
                    <h3>${otherUser.name} ${match.isSuperLike ? '⭐' : ''}</h3>
                    <p>${otherUser.age} anos • ${otherUser.isOnline ? 'Online' : 'Offline'}</p>
                    ${unreadCount > 0 ? `<span class="unread-badge">${unreadCount}</span>` : ''}
                </div>
            `;
            
            matchCard.addEventListener('click', () => openChat(match, otherUser));
            elements.matchesList.appendChild(matchCard);
        });
    }
    
    // Abrir chat
    function openChat(match, otherUser) {
        if (!elements.chatAvatar || !elements.chatName || !elements.chatStatus) return;
        
        elements.chatAvatar.src = otherUser.avatar;
        elements.chatName.textContent = otherUser.name;
        elements.chatStatus.textContent = otherUser.isOnline ? 'Online agora' : 'Offline';
        
        // Limpar mensagens
        if (elements.chatMessages) {
            elements.chatMessages.innerHTML = '';
        }
        
        // Carregar mensagens
        const matchId = match.id;
        if (dataModule.appData.messages[matchId]) {
            dataModule.appData.messages[matchId].forEach(message => {
                addMessageToChat(message);
                
                // Marcar como lidas
                if (message.sender !== dataModule.appData.currentUser.id) {
                    message.read = true;
                }
            });
        }
        
        // Armazenar o ID do match atual
        if (elements.chatPage) {
            elements.chatPage.dataset.matchId = matchId;
        }
        
        // Mostrar página de chat
        showPage('chat');
    }
    
    // Adicionar mensagem ao chat
    function addMessageToChat(message) {
        if (!elements.chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === dataModule.appData.currentUser.id ? 'sent' : 'received'}`;
        messageElement.textContent = message.text;
        elements.chatMessages.appendChild(messageElement);
        
        // Rolar para o final
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }
    
    // Enviar mensagem
    function sendMessage() {
        if (!elements.chatInput || !elements.chatPage) return;
        
        const text = elements.chatInput.value.trim();
        if (!text) return;
        
        const matchId = elements.chatPage.dataset.matchId;
        
        // Criar objeto de mensagem
        const message = {
            id: Date.now(),
            sender: dataModule.appData.currentUser.id,
            text,
            timestamp: new Date(),
            read: false
        };
        
        // Adicionar ao array de mensagens
        if (!dataModule.appData.messages[matchId]) {
            dataModule.appData.messages[matchId] = [];
        }
        dataModule.appData.messages[matchId].push(message);
        
        // Adicionar ao chat
        addMessageToChat(message);
        
        // Incrementar contador
        dataModule.appData.stats.messagesSent++;
        
        // Limpar input
        elements.chatInput.value = '';
        
        // Salvar no localStorage
        dataModule.saveToLocalStorage();
        
        // Verificar conquistas
        checkAndShowAchievements();
        
        // Simular resposta após um tempo
        setTimeout(() => {
            simulateResponse(matchId);
        }, 1500 + Math.random() * 2000);
    }
    
    // Simular resposta
    function simulateResponse(matchId) {
        const responses = [
            "Oi! Como você está?",
            "Legal! Qual seu jogo favorito?",
            "Eu também adoro isso!",
            "Quer jogar algo juntos?",
            "Que interessante! Me conta mais.",
            "Eu concordo totalmente!",
            "Você já assistiu o novo episódio?",
            "Vamos marcar algo?",
            "Que bom te encontrar por aqui! 😊",
            "Qual seu personagem favorito?",
            "Já jogou o novo lançamento?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Encontrar o outro usuário no match
        const match = dataModule.appData.matches.find(m => m.id === matchId);
        if (!match) return;
        
        const otherUserId = match.users.find(id => id !== dataModule.appData.currentUser.id);
        
        // Criar objeto de mensagem
        const message = {
            id: Date.now(),
            sender: otherUserId,
            text: randomResponse,
            timestamp: new Date(),
            read: false
        };
        
        // Adicionar ao array de mensagens
        dataModule.appData.messages[matchId].push(message);
        
        // Adicionar ao chat se estiver na página de chat
        if (elements.chatPage.classList.contains('active') && elements.chatPage.dataset.matchId === matchId) {
            addMessageToChat(message);
            message.read = true;
        } else {
            // Mostrar notificação se não estiver no chat
            const otherUser = dataModule.appData.users.find(u => u.id === otherUserId);
            if (otherUser) {
                showNotification(`Nova mensagem de ${otherUser.name}`);
            }
        }
        
        // Tocar som de mensagem
        if (sounds.message) {
            sounds.message.play().catch(e => console.log('Erro ao tocar som:', e));
        }
        
        // Salvar no localStorage
        dataModule.saveToLocalStorage();
    }
    
    // Renderizar missões
    function renderQuests() {
        if (!elements.questsList) return;
        
        elements.questsList.innerHTML = '';
        
        dataModule.appData.quests.forEach(quest => {
            const questCard = document.createElement('div');
            questCard.className = 'card quest-card';
            
            // Verificar se o usuário já está nesta missão
            const isJoined = quest.participants.includes(dataModule.appData.currentUser.id);
            
            // Obter avatares dos participantes
            let participantsHtml = '';
            quest.participants.forEach(participantId => {
                const participant = dataModule.appData.users.find(user => user.id === participantId) || dataModule.appData.currentUser;
                participantsHtml += `<img src="${participant.avatar}" alt="Participante" class="participant-avatar">`;
            });
            
            // Verificar se a missão está cheia
            const isFull = quest.participants.length >= quest.maxParticipants;
            
            questCard.innerHTML = `
                <div class="quest-title">
                    <span>${quest.icon}</span>
                    <span>${quest.title}</span>
                </div>
                <div class="quest-description">${quest.description}</div>
                <div class="quest-participants">
                    ${participantsHtml}
                    <span class="participant-count">${quest.participants.length}/${quest.maxParticipants}</span>
                </div>
                <button class="btn ${isJoined ? 'btn-secondary' : ''} ${isFull ? 'disabled' : ''} join-quest-btn" data-quest-id="${quest.id}">
                    ${isJoined ? 'Juntado ✓' : isFull ? 'Lotado' : 'Entrar na Missão'}
                </button>
            `;
            
            // Adicionar evento de clique no botão
            const joinBtn = questCard.querySelector('.join-quest-btn');
            if (joinBtn && !isFull) {
                joinBtn.addEventListener('click', () => toggleQuestJoin(quest.id));
            }
            
            elements.questsList.appendChild(questCard);
        });
    }
    
    // Alternar participação na missão
    function toggleQuestJoin(questId) {
        const quest = dataModule.appData.quests.find(q => q.id === questId);
        if (!quest) return;
        
        const isJoined = quest.participants.includes(dataModule.appData.currentUser.id);
        
        if (isJoined) {
            // Remover da missão
            quest.participants = quest.participants.filter(id => id !== dataModule.appData.currentUser.id);
            showNotification('Você saiu da missão');
        } else {
            // Entrar na missão
            quest.participants.push(dataModule.appData.currentUser.id);
            dataModule.appData.stats.questsJoined++;
            showNotification('Você entrou na missão! 🎮');
            checkAndShowAchievements();
        }
        
        // Atualizar a renderização
        renderQuests();
        
        // Salvar no localStorage
        dataModule.saveToLocalStorage();
    }
    
    // Renderizar conquistas
    function renderAchievements() {
        if (!elements.achievementsGrid) return;
        
        elements.achievementsGrid.innerHTML = '';
        
        dataModule.appData.achievements.forEach(achievement => {
            const achievementCard = document.createElement('div');
            achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            
            let progressText = '';
            if (!achievement.unlocked) {
                // Mostrar progresso para conquistas não desbloqueadas
                if (achievement.id === 'first_like') {
                    progressText = `Progresso: ${dataModule.appData.stats.likesGiven}/1`;
                } else if (achievement.id === 'match_maker') {
                    progressText = `Progresso: ${dataModule.appData.stats.matchesMade}/5`;
                } else if (achievement.id === 'chatter') {
                    progressText = `Progresso: ${dataModule.appData.stats.messagesSent}/20`;
                } else if (achievement.id === 'quest_master') {
                    progressText = `Progresso: ${dataModule.appData.stats.questsJoined}/3`;
                } else if (achievement.id === 'super_fan') {
                    progressText = `Progresso: ${dataModule.appData.stats.superLikesGiven || 0}/10`;
                } else if (achievement.id === 'social_butterfly') {
                    progressText = `Progresso: ${dataModule.appData.stats.matchesMade}/8`;
                }
            }
            
            achievementCard.innerHTML = `
                <span class="achievement-icon">${achievement.icon}</span>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
                ${progressText ? `<div class="achievement-progress">${progressText}</div>` : ''}
                ${achievement.unlocked && achievement.unlockedAt ? 
                    `<div class="achievement-progress">Desbloqueada em ${new Date(achievement.unlockedAt).toLocaleDateString()}</div>` : ''}
            `;
            
            elements.achievementsGrid.appendChild(achievementCard);
        });
    }
    
    // Mostrar notificação
    function showNotification(message) {
        if (!elements.notification || !elements.notificationText) return;
        
        elements.notificationText.textContent = message;
        elements.notification.classList.add('show');
        
        // Auto-esconder após 5 segundos
        setTimeout(() => {
            hideNotification();
        }, 5000);
    }
    
    // Esconder notificação
    function hideNotification() {
        if (elements.notification) {
            elements.notification.classList.remove('show');
        }
    }
    
    // API pública
    return {
        init
    };
})();

// Inicializar o aplicativo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    crushApp.init();
});