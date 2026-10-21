document.addEventListener("DOMContentLoaded", function () {
 let prompts = JSON.parse(localStorage.getItem("prompts")) || [];

 function renderPrompts(filteredPrompts = prompts) {
  const recordsDiv = document.getElementById("records");
  recordsDiv.innerHTML = "";
  filteredPrompts.forEach((prompt, index) => {
   const card = document.createElement("div");
   card.className = "card mb-3";
   card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${prompt.name}</h5>
                    <p class="card-text">${prompt.description}</p>
                    <button class="btn btn-primary" onclick="editPrompt(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="deletePrompt(${index})">Eliminar</button>
                    <button class="btn btn-primary" onclick="toggleFavorite(${index})">${
    prompt.favorite ? "Quitar de Favoritos" : "Agregar a Favoritos"
   }</button>
                </div>
            `;
   recordsDiv.appendChild(card);
  });
 }

 function toggleFavorite(index) {
  prompts[index].favorite = !prompts[index].favorite;
  localStorage.setItem("prompts", JSON.stringify(prompts));
  renderPrompts();
 }

 document.getElementById("search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filteredPrompts = prompts.filter(
   (prompt) =>
    prompt.name.toLowerCase().includes(searchTerm) ||
    prompt.description.toLowerCase().includes(searchTerm)
  );
  renderPrompts(filteredPrompts);
 });

 document.getElementById("filter").addEventListener("change", function () {
  const filterValue = this.value;
  let filteredPrompts = prompts;
  if (filterValue !== "") {
   filteredPrompts = prompts.filter((prompt) => prompt.type === filterValue);
  }
  renderPrompts(filteredPrompts);
 });

 document
  .getElementById("promptForm")
  .addEventListener("submit", function (event) {
   event.preventDefault();
   const name = document.getElementById("name").value;
   const description = document.getElementById("description").value;
   const type = document.querySelector('input[name="type"]:checked').value;
   prompts.push({ name, description, type, favorite: false });
   localStorage.setItem("prompts", JSON.stringify(prompts));
   $("#addPromptModal").modal("hide");
   renderPrompts();
   this.reset();
  });

 renderPrompts();
});

function editPrompt(index) {
 // Implementación para editar un prompt
 console.log("Edit prompt", index);
}

function deletePrompt(index) {
 // Implementación para eliminar un prompt
 console.log("Delete prompt", index);
}