// Profile page module
export const initProfilePage = () => {
    // Set up page load event listener
    window.addEventListener('pageLoaded', async (e) => {
        if (e.detail.page === 'profile') {
            await loadProfilePage();
        }
    });
    
    // Set up hash change for profile viewing
    window.addEventListener('hashchange', async () => {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('profile/')) {
            const userId = hash.split('/')[1];
            await loadProfilePage(userId);
        }
    });
};

async function loadProfilePage(userId = null) {
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
                <h2 data-i18n="profile.noUser">Você precisa fazer login</h2>
                <p data-i18n="profile.noUserDesc">Faça login para ver seu perfil</p>
                <button class="btn btn-primary" onclick="location.reload()" data-i18n="profile.reload">Recarregar</button>
            </div>
        `;
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        return;
    }
    
    // Determine if viewing own profile or someone else's
    const isOwnProfile = !userId || userId === currentUser.id;
    const profileUser = isOwnProfile ? currentUser : (await api.getUsersForDiscovery()).find(user => user.id === userId);
    
    if (!profileUser) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <h2 data-i18n="profile.userNotFound">Perfil não encontrado</h2>
                <p data-i18n="profile.userNotFoundDesc">O perfil que você está procurando não existe.</p>
                <button class="btn btn-primary" onclick="window.location.hash = '#discover'" data-i18n="profile.goToDiscover">Voltar para Descobrir</button>
            </div>
        `;
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        return;
    }
    
    // Get compatibility if viewing someone else's profile
    let compatibility = null;
    let compatibilityDetails = null;
    
    if (!isOwnProfile) {
        compatibility = compatibility.calculateCompatibility(currentUser, profileUser);
        compatibilityDetails = compatibility.getCompatibilityDetails(currentUser, profileUser);
    }
    
    // Get user's level progress
    const levelProgress = await gamification.getLevelProgress();
    
    // Render profile page
    mainContent.innerHTML = `
        <div class="profile-page">
            <div class="profile-header">
                <div class="profile-cover">
                    <div class="profile-avatar">
                        <img src="${profileUser.photos && profileUser.photos.length > 0 ? profileUser.photos[0] : '/assets/avatar-placeholder.svg'}" alt="${profileUser.name}">
                    </div>
                </div>
                <div class="profile-info">
                    <div class="profile-name-container">
                        <h1 class="profile-name">${profileUser.name}, ${profileUser.age}</h1>
                        ${profileUser.verified ? `
                            <span class="badge badge-verified">
                                <svg class="verified-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Verificado
                            </span>
                        ` : ''}
                    </div>
                    <div class="profile-details">
                        <div class="profile-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            ${profileUser.city}
                        </div>
                        <div class="profile-level">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            Nível ${profileUser.level || 1}
                        </div>
                    </div>
                </div>
                ${isOwnProfile ? `
                    <div class="profile-actions">
                        <button class="btn btn-outline" id="edit-profile-btn" data-i18n="profile.edit">Editar perfil</button>
                    </div>
                ` : `
                    <div class="profile-actions">
                        <button class="btn btn-primary" id="like-profile-btn" data-i18n="profile.like">Curtir</button>
                    </div>
                `}
            </div>
            
            ${levelProgress ? `
                <div class="profile-section">
                    <h2 class="section-title" data-i18n="profile.levelProgress">Progresso de nível</h2>
                    <div class="xp-container">
                        <div class="xp-bar">
                            <div class="xp-progress" style="width: ${levelProgress.progress}%"></div>
                        </div>
                        <div class="xp-text">
                            <span>${levelProgress.xpInLevel} / ${levelProgress.xpNeededForNext} XP</span>
                            <span>Nível ${levelProgress.level}</span>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="profile-section">
                <h2 class="section-title" data-i18n="profile.bio">Sobre mim</h2>
                <p class="profile-bio">${profileUser.bio || 'Sem bio disponível'}</p>
            </div>
            
            <div class="profile-section">
                <h2 class="section-title" data-i18n="profile.interests">Interesses</h2>
                <div class="profile-interests">
                    ${(profileUser.interests || []).map(interest => `
                        <span class="interest-tag">${interest}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="profile-section">
                <h2 class="section-title" data-i18n="profile.goals">O que estou buscando</h2>
                <div class="profile-goals">
                    ${(profileUser.goals || []).map(goal => {
                        const goalLabels = {
                            'namoro': 'Namoro',
                            'amizade': 'Amizade',
                            'squad': 'Squad para eventos',
                            'projetos': 'Co-criação de projetos'
                        };
                        return `<span class="goal-tag">${goalLabels[goal] || goal}</span>`;
                    }).join('')}
                </div>
            </div>
            
            <div class="profile-section">
                <h2 class="section-title" data-i18n="profile.badges">Badges</h2>
                <div class="profile-badges">
                    ${(profileUser.badges || []).map(badge => `
                        <span class="badge badge-primary">${badge}</span>
                    `).join('')}
                </div>
            </div>
            
            ${compatibility !== null ? `
                <div class="profile-section">
                    <h2 class="section-title" data-i18n="profile.compatibility">Compatibilidade</h2>
                    <div class="compatibility-summary">
                        <div class="compatibility-score-large">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span>${compatibility}%</span>
                        </div>
                        <button class="btn btn-outline" id="view-compatibility-btn" data-i18n="profile.viewDetails">Ver detalhes</button>
                    </div>
                </div>
            ` : ''}
            
            ${isOwnProfile ? `
                <div class="profile-section">
                    <h2 class="section-title" data-i18n="profile.reputation">Reputação</h2>
                    <div class="reputation-stats">
                        <div class="reputation-stat">
                            <div class="stat-value">${Math.round((profileUser.response_rate || 0.5) * 100)}%</div>
                            <div class="stat-label" data-i18n="profile.responseRate">Taxa de resposta</div>
                        </div>
                        <div class="reputation-stat">
                            <div class="stat-value">${profileUser.completed_events || 0}</div>
                            <div class="stat-label" data-i18n="profile.completedEvents">Eventos concluídos</div>
                        </div>
                        <div class="reputation-stat">
                            <div class="stat-value">${profileUser.completed_quests || 0}</div>
                            <div class="stat-label" data-i18n="profile.completedQuests">Missões concluídas</div>
                        </div>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h2 class="section-title" data-i18n="profile.aiShield">AI Shield</h2>
                    <div class="ai-shield ai-shield-high">
                        <svg class="ai-shield-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>Proteção alta</span>
                    </div>
                    <p class="ai-shield-description" data-i18n="profile.aiShieldDesc">
                        Seu perfil tem alta proteção contra conteúdo inadequado. Continue mantendo conversas respeitosas.
                    </p>
                </div>
            ` : ''}
        </div>
    `;
    
    // Update i18n
    window.dispatchEvent(new CustomEvent('i18nUpdate'));
    
    // Set up profile actions
    setupProfileActions(profileUser, isOwnProfile, compatibilityDetails);
}

function setupProfileActions(profileUser, isOwnProfile, compatibilityDetails) {
    // Edit profile button
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            showEditProfileModal(profileUser);
        });
    }
    
    // Like profile button
    const likeProfileBtn = document.getElementById('like-profile-btn');
    if (likeProfileBtn) {
        likeProfileBtn.addEventListener('click', async () => {
            const result = await api.recordSwipe(profileUser.id, 'like');
            
            if (result.match) {
                showMatchNotification(profileUser);
            } else {
                ui.showToast('Curtida enviada!', 'success');
            }
        });
    }
    
    // View compatibility button
    const viewCompatibilityBtn = document.getElementById('view-compatibility-btn');
    if (viewCompatibilityBtn && compatibilityDetails) {
        viewCompatibilityBtn.addEventListener('click', () => {
            showCompatibilityDetailsModal(compatibilityDetails);
        });
    }
}

function showEditProfileModal(profileUser) {
    const modal = ui.createModal({
        title: 'Editar perfil',
        content: `
            <div class="edit-profile-form">
                <div class="form-group">
                    <label class="form-label" for="edit-name">Nome</label>
                    <input type="text" id="edit-name" class="form-input" value="${profileUser.name}">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="edit-age">Idade</label>
                    <input type="number" id="edit-age" class="form-input" value="${profileUser.age}" min="18" max="100">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="edit-city">Cidade/UF</label>
                    <input type="text" id="edit-city" class="form-input" value="${profileUser.city}">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="edit-bio">Bio</label>
                    <textarea id="edit-bio" class="form-textarea" rows="3">${profileUser.bio || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Interesses</label>
                    <div class="interests-grid" id="edit-interests">
                        <!-- Interests will be dynamically added here -->
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">O que estou buscando</label>
                    <div class="goals-options">
                        <label class="form-checkbox-label">
                            <input type="checkbox" class="form-checkbox" name="goals" value="namoro" ${profileUser.goals && profileUser.goals.includes('namoro') ? 'checked' : ''}>
                            <span>Namor