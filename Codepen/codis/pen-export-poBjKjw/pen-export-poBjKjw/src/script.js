document.addEventListener("DOMContentLoaded", function () {
 // Obtener los datos del localStorage
 const nombre = localStorage.getItem("nombre");
 const email = localStorage.getItem("email");
 const comentarios = localStorage.getItem("comentarios");
 const tipoCalendario = localStorage.getItem("tipoCalendario");
 const empresa = localStorage.getItem("empresa"); // Obtener empresa del localStorage
 const opcionesImpresion = localStorage.getItem("opcionesImpresion")
  ? JSON.parse(localStorage.getItem("opcionesImpresion"))
  : []; // Obtener opciones de impresión del localStorage
 // Mostrar los datos en el resumen si existen
 if (
  nombre &&
  email &&
  comentarios &&
  tipoCalendario &&
  opcionesImpresion.length > 0
 ) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("email").value = email;
  document.getElementById("comentarios").value = comentarios;
  document.getElementById("material_de_impresion").value = tipoCalendario;
  opcionesImpresion.forEach((opcion) => {
   document.querySelector(
    `input[name="imprimir"][value="${opcion}"]`
   ).checked = true;
  });
  document.getElementById("empresa").value = empresa; // Mostrar empresa en el campo de texto
  mostrarResumen();
 }
});

const formulario = document.getElementById("formulario");
const resumenDatos = document.getElementById("resumenDatos");
const editarDatosBtn = document.getElementById("editarDatos");
const confirmarDatosBtn = document.getElementById("confirmarDatos");

// Función para mostrar el resumen de los datos ingresados
const mostrarResumen = () => {
 const nombre = document.getElementById("nombre").value;
 const email = document.getElementById("email").value;
 const comentarios = document.getElementById("comentarios").value;
 const tipoCalendario = document.getElementById("material_de_impresion").value;
 const opcionesImpresion = Array.from(
  document.querySelectorAll('input[name="imprimir"]:checked')
 ).map((checkbox) => checkbox.value); // Obtener opciones seleccionadas de impresión
 const empresa = document.getElementById("empresa").value; // Obtener empresa desde el formulario
 document.getElementById("nombreResumen").textContent = `Nombre: ${nombre}`;
 document.getElementById("emailResumen").textContent = `Email: ${email}`;
 document.getElementById(
  "comentariosResumen"
 ).textContent = `Comentarios: ${comentarios}`;
 document.getElementById(
  "tipoCalendarioResumen"
 ).textContent = `Material de impresión: ${tipoCalendario}`;
 document.getElementById(
  "impresionResumen"
 ).textContent = `¿Qué quieres imprimir?: ${opcionesImpresion.join(", ")}`;
 document.getElementById("empresaResumen").textContent = `Empresa: ${empresa}`; // Mostrar empresa en el resumen
 localStorage.setItem("nombre", nombre);
 localStorage.setItem("email", email);
 localStorage.setItem("comentarios", comentarios);
 localStorage.setItem("tipoCalendario", tipoCalendario);
 localStorage.setItem("empresa", empresa); // Guardar empresa en el localStorage
 localStorage.setItem("opcionesImpresion", JSON.stringify(opcionesImpresion));
 formulario.classList.add("hidden");
 resumenDatos.classList.remove("hidden");
};

// Función para volver al formulario desde el resumen de datos
const editarDatos = () => {
 formulario.classList.remove("hidden");
 resumenDatos.classList.add("hidden");
};

// Event listener para mostrar el resumen de datos al enviar el formulario
document.getElementById("contactForm").addEventListener("submit", (event) => {
 event.preventDefault();
 mostrarResumen();
});

// Event listener para editar los datos desde el resumen de datos
editarDatosBtn.addEventListener("click", editarDatos);

// Event listener para confirmar los datos y enviar al WhatsApp
confirmarDatosBtn.addEventListener("click", () => {
 const nombre = localStorage.getItem("nombre");
 const email = localStorage.getItem("email");
 const comentarios = localStorage.getItem("comentarios");
 const tipoCalendario = localStorage.getItem("tipoCalendario");
 const empresa = localStorage.getItem("empresa"); // Obtener empresa del localStorage
 const opcionesImpresion = Array.from(
  document.querySelectorAll('input[name="imprimir"]:checked')
 ).map((checkbox) => checkbox.value);
 const mensaje = `Hola, mi nombre es *${nombre}*\nSoy de la empresa *${empresa}*\nMi correo electrónico *${email}*\nMe gustaría imprimir: *${opcionesImpresion.join(
  ", "
 )}*\nEl material de impresión: *${tipoCalendario}*\nDetalles de la cotización: *${comentarios}*\nSin más por el momento quedo a espera de su pronta respuesta. Gracias, att. *${nombre}*`;
 window.open(
  `https://api.whatsapp.com/send?phone=5539793727&text=${encodeURIComponent(
   mensaje
  )}`
 );
});
