/* 
═══════════════════════════════════════════════════════════════════════════════
  GEARBLOG - MAIN JAVASCRIPT
═══════════════════════════════════════════════════════════════════════════════
  
  ESTRUTURA:
  1. Estado Global da Aplicação
  2. Gerenciamento de Temas (Dark/Light)
  3. Gerenciamento de Idiomas (i18n)
  4. Gerenciamento de Modos (Business/Technical)
  5. Carregamento de Artigos (fetch de JSONs)
  6. Renderização de UI
  7. Busca e Filtros
  8. Navegação e Roteamento (hash-based)
  9. Event Listeners
  10. Inicialização
  
═══════════════════════════════════════════════════════════════════════════════
*/

// ═══════════════════════════════════════════════════════════════════════════
// 1. ESTADO GLOBAL DA APLICAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

const AppState = {
  // Configurações do usuário (persistidas)
  theme: 'light',           // 'light' ou 'dark'
  language: 'pt',           // 'pt', 'en', ou 'es'
  mode: 'negocios',         // 'negocios' ou 'tecnico'
  
  // Dados dos artigos
  articles: [],             // Array com todos os artigos carregados
  filteredArticles: [],     // Artigos após aplicação de filtros
  
  // Estado da UI
  currentPage: 1,           // Página atual da paginação
  articlesPerPage: 6,       // Artigos por página
  searchQuery: '',          // Texto da busca
  activeTags: [],           // Tags filtradas atualmente
  
  // Estado do modal
  modalOpen: false,
  currentArticleSlug: null
};

// Textos da interface em múltiplos idiomas
const UITranslations = {
  pt: {
    search: 'Buscar artigos...',
    loading: 'Carregando artigos...',
    noResults: 'Nenhum artigo encontrado',
    readMore: 'Ler mais',
    close: 'Fechar',
    next: 'Próxima',
    previous: 'Anterior',
    page: 'Página',
    about: 'Sobre',
    privacy: 'Privacidade',
    terms: 'Termos',
    contact: 'Contato',
    rights: 'Todos os direitos reservados',
    fallback: 'Tradução não disponível - exibindo conteúdo alternativo',
    noArticles: 'Nenhum artigo disponível no momento',
    filterBy: 'Filtrar por',
    clearFilters: 'Limpar filtros',
    businessMode: 'Negócios',
    technicalMode: 'Técnico'
  },
  en: {
    search: 'Search articles...',
    loading: 'Loading articles...',
    noResults: 'No articles found',
    readMore: 'Read more',
    close: 'Close',
    next: 'Next',
    previous: 'Previous',
    page: 'Page',
    about: 'About',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    rights: 'All rights reserved',
    fallback: 'Translation not available - showing alternative content',
    noArticles: 'No articles available at the moment',
    filterBy: 'Filter by',
    clearFilters: 'Clear filters',
    businessMode: 'Business',
    technicalMode: 'Technical'
  },
  es: {
    search: 'Buscar artículos...',
    loading: 'Cargando artículos...',
    noResults: 'No se encontraron artículos',
    readMore: 'Leer más',
    close: 'Cerrar',
    next: 'Siguiente',
    previous: 'Anterior',
    page: 'Página',
    about: 'Acerca de',
    privacy: 'Privacidad',
    terms: 'Términos',
    contact: 'Contacto',
    rights: 'Todos los derechos reservados',
    fallback: 'Traducción no disponible - mostrando contenido alternativo',
    noArticles: 'No hay artículos disponibles en este momento',
    filterBy: 'Filtrar por',
    clearFilters: 'Limpiar filtros',
    businessMode: 'Negocios',
    technicalMode: 'Técnico'
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. GERENCIAMENTO DE TEMAS (Dark/Light)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Carrega o tema salvo do localStorage ou detecta preferência do sistema
 */
function loadTheme() {
  const savedTheme = localStorage.getItem('gearblog-theme');
  
  if (savedTheme) {
    AppState.theme = savedTheme;
  } else {
    // Detecta preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    AppState.theme = prefersDark ? 'dark' : 'light';
  }
  
  applyTheme();
}

/**
 * Aplica o tema ao documento
 */
function applyTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', AppState.theme === 'dark');
  }
}

/**
 * Alterna entre temas claro e escuro
 */
