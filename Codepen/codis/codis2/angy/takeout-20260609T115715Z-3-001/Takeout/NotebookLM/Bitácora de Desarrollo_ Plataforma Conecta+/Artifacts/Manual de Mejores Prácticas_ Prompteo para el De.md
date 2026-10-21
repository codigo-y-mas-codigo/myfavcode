### Manual de Mejores Prácticas: Prompteo para el Desarrollo del Ecosistema Conecta+
#### 1. Definición del Contexto y Propósito del Proyecto
El ecosistema  **Conecta+**  se conceptualiza como una solución SaaS (Software as a Service) integral y  *multi-tenant*  para la administración de condominios. El propósito principal es unificar la comunicación, la gestión financiera y la seguridad en una plataforma escalable.
Desde la perspectiva de arquitectura, el uso de prototipos de alta fidelidad (Hi-Fi) mediante  **Vanilla JavaScript y Tailwind CSS**  es estratégico. Esta decisión técnica evita la "alucinación" de la IA con árboles de dependencias complejos de frameworks (como React o Vue) en etapas tempranas, permitiendo validar flujos antes del desarrollo backend.
**Objetivos Estratégicos:**
*   **Validación de Flujos Críticos:**  Simular la experiencia final para administradores y residentes antes de la inversión en infraestructura  *full-stack* .
*   **Blueprint de Ingeniería:**  Generar lógica desacoplada y limpia que garantice la  **portabilidad del código** , facilitando una migración futura a frameworks modernos sin reescribir la lógica de negocio.
*   **Sincronización de Artefactos:**  Mantener coherencia visual y funcional entre:
    *   **Landing Page:**  Captación de leads mediante autoridad técnica.
    *   **App Residente:**  Enfoque en transparencia y conveniencia.
    *   **App Administrador:**  Enfoque en gestión proactiva y eficiencia operativa.
#### 2. Arquitectura Técnica: Estabilidad desde el Prompt Inicial
La estabilidad del prototipo reside en una arquitectura de  **Single Page Application (SPA) simulada** . El contenido se inyecta dinámicamente mediante un  *router*  personalizado que gestiona plantillas literales ( *template literals* ).
Un aprendizaje crítico extraído del desarrollo fue la transición obligatoria hacia el patrón de  **Delegación de Eventos** . Al promptear, se debe incluir una  **"Restricción de Interfaz sin Estado" (Stateless UI Constraint)**  para evitar que los elementos pierdan interactividad tras el renderizado dinámico.
**Práctica de Prompteo Recomendada:**
*"Asegura que toda la interactividad se maneje mediante delegación de eventos en un contenedor padre estático para prevenir la pérdida de listeners durante la inyección dinámica del DOM."*
##### Comparativa: Evolución de la Interactividad
| Característica | Antes (Individual Listeners) | Después (Delegación de Eventos) |
| ------ | ------ | ------ |
| **Implementación** | Listeners asignados post-renderizado (frágil). | Un único listener en el contenedor raíz del app. |
| **Escalabilidad** | Baja. Requiere re-adjuntar código en cada vista. | Alta. Los nuevos elementos heredan funcionalidad. |
| **Errores Comunes** | ReferenceError: tabButtons is not defined. | Navegación robusta y persistente. |
| **Performance** | Mayor consumo de memoria por múltiples listeners. | Consumo optimizado y código centralizado. |

