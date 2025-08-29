// Gamification module for XP and levels
class Gamification {
    constructor() {
        this.initialized = false;
        this.xpActions = {
            completeProfile: 100,
            dailyLogin: 10,
            like: 5,
            superlike: 10,
            match: 50,
            message: 5,
            completeMinigame: 30,
            joinQuest: 20,
            completeQuest: 100,
            joinEvent: 20,
            checkInEvent: 50,
            verification: 200
        };
        
        this.levelThresholds = [
            { level: 1, xp: 0, rewards: ['basic_icebreakers'] },
            { level: 2, xp: 100, rewards: ['extra_superlike'] },
            { level: 3, xp: 250, rewards: ['fun_icebreakers'] },
            { level: 4, xp: 500, rewards: ['stickers_pack_1'] },
            { level: 5, xp: 1000, rewards: ['extra_superlike', 'profile_themes'] },
            { level: 6, xp: 2000, rewards: ['creative_icebreakers'] },
            { level: 7, xp: 3500, rewards: ['stickers_pack_2'] },
            { level: 8, xp: 5000, rewards: ['super_superlike'] },
            { level: 9, xp: 7500, rewards: ['event_templates'] },
            { level: 10, xp: 10000, rewards: ['legendary_badge'] }
        ];
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Check for daily login
            await this.checkDailyLogin();
            
            this.initialized = true;
            console.log('Gamification initialized');
        } catch (error) {
            console.error('Error initializing gamification:', error);
            throw error;
        }
    }

    async checkDailyLogin() {
        const currentUser = await api.getCurrentUser();
        if (!currentUser) return;
        
        const today = new Date().toDateString();
        const lastLogin = currentUser.lastLogin ? new Date(currentUser.lastLogin).toDateString() : null;
        
        if (lastLogin !== today) {
            // Award daily login XP
            await this.addXP(this.xpActions.dailyLogin, 'daily_login');
            
            // Update last login
            await api.updateUser({
                lastLogin: new Date().toISOString()
            });
        }
    }

    async addXP(amount, action) {
        const currentUser = await api.getCurrentUser();
        if (!currentUser) return;
        
        // Get current XP and level
        const currentXP = currentUser.xp || 0;
        const newXP = currentXP + amount;
        
        // Calculate new level
        const newLevel = this.calculateLevel(newXP);
        const currentLevel = currentUser.level || 1;
        
        // Update user
        const updatedUser = await api.updateUser({
            xp: newXP,
            level: newLevel
        });
        
        // Check if level up
        if (newLevel > currentLevel) {
            await this.handleLevelUp(currentLevel, newLevel);
        }
        
        // Show XP gained notification
        ui.showToast(`+${amount} XP ${action ? `por ${this.getActionName(action)}` : ''}`, 'success');
        
        return {
            xp: newXP,
            level: newLevel,
            gained: amount
        };
    }

    calculateLevel(xp) {
        for (let i = this.levelThresholds.length - 1; i >= 0; i--) {
            if (xp >= this.levelThresholds[i].xp) {
                return this.levelThresholds[i].level;
            }
        }
        return 1;
    }

    getActionName(action) {
        const actionNames = {
            completeProfile: 'completar perfil',
            dailyLogin: 'login diário',
            like: 'curtir',
            superlike: 'super curtir',
            match: 'match',
            message: 'mensagem',
            completeMinigame: 'minigame',
            joinQuest: 'entrar em missão',
            completeQuest: 'completar missão',
            joinEvent: 'entrar em evento',
            checkInEvent: 'check-in em evento',
            verification: 'verificação'
        };
        
        return actionNames[action] || action;
    }

    async handleLevelUp(oldLevel, newLevel) {
        // Get rewards for new levels
        const rewards = [];
        
        for (let level = oldLevel + 1; level <= newLevel; level++) {
            const levelData = this.levelThresholds.find(threshold => threshold.level === level);
            if (levelData) {
                rewards.push(...levelData.rewards);
            }
        }
        
        // Show level up notification
        ui.showToast(`Parabéns! Você alcançou o nível ${newLevel}!`, 'success');
        
        // Show rewards notification
        if (rewards.length > 0) {
            setTimeout(() => {
                ui.showToast(`Você desbloqueou: ${this.getRewardNames(rewards)}`, 'success');
            }, 1500);
        }
        
        // Add level up badge if applicable
        if (newLevel % 5 === 0) {
            const currentUser = await api.getCurrentUser();
            const badges = currentUser.badges || [];
            const levelBadge = `Level ${newLevel}`;
            
            if (!badges.includes(levelBadge)) {
                badges.push(levelBadge);
                await api.updateUser({ badges });
            }
        }
    }

    getRewardNames(rewards) {
        const rewardNames = {
            basic_icebreakers: 'Quebra-gelos básicos',
            extra_superlike: 'Super curtida extra',
            fun_icebreakers: 'Quebra-gelos divertidos',
            stickers_pack_1: 'Pacote de stickers 1',
            profile_themes: 'Temas de perfil',
            creative_icebreakers: 'Quebra-gelos criativos',
            stickers_pack_2: 'Pacote de stickers 2',
            super_superlike: 'Super super curtida',
            event_templates: 'Templates de eventos',
            legendary_badge: 'Badge lendário'
        };
        
        return rewards.map(reward => rewardNames[reward] || reward).join(', ');
    }

    async getLevelProgress() {
        const currentUser = await api.getCurrentUser();
        if (!currentUser) return null;
        
        const currentXP = currentUser.xp || 0;
        const currentLevel = currentUser.level || 1;
        
        // Find current and next level thresholds
        const currentLevelData = this.levelThresholds.find(threshold => threshold.level === currentLevel);
        const nextLevelData = this.levelThresholds.find(threshold => threshold.level === currentLevel + 1);
        
        if (!currentLevelData) return null;
        
        const currentLevelXP = currentLevelData.xp;
        const nextLevelXP = nextLevelData ? nextLevelData.xp : currentLevelXP + 1000;
        const xpInLevel = currentXP - currentLevelXP;
        const xpNeededForNext = nextLevelXP - currentLevelXP;
        
        return {
            level: currentLevel,
            currentXP,
            nextLevelXP,
            xpInLevel,
            xpNeededForNext,
            progress: Math.min(100, Math.round((xpInLevel / xpNeededForNext) * 100))
        };
    }

    async hasReward(reward) {
        const currentUser = await api.getCurrentUser();
        if (!currentUser) return false;
        
        const currentLevel = currentUser.level || 1;
        
        // Check if user's level is high enough for the reward
        for (const threshold of this.levelThresholds) {
            if (threshold.level <= currentLevel && threshold.rewards.includes(reward)) {
                return true;
            }
        }
        
        return false;
    }

    async getAvailableRewards() {
        const currentUser = await api.getCurrentUser();
        if (!currentUser) return [];
        
        const currentLevel = currentUser.level || 1;
        const availableRewards = [];
        
        // Collect all rewards available at user's level
        for (const threshold of this.levelThresholds) {
            if (threshold.level <= currentLevel) {
                availableRewards.push(...threshold.rewards);
            }
        }
        
        // Remove duplicates
        return [...new Set(availableRewards)];
    }

    async getNextRewards() {
        const currentUser = await api.getCurrentUser();
        if (!currentUser) return [];
        
        const currentLevel = currentUser.level || 1;
        const nextLevelData = this.levelThresholds.find(threshold => threshold.level === currentLevel + 1);
        
        if (!nextLevelData) return [];
        
        return nextLevelData.rewards;
    }
}

// Initialize and export Gamification
const gamification = new Gamification();
export const initGamification = () => gamification.init();
export default gamification;