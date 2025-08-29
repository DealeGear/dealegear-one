// Modelos
class Projeto {
  constructor({
    id,
    name,
    category,
    templateId,
    fields,
    premiumNotes = {},
    createdAt = Date.now(),
    updatedAt = Date.now()
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.templateId = templateId;
    this.fields = fields || {}; // { key: value }
    this.premiumNotes = premiumNotes; // checklist/notes
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

// Estado
const State = {
  currentId: null,
  premium: false, // plano atual: false = free
  autosaveTimer: null
};

// Elementos
const els = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
  cacheEls();
  bindUI();
  await loadTemplates();
  await loadProjectsIntoSelect();
  loadTheme();
  setPremiumUI();
}

function cacheEls() {
  els.categorySelect = document.getElementById('categorySelect');
  els.templateSelect = document.getElementById('templateSelect');
  els.projectSelect = document.getElementById('projectSelect');
  els.btnNewProject = document.getElementById('btnNewProject');

  els.form = document.getElementById('projectForm');
  els.dynamicFields = document.getElementById('dynamicFields');
  els.projName = document.getElementById('projName');
  els.projCategory = document.getElementById('projCategory');

  els.btnSave = document.getElementById('btnSave');
  els.btnDelete = document.getElementById('btnDelete');
  els.btnExportPDF = document.getElementById('btnExportPDF');
  els.btnHypothesis = document.getElementById('btnHypothesis');
  els.saveStatus = document.getElementById('saveStatus');

  els.themeToggle = document.getElementById('themeToggle');
  els.premiumBadge = document.getElementById('premiumBadge');

  els.modal = document.getElementById('modal');
  els.modalTitle = document.getElementById('modalTitle');
  els.modalBody = document.getElementById('modalBody');
  els.modalClose = document.getElementById('modalClose');
  els.modalSaveNotes = document.getElementById('modalSaveNotes');
}

function bindUI() {
  els.templateSelect.addEventListener('change', onTemplateChange);
  els.btnNewProject.addEventListener('click', newProjectFlow);
  els.projectSelect.addEventListener('change', onProjectSelect);

  els.btnSave.addEventListener('click', saveCurrent);
  els.btnDelete.addEventListener('click', deleteCurrent);
  els.btnExportPDF.addEventListener('click', exportPDF);
  els.btnHypothesis.addEventListener('click', onHypothesisClick);

  els.form.addEventListener('input', scheduleAutoSave);

  els.themeToggle.addEventListener('change', toggleTheme);

  // Modal
  els.modalClose.addEventListener('click', closeModal);
  els.modal.addEventListener('click', (e) => {
    if (e.target === els.modal) closeModal();
  });
  els.modalSaveNotes.addEventListener('click', savePremiumNotes);
}

async function loadTemplates() {
  // Preencher combo de templates
  Templates.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.name;
    els.templateSelect.appendChild(opt);
  });
}

