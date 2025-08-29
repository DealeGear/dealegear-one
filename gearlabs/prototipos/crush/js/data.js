// Dados do aplicativo
const appData = {
    currentUser: null,
    users: [],
    matches: [],
    messages: {},
    quests: [],
    achievements: [],
    currentUserIndex: 0,
    stats: {
        likesGiven: 0,
        matchesMade: 0,
        messagesSent: 0,
        questsJoined: 0
    }
};

// Lista de conquistas
const achievementDefinitions = [
    {
        id: 'first_like',
        title: 'Primeira Curtida',
        description: 'Dê sua primeira curtida',
        icon: '👍',
        condition: (stats) => stats.likesGiven >= 1
    },
    {
        id: 'match_maker',
        title: 'Match Maker',
        description: 'Faça 5 matches',
        icon: '💕',
        condition: (stats) => stats.matchesMade >= 5
    },
    {
        id: 'chatter',
        title: 'Conversador',
        description: 'Envie 20 mensagens',
        icon: '💬',
        condition: (stats) => stats.messagesSent >= 20
    },
    {
        id: 'quest_master',
        title: 'Mestre das Missões',
        description: 'Participe de 3 missões',
        icon: '🏆',
        condition: (stats) => stats.questsJoined >= 3
    },
    {
        id: 'super_fan',
        title: 'Super Fã',
        description: 'Dê 10 super likes',
        icon: '⭐',
        condition: (stats) => stats.superLikesGiven >= 10
    },
    {
        id: 'social_butterfly',
        title: 'Borboleta Social',
        description: 'Faça match com todos os usuários',
        icon: '🦋',
        condition: (stats) => stats.matchesMade >= 8
    }
];

// Gerar usuários simulados
function generateUsers() {
    if (appData.users.length > 0) return;
    
    const names = ['Alex', 'Taylor', 'Jordan', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn'];
    const interests = ['games', 'sci-fi', 'animes', 'hqs'];
    
    for (let i = 0; i < 8; i++) {
        const userInterests = [];
        const numInterests = Math.floor(Math.random() * 3) + 1;
        
        for (let j = 0; j < numInterests; j++) {
            const interest = interests[Math.floor(Math.random() * interests.length)];
            if (!userInterests.includes(interest)) {
                userInterests.push(interest);
            }
        }
        
        appData.users.push({
            id: i + 1,
            name: names[i],
            age: Math.floor(Math.random() * 15) + 20,
            interests: userInterests,
            avatar: `https://picsum.photos/seed/user${i+1}/400/400.jpg`,
            likedBy: [],
            superLikedBy: [],
            isOnline: Math.random() > 0.3
        });
    }
}

// Gerar missões
function generateQuests() {
    if (appData.quests.length > 0) return;
    
    appData.quests = [
        {
            id: 1,
            title: "Debate de Multiversos",
            description: "Participe de um debate sobre as diferentes teorias de multiversos na ficção científica.",
            icon: "🌌",
            participants: [1, 2, 3],
            maxParticipants: 10
        },
        {
            id: 2,
            title: "Co-op Roguelike",
            description: "Junte-se a um grupo para uma sessão de jogos roguelike em cooperativo.",
            icon: "🎮",
            participants: [4, 5],
            maxParticipants: 4
        },
        {
            id: 3,
            title: "Maratona de Animes",
            description: "Assista a uma temporada completa de um anime clássico com outros fãs.",
            icon: "🌸",
            participants: [6, 7, 8],
            maxParticipants: 8
        },
        {
            id: 4,
            title: "Clube de Leitura de HQs",
            description: "Discuta os últimos arcos de história das principais HQs do momento.",
            icon: "📚",
            participants: [1, 3, 5, 7],
            maxParticipants: 12
        },
        {
            id: 5,
            title: "Torneio de E-Sports",
            description: "Participe de um torneio amistoso de seu jogo favorito.",
            icon: "🏆",
            participants: [2, 4, 6],
            maxParticipants: 16
        }
    ];
}

// Inicializar conquistas
function initializeAchievements() {
    if (appData.achievements.length > 0) return;
    
    achievementDefinitions.forEach(def => {
        appData.achievements.push({
            ...def,
            unlocked: false,
            unlockedAt: null
        });
    });
}

// Verificar conquistas
function checkAchievements() {
    let newAchievements = [];
    
    appData.achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition(appData.stats)) {
            achievement.unlocked = true;
            achievement.unlockedAt = new Date();
            newAchievements.push(achievement);
        }
    });
    
    return newAchievements;
}

// Salvar no localStorage
function saveToLocalStorage() {
    localStorage.setItem('crushAppData', JSON.stringify(appData));
}

// Carregar do localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('crushAppData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.assign(appData, parsedData);
    } else {
        // Inicializar dados se não existirem
        generateUsers();
        generateQuests();
        initializeAchievements();
        saveToLocalStorage();
    }
}

// Exportar funções
window.dataModule = {
    appData,
    generateUsers,
    generateQuests,
    initializeAchievements,
    checkAchievements,
    saveToLocalStorage,
    loadFromLocalStorage
};