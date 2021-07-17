import Vue from "vue";
// import App from './App.vue'

Vue.config.productionTip = false;

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// 使用 Runtime + Complier 版本

new Vue({
  el: "#app",
  // template
  data() {
    return {
      message: "Hello Vue!",
    };
  },
  mounted() {
    console.log(this.message);
    console.log(this._data.message);
  },
});
