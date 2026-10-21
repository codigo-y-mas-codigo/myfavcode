
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

const initialChecklistData = [
    {
        title: "Fundamentos (Prompt #1)",
        icon: "🔹",
        prompt: "Crea un checklist de tareas diarias y semanales para alguien que quiere mejorar sus fundamentos de oratoria. Incluye 5 tareas accionables. Para cada tarea, proporciona un ejemplo claro y conciso de cómo ejecutarla. Enfócate en la respiración, postura, variación de tono, pausas y estructura del discurso (ethos, pathos, logos).",
        items: [
            { id: 'f1', text: "5 min de respiración diafragmática diaria", time: 300, example: "Inhala profundo por la nariz (4s), siente cómo tu abdomen se expande. Exhala lentamente por la boca (6s). Concéntrate solo en tu respiración.", theory: "La respiración diafragmática es la base del control vocal. Utiliza el diafragma para llenar los pulmones a su máxima capacidad, lo que te da más aire para proyectar la voz sin forzar la garganta, y además calma el sistema nervioso. Para mejores resultados, practica en silencio y enfócate en que el movimiento venga del abdomen, no del pecho." },
            { id: 'f2', text: "Ejercicio de postura de poder (2 min)", time: 120, example: "De pie, con las piernas separadas, manos en las caderas y barbilla alta (como Superman/Wonder Woman). Siente cómo crece tu confianza.", theory: "Esta técnica, basada en estudios de psicología social, utiliza el lenguaje corporal para influir en tu estado mental. Adoptar posturas expansivas puede aumentar los sentimientos de confianza y reducir el estrés. Hazlo antes de un ensayo o presentación para sentirte más seguro y con derecho a ocupar tu espacio." },
            { id: 'f3', text: "1 grabación con variación de tono (neutral, inspirador, persuasivo)", example: "Graba 'Hoy es un gran día'. Dilo primero de forma monótona, luego con entusiasmo y finalmente con tono de misterio.", theory: "La monotonía vocal es el mayor enemigo del engagement. Variar el tono (la 'melodía' de tu voz) ayuda a transmitir emociones y a mantener a la audiencia interesada. Al practicar, exagera los tonos. Escuchar las grabaciones te ayudará a ser más consciente de tu rango vocal y a usarlo de forma natural." },
            { id: 'f4', text: "Pausas conscientes de 3 seg en frases clave", example: "Di: 'La clave del éxito... (pausa 3s) ...es la constancia'. Siente el impacto de la pausa.", theory: "Las pausas son el punto y la coma del lenguaje hablado. Crean suspense, dan tiempo a la audiencia para procesar la información y te otorgan autoridad. No temas al silencio; una pausa bien colocada puede ser más poderosa que cualquier palabra. Úsalas antes de una idea importante o después de una pregunta retórica." },
            { id: 'f5', text: "Mini-pitch de 2 min (estructura ethos–pathos–logos)", time: 120, example: "Ethos (quién eres): 'Como diseñador...'; Pathos (emoción): '...me frustraba ver ideas geniales perdidas...'; Logos (lógica): '...por eso creé un método que aumenta la claridad un 50%.'", theory: "Esta es la estructura de persuasión de Aristóteles. Ethos establece tu credibilidad, Pathos conecta con la emoción de la audiencia, y Logos presenta la lógica de tu argumento. Usar esta secuencia es extremadamente efectivo: primero haz que confíen en ti, luego que sientan el problema, y finalmente, ofrece tu solución lógica." }
        ]
    },
    {
        title: "Ansiedad Escénica (Prompt #3)",
        icon: "🔹",
        prompt: "Diseña un checklist con 4 técnicas específicas para manejar la ansiedad escénica antes y durante una presentación. Cada técnica debe ser práctica y fácil de implementar. Incluye ejemplos para cada una, enfocándote en métodos de respiración, visualización, mantras y exposición progresiva.",
        items: [
            { id: 'a1', text: "1 sesión de respiración cuadrada (4-4-4-4)", time: 240, example: "Inhala (4s), sostén (4s), exhala (4s), sostén (4s). Repite el ciclo. Visualiza un cuadrado mientras lo haces para mantener la concentración.", theory: "Esta técnica, usada por Navy SEALs, es extremadamente efectiva para calmar el sistema nervioso en situaciones de alto estrés. Sincroniza la respiración con un conteo mental, lo que distrae a la mente ansiosa y regula el ritmo cardíaco. Es tu herramienta de emergencia número uno antes de hablar." },
            { id: 'a2', text: "Visualización de aplauso final antes de ensayar", example: "Cierra los ojos. Imagina que terminas tu discurso, la sala se pone de pie y aplaude con energía. Siente el orgullo y la satisfacción.", theory: "La mente no distingue bien entre una experiencia real y una vívidamente imaginada. Al visualizar el éxito, preparas a tu cerebro para sentir confianza y calma, creando una profecía autocumplida positiva. Usa todos tus sentidos en la visualización para hacerla más real." },
            { id: 'a3', text: "Repetir mantra personal (“Estoy aquí para compartir, no impresionar”)", example: "Antes de empezar, repite en voz baja o mentalmente: 'Aporto valor, conecto con mi audiencia'. Encuentra una frase que te dé poder.", theory: "Un mantra es una afirmación positiva que ancla tu mente y contrarresta el diálogo interno negativo. El mejor mantra cambia tu enfoque del miedo ('¿les gustaré?') al propósito ('¿cómo puedo ayudarles?'). Esto reduce la presión y te centra en el servicio a tu audiencia." },
            { id: 'a4', text: "Exposición progresiva: espejo → cámara → amigo → grupo", example: "Semana 1: Ensaya frente al espejo. Semana 2: Grábate. Semana 3: Preséntale a un amigo. Semana 4: Preséntale a un grupo pequeño.", theory: "La ansiedad se alimenta de la evitación. La exposición gradual y controlada a la situación temida desensibiliza tu respuesta de miedo. Es como entrenar un músculo: empiezas con poco peso y lo aumentas progresivamente. La clave es la consistencia y celebrar cada pequeño avance." }
        ]
    },
    {
        title: "Feedback Real (Prompt #5)",
        icon: "🔹",
        prompt: "Elabora un proceso de 4 pasos para que un orador pueda autoevaluarse y obtener feedback de manera efectiva. El checklist debe incluir grabar un discurso, usar una tabla de evaluación simple, pedir retroalimentación externa y aplicar los aprendizajes. Proporciona ejemplos concretos para cada paso.",
        items: [
            { id: 'fb1', text: "Grabar un discurso de 2–3 min", time: 180, example: "No busques la perfección. Graba un fragmento sobre un tema que domines para que el contenido fluya y puedas centrarte en la entrega.", theory: "Grabar es la herramienta de autoevaluación más honesta. Te permite verte como te ve la audiencia. Supera la incomodidad inicial; es crucial para detectar muletillas, gestos repetitivos o tics nerviosos que de otro modo pasarías por alto." },
            { id: 'fb2', text: "Evaluarlo con la tabla (claridad, emoción, ritmo, persuasión, impacto final)", example: "Puntúa del 1 al 5 cada categoría de la tabla de resumen. Sé honesto contigo mismo. ¿Tu mensaje fue claro? ¿Transmitiste emoción?", theory: "Usar un marco de evaluación estructurado te obliga a analizar tu desempeño de forma objetiva en lugar de basarte en una sensación general. Te ayuda a identificar con precisión tus fortalezas y, más importante, las áreas concretas que necesitan mejorar." },
            { id: 'fb3', text: "Pedir retroalimentación externa (amigo, colega, IA)", example: "Envía el video a un amigo de confianza y pídele que se fije en un aspecto concreto, por ejemplo: '¿Te pareció que mi energía era alta?'", theory: "Estamos ciegos a muchas de nuestras propias manías. Un punto de vista externo es invaluable. Para obtener feedback útil, haz preguntas específicas. En lugar de '¿qué te pareció?', pregunta '¿cuál fue la idea principal que te llevaste?' o '¿hubo algún momento en que perdieras el interés?'." },
            { id: 'fb4', text: "Ajustar al menos 1 aspecto débil detectado", example: "Si notaste que hablabas muy rápido, vuelve a grabar el mismo fragmento, pero esta vez haciendo pausas deliberadas entre frases.", theory: "El feedback no sirve de nada si no se actúa sobre él. Elige solo una cosa a mejorar por sesión de práctica. Este enfoque incremental es mucho más efectivo que tratar de arreglar todo a la vez. El progreso se construye a través de pequeños ajustes consistentes." }
        ]
    },
    {
        title: "Blueprint de Ensayo (Prompt #7)",
        icon: "🔹",
        prompt: "Crea un 'blueprint' de ensayo semanal detallado para un orador. Debe incluir ejercicios diarios de corta duración (vocalización, gestos, pausas) y tareas semanales más largas (ensayo completo, revisión crítica). Da ejemplos claros para cada actividad para que el usuario sepa exactamente qué hacer.",
        items: [
            { id: 'bp1', text: "Diario (5 min): Vocalizaciones", time: 300, example: "Repite 'Maaaa, meeee, miiii, moooo, muuuu' alargando las vocales para calentar tus cuerdas vocales.", theory: "Tu voz es un instrumento y necesita calentamiento. Las vocalizaciones mejoran tu dicción, resonancia y evitan que fuerces la voz. Es un ejercicio simple que marca una gran diferencia en la claridad y resistencia de tu voz a largo plazo." },
            { id: 'bp2', text: "Diario (5 min): Gestos frente al espejo", time: 300, example: "Narra una pequeña historia y observa cómo tus manos acompañan tus palabras. ¿Son gestos abiertos y naturales o están rígidos?", theory: "Tus gestos deben amplificar tu mensaje, no distraer de él. Practicar frente a un espejo te ayuda a tomar conciencia de tu lenguaje corporal. Busca gestos abiertos (palmas hacia arriba) y evita gestos cerrados (brazos cruzados) o repetitivos." },
            { id: 'bp3', text: "Diario (5 min): Ensayo de frases clave con pausas", time: 300, example: "Elige la frase más importante de tu discurso. Practícala de 5 formas distintas, variando el énfasis y la duración de la pausa previa.", theory: "No todas las partes de tu discurso tienen el mismo peso. Identifica tus 'punchlines' o ideas centrales y ensáyalas por separado. Esto asegura que, cuando llegue el momento, las entregues con el máximo impacto y convicción." },
            { id: 'bp4', text: "Semanal: Ensayo completo grabado (5–7 min)", time: 420, example: "Simula una presentación real. Ponte de pie, imagina a la audiencia y da tu charla de principio a fin sin parar, aunque te equivoques.", theory: "Este ensayo es para construir resistencia y fluidez. El objetivo es completar el discurso sin detenerte para corregir errores. Esto entrena a tu cerebro para seguir adelante y recuperarse de tropiezos, una habilidad crucial en una presentación en vivo." },
            { id: 'bp5', text: "Semanal: Revisión crítica del video", example: "Mira el video como si fueras un espectador. Anota 3 cosas que hiciste bien y 1 cosa que podrías mejorar la próxima vez.", theory: "Al revisar, enfócate primero en lo positivo. Esto refuerza los buenos hábitos. Luego, identifica solo UNA área principal de mejora. Este enfoque de 'una cosa a la vez' es la forma más rápida de progresar sin sentirse abrumado." },
            { id: 'bp6', text: "Semanal: Comparación con ensayos previos (¿mejoró el ritmo y energía?)", example: "Pon el video de esta semana al lado del de la semana pasada. Observa si tu lenguaje corporal es más seguro o si tu ritmo es más dinámico.", theory: "El progreso puede ser difícil de ver día a día. Comparar grabaciones a lo largo del tiempo te proporciona una prueba tangible de tu mejora. Esto es un gran motivador y te ayuda a ver que el esfuerzo está dando sus frutos." }
        ]
    },
];


