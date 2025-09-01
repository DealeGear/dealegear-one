// ============================================
// SEÇÃO 1: DADOS
// ============================================

// Dados da Nave Mãe
const mothership = {
    energy: 100,
    depth: 150,
    status: 'operacional',
    energyHistory: [100, 95, 90, 85, 80, 75, 70, 65, 60, 55]
};

// Dados dos Drones
const drones = [
    {
        id: 1,
        name: 'Drone 1 - Captura de Imagens',
        energy: 100,
        status: 'Em Base',
        position: { x: 0, y: 0 },
        currentTask: null,
        type: 'capture'
    },
    {
        id: 2,
        name: 'Drone 2 - Coleta de Amostras',
        energy: 100,
        status: 'Em Base',
        position: { x: 0, y: 0 },
        currentTask: null,
        type: 'collect'
    },
    {
        id: 3,
        name: 'Drone 3 - Medição de Parâmetros',
        energy: 100,
        status: 'Em Base',
        position: { x: 0, y: 0 },
        currentTask: null,
        type: 'measure'
    }
];

// Dados das Missões
const missions = [
    {
        id: 1,
        date: new Date(2023, 5, 15),
        drone: 'Drone 1',
        task: 'Captura de Imagens',
        status: 'Concluída',
        duration: '45 min',
        depth: '220m',
        energySpent: '25%',
        temperature: '12°C',
        salinity: '35‰',
        visibility: '8m'
    },
    {
        id: 2,
        date: new Date(2023, 5, 14),
        drone: 'Drone 2',
        task: 'Coleta de Amostras',
        status: 'Concluída',
        duration: '60 min',
        depth: '180m',
        energySpent: '30%',
        temperature: '14°C',
        salinity: '34‰',
        visibility: '6m'
    },
    {
        id: 3,
        date: new Date(2023, 5, 13),
        drone: 'Drone 3',
        task: 'Medição de Parâmetros',
        status: 'Concluída',
        duration: '30 min',
        depth: '150m',
        energySpent: '15%',
        temperature: '16°C',
        salinity: '35‰',
        visibility: '10m'
    }
];

