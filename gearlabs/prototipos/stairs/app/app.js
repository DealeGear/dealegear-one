// Dados mockados para o aplicativo
const appData = {
    user: {
        name: "João da Silva",
        email: "joao.silva@email.com",
        currentStep: 2,
        totalSteps: 6,
        streak: 5,
        xp: 450,
        stars: 12
    },
    modules: [
        {
            id: 1,
            title: "Fundamentos Cognitivos",
            icon: "fas fa-brain",
            completed: true,
            progress: 100
        },
        {
            id: 2,
            title: "Estruturação de Projetos",
            icon: "fas fa-project-diagram",
            completed: false,
            progress: 40,
            current: true
        },
        {
            id: 3,
            title: "Comunicação",
            icon: "fas fa-comments",
            completed: false,
            progress: 0
        },
        {
            id: 4,
            title: "Ferramentas Digitais",
            icon: "fas fa-laptop-code",
            completed: false,
            progress: 0
        },
        {
            id: 5,
            title: "Interdisciplinares",
            icon: "fas fa-puzzle-piece",
            completed: false,
            progress: 0
        },
        {
            id: 6,
            title: "Trilhas Avançadas",
            icon: "fas fa-mountain",
            completed: false,
            progress: 0
        }
    ],
    lesson: {
        currentExercise: 1,
        totalExercises: 5,
        question: "Qual é o primeiro passo na estruturação de um projeto?",
        options: [
            {
                id: "A",
                text: "Definir o orçamento",
                correct: false
            },
            {
                id: "B",
                text: "Identificar os objetivos",
                correct: true
            },
            {
                id: "C",
                text: "Montar a equipe",
                correct: false
            },
            {
                id: "D",
                text: "Definir prazos",
                correct: false
            }
        ]
    }
};

// Função para mostrar uma tela específica
function showScreen(screenId) {
    // Esconde todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostra a tela selecionada
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
        selectedScreen.classList.add('active');
        
        // Atualiza o estado ativo na navegação inferior
        updateActiveNav(screenId);
        
        // Se for a tela inicial, atualiza os dados do usuário
        if (screenId === 'home-screen') {
            updateUserData();
        }
    }
}

// Função para atualizar o estado ativo na navegação inferior
function updateActiveNav(screenId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Mapeamento de telas para itens de navegação
    const screenToNavMap = {
        'home-screen': 0,
        'modules-screen': 1,
        'ranking-screen': 2,
        'profile-screen': 3
    };
    
    const navIndex = screenToNavMap[screenId];
    if (navIndex !== undefined && navItems[navIndex]) {
        navItems[navIndex].classList.add('active');
    }
}

// Função para alternar o menu lateral
function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('active');
}

// Função para selecionar uma opção na lição
let selectedOption = null;
function selectOption(element, isCorrect) {
    // Remove a classe 'selected' de todas as opções
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Adiciona a classe 'selected' à opção clicada
    element.classList.add('selected');
    
    // Armazena a opção selecionada e se está correta
    selectedOption = {
        element: element,
        isCorrect: isCorrect
    };
    
    // Habilita o botão de verificar resposta
    const submitButton = document.getElementById('submit-answer');
    submitButton.disabled = false;
}

// Função para verificar a resposta
function checkAnswer() {
    if (!selectedOption) return;
    
    // Desabilita o botão de verificar resposta
    const submitButton = document.getElementById('submit-answer');
    submitButton.disabled = true;
    
    // Adiciona a classe correta ou incorreta à opção selecionada
    if (selectedOption.isCorrect) {
        selectedOption.element.classList.add('correct');
        
        // Mostra mensagem de sucesso
        setTimeout(() => {
            showScreen('lesson-complete-screen');
        }, 1500);
    } else {
        selectedOption.element.classList.add('incorrect');
        
        // Habilita o botão novamente para tentar outra opção
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Tentar novamente';
        }, 1500);
    }
    
    // Mostra a resposta correta se a selecionada estiver incorreta
    if (!selectedOption.isCorrect) {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            if (option !== selectedOption.element) {
                // Verifica se esta opção é a correta
                const optionText = option.querySelector('p').textContent;
                const correctOption = appData.lesson.options.find(opt => opt.correct);
                
                if (optionText === correctOption.text) {
                    option.classList.add('correct');
                }
            }
        });
    }
}

// Função para atualizar os dados do usuário na tela inicial
function updateUserData() {
    // Atualiza o progresso do usuário
    const currentStepElement = document.getElementById('current-step');
    const totalStepsElement = document.getElementById('total-steps');
    
    if (currentStepElement) {
        currentStepElement.textContent = appData.user.currentStep;
    }
    
    if (totalStepsElement) {
        totalStepsElement.textContent = appData.user.totalSteps;
    }
    
    // Atualiza a barra de progresso
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progressPercentage = (appData.user.currentStep / appData.user.totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    // Atualiza os dados na tela de módulos
    const currentStepModulesElement = document.getElementById('current-step-modules');
    const totalStepsModulesElement = document.getElementById('total-steps-modules');
    
    if (currentStepModulesElement) {
        currentStepModulesElement.textContent = appData.user.currentStep;
    }
    
    if (totalStepsModulesElement) {
        totalStepsModulesElement.textContent = appData.user.totalSteps;
    }
    
    const progressFillModules = document.querySelector('#modules-screen .progress-fill');
    if (progressFillModules) {
        const progressPercentage = (appData.user.currentStep / appData.user.totalSteps) * 100;
        progressFillModules.style.width = `${progressPercentage}%`;
    }
}

// Função para inicializar o aplicativo
function initApp() {
    // Mostra a tela de splash por 3 segundos e depois vai para a tela de login
    setTimeout(() => {
        showScreen('login-screen');
    }, 3000);
    
    // Adiciona event listeners para os itens de FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
}

// Inicializa o aplicativo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initApp);