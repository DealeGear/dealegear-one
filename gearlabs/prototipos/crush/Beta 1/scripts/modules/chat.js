// Chat module for messaging functionality
class Chat {
    constructor() {
        this.initialized = false;
        this.currentChatId = null;
        this.minigames = {
            trivia: {
                title: 'Trivia Geek',
                description: 'Responda perguntas sobre cultura geek juntos',
                questions: [
                    {
                        question: 'Qual é o nome verdadeiro do Batman?',
                        options: ['Bruce Wayne', 'Clark Kent', 'Peter Parker', 'Tony Stark'],
                        correct: 0
                    },
                    {
                        question: 'Em qual ano foi lançado o primeiro filme de Star Wars?',
                        options: ['1975', '1977', '1979', '1981'],
                        correct: 1
                    },
                    {
                        question: 'Quantos horcruxes Voldemort criou?',
                        options: ['5', '6', '7', '8'],
                        correct: 2
                    }
                ]
            },
            puzzle: {
                title: 'Quebra-cabeça Lógico',
                description: 'Resolvam um quebra-cabeça de lógica juntos',
                puzzles: [
                    {
                        question: 'Um homem olha para um retrato e diz: "Irmãos e irmãs eu não tenho, mas o pai desse homem é filho do meu pai". Quem está no retrato?',
                        options: ['Ele mesmo', 'Seu filho', 'Seu pai', 'Seu avô'],
                        correct: 1
                    },
                    {
                        question: 'Se você me disser o nome de uma coisa que você come, eu responderei com o nome de uma coisa que você bebe. Se você me disser o nome de algo que você bebe, eu responderei com o nome de algo que você come. O que eu sou?',
                        options: ['Um robô', 'Um jogo', 'Um espelho', 'Um enigma'],
                        correct: 2
                    }
                ]
            }
        };
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Set up page load event listener
            window.addEventListener('pageLoaded', async (e) => {
                if (e.detail.page === 'chat') {
                    await this.loadChatPage();
                }
            });
            
            this.initialized = true;
            console.log('Chat initialized');
        } catch (error) {
            console.error('Error initializing chat:', error);
            throw error;
        }
    }

    async loadChatPage() {
        const mainContent = document.getElementById('main-content');
        
        // Get user chats
        const chats = await api.getChats();
        
        if (chats.length === 0) {
            mainContent.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <h2 data-i18n="chat.noChats">Nenhuma conversa ainda</h2>
                    <p data-i18n="chat.noChatsDesc">Faça match com alguém para começar a conversar</p>
                    <button class="btn btn-primary" onclick="window.location.hash = '#discover'" data-i18n="chat.goToDiscover">Ir para Descobrir</button>
                </div>
            `;
            
            // Update i18n
            window.dispatchEvent(new CustomEvent('i18nUpdate'));
            return;
        }
        
        // Get chat list
        const chatList = await this.getChatList(chats);
        
        mainContent.innerHTML = `
            <div class="chat-page">
                <div class="chat-list-container">
                    <h1 class="page-title" data-i18n="chat.title">Conversas</h1>
                    <div class="chat-list">
                        ${chatList}
                    </div>
                </div>
                
                <div class="chat-container" id="chat-container">
                    <div class="chat-empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <p data-i18n="chat.selectChat">Selecione uma conversa para começar</p>
                    </div>
                </div>
            </div>
        `;
        
        // Update i18n
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        
        // Set up chat list item click listeners
        document.querySelectorAll('.chat-list-item').forEach(item => {
            item.addEventListener('click', () => {
                const chatId = item.dataset.chatId;
                this.openChat(chatId);
            });
        });
        
        // Open first chat by default
        if (chats.length > 0) {
            this.openChat(chats[0].id);
        }
    }

    async getChatList(chats) {
        const currentUser = await api.getCurrentUser();
        if (!currentUser) return '';
        
        let chatListHTML = '';
        
        for (const chat of chats) {
            // Get other participant
            const otherParticipantId = chat.participants.find(id => id !== currentUser.id);
            const otherUser = (await api.getUsersForDiscovery()).find(user => user.id === otherParticipantId);
            
            if (!otherUser) continue;
            
            // Get last message
            const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
            
            // Format time
            let timeText = '';
            if (lastMessage) {
                const messageDate = new Date(lastMessage.timestamp);
                const today = new Date();
                
                if (messageDate.toDateString() === today.toDateString()) {
                    timeText = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                } else {
                    timeText = messageDate.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
                }
            }
            
            chatListHTML += `
                <div class="chat-list-item" data-chat-id="${chat.id}">
                    <div class="chat-list-avatar">
                        <img src="${otherUser.photos && otherUser.photos.length > 0 ? otherUser.photos[0] : '/assets/avatar-placeholder.svg'}" alt="${otherUser.name}">
                    </div>
                    <div class="chat-list-info">
                        <div class="chat-list-name">${otherUser.name}</div>
                        <div class="chat-list-preview">${lastMessage ? lastMessage.content : 'Nova conversa'}</div>
                    </div>
                    <div class="chat-list-meta">
                        <div class="chat-list-time">${timeText}</div>
                        ${chat.xp >= 50 ? `<div class="chat-list-level">Nível ${chat.level}</div>` : ''}
                    </div>
                </div>
            `;
        }
        
        return chatListHTML;
    }

    async openChat(chatId) {
        this.currentChatId = chatId;
        
        // Get chat data
        const chat = await api.getChat(chatId);
        if (!chat) return;
        
        // Get other participant
        const currentUser = await api.getCurrentUser();
        const otherParticipantId = chat.participants.find(id => id !== currentUser.id);
        const otherUser = (await api.getUsersForDiscovery()).find(user => user.id === otherParticipantId);
        
        if (!otherUser) return;
        
        // Update chat container
        const chatContainer = document.getElementById('chat-container');
        chatContainer.innerHTML = `
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-header-avatar">
                        <img src="${otherUser.photos && otherUser.photos.length > 0 ? otherUser.photos[0] : '/assets/avatar-placeholder.svg'}" alt="${otherUser.name}">
                    </div>
                    <div class="chat-header-details">
                        <div class="chat-header-name">${otherUser.name}</div>
                        <div class="chat-header-status">Online</div>
                    </div>
                </div>
                <div class="chat-header-actions">
                    <button class="icon-btn" id="chat-profile-btn" aria-label="Ver perfil">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                    <button class="icon-btn" id="chat-more-btn" aria-label="Mais opções">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="chat-messages" id="chat-messages">
                ${this.renderMessages(chat.messages)}
            </div>
            
            ${!chat.minigameCompleted ? `
                <div class="icebreaker">
                    <div class="icebreaker-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-color)" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <span data-i18n="chat.icebreaker">Quebra-gelo</span>
                    </div>
                    <div class="icebreaker-content">${chat.icebreakers[0]}</div>
                </div>
            ` : ''}
            
            <div class="chat-input-container">
                <input type="text" class="form-input chat-input" id="chat-input" placeholder="Digite uma mensagem..." data-i18n-placeholder="chat.typeMessage">
                <button class="btn btn-primary btn-icon" id="send-message-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
            
            ${chat.xp >= 30 && !chat.minigameCompleted ? `
                <div class="minigame-container">
                    <div class="minigame-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span data-i18n="chat.minigame">Minijogo Disponível</span>
                    </div>
                    <div class="minigame-content">
                        <p data-i18n="chat.minigameDesc">Joguem um minijogo juntos para ganhar XP e desbloquear novos recursos!</p>
                        <div class="minigame-options">
                            <button class="btn btn-outline" id="trivia-btn" data-i18n="chat.trivia">Trivia Geek</button>
                            <button class="btn btn-outline" id="puzzle-btn" data-i18n="chat.puzzle">Quebra-cabeça</button>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
        
        // Update i18n
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        
        // Set up event listeners
        this.setupChatEventListeners(chatId, otherUser.id);
        
        // Scroll to bottom
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Update active chat in list
        document.querySelectorAll('.chat-list-item').forEach(item => {
            item.classList.toggle('active', item.dataset.chatId === chatId);
        });
    }

    renderMessages(messages) {
        if (messages.length === 0) {
            return `
                <div class="chat-empty-messages">
                    <p data-i18n="chat.noMessages">Nenhuma mensagem ainda. Sejam os primeiros a conversar!</p>
                </div>
            `;
        }
        
        return messages.map(message => {
            const isCurrentUser = message.senderId === (auth.currentUser ? auth.currentUser.id : '');
            const messageDate = new Date(message.timestamp);
            const timeText = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return `
                <div class="chat-message ${isCurrentUser ? 'sent' : 'received'}">
                    <div class="chat-message-avatar">
                        <img src="/assets/avatar-placeholder.svg" alt="Avatar">
                    </div>
                    <div class="chat-message-content">
                        <div class="chat-message-text">${message.content}</div>
                        <div class="chat-message-time">${timeText}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupChatEventListeners(chatId, otherUserId) {
        // Send message
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-message-btn');
        
        const sendMessage = async () => {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Check for toxicity
            const toxicityCheck = toxicity.evaluate(message);
            if (toxicityCheck.score > 0.7) {
                ui.showToast('Sua mensagem contém linguagem inadequada. Por favor, revise-a.', 'error');
                return;
            }
            
            // Send message
            await api.sendMessage(chatId, message);
            
            // Clear input
            chatInput.value = '';
            
            // Add XP
            await gamification.addXP(gamification.xpActions.message, 'message');
            
            // Reload chat
            this.openChat(chatId);
        };
        
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        // Profile button
        const profileBtn = document.getElementById('chat-profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                window.location.hash = `#profile/${otherUserId}`;
            });
        }
        
        // Minigame buttons
        const triviaBtn = document.getElementById('trivia-btn');
        const puzzleBtn = document.getElementById('puzzle-btn');
        
        if (triviaBtn) {
            triviaBtn.addEventListener('click', () => {
                this.startMinigame(chatId, 'trivia');
            });
        }
        
        if (puzzleBtn) {
            puzzleBtn.addEventListener('click', () => {
                this.startMinigame(chatId, 'puzzle');
            });
        }
    }

    async startMinigame(chatId, minigameType) {
        const minigame = this.minigames[minigameType];
        if (!minigame) return;
        
        // Get random question/puzzle
        const items = minigameType === 'trivia' ? minigame.questions : minigame.puzzles;
        const randomItem = items[Math.floor(Math.random() * items.length)];
        
        // Create minigame modal
        const modal = ui.createModal({
            title: minigame.title,
            content: `
                <div class="minigame-modal">
                    <p class="minigame-description">${minigame.description}</p>
                    <div class="minigame-question">
                        <h3>${randomItem.question}</h3>
                    </div>
                    <div class="minigame-options">
                        ${randomItem.options.map((option, index) => `
                            <button class="btn btn-outline minigame-option" data-index="${index}">${option}</button>
                        `).join('')}
                    </div>
                    <div class="minigame-result" id="minigame-result" style="display: none;"></div>
                </div>
            `,
            footer: `
                <button class="btn btn-outline" data-action="close">${ui.currentLang === 'pt-BR' ? 'Fechar' : 'Close'}</button>
            `
        });
        
        // Show modal
        ui.showModal(modal);
        
        // Set up option buttons
        const optionButtons = modal.querySelectorAll('.minigame-option');
        const resultContainer = modal.querySelector('#minigame-result');
        
        optionButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const selectedIndex = parseInt(button.dataset.index);
                const isCorrect = selectedIndex === randomItem.correct;
                
                // Disable all buttons
                optionButtons.forEach(btn => {
                    btn.disabled = true;
                    
                    if (parseInt(btn.dataset.index) === randomItem.correct) {
                        btn.classList.add('btn-secondary');
                    } else if (parseInt(btn.dataset.index) === selectedIndex && !isCorrect) {
                        btn.classList.add('error');
                    }
                });
                
                // Show result
                if (isCorrect) {
                    resultContainer.innerHTML = `
                        <div class="minigame-success">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-color)" stroke-width="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h3>${ui.currentLang === 'pt-BR' ? 'Resposta correta!' : 'Correct answer!'}</h3>
                            <p>${ui.currentLang === 'pt-BR' ? 'Vocês acertaram juntos!' : 'You got it right together!'}</p>
                        </div>
                    `;
                    
                    // Mark minigame as completed
                    const chat = await api.getChat(chatId);
                    if (chat) {
                        chat.minigameCompleted = true;
                        await api.saveData();
                        
                        // Add XP
                        await gamification.addXP(gamification.xpActions.completeMinigame, 'completeMinigame');
                    }
                } else {
                    resultContainer.innerHTML = `
                        <div class="minigame-error">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cf6679" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            <h3>${ui.currentLang === 'pt-BR' ? 'Resposta incorreta' : 'Incorrect answer'}</h3>
                            <p>${ui.currentLang === 'pt-BR' ? 'A resposta correta é:' : 'The correct answer is:'} ${randomItem.options[randomItem.correct]}</p>
                        </div>
                    `;
                }
                
                resultContainer.style.display = 'block';
            });
        });
    }
}

// Initialize and export Chat
const chat = new Chat();
export const initChat = () => chat.init();
export default chat;