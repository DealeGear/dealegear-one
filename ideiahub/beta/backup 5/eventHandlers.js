import { state, els } from './state.js';
import { frameworks, templates } from './data.js';
import { saveProject, listProjects, getProject, deleteProject } from './db.js';
import { setStatus, toast, openModal, closeModal } from './ui.js';

// Função auxiliar para escape de HTML
function escapeHtml(txt) {
  const div = document.createElement('div');
  div.textContent = txt || '';
  return div.innerHTML;
}

// Blocks rendering
export function renderBlocks() {
  const empty = els.empty;
  const blocks = els.blocks;

  blocks.innerHTML = '';
  blocks.hidden = true;
  empty.hidden = false;

  if (!state.blocks || state.blocks.length === 0) {
    return;
  }

  empty.hidden = true;
  blocks.hidden = false;

  state.blocks.forEach(block => {
    const div = document.createElement('div');
    const spanClass = block.span ? `grid-${block.span}` : 'grid-6';
    div.className = `block ${spanClass}`;
    div.dataset.id = block.id;
    // O escapeHtml aqui garante que o conteúdo do bloco, que pode vir do IndexedDB, seja seguro
    const sanitizedContent = escapeHtml(block.content || '');
    div.innerHTML = `
      <span class="pin">${state.currentFramework || 'Bloco'}</span>
      <h4>${block.title}</h4>
      <div class="content" contenteditable="true" data-field="content" placeholder="">${sanitizedContent}</div>
      ${block.hint ? `<div class="hint">${block.hint}</div>` : ``}
    `;

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

// Projeto
export function newProject(withConfirm = false) {
  const proceed = () => {
    state.currentProjectId = null;
    state.currentFramework = '';
    state.currentTemplate = '';
    state.blocks = [];
    state.dirty = false;

    if (els.projectName) els.projectName.value = 'Novo Projeto';
    if (els.frameworkSelect) { els.frameworkSelect.value = ''; els.frameworkSelect.dispatchEvent(new Event('change')); }
    if (els.templateSelect) { els.templateSelect.value = ''; els.templateSelect.dispatchEvent(new Event('change')); }

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

export function confirmModal(title, msg, onConfirm) {
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
  // AQUI: A chamada é crucial para renderizar os ícones criados dinamicamente
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
  // AQUI: Adicione a chamada para renderizar os ícones no modal
  feather.replace();
}

// Event listeners
export function registerListeners() {
  const themeToggle = document.getElementById('themeToggle');
  const saveBtn = document.getElementById('saveBtn');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const exportBtn = document.getElementById('exportBtn');
  const exportBtnSidebar = document.getElementById('exportBtnSidebar');
  const resetTemplateBtn = document.getElementById('resetTemplateBtn');
  const addBlockBtn = document.getElementById('addBlockBtn');
  const newProjectBtn = document.getElementById('newProjectBtn');
  const myProjectsBtn = document.getElementById('myProjectsBtn');
  const premiumBtnSidebar = document.getElementById('premiumBtnSidebar');
  const deleteProjectBtn = document.getElementById('deleteProjectBtn');
  const testHypothesisBtn = document.getElementById('testHypothesisBtn');
  
  els.modalClose.addEventListener('click', closeModal);
  els.modalBackdrop.addEventListener('click', (e)=> { if (e.target === els.modalBackdrop) closeModal(); });
  themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', state.theme);
    localStorage.setItem("ideiahub.theme", state.theme);
    toast('Tema alternado', 'success');
  });

  saveBtn.addEventListener('click', saveProject);
  exportPdfBtn.addEventListener('click', exportPDF);
  exportBtn.addEventListener('click', async () => {
    try {
      await saveProject(); // tenta salvar antes de exportar
    } catch(e) {
      console.warn('Falha ao salvar antes de exportar:', e);
    }
    exportProject();
  });
  exportBtnSidebar.addEventListener('click', exportPDF);
  resetTemplateBtn.addEventListener('click', ()=> {
    if (!state.currentFramework) return toast('Selecione um framework primeiro', 'warn');
    confirmModal('Recarregar Framework?', 'Isso limpa os conteúdos inseridos. Deseja continuar?', ()=> loadFramework(state.currentFramework));
  });
  addBlockBtn.addEventListener('click', ()=> {
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
  newProjectBtn.addEventListener('click', () => newProject(true));
  myProjectsBtn.addEventListener('click', showProjectsModal);
  premiumBtnSidebar.addEventListener('click', ()=> toast('Recursos Premium em breve', 'warn'));
  deleteProjectBtn.addEventListener('click', ()=> {
    if (!state.currentProjectId) return toast('Nenhum projeto carregado', 'warn');
    confirmModal('Deletar projeto?', 'Essa ação não pode ser desfeita.', async ()=> {
      await deleteProject(state.currentProjectId);
      newProject();
      toast('Projeto deletado', 'success');
    });
  });
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
  els.projectName.addEventListener('input', ()=> {
    state.dirty = true; setStatus('editando');
  });
  testHypothesisBtn.addEventListener('click', showHypothesisModal);
}