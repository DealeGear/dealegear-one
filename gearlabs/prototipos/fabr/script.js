// ===== DADOS DOS PROJETOS =====
const projetos = [
  {
    id: "reciclagem-plasticos",
    titulo: "Máquina de Reciclagem de Plásticos",
    modulos: ["Química", "Mecânica", "Eletrônica"],
    status: "Buscando colaboradores",
    prazo: "12 semanas",
    dificuldade: "Média",
    vagas: 8,
    descricao: "Projeto modular para triturar, extrusar e moldar plástico reciclado. Buscamos especialistas em química de polímeros, projetos mecânicos e eletrônica de controle. Meta: protótipo funcional em 12 semanas.",
    cta: "Quero contribuir"
  },
  {
    id: "estacao-meteorologica",
    titulo: "Estação Meteorológica DIY",
    modulos: ["Eletrônica", "Programação", "Energia"],
    status: "Em desenvolvimento",
    prazo: "8 semanas",
    dificuldade: "Fácil",
    vagas: 5,
    descricao: "Estação meteorológica de baixo custo com sensores de temperatura, umidade, pressão e velocidade do vento. Dados abertos e interface web para visualização.",
    cta: "Quero contribuir"
  },
  {
    id: "cultivo-hidroponico",
    titulo: "Sistema de Cultivo Hidropônico",
    modulos: ["Hidráulica", "Eletrônica", "Biologia"],
    status: "Buscando colaboradores",
    prazo: "16 semanas",
    dificuldade: "Média",
    vagas: 6,
    descricao: "Sistema modular para cultivo hidropônico automatizado, com monitoramento de nutrientes, pH e iluminação. Ideal para ambientes urbanos.",
    cta: "Quero contribuir"
  },
  {
    id: "impressora-3d-grande",
    titulo: "Impressora 3D de Grande Porte",
    modulos: ["Mecânica", "Eletrônica", "Software"],
    status: "Em planejamento",
    prazo: "20 semanas",
    dificuldade: "Difícil",
    vagas: 10,
    descricao: "Impressora 3D com área de construção de 1m x 1m x 1m, focada em prototipagem de peças grandes e baixo custo operacional.",
    cta: "Quero contribuir"
  },
  {
    id: "painel-solar-diy",
    titulo: "Painel Solar Modular DIY",
    modulos: ["Eletrônica", "Energia", "Mecânica"],
    status: "Buscando colaboradores",
    prazo: "10 semanas",
    dificuldade: "Média",
    vagas: 7,
    descricao: "Sistema de painéis solares modulares que podem ser expandidos conforme a necessidade. Inclui controlador de carga e interface de monitoramento.",
    cta: "Quero contribuir"
  },
  {
    id: "robo-agricola",
    titulo: "Robô Agrícola Autônomo",
    modulos: ["Mecânica", "Eletrônica", "Programação", "IA"],
    status: "Em desenvolvimento",
    prazo: "24 semanas",
    dificuldade: "Difícil",
    vagas: 12,
    descricao: "Robô autônomo para agricultura de precisão, capaz de identificar pragas, monitorar saúde das plantas e aplicar tratamentos localizados.",
    cta: "Quero contribuir"
  }
];

// ===== FUNÇÕES UTILITÁRIAS =====
document.addEventListener('DOMContentLoaded', function() {
  // Inicialização de componentes
  initThemeToggle();
  initMobileMenu();
  renderProjetos();
  initFormValidation();
  initFAQ();
  initTestimonials();
  initMapTooltips();
  initCookieBanner();
  initScrollAnimations();
  initModal();
});

