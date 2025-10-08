// Dados iniciais para as ferramentas
const ferramentas = [
    { titulo: "GearHub", descricao: "Estruture seu caminho com clareza. Conte com GearHub para montar um planejamento sólido e organizado", url: "gearhub/index.html" },
    { titulo: "GearLabs", descricao: "Transforme sua melhor ideia em realidade. Precisa de inspiração? Explore GearLabs e conheça nossos protótipos conceituais", url: "gearlabs/index.html" },
    { titulo: "GearVision", descricao: "Quer dar um passo além? Descubra insights estratégicos para projetos profissionais e comerciais com GearVision", url: "gearvision/index.html" },
    
];


// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initSmoothScroll();
    renderFerramentas();
    //initFormValidation();
    //initFAQ();
    //initTestimonials();
    initMobileMenu();
    //initTimelineAnimation();
    //initProjectObjective();
});

// Toggle de tema claro/escuro
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}

// Scroll suave para âncoras
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Renderizar ferramentas dinamicamente
function renderFerramentas() {
    const container = document.getElementById('ferramentas-container');
    
    ferramentas.forEach((ferramenta, index) => {
        const card = document.createElement('a'); // agora é link
        card.className = 'tool-card';
        card.href = ferramenta.url;
        card.target = "_self"; // abre em nova aba
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h3>${ferramenta.titulo}</h3>
            <p>${ferramenta.descricao}</p>
            <button class="tool-button">Explorar</button>
        `;
        
        container.appendChild(card);
    });
}



// Menu mobile
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Função para menu de idiomas

// JavaScript
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.getElementById('languageDropdown');
  if (!dropdown) return;

  // Detecta idioma atual pelo nome do arquivo
  const file = window.location.pathname.split('/').pop(); // ex: "en.index.html"
  let currentLang = 'pt'; // padrão
  if (file.startsWith('en.')) currentLang = 'en';
  if (file.startsWith('es.')) currentLang = 'es';

  // Ajusta o select para refletir o idioma atual
  dropdown.value = currentLang;

  dropdown.addEventListener('change', function () {
    const lang = this.value;
    let target = 'index.html'; // padrão (pt)

    if (lang === 'en') target = 'en.index.html';
    if (lang === 'es') target = 'es.index.html';

    window.location.href = target;
  });
});



/*document.getElementById('languageDropdown').addEventListener('change', function () {
  const lang = this.value;
  if (lang =="pt"){
window.location.href = "index.html";
  } 
  else if (lang =="en"){
window.location.href = "en.index.html";
  }
  else if (lang =="es"){
window.location.href = "es.index.html";
  }
  // aqui você coloca sua função de troca de idioma
  console.log("Idioma selecionado:", lang);
  // exemplo: changeLanguage(lang);
});*/


// Adicionar micro-interações aos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.step-card, .project-card, .tool-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

