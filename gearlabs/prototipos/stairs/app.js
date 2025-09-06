// Importar dados
import { CATEGORIES, THEMES, OBJECTIVES, AVAILABLE_TIME, I18N } from './data.js';

// Estado global da aplicação
const state = {
  step: 1,
  categoryId: null,
  themeId: null,
  objectiveId: null,
  timeId: null,
  locale: "pt",
};

// Elementos do DOM
const elements = {
  stepTitle: document.getElementById('stepTitle'),
  stepBody: document.getElementById('stepBody'),
  backBtn: document.getElementById('backBtn'),
  nextBtn: document.getElementById('nextBtn'),
  errorMessage: document.getElementById('errorMessage'),
  loadingIndicator: document.getElementById('loadingIndicator'),
  langToggle: document.getElementById('langToggle'),
  mobileMenuToggle: document.getElementById('mobileMenuToggle'),
  navLinks: document.querySelector('.nav-links'),
  steps: document.querySelectorAll('.step'),
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Carregar estado salvo
  loadState();
  
  // Configurar eventos
  setupEventListeners();
  
  // Renderizar interface inicial
  renderStep();
  updateStepper();
  updateLanguage();
});

// Configurar event listeners
function setupEventListeners() {
  // Navegação
  elements.backBtn.addEventListener('click', handleBack);
  elements.nextBtn.addEventListener('click', handleNext);
  
  // Alternar idioma
  elements.langToggle.addEventListener('click', toggleLanguage);
  
  // Menu mobile
  elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  
  // Navegação por teclado
  document.addEventListener('keydown', handleKeyboardNavigation);
}

// Carregar estado do localStorage
function loadState() {
  const savedState = localStorage.getItem('stairsState');
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      Object.assign(state, parsedState);
    } catch (e) {
      console.error('Erro ao carregar estado salvo:', e);
    }
  }
}

// Salvar estado no localStorage
function saveState() {
  localStorage.setItem('stairsState', JSON.stringify(state));
}

// Renderizar etapa atual
function renderStep() {
  // Mostrar indicador de carregamento
  elements.loadingIndicator.classList.add('active');
  
  // Limpar mensagem de erro
  hideError();
  
  // Desabilitar botão de próximo inicialmente
  elements.nextBtn.disabled = true;
  
  // Renderizar conteúdo com base na etapa atual
  switch (state.step) {
    case 1:
      renderCategoriesStep();
      break;
    case 2:
      renderThemesStep();
      break;
    case 3:
      renderObjectivesStep();
      break;
    case 4:
      renderTimeStep();
      break;
    default:
      renderCategoriesStep();
  }
  
  // Atualizar textos dos botões
  updateNavigationButtons();
  
  // Ocultar indicador de carregamento após um curto delay
  setTimeout(() => {
    elements.loadingIndicator.classList.remove('active');
  }, 300);
}

