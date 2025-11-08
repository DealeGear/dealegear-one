// Dados simulados para o aplicativo
const products = {
    coffees: [
        { id: 1, name: "Expresso", price: 5.00, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 2, name: "Cappuccino", price: 7.50, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 3, name: "Latte", price: 8.00, image: "https://images.unsplash.com/photo-1571115764595-d696d3d0e3c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 4, name: "Mocha", price: 9.00, image: "https://images.unsplash.com/photo-1568649388276-27179396859d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 5, name: "Americano", price: 6.00, image: "https://images.unsplash.com/photo-1559496417-e7f0cbad7e8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 6, name: "Macchiato", price: 8.50, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ],
    coldDrinks: [
        { id: 7, name: "Suco de Laranja", price: 8.00, image: "https://images.unsplash.com/photo-1589734583440-7a14a5c1c1e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 8, name: "Smoothie de Frutas", price: 10.00, image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 9, name: "Chá Gelado", price: 6.50, image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 10, name: "Refrigerante", price: 5.50, image: "https://images.unsplash.com/photo-1622483767028-07f36d690643?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 11, name: "Água Mineral", price: 3.00, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 12, name: "Milkshake", price: 12.00, image: "https://images.unsplash.com/photo-1563906297064-389e6ae419e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ],
    sweets: [
        { id: 13, name: "Croissant", price: 6.00, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 14, name: "Bolo de Chocolate", price: 12.00, image: "https://images.unsplash.com/photo-1568051243851-f9b136146e97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 15, name: "Muffin", price: 7.50, image: "https://images.unsplash.com/photo-1603394539836-8230b9a8c3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 16, name: "Donut", price: 5.50, image: "https://images.unsplash.com/photo-1551024601-bec78aea804d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 17, name: "Torta de Limão", price: 10.00, image: "https://images.unsplash.com/photo-1563727949634-d7fad4f2b04c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 18, name: "Cheesecake", price: 11.00, image: "https://images.unsplash.com/photo-1563906297064-389e6ae419e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ],
    snacks: [
        { id: 19, name: "Sanduíche Natural", price: 10.00, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 20, name: "Salada Caesar", price: 15.00, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 21, name: "Quiche", price: 12.00, image: "https://images.unsplash.com/photo-1595295413110-3304ca30a5d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 22, name: "Pão de Queijo", price: 8.00, image: "https://images.unsplash.com/photo-1586444208704-7c2e6d91b3e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 23, name: "Wrap de Frango", price: 13.00, image: "https://images.unsplash.com/photo-1553909489-cd46e1eb5943?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 24, name: "Bruschetta", price: 9.00, image: "https://images.unsplash.com/photo-1572697157874-3e2e0affd3f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ]
};

// Dados de estoque
const inventoryItems = [
    { id: 1, name: "Café em Grãos", quantity: 1000, unit: "g" },
    { id: 2, name: "Leite", quantity: 5000, unit: "ml" },
    { id: 3, name: "Açúcar", quantity: 2000, unit: "g" },
    { id: 4, name: "Chocolate em Pó", quantity: 500, unit: "g" },
    { id: 5, name: "Canela", quantity: 100, unit: "g" },
    { id: 6, name: "Farinha de Trigo", quantity: 3000, unit: "g" },
    { id: 7, name: "Ovos", quantity: 50, unit: "un" },
    { id: 8, name: "Manteiga", quantity: 1000, unit: "g" },
    { id: 9, name: "Frutas", quantity: 2000, unit: "g" },
    { id: 10, name: "Pão", quantity: 100, unit: "un" }
];

// Estado do aplicativo
let cart = [];
let orders = [];
let orderIdCounter = 1;
let salesHistory = [];

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Configurar navegação entre telas
    setupNavigation();
    
    // Carregar produtos nas categorias
    loadProducts();
    
    // Configurar abas de categorias
    setupCategoryTabs();
    
    // Configurar carrinho
    setupCart();
    
    // Configurar pedidos
    setupOrders();
    
    // Configurar estoque
    setupInventory();
    
    // Configurar fechamento de caixa
    setupCashier();
    
    // Adicionar alguns pedidos de exemplo
    addSampleOrders();
}

function setupNavigation() {
    // Botões do menu principal
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetScreen = button.getAttribute('data-screen');
            showScreen(targetScreen);
        });
    });
    
    // Botões de voltar
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetScreen = button.getAttribute('data-screen');
            showScreen(targetScreen);
        });
    });
}

