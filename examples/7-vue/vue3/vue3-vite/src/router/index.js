import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";

const router = createRouter({
  history: createWebHashHistory(), // createWebHashHistory 为哈希模式的路由，如果需要选择 history 模式，可以用 createWebHistory 方法。
  routes: [
    // routes 属性和 vue-router 3.0 的配置一样，通过数组对象的形式，配置路由对应展示的组件
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
  ],
});

export default router;
