// Estado da aplicação
let currentSection = 'hobby';
let currentLanguage = 'pt';
let currentTheme = 'light';

// Elementos DOM
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const languageSelect = document.getElementById('language-select');
const themeBtn = document.getElementById('theme-btn');
const logoLink = document.querySelector('.logo-link');

// Carregar conteúdo JSON
let contentData = {};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Carregar preferências salvas
  loadPreferences();
  
  // Carregar conteúdo do JSON
  loadContent();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Exibir seção inicial
  showSection(currentSection);
  
  // Aplicar tema
  applyTheme(currentTheme);
  
  // Adicionar animações de entrada
  animateElements();
});

// Carregar preferências do localStorage
function loadPreferences() {
  const savedLanguage = localStorage.getItem('gearmap-language');
  const savedTheme = localStorage.getItem('gearmap-theme');
  
  if (savedLanguage) {
    currentLanguage = savedLanguage;
    languageSelect.value = savedLanguage;
  }
  
  if (savedTheme) {
    currentTheme = savedTheme;
  }
}

// Carregar conteúdo do JSON
async function loadContent() {
  try {
    const response = await fetch('content.json');
    contentData = await response.json();
    updateContent();
  } catch (error) {
    console.error('Erro ao carregar conteúdo:', error);
  }
}

// Configurar event listeners
function setupEventListeners() {
  // Navegação desktop
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      showSection(section);
    });
  });
  
  // Navegação mobile
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      showSection(section);
      closeMobileMenu();
    });
  });
  
  // Logo
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('hobby');
  });
  
  // Menu mobile
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Seleção de idioma
  languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('gearmap-language', currentLanguage);
    updateContent();
  });
  
  // Alternância de tema
  themeBtn.addEventListener('click', toggleTheme);
}

// Exibir seção
function showSection(sectionId) {
  // Atualizar estado
  currentSection = sectionId;
  
  // Atualizar URL
  history.pushState({ section: sectionId }, '', `#${sectionId}`);
  
  // Ocultar todas as seções
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Exibir seção selecionada
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    
    // Adicionar animação de entrada aos elementos
    const elements = targetSection.querySelectorAll('.content-card');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add('animate-in');
      
      // Remover classe após a animação
      setTimeout(() => {
        el.classList.remove('animate-in');
      }, 1000 + (index * 100));
    });
  }
  
  // Atualizar links de navegação
  updateNavLinks(sectionId);
}

// Atualizar links de navegação
function updateNavLinks(sectionId) {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
  
  mobileNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
}

// Alternar menu mobile
function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
}

// Fechar menu mobile
function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  mobileMenuBtn.classList.remove('active');
}

// Alternar tema
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  localStorage.setItem('gearmap-theme', currentTheme);
}

// Aplicar tema
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// Atualizar conteúdo com base no idioma
function updateContent() {
  if (!contentData[currentLanguage]) return;
  
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    const translation = getNestedValue(contentData[currentLanguage], key);
    
    if (translation) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

// Obter valor aninhado do objeto
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

// Adicionar animações de entrada
function animateElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  const elements = document.querySelectorAll('.content-card');
  elements.forEach(el => observer.observe(el));
}

// Manipular eventos de navegação do navegador
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.section) {
    showSection(e.state.section);
  } else {
    // Se não houver estado, verificar o hash da URL
    const hash = window.location.hash.substring(1);
    if (hash && ['hobby', 'income', 'career', 'startup'].includes(hash)) {
      showSection(hash);
    } else {
      showSection('hobby');
    }
  }
});

// Verificar hash na carga inicial
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash && ['hobby', 'income', 'career', 'startup'].includes(hash)) {
    showSection(hash);
  }
});