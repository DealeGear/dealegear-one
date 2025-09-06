// ========================================
// GEARHUB - PLANEJAMENTO DE PROJETOS
// ========================================

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let currentLanguage = 'pt';
let currentFramework = 'minimalist';
let currentProject = {
    id: null,
    name: '',
    status: 'editing',
    framework: 'minimalist',
    cards: []
};
let frameworks = [];
let templates = [];

// ========================================
// i18n → INTERNACIONALIZAÇÃO (PORTUGUÊS/INGLÊS)
// ========================================
const translations = {
    pt: {
        'project': 'Projeto',
        'status': 'Status:',
        'status-ready': 'Pronto',
        'status-editing': 'Editando',
        'status-saved': 'Salvo',
        'status-error': 'Erro',
        'new-project': 'Novo Projeto',
        'framework': 'Framework:',
        'my-projects': 'Meus Projetos',
        'save-project': 'Salvar Projeto',
        'edit-fields': 'Reeditar Campos',
        'delete-project': 'Deletar Projeto',
        'export-pdf': 'Exportar PDF',
        'help': 'Ajuda',
        'tools': 'Ferramentas',
        'templates': 'Templates',
        'prototypes': 'Protótipos',
        'criticize': 'Criticar',
        'test-hypothesis': 'Testar Hipótese',
        'extras': 'Extras',
        'documentation': 'Documentação',
        'dealegear-one': 'DealeGear One',
        'blog': 'Blog',
        'add-card': 'Adicionar Bloco',
        'image-placeholder': 'Área para imagem',
        'help-title': 'Ajuda',
        'help-content': `
            <h3>Bem-vindo ao GearHub!</h3>
            <p>O GearHub é uma ferramenta para planejamento de projetos através de cards interativos.</p>
            <h4>Como começar:</h4>
            <ol>
                <li>Dê um nome ao seu projeto no campo superior</li>
                <li>Selecione um framework (Minimalista, Corporativo ou Criativo)</li>
                <li>Preencha os cards com as informações do seu projeto</li>
                <li>Salve seu projeto localmente usando o botão "Salvar Projeto"</li>
            </ol>
            <h4>Funcionalidades:</h4>
            <ul>
                <li><strong>Frameworks:</strong> Estruturas pré-definidas para diferentes tipos de projetos</li>
                <li><strong>Templates:</strong> Exemplos prontos para inspiração</li>
                <li><strong>Salvar/Carregar:</strong> Armazene seus projetos localmente</li>
                <li><strong>Exportar PDF:</strong> Gere um documento com seu projeto</li>
                <li><strong>Modo Escuro:</strong> Alternância entre temas claro e escuro</li>
            </ul>
            <p>Para mais informações, acesse nossa documentação.</p>
        `,
        'project-saved': 'Projeto salvo com sucesso!',
        'project-deleted': 'Projeto deletado com sucesso!',
        'confirm-delete': 'Tem certeza que deseja deletar este projeto?',
        'no-projects': 'Nenhum projeto salvo ainda.',
        'select-project': 'Selecione um projeto para carregar:',
        'load-template': 'Carregar Template',
        'no-templates': 'Nenhum template disponível.',
        'select-template': 'Selecione um template para carregar:',
        'template-loaded': 'Template carregado com sucesso!',
        'project-created': 'Novo projeto criado!',
        'fields-enabled': 'Campos habilitados para edição!',
        'criticism-generated': 'Crítica gerada com sucesso!',
        'hypothesis-tested': 'Hipótese testada com sucesso!',
        'pdf-generated': 'PDF gerado com sucesso!',
        'error-saving': 'Erro ao salvar o projeto. Tente novamente.',
        'error-loading': 'Erro ao carregar os dados. Tente novamente.',
        'error-deleting': 'Erro ao deletar o projeto. Tente novamente.',
        'error-pdf': 'Erro ao gerar o PDF. Tente novamente.'
    },
    en: {
        'project': 'Project',
        'status': 'Status:',
        'status-ready': 'Ready',
        'status-editing': 'Editing',
        'status-saved': 'Saved',
        'status-error': 'Error',
        'new-project': 'New Project',
        'framework': 'Framework:',
        'my-projects': 'My Projects',
        'save-project': 'Save Project',
        'edit-fields': 'Edit Fields',
        'delete-project': 'Delete Project',
        'export-pdf': 'Export PDF',
        'help': 'Help',
        'tools': 'Tools',
        'templates': 'Templates',
        'prototypes': 'Prototypes',
        'criticize': 'Criticize',
        'test-hypothesis': 'Test Hypothesis',
        'extras': 'Extras',
        'documentation': 'Documentation',
        'dealegear-one': 'DealeGear One',
        'blog': 'Blog',
        'add-card': 'Add Block',
        'image-placeholder': 'Image Area',
        'help-title': 'Help',
        'help-content': `
            <h3>Welcome to GearHub!</h3>
            <p>GearHub is a tool for project planning through interactive cards.</p>
            <h4>How to start:</h4>
            <ol>
                <li>Name your project in the top field</li>
                <li>Select a framework (Minimalist, Corporate, or Creative)</li>
                <li>Fill in the cards with your project information</li>
                <li>Save your project locally using the "Save Project" button</li>
            </ol>
            <h4>Features:</h4>
            <ul>
                <li><strong>Frameworks:</strong> Predefined structures for different types of projects</li>
                <li><strong>Templates:</strong> Ready examples for inspiration</li>
                <li><strong>Save/Load:</strong> Store your projects locally</li>
                <li><strong>Export PDF:</strong> Generate a document with your project</li>
                <li><strong>Dark Mode:</strong> Toggle between light and dark themes</li>
            </ul>
            <p>For more information, check our documentation.</p>
        `,
        'project-saved': 'Project saved successfully!',
        'project-deleted': 'Project deleted successfully!',
        'confirm-delete': 'Are you sure you want to delete this project?',
        'no-projects': 'No saved projects yet.',
        'select-project': 'Select a project to load:',
        'load-template': 'Load Template',
        'no-templates': 'No templates available.',
        'select-template': 'Select a template to load:',
        'template-loaded': 'Template loaded successfully!',
        'project-created': 'New project created!',
        'fields-enabled': 'Fields enabled for editing!',
        'criticism-generated': 'Criticism generated successfully!',
        'hypothesis-tested': 'Hypothesis tested successfully!',
        'pdf-generated': 'PDF generated successfully!',
        'error-saving': 'Error saving the project. Please try again.',
        'error-loading': 'Error loading data. Please try again.',
        'error-deleting': 'Error deleting the project. Please try again.',
        'error-pdf': 'Error generating PDF. Please try again.'
    }
};

