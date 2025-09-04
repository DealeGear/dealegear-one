// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Menu dropdown functionality
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');
    
    // Toggle menu dropdown
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        menuDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            menuDropdown.classList.remove('show');
        }
    });
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const frames = document.querySelectorAll('.frame');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.dataset.category;
            
            // Filter frames
            frames.forEach(frame => {
                if (selectedCategory === 'all' || frame.dataset.category === selectedCategory) {
                    frame.classList.remove('hidden');
                } else {
                    frame.classList.add('hidden');
                }
            });
            
            // Close dropdown on mobile after selection
            if (window.innerWidth <= 640) {
                setTimeout(() => {
                    menuToggle.classList.remove('active');
                    menuDropdown.classList.remove('show');
                }, 300);
            }
        });
    });
    
    // Add click event to frames
    frames.forEach(frame => {
        frame.addEventListener('click', function() {
            const title = this.querySelector('.frame-title').textContent;
            const category = this.dataset.category;
            
            // Log to console (replace with your desired action)
            console.log(`Quadro selecionado: ${title} (Categoria: ${category})`);
            
            // Example: You could open a modal or navigate to a detail page
            // window.open(`detalhes.html?titulo=${encodeURIComponent(title)}&categoria=${category}`, '_blank');
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close dropdown on resize to prevent positioning issues
            menuToggle.classList.remove('active');
            menuDropdown.classList.remove('show');
        }, 250);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        // Close dropdown on orientation change
        menuToggle.classList.remove('active');
        menuDropdown.classList.remove('show');
        
        // Reload page to adjust layout properly
        setTimeout(function() {
            window.location.reload();
        }, 300);
    });
    
    // Optional: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.addEventListener('load', function() {
                        img.style.transition = 'opacity 0.3s ease';
                        img.style.opacity = '1';
                    });
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('.frame-image').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close dropdown with Escape key
        if (e.key === 'Escape') {
            menuToggle.classList.remove('active');
            menuDropdown.classList.remove('show');
        }
    });
});