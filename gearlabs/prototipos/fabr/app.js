// Dados iniciais simulados
const projetos = [
    {
        id: 1,
        titulo: "Máquina de Reciclagem de Plásticos",
        descricao: "Projeto modular para triturar, extrusar e moldar plástico reciclado.",
        modulos: ["Química", "Mecânica", "Eletrônica"],
        status: "Aberto",
        prazo: "12 semanas",
        colaboradores: 14,
        detalhes: "Este projeto visa criar uma máquina modular capaz de transformar plástico reciclado em novos produtos. O sistema consiste em três módulos principais: trituração, extrusão e moldagem."
    },
    {
        id: 2,
        titulo: "Mini Turbina Eólica Urbana",
        descricao: "Turbina de baixo custo para geração em telhados residenciais.",
        modulos: ["Design CAD", "Aerodinâmica", "Eletrônica de Potência"],
        status: "Aberto",
        prazo: "8 semanas",
        colaboradores: 9,
        detalhes: "Desenvolvimento de uma turbina eólica compacta e eficiente para geração de energia em ambientes urbanos, com foco em baixo custo e fácil instalação."
    },
    {
        id: 3,
        titulo: "Sistema de Irrigação Inteligente",
        descricao: "Automação de irrigação baseada em sensores de umidade do solo.",
        modulos: ["Eletrônica", "Programação", "Design de Produto"],
        status: "Em andamento",
        prazo: "6 semanas",
        colaboradores: 7,
        detalhes: "Sistema autônomo que monitora a umidade do solo e aciona a irrigação apenas quando necessário, economizando água e otimizando o crescimento das plantas."
    },
    {
        id: 4,
        titulo: "Bicicleta Elétrica Modular",
        descricao: "Kit de conversão para transformar bicicletas comuns em elétricas.",
        modulos: ["Mecânica", "Eletrônica", "Design Industrial"],
        status: "Aberto",
        prazo: "10 semanas",
        colaboradores: 12,
        detalhes: "Desenvolvimento de um kit modular que permite converter qualquer bicicleta convencional em uma bicicleta elétrica, com foco em facilidade de instalação e custo acessível."
    }
];

const habilidadesDisponiveis = [
    "Soldagem", "CAD", "Impressão 3D", "Eletrônica", "Química de Materiais",
    "Programação", "Design Industrial", "Mecânica", "Aerodinâmica",
    "Eletrônica de Potência", "Design de Produto", "Robótica", "Automação"
];

// Estado global da aplicação
let estadoApp = {
    usuarioLogado: null,
    usuarios: [],
    modoEscuro: false,
    paginaAtual: 'dashboard'
};

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', function() {
    carregarEstadoApp();
    inicializarEventListeners();
    verificarLogin();
    aplicarModoEscuro();
});

// Carregar estado do localStorage
function carregarEstadoApp() {
    const savedState = localStorage.getItem('fabrAppState');
    if (savedState) {
        estadoApp = JSON.parse(savedState);
    }
    
    // Garantir que usuários seja um array
    if (!Array.isArray(estadoApp.usuarios)) {
        estadoApp.usuarios = [];
    }
    
    // Salvar estado inicial se não existir
    if (!savedState) {
        salvarEstadoApp();
    }
}

// Salvar estado no localStorage
function salvarEstadoApp() {
    localStorage.setItem('fabrAppState', JSON.stringify(estadoApp));
}

// Inicializar event listeners
function inicializarEventListeners() {
    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleModoEscuro);
    
    // Auth form
    document.getElementById('auth-form').addEventListener('submit', handleAuth);
    document.getElementById('auth-switch-link').addEventListener('click', toggleAuthMode);
    
    // Navigation
    document.querySelectorAll('.nav-menu a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navegarPara(link.dataset.page);
        });
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Add habilidade
    document.getElementById('add-habilidade-btn').addEventListener('click', abrirModalHabilidades);
    document.getElementById('add-habilidade-cadastro').addEventListener('click', abrirModalHabilidadesCadastro);
    
    // Editar perfil
    document.getElementById('editar-perfil-btn').addEventListener('click', abrirModalEditarPerfil);
    
    // Modal
    document.getElementById('modal-close').addEventListener('click', fecharModal);
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            fecharModal();
        }
    });
    
    // Filtro de projetos
    document.getElementById('filtro-habilidade').addEventListener('change', filtrarProjetos);
}

