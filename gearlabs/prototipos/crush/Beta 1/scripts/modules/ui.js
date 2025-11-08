// UI module for managing user interface
class UI {
    constructor() {
        this.initialized = false;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentLang = localStorage.getItem('lang') || 'pt-BR';
    }

    init() {
        if (this.initialized) return;
        
        try {
            // Set initial theme
            this.setTheme(this.currentTheme);
            
            // Set initial language
            this.setLanguage(this.currentLang);
            
            // Set up theme toggle
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    this.toggleTheme();
                });
            }
            
            // Set up language toggle
            const langToggle = document.getElementById('lang-toggle');
            if (langToggle) {
                langToggle.addEventListener('click', () => {
                    this.toggleLanguage();
                });
            }
            
            // Set up notification button
            const notificationsBtn = document.getElementById('notifications-btn');
            if (notificationsBtn) {
                notificationsBtn.addEventListener('click', () => {
                    this.showNotifications();
                });
            }
            
            // Set up search button
            const searchBtn = document.getElementById('search-btn');
            if (searchBtn) {
                searchBtn.addEventListener('click', () => {
                    this.showSearch();
                });
            }
            
            // Set up modal container
            this.setupModalContainer();
            
            this.initialized = true;
            console.log('UI initialized');
        } catch (error) {
            console.error('Error initializing UI:', error);
            throw error;
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            if (theme === 'dark') {
                themeToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                `;
            } else {
                themeToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    async setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update UI text
        await this.updateUIText();
    }

    async toggleLanguage() {
        const newLang = this.currentLang === 'pt-BR' ? 'en-US' : 'pt-BR';
        await this.setLanguage(newLang);
    }

    async updateUIText() {
        try {
            // Get i18n dictionary
            const response = await fetch('/data/i18n.json');
            const i18n = await response.json();
            const dictionary = i18n[this.currentLang] || i18n['pt-BR'];
            
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (dictionary[key]) {
                    // Handle different element types
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = dictionary[key];
                    } else {
                        element.textContent = dictionary[key];
                    }
                }
            });
            
            // Dispatch custom event for other modules to update their text
            window.dispatchEvent(new CustomEvent('i18nUpdate', { detail: { lang: this.currentLang } }));
        } catch (error) {
            console.error('Error updating UI text:', error);
        }
    }

    showNotifications() {
        // Create a modal with notifications
        const modal = this.createModal({
            title: this.currentLang === 'pt-BR' ? 'Notificações' : 'Notifications',
            content: `
                <div class="notifications-container">
                    <div class="notification-item">
                        <div class="notification-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <div class="notification-content">
                            <h3>${this.currentLang === 'pt-BR' ? 'Novo match!' : 'New match!'}</h3>
                            <p>${this.currentLang === 'pt-BR' ? 'Você fez match com Aiko' : 'You matched with Aiko'}</p>
                        </div>
                        <div class="notification-time">
                            ${this.currentLang === 'pt-BR' ? '2h atrás' : '2h ago'}
                        </div>
                    </div>
                    
                    <div class="notification-item">
                        <div class="notification-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-color)" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        </div>
                        <div class="notification-content">
                            <h3>${this.currentLang === 'pt-BR' ? 'Missão disponível' : 'Quest available'}</h3>
                            <p>${this.currentLang === 'pt-BR' ? 'Nova missão: "Debate de Multiversos"' : 'New quest: "Multiverse Debate"'}</p>
                        </div>
                        <div class="notification-time">
                            ${this.currentLang === 'pt-BR' ? '1d atrás' : '1d ago'}
                        </div>
                    </div>
                    
                    <div class="notification-item">
                        <div class="notification-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div class="notification-content">
                            <h3>${this.currentLang === 'pt-BR' ? 'Evento próximo' : 'Upcoming event'}</h3>
                            <p>${this.currentLang === 'pt-BR' ? 'Board Game Night amanhã' : 'Board Game Night tomorrow'}</p>
                        </div>
                        <div class="notification-time">
                            ${this.currentLang === 'pt-BR' ? '2d atrás' : '2d ago'}
                        </div>
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-outline" data-action="close">${this.currentLang === 'pt-BR' ? 'Fechar' : 'Close'}</button>
            `
        });
        
        // Show modal
        this.showModal(modal);
        
        // Reset notification badge
        const notificationBadge = document.getElementById('notification-count');
        if (notificationBadge) {
            notificationBadge.style.display = 'none';
        }
    }

    showSearch() {
        // Create a modal with search
        const modal = this.createModal({
            title: this.currentLang === 'pt-BR' ? 'Buscar' : 'Search',
            content: `
                <div class="search-container">
                    <div class="search-input-container">
                        <input type="text" class="form-input search-input" placeholder="${this.currentLang === 'pt-BR' ? 'Buscar pessoas, missões, eventos...' : 'Search for people, quests, events...'}">
                        <button class="btn btn-primary search-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="search-filters">
                        <h3>${this.currentLang === 'pt-BR' ? 'Filtros' : 'Filters'}</h3>
                        <div class="filter-options">
                            <div class="filter-option">
                                <label class="form-checkbox-label">
                                    <input type="checkbox" class="form-checkbox" name="filter" value="people">
                                    <span>${this.currentLang === 'pt-BR' ? 'Pessoas' : 'People'}</span>
                                </label>
                            </div>
                            <div class="filter-option">
                                <label class="form-checkbox-label">
                                    <input type="checkbox" class="form-checkbox" name="filter" value="quests">
                                    <span>${this.currentLang === 'pt-BR' ? 'Missões' : 'Quests'}</span>
                                </label>
                            </div>
                            <div class="filter-option">
                                <label class="form-checkbox-label">
                                    <input type="checkbox" class="form-checkbox" name="filter" value="events">
                                    <span>${this.currentLang === 'pt-BR' ? 'Eventos' : 'Events'}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="search-results">
                        <h3>${this.currentLang === 'pt-BR' ? 'Resultados' : 'Results'}</h3>
                        <div class="search-results-container">
                            <p class="search-empty">${this.currentLang === 'pt-BR' ? 'Digite algo para buscar' : 'Type something to search'}</p>
                        </div>
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-outline" data-action="close">${this.currentLang === 'pt-BR' ? 'Fechar' : 'Close'}</button>
            `
        });
        
        // Show modal
        this.showModal(modal);
        
        // Focus on search input
        const searchInput = modal.querySelector('.search-input');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
        
        // Set up search functionality
        this.setupSearch(modal);
    }

    setupSearch(modal) {
        const searchInput = modal.querySelector('.search-input');
        const searchBtn = modal.querySelector('.search-btn');
        const searchResults = modal.querySelector('.search-results-container');
        
        const performSearch = async () => {
            const query = searchInput.value.trim().toLowerCase();
            
            if (!query) {
                searchResults.innerHTML = `<p class="search-empty">${this.currentLang === 'pt-BR' ? 'Digite algo para buscar' : 'Type something to search'}</p>`;
                return;
            }
            
            // Get selected filters
            const filters = Array.from(modal.querySelectorAll('.form-checkbox:checked'))
                .map(checkbox => checkbox.value);
            
            // If no filters selected, search all
            const searchPeople = filters.length === 0 || filters.includes('people');
            const searchQuests = filters.length === 0 || filters.includes('quests');
            const searchEvents = filters.length === 0 || filters.includes('events');
            
            // Perform search
            const results = {
                people: [],
                quests: [],
                events: []
            };
            
            if (searchPeople) {
                const users = await api.getUsersForDiscovery();
                results.people = users.filter(user => 
                    user.name.toLowerCase().includes(query) ||
                    user.bio.toLowerCase().includes(query) ||
                    (user.interests && user.interests.some(interest => interest.toLowerCase().includes(query)))
                );
            }
            
            if (searchQuests) {
                const quests = await api.getQuests();
                results.quests = quests.filter(quest => 
                    quest.title.toLowerCase().includes(query) ||
                    quest.description.toLowerCase().includes(query) ||
                    (quest.tags && quest.tags.some(tag => tag.toLowerCase().includes(query)))
                );
            }
            
            if (searchEvents) {
                const events = await api.getEvents();
                results.events = events.filter(event => 
                    event.title.toLowerCase().includes(query) ||
                    event.description.toLowerCase().includes(query) ||
                    (event.tags && event.tags.some(tag => tag.toLowerCase().includes(query)))
                );
            }
            
            // Display results
            this.displaySearchResults(results, searchResults);
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    displaySearchResults(results, container) {
        let html = '';
        
        if (results.people.length > 0) {
            html += `
                <div class="search-result-section">
                    <h4>${this.currentLang === 'pt-BR' ? 'Pessoas' : 'People'}</h4>
                    <div class="search-result-list">
                        ${results.people.map(user => `
                            <div class="search-result-item user-result" data-user-id="${user.id}">
                                <div class="user-avatar">
                                    <img src="${user.photos && user.photos.length > 0 ? user.photos[0] : '/assets/avatar-placeholder.svg'}" alt="${user.name}">
                                </div>
                                <div class="user-info">
                                    <div class="user-name">${user.name}, ${user.age}</div>
                                    <div class="user-details">${user.city}</div>
                                </div>
                                <div class="user-compatibility">
                                    <span class="compatibility-score">${user.compatibility || 0}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        if (results.quests.length > 0) {
            html += `
                <div class="search-result-section">
                    <h4>${this.currentLang === 'pt-BR' ? 'Missões' : 'Quests'}</h4>
                    <div class="search-result-list">
                        ${results.quests.map(quest => `
                            <div class="search-result-item quest-result" data-quest-id="${quest.id}">
                                <div class="quest-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                </div>
                                <div class="quest-info">
                                    <div class="quest-title">${quest.title}</div>
                                    <div class="quest-details">${quest.mode === 'online' ? 'Online' : 'Presencial'} • ${quest.slots} vagas</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        if (results.events.length > 0) {
            html += `
                <div class="search-result-section">
                    <h4>${this.currentLang === 'pt-BR' ? 'Eventos' : 'Events'}</h4>
                    <div class="search-result-list">
                        ${results.events.map(event => `
                            <div class="search-result-item event-result" data-event-id="${event.id}">
                                <div class="event-date">
                                    <div class="event-day">${new Date(event.dateISO).getDate()}</div>
                                    <div class="event-month">${new Date(event.dateISO).toLocaleString(this.currentLang, { month: 'short' })}</div>
                                </div>
                                <div class="event-info">
                                    <div class="event-title">${event.title}</div>
                                    <div class="event-details">${event.city}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        if (html === '') {
            html = `<p class="search-empty">${this.currentLang === 'pt-BR' ? 'Nenhum resultado encontrado' : 'No results found'}</p>`;
        }
        
        container.innerHTML = html;
        
        // Add click listeners to results
        container.querySelectorAll('.user-result').forEach(result => {
            result.addEventListener('click', () => {
                const userId = result.dataset.userId;
                this.closeModal();
                window.location.hash = `#profile/${userId}`;
            });
        });
        
        container.querySelectorAll('.quest-result').forEach(result => {
            result.addEventListener('click', () => {
                const questId = result.dataset.questId;
                this.closeModal();
                window.location.hash = `#quests/${questId}`;
            });
        });
        
        container.querySelectorAll('.event-result').forEach(result => {
            result.addEventListener('click', () => {
                const eventId = result.dataset.eventId;
                this.closeModal();
                window.location.hash = `#events/${eventId}`;
            });
        });
    }

    setupModalContainer() {
        const modalContainer = document.getElementById('modal-container');
        
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                this.closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    createModal(options) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${options.title}</h2>
                <button class="modal-close" data-action="close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                ${options.content}
            </div>
            ${options.footer ? `
                <div class="modal-footer">
                    ${options.footer}
                </div>
            ` : ''}
        `;
        
        // Add event listeners to action buttons
        modal.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                if (action === 'close') {
                    this.closeModal();
                }
            });
        });
        
        return modal;
    }

    showModal(modal) {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = '';
        modalContainer.appendChild(modal);
        modalContainer.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = '';
        if (type === 'success') {
            icon = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            `;
        } else if (type === 'error') {
            icon = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            `;
        } else if (type === 'info') {
            icon = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            `;
        }
        
        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize and export UI
const ui = new UI();
export const initUI = () => ui.init();
export default ui;