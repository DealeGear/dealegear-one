// Dados de exemplo expandidos
const projetos = [
    {
        titulo: "Máquina de Reciclagem de Plásticos",
        descricao: "Protótipo modular para reaproveitamento de resíduos.",
        status: "aberto",
        habilidades: ["Mecânica", "Eletrônica", "Software"],
        modulos: [
            { nome: "Mecânica", status: "Concluído" },
            { nome: "Eletrônica", status: "Aberto" },
            { nome: "Software", status: "Aberto" }
        ]
    },
    {
        titulo: "Mini Turbina Eólica Urbana",
        descricao: "Geração de energia limpa em áreas residenciais.",
        status: "aberto",
        habilidades: ["Aerodinâmica", "CAD", "Eletrônica"],
        modulos: [
            { nome: "Aerodinâmica", status: "Concluído" },
            { nome: "CAD", status: "Aberto" },
            { nome: "Eletrônica", status: "Aberto" }
        ]
    },
    {
        titulo: "Estação de Monitoramento Ambiental",
        descricao: "Sistema IoT para coleta de dados ambientais em tempo real.",
        status: "em-andamento",
        habilidades: ["Eletrônica", "Programação", "Data Science"],
        modulos: [
            { nome: "Hardware", status: "Concluído" },
            { nome: "Firmware", status: "Em andamento" },
            { nome: "Backend", status: "Aberto" },
            { nome: "Frontend", status: "Aberto" }
        ]
    },
    {
        titulo: "Impressora 3D de Baixo Custo",
        descricao: "Projeto open source de impressora 3D com materiais reciclados.",
        status: "aberto",
        habilidades: ["Mecânica", "Eletrônica", "Software"],
        modulos: [
            { nome: "Estrutura", status: "Concluído" },
            { nome: "Eletrônica", status: "Aberto" },
            { nome: "Firmware", status: "Aberto" }
        ]
    },
    {
        titulo: "Robô Agrícola Autônomo",
        descricao: "Sistema robótico para plantio e colheita em pequenas propriedades.",
        status: "aberto",
        habilidades: ["Robótica", "Visão Computacional", "Agricultura"],
        modulos: [
            { nome: "Mecânica", status: "Concluído" },
            { nome: "Eletrônica", status: "Em andamento" },
            { nome: "Software", status: "Aberto" },
            { nome: "IA", status: "Aberto" }
        ]
    },
    {
        titulo: "Sistema de Purificação de Água",
        descricao: "Filtro de água portátil usando materiais sustentáveis.",
        status: "em-andamento",
        habilidades: ["Química", "Engenharia", "Design"],
        modulos: [
            { nome: "Pesquisa", status: "Concluído" },
            { nome: "Protótipo", status: "Em andamento" },
            { nome: "Testes", status: "Aberto" }
        ]
    },
    {
        titulo: "Painel Solar Flexível",
        descricao: "Desenvolvimento de painéis solares leves e dobráveis.",
        status: "aberto",
        habilidades: ["Física", "Materiais", "Eletrônica"],
        modulos: [
            { nome: "Materiais", status: "Aberto" },
            { nome: "Eletrônica", status: "Aberto" },
            { nome: "Integração", status: "Aberto" }
        ]
    },
    {
        titulo: "Bicicleta Elétrica Modular",
        descricao: "Sistema de conversão para bicicletas comuns em elétricas.",
        status: "em-andamento",
        habilidades: ["Mecânica", "Eletrônica", "Design de Produto"],
        modulos: [
            { nome: "Bateria", status: "Concluído" },
            { nome: "Motor", status: "Em andamento" },
            { nome: "Controle", status: "Aberto" },
            { nome: "Montagem", status: "Aberto" }
        ]
    },
    {
        titulo: "Estufa Inteligente",
        descricao: "Sistema automatizado para controle de clima em estufas.",
        status: "aberto",
        habilidades: ["Automação", "Sensores", "Agricultura"],
        modulos: [
            { nome: "Sensores", status: "Concluído" },
            { nome: "Atuadores", status: "Aberto" },
            { nome: "Software", status: "Aberto" }
        ]
    },
    {
        titulo: "Gerador Portátil de Energia",
        descricao: "Dispositivo compacto para geração de energia em emergências.",
        status: "aberto",
        habilidades: ["Eletrônica", "Energia", "Design"],
        modulos: [
            { nome: "Circuito", status: "Em andamento" },
            { nome: "Bateria", status: "Aberto" },
            { nome: "Carcaça", status: "Aberto" }
        ]
    }
];

// Projetos em destaque (primeiros 4 projetos)
const projetosDestaque = projetos.slice(0, 4);

// Elementos do DOM
const contentArea = document.getElementById('contentArea');
const btnOportunidades = document.getElementById('btnOportunidades');
const btnProjetos = document.getElementById('btnProjetos');
const btnLogout = document.getElementById('btnLogout');
const btnCadastro = document.getElementById('btnCadastro');
const modoDiaNoite = document.getElementById('modoDiaNoite');
const iconeModo = document.querySelector('.icone-modo');
const modalCadastro = document.getElementById('modalCadastro');
const modalProjeto = document.getElementById('modalProjeto');
const btnConfirmarCadastro = document.getElementById('btnConfirmarCadastro');
const closeButtons = document.querySelectorAll('.close-button');

