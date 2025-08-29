// Toxicity module for content moderation
class Toxicity {
    constructor() {
        this.initialized = false;
        this.toxicityData = null;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Load toxicity data
            await this.loadToxicityData();
            
            this.initialized = true;
            console.log('Toxicity module initialized');
        } catch (error) {
            console.error('Error initializing toxicity module:', error);
            throw error;
        }
    }

    async loadToxicityData() {
        try {
            const response = await fetch('/data/toxicity.json');
            if (response.ok) {
                this.toxicityData = await response.json();
            } else {
                // Use default toxicity data if file not found
                this.toxicityData = {
                    toxicWords: [
                        'palavrão1', 'palavrão2', 'palavrão3',
                        'insulto1', 'insulto2', 'insulto3',
                        'discursoódio1', 'discursoódio2'
                    ],
                    toxicPatterns: [
                        { pattern: /([A-Z\s]{10,})/, weight: 0.3, description: 'Muito uso de letras maiúsculas' },
                        { pattern: /(.{20,})\1{2,}/, weight: 0.5, description: 'Texto repetido muitas vezes' },
                        { pattern /([!?]){5,}/, weight: 0.2, description: 'Muitas pontuações exclamativas' }
                    ],
                    suggestions: [
                        'Tente ser mais respeitoso',
                        'Evite usar linguagem ofensiva',
                        'Seja construtivo em sua comunicação',
                        'Mensagens respeitosas têm maior chance de resposta'
                    ]
                };
            }
        } catch (error) {
            console.error('Error loading toxicity data:', error);
            // Use default toxicity data
            this.toxicityData = {
                toxicWords: [
                    'palavrão1', 'palavrão2', 'palavrão3',
                    'insulto1', 'insulto2', 'insulto3',
                    'discursoódio1', 'discursoódio2'
                ],
                toxicPatterns: [
                    { pattern: /([A-Z\s]{10,})/, weight: 0.3, description: 'Muito uso de letras maiúsculas' },
                    { pattern: /(.{20,})\1{2,}/, weight: 0.5, description: 'Texto repetido muitas vezes' },
                    { pattern: /([!?]){5,}/, weight: 0.2, description: 'Muitas pontuações exclamativas' }
                ],
                suggestions: [
                    'Tente ser mais respeitoso',
                    'Evite usar linguagem ofensiva',
                    'Seja construtivo em sua comunicação',
                    'Mensagens respeitosas têm maior chance de resposta'
                ]
            };
        }
    }

    evaluate(text) {
        if (!this.toxicityData) {
            return {
                score: 0,
                flags: [],
                suggestions: [],
                isToxic: false
            };
        }
        
        const lowerText = text.toLowerCase();
        let score = 0;
        const flags = [];
        
        // Check for toxic words
        for (const word of this.toxicityData.toxicWords) {
            if (lowerText.includes(word.toLowerCase())) {
                score += 0.3;
                flags.push({
                    type: 'word',
                    value: word,
                    message: `Contém linguagem ofensiva: "${word}"`
                });
            }
        }
        
        // Check for toxic patterns
        for (const patternData of this.toxicityData.toxicPatterns) {
            if (patternData.pattern.test(text)) {
                score += patternData.weight;
                flags.push({
                    type: 'pattern',
                    value: patternData.description,
                    message: patternData.description
                });
            }
        }
        
        // Cap score at 1.0
        score = Math.min(score, 1.0);
        
        // Get suggestions
        const suggestions = this.getSuggestions(score, flags);
        
        return {
            score,
            flags,
            suggestions,
            isToxic: score > 0.7
        };
    }

    getSuggestions(score, flags) {
        if (score < 0.3) {
            return [];
        }
        
        const suggestions = [];
        
        // Add general suggestions based on score
        if (score >= 0.3) {
            suggestions.push('Mensagens construtivas aumentam a chance de resposta em 70%');
        }
        
        if (score >= 0.5) {
            suggestions.push('Evite linguagem agressiva para ter melhores conversas');
        }
        
        if (score >= 0.7) {
            suggestions.push('Respeito é fundamental para boas conexões');
        }
        
        // Add specific suggestions based on flags
        for (const flag of flags) {
            if (flag.type === 'word') {
                suggestions.push('Evite usar palavras ofensivas');
            } else if (flag.type === 'pattern') {
                if (flag.value.includes('maiúsculas')) {
                    suggestions.push('Evite escrever em letras maiúsculas');
                } else if (flag.value.includes('repetido')) {
                    suggestions.push('Evite repetir o mesmo texto muitas vezes');
                } else if (flag.value.includes('pontuações')) {
                    suggestions.push('Evite usar muitas pontuações exclamativas');
                }
            }
        }
        
        // Remove duplicates and limit to 3 suggestions
        return [...new Set(suggestions)].slice(0, 3);
    }

    createToxicityWarning(evaluation) {
        const modal = ui.createModal({
            title: ui.currentLang === 'pt-BR' ? 'Aviso de Conteúdo' : 'Content Warning',
            content: `
                <div class="toxicity-warning">
                    <div class="toxicity-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cf6679" stroke-width="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                    <div class="toxicity-content">
                        <h3>${ui.currentLang === 'pt-BR' ? 'Sua mensagem pode ser inadequada' : 'Your message may be inappropriate'}</h3>
                        <div class="toxicity-score">
                            <div class="toxicity-score-bar">
                                <div class="toxicity-score-fill" style="width: ${evaluation.score * 100}%"></div>
                            </div>
                            <div class="toxicity-score-text">${Math.round(evaluation.score * 100)}% ${ui.currentLang === 'pt-BR' ? 'de chance de ser inadequada' : 'chance of being inappropriate'}</div>
                        </div>
                        ${evaluation.flags.length > 0 ? `
                            <div class="toxicity-flags">
                                <h4>${ui.currentLang === 'pt-BR' ? 'Motivos:' : 'Reasons:'}</h4>
                                <ul>
                                    ${evaluation.flags.map(flag => `<li>${flag.message}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${evaluation.suggestions.length > 0 ? `
                            <div class="toxicity-suggestions">
                                <h4>${ui.currentLang === 'pt-BR' ? 'Sugestões:' : 'Suggestions:'}</h4>
                                <ul>
                                    ${evaluation.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-outline" data-action="edit">${ui.currentLang === 'pt-BR' ? 'Editar mensagem' : 'Edit message'}</button>
                <button class="btn btn-primary" data-action="send">${ui.currentLang === 'pt-BR' ? 'Enviar assim mesmo' : 'Send anyway'}</button>
            `
        });
        
        return modal;
    }

    showToxicityWarning(evaluation, onEdit, onSend) {
        const modal = this.createToxicityWarning(evaluation);
        
        // Add event listeners
        modal.querySelector('[data-action="edit"]').addEventListener('click', () => {
            ui.closeModal();
            if (onEdit) onEdit();
        });
        
        modal.querySelector('[data-action="send"]').addEventListener('click', () => {
            ui.closeModal();
            if (onSend) onSend();
        });
        
        // Show modal
        ui.showModal(modal);
    }

    getShieldLevel(score) {
        if (score < 0.3) {
            return 'high';
        } else if (score < 0.7) {
            return 'medium';
        } else {
            return 'low';
        }
    }
}

// Initialize and export Toxicity
const toxicity = new Toxicity();
export const initToxicity = () => toxicity.init();
export default toxicity;