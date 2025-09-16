// Variáveis globais
let currentLang = 'pt';
let isDarkMode = true;
let sensorData = {
    temperature: [],
    flux: [],
    vapor: []
};
let maxDataPoints = 20;
let updateInterval;

// Carregar textos multilíngue
async function loadTexts() {
    try {
        const response = await fetch('texts.json');
        const texts = await response.json();
        return texts;
    } catch (error) {
        console.error('Erro ao carregar textos:', error);
        return null;
    }
}

// Atualizar textos na página
function updateTexts(texts) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (texts[currentLang] && texts[currentLang][key]) {
            element.textContent = texts[currentLang][key];
        }
    });
}

// Inicialização da aplicação
async function initApp() {
    const texts = await loadTexts();
    if (texts) {
        updateTexts(texts);
        window.texts = texts;
    }

    // Configurar event listeners
    setupEventListeners();
    
    // Iniciar simulação de dados
    startDataSimulation();
    
    // Gerar dados de relatório
    generateReportData();
    
    // Inicializar gráficos
    initCharts();
}

// Configurar event listeners
function setupEventListeners() {
    // Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);
            
            // Atualizar link ativo
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Seleção de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Configurações de idioma
    document.querySelectorAll('input[name="language"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    });

    // Toggle de tema
    document.getElementById('themeToggle').addEventListener('change', (e) => {
        toggleTheme(e.target.checked);
    });

    // Controles de sensores
    document.getElementById('tempSensor').addEventListener('change', updateSensorVisibility);
    document.getElementById('fluxSensor').addEventListener('change', updateSensorVisibility);
    document.getElementById('vaporSensor').addEventListener('change', updateSensorVisibility);

    // Botão de download (simulado)
    document.getElementById('downloadPDF').addEventListener('click', () => {
        alert(window.texts ? window.texts[currentLang]['reports.downloadAlert'] : 'Download simulado!');
    });
}

// Mostrar página específica
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Mudar idioma
function changeLanguage(lang) {
    currentLang = lang;
    
    // Atualizar botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Atualizar radio buttons
    document.querySelector(`input[name="language"][value="${lang}"]`).checked = true;
    
    // Atualizar textos
    if (window.texts) {
        updateTexts(window.texts);
    }
    
    // Atualizar atributo lang do HTML
    document.documentElement.lang = lang;
}

// Toggle tema claro/escuro
function toggleTheme(dark) {
    isDarkMode = dark;
    document.body.classList.toggle('dark-mode', dark);
    document.body.classList.toggle('light-mode', !dark);
}

// Iniciar simulação de dados em tempo real
function startDataSimulation() {
    // Atualizar métricas principais
    updateMetrics();
    
    // Atualizar gráficos
    updateCharts();
    
    // Configurar intervalo de atualização
    updateInterval = setInterval(() => {
        updateMetrics();
        updateCharts();
    }, 2000); // Atualizar a cada 2 segundos
}

// Atualizar métricas do dashboard
function updateMetrics() {
    // Gerar valores simulados dentro de faixas realistas
    const temperature = (Math.random() * 150 + 200).toFixed(1); // 200-350°C
    const intensity = (Math.random() * 0.5 + 0.5).toFixed(2); // 0.5-1.0 kW/m²
    const energy = (Math.random() * 50 + 150).toFixed(1); // 150-200 kWh
    const efficiency = (Math.random() * 15 + 80).toFixed(1); // 80-95%
    
    // Atualizar DOM com animação
    animateValue('temperature', temperature + '°C');
    animateValue('intensity', intensity + ' kW/m²');
    animateValue('energy', energy + ' kWh');
    animateValue('efficiency', efficiency + '%');
    
    // Adicionar dados aos arrays para gráficos
    const timestamp = new Date().toLocaleTimeString();
    sensorData.temperature.push({ time: timestamp, value: parseFloat(temperature) });
    sensorData.flux.push({ time: timestamp, value: parseFloat(intensity) * 100 }); // Escala para melhor visualização
    sensorData.vapor.push({ time: timestamp, value: Math.random() * 100 + 200 }); // 200-300 kg/h
    
    // Manter apenas os últimos maxDataPoints
    if (sensorData.temperature.length > maxDataPoints) {
        sensorData.temperature.shift();
        sensorData.flux.shift();
        sensorData.vapor.shift();
    }
}

// Animação de valores
function animateValue(elementId, newValue) {
    const element = document.getElementById(elementId);
    element.style.transform = 'scale(1.1)';
    element.textContent = newValue;
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// Inicializar gráficos
function initCharts() {
    // Gráficos serão desenhados quando houver dados
    drawChart('temperatureChart', sensorData.temperature, '#FF6B35');
    drawChart('fluxChart', sensorData.flux, '#F7931E');
    drawChart('vaporChart', sensorData.vapor, '#4CAF50');
}

// Atualizar gráficos
function updateCharts() {
    if (document.getElementById('tempSensor').checked) {
        drawChart('temperatureChart', sensorData.temperature, '#FF6B35');
    }
    if (document.getElementById('fluxSensor').checked) {
        drawChart('fluxChart', sensorData.flux, '#F7931E');
    }
    if (document.getElementById('vaporSensor').checked) {
        drawChart('vaporChart', sensorData.vapor, '#4CAF50');
    }
}

// Desenhar gráfico simples
function drawChart(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    if (data.length < 2) return;
    
    // Configurar estilo
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.fillStyle = color + '20'; // Cor com transparência
    
    // Calcular escala
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    
    const padding = 20;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    // Desenhar linha do gráfico
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * graphWidth;
        const y = padding + graphHeight - ((point.value - minValue) / range) * graphHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Preencher área sob a curva
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Desenhar pontos
    data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * graphWidth;
        const y = padding + graphHeight - ((point.value - minValue) / range) * graphHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    });
}

// Atualizar visibilidade dos sensores
function updateSensorVisibility() {
    const tempEnabled = document.getElementById('tempSensor').checked;
    const fluxEnabled = document.getElementById('fluxSensor').checked;
    const vaporEnabled = document.getElementById('vaporSensor').checked;
    
    // Atualizar cards do dashboard (simulação)
    const tempCard = document.querySelector('.metric-card:nth-child(1)');
    const intensityCard = document.querySelector('.metric-card:nth-child(2)');
    const energyCard = document.querySelector('.metric-card:nth-child(3)');
    
    tempCard.style.opacity = tempEnabled ? '1' : '0.5';
    intensityCard.style.opacity = fluxEnabled ? '1' : '0.5';
    energyCard.style.opacity = vaporEnabled ? '1' : '0.5';
}

// Gerar dados de relatório
function generateReportData() {
    const tbody = document.getElementById('reportsTableBody');
    tbody.innerHTML = '';
    
    // Gerar dados para os últimos 7 dias
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${date.toLocaleDateString()}</td>
            <td>${(Math.random() * 150 + 200).toFixed(1)}</td>
            <td>${(Math.random() * 0.5 + 0.5).toFixed(2)}</td>
            <td>${(Math.random() * 50 + 150).toFixed(1)}</td>
            <td>${(Math.random() * 15 + 80).toFixed(1)}</td>
        `;
    }
}

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);

// Limpar intervalo quando a página for fechada
window.addEventListener('beforeunload', () => {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
});