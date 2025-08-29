// Icons
feather.replace();

// Simple state
const state = {
  currentProjectId: null,
  currentFramework: "",
  currentTemplate: "",
  blocks: [], // { id, title, hint, content, span }
  dirty: false,
  theme: localStorage.getItem("ideiahub.theme") || "dark",
};

// DOM elements
const els = {
  projectName: document.getElementById('projectName'),
  statusChip: document.getElementById('statusChip'),
  frameworkSelect: document.getElementById('frameworkSelect'),
  templateSelect: document.getElementById('templateSelect'),
  blocks: document.getElementById('blocks'),
  empty: document.getElementById('emptyState'),
  toast: document.getElementById('toast'),
  modalBackdrop: document.getElementById('modalBackdrop'),
  modalTitle: document.getElementById('modalTitle'),
  modalBody: document.getElementById('modalBody'),
  modalActions: document.getElementById('modalActions'),
  modalClose: document.getElementById('modalClose'),
};

// Theme
document.body.setAttribute('data-theme', state.theme);
document.getElementById('themeToggle').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', state.theme);
  localStorage.setItem("ideiahub.theme", state.theme);
  toast('Tema alternado', 'success');
});

// Framework definitions
const frameworks = {
  "Lean Canvas Expandido": [
    { title: "Nome do Projeto", hint: "Um nome claro e memorável.", span: 6 },
    { title: "Problema", hint: "Que problema real você resolve?", span: 6 },
    { title: "Solução", hint: "Como sua solução endereça o problema?", span: 6 },
    { title: "Proposta de Valor", hint: "O que torna sua solução única?", span: 6 },
    { title: "Público/Segmentos", hint: "Quem são os usuários ou clientes?", span: 6 },
    { title: "Canais", hint: "Como você chega ao público?", span: 6 },
    { title: "MVP", hint: "Qual é o mínimo para testar valor?", span: 6 },
    { title: "Validação", hint: "Como você medirá o sucesso inicial?", span: 6 },
    { title: "OKRs", hint: "Objetivos e resultados-chave.", span: 6 },
    { title: "Custos", hint: "Principais custos.", span: 6 },
    { title: "Receitas", hint: "Fontes de receita.", span: 6 }
  ],
  "Proposta de Valor (VPC)": [
    { title: "Cliente-Alvo", hint: "Quem é o cliente e contexto?", span: 6 },
    { title: "Tarefas do Cliente", hint: "O que tentam realizar?", span: 6 },
    { title: "Dores", hint: "Obstáculos e frustrações.", span: 6 },
    { title: "Ganhos", hint: "Resultados desejados.", span: 6 },
    { title: "Produtos/Serviços", hint: "O que você oferece?", span: 6 },
    { title: "Aliviadores de Dor", hint: "Como reduz as dores?", span: 6 },
    { title: "Criadores de Ganho", hint: "Como gera ganhos?", span: 6 }
  ],
  "Mini Roadmap de Projeto": [
    { title: "Objetivo", hint: "Resultado principal do período.", span: 12 },
    { title: "Marcos", hint: "Etapas chave.", span: 6 },
    { title: "Tarefas", hint: "Lista priorizada.", span: 6 },
    { title: "Riscos/Dependências", hint: "O que pode impactar.", span: 12 }
  ],
  "Pitch Rápido": [
    { title: "Problema", hint: "", span: 6 },
    { title: "Solução", hint: "", span: 6 },
    { title: "Diferencial", hint: "", span: 6 },
    { title: "Mercado", hint: "", span: 6 },
    { title: "Tração/Provas", hint: "", span: 6 },
    { title: "Call-to-Action", hint: "", span: 6 },
  ],
  "Canvas do IdeiaHub (custom)": [
    { title: "Visão", hint: "Onde queremos chegar?", span: 12 },
    { title: "Usuários", hint: "", span: 6 },
    { title: "Solução", hint: "", span: 6 },
    { title: "Métricas-Chave", hint: "", span: 6 },
    { title: "Experimentos", hint: "", span: 6 },
    { title: "Roadmap", hint: "", span: 12 },
  ],
  "SWOT Simplificado": [
    { title: "Forças", hint: "", span: 6 },
    { title: "Fraquezas", hint: "", span: 6 },
    { title: "Oportunidades", hint: "", span: 6 },
    { title: "Ameaças", hint: "", span: 6 },
  ],
  "OKRs de Projeto": [
    { title: "Objetivo", hint: "Inspira e direciona.", span: 12 },
    { title: "KR1", hint: "Mensurável e claro.", span: 4 },
    { title: "KR2", hint: "Mensurável e claro.", span: 4 },
    { title: "KR3", hint: "Mensurável e claro.", span: 4 },
    { title: "Iniciativas", hint: "O que faremos para alcançar.", span: 12 },
  ],
  "Product Management Canvas": [
    { title: "Problema", hint: "", span: 6 },
    { title: "Público", hint: "", span: 6 },
    { title: "Proposta de Valor", hint: "", span: 6 },
    { title: "Métricas", hint: "", span: 6 },
    { title: "Canais", hint: "", span: 6 },
    { title: "Monetização", hint: "", span: 6 },
  ],
  "Roadmap Trimestral": [
    { title: "Q Objetivos", hint: "", span: 12 },
    { title: "Em Andamento", hint: "", span: 6 },
    { title: "Próximo", hint: "", span: 6 },
    { title: "Riscos", hint: "", span: 12 },
  ],
  "BRD — Requisitos de Negócio": [
    { title: "Contexto", hint: "", span: 12 },
    { title: "Stakeholders", hint: "", span: 6 },
    { title: "Objetivos de Negócio", hint: "", span: 6 },
    { title: "Escopo", hint: "", span: 12 },
    { title: "Critérios de Sucesso", hint: "", span: 12 },
  ],
  "PRD — Requisitos de Produto": [
    { title: "Visão do Produto", hint: "", span: 12 },
    { title: "Usuários & Personas", hint: "", span: 6 },
    { title: "Funcionalidades", hint: "", span: 6 },
    { title: "Requisitos Funcionais", hint: "", span: 6 },
    { title: "Requisitos Não-Funcionais", hint: "", span: 6 },
    { title: "Métricas", hint: "", span: 6 },
  ],
  "Cartão de Experimento Lean": [
    { title: "Hipótese", hint: "", span: 12 },
    { title: "Métrica Sucesso", hint: "", span: 6 },
    { title: "Plano de Teste", hint: "", span: 6 },
    { title: "Resultado", hint: "", span: 12 },
    { title: "Aprendizados", hint: "", span: 12 },
  ],
  "Go-To-Market (GTM) Lite": [
    { title: "Segmento-Alvo", hint: "", span: 6 },
    { title: "Proposta de Valor", hint: "", span: 6 },
    { title: "Canais", hint: "", span: 6 },
    { title: "Mensagem", hint: "", span: 6 },
    { title: "Táticas Iniciais", hint: "", span: 12 },
  ],
  "Plano de Entrevista com Clientes": [
    { title: "Objetivo da Entrevista", hint: "", span: 12 },
    { title: "Perfil dos Entrevistados", hint: "", span: 6 },
    { title: "Roteiro de Perguntas", hint: "", span: 6 },
    { title: "Notas", hint: "", span: 12 },
  ],
  "Mapa da Jornada do Cliente (Lite)": [
    { title: "Estágios", hint: "Descoberta > Consideração > Decisão > Retenção", span: 12 },
    { title: "Ações do Cliente", hint: "", span: 12 },
    { title: "Pontos de Dor", hint: "", span: 6 },
    { title: "Oportunidades", hint: "", span: 6 },
  ],
  "Brief de Funcionalidade": [
    { title: "Resumo", hint: "", span: 12 },
    { title: "Problema", hint: "", span: 6 },
    { title: "Solução Proposta", hint: "", span: 6 },
    { title: "Critérios de Aceite", hint: "", span: 12 },
  ],
  "Estratégia de Precificação": [
    { title: "Proposta de Valor", hint: "", span: 12 },
    { title: "Segmentos/Planos", hint: "", span: 6 },
    { title: "Preço Inicial", hint: "", span: 6 },
    { title: "Teste & Validação", hint: "", span: 12 },
  ],
};

