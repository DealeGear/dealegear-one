
Crie um aplicativo web chamado GearLabs, que funcione como um hub centralizador de protótipos. A aplicação deve ser visualmente moderna, responsiva e atraente, dividido em HTML, CSS, JavaScript puro (sem frameworks) e Json para os textos em português, inglês e espanhol.

Estrutura e Layout:

1. Header
Menu de Idioma, Modo Claro e Escuro, Protótipos (mostra a página de protótipos conforme descrito em 2.1), Desafios (abre página de card som desafios [exemplo - Motor elétrico de alto desempenho, Alterativa ao uso de hélio em dirigíveis, etc])

2.0  Hero Section

“O Poder dos Protótipos”
Cada protótipo é uma oportunidade de aprendizado, um passo em direção à inovação. Através da experimentação e do desenvolvimento contínuo, transformamos ideias simples em soluções que podem impactar positivamente a vida das pessoas. Acreditamos que todo grande projeto começa com um pequeno protótipo. Botão: “Comece agora”.

2.1 Seção de Protótipos

Exiba cards dinâmicos para cada protótipo, carregados a partir de um json.

Cada card deve ter dados conforme o exemplo abaixo (json). Eles tem Imagem fictícia (placeholder). Nome do protótipo.
Descrição curta. Botão/link que leva a um site externo (ex.: página GitHub). Layout responsivo em grid/flexbox, adaptando-se a celular, tablet e desktop.





4. Footer

Deve conter 4 links fixos (ex.: Sobre, Contato, Documentação, Comunidade).

Requisitos Técnicos:

Mobile First, com menu hamburger lateral esquerdo no mobile.

Modo claro e escuro, alternável via botão.

Três idiomas (pt, en, es), todos os textos devem ser carregados de um arquivo .json.

Estrutura de código limpa, comentada e organizada para manutenção.

Os protótipos devem ser carregados via JavaScript (array de objetos) como no exemplo fornecido:

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


