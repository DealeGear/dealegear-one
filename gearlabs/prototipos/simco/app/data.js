// Dados de alimentos fictícios
const FOODS = [
    {
        id: 'fibra',
        name: 'Alimentos Ricos em Fibras',
        nutrients: {
            fiber: 85,
            fat: 5,
            protein: 15,
            transitImpact: 0.8 // Impacto positivo no trânsito
        },
        description: 'Grãos integrais, vegetais folhosos'
    },
    {
        id: 'carne-vermelha',
        name: 'Carne Vermelha',
        nutrients: {
            fiber: 0,
            fat: 70,
            protein: 90,
            transitImpact: -0.3 // Impacto negativo no trânsito
        },
        description: 'Carne bovina, suína'
    },
    {
        id: 'frutas',
        name: 'Frutas',
        nutrients: {
            fiber: 60,
            fat: 5,
            protein: 10,
            transitImpact: 0.6
        },
        description: 'Maçã, banana, laranja'
    },
    {
        id: 'ultraprocessados',
        name: 'Ultraprocessados',
        nutrients: {
            fiber: 5,
            fat: 80,
            protein: 40,
            transitImpact: -0.5
        },
        description: 'Salgadinhos, doces industrializados'
    },
    {
        id: 'laticinios',
        name: 'Laticínios',
        nutrients: {
            fiber: 0,
            fat: 60,
            protein: 70,
            transitImpact: 0.1
        },
        description: 'Leite, queijos, iogurtes'
    },
    {
        id: 'legumes',
        name: 'Legumes',
        nutrients: {
            fiber: 70,
            fat: 10,
            protein: 30,
            transitImpact: 0.7
        },
        description: 'Feijão, lentilha, grão-de-bico'
    }
];

// Substâncias químicas industrializadas
const CHEMICALS = [
    {
        id: 'sodio',
        name: 'Sódio',
        unit: 'mg',
        min: 0,
        max: 5000,
        defaultValue: 2000,
        effects: {
            inflammation: 0.7, // Impacto na inflamação
            absorption: -0.3, // Impacto na absorção
            transit: -0.2 // Impacto no trânsito
        }
    },
    {
        id: 'conservantes',
        name: 'Conservantes',
        unit: 'mg',
        min: 0,
        max: 1000,
        defaultValue: 100,
        effects: {
            inflammation: 0.8,
            absorption: -0.4,
            transit: -0.1
        }
    },
    {
        id: 'corantes',
        name: 'Corantes Artificiais',
        unit: 'mg',
        min: 0,
        max: 500,
        defaultValue: 50,
        effects: {
            inflammation: 0.6,
            absorption: -0.2,
            transit: 0
        }
    },
    {
        id: 'adocantes',
        name: 'Adoçantes Artificiais',
        unit: 'mg',
        min: 0,
        max: 1000,
        defaultValue: 200,
        effects: {
            inflammation: 0.3,
            absorption: -0.1,
            transit: 0.4
        }
    },
    {
        id: 'gordura-trans',
        name: 'Gordura Trans',
        unit: 'g',
        min: 0,
        max: 20,
        defaultValue: 2,
        effects: {
            inflammation: 0.9,
            absorption: -0.5,
            transit: -0.3
        }
    }
];

// Parâmetros de simulação
const SIMULATION_PARAMS = {
    baseTransitTime: 24, // horas
    maxTransitTime: 72, // horas
    minTransitTime: 12, // horas
    absorptionEfficiency: 0.7, // 70% base
    inflammationThreshold: 0.5
};

// Funções utilitárias
function getFoodById(id) {
    return FOODS.find(food => food.id === id);
}

function getChemicalById(id) {
    return CHEMICALS.find(chemical => chemical.id === id);
}

// Exportar dados para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FOODS,
        CHEMICALS,
        SIMULATION_PARAMS,
        getFoodById,
        getChemicalById
    }
}