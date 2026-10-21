const quotes = [
 // Chistes
 "¿Por qué Pikachu siempre está sonriendo y feliz? ¡Porque vive enchufado a la felicidad!",
 "¿Cuál es el Pokémon que siempre está durmiendo? ¡Snoozeleaf!",
 "¿Qué hace un Magikarp en el espacio? ¡¡¡¡¡¡Splash!!!!!!... Bueno, técnicamente, nada.",
 "¿Qué le dijo Charmander a la llama? ¡Acércate que te voy a dar calor!",
 "¿Cuál es el Pokémon más peligroso del mundo? Venusauro. Te ataca con un bulbasaur.",
 "¿Por qué Psyduck siempre tiene dolor de cabeza? Porque tiene un cerebro muy pequeñito.",
 "¿Por qué los entrenadores Pokémon nunca tienen problemas para escuchar música? Porque siempre llevan sus Earphones.",
 "¿Qué hace un Grimer en el espacio? ¡Mugre espacial!",
 "¿Cómo se llama el Pokémon que siempre está en el centro de la fiesta? ¡Pikachu!",
 "¿Sabías que los Jigglypuff tienen una carrera de canto los viernes por la noche? ¡Es una verdadera batalla de ronquidos!",
 "¿Por qué los Pokémon de agua nunca tienen sed? Porque siempre están hydrated.",
 "¿Por qué los entrenadores Pokémon son buenos para resolver problemas? Porque siempre buscan la Raichu solución.",
 "¿Cuál es el Pokémon más travieso? Snorlax, porque siempre está sleeping around.",
 "¿Cuál es el Pokémon más adecuado para hacer ejercicio? ¡Squirtle, porque siempre se mantiene en forma!",
 "¿Qué le dijo Pikachu a Ash cuando llegaron a la cima de la montaña? ¡Pika-¡Vista increíble!-chu.",
 "¿Por qué los entrenadores Pokémon son tan buenos en matemáticas? Porque conocen el addition y la subtraction.",
 "¿Cuál es el Pokémon más malvado? ¡Tenta-Cruel!",
 "¿Por qué los entrenadores Pokémon llevan paraguas? ¡Porque siempre pronostican un Chance of Rainchu!",
 "¿Por qué los Pokémon no pueden jugar escondite? Porque siempre Pikachu.",
 // Acertijos
 "Soy un Pokémon que vive en el agua, tengo una gran concha en mi espalda y mi nombre suena como una piedra preciosa. ¿Quién soy?\n**Respuesta:** Squirtle.",
 "Soy un Pokémon que se parece a un pájaro, pero no vuelo. Tengo una gran cresta en la cabeza y mi nombre suena como una canción. ¿Quién soy?\n**Respuesta:** Pidgeotto.",
 "Soy un Pokémon que parece un dragón, pero soy de tipo volador. Mi nombre suena como una piedra brillante. ¿Quién soy?\n**Respuesta:** Aerodactyl.",
 "Soy un Pokémon eléctrico con forma de rata. Mi nombre suena como algo que hace un ratón. ¿Quién soy?\n**Respuesta:** Pikachu.",
 "Soy un Pokémon de tipo fuego que tiene una llama en la punta de la cola. Mi nombre suena como algo que se usa para encender una vela. ¿Quién soy?\n**Respuesta:** Charmander.",
 "Soy un Pokémon que parece un gato y tengo una moneda en la frente. Mi nombre suena como algo que brilla en el cielo por la noche. ¿Quién soy?\n**Respuesta:** Meowth.",
 "Soy un Pokémon que parece un pájaro de colores brillantes. Mi nombre suena como algo que usamos para expresar felicidad. ¿Quién soy?\n**Respuesta:** Ho-Oh.",
 "Soy un Pokémon de tipo planta que tiene una flor en el centro. Mi nombre suena como una flor conocida por su fragancia. ¿Quién soy?\n**Respuesta:** Vileplume.",
 "Soy un Pokémon con forma de serpiente y tengo una joya en la frente. Mi nombre suena como algo que brilla en la oscuridad. ¿Quién soy?\n**Respuesta:** Arbok.",
 "Soy un Pokémon fantasma que se asemeja a una lámpara. Mi nombre suena como una palabra que describe algo que da luz. ¿Quién soy?\n**Respuesta:** Lampent.",
 // Frases de inspiración
 "El verdadero poder de un Pokémon no se mide por su fuerza en batalla, sino por el vínculo que comparte con su entrenador.",
 "En el universo Pokémon, cada encuentro es una oportunidad para aprender y crecer, tanto para los entrenadores como para sus compañeros Pokémon.",
 "La diversidad de Pokémon es un recordatorio de que la verdadera belleza radica en la variedad y la diferencia.",
 "El viaje de un entrenador Pokémon es un camino lleno de desafíos y aventuras, pero también de amistad y descubrimiento personal.",
 "En la región de Pokémon, la perseverancia y el trabajo duro son las llaves para alcanzar tus sueños, sin importar cuán difíciles parezcan.",
 "Cada Pokémon tiene un talento único que lo hace especial, un recordatorio de que todos tenemos algo valioso que ofrecer al mundo.",
 "En el mundo de Pokémon, la amistad y la lealtad son más fuertes que cualquier barrera o desafío.",
 "La grandeza de un entrenador Pokémon no se mide por la cantidad de medallas que ha ganado, sino por el amor y el cuidado que brinda a sus Pokémon.",
 // Mensajes generales
 "El amor está a tu alrededor, solo necesitas abrir los ojos para verlo.",
 "Tu trabajo duro será recompensado con éxito y reconocimiento.",
 "La paciencia es la clave para superar cualquier obstáculo.",
 "Hoy es un buen día para tomar decisiones importantes.",
 "No te preocupes por el dinero, pronto llegarán tiempos mejores.",
 "Recuerda siempre ser amable, incluso cuando los demás no lo sean contigo.",
 "Confía en tus instintos, te llevarán por el camino correcto.",
 "Las mejores cosas de la vida a menudo llegan cuando menos te lo esperas.",
 "No temas pedir ayuda cuando la necesites, los amigos están para apoyarte.",
 "Una sonrisa puede hacer que tu día sea mucho más brillante.",
 "El pasado ya no se puede cambiar, concéntrate en construir un mejor futuro.",
 "La perseverancia es la clave para alcanzar tus metas más grandes.",
 "No dejes que el miedo te impida alcanzar tus sueños.",
 "A veces, las mejores decisiones son las más difíciles de tomar.",
 "El amor propio es el primer paso para amar a los demás.",
 "El éxito no siempre se mide en riquezas materiales.",
 "La creatividad es tu mejor herramienta para resolver problemas.",
 "Cuida tu cuerpo y tu mente, son tus activos más valiosos.",
 "Las mejores ideas a menudo vienen cuando te relajas y dejas que tu mente divague.",
 "La gratitud transforma lo que tienes en suficiente.",
 "Las oportunidades no siempre se presentan dos veces, ¡aprovéchalas!",
 "La honestidad es la base de todas las relaciones significativas.",
 "La felicidad no depende de lo que tienes, sino de cómo percibes lo que tienes.",
 "No temas a los cambios, a menudo traen crecimiento y nuevas oportunidades.",
 "El trabajo en equipo es la clave para alcanzar metas más grandes.",
 "La vida es un viaje, disfruta del camino y aprende de cada experiencia.",
 "La mejor manera de predecir el futuro es creándolo tú mismo.",
 "La empatía es la clave para construir relaciones fuertes y significativas.",
 "A veces, perder una batalla es la única forma de ganar la guerra.",
 "La verdadera belleza está en la diversidad y la singularidad de cada individuo.",
 "Sé como un Charmander, que tu llama nunca se extinga. Mantén tu pasión ardiendo.",
 "No te duermas en tus laureles, siempre es bueno retomar el ejercicio. No seas como Snorlax, ¡levántate y muévete!",
 "Alakazam predice que te irá bien en las pruebas. Concéntrate y no divagues, como lo haría Abra evolucionando.",
 "Sé como un Jigglypuff, llena de alegría y música. Haz que tu presencia sea un canto para los demás.",
 "Mantente fuerte como un Machamp, supera los desafíos con valentía y determinación.",
 "Sé astuto como un Zoroark, utiliza tu inteligencia para superar cualquier obstáculo.",
 "Brilla con luz propia como un Ampharos, deja que tu brillo interior ilumine tu camino.",
 "Sé ágil como un Ninjask, adapta rápidamente a los cambios y sigue adelante.",
 "Sé constante como un Slowbro, avanza a tu propio ritmo pero sin detenerte.",
 "Mantén la calma en medio de la tormenta, como lo haría un Ludicolo bailando bajo la lluvia.",
 "Sé resiliente como un Shuckle, utiliza tus fortalezas incluso en situaciones difíciles.",
 "Sigue adelante con determinación, como un Furret que nunca se cansa de explorar.",
 "Sé leal como un Arcanine, apoya a tus amigos en todo momento.",
 "Sé valiente como un Scrafty, enfrenta tus miedos y demuestra tu verdadera fuerza.",
 "Sé único como un Ditto, abraza tu singularidad y deja que tu verdadero yo brille."
];

function getRandomQuote() {
 const randomIndex = Math.floor(Math.random() * quotes.length);
 document.getElementById("quote").innerText = quotes[randomIndex];
}

function share() {
 const quote = document.getElementById("quote").innerText;
 if (navigator.share) {
  navigator
   .share({
    title: "Frase Random Pokémon",
    text: quote
   })
   .catch((error) => console.error("Error al compartir", error));
 } else {
  alert("La función de compartir no está soportada en tu navegador.");
 }
}

function showAboutUs() {
 alert(
  "Somos un grupo de entusiastas de Pokémon que queremos compartir alegría y sabiduría a través de frases y chistes inspirados en el mundo Pokémon."
 );
}

function showContact() {
 alert("Puedes contactarnos en: contacto@pokemonquotes.com");
}

// Cargar una frase aleatoria al inicio
getRandomQuote();