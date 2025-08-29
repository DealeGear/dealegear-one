// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });
    
    // Energy bar animation
    setTimeout(() => {
        const energyBar = document.getElementById('energyBar');
        if (energyBar) {
            energyBar.style.width = '75%';
        }
    }, 500);
    
    // Initialize communication chart
    const ctx = document.getElementById('commChart');
    if (ctx) {
        const commChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Base', 'Satélite', 'Nave Mãe', 'Drone 1', 'Drone 2', 'Drone 3'],
                datasets: [{
                    label: 'Força do Sinal',
                    data: [100, 95, 90, 85, 88, 82],
                    borderColor: '#006994',
                    backgroundColor: 'rgba(0, 105, 148, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animate drones
function animateDrones() {
    const drones = document.querySelectorAll('.drone');
    drones.forEach((drone, index) => {
        drone.classList.add('active');
        setTimeout(() => {
            drone.classList.add(`moving${index + 1}`);
        }, index * 200);
    });
    
    setTimeout(() => {
        drones.forEach(drone => {
            drone.classList.remove('active', 'moving1', 'moving2', 'moving3');
        });
    }, 4000);
}

// Mission simulation
function simulateMission() {
    const missionSelect = document.getElementById('missionSelect');
    const statusDiv = document.getElementById('missionStatus');
    
    if (!missionSelect || !statusDiv) return;
    
    const mission = missionSelect.value;
    
    statusDiv.innerHTML = '<div class="loader"></div><p class="text-center">Iniciando missão...</p>';
    
    setTimeout(() => {
        statusDiv.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle me-2"></i>
                Missão "${getMissionName(mission)}" iniciada com sucesso!
                <br><small>3 drones foram despachados para a área designada.</small>
            </div>
        `;
    }, 2000);
}

function getMissionName(mission) {
    const missions = {
        'mapping': 'Mapeamento do Leito Marinho',
        'sampling': 'Coleta de Amostras',
        'inspection': 'Inspeção de Estruturas',
        'rescue': 'Busca e Resgate'
    };
    return missions[mission] || mission;
}