function showScreen(screenId) {
    // Esconder todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar a tela selecionada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Atualizar conteúdo específico da tela se necessário
        if (screenId === 'ordersInProgress') {
            updateOrdersInProgress();
        } else if (screenId === 'orderHistory') {
            updateOrderHistory();
        } else if (screenId === 'closeCashier') {
            updateCashierSummary();
        }
    }
}

function loadProducts() {
    // Carregar produtos em cada categoria
    Object.keys(products).forEach(category => {
        const categoryContainer = document.getElementById(category);
        if (categoryContainer) {
            categoryContainer.innerHTML = '';
            
            products[category].forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <div class="price">R$ ${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" data-id="${product.id}" data-category="${category}">
                        Adicionar
                    </button>
                `;
                categoryContainer.appendChild(productCard);
            });
        }
    });
    
    // Adicionar eventos aos botões de adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            const category = button.getAttribute('data-category');
            addToCart(productId, category);
        });
    });
}

function setupCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover classe active de todas as abas e containers
            categoryTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.category-products').forEach(p => p.classList.remove('active'));
            
            // Adicionar classe active à aba selecionada
            tab.classList.add('active');
            
            // Mostrar o container de produtos correspondente
            const categoryId = tab.getAttribute('data-category');
            const productsContainer = document.getElementById(categoryId);
            if (productsContainer) {
                productsContainer.classList.add('active');
            }
        });
    });
}

function setupCart() {
    const finishOrderButton = document.querySelector('.finish-order-btn');
    if (finishOrderButton) {
        finishOrderButton.addEventListener('click', finishOrder);
    }
}

function addToCart(productId, category) {
    const product = products[category].find(p => p.id === productId);
    if (product) {
        // Verificar se o produto já está no carrinho
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            // Se já existe, aumentar a quantidade
            existingItem.quantity += 1;
        } else {
            // Se não existe, adicionar ao carrinho
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Atualizar a exibição do carrinho
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalValueElement = document.querySelector('.total-value');
    
    if (cartItemsContainer) {
        // Limpar o carrinho
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Carrinho vazio</p>';
        } else {
            // Adicionar itens ao carrinho
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Adicionar eventos aos botões de quantidade
            const decreaseButtons = cartItemsContainer.querySelectorAll('.decrease-btn');
            decreaseButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = parseInt(button.getAttribute('data-id'));
                    decreaseQuantity(productId);
                });
            });
            
            const increaseButtons = cartItemsContainer.querySelectorAll('.increase-btn');
            increaseButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = parseInt(button.getAttribute('data-id'));
                    increaseQuantity(productId);
                });
            });
        }
        
        // Calcular e atualizar o total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (totalValueElement) {
            totalValueElement.textContent = `R$ ${total.toFixed(2)}`;
        }
    }
}

function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            // Remover item se a quantidade for 1
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
    }
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
    }
}

function finishOrder() {
    if (cart.length === 0) {
        alert('Adicione itens ao carrinho antes de finalizar o pedido.');
        return;
    }
    
    // Criar novo pedido
    const newOrder = {
        id: orderIdCounter++,
        items: [...cart],
        status: 'preparing',
        date: new Date(),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // Adicionar à lista de pedidos
    orders.push(newOrder);
    
    // Adicionar ao histórico de vendas
    salesHistory.push({
        orderId: newOrder.id,
        date: new Date(),
        total: newOrder.total,
        items: [...newOrder.items]
    });
    
    // Limpar carrinho
    cart = [];
    updateCartDisplay();
    
    // Mostrar mensagem de sucesso
    alert(`Pedido #${newOrder.id} realizado com sucesso!`);
    
    // Voltar para a tela inicial
    showScreen('homeScreen');
}

function setupOrders() {
    // Ações para atualizar status do pedido
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('status-btn')) {
            const orderId = parseInt(event.target.getAttribute('data-order-id'));
            const newStatus = event.target.getAttribute('data-status');
            
            if (orderId && newStatus) {
                updateOrderStatus(orderId, newStatus);
            }
        }
    });
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        updateOrdersInProgress();
    }
}

