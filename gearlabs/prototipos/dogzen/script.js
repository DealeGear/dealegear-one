// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const darkModeIcon = darkModeToggle.querySelector('i');

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Language Selector
const translations = {
    pt: {
        title: "O Refúgio Perfeito para o Seu Melhor Amigo",
        description: "A DogZen combina tecnologia anti-ruído premium com design sofisticado, criando um espaço de tranquilidade e conforto para seu cão.",
        cta: "Garanta a Casinha do Seu Pet",
        warranty: "Garantia de 2 anos",
        shipping: "Frete grátis",
        aboutTitle: "Sobre a DogZen",
        aboutSubtitle: "Tecnologia e Conforto em Harmonia",
        benefitsTitle: "Benefícios Exclusivos",
        galleryTitle: "Galeria do Produto",
        testimonialsTitle: "O Que Dizem Nossos Clientes",
        finalCtaTitle: "Transforme a Vida do Seu Pet Hoje",
        finalCtaDesc: "Ofereça o melhor em conforto, segurança e tranquilidade para seu companheiro. Compre agora e receba em casa com frete grátis!",
        buyNow: "Comprar Agora",
        getOffers: "Receber Ofertas",
        installment: "Parcelamento em até 12x",
        return: "30 dias para devolução"
    },
    en: {
        title: "The Perfect Sanctuary for Your Best Friend",
        description: "DogZen combines premium anti-noise technology with sophisticated design, creating a space of tranquility and comfort for your dog.",
        cta: "Get Your Pet's Dream House",
        warranty: "2-year warranty",
        shipping: "Free shipping",
        aboutTitle: "About DogZen",
        aboutSubtitle: "Technology and Comfort in Harmony",
        benefitsTitle: "Exclusive Benefits",
        galleryTitle: "Product Gallery",
        testimonialsTitle: "What Our Customers Say",
        finalCtaTitle: "Transform Your Pet's Life Today",
        finalCtaDesc: "Offer the best in comfort, safety, and tranquility for your companion. Buy now and receive it at home with free shipping!",
        buyNow: "Buy Now",
        getOffers: "Get Offers",
        installment: "Up to 12 installments",
        return: "30-day return policy"
    },
    es: {
        title: "El Refugio Perfecto para tu Mejor Amigo",
        description: "DogZen combina tecnología anti-ruido premium con diseño sofisticado, creando un espacio de tranquilidad y comodidad para tu perro.",
        cta: "Consigue la Casita de tu Mascota",
        warranty: "Garantía de 2 años",
        shipping: "Envío gratis",
        aboutTitle: "Sobre DogZen",
        aboutSubtitle: "Tecnología y Comodidad en Armonía",
        benefitsTitle: "Beneficios Exclusivos",
        galleryTitle: "Galería del Producto",
        testimonialsTitle: "Lo que Dicen Nuestros Clientes",
        finalCtaTitle: "Transforma la Vida de tu Mascota Hoy",
        finalCtaDesc: "Ofrece lo mejor en comodidad, seguridad y tranquilidad para tu compañero. ¡Compra ahora y recíbelo en casa con envío gratis!",
        buyNow: "Comprar Ahora",
        getOffers: "Recibir Ofertas",
        installment: "Hasta 12 cuotas",
        return: "30 días para devolución"
    }
};

const languageSelector = document.getElementById('languageSelector');
let currentLang = 'pt';

languageSelector.addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateLanguage();
});

function updateLanguage() {
    const t = translations[currentLang];
    
    // Update hero section
    document.querySelector('h1').textContent = t.title;
    document.querySelector('.hero p').textContent = t.description;
    document.querySelector('.cta-button').textContent = t.cta;
    
    // Update sections
    document.querySelectorAll('#sobre h2')[0].textContent = t.aboutTitle;
    document.querySelector('#sobre h3').textContent = t.aboutSubtitle;
    document.querySelectorAll('#beneficios h2')[0].textContent = t.benefitsTitle;
    document.querySelectorAll('#galeria h2')[0].textContent = t.galleryTitle;
    document.querySelectorAll('#depoimentos h2')[0].textContent = t.testimonialsTitle;
    
    // Update final CTA
    document.querySelector('.bg-gradient-to-br h2').textContent = t.finalCtaTitle;
    document.querySelector('.bg-gradient-to-br p').textContent = t.finalCtaDesc;
    document.querySelectorAll('.cta-button')[1].textContent = t.buyNow;
    document.querySelectorAll('.cta-button')[1].nextElementSibling.textContent = t.getOffers;
    
    // Update footer info
    document.querySelectorAll('.flex.items-center.space-x-2 span')[0].textContent = t.warranty;
    document.querySelectorAll('.flex.items-center.space-x-2 span')[1].textContent = t.shipping;
    document.querySelectorAll('.mt-8 .flex.items-center.space-x-2 span')[0].textContent = t.installment;
    document.querySelectorAll('.mt-8 .flex.items-center.space-x-2 span')[1].textContent = t.return;
}

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});