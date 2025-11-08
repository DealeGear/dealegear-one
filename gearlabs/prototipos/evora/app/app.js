// Variáveis globais
let scene, camera, renderer, city, animationId;
let currentLanguage = localStorage.getItem('language') || 'pt';
const translations = {};

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    initializeTheme();
    initializeLanguageSelector();
    initializeMenuToggle();
    initializeTabs();
    initializeCopyButtons();
    initializeDownloadButtons();
    
    // Inicializar Three.js quando a aba de preview estiver visível
    const previewTab = document.getElementById('preview-tab');
    if (previewTab.classList.contains('active')) {
        initializeThreeJS();
    }
    
    // Adicionar evento para inicializar Three.js quando a aba for selecionada
    document.querySelector('[data-tab="preview"]').addEventListener('click', () => {
        if (!renderer) {
            setTimeout(initializeThreeJS, 100);
        }
    });
});

// Carregar traduções
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations.data = await response.json();
        updatePageText();
    } catch (error) {
        console.error('Erro ao carregar traduções:', error);
    }
}

// Atualizar textos da página com base no idioma
function updatePageText() {
    if (!translations.data) return;
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const keys = element.getAttribute('data-translate').split('.');
        let value = translations.data[currentLanguage];
        
        for (const key of keys) {
            if (value && value[key] !== undefined) {
                value = value[key];
            } else {
                value = null;
                break;
            }
        }
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = currentLanguage;
    
    // Atualizar o seletor de idioma
    document.getElementById('language-select').value = currentLanguage;
}

// Inicializar seletor de idioma
function initializeLanguageSelector() {
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('language', currentLanguage);
        updatePageText();
    });
}

// Inicializar tema
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('theme-dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('theme-dark');
        const isDark = document.body.classList.contains('theme-dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Inicializar menu toggle
function initializeMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
        });
    });
}

// Inicializar abas
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            const tabPane = document.getElementById(`${tabId}-tab`);
            
            // Remover classe active de todos os botões e painéis
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Adicionar classe active ao botão e painel clicados
            button.classList.add('active');
            tabPane.classList.add('active');
        });
    });
}

// Inicializar botões de copiar
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);
            const text = codeElement.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copiado!';
                button.style.backgroundColor = 'var(--secondary-color)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar texto:', err);
            });
        });
    });
}

// Inicializar botões de download
function initializeDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filename = button.getAttribute('data-file');
            
            // Simular download - em um ambiente real, isso faria o download do arquivo
            const originalText = button.textContent;
            button.textContent = 'Preparando download...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                
                // Notificação simulada
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.textContent = `Download de ${filename} iniciado.`;
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.backgroundColor = 'var(--secondary-color)';
                notification.style.color = 'white';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '4px';
                notification.style.zIndex = '1000';
                notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.opacity = '0';
                    notification.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 500);
                }, 3000);
            }, 1000);
        });
    });
}

// Inicializar Three.js
async function initializeThreeJS() {
    const container = document.getElementById('three-container');
    if (!container) return;
    
    // Importar Three.js dinamicamente
    const THREE = await import('https://unpkg.com/three@0.154.0/build/three.module.js');
    
    // Configurar cena
    scene = new THREE.Scene();
    
    // Configurar câmera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);
    
    // Configurar renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x87CEEB); // Cor do céu
    container.appendChild(renderer.domElement);
    
    // Adicionar luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 15);
    scene.add(directionalLight);
    
    // Criar cidade procedural
    createCity(THREE);
    
    // Adicionar código ao snippet
    updateThreeJSSnippet();
    
    // Adicionar evento de redimensionamento
    window.addEventListener('resize', onWindowResize);
    
    // Iniciar animação
    animate();
}

// Criar cidade procedural
function createCity(THREE) {
    city = new THREE.Group();
    
    // Criar chão
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4CAF50,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    city.add(ground);
    
    // Criar edifícios
    const buildingCount = 20;
    const buildingColors = [0x3498db, 0xe74c3c, 0x9b59b6, 0xf1c40f, 0x2ecc71];
    
    for (let i = 0; i < buildingCount; i++) {
        const width = Math.random() * 3 + 1;
        const height = Math.random() * 10 + 2;
        const depth = Math.random() * 3 + 1;
        
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ 
            color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
            roughness: 0.7,
            metalness: 0.3
        });
        
        const building = new THREE.Mesh(geometry, material);
        building.position.x = (Math.random() - 0.5) * 40;
        building.position.y = height / 2;
        building.position.z = (Math.random() - 0.5) * 40;
        
        city.add(building);
    }
    
    // Criar árvores
    const treeCount = 30;
    
    for (let i = 0; i < treeCount; i++) {
        // Tronco
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        
        // Folhas
        const leavesGeometry = new THREE.ConeGeometry(1.5, 3, 8);
        const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x2E8B57 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 2.5;
        
        const tree = new THREE.Group();
        tree.add(trunk);
        tree.add(leaves);
        
        tree.position.x = (Math.random() - 0.5) * 45;
        tree.position.y = 0;
        tree.position.z = (Math.random() - 0.5) * 45;
        
        city.add(tree);
    }
    
    // Adicionar cidade à cena
    scene.add(city);
}

