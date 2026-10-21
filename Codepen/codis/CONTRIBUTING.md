# Directrices de Contribución para Codis Component Library 📦

¡Gracias por tu interés en contribuir a **Codis**! Este proyecto es un catálogo interactivo de código abierto, diseñado para recopilar, probar y documentar componentes web modernos con una arquitectura *Local-First*.

---

## 1. Filosofía del Proyecto

* **Local-First & Offline:** Cada componente debe ser autónomo y funcional sin requerir servicios backend propietarios complejos.
* **Aislamiento Seguro:** Los componentes se ejecutan dentro de iframes en sandbox, garantizando que los estilos o scripts experimentales no rompan el entorno principal.
* **Calidad y Claridad:** El código debe ser legible, modular y listo para ser copiado y reutilizado por la comunidad.

---

## 2. Cómo Agregar un Nuevo Componente

Para añadir un componente a la biblioteca, sigue estos pasos:

1. **Crea una carpeta dedicada** en la raíz del repositorio con un nombre descriptivo en minúsculas y separado por guiones (ej. `mi-nuevo-componente/`).
2. **Estructura de archivos requerida:**
   * `index.html`: Archivo principal que contiene la estructura HTML, estilos (dentro de `<style>` o enlazado) y scripts (dentro de `<script>` o enlazado).
   * *(Opcional)* `style.css` / `script.js`: Si prefieres mantener los archivos desacoplados.
3. **Ejecuta el escáner:**
   ```bash
   python scanner.py
   ```
   El escáner detectará automáticamente tu nueva carpeta, limpiará los títulos por defecto y la indexará en el archivo maestro `components-data.js`.

---

## 3. Requisitos de Calidad y Seguridad

Antes de enviar un Pull Request, asegúrate de que tu componente cumpla con las siguientes normas:

* **Sin Claves Privadas:** No incluyas API keys, tokens de acceso ni credenciales de servicios en el código.
* **Sin Rastreadores Ocultos:** Está prohibido incluir píxeles de seguimiento, scripts de telemetría de terceros o minería en segundo plano.
* **Accesibilidad (a11y):** Utiliza elementos semánticos de HTML5 (`<button>`, `<nav>`, `<main>`, `<header>`) y añade atributos `aria-*` cuando corresponda.
* **Dependencias CDN Confiables:** Si requieres librerías externas (como GSAP, Lucide Icons, etc.), utiliza enlaces a CDNs públicos estables (ej. `cdnjs.cloudflare.com`, `unpkg.com` o `cdn.jsdelivr.net`).

---

## 4. Proceso de Envío (Pull Request Workflow)

1. Haz un **Fork** de este repositorio.
2. Crea una rama descriptiva para tu cambio: `git checkout -b feature/nuevo-boton-liquid`.
3. Realiza tus cambios y ejecuta `python scanner.py` para verificar que la base de datos se actualice correctamente.
4. Haz commit de tus cambios: `git commit -m "feat: agrega nuevo componente de boton liquid glass"`.
5. Envía un **Pull Request** explicando brevemente qué hace tu componente y qué tecnologías utiliza.

---

## 5. Contacto y Comunidad

Para dudas, sugerencias o colaboraciones directas, puedes conectar con el creador del proyecto:
* **Autor:** Luis Ángel Maciel
* **X (Twitter):** [@luisangelmaciel](https://x.com/luisangelmaciel)
