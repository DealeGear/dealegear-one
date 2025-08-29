import { els } from './state.js';

// UI helpers
export function setStatus(s) {
  els.statusChip.textContent = s;
}

export function toast(msg, type='') {
  const el = document.createElement('div');
  el.className = `toast-item ${type}`;
  el.innerHTML = `<i data-feather="${type==='error'?'alert-triangle': type==='success'?'check': type==='warn'?'alert-circle':'info'}" class="icon"></i><span>${msg}</span>`;
  els.toast.appendChild(el);
  // Chamada após adicionar o toast para renderizar o ícone
  feather.replace(); 
  setTimeout(()=> {
    el.style.opacity = '0';
    setTimeout(()=> el.remove(), 250);
  }, 2500);
}

export function openModal(title, bodyNode, actions=[]) {
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
  // AQUI: A chamada é necessária para renderizar os ícones dos botões do modal
  feather.replace(); 
  els.modalBackdrop.style.display = 'flex';
}

export function closeModal() { els.modalBackdrop.style.display = 'none'; }