// Verificar se usuário está logado
function verificarLogin() {
    if (estadoApp.usuarioLogado) {
        mostrarDashboard();
    } else {
        mostrarAuth();
    }
}

// Mostrar tela de autenticação
function mostrarAuth() {
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('projetos-page').style.display = 'none';
    document.getElementById('habilidades-page').style.display = 'none';
    document.getElementById('perfil-page').style.display = 'none';
}

// Mostrar dashboard
function mostrarDashboard() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('projetos-page').style.display = 'none';
    document.getElementById('habilidades-page').style.display = 'none';
    document.getElementById('perfil-page').style.display = 'none';
    
    atualizarDashboard();
    estadoApp.paginaAtual = 'dashboard';
}

// Navegar para página específica
function navegarPara(pagina) {
    if (!estadoApp.usuarioLogado) return;
    
    // Esconder todas as páginas
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('projetos-page').style.display = 'none';
    document.getElementById('habilidades-page').style.display = 'none';
    document.getElementById('perfil-page').style.display = 'none';
    
    // Mostrar página selecionada
    switch(pagina) {
        case 'projetos':
            document.getElementById('projetos-page').style.display = 'block';
            renderizarProjetos();
            preencherFiltroHabilidades();
            break;
        case 'habilidades':
            document.getElementById('habilidades-page').style.display = 'block';
            renderizarHabilidades();
            break;
        case 'perfil':
            document.getElementById('perfil-page').style.display = 'block';
            renderizarPerfil();
            break;
    }
    
    estadoApp.paginaAtual = pagina;
}

// Toggle modo escuro
function toggleModoEscuro() {
    estadoApp.modoEscuro = !estadoApp.modoEscuro;
    aplicarModoEscuro();
    salvarEstadoApp();
}

// Aplicar modo escuro
function aplicarModoEscuro() {
    if (estadoApp.modoEscuro) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Toggle entre login e cadastro
function toggleAuthMode(e) {
    e.preventDefault();
    const isLogin = document.getElementById('auth-title').textContent === 'Login';
    
    if (isLogin) {
        document.getElementById('auth-title').textContent = 'Cadastro';
        document.getElementById('auth-submit').textContent = 'Cadastrar';
        document.getElementById('auth-switch-text').textContent = 'Já tem uma conta?';
        document.getElementById('auth-switch-link').textContent = 'Faça login';
        
        document.getElementById('nome-group').style.display = 'block';
        document.getElementById('localizacao-group').style.display = 'block';
        document.getElementById('habilidades-group').style.display = 'block';
    } else {
        document.getElementById('auth-title').textContent = 'Login';
        document.getElementById('auth-submit').textContent = 'Entrar';
        document.getElementById('auth-switch-text').textContent = 'Não tem uma conta?';
        document.getElementById('auth-switch-link').textContent = 'Cadastre-se';
        
        document.getElementById('nome-group').style.display = 'none';
        document.getElementById('localizacao-group').style.display = 'none';
        document.getElementById('habilidades-group').style.display = 'none';
    }
    
    // Limpar erros
    limparErros();
}

// Handle auth form submit
function handleAuth(e) {
    e.preventDefault();
    limparErros();
    
    const isLogin = document.getElementById('auth-title').textContent === 'Login';
    const formData = new FormData(e.target);
    
    if (isLogin) {
        handleLogin(formData);
    } else {
        handleCadastro(formData);
    }
}

// Handle login
function handleLogin(formData) {
    const email = formData.get('email');
    const senha = formData.get('senha');
    
    // Validação básica
    if (!email || !senha) {
        mostrarErro('email', 'E-mail é obrigatório');
        mostrarErro('senha', 'Senha é obrigatória');
        return;
    }
    
    if (!validarEmail(email)) {
        mostrarErro('email', 'E-mail inválido');
        return;
    }
    
    // Verificar usuário
    const usuario = estadoApp.usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        estadoApp.usuarioLogado = usuario;
        salvarEstadoApp();
        mostrarDashboard();
        mostrarMensagemSucesso('Login realizado com sucesso!');
    } else {
        mostrarErro('email', 'E-mail ou senha incorretos');
    }
}

