// Discover page module
export const initDiscoverPage = () => {
    // Set up page load event listener
    window.addEventListener('pageLoaded', async (e) => {
        if (e.detail.page === 'discover') {
            await loadDiscoverPage();
        }
    });
};

async function loadDiscoverPage() {
    const mainContent = document.getElementById('main-content');
    
    // Get current user
    const currentUser = await api.getCurrentUser();
    if (!currentUser) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <h2 data-i18n="discover.noUser">Você precisa fazer login</h2>
                <p data-i18n="discover.noUserDesc">Faça login para descobrir pessoas</p>
                <button class="btn btn-primary" onclick="location.reload()" data-i18n="discover.reload">Recarregar</button>
            </div>
        `;
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        return;
    }
    
    // Check daily card limit
    const DAILY_CARD_LIMIT = 10;
    if (api.dailyCardCount >= DAILY_CARD_LIMIT) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <h2 data-i18n="discover.limitReached">Limite diário atingido</h2>
                <p data-i18n="discover.limitReachedDesc">Você já visualizou ${DAILY_CARD_LIMIT} perfis hoje. Volte amanhã para mais!</p>
                <div class="daily-countdown">
                    <p data-i18n="discover.countdown">Próximos perfis em:</p>
                    <div class="countdown-timer" id="countdown-timer">--:--:--</div>
                </div>
            </div>
        `;
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        
        // Start countdown timer
        startCountdownTimer();
        return;
    }
    
    // Get users for discovery
    const users = await api.getUsersForDiscovery();
    
    if (users.length === 0) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <h2 data-i18n="discover.noUsers">Nenhum perfil disponível</h2>
                <p data-i18n="discover.noUsersDesc">Não há perfis para mostrar no momento. Tente novamente mais tarde.</p>
                <button class="btn btn-primary" onclick="location.reload()" data-i18n="discover.reload">Recarregar</button>
            </div>
        `;
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        return;
    }
    
    // Render discover page
    mainContent.innerHTML = `
        <div class="discover-page">
            <div class="discover-header">
                <h1 class="page-title" data-i18n="discover.title">Descobrir</h1>
                <div class="daily-counter">
                    <span data-i18n="discover.dailyCounter">Perfis hoje:</span>
                    <span class="daily-count">${api.dailyCardCount}/${DAILY_CARD_LIMIT}</span>
                </div>
            </div>
            
            <div class="discover-cards" id="discover-cards">
                ${users.map((user, index) => createProfileCard(user, index === 0)).join('')}
            </div>
            
            <div class="discover-actions">
                <button class="btn btn-icon btn-large btn-pass" id="pass-btn" aria-label="Passar">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <button class="btn btn-icon btn-large btn-superlike" id="superlike-btn" aria-label="Super curtir">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                </button>
                <button class="btn btn-icon btn-large btn-like" id="like-btn" aria-label="Curtir">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    // Update i18n
    window.dispatchEvent(new CustomEvent('i18nUpdate'));
    
    // Set up discover actions
    setupDiscoverActions(users);
}

