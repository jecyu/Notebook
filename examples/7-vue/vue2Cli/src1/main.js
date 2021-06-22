import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
// store.commit("increment");
// console.log('store.state.count ->', store.state.count);
import router from "@/router";

Vue.config.productionTip = false;

const app = new Vue({
  render: (h) => h(App),
  store, // 从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制，为了在 Vue 组件中访问 this.$store property
  router,
});
app.$mount("#app");