// Códigos dos Programas
const programCodes = {
    exploration: `// Programa de Exploração Básica
function exploracaoBasica(drone) {
    // Define parâmetros de exploração
    const profundidadeMaxima = 300;
    const raioExploracao = 100;
    
    // Inicia exploração
    drone.moverPara(profundidadeMaxima);
    
    // Realiza varredura circular
    for (let angulo = 0; angulo < 360; angulo += 15) {
        const x = raioExploracao * Math.cos(angulo * Math.PI / 180);
        const y = raioExploracao * Math.sin(angulo * Math.PI / 180);
        drone.moverPara(x, y);
        drone.coletarDadosAmbientais();
    }
    
    // Retorna à base
    drone.retornarABase();
}`,
    capture: `// Programa de Captura de Imagens
function capturaImagens(drone) {
    // Configura câmera
    const camera = drone.camera;
    camera.setResolucao('4K');
    camera.setModo('RAW');
    
    // Define pontos de interesse
    const pontosInteresse = [
        { x: 50, y: 30, z: 200 },
        { x: -30, y: 40, z: 180 },
        { x: 20, y: -60, z: 220 }
    ];
    
    // Move para cada ponto e captura imagens
    for (const ponto of pontosInteresse) {
        drone.moverPara(ponto.x, ponto.y, ponto.z);
        camera.estabilizar();
        camera.capturarImagem(5); // Captura 5 imagens por ponto
    }
    
    // Retorna à base
    drone.retornarABase();
}`,
    collect: `// Programa de Coleta de Amostras
function coletaAmostras(drone) {
    // Configura braço robótico
    const braco = drone.bracoRobotico;
    braco.calibrar();
    
    // Define locais de coleta
    const locaisColeta = [
        { x: 40, y: 50, z: 190, tipo: 'rocha' },
        { x: -60, y: 30, z: 210, tipo: 'sedimento' },
        { x: 30, y: -40, z: 170, tipo: 'agua' }
    ];
    
    // Coleta amostras em cada local
    for (const local of locaisColeta) {
        drone.moverPara(local.x, local.y, local.z);
        
        if (local.tipo === 'rocha') {
            braco.coletarRocha();
        } else if (local.tipo === 'sedimento') {
            braco.coletarSedimento();
        } else if (local.tipo === 'agua') {
            braco.coletarAgua();
        }
        
        // Armazena amostra
        drone.armazenarAmostra(local.tipo);
    }
    
    // Retorna à base
    drone.retornarABase();
}`,
    mapping: `// Programa de Mapeamento Topográfico
function mapeamentoTopografico(drone) {
    // Configura sonar
    const sonar = drone.sonar;
    sonar.setFrequencia('100kHz');
    sonar.setAlcance('200m');
    
    // Define área de mapeamento
    const area = {
        xMin: -100,
        xMax: 100,
        yMin: -100,
        yMax: 100,
        resolucao: 10
    };
    
    // Inicia mapeamento
    const mapa = [];
    
    for (let x = area.xMin; x <= area.xMax; x += area.resolucao) {
        for (let y = area.yMin; y <= area.yMax; y += area.resolucao) {
            drone.moverPara(x, y);
            const profundidade = sonar.medirProfundidade();
            mapa.push({ x, y, profundidade });
        }
    }
    
    // Processa dados do mapa
    const mapaProcessado = processarDadosMapa(mapa);
    
    // Retorna à base
    drone.retornarABase();
    
    return mapaProcessado;
}`,
    emergency: `// Sistema Mestre de Emergência
function sistemaEmergencia(drone) {
    // Verifica status de emergência
    if (drone.bateria < 15 || drone.comunicacao.perdida()) {
        // Ativa modo de emergência
        drone.modoEmergencia = true;
        
        // Desliga sistemas não essenciais
        drone.camera.desligar();
        drone.bracoRobotico.recolher();
        drone.iluminacao.reduzir(20);
        
        // Tenta restabelecer comunicação
        if (drone.comunicacao.perdida()) {
            drone.comunicacao.tentarReconectar();
        }
        
        // Calcula rota mais eficiente de retorno
        const rota = drone.calcularRotaRetorno();
        
        // Executa retorno
        for (const ponto of rota) {
            drone.moverPara(ponto.x, ponto.y, ponto.z);
            
            // Verifica bateria durante o retorno
            if (drone.bateria < 5) {
                // Pouso de emergência
                drone.pousoEmergencia();
                break;
            }
        }
        
        // Se chegou à base com sucesso
        if (drone.posicao.x === 0 && drone.posicao.y === 0) {
            drone.modoEmergencia = false;
            drone.conectarRecarregar();
        }
    }
}`
};

// Função para simular dados
function simularDados() {
    // Simula consumo de energia da nave mãe
    if (mothership.energy > 0) {
        mothership.energy -= 0.05;
        if (mothership.energy < 0) mothership.energy = 0;
        
        // Atualiza histórico de energia
        mothership.energyHistory.push(mothership.energy);
        if (mothership.energyHistory.length > 10) {
            mothership.energyHistory.shift();
        }
    }
    
    // Simula consumo de energia dos drones
    drones.forEach(drone => {
        // Drones consomem energia mais rápido quando estão em missão
        const consumo = drone.currentTask ? 0.2 : 0.05;
        
        if (drone.energy > 0) {
            drone.energy -= consumo;
            if (drone.energy < 0) drone.energy = 0;
            
            // Se a bateria chegar a 10%, retorna automaticamente
            if (drone.energy <= 10 && drone.status !== 'Retornando' && drone.status !== 'Em Base') {
                addLogEntry(`Bateria crítica do ${drone.name} (${drone.energy.toFixed(1)}%). Retornando automaticamente.`);
                retornarDrone(drone.id);
            }
        }
        
        // Atualiza posição dos drones no sonar
        if (drone.status === 'Em Missão') {
            // Animação de movimento circular
            const time = Date.now() / 1000;
            const radius = 120;
            const speed = 0.5;
            
            drone.position.x = radius * Math.cos(time * speed + drone.id);
            drone.position.y = radius * Math.sin(time * speed + drone.id);
        } else {
            // Retorna à posição central (base)
            drone.position.x = 0;
            drone.position.y = 0;
        }
    });
    
    // Atualiza a UI
    atualizarUI();
}

