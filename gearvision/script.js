// Global variables
let areaChart, donutChart, barChart, treemapChart, gaugeChart;
let map;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Verificar preferência de tema salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    // Garante que a Home seja a página inicial
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.classList.add('active');
    }
    
    initializeCharts();
    initializeMap();
});

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');

    // Update page title
    const titles = {
        'home': 'GearVision - Plataforma de Análise de Projetos',
        'area-chart': 'Análise de Projetos - Gráfico de Área',
        'donut-chart': 'Análise de Projetos - Gráfico Donut',
        'bar-chart': 'Análise de Projetos - Barras Horizontais',
        'treemap-chart': 'Análise de Projetos - Treemap',
        'gauge-chart': 'Análise de Projetos - Gauge',
        'map-page': 'Análise de Projetos - Mapa Interativo',
        'insights': 'Análise de Projetos - Insights'
    };
    document.getElementById('pageTitle').textContent = titles[pageId];

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }

    // Resize map if map page
    if (pageId === 'map-page' && map) {
        setTimeout(() => map.invalidateSize(), 100);
    }
}

// Theme toggle functions
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(false);
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(true);
    }
    
    // Atualizar gráficos para o novo tema
    updateChartsTheme();
}

function updateThemeIcon(isDarkMode) {
    const themeIcon = document.getElementById('theme-icon');
    if (isDarkMode) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function updateChartsTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#F9FAFB' : '#1F2937';
    const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
    
    // Atualizar gráfico de área
    if (areaChart) {
        areaChart.options.scales.y.ticks.color = textColor;
        areaChart.options.scales.x.ticks.color = textColor;
        areaChart.options.scales.y.grid.color = gridColor;
        areaChart.options.scales.x.grid.color = gridColor;
        areaChart.options.plugins.legend.labels.color = textColor;
        areaChart.update();
    }
    
    // Atualizar gráfico donut
    if (donutChart) {
        donutChart.options.plugins.legend.labels.color = textColor;
        donutChart.update();
    }
    
    // Atualizar gráfico de barras
    if (barChart) {
        barChart.options.scales.y.ticks.color = textColor;
        barChart.options.scales.x.ticks.color = textColor;
        barChart.options.scales.y.grid.color = gridColor;
        barChart.options.plugins.legend.labels.color = textColor;
        barChart.update();
    }
    
    // Atualizar gauge
    if (gaugeChart) {
        gaugeChart.options.plugins.legend.labels.color = textColor;
        gaugeChart.update();
    }
}

// Initialize all charts
function initializeCharts() {
    initializeAreaChart();
    initializeDonutChart();
    initializeBarChart();
    initializeTreemap();
    initializeGauge();
}

// Area Chart
function initializeAreaChart() {
    const ctx = document.getElementById('areaChart').getContext('2d');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#F9FAFB' : '#1F2937';
    const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
    
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, 'rgba(79, 70, 229, 0.8)');
    gradient1.addColorStop(1, 'rgba(79, 70, 229, 0.1)');

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
    gradient2.addColorStop(1, 'rgba(236, 72, 153, 0.1)');

    const gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient3.addColorStop(0, 'rgba(124, 58, 237, 0.8)');
    gradient3.addColorStop(1, 'rgba(124, 58, 237, 0.1)');

    areaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Projeto Alpha',
                data: [20, 35, 40, 50, 65, 70, 80, 85, 90, 95, 98, 100],
                borderColor: '#4F46E5',
                backgroundColor: gradient1,
                fill: true,
                tension: 0.4
            }, {
                label: 'Projeto Beta',
                data: [10, 25, 30, 45, 55, 60, 70, 75, 80, 85, 90, 95],
                borderColor: '#EC4899',
                backgroundColor: gradient2,
                fill: true,
                tension: 0.4
            }, {
                label: 'Projeto Gamma',
                data: [5, 15, 25, 35, 45, 55, 65, 70, 75, 80, 85, 90],
                borderColor: '#7C3AED',
                backgroundColor: gradient3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                }
            }
        }
    });
}

