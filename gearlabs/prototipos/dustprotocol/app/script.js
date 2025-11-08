// Variáveis globais
let currentLanguage = 'pt';
let currentTheme = 'dark';
let currentPage = 'home';

// Elementos do DOM
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const mainContent = document.getElementById('mainContent');
const languageBtn = document.getElementById('languageBtn');
const themeToggle = document.getElementById('themeToggle');

// Carregar textos
async function loadTexts() {
    const response = await fetch('texts.json');
    const texts = await response.json();
    return texts;
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    const texts = await loadTexts();
    
    // Menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            
            // Atualizar página ativa
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            
            // Carregar conteúdo da página
            const page = link.getAttribute('data-page');
            loadPage(page, texts);
        });
    });
    
    // Troca de idioma
    languageBtn.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'pt' ? 'en' : currentLanguage === 'en' ? 'es' : 'pt';
        languageBtn.textContent = currentLanguage.toUpperCase();
        loadPage(currentPage, texts);
    });
    
    // Troca de tema
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.toggle('light-mode');
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    });
    
    // Carregar página inicial
    loadPage('home', texts);
});

// Carregar conteúdo da página
function loadPage(page, texts) {
    currentPage = page;
    const pageTexts = texts[page][currentLanguage];
    
    let content = '';
    
    switch(page) {
        case 'home':
            content = `
                <div class="home-page">
                    <h2>${pageTexts.title}</h2>
                    <p>${pageTexts.welcome}</p>
                    <button class="btn-access" id="accessBtn">${pageTexts.accessButton}</button>
                </div>
            `;
            
            // Adicionar evento ao botão de acesso
            setTimeout(() => {
                document.getElementById('accessBtn').addEventListener('click', () => {
                    alert(pageTexts.accessMessage);
                });
            }, 100);
            break;
            
        case 'messages':
            content = `
                <h2>${pageTexts.title}</h2>
                <div class="messages-container">
                    ${pageTexts.messages.map((msg, index) => `
                        <div class="message-item encrypted" data-index="${index}">
                            <div class="encrypted-text">${msg.encrypted}</div>
                            <div class="decrypted-text" style="display: none;">${msg.decrypted}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Adicionar eventos de decodificação
            setTimeout(() => {
                document.querySelectorAll('.message-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const encryptedText = this.querySelector('.encrypted-text');
                        const decryptedText = this.querySelector('.decrypted-text');
                        
                        if (this.classList.contains('encrypted')) {
                            this.classList.remove('encrypted');
                            this.classList.add('decrypted');
                            encryptedText.style.display = 'none';
                            decryptedText.style.display = 'block';
                        } else {
                            this.classList.remove('decrypted');
                            this.classList.add('encrypted');
                            encryptedText.style.display = 'block';
                            decryptedText.style.display = 'none';
                        }
                    });
                });
            }, 100);
            break;
            
        case 'map':
            content = `
                <h2>${pageTexts.title}</h2>
                <p>${pageTexts.description}</p>
                <div class="map-container">
                    ${pageTexts.sectors.map((sector, index) => `
                        <div class="sector ${sector.locked ? 'locked' : ''}" data-index="${index}">
                            <h3>${sector.name}</h3>
                            <div class="sector-info" style="display: none;">${sector.info}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Adicionar eventos de clique nos setores
            setTimeout(() => {
                document.querySelectorAll('.sector').forEach(sector => {
                    sector.addEventListener('click', function() {
                        const info = this.querySelector('.sector-info');
                        if (info && info.style.display === 'none') {
                            info.style.display = 'block';
                        } else if (info) {
                            info.style.display = 'none';
                        }
                    });
                });
            }, 100);
            break;
            
        case 'files':
            content = `
                <h2>${pageTexts.title}</h2>
                <p>${pageTexts.description}</p>
                <div class="files-container">
                    ${pageTexts.files.map((file, index) => `
                        <div class="file-item ${file.corrupted ? 'corrupted' : ''}" data-index="${index}">
                            <h3>${file.name}</h3>
                            <div class="file-content" style="display: none;">${file.content}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="puzzle-container">
                    <h3>${pageTexts.puzzleTitle}</h3>
                    <div class="puzzle-grid">
                        ${Array(9).fill().map((_, i) => `
                            <div class="puzzle-item" data-index="${i}">${['⚡', '🔷', '🔴'][Math.floor(Math.random() * 3)]}</div>
                        `).join('')}
                    </div>
                    <button class="btn-access" id="puzzleBtn">${pageTexts.puzzleButton}</button>
                </div>
            `;
            
            // Adicionar eventos de clique nos arquivos
            setTimeout(() => {
                document.querySelectorAll('.file-item').forEach(file => {
                    file.addEventListener('click', function() {
                        const content = this.querySelector('.file-content');
                        if (content && content.style.display === 'none') {
                            content.style.display = 'block';
                        } else if (content) {
                            content.style.display = 'none';
                        }
                    });
                });
                
                // Adicionar evento ao botão do puzzle
                document.getElementById('puzzleBtn').addEventListener('click', () => {
                    const puzzleItems = document.querySelectorAll('.puzzle-item');
                    const selected = [];
                    
                    puzzleItems.forEach(item => {
                        if (item.classList.contains('selected')) {
                            selected.push(item.textContent);
                        }
                    });
                    
                    // Verificar se 3 símbolos iguais foram selecionados
                    const counts = {};
                    selected.forEach(symbol => {
                        counts[symbol] = (counts[symbol] || 0) + 1;
                    });
                    
                    const hasThreeEqual = Object.values(counts).some(count => count >= 3);
                    
                    if (hasThreeEqual) {
                        alert(pageTexts.puzzleSuccess);
                    } else {
                        alert(pageTexts.puzzleFail);
                    }
                });
                
                // Adicionar evento de seleção nos itens do puzzle
                document.querySelectorAll('.puzzle-item').forEach(item => {
                    item.addEventListener('click', function() {
                        this.classList.toggle('selected');
                    });
                });
            }, 100);
            break;
            
        case 'about':
            content = `
                <div class="about-page">
                    <h2>${pageTexts.title}</h2>
                    <p>${pageTexts.description}</p>
                    <p>${pageTexts.info}</p>
                </div>
            `;
            break;
    }
    
    mainContent.innerHTML = content;
}