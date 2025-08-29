import { state, els } from './state.js';
import { frameworks, templates } from './data.js';
import { saveProject, listProjects, getProject, deleteProject } from './db.js';
import { setStatus, toast, openModal, closeModal } from './ui.js';

// Função auxiliar para escape de HTML
function escapeHtml(txt) {
  const div = document.createElement('div');
  div.textContent = txt || '';
  return div.innerHTML;
}

// Blocks rendering
export function renderBlocks() {
  const empty = els.empty;
  const blocks = els.blocks;

  blocks.innerHTML = '';
  blocks.hidden = true;
  empty.hidden = false;

  if (!state.blocks || state.blocks.length === 0) {
    return;
  }

  empty.hidden = true;
  blocks.hidden = false;

  state.blocks.forEach(block => {
    const div = document.createElement('div');
    const spanClass = block.span ? `grid-${block.span}` : 'grid-6';
    div.className = `block ${spanClass}`;
    div.dataset.id = block.id;
    // O escapeHtml aqui garante que o conteúdo do bloco, que pode vir do IndexedDB, seja seguro
    const sanitizedContent = escapeHtml(block.content || '');
    div.innerHTML = `
      <span class="pin">${state.currentFramework || 'Bloco'}</span>
      <h4>${block.title}</h4>
      <div class="content" contenteditable="true" data-field="content" placeholder="">${sanitizedContent}</div>
      ${block.hint ? `<div class="hint">${block.hint}</div>` : ``}
    `;

    div.querySelector('.content').addEventListener('input', (e) => {
      const val = e.currentTarget.innerText;
      const b = state.blocks.find(x => x.id === block.id);
      if (b) b.content = val;
      state.dirty = true;
      setStatus('editando');
    });

    blocks.appendChild(div);
  });
}

// Projeto
function newProject(askConfirmation = false) {
  const resetProject = () => {
    state.currentProjectId = null;
    state.blocks = [];
    state.currentFramework = "";
    state.currentTemplate = "";
    state.dirty = false;
    els.projectName.value = "Projeto sem título";
    els.frameworkSelect.value = "";
    els.templateSelect.value = "";
    
    // LINHA CRUCIAL: Reseta o HTML da área de estado vazio
    els.empty.innerHTML = `
      <div class="intro-box">
          <h2>Selecione um Framework ou Template</h2>
          <p>Para começar, escolha uma das opções disponíveis na barra superior ou importe um projeto existente.</p>
      </div>
    `;

    renderBlocks();
    setStatus('novo');
    toast('Novo projeto iniciado', 'success');
  };

  if (askConfirmation && state.dirty) {
    confirmModal(
      'Iniciar novo projeto?',
      'Você possui alterações não salvas. Deseja continuar?',
      resetProject
    );
  } else {
    resetProject();
    if(askConfirmation) toast('Novo projeto iniciado', 'success');
  }
}

export function confirmModal(title, msg, onConfirm) {
  const body = document.createElement('div');
  body.innerHTML = `<p style="color:var(--muted)">${msg}</p>`;
  openModal(title, body, [
    { label: 'Cancelar', icon: 'x', onClick: closeModal },
    { label: 'Confirmar', icon: 'check', variant: 'danger', onClick: ()=> { closeModal(); onConfirm(); } },
  ]);
}

// Framework & Template handlers
function loadFramework(name) {
  const schema = frameworks[name];
  if (!schema) return;
  state.currentFramework = name;
  state.blocks = schema.map((s) => ({
    id: crypto.randomUUID(),
    title: s.title,
    hint: s.hint || "",
    content: "",
    span: (s.span || 6)
  }));
  renderBlocks();
  setStatus('editando');
  toast(`Framework "${name}" carregado`, 'success');
}

