// Variáveis globais
let selectedFoods = [];
let chemicalValues = {};
let isSimulating = false;

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderFoodSelection();
    renderChemicalControls();
    initializeChemicalValues();
}

// Configurar event listeners
function setupEventListeners() {
    // Toggle do menu lateral
    document.getElementById('menuToggle').addEventListener('click', toggleSidebar);
    
    // Toggle do tema
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Botão de simulação
    document.getElementById('simulateBtn').addEventListener('click', runSimulation);
    
    // Fechar sidebar ao clicar fora (mobile)
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menuToggle');
        
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Renderizar seleção de alimentos
function renderFoodSelection() {
    const container = document.getElementById('foodSelection');
    container.innerHTML = '';
    
    FOODS.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.dataset.foodId = food.id;
        
        foodItem.innerHTML = `
            <div class="food-info">
                <div class="food-name">${food.name}</div>
                <div class="food-nutrients">
                    Fibra: ${food.nutrients.fiber}% | 
                    Gordura: ${food.nutrients.fat}% | 
                    Proteína: ${food.nutrients.protein}%
                </div>
            </div>
            <div class="food-checkbox">
                <i class="fas fa-check"></i>
            </div>
        `;
        
        foodItem.addEventListener('click', () => toggleFood(food.id));
        container.appendChild(foodItem);
    });
}

// Renderizar controles químicos
function renderChemicalControls() {
    const container = document.getElementById('chemicalControls');
    container.innerHTML = '';
    
    CHEMICALS.forEach(chemical => {
        const chemicalItem = document.createElement('div');
        chemicalItem.className = 'chemical-item';
        
        chemicalItem.innerHTML = `
            <div class="chemical-label">
                <span>${chemical.name}</span>
                <span class="chemical-value" id="${chemical.id}-value">${chemical.defaultValue} ${chemical.unit}</span>
            </div>
            <input type="range" 
                   class="chemical-slider" 
                   id="${chemical.id}-slider"
                   min="${chemical.min}" 
                   max="${chemical.max}" 
                   value="${chemical.defaultValue}"
                   data-chemical-id="${chemical.id}">
        `;
        
        const slider = chemicalItem.querySelector('.chemical-slider');
        slider.addEventListener('input', (e) => updateChemicalValue(chemical.id, e.target.value));
        
        container.appendChild(chemicalItem);
    });
}

// Inicializar valores químicos
function initializeChemicalValues() {
    CHEMICALS.forEach(chemical => {
        chemicalValues[chemical.id] = chemical.defaultValue;
    });
}

// Toggle de alimentos
function toggleFood(foodId) {
    const foodItem = document.querySelector(`[data-food-id="${foodId}"]`);
    const index = selectedFoods.indexOf(foodId);
    
    if (index > -1) {
        selectedFoods.splice(index, 1);
        foodItem.classList.remove('selected');
    } else {
        selectedFoods.push(foodId);
        foodItem.classList.add('selected');
    }
}

