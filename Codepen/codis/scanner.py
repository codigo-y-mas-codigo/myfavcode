import os
import json
import re
import sys

# Ensure stdout handles UTF-8 correctly on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')


def clean_name(folder_name):
    # Convert kebab-case or snake_case to Title Case
    name = folder_name.replace("-", " ").replace("_", " ")
    return name.title()

def generate_prompt_and_description(folder_name, html_content, css_content, js_content):
    # Analyze files to generate custom descriptions and prompts
    description = f"Componente interactivo para {clean_name(folder_name)}."
    prompt = f"Crea un componente web interactivo para '{clean_name(folder_name)}' utilizando HTML, CSS y JavaScript."
    
    # Simple heuristics
    html_lower = html_content.lower()
    css_lower = css_content.lower()
    js_lower = js_content.lower()
    
    # Specific component heuristics
    if "tarot" in folder_name.lower() or "tarot" in html_lower:
      description = "Pantalla interactiva de lectura de cartas de Tarot con animaciones fluidas."
      prompt = "Crea una interfaz de cartas de Tarot interactiva usando HTML, CSS y JS (con soporte para GSAP). Las cartas deben apilarse, tener efecto hover, y rotar suavemente al hacer clic sobre ellas para revelar el contenido."
    elif "asistente" in folder_name.lower() or "prompt" in folder_name.lower():
      description = "Formulario estructurado en pasos para construir prompts optimizados para generadores de imágenes/video por IA."
      prompt = "Crea un 'Asistente de Prompts' con un diseño moderno tipo dashboard oscuro. Incluye campos para el sujeto, la acción, el estilo visual (con controles segmentados) y la cámara. El resultado debe generar un prompt listo para copiar."
    elif "book-store" in folder_name.lower() or "book" in folder_name.lower():
      description = "Interfaz de tienda o catálogo de libros con navegación fluida y diseño moderno."
      prompt = "Diseña una interfaz moderna (UI) de catálogo de libros utilizando HTML y CSS. Incluye secciones de libros populares, categorías deslizables, buscador y detalles del libro con transiciones suaves."
    elif "music" in folder_name.lower():
      description = "Reproductor o landing page de aplicación musical con controles estéticos."
      prompt = "Crea una página de aterrizaje (landing page) o interfaz para una aplicación de música. Incluye controles de reproducción estéticos, lista de reproducción interactiva, y efectos visuales de desenfoque de fondo."
    elif "hangman" in folder_name.lower() or "ahorcado" in html_lower:
      description = "Clásico juego del ahorcado implementado utilizando selectores y estados de CSS."
      prompt = "Diseña un juego del ahorcado completamente interactivo. Utiliza CSS puro y checkboxes para controlar el estado del juego sin JavaScript o con mínima lógica, mostrando partes del dibujo en base a los errores."
    elif "landing" in folder_name.lower():
      description = "Landing page responsiva y elegante diseñada con componentes y tipografías premium."
      prompt = "Diseña una landing page responsiva, moderna y visualmente atractiva. Agrega secciones de hero con botones de llamado a la acción (CTA), características clave, testimonios y un pie de página estético."
    elif "ticket" in folder_name.lower() or "movie" in folder_name.lower():
      description = "Interfaz de reserva de boletos de cine con selección interactiva de asientos."
      prompt = "Crea una aplicación de reserva de boletos de cine. Incluye una vista interactiva de selección de asientos en el cine, selección de horario, y resumen de compra con transiciones dinámicas."
    elif "marquee" in folder_name.lower():
      description = "Efecto de texto o elementos infinitos flotantes en carrusel con pausa al hacer hover."
      prompt = "Implementa una marquesina infinita con CSS puro. Los elementos deben desplazarse horizontalmente de forma continua y desacelerar o pausarse suavemente cuando el cursor pase por encima (hover)."
    elif "navigation" in folder_name.lower() or "tab-bar" in folder_name.lower():
      description = "Barra de navegación interactiva y fluida para aplicaciones móviles o de escritorio."
      prompt = "Diseña una barra de navegación móvil (Tab Bar) con efectos fluidos. Utiliza SVG filters (efecto gooey) o transiciones CSS para que el indicador activo fluya suavemente entre los diferentes botones."
    elif "aleatorio" in folder_name.lower() or "random" in folder_name.lower():
      description = "Generador interactivo para crear conjuntos o grupos aleatorios a partir de un listado de elementos."
      prompt = "Crea una herramienta web interactiva para generar conjuntos o grupos aleatorios a partir de una lista de nombres o elementos. Incluye opciones para definir el número de grupos y un botón para realizar el sorteo con efectos visuales dinámicos."
    elif "editor-de-texto" in folder_name.lower() or "text-editor" in folder_name.lower():
      description = "Editor de texto HTML interactivo con guardado automático en LocalStorage y opción de descarga del archivo."
      prompt = "Crea un editor de texto enriquecido o editor HTML interactivo. Permite escribir y visualizar el resultado en tiempo real, guardar el progreso automáticamente en LocalStorage y descargar el contenido como un archivo .html."
    elif "slider" in folder_name.lower() or "carrusel" in folder_name.lower():
      description = "Carrusel de imágenes interactivo utilizando un diseño Flexbox y animaciones de transición fluidas."
      prompt = "Diseña un carrusel de imágenes responsivo (slider) utilizando propiedades CSS Flexbox. Incluye controles de navegación (flechas e indicadores), transiciones de escala al hacer clic o hover, y animaciones de transición fluidas."
    elif "scroller" in folder_name.lower():
      description = "Carrusel de tarjetas de contenido horizontal con efecto scroll snap para una navegación táctil fluida."
      prompt = "Implementa una galería o carrusel de contenido horizontal con scroll-snap en CSS. Los elementos deben alinearse de manera automática al deslizar (snap points), ofreciendo una experiencia móvil premium e intuitiva."
    elif "pixel" in folder_name.lower() or "draw" in folder_name.lower():
      description = "Creador de Pixel Art interactivo con cuadrícula personalizable, paleta de colores y borrador."
      prompt = "Diseña una aplicación web interactiva para crear Pixel Art. Incluye una cuadrícula personalizable (grid), una paleta de colores interactiva, una herramienta de borrador y una opción para limpiar el lienzo."
    elif "quote" in folder_name.lower() or "cita" in folder_name.lower():
      description = "Generador de citas célebres aleatorias con opción para copiar y cambiar de tema."
      prompt = "Crea un generador de citas célebres interactivo. Conéctalo a una fuente estática de citas para mostrar frases de forma aleatoria con un diseño limpio y moderno, incluyendo la opción de copiar la cita al portapapeles."
    elif "tarjeta" in folder_name.lower() or "card" in folder_name.lower() or "presentaci" in folder_name.lower():
      description = "Tarjeta de presentación digital o de perfil con enlaces interactivos a redes sociales y animaciones hover."
      prompt = "Diseña una tarjeta de presentación digital interactiva (Profile Card) con un diseño premium y efectos hover modernos, enlaces a redes sociales y una transición de revelado suave al interactuar."
    elif "clock" in folder_name.lower() or "time" in folder_name.lower() or "temporizador" in folder_name.lower() or "reloj" in folder_name.lower():
      description = "Reloj o temporizador interactivo con visualización dinámica del tiempo y animaciones fluidas."
      prompt = "Crea un componente de reloj o temporizador digital/analógico funcional. Incluye animaciones fluidas para el paso del tiempo, controles de inicio/pausa/reinicio si es necesario y un diseño moderno estilo glassmorphism."
    elif "form" in folder_name.lower() or "formulario" in folder_name.lower():
      description = "Formulario interactivo y estilizado con validación dinámica y estados interactivos."
      prompt = "Diseña un formulario web moderno y estilizado. Incluye campos interactivos con validación dinámica, estados de enfoque (focus) estilizados, etiquetas animadas y micro-animaciones en el botón de envío."
    elif "quiz" in folder_name.lower() or "test" in folder_name.lower() or "cuestionario" in folder_name.lower():
      description = "Cuestionario o test interactivo con retroalimentación instantánea de respuestas."
      prompt = "Crea una aplicación de cuestionario (Quiz) interactiva. Permite seleccionar respuestas, avanzar entre preguntas de forma fluida y muestra un resumen de puntuación o resultados al finalizar."
    elif "loader" in folder_name.lower() or "loading" in folder_name.lower() or "cargando" in folder_name.lower() or "preloader" in folder_name.lower():
      description = "Indicador de carga o preloader animado con efectos visuales modernos y creativos."
      prompt = "Diseña una animación de carga (Loader/Spinner) creativa utilizando HTML y CSS. Agrega efectos de rotación, escala o deformación fluida para mantener al usuario interesado durante los tiempos de espera."
    elif "grid" in folder_name.lower() or "gallery" in folder_name.lower() or "galeria" in folder_name.lower():
      description = "Galería de imágenes o cuadrícula responsiva con efectos de zoom, revelado y filtrado."
      prompt = "Crea una galería de imágenes interactiva utilizando CSS Grid o Flexbox. Agrega transiciones suaves al hacer hover sobre las imágenes, efectos de zoom, etiquetas flotantes y un visor modal interactivo al hacer clic."
    elif "signature" in folder_name.lower() or "firma" in folder_name.lower():
      description = "Generador interactivo de firmas de correo electrónico profesionales con campos editables."
      prompt = "Crea un generador de firmas de correo electrónico interactivo. Permite al usuario rellenar sus datos (nombre, cargo, redes sociales) y previsualizar y copiar la firma generada en formato HTML enriquecido."
    elif "progress" in folder_name.lower() or "progreso" in folder_name.lower():
      description = "Barra de progreso interactiva con animaciones dinámicas basadas en eventos o porcentaje."
      prompt = "Implementa un indicador o barra de progreso web con animaciones fluidas. Permite actualizar dinámicamente el porcentaje completado y estiliza la barra con degradados de color y destellos visuales."
    elif "button" in folder_name.lower() or "boton" in folder_name.lower() or "switcher" in folder_name.lower():
      description = "Botón o interruptor interactivo con efectos visuales avanzados de estado hover y active."
      prompt = "Diseña un botón o interruptor (toggle/switcher) altamente interactivo utilizando HTML y CSS. Añade efectos de brillo en hover, sombras dinámicas de clic y micro-animaciones fluidas para destacar la acción."
    
    return description, prompt


