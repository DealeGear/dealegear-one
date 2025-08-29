// ------------------ Modelos ------------------
class Projeto {
  constructor({
    id,
    name,
    category,
    templateId,
    fields,
    premiumNotes = {},
    hiddenFields = [], // campos ocultos (customizáveis)
    parentId = null,   // referência para "Nova Versão"
    createdAt = Date.now(),
    updatedAt = Date.now()
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.templateId = templateId;
    this.fields = fields || {};
    this.premiumNotes = premiumNotes;
    this.hiddenFields = hiddenFields;
    this.parentId = parentId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

// ------------------ Estado ------------------
const State = {
  currentId: null,
  premium: false,
  autosaveTimer: null,
  lastSnapshot: null // para checar diffs
};

// ------------------ Elementos ------------------
const els = {};
document.addEventListener('DOMContentLoaded', init);

async function init() {
  cacheEls();
  bindUI();
  await loadTemplates();
  await loadExamples();
  await loadProjectsIntoSelect();
  loadTheme();
  loadPremiumSimulation();
  setPremiumUI();
  addShortcuts();
}

function cacheEls() {
  els.categorySelect = document.getElementById('categorySelect');
  els.templateSelect = document.getElementById('templateSelect');
  els.projectSelect = document.getElementById('projectSelect');
  els.btnNewProject = document.getElementById('btnNewProject');

  els.examplesSelect = document.getElementById('examplesSelect');
  els.btnLoadExample = document.getElementById('btnLoadExample');
  els.btnExportJSON = document.getElementById('btnExportJSON');
  els.inputImportJSON = document.getElementById('inputImportJSON');
  els.simulatePremium = document.getElementById('simulatePremium');

  els.form = document.getElementById('projectForm');
  els.dynamicFields = document.getElementById('dynamicFields');
  els.projName = document.getElementById('projName');
  els.projCategory = document.getElementById('projCategory');
  els.toggleCustomFields = document.getElementById('toggleCustomFields');

  els.btnSave = document.getElementById('btnSave');
  els.btnDelete = document.getElementById('btnDelete');
  els.btnExportPDF = document.getElementById('btnExportPDF');
  els.btnHypothesis = document.getElementById('btnHypothesis');
  els.btnNewVersion = document.getElementById('btnNewVersion');
  els.saveStatus = document.getElementById('saveStatus');

  els.themeToggle = document.getElementById('themeToggle');
  els.premiumBadge = document.getElementById('premiumBadge');

  els.modal = document.getElementById('modal');
  els.modalTitle = document.getElementById('modalTitle');
  els.modalBody = document.getElementById('modalBody');
  els.modalClose = document.getElementById('modalClose');
  els.modalSaveNotes = document.getElementById('modalSaveNotes');

  els.progressBar = document.getElementById('progressBar');
  els.progressText = document.getElementById('progressText');
  els.savingIndicator = document.getElementById('savingIndicator');
}

function bindUI() {
  els.templateSelect.addEventListener('change', onTemplateChange);
  els.btnNewProject.addEventListener('click', newProjectFlow);
  els.projectSelect.addEventListener('change', onProjectSelect);

  els.btnSave.addEventListener('click', saveCurrent);
  els.btnDelete.addEventListener('click', deleteCurrent);
  els.btnExportPDF.addEventListener('click', exportPDF);
  els.btnHypothesis.addEventListener('click', onHypothesisClick);
  els.btnNewVersion.addEventListener('click', createNewVersion);

  els.form.addEventListener('input', scheduleAutoSave);
  els.form.addEventListener('input', updateProgress);

  els.toggleCustomFields.addEventListener('change', onToggleCustomFields);

  els.themeToggle.addEventListener('change', toggleTheme);

  els.btnLoadExample.addEventListener('click', loadExampleSelected);
  els.btnExportJSON.addEventListener('click', exportJSON);
  els.inputImportJSON.addEventListener('change', importJSON);

  // Modal
  els.modalClose.addEventListener('click', closeModal);
  els.modal.addEventListener('click', (e) => { if (e.target === els.modal) closeModal(); });
  els.modalSaveNotes.addEventListener('click', savePremiumNotes);
}

function addShortcuts() {
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      saveCurrent();
    }
    if (e.key === 'Escape' && !els.modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// ------------------ Templates e Exemplos ------------------
async function loadTemplates() {
  Templates.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.name;
    els.templateSelect.appendChild(opt);
  });
}

async function loadExamples() {
  Examples.forEach((ex, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = ex.name;
    els.examplesSelect.appendChild(opt);
  });
}

function loadPremiumSimulation() {
  const sim = localStorage.getItem('ih_sim_premium') === '1';
  State.premium = sim;
  els.simulatePremium.checked = sim;
  els.simulatePremium.addEventListener('change', () => {
    const v = els.simulatePremium.checked;
    localStorage.setItem('ih_sim_premium', v ? '1' : '0');
    State.premium = v;
    setPremiumUI();
  });
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

// ------------------ Projetos ------------------
async function loadProjectsIntoSelect(selectedId = '') {
  const list = await DB.getAll('projects');
  list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  els.projectSelect.innerHTML = `<option value="">Novo projeto…</option>`;
  list.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    const versionTag = p.parentId ? ' (versão)' : '';
    opt.textContent = `${p.name || 'Sem nome'}${versionTag} — ${new Date(p.updatedAt).toLocaleDateString()}`;
    els.projectSelect.appendChild(opt);
  });
  els.projectSelect.value = selectedId || '';
}

function onTemplateChange() {
  const t = getTemplateById(els.templateSelect.value);
  renderTemplateFields(t);
  updateProgress();
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
    block.dataset.key = f.key;

    const label = document.createElement('label');
    label.setAttribute('for', `f_${f.key}`);
    label.innerHTML = `${f.label} ${f.tip ? `<span class="tooltip" title="${escapeHtml(f.tip)}">💡</span>` : ''}`;

    const fieldActions = document.createElement('div');
    fieldActions.className = 'field-actions hidden';
    const hideBtn = document.createElement('button');
    hideBtn.type = 'button';
    hideBtn.className = 'icon-btn';
    hideBtn.title = 'Ocultar campo neste projeto';
    hideBtn.textContent = '👁️‍🗨️';
    hideBtn.addEventListener('click', () => toggleFieldVisibility(f.key));
    fieldActions.appendChild(hideBtn);

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
    input.setAttribute('aria-label', f.label);
    input.addEventListener('input', scheduleAutoSave);

    block.appendChild(fieldActions);
    block.appendChild(label);
    block.appendChild(input);
    els.dynamicFields.appendChild(block);
  });

  if (State.currentId) fillFormFromProjectId(State.currentId, { skipTemplateRender: true });
  applyCustomFieldsUI();
}

