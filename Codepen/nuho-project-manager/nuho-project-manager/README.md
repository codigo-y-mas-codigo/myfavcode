# Gestor de Proyecto - Nutrición Holística Nuho

## Descripción

Esta aplicación web te permite gestionar y hacer seguimiento de todas las tareas relacionadas con tu proyecto "Nutrición Holística Nuho". La aplicación incluye funcionalidades completas para agregar, editar, eliminar y organizar tareas, con persistencia de datos local y capacidades de exportación e importación.

## Características Principales

### 📊 Dashboard de Estadísticas
- **Total de Tareas**: Contador de todas las tareas en el proyecto
- **Completadas**: Número de tareas finalizadas
- **Pendientes**: Tareas que aún están por hacer
- **Progreso**: Porcentaje de avance del proyecto

### ✅ Gestión de Tareas
- **Agregar Tareas**: Formulario completo con título, descripción, categoría, prioridad y fecha
- **Editar Tareas**: Modificar cualquier aspecto de una tarea existente
- **Eliminar Tareas**: Remover tareas que ya no son necesarias
- **Marcar como Completadas**: Sistema de checkbox para cambiar el estado de las tareas

### 🏷️ Categorización y Filtros
- **Categorías Disponibles**:
  - Investigación
  - Contenido
  - Marketing
  - Desarrollo
  - Productos Adicionales
  - Integración IA
  - Otros

- **Niveles de Prioridad**:
  - Baja (verde)
  - Media (naranja)
  - Alta (rojo)
  - Urgente (morado)

- **Filtros**: Por categoría y estado (pendientes/completadas)

### 📅 Línea de Tiempo
- Visualización cronológica de todas las tareas
- Agrupación por fechas
- Indicadores visuales de progreso por día

### 💾 Persistencia y Exportación
- **LocalStorage**: Todos los datos se guardan automáticamente en tu navegador
- **Exportar**: Descarga un archivo JSON con todos tus datos
- **Importar**: Carga datos desde un archivo JSON previamente exportado

## Datos Precargados

La aplicación viene con las siguientes tareas ya configuradas basadas en el trabajo realizado:

### Tareas Completadas (13 de agosto - 14 de agosto, 2024)
1. **Solicitud inicial del proyecto** - Investigación
2. **Análisis de sentimiento en foros de pacientes** - Investigación
3. **Mapeo de influencers mexicanos de salud** - Marketing
4. **Investigación científica de ingredientes de la milpa** - Investigación
5. **Creación de Lead Magnets culturalmente adaptados** - Contenido
6. **Ideas de contenido para redes sociales** - Marketing
7. **Propuesta de actualización del contenido del curso** - Desarrollo
8. **Estrategia de marketing y campaña de promoción** - Marketing
9. **Propuesta de productos adicionales de alto valor** - Productos Adicionales
10. **Estrategias de integración de IA para el aprendizaje** - Integración IA

### Tareas Pendientes (Próximas fechas)
1. **Crear calendario editorial para redes sociales** - 18/8/2024
2. **Diseño gráfico de los Lead Magnets** - 20/8/2024
3. **Contactar influencers para colaboraciones** - 22/8/2024
4. **Implementar mejoras en el contenido del curso** - 25/8/2024
5. **Crear nuevos módulos del curso** - 1/9/2024
6. **Desarrollar el primer taller intensivo** - 5/9/2024
7. **Lanzar campaña de pre-lanzamiento** - 10/9/2024
8. **Implementar asistente de IA básico** - 15/9/2024

## Cómo Usar la Aplicación

### Agregar una Nueva Tarea
1. Completa el formulario "Agregar Nueva Tarea" en el lado izquierdo
2. Ingresa el título (obligatorio)
3. Agrega una descripción detallada
4. Selecciona la categoría apropiada
5. Establece el nivel de prioridad
6. Define una fecha objetivo
7. Haz clic en "Agregar Tarea"

### Gestionar Tareas Existentes
- **Marcar como completada**: Haz clic en el checkbox junto a la tarea
- **Editar**: Haz clic en el ícono de lápiz para abrir el modal de edición
- **Eliminar**: Haz clic en el ícono de papelera (se pedirá confirmación)

### Filtrar Tareas
- Usa los selectores en la parte superior de la lista de tareas
- Filtra por categoría o por estado (pendientes/completadas)
- Los filtros se pueden combinar

### Exportar/Importar Datos
- **Exportar**: Haz clic en "Exportar Datos" para descargar un archivo JSON
- **Importar**: Haz clic en "Importar Datos" y selecciona un archivo JSON válido

## Instalación y Uso

### Opción 1: Uso Local
1. Descarga todos los archivos (`index.html`, `script.js`, `styles.css`)
2. Colócalos en la misma carpeta
3. Abre `index.html` en tu navegador web
4. ¡Listo para usar!

### Opción 2: Servidor Web Local
Si prefieres usar un servidor web local:
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes npx instalado)
npx serve .
```

## Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Responsive design para desktop, tablet y móvil
- **Almacenamiento**: LocalStorage (compatible con todos los navegadores modernos)

## Seguridad y Privacidad

- Todos los datos se almacenan localmente en tu navegador
- No se envía información a servidores externos
- Los datos persisten hasta que limpies el almacenamiento del navegador
- Recomendación: Exporta tus datos regularmente como respaldo

## Solución de Problemas

### Los datos no se guardan
- Verifica que tu navegador tenga habilitado LocalStorage
- Asegúrate de no estar en modo incógnito/privado

### La aplicación no carga
- Verifica que todos los archivos estén en la misma carpeta
- Comprueba la consola del navegador para errores (F12)

### Problemas de importación
- Asegúrate de que el archivo JSON tenga el formato correcto
- Verifica que el archivo no esté corrupto

## Personalización

Puedes personalizar la aplicación modificando:
- **Colores**: Edita las variables CSS en `styles.css`
- **Categorías**: Modifica las opciones en `script.js` y `index.html`
- **Campos**: Agrega nuevos campos editando el formulario

## Respaldo de Datos

**Importante**: Aunque los datos se guardan automáticamente, se recomienda:
1. Exportar los datos regularmente
2. Guardar los archivos JSON en un lugar seguro
3. Considerar usar un servicio de almacenamiento en la nube para los respaldos

---

¡Disfruta gestionando tu proyecto "Nutrición Holística Nuho" de manera eficiente y organizada!

