/**

Lógica principal do IdeiaHub (index.html)
Alternância Framework/Modelo
Renderização do canvas
CRUD com IndexedDB
Tema claro/escuro
Exportar PDF
*/
const frameworkFields = {
'Lean Canvas Expandido': [
'Problema', 'Segmentos de Cliente', 'Proposta de Valor', 'Solução',
'Canais', 'Relacionamento', 'Fluxos de Receita', 'Estrutura de Custos',
'Métricas-Chave', 'Vantagem Injusta', 'MVP', 'Riscos e Premissas'
],
'Proposta de Valor (VPC)': [
'Cliente-Alvo', 'Tarefas do Cliente', 'Dores', 'Ganhos',
'Produtos e Serviços', 'Aliviadores de Dores', 'Criadores de Ganhos'
],
'Mini Roadmap de Projeto': [
'Objetivo', 'Q1', 'Q2', 'Q3', 'Q4', 'Riscos', 'Dependências'
],
'Pitch Rápido': [
'Problema', 'Solução', 'Mercado', 'Tração', 'Modelo de Negócio', 'Time', 'Pedido'
],
'Canvas do IdeiaHub (custom)': [
'Visão', 'Usuário-Alvo', 'Problemas-Chave', 'Soluções-Chave', 'Métricas',
'Recursos', 'Canais', 'Monetização', 'Riscos', 'Próximos Passos'
],
'SWOT Simplificado': ['Forças', 'Fraquezas', 'Oportunidades', 'Ameaças'],
'OKRs de Projeto': ['Objetivo', 'KR1', 'KR2', 'KR3', 'KR4', 'Planos'],
'Product Management Canvas': [
'Visão do Produto', 'Personas', 'Proposição de Valor', 'Features Principais',
'KPIs', 'Riscos', 'Go-to-Market', 'Roadmap Inicial'
],
'Roadmap Trimestral': ['Visão', 'T1', 'T2', 'T3', 'T4', 'Marcos', 'Riscos'],
'BRD — Requisitos de Negócio': ['Contexto', 'Objetivos', 'Escopo', 'Stakeholders', 'Regras de Negócio', 'Restrições'],
'PRD — Requisitos de Produto': ['Resumo', 'Problema', 'Objetivos do Produto', 'Escopo', 'Requisitos Funcionais', 'Requisitos Não Funcionais', 'Critérios de Aceite'],
'Cartão de Experimento Lean': ['Hipótese', 'Métrica de Sucesso', 'Plano do Experimento', 'Resultados', 'Aprendizados', 'Próximos Passos'],
'Go-To-Market (GTM) Lite': ['Segmento Alvo', 'Mensagem', 'Canais', 'Atividades', 'Métricas', 'Orçamento'],
'Plano de Entrevista com Clientes': ['Objetivo', 'Perfil do Entrevistado', 'Roteiro', 'Perguntas-Chave', 'Anotações'],
'Mapa da Jornada do Cliente (Lite)': ['Descoberta', 'Consideração', 'Decisão', 'Onboarding', 'Uso', 'Pontos de Dor', 'Ideias de Melhoria'],
'Brief de Funcionalidade': ['Contexto', 'Objetivo', 'Usuário/Persona', 'Fluxo', 'Critérios de Aceite', 'Riscos'],
'Estratégia de Precificação': ['Segmentos', 'Modelo de Preço', 'Estratégias', 'Testes', 'KPIs']
};