// Renderizar etapa de categorias
function renderCategoriesStep() {
  // Atualizar título
  updateStepTitle('step1_title');
  
  // Criar grid de cards
  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';
  cardsGrid.setAttribute('role', 'radiogroup');
  cardsGrid.setAttribute('aria-label', getText('step1_title'));
  
  // Adicionar cards de categorias
  CATEGORIES.forEach(category => {
    const card = createCategoryCard(category);
    cardsGrid.appendChild(card);
  });
  
  // Limpar e adicionar conteúdo
  elements.stepBody.innerHTML = '';
  elements.stepBody.appendChild(cardsGrid);
  
  // Verificar se há uma categoria selecionada
  if (state.categoryId) {
    const selectedCard = cardsGrid.querySelector(`[data-id="${state.categoryId}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
      selectedCard.setAttribute('aria-checked', 'true');
      elements.nextBtn.disabled = false;
    }
  }
}

// Criar card de categoria
function createCategoryCard(category) {
  const card = document.createElement('button');
  card.className = 'card';
  card.setAttribute('role', 'radio');
  card.setAttribute('aria-checked', state.categoryId === category.id ? 'true' : 'false');
  card.setAttribute('data-id', category.id);
  card.setAttribute('tabindex', state.categoryId === category.id ? '0' : '-1');
  
  // Imagem
  const image = document.createElement('img');
  image.className = 'card-image';
  image.src = category.image;
  image.alt = '';
  
  // Conteúdo
  const content = document.createElement('div');
  content.className = 'card-content';
  
  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = category[`title_${state.locale}`];
  
  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = category[`description_${state.locale}`];
  
  content.appendChild(title);
  content.appendChild(description);
  
  card.appendChild(image);
  card.appendChild(content);
  
  // Evento de clique
  card.addEventListener('click', () => selectCategory(category.id));
  
  return card;
}

// Selecionar categoria
function selectCategory(categoryId) {
  // Atualizar estado
  state.categoryId = categoryId;
  state.themeId = null; // Limpar tema ao trocar de categoria
  state.objectiveId = null; // Limpar objetivo
  state.timeId = null; // Limpar tempo
  
  // Salvar estado
  saveState();
  
  // Atualizar UI
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (card.getAttribute('data-id') === categoryId) {
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
      card.setAttribute('tabindex', '0');
    } else {
      card.classList.remove('selected');
      card.setAttribute('aria-checked', 'false');
      card.setAttribute('tabindex', '-1');
    }
  });
  
  // Habilitar botão próximo
  elements.nextBtn.disabled = false;
}

// Renderizar etapa de temas
function renderThemesStep() {
  // Atualizar título
  updateStepTitle('step2_title');
  
  // Verificar se há uma categoria selecionada
  if (!state.categoryId) {
    // Se não houver categoria, voltar para etapa 1
    handleBack();
    return;
  }
  
  // Obter temas da categoria selecionada
  const themes = THEMES[state.categoryId] || [];
  
  // Criar grid de cards
  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';
  cardsGrid.setAttribute('role', 'radiogroup');
  cardsGrid.setAttribute('aria-label', getText('step2_title'));
  
  // Adicionar cards de temas
  themes.forEach(theme => {
    const card = createThemeCard(theme);
    cardsGrid.appendChild(card);
  });
  
  // Limpar e adicionar conteúdo
  elements.stepBody.innerHTML = '';
  elements.stepBody.appendChild(cardsGrid);
  
  // Verificar se há um tema selecionado
  if (state.themeId) {
    const selectedCard = cardsGrid.querySelector(`[data-id="${state.themeId}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
      selectedCard.setAttribute('aria-checked', 'true');
      elements.nextBtn.disabled = false;
    }
  }
}

// Criar card de tema
function createThemeCard(theme) {
  const card = document.createElement('button');
  card.className = 'card';
  card.setAttribute('role', 'radio');
  card.setAttribute('aria-checked', state.themeId === theme.id ? 'true' : 'false');
  card.setAttribute('data-id', theme.id);
  card.setAttribute('tabindex', state.themeId === theme.id ? '0' : '-1');
  
  // Ícone (placeholder)
  const icon = document.createElement('div');
  icon.className = 'card-image';
  icon.style.backgroundColor = 'var(--bg-tertiary)';
  icon.style.display = 'flex';
  icon.style.alignItems = 'center';
  icon.style.justifyContent = 'center';
  icon.style.fontSize = '2rem';
  icon.innerHTML = '📋';
  
  // Conteúdo
  const content = document.createElement('div');
  content.className = 'card-content';
  
  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = theme[`title_${state.locale}`];
  
  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = theme[`hint_${state.locale}`];
  
  content.appendChild(title);
  content.appendChild(description);
  
  card.appendChild(icon);
  card.appendChild(content);
  
  // Evento de clique
  card.addEventListener('click', () => selectTheme(theme.id));
  
  return card;
}

// Selecionar tema
function selectTheme(themeId) {
  // Atualizar estado
  state.themeId = themeId;
  state.objectiveId = null; // Limpar objetivo
  state.timeId = null; // Limpar tempo
  
  // Salvar estado
  saveState();
  
  // Atualizar UI
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (card.getAttribute('data-id') === themeId) {
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
      card.setAttribute('tabindex', '0');
    } else {
      card.classList.remove('selected');
      card.setAttribute('aria-checked', 'false');
      card.setAttribute('tabindex', '-1');
    }
  });
  
  // Habilitar botão próximo
  elements.nextBtn.disabled = false;
}

