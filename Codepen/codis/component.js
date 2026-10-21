document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');
  const previewIframe = document.getElementById('preview-iframe');
  const deviceAddress = document.getElementById('device-address');
  
  // Code Blocks & Prompt
  const codeHtml = document.getElementById('code-html').querySelector('code');
  const codeCss = document.getElementById('code-css').querySelector('code');
  const codeJs = document.getElementById('code-js').querySelector('code');
  const codeCombined = document.getElementById('code-combined').querySelector('code');
  const promptText = document.getElementById('prompt-text');
  const descText = document.getElementById('desc-text');
  
  const copyBtn = document.getElementById('copy-btn');
  const toast = document.getElementById('toast');
  
  // State
  let selectedComponent = null;
  let activeTab = 'preview';
  let loadedTabs = {};
  
  // Initialize
  const components = window.COMPONENTS || [];
  
  // Get component ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const compId = urlParams.get('id');
  
  // Safe escape for HTML display
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Combine HTML, CSS and JS into a single HTML structure
  function getCombinedHTML(comp) {
    let html = comp.html || '';
    const css = comp.css || '';
    const js = comp.js || '';
    
    const styleTag = `\n  <style>\n${css.split('\n').map(line => '    ' + line).join('\n')}\n  </style>\n`;
    const scriptTag = `\n  <script>\n${js.split('\n').map(line => '    ' + line).join('\n')}\n  </script>\n`;
    
    // Inject CSS into head
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${styleTag}</head>`);
    } else if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>${styleTag}`);
    } else {
      html = styleTag + html;
    }
    
    // Inject JS into body
    if (html.includes('</body>')) {
      html = html.replace('</body>', `${scriptTag}</body>`);
    } else {
      html = html + scriptTag;
    }
    
    return html;
  }
  
  // Find component
  selectedComponent = components.find(c => c.id === compId);
  
  if (!selectedComponent) {
    modalTitle.textContent = 'Componente no encontrado';
    modalSubtitle.textContent = 'Verifica el ID en la URL.';
    descText.textContent = 'No se ha podido encontrar este componente en la base de datos de Codis.';
    return;
  }

  // Track component tags view
  if (selectedComponent && selectedComponent.tags) {
    trackTagsVisit(selectedComponent.tags);
  }
  
  // Render component details
  modalTitle.textContent = selectedComponent.title;
  modalSubtitle.textContent = `Ubicación original: codis/${selectedComponent.relativePath}`;
  descText.textContent = selectedComponent.description;
  deviceAddress.textContent = `http://codis-preview.local/${selectedComponent.folder}/`;

  // Initialize editable textareas
  const editorHtml = document.getElementById('editor-html');
  const editorCss = document.getElementById('editor-css');
  const editorJs = document.getElementById('editor-js');
  if (editorHtml) editorHtml.value = selectedComponent.html || '';
  if (editorCss) editorCss.value = selectedComponent.css || '';
  if (editorJs) editorJs.value = selectedComponent.js || '';
  
  // Favorites & Albums Elements
  const detailFavBtn = document.getElementById('detail-fav-btn');
  const detailAlbumsList = document.getElementById('detail-albums-list');
  const quickAlbumInput = document.getElementById('quick-album-input');
  const quickAlbumBtn = document.getElementById('quick-album-btn');
  
  // Load Favorites and Albums state
  let favorites = JSON.parse(localStorage.getItem('codis-favorites')) || [];
  let albums = JSON.parse(localStorage.getItem('codis-albums')) || {};
  
  // Setup favorite button state
  function updateFavBtnState() {
    const isFav = favorites.includes(selectedComponent.id);
    if (isFav) {
      detailFavBtn.classList.add('active');
      detailFavBtn.querySelector('span').textContent = 'En Favoritos ★';
    } else {
      detailFavBtn.classList.remove('active');
      detailFavBtn.querySelector('span').textContent = 'Añadir a Favoritos';
    }
  }
  
  updateFavBtnState();
  
  detailFavBtn.addEventListener('click', () => {
    const index = favorites.indexOf(selectedComponent.id);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(selectedComponent.id);
    }
    localStorage.setItem('codis-favorites', JSON.stringify(favorites));
    updateFavBtnState();
  });
  
  // Render album checkboxes list
  function renderAlbumsChecklist() {
    detailAlbumsList.innerHTML = '';
    
    const albumNames = Object.keys(albums).sort();
    if (albumNames.length === 0) {
      detailAlbumsList.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-secondary); font-style: italic; margin-bottom: 0.5rem;">No tienes álbumes creados.</p>';
      return;
    }
    
    albumNames.forEach(albumName => {
      const isMember = albums[albumName] && albums[albumName].includes(selectedComponent.id);
      
      const label = document.createElement('label');
      label.className = 'album-checkbox-label';
      label.innerHTML = `
        <input type="checkbox" ${isMember ? 'checked' : ''} data-album="${albumName}">
        <span>${albumName}</span>
      `;
      
      const checkbox = label.querySelector('input');
      checkbox.addEventListener('change', () => {
        if (!albums[albumName]) albums[albumName] = [];
        const index = albums[albumName].indexOf(selectedComponent.id);
        
        if (checkbox.checked) {
          if (index === -1) {
            albums[albumName].push(selectedComponent.id);
          }
        } else {
          if (index > -1) {
            albums[albumName].splice(index, 1);
          }
        }
        localStorage.setItem('codis-albums', JSON.stringify(albums));
      });
      
      detailAlbumsList.appendChild(label);
    });
  }
  
  renderAlbumsChecklist();
  
  // Quick Album Creation
  function handleQuickAlbumCreation() {
    const name = quickAlbumInput.value.trim();
    if (!name) return;
    if (name.toLowerCase() === 'all' || name.toLowerCase() === 'favorites') {
      alert('Nombre de álbum reservado.');
      return;
    }
    if (albums[name]) {
      alert('Este álbum ya existe.');
      return;
    }
    
    // Create new album and add this component to it automatically
    albums[name] = [selectedComponent.id];
    localStorage.setItem('codis-albums', JSON.stringify(albums));
    
    quickAlbumInput.value = '';
    renderAlbumsChecklist();
  }
  
  quickAlbumBtn.addEventListener('click', handleQuickAlbumCreation);
  quickAlbumInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleQuickAlbumCreation();
    }
  });

  // Load iframe preview
  loadIframePreview(selectedComponent);
  
  // Pre-clear code containers
  codeHtml.innerHTML = '&lt;!-- Haz clic en la pestaña HTML para cargar el código --&gt;';
  codeCss.textContent = '/* Haz clic en la pestaña CSS para cargar el código */';
  codeJs.textContent = '// Haz clic en la pestaña JS para cargar el código';
  codeCombined.innerHTML = '&lt;!-- Haz clic en la pestaña HTML Completo para cargar el código --&gt;';
  promptText.textContent = 'Haz clic en la pestaña Prompt IA para ver las instrucciones';
  
  // Live Editor state
  let isEditing = false;
  const editToggleBtn = document.getElementById('edit-toggle-btn');
  const resetCodeBtn = document.getElementById('reset-code-btn');

  function updateEditorVisibility() {
    const preHtml = document.getElementById('code-html');
    const preCss = document.getElementById('code-css');
    const preJs = document.getElementById('code-js');
    
    if (isEditing) {
      if (preHtml) preHtml.style.display = 'none';
      if (editorHtml) editorHtml.style.display = 'block';
      if (preCss) preCss.style.display = 'none';
      if (editorCss) editorCss.style.display = 'block';
      if (preJs) preJs.style.display = 'none';
      if (editorJs) editorJs.style.display = 'block';
      editToggleBtn.textContent = '👁️ Ver Resaltado';
      editToggleBtn.style.background = 'rgba(34, 211, 238, 0.15)';
      editToggleBtn.style.borderColor = 'var(--accent-cyan)';
      resetCodeBtn.style.display = 'inline-flex';
    } else {
      // Re-populate highlighted containers when toggling back
      if (editorHtml) codeHtml.querySelector('code').innerHTML = escapeHTML(editorHtml.value);
      if (editorCss) codeCss.querySelector('code').textContent = editorCss.value;
      if (editorJs) codeJs.querySelector('code').textContent = editorJs.value;

      if (preHtml) preHtml.style.display = 'block';
      if (editorHtml) editorHtml.style.display = 'none';
      if (preCss) preCss.style.display = 'block';
      if (editorCss) editorCss.style.display = 'none';
      if (preJs) preJs.style.display = 'block';
      if (editorJs) editorJs.style.display = 'none';
      editToggleBtn.textContent = '✏️ Editar Código';
      editToggleBtn.style.background = 'rgba(255,255,255,0.05)';
      editToggleBtn.style.borderColor = 'var(--border-color)';
      resetCodeBtn.style.display = 'none';
    }
  }

  if (editToggleBtn) {
    editToggleBtn.addEventListener('click', () => {
      isEditing = !isEditing;
      updateEditorVisibility();
    });
  }

  if (resetCodeBtn) {
    resetCodeBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres restablecer el código original? Se perderán tus cambios locales.')) {
        if (editorHtml) editorHtml.value = selectedComponent.html || '';
        if (editorCss) editorCss.value = selectedComponent.css || '';
        if (editorJs) editorJs.value = selectedComponent.js || '';
        
        codeHtml.querySelector('code').innerHTML = escapeHTML(selectedComponent.html || '');
        codeCss.querySelector('code').textContent = selectedComponent.css || '';
        codeJs.querySelector('code').textContent = selectedComponent.js || '';
        
        updatePreviewFromEditors();
        
        toast.textContent = 'Código restablecido al original';
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
      }
    });
  }

  function updatePreviewFromEditors() {
    const htmlVal = editorHtml ? editorHtml.value : '';
    const cssVal = editorCss ? editorCss.value : '';
    const jsVal = editorJs ? editorJs.value : '';
    loadIframePreview({ html: htmlVal, css: cssVal, js: jsVal });
  }

  if (editorHtml) editorHtml.addEventListener('input', updatePreviewFromEditors);
  if (editorCss) editorCss.addEventListener('input', updatePreviewFromEditors);
  if (editorJs) editorJs.addEventListener('input', updatePreviewFromEditors);

  // Tab controller
  tabLinks.forEach(tab => {
    tab.addEventListener('click', () => {
      tabLinks.forEach(link => link.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      tab.classList.add('active');
      activeTab = tab.getAttribute('data-tab');
      document.getElementById(`tab-${activeTab}`).classList.add('active');
      
      // Lazy load tab content if not loaded yet
      if (activeTab !== 'preview' && !loadedTabs[activeTab]) {
        const tabToLoad = activeTab;
        
        // Show temporary loading text
        if (tabToLoad === 'html') codeHtml.querySelector('code').innerHTML = '&lt;!-- Cargando código HTML... --&gt;';
        else if (tabToLoad === 'css') codeCss.querySelector('code').textContent = '/* Cargando código CSS... */';
        else if (tabToLoad === 'js') codeJs.querySelector('code').textContent = '// Cargando código JS...';
        else if (tabToLoad === 'combined') codeCombined.querySelector('code').innerHTML = '&lt;!-- Cargando código HTML completo... --&gt;';
        else if (tabToLoad === 'prompt') promptText.textContent = 'Cargando prompt...';
        
        setTimeout(() => {
          if (selectedComponent && activeTab === tabToLoad) {
            if (tabToLoad === 'html') {
              codeHtml.querySelector('code').innerHTML = escapeHTML(selectedComponent.html || '<!-- No HTML code available -->');
            } else if (tabToLoad === 'css') {
              codeCss.querySelector('code').textContent = selectedComponent.css || '/* No CSS code available */';
            } else if (tabToLoad === 'js') {
              codeJs.querySelector('code').textContent = selectedComponent.js || '// No JavaScript code available';
            } else if (tabToLoad === 'combined') {
              codeCombined.querySelector('code').innerHTML = escapeHTML(getCombinedHTML(selectedComponent));
            } else if (tabToLoad === 'prompt') {
              promptText.textContent = selectedComponent.prompt || '';
            }
            loadedTabs[tabToLoad] = true;
          }
        }, 50);
      }

      // Update Edit controls visibility
      if (['html', 'css', 'js'].includes(activeTab)) {
        if (editToggleBtn) editToggleBtn.style.display = 'inline-flex';
        if (resetCodeBtn) resetCodeBtn.style.display = isEditing ? 'inline-flex' : 'none';
      } else {
        if (editToggleBtn) editToggleBtn.style.display = 'none';
        if (resetCodeBtn) resetCodeBtn.style.display = 'none';
      }

      // Update Copy button text and state
      copyBtn.classList.remove('copied');
      if (activeTab === 'preview') {
        copyBtn.style.display = 'none';
      } else {
        copyBtn.style.display = 'flex';
        if (activeTab === 'prompt') {
          copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg> Copiar Prompt
          `;
        } else {
          copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg> Copiar Código
          `;
        }
      }
    });
  });
  
  // Copy to clipboard
  copyBtn.addEventListener('click', () => {
    let textToCopy = '';
    
    if (activeTab === 'html') textToCopy = isEditing ? editorHtml.value : selectedComponent.html;
    else if (activeTab === 'css') textToCopy = isEditing ? editorCss.value : selectedComponent.css;
    else if (activeTab === 'js') textToCopy = isEditing ? editorJs.value : selectedComponent.js;
    else if (activeTab === 'combined') {
      textToCopy = isEditing 
        ? getCombinedHTML({ html: editorHtml.value, css: editorCss.value, js: editorJs.value })
        : getCombinedHTML(selectedComponent);
    }
    else if (activeTab === 'prompt') textToCopy = selectedComponent.prompt;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyBtn.classList.add('copied');
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg> ¡Copiado!
      `;
      
      // Toast notification
      toast.textContent = activeTab === 'prompt' ? 'Prompt copiado al portapapeles' : 'Código copiado al portapapeles';
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
      
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = originalHTML;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });
  
  // Sandbox iframe loader
  function loadIframePreview(comp) {
    try {
      const iframeDoc = previewIframe.contentWindow.document;
      iframeDoc.open();
      
      let html = comp.html || '';
      const css = comp.css || '';
      const js = comp.js || '';
      
      const styleTag = `<style>${css}</style>`;
      const scriptTag = `<script>
        try {
          ${js}
        } catch (e) {
          console.error("Error in component script: ", e);
        }
      </script>`;
      
      // Inject CSS
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${styleTag}</head>`);
      } else if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>${styleTag}`);
      } else {
        html = styleTag + html;
      }
      
      // Inject JS
      if (html.includes('</body>')) {
        html = html.replace('</body>', `${scriptTag}</body>`);
      } else {
        html = html + scriptTag;
      }
      
      iframeDoc.write(html);
      iframeDoc.close();
      
      // Track tags
      if (comp.tags) trackTagsVisit(comp.tags);
    } catch (e) {
      console.error("Failed to write to preview iframe: ", e);
    }
  }

  // --- USER ANALYTICS, SESSION TIMER & RATING PROMPT MODAL (5 MIN) ---
  const APPS_SCRIPT_URL = ''; // Paste deployed Apps Script web app URL here

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
    
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = '¡Gracias por valorar nuestro sitio!';
      toast.classList.add('show');
      setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
  }

  // --- RESPONSIVE DEVICE TOGGLES ---
  const deviceMobileBtn = document.getElementById('device-mobile-btn');
  const deviceTabletBtn = document.getElementById('device-tablet-btn');
  const deviceDesktopBtn = document.getElementById('device-desktop-btn');
  const previewDevice = document.querySelector('.preview-device');

  function setDeviceWidth(width, activeBtn) {
    if (!previewDevice) return;
    previewDevice.style.width = width;
    
    // Toggle active visual states
    [deviceMobileBtn, deviceTabletBtn, deviceDesktopBtn].forEach(btn => {
      if (btn) {
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.borderColor = 'var(--border-color)';
        btn.style.color = 'var(--text-secondary)';
      }
    });
    if (activeBtn) {
      activeBtn.style.background = 'rgba(34, 211, 238, 0.1)';
      activeBtn.style.borderColor = 'var(--accent-cyan)';
      activeBtn.style.color = '#fff';
    }
  }

  if (deviceMobileBtn) deviceMobileBtn.addEventListener('click', () => setDeviceWidth('375px', deviceMobileBtn));
  if (deviceTabletBtn) deviceTabletBtn.addEventListener('click', () => setDeviceWidth('768px', deviceTabletBtn));
  if (deviceDesktopBtn) deviceDesktopBtn.addEventListener('click', () => setDeviceWidth('100%', deviceDesktopBtn));

  // --- SCROLL PROGRESS BAR ---
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const timerInterval = setInterval(checkSessionTimer, 10000);
  checkSessionTimer();
});
