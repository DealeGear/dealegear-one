// I18n module for internationalization
class I18n {
    constructor() {
        this.initialized = false;
        this.dictionary = {};
        this.currentLang = 'pt-BR';
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Load i18n data
            await this.loadDictionary();
            
            // Set up event listener for language changes
            window.addEventListener('i18nUpdate', (e) => {
                if (e.detail.lang) {
                    this.currentLang = e.detail.lang;
                }
                this.updateUI();
            });
            
            this.initialized = true;
            console.log('I18n initialized');
        } catch (error) {
            console.error('Error initializing i18n:', error);
            throw error;
        }
    }

    async loadDictionary() {
        try {
            const response = await fetch('/data/i18n.json');
            if (response.ok) {
                this.dictionary = await response.json();
            } else {
                throw new Error('Failed to load i18n dictionary');
            }
        } catch (error) {
            console.error('Error loading i18n dictionary:', error);
            // Use default dictionary
            this.dictionary = {
                'pt-BR': {
                    // Default Portuguese translations
                    'nav.discover': 'Descobrir',
                    'nav.quests': 'Missões',
                    'nav.events': 'Eventos',
                    'nav.chat': 'Chat',
                    'nav.profile': 'Perfil'
                },
                'en-US': {
                    // Default English translations
                    'nav.discover': 'Discover',
                    'nav.quests': 'Quests',
                    'nav.events': 'Events',
                    'nav.chat': 'Chat',
                    'nav.profile': 'Profile'
                }
            };
        }
    }

    updateUI() {
        // Get current language dictionary
        const langDict = this.dictionary[this.currentLang] || this.dictionary['pt-BR'];
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (langDict[key]) {
                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = langDict[key];
                } else if (element.tagName === 'TITLE') {
                    element.textContent = langDict[key];
                } else {
                    element.textContent = langDict[key];
                }
            }
        });
        
        // Update placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (langDict[key]) {
                element.placeholder = langDict[key];
            }
        });
        
        // Update title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (langDict[key]) {
                element.title = langDict[key];
            }
        });
        
        // Update alt attributes
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (langDict[key]) {
                element.alt = langDict[key];
            }
        });
    }

    translate(key, params = {}) {
        const langDict = this.dictionary[this.currentLang] || this.dictionary['pt-BR'];
        let translation = langDict[key] || key;
        
        // Replace parameters
        for (const param in params) {
            translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
        }
        
        return translation;
    }
}

// Initialize and export I18n
const i18n = new I18n();
export const initI18n = () => i18n.init();
export default i18n;