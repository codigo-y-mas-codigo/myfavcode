document.addEventListener("DOMContentLoaded", (event) => {
 // Aumentar texto

 document.getElementById("increase-text").addEventListener("click", () => {
  document.body.style.fontSize =
   parseInt(getComputedStyle(document.body).fontSize) + 2 + "px";
 });

 // Disminuir texto

 document.getElementById("decrease-text").addEventListener("click", () => {
  document.body.style.fontSize =
   parseInt(getComputedStyle(document.body).fontSize) - 2 + "px";
 });

 // Escala de grises

 document.getElementById("grayscale").addEventListener("click", () => {
  document.body.style.filter = "grayscale(100%)";
 });

 // Alto contraste

 document.getElementById("high-contrast").addEventListener("click", () => {
  document.body.style.backgroundColor = "#000";

  document.body.style.color = "#fff";
 });

 // Contraste negativo

 document.getElementById("negative-contrast").addEventListener("click", () => {
  document.body.style.filter = "invert(100%)";
 });

 // Fondo claro

 document.getElementById("light-background").addEventListener("click", () => {
  document.body.style.backgroundColor = "#fff";

  document.body.style.color = "#000";
 });

 // Subrayar enlaces

 document.getElementById("underline-links").addEventListener("click", () => {
  const links = document.getElementsByTagName("a");

  for (let i = 0; i < links.length; i++) {
   links[i].style.textDecoration = "underline";
  }
 });

 // Fuente legible

 document.getElementById("readable-font").addEventListener("click", () => {
  document.body.style.fontFamily = "Arial, sans-serif";
 });

 // Restablecer

 document.getElementById("reset").addEventListener("click", () => {
  document.body.removeAttribute("style");

  const links = document.getElementsByTagName("a");

  for (let i = 0; i < links.length; i++) {
   links[i].removeAttribute("style");
  }
 });
});