function updateOrdersInProgress() {
    const ordersContainer = document.querySelector('#ordersInProgress .orders-list');
    
    if (ordersContainer) {
        // Filtrar apenas pedidos que não foram entregues
        const activeOrders = orders.filter(order => order.status !== 'delivered');
        
        if (activeOrders.length === 0) {
            ordersContainer.innerHTML = '<p class="empty-orders">Não há pedidos em andamento.</p>';
        } else {
            ordersContainer.innerHTML = '';
            
            activeOrders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'order-card';
                
                // Formatar data
                const date = new Date(order.date);
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                
                // Definir classe de status
                let statusClass = '';
                let statusText = '';
                
                switch (order.status) {
                    case 'preparing':
                        statusClass = 'status-preparing';
                        statusText = 'Preparando';
                        break;
                    case 'ready':
                        statusClass = 'status-ready';
                        statusText = 'Pronto';
                        break;
                    case 'delivered':
                        statusClass = 'status-delivered';
                        statusText = 'Entregue';
                        break;
                }
                
                // Construir HTML dos itens do pedido
                let itemsHtml = '';
                order.items.forEach(item => {
                    itemsHtml += `
                        <div class="order-item">
                            <span>${item.quantity}x ${item.name}</span>
                            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `;
                });
                
                orderCard.innerHTML = `
                    <div class="order-header">
                        <div class="order-id">Pedido #${order.id}</div>
                        <div class="order-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="order-date">${formattedDate}</div>
                    <div class="order-items">
                        ${itemsHtml}
                    </div>
                    <div class="order-total">
                        <span>Total:</span>
                        <span>R$ ${order.total.toFixed(2)}</span>
                    </div>
                    <div class="order-actions">
                        ${order.status === 'preparing' ? '<button class="status-btn btn-ready" data-order-id="' + order.id + '" data-status="ready">Marcar como Pronto</button>' : ''}
                        ${order.status === 'ready' ? '<button class="status-btn btn-delivered" data-order-id="' + order.id + '" data-status="delivered">Marcar como Entregue</button>' : ''}
                    </div>
                `;
                
                ordersContainer.appendChild(orderCard);
            });
        }
    }
}

function updateOrderHistory() {
    const ordersContainer = document.querySelector('#orderHistory .orders-list');
    
    if (ordersContainer) {
        // Filtrar apenas pedidos entregues
        const completedOrders = orders.filter(order => order.status === 'delivered');
        
        if (completedOrders.length === 0) {
            ordersContainer.innerHTML = '<p class="empty-orders">Não há pedidos no histórico.</p>';
        } else {
            ordersContainer.innerHTML = '';
            
            // Ordenar pedidos por data (mais recentes primeiro)
            completedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            completedOrders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'order-card';
                
                // Formatar data
                const date = new Date(order.date);
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                
                // Construir HTML dos itens do pedido
                let itemsHtml = '';
                order.items.forEach(item => {
                    itemsHtml += `
                        <div class="order-item">
                            <span>${item.quantity}x ${item.name}</span>
                            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `;
                });
                
                orderCard.innerHTML = `
                    <div class="order-header">
                        <div class="order-id">Pedido #${order.id}</div>
                        <div class="order-status status-delivered">Entregue</div>
                    </div>
                    <div class="order-date">${formattedDate}</div>
                    <div class="order-items">
                        ${itemsHtml}
                    </div>
                    <div class="order-total">
                        <span>Total:</span>
                        <span>R$ ${order.total.toFixed(2)}</span>
                    </div>
                `;
                
                ordersContainer.appendChild(orderCard);
            });
        }
    }
}

function setupInventory() {
    const inventoryContainer = document.querySelector('.inventory-list');
    
    if (inventoryContainer) {
        inventoryContainer.innerHTML = '';
        
        inventoryItems.forEach(item => {
            const inventoryItem = document.createElement('div');
            inventoryItem.className = 'inventory-item';
            inventoryItem.innerHTML = `
                <div class="inventory-item-header">
                    <div class="inventory-item-name">${item.name}</div>
                    <div class="inventory-item-quantity">${item.quantity} ${item.unit}</div>
                </div>
                <div class="inventory-item-controls">
                    <input type="number" class="inventory-input" id="inventory-${item.id}" value="${item.quantity}" min="0">
                    <button class="update-btn" data-id="${item.id}">Atualizar</button>
                </div>
            `;
            inventoryContainer.appendChild(inventoryItem);
        });
        
        // Adicionar eventos aos botões de atualização
        const updateButtons = inventoryContainer.querySelectorAll('.update-btn');
        updateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                const inputElement = document.getElementById(`inventory-${itemId}`);
                const newQuantity = parseInt(inputElement.value);
                
                if (newQuantity >= 0) {
                    updateInventoryItem(itemId, newQuantity);
                } else {
                    alert('A quantidade não pode ser negativa.');
                }
            });
        });
    }
}