const summaryAreas = ["Voz", "Lenguaje corporal", "Control escénico", "Persuasión", "Seguridad/Energía"];
const totalCheckboxes = initialChecklistData.reduce((acc, section) => acc + section.items.length, 0);

const useStickyState = (defaultValue, key) => {
    const [value, setValue] = useState(() => {
        try {
            const stickyValue = window.localStorage.getItem(key);
            return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, value]);

    return [value, setValue];
};

const TimerModal = ({ config, onClose }) => {
    const { duration, title } = config;
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setTimeLeft(duration);
        setIsActive(false);
    }, [duration, title]);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft <= 0) {
            setIsActive(false);
            alert(`¡Tiempo cumplido para "${title}"!`);
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isActive, timeLeft, title]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(duration);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>{title}</h3>
                <div style={styles.timerDisplay}>{formatTime(timeLeft)}</div>
                <div style={styles.timerControls}>
                    <button onClick={toggleTimer} style={styles.timerButton}>{isActive ? 'Pausar' : 'Iniciar'}</button>
                    <button onClick={resetTimer} style={styles.timerButton}>Reiniciar</button>
                </div>
                <button onClick={onClose} style={styles.closeButton}>Cerrar</button>
            </div>
        </div>
    );
};

const PromptModal = ({ title, content, onClose }) => (
    <div style={styles.modalOverlay} onClick={onClose}>
        <div style={{...styles.modalContent, maxWidth: '600px'}} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Prompt: {title}</h3>
            <p style={styles.promptContent}>{content}</p>
            <button onClick={onClose} style={{...styles.closeButton, marginTop: '1rem'}}>Cerrar</button>
        </div>
    </div>
);

