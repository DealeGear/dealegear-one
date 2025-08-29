// Definição de templates de canvas (campos dinâmicos)
const Templates = [
  {
    id: 'leanx',
    name: 'Lean Canvas Expandido',
    help: 'Versão expandida do Lean Canvas com foco em validação contínua.',
    fields: [
      { key: 'problem', label: 'Problema', type: 'textarea', placeholder: 'Quais dores o público possui?', tip: 'Evite soluções. Descreva dores evidentes e mensuráveis.' },
      { key: 'solution', label: 'Solução', type: 'textarea', placeholder: 'Qual solução proposta?', tip: 'Explique claramente como sua solução endereça o problema.' },
      { key: 'customerSegments', label: 'Público-alvo', type: 'textarea', placeholder: 'Quem são os usuários/clientes?', tip: 'Defina nichos. Ex.: “professores do ensino médio em escolas públicas”.' },
      { key: 'valueProp', label: 'Proposta de Valor', type: 'textarea', placeholder: 'Por que é valioso?', tip: 'Proposta curta e clara. Foque no benefício, não na feature.' },
      { key: 'channels', label: 'Canais', type: 'textarea', placeholder: 'Como chegar ao público?', tip: 'Ex.: SEO, parcerias, comunidades, ads.' },
      { key: 'revenue', label: 'Monetização', type: 'textarea', placeholder: 'Como ganhar dinheiro?', tip: 'Modelos: assinatura, venda única, B2B, marketplace.' },
      { key: 'costs', label: 'Custos', type: 'textarea', placeholder: 'Principais custos', tip: 'Infra, marketing, pessoas, ferramentas.' },
      { key: 'metrics', label: 'Métricas', type: 'textarea', placeholder: 'O que medir?', tip: 'AARRR, North Star Metric, indicadores de retenção.' },
      { key: 'unfairAdvantage', label: 'Vantagem Injusta', type: 'textarea', placeholder: 'Por que você?', tip: 'Acesso, expertise, comunidade, patentes, dados exclusivos.' },
      { key: 'validation', label: 'Validação', type: 'textarea', placeholder: 'Evidências e aprendizados', tip: 'Resultados de entrevistas, testes, landing pages, pilotos.' }
    ]
  },
  {
    id: 'vpc',
    name: 'Value Proposition Canvas',
    help: 'Mapa de valor: tarefas, dores e ganhos vs. aliviadores e criadores de ganho.',
    fields: [
      { key: 'jobs', label: 'Tarefas do Cliente', type: 'textarea', placeholder: 'O que seu cliente tenta realizar?', tip: 'Inclua tarefas funcionais, sociais e emocionais.' },
      { key: 'pains', label: 'Dores', type: 'textarea', placeholder: 'O que frustra seu cliente?', tip: 'Riscos, obstáculos, resultados indesejados.' },
      { key: 'gains', label: 'Ganhos', type: 'textarea', placeholder: 'O que seria sucesso?', tip: 'Desejos, benefícios esperados, surpresas positivas.' },
      { key: 'painRelievers', label: 'Aliviadores de Dor', type: 'textarea', placeholder: 'Como sua solução alivia?', tip: 'Mapeie cada dor para um aliviador.' },
      { key: 'gainCreators', label: 'Criadores de Ganho', type: 'textarea', placeholder: 'Como sua solução cria valor?', tip: 'Mapeie ganhos para features/benefícios.' },
      { key: 'products', label: 'Produtos/Serviços', type: 'textarea', placeholder: 'O que você entrega?', tip: 'Liste ofertas que suportam a proposta de valor.' }
    ]
  }
];

function getTemplateById(id) {
  return Templates.find(t => t.id === id) || null;
}