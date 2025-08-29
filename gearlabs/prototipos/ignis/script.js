// Estado da aplicação
const state = {
    contractorBalance: 1000.00,
    providerBalance: 500.00,
    contracts: [],
    currentContractId: null,
    contractCounter: 0,
    completedContracts: 0
};

// Status dos contratos
const CONTRACT_STATUS = {
    CREATED: 'created',
    AWAITING_PROOF: 'awaiting_proof',
    UNDER_REVIEW: 'under_review',
    IN_DISPUTE: 'in_dispute',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateBalances();
    updateStats();
    document.getElementById('contractForm').addEventListener('submit', createContract);
    
    // Fechar modais ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
});

// Criar novo contrato
function createContract(e) {
    e.preventDefault();
    
    const serviceName = document.getElementById('serviceName').value;
    const value = parseFloat(document.getElementById('contractValue').value);
    const deadline = parseInt(document.getElementById('contractDeadline').value);

    if (value > state.contractorBalance) {
        showNotification('Saldo insuficiente!', 'error');
        return;
    }

    const contract = {
        id: ++state.contractCounter,
        serviceName,
        value,
        deadline,
        status: CONTRACT_STATUS.CREATED,
        createdAt: new Date(),
        proof: null,
        disputeCount: 0,
        finalDecision: null
    };

    state.contracts.push(contract);
    state.contractorBalance -= value;

    addLog(`Contratante criou contrato #${contract.id}: ${serviceName} - ${value} USDC`);
    updateBalances();
    updateStats();
    renderContracts();
    updateActionPanels();

    // Iniciar contador de prazo
    startDeadlineTimer(contract);

    // Resetar formulário
    document.getElementById('contractForm').reset();

    showNotification('Contrato criado com sucesso!', 'success');
}

// Iniciar timer de prazo
function startDeadlineTimer(contract) {
    const timer = setInterval(() => {
        contract.deadline--;
        
        if (contract.deadline <= 0) {
            clearInterval(timer);
            handleDeadlineExpiry(contract);
        }
        
        renderContracts();
    }, 1000);

    contract.timer = timer;
}

// Lidar com expiração do prazo
function handleDeadlineExpiry(contract) {
    if (contract.status === CONTRACT_STATUS.CREATED) {
        contract.status = CONTRACT_STATUS.CANCELLED;
        state.contractorBalance += contract.value;
        addLog(`Contrato #${contract.id} cancelado por expiração de prazo`);
        updateBalances();
    } else if (contract.status === CONTRACT_STATUS.UNDER_REVIEW) {
        contract.status = CONTRACT_STATUS.IN_DISPUTE;
        contract.disputeCount = 1;
        addLog(`Contrato #${contract.id} em disputa automática por falta de resposta`);
        showDisputeModal(contract);
        simulateJudgeDecision(contract);
    }
    renderContracts();
    updateActionPanels();
}

