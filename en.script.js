// Initial data for the tools
const tools = [
    { title: "GearHub", description: "Structure your path with clarity. Count on GearHub to build a solid and organized plan", url: "gearhub/index.html" },
    { title: "GearLabs", description: "Turn your best idea into reality. Need inspiration? Explore GearLabs and check out our conceptual prototypes", url: "gearlabs/index.html" },
    { title: "GearVision", description: "Want to take the next step? Discover strategic insights for professional and commercial projects with GearVision", url: "gearvision/index.html" },
];


// Initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initSmoothScroll();
    renderTools();
    //initFormValidation();
    //initFAQ();
    //initTestimonials();
    initMobileMenu();
    //initTimelineAnimation();
    //initProjectObjective();
});

// Light/Dark theme toggle
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

// Smooth scroll for anchors
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
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Language selection dropdown
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



// Render tools dynamically
function renderTools() {
    const container = document.getElementById('ferramentas-container');
    
    tools.forEach((tool, index) => {
        const card = document.createElement('a'); // now it’s a link
        card.className = 'tool-card';
        card.href = tool.url;
        card.target = "_self";
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
            <button class="tool-button">Explore</button>
        `;
        
        container.appendChild(card);
    });
}



// Mobile menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}



// Add micro-interactions to cards
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