// Templates content (examples)
const templates = {
  "Clube de Horta Urbana": {
    "Nome do Projeto": "HortaClub",
    "Problema": "Moradores urbanos têm pouco acesso a espaços verdes e alimentos frescos.",
    "Solução": "Clubes de hortas compartilhadas em prédios e bairros com kits e mentorias.",
    "Público/Segmentos": "Moradores de apartamentos, síndicos, escolas.",
    "Canais": "Parcerias com condomínios, redes sociais locais, feiras de bairro.",
    "MVP": "Instalação de 1 horta piloto em um prédio e encontros semanais.",
    "Validação": "Número de participantes ativos e safra colhida em 60 dias.",
    "OKRs": "O: Validar interesse; KR1: 30 participantes; KR2: 2 colheitas/mês"
  },
  "Correção Colaborativa de Redações": {
    "Problema": "Estudantes carecem de feedback rápido e qualificado.",
    "Solução": "Plataforma com correção por pares e monitores.",
    "Público": "Alunos de ensino médio, cursinhos.",
    "Canais": "Parcerias com escolas, influenciadores educacionais.",
    "MVP": "Turma piloto com 50 alunos e 2 correções semanais."
  },
  "Feira Online do Bairro": {
    "Problema": "Produtores locais não alcançam compradores digitais.",
    "Solução": "Marketplace hiperlocal com logística colaborativa.",
    "Canais": "Grupos de WhatsApp, associações de bairro.",
    "MVP": "Landing + catálogo simples + entregas em um dia fixo."
  },
  "App de Roteiros de Caminhadas Locais": {
    "Problema": "Falta de rotas seguras e interessantes nas redondezas.",
    "Solução": "App com roteiros curados e gamificação.",
    "MVP": "Mapa com 5 rotas e sistema de badges."
  },
  "Plataforma de Troca de Habilidades": {
    "Problema": "Pessoas querem aprender sem alto custo.",
    "Solução": "Créditos por aula ensinada para aprender outra habilidade.",
  },
  "Loja Virtual de Produtos Artesanais Locais": {
    "Problema": "Artesãos têm pouca presença online.",
    "Solução": "Loja compartilhada com vitrine e logística simples.",
    "Proposta de Valor":"Teste",
    "Público/Segmentos":"Luiz",
    "Canais":"Canal",
    "MVP":"Produto",
    "Validação":"Valido",
    "OKRs":"kit",
    "Custos":"preço",
    "Receitas":"R$",
  },
  "Painel de Indicadores para Pequenos Negócios": {
    "Problema": "Empreendedores não têm visão consolidada de indicadores.",
    "Solução": "Dashboard simples integrado a planilhas.",
  },
  "Rede de Apoio a Mães Empreendedoras": {
    "Problema": "Falta de networking e suporte flexível.",
    "Solução": "Comunidade, mentorias e marketplace.",
  },
  "Projeto Educacional Gamificado": {
    "Problema": "Baixa motivação em estudos remotos.",
    "Solução": "Metas, missões e recompensas.",
  },
  "Central de Ofertas Comunitárias": {
    "Problema": "Ofertas locais se perdem em vários canais.",
    "Solução": "Hub único de promoções do bairro.",
  },
};

