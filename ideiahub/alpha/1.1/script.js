// Estado
const state = {
  id: null,
  name: 'Projeto sem título',
  selectedFramework: '',
  selectedTemplate: '',
  blocks: [],
  dirty: false,
  theme: localStorage.getItem('ideiahub.theme') || 'dark'
};

// Elementos
const els = {
  status: document.getElementById('statusChip'),
  name: document.getElementById('projectName'),
  blocks: document.getElementById('blocks'),
  empty: document.getElementById('emptyState'),
  modalBackdrop: document.getElementById('modalBackdrop'),
  modalTitle: document.getElementById('modalTitle'),
  modalBody: document.getElementById('modalBody'),
  modalActions: document.getElementById('modalActions'),
  modalClose: document.getElementById('modalClose'),
  frameworkSelect: document.getElementById('frameworkSelect'),
  templateSelect: document.getElementById('templateSelect'),
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.feather?.replace) feather.replace();
  initFrameworksAndTemplates();
  applyTheme(state.theme);
  bindEvents();
  openDB().then(()=> setStatus('pronto'));
});

// Tema
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ideiahub.theme', theme);
}

document.getElementById('themeToggle').addEventListener('click', () => {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  toast('Tema alternado', 'success');
  if (window.feather?.replace) feather.replace();
});

