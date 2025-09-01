// Dados do sistema
const systemData = {
    mothership: {
        energy: 78,
        depth: 145,
        communication: true,
        autonomousMode: false,
        energyHistory: [65, 68, 70, 72, 75, 78, 80, 82, 85, 87, 85, 83, 80, 78, 75, 73, 70, 68, 65, 63, 60, 58, 55, 53]
    },
    drones: {
        nereus: {
            name: "Nereus",
            function: "Captura de Imagens",
            battery: 85,
            status: "active",
            mission: null,
            temperature: 20.5,
            salinity: 35.2,
            depth: 145
        },
        triton: {
            name: "Triton",
            function: "Coleta de Amostras",
            battery: 72,
            status: "active",
            mission: null,
            temperature: 20.3,
            salinity: 35.4,
            depth: 143
        },
        glaucus: {
            name: "Glaucus",
            function: "Medição de Parâmetros",
            battery: 91,
            status: "active",
            mission: null,
            temperature: 20.7,
            salinity: 35.0,
            depth: 147
        }
    },
    missions: [
        {
            id: 1,
            date: "2025-05-10",
            drone: "Nereus",
            type: "Captura de Imagens",
            status: "Concluída",
            duration: "2h 15m",
            coordinates: "-23.52, -46.63",
            temperature: "20.5°C",
            salinity: "35.2‰",
            visibility: "15m",
            droneSpeed: "3.2 km/h",
            current: "0.8 m/s",
            marineLife: "Alta"
        },
        {
            id: 2,
            date: "2025-05-09",
            drone: "Triton",
            type: "Coleta de Amostras",
            status: "Concluída",
            duration: "3h 30m",
            coordinates: "-23.51, -46.62",
            temperature: "20.3°C",
            salinity: "35.4‰",
            visibility: "12m",
            droneSpeed: "2.8 km/h",
            current: "0.7 m/s",
            marineLife: "Média"
        },
        {
            id: 3,
            date: "2025-05-08",
            drone: "Glaucus",
            type: "Medição de Parâmetros",
            status: "Concluída",
            duration: "1h 45m",
            coordinates: "-23.53, -46.64",
            temperature: "20.7°C",
            salinity: "35.0‰",
            visibility: "18m",
            droneSpeed: "3.5 km/h",
            current: "0.9 m/s",
            marineLife: "Baixa"
        },
        {
            id: 4,
            date: "2025-05-07",
            drone: "Nereus",
            type: "Captura de Imagens",
            status: "Falha",
            duration: "0h 45m",
            coordinates: "-23.50, -46.61",
            temperature: "20.9°C",
            salinity: "34.8‰",
            visibility: "10m",
            droneSpeed: "2.5 km/h",
            current: "1.2 m/s",
            marineLife: "Média"
        },
        {
            id: 5,
            date: "2025-05-06",
            drone: "Triton",
            type: "Coleta de Amostras",
            status: "Concluída",
            duration: "4h 10m",
            coordinates: "-23.54, -46.65",
            temperature: "20.1°C",
            salinity: "35.6‰",
            visibility: "14m",
            droneSpeed: "2.7 km/h",
            current: "0.6 m/s",
            marineLife: "Alta"
        }
    ],
    programs: {
        "basic-exploration": `function basicExploration() {
    // Inicialização
    initializeSensors();
    setDepth(150);
    
    // Mapeamento
    while (battery > 20%) {
        scanArea();
        collectData();
        logPosition();
        
        // Verificar obstáculos
        if (detectObstacle()) {
            avoidObstacle();
        }
        
        // Economizar energia
        if (battery < 30%) {
            powerSaveMode();
        }
    }
    
    // Retorno à nave mãe
    returnToMothership();
}

function initializeSensors() {
    sonar.activate();
    camera.activate();
    thermometer.activate();
    salinityMeter.activate();
    console.log("Sensores inicializados");
}

function scanArea() {
    const areaData = sonar.scan();
    mapArea(areaData);
    return areaData;
}

function collectData() {
    const temperature = thermometer.read();
    const salinity = salinityMeter.read();
    const images = camera.capture();
    
    saveData({
        temperature,
        salinity,
        images,
        timestamp: new Date()
    });
}

function logPosition() {
    const position = gps.getPosition();
    console.log(\`Posição atual: \${position.latitude}, \${position.longitude}\`);
}

function detectObstacle() {
    return sonar.detectObstacles();
}

function avoidObstacle() {
    const direction = calculateAvoidancePath();
    navigate(direction);
}

function powerSaveMode() {
    reduceSpeed();
    dimLights();
    deactivateNonEssentialSystems();
}

function returnToMothership() {
    const mothershipPosition = getMothershipPosition();
    navigateTo(mothershipPosition);
    dock();
}`,
        "image-capture": `function imageCapture() {
    activateCamera('4K');
    setLighting('auto');
    
    for (let i = 0; i < 50; i++) {
        captureImage();
        moveToNextPoint();
        
        // Verificar bateria
        if (battery < 25%) {
            console.log("Bateria baixa, interrompendo captura");
            break;
        }
    }
    
    // Processar imagens
    processImages();
    returnToMothership();
}

function activateCamera(resolution) {
    camera.setResolution(resolution);
    camera.activate();
    console.log(\`Câmera ativada com resolução \${resolution}\`);
}

function setLighting(mode) {
    if (mode === 'auto') {
        lighting.adjustAutomatically();
    } else {
        lighting.setIntensity(mode);
    }
}

function captureImage() {
    const image = camera.capture();
    const metadata = {
        position: gps.getPosition(),
        depth: depthSensor.read(),
        temperature: thermometer.read(),
        timestamp: new Date()
    };
    
    saveImage(image, metadata);
    console.log("Imagem capturada");
}

function moveToNextPoint() {
    const nextPoint = calculateNextCapturePoint();
    navigateTo(nextPoint);
    
    // Estabilizar antes da captura
    stabilize();
}

function processImages() {
    const images = getCapturedImages();
    
    // Aplicar filtros e melhorias
    for (const image of images) {
        image.enhance();
        image.classifyContent();
    }
    
    // Criar mosaico se necessário
    if (images.length > 10) {
        createMosaic(images);
    }
    
    // Compactar para transmissão
    compressImages(images);
}`,
        "sample-collection": `function sampleCollection() {
    activateCollector();
    setContainer('sterile');
    
    while (samples < 10) {
        locateSample();
        collectSample();
        storeSample();
        
        // Verificar bateria
        if (battery < 20%) {
            console.log("Bateria crítica, retornando à nave");
            returnToMothership();
            return;
        }
    }
    
    // Análise preliminar
    performPreliminaryAnalysis();
    returnToMothership();
}

function activateCollector() {
    collector.activate();
    collector.calibrate();
    console.log("Coletor ativado e calibrado");
}

function setContainer(type) {
    if (type === 'sterile') {
        container.sterilize();
    }
    container.prepare();
}

function locateSample() {
    const scanResults = sonar.scan();
    const sampleLocation = identifySampleLocation(scanResults);
    
    if (sampleLocation) {
        navigateTo(sampleLocation);
        return true;
    } else {
        // Procurar em área扩大
        const expandedArea = expandSearchArea();
        searchInArea(expandedArea);
        return false;
    }
}

function collectSample() {
    const sample = collector.extract();
    
    // Registrar metadados
    const metadata = {
        position: gps.getPosition(),
        depth: depthSensor.read(),
        temperature: thermometer.read(),
        salinity: salinityMeter.read(),
        timestamp: new Date()
    };
    
    sample.addMetadata(metadata);
    return sample;
}

function storeSample() {
    const container = findAvailableContainer();
    
    if (container) {
        container.store(sample);
        samples++;
        console.log(\`Amostra armazenada. Total: \${samples}\`);
    } else {
        console.log("Nenhum recipiente disponível");
    }
}

function performPreliminaryAnalysis() {
    for (const sample of container.getSamples()) {
        const analysis = {
            ph: analyzePH(sample),
            composition: analyzeComposition(sample),
            organicContent: analyzeOrganicContent(sample)
        };
        
        sample.addAnalysis(analysis);
    }
}`,
        "topographic-mapping": `function topographicMapping() {
    activateSonar('high-res');
    setPattern('grid');
    
    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
            scanPoint(x, y);
            
            // Verificar bateria
            if (battery < 15%) {
                console.log("Bateria crítica, salvando dados e retornando");
                savePartialMap();
                returnToMothership();
                return;
            }
        }
    }
    
    // Processar dados
    processMapData();
    generate3DModel();
    returnToMothership();
}

function activateSonar(resolution) {
    sonar.setResolution(resolution);
    sonar.activate();
    console.log(\`Sonar ativado com resolução \${resolution}\`);
}

function setPattern(pattern) {
    if (pattern === 'grid') {
        mappingPattern = 'grid';
        gridSpacing = calculateOptimalSpacing();
    } else if (pattern === 'spiral') {
        mappingPattern = 'spiral';
        spiralRadius = 0;
        spiralAngle = 0;
    }
}

function scanPoint(x, y) {
    const position = calculateGridPosition(x, y);
    navigateTo(position);
    stabilize();
    
    const scanData = sonar.scan();
    mapData[x][y] = scanData;
    
    // Verificar anomalias
    if (detectAnomaly(scanData)) {
        markAnomaly(x, y);
        performDetailedScan(x, y);
    }
}

function calculateGridPosition(x, y) {
    const basePosition = getBasePosition();
    const offsetX = x * gridSpacing;
    const offsetY = y * gridSpacing;
    
    return {
        latitude: basePosition.latitude + offsetX,
        longitude: basePosition.longitude + offsetY
    };
}

function detectAnomaly(scanData) {
    // Verificar por variações significativas na topografia
    const surroundingPoints = getSurroundingPoints();
    
    for (const point of surroundingPoints) {
        const difference = Math.abs(scanData.depth - point.depth);
        
        if (difference > ANOMALY_THRESHOLD) {
            return true;
        }
    }
    
    return false;
}

function performDetailedScan(x, y) {
    // Realizar varredura mais detalhada do ponto
    sonar.setResolution('ultra-high');
    const detailedScan = sonar.scan();
    mapData[x][y] = detailedScan;
    sonar.setResolution('high-res');
}

function processMapData() {
    // Interpolar dados para precher lacunas
    interpolateData();
    
    // Suavizar o mapa
    smoothMap();
    
    // Identificar formações geológicas
    identifyFormations();
}

function generate3DModel() {
    const model = createModelFromMapData(mapData);
    applyTextures(model);
    optimizeModel(model);
    saveModel(model);
}`,
        "emergency-management": `function emergencyManagement() {
    if (emergencyDetected()) {
        activateBeacon();
        surfaceImmediately();
        alertBase();
        
        if (battery < 10%) {
            powerSaveMode();
        }
        
        // Avaliar tipo de emergência
        const emergencyType = identifyEmergencyType();
        
        switch (emergencyType) {
            case 'water_leak':
                handleWaterLeak();
                break;
            case 'system_failure':
                handleSystemFailure();
                break;
            case 'entanglement':
                handleEntanglement();
                break;
            case 'low_battery':
                handleLowBattery();
                break;
            default:
                handleGenericEmergency();
        }
        
        // Manter comunicação com a base
        maintainCommunication();
    }
}

function emergencyDetected() {
    // Verificar múltiplos indicadores de emergência
    return (
        waterSensor.detectLeak() ||
        criticalSystem.checkFailure() ||
        entanglementSensor.isEntangled() ||
        battery < EMERGENCY_BATTERY_THRESHOLD ||
        pressureSensor.isCritical()
    );
}

function activateBeacon() {
    emergencyBeacon.activate();
    emergencyBeacon.setMode('distress');
    console.log("Sinal de emergência ativado");
}

function surfaceImmediately() {
    // Priorizar subida à superfície
    deactivateNonEssentialSystems();
    setMaxThrust('vertical');
    navigateToSurface();
}

function alertBase() {
    const emergencyData = {
        type: identifyEmergencyType(),
        position: gps.getPosition(),
        depth: depthSensor.read(),
        battery: battery.getLevel(),
        timestamp: new Date()
    };
    
    communicator.sendEmergencySignal(emergencyData);
    console.log("Alerta de emergência enviado para a base");
}

function identifyEmergencyType() {
    if (waterSensor.detectLeak()) {
        return 'water_leak';
    } else if (criticalSystem.checkFailure()) {
        return 'system_failure';
    } else if (entanglementSensor.isEntangled()) {
        return 'entanglement';
    } else if (battery < EMERGENCY_BATTERY_THRESHOLD) {
        return 'low_battery';
    } else if (pressureSensor.isCritical()) {
        return 'pressure_critical';
    } else {
        return 'unknown';
    }
}

function handleWaterLeak() {
    // Identificar local do vazamento
    const leakLocation = waterSensor.locateLeak();
    
    // Tentar selar o vazamento
    if (sealantSystem.isAvailable()) {
        sealantSystem.apply(leakLocation);
    } else {
        // Isolar área afetada
        isolateCompartment(leakLocation.compartment);
    }
    
    // Monitorar situação
    monitorWaterLevel();
}

function handleSystemFailure() {
    const failedSystem = criticalSystem.getFailedSystem();
    
    // Tentar reiniciar sistema
    if (failedSystem.canRestart()) {
        failedSystem.restart();
    } else {
        // Mudar para sistema redundante
        activateRedundantSystem(failedSystem);
    }
    
    // Reconfigurar operações
    reconfigureForReducedCapability();
}

function handleEntanglement() {
    // Identificar tipo de emaranhamento
    const entanglementType = entanglementSensor.getType();
    
    // Tentar liberar
    switch (entanglementType) {
        case 'fishing_line':
            activateCuttingMechanism();
            break;
        case 'net':
            performEscapeManeuver();
            break;
        case 'vegetation':
            activateCuttingMechanism();
            break;
        default:
            performGenericEscape();
    }
}

function handleLowBattery() {
    powerSaveMode();
    
    // Priorizar sistemas essenciais
    prioritizeEssentialSystems();
    
    // Calcular energia necessária para retornar
    const energyNeeded = calculateEnergyToSurface();
    
    if (battery < energyNeeded) {
        // Ativar modo de sobrevivência
        survivalMode();
    }
}

function maintainCommunication() {
    // Manter comunicação mesmo com pouca energia
    communicator.setLowPowerMode();
    
    // Enviar atualizações periódicas
    const interval = setInterval(() => {
        if (battery > 5%) {
            sendStatusUpdate();
        } else {
            clearInterval(interval);
        }
    }, EMERGENCY_UPDATE_INTERVAL);
}`
    }
};

