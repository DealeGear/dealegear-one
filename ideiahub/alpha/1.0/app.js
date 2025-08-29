import { openDB, saveProject as dbSave, listProjects, getProject, deleteProject } from './db.js';
import { setTheme, getTheme, setStatus, toast, openModal, closeModal, confirmModal, escapeHtml, sanitizeText, sanitizeFilename } from './ui.js';

export function initApp({ frameworks, templates }) {
  const state = {
    currentProjectId: null,
    currentFramework: "",
    currentTemplate: "",
    blocks: [], // { id, title, hint, content, span, order }
    dirty: false,
    theme: getTheme(),
    pdfLibLoaded: false,
  };

  const els = {
    projectName: document.getElementById('projectName'),
    frameworkSelect: document.getElementById('frameworkSelect'),
    templateSelect: document.getElementById('templateSelect'),
    blocks: document.getElementById('blocks'),
    empty: document.getElementById('emptyState'),
    modalBackdrop: document.getElementById('modalBackdrop'),
    modalClose: document.getElementById('modalClose'),
  };

  // Populate selectors
  function populateSelectors() {
    Object.keys(frameworks).forEach(name => {
      const opt = document.createElement('option'); opt.value = name; opt.textContent = name;
      els.frameworkSelect.appendChild(opt);
    });
    Object.keys(templates).forEach(name => {
      const opt = document.createElement('option'); opt.value = name; opt.textContent = name;
      els.templateSelect.appendChild(opt);
    });
  }

  // Theme init
  setTheme(state.theme);
  document.getElementById('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    setTheme(state.theme);
    toast('Tema alternado', 'success');
  });

  // Debounce util
  const debounce = (fn, ms=900) => { let t; return (...a)=>{ clearTimeout(t); t = setTimeout(()=>fn(...a), ms); }; };
  const autoSave = debounce(() => { if (state.dirty) saveProject(); }, 900);

  // Save project
  async function saveProject() {
    try {
      await openDB();
      setStatus('salvando…', 'saving');
      const project = {
        id: state.currentProjectId || undefined,
        name: els.projectName.value || "Projeto sem título",
        framework: state.currentFramework,
        template: state.currentTemplate,
        blocks: state.blocks,
        updatedAt: new Date().toISOString()
      };
      const id = await dbSave(project);
      state.currentProjectId = id;
      state.dirty = false;
      setStatus('salvo', 'saved');
      toast('Projeto salvo', 'success');
      return id;
    } catch (e) {
      console.error(e);
      setStatus('erro ao salvar');
      toast('Erro ao salvar', 'error');
    }
  }

  // Render blocks
  function applyGridClass(el, span) {
    el.classList.remove('grid-3','grid-4','grid-6','grid-8','grid-12');
    el.classList.add(`grid-${span}`);
  }
  function placeCaretAtEnd(el) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el); range.collapse(false);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  }
  function renderBlocks() {
    if (!state.blocks.length) {
      els.empty.hidden = false;
      els.blocks.hidden = true;
      return;
    }
    els.empty.hidden = true;
    els.blocks.hidden = false;
    els.blocks.innerHTML = '';

    state.blocks.sort((a,b)=> (a.order ?? 0) - (b.order ?? 0));

    state.blocks.forEach(block => {
      const div = document.createElement('div');
      const span = block.span || 6;
      div.className = `block grid-${span}`;
      div.dataset.id = block.id;
      div.draggable = true;

      div.innerHTML = `
        <span class="pin">${state.currentFramework || 'Bloco'}</span>
        <h4>
          ${escapeHtml(block.title)}
          <span class="tools">
            <span class="drag-handle" title="Arrastar" aria-label="Arrastar bloco"><i data-feather="move" class="icon"></i></span>
            <select class="size-select" title="Tamanho do bloco" aria-label="Tamanho do bloco">
              <option value="3"${span===3?' selected':''}>3</option>
              <option value="4"${span===4?' selected':''}>4</option>
              <option value="6"${span===6?' selected':''}>6</option>
              <option value="8"${span===8?' selected':''}>8</option>
              <option value="12"${span===12?' selected':''}>12</option>
            </select>
          </span>
        </h4>
        <div class="content" contenteditable="true" data-field="content" data-placeholder="${escapeHtml(block.hint || '')}">${escapeHtml(block.content||'')}</div>
        ${block.hint ? `<div class="hint">${block.hint}</div>` : ``}
      `;

      const contentEl = div.querySelector('.content');
      const togglePlaceholder = () => {
        if (!contentEl.textContent.trim()) contentEl.setAttribute('data-show-placeholder','1');
        else contentEl.removeAttribute('data-show-placeholder');
      };
      togglePlaceholder();

      contentEl.addEventListener('input', (e) => {
        const val = sanitizeText(e.currentTarget.innerHTML);
        e.currentTarget.textContent = val; placeCaretAtEnd(e.currentTarget);
        const b = state.blocks.find(x => x.id === block.id);
        b.content = val;
        state.dirty = true; setStatus('editando'); autoSave(); togglePlaceholder();
      });

      // tamanho
      div.querySelector('.size-select').addEventListener('change', (e) => {
        const newSpan = parseInt(e.target.value, 10);
        const b = state.blocks.find(x => x.id === block.id);
        b.span = newSpan; applyGridClass(div, newSpan);
        state.dirty = true; setStatus('editando'); autoSave();
      });

      // drag
      const handle = div.querySelector('.drag-handle');
      handle.addEventListener('mousedown', () => { div.draggable = true; });
      handle.addEventListener('mouseup', () => { div.draggable = false; });
      div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', block.id);
        div.classList.add('dragging');
      });
      div.addEventListener('dragend', () => {
        div.classList.remove('dragging');
        document.querySelectorAll('.placeholder').forEach(x=> x.classList.remove('placeholder'));
      });
      div.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragging = els.blocks.querySelector('.dragging');
        if (!dragging || dragging === div) return;
        const rect = div.getBoundingClientRect();
        const before = (e.clientY - rect.top) < rect.height/2;
        if (before) els.blocks.insertBefore(dragging, div);
        else els.blocks.insertBefore(dragging, div.nextSibling);
      });
      div.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggingId = e.dataTransfer.getData('text/plain');
        const overId = div.dataset.id;
        if (!draggingId || draggingId === overId) return;
        const orderMap = Array.from(els.blocks.children).map((el, idx)=> ({ id: el.dataset.id, order: idx }));
        orderMap.forEach(m=>{
          const b = state.blocks.find(x=> x.id===m.id);
          if (b) b.order = m.order;
        });
        state.dirty = true; setStatus('editando'); autoSave();
      });

      els.blocks.appendChild(div);
    });
    window.feather?.replace();
  }

  // Framework/Template
  function loadFramework(name) {
    const schema = frameworks[name];
    if (!schema) return;
    state.currentFramework = name;
    state.blocks = schema.map((s, idx) => ({
      id: crypto.randomUUID(),
      title: s.title,
      hint: s.hint || "",
      content: "",
      span: (s.span || 6),
      order: idx
    }));
    renderBlocks();
    setStatus('editando'); toast(`Framework "${name}" carregado`, 'success');
  }
  function applyTemplate(name) {
    const map = templates[name] || {};
    state.currentTemplate = name;
    let applied = 0;
    state.blocks.forEach(b => {
      if (map[b.title] !== undefined) { b.content = map[b.title]; applied++; }
    });
    renderBlocks();
    state.dirty = true; setStatus('editando'); autoSave();
    toast(applied ? `Template "${name}" aplicado` : 'Template sem campos correspondentes', applied ? 'success':'warn');
  }

  // Exporters
  async function ensurePdfLib() {
    if (state.pdfLibLoaded) return true;
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      s.integrity = "sha512-YcsIPNR6DcnZ6G9vBvYqLZ5k6bK2zFf9Q1k1Q6m8t6pW2YkXn0Z0aHnQxD8Y5p0wAqz8W3c1u3n9G0t+9am9Vw==";
      s.crossOrigin = "anonymous"; s.referrerPolicy = "no-referrer";
      s.onload = () => { state.pdfLibLoaded = true; resolve(true); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  async function exportPDF() {
    if (!state.blocks.length) return toast('Nada para exportar. Selecione um framework.', 'warn');
    try {
      await ensurePdfLib();
      const printable = document.createElement('div');
      printable.style.padding = '16px'; printable.style.fontFamily = 'Inter, Arial, sans-serif'; printable.style.color = '#111827';
      const title = document.createElement('h2');
      title.textContent = els.projectName.value + ' — ' + (state.currentFramework || 'IdeiaHub');
      printable.appendChild(title);
      state.blocks.forEach(b => {
        const sec = document.createElement('section'); sec.style.marginBottom = '12px';
        const h = document.createElement('h3'); h.textContent = b.title; h.style.margin='6px 0'; h.style.fontSize='16px';
        const p = document.createElement('div'); p.textContent = b.content || ''; p.style.whiteSpace = 'pre-wrap'; p.style.fontSize='13px'; p.style.border='1px solid #e5e7eb'; p.style.borderRadius='8px'; p.style.padding='8px';
        sec.appendChild(h); sec.appendChild(p); printable.appendChild(sec);
      });
      // @ts-ignore
      html2pdf().from(printable).set({ margin:10, filename: `${sanitizeFilename(els.projectName.value)}.pdf`, image:{type:'jpeg',quality:0.98}, html2canvas:{scale:2,useCORS:true}, jsPDF:{unit:'mm',format:'a4',orientation:'portrait'} }).save()
        .then(()=>{ toast('Exportado com sucesso', 'success'); setStatus('exportado'); })
        .catch(()=> toast('Falha ao exportar', 'error'));
    } catch (e) {
      console.error(e); toast('Erro ao carregar exportador PDF', 'error');
    }
  }
  function exportMarkdown() {
    if (!state.blocks.length) return toast('Nada para exportar', 'warn');
    const lines = [];
    lines.push(`# ${els.projectName.value} — ${state.currentFramework || 'IdeiaHub'}`, '');
    state.blocks.forEach(b => { lines.push(`## ${b.title}`, '', (b.content || '').trim(), ''); });
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = `${sanitizeFilename(els.projectName.value)}.md`; a.click(); URL.revokeObjectURL(url);
    toast('Markdown exportado', 'success');
  }

  // Projects modal
  async function showProjectsModal() {
    const list = await listProjects();
    const body = document.createElement('div'); body.className = 'projects-list';
    if (!list.length) body.innerHTML = `<div style="color:var(--muted)">Nenhum projeto salvo ainda.</div>`;
    else list.forEach(p => {
      const card = document.createElement('div'); card.className = 'project-card';
      const left = document.createElement('div');
      left.innerHTML = `<strong>${escapeHtml(p.name)}</strong>
        <div class="project-meta"><span>${p.framework || 'Sem framework'}</span><span>•</span><span>${new Date(p.updatedAt).toLocaleString()}</span></div>`;
      const actions = document.createElement('div'); actions.className = 'project-actions';
      const openBtn = document.createElement('button'); openBtn.className = 'btn'; openBtn.innerHTML = `<i data-feather="folder-open" class="icon"></i>Abrir`;
      openBtn.addEventListener('click', async ()=> {
        const proj = await getProject(p.id);
        if (proj) {
          state.currentProjectId = proj.id; state.currentFramework = proj.framework || ""; state.currentTemplate = proj.template || "";
          state.blocks = (proj.blocks || []).map((b, idx)=> ({ ...b, order: b.order ?? idx }));
          els.projectName.value = proj.name || "Projeto";
          renderBlocks(); setStatus('carregado'); toast('Projeto carregado', 'success'); closeModal();
        }
      });
      const delBtn = document.createElement('button'); delBtn.className = 'btn danger'; delBtn.innerHTML = `<i data-feather="trash-2" class="icon"></i>Deletar`;
      delBtn.addEventListener('click', ()=> { closeModal(); confirmModal('Deletar projeto?', `Tem certeza que deseja deletar "${p.name}"?`, async () => { await deleteProject(p.id); toast('Projeto deletado', 'success'); }); });
      actions.appendChild(openBtn); actions.appendChild(delBtn);
      card.appendChild(left); card.appendChild(actions); body.appendChild(card);
    });
    openModal('Meus Projetos', body, [{ label: 'Fechar', icon: 'x', onClick: closeModal }]);
    window.feather?.replace();
  }

  // Premium (visual)
  function showHypothesisModal() {
    const body = document.createElement('div'); body.className = 'checklist';
    body.innerHTML = `
      <div class="check-item"><input type="checkbox" disabled /><div><strong>Você validou esse problema com usuários reais?</strong><div style="color:var(--muted)">Converse com ao menos 5 pessoas do público-alvo.</div></div></div>
      <div class="check-item"><input type="checkbox" disabled /><div><strong>O que torna sua solução melhor?</strong><div style="color:var(--muted)">Liste 3 diferenciais claros.</div></div></div>
      <div class="check-item"><input type="checkbox" disabled /><div><strong>Qual canal inicial para o MVP?</strong><div style="color:var(--muted)">Escolha 1 canal para concentrar esforços.</div></div></div>
      <div class="check-item"><input type="checkbox" disabled /><div><strong>Como você medirá sucesso?</strong><div style="color:var(--muted)">Defina uma métrica simples e clara.</div></div></div>
      <div class="locked" style="height: 80px; border:1px dashed var(--border); border-radius:12px; display:grid; place-items:center; color:var(--muted);">Checklist interativo</div>
    `;
    openModal('Testar Hipótese (Premium)', body, [
      { label: 'Saiba mais', icon: 'star', onClick: ()=> toast('Recurso Premium em breve', 'warn') },
      { label: 'Fechar', icon: 'x', onClick: closeModal },
    ]);
  }

  // UI actions
  document.getElementById('saveBtn').addEventListener('click', saveProject);
  document.getElementById('exportPdfBtn').addEventListener('click', exportPDF);
  document.getElementById('exportMdBtn').addEventListener('click', exportMarkdown);
  document.getElementById('exportBtn').addEventListener('click', ()=> { saveProject().then(()=> toast('Export JSON pronto', 'success')); });
  document.getElementById('exportBtnSidebar').addEventListener('click', exportPDF);
  document.getElementById('resetTemplateBtn').addEventListener('click', ()=> {
    if (!state.currentFramework) return toast('Selecione um framework primeiro', 'warn');
    confirmModal('Recarregar Framework?', 'Isso limpa os conteúdos inseridos. Deseja continuar?', ()=> { loadFramework(state.currentFramework); });
  });
  document.getElementById('addBlockBtn').addEventListener('click', ()=> {
    const order = state.blocks.length ? Math.max(...state.blocks.map(b=> b.order ?? 0)) + 1 : 0;
    state.blocks.push({ id: crypto.randomUUID(), title: "Novo Bloco", hint: "", content: "", span: 6, order });
    state.dirty = true; renderBlocks(); setStatus('editando'); autoSave();
  });
  document.getElementById('newProjectBtn').addEventListener('click', ()=> newProject(true));
  document.getElementById('myProjectsBtn').addEventListener('click', showProjectsModal);
  document.getElementById('premiumBtnSidebar').addEventListener('click', ()=> toast('Recursos Premium em breve', 'warn'));
  document.getElementById('deleteProjectBtn').addEventListener('click', async ()=> {
    if (!state.currentProjectId) return toast('Nenhum projeto carregado', 'warn');
    confirmModal('Deletar projeto?', 'Essa ação não pode ser desfeita.', async ()=> { await deleteProject(state.currentProjectId); newProject(); toast('Projeto deletado', 'success'); });
  });

  els.frameworkSelect.addEventListener('change', (e)=> {
    const name = e.target.value;
    if (!name) return;
    if (state.dirty) confirmModal('Trocar framework?', 'Você possui alterações não salvas. Continuar?', ()=> loadFramework(name));
    else loadFramework(name);
  });
  els.templateSelect.addEventListener('change', (e)=> {
    const name = e.target.value;
    if (!name) return;
    if (!state.currentFramework) { toast('Selecione um framework antes do template', 'warn'); e.target.value=''; return; }
    applyTemplate(name);
  });
  els.projectName.addEventListener('input', ()=> { state.dirty = true; setStatus('editando'); autoSave(); });

  // atalhos
  document.addEventListener('keydown', (e) => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 's') { e.preventDefault(); saveProject(); }
    if (mod && e.key.toLowerCase() === 'p') { e.preventDefault(); exportPDF(); }
    if (mod && e.key.toLowerCase() === 'b') { e.preventDefault(); document.getElementById('addBlockBtn').click(); }
    if (e.key === 'Escape' && document.getElementById('modalBackdrop').style.display === 'flex') closeModal();
  });

  // before unload
  window.addEventListener('beforeunload', (e) => { if (state.dirty) { e.preventDefault(); e.returnValue = ''; } });

  function newProject(withConfirm=false) {
    const proceed = () => {
      state.currentProjectId = null; state.currentFramework = ""; state.currentTemplate = "";
      state.blocks = []; state.dirty = false; els.projectName.value = "Novo Projeto";
      setStatus('novo'); renderBlocks();
    };
    if (withConfirm && state.dirty) confirmModal("Descartar alterações?", "Iniciar novo projeto pode descartar alterações não salvas.", proceed);
    else proceed();
  }

  // Init
  (async function init() {
    await openDB();
    setStatus('pronto');
    populateSelectors();
    window.feather?.replace();
    // SW
    if ('serviceWorker' in navigator) {
      try { await navigator.serviceWorker.register('./sw.js'); } catch {}
    }
  })();
}