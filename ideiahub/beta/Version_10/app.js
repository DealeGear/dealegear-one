import { state } from './state.js';
import { openDB } from './db.js';
import { setStatus } from './ui.js';
import { registerListeners } from './eventHandlers.js';

// Load initial
document.addEventListener('DOMContentLoaded', async () => {
  // AQUI: Chamada inicial para renderizar todos os ícones estáticos.
  feather.replace();

  document.body.setAttribute('data-theme', state.theme);
  registerListeners();
  await openDB();
  setStatus('pronto');
});