function toggleTheme() {
  AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('gearblog-theme', AppState.theme);
  applyTheme();
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. GERENCIAMENTO DE IDIOMAS (i18n)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Carrega o idioma salvo do localStorage ou usa o idioma do navegador
 */
function loadLanguage() {
  const savedLanguage = localStorage.getItem('gearblog-language');
  
  if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
    AppState.language = savedLanguage;
  } else {
    // Detecta idioma do navegador
    const browserLang = navigator.language.split('-')[0];
    AppState.language = ['pt', 'en', 'es'].includes(browserLang) ? browserLang : 'pt';
  }
  
  applyLanguage();
}

/**
 * Aplica o idioma selecionado
 */
function applyLanguage() {
  // Atualiza o select de idioma
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.value = AppState.language;
  }
  
  // Atualiza o atributo lang do HTML
  document.documentElement.lang = AppState.language;
  
  // Atualiza textos da interface
  updateUITexts();
  
  // Re-renderiza os artigos com o novo idioma
  renderArticles();
}

/**
 * Troca o idioma da aplicação
 */
function changeLanguage(language) {
  if (!['pt', 'en', 'es'].includes(language)) return;
  
  AppState.language = language;
  localStorage.setItem('gearblog-language', language);
  applyLanguage();
}

/**
 * Retorna uma tradução baseada no idioma atual
 */
function t(key) {
  return UITranslations[AppState.language]?.[key] || UITranslations.pt[key] || key;
}

/**
 * Atualiza todos os textos da interface
 */
function updateUITexts() {
  // Placeholder do campo de busca
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.placeholder = t('search');
  }
  
  // Labels dos modos
  const businessLabel = document.getElementById('mode-label-business');
  const technicalLabel = document.getElementById('mode-label-technical');
  if (businessLabel) businessLabel.textContent = t('businessMode');
  if (technicalLabel) technicalLabel.textContent = t('technicalMode');
  
  // Links do footer
  document.getElementById('footer-about').textContent = t('about');
  document.getElementById('footer-privacy').textContent = t('privacy');
  document.getElementById('footer-terms').textContent = t('terms');
  document.getElementById('footer-contact').textContent = t('contact');
  document.getElementById('footer-rights').textContent = t('rights');
  
  // Ano atual no footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. GERENCIAMENTO DE MODOS (Business/Technical)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Carrega o modo salvo do localStorage
 */
function loadMode() {
  const savedMode = localStorage.getItem('gearblog-mode');
  
  if (savedMode && ['negocios', 'tecnico'].includes(savedMode)) {
    AppState.mode = savedMode;
  }
  
  applyMode();
}

/**
 * Aplica o modo selecionado
 */
function applyMode() {
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  
  if (modeToggle) {
    modeToggle.checked = AppState.mode === 'tecnico';
    modeToggle.setAttribute('aria-checked', AppState.mode === 'tecnico');
  }
  
  // Remove classes de modo anteriores
  body.classList.remove('mode-business', 'mode-technical');
  
  // Adiciona classe apropriada
  if (AppState.mode === 'negocios') {
    body.classList.add('mode-business');
  } else {
    body.classList.add('mode-technical');
  }
  
  // Re-renderiza os artigos com o novo modo
  renderArticles();
}

/**
 * Alterna entre modos Negócios e Técnico
 */
