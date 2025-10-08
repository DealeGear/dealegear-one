// ===== GEARHUB APPLICATION =====
// Main application logic for GearHub - a project creation and testing tool

// ===== GLOBAL VARIABLES =====
let currentLanguage = 'pt'; // Default language
let currentTheme = 'light'; // Default theme
let currentProject = null; // Current project data
let projects = []; // Array of all projects
let texts = {}; // Texts for internationalization
let templates = {}; // Templates data
let db = null; // IndexedDB instance

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Initialize the application
async function initApp() {
    try {
        // Load texts and templates
        await loadTexts();
        await loadTemplates();
        
        // Initialize IndexedDB
        await initDB();
        
        // Load saved projects
        await loadProjects();
        
        // Initialize UI
        initUI();
        
        // Apply saved settings
        applySavedSettings();
        
        // ===== WELCOME SCREEN LOGIC (ALTERADO) =====
        // A tela de boas-vindas agora é sempre o ponto de partida.
        // Nenhum projeto é criado até que o usuário interaja com a tela.
        // A variável 'currentProject' permanece como 'null'.
        
        console.log('GearHub initialized successfully');
    } catch (error) {
        console.error('Error initializing GearHub:', error);
        showToast('Error initializing application. Please refresh the page.', 'error');
    }
}

// ===== INTERNATIONALIZATION (i18n) =====
// Load texts from JSON file
async function loadTexts() {
    try {
        const response = await fetch('texts.json');
        texts = await response.json();
        console.log('Texts loaded successfully');
    } catch (error) {
        console.error('Error loading texts:', error);
        // Fallback to default texts if loading fails
        texts = {
            pt: { app_title: "GearHub" },
            en: { app_title: "GearHub" },
            es: { app_title: "GearHub" }
        };
    }
}

// Load templates from JSON file
async function loadTemplates() {
    try {
        const response = await fetch('templates.json');
        templates = await response.json();
        console.log('Templates loaded successfully');
    } catch (error) {
        console.error('Error loading templates:', error);
        // Fallback to default templates if loading fails
        templates = {
            hobby: { name: { pt: "Hobby", en: "Hobby", es: "Hobby" }, fields: [] },
            renda_extra: { name: { pt: "Renda Extra", en: "Side Income", es: "Ingresos Adicionales" }, fields: [] },
            carreira: { name: { pt: "Carreira", en: "Career", es: "Carrera" }, fields: [] },
            startup: { name: { pt: "Startup", en: "Startup", es: "Startup" }, fields: [] }
        };
    }
}

// Apply language to UI elements
function applyLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (texts[lang] && texts[lang][key]) {
            element.textContent = texts[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (texts[lang] && texts[lang][key]) {
            element.placeholder = texts[lang][key];
        }
    });
    
    // Update project cards if a project is loaded
    if (currentProject) {
        updateCardsPlaceholders();
    }
    
    // Save language preference
    localStorage.setItem('gearhub-language', lang);
}

// ===== DARK MODE =====
// Toggle between light and dark theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
}

// Apply theme to the document
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme toggle button
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
    
    // Save theme preference
    localStorage.setItem('gearhub-theme', theme);
}

// Apply saved settings from localStorage
function applySavedSettings() {
    // Apply saved language
    const savedLanguage = localStorage.getItem('gearhub-language');
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        document.getElementById('language-select').value = savedLanguage;
        applyLanguage(savedLanguage);
    }
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('gearhub-theme');
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        currentTheme = savedTheme;
        applyTheme(savedTheme);
    }
}

// ===== INDEXEDDB (DATABASE) =====
// Initialize IndexedDB
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('GearHubDB', 1);
        
        request.onerror = function(event) {
            console.error('Database error:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            db = event.target.result;
            console.log('Database initialized successfully');
            resolve(db);
        };
        
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            
            // Create object store for projects
            if (!db.objectStoreNames.contains('projects')) {
                const objectStore = db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('date', 'date', { unique: false });
            }
            
            console.log('Database schema created');
        };
    });
}

// Load all projects from IndexedDB
async function loadProjects() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['projects'], 'readonly');
        const objectStore = transaction.objectStore('projects');
        const request = objectStore.getAll();
        
        request.onerror = function(event) {
            console.error('Error loading projects:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            projects = event.target.result;
            console.log(`Loaded ${projects.length} projects`);
            resolve(projects);
        };
    });
}