// ============================================
// SEÇÃO 2: FUNCIONALIDADES
// ============================================

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', function() {
    // Configura eventos do menu
    setupMenuEvents();
    
    // Configura eventos dos controles da nave mãe
    setupMothershipControls();
    
    // Configura eventos dos drones
    setupDroneControls();
    
    // Configura eventos dos programas
    setupProgramControls();
    
    // Configura eventos dos relatórios
    setupReportControls();
    
    // Configura eventos dos modais
    setupModalEvents();
    
    // Inicializa a UI
    atualizarUI();
    
    // Inicia simulação de dados
    setInterval(simularDados, 1000);
    
    // Adiciona entrada de log inicial
    addLogEntry('Sistema inicializado com sucesso');
});

// Configura eventos do menu
function setupMenuEvents() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove classe active de todos os itens
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Adiciona classe active ao item clicado
            this.classList.add('active');
            
            // Obtém a seção correspondente
            const sectionId = this.getAttribute('data-section');
            
            // Esconde todas as seções
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostra a seção correspondente
            document.getElementById(sectionId).classList.add('active');
            
            // Se a seção for de relatórios, atualiza a tabela
            if (sectionId === 'reports') {
                atualizarTabelaRelatorios();
            }
            
            // Se a seção for da nave mãe, atualiza o gráfico
            if (sectionId === 'mothership') {
                atualizarGraficoEnergia();
            }
        });
    });
}

// Configura eventos dos controles da nave mãe
function setupMothershipControls() {
    // Slider de profundidade
    const depthSlider = document.getElementById('depth-slider');
    const depthValue = document.getElementById('depth-value');
    
    depthSlider.addEventListener('input', function() {
        const depth = this.value;
        depthValue.textContent = `${depth}m`;
        mothership.depth = parseInt(depth);
        addLogEntry(`Profundidade ajustada para ${depth}m`);
    });
    
    // Botão da boia solar
    const solarBuoyBtn = document.getElementById('solar-buoy-btn');
    
    solarBuoyBtn.addEventListener('click', function() {
        // Recarrega energia da nave mãe
        mothership.energy = Math.min(100, mothership.energy + 30);
        addLogEntry('Boia solar acionada. Energia da nave mãe recarregada em 30%.');
        atualizarUI();
    });
    
    // Botão do modo autônomo
    const autonomousModeBtn = document.getElementById('autonomous-mode-btn');
    
    autonomousModeBtn.addEventListener('click', function() {
        // Retorna todos os drones à base
        drones.forEach(drone => {
            if (drone.status !== 'Em Base') {
                retornarDrone(drone.id);
            }
        });
        addLogEntry('Modo autônomo ativado. Todos os drones retornando à base.');
    });
}

// Configura eventos dos drones
function setupDroneControls() {
    // Botões de missão
    const missionButtons = document.querySelectorAll('.mission-btn');
    
    missionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const droneId = parseInt(this.getAttribute('data-drone'));
            const task = this.getAttribute('data-task');
            
            enviarDroneParaMissao(droneId, task);
        });
    });
    
    // Botões de retorno
    const returnButtons = document.querySelectorAll('.return-btn');
    
    returnButtons.forEach(button => {
        button.addEventListener('click', function() {
            const droneId = parseInt(this.getAttribute('data-drone'));
            
            retornarDrone(droneId);
        });
    });
}