// Elementos do DOM
const elements = {
    navLinks: document.querySelectorAll('.nav-link'),
    contentSections: document.querySelectorAll('.content-section'),
    menuToggle: document.getElementById('menuToggle'),
    sidebar: document.querySelector('.sidebar'),
    depthSlider: document.getElementById('depth-slider'),
    depthValue: document.getElementById('depth-value'),
    energyConsumption: document.getElementById('energy-consumption'),
    depthAlert: document.getElementById('depth-alert'),
    commToggle: document.getElementById('comm-toggle'),
    autonomousToggle: document.getElementById('autonomous-toggle'),
    launchBuoy: document.getElementById('launch-buoy'),
    energyChart: document.getElementById('energy-chart'),
    mothershipEnergy: document.getElementById('mothership-energy'),
    activeDrones: document.getElementById('active-drones'),
    currentDepth: document.getElementById('current-depth'),
    temperature: document.getElementById('temperature'),
    salinity: document.getElementById('salinity'),
    droneDepth: document.getElementById('drone-depth'),
    missionModal: document.getElementById('mission-modal'),
    programModal: document.getElementById('program-modal'),
    missionSelectModal: document.getElementById('mission-select-modal'),
    notificationContainer: document.getElementById('notification-container'),
    reportsTbody: document.getElementById('reports-tbody'),
    modalCloseButtons: document.querySelectorAll('.modal-close'),
    copyCodeButton: document.getElementById('copy-code'),
    programCode: document.getElementById('program-code'),
    programModalTitle: document.getElementById('program-modal-title'),
    missionButtons: document.querySelectorAll('.mission-btn'),
    returnButtons: document.querySelectorAll('.return-btn'),
    executeButtons: document.querySelectorAll('.execute-btn'),
    programCards: document.querySelectorAll('.program-card'),
    missionOptions: document.querySelectorAll('.mission-option')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    renderEnergyChart();
    renderReportsTable();
    startDataSimulation();
});