// Handle cadastro
function handleCadastro(formData) {
    const nome = formData.get('nome');
    const email = formData.get('email');
    const senha = formData.get('senha');
    const localizacao = formData.get('localizacao');
    
    // Validação
    if (!nome || !email || !senha || !localizacao) {
        if (!nome) mostrarErro('nome', 'Nome é obrigatório');
        if (!email) mostrarErro('email', 'E-mail é obrigatório');
        if (!senha) mostrarErro('senha', 'Senha é obrigatória');
        if (!localizacao) mostrarErro('localizacao', 'Localização é obrigatória');
        return;
    }
    
    if (!validarEmail(email)) {
        mostrarErro('email', 'E-mail inválido');
        return;
    }
    
    if (senha.length < 6) {
        mostrarErro('senha', 'Senha deve ter pelo menos 6 caracteres');
        return;
    }
    
    // Verificar se e-mail já existe
    if (estadoApp.usuarios.some(u => u.email === email)) {
        mostrarErro('email', 'E-mail já cadastrado');
        return;
    }
    
    // Criar novo usuário
    const novoUsuario = {
        id: Date.now(),
        nome,
        email,
        senha,
        localizacao,
        habilidades: [],
        projetos: [],
        reputacao: 0,
        bio: `${nome} é um entusiasta de fabricação compartilhada.`
    };
    
    estadoApp.usuarios.push(novoUsuario);
    estadoApp.usuarioLogado = novoUsuario;
    salvarEstadoApp();
    
    mostrarDashboard();
    mostrarMensagemSucesso('Cadastro realizado com sucesso!');
}

// Validar e-mail
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar erro
function mostrarErro(campo, mensagem) {
    const errorElement = document.getElementById(`${campo}-error`);
    if (errorElement) {
        errorElement.textContent = mensagem;
    }
}

// Limpar erros
function limparErros() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

// Logout
function logout() {
    estadoApp.usuarioLogado = null;
    salvarEstadoApp();
    mostrarAuth();
    mostrarMensagemSucesso('Logout realizado com sucesso!');
}

// Atualizar dashboard
function atualizarDashboard() {
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    // Projetos disponíveis (filtrados por habilidades do usuário)
    const projetosDisponiveis = projetos.filter(p => 
        p.status === 'Aberto' && 
        p.modulos.some(m => usuario.habilidades.includes(m))
    ).length;
    
    // Projetos em andamento
    const projetosAndamento = usuario.projetos.length;
    
    // Contribuições (módulos entregues)
    const contribuicoes = usuario.projetos.filter(p => 
        p.moduloStatus === 'entregue' || p.moduloStatus === 'validado'
    ).length;
    
    document.getElementById('projetos-disponiveis').textContent = projetosDisponiveis;
    document.getElementById('projetos-andamento').textContent = projetosAndamento;
    document.getElementById('contribuicoes').textContent = contribuicoes;
}

// Renderizar projetos
function renderizarProjetos() {
    const projetosGrid = document.getElementById('projetos-grid');
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    // Filtrar projetos por habilidades do usuário
    let projetosFiltrados = projetos.filter(p => 
        p.modulos.some(m => usuario.habilidades.includes(m))
    );
    
    // Aplicar filtro adicional se selecionado
    const filtroHabilidade = document.getElementById('filtro-habilidade').value;
    if (filtroHabilidade) {
        projetosFiltrados = projetosFiltrados.filter(p => 
            p.modulos.includes(filtroHabilidade)
        );
    }
    
    projetosGrid.innerHTML = projetosFiltrados.map(projeto => `
        <div class="projeto-card">
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <div class="projeto-modulos">
                ${projeto.modulos.map(m => `<span class="modulo-tag">${m}</span>`).join('')}
            </div>
            <div class="projeto-info">
                <span class="projeto-status status-${projeto.status.toLowerCase()}">${projeto.status}</span>
                <span>⏱️ ${projeto.prazo}</span>
                <span>👥 ${projeto.colaboradores}</span>
            </div>
            <button class="btn-ver-detalhes" onclick="abrirModalProjeto(${projeto.id})">
                Ver detalhes
            </button>
        </div>
    `).join('');
}