// Função para atualizar o idioma da interface
function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });

    // Atualizar opções de idioma
    document.querySelectorAll('#projectStatus option, #frameworkSelect option').forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (key && translations[currentLanguage][key]) {
            option.textContent = translations[currentLanguage][key];
        }
    });

    // Atualizar conteúdo da ajuda
    document.getElementById('helpContent').innerHTML = translations[currentLanguage]['help-content'];
}

// ========================================
// DARKMODE → ALTERNÂNCIA CLARO/ESCURO
// ========================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Salvar preferência no localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Atualizar ícone
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('.icon');
    icon.textContent = isDarkMode ? '☀️' : '🌙';
}

// Carregar preferência de modo escuro
function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').querySelector('.icon').textContent = '☀️';
    }
}

// ========================================
// DB → SALVAR/CARREGAR LOCALMENTE VIA INDEXEDDB
// ========================================
let db;

// Inicializar o IndexedDB
function initDB() {
    const request = indexedDB.open('GearHubDB', 1);

    request.onerror = function(event) {
        console.error('Erro ao abrir o banco de dados:', event.target.error);
        showNotification(translations[currentLanguage]['error-loading'], 'error');
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log('Banco de dados aberto com sucesso');
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        
        // Criar object store para projetos
        if (!db.objectStoreNames.contains('projects')) {
            const projectsStore = db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
            projectsStore.createIndex('name', 'name', { unique: false });
            projectsStore.createIndex('date', 'date', { unique: false });
        }
    };
}

