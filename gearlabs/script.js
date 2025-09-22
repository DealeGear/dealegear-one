
// Dados dos protótipos
const prototypes = [
  {
    id: 1,
    name: "3GTO",
    description: "Realidade virtual que conecta aventura e tecnologia",
    image: "img/3gto-capa.jpg",
    link: "prototipos/3gto/index.html",
  },

  {
    id: 2,
    name: "Aloi",
    description: "Plantas que trazem saúde e inovação",
    image: "img/aloi-capa.jpg",
    link: "prototipos/aloi/index.html",
  },
  {
    id: 3,
    name: "Aventuras Peludas",
    description: "As aventuras de uma poodle excêntrica chamada Amelia",
    image: "img/aventuras_peludas_capa.jpg",
    link: "prototipos/aventuras_peludas/index.html",
  },
  {
    id: 4,
    name: "Baristas",
    description:
      "Uma cafeteria aconchegante com cafés especiais e muitas novidades",
    image: "img/baristas-capa.jpg",
    link: "prototipos/baristas/index.html",
  },
  {
    id: 5,
    name: "BaristaPro",
    description:
      "Gestão eficiente de cafeterias com foco em viabilidade e performance",
    image: "img/baristapro-capa.jpg",
    link: "prototipos/barista_pro/index.html",
  },
  {
    id: 6,
    name: "Bosque das Frutíferas",
    description: "Trazendo natureza, educação e bem-estar para as cidades",
    image: "img/bosquedasfrutiferas-capa.jpg",
    link: "prototipos/bosquedasfrutiferas/index.html",
  },
  {
    id: 7,
    name: "Conexa",
    description: "Pós-vendas digital para pequenos negócios",
    image: "img/conexa-capa.jpg",
    link: "prototipos/conexa/index.html",
  },
  {
    id: 8,
    name: "Crush",
    description: "Conexões geek e relacionamentos divertidos",
    image: "img/crush-capa.jpg",
    link: "prototipos/crush/index.html",
  },
  {
    id: 9,
    name: "Dyris",
    description:
      "Acompanhe sua saúde ao longo da vida, prevena riscos e personalizse cuidados",
    image: "img/dyris-capa.jpg",
    link: "prototipos/dyris/index.html",
  },
  {
    id: 10,
    name: "DogZen",
    description: "Conforto acústico para pets",
    image: "img/dogzen-capa.jpg",
    link: "prototipos/dyris/index.html",
  },
  {
    id: 11,
    name: "Dust Protocol",
    description:
      "um jogo cyberpunk distópico: humanos sob renda básica e IA total, e o jogador, como membro do Neon Silence, tenta invadir Plastic Eden para restaurar a agência humana",
    image: "img/dustprotocol-capa.jpg",
    link: "prototipos/dustprotocol/index.html",
  },
  {
    id: 12,
    name: "E-Motion",
    description: "Motores mais eficientes e duráveis",
    image: "img/emotion-capa.jpg",
    link: "prototipos/emotion/index.html",
  },
  {
    id: 13,
    name: "Evora",
    description: "Um protótipo híbrido que une cidade virtual e modelos físicos para ensinar sobre ecossistemas urbanos e inspirar soluções para desafios reais",
    image: "img/evora-capa.jpg",
    link: "prototipos/evora/index.html",
  },
  {
    id: 14,
    name: "Fabr",
    description:
      "Uma plataforma de fabricação colaborativa, onde pessoas combinam habilidades para criar algo novo",
    image: "img/fabr-capa.jpg",
    link: "prototipos/fabr/index.html",
  },
  {
    id: 15,
    name: "GearCity",
    description: "protótipo de simulação social, onde diferentes papéis se conectam como engrenagens, movimentando a cidade de forma colaborativa e imprevisível.",
    image: "img/gearcity-capa.jpg",
    link: "prototipos/gearcity/index.html",
  },
  {
    id: 16,
    name: "Ignis",
    description:"Um concentrador óptico solar que leva a luz do sol para dentro de edifícios, gerando calor para energia, aquecimento e processos industriais. O painel de controle simulado permite monitorar sensores e visualizar dados em tempo real.",
    image: "img/ignis-capa.jpg",
    link: "prototipos/ignis/index.html",
  },

  {
    id: 17,
    name: "Mecanico Fantasma",
    description:
      "Monitoramento e analise de sons mecânicos de veículos, identificando divergências e prevenindo falhas",
    image: "img/mecanicofantasma-capa.jpg",
    link: "prototipos/mecanicofantasma/index.html",
  },
  {
    id: 18,
    name: "Mike e Tio Bob",
    description: "As aventuras de dois dinossauros pelo tempo",
    image: "img/mike-bob-capa.jpg",
    link: "prototipos/mike-bob/index.html",
  },

  {
    id: 19,
    name: "MyHeart",
    description:
      "Simulador cardiácico, com visualizações gráficas e ajustes personalizados.",
    image: "img/myheart-capa.jpg",
    link: "prototipos/myheart/index.html",
  },
  {
    id: 20,
    name: "Oxygen",
    description:
      "Explorando novas formas de gerar energia eficiente e sustentável",
    image: "img/oxygen-capa.jpg",
    link: "prototipos/oxygen/index.html",
  },
  {
    id: 21,
    name: "Raiz Urbana",
    description: "Ensinando agricultura urbana de forma simples e acessível",
    image: "img/raiz_urbana_capa.jpg",
    link: "prototipos/raiz_urbana/index.html",
  },
  {
    id: 22,
    name: "SIMCO",
    description: "Simulador da Função Coloretal",
    image: "img/simco-capa.jpg",
    link: "prototipos/simco/index.html",
  },
  {
    id: 23,
    name: "Stairs",
    description:
      "Suba os degraus do conhecimento e transforme suas ideias em realidade",
    image: "img/stairs-capa.jpg",
    link: "prototipos/stairs/index.html",
  },

  {
    id: 24,
    name: "Synapse",
    description:
      "Conexão interativa de ideias para colaboração criativa e descoberta coletiva",
    image: "img/synapse-capa.jpg",
    link: "prototipos/synapse/index.html",
  },
  {
    id: 25,
    name: "UnderSea",
    description:
      "Drones subaquáticos para explorar, monitorar e estudar os oceanos de forma autônoma",
    image: "img/undersea-capa.jpg",
    link: "prototipos/undersea/index.html",
  },

  {
    id: 26,
    name: "VersoEspresso",
    description: "Café quente, páginas vivas e ideias infinitas",
    image: "img/versoespresso-capa.jpg",
    link: "prototipos/versoespresso/index.html",
  },
  {
    id: 27,
    name: "Viver é uma Arte",
    description:
      "Criação e exposição de arte a áreas carentes, proporcionando bem-estar e renda",
    image: "img/viverarte-capa.jpg",
    link: "prototipos/vivererte/index.html",
  },
];

