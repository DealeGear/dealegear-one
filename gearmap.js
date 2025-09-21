// ===== Variáveis Globais =====
let currentLang = 'pt';
let currentTheme = 'light';
let completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || [];

// Elementos DOM
const langSelect = document.getElementById('langSelect');
const themeToggle = document.getElementById('themeToggle');
const resetBtn = document.getElementById('resetBtn');
const modal = document.getElementById('stepModal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const completeBtn = document.getElementById('completeBtn');

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    loadTheme();
    updateCompletedSteps();
    
    // Event Listeners
    langSelect.addEventListener('change', changeLanguage);
    themeToggle.addEventListener('click', toggleTheme);
    resetBtn.addEventListener('click', resetTasks);
    modalClose.addEventListener('click', closeModal);
    
    // Step buttons
    document.querySelectorAll('.step-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const step = e.target.closest('.roadmap-step').dataset.step;
            openModal(step);
        });
    });
    
    // Complete button
    completeBtn.addEventListener('click', () => {
        const step = completeBtn.dataset.step;
        toggleStepCompletion(step);
    });
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

// ===== Carregar Traduções =====
async function loadTranslations() {
    try {
        const response = await fetch('gearmap.json');
        const translations = await response.json();
        applyTranslations(translations[currentLang]);
    } catch (error) {
        console.error('Erro ao carregar traduções:', error);
    }
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}

// ===== Mudar Idioma =====
function changeLanguage() {
    currentLang = langSelect.value;
    localStorage.setItem('language', currentLang);
    loadTranslations();
}

// ===== Tema =====
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    localStorage.setItem('theme', currentTheme);
}

// ===== Modal =====
function openModal(step) {
    const stepData = getStepData(step);
    modalTitle.textContent = stepData.title;
    modalDescription.textContent = stepData.description;
    completeBtn.dataset.step = step;
    
    // Update button state
    if (completedSteps.includes(step)) {
        completeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span data-i18n="markIncomplete">Marcar como não concluído</span>
        `;
        completeBtn.style.backgroundColor = '#EF4444';
    } else {
        completeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span data-i18n="markComplete">Marcar como concluído</span>
        `;
        completeBtn.style.backgroundColor = '';
    }
    
    modal.classList.add('active');
    loadTranslations(); // Atualiza textos do modal
}

function closeModal() {
    modal.classList.remove('active');
}

// ===== Gerenciamento de Etapas =====
/*function getStepData(step) {
    const stepData = {
        '1': {
            title: document.querySelector('[data-i18n="step1Title"]').textContent,
            description: 'Definir um objetivo claro é o primeiro passo para o sucesso. Pergunte-se: O que eu quero alcançar? Por que isso é importante para mim? Seja específico, mensurável e com prazo definido. Um objetivo bem definido serve como bússola para todas as suas ações.'
        },
        '2': {
            title: document.querySelector('[data-i18n="step2Title"]').textContent,
            description: 'Com o objetivo definido, é hora de planejar. Divida seu objetivo em tarefas menores e mais gerenciáveis. Estabeleça prazos realistas, identifique recursos necessários e antecipe possíveis obstáculos. Um bom plano transforma sonhos em realidade.'
        },
        '3': {
            title: document.querySelector('[data-i18n="step3Title"]').textContent,
            description: 'A hora da ação! Execute seu plano com disciplina e foco. Mantenha-se consistente, mesmo nos dias difíceis. Celebre pequenas vitórias ao longo do caminho e lembre-se: progresso, não perfeição, é o que importa.'
        },
        '4': {
            title: document.querySelector('[data-i18n="step4Title"]').textContent,
            description: 'Regularmente, avalie seu progresso. O que está funcionando bem? O que precisa de ajuste? Seja flexível para adaptar seu plano conforme necessário. A avaliação contínua é a chave para o crescimento e melhoria constante.'
        }
    };
    
    return stepData[step];
}*/

//Nova função de gerenciamente de etapas

