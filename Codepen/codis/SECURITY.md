# Política de Seguridad de Codis 🛡️

La seguridad y la privacidad de los desarrolladores y usuarios de **Codis Component Library** son fundamentales. Este documento describe cómo manejamos la seguridad y el proceso para reportar cualquier vulnerabilidad.

---

## 1. Versiones Soportadas

| Versión | Soportada |
| :--- | :--- |
| `v2.x` (Actual) | ✅ Sí |
| `v1.x` | ❌ No |

---

## 2. Aislamiento y Entorno de Ejecución (Sandboxing)

* **Ejecución en Iframe:** Todas las demostraciones de componentes se renderizan dentro de un `<iframe>` aislado con atributos estrictos `sandbox="allow-scripts allow-same-origin"`.
* **Protección del Almacenamiento Local:** Los scripts de componentes individuales se ejecutan dentro del contexto de su propio documento y no tienen acceso a modificar el estado global del catálogo principal salvo las acciones parametrizadas por el portal.
* **Sin Recopilación Invasiva:** Codis no almacena contraseñas, datos bancarios ni información personal confidencial. La telemetría de clics se almacena estrictamente de forma local en tu navegador (`localStorage`).

---

## 3. Reporte Responsable de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad (como una falla de escape de scripts, XSS en el playground o problemas en la configuración de la PWA), por favor **no abras un Issue público**.

Sigue este procedimiento para una divulgación responsable:

1. **Contacto Privado:** Envía un mensaje directo al mantenedor principal del proyecto:
   * **Luis Ángel Maciel en X:** [@luisangelmaciel](https://x.com/luisangelmaciel)
2. **Información requerida:**
   * Descripción detallada del problema.
   * Pasos para reproducir la vulnerabilidad o código de prueba de concepto (PoC).
   * Impacto potencial estimado.
3. **Tiempo de Respuesta:** Nos comprometemos a acusar recibo en un plazo menor a 48 horas y a trabajar en un parche de seguridad de forma prioritaria.

---

¡Gracias por ayudarnos a mantener segura a la comunidad de Codis!
