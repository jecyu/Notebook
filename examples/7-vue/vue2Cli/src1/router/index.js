/*
 * @Author: Jecyu
 * @Date: 2021-03-10 21:19:28
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-03-28 11:05:24
 * @FilePath: /examples/7-vue/vue2Cli/src/router/index.js
 * @Description:
 */
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
const routes = [
  { path: "/", component: { template: "<div>首页</div>" } },
  { path: "/home", component: HelloWorld },
  {
    path: "/cart",
    component: { template: "<div>cart</div>" },
  },
  {
    path: "/classify",
    component: { template: "<div>classify</div>" },
  },
];

// import VueRouter from "vue-router";
// Vue.use(VueRouter);
// const router = new VueRouter({
//   mode: "",
//   routes,
// });

import MyRouter from "@/plugins/myRouter";
Vue.use(MyRouter);
const router = new MyRouter({
  mode: "hash",
  routes,
});

export default router;