// Inicializar aplicação
function initializeApp() {
    // Atualizar UI com dados iniciais
    updateUI();
    
    // Verificar tamanho da tela para ajustar menu
    checkScreenSize();
    
    // Adicionar classe para animações iniciais
    document.body.classList.add('loaded');
}

// Configurar listeners de eventos
function setupEventListeners() {
    // Navegação
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
            
            // Atualizar link ativo
            elements.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Fechar menu em dispositivos móveis
            if (window.innerWidth <= 768) {
                elements.sidebar.classList.remove('active');
            }
        });
    });
    
    // Menu toggle para dispositivos móveis
    elements.menuToggle.addEventListener('click', () => {
        elements.sidebar.classList.toggle('active');
    });
    
    // Controle de profundidade
    elements.depthSlider.addEventListener('input', (e) => {
        const depth = e.target.value;
        elements.depthValue.textContent = depth;
        elements.currentDepth.textContent = depth + 'm';
        elements.droneDepth.textContent = depth + 'm';
        
        // Calcular consumo de energia
        const consumption = (depth / 500 * 30).toFixed(1);
        elements.energyConsumption.textContent = consumption;
        
        // Atualizar dados
        systemData.mothership.depth = parseInt(depth);
        
        // Verificar alerta de profundidade
        if (depth > 400) {
            elements.depthAlert.classList.remove('hidden');
            showNotification('Profundidade máxima recomendada excedida!', 'warning');
        } else {
            elements.depthAlert.classList.add('hidden');
        }
    });
    
    // Toggle de comunicação
    elements.commToggle.addEventListener('change', (e) => {
        systemData.mothership.communication = e.target.checked;
        const status = e.target.checked ? 'ativado' : 'desativado';
        showNotification(`Sistema de comunicação ${status}`, 'success');
    });
    
    // Toggle de modo autônomo
    elements.autonomousToggle.addEventListener('change', (e) => {
        systemData.mothership.autonomousMode = e.target.checked;
        const status = e.target.checked ? 'ativado' : 'desativado';
        showNotification(`Modo autônomo ${status}`, 'success');
        
        if (e.target.checked) {
            // Simular retorno de todos os drones
            returnAllDrones();
        }
    });
    
    // Botão de lançar boia solar
    elements.launchBuoy.addEventListener('click', () => {
        // Simular recarga de energia
        const currentEnergy = systemData.mothership.energy;
        const newEnergy = Math.min(currentEnergy + 15, 100);
        systemData.mothership.energy = newEnergy;
        
        // Atualizar UI
        elements.mothershipEnergy.textContent = newEnergy + '%';
        
        // Adicionar ao histórico de energia
        systemData.mothership.energyHistory.push(newEnergy);
        if (systemData.mothership.energyHistory.length > 24) {
            systemData.mothership.energyHistory.shift();
        }
        
        // Atualizar gráfico
        renderEnergyChart();
        
        // Notificação
        showNotification('Boia solar lançada! Energia recarregada em +15%', 'success');
    });
    
    // Botões dos drones
    elements.missionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const drone = btn.getAttribute('data-drone');
            showMissionSelectModal(drone);
        });
    });
    
    elements.returnButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const drone = btn.getAttribute('data-drone');
            returnDrone(drone);
        });
    });
    
    elements.executeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const drone = btn.getAttribute('data-drone');
            executeDroneFunction(drone);
        });
    });
    
    // Cards de programas
    elements.programCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const program = card.getAttribute('data-program');
            showProgramModal(program);
        });
    });
    
    // Opções de missão
    elements.missionOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const mission = option.getAttribute('data-mission');
            const drone = elements.missionSelectModal.getAttribute('data-drone');
            sendDroneOnMission(drone, mission);
            elements.missionSelectModal.classList.remove('active');
        });
    });
    
    // Fechar modais
    elements.modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Copiar código
    elements.copyCodeButton.addEventListener('click', () => {
        const code = elements.programCode.textContent;
        navigator.clipboard.writeText(code)
            .then(() => {
                showNotification('Código copiado para a área de transferência!', 'success');
            })
            .catch(err => {
                showNotification('Erro ao copiar código', 'error');
            });
    });
    
    // Clique fora do modal para fechar
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Redimensionamento da janela
    window.addEventListener('resize', checkScreenSize);
}

