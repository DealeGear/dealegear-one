// Dados simulados - Em um projeto real, isso viria de um arquivo JSON separado
const plantsData = {
    plants: [
        {
            id: 1,
            name: "Açaí",
            scientific: "Euterpe oleracea",
            biome: "Amazônia",
            image: "https://picsum.photos/seed/acai/400/300",
            compounds: ["Antocianinas", "Ácidos graxos", "Fibras"],
            effects: {
                antioxidant: "Alto",
                antiinflammatory: "Médio",
                nutritional: "Alto"
            }
        },
        {
            id: 2,
            name: "Copaíba",
            scientific: "Copaifera langsdorffii",
            biome: "Cerrado",
            image: "https://picsum.photos/seed/copaiba/400/300",
            compounds: ["Óleo-resina", "Ácido copaíbico", "Sesquiterpenos"],
            effects: {
                antiinflammatory: "Alto",
                antimicrobial: "Alto",
                healing: "Alto"
            }
        },
        {
            id: 3,
            name: "Guaraná",
            scientific: "Paullinia cupana",
            biome: "Amazônia",
            image: "https://picsum.photos/seed/guarana/400/300",
            compounds: "['Cafeína', 'Teobromina', 'Taninos']",
            effects: {
                stimulant: "Alto",
                antioxidant: "Médio",
                cognitive: "Alto"
            }
        },
        {
            id: 4,
            name: "Andiroba",
            scientific: "Carapa guianensis",
            biome: "Amazônia",
            image: "https://picsum.photos/seed/andiroba/400/300",
            compounds: ["Limonoides", "Ácidos graxos", "Triterpenos"],
            effects: {
                antiinflammatory: "Alto",
                insectrepellent: "Alto",
                healing: "Médio"
            }
        },
        {
            id: 5,
            name: "Pitanga",
            scientific: "Eugenia uniflora",
            biome: "Mata Atlântica",
            image: "https://picsum.photos/seed/pitanga/400/300",
            compounds: ["Vitamina C", "Antocianinas", "Flavonoides"],
            effects: {
                antioxidant: "Alto",
                vitaminic: "Alto",
                hypoglycemic: "Médio"
            }
        },
        {
            id: 6,
            name: "Jatobá",
            scientific: "Hymenaea courbaril",
            biome: "Cerrado",
            image: "https://picsum.photos/seed/jatoba/400/300",
            compounds: ["Taninos", "Saponinas", "Flavonoides"],
            effects: {
                antiinflammatory: "Alto",
                expectorant: "Alto",
                tonic: "Médio"
            }
        }
    ]
};

// Estado da aplicação
let appState = {
    selectedPlant: null,
    simulationResults: [],
    savedResults: []
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadPlants();
    setupEventListeners();
    loadSavedResults();
    createBubbles();
}

// Carregar plantas no catálogo
function loadPlants() {
    const plantsGrid = document.getElementById('plantsGrid');
    plantsGrid.innerHTML = '';

    plantsData.plants.forEach(plant => {
        const plantCard = createPlantCard(plant);
        plantsGrid.appendChild(plantCard);
    });
}

function createPlantCard(plant) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}" class="plant-image">
        <div class="plant-info">
            <h3 class="plant-name">${plant.name}</h3>
            <p class="plant-scientific">${plant.scientific}</p>
            <span class="plant-biome">${plant.biome}</span>
            <p class="plant-compounds">
                <strong>Compostos:</strong> ${Array.isArray(plant.compounds) ? plant.compounds.join(', ') : plant.compounds}
            </p>
        </div>
    `;
    
    card.addEventListener('click', () => selectPlant(plant));
    return card;
}

// Selecionar planta
function selectPlant(plant) {
    appState.selectedPlant = plant;
    const selectedPlantDiv = document.getElementById('selectedPlant');
    selectedPlantDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <img src="${plant.image}" alt="${plant.name}" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover;">
            <div>
                <h4 style="color: var(--emerald); margin-bottom: 0.25rem;">${plant.name}</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem;">${plant.scientific}</p>
                <span style="color: var(--sky-blue); font-size: 0.75rem;">${plant.biome}</span>
            </div>
        </div>
    `;
    
    document.getElementById('startSimulation').disabled = false;
    
    // Navegar para a seção de simulação
    navigateToSection('simulacao');
}

