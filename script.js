document.addEventListener('DOMContentLoaded', () => {
    // Mapeo de términos de búsqueda a los ID de las secciones correspondientes
    const sectionsMap = {
        componentes: 'componentes-section',
        noticias: 'noticias-section',
        últimas: 'ultimas-section',
        ofertas: 'ofertas-section',
        reviews: 'reviews-section',
        lanzamientos: 'lanzamientos-section',
        galeria: 'galeria-section',
        foro: 'foro-section',
        tienda: 'tienda-section'
      };      
  
    // Referencia al input de búsqueda
    const searchInput = document.getElementById('search');
  
    /**
     * Función debounce para optimizar las llamadas en función del tiempo de inactividad
     * @param {Function} func - Función a debilitar.
     * @param {number} delay - Tiempo en milisegundos.
     * @returns {Function}
     */
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };
  
    /**
     * Muestra un mensaje de feedback justo debajo del input de búsqueda.
     * @param {string} message - Mensaje a mostrar.
     */
    const showSearchMessage = (message) => {
      let messageDiv = document.getElementById('search-message');
      if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'search-message';
        messageDiv.style.position = 'absolute';
        messageDiv.style.top = '40px';
        messageDiv.style.left = '0';
        messageDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        messageDiv.style.padding = '5px 10px';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        messageDiv.style.fontSize = '0.9rem';
        messageDiv.style.color = '#e53935'; // Rojo para error
        // Aseguramos que el contenedor del input esté posicionado relativamente
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(messageDiv);
      }
      messageDiv.textContent = message;
    };
  
    /**
     * Limpia el mensaje de búsqueda si existe.
     */
    const clearSearchMessage = () => {
      const messageDiv = document.getElementById('search-message');
      if (messageDiv) {
        messageDiv.textContent = '';
      }
    };
  
    /**
     * Resalta temporalmente la sección destino para llamar la atención del usuario.
     * @param {HTMLElement} section - Elemento a resaltar.
     */
    const highlightSection = (section) => {
      section.style.transition = 'background-color 0.5s ease';
      const originalBg = window.getComputedStyle(section).backgroundColor;
      section.style.backgroundColor = '#fff3e0'; // Color de resaltado (naranja muy claro)
      setTimeout(() => {
        section.style.backgroundColor = originalBg;
      }, 1500);
    };
  
    /**
     * Función que evalúa el texto ingresado en el buscador.
     * Se utiliza para mostrar feedback inmediato en el input.
     * @param {string} query - Texto a filtrar.
     */
    const filterSearch = (query) => {
      // Obtenemos la lista de términos permitidos
      const validKeys = Object.keys(sectionsMap);
      const found = validKeys.some(key => key.startsWith(query));
      if (!found && query.length > 0) {
        showSearchMessage('No se encontró coincidencia.');
      } else {
        clearSearchMessage();
      }
    };
  
    // Aplicamos debounce a la función de filtrado para optimizar el rendimiento
    const debouncedFilter = debounce(filterSearch, 300);
  
    // Evento "input" para ejecutar el filtrado conforme el usuario escribe
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      debouncedFilter(query);
    });
  
    // Evento "keypress" para detectar la tecla "Enter" y realizar la búsqueda
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.toLowerCase().trim();
        if (sectionsMap[query]) {
          // Realiza un scroll suave hacia la sección indicada
          const targetSection = document.getElementById(sectionsMap[query]);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            highlightSection(targetSection);
            clearSearchMessage();
          }
        } else {
          showSearchMessage('No se encontró una coincidencia exacta.');
          console.log('No se encontró una coincidencia exacta.');
        }
      }
    });
  });
  