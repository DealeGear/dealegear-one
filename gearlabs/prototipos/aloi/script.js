// ===== GLOBAL VARIABLES =====
let currentLang = 'pt';
let content = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
  await loadContent();
  initializeLanguage();
  initializeEventListeners();
  createFloatingElements();
  addScrollAnimations();
});

// ===== LOAD CONTENT =====
async function loadContent() {
  try {
    const response = await fetch('content.json');
    content = await response.json();
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

// ===== LANGUAGE INITIALIZATION =====
function initializeLanguage() {
  updatePageContent();
  updateActiveLanguageButton();
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
  // Language selector
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentLang = e.target.dataset.lang;
      updatePageContent();
      updateActiveLanguageButton();
    });
  });

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== UPDATE PAGE CONTENT =====
function updatePageContent() {
  const langContent = content.languages[currentLang];
  
  // Update hero
  document.querySelector('.hero h1').textContent = langContent.hero.title;
  
  // Update about section
  document.querySelector('#about .section-title').textContent = langContent.about.title;
  document.querySelector('.about-card p').textContent = langContent.about.description;
  
  // Update how it works section
  document.querySelector('#how-it-works .section-title').textContent = langContent.howItWorks.title;
  const steps = document.querySelectorAll('.step-card');
  langContent.howItWorks.steps.forEach((step, index) => {
    if (steps[index]) {
      steps[index].querySelector('h3').textContent = step.title;
      steps[index].querySelector('p').textContent = step.description;
    }
  });
  
  // Update applications section
  document.querySelector('#applications .section-title').textContent = langContent.applications.title;
  const apps = document.querySelectorAll('.app-card');
  langContent.applications.items.forEach((app, index) => {
    if (apps[index]) {
      apps[index].querySelector('h3').textContent = app.title;
      apps[index].querySelector('p').textContent = app.description;
    }
  });
  
  // Update access section
  document.querySelector('#access .section-title').textContent = langContent.access.title;
  document.querySelector('.access-button').textContent = langContent.access.button;
  
  // Update menu
  const menuLinks = document.querySelectorAll('.nav-menu a');
  menuLinks[0].textContent = langContent.menu.home;
  menuLinks[1].textContent = langContent.menu.about;
  menuLinks[2].textContent = langContent.menu.how;
  menuLinks[3].textContent = langContent.menu.apps;
  menuLinks[4].textContent = langContent.menu.access;
  
  // Update footer
  const footerLinks = document.querySelectorAll('.footer a');
  footerLinks[0].textContent = langContent.footer.about;
  footerLinks[1].textContent = langContent.footer.docs;
  footerLinks[2].textContent = langContent.footer.github;
  footerLinks[3].textContent = langContent.footer.contact;
}

// ===== UPDATE ACTIVE LANGUAGE BUTTON =====
function updateActiveLanguageButton() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === currentLang) {
      btn.classList.add('active');
    }
  });
}

// ===== CREATE FLOATING ELEMENTS =====
function createFloatingElements() {
  const hero = document.querySelector('.hero');
  const floatingContainer = document.createElement('div');
  floatingContainer.className = 'floating-elements';
  
  // Create molecules
  for (let i = 0; i < 3; i++) {
    const molecule = document.createElement('div');
    molecule.className = 'molecule';
    floatingContainer.appendChild(molecule);
  }
  
  // Create leaves
  for (let i = 0; i < 2; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    floatingContainer.appendChild(leaf);
  }
  
  hero.appendChild(floatingContainer);
}

// ===== SCROLL ANIMATIONS =====
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all sections and cards
  document.querySelectorAll('.section, .about-card, .step-card, .app-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===== PARTICLE EFFECT =====
function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.width = '4px';
  particle.style.height = '4px';
  particle.style.background = '#10b981';
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.opacity = '1';
  document.body.appendChild(particle);
  
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 3 + 2;
  const lifetime = Math.random() * 1000 + 500;
  
  let posX = x;
  let posY = y;
  let opacity = 1;
  
  const animate = () => {
    posX += Math.cos(angle) * velocity;
    posY += Math.sin(angle) * velocity;
    opacity -= 1 / (lifetime / 16);
    
    particle.style.left = posX + 'px';
    particle.style.top = posY + 'px';
    particle.style.opacity = opacity;
    
    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      particle.remove();
    }
  };
  
  requestAnimationFrame(animate);
}

// Add particle effect on mouse move
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.98) {
    createParticle(e.clientX, e.clientY);
  }
});