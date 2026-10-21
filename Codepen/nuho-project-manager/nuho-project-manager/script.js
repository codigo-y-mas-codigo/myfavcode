// Gestor de Proyecto - Nutrición Holística Nuho
// JavaScript para manejo de tareas con localStorage

class ProjectManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentEditId = null;
        this.initializeApp();
        this.loadInitialTasks();
    }

    initializeApp() {
        this.bindEvents();
        this.updateStats();
        this.renderTasks();
        this.renderTimeline();
    }

    bindEvents() {
        // Formulario de nueva tarea
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Formulario de edición
        document.getElementById('editTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateTask();
        });

        // Botones de exportar e importar
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => this.importData(e));

        // Filtros
        document.getElementById('filterCategory').addEventListener('change', () => this.renderTasks());
        document.getElementById('filterStatus').addEventListener('change', () => this.renderTasks());

        // Modal
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelEdit').addEventListener('click', () => this.closeModal());
        
        // Cerrar modal al hacer clic fuera
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('editModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    loadInitialTasks() {
        // Si no hay tareas, cargar las tareas iniciales del proyecto
        if (this.tasks.length === 0) {
            const initialTasks = [
                {
                    id: Date.now() + 1,
                    title: "Solicitud inicial del proyecto",
                    description: "Análisis de necesidades y definición del alcance del proyecto Nutrición Holística Nuho",
                    category: "investigacion",
                    priority: "alta",
                    date: "2024-08-13",
                    status: "completada",
                    createdAt: new Date("2024-08-13").toISOString(),
                    completedAt: new Date("2024-08-13").toISOString()
                },
                {
                    id: Date.now() + 2,
                    title: "Análisis de sentimiento en foros de pacientes",
                    description: "Investigación de preguntas y frustraciones de pacientes con hipotiroidismo y diabetes en Doctoralia",
                    category: "investigacion",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                {
                    id: Date.now() + 3,
                    title: "Mapeo de influencers mexicanos de salud",
                    description: "Identificación y análisis de los principales influencers de salud en México",
                    category: "marketing",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                {
                    id: Date.now() + 4,
                    title: "Investigación científica de ingredientes de la milpa",
                    description: "Validación científica de los beneficios del nopal, amaranto y quelites",
                    category: "investigacion",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                {
                    id: Date.now() + 5,
                    title: "Creación de Lead Magnets culturalmente adaptados",
                    description: "Desarrollo de 3 lead magnets: Desayunos con nopal, Menú de Oaxaca, Superalimentos de Sonora",
                    category: "contenido",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                {
                    id: Date.now() + 6,
                    title: "Ideas de contenido para redes sociales",
                    description: "Desarrollo de estrategias de contenido para Instagram, Facebook y TikTok",
                    category: "marketing",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                {
                    id: Date.now() + 7,
                    title: "Propuesta de actualización del contenido del curso",
                    description: "Refinamiento de módulos existentes y propuesta de nuevos módulos",
                    category: "desarrollo",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                {
                    id: Date.now() + 8,
                    title: "Estrategia de marketing y campaña de promoción",
                    description: "Desarrollo de estrategia integral de marketing para Hotmart",
                    category: "marketing",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                {
                    id: Date.now() + 9,
                    title: "Propuesta de productos adicionales de alto valor",
                    description: "Desarrollo de ideas para talleres, programas de acompañamiento y recetarios premium",
                    category: "productos",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                {
                    id: Date.now() + 10,
                    title: "Estrategias de integración de IA para el aprendizaje",
                    description: "Propuestas para integrar IA como herramienta complementaria en el curso",
                    category: "ia",
                    priority: "alta",
                    date: "2024-08-14",
                    status: "completada",
                    createdAt: new Date("2024-08-14").toISOString(),
                    completedAt: new Date("2024-08-14").toISOString()
                },
                // Tareas pendientes
                {
                    id: Date.now() + 11,
                    title: "Diseño gráfico de los Lead Magnets",
                    description: "Crear el diseño visual profesional para los 3 lead magnets desarrollados",
                    category: "contenido",
                    priority: "alta",
                    date: "2024-08-20",
                    status: "pendiente",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 12,
                    title: "Implementar mejoras en el contenido del curso",
                    description: "Aplicar las actualizaciones y expansiones propuestas en los módulos existentes",
                    category: "desarrollo",
                    priority: "alta",
                    date: "2024-08-25",
                    status: "pendiente",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 13,
                    title: "Crear nuevos módulos del curso",
                    description: "Desarrollar los módulos adicionales sugeridos: Suplementación, Cocina Medicinal, Apoyo Emocional",
                    category: "desarrollo",
                    priority: "media",
                    date: "2024-09-01",
                    status: "pendiente",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 14,
                    title: "Contactar influencers para colaboraciones",
                    description: "Iniciar conversaciones con los influencers identificados para posibles alianzas",
                    category: "marketing",
                    priority: "media",
                    date: "2024-08-22",
                    status: "pendiente",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 15,
                    title: "Desarrollar el primer taller intensivo",
                    description: "Crear el contenido para el taller 'Cocina Medicinal Mexicana: De la Milpa a tu Mesa'",
                    category: "productos",
                    priority: "media",
                    date: "2024-09-05",
                    status: "pendiente",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 16,
                    title: "Implementar asistente de IA básico",
                    description: "Desarrollar un chatbot simple entrenado con el contenido del curso",
                    category: "ia",
                    priority: "baja",
                    date: "2024-09-15",
                    status: "pendiente",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 17,
                    title: "Crear calendario editorial para redes sociales",
                    description: "Organizar las ideas de contenido en un calendario de publicaciones mensual",
                    category: "marketing",
                    priority: "media",
                    date: "2024-08-18",
                    status: "pendiente",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 18,
                    title: "Lanzar campaña de pre-lanzamiento",
                    description: "Ejecutar la estrategia de pre-lanzamiento con webinar gratuito y promoción de lead magnets",
                    category: "marketing",
                    priority: "alta",
                    date: "2024-09-10",
                    status: "pendiente",
                    createdAt: new Date().toISOString()
                }
            ];

            this.tasks = initialTasks;
            this.saveTasks();
        }
    }

    loadTasks() {
        const saved = localStorage.getItem('nuho-project-tasks');
        return saved ? JSON.parse(saved) : [];
    }

    saveTasks() {
        localStorage.setItem('nuho-project-tasks', JSON.stringify(this.tasks));
    }

    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const category = document.getElementById('taskCategory').value;
        const priority = document.getElementById('taskPriority').value;
        const date = document.getElementById('taskDate').value;

        if (!title) return;

        const task = {
            id: Date.now(),
            title,
            description,
            category,
            priority,
            date,
            status: 'pendiente',
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.push(task);
        this.saveTasks();
        this.updateStats();
        this.renderTasks();
        this.renderTimeline();
        
        // Limpiar formulario
        document.getElementById('taskForm').reset();
    }

    toggleTaskStatus(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = task.status === 'pendiente' ? 'completada' : 'pendiente';
            task.completedAt = task.status === 'completada' ? new Date().toISOString() : null;
            this.saveTasks();
            this.updateStats();
            this.renderTasks();
            this.renderTimeline();
        }
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.currentEditId = id;
            document.getElementById('editTaskTitle').value = task.title;
            document.getElementById('editTaskDescription').value = task.description;
            document.getElementById('editTaskCategory').value = task.category;
            document.getElementById('editTaskPriority').value = task.priority;
            document.getElementById('editTaskDate').value = task.date;
            document.getElementById('editModal').style.display = 'block';
        }
    }

    updateTask() {
        if (!this.currentEditId) return;

        const task = this.tasks.find(t => t.id === this.currentEditId);
        if (task) {
            task.title = document.getElementById('editTaskTitle').value.trim();
            task.description = document.getElementById('editTaskDescription').value.trim();
            task.category = document.getElementById('editTaskCategory').value;
            task.priority = document.getElementById('editTaskPriority').value;
            task.date = document.getElementById('editTaskDate').value;
            
            this.saveTasks();
            this.updateStats();
            this.renderTasks();
            this.renderTimeline();
            this.closeModal();
        }
    }

    deleteTask(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.updateStats();
            this.renderTasks();
            this.renderTimeline();
        }
    }

    closeModal() {
        document.getElementById('editModal').style.display = 'none';
        this.currentEditId = null;
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.status === 'completada').length;
        const pending = total - completed;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('progressPercentage').textContent = `${percentage}%`;
    }

    renderTasks() {
        const categoryFilter = document.getElementById('filterCategory').value;
        const statusFilter = document.getElementById('filterStatus').value;
        
        let filteredTasks = this.tasks;
        
        if (categoryFilter) {
            filteredTasks = filteredTasks.filter(t => t.category === categoryFilter);
        }
        
        if (statusFilter) {
            filteredTasks = filteredTasks.filter(t => t.status === statusFilter);
        }

        // Ordenar por fecha y prioridad
        filteredTasks.sort((a, b) => {
            const priorityOrder = { 'urgente': 4, 'alta': 3, 'media': 2, 'baja': 1 };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0) return priorityDiff;
            return new Date(a.date) - new Date(b.date);
        });

        const tasksList = document.getElementById('tasksList');
        tasksList.innerHTML = '';

        filteredTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            tasksList.appendChild(taskElement);
        });
    }

    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = `task-item ${task.status} priority-${task.priority}`;
        
        const formattedDate = task.date ? new Date(task.date).toLocaleDateString('es-ES') : 'Sin fecha';
        const categoryLabels = {
            'investigacion': 'Investigación',
            'contenido': 'Contenido',
            'marketing': 'Marketing',
            'desarrollo': 'Desarrollo',
            'productos': 'Productos Adicionales',
            'ia': 'Integración IA',
            'otros': 'Otros'
        };

        div.innerHTML = `
            <div class="task-header">
                <div class="task-checkbox">
                    <input type="checkbox" ${task.status === 'completada' ? 'checked' : ''} 
                           onchange="projectManager.toggleTaskStatus(${task.id})">
                </div>
                <div class="task-info">
                    <h3 class="task-title">${task.title}</h3>
                    <p class="task-description">${task.description}</p>
                </div>
                <div class="task-meta">
                    <span class="task-category">${categoryLabels[task.category]}</span>
                    <span class="task-priority priority-${task.priority}">${task.priority.toUpperCase()}</span>
                    <span class="task-date">${formattedDate}</span>
                </div>
                <div class="task-actions">
                    <button onclick="projectManager.editTask(${task.id})" class="btn-icon" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="projectManager.deleteTask(${task.id})" class="btn-icon btn-danger" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        return div;
    }

    renderTimeline() {
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = '';

        // Agrupar tareas por fecha
        const tasksByDate = {};
        this.tasks.forEach(task => {
            const date = task.date || 'sin-fecha';
            if (!tasksByDate[date]) {
                tasksByDate[date] = [];
            }
            tasksByDate[date].push(task);
        });

        // Ordenar fechas
        const sortedDates = Object.keys(tasksByDate).sort((a, b) => {
            if (a === 'sin-fecha') return 1;
            if (b === 'sin-fecha') return -1;
            return new Date(a) - new Date(b);
        });

        sortedDates.forEach(date => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            const formattedDate = date === 'sin-fecha' ? 'Sin fecha' : new Date(date).toLocaleDateString('es-ES');
            const tasks = tasksByDate[date];
            const completedCount = tasks.filter(t => t.status === 'completada').length;
            
            timelineItem.innerHTML = `
                <div class="timeline-date">${formattedDate}</div>
                <div class="timeline-content">
                    <div class="timeline-summary">${completedCount}/${tasks.length} tareas completadas</div>
                    <div class="timeline-tasks">
                        ${tasks.map(task => `
                            <div class="timeline-task ${task.status}">
                                <i class="fas ${task.status === 'completada' ? 'fa-check-circle' : 'fa-circle'}"></i>
                                ${task.title}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            timeline.appendChild(timelineItem);
        });
    }

    exportData() {
        const data = {
            tasks: this.tasks,
            exportDate: new Date().toISOString(),
            projectName: 'Nutrición Holística Nuho'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nuho-project-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.tasks && Array.isArray(data.tasks)) {
                    if (confirm('¿Estás seguro de que quieres importar estos datos? Esto reemplazará todas las tareas actuales.')) {
                        this.tasks = data.tasks;
                        this.saveTasks();
                        this.updateStats();
                        this.renderTasks();
                        this.renderTimeline();
                        alert('Datos importados exitosamente');
                    }
                } else {
                    alert('Formato de archivo inválido');
                }
            } catch (error) {
                alert('Error al leer el archivo: ' + error.message);
            }
        };
        reader.readAsText(file);
        
        // Limpiar el input
        event.target.value = '';
    }
}

// Inicializar la aplicación cuando se carga la página
let projectManager;
document.addEventListener('DOMContentLoaded', () => {
    projectManager = new ProjectManager();
});

