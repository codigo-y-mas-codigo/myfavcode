// scripts.js
document.addEventListener("DOMContentLoaded", function () {
 const videos = [
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/Escena%20The%20willoughbys%20bebe%20sin%20amor.mp4",
   title: "Bebe sin amor"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/Escena%20The%20willoughbys%20robo%20de%20comida%20todo%20es%20tu%20culpa.mp4",
   title: "Todo es culpa tuya"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/Reaccion%20The%20willoughby%20wow%20de%20bebe.mp4",
   title: "Reacción"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/The%20willougbys%20Yo%20soy%20tu%20padre%20y%20la%20mujer%20que%20has%20insultado%20con%20tu%20nacimiento%20.mp4",
   title: "UInsultado a tu madre con tu nacimiento"
  },

  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/he%20willoughbys%20cuando%20digo%20anticuada%20me%20refiero%20a%20que%20es%20muy%20muy%20anticuada.mp4	",
   title: "Es muy anticuada"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/The%20willoughbys%20El%20gato%20lamiendose%20su%20pene.mp4",
   title: "Lamiendose su vrga"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/The%20willoughbys%20Mirenlos%20gente%20aburrida%20con%20su%20vida%20aburrida%20no%20estoy%20juzgando%20bueno%20si.mp4	",
   title: ""
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/The%20willoughbys%20nunca%20le%20digas%20a%20tu%20madre%20que%20hacer%20y%20que%20no.mp4	",
   title: "Nunca digas que soy tu madre"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/The%20willoughbys%20si%20buscas%20amor%20te%20pido%20lo%20busques%20en%20otra%20parte%20.mp4	",
   title: "Rapido"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/The%20willoughbys%20voy%20a%20morir%20de%20hambre.mp4	",
   title: "Voy a morir de hambre"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/The%20Willoughbys/The%20willoughbytodo%20es%20culpa%20tuya.mp4",
   title: "Todo es culpa tuya"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/Dragvesti%20y%20Drag%20Queen%20Studio.mp4	",
   title: "Drag Queen Studio"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/Dragvesti%20y%20Drag%20Queen%20Studio.webm	",
   title: "Drag Queen Studio Argentina"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/iris-xc-la-mas-draga-travel.gif	",
   title: "Iris la mas draga"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/iris-xc-la-mas-draga-travel.mp4",
   title: "Iris la mas draga"
  },
  {
   url:
    "https://luisangelmaciel.github.io/video/iris-xc-la-mas-draga-travel.webm",
   title: "Iris la mas draga"
  },
  { url: "https://luisangelmaciel.github.io/video/sesion.mp4	", title: "Sesion" }
 ];

 const gallery = document.getElementById("video-gallery");

 videos.forEach((video) => {
  const videoItem = document.createElement("div");
  videoItem.classList.add("video-item");

  const videoElement = document.createElement("video");
  videoElement.setAttribute("controls", "");
  videoElement.src = video.url;

  const titleElement = document.createElement("h2");
  titleElement.textContent = video.title;

  videoItem.appendChild(videoElement);
  videoItem.appendChild(titleElement);

  gallery.appendChild(videoItem);
 });
});