// Configurar event listeners
function setupEventListeners() {
    // Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    // Menu mobile
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('navMenu').classList.toggle('active');
    });

    // Sliders
    setupSliders();

    // Botões
    document.getElementById('startSimulation').addEventListener('click', startSimulation);
    document.getElementById('helpBtn').addEventListener('click', showHelp);

    // Modal
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Busca
    document.getElementById('searchInput').addEventListener('input', handleSearch);
}

function setupSliders() {
    const sliders = [
        { id: 'quantity', valueId: 'quantityValue', suffix: 'g' },
        { id: 'temperature', valueId: 'temperatureValue', suffix: '°C' },
        { id: 'time', valueId: 'timeValue', suffix: 'min' }
    ];

    sliders.forEach(slider => {
        const element = document.getElementById(slider.id);
        const valueElement = document.getElementById(slider.valueId);
        
        element.addEventListener('input', (e) => {
            valueElement.textContent = e.target.value + slider.suffix;
        });
    });
}

// Navegação entre seções
function navigateToSection(sectionName) {
    // Atualizar links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active');
        }
    });

    // Mostrar seção correspondente
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');

    // Fechar menu mobile
    document.getElementById('navMenu').classList.remove('active');
}

// Iniciar simulação
function startSimulation() {
    if (!appState.selectedPlant) return;

    const method = document.getElementById('method').value;
    const quantity = document.getElementById('quantity').value;
    const temperature = document.getElementById('temperature').value;
    const time = document.getElementById('time').value;

    // Desabilitar botão durante simulação
    const startBtn = document.getElementById('startSimulation');
    startBtn.disabled = true;
    startBtn.textContent = 'Simulando...';

    // Animar barra de progresso
    animateSimulation(method, quantity, temperature, time);
}

function animateSimulation(method, quantity, temperature, time) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const liquid = document.querySelector('.liquid');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
        liquid.style.height = (progress * 0.8) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            completeSimulation(method, quantity, temperature, time);
        }
    }, 100);
}

function completeSimulation(method, quantity, temperature, time) {
    // Gerar resultados simulados
    const results = generateSimulationResults(method, quantity, temperature, time);
    appState.simulationResults = results;

    // Habilitar botão novamente
    const startBtn = document.getElementById('startSimulation');
    startBtn.disabled = false;
    startBtn.textContent = 'Iniciar Simulação';

    // Mostrar resultados
    displayAnalysisResults(results);
    
    // Navegar para análise
    setTimeout(() => {
        navigateToSection('analise');
    }, 500);
}

function generateSimulationResults(method, quantity, temperature, time) {
    const plant = appState.selectedPlant;
    const baseEfficiency = {
        maceracao: 0.6,
        destilacao: 0.8,
        solvente: 0.9
    };

    // Calcular eficiência baseada nos parâmetros
    const tempFactor = temperature / 100;
    const timeFactor = Math.min(time / 180, 1);
    const efficiency = baseEfficiency[method] * tempFactor * timeFactor;

    // Gerar compostos detectados
    const detectedCompounds = Array.isArray(plant.compounds) 
        ? plant.compounds.map(compound => ({
            name: compound,
            concentration: Math.round(efficiency * (50 + Math.random() * 50))
        }))
        : [];

    return {
        plant: plant,
        method: method,
        parameters: {
            quantity: quantity,
            temperature: temperature,
            time: time
        },
        efficiency: Math.round(efficiency * 100),
        compounds: detectedCompounds,
        effects: plant.effects,
        date: new Date().toISOString()
    };
}

