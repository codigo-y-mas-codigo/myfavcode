# Cómo Crear una Galería de Videos Responsiva y Minimalista

A Pen created on CodePen.

Original URL: [https://codepen.io/luisangelmaciel/pen/qBGqQRe](https://codepen.io/luisangelmaciel/pen/qBGqQRe).

Descripción del Código
Este proyecto consiste en una galería de videos responsiva que carga automáticamente la data de los videos desde un array en JavaScript. La galería está diseñada con un enfoque minimalista, moderno y limpio, similar a YouTube. A continuación, se detalla lo que hace cada parte del código:

HTML:

Define la estructura básica de la página con un contenedor principal que incluye un título y un espacio para la galería de videos.
Se incluye un archivo CSS externo (styles.css) para los estilos y un archivo JavaScript (scripts.js) para la funcionalidad dinámica.
CSS:

Establece un diseño limpio y moderno con un fondo claro y una caja con sombra para el contenedor.
Utiliza una cuadrícula (grid) para organizar los videos de manera responsiva, ajustándose automáticamente al tamaño de la pantalla.
Cada video se presenta en una tarjeta con bordes redondeados y sombra, y se asegura que los videos sean adaptables al tamaño del contenedor.
JavaScript:

Espera a que el DOM esté completamente cargado antes de ejecutar.
Define un array de objetos que contiene la URL y el título de cada video.
Crea dinámicamente los elementos HTML necesarios (contenedor del video y título) para cada video en el array y los inserta en la galería.
Hace que los videos sean reproducibles mediante el atributo controls en el elemento video.