// Renderizar etapa de objetivos
function renderObjectivesStep() {
  // Atualizar título
  updateStepTitle('step3_title');
  
  // Criar grid de cards
  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';
  cardsGrid.setAttribute('role', 'radiogroup');
  cardsGrid.setAttribute('aria-label', getText('step3_title'));
  
  // Adicionar cards de objetivos
  OBJECTIVES.forEach(objective => {
    const card = createObjectiveCard(objective);
    cardsGrid.appendChild(card);
  });
  
  // Limpar e adicionar conteúdo
  elements.stepBody.innerHTML = '';
  elements.stepBody.appendChild(cardsGrid);
  
  // Verificar se há um objetivo selecionado
  if (state.objectiveId) {
    const selectedCard = cardsGrid.querySelector(`[data-id="${state.objectiveId}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
      selectedCard.setAttribute('aria-checked', 'true');
      elements.nextBtn.disabled = false;
    }
  }
}

// Criar card de objetivo
function createObjectiveCard(objective) {
  const card = document.createElement('button');
  card.className = 'card';
  card.setAttribute('role', 'radio');
  card.setAttribute('aria-checked', state.objectiveId === objective.id ? 'true' : 'false');
  card.setAttribute('data-id', objective.id);
  card.setAttribute('tabindex', state.objectiveId === objective.id ? '0' : '-1');
  
  // Ícone (placeholder)
  const icon = document.createElement('div');
  icon.className = 'card-image';
  icon.style.backgroundColor = 'var(--bg-tertiary)';
  icon.style.display = 'flex';
  icon.style.alignItems = 'center';
  icon.style.justifyContent = 'center';
  icon.style.fontSize = '2rem';
  icon.innerHTML = '🎯';
  
  // Conteúdo
  const content = document.createElement('div');
  content.className = 'card-content';
  
  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = objective[`title_${state.locale}`];
  
  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = objective[`description_${state.locale}`];
  
  content.appendChild(title);
  content.appendChild(description);
  
  card.appendChild(icon);
  card.appendChild(content);
  
  // Evento de clique
  card.addEventListener('click', () => selectObjective(objective.id));
  
  return card;
}

// Selecionar objetivo
function selectObjective(objectiveId) {
  // Atualizar estado
  state.objectiveId = objectiveId;
  state.timeId = null; // Limpar tempo
  
  // Salvar estado
  saveState();
  
  // Atualizar UI
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (card.getAttribute('data-id') === objectiveId) {
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
      card.setAttribute('tabindex', '0');
    } else {
      card.classList.remove('selected');
      card.setAttribute('aria-checked', 'false');
      card.setAttribute('tabindex', '-1');
    }
  });
  
  // Habilitar botão próximo
  elements.nextBtn.disabled = false;
}

// Renderizar etapa de tempo disponível
function renderTimeStep() {
  // Atualizar título
  updateStepTitle('step4_title');
  
  // Criar grid de cards
  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';
  cardsGrid.setAttribute('role', 'radiogroup');
  cardsGrid.setAttribute('aria-label', getText('step4_title'));
  
  // Adicionar cards de tempo
  AVAILABLE_TIME.forEach(time => {
    const card = createTimeCard(time);
    cardsGrid.appendChild(card);
  });
  
  // Limpar e adicionar conteúdo
  elements.stepBody.innerHTML = '';
  elements.stepBody.appendChild(cardsGrid);
  
  // Verificar se há um tempo selecionado
  if (state.timeId) {
    const selectedCard = cardsGrid.querySelector(`[data-id="${state.timeId}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
      selectedCard.setAttribute('aria-checked', 'true');
      elements.nextBtn.disabled = false;
    }
  }
}

// Criar card de tempo
function createTimeCard(time) {
  const card = document.createElement('button');
  card.className = 'card';
  card.setAttribute('role', 'radio');
  card.setAttribute('aria-checked', state.timeId === time.id ? 'true' : 'false');
  card.setAttribute('data-id', time.id);
  card.setAttribute('tabindex', state.timeId === time.id ? '0' : '-1');
  
  // Ícone (placeholder)
  const icon = document.createElement('div');
  icon.className = 'card-image';
  icon.style.backgroundColor = 'var(--bg-tertiary)';
  icon.style.display = 'flex';
  icon.style.alignItems = 'center';
  icon.style.justifyContent = 'center';
  icon.style.fontSize = '2rem';
  icon.innerHTML = '⏱️';
  
  // Conteúdo
  const content = document.createElement('div');
  content.className = 'card-content';
  
  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = time[`title_${state.locale}`];
  
  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = time[`description_${state.locale}`];
  
  content.appendChild(title);
  content.appendChild(description);
  
  card.appendChild(icon);
  card.appendChild(content);
  
  // Evento de clique
  card.addEventListener('click', () => selectTime(time.id));
  
  return card;
}

// Selecionar tempo
function selectTime(timeId) {
  // Atualizar estado
  state.timeId = timeId;
  
  // Salvar estado
  saveState();
  
  // Atualizar UI
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (card.getAttribute('data-id') === timeId) {
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
      card.setAttribute('tabindex', '0');
    } else {
      card.classList.remove('selected');
      card.setAttribute('aria-checked', 'false');
      card.setAttribute('tabindex', '-1');
    }
  });
  
  // Habilitar botão próximo
  elements.nextBtn.disabled = false;
}

// Manipular clique no botão "Voltar"
function handleBack() {
  if (state.step > 1) {
    state.step--;
    saveState();
    renderStep();
    updateStepper();
  }
}

