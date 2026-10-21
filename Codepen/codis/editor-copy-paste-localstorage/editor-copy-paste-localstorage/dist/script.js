document.addEventListener("DOMContentLoaded", function () {
 const content = document.getElementById("content");

 // Cargar contenido guardado desde localStorage
 const savedContent = localStorage.getItem("savedContent");
 if (savedContent) {
  content.innerHTML = savedContent;
 }

 // Guardar contenido automáticamente en localStorage cada vez que se realiza un cambio
 content.addEventListener("input", function () {
  localStorage.setItem("savedContent", content.innerHTML);
 });

 document.getElementById("copyButton").addEventListener("click", function () {
  const contentHTML = content.innerHTML;

  // Crear un elemento temporal para copiar el contenido
  const tempInput = document.createElement("textarea");
  tempInput.value = contentHTML;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // Mostrar notificación
  const notification = document.getElementById("notification");
  notification.classList.remove("hidden");
  setTimeout(() => {
   notification.classList.add("hidden");
  }, 2000);
 });

 document
  .getElementById("selectAllButton")
  .addEventListener("click", function () {
   const range = document.createRange();
   range.selectNodeContents(content);
   const selection = window.getSelection();
   selection.removeAllRanges();
   selection.addRange(range);
  });

 document.getElementById("clearButton").addEventListener("click", function () {
  content.innerHTML = "";
  localStorage.removeItem("savedContent");
  alert("Contenido borrado");
 });
});