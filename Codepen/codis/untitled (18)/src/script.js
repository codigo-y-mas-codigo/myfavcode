
<!DOCTYPE html>
<html lang="es">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Convertir texto</title>
</head>

<body>
 <input type="text" id="textoEntrada" placeholder="Ingrese su texto aquí" oninput="convertirTexto()">
 <p id="textoResultado" onclick="copiarTexto()"></p>

 <script>
  function convertirTexto() {
   // Obtener el texto de entrada
   var textoEntrada = document.getElementById("textoEntrada").value.toLowerCase();
   // Reemplazar caracteres especiales
   textoEntrada = textoEntrada.replace(/[áäâà]/g, 'a');
   textoEntrada = textoEntrada.replace(/[éëêè]/g, 'e');
   textoEntrada = textoEntrada.replace(/[íïîì]/g, 'i');
   textoEntrada = textoEntrada.replace(/[óöôò]/g, 'o');
   textoEntrada = textoEntrada.replace(/[úüûù]/g, 'u');
   textoEntrada = textoEntrada.replace(/[ñ]/g, 'n');
   textoEntrada = textoEntrada.replace(/[{,:;.¨'+/\!?|´\{\[\]\(\)\}\*]/g, '');
   // Reemplazar espacios dobles con un guion medio
   textoEntrada = textoEntrada.replace(/\s+/g, '-');
   // Mostrar el texto convertido
   document.getElementById("textoResultado").textContent = textoEntrada;
  }

  function copiarTexto() {
   var resultado = document.getElementById("textoResultado");
   // Seleccionar el contenido del párrafo
   var seleccion = window.getSelection();
   var rango = document.createRange();
   rango.selectNodeContents(resultado);
   seleccion.removeAllRanges();
   seleccion.addRange(rango);
   // Copiar el contenido seleccionado
   document.execCommand("copy");
   // Desseleccionar
   seleccion.removeAllRanges();
   // Mostrar un mensaje de copiado (opcional)
   alert("Texto copiado al portapapeles");
  }
 </script>
</body>

</html>