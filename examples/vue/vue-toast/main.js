import Vue from "vue";
import toast from "./src/index.js";
Vue.use(toast);

import App from "./demo/App.vue";
new Vue({
  render: h => h(App)
}).$mount("#app")