function showFrameworkDescription(name) {
  // Objeto de mapeamento para as descrições
  const descriptions = {
    "Ideon Flow":"Gere seu roadmap. Encontre o caminho. Uma ferramenta estratégica que transforma uma ideia inicial em um plano de ação organizado, com fases claras e níveis de investimento. O ponto de partida ideal para quem quer tirar um projeto do papel com direção e foco." ,
    "Lean Canvas Expandido": "Lean Canvas Expandido é uma ferramenta de planejamento estratégico que ajuda a estruturar ideias de negócios de forma visual e concisa. Ele se concentra em identificar o problema, a solução, a proposta de valor, os segmentos de clientes, os canais de distribuição, o modelo de receita, os custos e as métricas-chave. É ideal para startups e empreendedores que buscam validar rapidamente suas ideias e ajustar seu modelo de negócios com base no feedback do mercado.",
    "VPC": "O Value Proposition Canvas (VPC) é uma ferramenta que ajuda a alinhar a proposta de valor de um produto ou serviço com as necessidades e desejos dos clientes. Ele se divide em duas partes: o perfil do cliente, que identifica as tarefas, dores e ganhos dos clientes, e o mapa de valor, que descreve como o produto ou serviço alivia as dores e cria ganhos. É útil para garantir que a oferta atenda às expectativas do mercado.",
    "Mini Roadmap": "O Mini Roadmap de Projeto é uma ferramenta de planejamento que ajuda a definir objetivos, marcos e tarefas de forma simples e visual. Ele permite que equipes e indivíduos organizem suas atividades em um período específico, priorizando o que é mais importante. É ideal para projetos menores ou para quem busca uma abordagem ágil e flexível.",
    "Pitch Rápido": "O Pitch Rápido é uma apresentação curta e impactante que resume a essência de uma ideia, produto ou serviço. Ele deve abordar o problema, a solução, o diferencial, o mercado e um call-to-action claro. É uma ferramenta valiosa para captar a atenção de investidores, parceiros ou clientes em potencial de forma rápida e eficaz.",
    "Canvas IdeiaHub": "O Canvas do IdeiaHub é uma ferramenta personalizada que combina elementos de planejamento estratégico e inovação. Ele permite que equipes e indivíduos visualizem sua visão, usuários, solução, métricas-chave e experimentos em um único quadro. É ideal para startups e projetos que buscam uma abordagem colaborativa e iterativa para desenvolver suas ideias.",
    "SWOT Simplificado": "O SWOT Simplificado é uma versão condensada da análise SWOT tradicional, que identifica forças, fraquezas, oportunidades e ameaças de forma rápida e direta. Ele ajuda equipes a entenderem o contexto em que operam e a tomarem decisões estratégicas com base em uma visão clara dos fatores internos e externos que afetam seu negócio.",
    "Product Management Canvas": "O Product Management Canvas é uma ferramenta que ajuda gerentes de produto a estruturar e visualizar os principais aspectos de um produto. Ele abrange problemas, público-alvo, proposta de valor, métricas, canais e monetização. É útil para garantir que todos os elementos essenciais do produto estejam alinhados e bem definidos.",
    "Roadmap Trimestral": "O Roadmap Trimestral é uma ferramenta de planejamento que ajuda equipes a definir objetivos e marcos para um período de três meses. Ele permite que as equipes organizem suas atividades, priorizem tarefas e identifiquem riscos e dependências. É ideal para manter o foco e garantir que todos estejam alinhados com as metas do trimestre.",
    "Go-To-Market Lite": "O Go-To-Market (GTM) Lite é uma abordagem simplificada para desenvolver e implementar estratégias de entrada no mercado. Ele abrange segmento-alvo, proposta de valor, canais, mensagem e táticas iniciais. É útil para startups que buscam uma maneira rápida e eficaz de lançar seus produtos ou serviços no mercado.",
    "Plano de Entrevista com Clientes": "O Plano de Entrevista com Clientes é uma ferramenta que ajuda a estruturar entrevistas para coletar feedback valioso dos clientes. Ele inclui objetivos da entrevista, perfil dos entrevistados e um roteiro de perguntas. É essencial para entender as necessidades e expectativas dos clientes e aprimorar produtos ou serviços com base em insights reais.",
    "Mapa da Jornada do Cliente (Lite)": "O Mapa da Jornada do Cliente (Lite) é uma ferramenta que ajuda a visualizar as etapas que os clientes percorrem ao interagir com um produto ou serviço. Ele identifica estágios, ações do cliente, pontos de dor e oportunidades de melhoria. É útil para entender a experiência do cliente e identificar áreas de aprimoramento.",
    "Brief de Funcionalidade": "O Brief de Funcionalidade é um documento que descreve de forma clara e concisa uma funcionalidade específica de um produto. Ele inclui resumo, problema, solução proposta e critérios de aceite. É essencial para garantir que todos os envolvidos tenham uma compreensão comum do que deve ser desenvolvido e quais são as expectativas.",
    "Estratégia de Precificação": "A Estratégia de Precificação é uma ferramenta que ajuda a definir como um produto ou serviço será precificado. Ela abrange proposta de valor, segmentos/planos, preço inicial e teste & validação. É crucial para garantir que o preço esteja alinhado com o valor percebido pelo cliente e que seja competitivo no mercado.",
    "Central de Ofertas Comunitárias": "A Central de Ofertas Comunitárias é uma plataforma que  conecta moradores locais a ofertas e promoções de pequenos comerciantes. Ela visa fortalecer a economia local, oferecendo um hub único para promoções do bairro. É ideal para criar uma comunidade de consumo consciente e apoiar negócios locais."
  };

  const description = descriptions[name];
  const framework = frameworks[name];

  if (!framework) return;

  els.empty.hidden = false;
  els.blocks.hidden = true;

  els.empty.innerHTML = `
    <div class="intro-box">
        <h2>${name}</h2>
        ${description ? `<p>${description}</p>` : ''}
        <button class="btn primary" id="startFrameworkBtn">
            <i data-feather="grid" class="icon"></i> Carregar
        </button>
    </div>
  `;
  feather.replace();

  document.getElementById('startFrameworkBtn').addEventListener('click', () => {
    loadFramework(name);
  });
  closeModal();
}

