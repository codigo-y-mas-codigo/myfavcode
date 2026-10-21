// Función para agregar un nuevo registro
function agregarRegistro(event) {
 event.preventDefault();

 const cantidad = parseFloat(document.getElementById("cantidad").value);
 const intensidad = document.getElementById("intensidad").value;
 const producto = parseFloat(document.getElementById("producto").value);
 const fecha = new Date().toLocaleString();

 const registro = { cantidad, intensidad, producto, fecha };

 let registros = JSON.parse(localStorage.getItem("registros")) || [];
 registros.push(registro);
 localStorage.setItem("registros", JSON.stringify(registros));

 mostrarRegistros();
 document.getElementById("registroForm").reset();
}

// Función para mostrar los registros almacenados
function mostrarRegistros() {
 const registrosDiv = document.getElementById("registros");
 registrosDiv.innerHTML = "";

 let registros = JSON.parse(localStorage.getItem("registros")) || [];
 let totalLeves = 0;
 let totalModerados = 0;
 let totalIntensos = 0;
 let totalProducto = 0;

 registros.forEach((registro, index) => {
  registrosDiv.innerHTML += `
            <div class="registro">
                <p><strong>Fecha:</strong> ${registro.fecha}</p>
                <p><strong>Cantidad de Fumes:</strong> ${registro.cantidad}</p>
                <p><strong>Intensidad:</strong> ${registro.intensidad}</p>
                <p><strong>Producto Utilizado:</strong> ${registro.producto}</p>
                <button onclick="editarRegistro(${index})">Editar</button>
                <button onclick="eliminarRegistro(${index})">Eliminar</button>
            </div>
        `;

  switch (registro.intensidad) {
   case "leve":
    totalLeves += parseFloat(registro.cantidad);
    break;
   case "moderado":
    totalModerados += parseFloat(registro.cantidad);
    break;
   case "intenso":
    totalIntensos += parseFloat(registro.cantidad);
    break;
  }

  totalProducto += parseFloat(registro.producto);
 });

 registrosDiv.innerHTML += `
        <div>
            <h3>Totales:</h3>
            <p><strong>Total de Fumes Leves:</strong> ${totalLeves.toFixed(
             2
            )}</p>
            <p><strong>Total de Fumes Moderados:</strong> ${totalModerados.toFixed(
             2
            )}</p>
            <p><strong>Total de Fumes Intensos:</strong> ${totalIntensos.toFixed(
             2
            )}</p>
            <p><strong>Total del Producto Utilizado:</strong> ${totalProducto.toFixed(
             2
            )}</p>
        </div>
    `;
}

// Función para editar un registro
function editarRegistro(index) {
 let registros = JSON.parse(localStorage.getItem("registros")) || [];
 const registro = registros[index];

 const nuevaCantidad = parseFloat(
  prompt("Ingrese la nueva cantidad de fumes:", registro.cantidad)
 );
 const nuevaIntensidad = prompt(
  "Ingrese la nueva intensidad (leve, moderado, intenso):",
  registro.intensidad
 );
 const nuevoProducto = parseFloat(
  prompt("Ingrese el nuevo producto utilizado:", registro.producto)
 );

 if (
  !isNaN(nuevaCantidad) &&
  !isNaN(nuevoProducto) &&
  ["leve", "moderado", "intenso"].includes(nuevaIntensidad)
 ) {
  registro.cantidad = nuevaCantidad;
  registro.intensidad = nuevaIntensidad;
  registro.producto = nuevoProducto;

  registros[index] = registro;
  localStorage.setItem("registros", JSON.stringify(registros));

  mostrarRegistros();
 } else {
  alert("Por favor, ingrese valores válidos.");
 }
}

// Función para eliminar un registro
function eliminarRegistro(index) {
 if (confirm("¿Seguro que quieres eliminar este registro?")) {
  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.splice(index, 1);
  localStorage.setItem("registros", JSON.stringify(registros));
  mostrarRegistros();
 }
}

// Mostrar los registros al cargar la página
mostrarRegistros();