const modelPresets = {
'Clube de Horta Urbana': {
'Visão': 'Criar um clube local que conecte moradores para cultivar hortas colaborativas.',
'Usuário-Alvo': 'Moradores urbanos interessados em alimentação saudável e sustentabilidade.',
'Problemas-Chave': 'Falta de espaço; pouca experiência em cultivo; dificuldade de organizar recursos.',
'Soluções-Chave': 'Organização de mutirões; kits básicos; mentorias com agricultores locais.',
'Métricas': 'Número de participantes ativos; hortas iniciadas; colheitas mensais.',
'Recursos': 'Terrenos cedidos; ferramentas; voluntários; parcerias com escolas.',
'Canais': 'WhatsApp, Instagram local, associações de bairro.',
'Monetização': 'Mensalidade simbólica e patrocínios locais.',
'Riscos': 'Abandono; vandalismo; sazonalidade.',
'Próximos Passos': 'Piloto em um condomínio; mapear interessados; definir calendário de mutirões.'
},
'Correção Colaborativa de Redações': {
'Visão': 'Plataforma onde alunos trocam feedbacks em redações com rubricas simples.',
'Usuário-Alvo': 'Estudantes do ensino médio e vestibulandos.',
'Problemas-Chave': 'Falta de correções frequentes e feedback rápido.',
'Soluções-Chave': 'Par de alunos; rubricas automáticas; gamificação por pontos.',
'Métricas': 'Redações corrigidas/semana; NPS de feedback; retenção mensal.',
'Recursos': 'Servidores; tutores voluntários; banco de temas.',
'Canais': 'Grupos de estudo, escolas, YouTube.',
'Monetização': 'Plano premium com tutoria; anúncios educacionais.',
'Riscos': 'Qualidade do feedback; moderação.',
'Próximos Passos': 'MVP com Google Forms + planilha; 50 usuários piloto.'
},
'Feira Online do Bairro': {
'Visão': 'Market virtual conectando pequenos produtores e vizinhos.',
'Usuário-Alvo': 'Moradores interessados em produtos frescos e produtores locais.',
'Problemas-Chave': 'Baixa visibilidade dos produtores; logística de entrega.',
'Soluções-Chave': 'Catálogo semanal; ponto de retirada; pagamento simples.',
'Métricas': 'Pedidos/semana; ticket médio; número de produtores.',
'Recursos': 'Plataforma simples; integrações de pagamento; voluntários.',
'Canais': 'Facebook do bairro, grupos de WhatsApp, cartazes.',
'Monetização': 'Comissão por venda; assinatura dos produtores.',
'Riscos': 'Qualidade e consistência da oferta; logística.',
'Próximos Passos': 'Piloto com 10 produtores; ponto de retirada em escola local.'
},
'Plataforma de Troca de Habilidades': {
'Visão': 'Comunidade para pessoas trocarem aulas e serviços por créditos.',
'Usuário-Alvo': 'Adultos com habilidades diversas e tempo flexível.',
'Problemas-Chave': 'Custo de cursos; falta de rede de contatos.',
'Soluções-Chave': 'Moeda interna; reputação; catálogo por tags.',
'Métricas': 'Transações/mês; usuários ativos; satisfação.',
'Recursos': 'Hospedagem; moderação; assistente de pareamento.',
'Canais': 'Redes sociais, coworkings, universidades.',
'Monetização': 'Assinatura premium; taxas de transação.',
'Riscos': 'Assimetria de oferta/demanda; fraude.',
'Próximos Passos': 'Grupo no Telegram + planilha; 100 primeiras trocas.'
},
'App de Caminhadas Locais': {
'Visão': 'App que sugere caminhadas seguras e bonitas perto de você.',
'Usuário-Alvo': 'Pessoas buscando bem-estar e explorar a cidade.',
'Problemas-Chave': 'Falta de rotas confiáveis; motivação.',
'Soluções-Chave': 'Rotas curadas; desafios semanais; checkpoints.',
'Métricas': 'Km caminhados; rotas concluídas; DAU/WAU.',
'Recursos': 'Mapas; parceiros de saúde; comunidade.',
'Canais': 'Academias, clínicas, influenciadores locais.',
'Monetização': 'Parcerias e assinatura premium.',
'Riscos': 'Segurança e responsabilidade.',
'Próximos Passos': 'Mapa no Google My Maps + desafio no Instagram.'
},
'Rede de Apoio a Mães Empreendedoras': {
'Visão': 'Rede de suporte, capacitação e negócios para mães empreendedoras.',
'Usuário-Alvo': 'Mães em início de jornada empreendedora.',
'Problemas-Chave': 'Falta de tempo; pouca rede; acesso a conhecimento.',
'Soluções-Chave': 'Mentorias; rede de troca; material prático.',
'Métricas': 'Eventos/mês; membros; negócios fechados.',
'Recursos': 'Voluntárias; parcerias; ferramentas online.',
'Canais': 'Grupos de maternidade, Instagram, Sebrae local.',
'Monetização': 'Assinatura e patrocínios.',
'Riscos': 'Engajamento; curadoria.',
'Próximos Passos': 'Grupo no WhatsApp + encontros quinzenais.'
},
'Loja Virtual de Produtos Artesanais': {
'Visão': 'Loja online para artesãos venderem produtos únicos.',
'Usuário-Alvo': 'Consumidores que valorizam produtos feitos à mão.',
'Problemas-Chave': 'Baixa visibilidade; custos de plataforma.',
'Soluções-Chave': 'Marketplace nichado; curadoria; histórias dos artesãos.',
'Métricas': 'Vendas/mês; taxa de conversão; retorno de clientes.',
'Recursos': 'Fotos; logística; meios de pagamento.',
'Canais': 'Instagram, feiras, grupos de artesanato.',
'Monetização': 'Comissão + planos.',
'Riscos': 'Logística e qualidade.',
'Próximos Passos': 'Catálogo no Instagram + link de pagamento.'
},
'Central de Ofertas Comunitárias': {
'Visão': 'Portal onde comércios locais publicam ofertas para o bairro.',
'Usuário-Alvo': 'Moradores buscando descontos e lojas locais.',
'Problemas-Chave': 'Baixa divulgação de promoções.',
'Soluções-Chave': 'Publicação simples; curadoria; alertas.',
'Métricas': 'Ofertas ativas; cliques; adesões de lojas.',
'Recursos': 'CMS simples; moderadores; parcerias.',
'Canais': 'Facebook, grupos, panfletos digitais.',
'Monetização': 'Planos para lojistas; destaque pago.',
'Riscos': 'Ofertas falsas; moderação.',
'Próximos Passos': 'Formulário + site estático com Airtable.'
}
};