// Mostrar seção
function showSection(sectionId) {
    elements.contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Verificar tamanho da tela
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        elements.sidebar.classList.remove('collapsed');
    } else {
        elements.sidebar.classList.add('collapsed');
    }
}

// Atualizar UI
function updateUI() {
    // Atualizar status da nave mãe
    elements.mothershipEnergy.textContent = systemData.mothership.energy + '%';
    elements.currentDepth.textContent = systemData.mothership.depth + 'm';
    elements.droneDepth.textContent = systemData.mothership.depth + 'm';
    elements.depthSlider.value = systemData.mothership.depth;
    elements.depthValue.textContent = systemData.mothership.depth;
    
    // Atualizar consumo de energia
    const consumption = (systemData.mothership.depth / 500 * 30).toFixed(1);
    elements.energyConsumption.textContent = consumption;
    
    // Atualizar drones ativos
    let activeDrones = 0;
    Object.values(systemData.drones).forEach(drone => {
        if (drone.status === 'active') {
            activeDrones++;
        }
    });
    elements.activeDrones.textContent = `${activeDrones}/3`;
    
    // Atualizar sensores
    elements.temperature.textContent = systemData.drones.nereus.temperature + '°C';
    elements.salinity.textContent = systemData.drones.nereus.salinity + '‰';
    
    // Atualizar baterias dos drones
    updateDroneBatteries();
}