function updateAreaChart() {
    const period = document.getElementById('areaPeriod').value;
    const type = document.getElementById('areaType').value;
    
    // Simulate data update based on selections
    let labels, data1, data2, data3;
    
    if (period === '6') {
        labels = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        data1 = [80, 85, 90, 95, 98, 100];
        data2 = [70, 75, 80, 85, 90, 95];
        data3 = [65, 70, 75, 80, 85, 90];
    } else if (period === '12') {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        data1 = [20, 35, 40, 50, 65, 70, 80, 85, 90, 95, 98, 100];
        data2 = [10, 25, 30, 45, 55, 60, 70, 75, 80, 85, 90, 95];
        data3 = [5, 15, 25, 35, 45, 55, 65, 70, 75, 80, 85, 90];
    } else {
        labels = Array.from({length: 24}, (_, i) => `Mês ${i + 1}`);
        data1 = Array.from({length: 24}, (_, i) => Math.min(100, 10 + i * 4 + Math.random() * 10));
        data2 = Array.from({length: 24}, (_, i) => Math.min(100, 5 + i * 3.5 + Math.random() * 10));
        data3 = Array.from({length: 24}, (_, i) => Math.min(100, 2 + i * 3 + Math.random() * 10));
    }

    areaChart.data.labels = labels;
    areaChart.data.datasets[0].data = data1;
    areaChart.data.datasets[1].data = data2;
    areaChart.data.datasets[2].data = data3;
    areaChart.update();
}

// Donut Chart
function initializeDonutChart() {
    const ctx = document.getElementById('donutChart').getContext('2d');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#F9FAFB' : '#1F2937';
    
    donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Projeto Alpha', 'Projeto Beta', 'Projeto Gamma', 'Projeto Delta', 'Outros'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#4F46E5',
                    '#EC4899',
                    '#7C3AED',
                    '#10B981',
                    '#F59E0B'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

function updateDonutChart() {
    const resource = document.getElementById('donutResource').value;
    const dept = document.getElementById('donutDept').value;
    
    // Simulate different data based on selections
    let data;
    if (resource === 'budget') {
        data = [30, 25, 20, 15, 10];
    } else if (resource === 'team') {
        data = [35, 20, 25, 12, 8];
    } else {
        data = [28, 22, 18, 20, 12];
    }
    
    donutChart.data.datasets[0].data = data;
    donutChart.update();
}

// Bar Chart
function initializeBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#F9FAFB' : '#1F2937';
    const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
    
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Projeto Alpha', 'Projeto Beta', 'Projeto Gamma', 'Projeto Delta', 'Projeto Epsilon'],
            datasets: [{
                label: 'Taxa de Conclusão',
                data: [95, 87, 92, 78, 85],
                backgroundColor: [
                    '#4F46E5',
                    '#EC4899',
                    '#7C3AED',
                    '#10B981',
                    '#F59E0B'
                ],
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.x + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                },
                y: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                }
            }
        }
    });
}

function updateBarChart() {
    const metric = document.getElementById('barMetric').value;
    const status = document.getElementById('barStatus').value;
    
    // Simulate data update
    let data, label;
    if (metric === 'completion') {
        data = [95, 87, 92, 78, 85];
        label = 'Taxa de Conclusão';
    } else if (metric === 'satisfaction') {
        data = [88, 92, 85, 90, 87];
        label = 'Satisfação do Cliente';
    } else if (metric === 'roi') {
        data = [120, 95, 110, 85, 105];
        label = 'ROI (%)';
    } else {
        data = [92, 88, 90, 82, 89];
        label = 'Eficiência';
    }
    
    barChart.data.datasets[0].data = data;
    barChart.data.datasets[0].label = label;
    barChart.update();
}

// Treemap
function initializeTreemap() {
    // Note: Chart.js doesn't have native treemap support
    // This is a simplified version using rectangles
    const canvas = document.getElementById('treemapChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw treemap rectangles
    const data = [
        { name: 'Projeto Alpha', value: 30, color: '#4F46E5' },
        { name: 'Projeto Beta', value: 25, color: '#EC4899' },
        { name: 'Projeto Gamma', value: 20, color: '#7C3AED' },
        { name: 'Projeto Delta', value: 15, color: '#10B981' },
        { name: 'Projeto Epsilon', value: 10, color: '#F59E0B' }
    ];
    
    drawTreemap(ctx, data, canvas.width, canvas.height);
}

function drawTreemap(ctx, data, width, height) {
    let x = 0, y = 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    data.forEach(item => {
        const itemWidth = (item.value / total) * width;
        const itemHeight = height * 0.8;
        
        // Draw rectangle
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, itemWidth - 5, itemHeight);
        
        // Draw text
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.name, x + itemWidth/2, y + itemHeight/2);
        ctx.fillText(item.value + '%', x + itemWidth/2, y + itemHeight/2 + 20);
        
        x += itemWidth;
    });
}

