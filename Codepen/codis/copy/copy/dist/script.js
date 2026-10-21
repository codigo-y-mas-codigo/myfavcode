let prompts = JSON.parse(localStorage.getItem("prompts")) || {};

function addPrompt() {
 let name = prompt("Nombre del prompt:");
 if (name) {
  let content = prompt("Contenido del prompt:");
  if (content) {
   prompts[name] = content;
   savePrompts();
   updatePromptList();
  }
 }
}

function savePrompts() {
 localStorage.setItem("prompts", JSON.stringify(prompts));
}

function updatePromptList() {
 let promptList = document.getElementById("promptList");
 promptList.innerHTML = "";
 for (let name in prompts) {
  let div = document.createElement("div");
  div.innerHTML = `<strong>${name}:</strong> <button onclick="previewPrompt('${name}')">Previsualizar</button>`;
  promptList.appendChild(div);
 }
}

function previewPrompt(name) {
 let content = prompts[name];
 alert(content);
 copyToClipboard(content);
}

function copyToClipboard(text) {
 navigator.clipboard
  .writeText(text)
  .then(() => {
   alert("Contenido copiado al portapapeles");
  })
  .catch((err) => {
   console.error("Error al copiar al portapapeles: ", err);
  });
}

function exportData() {
 let dataStr =
  "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(prompts));
 let downloadAnchorNode = document.createElement("a");
 downloadAnchorNode.setAttribute("href", dataStr);
 downloadAnchorNode.setAttribute("download", "prompts_db.json");
 document.body.appendChild(downloadAnchorNode);
 downloadAnchorNode.click();
 downloadAnchorNode.remove();
}

function importData() {
 let input = document.createElement("input");
 input.type = "file";
 input.accept = ".json";
 input.onchange = function (event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function (e) {
   let importedData = JSON.parse(e.target.result);
   for (let key in importedData) {
    prompts[key] = importedData[key]; // Sumar los nuevos prompts a los existentes
   }
   savePrompts();
   updatePromptList();
  };
  reader.readAsText(file);
 };
 input.click();
}

function checkExport() {
 let now = new Date();
 let alertDiv = document.getElementById("downloadAlert");
 if (now.getHours() === 23 && now.getMinutes() === 59) {
  alertDiv.style.display = "block";
 } else {
  alertDiv.style.display = "none";
 }
 setTimeout(checkExport, 60000);
}

function downloadData() {
 exportData();
 document.getElementById("downloadAlert").style.display = "none";
}

updatePromptList();
checkExport();