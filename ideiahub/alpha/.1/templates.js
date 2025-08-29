// Templates (inalterados)
const Templates = [
  {
    id: 'leanx',
    name: 'Lean Canvas Expandido',
    help: 'Versão expandida do Lean Canvas com foco em validação contínua.',
    fields: [
      { key: 'problem', label: 'Problema', type: 'textarea', placeholder: 'Quais dores o público possui?', tip: 'Evite soluções. Descreva dores mensuráveis.' },
      { key: 'solution', label: 'Solução', type: 'textarea', placeholder: 'Qual solução proposta?', tip: 'Explique como endereça o problema.' },
      { key: 'customerSegments', label: 'Público-alvo', type: 'textarea', placeholder: 'Quem são os usuários/clientes?', tip: 'Defina nichos.' },
      { key: 'valueProp', label: 'Proposta de Valor', type: 'textarea', placeholder: 'Por que é valioso?', tip: 'Foque no benefício.' },
      { key: 'channels', label: 'Canais', type: 'textarea', placeholder: 'Como chegar ao público?', tip: 'SEO, parcerias, comunidades, ads.' },
      { key: 'revenue', label: 'Monetização', type: 'textarea', placeholder: 'Como ganhar dinheiro?', tip: 'Assinatura, venda única, B2B.' },
      { key: 'costs', label: 'Custos', type: 'textarea', placeholder: 'Principais custos', tip: 'Infra, marketing, pessoas, ferramentas.' },
      { key: 'metrics', label: 'Métricas', type: 'textarea', placeholder: 'O que medir?', tip: 'AARRR, North Star Metric.' },
      { key: 'unfairAdvantage', label: 'Vantagem Injusta', type: 'textarea', placeholder: 'Por que você?', tip: 'Acesso, expertise, comunidade.' },
      { key: 'validation', label: 'Validação', type: 'textarea', placeholder: 'Evidências e aprendizados', tip: 'Entrevistas, testes, pilotos.' }
    ]
  },
  {
    id: 'vpc',
    name: 'Value Proposition Canvas',
    help: 'Mapa de valor: tarefas, dores e ganhos vs. aliviadores e criadores de ganho.',
    fields: [
      { key: 'jobs', label: 'Tarefas do Cliente', type: 'textarea', placeholder: 'O que tenta realizar?', tip: 'Funcionais, sociais e emocionais.' },
      { key: 'pains', label: 'Dores', type: 'textarea', placeholder: 'O que frustra seu cliente?', tip: 'Riscos e obstáculos.' },
      { key: 'gains', label: 'Ganhos', type: 'textarea', placeholder: 'O que seria sucesso?', tip: 'Benefícios esperados.' },
      { key: 'painRelievers', label: 'Aliviadores de Dor', type: 'textarea', placeholder: 'Como alivia?', tip: 'Mapeie cada dor.' },
      { key: 'gainCreators', label: 'Criadores de Ganho', type: 'textarea', placeholder: 'Como cria valor?', tip: 'Mapeie ganhos para features.' },
      { key: 'products', label: 'Produtos/Serviços', type: 'textarea', placeholder: 'O que você entrega?', tip: 'Ofertas que suportam PV.' }
    ]
  },
  {
  id: 'swot',
  name: 'SWOT Simplificado',
  help: 'Mapeie forças, fraquezas, oportunidades e ameaças para orientar decisões.',
  fields: [
    { key: 'strengths', label: 'Forças', type: 'textarea', placeholder: 'Vantagens internas...' },
    { key: 'weaknesses', label: 'Fraquezas', type: 'textarea', placeholder: 'Pontos a melhorar...' },
    { key: 'opportunities', label: 'Oportunidades', type: 'textarea', placeholder: 'Cenários externos favoráveis...' },
    { key: 'threats', label: 'Ameaças', type: 'textarea', placeholder: 'Riscos externos...' }
  ]
},
{
  id: 'okrs',
  name: 'OKRs de Projeto',
  help: 'Defina objetivos inspiradores e 2–4 resultados-chave mensuráveis.',
  fields: [
    { key: 'objective', label: 'Objetivo', type: 'textarea', placeholder: 'O que queremos alcançar e por quê?' },
    { key: 'kr1', label: 'Resultado-Chave 1', type: 'textarea', placeholder: 'Métrica clara com linha de base e meta.' },
    { key: 'kr2', label: 'Resultado-Chave 2', type: 'textarea', placeholder: 'Métrica clara com linha de base e meta.' },
    { key: 'kr3', label: 'Resultado-Chave 3', type: 'textarea', placeholder: 'Opcional.' }
  ]
},
{
  id: 'pmcanvas',
  name: 'Product Management Canvas',
  help: 'Visão de produto: problema, público, solução, métricas e roadmap inicial.',
  fields: [
    { key: 'problem', label: 'Problema', type: 'textarea', placeholder: 'Dores e contexto do usuário.' },
    { key: 'audience', label: 'Público-Alvo', type: 'textarea', placeholder: 'Quem é o usuário primário?' },
    { key: 'solution', label: 'Solução', type: 'textarea', placeholder: 'Como o produto resolve o problema?' },
    { key: 'metrics', label: 'Métricas de Sucesso', type: 'textarea', placeholder: 'AARRR, North Star, etc.' },
    { key: 'roadmap', label: 'Roadmap Inicial', type: 'textarea', placeholder: 'H1: MVP, H2: melhorias, H3: escala.' }
  ]
},

{
id: 'quarterlyRoadmap',
name: 'Roadmap Trimestral',
help: 'Planeje objetivos por trimestre com iniciativas e donos.',
fields: [
{ key: 'q1', label: 'Q1 - Iniciativas', type: 'textarea', placeholder: 'Iniciativas, responsáveis e metas.' },
{ key: 'q2', label: 'Q2 - Iniciativas', type: 'textarea', placeholder: 'Iniciativas, responsáveis e metas.' },
{ key: 'q3', label: 'Q3 - Iniciativas', type: 'textarea', placeholder: 'Iniciativas, responsáveis e metas.' },
{ key: 'q4', label: 'Q4 - Iniciativas', type: 'textarea', placeholder: 'Iniciativas, responsáveis e metas.' }
]
},

{
id: 'brd',
name: 'BRD — Requisitos de Negócio',
help: 'Defina contexto, objetivo, escopo, stakeholders e critérios de sucesso.',
fields: [
{ key: 'context', label: 'Contexto', type: 'textarea', placeholder: 'Cenário atual, problema e oportunidade.' },
{ key: 'objective', label: 'Objetivo', type: 'textarea', placeholder: 'Resultados de negócio esperados.' },
{ key: 'scope', label: 'Escopo', type: 'textarea', placeholder: 'O que está dentro e fora.' },
{ key: 'stakeholders', label: 'Stakeholders', type: 'textarea', placeholder: 'Quem decide, quem influencia, quem usa.' },
{ key: 'success', label: 'Critérios de Sucesso', type: 'textarea', placeholder: 'KPIs e metas de resultado.' }
]
},

{
id: 'prd',
name: 'PRD — Requisitos de Produto',
help: 'Do problema às especificações: usuários, histórias e critérios de aceite.',
fields: [
{ key: 'problem', label: 'Problema/Contexto', type: 'textarea', placeholder: 'Dores, hipóteses e restrições.' },
{ key: 'users', label: 'Usuários/Personas', type: 'textarea', placeholder: 'Quem usará? necessidades e jobs.' },
{ key: 'stories', label: 'Histórias de Usuário', type: 'textarea', placeholder: 'Como <persona> eu quero <ação> para <benefício>.' },
{ key: 'acceptance', label: 'Critérios de Aceite', type: 'textarea', placeholder: 'Condições verificáveis.' },
{ key: 'nonFunctional', label: 'Requisitos Não Funcionais', type: 'textarea', placeholder: 'Perfomance, segurança, acessibilidade.' }
]
},


{
id: 'leanExperiment',
name: 'Cartão de Experimento Lean',
help: 'Planeje um teste: hipótese, métrica, procedimento e decisão.',
fields: [
{ key: 'hypothesis', label: 'Hipótese', type: 'textarea', placeholder: 'Acreditamos que... resultará em...' },
{ key: 'metric', label: 'Métrica', type: 'textarea', placeholder: 'Qual indicador confirmará/invalidará?' },
{ key: 'procedure', label: 'Procedimento', type: 'textarea', placeholder: 'Passos do experimento e duração.' },
{ key: 'threshold', label: 'Limiar de Sucesso', type: 'textarea', placeholder: 'Ex.: ≥ 15% conversão no formulário.' },
{ key: 'decision', label: 'Plano de Decisão', type: 'textarea', placeholder: 'Se passar: escalar. Se falhar: iterar.' }
]
},


{
id: 'gtmLite',
name: 'Go-To-Market (GTM) Lite',
help: 'Defina público, proposta, canais, oferta e metas de lançamento.',
fields: [
{ key: 'target', label: 'Público-Alvo', type: 'textarea', placeholder: 'Segmentos e ICP.' },
{ key: 'value', label: 'Proposta de Valor', type: 'textarea', placeholder: 'Mensagem central e diferenciais.' },
{ key: 'channels', label: 'Canais', type: 'textarea', placeholder: 'Orgânico, pago, parcerias, PR.' },
{ key: 'offer', label: 'Oferta de Lançamento', type: 'textarea', placeholder: 'Preço, trial, bônus.' },
{ key: 'goals', label: 'Metas', type: 'textarea', placeholder: 'MQLs, trials, CAC, payback.' }
]
},


{
id: 'interviewPlan',
name: 'Plano de Entrevista com Clientes',
help: 'Roteiro simples para conversas exploratórias e de validação.',
fields: [
{ key: 'profile', label: 'Perfil do Entrevistado', type: 'textarea', placeholder: 'Critérios de seleção.' },
{ key: 'objectives', label: 'Objetivos da Entrevista', type: 'textarea', placeholder: 'O que queremos aprender?' },
{ key: 'questions', label: 'Perguntas-Chave', type: 'textarea', placeholder: 'De 6 a 10 perguntas abertas.' },
{ key: 'logistics', label: 'Logística', type: 'textarea', placeholder: 'Duração, ferramenta, gravação, consentimento.' },
{ key: 'notes', label: 'Notas/Insights', type: 'textarea', placeholder: 'Principais achados.' }
]
},


{
id: 'cjmLite',
name: 'Mapa da Jornada do Cliente (Lite)',
help: 'Capture etapas, pontos de contato, emoções e fricções.',
fields: [
{ key: 'stages', label: 'Etapas', type: 'textarea', placeholder: 'Descoberta → Consideração → Compra → Uso → Retenção.' },
{ key: 'touchpoints', label: 'Pontos de Contato', type: 'textarea', placeholder: 'Site, app, suporte, e-mail...' },
{ key: 'emotions', label: 'Emoções', type: 'textarea', placeholder: 'Como o cliente se sente em cada etapa?' },
{ key: 'frictions', label: 'Fricções', type: 'textarea', placeholder: 'Obstáculos e causas.' },
{ key: 'opportunities', label: 'Oportunidades', type: 'textarea', placeholder: 'Melhorias e quick wins.' }
]
},


{
id: 'risks',
name: 'Riscos e Mitigações',
help: 'Liste riscos por categoria e planos de mitigação/contingência.',
fields: [
{ key: 'productRisks', label: 'Riscos de Produto', type: 'textarea', placeholder: 'Aderência, usabilidade, dependências.' },
{ key: 'marketRisks', label: 'Riscos de Mercado', type: 'textarea', placeholder: 'Demanda, competição, preço.' },
{ key: 'techRisks', label: 'Riscos Técnicos', type: 'textarea', placeholder: 'Escalabilidade, segurança, integrações.' },
{ key: 'opsRisks', label: 'Riscos Operacionais', type: 'textarea', placeholder: 'Processos, fornecedores, SLAs.' },
{ key: 'mitigations', label: 'Mitigações/Contingências', type: 'textarea', placeholder: 'Planos preventivos e planos B.' }
]
},


{
id: 'featureBrief',
name: 'Brief de Funcionalidade',
help: 'Resumo curto para alinhar contexto, objetivo, escopo e impacto.',
fields: [
{ key: 'context', label: 'Contexto', type: 'textarea', placeholder: 'O que motivou esta iniciativa?' },
{ key: 'goal', label: 'Objetivo', type: 'textarea', placeholder: 'Qual resultado esperamos?' },
{ key: 'scope', label: 'Escopo', type: 'textarea', placeholder: 'O que entra e o que não entra nesta entrega.' },
{ key: 'impact', label: 'Impacto Esperado', type: 'textarea', placeholder: 'KPI-alvo, hipóteses, riscos.' },
{ key: 'timeline', label: 'Timeline', type: 'textarea', placeholder: 'Marcos principais e datas.' }
]
},


{
id: 'pricing',
name: 'Estratégia de Precificação',
help: 'Defina segmentos, propostas de planos, métricas e testes.',
fields: [
{ key: 'segments', label: 'Segmentos', type: 'textarea', placeholder: 'ICP, personas e disposição a pagar.' },
{ key: 'valueDrivers', label: 'Direcionadores de Valor', type: 'textarea', placeholder: 'Quais capacidades justificam preço?' },
{ key: 'plans', label: 'Planos e Embalagem', type: 'textarea', placeholder: 'Free, Pro, Business; limites e add-ons.' },
{ key: 'metrics', label: 'Métrica de Valor', type: 'textarea', placeholder: 'Seat, uso, volume, feature-based, híbrido.' },
{ key: 'experiments', label: 'Experimentos', type: 'textarea', placeholder: 'A/B de preço, trial, descontos por período.' }
]
}
  
];

