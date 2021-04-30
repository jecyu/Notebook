import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import users from "@/stores/users";
import "@/styles/global.css"

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: { users },
});

import VueRouter from "vue-router";
import routes from "@/routes/index";
Vue.use(VueRouter);

const router = new VueRouter({ routes });

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