// Renderizar lista de contratos
function renderContracts() {
    const container = document.getElementById('contractsList');
    
    if (state.contracts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>Nenhum contrato criado ainda</p>
                <p class="empty-subtitle">Crie seu primeiro contrato para começar</p>
            </div>
        `;
        document.getElementById('contractCount').textContent = '0 contratos';
        return;
    }

    document.getElementById('contractCount').textContent = `${state.contracts.length} contrato(s)`;

    container.innerHTML = state.contracts.map(contract => `
        <div class="contract-card status-${contract.status}">
            <div class="contract-header">
                <div>
                    <h3 class="contract-title">${contract.serviceName}</h3>
                    <p class="contract-id">Contrato #${contract.id}</p>
                </div>
                <span class="status-badge status-${contract.status}">
                    ${getStatusText(contract.status)}
                </span>
            </div>
            
            <div class="contract-details">
                <div class="detail-item">
                    <p class="detail-label">Valor</p>
                    <p class="detail-value">${contract.value.toFixed(2)} USDC</p>
                </div>
                <div class="detail-item">
                    <p class="detail-label">Prazo Restante</p>
                    <p class="detail-value ${contract.deadline <= 5 ? 'warning' : ''}">${contract.deadline}s</p>
                </div>
            </div>

            ${contract.proof ? `
                <div class="proof-section">
                    <p class="proof-label">Prova enviada:</p>
                    <p class="proof-text">${contract.proof}</p>
                </div>
            ` : ''}

            <div class="contract-actions">
                ${getActionButtons(contract)}
            </div>
        </div>
    `).join('');
}

// Obter texto do status
function getStatusText(status) {
    const texts = {
        [CONTRACT_STATUS.CREATED]: 'Criado',
        [CONTRACT_STATUS.AWAITING_PROOF]: 'Aguardando Prova',
        [CONTRACT_STATUS.UNDER_REVIEW]: 'Em Revisão',
        [CONTRACT_STATUS.IN_DISPUTE]: 'Em Disputa',
        [CONTRACT_STATUS.COMPLETED]: 'Concluído',
        [CONTRACT_STATUS.CANCELLED]: 'Cancelado'
    };
    return texts[status] || 'Desconhecido';
}

// Obter botões de ação
function getActionButtons(contract) {
    switch (contract.status) {
        case CONTRACT_STATUS.CREATED:
            return `
                <button onclick="openProofModal(${contract.id})" class="btn btn-primary">
                    <i class="fas fa-upload"></i>
                    Enviar Prova
                </button>
            `;
        case CONTRACT_STATUS.UNDER_REVIEW:
            return `
                <button onclick="openReviewModal(${contract.id})" class="btn btn-primary">
                    <i class="fas fa-eye"></i>
                    Revisar
                </button>
            `;
        case CONTRACT_STATUS.IN_DISPUTE:
            if (contract.disputeCount < 2) {
                return `
                    <button onclick="showDisputeModal(${contract.id})" class="btn btn-warning">
                        <i class="fas fa-gavel"></i>
                        Ver Disputa
                    </button>
                `;
            }
            return '';
        default:
            return '';
    }
}

// Atualizar painéis de ação
function updateActionPanels() {
    updateContractorActions();
    updateProviderActions();
}

// Atualizar ações do contratante
function updateContractorActions() {
    const container = document.getElementById('contractorActions');
    const reviewContracts = state.contracts.filter(c => c.status === CONTRACT_STATUS.UNDER_REVIEW);
    
    if (reviewContracts.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhuma ação pendente</p>';
        return;
    }

    container.innerHTML = reviewContracts.map(contract => `
        <div class="action-item">
            <h4>Contrato #${contract.id}</h4>
            <p>${contract.serviceName}</p>
            <button onclick="openReviewModal(${contract.id})" class="btn btn-primary">
                <i class="fas fa-eye"></i>
                Revisar Prova
            </button>
        </div>
    `).join('');
}

// Atualizar ações do prestador
function updateProviderActions() {
    const container = document.getElementById('providerActions');
    const pendingContracts = state.contracts.filter(c => c.status === CONTRACT_STATUS.CREATED);
    
    if (pendingContracts.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum serviço pendente</p>';
        return;
    }

    container.innerHTML = pendingContracts.map(contract => `
        <div class="action-item">
            <h4>Contrato #${contract.id}</h4>
            <p>${contract.serviceName}</p>
            <p>Valor: ${contract.value.toFixed(2)} USDC</p>
            <button onclick="openProofModal(${contract.id})" class="btn btn-primary">
                <i class="fas fa-upload"></i>
                Enviar Prova
            </button>
        </div>
    `).join('');
}

// Abrir modal de prova
function openProofModal(contractId) {
    state.currentContractId = contractId;
    document.getElementById('proofModal').classList.add('active');
    document.getElementById('proofText').focus();
}

// Fechar modal de prova
function closeProofModal() {
    document.getElementById('proofModal').classList.remove('active');
    document.getElementById('proofText').value = '';
    state.currentContractId = null;
}

// Enviar prova
function submitProof() {
    const proof = document.getElementById('proofText').value.trim();
    if (!proof) {
        showNotification('Por favor, insira uma prova!', 'error');
        return;
    }

    const contract = state.contracts.find(c => c.id === state.currentContractId);
    if (contract) {
        contract.proof = proof;
        contract.status = CONTRACT_STATUS.UNDER_REVIEW;
        addLog(`Prestador enviou prova para contrato #${contract.id}`);
        renderContracts();
        updateActionPanels();
        closeProofModal();
        showNotification('Prova enviada com sucesso!', 'success');
    }
}

// Abrir modal de revisão
function openReviewModal(contractId) {
    state.currentContractId = contractId;
    const contract = state.contracts.find(c => c.id === contractId);
    document.getElementById('reviewProof').textContent = contract.proof;
    document.getElementById('reviewModal').classList.add('active');
}

// Fechar modal de revisão
function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('active');
    state.currentContractId = null;
}

// Aprovar prova
function approveProof() {
    const contract = state.contracts.find(c => c.id === state.currentContractId);
    if (contract) {
        contract.status = CONTRACT_STATUS.COMPLETED;
        state.providerBalance += contract.value;
        state.completedContracts++;
        clearInterval(contract.timer);
        addLog(`Contratante aprovou contrato #${contract.id}! Pagamento liberado`);
        updateBalances();
        updateStats();
        renderContracts();
        updateActionPanels();
        closeReviewModal();
        showNotification('Contrato aprovado com sucesso!', 'success');
    }
}

// Rejeitar prova
function rejectProof() {
    const contract = state.contracts.find(c => c.id === state.currentContractId);
    if (contract) {
        contract.status = CONTRACT_STATUS.IN_DISPUTE;
        contract.disputeCount = 1;
        addLog(`Contratante recusou contrato #${contract.id}! Iniciando disputa`);
        renderContracts();
        updateActionPanels();
        closeReviewModal();
        showDisputeModal(contract);
        simulateJudgeDecision(contract);
    }
}

