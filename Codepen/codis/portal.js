document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const cardsGrid = document.getElementById('cards-grid');
  const searchInput = document.getElementById('search-input');
  const filterTagsContainer = document.getElementById('filter-tags');
  const totalCountEl = document.getElementById('total-count');
  
  const gridViewBtn = document.getElementById('grid-view-btn');
  const listViewBtn = document.getElementById('list-view-btn');
  const sortSelect = document.getElementById('sort-select');
  const albumSelect = document.getElementById('album-select');
  const createAlbumBtn = document.getElementById('create-album-btn');
  
  const albumModal = document.getElementById('album-modal');
  const closeAlbumModal = document.getElementById('close-album-modal');
  const cancelAlbumBtn = document.getElementById('cancel-album-btn');
  const saveAlbumBtn = document.getElementById('save-album-btn');
  const newAlbumNameInput = document.getElementById('new-album-name');
  const albumErrorMsg = document.getElementById('album-error-msg');
  
  // State
  let searchQuery = '';
  let activeTag = 'Todos';
  let activeView = localStorage.getItem('codis-view-mode') || 'grid';
  let activeSort = 'asc';
  let activeAlbum = 'all'; // 'all', 'favorites', or custom album name
  let favorites = JSON.parse(localStorage.getItem('codis-favorites')) || [];
  let albums = JSON.parse(localStorage.getItem('codis-albums')) || {};
  
  // Initialize
  const components = window.COMPONENTS || [];
  
  // View mode switcher
  function setViewMode(mode) {
    activeView = mode;
    localStorage.setItem('codis-view-mode', mode);
    if (mode === 'list') {
      cardsGrid.classList.add('list-view');
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
    } else {
      cardsGrid.classList.remove('list-view');
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
    }
  }
  
  setViewMode(activeView);
  
  gridViewBtn.addEventListener('click', () => setViewMode('grid'));
  listViewBtn.addEventListener('click', () => setViewMode('list'));
  
  // Render albums in the select dropdown
  function renderAlbumsDropdown() {
    albumSelect.innerHTML = `
      <option value="all">Todos los Componentes</option>
      <option value="favorites">★ Favoritos</option>
    `;
    
    Object.keys(albums).sort().forEach(albumName => {
      const option = document.createElement('option');
      option.value = albumName;
      option.textContent = `📁 ${albumName}`;
      if (albumName === activeAlbum) {
        option.selected = true;
      }
      albumSelect.appendChild(option);
    });
  }
  
  renderAlbumsDropdown();
  
  // Gather unique tags
  function getUniqueTags() {
    const tags = new Set();
    components.forEach(c => {
      if (c.tags && Array.isArray(c.tags)) {
        c.tags.forEach(tag => tags.add(tag));
      }
    });
    return ['Todos', ...Array.from(tags).sort()];
  }
  
  // Render filters
  function renderFilters() {
    const tags = getUniqueTags();
    filterTagsContainer.innerHTML = '';
    
    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = `tag-btn ${tag === activeTag ? 'active' : ''}`;
      btn.textContent = tag;
      btn.addEventListener('click', () => {
        activeTag = tag;
        trackTagsVisit([tag]);
        renderFilters();
        renderGrid();
      });
      filterTagsContainer.appendChild(btn);
    });
  }
  
  // Render component grid
  function renderGrid() {
    cardsGrid.innerHTML = '';
    
    // 1. Filter
    let filtered = components.filter(c => {
      const matchesTag = activeTag === 'Todos' || (c.tags && c.tags.includes(activeTag));
      
      let matchesAlbum = true;
      if (activeAlbum === 'favorites') {
        matchesAlbum = favorites.includes(c.id);
      } else if (activeAlbum !== 'all') {
        matchesAlbum = albums[activeAlbum] && albums[activeAlbum].includes(c.id);
      }
      
      if (!matchesTag || !matchesAlbum) return false;
      
      c._searchScore = fuzzyMatchScore(c, searchQuery);
      return searchQuery ? c._searchScore > 0 : true;
    });
    
    // 2. Sort
    filtered.sort((a, b) => {
      // Sort by search relevance score descending first if searching
      if (searchQuery && a._searchScore !== b._searchScore) {
        return b._searchScore - a._searchScore;
      }
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return activeSort === 'asc' ? -1 : 1;
      if (titleA > titleB) return activeSort === 'asc' ? 1 : -1;
      return 0;
    });
    
    // Update count
    totalCountEl.innerHTML = `<span></span> ${filtered.length} Componentes`;
    
    if (filtered.length === 0) {
      cardsGrid.innerHTML = `
        <div class="no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No se encontraron componentes que coincidan con tu búsqueda.</p>
        </div>
      `;
      return;
    }
    
    // 3. Render cards
    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = 'component-card';
      
      const isFav = favorites.includes(c.id);
      
      const tagHTML = (c.tags || []).slice(0, 3).map(tag => {
        let cleanTag = tag.toLowerCase().replace(/[^a-z]/g, '');
        return `<span class="card-tag ${cleanTag}">${tag}</span>`;
      }).join('');
      
      // Icon mapping
      let icon = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      `;
      
      if (c.tags.includes('GSAP') || c.tags.includes('Animations')) {
        icon = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        `;
      } else if (c.tags.includes('Tailwind')) {
        icon = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        `;
      } else if (c.tags.includes('Juego')) {
        icon = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        `;
      }
      
      card.innerHTML = `
        <div class="card-header">
          <div class="card-icon">${icon}</div>
          <div class="card-actions-row">
            <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${c.id}" title="${isFav ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="card-body">
          <h3>${c.title}</h3>
          <p>${c.description}</p>
          <div class="card-tags">${tagHTML}</div>
        </div>
        <div class="card-footer">
          <span>Ver Detalles y Demo</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      `;
      
      // Navigate to dedicated page
      card.addEventListener('click', () => {
        window.location.href = `component.html?id=${c.id}`;
      });
      
      // Favorite button listener
      const favBtn = card.querySelector('.fav-btn');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = favBtn.getAttribute('data-id');
        const index = favorites.indexOf(id);
        if (index > -1) {
          favorites.splice(index, 1);
          favBtn.classList.remove('active');
          favBtn.querySelector('svg').setAttribute('fill', 'none');
          favBtn.setAttribute('title', 'Añadir a Favoritos');
        } else {
          favorites.push(id);
          favBtn.classList.add('active');
          favBtn.querySelector('svg').setAttribute('fill', 'currentColor');
          favBtn.setAttribute('title', 'Quitar de Favoritos');
        }
        localStorage.setItem('codis-favorites', JSON.stringify(favorites));
        
        if (activeAlbum === 'favorites') {
          renderGrid();
        }
      });
      
      cardsGrid.appendChild(card);
    });
  }
  
  // Search bar listener
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid();
  });
  
  // Sort select listener
  sortSelect.addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderGrid();
  });
  
  // Album select listener
  albumSelect.addEventListener('change', (e) => {
    activeAlbum = e.target.value;
    renderGrid();
  });
  
  // Album Modal management
  createAlbumBtn.addEventListener('click', () => {
    albumModal.classList.add('active');
    newAlbumNameInput.value = '';
    albumErrorMsg.textContent = '';
    newAlbumNameInput.focus();
  });
  
  const closeModal = () => {
    albumModal.classList.remove('active');
  };
  
  closeAlbumModal.addEventListener('click', closeModal);
  cancelAlbumBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  albumModal.addEventListener('click', (e) => {
    if (e.target === albumModal) closeModal();
  });
  
  saveAlbumBtn.addEventListener('click', () => {
    const name = newAlbumNameInput.value.trim();
    if (!name) {
      albumErrorMsg.textContent = 'El nombre no puede estar vacío.';
      return;
    }
    if (name.toLowerCase() === 'all' || name.toLowerCase() === 'favorites') {
      albumErrorMsg.textContent = 'Nombre de álbum reservado.';
      return;
    }
    if (albums[name]) {
      albumErrorMsg.textContent = 'Este álbum ya existe.';
      return;
    }
    
    albums[name] = [];
    localStorage.setItem('codis-albums', JSON.stringify(albums));
    activeAlbum = name;
    
    renderAlbumsDropdown();
    closeModal();
    renderGrid();
  });
  
  // --- FAQs ACCORDION ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const answer = q.nextElementSibling;
      const isActive = item.classList.contains('active');
      
      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- DYNAMIC YEAR ---
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --- GENERAL MODALS TRIGGER ---
  const termsModal = document.getElementById('terms-modal');
  const privacyModal = document.getElementById('privacy-modal');
  const changelogModal = document.getElementById('changelog-modal');
  
  const termsLink = document.getElementById('terms-link');
  const termsFooterLink = document.getElementById('terms-footer-link');
  const privacyLink = document.getElementById('privacy-link');
  const privacyFooterLink = document.getElementById('privacy-footer-link');
  const changelogLink = document.getElementById('changelog-link');
  
  const closeTerms = document.getElementById('close-terms-modal');
  const acceptTerms = document.getElementById('accept-terms-btn');
  const closePrivacy = document.getElementById('close-privacy-modal');
  const acceptPrivacy = document.getElementById('accept-privacy-btn');
  const closeChangelog = document.getElementById('close-changelog-modal');
  const acceptChangelog = document.getElementById('accept-changelog-btn');

  function openGeneralModal(modal) {
    if (modal) modal.classList.add('active');
  }
  
  function closeGeneralModal(modal) {
    if (modal) modal.classList.remove('active');
  }

  if (termsLink) termsLink.addEventListener('click', (e) => { e.preventDefault(); openGeneralModal(termsModal); });
  if (termsFooterLink) termsFooterLink.addEventListener('click', (e) => { e.preventDefault(); openGeneralModal(termsModal); });
  if (privacyLink) privacyLink.addEventListener('click', (e) => { e.preventDefault(); openGeneralModal(privacyModal); });
  if (privacyFooterLink) privacyFooterLink.addEventListener('click', (e) => { e.preventDefault(); openGeneralModal(privacyModal); });
  if (changelogLink) changelogLink.addEventListener('click', (e) => { e.preventDefault(); openGeneralModal(changelogModal); });

  if (closeTerms) closeTerms.addEventListener('click', () => closeGeneralModal(termsModal));
  if (acceptTerms) acceptTerms.addEventListener('click', () => closeGeneralModal(termsModal));
  if (closePrivacy) closePrivacy.addEventListener('click', () => closeGeneralModal(privacyModal));
  if (acceptPrivacy) acceptPrivacy.addEventListener('click', () => closeGeneralModal(privacyModal));
  if (closeChangelog) closeChangelog.addEventListener('click', () => closeGeneralModal(changelogModal));
  if (acceptChangelog) acceptChangelog.addEventListener('click', () => closeGeneralModal(changelogModal));

  window.addEventListener('click', (e) => {
    if (e.target === termsModal) closeGeneralModal(termsModal);
    if (e.target === privacyModal) closeGeneralModal(privacyModal);
    if (e.target === changelogModal) closeGeneralModal(changelogModal);
  });

  // --- GOOGLE APPS SCRIPT DATABASE INTEGRATION ---
  const APPS_SCRIPT_URL = ''; // Paste deployed Apps Script web app URL here

  // --- NEWSLETTER & CREATE FOLDER FORMS ---
  const newsletterForm = document.getElementById('newsletter-form');
  let formAction = 'newsletter';

  const newsSubmitBtn = document.getElementById('newsletter-submit-btn');
  const folderSubmitBtn = document.getElementById('folder-submit-btn');

  if (newsSubmitBtn) {
    newsSubmitBtn.addEventListener('click', () => { formAction = 'newsletter'; });
  }
  if (folderSubmitBtn) {
    folderSubmitBtn.addEventListener('click', () => { formAction = 'create_folder'; });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('newsletter-email').value.trim();
      const optin = document.getElementById('newsletter-optin').checked;
      const termsAccepted = document.getElementById('terms-optin').checked;
      
      if (!email) return;
      if (!termsAccepted) {
        alert('Debes aceptar los Términos y la Política de Privacidad.');
        return;
      }
      
      const payload = {
        action: formAction,
        email: email,
        newsletter_consent: optin
      };

      if (APPS_SCRIPT_URL) {
        fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(() => {
          showSubmitSuccess(formAction);
        }).catch(err => {
          console.error('Submission failed: ', err);
          alert('Hubo un error de red. Intenta de nuevo.');
        });
      } else {
        console.log('GAS Simulation payload: ', payload);
        let localSubs = JSON.parse(localStorage.getItem('codis-local-submissions')) || [];
        localSubs.push({ email, type: formAction, timestamp: new Date() });
        localStorage.setItem('codis-local-submissions', JSON.stringify(localSubs));
        showSubmitSuccess(formAction);
      }
    });
  }

  function showSubmitSuccess(action) {
    document.getElementById('newsletter-email').value = '';
    const successMsg = action === 'create_folder' 
      ? '¡Solicitud enviada! Nos pondremos en contacto para crear tu carpeta.' 
      : '¡Gracias por suscribirte a nuestro boletín!';
    
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = successMsg;
      toast.classList.add('show');
      setTimeout(() => { toast.classList.remove('show'); }, 3500);
    } else {
      alert(successMsg);
    }
  }

  // --- SITE STAR RATING WIDGET ---
  const starsRow = document.getElementById('stars-row');
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingReviewInput = document.getElementById('rating-review');
  const submitRatingBtn = document.getElementById('submit-rating-btn');
  const liveStatsEl = document.getElementById('live-rating-stats');
  
  let currentSelectedRating = 0;
  
  starBtns.forEach(btn => {
    btn.addEventListener('mouseover', () => {
      const val = parseInt(btn.getAttribute('data-value'));
      highlightStars(val, 'hover');
    });
    
    btn.addEventListener('mouseout', () => {
      clearStarsHover();
      highlightStars(currentSelectedRating, 'active');
    });
    
    btn.addEventListener('click', () => {
      currentSelectedRating = parseInt(btn.getAttribute('data-value'));
      highlightStars(currentSelectedRating, 'active');
    });
  });

  function highlightStars(count, className) {
    starBtns.forEach(btn => {
      const val = parseInt(btn.getAttribute('data-value'));
      if (val <= count) {
        btn.classList.add(className);
      } else {
        btn.classList.remove(className);
      }
    });
  }

  function clearStarsHover() {
    starBtns.forEach(btn => btn.classList.remove('hover'));
  }

  function checkSiteRated() {
    const isRated = localStorage.getItem('codis-site-rated') === 'true';
    if (isRated && submitRatingBtn) {
      submitRatingBtn.disabled = true;
      submitRatingBtn.textContent = '¡Ya has calificado el sitio!';
      if (ratingReviewInput) ratingReviewInput.disabled = true;
      const myRating = parseInt(localStorage.getItem('codis-my-rating')) || 5;
      highlightStars(myRating, 'active');
    }
  }
  
  checkSiteRated();

  if (submitRatingBtn) {
    submitRatingBtn.addEventListener('click', () => {
      if (currentSelectedRating === 0) {
        alert('Por favor selecciona una calificación de 1 a 5 estrellas.');
        return;
      }
      
      const review = ratingReviewInput.value.trim();
      const topCategory = getTopVisitedTag();
      const payload = {
        action: 'rate_site',
        rating: currentSelectedRating,
        review: review,
        top_category: topCategory,
        ai_response: ''
      };
      
      if (APPS_SCRIPT_URL) {
        fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(() => {
          saveRatingLocally(currentSelectedRating, review, topCategory, '');
        }).catch(err => {
          console.error('Rating submission failed: ', err);
          alert('Hubo un error al enviar tu calificación.');
        });
      } else {
        console.log('GAS Rating Simulation: ', payload);
        saveRatingLocally(currentSelectedRating, review, topCategory, '');
      }
    });
  }

  function saveRatingLocally(rating, review, topCategory = '', aiResponse = '') {
    localStorage.setItem('codis-site-rated', 'true');
    localStorage.setItem('codis-my-rating', String(rating));
    
    // Log submission details locally
    let localSubs = JSON.parse(localStorage.getItem('codis-local-submissions')) || [];
    localSubs.push({
      type: 'rating_submit',
      rating: rating,
      review: review,
      top_category: topCategory,
      ai_response: aiResponse,
      timestamp: new Date()
    });
    localStorage.setItem('codis-local-submissions', JSON.stringify(localSubs));

    let localRatings = JSON.parse(localStorage.getItem('codis-local-ratings')) || [5, 5, 4, 5, 5, 5, 4, 5, 5];
    localRatings.push(rating);
    localStorage.setItem('codis-local-ratings', JSON.stringify(localRatings));
    
    checkSiteRated();
    updateRatingsDisplay();
    
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = '¡Gracias por valorar nuestro sitio!';
      toast.classList.add('show');
      setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
  }

  function updateRatingsDisplay() {
    if (APPS_SCRIPT_URL) {
      fetch(APPS_SCRIPT_URL)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            renderRatingStats(data.averageRating, data.totalVotes);
          } else {
            fallbackRatingsDisplay();
          }
        })
        .catch(err => {
          console.error('Error fetching rating stats: ', err);
          fallbackRatingsDisplay();
        });
    } else {
      fallbackRatingsDisplay();
    }
  }

  function fallbackRatingsDisplay() {
    let localRatings = JSON.parse(localStorage.getItem('codis-local-ratings'));
    if (!localRatings) {
      localRatings = [5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5];
      localStorage.setItem('codis-local-ratings', JSON.stringify(localRatings));
    }
    
    const count = localRatings.length;
    const sum = localRatings.reduce((a, b) => a + b, 0);
    const avg = parseFloat((sum / count).toFixed(1));
    
    renderRatingStats(avg, count + 112);
  }

  function renderRatingStats(avg, count) {
    if (liveStatsEl) {
      liveStatsEl.innerHTML = `★ <strong>${avg} / 5</strong> estrellas (${count} valoraciones)`;
    }
    
    const schemaEl = document.getElementById('schema-jsonld');
    if (schemaEl) {
      try {
        const schema = JSON.parse(schemaEl.innerHTML);
        schema.aggregateRating.ratingValue = String(avg);
        schema.aggregateRating.reviewCount = String(count);
        schemaEl.innerHTML = JSON.stringify(schema, null, 2);
      } catch (e) {
        console.error('Error updating structured schema: ', e);
      }
    }
  }

  // --- USER ANALYTICS, SESSION TIMER & RATING PROMPT MODAL (5 MIN) ---
  function trackTagsVisit(tags) {
    if (!tags || !Array.isArray(tags)) return;
    let clicks = JSON.parse(localStorage.getItem('codis-tag-clicks')) || {};
    tags.forEach(tag => {
      if (tag && tag !== 'Todos') {
        clicks[tag] = (clicks[tag] || 0) + 1;
      }
    });
    localStorage.setItem('codis-tag-clicks', JSON.stringify(clicks));
  }

  function getTopVisitedTag() {
    const clicks = JSON.parse(localStorage.getItem('codis-tag-clicks')) || {};
    let topTag = 'General';
    let maxClicks = 0;
    for (const [tag, count] of Object.entries(clicks)) {
      if (count > maxClicks) {
        maxClicks = count;
        topTag = tag;
      }
    }
    return topTag;
  }

  function generateAIPrompt(topic) {
    return `Hola, gracias por visitar Codis,. Para leer el contenido que puede te agrade, solo dale enviar a este mensaje, que tengas buena lectura, atte LuisAngelMaciel de Codis.

### Guía de Lectura y Aprendizaje Personalizada: ${topic}

Quiero que me expliques en profundidad el tema **"${topic}"** aplicado al desarrollo web moderno.

Por favor, sigue estas pautas para estructurar tu respuesta:
1. **Fundamentos y Conceptos Clave**: Explica qué es, por qué es importante y cuáles son las mejores prácticas asociadas.
2. **Investigación en Fuentes Oficiales**: Comienza buscando e investigando en las páginas de mayor autoridad oficial de empresas y comunidades de desarrollo técnico líderes en esta área (por ejemplo, MDN Web Docs, la documentación oficial de la tecnología, etc.) y en el sitio local de Codis (http://codis-preview.local/).
3. **Ejemplos Prácticos**: Proporciona ejemplos prácticos de código limpio, accesibilidad y rendimiento optimizado.
4. **Respuestas Configuradas**: Responde conforme a la configuración y directrices del sistema o instrucciones personalizadas que tengas configuradas en tu perfil.`;
  }

  if (!sessionStorage.getItem('codis-session-start')) {
    sessionStorage.setItem('codis-session-start', Date.now().toString());
  }

  function checkSessionTimer() {
    if (localStorage.getItem('codis-site-rated') === 'true' || sessionStorage.getItem('codis-rating-modal-shown') === 'true') {
      return;
    }
    
    const startTime = parseInt(sessionStorage.getItem('codis-session-start'));
    const elapsed = (Date.now() - startTime) / 1000;
    
    // 5 minutes = 300 seconds
    if (elapsed >= 300) {
      showRatingPromptModal();
    }
  }

  function showRatingPromptModal() {
    const modal = document.getElementById('rating-prompt-modal');
    if (!modal) return;
    
    sessionStorage.setItem('codis-rating-modal-shown', 'true');
    clearInterval(timerInterval);
    
    const topCategory = getTopVisitedTag();
    const promptText = generateAIPrompt(topCategory);
    
    const categoryEl = document.getElementById('prompt-top-category');
    if (categoryEl) categoryEl.textContent = topCategory;
    
    const promptTextEl = document.getElementById('prompt-dynamic-text');
    if (promptTextEl) promptTextEl.textContent = promptText;
    
    let ratingValue = 0;
    const starBtns = document.querySelectorAll('.prompt-star-btn');
    
    starBtns.forEach(btn => {
      btn.classList.remove('hover', 'active');
      
      btn.addEventListener('mouseover', () => {
        const val = parseInt(btn.getAttribute('data-value'));
        starBtns.forEach(b => {
          if (parseInt(b.getAttribute('data-value')) <= val) {
            b.classList.add('hover');
          } else {
            b.classList.remove('hover');
          }
        });
      });
      
      btn.addEventListener('mouseout', () => {
        starBtns.forEach(b => b.classList.remove('hover'));
        starBtns.forEach(b => {
          if (parseInt(b.getAttribute('data-value')) <= ratingValue) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      });
      
      btn.addEventListener('click', () => {
        ratingValue = parseInt(btn.getAttribute('data-value'));
        starBtns.forEach(b => {
          if (parseInt(b.getAttribute('data-value')) <= ratingValue) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      });
    });
    
    const copyBtn = document.getElementById('copy-prompt-modal-btn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(promptText).then(() => {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          `;
          
          const toastEl = document.getElementById('toast');
          if (toastEl) {
            toastEl.textContent = '¡Prompt de IA copiado!';
            toastEl.classList.add('show');
            setTimeout(() => { toastEl.classList.remove('show'); }, 3000);
          } else {
            alert('¡Prompt de IA copiado!');
          }
          
          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
          }, 2000);
        });
      };
    }
    
    const closeBtn = document.getElementById('close-rating-prompt-modal');
    const cancelBtn = document.getElementById('cancel-rating-prompt-btn');
    
    const closeModal = () => {
      modal.classList.remove('active');
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    const submitBtn = document.getElementById('submit-prompt-rating-btn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (ratingValue === 0) {
          alert('Por favor selecciona una calificación de 1 a 5 estrellas.');
          return;
        }
        
        const review = document.getElementById('prompt-rating-review').value.trim();
        const aiResponse = document.getElementById('prompt-ai-response').value.trim();
        
        const payload = {
          action: 'rate_site',
          rating: ratingValue,
          review: review,
          top_category: topCategory,
          ai_response: aiResponse
        };
        
        if (APPS_SCRIPT_URL) {
          fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(() => {
            saveRatingLocally(ratingValue, review, topCategory, aiResponse);
            closeModal();
          }).catch(err => {
            console.error('Rating submission failed: ', err);
            alert('Hubo un error al enviar tu calificación.');
          });
        } else {
          console.log('GAS Rating Simulation: ', payload);
          saveRatingLocally(ratingValue, review, topCategory, aiResponse);
          closeModal();
        }
      };
    }
    
    modal.classList.add('active');
  }

  const timerInterval = setInterval(checkSessionTimer, 10000);

  // --- FUZZY SEARCH ALGORITHM ---
  function fuzzyMatchScore(c, query) {
    if (!query) return 1;
    
    const cleanQuery = query.toLowerCase().trim();
    const title = c.title.toLowerCase();
    const desc = c.description.toLowerCase();
    const folder = c.folder.toLowerCase();
    const tags = (c.tags || []).map(t => t.toLowerCase());
    
    let score = 0;
    
    // Direct matches
    if (title.includes(cleanQuery)) {
      score += 150;
      if (title.startsWith(cleanQuery)) score += 50;
    }
    if (desc.includes(cleanQuery)) score += 40;
    if (folder.includes(cleanQuery)) score += 30;
    
    // Word splits
    const words = cleanQuery.split(/\s+/).filter(Boolean);
    words.forEach(word => {
      if (title.includes(word)) score += 30;
      if (desc.includes(word)) score += 10;
      if (folder.includes(word)) score += 10;
      
      tags.forEach(tag => {
        if (tag.includes(word)) {
          score += 25;
          if (tag === word) score += 20;
        }
      });
    });
    
    // Subsequence check
    if (words.length === 1 && words[0].length >= 3) {
      const singleWord = words[0];
      let i = 0, j = 0;
      while (i < title.length && j < singleWord.length) {
        if (title[i] === singleWord[j]) j++;
        i++;
      }
      if (j === singleWord.length) score += 15;
    }
    
    return score;
  }

  // --- BACKUP IMPORT/EXPORT SYSTEM ---
  const exportBackupLink = document.getElementById('export-backup-link');
  const importBackupLink = document.getElementById('import-backup-link');
  const importBackupFile = document.getElementById('import-backup-file');

  if (exportBackupLink) {
    exportBackupLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      const backupData = {
        favorites: JSON.parse(localStorage.getItem('codis-favorites')) || [],
        albums: JSON.parse(localStorage.getItem('codis-albums')) || {},
        tagClicks: JSON.parse(localStorage.getItem('codis-tag-clicks')) || {}
      };
      
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `codis-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = '¡Copia descargada!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      } else {
        alert('¡Copia de seguridad descargada!');
      }
    });
  }

  if (importBackupLink && importBackupFile) {
    importBackupLink.addEventListener('click', (e) => {
      e.preventDefault();
      importBackupFile.click();
    });
    
    importBackupFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (!data || typeof data !== 'object') throw new Error('Formato inválido');
          
          const favs = Array.isArray(data.favorites) ? data.favorites : [];
          const albs = (data.albums && typeof data.albums === 'object') ? data.albums : {};
          const tClicks = (data.tagClicks && typeof data.tagClicks === 'object') ? data.tagClicks : {};
          
          localStorage.setItem('codis-favorites', JSON.stringify(favs));
          localStorage.setItem('codis-albums', JSON.stringify(albs));
          localStorage.setItem('codis-tag-clicks', JSON.stringify(tClicks));
          
          favorites = favs;
          albums = albs;
          
          renderAlbumsDropdown();
          renderFilters();
          renderGrid();
          
          alert('¡Copia de seguridad restaurada correctamente!');
        } catch (err) {
          console.error(err);
          alert('Error al importar. Verifica que sea un archivo de respaldo JSON válido.');
        }
      };
      reader.readAsText(file);
      importBackupFile.value = '';
    });
  }

  // --- REGISTER SERVICE WORKER FOR PWA ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker registrado con éxito: ', reg.scope))
        .catch(err => console.error('Fallo al registrar Service Worker: ', err));
    });
  }

  // --- SCROLL PROGRESS & FLOATING SCROLL CONTROLS ---
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const scrollControls = document.getElementById('scroll-controls');
  const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
  const scrollToBottomBtn = document.getElementById('scroll-to-bottom-btn');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (scrollControls) {
      if (scrollTop > 200) {
        scrollControls.classList.add('show');
      } else {
        scrollControls.classList.remove('show');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (scrollToBottomBtn) {
    scrollToBottomBtn.addEventListener('click', () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    });
  }

  // Initial renders
  renderFilters();
  renderGrid();
  updateRatingsDisplay();
  checkSessionTimer();
});