// Save project to IndexedDB
async function saveProject(project) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['projects'], 'readwrite');
        const objectStore = transaction.objectStore('projects');
        
        // Add or update project
        const request = project.id 
            ? objectStore.put(project) 
            : objectStore.add(project);
        
        request.onerror = function(event) {
            console.error('Error saving project:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            const projectId = project.id || event.target.result;
            console.log(`Project saved with ID: ${projectId}`);
            
            // Update current project if it's the one being saved
            if (!project.id) {
                project.id = projectId;
                currentProject = project;
            }
            
            // Reload projects list
            loadProjects().then(() => {
                resolve(projectId);
            }).catch(reject);
        };
    });
}

// Delete project from IndexedDB
async function deleteProject(projectId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['projects'], 'readwrite');
        const objectStore = transaction.objectStore('projects');
        const request = objectStore.delete(projectId);
        
        request.onerror = function(event) {
            console.error('Error deleting project:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            console.log(`Project deleted with ID: ${projectId}`);
            
            // Reload projects list
            loadProjects().then(() => {
                resolve(projectId);
            }).catch(reject);
        };
    });
}

// ===== PROJECT MANAGEMENT =====
// Create a new project
function createNewProject(templateType) {
    const template = templates[templateType];
    if (!template) {
        console.error(`Template not found: ${templateType}`);
        return;
    }
    
    // CORREÇÃO: Removido 'id: null' para permitir que o IndexedDB gere o ID
    currentProject = {
        name: `${template.name[currentLanguage]} - ${new Date().toLocaleDateString()}`,
        template: templateType,
        language: currentLanguage,
        date: new Date().toISOString(),
        cards: template.fields.map(field => ({
            id: field.id,
            title: field.title[currentLanguage],
            placeholder: field.placeholder[currentLanguage],
            value: ''
        }))
    };
    
    // Update UI
    updateProjectName();
    renderCards();
    updateStatus('editing');
    
    // Close modal
    closeModal('new-project-modal');
    
    showToast(texts[currentLanguage].new_project || 'New project created');
}

// Create a default project if none exists
function createDefaultProject() {
    // CORREÇÃO: Removido 'id: null' para permitir que o IndexedDB gere o ID
    currentProject = {
        name: texts[currentLanguage].project_name || 'Project Name',
        template: 'hobby',
        language: currentLanguage,
        date: new Date().toISOString(),
        cards: []
    };
    
    updateProjectName();
    renderCards();
    updateStatus('ready');
}

// Load a project
function loadProject(projectId) {
    const project = projects.find(p => p.id == projectId);
    if (!project) {
        console.error(`Project not found: ${projectId}`);
        return;
    }
    
    currentProject = project;
    
    // Apply project language if different
    if (project.language && project.language !== currentLanguage) {
        document.getElementById('language-select').value = project.language;
        applyLanguage(project.language);
    }
    
    // Update UI
    updateProjectName();
    renderCards();
    updateStatus('ready');
    
    // Close modal
    closeModal('my-projects-modal');
    
    showToast(texts[currentLanguage].save_success || 'Project loaded successfully');
}

// Rename current project
function renameProject(newName) {
    if (!currentProject) return;
    
    currentProject.name = newName;
    updateProjectName();
    
    // Save project
    saveProject(currentProject).then(() => {
        showToast(texts[currentLanguage].save_success || 'Project renamed successfully');
    }).catch(error => {
        console.error('Error renaming project:', error);
        showToast('Error renaming project', 'error');
    });
    
    // Close modal
    closeModal('rename-project-modal');
}

// Delete current project
function deleteCurrentProject() {
    if (!currentProject || !currentProject.id) {
        showToast('No project to delete', 'error');
        return;
    }
    
    deleteProject(currentProject.id).then(() => {
        showToast(texts[currentLanguage].delete_success || 'Project deleted successfully');
        
        // Create a new default project
        createDefaultProject();
    }).catch(error => {
        console.error('Error deleting project:', error);
        showToast('Error deleting project', 'error');
    });
    
    // Close modal
    closeModal('delete-project-modal');
}

// Add a new block/card to the current project
function addNewBlock() {
    if (!currentProject) return;
    
    const blockId = `custom_${Date.now()}`;
    const newBlock = {
        id: blockId,
        title: texts[currentLanguage].new_block || 'New Block',
        placeholder: texts[currentLanguage].add_block || 'Add content here',
        value: ''
    };
    
    currentProject.cards.push(newBlock);
    renderCards();
    updateStatus('editing');
    
    // Focus on the new card
    setTimeout(() => {
        const newCard = document.getElementById(`card-${blockId}`);
        if (newCard) {
            const textarea = newCard.querySelector('.card-textarea');
            if (textarea) textarea.focus();
        }
    }, 100);
}

