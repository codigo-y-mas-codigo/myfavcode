new Vue({
 el: "#app",
 data: {
  currentDay: 1,
  progressBarWidth: "0%",
  daysContent: [
   {
    day: 1,
    lesson:
     ' <p><strong>Día 1: Define tu audiencia objetivo y los objetivos de tu infoproducto.</strong></p>          <ul>            <li>Investiga a tu audiencia potencial, incluyendo sus necesidades, deseos y problemas que tu infoproducto puede resolver.</li>            <li>Establece objetivos claros para tu infoproducto, como la cantidad de ventas que deseas alcanzar, la cantidad de personas a las que deseas llegar, etc.</li>          </ul>          <p><strong>Recursos adicionales:</strong><br><a ref="https://www.example.com">Sitio web</a></p>'
   },
   {
    day: 2,
    lesson:
     "<strong>Día 2: Elige el formato de tu infoproducto y planifica el contenido que incluirás.</strong><br><br> Considera diferentes formatos como ebooks, cursos en línea, webinars, etc., y elige el que mejor se adapte a tu audiencia y objetivos."
   },
   {
    day: 3,
    lesson:
     "**Día 3: Planifica el contenido que incluirás en tu infoproducto, dividiéndolo en secciones o módulos y definiendo los temas que abordarás en cada uno.**"
   },
   {
    day: 4,
    lesson:
     "**Día 4: Crea un esquema detallado del contenido y diseña la estructura del infoproducto.**\n\n* Crea un esquema detallado del contenido de tu infoproducto, organizando la información de manera lógica y coherente.\n* Diseña la estructura del infoproducto, incluyendo la introducción, los capítulos o módulos principales, y la conclusión."
   },
   {
    day: 5,
    lesson:
     "**Día 5: Diseña los materiales y recursos que acompañarán a tu infoproducto, como plantillas, checklists, hojas de trabajo, etc.**"
   }
   // Más días aquí...
  ]
 },
 computed: {
  currentDayText() {
   return `Día ${this.currentDay}`;
  },
  currentLessonText() {
   return this.daysContent[this.currentDay - 1].lesson;
  }
 },
 methods: {
  nextDay() {
   if (this.currentDay < 30) {
    this.currentDay++;
    this.saveProgress();
    this.updateProgressBar();
   } else if (this.currentDay === 30) {
    this.finishProgram();
   }
  },
  prevDay() {
   if (this.currentDay > 1) {
    this.currentDay--;
    this.saveProgress();
    this.updateProgressBar();
   }
  },
  saveProgress() {
   localStorage.setItem("currentDay", this.currentDay);
  },
  loadProgress() {
   const savedDay = localStorage.getItem("currentDay");
   if (savedDay) {
    this.currentDay = parseInt(savedDay, 10);
    this.updateProgressBar();
   }
  },
  updateProgressBar() {
   this.progressBarWidth = `${(this.currentDay / 30) * 100}%`;
  },
  finishProgram() {
   // Efecto de globos y confeti al finalizar
   alert("¡Felicidades! Has completado el programa de 30 días.");
  },
  goToDay(day) {
   this.currentDay = day;
   this.saveProgress();
   this.updateProgressBar();
  }
 },
 mounted() {
  this.loadProgress();
 }
});