// Atualizar baterias dos drones
function updateDroneBatteries() {
    Object.keys(systemData.drones).forEach(droneId => {
        const drone = systemData.drones[droneId];
        const batteryElement = document.getElementById(`${droneId}-battery`);
        const batteryTextElement = document.getElementById(`${droneId}-battery-text`);
        
        if (batteryElement && batteryTextElement) {
            batteryElement.style.width = drone.battery + '%';
            batteryTextElement.textContent = drone.battery + '%';
            
            // Alterar cor conforme nível de bateria
            if (drone.battery < 20) {
                batteryElement.style.background = 'var(--error-color)';
            } else if (drone.battery < 50) {
                batteryElement.style.background = 'var(--warning-color)';
            } else {
                batteryElement.style.background = 'var(--success-color)';
            }
        }
    });
}

// Renderizar gráfico de energia
function renderEnergyChart() {
    elements.energyChart.innerHTML = '';
    
    systemData.mothership.energyHistory.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${value * 2.5}px`;
        
        // Tooltip
        bar.title = `${index}:00 - ${value}%`;
        
        elements.energyChart.appendChild(bar);
    });
}

// Renderizar tabela de relatórios
function renderReportsTable() {
    elements.reportsTbody.innerHTML = '';
    
    systemData.missions.forEach(mission => {
        const row = document.createElement('tr');
        
        // Status com cores
        let statusClass = '';
        if (mission.status === 'Concluída') {
            statusClass = 'success';
        } else if (mission.status === 'Falha') {
            statusClass = 'error';
        } else {
            statusClass = 'warning';
        }
        
        row.innerHTML = `
            <td>${mission.date}</td>
            <td>${mission.drone}</td>
            <td>${mission.type}</td>
            <td><span class="status-${statusClass}">${mission.status}</span></td>
            <td>
                <button class="table-btn view-mission" data-id="${mission.id}">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        elements.reportsTbody.appendChild(row);
    });
    
    // Adicionar listeners aos botões de visualização
    document.querySelectorAll('.view-mission').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const missionId = parseInt(btn.getAttribute('data-id'));
            showMissionDetails(missionId);
        });
    });
}

