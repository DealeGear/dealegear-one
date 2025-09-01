document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const depthSlider = document.getElementById('depthSlider');
    const depthSliderValue = document.getElementById('depthSliderValue');
    const depthValue = document.getElementById('depthValue');
    const energyValue = document.getElementById('energyValue');
    const energyConsumption = document.getElementById('energyConsumption');
    const commSystem = document.getElementById('commSystem');
    const solarBuoy = document.getElementById('solarBuoy');
    const autonomousMode = document.getElementById('autonomousMode');
    const activeDrones = document.getElementById('activeDrones');
    const modal = document.querySelectorAll('.modal');
    const closeModal = document.querySelectorAll('.close-modal');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const viewCodeBtn = document.querySelectorAll('.view-code-btn');
    const codeModal = document.getElementById('codeModal');
    const codeTitle = document.getElementById('codeTitle');
    const codeContent = document.getElementById('codeContent');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const viewReportBtn = document.querySelectorAll('.view-report-btn');
    const reportModal = document.getElementById('reportModal');
    const droneBtns = document.querySelectorAll('.drone-btn');
    const drones = document.querySelectorAll('.drone');
    const mothership = document.querySelector('.mothership');
    
    // Dados simulados
    let energy = 78;
    let depth = 150;
    let temperature = [20.5, 19.8, 21.2];
    let salinity = [35.2, 34.8, 35.5];
    let droneDepth = [152, 148, 155];
    let dronePositions = [
        { top: '20%', left: '30%' },
        { top: '70%', left: '20%' },
        { top: '40%', left: '70%' }
    ];
    let droneStatus = [true, true, true]; // true = ativo, false = em missão
    let commSystemActive = true;
    
    // Códigos fictícios dos programas
    const programCodes = {
        exploration: `// Programa de Exploração Básica
const exploration = {
    name: "Exploração Básica",
    version: "1.2.0",
    
    initialize() {
        console.log("Iniciando programa de exploração básica...");
        this.checkSystems();
        this.setNavigationMode();
    },
    
    checkSystems() {
        // Verificar sistemas principais
        const systems = ['propulsion', 'sensors', 'communication'];
        systems.forEach(system => {
            if (!systemCheck(system)) {
                throw new Error(\`Sistema \${system} falhou\`);
            }
        });
        return true;
    },
    
    setNavigationMode() {
        // Configurar modo de navegação autônoma
        navigation.setMode('autonomous');
        navigation.setSpeed(2.5); // m/s
        navigation.setDepth(depth.current);
    },
    
    startExploration() {
        // Iniciar padrão de exploração em espiral
        const pattern = 'spiral';
        const radius = 50; // metros
        const duration = 1800; // segundos
        
        navigation.executePattern(pattern, { radius, duration });
        
        // Coletar dados durante a exploração
        sensors.startDataCollection({
            temperature: true,
            salinity: true,
            depth: true,
            sonar: true
        });
        
        // Registrar eventos
        eventLogger.log('Exploração iniciada', {
            pattern,
            radius,
            duration,
            timestamp: new Date()
        });
    },
    
    stopExploration() {
        navigation.stop();
        sensors.stopDataCollection();
        
        // Salvar dados coletados
        dataLogger.save({
            type: 'exploration',
            timestamp: new Date(),
            data: sensors.getCollectedData()
        });
        
        // Retornar à posição inicial
        navigation.returnToHome();
    }
};

// Iniciar exploração
exploration.initialize();
exploration.startExploration();`,

        images: `// Programa de Captura de Imagens
const imageCapture = {
    name: "Captura de Imagens",
    version: "2.1.3",
    
    initialize() {
        console.log("Iniciando programa de captura de imagens...");
        this.checkCameraSystems();
        this.configureCamera();
    },
    
    checkCameraSystems() {
        // Verificar câmeras e iluminação
        const cameras = ['main', 'auxiliary', 'macro'];
        cameras.forEach(camera => {
            if (!cameraSystem.check(camera)) {
                throw new Error(\`Câmera \${camera} não está operacional\`);
            }
        });
        
        // Verificar sistema de iluminação
        if (!lightingSystem.check()) {
            throw new Error("Sistema de iluminação falhou");
        }
        
        return true;
    },
    
    configureCamera() {
        // Configurar parâmetros da câmera
        cameraSystem.configure({
            resolution: '4K',
            format: 'RAW',
            whiteBalance: 'auto',
            iso: 200,
            aperture: 2.8,
            shutterSpeed: 1/125
        });
        
        // Configurar iluminação
        lightingSystem.configure({
            intensity: 75, // porcentagem
            colorTemperature: 5500, // Kelvin
            mode: 'continuous'
        });
    },
    
    startCapture() {
        // Iniciar captura de imagens
        const interval = 30; // segundos entre capturas
        const duration = 3600; // segundos de duração total
        
        const captureTimer = setInterval(() => {
            const image = cameraSystem.capture();
            
            // Adicionar metadados
            image.addMetadata({
                depth: sensors.getDepth(),
                temperature: sensors.getTemperature(),
                salinity: sensors.getSalinity(),
                position: navigation.getCurrentPosition(),
                timestamp: new Date()
            });
            
            // Salvar imagem
            storage.save(image);
            
            // Registrar evento
            eventLogger.log('Imagem capturada', {
                id: image.id,
                timestamp: image.metadata.timestamp
            });
        }, interval * 1000);
        
        // Parar captura após a duração definida
        setTimeout(() => {
            clearInterval(captureTimer);
            this.stopCapture();
        }, duration * 1000);
    },
    
    stopCapture() {
        cameraSystem.stop();
        lightingSystem.turnOff();
        
        // Compilar metadados
        const sessionData = {
            type: 'imageCapture',
            timestamp: new Date(),
            imagesCount: storage.getRecentImages().length,
            duration: this.getElapsedTime()
        };
        
        // Salvar dados da sessão
        dataLogger.save(sessionData);
        
        // Retornar à posição inicial
        navigation.returnToHome();
    }
};

// Iniciar captura de imagens
imageCapture.initialize();
imageCapture.startCapture();`,

        samples: `// Programa de Coleta de Amostras
const sampleCollection = {
    name: "Coleta de Amostras",
    version: "1.5.2",
    
    initialize() {
        console.log("Iniciando programa de coleta de amostras...");
        this.checkCollectionSystems();
        this.configureCollectionParameters();
    },
    
    checkCollectionSystems() {
        // Verificar sistemas de coleta
        const systems = ['manipulator', 'container', 'seal'];
        systems.forEach(system => {
            if (!collectionSystem.check(system)) {
                throw new Error(\`Sistema de coleta \${system} falhou\`);
            }
        });
        
        // Verificar capacidade de armazenamento
        if (collectionSystem.getAvailableContainers() < 3) {
            throw new Error("Capacidade de armazenamento insuficiente");
        }
        
        return true;
    },
    
    configureCollectionParameters() {
        // Configurar parâmetros de coleta
        collectionSystem.configure({
            containerSize: '500ml',
            sealMethod: 'mechanical',
            sterilization: true,
            pressureCompensation: true
        });
    },
    
    startCollection() {
        // Navegar para pontos de coleta pré-definidos
        const collectionPoints = [
            { lat: -23.512, lon: -46.635, depth: 155 },
            { lat: -23.515, lon: -46.638, depth: 160 },
            { lat: -23.518, lon: -46.641, depth: 158 }
        ];
        
        let currentPoint = 0;
        
        const moveToNextPoint = () => {
            if (currentPoint >= collectionPoints.length) {
                this.stopCollection();
                return;
            }
            
            const point = collectionPoints[currentPoint];
            
            // Navegar para o ponto
            navigation.moveTo(point)
                .then(() => {
                    // Coletar amostra
                    return this.collectSample(point);
                })
                .then(() => {
                    currentPoint++;
                    setTimeout(moveToNextPoint, 5000); // Esperar 5 segundos entre coletas
                })
                .catch(error => {
                    console.error("Erro na coleta:", error);
                    eventLogger.log('Erro na coleta', {
                        point,
                        error: error.message,
                        timestamp: new Date()
                    });
                    
                    // Tentar próximo ponto
                    currentPoint++;
                    setTimeout(moveToNextPoint, 10000);
                });
        };
        
        // Iniciar coleta sequencial
        moveToNextPoint();
    },
    
    collectSample(point) {
        return new Promise((resolve, reject) => {
            // Registrar início da coleta
            eventLogger.log('Iniciando coleta', {
                point,
                timestamp: new Date()
            });
            
            // Coletar dados ambientais
            const environmentalData = {
                temperature: sensors.getTemperature(),
                salinity: sensors.getSalinity(),
                depth: point.depth,
                timestamp: new Date()
            };
            
            // Posicionar manipulador
            manipulatorSystem.position({
                x: 0,
                y: -0.5, // 50cm abaixo do drone
                z: 0
            });
            
            // Abrir recipiente
            collectionSystem.openContainer();
            
            // Coletar amostra
            collectionSystem.collect()
                .then(() => {
                    // Fechar e selar recipiente
                    return collectionSystem.sealContainer();
                })
                .then(() => {
                    // Retornar manipulador
                    return manipulatorSystem.retract();
                })
                .then(() => {
                    // Salvar metadados da amostra
                    const sampleData = {
                        id: \`sample_\${Date.now()}\`,
                        location: point,
                        environmental: environmentalData,
                        timestamp: new Date()
                    };
                    
                    storage.save(sampleData);
                    
                    // Registrar sucesso
                    eventLogger.log('Amostra coletada com sucesso', {
                        sampleId: sampleData.id,
                        timestamp: new Date()
                    });
                    
                    resolve();
                })
                .catch(reject);
        });
    },
    
    stopCollection() {
        // Retornar à posição inicial
        navigation.returnToHome()
            .then(() => {
                // Compilar dados da sessão
                const sessionData = {
                    type: 'sampleCollection',
                    timestamp: new Date(),
                    samplesCollected: storage.getRecentSamples().length,
                    duration: this.getElapsedTime()
                };
                
                // Salvar dados da sessão
                dataLogger.save(sessionData);
                
                console.log("Coleta de amostras concluída");
            });
    }
};

// Iniciar coleta de amostras
sampleCollection.initialize();
sampleCollection.startCollection();`,

        mapping: `// Programa de Mapeamento Topográfico
const topographicMapping = {
    name: "Mapeamento Topográfico",
    version: "2.3.1",
    
    initialize() {
        console.log("Iniciando programa de mapeamento topográfico...");
        this.checkMappingSystems();
        this.configureMappingParameters();
    },
    
    checkMappingSystems() {
        // Verificar sistemas de mapeamento
        const systems = ['sonar', 'positioning', 'dataProcessing'];
        systems.forEach(system => {
            if (!mappingSystem.check(system)) {
                throw new Error(\`Sistema de mapeamento \${system} falhou\`);
            }
        });
        
        // Verificar espaço de armazenamento
        if (storage.getAvailableSpace() < 5000000000) { // 5GB
            throw new Error("Espaço de armazenamento insuficiente");
        }
        
        return true;
    },
    
    configureMappingParameters() {
        // Configurar parâmetros do sonar
        sonarSystem.configure({
            frequency: 'dual', // 100kHz e 400kHz
            range: 200, // metros
            resolution: 'high',
            beamWidth: 'narrow'
        });
        
        // Configurar sistema de posicionamento
        positioningSystem.configure({
            accuracy: 'high',
            updateRate: 10, // Hz
            reference: 'bottomLock'
        });
        
        // Configurar processamento de dados
        dataProcessingSystem.configure({
            algorithm: 'multiBeam',
            filtering: 'adaptive',
            gridResolution: 0.5 // metros
        });
    },
    
    startMapping() {
        // Definir área de mapeamento
        const mappingArea = {
            north: -23.500,
            south: -23.530,
            east: -46.620,
            west: -46.650
        };
        
        // Calcular padrão de varredura
        const scanPattern = this.calculateScanPattern(mappingArea);
        
        // Iniciar varredura
        let currentLine = 0;
        
        const scanNextLine = () => {
            if (currentLine >= scanPattern.length) {
                this.stopMapping();
                return;
            }
            
            const line = scanPattern[currentLine];
            
            // Navegar para o início da linha
            navigation.moveTo(line.start)
                .then(() => {
                    // Iniciar varredura da linha
                    return this.scanLine(line);
                })
                .then(() => {
                    currentLine++;
                    setTimeout(scanNextLine, 2000); // Pequena pausa entre linhas
                })
                .catch(error => {
                    console.error("Erro na varredura:", error);
                    eventLogger.log('Erro na varredura', {
                        line: currentLine,
                        error: error.message,
                        timestamp: new Date()
                    });
                    
                    // Tentar próxima linha
                    currentLine++;
                    setTimeout(scanNextLine, 5000);
                });
        };
        
        // Iniciar varredura sequencial
        scanNextLine();
    },
    
    calculateScanPattern(area) {
        // Calcular linhas de varredura paralelas
        const lineSpacing = 10; // metros
        const lines = [];
        
        const latRange = area.north - area.south;
        const lonRange = area.east - area.west;
        
        const numberOfLines = Math.ceil(latRange * 111000 / lineSpacing); // Aproximadamente 111km por grau de latitude
        
        for (let i = 0; i < numberOfLines; i++) {
            const lat = area.south + (i / numberOfLines) * latRange;
            
            lines.push({
                start: { lat, lon: area.west, depth: 150 },
                end: { lat, lon: area.east, depth: 150 },
                direction: 'east'
            });
            
            // Linha de retorno (exceto na última)
            if (i < numberOfLines - 1) {
                lines.push({
                    start: { lat, lon: area.east, depth: 150 },
                    end: { lat, lon: area.west, depth: 150 },
                    direction: 'west'
                });
            }
        }
        
        return lines;
    },
    
    scanLine(line) {
        return new Promise((resolve, reject) => {
            // Registrar início da varredura
            eventLogger.log('Iniciando varredura da linha', {
                start: line.start,
                end: line.end,
                direction: line.direction,
                timestamp: new Date()
            });
            
            // Iniciar sonar
            sonarSystem.start();
            
            // Iniciar posicionamento
            positioningSystem.start();
            
            // Iniciar processamento de dados
            dataProcessingSystem.start();
            
            // Navegar ao longo da linha
            navigation.followPath([line.start, line.end])
                .then(() => {
                    // Parar sistemas
                    sonarSystem.stop();
                    positioningSystem.stop();
                    dataProcessingSystem.stop();
                    
                    // Processar dados coletados
                    return dataProcessingSystem.processLineData();
                })
                .then(processedData => {
                    // Salvar dados processados
                    storage.save({
                        type: 'mapLine',
                        line: line,
                        data: processedData,
                        timestamp: new Date()
                    });
                    
                    // Registrar sucesso
                    eventLogger.log('Varredura concluída', {
                        line,
                        dataPoints: processedData.length,
                        timestamp: new Date()
                    });
                    
                    resolve();
                })
                .catch(reject);
        });
    },
    
    stopMapping() {
        // Retornar à posição inicial
        navigation.returnToHome()
            .then(() => {
                // Compilar mapa final
                return dataProcessingSystem.generateFinalMap();
            })
            .then(finalMap => {
                // Salvar mapa final
                storage.save({
                    type: 'topographicMap',
                    data: finalMap,
                    timestamp: new Date(),
                    resolution: 0.5
                });
                
                // Compilar dados da sessão
                const sessionData = {
                    type: 'topographicMapping',
                    timestamp: new Date(),
                    linesScanned: storage.getMapLines().length,
                    areaCovered: this.calculateAreaCovered(),
                    duration: this.getElapsedTime()
                };
                
                // Salvar dados da sessão
                dataLogger.save(sessionData);
                
                console.log("Mapeamento topográfico concluído");
            });
    },
    
    calculateAreaCovered() {
        // Calcular área total mapeada
        const lines = storage.getMapLines();
        let totalArea = 0;
        
        for (let i = 0; i < lines.length; i += 2) {
            if (i + 1 < lines.length) {
                const line1 = lines[i];
                const line2 = lines[i + 1];
                
                // Calcular distância entre linhas (aproximada)
                const latDiff = Math.abs(line1.line.start.lat - line2.line.start.lat);
                const distance = latDiff * 111000; // metros
                
                // Calcular comprimento médio das linhas
                const length1 = this.calculateDistance(line1.line.start, line1.line.end);
                const length2 = this.calculateDistance(line2.line.start, line2.line.end);
                const avgLength = (length1 + length2) / 2;
                
                // Adicionar área do retângulo aproximado
                totalArea += distance * avgLength;
            }
        }
        
        return totalArea; // metros quadrados
    },
    
    calculateDistance(point1, point2) {
        // Calcular distância entre dois pontos (aproximada)
        const latDiff = point2.lat - point1.lat;
        const lonDiff = point2.lon - point1.lon;
        
        // Aproximação usando fórmula de Haversine simplificada
        const latDistance = latDiff * 111000; // metros
        const lonDistance = lonDiff * 111000 * Math.cos(point1.lat * Math.PI / 180); // metros
        
        return Math.sqrt(latDistance * latDistance + lonDistance * lonDistance);
    }
};

// Iniciar mapeamento topográfico
topographicMapping.initialize();
topographicMapping.startMapping();`,

        emergency: `// Programa de Gerenciamento de Emergências
const emergencyManagement = {
    name: "Gerenciamento de Emergências",
    version: "1.8.5",
    
    initialize() {
        console.log("Iniciando sistema de gerenciamento de emergências...");
        this.checkEmergencySystems();
        this.configureEmergencyParameters();
        this.startMonitoring();
    },
    
    checkEmergencySystems() {
        // Verificar sistemas críticos
        const criticalSystems = ['power', 'communication', 'propulsion', 'ballast'];
        criticalSystems.forEach(system => {
            if (!emergencySystem.check(system)) {
                throw new Error(\`Sistema crítico \${system} não está operacional\`);
            }
        });
        
        // Verificar sistemas de segurança
        const safetySystems = ['emergencyBeacon', 'ballastRelease', 'dataBackup'];
        safetySystems.forEach(system => {
            if (!safetySystem.check(system)) {
                console.warn(\`Sistema de segurança \${system} não está operacional\`);
            }
        });
        
        return true;
    },
    
    configureEmergencyParameters() {
        // Configurar parâmetros de emergência
        emergencySystem.configure({
            criticalBatteryLevel: 15, // porcentagem
            maxDepth: 300, // metros
            maxPressure: 30, // atm
            communicationTimeout: 60, // segundos
            leakDetectionThreshold: 0.1 // litros/minuto
        });
        
        // Configurar respostas automáticas
        emergencySystem.configureAutoResponse({
            lowBattery: 'surfaceAndBeacon',
            exceededDepth: 'adjustDepth',
            communicationLoss: 'returnToLastKnownPosition',
            leakDetected: 'surfaceAndIsolate'
        });
    },
    
    startMonitoring() {
        // Iniciar monitoramento contínuo
        setInterval(() => {
            this.checkSystemStatus();
        }, 5000); // Verificar a cada 5 segundos
    },
    
    checkSystemStatus() {
        // Verificar nível de bateria
        const batteryLevel = powerSystem.getLevel();
        if (batteryLevel < emergencySystem.parameters.criticalBatteryLevel) {
            this.handleEmergency('lowBattery', { level: batteryLevel });
        }
        
        // Verificar profundidade
        const currentDepth = sensors.getDepth();
        if (currentDepth > emergencySystem.parameters.maxDepth) {
            this.handleEmergency('exceededDepth', { depth: currentDepth });
        }
        
        // Verificar pressão
        const currentPressure = sensors.getPressure();
        if (currentPressure > emergencySystem.parameters.maxPressure) {
            this.handleEmergency('exceededPressure', { pressure: currentPressure });
        }
        
        // Verificar comunicação
        const lastCommunication = communicationSystem.getLastContact();
        const timeSinceLastContact = (Date.now() - lastCommunication) / 1000; // segundos
        if (timeSinceLastContact > emergencySystem.parameters.communicationTimeout) {
            this.handleEmergency('communicationLoss', { timeout: timeSinceLastContact });
        }
        
        // Verificar vazamentos
        const leakRate = hullIntegritySystem.getLeakRate();
        if (leakRate > emergencySystem.parameters.leakDetectionThreshold) {
            this.handleEmergency('leakDetected', { leakRate });
        }
    },
    
    handleEmergency(type, details) {
        // Registrar emergência
        eventLogger.log('Emergência detectada', {
            type,
            details,
            timestamp: new Date(),
            severity: 'high'
        });
        
        // Ativar resposta automática se configurada
        const autoResponse = emergencySystem.getAutoResponse(type);
        if (autoResponse) {
            this.executeResponse(autoResponse, type, details);
        }
        
        // Notificar operador
        notificationSystem.send({
            type: 'emergency',
            title: 'Emergência Detectada',
            message: \`Tipo: \${type}\`,
            priority: 'high',
            timestamp: new Date()
        });
        
        // Iniciar beacon de emergência
        emergencyBeacon.activate();
        
        // Iniciar backup de dados críticos
        this.backupCriticalData();
    },
    
    executeResponse(response, type, details) {
        switch (response) {
            case 'surfaceAndBeacon':
                this.surfaceAndBeacon(type, details);
                break;
                
            case 'adjustDepth':
                this.adjustDepth(type, details);
                break;
                
            case 'returnToLastKnownPosition':
                this.returnToLastKnownPosition(type, details);
                break;
                
            case 'surfaceAndIsolate':
                this.surfaceAndIsolate(type, details);
                break;
                
            default:
                console.warn(\`Resposta de emergência desconhecida: \${response}\`);
        }
    },
    
    surfaceAndBeacon(type, details) {
        console.log(\`Executando resposta: surfaceAndBeacon para emergência \${type}\`);
        
        // Subir à superfície
        navigation.setDepth(0)
            .then(() => {
                // Ativar beacon de emergência
                emergencyBeacon.activate();
                
                // Manter na superfície
                navigation.holdPosition();
                
                // Registrar resposta
                eventLogger.log('Resposta executada', {
                    response: 'surfaceAndBeacon',
                    type,
                    timestamp: new Date()
                });
            })
            .catch(error => {
                console.error("Falha na resposta surfaceAndBeacon:", error);
                
                // Tentar resposta alternativa
                this.adjustDepth(type, details);
            });
    },
    
    adjustDepth(type, details) {
        console.log(\`Executando resposta: adjustDepth para emergência \${type}\`);
        
        // Ajustar profundidade para um nível seguro
        const safeDepth = emergencySystem.parameters.maxDepth * 0.8;
        
        navigation.setDepth(safeDepth)
            .then(() => {
                // Registrar resposta
                eventLogger.log('Resposta executada', {
                    response: 'adjustDepth',
                    type,
                    newDepth: safeDepth,
                    timestamp: new Date()
                });
            })
            .catch(error => {
                console.error("Falha na resposta adjustDepth:", error);
                
                // Tentar resposta alternativa
                this.surfaceAndBeacon(type, details);
            });
    },
    
    returnToLastKnownPosition(type, details) {
        console.log(\`Executando resposta: returnToLastKnownPosition para emergência \${type}\`);
        
        // Obter última posição conhecida
        const lastPosition = navigation.getLastKnownPosition();
        
        if (lastPosition) {
            // Navegar para a última posição conhecida
            navigation.moveTo(lastPosition)
                .then(() => {
                    // Manter posição
                    navigation.holdPosition();
                    
                    // Registrar resposta
                    eventLogger.log('Resposta executada', {
                        response: 'returnToLastKnownPosition',
                        type,
                        position: lastPosition,
                        timestamp: new Date()
                    });
                })
                .catch(error => {
                    console.error("Falha na resposta returnToLastKnownPosition:", error);
                    
                    // Tentar resposta alternativa
                    this.surfaceAndBeacon(type, details);
                });
        } else {
            console.warn("Nenhuma posição conhecida disponível");
            
            // Tentar resposta alternativa
            this.surfaceAndBeacon(type, details);
        }
    },
    
    surfaceAndIsolate(type, details) {
        console.log(\`Executando resposta: surfaceAndIsolate para emergência \${type}\`);
        
        // Subir à superfície
        navigation.setDepth(0)
            .then(() => {
                // Isolar área afetada
                hullIntegritySystem.isolateAffectedArea();
                
                // Ativar beacon de emergência
                emergencyBeacon.activate();
                
                // Manter na superfície
                navigation.holdPosition();
                
                // Registrar resposta
                eventLogger.log('Resposta executada', {
                    response: 'surfaceAndIsolate',
                    type,
                    timestamp: new Date()
                });
            })
            .catch(error => {
                console.error("Falha na resposta surfaceAndIsolate:", error);
                
                // Tentar resposta alternativa
                this.surfaceAndBeacon(type, details);
            });
    },
    
    backupCriticalData() {
        console.log("Iniciando backup de dados críticos...");
        
        // Identificar dados críticos
        const criticalData = {
            systemStatus: systemDiagnostics.getStatus(),
            sensorData: sensors.getRecentData(3600), // Última hora
            navigationData: navigation.getNavigationHistory(),
            timestamp: new Date()
        };
        
        // Salvar em armazenamento de emergência
        emergencyStorage.save(criticalData)
            .then(() => {
                console.log("Backup de dados críticos concluído");
                
                // Registrar backup
                eventLogger.log('Backup de dados críticos concluído', {
                    dataSize: JSON.stringify(criticalData).length,
                    timestamp: new Date()
                });
            })
            .catch(error => {
                console.error("Falha no backup de dados críticos:", error);
                
                // Tentar compressão e backup parcial
                try {
                    const compressedData = this.compressData(criticalData);
                    emergencyStorage.save(compressedData)
                        .then(() => {
                            console.log("Backup de dados críticos (comprimido) concluído");
                        })
                        .catch(err => {
                            console.error("Falha no backup de dados críticos (comprimido):", err);
                        });
                } catch (e) {
                    console.error("Falha na compressão de dados:", e);
                }
            });
    },
    
    compressData(data) {
        // Simulação de compressão de dados
        return {
            compressed: true,
            originalSize: JSON.stringify(data).length,
            data: btoa(JSON.stringify(data)), // Codificação base64 como simulação
            timestamp: new Date()
        };
    },
    
    getElapsedTime() {
        // Calcular tempo decorrido desde a inicialização
        return (Date.now() - this.startTime) / 1000; // segundos
    }
};

// Iniciar sistema de gerenciamento de emergências
emergencyManagement.startTime = Date.now();
emergencyManagement.initialize();`
    };
    
    // Dados fictícios dos relatórios
    const reportDetails = {
        1: {
            name: "Missão de Captura de Imagens - Recife de Coral",
            type: "Captura de Imagens",
            status: "Concluído",
            duration: "2h 15min",
            coords: "-23.512, -46.635",
            temp: "20.8°C",
            sal: "35.5‰",
            vis: "15m",
            speed: "1.2 m/s",
            current: "0.3 m/s",
            life: "Alta diversidade de peixes e corais"
        },
        2: {
            name: "Coleta de Amostras - Zona Profunda",
            type: "Coleta de Amostras",
            status: "Concluído",
            duration: "3h 30min",
            coords: "-23.518, -46.641",
            temp: "18.5°C",
            sal: "36.2‰",
            vis: "8m",
            speed: "0.8 m/s",
            current: "0.5 m/s",
            life: "Pouca atividade biológica observada"
        },
        3: {
            name: "Medição de Parâmetros - Termoclina",
            type: "Medição de Parâmetros",
            status: "Parcial",
            duration: "1h 45min",
            coords: "-23.515, -46.638",
            temp: "19.2°C",
            sal: "34.8‰",
            vis: "12m",
            speed: "1.0 m/s",
            current: "0.4 m/s",
            life: "Moderada presença de plankton"
        },
        4: {
            name: "Exploração Básica - Nova Área",
            type: "Exploração Básica",
            status: "Concluído",
            duration: "4h 20min",
            coords: "-23.510, -46.630",
            temp: "21.3°C",
            sal: "35.0‰",
            vis: "18m",
            speed: "1.5 m/s",
            current: "0.2 m/s",
            life: "Diversidade marinha moderada"
        },
        5: {
            name: "Coleta de Amostras - Falha no Sistema",
            type: "Coleta de Amostras",
            status: "Falha",
            duration: "0h 45min",
            coords: "-23.520, -46.645",
            temp: "17.9°C",
            sal: "36.5‰",
            vis: "5m",
            speed: "0.9 m/s",
            current: "0.6 m/s",
            life: "Não observado devido à falha"
        }
    };
    
    // Navegação entre seções
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Atualizar menu ativo
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Exibir seção correspondente
            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Fechar menu em dispositivos móveis
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Toggle menu em dispositivos móveis
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Slider de profundidade
    depthSlider.addEventListener('input', () => {
        const value = depthSlider.value;
        depthSliderValue.textContent = value;
        depthValue.textContent = value;
        depth = parseInt(value);
        
        // Calcular consumo de energia baseado na profundidade
        const consumption = Math.round(10 + (depth / 50));
        energyConsumption.textContent = consumption;
        
        // Atualizar profundidade dos drones
        droneDepth.forEach((d, i) => {
            droneDepth[i] = depth + Math.floor(Math.random() * 10) - 5;
            document.getElementById(`depth${i + 1}`).textContent = droneDepth[i] + 'm';
        });
    });
    
    // Sistema de comunicação
    commSystem.addEventListener('change', () => {
        commSystemActive = commSystem.checked;
        showNotification(commSystemActive ? 
            "Sistema de comunicação ativado" : 
            "Sistema de comunicação desativado");
    });
    
    // Boia solar
    solarBuoy.addEventListener('click', () => {
        energy = Math.min(100, energy + 15);
        energyValue.textContent = energy + '%';
        showNotification("Boia solar ativada. Energia recarregada em +15%");
    });
    
    // Modo autônomo
    autonomousMode.addEventListener('click', () => {
        showNotification("Modo autônomo ativado. Retornando todos os drones à base");
        
        // Animar todos os drones voltando para o centro
        drones.forEach((drone, index) => {
            drone.style.transition = 'all 2s ease-in-out';
            drone.style.top = '50%';
            drone.style.left = '50%';
            drone.style.transform = 'translate(-50%, -50%)';
            
            // Resetar posição após animação
            setTimeout(() => {
                drone.style.transition = '';
                drone.style.top = dronePositions[index].top;
                drone.style.left = dronePositions[index].left;
                drone.style.transform = '';
            }, 3000);
        });
    });
    
    // Botões dos drones
    droneBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const droneId = parseInt(btn.getAttribute('data-drone')) - 1;
            const action = btn.classList.contains('mission-btn') ? 'mission' : 
                          btn.classList.contains('return-btn') ? 'return' : 'action';
            
            const drone = drones[droneId];
            
            switch (action) {
                case 'mission':
                    // Enviar drone em missão
                    droneStatus[droneId] = false;
                    showNotification(`Drone 0${droneId + 1} enviado em missão`);
                    
                    // Animar drone patrulhando
                    animateDronePatrol(drone, droneId);
                    break;
                    
                case 'return':
                    // Retornar drone à nave
                    droneStatus[droneId] = true;
                    showNotification(`Drone 0${droneId + 1} retornando à nave`);
                    
                    // Animar drone voltando para o centro
                    drone.style.transition = 'all 2s ease-in-out';
                    drone.style.top = '50%';
                    drone.style.left = '50%';
                    drone.style.transform = 'translate(-50%, -50%)';
                    
                    // Resetar posição após animação
                    setTimeout(() => {
                        drone.style.transition = '';
                        drone.style.top = dronePositions[droneId].top;
                        drone.style.left = dronePositions[droneId].left;
                        drone.style.transform = '';
                    }, 2000);
                    break;
                    
                case 'action':
                    // Ação específica do drone
                    const actions = ['Imagem capturada', 'Amostra coletada', 'Parâmetros medidos'];
                    showNotification(`${actions[droneId]} pelo Drone 0${droneId + 1}`);
                    break;
            }
        });
    });
    
    // Animar drone patrulhando
    function animateDronePatrol(drone, droneId) {
        let angle = 0;
        const radius = 100;
        const centerX = 50;
        const centerY = 50;
        
        const interval = setInterval(() => {
            if (!droneStatus[droneId]) {
                angle += 5;
                const radian = angle * Math.PI / 180;
                const x = centerX + radius * Math.cos(radian);
                const y = centerY + radius * Math.sin(radian);
                
                drone.style.top = y + '%';
                drone.style.left = x + '%';
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
    
    // Botões de visualização de código
    viewCodeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const program = btn.parentElement.getAttribute('data-program');
            const programNames = {
                exploration: 'Exploração Básica',
                images: 'Captura de Imagens',
                samples: 'Coleta de Amostras',
                mapping: 'Mapeamento Topográfico',
                emergency: 'Gerenciamento de Emergências'
            };
            
            codeTitle.textContent = `Código - ${programNames[program]}`;
            codeContent.textContent = programCodes[program];
            codeModal.classList.add('active');
        });
    });
    
    // Botão de copiar código
    copyCodeBtn.addEventListener('click', () => {
        const code = codeContent.textContent;
        navigator.clipboard.writeText(code)
            .then(() => {
                showNotification("Código copiado para a área de transferência");
            })
            .catch(err => {
                console.error('Erro ao copiar código:', err);
                showNotification("Erro ao copiar código");
            });
    });
    
    // Botões de visualização de relatório
    viewReportBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const reportId = btn.parentElement.parentElement.getAttribute('data-report-id');
            const report = reportDetails[reportId];
            
            if (report) {
                document.getElementById('reportName').textContent = report.name;
                document.getElementById('reportType').textContent = report.type;
                document.getElementById('reportStatus').textContent = report.status;
                document.getElementById('reportDuration').textContent = report.duration;
                document.getElementById('reportCoords').textContent = report.coords;
                document.getElementById('reportTemp').textContent = report.temp;
                document.getElementById('reportSal').textContent = report.sal;
                document.getElementById('reportVis').textContent = report.vis;
                document.getElementById('reportSpeed').textContent = report.speed;
                document.getElementById('reportCurrent').textContent = report.current;
                document.getElementById('reportLife').textContent = report.life;
                
                reportModal.classList.add('active');
            }
        });
    });
    
    // Fechar modais
    closeModal.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.forEach(m => m.classList.remove('active'));
        });
    });
    
    // Fechar modal ao clicar fora
    modal.forEach(m => {
        m.addEventListener('click', (e) => {
            if (e.target === m) {
                m.classList.remove('active');
            }
        });
    });
    
    // Função para mostrar notificação
    function showNotification(message) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Gráfico de consumo de energia
    function drawEnergyChart() {
        const canvas = document.getElementById('energyChart');
        const ctx = canvas.getContext('2d');
        
        // Definir tamanho do canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Dados fictícios para o gráfico
        const hours = Array.from({length: 24}, (_, i) => i);
        const consumption = hours.map(() => Math.floor(Math.random() * 20) + 5);
        
        // Configurações do gráfico
        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        const barWidth = chartWidth / hours.length;
        const maxConsumption = Math.max(...consumption);
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar eixos
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.strokeStyle = '#ecf0f1';
        ctx.stroke();
        
        // Desenhar barras
        consumption.forEach((value, i) => {
            const barHeight = (value / maxConsumption) * chartHeight;
            const x = padding + i * barWidth + barWidth * 0.1;
            const y = canvas.height - padding - barHeight;
            const width = barWidth * 0.8;
            
            // Gradiente para as barras
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, '#00ccaa');
            gradient.addColorStop(1, '#0099cc');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, width, barHeight);
            
            // Texto do valor
            ctx.fillStyle = '#ecf0f1';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value + '%', x + width / 2, y - 5);
            
            // Texto da hora
            ctx.fillText(i + 'h', x + width / 2, canvas.height - padding + 15);
        });
        
        // Título do eixo Y
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ecf0f1';
        ctx.font = '12px Arial';
        ctx.fillText('Consumo de Energia (%)', 0, 0);
        ctx.restore();
        
        // Título do eixo X
        ctx.fillStyle = '#ecf0f1';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Horas', canvas.width / 2, canvas.height - 5);
    }
    
    // Simulação de dados em tempo real
    function simulateData() {
        // Atualizar energia (consumo gradual)
        if (energy > 0) {
            const consumption = Math.round(10 + (depth / 50));
            energy = Math.max(0, energy - (consumption / 3600)); // Consumo por segundo
            energyValue.textContent = Math.round(energy) + '%';
        }
        
        // Atualizar temperatura dos drones
        temperature.forEach((temp, i) => {
            const variation = (Math.random() - 0.5) * 0.2;
            temperature[i] = Math.max(18, Math.min(23, temp + variation));
            document.getElementById(`temp${i + 1}`).textContent = temperature[i].toFixed(1) + '°C';
        });
        
        // Atualizar salinidade dos drones
        salinity.forEach((sal, i) => {
            const variation = (Math.random() - 0.5) * 0.2;
            salinity[i] = Math.max(32, Math.min(38, sal + variation));
            document.getElementById(`sal${i + 1}`).textContent = salinity[i].toFixed(1) + '‰';
        });
        
        // Atualizar profundidade dos drones (pequenas variações)
        droneDepth.forEach((depth, i) => {
            if (droneStatus[i]) { // Apenas atualizar se não estiver em missão
                const variation = (Math.random() - 0.5) * 2;
                droneDepth[i] = Math.max(130, Math.min(180, depth + variation));
                document.getElementById(`depth${i + 1}`).textContent = Math.round(droneDepth[i]) + 'm';
            }
        });
    }
    
    // Inicialização
    drawEnergyChart();
    setInterval(simulateData, 1000);
    
    // Redesenhar gráfico ao redimensionar a janela
    window.addEventListener('resize', () => {
        drawEnergyChart();
    });
});