new Vue({
 el: "#app",
 data: {
  currentDay: 1,
  progressBarWidth: "0%",
  daysContent: [
   // Puedes agregar más contenido para cada día
   {
    day: 1,
    lesson: "Texto de la lección para el día 1..."
   },
   {
    day: 2,
    lesson: "Texto de la lección para el día 2..."
   },
   {
    day: 3,
    lesson: "Texto de la lección para el día 3..."
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