function updateInventoryItem(itemId, newQuantity) {
    const item = inventoryItems.find(i => i.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        
        // Atualizar a exibição
        const quantityElement = document.querySelector(`#inventory-${itemId}`).parentElement.previousElementSibling.querySelector('.inventory-item-quantity');
        if (quantityElement) {
            quantityElement.textContent = `${newQuantity} ${item.unit}`;
        }
        
        alert(`Estoque de ${item.name} atualizado para ${newQuantity} ${item.unit}.`);
    }
}

function setupCashier() {
    const closeCashierButton = document.querySelector('.close-cashier-btn');
    if (closeCashierButton) {
        closeCashierButton.addEventListener('click', () => {
            if (confirm('Tem certeza de que deseja fechar o caixa? Esta ação não pode ser desfeita.')) {
                // Simular fechamento de caixa
                alert('Caixa fechado com sucesso!');
                
                // Limpar histórico de vendas e pedidos
                salesHistory = [];
                orders = orders.filter(order => order.status === 'preparing' || order.status === 'ready');
                
                // Voltar para a tela inicial
                showScreen('homeScreen');
            }
        });
    }
}

function updateCashierSummary() {
    // Calcular total de vendas
    const totalSales = salesHistory.reduce((sum, sale) => sum + sale.total, 0);
    
    // Contar número de pedidos
    const totalOrders = salesHistory.length;
    
    // Encontrar produtos mais vendidos
    const productSales = {};
    
    salesHistory.forEach(sale => {
        sale.items.forEach(item => {
            if (!productSales[item.id]) {
                productSales[item.id] = {
                    name: item.name,
                    quantity: 0
                };
            }
            productSales[item.id].quantity += item.quantity;
        });
    });
    
    // Ordenar produtos por quantidade vendida
    const sortedProducts = Object.values(productSales).sort((a, b) => b.quantity - a.quantity);
    const topProducts = sortedProducts.slice(0, 5); // Top 5 produtos
    
    // Atualizar UI
    const totalSalesElement = document.querySelector('.total-sales');
    const totalOrdersElement = document.querySelector('.total-orders');
    const topProductsContainer = document.querySelector('.top-products-list');
    
    if (totalSalesElement) {
        totalSalesElement.textContent = `R$ ${totalSales.toFixed(2)}`;
    }
    
    if (totalOrdersElement) {
        totalOrdersElement.textContent = totalOrders;
    }
    
    if (topProductsContainer) {
        topProductsContainer.innerHTML = '';
        
        if (topProducts.length === 0) {
            topProductsContainer.innerHTML = '<p>Não há produtos vendidos hoje.</p>';
        } else {
            topProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'top-product-item';
                productElement.innerHTML = `
                    <div class="top-product-name">${product.name}</div>
                    <div class="top-product-quantity">${product.quantity} unidades</div>
                `;
                topProductsContainer.appendChild(productElement);
            });
        }
    }
}

function addSampleOrders() {
    // Adicionar alguns pedidos de exemplo para demonstração
    const sampleOrder1 = {
        id: orderIdCounter++,
        items: [
            {...products.coffees[0], quantity: 2}, // 2x Expresso
            {...products.sweets[1], quantity: 1}  // 1x Bolo de Chocolate
        ],
        status: 'ready',
        date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
        total: (products.coffees[0].price * 2) + products.sweets[1].price
    };
    
    const sampleOrder2 = {
        id: orderIdCounter++,
        items: [
            {...products.coldDrinks[1], quantity: 1}, // 1x Smoothie de Frutas
            {...products.snacks[0], quantity: 1}     // 1x Sanduíche Natural
        ],
        status: 'preparing',
        date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
        total: products.coldDrinks[1].price + products.snacks[0].price
    };
    
    const sampleOrder3 = {
        id: orderIdCounter++,
        items: [
            {...products.coffees[2], quantity: 1}, // 1x Latte
            {...products.sweets[2], quantity: 2}  // 2x Muffin
        ],
        status: 'delivered',
        date: new Date(Date.now() - 1000 * 60 * 60), // 1 hora atrás
        total: products.coffees[2].price + (products.sweets[2].price * 2)
    };
    
    orders.push(sampleOrder1, sampleOrder2, sampleOrder3);
    
    // Adicionar ao histórico de vendas
    salesHistory.push({
        orderId: sampleOrder3.id,
        date: sampleOrder3.date,
        total: sampleOrder3.total,
        items: [...sampleOrder3.items]
    });
}