function createProfileCard(user, isActive) {
    const badges = user.badges || [];
    const interests = user.interests || [];
    
    return `
        <div class="profile-card ${isActive ? 'active' : ''}" data-user-id="${user.id}">
            <img src="${user.photos && user.photos.length > 0 ? user.photos[0] : '/assets/avatar-placeholder.svg'}" alt="${user.name}" class="profile-card-image">
            <div class="profile-card-content">
                <div class="profile-card-header">
                    <div class="profile-card-info">
                        <h2 class="profile-card-name">${user.name}, ${user.age}</h2>
                        <div class="profile-card-details">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            ${user.city}
                            ${user.verified ? `
                                <span class="badge badge-verified">
                                    <svg class="verified-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    Verificado
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    <div class="compatibility-score">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        ${user.compatibility || 0}%
                    </div>
                </div>
                
                <p class="profile-card-bio">${user.bio || 'Sem bio disponível'}</p>
                
                <div class="profile-card-interests">
                    ${interests.map(interest => `
                        <span class="interest-tag">${interest}</span>
                    `).join('')}
                </div>
                
                <div class="profile-card-badges">
                    ${badges.map(badge => `
                        <span class="badge badge-primary">${badge}</span>
                    `).join('')}
                </div>
                
                <div class="profile-card-footer">
                    <button class="btn btn-outline" id="view-profile-${user.id}" data-i18n="discover.viewProfile">Ver perfil completo</button>
                </div>
            </div>
        </div>
    `;
}

function setupDiscoverActions(users) {
    let currentIndex = 0;
    const cards = document.querySelectorAll('.profile-card');
    const passBtn = document.getElementById('pass-btn');
    const likeBtn = document.getElementById('like-btn');
    const superlikeBtn = document.getElementById('superlike-btn');
    
    // Update active card
    const updateActiveCard = () => {
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    };
    
    // Handle pass action
    const handlePass = async () => {
        if (currentIndex >= users.length) return;
        
        const user = users[currentIndex];
        
        // Record swipe
        await api.recordSwipe(user.id, 'pass');
        
        // Animate card
        const card = cards[currentIndex];
        card.style.transform = 'translateX(-100%) rotate(-30deg)';
        card.style.opacity = '0';
        
        // Move to next card
        setTimeout(() => {
            currentIndex++;
            if (currentIndex < users.length) {
                updateActiveCard();
            } else {
                // No more cards
                showNoMoreCards();
            }
        }, 300);
    };
    
    // Handle like action
    const handleLike = async () => {
        if (currentIndex >= users.length) return;
        
        const user = users[currentIndex];
        
        // Record swipe
        const result = await api.recordSwipe(user.id, 'like');
        
        // Animate card
        const card = cards[currentIndex];
        card.style.transform = 'translateX(100%) rotate(30deg)';
        card.style.opacity = '0';
        
        // Show match notification if matched
        if (result.match) {
            setTimeout(() => {
                showMatchNotification(user);
            }, 300);
        }
        
        // Move to next card
        setTimeout(() => {
            currentIndex++;
            if (currentIndex < users.length) {
                updateActiveCard();
            } else {
                // No more cards
                showNoMoreCards();
            }
        }, 300);
    };
    
    // Handle superlike action
    const handleSuperlike = async () => {
        if (currentIndex >= users.length) return;
        
        const user = users[currentIndex];
        
        // Check if user has superlikes available
        const hasSuperlike = await gamification.hasReward('extra_superlike');
        
        if (!hasSuperlike) {
            ui.showToast('Você não tem super curtidas disponíveis', 'error');
            return;
        }
        
        // Record swipe
        const result = await api.recordSwipe(user.id, 'superlike');
        
        // Animate card
        const card = cards[currentIndex];
        card.style.transform = 'translateY(-100%) scale(1.1)';
        card.style.opacity = '0';
        
        // Show match notification if matched
        if (result.match) {
            setTimeout(() => {
                showMatchNotification(user, true);
            }, 300);
        }
        
        // Move to next card
        setTimeout(() => {
            currentIndex++;
            if (currentIndex < users.length) {
                updateActiveCard();
            } else {
                // No more cards
                showNoMoreCards();
            }
        }, 300);
    };
    
    // Set up button listeners
    passBtn.addEventListener('click', handlePass);
    likeBtn.addEventListener('click', handleLike);
    superlikeBtn.addEventListener('click', handleSuperlike);
    
    // Set up keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            handlePass();
        } else if (e.key === 'ArrowRight') {
            handleLike();
        } else if (e.key === 'ArrowUp') {
            handleSuperlike();
        }
    });
    
    // Set up view profile buttons
    users.forEach(user => {
        const viewProfileBtn = document.getElementById(`view-profile-${user.id}`);
        if (viewProfileBtn) {
            viewProfileBtn.addEventListener('click', () => {
                window.location.hash = `#profile/${user.id}`;
            });
        }
    });
}

function showMatchNotification(user, isSuperlike = false) {
    const modal = ui.createModal({
        title: 'É um match!',
        content: `
            <div class="match-notification">
                <div class="match-images">
                    <div class="match-image">
                        <img src="${user.photos && user.photos.length > 0 ? user.photos[0] : '/assets/avatar-placeholder.svg'}" alt="${user.name}">
                    </div>
                    <div class="match-heart">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                    <div class="match-image">
                        <img src="${auth.currentUser && auth.currentUser.photos && auth.currentUser.photos.length > 0 ? auth.currentUser.photos[0] : '/assets/avatar-placeholder.svg'}" alt="Você">
                    </div>
                </div>
                <div class="match-info">
                    <h3>Você e ${user.name} deram match!</h3>
                    <p>${isSuperlike ? 'Foi uma super curtida!' : 'Comecem a conversar!'}</p>
                </div>
            </div>
        `,
        footer: `
            <button class="btn btn-outline" data-action="close">Continuar descobrindo</button>
            <button class="btn btn-primary" data-action="chat">Enviar mensagem</button>
        `
    });
    
    // Add event listeners
    modal.querySelector('[data-action="close"]').addEventListener('click', () => {
        ui.closeModal();
    });
    
    modal.querySelector('[data-action="chat"]').addEventListener('click', () => {
        ui.closeModal();
        window.location.hash = '#chat';
    });
    
    // Show modal
    ui.showModal(modal);
}

function showNoMoreCards() {
    const discoverCards = document.getElementById('discover-cards');
    discoverCards.innerHTML = `
        <div class="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h2 data-i18n="discover.noMoreCards">Não há mais perfis por hoje</h2>
            <p data-i18n="discover.noMoreCardsDesc">Você já viu todos os perfis disponíveis hoje. Volte amanhã para mais!</p>
            <div class="daily-countdown">
                <p data-i18n="discover.countdown">Próximos perfis em:</p>
                <div class="countdown-timer" id="countdown-timer">--:--:--</div>
            </div>
        </div>
    `;
    
    // Update i18n
    window.dispatchEvent(new CustomEvent('i18nUpdate'));
    
    // Start countdown timer
    startCountdownTimer();
}

function startCountdownTimer() {
    const countdownTimer = document.getElementById('countdown-timer');
    if (!countdownTimer) return;
    
    // Calculate time until midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    
    const diff = midnight - now;
    
    // Update timer every second
    const updateTimer = () => {
        const now = new Date();
        const diff = midnight - now;
        
        if (diff <= 0) {
            countdownTimer.textContent = '00:00:00';
            clearInterval(timerInterval);
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    // Initial update
    updateTimer();
    
    // Set interval
    const timerInterval = setInterval(updateTimer, 1000);
    
    // Store interval ID to clear it when needed
    countdownTimer.dataset.intervalId = timerInterval;
}