// Configura eventos dos programas
function setupProgramControls() {
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('click', function() {
            const programId = this.getAttribute('data-program');
            
            // Abre modal com o código do programa
            abrirModalCodigo(programId);
        });
    });
}

// Configura eventos dos relatórios
function setupReportControls() {
    // A ser implementado quando a tabela for atualizada
}

// Configura eventos dos modais
function setupModalEvents() {
    // Fechar modal ao clicar no botão de fechar
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
        });
    });
    
    // Fechar modal ao clicar fora do conteúdo
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Botão para copiar código
    const copyCodeBtn = document.getElementById('copy-code-btn');
    
    copyCodeBtn.addEventListener('click', function() {
        const codeContent = document.getElementById('code-content').textContent;
        
        // Copia para a área de transferência
        navigator.clipboard.writeText(codeContent)
            .then(() => {
                // Feedback visual
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar código: ', err);
            });
    });
}

// Envia drone para missão
function enviarDroneParaMissao(droneId, taskType) {
    const drone = drones.find(d => d.id === droneId);
    
    if (!drone) return;
    
    // Verifica se o drone está disponível
    if (drone.status !== 'Em Base') {
        addLogEntry(`${drone.name} não está disponível para missão. Status atual: ${drone.status}`);
        return;
    }
    
    // Verifica se há energia suficiente
    if (drone.energy < 20) {
        addLogEntry(`${drone.name} não tem energia suficiente para missão. Bateria: ${drone.energy.toFixed(1)}%`);
        return;
    }
    
    // Define a tarefa
    let taskName = '';
    switch (taskType) {
        case 'capture':
            taskName = 'Captura de Imagens';
            break;
        case 'collect':
            taskName = 'Coleta de Amostras';
            break;
        case 'measure':
            taskName = 'Medição de Parâmetros';
            break;
    }
    
    // Atualiza status do drone
    drone.status = 'Em Missão';
    drone.currentTask = taskType;
    
    // Adiciona entrada no log
    addLogEntry(`${drone.name} enviado para missão: ${taskName}`);
    
    // Simula a duração da missão
    const missionDuration = 10000 + Math.random() * 20000; // 10-30 segundos
    
    setTimeout(() => {
        // Verifica se o drone ainda está em missão (não foi cancelado)
        if (drone.status === 'Em Missão') {
            // Completa a missão
            completarMissao(droneId, taskName);
        }
    }, missionDuration);
    
    // Atualiza a UI
    atualizarUI();
}

// Retorna drone à base
function retornarDrone(droneId) {
    const drone = drones.find(d => d.id === droneId);
    
    if (!drone) return;
    
    // Se já está retornando ou na base, não faz nada
    if (drone.status === 'Retornando' || drone.status === 'Em Base') {
        return;
    }
    
    // Atualiza status
    drone.status = 'Retornando';
    drone.currentTask = null;
    
    // Adiciona entrada no log
    addLogEntry(`${drone.name} retornando à base`);
    
    // Simula o tempo de retorno
    const returnTime = 5000; // 5 segundos
    
    setTimeout(() => {
        // Drone chegou à base
        drone.status = 'Em Base';
        drone.position.x = 0;
        drone.position.y = 0;
        
        // Recarrega um pouco da energia
        drone.energy = Math.min(100, drone.energy + 10);
        
        // Adiciona entrada no log
        addLogEntry(`${drone.name} retornou à base com sucesso. Bateria: ${drone.energy.toFixed(1)}%`);
        
        // Atualiza a UI
        atualizarUI();
    }, returnTime);
    
    // Atualiza a UI imediatamente
    atualizarUI();
}