// Preencher filtro de habilidades
function preencherFiltroHabilidades() {
    const select = document.getElementById('filtro-habilidade');
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    select.innerHTML = '<option value="">Todas as habilidades</option>' +
        usuario.habilidades.map(h => `<option value="${h}">${h}</option>`).join('');
}

// Filtrar projetos
function filtrarProjetos() {
    renderizarProjetos();
}

// Renderizar habilidades
function renderizarHabilidades() {
    const habilidadesList = document.getElementById('habilidades-list');
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    habilidadesList.innerHTML = usuario.habilidades.map(habilidade => `
        <div class="habilidade-item">
            <span>${habilidade}</span>
            <button class="habilidade-remove" onclick="removerHabilidade('${habilidade}')">×</button>
        </div>
    `).join('');
}

// Abrir modal de habilidades
function abrirModalHabilidades() {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h3>Adicionar Habilidade</h3>
        <div class="form-group">
            <label for="habilidade-busca">Buscar habilidade:</label>
            <input type="text" id="habilidade-busca" placeholder="Digite para buscar..." onkeyup="filtrarHabilidadesDisponiveis()">
        </div>
        <div class="habilidades-disponiveis" id="habilidades-disponiveis">
            ${habilidadesDisponiveis.map(h => `
                <button class="habilidade-opcao" onclick="adicionarHabilidade('${h}')">${h}</button>
            `).join('')}
        </div>
    `;
    
    abrirModal();
}

// Abrir modal de habilidades (cadastro)
function abrirModalHabilidadesCadastro() {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h3>Adicionar Habilidade</h3>
        <div class="form-group">
            <label for="habilidade-busca">Buscar habilidade:</label>
            <input type="text" id="habilidade-busca" placeholder="Digite para buscar..." onkeyup="filtrarHabilidadesDisponiveisCadastro()">
        </div>
        <div class="habilidades-disponiveis" id="habilidades-disponiveis">
            ${habilidadesDisponiveis.map(h => `
                <button class="habilidade-opcao" onclick="adicionarHabilidadeCadastro('${h}')">${h}</button>
            `).join('')}
        </div>
    `;
    
    abrirModal();
}

// Filtrar habilidades disponíveis
function filtrarHabilidadesDisponiveis() {
    const busca = document.getElementById('habilidade-busca').value.toLowerCase();
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    const habilidadesFiltradas = habilidadesDisponiveis.filter(h => 
        h.toLowerCase().includes(busca) && !usuario.habilidades.includes(h)
    );
    
    document.getElementById('habilidades-disponiveis').innerHTML = habilidadesFiltradas.map(h => `
        <button class="habilidade-opcao" onclick="adicionarHabilidade('${h}')">${h}</button>
    `).join('');
}

// Filtrar habilidades disponíveis (cadastro)
function filtrarHabilidadesDisponiveisCadastro() {
    const busca = document.getElementById('habilidade-busca').value.toLowerCase();
    const habilidadesAtuais = Array.from(document.querySelectorAll('#habilidades-cadastro .habilidade-tag'))
        .map(tag => tag.textContent.replace('×', '').trim());
    
    const habilidadesFiltradas = habilidadesDisponiveis.filter(h => 
        h.toLowerCase().includes(busca) && !habilidadesAtuais.includes(h)
    );
    
    document.getElementById('habilidades-disponiveis').innerHTML = habilidadesFiltradas.map(h => `
        <button class="habilidade-opcao" onclick="adicionarHabilidadeCadastro('${h}')">${h}</button>
    `).join('');
}

// Adicionar habilidade
function adicionarHabilidade(habilidade) {
    const usuario = estadoApp.usuarioLogado;
    if (!usuario || usuario.habilidades.includes(habilidade)) return;
    
    usuario.habilidades.push(habilidade);
    salvarEstadoApp();
    
    renderizarHabilidades();
    fecharModal();
    mostrarMensagemSucesso('Habilidade adicionada com sucesso!');
}