// ===== Obter Dados da Etapa =====
function getStepData(step) {
    const currentLang = localStorage.getItem('language') || 'pt'; // padrão PT

    const stepData = {
        '1': {
            title: {
                pt: document.querySelector('[data-i18n="step1Title"]').textContent,
                en: "Inspiration",
                es: "Inspiración"
            },
            description: {
                pt: 'Esse é o ponto de partida do seu projeto. Tire alguns minutos para pensar no que realmente quer alcançar. Não precisa ser algo perfeito ou totalmente definido ainda, mas é importante ter clareza do desejo principal que te move. Pergunte-se: “O que eu quero transformar, conquistar ou criar?',
                en: 'This is the starting point of your project. Take a few minutes to think about what you truly want to achieve. It doesn’t need to be perfect or fully defined yet, but it’s important to have clarity about the main desire that drives you. Ask yourself: “What do I want to transform, accomplish, or create?',
                es: 'Este es el punto de partida de tu proyecto. Dedica unos minutos a pensar en lo que realmente deseas alcanzar. No tiene que ser algo perfecto ni totalmente definido todavía, pero es importante tener claridad sobre el deseo principal que te impulsa. Pregúntate: “¿Qué quiero transformar, conquistar o crear?'
            }
        },
        '2': {
            title: {
                pt: document.querySelector('[data-i18n="step2Title"]').textContent,
                en: "Exploration",
                es: "Exploración"
            },
            description: {
                pt: 'Nesta fase, olhe para fora. Pesquise referências, concorrentes e soluções que já estão no mercado ou em projetos semelhantes. Isso vai te ajudar a entender o que já existe e a encontrar formas de se diferenciar. Pergunte-se: “O que já foi feito e como eu poderia criar algo único, melhor ou mais relevante?',
                en: 'In this stage, look outward. Research references, competitors, and existing solutions in the market or in similar projects. This will help you understand what already exists and find ways to stand out. Ask yourself: “What has already been done, and how could I create something unique, better, or more meaningful?',
                es: 'En esta etapa, mira hacia afuera. Investiga referencias, competidores y soluciones que ya existen en el mercado o en proyectos similares. Esto te ayudará a comprender lo que ya hay y a encontrar formas de diferenciarte. Pregúntate: “¿Qué ya se ha hecho y cómo podría crear algo único, mejor o más relevante?'
            }
        },
        '3': {
            title: {
                pt: document.querySelector('[data-i18n="step3Title"]').textContent,
                en: "Definition",
                es: "Definición"
            },
            description: {
                pt: 'Agora é hora de organizar o pensamento. Resuma sua ideia em 1 ou 2 frases simples, de forma que qualquer pessoa consiga entender o que você pretende fazer. Essa clareza vai servir como uma bússola para os próximos passos. Pergunte-se: “Se eu tivesse 10 segundos para explicar meu projeto, o que eu diria?',
                en: 'Now it’s time to organize your thoughts. Summarize your idea in 1 or 2 simple sentences, in a way that anyone can easily understand what you plan to do. This clarity will serve as a compass for the next steps. Ask yourself: “If I had 10 seconds to explain my project, what would I say?',
                es: 'Ahora es momento de organizar tus pensamientos. Resume tu idea en 1 o 2 frases simples, de manera que cualquier persona pueda entender fácilmente lo que planeas hacer. Esta claridad servirá como una brújula para los próximos pasos. Pregúntate: “Si tuviera 10 segundos para explicar mi proyecto, ¿qué diría?'
            }
        },
        '4': {
            title: {
                pt: document.querySelector('[data-i18n="step4Title"]').textContent,
                en: "Purpose",
                es: "Propósito"
            },
            description: {
                pt: 'Um projeto só ganha força quando tem um propósito claro. Reflita sobre o impacto que ele pode gerar, quem será beneficiado e quais objetivos pessoais você quer alcançar com ele. Esse “porquê” será sua motivação nos momentos difíceis. Pergunte-se: “Por que esse projeto realmente vale a pena para mim ou para outras pessoas',
                en: 'A project only gains strength when it has a clear purpose. Reflect on the impact it can create, who will benefit, and what personal goals you want to achieve with it. This “why” will be your motivation during challenging times. Ask yourself: “Why is this project truly worth it for me or for others?',
                es: 'Un proyecto solo gana fuerza cuando tiene un propósito claro. Reflexiona sobre el impacto que puede generar, quién se beneficiará y qué objetivos personales deseas alcanzar con él. Este “por qué” será tu motivación en los momentos difíciles. Pregúntate: “¿Por qué este proyecto realmente vale la pena para mí o para otras personas?'
            }
        }
    };

    return {
        title: stepData[step].title[currentLang],
        description: stepData[step].description[currentLang]
    };
}


function toggleStepCompletion(step) {
    const index = completedSteps.indexOf(step);
    if (index > -1) {
        completedSteps.splice(index, 1);
    } else {
        completedSteps.push(step);
    }
    
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
    updateCompletedSteps();
    openModal(step); // Reabre modal para atualizar botão
}

function updateCompletedSteps() {
    document.querySelectorAll('.roadmap-step').forEach(step => {
        const stepNumber = step.dataset.step;
        const marker = step.querySelector('.step-marker');
        
        if (completedSteps.includes(stepNumber)) {
            marker.style.backgroundColor = 'var(--secondary-color)';
            marker.style.borderColor = 'var(--secondary-color)';
            marker.querySelector('.step-icon').style.color = 'white';
        } else {
            marker.style.backgroundColor = '';
            marker.style.borderColor = '';
            marker.querySelector('.step-icon').style.color = '';
        }
    });
}

function resetTasks() {
    if (confirm('Tem certeza que deseja recomeçar todas as tarefas?')) {
        completedSteps = [];
        localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
        updateCompletedSteps();
    }
}