function displayAnalysisResults(results) {
    const analysisDiv = document.getElementById('analysisResults');
    
    analysisDiv.innerHTML = `
        <div class="analysis-header">
            <h2 style="color: var(--emerald); margin-bottom: 1rem;">
                Resultados da Extração - ${results.plant.name}
            </h2>
            <div style="display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem;">
                <div>
                    <span style="color: var(--text-secondary);">Método:</span>
                    <strong style="color: var(--gold); margin-left: 0.5rem;">
                        ${results.method.charAt(0).toUpperCase() + results.method.slice(1)}
                    </strong>
                </div>
                <div>
                    <span style="color: var(--text-secondary);">Eficiência:</span>
                    <strong style="color: var(--emerald); margin-left: 0.5rem;">
                        ${results.efficiency}%
                    </strong>
                </div>
            </div>
        </div>

        <div class="compound-grid">
            ${results.compounds.map(compound => `
                <div class="compound-card">
                    <h4 class="compound-name">${compound.name}</h4>
                    <div style="margin: 1rem 0;">
                        <div style="background: var(--dark-border); height: 8px; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${compound.concentration}%; height: 100%; background: var(--gradient);"></div>
                        </div>
                        <p style="text-align: center; margin-top: 0.5rem; color: var(--gold);">
                            ${compound.concentration}%
                        </p>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="chart-container">
            <h3 style="color: var(--sky-blue); margin-bottom: 1rem;">Potencial de Aplicações</h3>
            <div class="chart">
                ${Object.entries(results.effects).map(([effect, level]) => {
                    const height = level === 'Alto' ? 150 : level === 'Médio' ? 100 : 50;
                    return `
                        <div class="chart-bar" style="height: ${height}px;">
                            <span class="chart-label">${effect}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <div style="text-align: center; margin-top: 2rem;">
            <button class="primary-btn" onclick="saveResults()">Salvar Resultados</button>
        </div>
    `;
}

// Salvar resultados
function saveResults() {
    if (!appState.simulationResults) return;

    const result = {
        ...appState.simulationResults,
        id: Date.now()
    };

    appState.savedResults.push(result);
    localStorage.setItem('aloibio_results', JSON.stringify(appState.savedResults));
    
    // Mostrar notificação
    showNotification('Resultados salvos com sucesso!');
    
    // Navegar para banco de resultados
    setTimeout(() => {
        navigateToSection('banco');
        loadSavedResults();
    }, 1000);
}

function loadSavedResults() {
    const saved = localStorage.getItem('aloibio_results');
    if (saved) {
        appState.savedResults = JSON.parse(saved);
    }

    displaySavedResults();
}

function displaySavedResults() {
    const resultsGrid = document.getElementById('resultsGrid');
    
    if (appState.savedResults.length === 0) {
        resultsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p>Nenhum resultado salvo ainda.</p>
                <p style="margin-top: 1rem;">Realize uma simulação e salve os resultados para vê-los aqui.</p>
            </div>
        `;
        return;
    }

    resultsGrid.innerHTML = appState.savedResults.map(result => `
        <div class="result-card">
            <div class="result-header">
                <h3 class="result-title">${result.plant.name}</h3>
                <span class="result-date">${new Date(result.date).toLocaleDateString('pt-BR')}</span>
            </div>
            
            <div class="result-params">
                <div class="param-item">
                    <strong>Método:</strong> ${result.method}
                </div>
                <div class="param-item">
                    <strong>Quantidade:</strong> ${result.parameters.quantity}g
                </div>
                <div class="param-item">
                    <strong>Temperatura:</strong> ${result.parameters.temperature}°C
                </div>
                <div class="param-item">
                    <strong>Tempo:</strong> ${result.parameters.time}min
                </div>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <span style="color: var(--emerald); font-weight: 600;">
                    Eficiência: ${result.efficiency}%
                </span>
            </div>
            
            <div class="result-actions">
                <button class="action-btn" onclick="viewResult(${result.id})">Ver</button>
                <button class="action-btn" onclick="deleteResult(${result.id})">Excluir</button>
            </div>
        </div>
    `).join('');
}

function viewResult(id) {
    const result = appState.savedResults.find(r => r.id === id);
    if (result) {
        appState.simulationResults = result;
        displayAnalysisResults(result);
        navigateToSection('analise');
    }
}

function deleteResult(id) {
    appState.savedResults = appState.savedResults.filter(r => r.id !== id);
    localStorage.setItem('aloibio_results', JSON.stringify(appState.savedResults));
    loadSavedResults();
    showNotification('Resultado excluído com sucesso!');
}

// Busca
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const plantCards = document.querySelectorAll('.plant-card');
    
    plantCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal de ajuda
function showHelp() {
    document.getElementById('helpModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('helpModal').style.display = 'none';
}

// Notificações
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--emerald);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Animações CSS adicionais
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Criar bolhas animadas
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 3 + 's';
        bubblesContainer.appendChild(bubble);
    }
}