// Remove a block/card from the current project
function removeBlock(blockId) {
    if (!currentProject) return;
    
    const index = currentProject.cards.findIndex(card => card.id === blockId);
    if (index !== -1) {
        currentProject.cards.splice(index, 1);
        renderCards();
        updateStatus('editing');
    }
}

// Update card value
function updateCardValue(blockId, value) {
    if (!currentProject) return;
    
    const card = currentProject.cards.find(c => c.id === blockId);
    if (card) {
        card.value = value;
        updateStatus('editing');
    }
}

// Update card title
function updateCardTitle(blockId, title) {
    if (!currentProject) return;
    
    const card = currentProject.cards.find(c => c.id === blockId);
    if (card) {
        card.title = title;
        updateStatus('editing');
    }
}

// Update placeholders for cards when language changes
function updateCardsPlaceholders() {
    if (!currentProject) return;
    
    // Update placeholders based on template
    if (currentProject.template && templates[currentProject.template]) {
        const template = templates[currentProject.template];
        
        currentProject.cards.forEach(card => {
            const templateField = template.fields.find(field => field.id === card.id);
            if (templateField) {
                card.placeholder = templateField.placeholder[currentLanguage];
                card.title = templateField.title[currentLanguage];
            }
        });
    }
    
    // Re-render cards to update placeholders
    renderCards();
}

// ===== UI HANDLERS =====
// Initialize UI event listeners
function initUI() {
    // Language selector
    document.getElementById('language-select').addEventListener('change', function() {
        applyLanguage(this.value);
    });
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Hamburger menu
    document.getElementById('hamburger').addEventListener('click', function() {
        this.classList.toggle('active');
        document.getElementById('sidebar').classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburger');
        
        if (window.innerWidth <= 767 && 
            !sidebar.contains(event.target) && 
            !hamburger.contains(event.target) && 
            sidebar.classList.contains('active')) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });
    
    // New project button
    document.getElementById('new-project-btn').addEventListener('click', function() {
        openModal('new-project-modal');
    });
    
    // My projects button
    document.getElementById('my-projects-btn').addEventListener('click', function() {
        renderProjectsList();
        openModal('my-projects-modal');
    });
    
    // Save button
    document.getElementById('save-btn').addEventListener('click', function() {
        if (!currentProject) {
            showToast('No project to save', 'error');
            return;
        }
        
        saveProject(currentProject).then(() => {
            updateStatus('saved');
            showToast(texts[currentLanguage].save_success || 'Project saved successfully');
        }).catch(error => {
            console.error('Error saving project:', error);
            showToast('Error saving project', 'error');
        });
    });
    
    // Rename project button
    document.getElementById('rename-project-btn').addEventListener('click', function() {
        if (!currentProject) {
            showToast('No project to rename', 'error');
            return;
        }
        
        document.getElementById('new-project-name').value = currentProject.name;
        openModal('rename-project-modal');
    });
    
    // Confirm rename button
    document.getElementById('confirm-rename').addEventListener('click', function() {
        const newName = document.getElementById('new-project-name').value.trim();
        if (newName) {
            renameProject(newName);
        } else {
            showToast('Please enter a valid project name', 'error');
        }
    });
    
    // Reedit fields button
    document.getElementById('reedit-fields-btn').addEventListener('click', function() {
        if (!currentProject) {
            showToast('No project to edit', 'error');
            return;
        }
        
        // Make all card titles editable
        document.querySelectorAll('.card-title').forEach(title => {
            title.contentEditable = true;
            title.style.backgroundColor = 'var(--secondary-color)';
            title.style.padding = 'var(--spacing-xs)';
            title.style.borderRadius = 'var(--border-radius-sm)';
        });
        
        showToast('You can now edit the card titles. Click outside to save.', 'info');
        
        // Add event listeners to save title changes
        document.querySelectorAll('.card-title').forEach(title => {
            title.addEventListener('blur', function() {
                const cardId = this.closest('.card').id.replace('card-', '');
                updateCardTitle(cardId, this.textContent);
                
                // Make it non-editable again
                this.contentEditable = false;
                this.style.backgroundColor = 'transparent';
                this.style.padding = '0';
            });
            
            title.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    this.blur();
                }
            });
        });
    });
    
    // Delete project button
    document.getElementById('delete-project-btn').addEventListener('click', function() {
        if (!currentProject) {
            showToast('No project to delete', 'error');
            return;
        }
        
        openModal('delete-project-modal');
    });
    
    // Confirm delete button
    document.getElementById('confirm-delete').addEventListener('click', deleteCurrentProject);
    
    // New block button
    document.getElementById('new-block-btn').addEventListener('click', addNewBlock);
    
    // Remove block button
    document.getElementById('remove-block-btn').addEventListener('click', function() {
        showToast('Click the × button on any card to remove it', 'info');
    });
    
    // Test hypothesis button
    document.getElementById('test-hypothesis-btn').addEventListener('click', function() {
        if (!currentProject) {
            showToast('No project to export', 'error');
            return;
        }
        
        exportProjectAsHTML();
    });
    
    // Criticize button
    document.getElementById('criticize-btn').addEventListener('click', function() {
        if (!currentProject) {
            showToast('No project to criticize', 'error');
            return;
        }
        
        exportProjectAsJSON();
    });
    
    // Templates button
    document.getElementById('templates-btn').addEventListener('click', function() {
        openModal('templates-modal');
    });
    
    // Help button
    document.getElementById('help-btn').addEventListener('click', function() {
        openModal('help-modal');
    });
    
    // Login button
    document.getElementById('login-btn').addEventListener('click', function() {
        openModal('login-modal');
    });
    
    // Google login button
    document.getElementById('google-login-btn').addEventListener('click', function() {
        // TODO: Implement Google OAuth integration
        // This is a placeholder for the actual OAuth flow
        showToast('Google login integration coming soon!', 'info');
        
        // Example of how the OAuth flow might work:
        // window.open('/auth/google', '_blank');
        
        // For now, just close the modal
        closeModal('login-modal');
    });
    
    // Add block button in workspace
    document.getElementById('add-block-btn').addEventListener('click', addNewBlock);
    
    // Template option buttons
    document.querySelectorAll('.template-option').forEach(button => {
        button.addEventListener('click', function() {
            const templateType = this.getAttribute('data-template');
            createNewProject(templateType);
        });
    });
    
    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal(this.id);
            }
        });
    });

    // ===== WELCOME SCREEN EVENT LISTENERS (SEM ALTERAÇÕES) =====
    document.getElementById('start-btn').addEventListener('click', function() {
        // Hide welcome screen
        document.getElementById('welcome-screen').classList.add('hidden');
        // Open the new project modal to guide the user
        openModal('new-project-modal');
    });

    document.getElementById('learn-more-btn').addEventListener('click', function() {
        // Hide welcome screen
        document.getElementById('welcome-screen').classList.add('hidden');
        // Open the help modal
        openModal('help-modal');
        // After closing help, if no project exists, create a default one
        const helpModal = document.getElementById('help-modal');
        helpModal.addEventListener('click', function handler(event) {
            if (event.target === helpModal || event.target.classList.contains('close-modal')) {
                if (!currentProject) {
                    createDefaultProject();
                }
                helpModal.removeEventListener('click', handler);
            }
        });
    });
}