// Salvar projeto no IndexedDB
function saveProject() {
    if (!db) {
        showNotification(translations[currentLanguage]['error-saving'], 'error');
        return;
    }

    // Coletar dados dos cards
    const cardsData = [];
    document.querySelectorAll('.card').forEach(card => {
        const cardId = card.getAttribute('data-card-id');
        const title = card.querySelector('.card-title').textContent;
        const content = card.querySelector('.card-textarea').value;
        
        cardsData.push({
            id: cardId,
            title: title,
            content: content
        });
    });

    // Preparar objeto do projeto
    const projectData = {
        name: document.getElementById('projectName').value || 'Sem nome',
        status: document.getElementById('projectStatus').value,
        framework: document.getElementById('frameworkSelect').value,
        cards: cardsData,
        date: new Date().toISOString()
    };

    // Se for um projeto existente, atualizar
    if (currentProject.id) {
        projectData.id = currentProject.id;
        
        const transaction = db.transaction(['projects'], 'readwrite');
        const objectStore = transaction.objectStore('projects');
        const request = objectStore.put(projectData);

        request.onsuccess = function() {
            showNotification(translations[currentLanguage]['project-saved'], 'success');
            currentProject = projectData;
        };

        request.onerror = function() {
            showNotification(translations[currentLanguage]['error-saving'], 'error');
        };
    } else {
        // Criar novo projeto
        const transaction = db.transaction(['projects'], 'readwrite');
        const objectStore = transaction.objectStore('projects');
        const request = objectStore.add(projectData);

        request.onsuccess = function(event) {
            projectData.id = event.target.result;
            showNotification(translations[currentLanguage]['project-saved'], 'success');
            currentProject = projectData;
        };

        request.onerror = function() {
            showNotification(translations[currentLanguage]['error-saving'], 'error');
        };
    }
}

// Carregar projetos do IndexedDB
function loadProjects() {
    if (!db) {
        showNotification(translations[currentLanguage]['error-loading'], 'error');
        return;
    }

    const transaction = db.transaction(['projects'], 'readonly');
    const objectStore = transaction.objectStore('projects');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        const projects = event.target.result;
        displayProjects(projects);
    };

    request.onerror = function() {
        showNotification(translations[currentLanguage]['error-loading'], 'error');
    };
}

