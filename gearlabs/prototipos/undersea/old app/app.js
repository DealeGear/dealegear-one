// script.js (adicionar funções para a nova seção)

// Função para mostrar detalhes do programa
function showProgramDetails(programNumber) {
    const programDetails = document.getElementById('programDetails');
    const programTitle = document.getElementById('programTitle');
    const programCode = document.getElementById('programCode');
    
    let code = '';
    let title = '';
    
    switch(programNumber) {
        case 1:
            title = 'Programa 1 - Exploração Básica';
            code = `// Programa 1: Exploração básica para coleta de dados ambientais
const DroneController = require('./drone-controller');

class BasicExplorationProgram {
    constructor(droneId) {
        this.droneId = droneId;
        this.controller = new DroneController(droneId);
        this.missionData = {
            startTime: null,
            endTime: null,
            missionType: 'EXPLORACAO_BASICA',
            startCoordinates: null,
            endCoordinates: null
        };
    }
    
    async startMission(coordinates) {
        // Envia informações para a nave mãe
        await this.sendMissionInfo(coordinates);
        
        // Inicia a missão
        this.missionData.startTime = new Date();
        this.missionData.startCoordinates = coordinates;
        
        // Ativa sensores
        await this.activateSensors();
        
        // Inicia navegação
        await this.controller.navigateTo(coordinates);
        
        console.log(\`Missão básica iniciada para drone \${this.droneId}\`);
    }
    
    async sendMissionInfo(coordinates) {
        const missionInfo = {
            droneId: this.droneId,
            timestamp: new Date().toISOString(),
            missionType: this.missionData.missionType,
            coordinates: coordinates
        };
        
        // Envia para a nave mãe
        await this.controller.sendToMotherShip('MISSION_START', missionInfo);
    }
    
    async activateSensors() {
        // Ativa sensores ambientais
        await this.controller.activateSensor('temperature');
        await this.controller.activateSensor('pressure');
        await this.controller.activateSensor('salinity');
        
        // Ativa câmera
        await this.controller.activateCamera('front');
        
        // Ativa motores
        await this.controller.activateMotors();
    }
    
    async endMission() {
        this.missionData.endTime = new Date();
        this.missionData.endCoordinates = await this.controller.getCurrentPosition();
        
        // Envia informações de retorno para a nave mãe
        await this.sendMissionEndInfo();
        
        // Desativa sistemas
        await this.deactivateSystems();
        
        console.log(\`Missão básica concluída para drone \${this.droneId}\`);
    }
    
    async sendMissionEndInfo() {
        const endInfo = {
            droneId: this.droneId,
            startTime: this.missionData.startTime,
            endTime: this.missionData.endTime,
            missionType: this.missionData.missionType,
            startCoordinates: this.missionData.startCoordinates,
            endCoordinates: this.missionData.endCoordinates
        };
        
        await this.controller.sendToMotherShip('MISSION_END', endInfo);
    }
    
    async deactivateSystems() {
        await this.controller.deactivateAllSensors();
        await this.controller.deactivateCamera();
        await this.controller.deactivateMotors();
    }
}

module.exports = BasicExplorationProgram;`;
            break;
            
        case 2:
            title = 'Programa 2 - Captura de Imagens';
            code = `// Programa 2: Especializado em captura de imagens e vídeo
const DroneController = require('./drone-controller');
const ImageProcessor = require('./image-processor');

class ImageCaptureProgram {
    constructor(droneId) {
        this.droneId = droneId;
        this.controller = new DroneController(droneId);
        this.imageProcessor = new ImageProcessor();
        this.missionData = {
            startTime: null,
            endTime: null,
            missionType: 'CAPTURA_IMAGENS',
            startCoordinates: null,
            endCoordinates: null,
            imagesCaptured: 0,
            videoDuration: 0
        };
    }
    
    async startMission(coordinates, captureMode = 'PHOTO') {
        await this.sendMissionInfo(coordinates, captureMode);
        
        this.missionData.startTime = new Date();
        this.missionData.startCoordinates = coordinates;
        
        // Configura câmeras
        await this.setupCameras(captureMode);
        
        // Inicia navegação
        await this.controller.navigateTo(coordinates);
        
        // Inicia captura
        await this.startCapture(captureMode);
        
        console.log(\`Missão de captura iniciada para drone \${this.droneId}\`);
    }
    
    async sendMissionInfo(coordinates, captureMode) {
        const missionInfo = {
            droneId: this.droneId,
            timestamp: new Date().toISOString(),
            missionType: this.missionData.missionType,
            captureMode: captureMode,
            coordinates: coordinates
        };
        
        await this.controller.sendToMotherShip('MISSION_START', missionInfo);
    }
    
    async setupCameras(mode) {
        // Ativa câmera principal
        await this.controller.activateCamera('main', {
            resolution: '4K',
            frameRate: 30,
            stabilization: true
        });
        
        // Ativa câmera térmica se necessário
        if (mode === 'THERMAL') {
            await this.controller.activateCamera('thermal');
        }
        
        // Ativa sensores de profundidade
        await this.controller.activateSensor('depth');
    }
    
    async startCapture(mode) {
        if (mode === 'PHOTO') {
            await this.capturePhotos();
        } else if (mode === 'VIDEO') {
            await this.captureVideo();
        } else if (mode === 'PANORAMA') {
            await this.capturePanorama();
        }
    }
    
    async capturePhotos() {
        const interval = setInterval(async () => {
            const image = await this.controller.captureImage();
            const processed = await this.imageProcessor.enhanceImage(image);
            await this.controller.saveImage(processed);
            
            this.missionData.imagesCaptured++;
            await this.controller.sendToMotherShip('IMAGE_CAPTURED', {
                droneId: this.droneId,
                timestamp: new Date().toISOString(),
                imageId: processed.id
            });
        }, 5000);
        
        this.captureInterval = interval;
    }
    
    async captureVideo() {
        await this.controller.startRecording();
        this.videoStartTime = Date.now();
    }
    
    async endMission() {
        this.missionData.endTime = new Date();
        this.missionData.endCoordinates = await this.controller.getCurrentPosition();
        
        // Para captura
        if (this.captureInterval) {
            clearInterval(this.captureInterval);
        }
        
        if (this.videoStartTime) {
            await this.controller.stopRecording();
            this.missionData.videoDuration = (Date.now() - this.videoStartTime) / 1000;
        }
        
        await this.sendMissionEndInfo();
        await this.deactivateSystems();
        
        console.log(\`Missão de captura concluída para drone \${this.droneId}\`);
    }
    
    async sendMissionEndInfo() {
        const endInfo = {
            droneId: this.droneId,
            startTime: this.missionData.startTime,
            endTime: this.missionData.endTime,
            missionType: this.missionData.missionType,
            startCoordinates: this.missionData.startCoordinates,
            endCoordinates: this.missionData.endCoordinates,
            imagesCaptured: this.missionData.imagesCaptured,
            videoDuration: this.missionData.videoDuration
        };
        
        await this.controller.sendToMotherShip('MISSION_END', endInfo);
    }
    
    async deactivateSystems() {
        await this.controller.deactivateAllCameras();
        await this.controller.deactivateAllSensors();
    }
}

module.exports = ImageCaptureProgram;`;
            break;
            
        case 3:
            title = 'Programa 3 - Coleta de Amostras';
            code = `// Programa 3: Coleta de amostras biológicas e químicas
const DroneController = require('./drone-controller');
const SampleCollector = require('./sample-collector');

class SampleCollectionProgram {
    constructor(droneId) {
        this.droneId = droneId;
        this.controller = new DroneController(droneId);
        this.collector = new SampleCollector();
        this.missionData = {
            startTime: null,
            endTime: null,
            missionType: 'COLETA_AMOSTRAS',
            startCoordinates: null,
            endCoordinates: null,
            samplesCollected: [],
            sampleTypes: []
        };
    }
    
    async startMission(coordinates, samplePlan) {
        await this.sendMissionInfo(coordinates, samplePlan);
        
        this.missionData.startTime = new Date();
        this.missionData.startCoordinates = coordinates;
        
        // Ativa sistemas de coleta
        await this.activateCollectionSystems();
        
        // Inicia navegação
        await this.controller.navigateTo(coordinates);
        
        // Inicia coleta
        await this.startCollection(samplePlan);
        
        console.log(\`Missão de coleta iniciada para drone \${this.droneId}\`);
    }
    
    async sendMissionInfo(coordinates, samplePlan) {
        const missionInfo = {
            droneId: this.droneId,
            timestamp: new Date().toISOString(),
            missionType: this.missionData.missionType,
            samplePlan: samplePlan,
            coordinates: coordinates
        };
        
        await this.controller.sendToMotherShip('MISSION_START', missionInfo);
    }
    
    async activateCollectionSystems() {
        // Ativa braço robótico
        await this.controller.activateRoboticArm();
        
        // Ativa sensores de análise
        await this.controller.activateSensor('ph');
        await this.controller.activateSensor('oxygen');
        await this.controller.activateSensor('turbidity');
        
        // Ativa câmera macro
        await this.controller.activateCamera('macro');
    }
    
    async startCollection(samplePlan) {
        for (const sample of samplePlan) {
            await this.collectSample(sample);
        }
    }
    
    async collectSample(sampleInfo) {
        // Navega para o ponto de coleta
        await this.controller.navigateTo(sampleInfo.coordinates);
        
        // Realiza coleta
        const sample = await this.collector.collect({
            type: sampleInfo.type,
            depth: sampleInfo.depth,
            volume: sampleInfo.volume,
            container: sampleInfo.container
        });
        
        // Analisa amostra
        const analysis = await this.analyzeSample(sample);
        
        // Armazena informações
        this.missionData.samplesCollected.push({
            id: sample.id,
            type: sample.type,
            coordinates: sampleInfo.coordinates,
            timestamp: new Date().toISOString(),
            analysis: analysis
        });
        
        if (!this.missionData.sampleTypes.includes(sample.type)) {
            this.missionData.sampleTypes.push(sample.type);
        }
        
        // Envia informações para a nave mãe
        await this.controller.sendToMotherShip('SAMPLE_COLLECTED', {
            droneId: this.droneId,
            sampleId: sample.id,
            sampleType: sample.type,
            coordinates: sampleInfo.coordinates,
            analysis: analysis
        });
    }
    
    async analyzeSample(sample) {
        const analysis = {};
        
        // Análise química
        if (sample.type === 'WATER') {
            analysis.ph = await this.controller.getSensorData('ph');
            analysis.oxygen = await this.controller.getSensorData('oxygen');
            analysis.turbidity = await this.controller.getSensorData('turbidity');
        }
        
        // Análise biológica
        if (sample.type === 'BIOLOGICAL') {
            const image = await this.controller.captureImage();
            analysis.organismCount = await this.collector.countOrganisms(image);
            analysis.diversityIndex = await this.collector.calculateDiversity(image);
        }
        
        return analysis;
    }
    
    async endMission() {
        this.missionData.endTime = new Date();
        this.missionData.endCoordinates = await this.controller.getCurrentPosition();
        
        await this.sendMissionEndInfo();
        await this.deactivateSystems();
        
        console.log(\`Missão de coleta concluída para drone \${this.droneId}\`);
    }
    
    async sendMissionEndInfo() {
        const endInfo = {
            droneId: this.droneId,
            startTime: this.missionData.startTime,
            endTime: this.missionData.endTime,
            missionType: this.missionData.missionType,
            startCoordinates: this.missionData.startCoordinates,
            endCoordinates: this.missionData.endCoordinates,
            samplesCollected: this.missionData.samplesCollected.length,
            sampleTypes: this.missionData.sampleTypes
        };
        
        await this.controller.sendToMotherShip('MISSION_END', endInfo);
    }
    
    async deactivateSystems() {
        await this.controller.deactivateRoboticArm();
        await this.controller.deactivateAllSensors();
        await this.controller.deactivateAllCameras();
    }
}

module.exports = SampleCollectionProgram;`;
            break;
            
        case 4:
            title = 'Programa 4 - Mapeamento Topográfico';
            code = `// Programa 4: Mapeamento topográfico do leito marinho
const DroneController = require('./drone-controller');
const TopographicMapper = require('./topographic-mapper');

class TopographicMappingProgram {
    constructor(droneId) {
        this.droneId = droneId;
        this.controller = new DroneController(droneId);
        this.mapper = new TopographicMapper();
        this.missionData = {
            startTime: null,
            endTime: null,
            missionType: 'MAPEAMENTO_TOPOGRAFICO',
            startCoordinates: null,
            endCoordinates: null,
            mappedArea: 0,
            resolution: null,
            mapData: []
        };
    }
    
    async startMission(coordinates, mappingConfig) {
        await this.sendMissionInfo(coordinates, mappingConfig);
        
        this.missionData.startTime = new Date();
        this.missionData.startCoordinates = coordinates;
        this.missionData.resolution = mappingConfig.resolution;
        
        // Ativa sistemas de mapeamento
        await this.activateMappingSystems(mappingConfig);
        
        // Inicia mapeamento
        await this.startMapping(coordinates, mappingConfig);
        
        console.log(\`Missão de mapeamento iniciada para drone \${this.droneId}\`);
    }
    
    async sendMissionInfo(coordinates, config) {
        const missionInfo = {
            droneId: this.droneId,
            timestamp: new Date().toISOString(),
            missionType: this.missionData.missionType,
            mappingConfig: config,
            coordinates: coordinates
        };
        
        await this.controller.sendToMotherShip('MISSION_START', missionInfo);
    }
    
    async activateMappingSystems(config) {
        // Ativa sonar de mapeamento
        await this.controller.activateSonar({
            frequency: config.frequency || '200kHz',
            range: config.range || 100,
            resolution: config.resolution
        });
        
        // Ativa sensores de posicionamento
        await this.controller.activateSensor('depth');
        await this.controller.activateSensor('altitude');
        await this.controller.activateSensor('position');
        
        // Configura padrão de voo
        await this.controller.setFlightPattern('GRID', {
            spacing: config.gridSpacing || 5,
            overlap: config.overlap || 20
        });
    }
    
    async startMapping(coordinates, config) {
        const area = config.area;
        const gridSize = this.mapper.calculateGrid(area, config.resolution);
        
        for (let row = 0; row < gridSize.rows; row++) {
            for (let col = 0; col < gridSize.cols; col++) {
                const point = this.mapper.getGridPoint(coordinates, row, col, config.resolution);
                await this.mapPoint(point);
            }
        }
    }
    
    async mapPoint(point) {
        // Navega para o ponto
        await this.controller.navigateTo(point);
        
        // Estabiliza o drone
        await this.controller.stabilize();
        
        // Realiza varredura sonar
        const scanData = await this.controller.performSonarScan();
        
        // Processa dados
        const processedData = await this.mapper.processScanData(scanData);
        
        // Armazena dados do mapa
        this.missionData.mapData.push({
            coordinates: point,
            timestamp: new Date().toISOString(),
            depth: processedData.depth,
            terrain: processedData.terrainType,
            features: processedData.features
        });
        
        // Atualiza área mapeada
        this.missionData.mappedArea += Math.pow(this.missionData.resolution, 2);
        
        // Envia dados para a nave mãe
        await this.controller.sendToMotherShip('MAP_DATA', {
            droneId: this.droneId,
            coordinates: point,
            data: processedData
        });
    }
    
    async generateMap() {
        const map = await this.mapper.generateTopographicMap(
            this.missionData.mapData,
            this.missionData.resolution
        );
        
        // Envia mapa completo para a nave mãe
        await this.controller.sendToMotherShip('TOPOGRAPHIC_MAP', {
            droneId: this.droneId,
            map: map,
            metadata: {
                area: this.missionData.mappedArea,
                resolution: this.missionData.resolution,
                points: this.missionData.mapData.length
            }
        });
        
        return map;
    }
    
    async endMission() {
        this.missionData.endTime = new Date();
        this.missionData.endCoordinates = await this.controller.getCurrentPosition();
        
        // Gera mapa final
        await this.generateMap();
        
        await this.sendMissionEndInfo();
        await this.deactivateSystems();
        
        console.log(\`Missão de mapeamento concluída para drone \${this.droneId}\`);
    }
    
    async sendMissionEndInfo() {
        const endInfo = {
            droneId: this.droneId,
            startTime: this.missionData.startTime,
            endTime: this.missionData.endTime,
            missionType: this.missionData.missionType,
            startCoordinates: this.missionData.startCoordinates,
            endCoordinates: this.missionData.endCoordinates,
            mappedArea: this.missionData.mappedArea,
            resolution: this.missionData.resolution,
            dataPoints: this.missionData.mapData.length
        };
        
        await this.controller.sendToMotherShip('MISSION_END', endInfo);
    }
    
    async deactivateSystems() {
        await this.controller.deactivateSonar();
        await this.controller.deactivateAllSensors();
        await this.controller.resetFlightPattern();
    }
}

module.exports = TopographicMappingProgram;`;
            break;
            
        case 5:
            title = 'ModerProgram - Programa Mestre';
            code = `// ModerProgram: Programa mestre de controle e gerenciamento de emergências
const EventEmitter = require('events');
const DroneController = require('./drone-controller');
const EmergencyHandler = require('./emergency-handler');

class ModerProgram extends EventEmitter {
    constructor(motherShipId) {
        super();
        this.motherShipId = motherShipId;
        this.activeDrones = new Map();
        this.missionQueue = [];
        this.emergencyMode = false;
        this.emergencyHandler = new EmergencyHandler(this);
        
        // Inicia monitoramento
        this.startMonitoring();
    }
    
    // Gerenciamento de Drones
    async registerDrone(droneId, droneType) {
        const controller = new DroneController(droneId);
        this.activeDrones.set(droneId, {
            controller: controller,
            type: droneType,
            status: 'STANDBY',
            lastUpdate: new Date(),
            mission: null
        });
        
        console.log(\`Drone \${droneId} registrado no sistema\`);
        
        // Envia configuração inicial para o drone
        await this.sendDroneConfiguration(droneId);
    }
    
    async sendDroneConfiguration(droneId) {
        const drone = this.activeDrones.get(droneId);
        if (!drone) return;
        
        const config = {
            motherShipId: this.motherShipId,
            emergencyProtocols: true,
            autoReturn: true,
            maxDepth: 500,
            maxDistance: 1000,
            communicationInterval: 5000
        };
        
        await drone.controller.sendConfiguration(config);
    }
    
    // Envio de Drones em Missão
    async sendDroneOnMission(droneId, missionData) {
        const drone = this.activeDrones.get(droneId);
        if (!drone || drone.status !== 'STANDBY') {
            throw new Error(\`Drone \${droneId} não disponível para missão\`);
        }
        
        // Prepara informações da missão
        const missionInfo = {
            id: this.generateMissionId(),
            droneId: droneId,
            startTime: new Date(),
            type: missionData.type,
            parameters: missionData.parameters,
            emergencyContact: this.motherShipId
        };
        
        // Envia drone para a missão
        await this.deployDrone(droneId, missionInfo);
        
        // Atualiza status
        drone.status = 'ON_MISSION';
        drone.mission = missionInfo;
        drone.lastUpdate = new Date();
        
        console.log(\`Drone \${droneId} enviado em missão \${missionInfo.id}\`);
        
        // Inicia monitoramento da missão
        this.monitorMission(droneId, missionInfo);
    }
    
    async deployDrone(droneId, missionInfo) {
        const drone = this.activeDrones.get(droneId);
        
        // Envia informações de partida para a nave mãe
        await this.sendMotherShipUpdate('DRONE_DEPLOYED', {
            droneId: droneId,
            missionId: missionInfo.id,
            timestamp: missionInfo.startTime,
            missionType: missionInfo.type,
            startCoordinates: missionInfo.parameters.coordinates
        });
        
        // Envia drone para localização inicial
        await drone.controller.navigateTo(missionInfo.parameters.coordinates);
        
        // Ativa sensores básicos
        await drone.controller.activateSensor('position');
        await drone.controller.activateSensor('battery');
        await drone.controller.activateSensor('depth');
        
        // Ativa câmera
        await drone.controller.activateCamera('navigation');
        
        // Ativa motores
        await drone.controller.activateMotors();
    }
    
    // Monitoramento de Missões
    monitorMission(droneId, missionInfo) {
        const interval = setInterval(async () => {
            const drone = this.activeDrones.get(droneId);
            if (!drone || drone.status !== 'ON_MISSION') {
                clearInterval(interval);
                return;
            }
            
            // Verifica status do drone
            const status = await this.checkDroneStatus(droneId);
            
            // Verifica condições de emergência
            if (await this.checkEmergencyConditions(droneId, status)) {
                await this.handleEmergency(droneId, status);
                return;
            }
            
            // Atualiza informações
            drone.lastUpdate = new Date();
            
            // Envia atualização para a nave mãe
            await this.sendMotherShipUpdate('MISSION_UPDATE', {
                droneId: droneId,
                missionId: missionInfo.id,
                status: status,
                timestamp: new Date()
            });
            
        }, 5000);
        
        // Armazena intervalo para limpeza posterior
        missionInfo.monitorInterval = interval;
    }
    
    async checkDroneStatus(droneId) {
        const drone = this.activeDrones.get(droneId);
        if (!drone) return null;
        
        const status = {
            position: await drone.controller.getCurrentPosition(),
            battery: await drone.controller.getBatteryLevel(),
            depth: await drone.controller.getDepth(),
            sensors: await drone.controller.getAllSensorData(),
            systems: await drone.controller.getSystemStatus()
        };
        
        return status;
    }
    
    // Gerenciamento de Emergências
    async checkEmergencyConditions(droneId, status) {
        // Verifica bateria crítica
        if (status.battery < 20) {
            return { type: 'LOW_BATTERY', severity: 'HIGH' };
        }
        
        // Verifica profundidade máxima
        if (status.depth > 450) {
            return { type: 'DEPTH_EXCEEDED', severity: 'HIGH' };
        }
        
        // Verifica falha de comunicação
        const drone = this.activeDrones.get(droneId);
        const timeSinceUpdate = Date.now() - drone.lastUpdate.getTime();
        if (timeSinceUpdate > 30000) {
            return { type: 'COMMUNICATION_LOSS', severity: 'CRITICAL' };
        }
        
        // Verifica falha de sistemas
        if (status.systems.some(system => system.status === 'ERROR')) {
            return { type: 'SYSTEM_FAILURE', severity: 'HIGH' };
        }
        
        return null;
    }
    
    async handleEmergency(droneId, emergency) {
        console.log(\`EMERGÊNCIA detectada no drone \${droneId}: \${emergency.type}\`);
        
        this.emergencyMode = true;
        
        const drone = this.activeDrones.get(droneId);
        if (!drone) return;
        
        // Para monitoramento normal
        if (drone.mission && drone.mission.monitorInterval) {
            clearInterval(drone.mission.monitorInterval);
        }
        
        // Envia alerta de emergência para a nave mãe
        await this.sendMotherShipUpdate('EMERGENCY', {
            droneId: droneId,
            type: emergency.type,
            severity: emergency.severity,
            timestamp: new Date()
        });
        
        // Executa protocolo de emergência
        await this.emergencyHandler.handle(droneId, emergency);
        
        // Atualiza status
        drone.status = 'EMERGENCY';
        
        // Inicia monitoramento de emergência
        this.monitorEmergency(droneId);
    }
    
    monitorEmergency(droneId) {
        const interval = setInterval(async () => {
            const drone = this.activeDrones.get(droneId);
            if (!drone) {
                clearInterval(interval);
                return;
            }
            
            const status = await this.checkDroneStatus(droneId);
            
            // Verifica se emergência foi resolvida
            if (await this.emergencyHandler.isResolved(droneId)) {
                await this.resolveEmergency(droneId);
                clearInterval(interval);
            }
            
            // Envia atualizações de emergência
            await this.sendMotherShipUpdate('EMERGENCY_UPDATE', {
                droneId: droneId,
                status: status,
                timestamp: new Date()
            });
            
        }, 2000);
        
        drone.emergencyInterval = interval;
    }
    
    async resolveEmergency(droneId) {
        const drone = this.activeDrones.get(droneId);
        if (!drone) return;
        
        console.log(\`Emergência resolvida para drone \${droneId}\`);
        
        // Limpa intervalo de emergência
        if (drone.emergencyInterval) {
            clearInterval(drone.emergencyInterval);
        }
        
        // Retorna drone para a nave mãe
        await this.returnDroneToBase(droneId);
        
        // Envia notificação de resolução
        await this.sendMotherShipUpdate('EMERGENCY_RESOLVED', {
            droneId: droneId,
            timestamp: new Date()
        });
        
        this.emergencyMode = false;
    }
    
    // Retorno de Drones
    async returnDroneToBase(droneId) {
        const drone = this.activeDrones.get(droneId);
        if (!drone) return;
        
        console.log(\`Retornando drone \${droneId} para a base\`);
        
        // Envia comando de retorno
        await drone.controller.returnToBase();
        
        // Atualiza status
        drone.status = 'RETURNING';
        
        // Monitora retorno
        this.monitorReturn(droneId);
    }
    
    monitorReturn(droneId) {
        const interval = setInterval(async () => {
            const drone = this.activeDrones.get(droneId);
            if (!drone) {
                clearInterval(interval);
                return;
            }
            
            const position = await drone.controller.getCurrentPosition();
            const distance = this.calculateDistance(position, this.getBasePosition());
            
            if (distance < 10) {
                // Drone chegou à base
                await this.landDrone(droneId);
                clearInterval(interval);
            }
            
        }, 3000);
        
        drone.returnInterval = interval;
    }
    
    async landDrone(droneId) {
        const drone = this.activeDrones.get(droneId);
        if (!drone) return;
        
        console.log(\`Pousando drone \${droneId}\`);
        
        // Pousa drone
        await drone.controller.land();
        
        // Desativa sistemas
        await drone.controller.deactivateAllSystems();
        
        // Atualiza status
        drone.status = 'STANDBY';
        drone.mission = null;
        drone.lastUpdate = new Date();
        
        // Limpa intervalos
        if (drone.returnInterval) {
            clearInterval(drone.returnInterval);
        }
        
        // Envia confirmação para a nave mãe
        await this.sendMotherShipUpdate('DRONE_LANDED', {
            droneId: droneId,
            timestamp: new Date()
        });
    }
    
    // Comunicação com a Nave Mãe
    async sendMotherShipUpdate(type, data) {
        const message = {
            type: type,
            source: 'MODER_PROGRAM',
            timestamp: new Date().toISOString(),
            data: data
        };
        
        // Simula envio para a nave mãe
        console.log('Enviando para nave mãe:', message);
        
        // Em um sistema real, aqui seria uma comunicação real
        // await this.motherShipCommunicator.send(message);
    }
    
    // Utilitários
    generateMissionId() {
        return \`MISSION_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    }
    
    calculateDistance(pos1, pos2) {
        // Implementação simplificada
        return Math.sqrt(
            Math.pow(pos1.lat - pos2.lat, 2) + 
            Math.pow(pos1.lng - pos2.lng, 2)
        );
    }
    
    getBasePosition() {
        return { lat: -23.5, lng: -46.6 }; // Posição da nave mãe
    }
    
    startMonitoring() {
        // Monitoramento contínuo do sistema
        setInterval(() => {
            this.performSystemCheck();
        }, 10000);
    }
    
    async performSystemCheck() {
        // Verifica status de todos os drones
        for (const [droneId, drone] of this.activeDrones) {
            try {
                const status = await this.checkDroneStatus(droneId);
                
                // Verifica se precisa de atenção
                if (status.battery < 30 || status.depth > 400) {
                    console.log(\`Atenção necessária para drone \${droneId}\`);
                }
                
            } catch (error) {
                console.error(\`Erro ao verificar drone \${droneId}:\`, error);
            }
        }
    }
}

module.exports = ModerProgram;`;
            break;
    }
    
    programTitle.textContent = title;
    programCode.textContent = code;
    programDetails.style.display = 'block';
    
    // Adiciona highlighting de sintaxe
    highlightSyntax(programCode);
    
    // Rola para o código
    programDetails.scrollIntoView({ behavior: 'smooth' });
}

// Função para copiar o código
function copyCode() {
    const code = document.getElementById('programCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showAlert('Código copiado para a área de transferência!', 'success');
    });
}

// Função simples de highlighting de sintaxe
function highlightSyntax(element) {
    let html = element.textContent;
    
    // Palavras-chave JavaScript
    const keywords = ['const', 'let', 'var', 'function', 'async', 'await', 'class', 'constructor', 
                     'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'new', 'this', 'super',
                     'extends', 'import', 'export', 'require', 'module', 'exports'];
    
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        html = html.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    
    // Strings
    html = html.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>');
    
    // Números
    html = html.replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');
    
    // Comentários
    html = html.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
    html = html.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
    
    // Funções
    html = html.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(');
    
    // Variáveis
    html = html.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[:=]/g, '<span class="variable">$1</span> ');
    
    element.innerHTML = html;
}