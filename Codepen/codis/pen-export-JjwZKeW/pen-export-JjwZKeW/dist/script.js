Vue.use(VueFullscreen.default);

const vm = new Vue({
  el: "#app",
  data () {
    return {
      fullscreen: false
    }
  },
  computed: {
  },
  methods: {
    toggleFullScreen() {
      this.$refs['fullscreen'].toggle()
    }
  },
  mounted() {
  }
});