/*
 * Conexa Landing Page JavaScript
 * Handles language switching, form validation, and other interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    initializeLanguage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup lazy loading for images
    setupLazyLoading();
});

// Language functionality
let currentLanguage = 'pt-BR';
let translations = {};

// Fetch translations from JSON file
async function fetchTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        return translations;
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}

// Initialize language based on browser preference or localStorage
async function initializeLanguage() {
    // Fetch translations first
    await fetchTranslations();
    
    // Check if language is stored in localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        // Try to detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Check if browser language is supported
        if (browserLang === 'pt-BR' || browserLang === 'en-US' || browserLang === 'es-ES') {
            currentLanguage = browserLang;
        }
    }
    
    // Update UI with selected language
    updateLanguageUI();
    updatePageContent();
}

// Update language UI (active button)
function updateLanguageUI() {
    const langButtons = document.querySelectorAll('.language-btn');
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Update page content based on selected language
function updatePageContent() {
    if (!translations[currentLanguage]) return;
    
    // Update document title
    document.title = translations[currentLanguage].siteTitle;
    
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        
        if (translation) {
            // For meta tags, update content attribute
            if (element.tagName === 'META') {
                element.setAttribute('content', translation);
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update footer copyright year
    const year = new Date().getFullYear();
    const copyrightElement = document.querySelector('[data-i18n="footerCopyright"]');
    if (copyrightElement) {
        copyrightElement.textContent = translations[currentLanguage].footerCopyright.replace('{year}', year);
    }
}

// Get nested translation using dot notation
function getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
}

// Setup event listeners
function setupEventListeners() {
    // Language selector buttons
    const langButtons = document.querySelectorAll('.language-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentLanguage = this.dataset.lang;
            localStorage.setItem('preferredLanguage', currentLanguage);
            updateLanguageUI();
            updatePageContent();
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.setAttribute('aria-expanded', nav.classList.contains('active'));
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Plan selection buttons
    const planButtons = document.querySelectorAll('.plan-cta');
    const modal = document.getElementById('planModal');
    const closeModal = document.querySelector('.close-modal');
    const selectedPlanInput = document.getElementById('selectedPlan');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.dataset.plan;
            if (selectedPlanInput) {
                selectedPlanInput.value = planName;
            }
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });
    
    // Close modal
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Form submission
    const planForm = document.getElementById('planForm');
    if (planForm) {
        planForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Download CSV sample
    const downloadCsvBtn = document.getElementById('download-csv');
    if (downloadCsvBtn) {
        downloadCsvBtn.addEventListener('click', generateSampleCsv);
    }
    
    // WhatsApp CTA buttons
    const whatsappButtons = document.querySelectorAll('[href*="wa.me"], [href*="api.whatsapp.com"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Replace with actual implementation when WhatsApp number is available
            // For now, prevent default behavior
            e.preventDefault();
            
            // Get plan name if available
            let planName = '';
            if (this.dataset.plan) {
                planName = this.dataset.plan;
            }
            
            // Get translated WhatsApp message
            const message = translations[currentLanguage].whatsappMessage.replace('{plan}', planName);
            const encodedMessage = encodeURIComponent(message);
            
            // Replace with actual WhatsApp number
            const whatsappNumber = '+55XXXXXXXXXXX'; // Placeholder - replace with actual number
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp URL
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Simple honeypot check
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value) {
        // If honeypot field is filled, it's likely a bot
        console.log('Bot detected');
        return;
    }
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would normally send the data to a server
    // For demo purposes, we'll just log it and show success message
    console.log('Form submitted:', data);
    
    // Hide form and show success message
    const form = event.target;
    const successMessage = document.getElementById('formSuccess');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.classList.add('hidden');
            
            // Close modal
            const modal = document.getElementById('planModal');
            if (modal) {
                modal.style.display = 'none';
            }
        }, 5000);
    }
    
    /* 
     * INTEGRATION NOTE:
     * Replace the code above with actual API integration:
     * 
     * fetch('https://your-api-endpoint.com/submit', {
     *   method: 'POST',
     *   headers: {
     *     'Content-Type': 'application/json',
     *   },
     *   body: JSON.stringify(data),
     * })
     * .then(response => response.json())
     * .then(data => {
     *   console.log('Success:', data);
     *   // Show success message
     * })
     * .catch(error => {
     *   console.error('Error:', error);
     *   // Show error message
     * });
     */
}

// Generate sample CSV file
function generateSampleCsv() {
    // Sample data
    const sampleData = [
        ['Date', 'Customer', 'Messages', 'Response Time', 'Satisfaction'],
        ['2023-06-01', 'João Silva', '5', '2 min', '4.5'],
        ['2023-06-01', 'Maria Santos', '3', '5 min', '3.8'],
        ['2023-06-02', 'Pedro Oliveira', '7', '1 min', '5.0'],
        ['2023-06-02', 'Ana Costa', '2', '8 min', '3.2'],
        ['2023-06-03', 'Carlos Pereira', '4', '3 min', '4.1']
    ];
    
    // Convert to CSV format
    let csvContent = '';
    sampleData.forEach(row => {
        csvContent += row.join(',') + '\n';
    });
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set attributes
    link.setAttribute('href', url);
    link.setAttribute('download', 'conexa-sample-report.csv');
    link.style.visibility = 'hidden';
    
    // Add to DOM and click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Setup lazy loading for images
function setupLazyLoading() {
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        // Target all images with loading="lazy" attribute
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
}