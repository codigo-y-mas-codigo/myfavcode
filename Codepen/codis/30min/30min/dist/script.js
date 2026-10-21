function likePrompt(index) {
    // Código existente que debe eliminarse
}
// Función para dar "Me gusta" a un prompt
function likePrompt(index) {
    if (!prompts[index].likes) {
        prompts[index].likes = [];
    }
    const userId = 'user123'; // Aquí debes obtener el ID único del usuario
    if (!prompts[index].likes.includes(userId)) {
        prompts[index].likes.push(userId);
    } else {
        prompts[index].likes = prompts[index].likes.filter(id => id !== userId);
    }
    localStorage.setItem('prompts', JSON.stringify(prompts));
    renderPrompts();
}

// Event Listeners
document.getElementById('buttonToggle').addEventListener('click', toggleButtons);
document.getElementById('search').addEventListener('input', renderPrompts);
document.getElementById('filter').addEventListener('change', renderPrompts);

renderPrompts();