// Mostrar detalhes da missão
function showMissionDetails(missionId) {
    const mission = systemData.missions.find(m => m.id === missionId);
    
    if (mission) {
        document.getElementById('modal-drone-name').textContent = mission.drone;
        document.getElementById('modal-collection-type').textContent = mission.type;
        document.getElementById('modal-mission-status').textContent = mission.status;
        document.getElementById('modal-duration').textContent = mission.duration;
        document.getElementById('modal-coordinates').textContent = mission.coordinates;
        document.getElementById('modal-temperature').textContent = mission.temperature;
        document.getElementById('modal-salinity').textContent = mission.salinity;
        document.getElementById('modal-visibility').textContent = mission.visibility;
        document.getElementById('modal-drone-speed').textContent = mission.droneSpeed;
        document.getElementById('modal-current').textContent = mission.current;
        document.getElementById('modal-marine-life').textContent = mission.marineLife;
        
        elements.missionModal.classList.add('active');
    }
}

// Mostrar modal de seleção de missão
function showMissionSelectModal(drone) {
    elements.missionSelectModal.setAttribute('data-drone', drone);
    elements.missionSelectModal.classList.add('active');
}

// Mostrar modal de programa
function showProgramModal(programId) {
    const program = systemData.programs[programId];
    
    if (program) {
        elements.programCode.textContent = program;
        
        // Definir título
        const programNames = {
            'basic-exploration': 'Exploração Básica',
            'image-capture': 'Captura de Imagens',
            'sample-collection': 'Coleta de Amostras',
            'topographic-mapping': 'Mapeamento Topográfico',
            'emergency-management': 'Gerenciamento de Emergências'
        };
        
        elements.programModalTitle.textContent = programNames[programId] || 'Código do Programa';
        elements.programModal.classList.add('active');
    }
}