// Frameworks e Templates
const frameworks = {
  "Lean Canvas Expandido": [
    { title: "Problema", span: 6, hint: "Que problema real você resolve?" },
    { title: "Solução", span: 6, hint: "Como sua solução endereça o problema?" },
    { title: "Proposta de Valor", span: 6 },
    { title: "Público/Segmentos", span: 6 },
    { title: "Canais", span: 6 },
    { title: "MVP", span: 6 },
    { title: "Validação", span: 6 },
    { title: "Métricas", span: 6 },
    { title: "Custos", span: 6 },
    { title: "Receitas", span: 6 }
  ],
  "Proposta de Valor (VPC)": [
    { title: "Cliente-Alvo", span: 6 },
    { title: "Tarefas do Cliente", span: 6 },
    { title: "Dores", span: 6 },
    { title: "Ganhos", span: 6 },
    { title: "Produtos/Serviços", span: 6 },
    { title: "Aliviadores de Dor", span: 6 },
    { title: "Criadores de Ganho", span: 6 }
  ],
  "Mini Roadmap de Projeto": [
    { title: "Objetivo", span: 12 },
    { title: "Marcos", span: 6 },
    { title: "Tarefas", span: 6 },
    { title: "Riscos/Dependências", span: 12 }
  ],
  "Pitch Rápido": [
    { title: "Problema", span: 6 },
    { title: "Solução", span: 6 },
    { title: "Diferencial", span: 6 },
    { title: "Mercado", span: 6 },
    { title: "Tração/Provas", span: 6 },
    { title: "Call-to-Action", span: 6 }
  ],
  "Canvas do IdeiaHub (custom)": [
    { title: "Visão", span: 12 },
    { title: "Usuários", span: 6 },
    { title: "Solução", span: 6 },
    { title: "Métricas-Chave", span: 6 },
    { title: "Experimentos", span: 6 },
    { title: "Roadmap", span: 12 }
  ],
  "SWOT Simplificado": [
    { title: "Forças", span: 6 },
    { title: "Fraquezas", span: 6 },
    { title: "Oportunidades", span: 6 },
    { title: "Ameaças", span: 6 }
  ],
  "OKRs de Projeto": [
    { title: "Objetivo", span: 12 },
    { title: "KR1", span: 4 },
    { title: "KR2", span: 4 },
    { title: "KR3", span: 4 },
    { title: "Iniciativas", span: 12 }
  ],
  "Product Management Canvas": [
    { title: "Problema", span: 6 },
    { title: "Público", span: 6 },
    { title: "Proposta de Valor", span: 6 },
    { title: "Métricas", span: 6 },
    { title: "Canais", span: 6 },
    { title: "Monetização", span: 6 }
  ],
  "Roadmap Trimestral": [
    { title: "Q Objetivos", span: 12 },
    { title: "Em Andamento", span: 6 },
    { title: "Próximo", span: 6 },
    { title: "Riscos", span: 12 }
  ],
  "BRD — Requisitos de Negócio": [
    { title: "Contexto", span: 12 },
    { title: "Stakeholders", span: 6 },
    { title: "Objetivos de Negócio", span: 6 },
    { title: "Escopo", span: 12 },
    { title: "Critérios de Sucesso", span: 12 }
  ],
  "PRD — Requisitos de Produto": [
    { title: "Visão do Produto", span: 12 },
    { title: "Usuários & Personas", span: 6 },
    { title: "Funcionalidades", span: 6 },
    { title: "Requisitos Funcionais", span: 6 },
    { title: "Requisitos Não-Funcionais", span: 6 },
    { title: "Métricas", span: 6 }
  ],
  "Cartão de Experimento Lean": [
    { title: "Hipótese", span: 12 },
    { title: "Métrica Sucesso", span: 6 },
    { title: "Plano de Teste", span: 6 },
    { title: "Resultado", span: 12 },
    { title: "Aprendizados", span: 12 }
  ],
  "Go-To-Market (GTM) Lite": [
    { title: "Segmento-Alvo", span: 6 },
    { title: "Proposta de Valor", span: 6 },
    { title: "Canais", span: 6 },
    { title: "Mensagem", span: 6 },
    { title: "Táticas Iniciais", span: 12 }
  ],
  "Plano de Entrevista com Clientes": [
    { title: "Objetivo da Entrevista", span: 12 },
    { title: "Perfil dos Entrevistados", span: 6 },
    { title: "Roteiro de Perguntas", span: 6 },
    { title: "Notas", span: 12 }
  ],
  "Mapa da Jornada do Cliente (Lite)": [
    { title: "Estágios", span: 12 },
    { title: "Ações do Cliente", span: 12 },
    { title: "Pontos de Dor", span: 6 },
    { title: "Oportunidades", span: 6 }
  ],
  "Brief de Funcionalidade": [
    { title: "Resumo", span: 12 },
    { title: "Problema", span: 6 },
    { title: "Solução Proposta", span: 6 },
    { title: "Critérios de Aceite", span: 12 }
  ],
  "Estratégia de Precificação": [
    { title: "Proposta de Valor", span: 12 },
    { title: "Segmentos/Planos", span: 6 },
    { title: "Preço Inicial", span: 6 },
    { title: "Teste & Validação", span: 12 }
  ],
};

const templates = {
  "Clube de Horta Urbana": {
    "Problema": "Moradores urbanos têm pouco acesso a espaços verdes e alimentos frescos.",
    "Solução": "Clubes de hortas compartilhadas com kits e mentorias.",
    "Público/Segmentos": "Moradores de apartamentos, síndicos, escolas.",
    "Canais": "Parcerias com condomínios e redes sociais locais.",
    "MVP": "Horta piloto em um prédio com encontros semanais.",
    "Validação": "Participantes ativos e colheitas em 60 dias.",
    "Métricas": "Nº de participantes, retenção, colheitas/mês"
  },
  "Correção Colaborativa de Redações": {
    "Problema": "Estudantes carecem de feedback rápido e qualificado.",
    "Solução": "Plataforma com correção por pares e monitores."
  },
  "Feira Online do Bairro": {
    "Problema": "Produtores locais não alcançam compradores digitais.",
    "Solução": "Marketplace hiperlocal com logística colaborativa."
  },
  "Plataforma de Troca de Habilidades": {
    "Problema": "Pessoas querem aprender sem alto custo.",
    "Solução": "Créditos por aula ensinada para aprender outra habilidade."
  },
  "App de Caminhadas Locais": {
    "Problema": "Falta de rotas seguras e interessantes nas redondezas.",
    "Solução": "App com roteiros curados e gamificação."
  },
  "Rede de Apoio a Mães Empreendedoras": {
    "Problema": "Falta de networking e suporte flexível.",
    "Solução": "Comunidade, mentorias e marketplace."
  },
  "Loja Virtual de Produtos Artesanais": {
    "Problema": "Artesãos têm pouca presença online.",
    "Solução": "Loja compartilhada com vitrine e logística simples."
  },
  "Central de Ofertas Comunitárias": {
    "Problema": "Ofertas locais se perdem em vários canais.",
    "Solução": "Hub único de promoções do bairro."
  }
};