// Atualizar valor químico
function updateChemicalValue(chemicalId, value) {
    chemicalValues[chemicalId] = parseFloat(value);
    const chemical = getChemicalById(chemicalId);
    document.getElementById(`${chemicalId}-value`).textContent = `${value} ${chemical.unit}`;
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle tema
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('#themeToggle i');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Executar simulação
async function runSimulation() {
    if (isSimulating) return;
    
    isSimulating = true;
    const simulateBtn = document.getElementById('simulateBtn');
    const originalText = simulateBtn.innerHTML;
    
    // Desabilitar botão e mostrar loading
    simulateBtn.disabled = true;
    simulateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando...';
    
    // Resetar barras de progresso
    resetProgressBars();
    
    // Calcular parâmetros
    const simulationData = calculateSimulationParameters();
    
    // Animar barras de progresso
    await animateProgressBars(simulationData);
    
    // Mostrar resultados
    displayResults(simulationData);
    
    // Restaurar botão
    simulateBtn.disabled = false;
    simulateBtn.innerHTML = originalText;
    isSimulating = false;
}

// Calcular parâmetros da simulação
function calculateSimulationParameters() {
    let totalFiber = 0;
    let totalFat = 0;
    let totalProtein = 0;
    let transitImpact = 0;
    let inflammationRisk = 0;
    let absorptionImpact = 0;
    
    // Calcular impacto dos alimentos
    selectedFoods.forEach(foodId => {
        const food = getFoodById(foodId);
        totalFiber += food.nutrients.fiber;
        totalFat += food.nutrients.fat;
        totalProtein += food.nutrients.protein;
        transitImpact += food.nutrients.transitImpact;
    });
    
    // Normalizar valores (média dos alimentos selecionados)
    const foodCount = selectedFoods.length || 1;
    totalFiber = Math.min(totalFiber / foodCount, 100);
    totalFat = Math.min(totalFat / foodCount, 100);
    totalProtein = Math.min(totalProtein / foodCount, 100);
    transitImpact = transitImpact / foodCount;
    
    // Calcular impacto das substâncias químicas
    CHEMICALS.forEach(chemical => {
        const normalizedValue = chemicalValues[chemical.id] / chemical.max;
        inflammationRisk += normalizedValue * chemical.effects.inflammation;
        absorptionImpact += normalizedValue * chemical.effects.absorption;
        transitImpact += normalizedValue * chemical.effects.transit;
    });
    
    // Calcular tempo de trânsito
    const transitTime = SIMULATION_PARAMS.baseTransitTime + (transitImpact * 24);
    const finalTransitTime = Math.max(SIMULATION_PARAMS.minTransitTime, 
                                     Math.min(SIMULATION_PARAMS.maxTransitTime, transitTime));
    
    // Calcular nível de absorção
    const absorptionLevel = Math.max(0, Math.min(100, 
        SIMULATION_PARAMS.absorptionEfficiency * 100 + absorptionImpact * 20));
    
    // Determinar risco inflamatório
    const riskLevel = inflammationRisk > SIMULATION_PARAMS.inflammationThreshold ? 'Alto' : 
                     inflammationRisk > SIMULATION_PARAMS.inflammationThreshold * 0.5 ? 'Moderado' : 'Baixo';
    
    // Gerar observações
    const observations = generateObservations(totalFiber, totalFat, inflammationRisk, transitImpact);
    
    return {
        fiber: totalFiber,
        fat: totalFat,
        protein: totalProtein,
        transitTime: finalTransitTime,
        absorptionLevel: absorptionLevel,
        inflammationRisk: riskLevel,
        observations: observations
    };
}

// Gerar observações baseadas nos dados
function generateObservations(fiber, fat, inflammation, transit) {
    const observations = [];
    
    if (fiber < 30) {
        observations.push('Baixa ingestão de fibras pode causar constipação e afetar a saúde intestinal.');
    }
    
    if (fat > 60) {
        observations.push('Alto consumo de gorduras pode retardar o trânsito intestinal.');
    }
    
    if (inflammation > 0.5) {
        observations.push('Elevado risco inflamatório devido aos aditivos químicos selecionados.');
    }
    
    if (transit < 0) {
        observations.push('A combinação de alimentos e substâncias pode estar prejudicando o trânsito intestinal.');
    } else if (transit > 0.5) {
        observations.push('Boa combinação para um trânsito intestinal saudável.');
    }
    
    if (observations.length === 0) {
        observations.push('Parâmetros dentro da faixa considerada normal para uma função colo-retal saudável.');
    }
    
    return observations.join(' ');
}

// Resetar barras de progresso
function resetProgressBars() {
    const progressBars = ['fiber', 'glucose', 'protein'];
    progressBars.forEach(type => {
        const progressBar = document.getElementById(`${type}Progress`);
        const progressValue = document.getElementById(`${type}Value`);
        progressBar.style.width = '0%';
        progressValue.textContent = '0%';
    });
}

// Animar barras de progresso
async function animateProgressBars(data) {
    const animations = [
        { id: 'fiber', value: data.fiber, duration: 1000 },
        { id: 'glucose', value: Math.min(100, data.fat * 0.8), duration: 1200 },
        { id: 'protein', value: data.protein, duration: 1400 }
    ];
    
    for (const animation of animations) {
        await animateProgressBar(animation.id, animation.value, animation.duration);
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

// Animar barra de progresso individual
function animateProgressBar(type, targetValue, duration) {
    return new Promise(resolve => {
        const progressBar = document.getElementById(`${type}Progress`);
        const progressValue = document.getElementById(`${type}Value`);
        const startValue = 0;
        const startTime = Date.now();
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startValue + (targetValue - startValue) * easeOutQuad(progress);
            
            progressBar.style.width = `${currentValue}%`;
            progressValue.textContent = `${Math.round(currentValue)}%`;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                resolve();
            }
        }
        
        update();
    });
}

// Função de easing para animação suave
function easeOutQuad(t) {
    return t * (2 - t);
}

// Exibir resultados
function displayResults(data) {
    const resultsPanel = document.getElementById('resultsPanel');
    
    document.getElementById('transitTime').textContent = `${Math.round(data.transitTime)} horas`;
    document.getElementById('absorptionLevel').textContent = `${Math.round(data.absorptionLevel)}%`;
    document.getElementById('inflammatoryRisk').textContent = data.inflammationRisk;
    document.getElementById('observationsText').textContent = data.observations;
    
    resultsPanel.style.display = 'block';
    
    // Scroll suave para os resultados
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}