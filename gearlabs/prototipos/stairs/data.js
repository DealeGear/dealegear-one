// Dados de categorias
const CATEGORIES = [
  {
    id: "tech",
    title_pt: "Tecnologia",
    title_en: "Technology",
    description_pt: "Apps, SaaS, automações.",
    description_en: "Apps, SaaS, automations.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format",
  },
  {
    id: "arts",
    title_pt: "Artes & Conteúdo",
    title_en: "Arts & Content",
    description_pt: "Criação, design, mídia.",
    description_en: "Creation, design, media.",
    image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format",
  },
  {
    id: "services",
    title_pt: "Serviços",
    title_en: "Services",
    description_pt: "Consultoria, freelas, local.",
    description_en: "Consulting, freelancing, local.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format",
  },
  {
    id: "education",
    title_pt: "Educação",
    title_en: "Education",
    description_pt: "Cursos, tutoria, microlearning.",
    description_en: "Courses, tutoring, microlearning.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format",
  },
  {
    id: "wellness",
    title_pt: "Saúde & Bem-estar",
    title_en: "Health & Wellness",
    description_pt: "Hábitos, fitness, terapias.",
    description_en: "Habits, fitness, therapies.",
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format",
  },
];

// Dados de temas por categoria
const THEMES = {
  tech: [
    { id: "habit-tracker", title_pt: "App de Hábitos", title_en: "Habit Tracker", hint_pt: "Rotinas e notificações", hint_en: "Routines & reminders" },
    { id: "booking-saas", title_pt: "SaaS de Agendamentos", title_en: "Booking SaaS", hint_pt: "Agenda para prestadores", hint_en: "Scheduling for providers" },
    { id: "local-market", title_pt: "Marketplace Local", title_en: "Local Marketplace", hint_pt: "Vendedores do bairro", hint_en: "Neighborhood sellers" },
    { id: "ai-assistant", title_pt: "Assistente com IA", title_en: "AI Assistant", hint_pt: "Produtividade pessoal", hint_en: "Personal productivity" },
  ],
  arts: [
    { id: "content-studio", title_pt: "Estúdio de Conteúdo", title_en: "Content Studio", hint_pt: "Vídeo, post, podcast", hint_en: "Video, posts, podcast" },
    { id: "portfolio-kit", title_pt: "Kit de Portfólio", title_en: "Portfolio Kit", hint_pt: "Site e branding", hint_en: "Site & branding" },
    { id: "template-shop", title_pt: "Loja de Templates", title_en: "Template Shop", hint_pt: "Modelos prontos", hint_en: "Ready-made templates" },
  ],
  services: [
    { id: "consulting", title_pt: "Consultoria Enxuta", title_en: "Lean Consulting", hint_pt: "Oferta mínima viável", hint_en: "Minimum viable offer" },
    { id: "gig-hub", title_pt: "Hub de Freelas", title_en: "Gig Hub", hint_pt: "Match rápido", hint_en: "Quick matching" },
  ],
  education: [
    { id: "microlearning", title_pt: "Microlearning", title_en: "Microlearning", hint_pt: "Pílulas de 5–10 min", hint_en: "5–10 min pills" },
    { id: "mentoria", title_pt: "Mentoria", title_en: "Mentoring", hint_pt: "1:1 por objetivos", hint_en: "Goal-based 1:1" },
  ],
  wellness: [
    { id: "habit-health", title_pt: "Hábitos Saudáveis", title_en: "Healthy Habits", hint_pt: "Sono, alimentação", hint_en: "Sleep, nutrition" },
    { id: "fitness-coach", title_pt: "Coach Fitness", title_en: "Fitness Coach", hint_pt: "Planos simples", hint_en: "Simple plans" },
  ],
};

// Dados de objetivos
const OBJECTIVES = [
  { id: "learn", title_pt: "Aprender", title_en: "Learn", description_pt: "Adquirir conhecimento e habilidades.", description_en: "Acquire knowledge and skills." },
  { id: "earn", title_pt: "Ganhar Dinheiro", title_en: "Earn Money", description_pt: "Gerar renda com o projeto.", description_en: "Generate income with the project." },
  { id: "build", title_pt: "Construir Portfólio", title_en: "Build Portfolio", description_pt: "Criar projetos para mostrar.", description_en: "Create projects to showcase." },
  { id: "solve", title_pt: "Resolver Problema", title_en: "Solve Problem", description_pt: "Enfrentar um desafio pessoal ou social.", description_en: "Address a personal or social challenge." },
];

// Dados de tempo disponível
const AVAILABLE_TIME = [
  { id: "1-5", title_pt: "1-5 horas por semana", title_en: "1-5 hours per week", description_pt: "Pouco tempo disponível.", description_en: "Limited time available." },
  { id: "6-10", title_pt: "6-10 horas por semana", title_en: "6-10 hours per week", description_pt: "Tempo moderado.", description_en: "Moderate time." },
  { id: "11-20", title_pt: "11-20 horas por semana", title_en: "11-20 hours per week", description_pt: "Tempo considerável.", description_en: "Considerable time." },
  { id: "20+", title_pt: "Mais de 20 horas por semana", title_en: "More than 20 hours per week", description_pt: "Tempo dedicado em tempo integral.", description_en: "Full-time dedication." },
];

// Textos para internacionalização
const I18N = {
  pt: {
    header_title: "Stairs — orientação passo a passo",
    cta_github: "GitHub do Projeto",
    cta_portal: "Portal DealeGear",
    step_category: "Categoria",
    step_theme: "Tema",
    step_objectives: "Objetivos",
    step_time: "Tempo disponível",
    step1_title: "Selecione uma categoria",
    step2_title: "Escolha um tema",
    step3_title: "Defina seus objetivos",
    step4_title: "Quanto tempo você tem?",
    next: "Próximo",
    back: "Voltar",
    finish: "Concluir",
    error_select_category: "Escolha uma categoria para continuar.",
    error_select_theme: "Escolha um tema para continuar.",
    error_select_objective: "Selecione um objetivo para continuar.",
    error_select_time: "Selecione uma opção de tempo para continuar.",
    privacy_policy: "Política de Privacidade",
    contact: "Contato",
  },
  en: {
    header_title: "Stairs — step-by-step guidance",
    cta_github: "Project GitHub",
    cta_portal: "DealeGear Portal",
    step_category: "Category",
    step_theme: "Theme",
    step_objectives: "Objectives",
    step_time: "Available Time",
    step1_title: "Select a category",
    step2_title: "Pick a theme",
    step3_title: "Define your objectives",
    step4_title: "How much time do you have?",
    next: "Next",
    back: "Back",
    finish: "Finish",
    error_select_category: "Select a category to continue.",
    error_select_theme: "Select a theme to continue.",
    error_select_objective: "Select an objective to continue.",
    error_select_time: "Select a time option to continue.",
    privacy_policy: "Privacy Policy",
    contact: "Contact",
  },
};

// Exportar para uso em outros módulos
export { CATEGORIES, THEMES, OBJECTIVES, AVAILABLE_TIME, I18N };