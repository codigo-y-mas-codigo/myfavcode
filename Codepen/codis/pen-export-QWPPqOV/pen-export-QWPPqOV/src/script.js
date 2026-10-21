document.addEventListener("DOMContentLoaded", function () {
 const tonosYEstilos = [
  {
   tipo: "Estilo",
   id: 1,
   nombre: "Formal",
   contexto: "Documentos legales, informes empresariales, trabajos académicos.",
   propósito: "Transmitir información de manera precisa y profesional.",
   ejemplo: [
    "Contratos comerciales",
    "Informes financieros",
    "Ensayos académicos"
   ]
  },
  {
   tipo: "Estilo",
   id: 2,
   nombre: "Informal",
   contexto: "Correos electrónicos entre amigos, mensajes de texto personales.",
   propósito: "Comunicarse de manera relajada y amigable.",
   ejemplo: [
    "Correos electrónicos informales",
    "Mensajes de texto entre amigos cercanos"
   ]
  },
  {
   tipo: "Estilo",
   id: 3,
   nombre: "Técnico",
   contexto:
    "Documentación técnica, manuales de instrucciones, informes científicos.",
   propósito:
    "Comunicar información específica y detallada sobre un tema técnico.",
   ejemplo: [
    "Manuales de software",
    "Informes de investigación científica",
    "Documentación de productos electrónicos"
   ]
  },
  {
   tipo: "Estilo",
   id: 4,
   nombre: "Académico",
   contexto: "Trabajos de investigación, ensayos académicos, tesis.",
   propósito:
    "Presentar argumentos respaldados por evidencia y contribuir al conocimiento académico.",
   ejemplo: [
    "Artículos académicos",
    "Tesis doctorales",
    "Trabajos de investigación universitaria"
   ]
  },
  {
   tipo: "Estilo",
   id: 5,
   nombre: "Humorístico",
   contexto: "Sátiras, comedias, blogs de humor.",
   propósito: "Entretener y hacer reír al lector.",
   ejemplo: [
    "Columnas de humor en periódicos",
    "Programas de comedia",
    "Blogs de comedia"
   ]
  },
  {
   tipo: "Estilo",
   id: 6,
   nombre: "Persuasivo",
   contexto: "Publicidad, discursos políticos, ensayos de opinión.",
   propósito:
    "Convencer al lector o audiencia de adoptar un punto de vista o tomar una acción específica.",
   ejemplo: [
    "Anuncios publicitarios",
    "Discursos políticos",
    "Ensayos persuasivos"
   ]
  },
  {
   tipo: "Estilo",
   id: 7,
   nombre: "Descriptivo",
   contexto: "Literatura, viajes, pintura.",
   propósito:
    "Describir lugares, personas, objetos o experiencias de manera vívida y detallada.",
   ejemplo: [
    "Pasajes descriptivos en novelas",
    "Guías de viaje",
    "Descripciones de obras de arte"
   ]
  },
  {
   tipo: "Estilo",
   id: 8,
   nombre: "Epistolar",
   contexto: "Correspondencia personal o ficticia, diarios personales.",
   propósito:
    "Comunicarse de manera íntima y personal con otra persona o público.",
   ejemplo: ["Cartas entre amigos", "Diarios personales", "Novelas epistolares"]
  },
  {
   tipo: "Estilo",
   id: 9,
   nombre: "Narrativo",
   contexto: "Novelas, cuentos, películas, series de televisión.",
   propósito:
    "Contar una historia a través del desarrollo de personajes, tramas y conflictos.",
   ejemplo: ["Novelas populares", "Cuentos clásicos", "Películas de Hollywood"]
  },
  {
   tipo: "Estilo",
   id: 10,
   nombre: "Poético",
   contexto: "Poesía, literatura lírica, canciones.",
   propósito:
    "Expresar emociones y experiencias a través de la belleza del lenguaje y la métrica.",
   ejemplo: ["Poemas románticos", "Letras de canciones", "Sonetos clásicos"]
  },
  {
   tipo: "Estilo",
   id: 11,
   nombre: "Crítico",
   contexto: "Reseñas literarias, críticas de cine, análisis de obras de arte.",
   propósito:
    "Evaluar y analizar una obra o evento desde una perspectiva crítica.",
   ejemplo: [
    "Reseñas de libros en revistas literarias",
    "Análisis de películas en blogs de cine",
    "Críticas de arte en galerías"
   ]
  },
  {
   tipo: "Estilo",
   id: 12,
   nombre: "Creativo",
   contexto: "Arte, diseño, publicidad, contenido digital.",
   propósito:
    "Generar ideas originales y expresar creatividad en diversos medios y formatos.",
   ejemplo: [
    "Campañas publicitarias innovadoras",
    "Diseños de moda vanguardistas",
    "Proyectos artísticos experimentales"
   ]
  },
  {
   tipo: "Estilo",
   id: 13,
   nombre: "Satírico",
   contexto: "Sátiras políticas, programas de comedia, caricaturas políticas.",
   propósito:
    "Criticar y ridiculizar a personas, instituciones o eventos de manera humorística.",
   ejemplo: [
    "Programas de televisión satíricos como 'Saturday Night Live'",
    "Caricaturas políticas en revistas como 'Charlie Hebdo'",
    "Columnas satíricas en periódicos"
   ]
  },
  {
   tipo: "Estilo",
   id: 14,
   nombre: "Periodístico",
   contexto: "Periódicos, revistas de noticias, sitios web de noticias.",
   propósito:
    "Informar sobre eventos actuales y proporcionar análisis e interpretación de noticias.",
   ejemplo: [
    "Artículos de periódicos sobre eventos mundiales",
    "Reportajes de investigación en revistas de noticias",
    "Blogs de periodismo independiente"
   ]
  },
  {
   tipo: "Estilo",
   id: 15,
   nombre: "Epigramático",
   contexto: "Redes sociales, citas famosas, refranes populares.",
   propósito:
    "Transmitir sabiduría o provocar reflexión en un formato breve y conciso.",
   ejemplo: [
    "Publicaciones en Twitter con frases ingeniosas",
    "Citas célebres en libros de referencia",
    "Refranes populares transmitidos de generación en generación"
   ]
  },
  {
   tipo: "Estilo",
   id: 16,
   nombre: "Conversacional",
   contexto: "Blogs personales, podcasts, charlas informales.",
   propósito:
    "Mantener una comunicación cercana y directa con el público, utilizando un lenguaje coloquial y amigable.",
   ejemplo: [
    "Blogs de viajes con relatos personales",
    "Podcasts de entrevistas informales",
    "Charlas entre amigos en redes sociales"
   ]
  },
  {
   tipo: "Estilo",
   id: 17,
   nombre: "Instructivo",
   contexto: "Tutoriales en línea, manuales de usuario, guías de bricolaje.",
   propósito:
    "Ofrecer instrucciones claras y detalladas sobre cómo realizar una tarea o utilizar un producto.",
   ejemplo: [
    "Tutoriales de maquillaje en YouTube",
    "Manuales de instrucciones de electrodomésticos",
    "Guías paso a paso para montar muebles"
   ]
  },
  {
   tipo: "Estilo",
   id: 18,
   nombre: "Filosófico",
   contexto: "Ensayos filosóficos, reflexiones personales, debates académicos.",
   propósito:
    "Explorar conceptos abstractos, cuestionar la naturaleza de la realidad y la existencia.",
   ejemplo: [
    "Ensayos filosóficos sobre ética",
    "Reflexiones personales sobre el sentido de la vida",
    "Debates académicos sobre metafísica"
   ]
  },
  {
   tipo: "Estilo",
   id: 19,
   nombre: "Documental",
   contexto: "Películas, libros, informes.",
   propósito: "Presentar hechos y eventos de manera objetiva y precisa.",
   ejemplo: [
    "Documentales sobre historia antigua",
    "Libros de no ficción sobre biografías famosas",
    "Informes de investigación científica"
   ]
  },
  {
   tipo: "Estilo",
   id: 20,
   nombre: "Testimonial",
   contexto: "Relatos personales, testimonios de testigos, entrevistas.",
   propósito:
    "Compartir experiencias personales o testimonios sobre eventos específicos.",
   ejemplo: [
    "Relatos de sobrevivientes de desastres naturales",
    "Testimonios de testigos en casos judiciales",
    "Entrevistas con expertos en programas de televisión"
   ]
  },
  {
   tipo: "Estilo",
   id: 21,
   nombre: "Didáctico",
   contexto: "Material educativo, libros de texto, cursos en línea.",
   propósito:
    "Facilitar el aprendizaje y la comprensión de conceptos mediante la enseñanza estructurada.",
   ejemplo: [
    "Libros de texto de matemáticas para estudiantes de primaria",
    "Cursos en línea de programación informática",
    "Material educativo para enseñar idiomas"
   ]
  },
  {
   tipo: "Tono",
   id: 1,
   nombre: "Cálido",
   contexto:
    "Cartas de agradecimiento personales, mensajes de apoyo en momentos difíciles, interacciones en entornos comunitarios.",
   propósito: "Transmitir calidez, afecto y aprecio hacia el receptor.",
   ejemplo: [
    "Cartas de agradecimiento a amigos por su apoyo",
    "Mensajes de texto reconfortantes a familiares en momentos difíciles",
    "Interacciones amistosas en reuniones vecinales"
   ]
  },
  {
   tipo: "Tono",
   id: 2,
   nombre: "Autoritario",
   contexto:
    "Instrucciones militares, órdenes ejecutivas, directrices gubernamentales.",
   propósito:
    "Establecer autoridad y claridad en la comunicación, indicando acciones obligatorias o políticas a seguir.",
   ejemplo: [
    "Directivas del ejército sobre el manejo de armas",
    "Decretos presidenciales sobre políticas nacionales",
    "Protocolos de seguridad en instalaciones gubernamentales"
   ]
  },
  {
   tipo: "Tono",
   id: 3,
   nombre: "Empático",
   contexto: "Consejería, terapia, discusiones personales sensibles.",
   propósito:
    "Demostrar comprensión, empatía y apoyo hacia las emociones y experiencias del interlocutor.",
   ejemplo: [
    "Sesiones de terapia donde el terapeuta muestra comprensión hacia los desafíos del paciente",
    "Conversaciones entre amigos donde se brinda apoyo emocional durante momentos difíciles",
    "Cartas de condolencia que expresan empatía hacia la pérdida de un ser querido"
   ]
  },
  {
   tipo: "Tono",
   id: 4,
   nombre: "Frío",
   contexto:
    "Comunicaciones formales de despidos, informes de investigación sin emociones, correos electrónicos de quejas.",
   propósito:
    "Mantener distancia emocional y objetividad en situaciones delicadas o conflictivas.",
   ejemplo: [
    "Cartas de terminación de empleo",
    "Informes forenses sobre accidentes",
    "Correos electrónicos formales sobre quejas de clientes"
   ]
  },
  {
   tipo: "Tono",
   id: 5,
   nombre: "Optimista",
   contexto:
    "Discursos de motivación, mensajes de aliento en situaciones desafiantes, campañas publicitarias que destacan el lado positivo de un producto.",
   propósito:
    "Inspirar esperanza, confianza y una actitud positiva hacia el futuro.",
   ejemplo: [
    "Discursos de líderes inspiradores en eventos comunitarios",
    "Mensajes de aliento en redes sociales durante crisis",
    "Anuncios televisivos que promueven un estilo de vida positivo"
   ]
  },
  {
   tipo: "Tono",
   id: 6,
   nombre: "Pesimista",
   contexto:
    "Advertencias de seguridad, informes sobre crisis ambientales, análisis de riesgo financiero.",
   propósito:
    "Destacar los aspectos negativos o las consecuencias adversas de una situación.",
   ejemplo: [
    "Avisos de evacuación durante desastres naturales",
    "Informes sobre el aumento de la contaminación del aire",
    "Análisis de riesgo en inversiones financieras"
   ]
  },
  {
   tipo: "Tono",
   id: 7,
   nombre: "Tentativo",
   contexto:
    "Propuestas de proyectos, sugerencias en reuniones de equipo, solicitudes de opinión.",
   propósito:
    "Presentar ideas o sugerencias de manera cautelosa, sin comprometerse completamente.",
   ejemplo: [
    "Propuestas de mejoras en el lugar de trabajo",
    "Sugerencias para cambios en políticas de la empresa",
    "Solicitudes de retroalimentación sobre un proyecto en desarrollo"
   ]
  },
  {
   tipo: "Tono",
   id: 8,
   nombre: "Sarcástico",
   contexto: "Artículos satíricos, comentarios irónicos, humor negro.",
   propósito: "Expresar crítica o burla de manera humorística y sarcástica.",
   ejemplo: [
    "Artículos satíricos en revistas de humor",
    "Comentarios irónicos en redes sociales",
    "Programas de televisión que emplean humor negro"
   ]
  },
  {
   tipo: "Tono",
   id: 9,
   nombre: "Irónico",
   contexto:
    "Discusiones informales, comentarios mordaces, literatura satírica.",
   propósito:
    "Expresar una idea o comentario opuesto al significado literal de las palabras, a menudo para enfatizar una crítica o una contradicción.",
   ejemplo: [
    "Conversaciones sarcásticas entre amigos",
    "Comentarios mordaces en debates políticos",
    "Novelas satíricas que critican la sociedad"
   ]
  },
  {
   tipo: "Tono",
   id: 10,
   nombre: "Humilde",
   contexto:
    "Interacciones personales, discursos de agradecimiento, discusiones en grupo.",
   propósito: "Mostrar modestia, sinceridad y gratitud en la comunicación.",
   ejemplo: [
    "Discursos de agradecimiento en eventos comunitarios",
    "Conversaciones humildes durante reuniones familiares",
    "Expresiones de gratitud en entrevistas de trabajo"
   ]
  },
  {
   tipo: "Tono",
   id: 11,
   nombre: "Respetuoso",
   contexto:
    "Comunicaciones formales, discusiones diplomáticas, interacciones profesionales.",
   propósito:
    "Demostrar cortesía, consideración y buenos modales en la comunicación.",
   ejemplo: [
    "Cartas de solicitud de empleo",
    "Negociaciones diplomáticas entre países",
    "Correos electrónicos profesionales"
   ]
  },
  {
   tipo: "Tono",
   id: 12,
   nombre: "Entusiasta",
   contexto:
    "Promociones de productos, discursos motivacionales, reseñas de películas.",
   propósito:
    "Transmitir emoción, energía y entusiasmo hacia un tema o producto.",
   ejemplo: [
    "Anuncios televisivos de lanzamiento de productos",
    "Discursos motivacionales en conferencias",
    "Reseñas de películas que elogian la actuación y la trama"
   ]
  },
  {
   tipo: "Tono",
   id: 13,
   nombre: "Directo",
   contexto:
    "Negociaciones comerciales, instrucciones claras, discusiones urgentes.",
   propósito:
    "Comunicar de manera clara, concisa y sin rodeos, enfocándose en los puntos principales.",
   ejemplo: [
    "Negociaciones de contratos comerciales",
    "Instrucciones precisas para ensamblar un mueble",
    "Discusiones urgentes sobre medidas de seguridad"
   ]
  },
  {
   tipo: "Tono",
   id: 14,
   nombre: "Serio",
   contexto:
    "Discursos políticos, informes de noticias, comunicados de prensa.",
   propósito:
    "Comunicar información importante o delicada de manera formal y sin distracciones.",
   ejemplo: [
    "Discursos presidenciales sobre política nacional",
    "Informes de noticias sobre crisis internacionales",
    "Comunicados de prensa sobre situaciones de emergencia"
   ]
  },
  {
   tipo: "Tono",
   id: 15,
   nombre: "Divertido",
   contexto:
    "Programas de televisión de comedia, blogs de entretenimiento, contenido viral en redes sociales.",
   propósito:
    "Entretener y hacer reír al público utilizando humor y situaciones cómicas.",
   ejemplo: [
    "Sketches cómicos en programas de televisión",
    "Publicaciones virales en redes sociales",
    "Vídeos divertidos en plataformas de streaming"
   ]
  },
  {
   tipo: "Tono",
   id: 16,
   nombre: "Formal",
   contexto: "Documentos legales, informes empresariales, trabajos académicos.",
   propósito: "Transmitir información de manera precisa y profesional.",
   ejemplo: [
    "Contratos comerciales",
    "Informes financieros",
    "Ensayos académicos"
   ]
  },
  {
   tipo: "Tono",
   id: 17,
   nombre: "Confidencial",
   contexto:
    "Correspondencia privada, comunicaciones corporativas internas, información clasificada.",
   propósito:
    "Mantener la privacidad y la confidencialidad de la información compartida.",
   ejemplo: [
    "Correos electrónicos entre directivos de una empresa",
    "Memos internos sobre estrategias comerciales",
    "Documentos clasificados del gobierno"
   ]
  },
  {
   tipo: "Tono",
   id: 18,
   nombre: "Educativo",
   contexto: "Libros de texto, tutoriales en línea, conferencias académicas.",
   propósito:
    "Instruir y enseñar sobre un tema específico de manera clara y comprensible.",
   ejemplo: [
    "Libros de matemáticas para estudiantes de secundaria",
    "Tutoriales en video sobre programación informática",
    "Conferencias universitarias sobre historia del arte"
   ]
  },
  {
   tipo: "Tono",
   id: 19,
   nombre: "Inspirador",
   contexto: "Discursos motivacionales, charlas TED, libros de autoayuda.",
   propósito:
    "Motivar, elevar el ánimo y despertar el potencial del oyente o lector.",
   ejemplo: [
    "Discursos de líderes inspiradores en eventos corporativos",
    "Charlas TED que comparten historias de superación",
    "Libros de autoayuda que promueven el crecimiento personal"
   ]
  },
  {
   tipo: "Tono",
   id: 20,
   nombre: "Solemne",
   contexto:
    "Ceremonias oficiales, discursos de conmemoración, declaraciones formales.",
   propósito:
    "Transmitir seriedad, dignidad y respeto hacia un tema o evento importante.",
   ejemplo: [
    "Ceremonias de graduación en universidades",
    "Discursos conmemorativos en aniversarios históricos",
    "Declaraciones formales de organismos internacionales"
   ]
  },
  {
   tipo: "Tono",
   id: 21,
   nombre: "Informal",
   contexto: "Correos electrónicos entre amigos, mensajes de texto personales.",
   propósito: "Comunicarse de manera relajada y amigable.",
   ejemplo: [
    "Correos electrónicos informales",
    "Mensajes de texto entre amigos cercanos",
    "Conversaciones casuales en redes sociales"
   ]
  }
  // Agrega aquí los demás tonos y estilos de escritura
 ];
 const resultsDiv = document.getElementById("results");
 const searchTonoCheckbox = document.getElementById("searchTono");
 const searchEstiloCheckbox = document.getElementById("searchEstilo");
 const searchOptionNombreCheckbox = document.getElementById(
  "searchOptionNombre"
 );
 const searchOptionContextoCheckbox = document.getElementById(
  "searchOptionContexto"
 );
 const searchOptionPropositoCheckbox = document.getElementById(
  "searchOptionProposito"
 );
 const searchOptionEjemploCheckbox = document.getElementById(
  "searchOptionEjemplo"
 );
 const searchOptionTodosCheckbox = document.getElementById("searchOptionTodos");

 function mostrarResultados(resultados) {
  resultsDiv.innerHTML = "";
  if (resultados.length === 0) {
   mostrarMensajeNoDisponible();
  } else {
   resultados.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("result");
    div.innerHTML = obtenerHTMLResultado(item);
    resultsDiv.appendChild(div);
   });
  }
 }

 function mostrarMensajeNoDisponible() {
  resultsDiv.innerHTML = `
      <div id="noResultsMessage">
        <p>Lo que buscas no está disponible en este momento.</p>
        <p>Puedes enviar tu sugerencia <a href="link_a_tu_formulario">aquí</a>.</p>
      </div>
    `;
 }

 function obtenerHTMLResultado(item) {
  return `
      <h2>${item.nombre}</h2>
      <p><strong>Tipo:</strong> ${item.tipo}</p>
      <p><strong>Contexto:</strong> ${item.contexto}</p>
      <p><strong>Propósito:</strong> ${item.propósito}</p>
      <p><strong>Ejemplo:</strong> ${item.ejemplo.join(", ")}</p>
    `;
 }

 function filtrarPorTipo(items, tipo) {
  return items.filter((item) => item.tipo.toLowerCase() === tipo.toLowerCase());
 }

 function filtrarPorNombre(items, query) {
  const queryNormalizada = normalizarTexto(query);
  return items.filter((item) =>
   normalizarTexto(item.nombre).includes(queryNormalizada)
  );
 }

 function filtrarPorContexto(items, query) {
  const queryNormalizada = normalizarTexto(query);
  return items.filter((item) =>
   normalizarTexto(item.contexto).includes(queryNormalizada)
  );
 }

 function filtrarPorProposito(items, query) {
  const queryNormalizada = normalizarTexto(query);
  return items.filter((item) =>
   normalizarTexto(item.propósito).includes(queryNormalizada)
  );
 }

 function filtrarPorEjemplo(items, query) {
  const queryNormalizada = normalizarTexto(query);
  return items.filter((item) => {
   const ejemploNormalizado = item.ejemplo.map((ej) => normalizarTexto(ej));
   return ejemploNormalizado.some((ej) => ej.includes(queryNormalizada));
  });
 }

 function normalizarTexto(texto) {
  return texto
   .normalize("NFD")
   .replace(/[\u0300-\u036f]/g, "")
   .toLowerCase();
 }

 function ejecutarBusqueda() {
  const query = searchInput.value.trim();
  let resultados = tonosYEstilos;
  if (searchTonoCheckbox.checked && !searchEstiloCheckbox.checked) {
   resultados = filtrarPorTipo(resultados, "Tono");
  } else if (!searchTonoCheckbox.checked && searchEstiloCheckbox.checked) {
   resultados = filtrarPorTipo(resultados, "Estilo");
  }
  if (searchOptionNombreCheckbox.checked) {
   resultados = filtrarPorNombre(resultados, query);
  }
  if (searchOptionContextoCheckbox.checked) {
   resultados = filtrarPorContexto(resultados, query);
  }
  if (searchOptionPropositoCheckbox.checked) {
   resultados = filtrarPorProposito(resultados, query);
  }
  if (searchOptionEjemploCheckbox.checked) {
   resultados = filtrarPorEjemplo(resultados, query);
  }
  if (searchOptionTodosCheckbox.checked) {
   mostrarResultados(tonosYEstilos);
   return;
  }
  mostrarResultados(resultados);
 }
 searchInput.addEventListener("input", ejecutarBusqueda);
 searchTonoCheckbox.addEventListener("change", ejecutarBusqueda);
 searchEstiloCheckbox.addEventListener("change", ejecutarBusqueda);
 searchOptionNombreCheckbox.addEventListener("change", ejecutarBusqueda);
 searchOptionContextoCheckbox.addEventListener("change", ejecutarBusqueda);
 searchOptionPropositoCheckbox.addEventListener("change", ejecutarBusqueda);
 searchOptionEjemploCheckbox.addEventListener("change", ejecutarBusqueda);
 searchOptionTodosCheckbox.addEventListener("change", ejecutarBusqueda);
 // Mostrar todos los tonos y estilos de escritura al cargar la página
 mostrarResultados(tonosYEstilos);
});