// Completa missão do drone
function completarMissao(droneId, taskName) {
    const drone = drones.find(d => d.id === droneId);
    
    if (!drone) return;
    
    // Gera dados ambientais fictícios
    const temperature = (10 + Math.random() * 10).toFixed(1);
    const salinity = (30 + Math.random() * 10).toFixed(1);
    const visibility = (5 + Math.random() * 10).toFixed(1);
    
    // Calcula energia gasta
    const energySpent = 20 + Math.random() * 20;
    drone.energy = Math.max(0, drone.energy - energySpent);
    
    // Cria registro da missão
    const mission = {
        id: missions.length + 1,
        date: new Date(),
        drone: drone.name,
        task: taskName,
        status: 'Concluída',
        duration: `${Math.floor(20 + Math.random() * 40)} min`,
        depth: `${Math.floor(100 + Math.random() * 300)}m`,
        energySpent: `${energySpent.toFixed(1)}%`,
        temperature: `${temperature}°C`,
        salinity: `${salinity}‰`,
        visibility: `${visibility}m`
    };
    
    // Adiciona ao histórico de missões
    missions.unshift(mission);
    
    // Mantém apenas as últimas 10 missões
    if (missions.length > 10) {
        missions.pop();
    }
    
    // Evento aleatório de falha de comunicação (10% de chance)
    if (Math.random() < 0.1) {
        // Simula falha de comunicação
        addLogEntry(`ALERTA: Falha de comunicação com ${drone.name} durante a missão!`);
        
        // Tenta reconectar após um tempo
        setTimeout(() => {
            addLogEntry(`Comunicação com ${drone.name} restabelecida.`);
        }, 3000);
    } else {
        // Missão concluída com sucesso
        addLogEntry(`${drone.name} concluiu missão: ${taskName}`);
    }
    
    // Retorna o drone à base
    retornarDrone(droneId);
}