// Adicionar habilidade (cadastro)
function adicionarHabilidadeCadastro(habilidade) {
    const habilidadesContainer = document.getElementById('habilidades-cadastro');
    
    // Verificar se já existe
    const existente = Array.from(habilidadesContainer.children).find(
        tag => tag.textContent.replace('×', '').trim() === habilidade
    );
    
    if (existente) return;
    
    const tag = document.createElement('span');
    tag.className = 'habilidade-tag';
    tag.innerHTML = `${habilidade} <button onclick="this.parentElement.remove()">×</button>`;
    
    habilidadesContainer.appendChild(tag);
}

// Remover habilidade
function removerHabilidade(habilidade) {
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    usuario.habilidades = usuario.habilidades.filter(h => h !== habilidade);
    salvarEstadoApp();
    
    renderizarHabilidades();
    mostrarMensagemSucesso('Habilidade removida com sucesso!');
}

// Abrir modal de projeto
function abrirModalProjeto(projetoId) {
    const projeto = projetos.find(p => p.id === projetoId);
    if (!projeto) return;
    
    const usuario = estadoApp.usuarioLogado;
    const jaParticipando = usuario.projetos.some(p => p.id === projetoId);
    
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h3>${projeto.titulo}</h3>
        <p><strong>Descrição:</strong> ${projeto.detalhes}</p>
        <p><strong>Status:</strong> ${projeto.status}</p>
        <p><strong>Prazo:</strong> ${projeto.prazo}</p>
        <p><strong>Colaboradores:</strong> ${projeto.colaboradores}</p>
        <div class="modal-modulos">
            <strong>Módulos necessários:</strong><br>
            ${projeto.modulos.map(m => `<span class="modulo-tag">${m}</span>`).join('')}
        </div>
        ${!jaParticipando ? `
            <button class="btn-participar" onclick="participarProjeto(${projeto.id})">
                Quero participar
            </button>
        ` : '<p><strong>Você já participa deste projeto!</strong></p>'}
    `;
    
    abrirModal();
}

// Participar do projeto
function participarProjeto(projetoId) {
    const projeto = projetos.find(p => p.id === projetoId);
    const usuario = estadoApp.usuarioLogado;
    if (!projeto || !usuario) return;
    
    // Encontrar módulo compatível com as habilidades do usuário
    const moduloCompativel = projeto.modulos.find(m => usuario.habilidades.includes(m));
    
    if (!moduloCompativel) {
        mostrarMensagemSucesso('Você não possui as habilidades necessárias para este projeto.');
        return;
    }
    
    // Adicionar projeto ao usuário
    usuario.projetos.push({
        id: projetoId,
        titulo: projeto.titulo,
        modulo: moduloCompativel,
        moduloStatus: 'pendente'
    });
    
    // Atualizar reputação
    usuario.reputacao += 10;
    
    salvarEstadoApp();
    fecharModal();
    mostrarMensagemSucesso('Você agora participa deste projeto!');
    
    // Atualizar dashboard se estiver na página
    if (estadoApp.paginaAtual === 'dashboard') {
        atualizarDashboard();
    }
}

// Renderizar perfil
function renderizarPerfil() {
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    document.getElementById('perfil-nome').textContent = usuario.nome;
    document.getElementById('perfil-bio').textContent = usuario.bio;
    document.getElementById('perfil-localizacao').textContent = `📍 ${usuario.localizacao}`;
    document.getElementById('reputacao-pontos').textContent = `${usuario.reputacao} pontos`;
    
    // Atualizar barra de reputação
    const reputacaoFill = document.getElementById('reputacao-fill');
    const reputacaoPercent = Math.min((usuario.reputacao / 100) * 100, 100);
    reputacaoFill.style.width = `${reputacaoPercent}%`;
    
    // Renderizar habilidades
    const perfilHabilidades = document.getElementById('perfil-habilidades');
    perfilHabilidades.innerHTML = usuario.habilidades.map(h => `
        <span class="habilidade-tag">${h}</span>
    `).join('');
    
    // Renderizar projetos do usuário
    const meusProjetosList = document.getElementById('meus-projetos-list');
    meusProjetosList.innerHTML = usuario.projetos.map(p => `
        <div class="meu-projeto-item">
            <h4>${p.titulo}</h4>
            <div class="meu-projeto-info">
                <span><strong>Módulo:</strong> ${p.modulo}</span>
                <select class="status-select" onchange="atualizarStatusModulo(${p.id}, this.value)">
                    <option value="pendente" ${p.moduloStatus === 'pendente' ? 'selected' : ''}>Pendente</option>
                    <option value="prototipagem" ${p.moduloStatus === 'prototipagem' ? 'selected' : ''}>Em prototipagem</option>
                    <option value="entregue" ${p.moduloStatus === 'entregue' ? 'selected' : ''}>Entregue</option>
                    <option value="validado" ${p.moduloStatus === 'validado' ? 'selected' : ''}>Validado</option>
                </select>
            </div>
        </div>
    `).join('');
}

// Abrir modal editar perfil
function abrirModalEditarPerfil() {
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h3>Editar Perfil</h3>
        <form id="editar-perfil-form" onsubmit="salvarPerfilEditado(event)">
            <div class="form-group">
                <label for="editar-nome">Nome</label>
                <input type="text" id="editar-nome" value="${usuario.nome}" required>
            </div>
            <div class="form-group">
                <label for="editar-localizacao">Localização</label>
                <input type="text" id="editar-localizacao" value="${usuario.localizacao}" required>
            </div>
            <div class="form-group">
                <label for="editar-bio">Bio</label>
                <textarea id="editar-bio" rows="3">${usuario.bio}</textarea>
            </div>
            <button type="submit" class="btn-primary">Salvar alterações</button>
        </form>
    `;
    
    abrirModal();
}