async function loadProjectsIntoSelect(selectedId = '') {
  const list = await DB.getAll('projects');
  // ordenar por updatedAt desc
  list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  els.projectSelect.innerHTML = `<option value="">Novo projeto…</option>`;
  list.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name || 'Sem nome'} — ${new Date(p.updatedAt).toLocaleDateString()}`;
    els.projectSelect.appendChild(opt);
  });
  if (selectedId) {
    els.projectSelect.value = selectedId;
  } else {
    els.projectSelect.value = '';
  }
}

function onTemplateChange() {
  const t = getTemplateById(els.templateSelect.value);
  renderTemplateFields(t);
}

function renderTemplateFields(template) {
  els.dynamicFields.innerHTML = '';
  if (!template) return;
  // Ajuda do template
  const help = document.createElement('div');
  help.className = 'help';
  help.innerHTML = `<span class="tooltip" title="${escapeHtml(template.help)}">Dica do template:</span> ${escapeHtml(template.help)}`;
  els.dynamicFields.appendChild(help);

  template.fields.forEach(f => {
    const block = document.createElement('div');
    block.className = 'block';

    const label = document.createElement('label');
    label.setAttribute('for', `f_${f.key}`);
    label.innerHTML = `${f.label} ${f.tip ? `<span class="tooltip" title="${escapeHtml(f.tip)}">💡</span>` : ''}`;

    let input;
    if (f.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 4;
    } else if (f.type === 'select') {
      input = document.createElement('select');
      (f.options || []).forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.value || o;
        opt.textContent = o.label || o;
        input.appendChild(opt);
      });
    } else {
      input = document.createElement('input');
      input.type = f.type || 'text';
    }
    input.id = `f_${f.key}`;
    input.name = f.key;
    input.placeholder = f.placeholder || '';
    input.addEventListener('input', scheduleAutoSave);

    block.appendChild(label);
    block.appendChild(input);
    els.dynamicFields.appendChild(block);
  });

  // Se já há projeto aberto, preencher campos
  if (State.currentId) {
    fillFormFromProjectId(State.currentId);
  }
}

function newProjectFlow() {
  // Usa categoria e template selecionados como base
  const category = els.categorySelect.value || '';
  const templateId = els.templateSelect.value || '';
  if (!templateId) {
    toast('Selecione um template antes de criar o projeto.', 'err');
    return;
  }
  const id = randomId();
  State.currentId = id;

  const p = new Projeto({
    id,
    name: els.projName.value.trim() || 'Novo Projeto',
    category,
    templateId,
    fields: {}
  });
  // Renderiza campos do template atual
  const t = getTemplateById(templateId);
  renderTemplateFields(t);

  // Limpa campos e preenche categoria
  els.projName.value = '';
  els.projCategory.value = category;

  // Limpa valores dos campos dinâmicos
  Array.from(els.dynamicFields.querySelectorAll('input, textarea, select')).forEach(el => el.value = '');

  toast('Projeto iniciado. Preencha os campos e clique em Salvar.', 'ok');
  // Atualiza seleção de projeto
  loadProjectsIntoSelect('');
}

function collectFormData() {
  const templateId = els.templateSelect.value;
  const entries = {};
  els.dynamicFields.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.name) entries[el.name] = el.value.trim();
  });
  return {
    id: State.currentId || randomId(),
    name: els.projName.value.trim() || 'Sem nome',
    category: els.projCategory.value.trim() || (els.categorySelect.value || ''),
    templateId,
    fields: entries
  };
}

async function saveCurrent() {
  const data = collectFormData();

  // Validação básica
  if (!data.templateId) return toast('Selecione um template.', 'err');
  if (!data.name || data.name.length < 3) return toast('Informe um nome de projeto (>=3 caracteres).', 'err');

  const proj = new Projeto({
    id: data.id,
    name: data.name,
    category: data.category,
    templateId: data.templateId,
    fields: data.fields,
    premiumNotes: (await DB.get('meta', `notes:${data.id}`))?.value || {},
    createdAt: (await DB.get('projects', data.id))?.createdAt || Date.now(),
    updatedAt: Date.now()
  });

  await DB.put('projects', proj);
  State.currentId = proj.id;
  await loadProjectsIntoSelect(proj.id);
  toast('Projeto salvo com sucesso.', 'ok');
}

async function fillFormFromProjectId(id) {
  const p = await DB.get('projects', id);
  if (!p) return;

  State.currentId = p.id;
  els.projName.value = p.name || '';
  els.projCategory.value = p.category || '';
  els.categorySelect.value = p.category || '';
  els.templateSelect.value = p.templateId || '';
  // Renderiza campos template atual
  const template = getTemplateById(p.templateId);
  renderTemplateFields(template);

  // Preenche campos dinâmicos após render
  Object.entries(p.fields || {}).forEach(([k, v]) => {
    const el = document.getElementById(`f_${k}`);
    if (el) el.value = v;
  });
}

async function onProjectSelect() {
  const id = els.projectSelect.value;
  if (!id) {
    State.currentId = null;
    els.form.reset();
    els.dynamicFields.innerHTML = '';
    toast('Crie um novo projeto ou selecione um existente.', 'ok');
    return;
  }
  await fillFormFromProjectId(id);
  toast('Projeto carregado para edição.', 'ok');
}

async function deleteCurrent() {
  if (!State.currentId) {
    toast('Nenhum projeto selecionado.', 'err');
    return;
  }
  const ok = confirm('Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.');
  if (!ok) return;

  await DB.delete('projects', State.currentId);
  await DB.delete('meta', `notes:${State.currentId}`);
  const deletedId = State.currentId;
  State.currentId = null;
  els.form.reset();
  els.dynamicFields.innerHTML = '';
  await loadProjectsIntoSelect('');
  toast('Projeto excluído com sucesso.', 'ok');
  // Evita manter template antigo selecionado se era específico do projeto deletado
}

function scheduleAutoSave() {
  clearTimeout(State.autosaveTimer);
  State.autosaveTimer = setTimeout(() => {
    if (!State.currentId && !els.templateSelect.value) return; // nada a salvar
    saveCurrent();
  }, 800);
}

async function exportPDF() {
  // Coleta dados atuais do formulário (sem obrigar salvar)
  const data = collectFormData();
  const template = getTemplateById(data.templateId);
  if (!template) return toast('Selecione um template para exportar.', 'err');

  // jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40;
  let y = margin;

  // Cabeçalho
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(`IdeiaHub — ${data.name}`, margin, y); y += 22;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Categoria: ${data.category || '-'}`, margin, y); y += 16;
  doc.text(`Template: ${template.name}`, margin, y); y += 18;

  // Conteúdo
  template.fields.forEach(f => {
    const label = f.label;
    const value = (data.fields[f.key] || '').trim() || '-';
    y += 14;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
    doc.text(label, margin, y);
    y += 14;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(11);

    const text = doc.splitTextToSize(value, 520);
    text.forEach(line => {
      if (y > 760) { // nova página
        doc.addPage(); y = margin;
      }
      doc.text(line, margin, y);
      y += 14;
    });
  });

  // Rodapé com logo/assinatura
  const footerY = 820;
  doc.setFontSize(10);
  doc.setTextColor(120,120,120);
  doc.text('IdeiaHub — Transforme ideias em projetos. https://', margin, footerY);

  doc.save(`IdeiaHub_${sanitizeFilename(data.name)}.pdf`);
  toast('PDF gerado com sucesso.', 'ok');
}