// Função para alternar modo dia/noite
function alternarModo() {
    document.body.classList.toggle('light-mode');
    
    // Salvar preferência no localStorage
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('lightMode', isLightMode);
    
    // Atualizar ícone
    iconeModo.textContent = isLightMode ? '☀️' : '🌙';
}

// Verificar preferência salva ao carregar a página
function carregarPreferenciaModo() {
    const savedMode = localStorage.getItem('lightMode');
    if (savedMode === 'true') {
        document.body.classList.add('light-mode');
        iconeModo.textContent = '☀️';
    }
}

// Função para renderizar projetos
function renderizarProjetos(listaProjetos) {
    contentArea.innerHTML = '';
    
    const titulo = document.createElement('h2');
    titulo.textContent = listaProjetos === projetosDestaque ? 'Projetos em Destaque' : 'Oportunidades Disponíveis';
    titulo.style.color = 'var(--accent-cyan)';
    titulo.style.marginBottom = '1.5rem';
    contentArea.appendChild(titulo);
    
    const container = document.createElement('div');
    container.className = 'projetos-container';
    
    listaProjetos.forEach(projeto => {
        const card = document.createElement('div');
        card.className = 'projeto-card';
        card.onclick = () => abrirModalProjeto(projeto);
        
        const tituloCard = document.createElement('h3');
        tituloCard.className = 'projeto-titulo';
        tituloCard.textContent = projeto.titulo;
        card.appendChild(tituloCard);
        
        const descricao = document.createElement('p');
        descricao.className = 'projeto-descricao';
        descricao.textContent = projeto.descricao;
        card.appendChild(descricao);
        
        const status = document.createElement('span');
        status.className = `projeto-status status-${projeto.status}`;
        status.textContent = projeto.status === 'aberto' ? 'Aberto para colaboração' : 'Em andamento';
        card.appendChild(status);
        
        const habilidadesContainer = document.createElement('div');
        habilidadesContainer.className = 'habilidades-necessarias';
        
        const habilidadesTitulo = document.createElement('div');
        habilidadesTitulo.className = 'habilidades-titulo';
        habilidadesTitulo.textContent = 'Habilidades necessárias:';
        habilidadesContainer.appendChild(habilidadesTitulo);
        
        const habilidadesLista = document.createElement('div');
        habilidadesLista.className = 'habilidades-lista';
        
        projeto.habilidades.forEach(habilidade => {
            const tag = document.createElement('span');
            tag.className = 'habilidade-tag';
            tag.textContent = habilidade;
            habilidadesLista.appendChild(tag);
        });
        
        habilidadesContainer.appendChild(habilidadesLista);
        card.appendChild(habilidadesContainer);
        
        container.appendChild(card);
    });
    
    contentArea.appendChild(container);
}

// Função para abrir modal de projeto
function abrirModalProjeto(projeto) {
    document.getElementById('projetoTitulo').textContent = projeto.titulo;
    document.getElementById('projetoDescricao').textContent = projeto.descricao;
    
    const modulosContainer = document.getElementById('projetoModulos');
    modulosContainer.innerHTML = '';
    
    projeto.modulos.forEach(modulo => {
        const moduloItem = document.createElement('div');
        moduloItem.className = 'modulo-item';
        
        const moduloNome = document.createElement('div');
        moduloNome.className = 'modulo-nome';
        moduloNome.textContent = modulo.nome;
        moduloItem.appendChild(moduloNome);
        
        const moduloStatus = document.createElement('div');
        moduloStatus.className = `modulo-status status-${modulo.status.toLowerCase().replace(' ', '-')}`;
        moduloStatus.textContent = modulo.status;
        moduloItem.appendChild(moduloStatus);
        
        modulosContainer.appendChild(moduloItem);
    });
    
    modalProjeto.classList.add('show');
}

// Inicialização do aplicativo
function initApp() {
    // Carregar preferência de modo
    carregarPreferenciaModo();
    
    // Configurar event listeners
    btnOportunidades.addEventListener('click', () => {
        renderizarProjetos(projetos);
    });
    
    btnProjetos.addEventListener('click', () => {
        renderizarProjetos(projetosDestaque);
    });
    
  
    btnLogout.addEventListener('click', () => {
        alert('Logout efetuado');
    });
    
    btnCadastro.addEventListener('click', () => {
        modalCadastro.classList.add('show');
    });
    
    modoDiaNoite.addEventListener('click', alternarModo);
    
    btnConfirmarCadastro.addEventListener('click', () => {
        alert('Cadastro confirmado com sucesso!');
        modalCadastro.classList.remove('show');
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalCadastro.classList.remove('show');
            modalProjeto.classList.remove('show');
        });
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modalCadastro) {
            modalCadastro.classList.remove('show');
        }
        if (event.target === modalProjeto) {
            modalProjeto.classList.remove('show');
        }
    });
    
    // Exibir mensagem de boas-vindas inicial
    contentArea.innerHTML = `
        <div class="welcome-message">
            <h1>Bem-vindo à Fabr</h1>
            <p>Plataforma colaborativa de fabricação</p>
            <p>Selecione uma opção no menu para começar</p>
        </div>
    `;
}

// Iniciar o aplicativo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initApp);