new Vue({
 el: "#app",
 data: {
  userName: "",
  userNameInput: "",
  currentDay: 1,
  progressBarWidth: "0%",
  startDate: "",
  endDate: "",
  daysCompleted: [],
  companyName: "",
  objective: "",
  mission: "",
  daysContent: [
   {
    day: 1,
    lesson: "<p><strong>Texto de la lección para el día 1...</strong></p>"
   },
   {
    day: 2,
    lesson: "<p><strong>Texto de la lección para el día 2...</strong></p>"
   },
   {
    day: 3,
    lesson: "<p><strong>Texto de la lección para el día 3...</strong></p>"
   }
   // Añadir más días según sea necesario
  ],
  modalVisible: false,
  modalType: "",
  resetsCount: 0,
  isDarkMode: false
 },
 computed: {
  currentDayText() {
   return `Día ${this.currentDay}`;
  },
  currentLessonText() {
   return this.daysContent[this.currentDay - 1]?.lesson || "";
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
  completeDay(completed) {
   if (completed) {
    if (!this.daysCompleted.includes(this.currentDay)) {
     this.daysCompleted.push(this.currentDay);
     localStorage.setItem("daysCompleted", JSON.stringify(this.daysCompleted));
    }
    this.nextDay();
   } else {
    this.extendEndDate();
   }
  },
  extendEndDate() {
   const currentEndDate = new Date(localStorage.getItem("endDate"));
   const newEndDate = new Date(
    currentEndDate.setDate(currentEndDate.getDate() + 1)
   );
   localStorage.setItem("endDate", newEndDate.toDateString());
   this.endDate = newEndDate.toDateString();
  },
  updateProgressBar() {
   this.progressBarWidth = `${(this.currentDay / 30) * 100}%`;
  },
  isDayCompleted(day) {
   return this.daysCompleted.includes(day);
  },
  goToDay(day) {
   this.currentDay = day;
   this.updateProgressBar();
  },
  registerUser() {
   this.userName = this.userNameInput;
   this.startDate = new Date().toDateString();
   const endDate = new Date();
   endDate.setDate(endDate.getDate() + 29); // 30 days including today
   this.endDate = endDate.toDateString();
   this.saveProgress();
  },
  saveProgress() {
   localStorage.setItem("userName", this.userName);
   localStorage.setItem("currentDay", this.currentDay);
   localStorage.setItem("startDate", this.startDate);
   localStorage.setItem("endDate", this.endDate);
   localStorage.setItem("companyName", this.companyName);
   localStorage.setItem("objective", this.objective);
   localStorage.setItem("mission", this.mission);
   localStorage.setItem("isDarkMode", JSON.stringify(this.isDarkMode));
  },
  loadProgress() {
   this.userName = localStorage.getItem("userName") || "";
   this.currentDay = Number(localStorage.getItem("currentDay")) || 1;
   this.startDate = localStorage.getItem("startDate") || "";
   this.endDate = localStorage.getItem("endDate") || "";
   this.companyName = localStorage.getItem("companyName") || "";
   this.objective = localStorage.getItem("objective") || "";
   this.mission = localStorage.getItem("mission") || "";
   this.daysCompleted = JSON.parse(localStorage.getItem("daysCompleted")) || [];
   this.resetsCount = Number(localStorage.getItem("resetsCount")) || 0;
   this.isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || false;
   this.updateProgressBar();
  },
  editUser() {
   this.userNameInput = this.userName;
   this.userName = "";
  },
  showModal(type) {
   this.modalType = type;
   this.modalVisible = true;
  },
  closeModal() {
   this.modalVisible = false;
  },
  downloadData() {
   const data = {
    userName: this.userName,
    startDate: this.startDate,
    endDate: this.endDate,
    currentDay: this.currentDay,
    companyName: this.companyName,
    objective: this.objective,
    mission: this.mission,
    daysCompleted: this.daysCompleted,
    resetsCount: this.resetsCount,
    timestamp: new Date().toDateString()
   };
   const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
   )}`;
   const dlAnchorElem = document.createElement("a");
   dlAnchorElem.setAttribute("href", dataStr);
   dlAnchorElem.setAttribute("download", "program_data.json");
   dlAnchorElem.click();
  },
  resetProgram() {
   this.showModal("reset");
  },
  confirmReset() {
   localStorage.clear();
   this.userName = "";
   this.userNameInput = "";
   this.currentDay = 1;
   this.progressBarWidth = "0%";
   this.startDate = "";
   this.endDate = "";
   this.daysCompleted = [];
   this.companyName = "";
   this.objective = "";
   this.mission = "";
   this.resetsCount++;
   localStorage.setItem("resetsCount", this.resetsCount);
   this.closeModal();
  },
  toggleDarkMode() {
   this.isDarkMode = !this.isDarkMode;
   document.body.classList.toggle("dark", this.isDarkMode);
   localStorage.setItem("isDarkMode", JSON.stringify(this.isDarkMode));
  }
 },
 mounted() {
  this.loadProgress();
  document.body.classList.toggle("dark", this.isDarkMode);
 }
});