def scan_components(base_dir):
    components = []
    src_parent_paths = set()
    
    # First pass: find all 'src/index.html' paths
    for root, dirs, files in os.walk(base_dir):
        if any(x in root for x in ["node_modules", ".git", ".gemini"]):
            continue
        if "src" in dirs:
            src_path = os.path.join(root, "src")
            if "index.html" in os.listdir(src_path):
                src_parent_paths.add(os.path.abspath(root))
                
    # Second pass: find all index.html files and decide which ones are components
    for root, dirs, files in os.walk(base_dir):
        if any(x in root for x in ["node_modules", ".git", ".gemini"]):
            continue
            
        if "index.html" in files:
            abs_root = os.path.abspath(root)
            is_src = os.path.basename(root) == "src"
            is_dist = os.path.basename(root) == "dist"
            
            parent_dir = os.path.dirname(root)
            
            # If it's a dist folder and parent has a src index.html, skip it
            if is_dist and os.path.abspath(parent_dir) in src_parent_paths:
                continue
                
            comp_root_dir = parent_dir if (is_src or is_dist) else root
            comp_id = os.path.relpath(comp_root_dir, base_dir).replace("\\", "/").replace("/", "-")
            
            # Skip duplicates
            if any(c["id"] == comp_id for c in components):
                continue
                
            folder_name = os.path.basename(comp_root_dir)
            relative_path = os.path.relpath(root, base_dir)
            
            html_file = os.path.join(root, "index.html")
            
            # CSS File
            css_file = ""
            for name in ["style.css", "styles.css", "main.css"]:
                p = os.path.join(root, name)
                if os.path.exists(p):
                    css_file = p
                    break
                    
            # JS File
            js_file = ""
            for name in ["script.js", "scripts.js", "main.js", "app.js"]:
                p = os.path.join(root, name)
                if os.path.exists(p):
                    js_file = p
                    break
                    
            # Read files
            with open(html_file, "r", encoding="utf-8", errors="ignore") as f:
                html_content = f.read()
                
            css_content = ""
            if css_file:
                with open(css_file, "r", encoding="utf-8", errors="ignore") as f:
                    css_content = f.read()
                    
            js_content = ""
            if js_file:
                with open(js_file, "r", encoding="utf-8", errors="ignore") as f:
                    js_content = f.read()
                    
            # Extract and repair title from HTML title tag
            title_match = re.search(r"<title>(.*?)</title>", html_content, re.IGNORECASE)
            title = title_match.group(1).strip() if title_match else ""
            
            # Check if original title is missing or generic
            has_generic_title = False
            if not title or title.lower() in ["document", "codepen", "untitled", ""] or "a pen by" in title.lower():
                has_generic_title = True
                
            # If generic or missing, fix the original source file
            if has_generic_title:
                clean_title = clean_name(folder_name)
                new_title_tag = f"<title>{clean_title}</title>"
                updated_html = html_content
                if title_match:
                    updated_html = re.sub(r"<title>.*?</title>", new_title_tag, html_content, flags=re.IGNORECASE)
                else:
                    if "<head>" in html_content:
                        updated_html = html_content.replace("<head>", f"<head>\n    {new_title_tag}")
                    elif "<HEAD>" in html_content:
                        updated_html = html_content.replace("<HEAD>", f"<HEAD>\n    {new_title_tag}")
                    else:
                        updated_html = f"{new_title_tag}\n{html_content}"
                
                try:
                    with open(html_file, "w", encoding="utf-8") as f:
                        f.write(updated_html)
                    html_content = updated_html
                    title = clean_title
                    print(f"Fixed title in source file: {html_file} -> {clean_title}")
                except Exception as e:
                    print(f"Could not fix title in {html_file}: {e}")
                    title = clean_title if clean_title else "Component"
            else:
                title = re.sub(r'\s+', ' ', title)

            # Determine tags
            tags = []
            
            # Tech tags
            if "cdn.jsdelivr.net/npm/preline" in html_content or "preline.min.js" in html_content:
                tags.append("Preline")
            if "tailwindcss" in html_content or "cdn.tailwindcss.com" in html_content or any(x in html_content for x in ["bg-slate-", "backdrop-blur", "focus:ring-"]):
                tags.append("Tailwind")
            else:
                tags.append("Vanilla CSS")
                
            if "gsap" in html_content or "gsap" in js_content or "ScrollTrigger" in js_content:
                tags.append("GSAP")
            if "font-awesome" in html_content or "fa-" in html_content:
                tags.append("FontAwesome")
            if "three.js" in html_content or "three.min.js" in html_content:
                tags.append("Three.js")
            
            # Feature tags
            if "<canvas" in html_content:
                tags.append("Canvas")
            if "<svg" in html_content:
                tags.append("SVG")
            if "click" in folder_name or "interactive" in folder_name or "hover" in folder_name or "active" in js_content:
                tags.append("Interactivo")
            if "game" in folder_name or "hangman" in folder_name or "pixel" in folder_name:
                tags.append("Juego")
            if "landing" in folder_name or "landing-page" in folder_name:
                tags.append("Landing Page")
            if "ui" in folder_name or "ticket" in folder_name or "button" in folder_name or "menu" in folder_name or "slider" in folder_name or "card" in folder_name or "scroller" in folder_name:
                tags.append("UI Component")
            if "localstorage" in js_content.lower() or "localstorage" in html_content.lower():
                tags.append("LocalStorage")
            if "random" in folder_name.lower() or "aleatorio" in folder_name.lower() or "quote" in folder_name.lower():
                tags.append("Generador")
            
            # Generate custom description and prompt
            desc, prompt = generate_prompt_and_description(folder_name, html_content, css_content, js_content)
            
            components.append({
                "id": comp_id,
                "title": title,
                "folder": folder_name,
                "relativePath": relative_path.replace("\\", "/"),
                "description": desc,
                "tags": list(set(tags)), # deduplicate
                "prompt": prompt,
                "html": html_content,
                "css": css_content,
                "js": js_content
            })
            print(f"Scanned component: {title} ({comp_id})")
            
    return components

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Scanning directory: {base_dir}")
    components = scan_components(base_dir)
    
    # Save output
    output_file = os.path.join(base_dir, "components-data.js")
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("// AUTOGENERATED FILE - DO NOT EDIT DIRECTLY\n")
        f.write("window.COMPONENTS = ")
        json.dump(components, f, indent=2, ensure_ascii=False)
        f.write(";\n")
        
    print(f"\nScan complete! Saved {len(components)} components to {output_file}")
