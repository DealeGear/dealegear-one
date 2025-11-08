// Global variables
let currentLang = localStorage.getItem('preferredLanguage') || 'pt-BR';
let translations = {};

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');
const langBtns = document.querySelectorAll('.lang-btn');
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    initializeApp();
    setupEventListeners();
    generateMockData();
    updateCharts();
});

// Load translations from JSON
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Initialize app
function initializeApp() {
    // Set initial language
    setLanguage(currentLang);
    
    // Load settings
    loadSettings();
    
    // Show dashboard by default
    showSection('dashboard');
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
            navMenu.classList.remove('active');
        });
    });

    // Language switcher
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Modal close
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // WhatsApp functionality
    setupWhatsApp();

    // Social media functionality
    setupSocialMedia();

    // Reports functionality
    setupReports();

    // Plans functionality
    setupPlans();

    // Settings functionality
    setupSettings();
}

// Show section
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Set language
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update active language button
    langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update all translatable elements
    updateTranslations();
}

// Update translations
function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            element.placeholder = translation;
        }
    });
}

// Get translation
function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return null;
        }
    }
    
    return value;
}

// Setup WhatsApp functionality
function setupWhatsApp() {
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');

    // Send message
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, 'sent');
            messageInput.value = '';
            
            // Simulate reply after 1 second
            setTimeout(() => {
                const replies = [
                    'Obrigado pela sua mensagem!',
                    'Vou verificar isso para você.',
                    'Em breve retorno com mais informações.',
                    'Fico à disposição para ajudar!'
                ];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                addMessage(randomReply, 'received');
            }, 1000);
        }
    }

    // Quick replies
    quickReplyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const reply = btn.getAttribute('data-reply');
            addMessage(reply, 'sent');
            
            // Simulate reply
            setTimeout(() => {
                addMessage('Recebi sua mensagem! Em breve retorno.', 'received');
            }, 1000);
        });
    });

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
        
        messageDiv.innerHTML = `
            <p>${text}</p>
            <span class="time">${time}</span>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Setup social media functionality
function setupSocialMedia() {
    const schedulePostBtn = document.getElementById('schedulePostBtn');
    const postsGrid = document.getElementById('postsGrid');

    schedulePostBtn.addEventListener('click', () => {
        showModal('schedulePost');
    });

    // Generate mock posts
    generateMockPosts();
}

// Generate mock posts
function generateMockPosts() {
    const postsGrid = document.getElementById('postsGrid');
    const mockPosts = [
        {
            title: 'Novo produto lançado!',
            content: 'Estamos muito felizes em anunciar nosso mais novo produto. Venha conferir!',
            image: 'https://picsum.photos/seed/post1/400/300.jpg',
            date: '2 horas atrás'
        },
        {
            title: 'Dica do dia',
            content: 'Mantenha seu atendimento sempre atualizado para melhor experiência do cliente.',
            image: 'https://picsum.photos/seed/post2/400/300.jpg',
            date: '1 dia atrás'
        },
        {
            title: 'Promoção especial',
            content: 'Aproveite nossos planos com 20% de desconto neste mês!',
            image: 'https://picsum.photos/seed/post3/400/300.jpg',
            date: '3 dias atrás'
        }
    ];

    postsGrid.innerHTML = '';
    mockPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <div class="post-content">
                <h4>${post.title}</h4>
                <p>${post.content}</p>
                <div class="post-meta">
                    <span>❤️ 125</span>
                    <span>${post.date}</span>
                </div>
            </div>
        `;
        postsGrid.appendChild(postCard);
    });
}

// Setup reports functionality
function setupReports() {
    const exportCsvBtn = document.getElementById('exportCsvBtn');

    exportCsvBtn.addEventListener('click', exportCSV);
}

// Export CSV
function exportCSV() {
    const data = [
        ['Data', 'Atendimentos', 'Engajamento'],
        ['2024-01-01', '45', '120'],
        ['2024-01-02', '52', '135'],
        ['2024-01-03', '38', '98'],
        ['2024-01-04', '61', '156'],
        ['2024-01-05', '49', '127']
    ];

    let csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_conexa.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Update charts
function updateCharts() {
    // Simple chart simulation using canvas
    const attendancesCanvas = document.getElementById('attendancesChart');
    const engagementCanvas = document.getElementById('engagementChart');

    if (attendancesCanvas) {
        drawBarChart(attendancesCanvas, [45, 52, 38, 61, 49], '#22C55E');
    }

    if (engagementCanvas) {
        drawLineChart(engagementCanvas, [120, 135, 98, 156, 127], '#06B6D4');
    }
}

// Draw bar chart
function drawBarChart(canvas, data, color) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / data.length * 0.6;
    const maxValue = Math.max(...data);

    ctx.clearRect(0, 0, width, height);

    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 20);
        const x = (width / data.length) * index + (width / data.length - barWidth) / 2;
        const y = height - barHeight - 10;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, barHeight);
    });
}

