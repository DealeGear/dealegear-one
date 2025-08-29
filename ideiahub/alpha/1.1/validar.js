const blocks = [
  {
    title: 'Criar Landing Page',
    hint: 'Descreva sua proposta e inclua um formulário de interesse.',
    content: 'Ferramentas: Carrd, Notion, Super. Indicador: taxa de conversão de visitas para leads.',
    span: 12
  },
  {
    title: 'Roteiro de Entrevista com Usuários',
    hint: 'Liste 8–12 perguntas abertas para explorar problema e contexto.',
    content: 'Evite enviesamento. Foque em experiências recentes e alternativas usadas hoje.',
    span: 12
  },
  {
    title: 'Usar Redes Sociais para Validação',
    hint: 'Publicar em grupos/comunidades do nicho e medir interesse.',
    content: 'A/B de mensagem. Métrica: comentários, DMs, cliques.',
    span: 6
  },
  {
    title: 'Anúncio Teste',
    hint: 'Rodar anúncio simples para medir CTR e interesse.',
    content: 'Google Ads ou Meta Ads. Página com call-to-action clara.',
    span: 6
  },
  {
    title: 'MVP Manual',
    hint: 'Executar manualmente o serviço para validar valor antes de automatizar.',
    content: 'Documentar processo, tempos e gargalos. Coletar feedback.',
    span: 12
  }
];

document.addEventListener('DOMContentLoaded', () => {
  if (window.feather?.replace) feather.replace();
  applyTheme(localStorage.getItem('ideiahub.theme') || 'dark');
  renderValBlocks();
  bindValEvents();
});

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('ideiahub.theme', t);
}

function bindValEvents() {
  document.getElementById('btnBack').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  document.getElementById('themeToggleVal').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    toast('Tema alternado', 'success');
    if (window.feather?.replace) feather.replace();
  });
}

function renderValBlocks() {
  const container = document.getElementById('valBlocks');
  container.innerHTML = '';
  blocks.forEach(b => {
    const div = document.createElement('div');
    div.className = `block grid-${b.span || 6}`;
    div.innerHTML = `
      <span class="pin">Validação</span>
      <h4>${b.title}</h4>
      <div class="hint">${b.hint || ''}</div>
      <div class="content" contenteditable="true">${escapeHtml(b.content || '')}</div>
    `;
    container.appendChild(div);
  });
  if (window.feather?.replace) feather.replace();
}

function escapeHtml(txt) { const d = document.createElement('div'); d.textContent = txt || ''; return d.innerHTML; }

function toast(msg, type='') {
  const el = document.createElement('div');
  el.className = `toast-item ${type}`;
  const icon = type==='error'?'alert-triangle': type==='success'?'check': type==='warn'?'alert-circle':'info';
  el.innerHTML = `<i data-feather="${icon}" class="icon"></i><span>${msg}</span>`;
  document.getElementById('toast').appendChild(el);
  if (window.feather?.replace) feather.replace();
  setTimeout(()=> { el.style.opacity='0'; setTimeout(()=> el.remove(), 250); }, 2500);
}