// Função para criar um card de protótipo
function createPrototypeCard(prototype) {
  return `
        <article class="prototype-card">
            <img src="${prototype.image}" alt="${prototype.name}" class="prototype-image">
            <div class="prototype-content">
                <h3 class="prototype-title">${prototype.name}</h3>
                <p class="prototype-description">${prototype.description}</p>
                <a href="${prototype.link}" target="_self" class="prototype-link">
                    <span>Acessar Landpage</span>
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </article>
    `;
}

// Função para renderizar todos os protótipos
function renderPrototypes() {
  const grid = document.getElementById("prototypesGrid");
  grid.innerHTML = prototypes
    .map((prototype) => createPrototypeCard(prototype))
    .join("");
}

// Função para adicionar novo protótipo
function addPrototype(newPrototype) {
  prototypes.push(newPrototype);
  renderPrototypes();
}

// Menu Mobile Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scroll para seções
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animação de scroll para elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Efeito parallax suave no hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  // Limitar o efeito parallax para evitar problemas de sobreposição
  if (scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  }

  // Mudar estilo do navbar ao rolar
  const navbar = document.querySelector(".navbar");
  if (scrolled > 50) {
    navbar.style.boxShadow = "var(--shadow-md)";
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.boxShadow = "var(--shadow-sm)";
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  renderPrototypes();

  // Adicionar animação aos cards
  setTimeout(() => {
    const cards = document.querySelectorAll(".prototype-card");
    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `all 0.5s ease-out ${index * 0.01}s`;
      observer.observe(card);
    });
  }, 100);

  // Adicionar evento de clique no indicador de scroll
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      document.querySelector(".prototypes-section").scrollIntoView({
        behavior: "smooth",
      });
    });
  }
});

// Função para menu de idiomas
document.getElementById('languageDropdown').addEventListener('change', function () {
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
});




// Exemplo de como adicionar um novo protótipo dinamicamente
// Você pode chamar esta função quando precisar adicionar novos projetos
/*
const newProject = {
    id: 7,
    name: "Novo Projeto",
    description: "Descrição do novo projeto",
    image: "https://picsum.photos/seed/newproject/400/300.jpg",
    link: "https://github.com/gearlabs/newproject"
};
addPrototype(newProject);
*/