// Atualiza a UI
function atualizarUI() {
    // Atualiza energia da nave mãe
    const mothershipEnergyBar = document.getElementById('mothership-energy');
    const mothershipEnergyValue = document.getElementById('mothership-energy-value');
    
    if (mothershipEnergyBar && mothershipEnergyValue) {
        mothershipEnergyBar.style.width = `${mothership.energy}%`;
        mothershipEnergyValue.textContent = `${mothership.energy.toFixed(1)}%`;
        
        // Muda a cor da barra conforme o nível de energia
        if (mothership.energy > 50) {
            mothershipEnergyBar.style.background = 'linear-gradient(90deg, var(--primary-1), var(--secondary-1))';
        } else if (mothership.energy > 20) {
            mothershipEnergyBar.style.background = 'linear-gradient(90deg, var(--status-warning), var(--secondary-1))';
        } else {
            mothershipEnergyBar.style.background = 'linear-gradient(90deg, var(--status-error), var(--status-warning))';
        }
    }
    
    // Atualiza drones ativos
    const activeDronesElement = document.getElementById('active-drones');
    if (activeDronesElement) {
        const activeDrones = drones.filter(d => d.status !== 'Em Base').length;
        activeDronesElement.textContent = `${activeDrones}/3`;
    }
    
    // Atualiza profundidade média
    const averageDepthElement = document.getElementById('average-depth');
    if (averageDepthElement) {
        // Calcula profundidade média considerando a nave mãe e drones em missão
        let totalDepth = mothership.depth;
        let count = 1;
        
        drones.forEach(drone => {
            if (drone.status === 'Em Missão') {
                totalDepth += mothership.depth + (Math.random() * 100 - 50);
                count++;
            }
        });
        
        const averageDepth = Math.floor(totalDepth / count);
        averageDepthElement.textContent = `${averageDepth}m`;
    }
    
    // Atualiza cards dos drones
    drones.forEach(drone => {
        // Energia
        const energyBar = document.getElementById(`drone${drone.id}-energy`);
        const energyValue = document.getElementById(`drone${drone.id}-energy-value`);
        
        if (energyBar && energyValue) {
            energyBar.style.width = `${drone.energy}%`;
            energyValue.textContent = `${drone.energy.toFixed(1)}%`;
            
            // Muda a cor da barra conforme o nível de energia
            if (drone.energy > 50) {
                energyBar.style.background = 'linear-gradient(90deg, var(--primary-1), var(--secondary-1))';
            } else if (drone.energy > 20) {
                energyBar.style.background = 'linear-gradient(90deg, var(--status-warning), var(--secondary-1))';
            } else {
                energyBar.style.background = 'linear-gradient(90deg, var(--status-error), var(--status-warning))';
            }
        }
        
        // Status
        const statusElement = document.getElementById(`drone${drone.id}-status`);
        if (statusElement) {
            statusElement.textContent = drone.status;
            
            // Muda a cor do status
            if (drone.status === 'Em Base') {
                statusElement.style.color = 'var(--status-ok)';
            } else if (drone.status === 'Em Missão') {
                statusElement.style.color = 'var(--secondary-1)';
            } else if (drone.status === 'Retornando') {
                statusElement.style.color = 'var(--status-warning)';
            }
        }
        
        // Indicador de status no card
        const statusIndicator = document.querySelector(`#drone${drone.id}-card .status-indicator`);
        if (statusIndicator) {
            // Remove todas as classes de status
            statusIndicator.classList.remove('ok', 'warning', 'error');
            
            // Adiciona a classe apropriada
            if (drone.status === 'Em Base') {
                statusIndicator.classList.add('ok');
            } else if (drone.status === 'Em Missão') {
                statusIndicator.classList.add('ok');
            } else if (drone.status === 'Retornando') {
                statusIndicator.classList.add('warning');
            }
        }
        
        // Posição no sonar
        const droneSonar = document.getElementById(`drone${drone.id}-sonar`);
        if (droneSonar) {
            // Converte posição para coordenadas no sonar
            const centerX = 200; // Centro do sonar
            const centerY = 200;
            
            // Calcula posição no sonar (limitada ao raio do sonar)
            const maxRadius = 180;
            const distance = Math.min(maxRadius, Math.sqrt(drone.position.x * drone.position.x + drone.position.y * drone.position.y));
            
            // Calcula ângulo
            let angle = Math.atan2(drone.position.y, drone.position.x);
            
            // Converte para coordenadas do sonar
            const sonarX = centerX + distance * Math.cos(angle);
            const sonarY = centerY + distance * Math.sin(angle);
            
            // Posiciona o drone no sonar
            droneSonar.style.left = `${sonarX}px`;
            droneSonar.style.top = `${sonarY}px`;
            droneSonar.style.transform = 'translate(-50%, -50%)';
        }
    });
    
    // Atualiza gráfico de energia se estiver na seção da nave mãe
    if (document.getElementById('mothership').classList.contains('active')) {
        atualizarGraficoEnergia();
    }
}

