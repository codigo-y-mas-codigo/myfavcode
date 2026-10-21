// Configuración para Google Sheets
// INSTRUCCIONES: 
// 1. Sigue la guía en google-sheets-setup.md para configurar Google Apps Script
// 2. Reemplaza la URL_PLACEHOLDER con tu URL real de Google Apps Script
// 3. Cambia ENABLE_GOOGLE_SHEETS a true para habilitar la integración real

const ENABLE_GOOGLE_SHEETS = false; // Cambiar a true cuando esté configurado
const GOOGLE_SCRIPT_URL = 'URL_PLACEHOLDER'; // Reemplazar con la URL real

export const submitToGoogleSheets = async (data) => {
  if (!ENABLE_GOOGLE_SHEETS) {
    // Simulación para desarrollo/demo
    console.log('Simulando envío a Google Sheets:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Datos guardados (simulación)' });
      }, 1000);
    });
  }

  // Integración real con Google Sheets
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Error desconocido');
    }

    return result;
    
  } catch (error) {
    console.error('Error enviando a Google Sheets:', error);
    throw new Error('Error al guardar los datos. Por favor intenta de nuevo.');
  }
};