function applyCustomFieldsUI() {
  const enabled = els.toggleCustomFields.checked;
  els.dynamicFields.querySelectorAll('.field-actions').forEach(el => {
    el.classList.toggle('hidden', !enabled);
  });
}

function toggleFieldVisibility(key) {
  if (!State.currentId) return;
  DB.get('projects', State.currentId).then(p => {
    if (!p) return;
    const hidden = new Set(p.hiddenFields || []);
    if (hidden.has(key)) {
      hidden.delete(key);
    } else {
      hidden.add(key);
    }
    p.hiddenFields = Array.from(hidden);
    p.updatedAt = Date.now();
    DB.put('projects', p).then(async () => {
      await loadProjectsIntoSelect(p.id);
      updateHiddenFieldsUI(p.hiddenFields);
      toast(hidden.has(key) ? 'Campo oculto.' : 'Campo visível.', 'ok');
    });
  });
}

function updateHiddenFieldsUI(hidden = []) {
  els.dynamicFields.querySelectorAll('.block').forEach(b => {
    const key = b.dataset.key;
    const isHidden = hidden.includes(key);
    b.style.display = isHidden ? 'none' : '';
  });
}

function onToggleCustomFields() {
  applyCustomFieldsUI();
}

function newProjectFlow() {
  const category = els.categorySelect.value || '';
  const templateId = els.templateSelect.value || '';
  if (!templateId) {
    toast('Selecione um template antes de criar o projeto.', 'err');
    return;
  }
  const id = randomId();
  State.currentId = id;
  const p = new Projeto({ id, name: 'Novo Projeto', category, templateId, fields: {} });
  els.projName.value = '';
  els.projCategory.value = category;
  const t = getTemplateById(templateId);
  renderTemplateFields(t);
  Array.from(els.dynamicFields.querySelectorAll('input, textarea, select')).forEach(el => el.value = '');
  State.lastSnapshot = snapshotForm();
  toast('Projeto iniciado. Preencha os campos e clique em Salvar.', 'ok');
  loadProjectsIntoSelect('');
  updateProgress();
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
  try {
    const data = collectFormData();
    if (!data.templateId) return toast('Selecione um template.', 'err');
    if (!data.name || data.name.length < 3) return toast('Informe um nome de projeto (>=3 caracteres).', 'err');

    showSaving(true);

    const existing = await DB.get('projects', data.id);
    const proj = new Projeto({
      id: data.id,
      name: data.name,
      category: data.category,
      templateId: data.templateId,
      fields: data.fields,
      premiumNotes: (await DB.get('meta', `notes:${data.id}`))?.value || {},
      hiddenFields: existing?.hiddenFields || [],
      parentId: existing?.parentId || null,
      createdAt: existing?.createdAt || Date.now(),
      updatedAt: Date.now()
    });

    await DB.put('projects', proj);
    State.currentId = proj.id;
    State.lastSnapshot = snapshotForm();
    await loadProjectsIntoSelect(proj.id);
    toast('Projeto salvo com sucesso.', 'ok');
  } catch (err) {
    console.error(err);
    toast('Erro ao salvar. Tente novamente.', 'err');
  } finally {
    showSaving(false);
    updateProgress();
  }
}