const TheoryModal = ({ title, content, onClose }) => (
    <div style={styles.modalOverlay} onClick={onClose}>
        <div style={{...styles.modalContent, maxWidth: '600px'}} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>📖 Teoría: {title}</h3>
            <p style={styles.promptContent}>{content}</p>
            <button onClick={onClose} style={{...styles.closeButton, marginTop: '1rem'}}>Cerrar</button>
        </div>
    </div>
);

const AIFeedbackModal = ({ config, onClose }) => (
    <div style={styles.modalOverlay} onClick={onClose}>
        <div style={{...styles.modalContent, maxWidth: '600px'}} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>🧠 Feedback de la IA: {config.title}</h3>
            {config.isLoading ? (
                <div style={styles.loader}>Analizando audio... La IA está pensando 🤖</div>
            ) : (
                <div style={{...styles.promptContent, whiteSpace: 'pre-wrap'}}>{config.content}</div>
            )}
            <button onClick={onClose} style={{...styles.closeButton, marginTop: '1rem'}} disabled={config.isLoading}>Cerrar</button>
        </div>
    </div>
);


const getGamificationData = (progress) => {
    if (progress === 100) return { level: 6, title: "Leyenda de la Oratoria", icon: "🏆" };
    if (progress >= 81) return { level: 5, title: "Maestro del Escenario", icon: "🎖️" };
    if (progress >= 61) return { level: 4, title: "Persuasor Hábil", icon: "✨" };
    if (progress >= 41) return { level: 3, title: "Comunicador Confiado", icon: "💪" };
    if (progress >= 21) return { level: 2, title: "Orador Emergente", icon: "🌱" };
    return { level: 1, title: "Iniciando el Viaje", icon: "👣" };
};