let currentProject = null; // {id, name, type, key, fields}
const canvasGrid = document.getElementById('canvasGrid');
const emptyHint = document.getElementById('emptyHint');
const projectTitle = document.getElementById('projectTitle');

const frameworkSelect = document.getElementById('frameworkSelect');
const modelSelect = document.getElementById('modelSelect');

const themeToggle = document.getElementById('themeToggle');

const projectsModal = document.getElementById('projectsModal');
const projectList = document.getElementById('projectList');
const closeProjectsModal = document.getElementById('closeProjectsModal');

const stairsModal = document.getElementById('stairsModal');
const closeStairsModal = document.getElementById('closeStairsModal');
const cancelStairs = document.getElementById('cancelStairs');

const newProjectModal = document.getElementById('newProjectModal');
const closeNewProjectModal = document.getElementById('closeNewProjectModal');

// Init
document.addEventListener('DOMContentLoaded', () => {
// Tema
initTheme();

// Botões
document.getElementById('btnNewProject').addEventListener('click', openNewProjectModal);
document.getElementById('btnMyProjects').addEventListener('click', openProjectsModal);
document.getElementById('btnTestarHipotese').addEventListener('click', () => {
window.location.href = 'validar.html';
});
document.getElementById('btnStairs').addEventListener('click', () => openModal(stairsModal));
document.getElementById('btnSave').addEventListener('click', saveProject);
document.getElementById('btnReedit').addEventListener('click', enableEdit);
document.getElementById('btnDelete').addEventListener('click', deleteProject);
document.getElementById('btnExportPDF').addEventListener('click', exportPDF);

closeProjectsModal.addEventListener('click', () => closeModal(projectsModal));
closeStairsModal.addEventListener('click', () => closeModal(stairsModal));
cancelStairs.addEventListener('click', () => closeModal(stairsModal));

closeNewProjectModal.addEventListener('click', () => closeModal(newProjectModal));
document.getElementById('cancelNewProject').addEventListener('click', () => closeModal(newProjectModal));
document.getElementById('createNewProject').addEventListener('click', createProject);

frameworkSelect.addEventListener('change', () => {
if (frameworkSelect.value) {
modelSelect.value = '';
loadFramework(frameworkSelect.value);
} else {
clearCanvas();
}
});

modelSelect.addEventListener('change', () => {
if (modelSelect.value) {
frameworkSelect.value = '';
loadModel(modelSelect.value);
} else {
clearCanvas();
}
});

// Restaurar último projeto aberto (opcional: pelo último atualizado)
IHDB.list().then(list => {
if (list && list.length) {
openProject(list[0]);
}
}).catch(()=>{});
});

