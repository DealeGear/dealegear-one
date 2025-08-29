/**

Exportação PDF com html2pdf.js (CDN)
Gera um PDF limpo com logo IdeiaHub e data.
*/
(function(){
// Carrega html2pdf.js dinamicamente
function ensureLib() {
return new Promise((resolve, reject) => {
if (window.html2pdf) return resolve();
const s = document.createElement('script');
s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
s.onload = () => resolve();
s.onerror = () => reject(new Error('Falha ao carregar html2pdf.js'));
document.head.appendChild(s);
});
}
async function exportCanvasToPDF({ title = 'IdeiaHub', container }) {
await ensureLib();


const wrapper = document.createElement('div');
wrapper.style.fontFamily = 'Inter, Arial, sans-serif';
wrapper.style.color = '#111827';

const header = document.createElement('div');
header.style.display = 'flex';
header.style.alignItems = 'center';
header.style.justifyContent = 'space-between';
header.style.marginBottom = '16px';

const logo = document.createElement('div');
logo.textContent = 'IdeiaHub';
logo.style.fontWeight = '700';
logo.style.fontSize = '18px';

const date = document.createElement('div');
date.textContent = new Date().toLocaleString();
date.style.fontSize = '12px';
date.style.color = '#6b7280';

header.appendChild(logo);
header.appendChild(date);

const h1 = document.createElement('h1');
h1.textContent = title;
h1.style.fontSize = '20px';
h1.style.margin = '0 0 8px 0';

const hr = document.createElement('hr');
hr.style.margin = '12px 0';

const clone = container.cloneNode(true);
// Limpa interativos
clone.querySelectorAll('textarea, input').forEach(el => {
  const div = document.createElement('div');
  div.style.whiteSpace = 'pre-wrap';
  div.style.border = '1px solid #e5e7eb';
  div.style.borderRadius = '8px';
  div.style.padding = '8px';
  div.style.background = '#f9fafb';
  div.textContent = el.value || '';
  el.replaceWith(div);
});
clone.querySelectorAll('.card').forEach(c => {
  c.style.border = '1px solid #e5e7eb';
  c.style.boxShadow = 'none';
  c.style.background = '#ffffff';
});
clone.querySelectorAll('.card-header').forEach(h => {
  h.style.background = '#f3f4f6';
  h.style.borderBottom = '1px solid #e5e7eb';
});
clone.querySelectorAll('button, .actions, .selectors, .theme-toggle').forEach(n => n.remove());

wrapper.appendChild(header);
wrapper.appendChild(h1);
wrapper.appendChild(hr);
wrapper.appendChild(clone);

const opt = {
  margin:       [10,10,10,10],
  filename:     `${title.replace(/\s+/g,'_')}.pdf`,
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2, useCORS: true },
  jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
};

return window.html2pdf().from(wrapper).set(opt).save();
}

window.IHPDF = { exportCanvasToPDF };
})();