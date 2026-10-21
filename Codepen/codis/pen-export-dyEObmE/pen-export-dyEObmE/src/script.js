new Vue({
    el: '#app',
    data: {
        userName: '',
        userNameInput: '',
        currentDay: 1,
        progressBarWidth: '0%',
        startDate: '',
        endDate: '',
        daysCompleted: [],
        companyName: '',
        objective: '',
        mission: '',
        daysContent: [
            { day: 1, lesson: 'Texto de la lección para el día 1...' },
            { day: 2, lesson: 'Texto de la lección para el día 2...' },
            { day: 3, lesson: 'Texto de la lección para el día 3...' },
            // Añadir más días según sea necesario
        ],
        modalVisible: false,
        modalType: '',
        resetsCount: 0
    },
    computed: {
        currentDayText() {
            return `Día ${this.currentDay}`;
        },
        currentLessonText() {
            return this.daysContent[this.currentDay - 1]?.lesson || '';
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
                    localStorage.setItem('daysCompleted', JSON.stringify(this.daysCompleted));
                }
                this.nextDay();
            } else {
                this.extendEndDate();
            }
        },
        extendEndDate() {
            const currentEndDate = new Date(localStorage.getItem('endDate'));
            const newEndDate = new Date(currentEndDate.setDate(currentEndDate.getDate() + 1));
            this.endDate = newEndDate.toLocaleDateString();
            localStorage.setItem('endDate', this.endDate);
        },
        saveProgress() {
            localStorage.setItem('currentDay', this.currentDay);
            localStorage.setItem('companyName', this.companyName);
            localStorage.setItem('objective', this.objective);
            localStorage.setItem('mission', this.mission);
        },
        loadProgress() {
            const savedDay = localStorage.getItem('currentDay');
            const savedCompanyName = localStorage.getItem('companyName');
            const savedObjective = localStorage.getItem('objective');
            const savedMission
