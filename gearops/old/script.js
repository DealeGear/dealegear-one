// Global variables
let currentUser = null;
let currentModule = 'dashboard';
let charts = {};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('gearops_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    } else {
        showLoginModal();
    }

    // Setup event listeners
    setupEventListeners();
    
    // Initialize dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
    }
    
    // Setup kanban drag and drop
    setupKanbanDragAndDrop();
});

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login validation
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0],
            role: 'admin',
            avatar: 'https://picsum.photos/seed/user1/40/40.jpg'
        };
        
        localStorage.setItem('gearops_user', JSON.stringify(currentUser));
        showMainApp();
    }
}

// Quick login for demo
function quickLogin(role) {
    const users = {
        admin: {
            email: 'admin@dealegear.com',
            name: 'Administrador',
            role: 'Administrador',
            avatar: 'https://picsum.photos/seed/admin/40/40.jpg'
        },
        manager: {
            email: 'manager@dealegear.com',
            name: 'Gestor',
            role: 'Gestor',
            avatar: 'https://picsum.photos/seed/manager/40/40.jpg'
        },
        partner: {
            email: 'partner@dealegear.com',
            name: 'Sócio',
            role: 'Sócio',
            avatar: 'https://picsum.photos/seed/partner/40/40.jpg'
        }
    };
    
    currentUser = users[role];
    localStorage.setItem('gearops_user', JSON.stringify(currentUser));
    showMainApp();
}

// Show main app
function showMainApp() {
    const loginModal = document.getElementById('loginModal');
    const mainApp = document.getElementById('mainApp');
    
    if (loginModal) loginModal.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');
    
    // Update user info
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    
    if (userName && currentUser) userName.textContent = currentUser.name;
    if (userRole && currentUser) userRole.textContent = currentUser.role;
    
    // Initialize dashboard
    showModule('dashboard');
    initializeCharts();
}

// Show login modal
function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const mainApp = document.getElementById('mainApp');
    
    if (loginModal) loginModal.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('gearops_user');
    showLoginModal();
}

// Toggle dark mode
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    
    // Update charts
    Object.values(charts).forEach(chart => {
        if (chart.options.scales) {
            const isDark = document.documentElement.classList.contains('dark');
            chart.options.scales.x.grid.color = isDark ? '#374151' : '#e5e7eb';
            chart.options.scales.y.grid.color = isDark ? '#374151' : '#e5e7eb';
            chart.options.scales.x.ticks.color = isDark ? '#9ca3af' : '#6b7280';
            chart.options.scales.y.ticks.color = isDark ? '#9ca3af' : '#6b7280';
            chart.update();
        }
    });
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('aside');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// Show module
function showModule(moduleName) {
    // Hide all modules
    document.querySelectorAll('.module-content').forEach(module => {
        module.classList.add('hidden');
    });
    
    // Show selected module
    const selectedModule = document.getElementById(moduleName + 'Module');
    if (selectedModule) {
        selectedModule.classList.remove('hidden');
    }
    
    // Update sidebar active state
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('bg-blue-50', 'dark:bg-blue-900/20', 'text-blue-600', 'dark:text-blue-400');
        item.classList.add('text-gray-700', 'dark:text-gray-300');
    });
    
    const activeItem = event.target.closest('.sidebar-item');
    if (activeItem) {
        activeItem.classList.add('bg-blue-50', 'dark:bg-blue-900/20', 'text-blue-600', 'dark:text-blue-400');
        activeItem.classList.remove('text-gray-700', 'dark:text-gray-300');
    }
    
    currentModule = moduleName;
}

// Initialize charts
function initializeCharts() {
    // Revenue vs Expenses Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        charts.revenue = new Chart(revenueCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Receita',
                    data: [32000, 35000, 38000, 42000, 45000, 48000],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Despesas',
                    data: [28000, 30000, 32000, 35000, 36000, 38000],
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Apps Status Chart
    const appsCtx = document.getElementById('appsChart');
    if (appsCtx) {
        charts.apps = new Chart(appsCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Ativos', 'Em Manutenção', 'Em Desenvolvimento'],
                datasets: [{
                    data: [6, 1, 1],
                    backgroundColor: [
                        'rgb(34, 197, 94)',
                        'rgb(251, 191, 36)',
                        'rgb(59, 130, 246)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }

    // Finance Evolution Chart
    const financeEvolutionCtx = document.getElementById('financeEvolutionChart');
    if (financeEvolutionCtx) {
        charts.financeEvolution = new Chart(financeEvolutionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Receita',
                    data: [32000, 35000, 38000, 42000, 45000, 48000],
                    backgroundColor: 'rgba(34, 197, 94, 0.8)'
                }, {
                    label: 'Despesas',
                    data: [28000, 30000, 32000, 35000, 36000, 38000],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Expenses Distribution Chart
    const expensesCtx = document.getElementById('expensesChart');
    if (expensesCtx) {
        charts.expenses = new Chart(expensesCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['SaaS', 'Infraestrutura', 'Terceiros', 'Marketing', 'Outros'],
                datasets: [{
                    data: [12000, 8500, 9500, 6500, 1700],
                    backgroundColor: [
                        'rgb(59, 130, 246)',
                        'rgb(168, 85, 247)',
                        'rgb(251, 146, 60)',
                        'rgb(34, 197, 94)',
                        'rgb(156, 163, 175)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }
}

// Export report
function exportReport() {
    // Simulate export functionality
    const format = prompt('Escolha o formato de exportação:\n1. PDF\n2. Excel\n\nDigite o número:');
    
    if (format === '1') {
        showNotification('Relatório PDF gerado com sucesso!', 'success');
    } else if (format === '2') {
        showNotification('Relatório Excel gerado com sucesso!', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup kanban drag and drop
function setupKanbanDragAndDrop() {
    const kanbanCards = document.querySelectorAll('.kanban-card');
    let draggedCard = null;

    kanbanCards.forEach(card => {
        card.draggable = true;
        
        card.addEventListener('dragstart', function(e) {
            draggedCard = this;
            this.style.opacity = '0.5';
        });
        
        card.addEventListener('dragend', function(e) {
            this.style.opacity = '';
        });
    });

    // Setup drop zones
    const columns = document.querySelectorAll('.bg-gray-100.dark\\:bg-gray-800.rounded-lg.p-4');
    
    columns.forEach(column => {
        column.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        column.addEventListener('drop', function(e) {
            e.preventDefault();
            if (draggedCard) {
                const cardContainer = this.querySelector('.space-y-3');
                if (cardContainer) {
                    cardContainer.appendChild(draggedCard);
                    showNotification('Tarefa movida com sucesso!', 'success');
                }
            }
        });
    });
}

// Add some utility functions
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for charts
window.addEventListener('resize', debounce(() => {
    Object.values(charts).forEach(chart => {
        chart.resize();
    });
}, 250));

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open command palette (simulated)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Command palette em desenvolvimento', 'info');
    }
    
    // Ctrl/Cmd + D to toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const loginModal = document.getElementById('loginModal');
        if (loginModal && !loginModal.classList.contains('hidden')) {
            // Do nothing, user must login
        }
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const sidebar = document.querySelector('aside');
        if (sidebar) {
            if (diff > 0) {
                // Swipe left - close sidebar
                sidebar.classList.remove('open');
            } else {
                // Swipe right - open sidebar
                sidebar.classList.add('open');
            }
        }
    }
}

// Initialize service worker for PWA capabilities (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}