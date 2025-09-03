// Arquivo JavaScript para funcionalidades futuras
// Exemplo: Adicionar interatividade aos quadros

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona efeito de clique nos quadros
    const panels = document.querySelectorAll('.comic-panel');
    
    panels.forEach(panel => {
        panel.addEventListener('click', function() {
            // Adiciona classe de animação
            this.classList.toggle('panel-active');
            
            // Remove a classe após a animação
            setTimeout(() => {
                this.classList.remove('panel-active');
            }, 1000);
        });
    });
    
    // Exemplo de como adicionar novos quadros dinamicamente
    /*
    function addNewPanel() {
        const container = document.querySelector('.comic-container');
        const newPanel = document.createElement('div');
        newPanel.className = 'comic-panel';
        
        newPanel.innerHTML = `
            <div class="panel-images">
                <img src="https://via.placeholder.com/400x300" alt="Novo Quadro">
            </div>
            <div class="panel-text">
                Texto da história aqui...
            </div>
        `;
        
        container.appendChild(newPanel);
    }
    
    // Para usar: addNewPanel();
    */
});