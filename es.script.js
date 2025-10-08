// Datos iniciales para las herramientas
const herramientas = [
    { 
        titulo: "GearHub", 
        descripcion: "Estructura tu camino con claridad. Cuenta con GearHub para armar una planificación sólida y organizada", 
        url: "gearhub/index.html" 
    },
    { 
        titulo: "GearLabs", 
        descripcion: "Transforma tu mejor idea en realidad. ¿Necesitas inspiración? Explora GearLabs y conoce nuestros prototipos conceptuales", 
        url: "gearlabs/index.html" 
    },
    { 
        titulo: "GearVision", 
        descripcion: "¿Quieres dar un paso más? Descubre insights estratégicos para proyectos profesionales y comerciales con GearVision", 
        url: "gearvision/index.html" 
    },
];

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initSmoothScroll();
    renderHerramientas();
    initMobileMenu();
});

// Toggle de tema claro/oscuro
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

// Scroll suave para anclas
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
                
                // Cerrar menú móvil si está abierto
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Renderizar herramientas dinámicamente
function renderHerramientas() {
    const container = document.getElementById('ferramentas-container');
    
    herramientas.forEach((herramienta, index) => {
        const card = document.createElement('a');
        card.className = 'tool-card';
        card.href = herramienta.url;
        card.target = "_self";
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h3>${herramienta.titulo}</h3>
            <p>${herramienta.descripcion}</p>
            <button class="tool-button">Explorar</button>
            
        `;
        
        container.appendChild(card);
    });
}

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Función para menú de idiomas
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.getElementById('languageDropdown');
  if (!dropdown) return;

  const file = window.location.pathname.split('/').pop();
  let currentLang = 'pt'; 
  if (file.startsWith('en.')) currentLang = 'en';
  if (file.startsWith('es.')) currentLang = 'es';

  dropdown.value = currentLang;

  dropdown.addEventListener('change', function () {
    const lang = this.value;
    let target = 'index.html';

    if (lang === 'en') target = 'en.index.html';
    if (lang === 'es') target = 'es.index.html';

    window.location.href = target;
  });
});

// Micro-interacciones para los cards
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
