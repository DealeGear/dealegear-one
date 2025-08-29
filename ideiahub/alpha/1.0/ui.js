export function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem("ideiahub.theme", theme);
}
export function getTheme() {
  return localStorage.getItem("ideiahub.theme") || "dark";
}

export function setStatus(text, mode) {
  const chip = document.getElementById('statusChip');
  const textEl = document.getElementById('statusText');
  textEl.textContent = text;
  chip.classList.remove('saving', 'saved');
  if (mode === 'saving') chip.classList.add('saving');
  if (mode === 'saved') chip.classList.add('saved');
}

export function toast(msg, type='') {
  const container = document.getElementById('toast');
  const el = document.createElement('div');
  el.className = `toast-item ${type}`;
  el.innerHTML = `<i data-feather="${type==='error'?'alert-triangle': type==='success'?'check': type==='warn'?'alert-circle':'info'}" class="icon"></i><span>${msg}</span>`;
  container.appendChild(el);
  window.feather?.replace();
  setTimeout(()=> { el.style.opacity = '0'; setTimeout(()=> el.remove(), 250); }, 2500);
}

export function openModal(title, bodyNode, actions=[]) {
  const backdrop = document.getElementById('modalBackdrop');
  const modal = document.getElementById('genericModal');
  const titleEl = document.getElementById('modalTitle');
  const bodyEl = document.getElementById('modalBody');
  const actionsEl = document.getElementById('modalActions');
  titleEl.textContent = title;
  bodyEl.innerHTML = '';
  bodyEl.appendChild(bodyNode);
  actionsEl.innerHTML = '';
  actions.forEach(a=>{
    const b = document.createElement('button');
    b.className = `btn ${a.variant||''}`;
    b.innerHTML = a.icon ? `<i data-feather="${a.icon}" class="icon"></i>${a.label}` : a.label;
    b.addEventListener('click', a.onClick);
    actionsEl.appendChild(b);
  });
  window.feather?.replace();
  backdrop.style.display = 'flex';
  backdrop.setAttribute('aria-hidden', 'false');
  const dispose = trapFocus(modal);
  backdrop._disposeFocus = dispose;
  document.addEventListener('keydown', escCloseModal);
  modal.querySelector('button, [href], input, select, textarea')?.focus();
}
export function closeModal() {
  const backdrop = document.getElementById('modalBackdrop');
  backdrop.style.display = 'none';
  backdrop.setAttribute('aria-hidden', 'true');
  if (backdrop._disposeFocus) backdrop._disposeFocus();
  document.removeEventListener('keydown', escCloseModal);
}
function escCloseModal(e){ if (e.key === 'Escape') closeModal(); }

export function trapFocus(container) {
  const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return ()=>{};
  const first = focusable[0], last = focusable[focusable.length - 1];
  function onKey(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  container.addEventListener('keydown', onKey);
  return () => container.removeEventListener('keydown', onKey);
}

export function confirmModal(title, msg, onConfirm) {
  const body = document.createElement('div');
  body.innerHTML = `<p style="color:var(--muted)">${msg}</p>`;
  openModal(title, body, [
    { label: 'Cancelar', icon: 'x', onClick: closeModal },
    { label: 'Confirmar', icon: 'check', variant: 'danger', onClick: ()=> { closeModal(); onConfirm?.(); } },
  ]);
}

export function escapeHtml(txt) {
  const div = document.createElement('div');
  div.textContent = txt || '';
  return div.innerHTML;
}

export function sanitizeText(s) {
  const div = document.createElement('div');
  div.innerHTML = s || '';
  return div.textContent || '';
}

export function sanitizeFilename(name) {
  return (name || 'ideiahub').replace(/[\\/:*?"<>|]+/g,'_').slice(0,80);
}