// Manipular clique no botão "Próximo"
function handleNext() {
  // Validar seleção atual
  if (state.step === 1 && !state.categoryId) {
    showError('error_select_category');
    return;
  }
  
  if (state.step === 2 && !state.themeId) {
    showError('error_select_theme');
    return;
  }
  
  if (state.step === 3 && !state.objectiveId) {
    showError('error_select_objective');
    return;
  }
  
  if (state.step === 4 && !state.timeId) {
    showError('error_select_time');
    return;
  }
  
  // Avançar para próxima etapa
  if (state.step < 4) {
    state.step++;
    saveState();
    renderStep();
    updateStepper();
  } else {
    // Se estiver na última etapa, concluir
    handleComplete();
  }
}

// Manipular conclusão do wizard
function handleComplete() {
  // Aqui você pode adicionar a lógica para finalizar o wizard
  // Por enquanto, apenas exibiremos um alerta
  alert(`Wizard concluído!\nCategoria: ${state.categoryId}\nTema: ${state.themeId}\nObjetivo: ${state.objectiveId}\nTempo: ${state.timeId}\nIdioma: ${state.locale}`);
  
  // Resetar estado
  state.step = 1;
  state.categoryId = null;
  state.themeId = null;
  state.objectiveId = null;
  state.timeId = null;
  saveState();
  
  // Renderizar primeira etapa
  renderStep();
  updateStepper();
}

// Atualizar indicador de progresso (stepper)
function updateStepper() {
  elements.steps.forEach((stepEl, index) => {
    const stepNumber = index + 1;
    
    // Remover classes
    stepEl.classList.remove('active', 'completed');
    
    // Adicionar classes apropriadas
    if (stepNumber < state.step) {
      stepEl.classList.add('completed');
    } else if (stepNumber === state.step) {
      stepEl.classList.add('active');
    }
  });
}

// Atualizar botões de navegação
function updateNavigationButtons() {
  // Botão Voltar
  elements.backBtn.disabled = state.step <= 1;
  
  // Botão Próximo/Concluir
  if (state.step < 4) {
    elements.nextBtn.textContent = getText('next');
  } else {
    elements.nextBtn.textContent = getText('finish');
  }
}

// Alternar idioma
function toggleLanguage() {
  state.locale = state.locale === 'pt' ? 'en' : 'pt';
  elements.langToggle.textContent = state.locale === 'pt' ? 'EN' : 'PT';
  saveState();
  updateLanguage();
  renderStep(); // Re-renderizar para atualizar textos
}

// Atualizar textos da interface
function updateLanguage() {
  // Atualizar todos os elementos com atributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const text = getText(key);
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = text;
    } else {
      element.textContent = text;
    }
  });
  
  // Atualizar título da página
  document.title = getText('header_title');
}

// Obter texto traduzido
function getText(key) {
  return I18N[state.locale][key] || key;
}

// Atualizar título da etapa
function updateStepTitle(key) {
  elements.stepTitle.textContent = getText(key);
}

// Exibir mensagem de erro
function showError(key) {
  elements.errorMessage.textContent = getText(key);
  elements.errorMessage.classList.add('active');
}

// Ocultar mensagem de erro
function hideError() {
  elements.errorMessage.classList.remove('active');
}

// Alternar menu mobile
function toggleMobileMenu() {
  const isExpanded = elements.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
  elements.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
  elements.navLinks.classList.toggle('active');
}

// Manipular navegação por teclado
function handleKeyboardNavigation(event) {
  // Navegação entre cards com setas
  if (event.target.classList.contains('card')) {
    const cards = Array.from(document.querySelectorAll('.card'));
    const currentIndex = cards.indexOf(event.target);
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < cards.length - 1) {
          cards[currentIndex + 1].focus();
        }
        break;
        
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) {
          cards[currentIndex - 1].focus();
        }
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        event.target.click();
        break;
        
      case 'Escape':
        event.preventDefault();
        // Limpar seleção
        if (state.step === 1) {
          state.categoryId = null;
        } else if (state.step === 2) {
          state.themeId = null;
        } else if (state.step === 3) {
          state.objectiveId = null;
        } else if (state.step === 4) {
          state.timeId = null;
        }
        saveState();
        renderStep();
        break;
    }
  }
  
  // Atalhos gerais
  switch (event.key) {
    case 'ArrowLeft':
      if (!event.target.matches('input, textarea')) {
        event.preventDefault();
        handleBack();
      }
      break;
      
    case 'ArrowRight':
      if (!event.target.matches('input, textarea')) {
        event.preventDefault();
        handleNext();
      }
      break;
  }
}