function getTemplateById(id) {
  return Templates.find(t => t.id === id) || null;
}

// 50 Exemplos acessíveis e variados para testes
const Examples = [
  // 1-5 (já existentes, mantidos)
  {
    name: 'Clube de Horta Urbana',
    category: 'Sustentabilidade',
    templateId: 'leanx',
    fields: {
      problem: 'Moradores de apartamentos querem cultivar alimentos, mas não sabem por onde começar.',
      solution: 'Clube mensal com materiais, vídeos curtos e mentoria via grupo.',
      customerSegments: 'Adultos em áreas urbanas com pouco espaço e interesse em alimentação saudável.',
      valueProp: 'Comece sua horta com zero experiência, com suporte contínuo e materiais práticos.',
      channels: 'Instagram, parcerias com condomínios, influenciadores de sustentabilidade.',
      revenue: 'Assinatura mensal e kits iniciais pagos à parte.',
      costs: 'Produção de conteúdo, logística de kits, ferramentas.',
      metrics: 'Taxa de retenção, NPS, engajamento no grupo.',
      unfairAdvantage: 'Rede de mentores locais e materiais proprietários.',
      validation: 'Piloto com 15 moradores de 2 prédios — 60% montaram mini-hortas.'
    }
  },
  {
    name: 'Correção Colaborativa de Redações',
    category: 'Educação',
    templateId: 'leanx',
    fields: {
      problem: 'Estudantes têm dificuldade em receber feedback rápido e objetivo.',
      solution: 'Plataforma com rubricas simplificadas e revisores treinados.',
      customerSegments: 'Estudantes do ensino médio e cursinhos.',
      valueProp: 'Feedback em 24h com plano de estudo personalizado.',
      channels: 'Parcerias com escolas, grupos de WhatsApp e TikTok.',
      revenue: 'Pacotes por quantidade de redações; assinatura para ilimitado.',
      costs: 'Pagamento de revisores, plataforma, marketing.',
      metrics: 'Tempo de resposta, satisfação, taxa de renovação.',
      unfairAdvantage: 'Base de rubricas proprietárias e comunidade de revisores.',
      validation: 'MVP no Google Forms com 50 redações corrigidas em 2 semanas.'
    }
  },
  {
    name: 'Mapa de Trilha de Caminhadas Locais',
    category: 'Arte & Cultura',
    templateId: 'vpc',
    fields: {
      jobs: 'Encontrar trilhas urbanas seguras e interessantes para passear.',
      pains: 'Falta de rotas curtas, insegurança, informações desatualizadas.',
      gains: 'Passeios de 30-60min próximos de casa, com curiosidades locais.',
      painRelievers: 'Curadorias com fotos, nível de dificuldade, pontos de apoio.',
      gainCreators: 'Gamificação com conquistas e trilhas temáticas.',
      products: 'Mapa web com trilhas, avaliações e guias semanais.'
    }
  },
  {
    name: 'Feira Online do Bairro',
    category: 'Negócios',
    templateId: 'leanx',
    fields: {
      problem: 'Produtores locais têm baixa visibilidade e logística limitada.',
      solution: 'Marketplace de bairro com entregas por janela de horário.',
      customerSegments: 'Famílias interessadas em produtos frescos e locais.',
      valueProp: 'Compre do seu produtor com entrega rápida e transparente.',
      channels: 'Parcerias com associações de bairro, panfletos em condomínios.',
      revenue: 'Comissão por venda + assinatura para produtores.',
      costs: 'Logística, plataforma, aquisição.',
      metrics: 'Ticket médio, taxa de recompra, LTV.',
      unfairAdvantage: 'Relações locais e modelo enxuto de logística.',
      validation: 'Landing page + grupo de espera com 200 cadastros.'
    }
  },
  {
    name: 'Clube de Reparo de Eletrônicos',
    category: 'Tecnologia',
    templateId: 'vpc',
    fields: {
      jobs: 'Consertar pequenos eletrônicos em casa com orientação.',
      pains: 'Medo de estragar, falta de ferramentas e guias confiáveis.',
      gains: 'Economia, autonomia e menos lixo eletrônico.',
      painRelievers: 'Guias passo a passo e mentorias ao vivo.',
      gainCreators: 'Kits compartilhados, descontos com lojas parceiras.',
      products: 'Portal com guias, lives e agenda de encontros presenciais.'
    }
  },

  // 6-50 (novos)
  {
    name: 'Biblioteca de Brinquedos do Bairro',
    category: 'Educação',
    templateId: 'leanx',
    fields: {
      problem: 'Pais gastam com brinquedos pouco usados e sem estímulo contínuo.',
      solution: 'Assinatura para empréstimo rotativo de brinquedos educativos.',
      customerSegments: 'Famílias com crianças de 2 a 8 anos.',
      valueProp: 'Variedade sem desperdício: brinquedos sempre novos e adequados.',
      channels: 'Escolas, creches, grupos de pais, Instagram.',
      revenue: 'Assinatura mensal com planos por faixa etária.',
      costs: 'Aquisição/manutenção de brinquedos, logística, higienização.',
      metrics: 'Rotatividade, retenção, avaliação de brinquedos.',
      unfairAdvantage: 'Curadoria pedagógica e rede de escolas parceiras.',
      validation: 'Piloto com 20 famílias, satisfação média 4.7/5.'
    }
  },
  {
    name: 'Mentoria de Primeiro Emprego',
    category: 'Negócios',
    templateId: 'leanx',
    fields: {
      problem: 'Jovens não sabem como se posicionar no mercado e montar um currículo forte.',
      solution: 'Programa de 4 semanas com mentores voluntários e desafios práticos.',
      customerSegments: 'Jovens de 16–24 anos em busca do primeiro emprego.',
      valueProp: 'Do zero à primeira entrevista com materiais e prática guiada.',
      channels: 'ONGs, escolas públicas, LinkedIn, Instagram.',
      revenue: 'Patrocínio B2B + taxa simbólica dos alunos (opcional).',
      costs: 'Coordenação, plataforma, seleção de mentores.',
      metrics: 'Taxa de empregabilidade, conclusão do programa.',
      unfairAdvantage: 'Rede de mentores em empresas parceiras.',
      validation: 'Cohort inicial de 30 alunos, 10 em entrevistas.'
    }
  },
  {
    name: 'Rotas Seguras para Ciclistas',
    category: 'Sustentabilidade',
    templateId: 'vpc',
    fields: {
      jobs: 'Planejar deslocamentos de bicicleta com segurança.',
      pains: 'Medo de vias perigosas e falta de infraestrutura.',
      gains: 'Rotas com menos carros, mais ciclovias e pontos de apoio.',
      painRelievers: 'Mapeamento colaborativo e alertas em tempo real.',
      gainCreators: 'Desafios mensais e recompensas locais.',
      products: 'App web com rotas, avisos e gamificação.'
    }
  },
  {
    name: 'Clube do Livro Independente',
    category: 'Arte & Cultura',
    templateId: 'leanx',
    fields: {
      problem: 'Leitores querem descobrir autores independentes de qualidade.',
      solution: 'Clube mensal com curadoria, encontros e descontos em e-books.',
      customerSegments: 'Leitores frequentes e clubes de leitura.',
      valueProp: 'Descubra joias literárias com curadoria e comunidade.',
      channels: 'Instagram literário, newsletters, podcasts.',
      revenue: 'Assinatura; vendas afiliadas; parcerias com editoras.',
      costs: 'Curadoria, plataforma, marketing, direitos autorais.',
      metrics: 'Taxa de leitura/conclusão, NPS, churn.',
      unfairAdvantage: 'Curadores respeitados e rede de autores independentes.',
      validation: 'Piloto com 60 assinantes no primeiro mês.'
    }
  },
  {
    name: 'Agenda de Feiras de Adoção de Pets',
    category: 'Saúde',
    templateId: 'vpc',
    fields: {
      jobs: 'Encontrar feiras de adoção confiáveis e próximas.',
      pains: 'Informações dispersas, pouca transparência, logística.',
      gains: 'Agenda centralizada, critérios e custos claros.',
      painRelievers: 'Calendário, filtros por espécie/porte, informações detalhadas.',
      gainCreators: 'Parcerias com ONGs e clínicas veterinárias.',
      products: 'Portal com calendário e perfis de pets.'
    }
  },
  {
    name: 'Oficinas de Reparos Domésticos',
    category: 'Educação',
    templateId: 'leanx',
    fields: {
      problem: 'Pessoas gastam com serviços simples por falta de habilidade.',
      solution: 'Workshops práticos: elétrica básica, hidráulica, marcenaria.',
      customerSegments: 'Moradores independentes, síndicos, pequenos negócios.',
      valueProp: 'Autonomia para pequenos reparos com segurança.',
      channels: 'Parcerias com condomínios, YouTube, panfletos.',
      revenue: 'Ingresso por oficina + kits de ferramentas.',
      costs: 'Instrutores, materiais, seguro.',
      metrics: 'Taxa de recomendação, repetição de alunos.',
      unfairAdvantage: 'Instrutores certificados e materiais proprietários.',
      validation: '3 turmas-piloto com lotação esgotada.'
    }
  },
  {
    name: 'Guia de Acessibilidade Local',
    category: 'Sustentabilidade',
    templateId: 'vpc',
    fields: {
      jobs: 'Identificar lugares acessíveis na cidade.',
      pains: 'Falta de dados confiáveis, avaliações inconsistentes.',
      gains: 'Mapas confiáveis e avaliações padronizadas.',
      painRelievers: 'Padrão de avaliação com fotos e verificação comunitária.',
      gainCreators: 'Selo de boas práticas e relatórios para estabelecimentos.',
      products: 'Guia colaborativo e relatórios B2B.'
    }
  },
  {
    name: 'Planejador de Estudos por Hábitos',
    category: 'Educação',
    templateId: 'vpc',
    fields: {
      jobs: 'Criar rotina de estudos sustentável.',
      pains: 'Procrastinação, metas irreais, falta de revisão.',
      gains: 'Planos adaptativos, micro-hábitos e revisões espaçadas.',
      painRelievers: 'Templates prontos, alertas e trilhas por objetivo.',
      gainCreators: 'Gamificação e comunidade de estudo.',
      products: 'Web app com planos e relatórios.'
    }
  },
  {
    name: 'Feira de Troca de Roupas',
    category: 'Negócios',
    templateId: 'leanx',
    fields: {
      problem: 'Armários cheios e consumo pouco sustentável.',
      solution: 'Eventos mensais de troca com curadoria e tokens.',
      customerSegments: 'Jovens adultos, público eco-consciente.',
      valueProp: 'Renove o guarda-roupa sem gastar e sem desperdício.',
      channels: 'Instagram, parcerias com brechós e espaços culturais.',
      revenue: 'Ingresso do evento + planos premium.',
      costs: 'Locação de espaço, equipe, comunicação.',
      metrics: 'Itens trocados por evento, NPS, recorrência.',
      unfairAdvantage: 'Curadoria de estilo e comunidade local ativa.',
      validation: 'Evento-piloto com 200 participantes.'
    }
  },
  {
    name: 'Turismo de Bairro com Guias Locais',
    category: 'Arte & Cultura',
    templateId: 'leanx',
    fields: {
      problem: 'Visitantes não vivenciam a cultura local autêntica.',
      solution: 'Passeios guiados por moradores com histórias e culinária.',
      customerSegments: 'Turistas e moradores curiosos.',
      valueProp: 'Experiências autênticas com impacto direto na comunidade.',
      channels: 'Airbnb Experiences, parcerias com hostels, redes sociais.',
      revenue: 'Comissão por passeio + parcerias com restaurantes.',
      costs: 'Treinamento de guias, seguros, plataforma.',
      metrics: 'Avaliação média, taxa de recompra, ocupação.',
      unfairAdvantage: 'Rede de guias locais certificados.',
      validation: '10 passeios com média 4.8/5.'
    }
  },
  {
    name: 'Culinária de 15 Minutos',
    category: 'Negócios',
    templateId: 'vpc',
    fields: {
      jobs: 'Preparar refeições rápidas e saudáveis.',
      pains: 'Falta de tempo, receitas complicadas.',
      gains: 'Receitas de 15 minutos com 5 ingredientes.',
      painRelievers: 'Listas de compras e vídeos curtos.',
      gainCreators: 'Planos semanais e substituições fáceis.',
      products: 'Portal de receitas com plano premium.'
    }
  },
  {
    name: 'Banco de Tempo de Vizinhança',
    category: 'Sustentabilidade',
    templateId: 'leanx',
    fields: {
      problem: 'Vizinhos têm habilidades, mas falta coordenação para trocas.',
      solution: 'Banco de tempo: 1 hora de ajuda = 1 crédito.',
      customerSegments: 'Comunidades locais e condomínios.',
      valueProp: 'Troque habilidades sem dinheiro.',
      channels: 'Condomínios, grupos de bairro, igrejas.',
      revenue: 'Plano premium para administradores; patrocínios.',
      costs: 'Moderação, plataforma, eventos.',
      metrics: 'Horas trocadas, usuários ativos, retenção.',
      unfairAdvantage: 'Embaixadores locais e regras claras.',
      validation: 'Piloto em 2 condomínios com 80 membros.'
    }
  },
  {
    name: 'Mentoria para Microempreendedores',
    category: 'Negócios',
    templateId: 'vpc',
    fields: {
      jobs: 'Organizar finanças e marketing do micro negócio.',
      pains: 'Falta de planejamento e preços errados.',
      gains: 'Rotinas simples, metas e análise de caixa.',
      painRelievers: 'Modelos prontos e encontros mensais.',
      gainCreators: 'Parcerias com contadores e designers.',
      products: 'Programa de mentoria e biblioteca de recursos.'
    }
  },
  {
    name: 'Clube de Conversação em Idiomas',
    category: 'Educação',
    templateId: 'leanx',
    fields: {
      problem: 'Alunos não praticam conversação de forma consistente.',
      solution: 'Grupos semanais com moderadores e temas guiados.',
      customerSegments: 'Estudantes de idiomas nível A2-B2.',
      valueProp: 'Prática regular e divertida com feedback.',
      channels: 'Escolas de idiomas, Meetup, Discord.',
      revenue: 'Assinatura mensal; planos por idioma.',
      costs: 'Moderadores, plataforma, conteúdo.',
      metrics: 'Participação média, retenção, progresso.',
      unfairAdvantage: 'Roteiros próprios e comunidade ativa.',
      validation: '4 grupos-piloto com boa retenção.'
    }
  },
  {
    name: 'Trilhas de Carreira Tech para Iniciantes',
    category: 'Tecnologia',
    templateId: 'vpc',
    fields: {
      jobs: 'Entender caminhos de entrada em tecnologia.',
      pains: 'Excesso de recursos, pouca orientação prática.',
      gains: 'Trilhas claras com projetos e feedback.',
      painRelievers: 'Roadmaps curtos e desafios.',
      gainCreators: 'Mentorias rápidas e portfólio guiado.',
      products: 'Site com trilhas e comunidade.'
    }
  },
  {
    name: 'Coleta Seletiva Gamificada',
    category: 'Sustentabilidade',
    templateId: 'leanx',
    fields: {
      problem: 'Baixa adesão à coleta seletiva por falta de incentivo.',
      solution: 'Sistema de pontos por descarte correto com recompensas.',
      customerSegments: 'Condomínios e prefeituras.',
      valueProp: 'Engaje moradores e reduza resíduos de forma lúdica.',
      channels: 'Parcerias com administradoras de condomínio.',
      revenue: 'Licença B2B + patrocínios.',
      costs: 'Hardware leve, operação e app.',
      metrics: 'Kg reciclados, pontos, adesão.',
      unfairAdvantage: 'Integração com parceiros de reciclagem.',
      validation: 'Piloto em 1 condomínio elevou adesão em 40%.'
    }
  },
  {
    name: 'Calendário Cultural Inclusivo',
    category: 'Arte & Cultura',
    templateId: 'vpc',
    fields: {
      jobs: 'Descobrir eventos com acessibilidade e inclusão.',
      pains: 'Informação dispersa sobre acessibilidade.',
      gains: 'Calendário com filtros de acessibilidade.',
      painRelievers: 'Selo de acessibilidade e avaliações.',
      gainCreators: 'Parcerias com produtores culturais.',
      products: 'Site com curadoria e filtros avançados.'
    }
  },
  {
    name: 'Terapias Breves Online',
    category: 'Saúde',
    templateId: 'leanx',
    fields: {
      problem: 'Longas filas e dificuldade de acessar terapia de qualidade.',
      solution: 'Sessões breves com psicólogos credenciados e triagem.',
      customerSegments: 'Adultos com ansiedade leve/moderada.',
      valueProp: 'Acesso rápido a terapia breve com qualidade.',
      channels: 'Parcerias com empresas, redes sociais.',
      revenue: 'Sessões pagas; planos corporativos.',
      costs: 'Profissionais, plataforma, marketing.',
      metrics: 'Tempo para primeira consulta, satisfação.',
      unfairAdvantage: 'Triagem proprietária e rede qualificada.',
      validation: 'Lista de espera com 500 inscritos.'
    }
  },
  {
    name: 'Roteiro de Primeira Maratona',
    category: 'Saúde',
    templateId: 'vpc',
    fields: {
      jobs: 'Treinar para correr 42k com segurança.',
      pains: 'Planos genéricos e risco de lesão.',
      gains: 'Planos por nível, força e mobilidade integradas.',
      painRelievers: 'Avaliação inicial e planilhas adaptativas.',
      gainCreators: 'Comunidade e desafios progressivos.',
      products: 'Web app com treinos e acompanhamento.'
    }
  },
  {
    name: 'Cursos Express para Profissionais Criativos',
    category: 'Arte & Cultura',
    templateId: 'leanx',
    fields: {
      problem: 'Profissionais criativos precisam de atualização prática e rápida.',
      solution: 'Cursos de 2h focados em uma habilidade específica.',
      customerSegments: 'Designers, videomakers, social media.',
      valueProp: 'Aprenda hoje, aplique amanhã.',
      channels: 'YouTube, newsletters, comunidades.',
      revenue: 'Venda avulsa e bundles.',
      costs: 'Produção, plataforma, tráfego pago.',
      metrics: 'Conversão, taxa de conclusão, NPS.',
      unfairAdvantage: 'Instrutores com casos reais.',
      validation: '100 vendas no primeiro mês.'
    }
  },
  {
    name: 'Mapa de Feiras de Agricultura Familiar',
    category: 'Sustentabilidade',
    templateId: 'vpc',
    fields: {
      jobs: 'Comprar direto da agricultura familiar.',
      pains: 'Dificuldade de encontrar feiras e horários.',
      gains: 'Mapa vivo com produtores e rotas.',
      painRelievers: 'Agenda com notificações e avaliações.',
      gainCreators: 'Parcerias com cooperativas.',
      products: 'Mapa web com feiras e produtores certificados.'
    }
  },
  {
    name: 'Revisão de Portfólio Criativo',
    category: 'Negócios',
    templateId: 'leanx',
    fields: {
      problem: 'Profissionais criativos não recebem feedback estratégico.',
      solution: 'Sessões de revisão com especialistas do mercado.',
      customerSegments: 'Designers, fotógrafos, redatores.',
      valueProp: 'Feedback prático e direcionado.',
      channels: 'LinkedIn, comunidades criativas.',
      revenue: 'Sessões pagas e pacotes.',
      costs: 'Especialistas, coordenação, plataforma.',
      metrics: 'Satisfação, recontratações, cases.',
      unfairAdvantage: 'Curadoria de especialistas reconhecidos.',
      validation: '20 sessões-piloto com alto NPS.'
    }
  },
  {
    name: 'Kits de Ciência para Crianças',
    category: 'Educação',
    templateId: 'vpc',
    fields: {
      jobs: 'Estimular ciência em casa com segurança.',
      pains: 'Falta de materiais e instruções claras.',
      gains: 'Experimentos divertidos e educativos.',
      painRelievers: 'Guias com vídeo e suporte por chat.',
      gainCreators: 'Assinatura mensal temáticas.',
      products: 'Kits físicos com acompanhamento digital.'
    }
  },
  {
    name: 'Treino de Força para Iniciantes',
    category: 'Saúde',
    templateId: 'leanx',
    fields: {
      problem: 'Pessoas iniciantes têm medo de se machucar e não sabem começar.',
      solution: 'Programa de 8 semanas com vídeos e suporte.',
      customerSegments: 'Adultos sedentários ou iniciantes.',
      valueProp: 'Comece com segurança e constância.',
      channels: 'YouTube, Instagram, academias parceiras.',
      revenue: 'Venda do programa e planos premium.',
      costs: 'Produção de conteúdo, suporte, plataforma.',
      metrics: 'Taxa de conclusão, engajamento, retenção.',
      unfairAdvantage: 'Protocolos simples e orientação humana.',
      validation: 'Primeira turma com 60 alunos.'
    }
  },
  {
    name: 'Coletivo de Fotógrafos Locais',
    category: 'Arte & Cultura',
    templateId: 'vpc',
    fields: {
      jobs: 'Divulgar e vender trabalhos fotográficos.',
      pains: 'Pouca visibilidade e baixo valor percebido.',
      gains: 'Exposições, marketplace e mentoria.',
      painRelievers: 'Curadoria e calendário de eventos.',
      gainCreators: 'Parcerias com marcas locais.',
      products: 'Site com portfólios e agenda.'
    }
  },
  {
    name: 'Rotina de Sono Saudável',
    category: 'Saúde',
    templateId: 'vpc',
    fields: {
      jobs: 'Dormir melhor com hábitos sustentáveis.',
      pains: 'Insônia, uso de telas, horários irregulares.',
      gains: 'Rotina com micro-hábitos e monitoramento.',
      painRelievers: 'Checklist diário e educação do sono.',
      gainCreators: 'Desafios semanais e apoio comunitário.',
      products: 'App web com acompanhamento.'
    }
  },
  {
    name: 'Gestão de Finanças Domésticas Simples',
    category: 'Negócios',
    templateId: 'leanx',
    fields: {
      problem: 'Famílias perdem o controle de gastos mensais.',
      solution: 'Planilhas guiadas + alertas e metas simples.',
      customerSegments: 'Famílias e casais jovens.',
      valueProp: 'Controle de gastos em 10 minutos por semana.',
      channels: 'YouTube, TikTok, blogs de finanças pessoais.',
      revenue: 'Assinatura premium + workshops.',
      costs: 'Plataforma, marketing, suporte.',
      metrics: 'Adoção, retenção, economia média.',
      unfairAdvantage: 'Metodologia proprietária e conteúdo snackable.',
      validation: '200 usuários beta com feedback positivo.'
    }
  },
  {
    name: 'Mapa de Quadras Esportivas Abertas',
    category: 'Saúde',
    templateId: 'vpc',
    fields: {
      jobs: 'Encontrar quadras livres e grupos abertos.',
      pains: 'Informações desatualizadas e falta de grupos.',
      gains: 'Agenda com reservas e ranking local.',
      painRelievers: 'Calendário, chat e recomendações.',
      gainCreators: 'Parcerias com academias e lojas.',
      products: 'Mapa e gestor de partidas.'
    }
  },
  {
    name: 'Curadoria de Ferramentas Low-Code',
    category: 'Tecnologia',
    templateId: 'leanx',
    fields: {
      problem: 'Empreendedores perdem tempo escolhendo ferramentas.',
      solution: 'Curadoria com recomendações por caso de uso.',
      customerSegments: 'Fundadores solo, PMs, analistas.',
      valueProp: 'Escolha certa em minutos, não semanas.',
      channels: 'Newsletters, LinkedIn, YouTube.',
      revenue: 'Afiliados, planos premium, consultoria.',
      costs: 'Pesquisa, conteúdo, plataforma.',
      metrics: 'CTR, conversões, LTV.',
      unfairAdvantage: 'Testes práticos e banco de casos.',
      validation: 'Primeiros 1.000 inscritos na newsletter.'
    }
  },
  {
    name: 'Roteiros de Estudos para Concursos',
    category: 'Educação',
    templateId: 'vpc',
    fields: {
      jobs: 'Organizar estudos por edital.',
      pains: 'Excesso de conteúdo e procrastinação.',
      gains: 'Trilhas moduladas com revisões.',
      painRelievers: 'Cronogramas e alertas por edital.',
      gainCreators: 'Banco de questões e simulados.',
      products: 'Web app com roteiros e simulados.'
    }
  },
  {
    name: 'Guia de Consumo Consciente Local',
    category: 'Sustentabilidade',
    templateId: 'leanx',
    fields: {
      problem: 'Consumidores querem comprar de forma ética e local.',
      solution: 'Guia com selos, avaliações e rotas.',
      customerSegments: 'Jovens adultos eco-conscientes.',
      valueProp: 'Compre melhor, perto de você e com impacto.',
      channels: 'Instagram, blogs, influenciadores.',
      revenue: 'Parcerias, anúncios responsáveis.',
      costs: 'Curadoria, plataforma, marketing.',
      metrics: 'Acessos, tempo de leitura, parceiros.',
      unfairAdvantage: 'Rede de verificadores locais.',
      validation: 'Mapa colaborativo com 300 pontos.'
    }
  },
  {
    name: 'Mentoria de Carreira 45+',
    category: 'Negócios',
    templateId: 'vpc',
    fields: {
      jobs: 'Recolocação e transição de carreira após 45.',
      pains: 'Idadismo e dúvidas sobre atualização.',
      gains: 'Plano realista de reposicionamento.',
      painRelievers: 'Mentoria e networking direcionado.',
      gainCreators: 'Parcerias com empresas inclusivas.',
      products: 'Programa em cohort e comunidade.'
    }
  },
  {
    name: 'Círculos de Conversa sobre Saúde Mental',
    category: 'Saúde',
    templateId: 'leanx',
    fields: {
      problem: 'Falta de espaços seguros para conversar sobre saúde mental.',
      solution: 'Rodas semanais mediadas por facilitadores.',
      customerSegments: 'Adultos buscando suporte comunitário.',
      valueProp: 'Apoio comunitário de baixo custo e alta empatia.',
      channels: 'ONGs, empresas, redes sociais.',
      revenue: 'Mensalidade simbólica e patrocínios.',
      costs: 'Capacitação de facilitadores, espaços, coordenação.',
      metrics: 'Assiduidade, satisfação, relatos de impacto.',
      unfairAdvantage: 'Facilitadores treinados e metodologia aberta.',
      validation: '3 grupos-piloto com 80% de permanência.'
    }
  },
  {
    name: 'Roteiros de Cicloturismo',
    category: 'Arte & Cultura',
    templateId: 'vpc',
    fields: {
      jobs: 'Planejar viagens curtas de bicicleta.',
      pains: 'Rotas inseguras e falta de apoio.',
      gains: 'Roteiros com hospedagem amiga do ciclista.',
      painRelievers: 'Mapas GPX e checklists.',
      gainCreators: 'Parcerias com cafés e pousadas.',
      products: 'Portal com roteiros e reservas.'
    }
  },
  {
    name: 'Clube de Prototipagem Rápida',
    category: 'Tecnologia',
    templateId: 'leanx',
    fields: {
      problem: 'Empreendedores demoram para tirar ideias do papel.',
      solution: 'Sprints mensais com mentores e kits.',
      customerSegments: 'Fundadores, makers, estudantes.',
      valueProp: 'Prototipe em dias, não meses.',
      channels: 'Universidades, comunidades tech.',
      revenue: 'Assinaturas e patrocínios.',
      costs: 'Mentoria, kits, espaço.',
      metrics: 'Protótipos concluídos, NPS, captação.',
      unfairAdvantage: 'Playbooks enxutos e rede de mentores.',
      validation: 'Cohort piloto com 10 projetos.'
    }
  },
  {
    name: 'Editor de Currículos com IA Leve',
    category: 'Negócios',
    templateId: 'vpc',
    fields: {
      jobs: 'Criar currículo efetivo rapidamente.',
      pains: 'Dúvidas sobre conteúdo e formatação.',
      gains: 'Modelos prontos e dicas contextualizadas.',
      painRelievers: 'Sugestões automáticas e checklist.',
      gainCreators: 'Exportação e portfólio simples.',
      products: 'Web app com templates e dicas.'
    }
  },
 {
  name: 'Guia de Trilhas Pet Friendly',
  category: 'Saúde',
  templateId: 'leanx',
  fields: {
    problem: 'Donos de pets não sabem onde podem levar os animais com segurança.',
    solution: 'Guia colaborativo com avaliação de infraestrutura para pets.',
    customerSegments: 'Donos de cães ativos.',
    valueProp: 'Caminhe com seu pet com segurança e apoio.',
    channels: 'Grupos de pets, Instagram.',
    revenue: 'Assinatura premium e parcerias.',
    costs: 'Curadoria, moderação, plataforma.',
    metrics: 'Número de trilhas cadastradas, avaliações, recorrência dos usuários.',
    unfairAdvantage: 'Rede de embaixadores locais e metodologia de avaliação padronizada.',
    validation: 'Piloto com 30 trilhas mapeadas e 200 avaliações em 4 semanas.'
  }
}
]