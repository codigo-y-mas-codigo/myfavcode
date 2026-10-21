const bgButtons = document.querySelectorAll("#bg-buttons button");
const textButtons = document.querySelectorAll("#text-buttons button");

function changeBackgroundColor(color) {
 document.body.style.backgroundColor = color;
 localStorage.setItem("bgColor", color);
 updateVisibility(color);
}

function changeTextColor(color) {
 document.body.style.color = color;
 localStorage.setItem("textColor", color);
}

function updateVisibility(bgColor) {
 textButtons.forEach((button) => {
  button.style.display = "inline-block";
  if (button.dataset.color.toLowerCase() === bgColor.toLowerCase()) {
   button.style.display = "none";
  }
 });
}

function loadStoredPreferences() {
 const bgColor = localStorage.getItem("bgColor");
 const textColor = localStorage.getItem("textColor");
 if (bgColor) {
  document.body.style.backgroundColor = bgColor;
  updateVisibility(bgColor);
 }
 if (textColor) {
  document.body.style.color = textColor;
 }
}

bgButtons.forEach((button) => {
 button.addEventListener("click", () => {
  changeBackgroundColor(button.dataset.color);
 });
});

textButtons.forEach((button) => {
 button.addEventListener("click", () => {
  changeTextColor(button.dataset.color);
 });
});

window.onload = loadStoredPreferences;