function initFrameworksAndTemplates() {
  // Frameworks
  const fSel = els.frameworkSelect;
  fSel.innerHTML = '<option value="">Selecione um Framework</option>' + Object.keys(frameworks).map(n => `<option>${n}</option>`).join('');
  // Templates
  const tSel = els.templateSelect;
  tSel.innerHTML = '<option value="">Selecione um Modelo</option>' + Object.keys(templates).map(n => `<option>${n}</option>`).join('');
}

// Eventos UI
function bindEvents() {
  document.getElementById('btnNew').addEventListener('click', () => newProject(true));
  document.getElementById('btnProjects').addEventListener('click', showProjectsModal);
  document.getElementById('btnValidate').addEventListener('click', () => window.location.href = 'validar.html');
  document.getElementById('btnStairs').addEventListener('click', showStairsModal);

  document.getElementById('btnSave').addEventListener('click', saveProject);
  document.getElementById('btnReload').addEventListener('click', reloadCurrent);
  document.getElementById('btnDelete').addEventListener('click', deleteCurrent);
  document.getElementById('btnExportPdf').addEventListener('click', onExportPdf);

  els.modalClose.addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', (e) => { if (e.target.id === 'modalBackdrop') closeModal(); });

  els.name.addEventListener('input', () => { state.name = els.name.value; markDirty(); });

  els.frameworkSelect.addEventListener('change', onFrameworkChange);
  els.templateSelect.addEventListener('change', onTemplateChange);
}

// Lógica de exclusão mútua: Framework XOR Modelo
function onFrameworkChange(e) {
  const name = e.target.value;
  if (!name) return;
  if (state.selectedTemplate) {
    state.selectedTemplate = '';
    els.templateSelect.value = '';
  }
  loadFramework(name);
}

function onTemplateChange(e) {
  const name = e.target.value;
  if (!name) return;
  if (state.selectedFramework) {
    state.selectedFramework = '';
    els.frameworkSelect.value = '';
  }
  applyTemplate(name);
}

// Render
function renderBlocks() {
  if (!state.blocks.length) {
    els.empty.hidden = false;
    els.blocks.hidden = true;
    return;
  }
  els.empty.hidden = true;
  els.blocks.hidden = false;
  els.blocks.innerHTML = '';

  state.blocks.forEach(b => {
    const div = document.createElement('div');
    div.className = `block grid-${b.span || 6}`;
    div.dataset.id = b.id;
    div.innerHTML = `
      <span class="pin">${state.selectedFramework || state.selectedTemplate || 'Bloco'}</span>
      <h4>${b.title}</h4>
      <div class="content" contenteditable="true">${escapeHtml(b.content || '')}</div>
      ${b.hint ? `<div class="hint">${b.hint}</div>` : ``}
    `;
    div.querySelector('.content').addEventListener('input', (ev) => {
      const val = ev.currentTarget.innerText;
      const target = state.blocks.find(x => x.id === b.id);
      target.content = val;
      markDirty();
    });
    els.blocks.appendChild(div);
  });
  if (window.feather?.replace) feather.replace();
}

