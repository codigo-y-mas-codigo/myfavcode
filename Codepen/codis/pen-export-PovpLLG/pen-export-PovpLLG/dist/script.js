const vm = new Vue({
  el: "#app",
  data: {
    group: [
      {
        title: 'Adults',
        subTitle: '',
        value: 2
      },
      {
        title: 'Seniors',
        subTitle: '65+ with ID',
        value: 0
      },
       {
        title: 'Students',
        subTitle: 'with ID',
        value: 0
      },
    ],
    TAB: 0,
    Tabs: ['Today', 'Tomorrow', 'Other']
  },
  computed: {
    total() {
      return this.group.reduce((acc, it) => acc+it.value, 0)
    }
  },
  methods: {
    plus(idx) {
      this.group[idx].value += 1
    },
    minus(idx) {
      this.group[idx].value && (this.group[idx].value -= 1)
    }
  }
});