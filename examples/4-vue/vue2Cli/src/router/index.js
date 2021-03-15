/*
 * @Author: Jecyu
 * @Date: 2021-03-10 21:19:28
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-15 14:33:06
 * @FilePath: /examples/4-vue/vue2Cli/src/router/index.js
 * @Description:
 */
import Vue from "vue";
const routes = [
  {
    path: "/foo",
    component: { template: "<div>foo</div>" },
  },
  {
    path: "/bar",
    component: { template: "<div>bar</div>" },
  },
];

// import VueRouter from "vue-router";
// Vue.use(VueRouter);
// const router = new VueRouter({
//   mode: "",
//   routes,
// });

import MyRouter from "@/utils/myRouter"
Vue.use(MyRouter);
const router = new MyRouter({
  mode: "",
  routes,
});

export default router;
