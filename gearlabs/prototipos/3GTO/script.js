// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.environment-card, .benefit-item, .link-card, .vr-highlight, .objective-content');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('scroll-reveal');
            setTimeout(() => {
                element.classList.add('active');
            }, 100);
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Header scroll effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Interactive environment cards
const environmentCards = document.querySelectorAll('.environment-card');

environmentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const environment = this.dataset.environment;
        this.style.background = getEnvironmentGradient(environment);
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});

function getEnvironmentGradient(environment) {
    const gradients = {
        subaquatic: 'linear-gradient(135deg, rgba(0, 119, 190, 0.2), rgba(0, 212, 255, 0.1))',
        urban: 'linear-gradient(135deg, rgba(128, 0, 255, 0.2), rgba(255, 0, 255, 0.1))',
        forest: 'linear-gradient(135deg, rgba(0, 128, 0, 0.2), rgba(0, 255, 136, 0.1))'
    };
    return gradients[environment] || 'rgba(255, 255, 255, 0.05)';
}

// Parallax effect for hero section
/*const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${parallax}px)`;
    }
});*/

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-title .gradient-text');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < text.length) {
        heroTitle.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Interactive floating elements
const floatElements = document.querySelectorAll('.float-element');

floatElements.forEach((element, index) => {
    element.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'scale(1.2)';
        this.style.color = '#00ff88';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = 'scale(1)';
        this.style.color = '#00d4ff';
    });
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        animation: ripple 0.6s;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form submission handling (if any forms are added later)
function handleFormSubmit(formId, successMessage) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const messageDiv = document.createElement('div');
            messageDiv.className = 'success-message';
            messageDiv.textContent = successMessage;
            messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #00ff88, #00d4ff);
                color: #0a0a0a;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: slideIn 0.5s ease;
            `;
            
            document.body.appendChild(messageDiv);
            
            // Reset form
            form.reset();
            
            // Remove message after 3 seconds
            setTimeout(() => {
                messageDiv.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => messageDiv.remove(), 500);
            }, 3000);
        });
    }
}

// Add slide animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Track scroll progress
const scrollProgress = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    // You can use this for a progress bar if needed
    console.log(`Scroll progress: ${scrollPercent}%`);
};

window.addEventListener('scroll', scrollProgress);