function escapeHtml(txt) { const el = document.createElement('div'); el.textContent = txt || ''; return el.innerHTML; }
function markDirty() { state.dirty = true; setStatus('editando'); }
function setStatus(s) { els.status.textContent = s; }

// Fluxo de projeto
function newProject(confirmIfDirty=false) {
  const apply = () => {
    state.id = null;
    state.name = 'Novo Projeto';
    state.selectedFramework = '';
    state.selectedTemplate = '';
    state.blocks = [];
    state.dirty = false;
    els.name.value = state.name;
    els.frameworkSelect.value = '';
    els.templateSelect.value = '';
    setStatus('novo');
    renderBlocks();
  };
  if (confirmIfDirty && state.dirty) {
    confirmModal('Descartar alterações?', 'Iniciar novo projeto pode descartar alterações não salvas.', apply);
  } else apply();
}

function reloadCurrent() {
  if (state.selectedFramework) loadFramework(state.selectedFramework);
  else if (state.selectedTemplate) applyTemplate(state.selectedTemplate);
  else toast('Selecione um framework ou um modelo para reeditar', 'warn');
}

async function saveProject() {
  const project = {
    id: state.id || undefined,
    name: state.name || 'Projeto sem título',
    framework: state.selectedFramework,
    template: state.selectedTemplate,
    blocks: state.blocks,
    updatedAt: new Date().toISOString(),
  };
  const newId = await dbSaveProject(project);
  state.id = newId;
  state.dirty = false;
  setStatus('salvo');
  toast('Projeto salvo', 'success');
}

async function deleteCurrent() {
  if (!state.id) return toast('Nenhum projeto carregado', 'warn');
  confirmModal('Deletar projeto?', 'Essa ação não pode ser desfeita.', async () => {
    await dbDeleteProject(state.id);
    toast('Projeto deletado', 'success');
    newProject(false);
  });
}

async function showProjectsModal() {
  const list = await dbListProjects();
  const body = document.createElement('div');
  if (!list.length) {
    body.innerHTML = `<div style="color:var(--muted)">Nenhum projeto salvo ainda.</div>`;
  } else {
    body.className = 'projects-list';
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      const left = document.createElement('div');
      left.innerHTML = `
        <strong>${escapeHtml(p.name)}</strong>
        <div class="project-meta">
          <span>${p.framework || p.template || 'Sem tipo'}</span>
          <span>•</span>
          <span>${new Date(p.updatedAt).toLocaleString()}</span>
        </div>
      `;
      const actions = document.createElement('div');
      actions.className = 'project-actions';
      const openBtn = document.createElement('button');
      openBtn.className = 'btn';
      openBtn.innerHTML = `<i data-feather="folder-open" class="icon"></i>Abrir`;
      openBtn.addEventListener('click', async ()=> {
        const proj = await dbGetProject(p.id);
        if (!proj) return;
        state.id = proj.id;
        state.name = proj.name;
        state.selectedFramework = proj.framework || '';
        state.selectedTemplate = proj.template || '';
        state.blocks = proj.blocks || [];
        els.name.value = state.name;
        if (state.selectedFramework) els.frameworkSelect.value = state.selectedFramework;
        if (state.selectedTemplate) els.templateSelect.value = state.selectedTemplate;
        renderBlocks();
        setStatus('carregado');
        toast('Projeto carregado', 'success');
        closeModal();
      });
      const delBtn = document.createElement('button');
      delBtn.className = 'btn danger';
      delBtn.innerHTML = `<i data-feather="trash-2" class="icon"></i>Deletar`;
      delBtn.addEventListener('click', ()=> {
        closeModal();
        confirmModal('Deletar projeto?', `Tem certeza que deseja deletar "${p.name}"?`, async () => {
          await dbDeleteProject(p.id);
          toast('Projeto deletado', 'success');
        });
      });

      actions.appendChild(openBtn);
      actions.appendChild(delBtn);
      card.appendChild(left);
      card.appendChild(actions);
      body.appendChild(card);
    });
  }
  openModal('Meus Projetos', body, [{ label: 'Fechar', icon: 'x', onClick: closeModal }]);
  if (window.feather?.replace) feather.replace();
}

