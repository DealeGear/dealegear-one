import { initAPI } from './modules/api.js';
import { initAuth } from './modules/auth.js';
import { initUI } from './modules/ui.js';
import { initI18n } from './modules/i18n.js';
import { initGamification } from './modules/gamification.js';
import { initChat } from './modules/chat.js';
import { initToxicity } from './modules/toxicity.js';
import { initDiscoverPage } from './pages/discover.js';
import { initProfilePage } from './pages/profile.js';
import { initQuestsPage } from './pages/quests.js';
import { initEventsPage } from './pages/events.js';
import { initSettingsPage } from './pages/settings.js';

// Main app controller
class App {
    constructor() {
        this.currentPage = 'discover';
        this.pages = {
            discover: initDiscoverPage,
            profile: initProfilePage,
            quests: initQuestsPage,
            events: initEventsPage,
            chat: initChat,
            settings: initSettingsPage
        };
    }

    async init() {
        try {
            // Initialize modules
            await initAPI();
            await initI18n();
            await initAuth();
            initUI();
            initGamification();
            initToxicity();
            
            // Initialize pages
            Object.entries(this.pages).forEach(([page, initFn]) => {
                initFn();
            });
            
            // Set up routing
            this.setupRouting();
            
            // Set up PWA
            this.setupPWA();
            
            // Load initial page
            this.loadPage(this.currentPage);
            
            console.log('Crush app initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('Failed to initialize app. Please refresh the page.');
        }
    }

    setupRouting() {
        // Handle navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                this.navigateTo(page);
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.pages[hash]) {
                this.loadPage(hash);
            }
        });
    }

    navigateTo(page) {
        if (this.pages[page]) {
            window.location.hash = `#${page}`;
            this.loadPage(page);
        }
    }

    loadPage(page) {
        if (this.currentPage === page) return;
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === page);
        });
        
        // Load page content
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<div class="loading-container"><div class="loading-spinner"></div><p class="loading-text">Carregando...</p></div>';
        
        // Simulate loading delay
        setTimeout(() => {
            // Page content will be loaded by the respective page module
            this.currentPage = page;
            window.dispatchEvent(new CustomEvent('pageLoaded', { detail: { page } }));
        }, 300);
    }

    setupPWA() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed: ', error);
                    });
            });
        }
    }

    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${message}</span>
        `;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});