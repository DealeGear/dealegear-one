document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const btnTheme = document.querySelector('.btn-theme');
    const btnLanguage = document.querySelector('.btn-language');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const modalDone = document.getElementById('modal-done');
    const closeModal = document.querySelector('.close');
    const roadmapSteps = document.querySelector('.roadmap-steps');
    const btnReset = document.querySelector('.btn-reset');
    const btnGearHub=document.querySelector(".btn-gearhub");

    // Estado inicial
    let currentLanguage = 'pt';
    let translations = {};
    let completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];

    // Carregar traduções
    async function loadTranslations() {
        try {
            const response = await fetch('gearmap.json');
            translations = await response.json();
            updatePageContent();
        } catch (error) {
            console.error('Erro ao carregar traduções:', error);
        }
    }

    // Atualizar conteúdo da página com base no idioma
    function updatePageContent() 
    {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const keys = element.getAttribute('data-translate').split('.');
            let value = translations[currentLanguage];
            keys.forEach(key => {
                value = value[key];
            });
            if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                element.textContent = value;
            } else {
                element.textContent = value;
            }
            
        });
        generateRoadmapSteps();
        //updateTexts(); 

        // Atualizar o atributo lang do HTML
        document.documentElement.lang = currentLanguage;
    }

    // Alternar idioma
    btnLanguage.addEventListener('click', function() {
        const languages = ['pt', 'en', 'es'];
        const currentIndex = languages.indexOf(currentLanguage);
        currentLanguage = languages[(currentIndex + 1) % languages.length];
        updatePageContent();
    });

    // Alternar tema
    btnTheme.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Verificar tema salvo
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    // Menu hamburger
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    btnReset.addEventListener('click', function() {
        if (confirm(translations[currentLanguage].roadmap.resetConfirm)) {
            completedSteps = [];
            localStorage.removeItem('completedSteps');
            generateRoadmapSteps();
        }
    });

    /*Acessar GearHub*/

    btnGearHub.addEventListener("click",()=>{
        window.location.href="gearhub/index.html"
    })

    // Gerar passos do roadmap
    function generateRoadmapSteps() {
        roadmapSteps.innerHTML = '';
        const steps = translations[currentLanguage].roadmap.steps;
        steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step';
            if (completedSteps.includes(index)) {
                stepElement.classList.add('done');
            }
            stepElement.innerHTML = `
                <h3>${step.title}</h3>
                <p>${step.short}</p>
            `;
            stepElement.addEventListener('click', () => openModal(index));
            roadmapSteps.appendChild(stepElement);
        });
    }

    // Abrir modal
    function openModal(stepIndex) {
        const step = translations[currentLanguage].roadmap.steps[stepIndex];
        modalTitle.textContent = step.title;
        modalDetails.textContent = step.details;
        modalDone.setAttribute('data-step', stepIndex);
        modal.style.display = 'block';
    }

    // Fechar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Marcar passo como concluído
    modalDone.addEventListener('click', function() {
        const stepIndex = parseInt(this.getAttribute('data-step'));
        if (!completedSteps.includes(stepIndex)) {
            completedSteps.push(stepIndex);
            localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
            generateRoadmapSteps(); // Atualizar a lista de passos
        }
        modal.style.display = 'none';
    });

    // Botão voltar
    document.querySelector('.btn-back').addEventListener('click', function() {
        window.location.href = 'index.html'; // Supondo que a landpage principal seja index.html
    });

    // Inicialização
    loadTranslations().then(() => {
        generateRoadmapSteps();
    });
});