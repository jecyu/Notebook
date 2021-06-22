import { createApp } from "vue";
import App from "./App.vue";
import router from "../src/router";

// 生成 app 实例
const app = createApp(App);
// 通过 use 引入路由实例
app.use(router);
// 将实例挂载到 #app 节点上
app.mount("#app");