// Exibir projetos na modal
function displayProjects(projects) {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';

    if (projects.length === 0) {
        projectsList.innerHTML = `<p>${translations[currentLanguage]['no-projects']}</p>`;
        return;
    }

    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.framework} - ${new Date(project.date).toLocaleDateString()}</p>
        `;
        
        projectItem.addEventListener('click', () => loadProject(project));
        projectsList.appendChild(projectItem);
    });
}

// Carregar um projeto específico
function loadProject(project) {
    // Atualizar dados do projeto atual
    currentProject = project;
    
    // Atualizar campos da interface
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectStatus').value = project.status;
    document.getElementById('frameworkSelect').value = project.framework;
    
    // Mudar para o framework do projeto
    changeFramework(project.framework);
    
    // Aguardar a criação dos cards antes de preenchê-los
    setTimeout(() => {
        // Preencher os cards com os dados do projeto
        project.cards.forEach(cardData => {
            const card = document.querySelector(`.card[data-card-id="${cardData.id}"]`);
            if (card) {
                const textarea = card.querySelector('.card-textarea');
                if (textarea) {
                    textarea.value = cardData.content;
                }
            }
        });
    }, 100);
    
    // Fechar a modal
    document.getElementById('projectsModal').classList.remove('active');
    
    showNotification(translations[currentLanguage]['fields-enabled'], 'success');
}

// Deletar projeto atual
function deleteProject() {
    if (!currentProject.id) {
        showNotification(translations[currentLanguage]['error-deleting'], 'error');
        return;
    }

    if (confirm(translations[currentLanguage]['confirm-delete'])) {
        const transaction = db.transaction(['projects'], 'readwrite');
        const objectStore = transaction.objectStore('projects');
        const request = objectStore.delete(currentProject.id);

        request.onsuccess = function() {
            showNotification(translations[currentLanguage]['project-deleted'], 'success');
            // Resetar o projeto atual
            currentProject = {
                id: null,
                name: '',
                status: 'editing',
                framework: 'minimalist',
                cards: []
            };
            // Limpar a interface
            document.getElementById('projectName').value = '';
            document.getElementById('projectStatus').value = 'editing';
            changeFramework('minimalist');
        };

        request.onerror = function() {
            showNotification(translations[currentLanguage]['error-deleting'], 'error');
        };
    }
}

// ========================================
// PDF → EXPORTAÇÃO DO PROJETO PARA PDF
// ========================================
function exportToPDF() {
    // Verificar se a biblioteca jsPDF está carregada
    if (typeof jsPDF === 'undefined') {
        // Carregar a biblioteca jsPDF dinamicamente
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function() {
            generatePDF();
        };
        document.head.appendChild(script);
    } else {
        generatePDF();
    }
}

function generatePDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurações do documento
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPosition = margin;
        
        // Adicionar título do projeto
        const projectName = document.getElementById('projectName').value || 'Sem nome';
        doc.setFontSize(20);
        doc.text(projectName, margin, yPosition);
        yPosition += 15;
        
        // Adicionar informações do projeto
        doc.setFontSize(12);
        doc.text(`${translations[currentLanguage]['status']}: ${document.getElementById('projectStatus').value}`, margin, yPosition);
        yPosition += 10;
        doc.text(`${translations[currentLanguage]['framework']}: ${document.getElementById('frameworkSelect').value}`, margin, yPosition);
        yPosition += 10;
        doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition);
        yPosition += 20;
        
        // Adicionar conteúdo dos cards
        doc.setFontSize(16);
        doc.text('Project Content:', margin, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        document.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('.card-title').textContent;
            const content = card.querySelector('.card-textarea').value;
            
            // Verificar se há espaço suficiente na página
            if (yPosition > pageHeight - 40) {
                doc.addPage();
                yPosition = margin;
            }
            
            // Adicionar título do card
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, yPosition);
            yPosition += 10;
            
            // Adicionar conteúdo do card
            doc.setFont('helvetica', 'normal');
            const lines = doc.splitTextToSize(content, pageWidth - 2 * margin);
            doc.text(lines, margin, yPosition);
            yPosition += lines.length * 7 + 10;
        });
        
        // Salvar o PDF
        doc.save(`${projectName.replace(/\s+/g, '_')}_GearHub.pdf`);
        showNotification(translations[currentLanguage]['pdf-generated'], 'success');
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showNotification(translations[currentLanguage]['error-pdf'], 'error');
    }
}

// ========================================
// FRAMEWORKS E TEMPLATES
// ========================================
// Carregar frameworks do arquivo JSON
function loadFrameworks() {
    fetch('frameworks.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar frameworks');
            }
            return response.json();
        })
        .then(data => {
            frameworks = data;
            populateFrameworkSelect();
            changeFramework('minimalist'); // Carregar framework padrão
        })
        .catch(error => {
            console.error('Erro ao carregar frameworks:', error);
            showNotification(translations[currentLanguage]['error-loading'], 'error');
        });
}

// Preencher seletor de frameworks
function populateFrameworkSelect() {
    const frameworkSelect = document.getElementById('frameworkSelect');
    frameworkSelect.innerHTML = '';
    
    frameworks.forEach(framework => {
        const option = document.createElement('option');
        option.value = framework.id;
        option.textContent = framework.name[currentLanguage];
        frameworkSelect.appendChild(option);
    });
}

// Mudar framework
function changeFramework(frameworkId) {
    currentFramework = frameworkId;
    const framework = frameworks.find(f => f.id === frameworkId);
    
    if (framework) {
        // Limpar cards existentes
        const cardsContainer = document.getElementById('cardsContainer');
        cardsContainer.innerHTML = '';
        
        // Criar novos cards com base no framework
        framework.cards.forEach(cardData => {
            createCard(cardData.id, cardData.title[currentLanguage], cardData.placeholder[currentLanguage]);
        });
        
        // Atualizar o seletor de framework
        document.getElementById('frameworkSelect').value = frameworkId;
    }
}

// Carregar templates do arquivo JSON
function loadTemplates() {
    fetch('templates.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar templates');
            }
            return response.json();
        })
        .then(data => {
            templates = data;
        })
        .catch(error => {
            console.error('Erro ao carregar templates:', error);
            showNotification(translations[currentLanguage]['error-loading'], 'error');
        });
}

// Exibir templates na modal
function displayTemplates() {
    const templatesList = document.getElementById('templatesList');
    templatesList.innerHTML = '';

    if (templates.length === 0) {
        templatesList.innerHTML = `<p>${translations[currentLanguage]['no-templates']}</p>`;
        return;
    }

    templates.forEach(template => {
        const templateItem = document.createElement('div');
        templateItem.className = 'template-item';
        templateItem.innerHTML = `
            <h3>${template.name[currentLanguage]}</h3>
            <p>${template.description[currentLanguage]}</p>
        `;
        
        templateItem.addEventListener('click', () => loadTemplate(template));
        templatesList.appendChild(templateItem);
    });
}

// Carregar um template específico
function loadTemplate(template) {
    // Mudar para o framework do template
    changeFramework(template.framework);
    
    // Aguardar a criação dos cards antes de preenchê-los
    setTimeout(() => {
        // Preencher os cards com os dados do template
        Object.entries(template.cards).forEach(([cardId, cardContent]) => {
            const card = document.querySelector(`.card[data-card-id="${cardId}"]`);
            if (card) {
                const textarea = card.querySelector('.card-textarea');
                if (textarea) {
                    textarea.value = cardContent[currentLanguage];
                }
            }
        });
    }, 100);
    
    // Fechar a modal
    document.getElementById('templatesModal').classList.remove('active');
    
    showNotification(translations[currentLanguage]['template-loaded'], 'success');
}

// ========================================
// MANIPULAÇÃO DE CARDS
// ========================================
// Criar um novo card
function createCard(id, title, placeholder) {
    const cardsContainer = document.getElementById('cardsContainer');
    
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-card-id', id);
    
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${title}</h3>
            <button class="card-remove" data-card-id="${id}">×</button>
        </div>
        <div class="card-content">
            <textarea class="card-textarea" placeholder="${placeholder}"></textarea>
        </div>
    `;
    
    cardsContainer.appendChild(card);
    
    // Adicionar evento de remoção
    card.querySelector('.card-remove').addEventListener('click', function() {
        removeCard(id);
    });
}