function initTheme() {
const saved = localStorage.getItem('ih_theme') || 'light';
document.body.classList.toggle('theme-light', saved === 'light');
document.body.classList.toggle('theme-dark', saved !== 'light');
themeToggle.checked = saved !== 'light';
themeToggle.addEventListener('change', () => {
const mode = themeToggle.checked ? 'dark' : 'light';
localStorage.setItem('ih_theme', mode);
document.body.classList.toggle('theme-light', mode === 'light');
document.body.classList.toggle('theme-dark', mode !== 'light');
});
}

/* Modal helpers */
function openModal(el) { el.setAttribute('aria-hidden','false'); }
function closeModal(el) { el.setAttribute('aria-hidden','true'); }

function openProjectsModal() {
loadProjectsList();
openModal(projectsModal);
}

async function loadProjectsList() {
const list = await IHDB.list();
projectList.innerHTML = '';
if (!list.length) {
const li = document.createElement('li');
li.textContent = 'Nenhum projeto salvo ainda.';
li.style.color = 'var(--muted)';
projectList.appendChild(li);
return;
}
list.forEach(p => {
const li = document.createElement('li');
li.className = 'project-item';


const left = document.createElement('div');
left.className = 'row';
const title = document.createElement('div');
title.className = 'title';
title.textContent = p.name || 'Sem título';
const meta = document.createElement('div');
meta.className = 'meta';
const type = p.type === 'framework' ? 'Framework' : 'Modelo';
meta.textContent = `${type}: ${p.key} • Atualizado: ${new Date(p.updatedAt).toLocaleString()}`;
left.appendChild(title);
left.appendChild(meta);

const right = document.createElement('div');
right.style.display = 'flex';
right.style.gap = '8px';

const btnOpen = document.createElement('button');
btnOpen.className = 'btn';
btnOpen.textContent = 'Abrir';
btnOpen.addEventListener('click', () => { openProject(p); closeModal(projectsModal); });

const btnDelete = document.createElement('button');
btnDelete.className = 'btn';
btnDelete.style.color = 'var(--danger)';
btnDelete.textContent = 'Excluir';
btnDelete.addEventListener('click', async () => {
  if (confirm('Excluir este projeto?')) {
    await IHDB.remove(p.id);
    loadProjectsList();
    if (currentProject && currentProject.id === p.id) {
      currentProject = null;
      clearCanvas();
    }
  }
});

right.appendChild(btnOpen);
right.appendChild(btnDelete);

li.appendChild(left);
li.appendChild(right);
projectList.appendChild(li);
});
}

function openNewProjectModal() {
document.getElementById('newProjectName').value = '';
openModal(newProjectModal);
}

async function createProject() {
const name = (document.getElementById('newProjectName').value || 'Projeto sem título').trim();
const project = {
name,
type: '',
key: '',
fields: {}
};
const created = await IHDB.create(project);
openProject(created);
closeModal(newProjectModal);
}

function openProject(p) {
currentProject = p;
projectTitle.textContent = p.name || 'Projeto sem título';

// Preenche seleção
frameworkSelect.value = p.type === 'framework' ? p.key : '';
modelSelect.value = p.type === 'model' ? p.key : '';

if (p.type === 'framework' && p.key) {
renderFramework(p.key, p.fields);
} else if (p.type === 'model' && p.key) {
renderModel(p.key, p.fields);
} else {
clearCanvas();
}
}