// Mostrar modal de disputa
function showDisputeModal(contract) {
    state.currentContractId = contract.id;
    document.getElementById('disputeContractId').textContent = `#${contract.id}`;
    document.getElementById('disputeNumber').textContent = `${contract.disputeCount}ª disputa`;
    document.getElementById('disputeModal').classList.add('active');
    
    if (contract.disputeCount === 1) {
        document.getElementById('judgeMessage').textContent = 'Primeiro juiz analisando a prova...';
        document.getElementById('secondReviewBtn').style.display = 'none';
    } else {
        document.getElementById('judgeMessage').textContent = 'Segundo juiz analisando a prova...';
        document.getElementById('secondReviewBtn').style.display = 'none';
    }
}

// Fechar modal de disputa
function closeDisputeModal() {
    document.getElementById('disputeModal').classList.remove('active');
    state.currentContractId = null;
}

// Simular decisão do juiz
function simulateJudgeDecision(contract) {
    setTimeout(() => {
        const isValid = Math.random() > 0.5; // 50% de chance de ser válido
        
        if (isValid) {
            contract.status = CONTRACT_STATUS.COMPLETED;
            state.providerBalance += contract.value;
            state.completedContracts++;
            document.getElementById('judgeMessage').textContent = 'Juiz decidiu: Prova válida! Pagamento liberado';
            addLog(`Juiz decidiu: Contrato #${contract.id} - Prova válida! Pagamento liberado`);
        } else {
            contract.status = CONTRACT_STATUS.CANCELLED;
            state.contractorBalance += contract.value;
            document.getElementById('judgeMessage').textContent = 'Juiz decidiu: Prova inválida! Pagamento devolvido';
            addLog(`Juiz decidiu: Contrato #${contract.id} - Prova inválida! Pagamento devolvido`);
        }
        
        if (contract.disputeCount === 1) {
            document.getElementById('secondReviewBtn').style.display = 'block';
        }
        
        clearInterval(contract.timer);
        updateBalances();
        updateStats();
        renderContracts();
        updateActionPanels();
    }, 2000);
}

// Solicitar segunda revisão
function requestSecondReview() {
    const contract = state.contracts.find(c => c.id === state.currentContractId);
    if (contract && contract.disputeCount === 1) {
        contract.disputeCount = 2;
        document.getElementById('disputeNumber').textContent = '2ª disputa';
        document.getElementById('judgeMessage').textContent = 'Segundo juiz analisando a prova...';
        document.getElementById('secondReviewBtn').style.display = 'none';
        addLog(`Segunda revisão solicitada para contrato #${contract.id}`);
        
        setTimeout(() => {
            const isValid = Math.random() > 0.5;
            
            if (isValid) {
                contract.status = CONTRACT_STATUS.COMPLETED;
                state.providerBalance += contract.value;
                state.completedContracts++;
                document.getElementById('judgeMessage').textContent = 'Segundo juiz decidiu: Prova válida! Pagamento liberado';
                addLog(`Segundo juiz decidiu: Contrato #${contract.id} - Prova válida! Pagamento liberado`);
            } else {
                contract.status = CONTRACT_STATUS.CANCELLED;
                state.contractorBalance += contract.value;
                document.getElementById('judgeMessage').textContent = 'Segundo juiz decidiu: Prova inválida! Pagamento devolvido';
                addLog(`Segundo juiz decidiu: Contrato #${contract.id} - Prova inválida! Pagamento devolvido`);
            }
            
            clearInterval(contract.timer);
            updateBalances();
            updateStats();
            renderContracts();
            updateActionPanels();
        }, 2000);
    }
}

// Atualizar saldos
function updateBalances() {
    document.getElementById('contractorBalance').textContent = `${state.contractorBalance.toFixed(2)} USDC`;
    document.getElementById('providerBalance').textContent = `${state.providerBalance.toFixed(2)} USDC`;
}

// Atualizar estatísticas
function updateStats() {
    const activeCount = state.contracts.filter(c => 
        c.status !== CONTRACT_STATUS.COMPLETED && c.status !== CONTRACT_STATUS.CANCELLED
    ).length;
    
    document.getElementById('completedCount').textContent = state.completedContracts;
    document.getElementById('activeCount').textContent = activeCount;
}

// Adicionar log
function addLog(message) {
    const logContainer = document.getElementById('eventLog');
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    
    if (logContainer.children[0]?.classList.contains('empty-log')) {
        logContainer.innerHTML = '';
    }
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">[${timestamp}]</span>
        <span class="log-message">${message}</span>
    `;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Manter apenas os últimos 20 logs
    while (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Mostrar notificação
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}