// Remover um card
function removeCard(cardId) {
    const card = document.querySelector(`.card[data-card-id="${cardId}"]`);
    if (card) {
        card.remove();
    }
}

// Adicionar um novo card personalizado
function addNewCard() {
    const cardId = 'custom_' + Date.now();
    const title = prompt(translations[currentLanguage]['add-card'] + ':');
    
    if (title) {
        createCard(cardId, title, '');
    }
}

// ========================================
// FUNCIONALIDADES ADICIONAIS
// ========================================
// Criar novo projeto
function createNewProject() {
    // Resetar o projeto atual
    currentProject = {
        id: null,
        name: '',
        status: 'editing',
        framework: 'minimalist',
        cards: []
    };
    
    // Limpar a interface
    document.getElementById('projectName').value = '';
    document.getElementById('projectStatus').value = 'editing';
    changeFramework('minimalist');
    
    showNotification(translations[currentLanguage]['project-created'], 'success');
}

// Habilitar edição de campos
function enableFieldEditing() {
    // Habilitar todos os campos de texto
    document.querySelectorAll('.card-textarea').forEach(textarea => {
        textarea.disabled = false;
        textarea.focus();
    });
    
    showNotification(translations[currentLanguage]['fields-enabled'], 'success');
}

// Gerar crítica do projeto
function generateCriticism() {
    // Coletar dados do projeto
    const projectData = {
        name: document.getElementById('projectName').value || 'Sem nome',
        status: document.getElementById('projectStatus').value,
        framework: document.getElementById('frameworkSelect').value,
        cards: []
    };
    
    document.querySelectorAll('.card').forEach(card => {
        const cardId = card.getAttribute('data-card-id');
        const title = card.querySelector('.card-title').textContent;
        const content = card.querySelector('.card-textarea').value;
        
        projectData.cards.push({
            id: cardId,
            title: title,
            content: content
        });
    });
    
    // Converter para JSON e exibir
    const jsonStr = JSON.stringify(projectData, null, 2);
    
    // Criar uma janela modal para exibir o JSON
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${translations[currentLanguage]['criticize']}</h2>
            <pre style="background-color: var(--light-gray); padding: 1rem; border-radius: var(--border-radius); overflow: auto; max-height: 400px;">${jsonStr}</pre>
            <button style="margin-top: 1rem;" onclick="navigator.clipboard.writeText(\`${jsonStr.replace(/`/g, '\\`')}\`).then(() => alert('Copiado para a área de transferência!'));">Copiar JSON</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Adicionar evento para fechar a modal
    modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    showNotification(translations[currentLanguage]['criticism-generated'], 'success');
}