function toggleMode() {
  AppState.mode = AppState.mode === 'negocios' ? 'tecnico' : 'negocios';
  localStorage.setItem('gearblog-mode', AppState.mode);
  applyMode();
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. CARREGAMENTO DE ARTIGOS (fetch de JSONs)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Carrega todos os artigos dos arquivos JSON
 * Tentará carregar article-1.json, article-2.json, etc. até encontrar um erro
 */
async function loadArticles() {
  const articlesGrid = document.getElementById('articles-grid');
  articlesGrid.innerHTML = `
    <div class="loading" role="status" aria-live="polite">
      <div class="spinner"></div>
      <p>${t('loading')}</p>
    </div>
  `;
  
  AppState.articles = [];
  let articleIndex = 1;
  let consecutiveErrors = 0;
  
  // Tenta carregar artigos numerados sequencialmente
  while (consecutiveErrors < 2) {
    try {
      const response = await fetch(`i18n/article-${articleIndex}.json`);
      
      if (!response.ok) {
        consecutiveErrors++;
        articleIndex++;
        continue;
      }
      
      const article = await response.json();
      AppState.articles.push(article);
      consecutiveErrors = 0;
      articleIndex++;
      
    } catch (error) {
      console.warn(`Não foi possível carregar article-${articleIndex}.json:`, error);
      consecutiveErrors++;
      articleIndex++;
    }
  }
  
  console.log(`✅ ${AppState.articles.length} artigos carregados com sucesso`);
  
  // Inicializa filtros
  AppState.filteredArticles = [...AppState.articles];
  
  // Renderiza os artigos
  renderArticles();
}

/**
 * Obtém o conteúdo de um artigo baseado no idioma e modo atuais
 * Implementa fallback para idiomas e modos indisponíveis
 */
function getArticleContent(article, section = 'visaoGeral') {
  const mode = AppState.mode;
  const lang = AppState.language;
  
  // Tenta obter conteúdo no modo e idioma atuais
  let content = article.modeVariants?.[mode]?.[section]?.[lang];
  
  // Fallback 1: Tenta outro idioma no mesmo modo
  if (!content) {
    const fallbackLangs = ['pt', 'en', 'es'].filter(l => l !== lang);
    for (const fallbackLang of fallbackLangs) {
      content = article.modeVariants?.[mode]?.[section]?.[fallbackLang];
      if (content) break;
    }
  }
  
  // Fallback 2: Tenta o outro modo no idioma atual
  if (!content) {
    const otherMode = mode === 'negocios' ? 'tecnico' : 'negocios';
    content = article.modeVariants?.[otherMode]?.[section]?.[lang];
  }
  
  // Fallback 3: Tenta o outro modo em qualquer idioma
  if (!content) {
    const otherMode = mode === 'negocios' ? 'tecnico' : 'negocios';
    const fallbackLangs = ['pt', 'en', 'es'];
    for (const fallbackLang of fallbackLangs) {
      content = article.modeVariants?.[otherMode]?.[section]?.[fallbackLang];
      if (content) break;
    }
  }
  
  return content || '';
}

/**
 * Obtém o título do artigo com fallback
 */
function getArticleTitle(article) {
  return getArticleContent(article, 'title');
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. RENDERIZAÇÃO DE UI
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Renderiza a grade de artigos com paginação
 */
function renderArticles() {
  const articlesGrid = document.getElementById('articles-grid');
  
  if (AppState.filteredArticles.length === 0) {
    articlesGrid.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <h3>${t('noResults')}</h3>
        <p>${AppState.searchQuery || AppState.activeTags.length > 0 ? 
          t('clearFilters') : t('noArticles')}</p>
      </div>
    `;
    return;
  }
  
  // Calcula artigos da página atual
  const startIndex = (AppState.currentPage - 1) * AppState.articlesPerPage;
  const endIndex = startIndex + AppState.articlesPerPage;
  const articlesToShow = AppState.filteredArticles.slice(startIndex, endIndex);
  
  // Renderiza cards dos artigos
  articlesGrid.innerHTML = articlesToShow.map(article => createArticleCard(article)).join('');
  
  // Renderiza paginação
  renderPagination();
  
  // Adiciona event listeners aos cards
  attachArticleCardListeners();
}

/**
 * Cria o HTML de um card de artigo
 */
function createArticleCard(article) {
  const title = getArticleTitle(article);
  const excerpt = getArticleContent(article, 'visaoGeral');
  const tags = article.tags || [];
  const date = new Date(article.date).toLocaleDateString(AppState.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return `
    <article class="article-card" data-slug="${article.slug}" tabindex="0" role="button">
      <div class="article-card-header">
        <h3 class="article-card-title">${title}</h3>
        <div class="article-card-meta">
          <span>📅 ${date}</span>
          ${article.author ? `<span>✍️ ${article.author}</span>` : ''}
        </div>
      </div>
      
      <p class="article-card-excerpt">${excerpt}</p>
      
      ${tags.length > 0 ? `
        <div class="article-card-tags">
          ${tags.map(tag => `
            <span class="tag" data-tag="${tag}" role="button" tabindex="0">${tag}</span>
          `).join('')}
        </div>
      ` : ''}
      
      <div class="article-card-footer">
        <span class="read-more">
          ${t('readMore')} →
        </span>
      </div>
    </article>
  `;
}

/**
 * Renderiza controles de paginação
 */
function renderPagination() {
  const pagination = document.getElementById('pagination');
  const totalPages = Math.ceil(AppState.filteredArticles.length / AppState.articlesPerPage);
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let paginationHTML = `
    <button 
      onclick="changePage(${AppState.currentPage - 1})"
      ${AppState.currentPage === 1 ? 'disabled' : ''}
      aria-label="${t('previous')}">
      ← ${t('previous')}
    </button>
  `;
  
  // Mostra até 5 páginas
  const maxButtons = 5;
  let startPage = Math.max(1, AppState.currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button 
        onclick="changePage(${i})"
        class="${i === AppState.currentPage ? 'active' : ''}"
        aria-label="${t('page')} ${i}"
        ${i === AppState.currentPage ? 'aria-current="page"' : ''}>
        ${i}
      </button>
    `;
  }
  
  paginationHTML += `
    <button 
      onclick="changePage(${AppState.currentPage + 1})"
      ${AppState.currentPage === totalPages ? 'disabled' : ''}
      aria-label="${t('next')}">
      ${t('next')} →
    </button>
  `;
  
  pagination.innerHTML = paginationHTML;
}

/**
 * Muda para uma página específica
 */
function changePage(pageNumber) {
  const totalPages = Math.ceil(AppState.filteredArticles.length / AppState.articlesPerPage);
  
  if (pageNumber < 1 || pageNumber > totalPages) return;
  
  AppState.currentPage = pageNumber;
  renderArticles();
  
  // Scroll suave para o topo da grade
  document.getElementById('articles-grid').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Adiciona event listeners aos cards de artigos
 */
function attachArticleCardListeners() {
  const cards = document.querySelectorAll('.article-card');
  
  cards.forEach(card => {
    const slug = card.dataset.slug;
    
    // Click no card
    card.addEventListener('click', (e) => {
      // Ignora se clicou em uma tag
      if (e.target.classList.contains('tag')) return;
      openArticle(slug);
    });
    
    // Enter no card quando focado
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.target.classList.contains('tag')) {
        openArticle(slug);
      }
    });
  });
  
  // Event listeners para tags
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTagFilter(tag.dataset.tag);
    });
    
    tag.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        toggleTagFilter(tag.dataset.tag);
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 7. BUSCA E FILTROS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Aplica busca por texto
 */
