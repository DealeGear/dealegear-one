// Menu Hamburguer para Dispositivos Móveis
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle do menu mobile ao clicar no botão
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar o menu mobile ao clicar em um link
    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Formulário de Pedidos
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    
    // Função para formatar o telefone
    function formatPhone(phone) {
        // Remove todos os caracteres não numéricos
        const cleaned = ('' + phone).replace(/\D/g, '');
        
        // Verifica se tem o tamanho correto (11 dígitos para celular com DDD)
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        
        return phone;
    }
    
    // Formatação automática do campo de telefone
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        this.value = formatPhone(this.value);
    });
    
    // Botão de WhatsApp
    whatsappBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const coffee = document.getElementById('coffee').value;
        const quantity = document.getElementById('quantity').value;
        const orderType = document.querySelector('input[name="orderType"]:checked').value;
        const observations = document.getElementById('observations').value;
        
        // Validação básica
        if (!name || !phone || !coffee || !quantity) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Montar mensagem para o WhatsApp
        const orderTypeText = orderType === 'delivery' ? 'Entrega' : 'Consumo no Local';
        let message = `Olá, gostaria de fazer um pedido:%0A%0A`;
        message += `*Nome:* ${name}%0A`;
        message += `*Telefone:* ${phone}%0A`;
        message += `*Produto:* ${coffee}%0A`;
        message += `*Quantidade:* ${quantity}%0A`;
        message += `*Tipo de Pedido:* ${orderTypeText}%0A`;
        
        if (observations) {
            message += `*Observações:* ${observations}%0A`;
        }
        
        message += `%0A*Aguardo confirmação!*`;
        
        // Número do WhatsApp da cafeteria (substituir pelo número real)
        const whatsappNumber = '5511999999999';
        
        // Abrir WhatsApp com a mensagem
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    });
    
    // Envio do formulário
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const coffee = document.getElementById('coffee').value;
        const quantity = document.getElementById('quantity').value;
        const orderType = document.querySelector('input[name="orderType"]:checked').value;
        const observations = document.getElementById('observations').value;
        
        // Validação básica
        if (!name || !phone || !coffee || !quantity) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simulação de envio do pedido
        alert(`Pedido realizado com sucesso!%0A%0AResumo do pedido:%0AProduto: ${coffee}%0AQuantidade: ${quantity}%0ATipo: ${orderType === 'delivery' ? 'Entrega' : 'Consumo no Local'}%0A%0AEntraremos em contato em breve para confirmar.`);
        
        // Limpar formulário
        orderForm.reset();
    });
});

// Botões "Adicionar ao Pedido"
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.special-card');
            const productName = card.querySelector('h3').textContent;
            
            if (this.textContent === 'Saiba Mais') {
                // Redirecionar para página de informações (se existir)
                alert(`Mais informações sobre: ${productName}`);
            } else {
                // Adicionar ao pedido
                alert(`${productName} adicionado ao seu pedido!`);
                
                // Aqui você poderia adicionar lógica para realmente adicionar ao carrinho
                // Por exemplo, atualizar um contador no carrinho ou adicionar a um array de produtos
            }
        });
    });
});

// Mudar o estilo do cabeçalho ao rolar a página
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if(window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '';
        header.style.boxShadow = '';
    }
});