// Testar hipótese
function testHypothesis() {
    // Criar uma estrutura básica para testar hipóteses
    changeFramework('minimalist');
    
    // Preencher os cards com conteúdo básico
    setTimeout(() => {
        const problemCard = document.querySelector('.card[data-card-id="problem"] .card-textarea');
        const solutionCard = document.querySelector('.card[data-card-id="solution"] .card-textarea');
        const metricsCard = document.querySelector('.card[data-card-id="metrics"] .card-textarea');
        
        if (problemCard) problemCard.value = "Defina claramente o problema que você está tentando resolver...";
        if (solutionCard) solutionCard.value = "Descreva sua solução proposta e como ela resolve o problema...";
        if (metricsCard) metricsCard.value = "Defina como você medirá o sucesso da sua solução...";
    }, 100);
    
    showNotification(translations[currentLanguage]['hypothesis-tested'], 'success');
}

// ========================================
// UTILITÁRIOS
// ========================================
// Exibir notificação
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilização da notificação
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.boxShadow = 'var(--shadow)';
    notification.style.zIndex = '3000';
    notification.style.maxWidth = '300px';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'all 0.3s ease';
    
    // Cores baseadas no tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#4cc9f0';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f72585';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = 'var(--white)';
        notification.style.color = 'var(--dark-color)';
    }
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Carregar preferências do usuário
    loadDarkModePreference();
    
    // Inicializar banco de dados
    initDB();
    
    // Carregar frameworks e templates
    loadFrameworks();
    loadTemplates();
    
    // Configurar eventos
    
    // Menu toggle para mobile
    document.getElementById('menuToggle').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });
    
    // Alternar modo escuro
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    
    // Mudança de idioma
    document.getElementById('languageSelect').addEventListener('change', function() {
        currentLanguage = this.value;
        updateLanguage();
        populateFrameworkSelect();
    });
    
    // Mudança de framework
    document.getElementById('frameworkSelect').addEventListener('change', function() {
        changeFramework(this.value);
    });
    
    // Botões da barra lateral
    document.getElementById('newProjectBtn').addEventListener('click', createNewProject);
    document.getElementById('myProjectsBtn').addEventListener('click', function() {
        loadProjects();
        document.getElementById('projectsModal').classList.add('active');
    });
    document.getElementById('saveProjectBtn').addEventListener('click', saveProject);
    document.getElementById('editFieldsBtn').addEventListener('click', enableFieldEditing);
    document.getElementById('deleteProjectBtn').addEventListener('click', deleteProject);
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
    document.getElementById('helpBtn').addEventListener('click', function() {
        document.getElementById('helpModal').classList.add('active');
    });
    
    document.getElementById('templatesBtn').addEventListener('click', function() {
        displayTemplates();
        document.getElementById('templatesModal').classList.add('active');
    });
    
    document.getElementById('prototypesBtn').addEventListener('click', function() {
        window.open('#', '_blank');
    });
    
    document.getElementById('criticizeBtn').addEventListener('click', generateCriticism);
    document.getElementById('testHypothesisBtn').addEventListener('click', testHypothesis);
    
    // Botão adicionar card
    document.getElementById('addCardBtn').addEventListener('click', addNewCard);
    
    // Fechar modais
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Atualizar idioma inicial
    updateLanguage();
});