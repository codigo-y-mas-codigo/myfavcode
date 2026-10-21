document.getElementById('elementForm').addEventListener('submit', addElement);
document.getElementById('search').addEventListener('input', searchElements);

let elements = JSON.parse(localStorage.getItem('elements')) || [];

function addElement(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const href = document.getElementById('href').value;
    const css = document.getElementById('css').value;
    const js = document.getElementById('js').value;
    const src = document.getElementById('src').value;
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();
    
    const newElement = { id, title, href, css, js, src, createdAt };
    elements.push(newElement);
    localStorage.setItem('elements', JSON.stringify(elements));
    
    displayElements();
    document.getElementById('elementForm').reset();
}

function displayElements() {
    const elementosTable = document.getElementById('elementos');
    elementosTable.innerHTML = '';
    
    elements.forEach(element => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.title}</td>
            <td>${element.href}</td>
            <td>${element.css}</td>
            <td>${element.js}</td>
            <td>${element.src}</td>
            <td>
                <button onclick="editElement('${element.id}')">Editar</button>
                <button onclick="deleteElement('${element.id}')">Eliminar</button>
            </td>
        `;
        elementosTable.appendChild(row);
    });
}

function editElement(id) {
    const element = elements.find(el => el.id === id);
    if (element) {
        document.getElementById('title').value = element.title;
        document.getElementById('href').value = element.href;
        document.getElementById('css').value = element.css;
        document.getElementById('js').value = element.js;
        document.getElementById('src').value = element.src;
        
        deleteElement(id);
    }
}

function deleteElement(id) {
    elements = elements.filter(el => el.id !== id);
    localStorage.setItem('elements', JSON.stringify(elements));
    displayElements();
}

function searchElements() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredElements = elements.filter(element => {
        return element.title.toLowerCase().includes(query) ||
               element.href.toLowerCase().includes(query) ||
               element.css.toLowerCase().includes(query) ||
               element.js.toLowerCase().includes(query) ||
               element.src.toLowerCase().includes(query);
    });
    displayElements(filteredElements);
}

function displayElements(filteredElements = elements) {
    const elementosTable = document.getElementById('elementos');
    elementosTable.innerHTML = '';
    
    filteredElements.forEach(element => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.title}</td>
            <td>${element.href}</td>
            <td>${element.css}</td>
            <td>${element.js}</td>
            <td>${element.src}</td>
            <td>
                <button onclick="editElement('${element.id}')">Editar</button>
                <button onclick="deleteElement('${element.id}')">Eliminar</button>
            </td>
        `;
        elementosTable.appendChild(row);
    });
}

function downloadJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elements));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "elements.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

document.addEventListener('DOMContentLoaded', displayElements);
