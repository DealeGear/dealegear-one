// Compatibility module for calculating user compatibility
class Compatibility {
    constructor() {
        this.weights = {
            interests: 0.5,      // 50% weight for shared interests
            goals: 0.2,         // 20% weight for shared goals
            values: 0.2,       // 20% weight for shared values (from quiz)
            location: 0.1       // 10% weight for location proximity
        };
    }

    calculateCompatibility(userA, userB) {
        // Calculate individual compatibility scores
        const interestsScore = this.calculateInterestsCompatibility(userA, userB);
        const goalsScore = this.calculateGoalsCompatibility(userA, userB);
        const valuesScore = this.calculateValuesCompatibility(userA, userB);
        const locationScore = this.calculateLocationCompatibility(userA, userB);
        
        // Calculate weighted score
        const totalScore = 
            interestsScore * this.weights.interests +
            goalsScore * this.weights.goals +
            valuesScore * this.weights.values +
            locationScore * this.weights.location;
        
        // Return as percentage (0-100)
        return Math.round(totalScore * 100);
    }

    calculateInterestsCompatibility(userA, userB) {
        const interestsA = userA.interests || [];
        const interestsB = userB.interests || [];
        
        if (interestsA.length === 0 || interestsB.length === 0) {
            return 0;
        }
        
        // Calculate Jaccard similarity
        const intersection = interestsA.filter(interest => interestsB.includes(interest));
        const union = new Set([...interestsA, ...interestsB]);
        
        return intersection.length / union.size;
    }

    calculateGoalsCompatibility(userA, userB) {
        const goalsA = userA.goals || [];
        const goalsB = userB.goals || [];
        
        if (goalsA.length === 0 || goalsB.length === 0) {
            return 0;
        }
        
        // Calculate Jaccard similarity
        const intersection = goalsA.filter(goal => goalsB.includes(goal));
        const union = new Set([...goalsA, ...goalsB]);
        
        return intersection.length / union.size;
    }

    calculateValuesCompatibility(userA, userB) {
        const quizA = userA.quizAnswers || {};
        const quizB = userB.quizAnswers || {};
        
        if (Object.keys(quizA).length === 0 || Object.keys(quizB).length === 0) {
            return 0;
        }
        
        // Calculate similarity based on quiz answers
        const questions = Object.keys(quizA);
        let matchingAnswers = 0;
        
        questions.forEach(question => {
            if (quizA[question] === quizB[question]) {
                matchingAnswers++;
            }
        });
        
        return matchingAnswers / questions.length;
    }

    calculateLocationCompatibility(userA, userB) {
        const locationA = userA.city || '';
        const locationB = userB.city || '';
        
        if (!locationA || !locationB) {
            return 0;
        }
        
        // Simple check for same city/state
        if (locationA === locationB) {
            return 1;
        }
        
        // Check for same state
        const stateA = locationA.split('/').pop().trim();
        const stateB = locationB.split('/').pop().trim();
        
        if (stateA === stateB) {
            return 0.7; // 70% compatibility for same state
        }
        
        // Check for same region (simplified)
        const regions = {
            'Norte': ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
            'Nordeste': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
            'Centro-Oeste': ['DF', 'GO', 'MS', 'MT'],
            'Sudeste': ['ES', 'MG', 'RJ', 'SP'],
            'Sul': ['PR', 'RS', 'SC']
        };
        
        for (const region in regions) {
            if (regions[region].includes(stateA) && regions[region].includes(stateB)) {
                return 0.4; // 40% compatibility for same region
            }
        }
        
        return 0; // No location compatibility
    }

    getCompatibilityDetails(userA, userB) {
        const interestsScore = Math.round(this.calculateInterestsCompatibility(userA, userB) * 100);
        const goalsScore = Math.round(this.calculateGoalsCompatibility(userA, userB) * 100);
        const valuesScore = Math.round(this.calculateValuesCompatibility(userA, userB) * 100);
        const locationScore = Math.round(this.calculateLocationCompatibility(userA, userB) * 100);
        
        return {
            interests: {
                score: interestsScore,
                weight: Math.round(this.weights.interests * 100),
                details: this.getInterestsDetails(userA, userB)
            },
            goals: {
                score: goalsScore,
                weight: Math.round(this.weights.goals * 100),
                details: this.getGoalsDetails(userA, userB)
            },
            values: {
                score: valuesScore,
                weight: Math.round(this.weights.values * 100),
                details: this.getValuesDetails(userA, userB)
            },
            location: {
                score: locationScore,
                weight: Math.round(this.weights.location * 100),
                details: this.getLocationDetails(userA, userB)
            }
        };
    }

    getInterestsDetails(userA, userB) {
        const interestsA = userA.interests || [];
        const interestsB = userB.interests || [];
        
        const commonInterests = interestsA.filter(interest => interestsB.includes(interest));
        
        if (commonInterests.length === 0) {
            return {
                common: [],
                message: 'Vocês não têm interesses em comum'
            };
        }
        
        return {
            common: commonInterests,
            message: `Vocês têm ${commonInterests.length} interesse${commonInterests.length > 1 ? 's' : ''} em comum`
        };
    }

    getGoalsDetails(userA, userB) {
        const goalsA = userA.goals || [];
        const goalsB = userB.goals || [];
        
        const commonGoals = goalsA.filter(goal => goalsB.includes(goal));
        
        if (commonGoals.length === 0) {
            return {
                common: [],
                message: 'Vocês buscam objetivos diferentes'
            };
        }
        
        return {
            common: commonGoals,
            message: `Vocês buscam os mesmos objetivos`
        };
    }

    getValuesDetails(userA, userB) {
        const quizA = userA.quizAnswers || {};
        const quizB = userB.quizAnswers || {};
        
        const questions = Object.keys(quizA);
        const matchingAnswers = questions.filter(question => quizA[question] === quizB[question]);
        
        if (matchingAnswers.length === 0) {
            return {
                common: [],
                message: 'Vocês têm valores diferentes'
            };
        }
        
        return {
            common: matchingAnswers,
            message: `Vocês têm ${matchingAnswers.length} valor${matchingAnswers.length > 1 ? 'es' : ''} em comum`
        };
    }

    getLocationDetails(userA, userB) {
        const locationA = userA.city || '';
        const locationB = userB.city || '';
        
        if (!locationA || !locationB) {
            return {
                distance: 'Desconhecida',
                message: 'Localização não informada'
            };
        }
        
        if (locationA === locationB) {
            return {
                distance: 'Mesma cidade',
                message: 'Vocês moram na mesma cidade'
            };
        }
        
        // Check for same state
        const stateA = locationA.split('/').pop().trim();
        const stateB = locationB.split('/').pop().trim();
        
        if (stateA === stateB) {
            return {
                distance: 'Mesmo estado',
                message: 'Vocês moram no mesmo estado'
            };
        }
        
        return {
            distance: 'Distante',
            message: 'Vocês moram em estados diferentes'
        };
    }
}

// Initialize and export Compatibility
const compatibility = new Compatibility();
export default compatibility;