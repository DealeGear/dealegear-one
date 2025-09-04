// Dark mode functionality
class DarkMode {
    constructor() {
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        // Set initial theme
        if (this.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        // Add event listener
        this.themeToggle.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('darkMode', this.darkMode);

        if (this.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            this.themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
    }
}