// Update project name in UI
function updateProjectName() {
    if (currentProject) {
        document.getElementById('project-name-display').textContent = currentProject.name;
    }
}

// Update project status
function updateStatus(status) {
    const statusBadge = document.getElementById('status-badge');
    if (statusBadge) {
        statusBadge.textContent = texts[currentLanguage][status] || status;
        
        // Update status badge color
        statusBadge.className = 'status-badge';
        switch (status) {
            case 'ready':
                statusBadge.style.backgroundColor = 'var(--secondary-color)';
                statusBadge.style.color = 'var(--primary-color)';
                break;
            case 'editing':
                statusBadge.style.backgroundColor = '#fff3cd';
                statusBadge.style.color = '#856404';
                break;
            case 'saved':
                statusBadge.style.backgroundColor = '#d4edda';
                statusBadge.style.color = '#155724';
                break;
            case 'error':
                statusBadge.style.backgroundColor = '#f8d7da';
                statusBadge.style.color = '#721c24';
                break;
        }
    }
}

// Render cards in workspace
function renderCards() {
    const container = document.getElementById('cards-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!currentProject || !currentProject.cards || currentProject.cards.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">${texts[currentLanguage].no_projects_saved || 'No cards yet. Add a block to get started.'}</p>`;
        return;
    }
    
    currentProject.cards.forEach(card => {
        const cardElement = createCardElement(card);
        container.appendChild(cardElement);
    });
}