// Atualizar snippet de código Three.js
function updateThreeJSSnippet() {
    const codeElement = document.getElementById('threejs-code');
    if (!codeElement) return;
    
    const codeSnippet = `// Exemplo de criação de cena Three.js com cidade procedural
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

// Configurar cena
const scene = new THREE.Scene();

// Configurar câmera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 15, 30);
camera.lookAt(0, 0, 0);

// Configurar renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x87CEEB); // Cor do céu
container.appendChild(renderer.domElement);

// Adicionar luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 15);
scene.add(directionalLight);

// Criar cidade
const city = new THREE.Group();

// Criar chão
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x4CAF50,
    roughness: 0.8
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.5;
city.add(ground);

// Criar edifícios
const buildingCount = 20;
const buildingColors = [0x3498db, 0xe74c3c, 0x9b59b6, 0xf1c40f, 0x2ecc71];

for (let i = 0; i < buildingCount; i++) {
    const width = Math.random() * 3 + 1;
    const height = Math.random() * 10 + 2;
    const depth = Math.random() * 3 + 1;
    
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ 
        color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
        roughness: 0.7,
        metalness: 0.3
    });
    
    const building = new THREE.Mesh(geometry, material);
    building.position.x = (Math.random() - 0.5) * 40;
    building.position.y = height / 2;
    building.position.z = (Math.random() - 0.5) * 40;
    
    city.add(building);
}

// Adicionar cidade à cena
scene.add(city);

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    
    // Rotacionar cidade lentamente
    city.rotation.y += 0.005;
    
    renderer.render(scene, camera);
}

animate();

// NOTA: Para substituir por um modelo GLTF/GLB, use o GLTFLoader:
/*
import { GLTFLoader } from 'https://unpkg.com/three@0.154.0/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('path/to/model.glb', function(gltf) {
    scene.add(gltf.scene);
}, undefined, function(error) {
    console.error('Erro ao carregar modelo:', error);
});
*/`;
    
    codeElement.textContent = codeSnippet;
}

// Função de animação
function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Rotacionar cidade lentamente
    if (city) {
        city.rotation.y += 0.005;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Redimensionar janela
function onWindowResize() {
    const container = document.getElementById('three-container');
    if (!container || !camera || !renderer) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Carregar exemplos Python quando a aba estiver ativa
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se a aba Python está ativa
    const pythonTab = document.getElementById('python-tab');
    if (pythonTab && pythonTab.classList.contains('active')) {
        loadPythonExample();
    }
    
    // Verificar se a aba MQTT está ativa
    const mqttTab = document.getElementById('mqtt-tab');
    if (mqttTab && mqttTab.classList.contains('active')) {
        loadMQTTExample();
    }
    
    // Adicionar eventos para carregar exemplos quando as abas forem selecionadas
    document.querySelector('[data-tab="python"]')?.addEventListener('click', () => {
        setTimeout(loadPythonExample, 100);
    });
    
    document.querySelector('[data-tab="mqtt"]')?.addEventListener('click', () => {
        setTimeout(loadMQTTExample, 100);
    });
});

// Carregar exemplo Python
async function loadPythonExample() {
    const codeElement = document.getElementById('python-code');
    if (!codeElement) return;
    
    try {
        const response = await fetch('raspberry_control_example.py');
        const code = await response.text();
        codeElement.textContent = code;
    } catch (error) {
        console.error('Erro ao carregar exemplo Python:', error);
        codeElement.textContent = '// Erro ao carregar o exemplo. Verifique se o arquivo raspberry_control_example.py existe.';
    }
}

// Carregar exemplo MQTT
async function loadMQTTExample() {
    const codeElement = document.getElementById('mqtt-code');
    if (!codeElement) return;
    
    try {
        const response = await fetch('raspberry_mqtt_example.py');
        const code = await response.text();
        codeElement.textContent = code;
    } catch (error) {
        console.error('Erro ao carregar exemplo MQTT:', error);
        codeElement.textContent = '// Erro ao carregar o exemplo. Verifique se o arquivo raspberry_mqtt_example.py existe.';
    }
}