// ===== TOGGLE DE TEMA CLARO/ESCURO =====
function initThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.classList.add('theme-toggle');
  themeToggle.setAttribute('aria-label', 'Alternar tema');
  themeToggle.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="sun-icon" d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="sun-icon" d="M12 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="sun-icon" d="M12 21V23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="sun-icon" d="M4.22 4.22L5.64 5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="sun-icon" d="M18.36 18.36L19.78 19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="sun-icon" d="M1 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="sun-icon" d="M21 12H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="sun-icon" d="M4.22 19.78L5.64 18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="sun-icon" d="M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="moon-icon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"/>
    </svg>
  `;
  
  // Adicionar o botão de toggle ao header
  const headerContent = document.querySelector('.header-content');
  headerContent.appendChild(themeToggle);
  
  // Verificar preferência salva no localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  }
  
  // Adicionar evento de clique
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
  });
  
  // Função para atualizar o ícone do tema
  function updateThemeIcon(isDarkMode) {
    const sunIcon = themeToggle.querySelectorAll('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (isDarkMode) {
      sunIcon.forEach(icon => icon.style.display = 'none');
      moonIcon.style.display = 'block';
    } else {
      sunIcon.forEach(icon => icon.style.display = 'block');
      moonIcon.style.display = 'none';
    }
  }
}

// ===== MENU MOBILE =====
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  mobileMenuToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Atualizar atributo ARIA
    const isExpanded = navList.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
  });
  
  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navList.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== RENDERIZAÇÃO DOS PROJETOS =====
function renderProjetos() {
  const projetosContainer = document.getElementById('projetos-container');
  
  projetos.forEach(projeto => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.setAttribute('data-id', projeto.id);
    
    // Criar elemento de imagem (placeholder)
    const projectImage = document.createElement('div');
    projectImage.classList.add('project-image');
    projectImage.innerHTML = `
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="21 15 16 10 5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    // Criar conteúdo do projeto
    const projectContent = document.createElement('div');
    projectContent.classList.add('project-content');
    
    const projectTitle = document.createElement('h3');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = projeto.titulo;
    
    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-description');
    projectDescription.textContent = projeto.descricao;
    
    const projectMeta = document.createElement('div');
    projectMeta.classList.add('project-meta');
    
    // Adicionar metadados do projeto
    const metaItems = [
      { icon: 'calendar', text: projeto.prazo },
      { icon: 'trending-up', text: projeto.dificuldade },
      { icon: 'users', text: `${projeto.vagas} vagas` },
      { icon: 'info', text: projeto.status }
    ];
    
    metaItems.forEach(item => {
      const metaItem = document.createElement('div');
      metaItem.classList.add('project-meta-item');
      metaItem.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M${getIconPath(item.icon)}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>${item.text}</span>
      `;
      projectMeta.appendChild(metaItem);
    });
    
    // Adicionar módulos do projeto
    const projectModules = document.createElement('div');
    projectModules.classList.add('project-modules');
    
    projeto.modulos.forEach(modulo => {
      const moduleTag = document.createElement('span');
      moduleTag.classList.add('module-tag');
      moduleTag.textContent = modulo;
      projectModules.appendChild(moduleTag);
    });
    
    // Adicionar ações do projeto
    const projectActions = document.createElement('div');
    projectActions.classList.add('project-actions');
    
    const detailsButton = document.createElement('button');
    detailsButton.classList.add('btn', 'btn-secondary');
    detailsButton.textContent = 'Ver detalhes';
    
    const contributeButton = document.createElement('button');
    contributeButton.classList.add('btn', 'btn-primary');
    contributeButton.textContent = projeto.cta;
    
    projectActions.appendChild(detailsButton);
    projectActions.appendChild(contributeButton);
    
    // Montar o card do projeto
    projectContent.appendChild(projectTitle);
    projectContent.appendChild(projectDescription);
    projectContent.appendChild(projectMeta);
    projectContent.appendChild(projectModules);
    projectContent.appendChild(projectActions);
    
    projectCard.appendChild(projectImage);
    projectCard.appendChild(projectContent);
    
    projetosContainer.appendChild(projectCard);
  });
}

// Função auxiliar para obter o caminho do ícone
function getIconPath(iconName) {
  const icons = {
    'calendar': '8 7V3M8 11V21M16 3V7M16 17V21M4 8H20M4 16H20',
    'trending-up': '23 6L13.5 15.5L8.5 10.5L1 18M23 6L16.5 12.5L13.5 9.5L6 17',
    'users': '17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z',
    'info': '12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 16V12M12 8H12.01'
  };
  
  return icons[iconName] || '';
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====
function initFormValidation() {
  const form = document.getElementById('skills-form');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Resetar mensagens de erro
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.textContent = '');
    
    // Validar campos
    let isValid = true;
    
    // Validar nome
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
      document.getElementById('name-error').textContent = 'Por favor, informe seu nome.';
      isValid = false;
    }
    
    // Validar e-mail
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      document.getElementById('email-error').textContent = 'Por favor, informe seu e-mail.';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('email-error').textContent = 'Por favor, informe um e-mail válido.';
      isValid = false;
    }
    
    // Validar localização
    const locationInput = document.getElementById('location');
    if (!locationInput.value.trim()) {
      document.getElementById('location-error').textContent = 'Por favor, informe sua cidade/estado.';
      isValid = false;
    }
    
    // Validar habilidades
    const skillInputs = form.querySelectorAll('input[name="skills"]:checked');
    if (skillInputs.length === 0) {
      document.getElementById('skills-error').textContent = 'Por favor, selecione pelo menos uma habilidade.';
      isValid = false;
    }
    
    // Validar disponibilidade
    const availabilitySelect = document.getElementById('availability');
    if (!availabilitySelect.value) {
      document.getElementById('availability-error').textContent = 'Por favor, selecione sua disponibilidade.';
      isValid = false;
    }
    
    // Se o formulário for válido, exibir modal de sucesso
    if (isValid) {
      // Simular gravação (apenas console)
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        location: locationInput.value.trim(),
        skills: Array.from(skillInputs).map(input => input.value),
        availability: availabilitySelect.value
      };
      
      console.log('Dados do formulário:', formData);
      
      // Exibir modal de sucesso
      showSuccessModal();
      
      // Resetar formulário
      form.reset();
    }
  });
}

// ===== ACCORDION FAQ =====
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Fechar todos os itens
      const allFaqItems = document.querySelectorAll('.faq-item');
      allFaqItems.forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Se o item clicado não estava ativo, ativá-lo
      if (!isActive) {
        faqItem.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ===== CARROSSEL DE DEPOIMENTOS =====
function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial-item');
  const indicators = document.querySelectorAll('.indicator');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  
  let currentIndex = 0;
  
  // Função para exibir o depoimento atual
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }
  
  // Evento para o botão anterior
  prevButton.addEventListener('click', function() {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(newIndex);
  });
  
  // Evento para o botão próximo
  nextButton.addEventListener('click', function() {
    const newIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(newIndex);
  });
  
  // Evento para os indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      showTestimonial(index);
    });
  });
  
  // Rotação automática
  setInterval(() => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(newIndex);
  }, 5000);
}

// ===== TOOLTIPS DO MAPA =====
function initMapTooltips() {
  const cityPins = document.querySelectorAll('.city-pin');
  const tooltip = document.getElementById('map-tooltip');
  const tooltipCity = document.getElementById('tooltip-city');
  const tooltipServices = document.getElementById('tooltip-services');
  
  cityPins.forEach(pin => {
    pin.addEventListener('mouseenter', function(e) {
      const city = this.getAttribute('data-city');
      const services = this.getAttribute('data-services');
      
      tooltipCity.textContent = `Makerspace parceiro - ${city}`;
      tooltipServices.textContent = services;
      
      // Posicionar o tooltip
      const rect = this.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Obter a posição do SVG
      const svg = document.querySelector('.brazil-map');
      const svgRect = svg.getBoundingClientRect();
      
      // Calcular posição relativa ao SVG
      const x = rect.left - svgRect.left + rect.width / 2;
      const y = rect.top - svgRect.top - 70; // 70 é a altura do tooltip
      
      tooltip.setAttribute('transform', `translate(${x - 100}, ${y})`);
      tooltip.setAttribute('visibility', 'visible');
    });
    
    pin.addEventListener('mouseleave', function() {
      tooltip.setAttribute('visibility', 'hidden');
    });
  });
}

// ===== BANNER DE COOKIES =====
function initCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptButton = document.getElementById('accept-cookies');
  
  // Verificar se o usuário já aceitou os cookies
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  
  if (!cookiesAccepted) {
    // Exibir o banner após um pequeno delay
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }
  
  // Evento para aceitar os cookies
  acceptButton.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('show');
  });
}

// ===== ANIMAÇÕES AO SCROLL =====
function initScrollAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Criar um Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observar cada item da timeline
  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// ===== MODAL DE SUCESSO =====
function initModal() {
  const modal = document.getElementById('success-modal');
  const closeButton = document.getElementById('close-modal');
  const okButton = document.getElementById('modal-ok');
  
  // Fechar modal ao clicar no botão de fechar
  closeButton.addEventListener('click', function() {
    hideSuccessModal();
  });
  
  // Fechar modal ao clicar no botão OK
  okButton.addEventListener('click', function() {
    hideSuccessModal();
  });
  
  // Fechar modal ao clicar fora do conteúdo
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      hideSuccessModal();
    }
  });
  
  // Fechar modal ao pressionar a tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      hideSuccessModal();
    }
  });
}

// Função para exibir o modal de sucesso
function showSuccessModal() {
  const modal = document.getElementById('success-modal');
  
  // Exibir o modal
  modal.removeAttribute('hidden');
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  // Focar no botão OK para acessibilidade
  setTimeout(() => {
    document.getElementById('modal-ok').focus();
  }, 100);
}

// Função para ocultar o modal de sucesso
function hideSuccessModal() {
  const modal = document.getElementById('success-modal');
  
  modal.classList.remove('show');
  
  // Esperar a animação terminar antes de ocultar o modal
  setTimeout(() => {
    modal.setAttribute('hidden', 'true');
  }, 300);
  
  // Retornar o foco para o formulário
  document.getElementById('skills-form').focus();
}

// ===== SCROLL SUAVE PARA ÂNCORAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calcular a posição do elemento considerando o header fixo
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});