// Modal genérico
function openModal(title, bodyNode, actions=[]) {
  els.modalTitle.textContent = title;
  els.modalBody.innerHTML = '';
  els.modalBody.appendChild(bodyNode);
  els.modalActions.innerHTML = '';
  actions.forEach(a => {
    const b = document.createElement('button');
    b.className = `btn ${a.variant||''}`;
    b.innerHTML = a.icon ? `<i data-feather="${a.icon}" class="icon"></i>${a.label}` : a.label;
    b.addEventListener('click', a.onClick);
    els.modalActions.appendChild(b);
  });
  document.getElementById('modalBackdrop').style.display = 'flex';
  if (window.feather?.replace) feather.replace();
}
function closeModal() { document.getElementById('modalBackdrop').style.display = 'none'; }
function confirmModal(title, msg, onConfirm) {
  const body = document.createElement('div');
  body.innerHTML = `<p style="color:var(--muted)">${msg}</p>`;
  openModal(title, body, [
    { label: 'Cancelar', icon: 'x', onClick: closeModal },
    { label: 'Confirmar', icon: 'check', variant: 'danger', onClick: ()=> { closeModal(); onConfirm(); } },
  ]);
}

function showStairsModal() {
  const body = document.createElement('div');
  body.innerHTML = `<p style="color:var(--muted)">Você está saindo do IdeiaHub e será redirecionado para outra ferramenta (Stairs). Deseja continuar?</p>`;
  openModal('Ir para o Stairs', body, [
    { label: 'Cancelar', icon: 'x', onClick: closeModal },
    { label: 'Sim, ir para o Stairs', icon: 'external-link', onClick: ()=> { closeModal(); window.location.href = 'https://stairs.example.com'; } },
  ]);
}

// Carregar Frameworks/Templates
function loadFramework(name) {
  const schema = frameworks[name];
  if (!schema) return;
  state.selectedFramework = name;
  state.blocks = schema.map(s => ({
    id: crypto.randomUUID(),
    title: s.title,
    hint: s.hint || '',
    span: s.span || 6,
    content: ''
  }));
  renderBlocks();
  setStatus('editando');
  toast(`Framework "${name}" carregado`, 'success');
}

function applyTemplate(name) {
  const map = templates[name] || {};
  state.selectedTemplate = name;
  // Encontrar framework compatível ou usar conjunto padrão de chaves do template
  const keys = Object.keys(map);
  // construir blocos a partir das chaves do template
  state.blocks = keys.map(k => ({
    id: crypto.randomUUID(),
    title: k,
    hint: '',
    span: 6,
    content: map[k]
  }));
  renderBlocks();
  setStatus('editando');
  toast(`Modelo "${name}" aplicado`, 'success');
}

// Exportar PDF
function onExportPdf() {
  if (!state.blocks.length) return toast('Nada para exportar. Selecione framework ou modelo.', 'warn');
  exportProjectPDF(state.name, state.selectedFramework || state.selectedTemplate, state.blocks)
    .then(() => { setStatus('exportado'); toast('PDF exportado', 'success'); })
    .catch(() => toast('Falha ao exportar', 'error'));
}

// Toast
function toast(msg, type='') {
  const el = document.createElement('div');
  el.className = `toast-item ${type}`;
  const icon = type==='error' ? 'alert-triangle' : type==='success' ? 'check' : type==='warn' ? 'alert-circle' : 'info';
  el.innerHTML = `<i data-feather="${icon}" class="icon"></i><span>${msg}</span>`;
  document.getElementById('toast').appendChild(el);
  if (window.feather?.replace) feather.replace();
  setTimeout(()=> {
    el.style.opacity = '0';
    setTimeout(()=> el.remove(), 250);
  }, 2500);
}