// Salvar perfil editado
function salvarPerfilEditado(e) {
    e.preventDefault();
    
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    usuario.nome = document.getElementById('editar-nome').value;
    usuario.localizacao = document.getElementById('editar-localizacao').value;
    usuario.bio = document.getElementById('editar-bio').value;
    
    salvarEstadoApp();
    fecharModal();
    renderizarPerfil();
    mostrarMensagemSucesso('Perfil atualizado com sucesso!');
}

// Atualizar status do módulo
function atualizarStatusModulo(projetoId, novoStatus) {
    const usuario = estadoApp.usuarioLogado;
    if (!usuario) return;
    
    const projeto = usuario.projetos.find(p => p.id === projetoId);
    if (!projeto) return;
    
    const statusAnterior = projeto.moduloStatus;
    projeto.moduloStatus = novoStatus;
    
    // Atualizar reputação baseado no status
    if (novoStatus === 'entregue' && statusAnterior !== 'entregue') {
        usuario.reputacao += 20;
    } else if (novoStatus === 'validado' && statusAnterior !== 'validado') {
        usuario.reputacao += 30;
    }
    
    salvarEstadoApp();
    renderizarPerfil();
    
    if (estadoApp.paginaAtual === 'dashboard') {
        atualizarDashboard();
    }
    
    mostrarMensagemSucesso('Status do módulo atualizado!');
}

// Modal functions
function abrirModal() {
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Mostrar mensagem de sucesso
function mostrarMensagemSucesso(mensagem) {
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    
    successText.textContent = mensagem;
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Adicionar estilos para elementos dinâmicos
const estiloAdicional = document.createElement('style');
estiloAdicional.textContent = `
    .habilidades-disponiveis {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
    }
    
    .habilidade-opcao {
        background-color: var(--accent-color);
        border: none;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-sm);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .habilidade-opcao:hover {
        background-color: var(--primary-color);
        color: white;
    }
    
    .habilidades-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        margin-top: var(--spacing-sm);
    }
    
    .habilidade-tag {
        background-color: var(--accent-color);
        color: var(--text-primary);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--border-radius-sm);
        font-size: var(--font-size-sm);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
    }
    
    .habilidade-tag button {
        background: none;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        font-size: var(--font-size-lg);
        line-height: 1;
        padding: 0;
    }
    
    textarea {
        width: 100%;
        padding: var(--spacing-sm);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        font-size: var(--font-size-base);
        background-color: var(--background-color);
        color: var(--text-primary);
        resize: vertical;
        font-family: var(--font-family);
    }
    
    textarea:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;
document.head.appendChild(estiloAdicional);