function onHypothesisClick() {
  if (!State.premium) {
    toast('Recurso Premium. Em breve!', 'err');
    return;
  }
  openChecklistModal();
}

function setPremiumUI() {
  els.premiumBadge.textContent = State.premium ? 'Premium' : 'Free';
  if (State.premium) {
    els.btnHypothesis.classList.remove('premium-locked');
    els.btnHypothesis.classList.add('success');
    els.btnHypothesis.style.cursor = 'pointer';
  } else {
    els.btnHypothesis.classList.add('premium-locked');
    els.btnHypothesis.classList.remove('success');
    els.btnHypothesis.style.cursor = 'not-allowed';
  }
}

// Modal Premium (Checklist)
async function openChecklistModal() {
  const projId = State.currentId;
  if (!projId) return toast('Abra/salve um projeto antes de testar hipóteses.', 'err');

  els.modalTitle.textContent = 'Checklist de Validação de Hipóteses';
  const existing = (await DB.get('meta', `notes:${projId}`))?.value || {};

  const questions = [
    { key: 'q1', text: 'Esse problema é realmente sentido pelo público selecionado?' },
    { key: 'q2', text: 'Você já entrevistou pelo menos 5 pessoas do público-alvo?' },
    { key: 'q3', text: 'Existe disposição a pagar/usar sua solução?' },
    { key: 'q4', text: 'Há alternativas atuais (concorrentes) e como você se diferencia?' },
    { key: 'q5', text: 'Qual suposição mais arriscada do seu modelo?' },
    { key: 'q6', text: 'Qual experimento simples você pode rodar esta semana?' }
  ];
  els.modalBody.innerHTML = '';
  questions.forEach(q => {
    const wrap = document.createElement('div');
    wrap.className = 'field';
    const label = document.createElement('label');
    label.textContent = q.text;

    const area = document.createElement('textarea');
    area.rows = 3;
    area.id = `chk_${q.key}`;
    area.value = existing[q.key] || '';

    wrap.appendChild(label);
    wrap.appendChild(area);
    els.modalBody.appendChild(wrap);
  });

  els.modal.classList.remove('hidden');
}

function closeModal() {
  els.modal.classList.add('hidden');
}

async function savePremiumNotes() {
  const projId = State.currentId;
  if (!projId) return;

  const notes = {};
  els.modalBody.querySelectorAll('textarea').forEach(a => {
    const key = a.id.replace('chk_', '');
    notes[key] = a.value.trim();
  });
  await DB.put('meta', { key: `notes:${projId}`, value: notes, updatedAt: Date.now() });
  toast('Notas salvas.', 'ok');
  closeModal();
}

// Tema
function loadTheme() {
  const ls = localStorage.getItem('ideiahub_theme') || 'dark';
  document.documentElement.classList.toggle('light', ls === 'light');
  els.themeToggle.checked = ls === 'light';
}
function toggleTheme() {
  const isLight = els.themeToggle.checked;
  document.documentElement.classList.toggle('light', isLight);
  localStorage.setItem('ideiahub_theme', isLight ? 'light' : 'dark');
}

// Utilidades
function toast(msg, type='ok') {
  els.saveStatus.textContent = msg;
  els.saveStatus.className = `save-status ${type}`;
  clearTimeout(els._toastTimer);
  els._toastTimer = setTimeout(() => {
    els.saveStatus.textContent = '';
    els.saveStatus.className = 'save-status';
  }, 2500);
}

function randomId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function sanitizeFilename(name) {
  return name.replace(/[^\w\-]+/g, '_').slice(0, 60);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}