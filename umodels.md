### Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});


### Adaptar menu de idiomas

# HTML <----------------->
<div class="language-selector">
  <select id="languageDropdown" class="lang-select">
    <option value="pt">PT</option>
    <option value="en">EN</option>
    <option value="es">ES</option>
  </select>
</div>

# CSS <----------------->
.lang-select {
  padding: 0.3rem 0.5rem;
  border-radius: none;
  border: 0.2 rem;
  border-radius: 20px;
  /*border: 1px solid var(--border, #ccc);*/
  background-color: var(--bg-tertiary, #f9f9f9);
  font-size: 0.7rem;
  cursor: pointer;
}

# JavaScript <----------------->
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.getElementById('languageDropdown');
  if (!dropdown) return;

  // Detecta idioma atual pelo nome do arquivo
  const file = window.location.pathname.split('/').pop(); // ex: "en.index.html"
  let currentLang = 'pt'; // padrão
  if (file.startsWith('en.')) currentLang = 'en';
  if (file.startsWith('es.')) currentLang = 'es';

  // Ajusta o select para refletir o idioma atual
  dropdown.value = currentLang;

  dropdown.addEventListener('change', function () {
    const lang = this.value;
    let target = 'index.html'; // padrão (pt)

    if (lang === 'en') target = 'en.index.html';
    if (lang === 'es') target = 'es.index.html';

    window.location.href = target;
  });
});