// Enviar drone em missão
function sendDroneOnMission(droneId, missionType) {
    const drone = systemData.drones[droneId];
    
    if (drone) {
        drone.mission = missionType;
        
        // Simular consumo de bateria
        drone.battery = Math.max(drone.battery - 10, 0);
        updateDroneBatteries();
        
        // Notificação
        const missionNames = {
            'exploration': 'Exploração',
            'sample': 'Coleta de Amostras',
            'imaging': 'Captura de Imagens',
            'measurement': 'Medição'
        };
        
        showNotification(`${drone.name} enviado em missão de ${missionNames[missionType]}`, 'success');
    }
}

// Retornar drone
function returnDrone(droneId) {
    const drone = systemData.drones[droneId];
    
    if (drone) {
        drone.mission = null;
        showNotification(`${drone.name} retornando à nave mãe`, 'success');
    }
}

// Retornar todos os drones
function returnAllDrones() {
    Object.keys(systemData.drones).forEach(droneId => {
        returnDrone(droneId);
    });
}

// Executar função do drone
function executeDroneFunction(droneId) {
    const drone = systemData.drones[droneId];
    
    if (drone) {
        // Simular consumo de bateria
        drone.battery = Math.max(drone.battery - 5, 0);
        updateDroneBatteries();
        
        // Mensagem específica para cada tipo de drone
        let message = '';
        if (droneId === 'nereus') {
            message = `${drone.name} capturando imagens...`;
        } else if (droneId === 'triton') {
            message = `${drone.name} coletando amostras...`;
        } else if (droneId === 'glaucus') {
            message = `${drone.name} medindo parâmetros...`;
        }
        
        showNotification(message, 'success');
    }
}