function updateTreemap() {
    const size = document.getElementById('treemapSize').value;
    const color = document.getElementById('treemapColor').value;
    
    // Simulate data update
    const data = [
        { name: 'Projeto Alpha', value: Math.floor(Math.random() * 30) + 20, color: '#4F46E5' },
        { name: 'Projeto Beta', value: Math.floor(Math.random() * 25) + 15, color: '#EC4899' },
        { name: 'Projeto Gamma', value: Math.floor(Math.random() * 20) + 10, color: '#7C3AED' },
        { name: 'Projeto Delta', value: Math.floor(Math.random() * 15) + 10, color: '#10B981' },
        { name: 'Projeto Epsilon', value: Math.floor(Math.random() * 10) + 5, color: '#F59E0B' }
    ];
    
    const canvas = document.getElementById('treemapChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTreemap(ctx, data, canvas.width, canvas.height);
}

// Gauge Chart
function initializeGauge() {
    const ctx = document.getElementById('gaugeChart').getContext('2d');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Create a custom gauge using Chart.js
    gaugeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [75, 25],
                backgroundColor: [
                    '#10B981',
                    isDarkMode ? '#374151' : '#E5E7EB'
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: isDarkMode ? '#F9FAFB' : '#1F2937'
                    }
                },
                tooltip: {
                    enabled: false
                }
            }
        },
        plugins: [{
            id: 'text',
            beforeDraw: function(chart) {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                
                ctx.restore();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.fillStyle = isDarkMode ? "#F9FAFB" : "#1F2937";
                
                const text = "75%";
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 1.5;
                
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}

function updateGauge() {
    const project = document.getElementById('gaugeProject').value;
    const metric = document.getElementById('gaugeMetric').value;
    
    // Simulate different values
    let value;
    if (project === 'project1') {
        value = 75;
    } else if (project === 'project2') {
        value = 85;
    } else if (project === 'project3') {
        value = 65;
    } else {
        value = 90;
    }
    
    if (metric === 'timeline') value -= 10;
    if (metric === 'budget') value -= 5;
    if (metric === 'quality') value += 5;
    
    value = Math.max(0, Math.min(100, value));
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    gaugeChart.data.datasets[0].backgroundColor = [
        '#10B981',
        isDarkMode ? '#374151' : '#E5E7EB'
    ];
    gaugeChart.data.datasets[0].data = [value, 100 - value];
    gaugeChart.update();
}

// Initialize Map
function initializeMap() {
    // Initialize map when map page is first shown
    map = L.map('map').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add sample markers
    const projects = [
        { name: 'Projeto Alpha', lat: 40.7128, lng: -74.0060, status: 'active' },
        { name: 'Projeto Beta', lat: 51.5074, lng: -0.1278, status: 'active' },
        { name: 'Projeto Gamma', lat: 35.6762, lng: 139.6503, status: 'completed' },
        { name: 'Projeto Delta', lat: -33.8688, lng: 151.2093, status: 'planning' },
        { name: 'Projeto Epsilon', lat: 19.4326, lng: -99.1332, status: 'active' }
    ];
    
    projects.forEach(project => {
        const color = project.status === 'active' ? '#10B981' : 
                     project.status === 'completed' ? '#4F46E5' : '#F59E0B';
        
        const marker = L.circleMarker([project.lat, project.lng], {
            radius: 10,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        
        marker.bindPopup(`
            <strong>${project.name}</strong><br>
            Status: ${project.status}<br>
            Progresso: ${Math.floor(Math.random() * 40) + 60}%
        `);
    });
}

function filterMapRegion() {
    // Simulate region filtering
    const region = document.getElementById('mapRegion').value;
    console.log('Filtering by region:', region);
    // In a real app, this would filter markers
}

function filterMapStatus() {
    // Simulate status filtering
    const status = document.getElementById('mapStatus').value;
    console.log('Filtering by status:', status);
    // In a real app, this would filter markers
}

// Show alert for footer links
function showAlert(section) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 400px; text-align: center;">
            <h3 style="margin-bottom: 1rem;">${section}</h3>
            <p style="color: #6B7280; margin-bottom: 1.5rem;">Esta seção estará disponível em breve.</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #4F46E5; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
                Fechar
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
});