// IndexedDB setup
const DB_NAME = 'ideiahub_db';
const DB_STORE = 'projects';
let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 2);
    req.onupgradeneeded = (e) => {
  const db = e.target.result;
  if (!db.objectStoreNames.contains('projects')) {
    db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
  }
};
    req.onsuccess = () => { db = req.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}

function dbTx(mode='readonly') {
  const tx = db.transaction(DB_STORE, mode);
  return { tx, store: tx.objectStore(DB_STORE) };
}

async function saveProject() {
  if (!db) await openDB();
  const project = {
    name: els.projectName.value || "Projeto sem título",
    framework: state.currentFramework,
    template: state.currentTemplate,
    blocks: state.blocks,
    updatedAt: new Date().toISOString()
  };

  // só define id se for um número válido (projetos já salvos)
  if (typeof state.currentProjectId === 'number' && Number.isFinite(state.currentProjectId)) {
    project.id = state.currentProjectId;
  }

  const { store } = dbTx('readwrite');
  const req = store.put(project);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => {
      // o IndexedDB retorna o id gerado (ou o existente)
      state.currentProjectId = req.result;
      state.dirty = false;
      setStatus('salvo');
      toast('Projeto salvo', 'success');
      resolve(req.result);
    };
    req.onerror = () => reject(req.error);
  });
}