// Mostrar notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        'success': 'fa-check-circle',
        'warning': 'fa-exclamation-circle',
        'error': 'fa-times-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${icons[type]}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    elements.notificationContainer.appendChild(notification);
    
    // Remover notificação após a animação
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Simulação de dados em tempo real
function startDataSimulation() {
    // Simular variação de temperatura
    setInterval(() => {
        Object.keys(systemData.drones).forEach(droneId => {
            const drone = systemData.drones[droneId];
            
            // Variação de temperatura (18-23°C)
            const tempVariation = (Math.random() - 0.5) * 0.2;
            drone.temperature = Math.max(18, Math.min(23, drone.temperature + tempVariation));
            drone.temperature = parseFloat(drone.temperature.toFixed(1));
            
            // Variação de salinidade (32-38‰)
            const salVariation = (Math.random() - 0.5) * 0.2;
            drone.salinity = Math.max(32, Math.min(38, drone.salinity + salVariation));
            drone.salinity = parseFloat(drone.salinity.toFixed(1));
            
            // Variação de profundidade (130-180m)
            const depthVariation = (Math.random() - 0.5) * 2;
            drone.depth = Math.max(130, Math.min(180, drone.depth + depthVariation));
            drone.depth = Math.round(drone.depth);
        });
        
        // Atualizar UI
        elements.temperature.textContent = systemData.drones.nereus.temperature + '°C';
        elements.salinity.textContent = systemData.drones.nereus.salinity + '‰';
        elements.droneDepth.textContent = systemData.drones.nereus.depth + 'm';
    }, 5000);
    
    // Simular consumo de bateria
    setInterval(() => {
        // Consumo da nave mãe
        if (systemData.mothership.energy > 0) {
            const consumption = systemData.mothership.depth > 400 ? 0.5 : 0.2;
            systemData.mothership.energy = Math.max(0, systemData.mothership.energy - consumption);
            systemData.mothership.energy = parseFloat(systemData.mothership.energy.toFixed(1));
            elements.mothershipEnergy.textContent = systemData.mothership.energy + '%';
            
            // Adicionar ao histórico
            systemData.mothership.energyHistory.push(systemData.mothership.energy);
            if (systemData.mothership.energyHistory.length > 24) {
                systemData.mothership.energyHistory.shift();
            }
            
            // Atualizar gráfico
            renderEnergyChart();
        }
        
        // Consumo dos drones
        Object.keys(systemData.drones).forEach(droneId => {
            const drone = systemData.drones[droneId];
            
            if (drone.battery > 0) {
                let consumption = 0.1;
                
                // Maior consumo se estiver em missão
                if (drone.mission) {
                    consumption = 0.3;
                }
                
                drone.battery = Math.max(0, drone.battery - consumption);
                drone.battery = parseFloat(drone.battery.toFixed(1));
            }
            
            // Alerta de bateria baixa
            if (drone.battery < 20 && drone.battery > 19) {
                showNotification(`Bateria do drone ${drone.name} está baixa!`, 'warning');
            }
        });
        
        // Atualizar baterias na UI
        updateDroneBatteries();
    }, 3000);
    
    // Simular conclusão de missões
    setInterval(() => {
        Object.keys(systemData.drones).forEach(droneId => {
            const drone = systemData.drones[droneId];
            
            if (drone.mission && Math.random() > 0.7) {
                // Criar nova missão no histórico
                const missionNames = {
                    'exploration': 'Exploração',
                    'sample': 'Coleta de Amostras',
                    'imaging': 'Captura de Imagens',
                    'measurement': 'Medição de Parâmetros'
                };
                
                const newMission = {
                    id: systemData.missions.length + 1,
                    date: new Date().toISOString().split('T')[0],
                    drone: drone.name,
                    type: missionNames[drone.mission],
                    status: 'Concluída',
                    duration: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
                    coordinates: `-23.${Math.floor(Math.random() * 10) + 50}, -46.${Math.floor(Math.random() * 10) + 60}`,
                    temperature: `${drone.temperature}°C`,
                    salinity: `${drone.salinity}‰`,
                    visibility: `${Math.floor(Math.random() * 10) + 10}m`,
                    droneSpeed: `${(Math.random() * 2 + 2).toFixed(1)} km/h`,
                    current: `${(Math.random() * 0.5 + 0.5).toFixed(1)} m/s`,
                    marineLife: ['Baixa', 'Média', 'Alta'][Math.floor(Math.random() * 3)]
                };
                
                systemData.missions.unshift(newMission);
                if (systemData.missions.length > 10) {
                    systemData.missions.pop();
                }
                
                // Atualizar tabela
                renderReportsTable();
                
                // Limpar missão do drone
                drone.mission = null;
                
                // Notificação
                showNotification(`Missão do drone ${drone.name} concluída!`, 'success');
            }
        });
    }, 15000);
}



