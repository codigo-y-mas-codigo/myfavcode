document
 .getElementById("formulario")
 .addEventListener("submit", function (event) {
  event.preventDefault();

  var img = document.getElementById("img").value;
  var alt = document.getElementById("alt").value;
  var url = document.getElementById("url").value;
  var fechaHora = new Date().toLocaleString();

  var elemento = { img: img, alt: alt, url: url, fechaHora: fechaHora };
  guardarElemento(elemento);
  mostrarElementos();
  this.reset();
 });

function guardarElemento(elemento) {
 var elementos = JSON.parse(localStorage.getItem("elementos")) || [];
 elementos.push(elemento);
 localStorage.setItem("elementos", JSON.stringify(elementos));
}

function mostrarElementos() {
 var elementos = JSON.parse(localStorage.getItem("elementos")) || [];
 var tabla = document.getElementById("elementos");
 tabla.innerHTML =
  "<tr><th>Imagen</th><th>Alt</th><th>URL</th><th>Fecha y Hora</th><th>Acciones</th></tr>";

 elementos.forEach(function (elemento, index) {
  var fila =
   "<tr><td><img src='" +
   elemento.url +
   "' alt='" +
   elemento.alt +
   "'></td><td>" +
   elemento.alt +
   "</td><td><a href='" +
   elemento.url +
   "' target='_blank'>" +
   elemento.url +
   "</a></td><td>" +
   elemento.fechaHora +
   "</td><td><button onclick='editarElemento(" +
   index +
   ")'>Editar</button> <button onclick='eliminarElemento(" +
   index +
   ")'>Eliminar</button></td></tr>";
  tabla.innerHTML += fila;
 });

 // Generar enlaces para descargar JSON
 var json = JSON.stringify(elementos, null, 2);
 var enlaces = document.getElementById("enlaces");
 enlaces.innerHTML = "<h2>Descargar JSON:</h2>";
 enlaces.innerHTML +=
  "<a href='data:text/json;charset=utf-8," +
  encodeURIComponent(json) +
  "' download='elementos.json'>Descargar JSON</a>";
}

function editarElemento(index) {
 var elementos = JSON.parse(localStorage.getItem("elementos")) || [];
 var elemento = elementos[index];

 if (elemento) {
  var img = prompt("Nuevo valor para 'Imagen':", elemento.img);
  var alt = prompt("Nuevo valor para 'Alt':", elemento.alt);
  var url = prompt("Nuevo valor para 'URL':", elemento.url);

  if (img !== null && alt !== null && url !== null) {
   elemento.img = img;
   elemento.alt = alt;
   elemento.url = url;

   localStorage.setItem("elementos", JSON.stringify(elementos));
   mostrarElementos();
  }
 }
}

function eliminarElemento(index) {
 var elementos = JSON.parse(localStorage.getItem("elementos")) || [];
 elementos.splice(index, 1);
 localStorage.setItem("elementos", JSON.stringify(elementos));
 mostrarElementos();
}

mostrarElementos();
