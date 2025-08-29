function sanitizeFilename(name) {
  return (name || 'ideiahub').replace(/[\\/:*?"<>|]+/g,'_').slice(0,80);
}

function exportProjectPDF(projectName, frameworkName, blocks) {
  if (!blocks || !blocks.length) {
    return Promise.reject(new Error('Sem conteúdo para exportar'));
  }
  const printable = document.createElement('div');
  printable.style.padding = '20px';
  printable.style.fontFamily = 'Inter, Arial, sans-serif';
  printable.style.color = '#111827';

  // Header com logo
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.gap = '10px';
  header.style.marginBottom = '16px';

  const logo = document.createElement('div');
  logo.style.width = '28px';
  logo.style.height = '28px';
  logo.style.borderRadius = '10px';
  logo.style.background = 'radial-gradient(120px 120px at 0% 100%, #8ef0c8, transparent), radial-gradient(120px 120px at 100% 0%, #6aa7ff, transparent)';
  header.appendChild(logo);

  const h2 = document.createElement('h2');
  h2.textContent = `${projectName} — ${frameworkName || 'IdeiaHub'}`;
  h2.style.margin = '0';
  header.appendChild(h2);
  printable.appendChild(header);

  // Conteúdo
  blocks.forEach(b => {
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
    filename: `${sanitizeFilename(projectName)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  return html2pdf().from(printable).set(opt).save();
}