function applySearch(query) {
  AppState.searchQuery = query.toLowerCase().trim();
  filterArticles();
}

/**
 * Adiciona ou remove uma tag dos filtros ativos
 */
function toggleTagFilter(tag) {
  const index = AppState.activeTags.indexOf(tag);
  
  if (index > -1) {
    AppState.activeTags.splice(index, 1);
  } else {
    AppState.activeTags.push(tag);
  }
  
  filterArticles();
  renderActiveFilters();
}

/**
 * Remove todas as tags dos filtros
 */
function clearTagFilters() {
  AppState.activeTags = [];
  filterArticles();
  renderActiveFilters();
}

/**
 * Filtra artigos baseado em busca e tags
 */
function filterArticles() {
  AppState.filteredArticles = AppState.articles.filter(article => {
    // Filtro de busca
    if (AppState.searchQuery) {
      const title = getArticleTitle(article).toLowerCase();
      const excerpt = getArticleContent(article, 'visaoGeral').toLowerCase();
      const tags = (article.tags || []).join(' ').toLowerCase();
      
      const matchesSearch = title.includes(AppState.searchQuery) ||
                           excerpt.includes(AppState.searchQuery) ||
                           tags.includes(AppState.searchQuery);
      
      if (!matchesSearch) return false;
    }
    
    // Filtro de tags
    if (AppState.activeTags.length > 0) {
      const articleTags = article.tags || [];
      const hasMatchingTag = AppState.activeTags.some(tag => articleTags.includes(tag));
      
      if (!hasMatchingTag) return false;
    }
    
    return true;
  });
  
  // Reseta para primeira página
  AppState.currentPage = 1;
  
  renderArticles();
}

/**
 * Renderiza tags ativas nos filtros
 */
