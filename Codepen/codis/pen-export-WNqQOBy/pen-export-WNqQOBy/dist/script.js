const searchInput = document.getElementById("customSearch");
const filterButtons = document.querySelectorAll("[value='functions'], [value='objectives'], [value='examples']");

function search() {
  const input = searchInput.value.toLowerCase();
  const sections = document.querySelectorAll("section.pb-3");

  sections.forEach((section) => {
    const funciones = section.querySelector("#funciones-item");
    const objetivos = section.querySelector("#objetivos-item");
    const ejemplos = section.querySelector("#ejemplos-item");

    const shouldShowFunction = !filterButtons[0].classList.contains("hidden") || funciones.innerText.toLowerCase().includes(input);
    const shouldShowObjective = !filterButtons[1].classList.contains("hidden") || objetivos.innerText.toLowerCase().includes(input);
    const shouldShowExample = !filterButtons[2].classList.contains("hidden") || ejemplos.innerText.toLowerCase().includes(input);

    section.style.display = shouldShowFunction || shouldShowObjective || shouldShowExample ? "block" : "none";
  });
}

function resetFilters() {
  filterButtons.forEach((button) => {
    button.classList.remove("hidden");
  });
  search();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.target.classList.toggle("hidden");
    search();
  });
});

searchInput.addEventListener("input", search);