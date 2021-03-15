/*
 * @Author: Jecyu
 * @Date: 2021-03-10 21:50:31
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-15 14:58:27
 * @FilePath: /examples/4-vue/vue2Cli/src/utils/myRouter.js
 * @Description:
 */
import link from "@/utils/my-router-link";
import MyRouterView from "@/utils/my-router-view";

class MyRouter {
  constructor(options) {
    this.routes = options.routes || [];
    this.mode = options.mode || "hash"; // 模式 hash || history
  }
  push() {}
}

MyRouter.install = function(Vue, options) {
  console.log("options ->", options);

  // 全局混入
  Vue.mixin({
    beforeCreate() {
      Object.defineProperty(this, "$location", {
        get() {
          return window.location;
        },
      });

      // 将 router 实例注入到每个子组件
      if (this.$options && this.$options.router) {
        // 根组件
        this._router = this.$options.router;
      } else {
        this._router = this.$parent && this.$parent._router; // 子组件
      }

      // 当前实例添加 $router 实例
      Object.defineProperty(this, "$myRouter", {
        get() {
          return this._router;
        },
      });

      // 为当前实例添加 $route 属性
      Object.defineProperty(this, "$myRoute", {
        get() {
          return this._router.current;
        },
      });

      // 注册全局组件
      Vue.component("my-router-link", link);
      Vue.component(MyRouterView.name, MyRouterView);
    },
  });
};

export default MyRouter;