function renderActiveFilters() {
  const activeFiltersContainer = document.getElementById('active-filters');
  
  if (AppState.activeTags.length === 0) {
    activeFiltersContainer.innerHTML = '';
    return;
  }
  
  activeFiltersContainer.innerHTML = AppState.activeTags.map(tag => `
    <span class="filter-tag">
      ${tag}
      <button 
        onclick="toggleTagFilter('${tag}')" 
        aria-label="Remover filtro ${tag}"
        title="Remover">
        ✕
      </button>
    </span>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// 8. NAVEGAÇÃO E ROTEAMENTO (hash-based)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Processa mudanças de hash na URL
 */
function handleHashChange() {
  const hash = window.location.hash.slice(1); // Remove o #
  
  if (hash.startsWith('article/')) {
    const slug = hash.replace('article/', '');
    openArticle(slug, false); // false = não atualizar URL
  } else if (AppState.modalOpen) {
    closeArticle();
  }
}

/**
 * Abre um artigo completo no modal
 */
function openArticle(slug, updateURL = true) {
  const article = AppState.articles.find(a => a.slug === slug);
  
  if (!article) {
    console.error(`Artigo não encontrado: ${slug}`);
    return;
  }
  
  AppState.currentArticleSlug = slug;
  AppState.modalOpen = true;
  
  // Atualiza URL se necessário
  if (updateURL) {
    window.location.hash = `article/${slug}`;
  }
  
  // Renderiza conteúdo do artigo
  renderArticleModal(article);
  
  // Mostra modal
  const modal = document.getElementById('article-modal');
  modal.classList.add('active');
  
  // Previne scroll do body
  document.body.style.overflow = 'hidden';
  
  // Foca no botão de fechar para acessibilidade
  setTimeout(() => {
    document.getElementById('close-article').focus();
  }, 100);
}

/**
 * Fecha o modal do artigo
 */
function closeArticle() {
  AppState.modalOpen = false;
  AppState.currentArticleSlug = null;
  
  const modal = document.getElementById('article-modal');
  modal.classList.remove('active');
  
  // Restaura scroll do body
  document.body.style.overflow = '';
  
  // Remove hash da URL
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

/**
 * Renderiza o conteúdo completo de um artigo no modal
 */
function renderArticleModal(article) {
  const title = getArticleTitle(article);
  const content = getArticleContent(article, 'saibaMais');
  const tags = article.tags || [];
  const date = new Date(article.date).toLocaleDateString(AppState.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const articleContent = document.getElementById('article-content');
  
  articleContent.innerHTML = `
    <header>
      <h1 id="article-title">${title}</h1>
      <div class="article-meta">
        <span>📅 ${date}</span>
        ${article.author ? `<span>✍️ ${article.author}</span>` : ''}
        <span>🏷️ ${tags.join(', ')}</span>
      </div>
    </header>
    
    <div class="article-body">
      ${formatArticleContent(content)}
    </div>
  `;
}

/**
 * Formata o conteúdo do artigo (converte quebras de linha em parágrafos)
 */
function formatArticleContent(content) {
  return content
    .split('\n\n')
    .filter(para => para.trim())
    .map(para => `<p>${para.trim()}</p>`)
    .join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// 9. EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Configura todos os event listeners da aplicação
 */
function setupEventListeners() {
  // Theme toggle - Seleciona todos os botões de tema (desktop e mobile)
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
      toggle?.addEventListener('click', toggleTheme);
  });
  
  // Language selector - Seleciona todos os selects de idioma (desktop e mobile)
  const languageSelects = document.querySelectorAll('.language-selector select');
  languageSelects.forEach(select => {
      select?.addEventListener('change', (e) => changeLanguage(e.target.value));
  });
  
  // Mode toggle - Seleciona todos os inputs de modo (desktop e mobile)
  const modeToggles = document.querySelectorAll('input[type="checkbox"][role="switch"]');
  modeToggles.forEach(toggle => {
      toggle?.addEventListener('change', toggleMode);
  });

  
  
  // Search input
  const searchInput = document.getElementById('search-input');
  let searchTimeout;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => applySearch(e.target.value), 300);
  });
  
  // Hamburger menu
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  hamburger?.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
  });
  
  // Close article modal
  const closeButton = document.getElementById('close-article');
  closeButton?.addEventListener('click', closeArticle);
  
  // Close modal ao clicar no overlay
  const modalOverlay = document.querySelector('.article-modal-overlay');
  modalOverlay?.addEventListener('click', closeArticle);
  
  // Fechar modal com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && AppState.modalOpen) {
      closeArticle();
    }
  });
  
  // Hash change (navegação)
  window.addEventListener('hashchange', handleHashChange);
  
  // Previne scroll quando modal aberto
  document.getElementById('article-modal')?.addEventListener('wheel', (e) => {
    e.stopPropagation();
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 10. INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Inicializa a aplicação
 */
async function initApp() {
  console.log('🚀 Inicializando GearBlog...');
  
  // Carrega configurações salvas
  loadTheme();
  loadLanguage();
  loadMode();
  
  // Configura event listeners
  setupEventListeners();
  
  // Carrega artigos
  await loadArticles();
  
  // Processa hash inicial (deep linking)
  if (window.location.hash) {
    handleHashChange();
  }
  
  console.log('✅ GearBlog iniciado com sucesso!');
}

// Aguarda o DOM estar pronto e inicializa
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Exporta funções para uso global (necessário para onclick inline)
window.changePage = changePage;
window.toggleTagFilter = toggleTagFilter;
window.clearTagFilters = clearTagFilters;