// Draw line chart
function drawLineChart(canvas, data, color) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const maxValue = Math.max(...data);

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = height - (value / maxValue) * (height - 20) - 10;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

// Setup plans functionality
function setupPlans() {
    const planBtns = document.querySelectorAll('[data-plan]');

    planBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan');
            showModal('subscribe', { plan });
        });
    });
}

// Setup settings functionality
function setupSettings() {
    const settingsForm = document.getElementById('settingsForm');

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            companyName: document.getElementById('companyName').value,
            whatsappNumber: document.getElementById('whatsappNumber').value,
            preferredLanguage: document.getElementById('preferredLanguage').value
        };

        localStorage.setItem('settings', JSON.stringify(formData));
        
        // Update language if changed
        if (formData.preferredLanguage !== currentLang) {
            setLanguage(formData.preferredLanguage);
        }

        // Show success message
        alert(getTranslation('settings.success') || 'Configurações salvas com sucesso!');
    });
}

// Load settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    
    if (settings.companyName) {
        document.getElementById('companyName').value = settings.companyName;
    }
    
    if (settings.whatsappNumber) {
        document.getElementById('whatsappNumber').value = settings.whatsappNumber;
    }
    
    if (settings.preferredLanguage) {
        document.getElementById('preferredLanguage').value = settings.preferredLanguage;
    }
}

// Show modal
function showModal(type, data = {}) {
    const modalBody = document.getElementById('modalBody');
    let content = '';

    switch (type) {
        case 'schedulePost':
            content = `
                <h2 data-translate="social.schedulePost">Agendar Post</h2>
                <form id="schedulePostForm">
                    <div class="form-group">
                        <label data-translate="social.postTitle">Título do Post</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label data-translate="social.postContent">Conteúdo</label>
                        <textarea rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label data-translate="social.scheduleDate">Data de Agendamento</label>
                        <input type="datetime-local" required>
                    </div>
                    <div class="form-group">
                        <label data-translate="social.platform">Plataforma</label>
                        <select>
                            <option>Facebook</option>
                            <option>Instagram</option>
                            <option>Twitter</option>
                            <option>LinkedIn</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" data-translate="social.schedule">Agendar</button>
                </form>
            `;
            break;
        
        case 'subscribe':
            const planNames = {
                basic: getTranslation('plans.basic') || 'Básico',
                pro: getTranslation('plans.pro') || 'Pro',
                premium: getTranslation('plans.premium') || 'Premium'
            };
            content = `
                <h2 data-translate="plans.subscribeTitle">Assinar Plano ${planNames[data.plan]}</h2>
                <p data-translate="plans.subscribeMessage">Você está prestes a assinar o plano ${planNames[data.plan]}. Preencha os dados abaixo:</p>
                <form id="subscribeForm">
                    <div class="form-group">
                        <label data-translate="plans.fullName">Nome Completo</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label data-translate="plans.email">E-mail</label>
                        <input type="email" required>
                    </div>
                    <div class="form-group">
                        <label data-translate="plans.cardNumber">Número do Cartão</label>
                        <input type="text" placeholder="0000 0000 0000 0000" required>
                    </div>
                    <div class="form-group">
                        <label data-translate="plans.expiry">Validade</label>
                        <input type="text" placeholder="MM/AA" required>
                    </div>
                    <div class="form-group">
                        <label data-translate="plans.cvv">CVV</label>
                        <input type="text" placeholder="000" required>
                    </div>
                    <button type="submit" class="btn btn-primary" data-translate="plans.confirm">Confirmar Assinatura</button>
                </form>
            `;
            break;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';

    // Update translations in modal
    updateTranslations();

    // Setup form handlers
    if (type === 'schedulePost') {
        document.getElementById('schedulePostForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert(getTranslation('social.scheduleSuccess') || 'Post agendado com sucesso!');
            modal.style.display = 'none';
            generateMockPosts(); // Refresh posts
        });
    }

    if (type === 'subscribe') {
        document.getElementById('subscribeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert(getTranslation('plans.subscribeSuccess') || 'Assinatura confirmada com sucesso!');
            modal.style.display = 'none';
        });
    }
}

// Generate mock data
function generateMockData() {
    // Animate dashboard numbers
    animateNumber('attendancesCount', 127);
    animateNumber('scheduledPosts', 24);
    animateNumber('reportsCount', 8);
}

// Animate number
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}