function applyTemplate(name) {
  const contentMap = templates[name] || {};
  state.currentTemplate = name;
  let applied = 0;
  state.blocks.forEach(b => {
    if (contentMap[b.title] !== undefined) {
      b.content = contentMap[b.title];
      applied++;
    }
  });
  renderBlocks();
  setStatus('editando');
  toast(applied ? `Template "${name}" aplicado` : 'Template sem campos correspondentes', applied ? 'success':'warn');
}

// Export PDF
function exportPDF() {
  if (!state.blocks.length) {
    toast('Nada para exportar. Selecione um framework.', 'warn');
    return;
  }
  const printable = document.createElement('div');
  printable.style.padding = '16px';
  printable.style.fontFamily = 'Inter, Arial, sans-serif';
  printable.style.color = '#111827';

  const title = document.createElement('h2');
  title.textContent = els.projectName.value + ' — ' + (state.currentFramework || 'IdeiaHub');
  printable.appendChild(title);

  state.blocks.forEach(b => {
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
    filename: `${sanitizeFilename(els.projectName.value)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  if (typeof html2pdf === 'function') {
    html2pdf().from(printable).set(opt).save().then(()=>{
      toast('Exportado com sucesso', 'success');
      setStatus('exportado');
    }).catch(()=>{
      toast('Falha ao exportar', 'error');
    });
  } else {
    toast('html2pdf não carregado. Habilite o CDN no index.html.', 'warn');
  }
}

function exportProject() {
  const data = {
    version: 1,
    id: state.currentProjectId ?? null,
    name: els.projectName?.value || 'Projeto sem título',
    framework: state.currentFramework,
    template: state.currentTemplate,
    blocks: state.blocks,
    updatedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${sanitizeFilename(data.name)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);

  toast('Projeto exportado (JSON)', 'success');
  setStatus('exportado');
}

function sanitizeFilename(name) {
  return (name || 'ideiahub').replace(/[\\/:*?"<>|]+/g,'_').slice(0,80);
}

// Projects modals
async function showProjectsModal() {
  const list = await listProjects();
  const body = document.createElement('div');
  body.className = 'projects-list';
  if (!list.length) {
    body.innerHTML = `<div style="color:var(--muted)">Nenhum projeto salvo ainda.</div>`;
  } else {
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      const left = document.createElement('div');
      left.innerHTML = `<strong>${escapeHtml(p.name)}</strong>
        <div class="project-meta">
          <span>${p.framework || 'Sem framework'}</span>
          <span>•</span>
          <span>${new Date(p.updatedAt).toLocaleString()}</span>
        </div>`;
      const actions = document.createElement('div');
      actions.className = 'project-actions';
      const openBtn = document.createElement('button');
      openBtn.className = 'btn';
      openBtn.innerHTML = `<i data-feather="folder-open" class="icon"></i>Abrir`;
      openBtn.addEventListener('click', async ()=> {
        const proj = await getProject(p.id);
        if (proj) {
          state.currentProjectId = proj.id;
          state.currentFramework = proj.framework || "";
          state.currentTemplate = proj.template || "";
          state.blocks = proj.blocks || [];
          els.projectName.value = proj.name || "Projeto";
          renderBlocks();
          setStatus('carregado');
          toast('Projeto carregado', 'success');
          closeModal();
        }
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn danger';
      delBtn.innerHTML = `<i data-feather="trash-2" class="icon"></i>Deletar`;
      delBtn.addEventListener('click', ()=> {
        closeModal();
        confirmModal('Deletar projeto?', `Tem certeza que deseja deletar "${p.name}"?`, async () => {
          await deleteProject(p.id);
          toast('Projeto deletado', 'success');
        });
      });
      actions.appendChild(openBtn); actions.appendChild(delBtn);
      card.appendChild(left); card.appendChild(actions);
      body.appendChild(card);
    });
  }
  // AQUI: O botão "Fechar" foi removido.
  openModal('Meus Projetos', body); 
  // O botão de deletar será adicionado no modal de confirmação.
  feather.replace();
}

//Help modal - Botão de ajuda
function showHelpModal() {
  const body = document.createElement('div');
  body.innerHTML = `
    <p>Olá! Bem-vindo ao IdeiaHub.</p>
    <p>Use os frameworks disponíveis para estruturar suas ideias. Você pode salvar, exportar e gerenciar seus projetos na sua máquina, tudo offline.</p>
    <p>O que você pode fazer:</p>
    <ul>
      <li>Selecione um framework para começar.</li>
      <li>Preencha os blocos e salve seu projeto.</li>
      <li>Exporte seu projeto como PDF ou JSON.</li>
      <li>Gerencie projetos salvos na janela "Meus Projetos".</li>
    </ul>
  `;

  // Define os botões do modal: apenas um botão de fechar
  openModal('Ajuda & Dicas', body, [
    { label: 'Entendi!', icon: 'check', onClick: closeModal }
  ]);

  // Renderiza os ícones dentro do modal
  feather.replace();
}

// Premium modal (locked)
function showHypothesisModal() {
  const body = document.createElement('div');
  body.className = 'checklist';
  body.innerHTML = `
    <div class="check-item">
      <div>
        <div style="color:var(--muted)">Criar experimentos rápidos para validar se o problema realmente existe e se a solução proposta tem interesse.</div>
      </div>
    </div>
    <div class="check-item">
      <div>
        <strong>Landing Page com formulário de interesse</strong>
        <div class="tool-links">
          <a href="https://wix.com" target="_blank">Wix</a>
          <a href="https://carrd.co" target="_blank">Carrd</a>
          <a href="https://webflow.com" target="_blank">Webflow</a>
        </div>
      </div>
    </div>
    <div class="check-item">
      <div>
        <strong>Protótipo simples (mesmo não funcional)</strong>
        <div class="tool-links">
          <a href="https://figma.com" target="_blank">Figma</a>
          <a href="https://miro.com" target="_blank">Miro</a>
        </div>
      </div>
    </div>
    <div class="check-item">
      <div>
        <strong>Pesquisa online ou entrevistas</strong>
        <div class="tool-links">
          <a href="https://forms.google.com" target="_blank">Google Forms</a>
          <a href="https://typeform.com" target="_blank">Typeform</a>
          <a href="https://surveymonkey.com" target="_blank">SurveyMonkey</a>
        </div>
      </div>
    </div>
    <div class="check-item">
      <div>
        <strong>Post em redes sociais medindo engajamento</strong>
        <div class="tool-links">
          <a href="https://buffer.com" target="_blank">Buffer</a>
          <a href="https://hootsuite.com" target="_blank">Hootsuite</a>
        </div>
        <div style="color:var(--muted); margin-top: 8px;"></div>
      </div>
    </div>
  `;
 openModal('Testar Hipótese', body, [
  { label: 'Saiba mais', icon: 'star', onClick: () => {
      window.open('https://dealegear.com.br/valide-sua-hipotese-para-ter-sucesso/', '_blank');
      closeModal();
    }
  },
]);
  // AQUI: Adicione a chamada para renderizar os ícones no modal
  feather.replace();
}

// Event listeners
export function registerListeners() {
  const themeToggle = document.getElementById('themeToggle');
  const saveBtn = document.getElementById('saveBtn');
  //const exportPdfBtn = document.getElementById('exportPdfBtn'); linha a ser deletada
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const exportBtnSidebar = document.getElementById('exportBtnSidebar');
  const resetTemplateBtn = document.getElementById('resetTemplateBtn');
  const addBlockBtn = document.getElementById('addBlockBtn');
  const newProjectBtn = document.getElementById('newProjectBtn');
  const myProjectsBtn = document.getElementById('myProjectsBtn');
  const premiumBtnSidebar = document.getElementById('premiumBtnSidebar');
  const deleteProjectBtn = document.getElementById('deleteProjectBtn');
  const testHypothesisBtn = document.getElementById('testHypothesisBtn');
  const criticarProjetoBtn = document.getElementById('criticarProjetoBtn');
  
  els.modalClose.addEventListener('click', closeModal);
  els.modalBackdrop.addEventListener('click', (e)=> { if (e.target === els.modalBackdrop) closeModal(); });
  themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', state.theme);
    localStorage.setItem("ideiahub.theme", state.theme);
    toast('Tema alternado', 'success');
  });

  async function handleSaveProject() {
  if (state.currentProjectId) {
    // Se o projeto já tem um ID, significa que já foi salvo.
    // Pedimos confirmação antes de sobrescrever.
    confirmModal(
      'Salvar alterações?',
      'Este projeto já existe. Deseja sobrescrevê-lo?',
      async () => {
        await saveProject(); // Chama a função do db.js para salvar
        toast('Projeto salvo com sucesso!', 'success');
      }
    );
  } else {
    // Se é um projeto novo (sem ID), salva diretamente.
    await saveProject();
    toast('Projeto salvo com sucesso!', 'success');
  }
}

  saveBtn.addEventListener('click', handleSaveProject);
  //exportPdfBtn.addEventListener('click', exportPDF);
  exportJsonBtn.addEventListener('click', async () => {
    try {
      await saveProject();
    } catch(e) {
      console.warn('Falha ao salvar antes de exportar:', e);
    }
    exportProject();
  });
  exportBtnSidebar.addEventListener('click', exportPDF);
  resetTemplateBtn.addEventListener('click', ()=> {
    if (!state.currentFramework) return toast('Selecione um framework primeiro', 'warn');
    confirmModal('Recarregar Framework?', 'Isso limpa os conteúdos inseridos. Deseja continuar?', ()=> loadFramework(state.currentFramework));
  });
  addBlockBtn.addEventListener('click', ()=> {
    state.blocks.push({
      id: crypto.randomUUID(),
      title: "Novo Bloco",
      hint: "",
      content: "",
      span: 6
    });
    state.dirty = true;
    renderBlocks();
    setStatus('editando');
  });
  removeBlockBtn.addEventListener('click', () => {
    if (state.blocks.length > 0) {
      confirmModal(
        'Remover o último bloco?',
        'O último bloco adicionado será removido. Deseja continuar?',
        () => {
          state.blocks.pop();
          state.dirty = true;
          renderBlocks();
          setStatus('editando');
          toast('Último bloco removido', 'success');
        }
      );
    } else {
      toast('Não há blocos para remover', 'warn');
    }
  });
  newProjectBtn.addEventListener('click', () => newProject(true));
  myProjectsBtn.addEventListener('click', showProjectsModal);
  deleteProjectBtn.addEventListener('click', ()=> {
    if (!state.currentProjectId) return toast('Nenhum projeto carregado', 'warn');
    confirmModal('Deletar projeto?', 'Essa ação não pode ser desfeita.', async ()=> {
      await deleteProject(state.currentProjectId);
      newProject();
      toast('Projeto deletado', 'success');
    });
  });
 els.frameworkSelect.addEventListener('change', (e) => {
    const name = e.target.value;
    if (!name) {
      els.empty.innerHTML = `Selecione um framework ou template para começar.`;
      els.empty.hidden = false;
      els.blocks.hidden = true;
      return;
    }
    
    if (state.dirty) {
      confirmModal('Trocar framework?', 'Você possui alterações não salvas. Continuar?', () => showFrameworkDescription(name));
    } else {
      showFrameworkDescription(name);
    }
  });
  els.templateSelect.addEventListener('change', (e)=> {
    const name = e.target.value;
    if (!name) return;
    if (!state.currentFramework) {
      toast('Selecione um framework antes do template', 'warn');
      e.target.value = '';
      return;
    }
    applyTemplate(name);
  });
  els.projectName.addEventListener('input', ()=> {
    state.dirty = true; setStatus('editando');
  });
  testHypothesisBtn.addEventListener('click', showHypothesisModal);
document.getElementById('helpBtn').addEventListener('click', showHelpModal);  
}

// ... seus event listeners existentes

// 1. Liga o botão de importar ao input de arquivo
els.importJsonBtn.addEventListener('click', () => {
  els.importFileInput.click();
});

// 2. Lida com a seleção do arquivo
els.importFileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    return; // Se nenhum arquivo foi selecionado, não faz nada
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      loadProjectFromJSON(importedData);
      toast('Projeto importado com sucesso!', 'success');
      closeModal();
    } catch (error) {
      toast('Erro ao ler o arquivo JSON. Formato inválido.', 'error');
      console.error('Erro ao processar JSON:', error);
    }
  };

  reader.readAsText(file);
});


// 3. Função para carregar os dados do JSON no projeto
function loadProjectFromJSON(data) {
  // Limpa o projeto atual
  els.projectName.value = data.name || "Projeto Importado";
  state.currentFramework = data.framework;
  state.currentTemplate = data.template;
  state.blocks = data.blocks;
  state.dirty = true; // O projeto tem alterações não salvas após a importação

  // Atualiza a interface
  renderBlocks();
  setStatus('editando');
  els.frameworkSelect.value = state.currentFramework;
  els.frameworkSelect.dispatchEvent(new Event('change'));
}
//função do botão de criticar projeto
criticarProjetoBtn.addEventListener('click', exportCritiqueJson);

function abrirModalCritica() {
  if (!state.currentProjectId) {
    toast('Nenhum projeto carregado', 'warn');
    return;
  }
  
  const body = document.createElement('div');
  body.className = 'checklist';
  body.innerHTML = `
<div class="check-item">
  <div>
    <strong>Faça a critica do seu projeto usando uma IA:</strong>
    <ol>
      <li>Acesse a pasta downloads do seu dispositivo</li>
      <li>Verifique se o arquivo "Critica do Projeto - Nome do Projeto" está na pasta</li>
      <li>Acesse sua IA preferida, com ChatGPT, Gemini ou outra. Faça o login se necessário</li>
      <li>Faça o upload do arquivo "Critica do Projeto - Nome do Projeto"</li>
      <li>No prompt da IA escreva: "Analise esse arquivo JSON e responda aos Prompts da chave "critiquePrompts""</li>
      <li>A IA fará a critica daquilo que você escreveu nos campos do framework escolhido. Sugerimos que copie esse texto e cole em um editor de texto de sua preferência, ou faça o download se a IA permitir</li>
      <li>Finalizada essa etapa você terá um excelente material para continuar o desenvolvimento do seu projeto</li>
    </ol>
  </div>
</div>
  `;
  
  openModal('Criticar Projeto', body, [
    { label: 'Fechar', icon: 'x', onClick: closeModal }
  ]);
}

function exportCritiqueJson() {
  const critiquePrompts = {
    problemStatement: "Critique o problema do projeto. Ele é claro? É validado? Avalie a dor do cliente.",
    solutionAnalysis: "Analise a solução proposta. Ela é inovadora? É viável? Sugira melhorias ou alternativas.",
    businessModel: "Avalie o modelo de negócio. Ele é sustentável? Quais são os riscos? Sugira novas fontes de receita.",
    targetAudience: "O público-alvo está bem definido? Há clareza na proposta de valor? Sugira canais de marketing e comunicação.",
  };

  const projectData = {
    projectName: els.projectName.value || "Projeto sem título",
    framework: state.currentFramework,
    blocks: state.blocks,
    critiquePrompts: critiquePrompts,
  };

  const filename = `Critica do Projeto - ${projectData.projectName}.json`;
  const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  abrirModalCritica()
}