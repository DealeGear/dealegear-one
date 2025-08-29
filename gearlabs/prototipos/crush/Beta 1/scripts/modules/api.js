// API module for data management
class API {
    constructor() {
        this.initialized = false;
        this.users = [];
        this.quests = [];
        this.events = [];
        this.currentUser = null;
        this.matches = [];
        this.chats = [];
        this.dailyCardCount = 0;
        this.lastCardResetDate = null;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Load data from localStorage or initialize with mock data
            await this.loadData();
            
            // Check if we need to reset daily card count
            this.checkDailyCardReset();
            
            this.initialized = true;
            console.log('API initialized');
        } catch (error) {
            console.error('Error initializing API:', error);
            throw error;
        }
    }

    async loadData() {
        // Try to load data from localStorage
        const savedData = localStorage.getItem('crush_data');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            this.users = data.users || [];
            this.quests = data.quests || [];
            this.events = data.events || [];
            this.currentUser = data.currentUser || null;
            this.matches = data.matches || [];
            this.chats = data.chats || [];
            this.dailyCardCount = data.dailyCardCount || 0;
            this.lastCardResetDate = data.lastCardResetDate || null;
        } else {
            // Load mock data
            await this.loadMockData();
        }
    }

    async saveData() {
        const data = {
            users: this.users,
            quests: this.quests,
            events: this.events,
            currentUser: this.currentUser,
            matches: this.matches,
            chats: this.chats,
            dailyCardCount: this.dailyCardCount,
            lastCardResetDate: this.lastCardResetDate
        };
        
        localStorage.setItem('crush_data', JSON.stringify(data));
    }

    async loadMockData() {
        try {
            // Fetch mock data from JSON files
            const [usersResponse, questsResponse, eventsResponse] = await Promise.all([
                fetch('/data/users.json'),
                fetch('/data/quests.json'),
                fetch('/data/events.json')
            ]);
            
            if (usersResponse.ok) {
                this.users = await usersResponse.json();
            } else {
                throw new Error('Failed to load users data');
            }
            
            if (questsResponse.ok) {
                this.quests = await questsResponse.json();
            } else {
                throw new Error('Failed to load quests data');
            }
            
            if (eventsResponse.ok) {
                this.events = await eventsResponse.json();
            } else {
                throw new Error('Failed to load events data');
            }
            
            // Initialize empty collections
            this.matches = [];
            this.chats = [];
            this.dailyCardCount = 0;
            this.lastCardResetDate = new Date().toDateString();
            
            // Save initial data
            await this.saveData();
        } catch (error) {
            console.error('Error loading mock data:', error);
            throw error;
        }
    }

    checkDailyCardReset() {
        const today = new Date().toDateString();
        if (this.lastCardResetDate !== today) {
            this.dailyCardCount = 0;
            this.lastCardResetDate = today;
            this.saveData();
        }
    }

    // User methods
    async getCurrentUser() {
        return this.currentUser;
    }

    async updateUser(userData) {
        if (!this.currentUser) return null;
        
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex === -1) return null;
        
        // Update user data
        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        this.currentUser = this.users[userIndex];
        
        await this.saveData();
        return this.currentUser;
    }

    async createUser(userData) {
        const newUser = {
            id: `u_${Date.now()}`,
            ...userData,
            badges: userData.badges || [],
            verified: userData.verified || false,
            photos: userData.photos || [],
            response_rate: 0.5,
            xp: 0,
            level: 1,
            createdAt: new Date().toISOString()
        };
        
        this.users.push(newUser);
        this.currentUser = newUser;
        
        await this.saveData();
        return newUser;
    }

    async getUsersForDiscovery() {
        if (!this.currentUser) return [];
        
        // Filter out current user and already seen users
        const seenUserIds = this.getSeenUserIds();
        const availableUsers = this.users.filter(user => 
            user.id !== this.currentUser.id && 
            !seenUserIds.includes(user.id)
        );
        
        // Calculate compatibility for each user
        const usersWithCompatibility = availableUsers.map(user => ({
            ...user,
            compatibility: this.calculateCompatibility(this.currentUser, user)
        }));
        
        // Sort by compatibility
        usersWithCompatibility.sort((a, b) => b.compatibility - a.compatibility);
        
        return usersWithCompatibility;
    }

    getSeenUserIds() {
        // Get users that have been seen today
        const today = new Date().toDateString();
        const todaySwipes = JSON.parse(localStorage.getItem(`swipes_${today}`) || '[]');
        return todaySwipes.map(swipe => swipe.userId);
    }

    async recordSwipe(userId, action) {
        const today = new Date().toDateString();
        const todaySwipes = JSON.parse(localStorage.getItem(`swipes_${today}`) || '[]');
        
        // Add new swipe
        todaySwipes.push({
            userId,
            action,
            timestamp: new Date().toISOString()
        });
        
        // Save swipes
        localStorage.setItem(`swipes_${today}`, JSON.stringify(todaySwipes));
        
        // Increment daily card count
        this.dailyCardCount++;
        await this.saveData();
        
        // Check if it's a match
        if (action === 'like' || action === 'superlike') {
            const otherUserSwipes = this.getUserSwipes(userId);
            const likedBack = otherUserSwipes.some(swipe => 
                swipe.userId === this.currentUser.id && 
                (swipe.action === 'like' || swipe.action === 'superlike')
            );
            
            if (likedBack) {
                // Create a match
                await this.createMatch(userId);
                return { match: true };
            }
        }
        
        return { match: false };
    }

    getUserSwipes(userId) {
        // Get all swipes for a user across all days
        const allSwipes = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('swipes_')) {
                const swipes = JSON.parse(localStorage.getItem(key) || '[]');
                allSwipes.push(...swipes);
            }
        }
        
        return allSwipes.filter(swipe => swipe.userId === userId);
    }

    async createMatch(userId) {
        const match = {
            id: `m_${Date.now()}`,
            users: [this.currentUser.id, userId],
            createdAt: new Date().toISOString(),
            messages: []
        };
        
        this.matches.push(match);
        
        // Create a chat
        const chat = {
            id: `c_${Date.now()}`,
            matchId: match.id,
            participants: [this.currentUser.id, userId],
            messages: [],
            xp: 0,
            level: 1,
            icebreakers: this.generateIcebreakers(),
            minigameCompleted: false
        };
        
        this.chats.push(chat);
        
        await this.saveData();
        return match;
    }

    calculateCompatibility(userA, userB) {
        // Simple compatibility algorithm based on shared interests
        const interestsA = userA.interests || [];
        const interestsB = userB.interests || [];
        
        // Find common interests
        const commonInterests = interestsA.filter(interest => interestsB.includes(interest));
        
        // Calculate Jaccard similarity
        const union = new Set([...interestsA, ...interestsB]);
        const intersection = commonInterests.length;
        const similarity = union.size > 0 ? intersection / union.size : 0;
        
        // Convert to percentage
        return Math.round(similarity * 100);
    }

    generateIcebreakers() {
        // This would be implemented with actual icebreaker questions
        return [
            "Qual é o seu jogo/filme/série geek favorito e por quê?",
            "Se você pudesse ter qualquer superpoder, qual seria e como usaria para o bem?",
            "Qual universo ficcional você gostaria de visitar e o que faria lá?",
            "Se você fosse um personagem de RPG, qual seria sua classe e alinhamento?",
            "Qual tecnologia ou invenção fictícia você mais gostaria que existisse de verdade?"
        ];
    }

    // Quest methods
    async getQuests() {
        return this.quests;
    }

    async joinQuest(questId) {
        const quest = this.quests.find(q => q.id === questId);
        if (!quest) return null;
        
        // Add user to quest participants
        if (!quest.participants) {
            quest.participants = [];
        }
        
        if (!quest.participants.includes(this.currentUser.id)) {
            quest.participants.push(this.currentUser.id);
            await this.saveData();
        }
        
        return quest;
    }

    async leaveQuest(questId) {
        const quest = this.quests.find(q => q.id === questId);
        if (!quest || !quest.participants) return null;
        
        // Remove user from quest participants
        quest.participants = quest.participants.filter(id => id !== this.currentUser.id);
        await this.saveData();
        
        return quest;
    }

    // Event methods
    async getEvents() {
        return this.events;
    }

    async joinEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return null;
        
        // Add user to event participants
        if (!event.participants) {
            event.participants = [];
        }
        
        if (!event.participants.includes(this.currentUser.id)) {
            event.participants.push(this.currentUser.id);
            await this.saveData();
        }
        
        return event;
    }

    async leaveEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event || !event.participants) return null;
        
        // Remove user from event participants
        event.participants = event.participants.filter(id => id !== this.currentUser.id);
        await this.saveData();
        
        return event;
    }

    // Chat methods
    async getChats() {
        if (!this.currentUser) return [];
        
        // Return chats where current user is a participant
        return this.chats.filter(chat => 
            chat.participants.includes(this.currentUser.id)
        );
    }

    async getChat(chatId) {
        return this.chats.find(chat => chat.id === chatId);
    }

    async sendMessage(chatId, message) {
        const chat = await this.getChat(chatId);
        if (!chat) return null;
        
        const newMessage = {
            id: `msg_${Date.now()}`,
            senderId: this.currentUser.id,
            content: message,
            timestamp: new Date().toISOString()
        };
        
        chat.messages.push(newMessage);
        
        // Update chat XP
        chat.xp += 5;
        
        await this.saveData();
        return newMessage;
    }

    // Settings methods
    async exportData() {
        const data = {
            users: this.users,
            quests: this.quests,
            events: this.events,
            currentUser: this.currentUser,
            matches: this.matches,
            chats: this.chats
        };
        
        return JSON.stringify(data, null, 2);
    }

    async clearData() {
        // Clear all data except mock data
        this.currentUser = null;
        this.matches = [];
        this.chats = [];
        this.dailyCardCount = 0;
        this.lastCardResetDate = new Date().toDateString();
        
        // Clear swipes
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('swipes_')) {
                localStorage.removeItem(key);
            }
        }
        
        await this.saveData();
    }
}

// Initialize and export API
const api = new API();
export const initAPI = () => api.init();
export default api;