const App = () => {
    const [tasksData, setTasksData] = useStickyState(initialChecklistData, 'oratory-tasks-data');
    const [checkedState, setCheckedState] = useStickyState({}, 'oratory-checked-state');
    const [week, setWeek] = useStickyState("", 'oratory-week');
    const [summary, setSummary] = useStickyState(
        summaryAreas.reduce((acc, area) => ({ ...acc, [area]: { score: '', notes: '' } }), {}),
        'oratory-summary'
    );
    const [timerConfig, setTimerConfig] = useState({ isOpen: false, duration: 0, title: '' });
    const [promptModalConfig, setPromptModalConfig] = useState({ isOpen: false, title: '', content: '' });
    const [theoryModalConfig, setTheoryModalConfig] = useState({ isOpen: false, title: '', content: '' });
    const [feedbackModalConfig, setFeedbackModalConfig] = useState({ isOpen: false, title: '', content: '', isLoading: false });

    const [profile, setProfile] = useStickyState({ name: '', age: '', profession: '', experience: 'Principiante', objective: '' }, 'oratory-profile');
    const [streakData, setStreakData] = useStickyState({ count: 0, lastCompletedDate: null }, 'oratory-streak-data');

    const [objectiveStartDate, setObjectiveStartDate] = useStickyState('', 'oratory-objective-start-date');
    const [objectiveEndDate, setObjectiveEndDate] = useStickyState('', 'oratory-objective-end-date');
    const [accumulatedTime, setAccumulatedTime] = useStickyState(0, 'oratory-accumulated-time');
    const [sessionStartTime, setSessionStartTime] = useStickyState(Date.now(), 'oratory-session-start');
    const [elapsedTime, setElapsedTime] = useState(0);

    const [activityLog, setActivityLog] = useStickyState([], 'oratory-activity-log');
    const [sessionHistory, setSessionHistory] = useStickyState([], 'oratory-session-history');
    const [historicalData, setHistoricalData] = useStickyState([], 'oratory-historical-data');
    
    const [draggedItem, setDraggedItem] = useState(null);
    const [recordings, setRecordings] = useStickyState({}, 'oratory-recordings');
    const [recorderState, setRecorderState] = useState({ status: 'idle', taskId: null, mediaRecorder: null, audioURL: null, audioBlob: null, error: null });
    
    const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY }), []);

    const logActivity = useCallback((message) => {
        const timestamp = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newLogEntry = `[${timestamp}] ${message}`;
        setActivityLog(prevLog => [newLogEntry, ...prevLog].slice(0, 100));
    }, [setActivityLog]);
    
    useEffect(() => {
        if (tasksData && tasksData.some(s => s.items.some(i => !i.id))) {
            setTasksData(initialChecklistData);
        }
    }, [tasksData, setTasksData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - sessionStartTime) / 1000));
        }, 1000);

        const handleEndSession = () => {
            const endTime = Date.now();
            const startTime = JSON.parse(localStorage.getItem('oratory-session-start') || `${endTime}`);
            const logs = JSON.parse(localStorage.getItem('oratory-activity-log') || '[]');
            const history = JSON.parse(localStorage.getItem('oratory-session-history') || '[]');
            const accumulated = JSON.parse(localStorage.getItem('oratory-accumulated-time') || '0');
            const sessionDurationSeconds = Math.floor((endTime - startTime) / 1000);

            if (sessionDurationSeconds > 0) localStorage.setItem('oratory-accumulated-time', JSON.stringify(accumulated + sessionDurationSeconds));
            if (logs.length > 0 || sessionDurationSeconds > 5) {
                history.unshift({ startTime, endTime, logs });
                localStorage.setItem('oratory-session-history', JSON.stringify(history));
            }
            
            localStorage.setItem('oratory-session-start', JSON.stringify(Date.now()));
            localStorage.setItem('oratory-activity-log', JSON.stringify([]));
        };
        
        window.addEventListener('beforeunload', handleEndSession);
        
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', handleEndSession);
        };
    }, [sessionStartTime]);
    
    const totalAccumulatedTime = accumulatedTime + elapsedTime;

    const formatElapsedTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    
    const { checkedCount, progress } = useMemo(() => {
        const count = Object.values(checkedState).filter(Boolean).length;
        const progressPercentage = totalCheckboxes > 0 ? Math.round((count / totalCheckboxes) * 100) : 0;
        return { checkedCount: count, progress: progressPercentage };
    }, [checkedState]);
    
    const gamification = useMemo(() => getGamificationData(progress), [progress]);

    const handleCheckboxChange = useCallback((id, itemText) => {
        const isChecked = !checkedState[id];
        setCheckedState(prevState => ({ ...prevState, [id]: isChecked }));
        if (isChecked) {
            const today = new Date().toISOString().split('T')[0];
            const lastDate = streakData.lastCompletedDate;
            if (lastDate !== today) {
                const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
                const newCount = lastDate === yesterday ? streakData.count + 1 : 1;
                setStreakData({ count: newCount, lastCompletedDate: today });
            }
        }
        logActivity(`Tarea ${isChecked ? 'completada' : 'desmarcada'}: "${itemText}"`);
    }, [checkedState, setCheckedState, logActivity, streakData, setStreakData]);
    
    const handleReset = useCallback(() => {
        if (window.confirm("¿Seguro que quieres borrar todo y empezar una nueva semana?")) {
            if (week && progress > 0) {
                setHistoricalData(prevHistory => [...prevHistory, { week: week || `Semana del ${new Date().toLocaleDateString()}`, progress, title: gamification.title, date: new Date().toISOString() }]);
            }
            setCheckedState({});
            setWeek("");
            setObjectiveStartDate('');
            setObjectiveEndDate('');
            setSummary(summaryAreas.reduce((acc, area) => ({ ...acc, [area]: { score: '', notes: '' } }), {}));
            setTasksData(initialChecklistData);
            setAccumulatedTime(0);
            setSessionHistory([]);
            setSessionStartTime(Date.now());
            setActivityLog(['[' + new Date().toLocaleTimeString('es-ES') + '] ¡Nueva semana iniciada!']);
            setRecordings({});
        }
    }, [setCheckedState, setWeek, setSummary, setSessionStartTime, setActivityLog, week, progress, gamification, setHistoricalData, setObjectiveStartDate, setObjectiveEndDate, setAccumulatedTime, setTasksData, setSessionHistory, setRecordings]);

    // --- All other handlers (summary, profile, modals, drag-n-drop) are omitted for brevity but are unchanged ---
    const handleSummaryChange = useCallback((area, field, value) => {
        setSummary(prev => {
            const newSummary = { ...prev, [area]: { ...prev[area], [field]: value }};
            logActivity(`Resumen actualizado: "${area}" (${field}) a "${value}"`);
            return newSummary;
        });
    }, [setSummary, logActivity]);
    
    const handleProfileChange = useCallback((field, value) => {
        setProfile(prev => ({...prev, [field]: value }));
        logActivity(`Perfil actualizado: "${field}" a "${value}"`);
    }, [setProfile, logActivity]);

    const handleOpenTimer = useCallback((duration, title) => {
        setTimerConfig({ isOpen: true, duration, title });
        logActivity(`Cronómetro iniciado para: "${title}"`);
    }, [logActivity]);

    const handleCloseTimer = useCallback(() => setTimerConfig({ isOpen: false, duration: 0, title: '' }), []);
    const handleOpenPromptModal = useCallback((title, content) => setPromptModalConfig({ isOpen: true, title, content }), []);
    const handleClosePromptModal = useCallback(() => setPromptModalConfig({ isOpen: false, title: '', content: '' }), []);
    const handleOpenTheoryModal = useCallback((title, content) => setTheoryModalConfig({ isOpen: true, title, content }), []);
    const handleCloseTheoryModal = useCallback(() => setTheoryModalConfig({ isOpen: false, title: '', content: '' }), []);
    const handleCloseFeedbackModal = useCallback(() => setFeedbackModalConfig({ isOpen: false, title: '', content: '', isLoading: false }), []);
    
    const handleDragStart = (e, item, sectionIndex, itemIndex) => { setDraggedItem({ item, sectionIndex, itemIndex }); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/html', e.target.parentNode); };
    const handleDragOver = (e) => { e.preventDefault(); };
    const handleDrop = (e, targetSectionIndex, targetItemIndex) => {
        if (!draggedItem) return;
        const { item: sourceItem, sectionIndex: sourceSectionIndex, itemIndex: sourceItemIndex } = draggedItem;
        if (sourceSectionIndex === targetSectionIndex && sourceItemIndex === targetItemIndex) { setDraggedItem(null); return; }
        let newTasksData = JSON.parse(JSON.stringify(tasksData));
        newTasksData[sourceSectionIndex].items.splice(sourceItemIndex, 1);
        newTasksData[targetSectionIndex].items.splice(targetItemIndex, 0, sourceItem);
        setTasksData(newTasksData);
        logActivity(`Tarea movida: "${sourceItem.text}"`);
        setDraggedItem(null);
    };
    
    // --- Audio Recording and AI Feedback Logic ---
    const handleStartRecording = async (taskId) => {
        if (recorderState.status === 'recording') return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setRecorderState({ status: 'stopped', taskId, mediaRecorder, audioURL: audioUrl, audioBlob, error: null });
                stream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorder.start();
            setRecorderState({ status: 'recording', taskId, mediaRecorder, audioURL: null, audioBlob: null, error: null });
            logActivity('Grabación iniciada...');
        } catch (err) {
            console.error("Error al acceder al micrófono:", err);
            setRecorderState({ ...recorderState, status: 'idle', error: "No se pudo acceder al micrófono." });
            alert("Error: No se pudo acceder al micrófono. Asegúrate de dar permiso en tu navegador.");
        }
    };
    
    const handleStopRecording = () => {
        recorderState.mediaRecorder?.stop();
        logActivity('Grabación detenida.');
    };
    
    // FIX: Typed the promise to return a string and cast the result to ensure type safety downstream.
    const blobToDataURL = (blob): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result as string);
        reader.onerror = e => reject(reader.error);
        reader.readAsDataURL(blob);
    });

    const handleSaveRecording = async () => {
        const { taskId, audioBlob } = recorderState;
        if (!taskId || !audioBlob) return;

        const dataUrl = await blobToDataURL(audioBlob);
        const newRecording = {
            id: Date.now(),
            date: new Date().toISOString(),
            dataUrl: dataUrl,
            feedback: null
        };

        setRecordings(prev => ({
            ...prev,
            [taskId]: [...(prev[taskId] || []), newRecording]
        }));
        logActivity('Grabación guardada.');
        setRecorderState({ status: 'idle', taskId: null, mediaRecorder: null, audioURL: null, audioBlob: null, error: null });
    };
    
    const handleDiscardRecording = () => {
        URL.revokeObjectURL(recorderState.audioURL);
        setRecorderState({ status: 'idle', taskId: null, mediaRecorder: null, audioURL: null, audioBlob: null, error: null });
    };

    const handleGetAIFeedback = async (taskText) => {
        const { audioBlob } = recorderState;
        if (!audioBlob) return;
        
        setFeedbackModalConfig({ isOpen: true, title: taskText, content: '', isLoading: true });

        try {
            const dataUrl = await blobToDataURL(audioBlob);
            const base64Data = dataUrl.split(',')[1];

            const audioPart = { inlineData: { mimeType: audioBlob.type, data: base64Data } };
            const textPart = { text: `Eres un coach de oratoria experto y amigable. Analiza esta grabación de un usuario practicando la tarea: "${taskText}". Proporciona feedback constructivo en español sobre:
1.  **Ritmo y Pausas:** ¿Habla muy rápido o lento? ¿Usa bien las pausas?
2.  **Tono y Energía:** ¿Suena monótono o transmite emoción?
3.  **Claridad y Dicción:** ¿Se entienden bien las palabras?
4.  **Muletillas:** ¿Detectas palabras o sonidos repetitivos (ehh, umm, etc.)?
5.  **Consejo Clave:** Ofrece 1-2 consejos prácticos y accionables para mejorar.
Sé conciso, alentador y estructura tu respuesta con los puntos anteriores.` };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [audioPart, textPart] },
            });
            
            setFeedbackModalConfig({ isOpen: true, title: taskText, content: response.text, isLoading: false });
        } catch (error) {
            console.error("Error al obtener feedback de la IA:", error);
            setFeedbackModalConfig({ isOpen: true, title: taskText, content: 'Hubo un error al procesar el audio. Por favor, inténtalo de nuevo.', isLoading: false });
        }
    };


    return (
        <div style={styles.container}>
            {timerConfig.isOpen && <TimerModal config={timerConfig} onClose={handleCloseTimer} />}
            {promptModalConfig.isOpen && <PromptModal title={promptModalConfig.title} content={promptModalConfig.content} onClose={handleClosePromptModal} />}
            {theoryModalConfig.isOpen && <TheoryModal title={theoryModalConfig.title} content={theoryModalConfig.content} onClose={handleCloseTheoryModal} />}
            {feedbackModalConfig.isOpen && <AIFeedbackModal config={feedbackModalConfig} onClose={handleCloseFeedbackModal} />}

            <header style={styles.header}>
                <h1 style={styles.title}>🗣️ Checklist Semanal de Entrenamiento en Oratoria</h1>
            </header>
            
            <section style={{...styles.card, marginBottom: '2rem'}} aria-labelledby="profile-title">
                 <h2 id="profile-title" style={styles.cardTitleSummary}>👤 Mi Perfil</h2>
                 <div style={styles.profileGrid}>
                    <div style={styles.profileField}><label htmlFor="profile-name" style={styles.label}>Nombre:</label><input id="profile-name" type="text" value={profile.name} onChange={(e) => handleProfileChange('name', e.target.value)} style={styles.weekInput} /></div>
                    <div style={styles.profileField}><label htmlFor="profile-age" style={styles.label}>Edad:</label><input id="profile-age" type="number" value={profile.age} onChange={(e) => handleProfileChange('age', e.target.value)} style={{...styles.weekInput, width: '80px'}} /></div>
                    <div style={styles.profileField}><label htmlFor="profile-profession" style={styles.label}>Profesión:</label><input id="profile-profession" type="text" value={profile.profession} onChange={(e) => handleProfileChange('profession', e.target.value)} style={styles.weekInput} /></div>
                    <div style={styles.profileField}><label htmlFor="profile-experience" style={styles.label}>Experiencia:</label><select id="profile-experience" value={profile.experience} onChange={(e) => handleProfileChange('experience', e.target.value)} style={styles.weekInput}><option>Principiante</option><option>Intermedio</option><option>Avanzado</option></select></div>
                    <div style={{...styles.profileField, gridColumn: '1 / -1'}}><label htmlFor="profile-objective" style={styles.label}>Objetivo Principal:</label><textarea id="profile-objective" value={profile.objective} onChange={(e) => handleProfileChange('objective', e.target.value)} style={styles.profileTextarea} placeholder="Ej: Mejorar mi confianza en reuniones de equipo"></textarea></div>
                </div>
            </section>
            
            <div style={styles.topInfoContainer}>
                <div style={styles.weekInputContainer}><label htmlFor="week-input" style={styles.label}>Semana:</label><input id="week-input" type="text" value={week} onChange={(e) => setWeek(e.target.value)} placeholder="Ej: Semana 1 - Foco en Voz" style={styles.weekInput} aria-label="Número o nombre de la semana"/></div>
                <div style={styles.dateContainer}>
                    <div style={styles.dateInputWrapper}><label htmlFor="start-date" style={styles.label}>Inicio del Objetivo:</label><input id="start-date" type="date" value={objectiveStartDate} onChange={(e) => setObjectiveStartDate(e.target.value)} style={styles.dateInput} aria-label="Fecha de inicio del objetivo" /></div>
                    <div style={styles.dateInputWrapper}><label htmlFor="end-date" style={styles.label}>Fin del Objetivo:</label><input id="end-date" type="date" value={objectiveEndDate} onChange={(e) => setObjectiveEndDate(e.target.value)} style={styles.dateInput} aria-label="Fecha de fin del objetivo" /></div>
                </div>
            </div>
            
            <div style={styles.gamificationContainer}>
                <span style={styles.gamificationIcon} aria-hidden="true">{gamification.icon}</span><span style={styles.gamificationTitle}>{gamification.title}</span><span style={styles.gamificationSeparator}>|</span><span style={styles.gamificationIcon} aria-hidden="true">🔥</span><span style={styles.gamificationTitle}>{streakData.count} Días de Racha</span>
            </div>

            <div style={styles.progressContainer}>
                <div style={styles.progressBarBackground}><div style={{ ...styles.progressBarFill, width: `${progress}%` }}>{progress > 10 && `${progress}%`}</div></div>
            </div>

            <main>
                {tasksData.map((section, sectionIndex) => (
                    <section key={sectionIndex} style={styles.card} aria-labelledby={`section-title-${sectionIndex}`}>
                        <div style={styles.cardHeader}><h2 id={`section-title-${sectionIndex}`} style={styles.cardTitle}>{section.icon} {section.title}</h2><button onClick={() => handleOpenPromptModal(section.title, section.prompt)} style={styles.promptButton} aria-label={`Ver prompt para ${section.title}`}>Ver Prompt</button></div>
                        <ul style={styles.list}>
                            {section.items.map((item, itemIndex) => {
                                const isDragging = draggedItem?.item.id === item.id;
                                const isRecordingThis = recorderState.status === 'recording' && recorderState.taskId === item.id;
                                const isStoppedOnThis = recorderState.status === 'stopped' && recorderState.taskId === item.id;

                                return (
                                    <React.Fragment key={item.id}>
                                    <li style={{...styles.listItem, opacity: isDragging ? 0.5 : 1, backgroundColor: isRecordingThis ? 'rgba(227, 76, 60, 0.1)' : 'transparent' }} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, sectionIndex, itemIndex)}>
                                        <div style={styles.dragHandle} draggable onDragStart={(e) => handleDragStart(e, item, sectionIndex, itemIndex)}>⠿</div>
                                        <label style={styles.checkboxLabel}><input type="checkbox" checked={!!checkedState[item.id]} onChange={() => handleCheckboxChange(item.id, item.text)} style={styles.checkboxInput} aria-label={item.text} /><span style={styles.customCheckbox}></span><span style={checkedState[item.id] ? styles.checkedText : {}}>{item.text}</span></label>
                                        <div style={styles.itemActions}>
                                            {item.theory && <button onClick={() => handleOpenTheoryModal(item.text, item.theory)} className="tooltip" style={{...styles.actionButton, fontSize: '1.2rem'}}>📖<span className="tooltiptext" style={styles.tooltiptext}>Ver Teoría</span></button>}
                                            {item.example && <div className="tooltip" style={styles.tooltip}>💡<span className="tooltiptext" style={styles.tooltiptext}>{item.example}</span></div>}
                                            {item.time && <button onClick={() => handleOpenTimer(item.time, item.text)} style={styles.timerTriggerButton}>⏱️ Iniciar</button>}
                                            {isRecordingThis ? (<button onClick={handleStopRecording} style={styles.recordButtonStop}>⏹️ Detener</button>) : (<button onClick={() => handleStartRecording(item.id)} disabled={recorderState.status === 'recording'} style={styles.recordButton}>🎙️ Grabar</button>)}
                                        </div>
                                    </li>
                                    {isStoppedOnThis && (
                                        <div style={styles.recorderControls}>
                                            <audio src={recorderState.audioURL} controls style={{flexGrow: 1}}/>
                                            <div style={{display: 'flex', gap: '0.5rem'}}>
                                                <button onClick={() => handleGetAIFeedback(item.text)} style={styles.aiButton}>🤖 Obtener Feedback</button>
                                                <button onClick={handleSaveRecording} style={styles.saveButton}>💾 Guardar</button>
                                                <a href={recorderState.audioURL} download={`grabacion-${item.id}-${Date.now()}.webm`} style={styles.downloadButton}>📥</a>
                                                <button onClick={handleDiscardRecording} style={styles.discardButton}>🗑️</button>
                                            </div>
                                        </div>
                                    )}
                                    {recordings[item.id] && recordings[item.id].length > 0 && (
                                        <div style={styles.recordingsList}>
                                            <h4 style={styles.recordingsTitle}>Grabaciones guardadas:</h4>
                                            {recordings[item.id].map(rec => (
                                                <div key={rec.id} style={styles.recordingItem}>
                                                    <span>{new Date(rec.date).toLocaleString()}</span>
                                                    <audio src={rec.dataUrl} controls style={{height: '30px'}}/>
                                                    <a href={rec.dataUrl} download={`grabacion-guardada-${item.id}-${rec.id}.webm`} style={{...styles.downloadButton, fontSize: '0.8rem'}}>Descargar</a>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </section>
                ))}

                <section style={styles.card} aria-labelledby="summary-title">
                     <h2 id="summary-title" style={styles.cardTitleSummary}>📊 Resumen semanal</h2>
                    <p style={styles.description}>Puntúa del 1 al 5 cada área (1 = flojo, 5 = brutal):</p>
                    <div style={styles.tableWrapper}><table style={styles.table}><thead><tr><th style={styles.th}>Área</th><th style={styles.th}>Puntuación</th><th style={styles.th}>Notas rápidas</th></tr></thead><tbody>{summaryAreas.map(area => (<tr key={area}><td style={styles.td}>{area}</td><td style={styles.td}><input type="number" min="1" max="5" value={summary[area]?.score || ''} onChange={(e) => handleSummaryChange(area, 'score', e.target.value)} style={styles.tableInput} aria-label={`Puntuación para ${area}`} /></td><td style={styles.td}><input type="text" value={summary[area]?.notes || ''} onChange={(e) => handleSummaryChange(area, 'notes', e.target.value)} style={styles.tableInput} placeholder="¿Qué mejorar?" aria-label={`Notas rápidas para ${area}`}/></td></tr>))}</tbody></table></div>
                </section>

                <section style={styles.card} aria-labelledby="history-title">
                    <h2 id="history-title" style={styles.cardTitleSummary}>📈 Historial de Progreso</h2>
                    {historicalData.length > 0 ? (<div style={styles.chartContainer}>{historicalData.map((data, index) => (<div key={index} style={styles.chartBarWrapper} title={`${data.title} (${new Date(data.date).toLocaleDateString()})`}><div style={styles.chartBar}><div style={{ ...styles.chartBarFill, height: `${data.progress}%` }}><span style={styles.chartBarLabel}>{data.progress}%</span></div></div><p style={styles.chartXAxisLabel}>{data.week}</p></div>))}</div>) : ( <p style={styles.historyPlaceholder}>Completa tu primera semana para ver tu historial de progreso aquí.</p> )}
                </section>
                
                 <section style={styles.card} aria-labelledby="activity-log-title">
                     <h2 id="activity-log-title" style={styles.cardTitleSummary}>📜 Registro Detallado y Sesiones</h2>
                     <div style={styles.sessionInfoContainer}><span style={styles.label}>Tiempo Total Acumulado en la Semana:</span><span style={styles.sessionTimer}>{formatElapsedTime(totalAccumulatedTime)}</span></div>
                    <div style={styles.sessionBlock}><h3 style={styles.sessionTitle}>Sesión Actual (Iniciada a las {new Date(sessionStartTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})})</h3><ul style={styles.activityLogList}>{activityLog.length > 0 ? (activityLog.map((entry, index) => <li key={index} style={styles.activityLogItem}>{entry}</li>)) : (<li style={styles.activityLogPlaceholder}>Aquí aparecerán tus acciones.</li>)}</ul></div>
                    {sessionHistory.length > 0 && (<div style={{...styles.sessionBlock, marginTop: '1.5rem'}}><h3 style={styles.sessionTitle}>Sesiones Anteriores</h3>{sessionHistory.map((session, index) => { const sessionDuration = (session.endTime - session.startTime); return (<details key={index} style={{marginBottom: '0.5rem'}}><summary style={styles.sessionSummary}><strong>{new Date(session.startTime).toLocaleDateString()}</strong> | {new Date(session.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(session.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}<span style={styles.sessionDuration}>({formatElapsedTime(Math.floor(sessionDuration/1000))})</span></summary><ul style={{...styles.activityLogList, maxHeight: '150px', marginTop: '0.5rem'}}>{session.logs.length > 0 ? session.logs.map((log, logIndex) => <li key={logIndex} style={styles.activityLogItem}>{log}</li>) : <li style={styles.activityLogPlaceholder}>No se registraron acciones.</li>}</ul></details>);})}</div>)}
                </section>

                <footer style={styles.footer}>
                    <p style={{ ...styles.finalMessage, color: progress >= 80 ? 'var(--success-color)' : 'inherit' }}>👉 Si al final de la semana tienes al menos 80% de casillas marcadas, vas en la vía rápida para convertirte en ese top 1%.</p>
                    <button onClick={handleReset} style={styles.resetButton}>Empezar Nueva Semana</button>
                </footer>
            </main>
        </div>
    );
};

const styles = {
    container: { width: '100%', maxWidth: '800px', margin: '0 auto', padding: '1rem', boxSizing: 'border-box' },
    header: { textAlign: 'center', marginBottom: '1rem' },
    title: { fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', color: 'var(--text-color)', margin: '0 0 1rem 0' },
    profileGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' },
    profileField: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    profileTextarea: { backgroundColor: 'var(--background-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1rem', minHeight: '60px', resize: 'vertical' },
    topInfoContainer: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' },
    weekInputContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' },
    label: { fontSize: '1rem', color: 'var(--text-secondary-color)', fontWeight: '600' },
    weekInput: { backgroundColor: 'var(--card-background)', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1rem', width: '250px' },
    dateContainer: { display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' },
    dateInputWrapper: { display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' },
    dateInput: { backgroundColor: 'var(--card-background)', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.4rem', fontSize: '0.9rem' },
    sessionInfoContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'var(--background-color)', padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem' },
    sessionTimer: { fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-color)' },
    sessionBlock: { borderTop: '1px solid var(--border-color)', paddingTop: '1rem' },
    sessionTitle: { fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary-color)', margin: '0 0 0.75rem 0' },
    sessionSummary: { cursor: 'pointer', color: 'var(--text-color)', listStyle: 'none' },
    sessionDuration: { color: 'var(--text-secondary-color)', fontSize: '0.9rem', marginLeft: '0.5rem' },
    gamificationContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--card-background)', padding: '0.5rem 1.5rem', borderRadius: '50px', margin: '0 auto 1.5rem auto', width: 'fit-content', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    gamificationIcon: { fontSize: '1.5rem' },
    gamificationTitle: { fontSize: '1rem', fontWeight: '600', color: 'var(--text-color)' },
    gamificationSeparator: { color: 'var(--border-color)' },
    progressContainer: { width: '100%', marginBottom: '2rem' },
    progressBarBackground: { backgroundColor: 'var(--card-background)', borderRadius: '10px', height: '20px', overflow: 'hidden' },
    progressBarFill: { backgroundColor: 'var(--accent-color)', height: '100%', borderRadius: '10px', transition: 'width 0.3s ease-in-out', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' },
    card: { backgroundColor: 'var(--card-background)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' },
    cardTitle: { marginTop: '0', color: 'var(--text-color)', fontSize: '1.25rem', margin: 0, padding: 0, border: 'none' },
    cardTitleSummary: { marginTop: '0', color: 'var(--text-color)', fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' },
    promptButton: { background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary-color)', borderRadius: '6px', padding: '0.3rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s' },
    list: { listStyle: 'none', padding: 0, margin: 0 },
    listItem: { marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.2s', padding: '0.25rem', borderRadius: '4px' },
    dragHandle: { cursor: 'grab', color: 'var(--text-secondary-color)', padding: '0 0.5rem' },
    checkboxLabel: { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1rem', color: 'var(--text-secondary-color)', flexGrow: 1 },
    checkboxInput: { opacity: 0, width: 0, height: 0, position: 'absolute' },
    customCheckbox: { width: '20px', height: '20px', border: '2px solid var(--border-color)', borderRadius: '4px', marginRight: '12px', display: 'inline-block', position: 'relative', transition: 'background-color 0.2s, border-color 0.2s', flexShrink: 0 },
    checkedText: { textDecoration: 'line-through', color: '#777' },
    itemActions: { display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 },
    actionButton: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-color)', padding: 0 },
    tooltip: { position: 'relative', display: 'inline-block', cursor: 'help', color: 'var(--accent-color)', fontSize: '1.2rem' },
    tooltiptext: { visibility: 'hidden', width: '250px', backgroundColor: '#333', color: '#fff', textAlign: 'center', borderRadius: '6px', padding: '8px', position: 'absolute', zIndex: 1, bottom: '125%', left: '50%', marginLeft: '-125px', opacity: 0, transition: 'opacity 0.3s', fontSize: '0.9rem', lineHeight: '1.4' },
    timerTriggerButton: { background: 'none', border: '1px solid var(--accent-color)', color: 'var(--accent-color)', borderRadius: '15px', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem', transition: 'background-color 0.2s, color 0.2s' },
    description: { color: 'var(--text-secondary-color)', fontSize: '0.9rem' },
    tableWrapper: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
    th: { textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary-color)' },
    td: { padding: '0.5rem', borderBottom: '1px solid var(--border-color)' },
    tableInput: { width: '100%', boxSizing: 'border-box', backgroundColor: 'var(--background-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.5rem' },
    chartContainer: { display: 'flex', gap: '1.5rem', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '1rem', minHeight: '200px', overflowX: 'auto', width: '100%', backgroundColor: 'var(--background-color)', borderRadius: '8px', border: '1px solid var(--border-color)' },
    chartBarWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: '0 0 80px', maxWidth: '120px' },
    chartBar: { width: '100%', height: '150px', backgroundColor: 'var(--border-color)', borderRadius: '4px', display: 'flex', flexDirection: 'column-reverse' },
    chartBarFill: { backgroundColor: 'var(--accent-color)', borderRadius: '4px', width: '100%', transition: 'height 0.5s ease-out', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.9rem', overflow: 'hidden' },
    chartBarLabel: { visibility: 'visible' },
    chartXAxisLabel: { fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', margin: 0, wordBreak: 'break-word', width: '100%' },
    historyPlaceholder: { color: '#888', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' },
    activityLogList: { listStyle: 'none', padding: '0.5rem 1rem', margin: '0', maxHeight: '200px', overflowY: 'auto', backgroundColor: 'var(--background-color)', borderRadius: '8px', border: '1px solid var(--border-color)' },
    activityLogItem: { color: 'var(--text-secondary-color)', fontSize: '0.9rem', padding: '0.25rem 0', borderBottom: '1px solid var(--border-color)' },
    activityLogPlaceholder: { color: '#888', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' },
    footer: { textAlign: 'center', marginTop: '2rem' },
    finalMessage: { fontSize: '1rem', marginBottom: '1.5rem', transition: 'color 0.3s ease-in-out' },
    resetButton: { backgroundColor: '#c0392b', color: 'white', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' },
    modalContent: { backgroundColor: 'var(--card-background)', padding: '2rem', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', textAlign: 'center', width: '90%', maxWidth: '350px' },
    modalTitle: { marginTop: 0, fontSize: '1.2rem' },
    promptContent: { whiteSpace: 'pre-wrap', textAlign: 'left', backgroundColor: 'var(--background-color)', padding: '1rem', borderRadius: '8px', maxHeight: '50vh', overflowY: 'auto', color: 'var(--text-secondary-color)', border: '1px solid var(--border-color)', fontSize: '0.9rem', lineHeight: 1.5 },
    timerDisplay: { fontSize: '4rem', fontWeight: 'bold', margin: '1rem 0', fontFamily: 'monospace' },
    timerControls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' },
    timerButton: { backgroundColor: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
    closeButton: { background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary-color)', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer' },
    recordButton: { background: 'none', border: '1px solid #c0392b', color: '#c0392b', borderRadius: '15px', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s', whiteSpace: 'nowrap' },
    recordButtonStop: { background: '#c0392b', border: '1px solid #c0392b', color: 'white', borderRadius: '15px', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s', whiteSpace: 'nowrap' },
    recorderControls: { display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--background-color)', padding: '0.75rem', borderRadius: '8px', margin: '0.5rem 0 1rem 2rem' },
    aiButton: { backgroundColor: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer' },
    saveButton: { backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer' },
    discardButton: { backgroundColor: '#7f8c8d', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer' },
    downloadButton: { color: 'var(--text-secondary-color)', textDecoration: 'none', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--border-color)', lineHeight: 1 },
    recordingsList: { borderTop: '1px dashed var(--border-color)', marginTop: '1rem', paddingTop: '0.5rem', marginLeft: '2rem' },
    recordingsTitle: { fontSize: '0.9rem', color: 'var(--text-secondary-color)', margin: '0 0 0.5rem 0' },
    recordingItem: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.9rem' },
    loader: { padding: '2rem', fontSize: '1.2rem', color: 'var(--accent-color)' },
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .checkbox-label:hover .custom-checkbox { border-color: var(--accent-color); }
  input[type="checkbox"]:checked + .custom-checkbox { background-color: var(--accent-color); border-color: var(--accent-color); }
  input[type="checkbox"]:checked + .custom-checkbox::after { content: '✔'; position: absolute; color: white; font-size: 14px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .reset-button:hover { background-color: #e74c3c; }
  .timer-trigger-button:hover { background-color: var(--accent-color); color: white; }
  .prompt-button:hover { background-color: var(--border-color); color: var(--text-color); }
  .tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }
  input[type="checkbox"]:focus-visible + span { outline: 2px solid var(--accent-color); outline-offset: 2px; }
  .activityLogList li:last-child { border-bottom: none; }
  input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7); }
  li:has(.drag-handle:active) { cursor: grabbing !important; }
  summary::-webkit-details-marker { display: none; }
  summary { list-style: none; }
  summary::before { content: '▶'; margin-right: 0.5rem; display: inline-block; transition: transform 0.2s; }
  details[open] > summary::before { transform: rotate(90deg); }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
`;
document.head.appendChild(styleSheet);


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);