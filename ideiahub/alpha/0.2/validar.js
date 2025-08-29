/**

Página de Testar Hipótese
Blocos com métodos práticos de validação
Anotações salvas por sessão (localStorage simples)
*/
const validarBlocks = [
{
title: 'Criar landing page',
text: 'Descreva a proposta de valor em uma página simples e colete emails de interessados. Use ferramentas como Carrd, Notion ou site estático.',
tips: ['Clareza na promessa', 'CTA único', 'Prova social (se possível)']
},
{
title: 'Roteiro de entrevista com usuários',
text: 'Conduza entrevistas para entender dores e comportamentos. Evite perguntas que induzam a resposta.',
tips: ['Perguntas abertas', 'Peça exemplos reais', 'Grave (com permissão)']
},
{
title: 'Usar redes sociais para validação',
text: 'Publique a ideia em grupos e perfis. Observe engajamento, comentários e mensagens.',
tips: ['Teste diferentes ângulos', 'Hashtags relevantes', 'Mensure cliques']
},
{
title: 'Anúncio teste',
text: 'Rode pequenos anúncios (Facebook/Instagram/Google) para medir interesse antes do produto.',
tips: ['Defina público claro', 'Teste criativos', 'Acompanhe CTR e CPC']
},
{
title: 'MVP manual',
text: 'Entregue o valor de forma manual antes de automatizar. Valide a disposição de pagar/usarem.',
tips: ['Limite escopo', 'Documente processo', 'Aprenda rápido']
}
];

document.addEventListener('DOMContentLoaded', () => {
renderValidarBlocks();
});

function renderValidarBlocks() {
const grid = document.getElementById('validarGrid');
grid.innerHTML = '';
validarBlocks.forEach((b, idx) => {
const card = document.createElement('div');
card.className = 'card';


const header = document.createElement('div');
header.className = 'card-header';

const title = document.createElement('div');
title.className = 'card-title';
title.textContent = b.title;

header.appendChild(title);

const body = document.createElement('div');
body.className = 'card-body';

const p = document.createElement('p');
p.style.color = 'var(--muted)';
p.style.marginTop = 0;
p.textContent = b.text;

const ul = document.createElement('ul');
ul.style.marginTop = '8px';
b.tips.forEach(t => {
  const li = document.createElement('li');
  li.textContent = t;
  ul.appendChild(li);
});

const textarea = document.createElement('textarea');
textarea.placeholder = 'Suas anotações sobre este método...';
textarea.value = localStorage.getItem(getKey(idx)) || '';
textarea.addEventListener('input', debounce(() => {
  localStorage.setItem(getKey(idx), textarea.value);
}, 300));

body.appendChild(p);
body.appendChild(ul);
body.appendChild(textarea);

card.appendChild(header);
card.appendChild(body);

grid.appendChild(card);
});
}

function getKey(i) { return ih_validar_notes_${i}; }

function debounce(fn, ms) {
let t = null;
return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(null, args), ms); };
}