async function fillFormFromProjectId(id, { skipTemplateRender = false } = {}) {
  const p = await DB.get('projects', id);
  if (!p) return;
  State.currentId = p.id;

  els.projName.value = p.name || '';
  els.projCategory.value = p.category || '';
  els.categorySelect.value = p.category || '';
  els.templateSelect.value = p.templateId || '';

  const template = getTemplateById(p.templateId);
  if (!skipTemplateRender) renderTemplateFields(template);
  // Preenche valores
  Object.entries(p.fields || {}).forEach(([k, v]) => {
    const el = document.getElementById(`f_${k}`);
    if (el) el.value = v;
  });
  updateHiddenFieldsUI(p.hiddenFields || []);
  State.lastSnapshot = snapshotForm();
  updateProgress();
}

async function onProjectSelect() {
  const id = els.projectSelect.value;
  if (!id) {
    State.currentId = null;
    els.form.reset();
    els.dynamicFields.innerHTML = '';
    updateProgress();
    toast('Crie um novo projeto ou selecione um existente.', 'ok');
    return;
  }
  await fillFormFromProjectId(id);
  toast('Projeto carregado para edição.', 'ok');
}

async function deleteCurrent() {
  if (!State.currentId) return toast('Nenhum projeto selecionado.', 'err');
  const confirmText = prompt('Para confirmar a exclusão, digite o nome do projeto:');
  const p = await DB.get('projects', State.currentId);
  if (!p) return;
  if (confirmText !== p.name) {
    toast('Exclusão cancelada. O nome não confere.', 'err');
    return;
  }
  await DB.delete('projects', State.currentId);
  await DB.delete('meta', `notes:${State.currentId}`);
  State.currentId = null;
  els.form.reset();
  els.dynamicFields.innerHTML = '';
  await loadProjectsIntoSelect('');
  updateProgress();
  toast('Projeto excluído com sucesso.', 'ok');
}

function scheduleAutoSave() {
  clearTimeout(State.autosaveTimer);
  const current = snapshotForm();
  if (JSON.stringify(current) === JSON.stringify(State.lastSnapshot)) {
    return; // nada mudou
  }
  showSaving(true);
  State.autosaveTimer = setTimeout(() => {
    saveCurrent();
  }, 700);
}

function snapshotForm() {
  const data = collectFormData();
  return { name: data.name, category: data.category, templateId: data.templateId, fields: data.fields };
}

function showSaving(on) {
  els.savingIndicator.classList.toggle('show', !!on);
}

function updateProgress() {
  const t = getTemplateById(els.templateSelect.value);
  if (!t) {
    els.progressBar.style.width = '0%';
    els.progressText.textContent = '0% preenchido';
    return;
  }
  const inputs = t.fields.map(f => document.getElementById(`f_${f.key}`)).filter(Boolean);
  const total = inputs.length;
  const filled = inputs.filter(el => (el.value || '').trim().length > 0).length;
  const pct = total ? Math.round((filled / total) * 100) : 0;
  els.progressBar.style.width = `${pct}%`;
  els.progressText.textContent = `${pct}% preenchido`;
}