#### 3. Segmentación por Módulos de Usuario: Residente vs. Administrador
El prompteo técnico debe diferenciar la lógica de negocio basándose en la dicotomía "Transparencia vs. Control".
**Módulo del Residente: Transparencia y Conveniencia**
*   **Flujos de Pago:**  Implementación de  **OXXO Pay**  (códigos de barras) y  **SPEI**  (botones de copiar CLABE/Referencia y carga de comprobantes).
*   **Vida Comunitaria:**  Votaciones en línea con visualización de resultados y acceso al blog comunitario.
*   **Accesos:**  Generación inmediata de QR para visitas.
**Módulo del Administrador: Gestión Proactiva y Eficiencia**
*   **Dashboard de KPIs:**  Visualización de salud financiera (Ingresos, Gastos, Morosidad).
*   **Seguimiento de Lectura (Reading Tracking):**  Funcionalidad crítica para el blog y reglamentos, permitiendo identificar quién ha leído la información y quién está pendiente.
*   **Vecinómetro:**  Sistema de alerta visual (Verde/Amarillo/Rojo) basado en una lógica de deuda de 3 meses para priorizar la cobranza.
*   **Gestión de Reservas:**  Capacidad de enviar recordatorios automáticos de responsabilidades al condómino que reserva.
#### 4. Implementación de Realismo mediante Granular Object Schemas
Para que la validación técnica sea efectiva, el prompteo debe exigir  **Esquemas de Objetos Granulares**  en la generación de  *mock data* . No basta con datos genéricos; se requiere precisión semántica.
**Componentes Dinámicos Basados en Schemas:**
1.  **Expedientes 360°:**  Objetos JSON que incluyan placas de vehículos, estatus de mascotas, salarios de personal y contactos de emergencia.
2.  **Calendario de Reservaciones:**  Lógica dinámica para evitar  *Race Conditions* , asegurando que el componente se dibuje antes de intentar manipular sus nodos.
3.  **Vecinómetro Financiero:**  Datos simulados que crucen el historial de pagos con el estatus de la huella digital y el uso de amenidades.
#### 5. Protocolo de Corrección de Errores y Feedback Loops
El desarrollo con IA suele presentar errores de sincronización o de referencia. El proceso de depuración debe ser sistemático.
##### Protocolo de 4 Pasos para Robustez del Código
1.  **Identificación en Consola:**  Detectar fallos como ReferenceError o colapsos en la inyección de plantillas.
2.  **Análisis de Estructura:**  Verificar la jerarquía de screenContents y la visibilidad de variables globales.
3.  **Resolución de Sincronización:**  Evaluar el uso de setTimeout frente a MutationObserver para asegurar que el DOM esté listo antes de ejecutar funciones dependientes (como el calendario).
4.  **Refinamiento del Prompt:**   **Paso Crítico.**  No solo corregir el código, sino actualizar el  *System Prompt*  para que la IA aprenda la restricción técnica (ej.  *"No uses selectores directos de botones en vistas dinámicas; usa event.target.closest"* ).
#### 6. Estrategias de Marketing y Documentación Centralizada
Un ecosistema SaaS profesional requiere una infraestructura de soporte y ventas alineada con la jerarquía técnica.
**Marketing y Lead Magnet:**  La pieza central de captación es  **"La Guía Definitiva para Reducir la Morosidad un 40%"** . Este título ataca el dolor principal del  **Ideal Customer Profile (ICP)** : administradores profesionales que gestionan entre 50 y 500 unidades.
*   **Canal LinkedIn:**  Enfoque B2B profesional y casos de estudio.
*   **Canal Facebook/IG:**  Enfoque B2C para comités de vigilancia y vida comunitaria.
**Jerarquía de Documentación Técnica:**  El sitio de documentación (ej. inspirado en DocuMac360) debe estructurarse como la "Biblia del Proyecto":
*   **Guía de Producto:**  Visión SaaS y diferenciadores de mercado.
*   **Diccionario de Vistas:**  Desglose técnico de cada pantalla y sus componentes Tailwind.
*   **Roadmap de Marketing:**  Definición del ICP y pilares de redes sociales.
*   **Guía Técnica:**  Documentación del router SPA y el sistema de Dark Mode.
#### 7. Conclusión y Mejores Prácticas de Prompteo Técnico
El éxito de Conecta+ radica en tratar el prompteo no como una charla, sino como una especificación de ingeniería de software.
**Reglas de Oro del Arquitecto para Prompteo SaaS:**
1.  **Definición de Stack Explícita:**  Declarar Vanilla JS y Tailwind CSS para maximizar la compatibilidad y minimizar errores de frameworks.
2.  **Separación de Intereses:**  Exigir la división clara entre Templates (HTML) y Lógica de Navegación (JS).
3.  **Modularidad de Funciones:**  Promptear funciones puras y reutilizables para facilitar la futura migración a entornos productivos.
4.  **Restricción de Delegación:**  Establecer la delegación de eventos como el estándar obligatorio para toda la interactividad dinámica.
5.  **Validación Incremental:**  Implementar y probar un módulo a la vez antes de añadir complejidad visual o lógica adicional.