function clearCanvas() {
canvasGrid.innerHTML = '';
emptyHint.style.display = 'block';
}

function renderFramework(name, savedFields = {}) {
emptyHint.style.display = 'none';
canvasGrid.innerHTML = '';
const fields = frameworkFields[name] || [];
fields.forEach(block => {
const card = createCard(block, savedFields[block] || '');
canvasGrid.appendChild(card);
});
setProjectType('framework', name);
}

function renderModel(name, savedFields = {}) {
emptyHint.style.display = 'none';
canvasGrid.innerHTML = '';

const preset = modelPresets[name];
const allKeys = preset ? Object.keys(preset) : [];
allKeys.forEach(block => {
const initial = savedFields[block] ?? preset[block] ?? '';
const card = createCard(block, initial);
canvasGrid.appendChild(card);
});
setProjectType('model', name);
}

function setProjectType(type, key) {
if (!currentProject) {
currentProject = { name: 'Projeto sem título', type, key, fields: {} };
} else {
currentProject.type = type;
currentProject.key = key;
}
projectTitle.textContent = currentProject.name || 'Projeto sem título';
}

function createCard(title, value) {
const card = document.createElement('div');
card.className = 'card';

const header = document.createElement('div');
header.className = 'card-header';

const h = document.createElement('div');
h.className = 'card-title';
h.textContent = title;

const info = document.createElement('small');
info.style.color = 'var(--muted)';
info.textContent = 'Editável';

header.appendChild(h);
header.appendChild(info);

const body = document.createElement('div');
body.className = 'card-body';

const textarea = document.createElement('textarea');
textarea.value = value || '';
textarea.placeholder = 'Escreva aqui...';

textarea.addEventListener('input', debounce(() => {
if (!currentProject) return;
currentProject.fields[title] = textarea.value;
}, 300));

body.appendChild(textarea);
card.appendChild(header);
card.appendChild(body);
return card;
}

async function saveProject() {
if (!currentProject) {
alert('Crie ou abra um projeto para salvar.');
return;
}
// Nome rápido se vazio
if (!currentProject.name || currentProject.name === 'Projeto sem título') {
const n = prompt('Nome do projeto:', currentProject.name || '');
if (n) currentProject.name = n;
}
// Coleta os valores atuais do DOM
const fields = {};
document.querySelectorAll('.card').forEach(card => {
const key = card.querySelector('.card-title')?.textContent?.trim();
const val = card.querySelector('textarea')?.value || '';
if (key) fields[key] = val;
});
currentProject.fields = fields;

if (currentProject.id) {
currentProject = await IHDB.update(currentProject);
} else {
currentProject = await IHDB.create(currentProject);
}
projectTitle.textContent = currentProject.name;
alert('Projeto salvo com sucesso!');
}

function enableEdit() {
document.querySelectorAll('.card textarea').forEach(t => t.removeAttribute('disabled'));
alert('Campos habilitados para edição.');
}

async function deleteProject() {
if (!currentProject || !currentProject.id) {
alert('Nenhum projeto carregado.');
return;
}
if (confirm('Tem certeza que deseja excluir este projeto?')) {
await IHDB.remove(currentProject.id);
currentProject = null;
clearCanvas();
projectTitle.textContent = 'Projeto sem título';
frameworkSelect.value = '';
modelSelect.value = '';
alert('Projeto excluído.');
}
}

function exportPDF() {
if (!currentProject) {
alert('Crie ou abra um projeto para exportar.');
return;
}
const title = currentProject.name || 'IdeiaHub';
const container = document.getElementById('canvas');
IHPDF.exportCanvasToPDF({ title, container });
}

/* Helpers */
function debounce(fn, ms) {
let t = null;
return (...args) => {
clearTimeout(t);
t = setTimeout(()=>fn.apply(null,args), ms);
};
}