// ------------------ Nova Versão ------------------
async function createNewVersion() {
  if (!State.currentId) return toast('Abra/salve um projeto antes de criar nova versão.', 'err');
  const base = await DB.get('projects', State.currentId);
  if (!base) return;
  const id = randomId();
  const clone = new Projeto({
    id,
    name: `${base.name} — v${getNextVersionNumber(base.name)}`,
    category: base.category,
    templateId: base.templateId,
    fields: { ...base.fields },
    premiumNotes: {}, // nova versão começa limpa
    hiddenFields: [...(base.hiddenFields || [])],
    parentId: base.parentId || base.id, // vincula à raiz
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  await DB.put('projects', clone);
  await loadProjectsIntoSelect(clone.id);
  await fillFormFromProjectId(clone.id);
  toast('Nova versão criada.', 'ok');
}

function getNextVersionNumber(name) {
  const match = name.match(/v(\d+)$/i);
  if (match) return parseInt(match[1], 10) + 1;
  return 2;
}

// ------------------ Exemplos ------------------
async function loadExampleSelected() {
  const idx = els.examplesSelect.value;
  if (idx === '') {
    toast('Selecione um exemplo.', 'err');
    return;
  }
  const ex = Examples[Number(idx)];
  if (!ex) return;
  const id = randomId();
  const proj = new Projeto({
    id,
    name: ex.name,
    category: ex.category,
    templateId: ex.templateId,
    fields: ex.fields
  });
  await DB.put('projects', proj);
  await loadProjectsIntoSelect(id);
  await fillFormFromProjectId(id);
  toast('Exemplo carregado.', 'ok');
}

// ------------------ Exportar/Importar JSON ------------------
async function exportJSON() {
  try {
    const projects = await DB.getAll('projects');
    const meta = await DB.getAll('meta');
    const payload = { version: 1, exportedAt: new Date().toISOString(), projects, meta };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ideiahub_backup.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('Backup JSON exportado.', 'ok');
  } catch (e) {
    console.error(e);
    toast('Falha ao exportar JSON.', 'err');
  }
}

async function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data || !Array.isArray(data.projects) || !Array.isArray(data.meta)) {
      throw new Error('Formato inválido');
    }
    // Importa sobrescrevendo IDs existentes
    for (const p of data.projects) await DB.put('projects', p);
    for (const m of data.meta) await DB.put('meta', m);
    await loadProjectsIntoSelect('');
    toast('Importação concluída.', 'ok');
  } catch (err) {
    console.error(err);
    toast('Falha ao importar JSON.', 'err');
  } finally {
    e.target.value = '';
  }
}

// ------------------ PDF ------------------
async function exportPDF() {
  const data = collectFormData();
  const template = getTemplateById(data.templateId);
  if (!template) return toast('Selecione um template para exportar.', 'err');

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40;
  let y = margin;

  // Cabeçalho
  doc.setFont('helvetica', 'bold'); doc.setFontSize(18);
  doc.text(`IdeiaHub — ${data.name}`, margin, y); y += 20;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
  doc.text(`Categoria: ${data.category || '-'}`, margin, y); y += 14;
  doc.text(`Template: ${template.name}`, margin, y); y += 18;

  // Sumário simples
  doc.setFont('helvetica', 'bold'); doc.text('Seções', margin, y); y += 14;
  doc.setFont('helvetica', 'normal');
  template.fields.forEach((f, i) => {
    doc.text(`${i+1}. ${f.label}`, margin, y); y += 12;
  });
  y += 6;
  if (y > 760) { doc.addPage(); y = margin; }

  // Conteúdo
  template.fields.forEach((f, idx) => {
    const label = f.label;
    const value = (data.fields[f.key] || '').trim() || '-';
    y += 12;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
    doc.text(`${idx+1}. ${label}`, margin, y);
    y += 12;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
    const text = doc.splitTextToSize(value, 520);
    text.forEach(line => {
      if (y > 760) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += 14;
    });
  });

  // Rodapé com numeração
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(120,120,120);
    doc.text(`IdeiaHub — Transforme ideias em projetos.`, margin, 820);
    doc.text(`Página ${i} de ${pageCount}`, 520, 820);
  }

  doc.save(`IdeiaHub_${sanitizeFilename(data.name)}.pdf`);
  toast('PDF gerado com sucesso.', 'ok');
}

// ------------------ Premium ------------------
function onHypothesisClick() {
  if (!State.premium) {
    toast('Recurso Premium. Ative a simulação para testar.', 'err');
    return;
  }
  openChecklistModal();
}

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
    area.rows = 3; area.id = `chk_${q.key}`; area.value = existing[q.key] || '';
    wrap.appendChild(label); wrap.appendChild(area);
    els.modalBody.appendChild(wrap);
  });
  els.modal.classList.remove('hidden');
}

function closeModal() { els.modal.classList.add('hidden'); }
async function savePremiumNotes() {
  const projId = State.currentId;
  if (!projId) return;
  const notes = {};
  els.modalBody.querySelectorAll('textarea').forEach(a => {
    const key = a.id.replace('chk_', ''); notes[key] = a.value.trim();
  });
  await DB.put('meta', { key: `notes:${projId}`, value: notes, updatedAt: Date.now() });
  toast('Notas salvas.', 'ok'); closeModal();
}

// ------------------ Tema ------------------
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

// ------------------ Utilidades ------------------
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