// script.js - Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentLang = 'pt';
    let currentProject = 'myHeart';
    
    // Initialize components
    const darkMode = new DarkMode();
    
    // Initialize SimpleBar for sidebar
    new SimpleBar(document.querySelector('.sidebar-content'));
    
    // Render project list
    renderProjectList();
    
    // Load initial project
    loadProject(currentProject);
    
    // Event listeners
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.language-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update current language
            currentLang = this.getAttribute('data-lang');
            // Update document language
            document.documentElement.lang = currentLang;
            // Reload current project with new language
            loadProject(currentProject);
        });
    });
    
    document.getElementById('back-to-top').addEventListener('click', function() {
        document.querySelector('.main-content').scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button
    document.querySelector('.main-content').addEventListener('scroll', function() {
        if (this.scrollTop > 300) {
            document.getElementById('back-to-top').classList.add('visible');
        } else {
            document.getElementById('back-to-top').classList.remove('visible');
        }
    });
    
    // Functions
    function renderProjectList() {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        
        projects.forEach(project => {
            const li = document.createElement('li');
            li.className = 'project-item';
            if (project.id === currentProject) {
                li.classList.add('active');
            }
            
            li.innerHTML = `
                <i class="fas ${project.icon}"></i>
                <span>${project.name}</span>
            `;
            
            li.addEventListener('click', function() {
                document.querySelectorAll('.project-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
                currentProject = project.id;
                loadProject(currentProject);
            });
            
            projectList.appendChild(li);
        });
    }
    
    function loadProject(projectId) {
        const contentContainer = document.querySelector('.content-container');
        
        // Show loading spinner
        contentContainer.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            const project = projects.find(p => p.id === projectId);
            const projectData = i18n[currentLang][projectId] || i18n['pt'][projectId];
            
            if (!projectData) {
                contentContainer.innerHTML = `
                    <div class="section-card">
                        <h2 class="project-title">${project.name}</h2>
                        <div class="section-content">
                            <p>Conteúdo não disponível no momento. Por favor, tente novamente mais tarde.</p>
                        </div>
                    </div>
                `;
                return;
            }
            
            let html = `<h2 class="project-title">${project.name}</h2>`;
            
            sections.forEach(section => {
                const sectionData = projectData[section.id];
                if (sectionData) {
                    html += `
                        <div class="section-card">
                            <h3 class="section-title">
                                <i class="fas ${section.icon}"></i>
                                ${sectionData.title}
                            </h3>
                            <div class="section-content">
                                ${sectionData.content}
                            </div>
                        </div>
                    `;
                }
            });
            
            contentContainer.innerHTML = html;
            
            // Scroll to top
            document.querySelector('.main-content').scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 300);
    }
});