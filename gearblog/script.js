document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const homeLink = document.getElementById('home-link');
    const articlesLink = document.getElementById('articles-link');
    const homeSection = document.getElementById('home-section');
    const articleDetailSection = document.getElementById('article-detail-section');
    const articlesContainer = document.getElementById('articles-container');
    const articleDetail = document.getElementById('article-detail');
    const backToArticlesBtn = document.getElementById('back-to-articles');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const articlesTitle = document.getElementById('articles-title');

    // Estado da aplicação
    let currentLang = 'pt';
    let currentTheme = 'light';
    let contentData = {};
    let currentArticle = null; // Armazenar o artigo atualmente exibido

    // Carregar conteúdo do JSON
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            contentData = data;
            updateContent();
        })
        .catch(error => console.error('Erro ao carregar conteúdo:', error));

    // Função para atualizar o conteúdo com base no idioma
    function updateContent() {
        if (!contentData.welcome) return;

        // Atualizar título da seção de artigos
        articlesTitle.textContent = currentLang === 'pt' ? 'Artigos' : 
                                    currentLang === 'en' ? 'Articles' : 
                                    'Artículos';

        // Se estiver na seção home (que mostra os artigos), atualizar os cards
        if (homeSection.classList.contains('active')) {
            renderArticles();
        }
        
        // Se estiver na seção de detalhes do artigo, atualizar o conteúdo
        if (articleDetailSection.classList.contains('active') && currentArticle) {
            showArticleDetail(currentArticle);
        }
    }

    // Função para renderizar os artigos
    function renderArticles() {
        articlesContainer.innerHTML = '';
        contentData.articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'article-card';
            card.innerHTML = `
                <img src="${article.image}" alt="${article.title[currentLang]}">
                <div class="article-card-content">
                    <h3>${article.title[currentLang]}</h3>
                    <p>${article.summary[currentLang]}</p>
                </div>
            `;
            card.addEventListener('click', () => showArticleDetail(article));
            articlesContainer.appendChild(card);
        });
    }

    // Função para mostrar detalhes do artigo
    function showArticleDetail(article) {
        currentArticle = article; // Armazenar o artigo atual
        articleDetail.innerHTML = `
            <h2>${article.title[currentLang]}</h2>
            <img src="${article.image}" alt="${article.title[currentLang]}">
            <p>${article.content[currentLang]}</p>
        `;
        homeSection.classList.remove('active');
        articleDetailSection.classList.add('active');
    }

    // Navegação entre seções
    /*homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        homeSection.classList.add('active');
        articleDetailSection.classList.remove('active');
        homeLink.classList.add('active');
        articlesLink.classList.remove('active');
        currentArticle = null; // Limpar artigo atual ao voltar para home
        renderArticles(); // Renderizar os artigos ao voltar para home
    });*/

    /*articlesLink.addEventListener('click', (e) => {
        e.preventDefault();
        homeSection.classList.add('active');
        articleDetailSection.classList.remove('active');
        articlesLink.classList.add('active');
        homeLink.classList.remove('active');
        currentArticle = null; // Limpar artigo atual ao voltar para lista de artigos
        renderArticles(); // Renderizar os artigos
    });*/   

    backToArticlesBtn.addEventListener('click', () => {
        articleDetailSection.classList.remove('active');
        homeSection.classList.add('active');
        currentArticle = null; // Limpar artigo atual ao voltar
        // Não precisamos renderizar novamente porque os artigos já estão na home
    });

    // Troca de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLang = button.id.split('-')[1];
            updateContent(); // Atualizar todo o conteúdo incluindo o artigo atual
        });
    });

    // Alternar tema
    themeToggle.addEventListener('click', () => {
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            currentTheme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            currentTheme = 'light';
        }
    });

    // Inicializar
    updateContent();
});