// Atualiza o gráfico de energia
function atualizarGraficoEnergia() {
    const canvas = document.getElementById('energy-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpa o canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configurações do gráfico
    const padding = 30;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    
    // Desenha fundo
    ctx.fillStyle = 'rgba(0, 26, 51, 0.3)';
    ctx.fillRect(padding, padding, graphWidth, graphHeight);
    
    // Desenha grade
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Linhas horizontais
    for (let i = 0; i <= 4; i++) {
        const y = padding + (i * graphHeight / 4);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${100 - i * 25}%`, padding - 5, y + 4);
    }
    
    // Desenha dados
    const data = mothership.energyHistory;
    const barWidth = graphWidth / data.length;
    
    data.forEach((value, index) => {
        const barHeight = (value / 100) * graphHeight;
        const x = padding + index * barWidth;
        const y = padding + graphHeight - barHeight;
        
        // Define a cor da barra conforme o valor
        if (value > 50) {
            ctx.fillStyle = 'rgba(0, 153, 204, 0.7)';
        } else if (value > 20) {
            ctx.fillStyle = 'rgba(243, 156, 18, 0.7)';
        } else {
            ctx.fillStyle = 'rgba(231, 76, 60, 0.7)';
        }
        
        ctx.fillRect(x + barWidth * 0.1, y, barWidth * 0.8, barHeight);
    });
    
    // Desenha título
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Histórico de Consumo de Energia', width / 2, 20);
}

// Atualiza a tabela de relatórios
function atualizarTabelaRelatorios() {
    const tbody = document.getElementById('reports-tbody');
    if (!tbody) return;
    
    // Limpa a tabela
    tbody.innerHTML = '';
    
    // Adiciona as missões
    missions.forEach(mission => {
        const row = document.createElement('tr');
        
        // Formata a data
        const dateFormatted = `${mission.date.getDate()}/${mission.date.getMonth() + 1}/${mission.date.getFullYear()}`;
        
        // Define a cor do status
        let statusClass = '';
        if (mission.status === 'Concluída') {
            statusClass = 'status-ok';
        } else if (mission.status === 'Em Andamento') {
            statusClass = 'status-warning';
        } else if (mission.status === 'Falha') {
            statusClass = 'status-error';
        }
        
        row.innerHTML = `
            <td>${dateFormatted}</td>
            <td>${mission.drone}</td>
            <td>${mission.task}</td>
            <td class="${statusClass}">${mission.status}</td>
            <td>
                <button class="details-btn" data-mission-id="${mission.id}">
                    Detalhes
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Adiciona eventos aos botões de detalhes
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const missionId = parseInt(this.getAttribute('data-mission-id'));
            const mission = missions.find(m => m.id === missionId);
            
            if (mission) {
                abrirModalMissao(mission);
            }
        });
    });
}

// Abre modal com detalhes da missão
function abrirModalMissao(mission) {
    const modal = document.getElementById('mission-modal');
    
    // Preenche os dados da missão
    document.getElementById('mission-duration').textContent = mission.duration;
    document.getElementById('mission-depth').textContent = mission.depth;
    document.getElementById('mission-energy').textContent = mission.energySpent;
    document.getElementById('mission-temperature').textContent = mission.temperature;
    document.getElementById('mission-salinity').textContent = mission.salinidade;
    document.getElementById('mission-visibility').textContent = mission.visibility;
    
    // Exibe o modal
    modal.classList.add('active');
}

// Abre modal com código do programa
function abrirModalCodigo(programId) {
    const modal = document.getElementById('code-modal');
    const codeContent = document.getElementById('code-content');
    const codeModalTitle = document.getElementById('code-modal-title');
    
    // Define o título
    let programTitle = '';
    switch (programId) {
        case 'exploration':
            programTitle = 'Exploração Básica';
            break;
        case 'capture':
            programTitle = 'Captura de Imagens';
            break;
        case 'collect':
            programTitle = 'Coleta de Amostras';
            break;
        case 'mapping':
            programTitle = 'Mapeamento Topográfico';
            break;
        case 'emergency':
            programTitle = 'Sistema Mestre de Emergência';
            break;
    }
    
    codeModalTitle.textContent = programTitle;
    
    // Define o código
    codeContent.textContent = programCodes[programId];
    
    // Exibe o modal
    modal.classList.add('active');
}

// Adiciona entrada no log de atividades
function addLogEntry(message) {
    const logContainer = document.getElementById('activity-log');
    if (!logContainer) return;
    
    // Cria a entrada do log
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    // Formata a data e hora atual
    const now = new Date();
    const timeFormatted = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    // Define o conteúdo
    logEntry.textContent = `[${timeFormatted}] ${message}`;
    
    // Adiciona ao início do container
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Limita o número de entradas no log
    while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.lastChild);
    }
    
    // Rola para o topo
    logContainer.scrollTop = 0;
}