// Create a card element
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.id = `card-${card.id}`;
    
    cardDiv.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${card.title}</h3>
            <button class="card-remove" aria-label="Remove card">×</button>
        </div>
        <textarea class="card-textarea" placeholder="${card.placeholder}" data-i18n-placeholder="${card.id}">${card.value || ''}</textarea>
    `;
    
    // Add event listeners
    const textarea = cardDiv.querySelector('.card-textarea');
    textarea.addEventListener('input', function() {
        updateCardValue(card.id, this.value);
    });
    
    const removeBtn = cardDiv.querySelector('.card-remove');
    removeBtn.addEventListener('click', function() {
        removeBlock(card.id);
    });
    
    return cardDiv;
}

// Render projects list in modal
function renderProjectsList() {
    const container = document.getElementById('projects-list');
    if (!container) return;
    
    if (!projects || projects.length === 0) {
        container.innerHTML = `<p>${texts[currentLanguage].no_projects_saved || 'No projects saved yet.'}</p>`;
        return;
    }
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-item';
        
        const date = new Date(project.date).toLocaleDateString();
        
        projectElement.innerHTML = `
            <div class="project-item-info">
                <div class="project-item-name">${project.name}</div>
                <div class="project-item-date">${date}</div>
            </div>
            <div class="project-item-actions">
                <button class="project-item-btn load-btn" data-project-id="${project.id}">${texts[currentLanguage].save || 'Load'}</button>
                <button class="project-item-btn delete-btn" data-project-id="${project.id}">${texts[currentLanguage].delete || 'Delete'}</button>
            </div>
        `;
        
        container.appendChild(projectElement);
    });
    
    // Add event listeners to project buttons
    container.querySelectorAll('.load-btn').forEach(button => {
        button.addEventListener('click', function() {
            loadProject(this.getAttribute('data-project-id'));
        });
    });
    
    container.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            
            if (confirm(texts[currentLanguage].confirm_delete_project || 'Are you sure you want to delete this project?')) {
                deleteProject(projectId).then(() => {
                    showToast(texts[currentLanguage].delete_success || 'Project deleted successfully');
                    renderProjectsList(); // Refresh the list
                }).catch(error => {
                    console.error('Error deleting project:', error);
                    showToast('Error deleting project', 'error');
                });
            }
        });
    });
}

// ===== MODAL FUNCTIONS =====
// Open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
}

// Close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ===== EXPORT FUNCTIONS =====
// Export project as HTML (Test Hypothesis)
function exportProjectAsHTML() {
    if (!currentProject) {
        showToast('No project to export', 'error');
        return;
    }
    
    // Create HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="${currentLanguage}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentProject.name}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: #4a6cf7;
        }
        .card-content {
            white-space: pre-wrap;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${currentProject.name}</h1>
        <p>${new Date(currentProject.date).toLocaleDateString()}</p>
    </div>
    
    ${currentProject.cards.map(card => `
        <div class="card">
            <h2 class="card-title">${card.title}</h2>
            <div class="card-content">${card.value || `<em>${card.placeholder}</em>`}</div>
        </div>
    `).join('')}
    
    <div class="footer">
        <p>Generated by GearHub - ${new Date().toLocaleDateString()}</p>
    </div>
</body>
</html>
    `;
    
    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(texts[currentLanguage].export_success || 'Project exported successfully');
}

// Export project as JSON (Criticize)
function exportProjectAsJSON() {
    if (!currentProject) {
        showToast('No project to export', 'error');
        return;
    }
    
    // Create JSON content
    const jsonContent = {
        meta: {
            id: currentProject.id,
            name: currentProject.name,
            template: currentProject.template,
            language: currentLanguage,
            date: currentProject.date
        },
        content: {
            cards: currentProject.cards.map(card => ({
                id: card.id,
                title: card.title,
                value: card.value
            }))
        },
        instruction_prompt: texts[currentLanguage].criticize_prompt || 'Please analyze this project...'
    };
    
    // Create blob and download
    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(texts[currentLanguage].export_success || 'Project exported successfully');
}

// ===== UTILITY FUNCTIONS =====
// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    
    // Set toast color based on type
    toast.style.backgroundColor = type === 'error' ? 'var(--accent-color)' : 
                                  type === 'info' ? 'var(--primary-color)' : 
                                  'var(--card-color)';
    toast.style.color = type === 'error' || type === 'info' ? 'white' : 'var(--text-color)';
    
    // Show toast
    toast.classList.add('active');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close sidebar on mobile when resizing to desktop
    if (window.innerWidth > 767) {
        document.getElementById('hamburger').classList.remove('active');
        document.getElementById('sidebar').classList.remove('active');
    }
});

// Handle beforeunload to warn about unsaved changes
window.addEventListener('beforeunload', function(event) {
    if (currentProject && document.getElementById('status-badge').textContent === (texts[currentLanguage].editing || 'Editing')) {
        event.preventDefault();
        event.returnValue = '';
        return '';
    }
});