async function listProjects() {
  if (!db) await openDB();
  const { store } = dbTx('readonly');
  const req = store.getAll();
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result.sort((a,b)=> new Date(b.updatedAt)-new Date(a.updatedAt)));
    req.onerror = () => reject(req.error);
  });
}

async function getProject(id) {
  if (!db) await openDB();
  const { store } = dbTx('readonly');
  const req = store.get(id);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function deleteProject(id) {
  if (!db) await openDB();
  const { store } = dbTx('readwrite');
  const req = store.delete(id);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

// UI helpers
function setStatus(s) {
  els.statusChip.textContent = s;
}
function toast(msg, type='') {
  const el = document.createElement('div');
  el.className = `toast-item ${type}`;
  el.innerHTML = `<i data-feather="${type==='error'?'alert-triangle': type==='success'?'check': type==='warn'?'alert-circle':'info'}" class="icon"></i><span>${msg}</span>`;
  els.toast.appendChild(el);
  feather.replace();
  setTimeout(()=> {
    el.style.opacity = '0';
    setTimeout(()=> el.remove(), 250);
  }, 2500);
}
function openModal(title, bodyNode, actions=[]) {
  els.modalTitle.textContent = title;
  els.modalBody.innerHTML = '';
  els.modalBody.appendChild(bodyNode);
  els.modalActions.innerHTML = '';
  actions.forEach(a=>{
    const b = document.createElement('button');
    b.className = `btn ${a.variant||''}`;
    b.innerHTML = a.icon ? `<i data-feather="${a.icon}" class="icon"></i>${a.label}` : a.label;
    b.addEventListener('click', a.onClick);
    els.modalActions.appendChild(b);
  });
  feather.replace();
  els.modalBackdrop.style.display = 'flex';
}
function closeModal() { els.modalBackdrop.style.display = 'none'; }
els.modalClose.addEventListener('click', closeModal);
els.modalBackdrop.addEventListener('click', (e)=> { if (e.target === els.modalBackdrop) closeModal(); });

// Blocks rendering
function renderBlocks() {
  // garante referências (ajuste se seus aliases forem diferentes)
  const empty = els.empty;   // deve apontar para #emptyState
  const blocks = els.blocks; // deve apontar para #blocks

  // 1) Limpa a área visual SEMPRE
  blocks.innerHTML = '';
  blocks.hidden = true;
  empty.hidden = false;

  // 2) Se não há blocos no estado, mostra o vazio e sai
  if (!state.blocks || state.blocks.length === 0) {
    return;
  }

  // 3) Há blocos: mostra a área de blocos e esconde o vazio
  empty.hidden = true;
  blocks.hidden = false;

  // 4) Recria os blocos
  state.blocks.forEach(block => {
    const div = document.createElement('div');
    const spanClass = block.span ? `grid-${block.span}` : 'grid-6';
    div.className = `block ${spanClass}`;
    div.dataset.id = block.id;
    div.innerHTML = `
      <span class="pin">${state.currentFramework || 'Bloco'}</span>
      <h4>${block.title}</h4>
      <div class="content" contenteditable="true" data-field="content" placeholder="">${escapeHtml(block.content || '')}</div>
      ${block.hint ? `<div class="hint">${block.hint}</div>` : ``}
    `;

    // listeners
    div.querySelector('.content').addEventListener('input', (e) => {
      const val = e.currentTarget.innerText;
      const b = state.blocks.find(x => x.id === block.id);
      if (b) b.content = val;
      state.dirty = true;
      setStatus('editando');
    });

    blocks.appendChild(div);
  });
}

function escapeHtml(txt) {
  const div = document.createElement('div');
  div.textContent = txt || '';
  return div.innerHTML;
}

function newProject(withConfirm = false) {
  const proceed = () => {
    // zera estado
    state.currentProjectId = null;
    state.currentFramework = '';
    state.currentTemplate = '';
    state.blocks = [];
    state.dirty = false;

    // zera campos visuais
    if (els.projectName) els.projectName.value = 'Novo Projeto';

    const fw = document.getElementById('frameworkSelect');
    const tp = document.getElementById('templateSelect');
    if (fw) { fw.value = ''; fw.dispatchEvent(new Event('change')); }
    if (tp) { tp.value = ''; tp.dispatchEvent(new Event('change')); }

    setStatus('novo');
    renderBlocks();
  };

  if (withConfirm && state.dirty) {
    confirmModal(
      'Descartar alterações?',
      'Iniciar novo projeto pode descartar alterações não salvas.',
      proceed
    );
  } else {
    proceed();
  }
}

function confirmModal(title, msg, onConfirm) {
  const body = document.createElement('div');
  body.innerHTML = `<p style="color:var(--muted)">${msg}</p>`;
  openModal(title, body, [
    { label: 'Cancelar', icon: 'x', onClick: closeModal },
    { label: 'Confirmar', icon: 'check', variant: 'danger', onClick: ()=> { closeModal(); onConfirm(); } },
  ]);
}

// Framework & Template handlers
function loadFramework(name) {
  const schema = frameworks[name];
  if (!schema) return;
  state.currentFramework = name;
  state.blocks = schema.map((s) => ({
    id: crypto.randomUUID(),
    title: s.title,
    hint: s.hint || "",
    content: "",
    span: (s.span || 6)
  }));
  renderBlocks();
  setStatus('editando');
  toast(`Framework "${name}" carregado`, 'success');
}

function applyTemplate(name) {
  const contentMap = templates[name] || {};
  state.currentTemplate = name;
  let applied = 0;
  state.blocks.forEach(b => {
    if (contentMap[b.title] !== undefined) {
      b.content = contentMap[b.title];
      applied++;
    }
  });
  renderBlocks();
  setStatus('editando');
  toast(applied ? `Template "${name}" aplicado` : 'Template sem campos correspondentes', applied ? 'success':'warn');
}

// Export PDF
function exportPDF() {
  if (!state.blocks.length) {
    toast('Nada para exportar. Selecione um framework.', 'warn');
    return;
  }
  const printable = document.createElement('div');
  printable.style.padding = '16px';
  printable.style.fontFamily = 'Inter, Arial, sans-serif';
  printable.style.color = '#111827';

  const title = document.createElement('h2');
  title.textContent = els.projectName.value + ' — ' + (state.currentFramework || 'IdeiaHub');
  printable.appendChild(title);

  state.blocks.forEach(b => {
    const sec = document.createElement('section');
    sec.style.marginBottom = '12px';
    const h = document.createElement('h3');
    h.textContent = b.title;
    h.style.margin = '6px 0';
    h.style.fontSize = '16px';
    const p = document.createElement('div');
    p.textContent = b.content || '';
    p.style.whiteSpace = 'pre-wrap';
    p.style.fontSize = '13px';
    p.style.border = '1px solid #e5e7eb';
    p.style.borderRadius = '8px';
    p.style.padding = '8px';
    sec.appendChild(h); sec.appendChild(p);
    printable.appendChild(sec);
  });

  const opt = {
    margin: 10,
    filename: `${sanitizeFilename(els.projectName.value)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  
}
function exportProject() {
  const data = {
    version: 1,
    id: state.currentProjectId ?? null,
    name: els.projectName?.value || 'Projeto sem título',
    framework: state.currentFramework,
    template: state.currentTemplate,
    blocks: state.blocks,
    updatedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${sanitizeFilename(data.name)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);

  toast('Projeto exportado (JSON)', 'success');
  setStatus('exportado');
  // Usa html2pdf se estiver presente (CDN opcional). Se não, alerta.
  if (typeof html2pdf === 'function') {
    html2pdf().from(printable).set(opt).save().then(()=>{
      toast('Exportado com sucesso', 'success');
      setStatus('exportado');
    }).catch(()=>{
      toast('Falha ao exportar', 'error');
    });
  } else {
    toast('html2pdf não carregado. Habilite o CDN no index.html.', 'warn');
  }
}
function sanitizeFilename(name) {
  return (name || 'ideiahub').replace(/[\\/:*?"<>|]+/g,'_').slice(0,80);
}

// Projects modals
async function showProjectsModal() {
  const list = await listProjects();
  const body = document.createElement('div');
  body.className = 'projects-list';
  if (!list.length) {
    body.innerHTML = `<div style="color:var(--muted)">Nenhum projeto salvo ainda.</div>`;
  } else {
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      const left = document.createElement('div');
      left.innerHTML = `<strong>${escapeHtml(p.name)}</strong>
        <div class="project-meta">
          <span>${p.framework || 'Sem framework'}</span>
          <span>•</span>
          <span>${new Date(p.updatedAt).toLocaleString()}</span>
        </div>`;
      const actions = document.createElement('div');
      actions.className = 'project-actions';
      const openBtn = document.createElement('button');
      openBtn.className = 'btn';
      openBtn.innerHTML = `<i data-feather="folder-open" class="icon"></i>Abrir`;
      openBtn.addEventListener('click', async ()=> {
        const proj = await getProject(p.id);
        if (proj) {
          state.currentProjectId = proj.id;
          state.currentFramework = proj.framework || "";
          state.currentTemplate = proj.template || "";
          state.blocks = proj.blocks || [];
          els.projectName.value = proj.name || "Projeto";
          renderBlocks();
          setStatus('carregado');
          toast('Projeto carregado', 'success');
          closeModal();
        }
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn danger';
      delBtn.innerHTML = `<i data-feather="trash-2" class="icon"></i>Deletar`;
      delBtn.addEventListener('click', ()=> {
        closeModal();
        confirmModal('Deletar projeto?', `Tem certeza que deseja deletar "${p.name}"?`, async () => {
          await deleteProject(p.id);
          toast('Projeto deletado', 'success');
        });
      });
      actions.appendChild(openBtn); actions.appendChild(delBtn);
      card.appendChild(left); card.appendChild(actions);
      body.appendChild(card);
    });
  }
  openModal('Meus Projetos', body, [{ label: 'Fechar', icon: 'x', onClick: closeModal }]);
  feather.replace();
}

// Premium modal (locked)
function showHypothesisModal() {
  const body = document.createElement('div');
  body.className = 'checklist';
  body.innerHTML = `
    <div class="check-item">
      <input type="checkbox" disabled />
      <div>
        <strong>Você validou esse problema com usuários reais?</strong>
        <div style="color:var(--muted)">Converse com ao menos 5 pessoas do público-alvo.</div>
      </div>
    </div>
    <div class="check-item">
      <input type="checkbox" disabled />
      <div>
        <strong>O que torna sua solução melhor?</strong>
        <div style="color:var(--muted)">Liste 3 diferenciais claros.</div>
      </div>
    </div>
    <div class="check-item">
      <input type="checkbox" disabled />
      <div>
        <strong>Qual canal inicial para o MVP?</strong>
        <div style="color:var(--muted)">Escolha 1 canal para concentrar esforços.</div>
      </div>
    </div>
    <div class="check-item">
      <input type="checkbox" disabled />
      <div>
        <strong>Como você medirá sucesso?</strong>
        <div style="color:var(--muted)">Defina uma métrica simples e clara.</div>
      </div>
    </div>
    <div class="locked" style="height: 80px; border:1px dashed var(--border); border-radius:12px; display:grid; place-items:center; color:var(--muted);">Checklist interativo</div>
  `;
  openModal('Testar Hipótese (Premium)', body, [
    { label: 'Saiba mais', icon: 'star', onClick: ()=> { toast('Recurso Premium em breve', 'warn'); } },
    { label: 'Fechar', icon: 'x', onClick: closeModal },
  ]);
}

// Toolbar actions
document.getElementById('saveBtn').addEventListener('click', saveProject);
document.getElementById('exportPdfBtn').addEventListener('click', exportPDF);
document.getElementById('exportBtn').addEventListener('click', async () => {
  try {
    await saveProject(); // tenta salvar antes de exportar
  } catch(e) {
    // se falhar salvar, ainda assim tentamos exportar o estado atual
    console.warn('Falha ao salvar antes de exportar:', e);
  }
  exportProject();
});
document.getElementById('exportBtnSidebar').addEventListener('click', exportPDF);
document.getElementById('resetTemplateBtn').addEventListener('click', ()=> {
  if (!state.currentFramework) return toast('Selecione um framework primeiro', 'warn');
  confirmModal('Recarregar Framework?', 'Isso limpa os conteúdos inseridos. Deseja continuar?', ()=> {
    loadFramework(state.currentFramework);
  });
});
document.getElementById('addBlockBtn').addEventListener('click', ()=> {
  state.blocks.push({
    id: crypto.randomUUID(),
    title: "Novo Bloco",
    hint: "",
    content: "",
    span: 6
  });
  state.dirty = true;
  renderBlocks();
  setStatus('editando');
});

// Sidebar actions
document.getElementById('newProjectBtn').addEventListener('click', () => newProject(false));
document.getElementById('myProjectsBtn').addEventListener('click', showProjectsModal);
document.getElementById('premiumBtnSidebar').addEventListener('click', ()=> toast('Recursos Premium em breve', 'warn'));
document.getElementById('deleteProjectBtn').addEventListener('click', ()=> {
  if (!state.currentProjectId) return toast('Nenhum projeto carregado', 'warn');
  confirmModal('Deletar projeto?', 'Essa ação não pode ser desfeita.', async ()=> {
    await deleteProject(state.currentProjectId);
    newProject();
    toast('Projeto deletado', 'success');
  });
});

// Selectors
els.frameworkSelect.addEventListener('change', (e)=> {
  const name = e.target.value;
  if (!name) return;
  if (state.dirty) {
    confirmModal('Trocar framework?', 'Você possui alterações não salvas. Continuar?', ()=> loadFramework(name));
  } else {
    loadFramework(name);
  }
});

els.templateSelect.addEventListener('change', (e)=> {
  const name = e.target.value;
  if (!name) return;
  if (!state.currentFramework) {
    toast('Selecione um framework antes do template', 'warn');
    e.target.value = '';
    return;
  }
  applyTemplate(name);
});

// Project name changes
els.projectName.addEventListener('input', ()=> {
  state.dirty = true; setStatus('editando');
});

// Load initial
(async function init() {
  await openDB();
  setStatus('pronto');
  // Botão premium no topo
  document.getElementById('testHypothesisBtn').addEventListener('click', showHypothesisModal);
})();