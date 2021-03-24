/*
 * @Author: Jecyu
 * @Date: 2021-03-10 21:50:31
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-22 22:20:41
 * @FilePath: /examples/7-vue/vue2Cli/src/plugins/myRouter/index.js
 * @Description:
 */
import link from "./my-router-link";
import MyRouterView from "./my-router-view.js";
import { createMap } from "./Utils.js";
import HashRouter from "./HashRouter";
/**
 * @description: 
 * 接收 MyRouter 实例化时传入的选项 options，数组类型的路由表 routes、代表当前路由模式的 mode

  vue-router 使用时，不仅可以使用 path 匹配，还可以通过 name 匹配，路由表 routes 不方便路由匹配，将路由表转换成 key:value 的形式，key 为路由表 routes 配置的 path 或 name

  为了区分路由的两种模式，创建 HashRouter 类、HistoryRouter 类，合称为 Router 类，新增 history 属性存储实例化的 Router 类

  定义 current 属性，存储目标路由信息，通过 \$myRoute 挂载到每一个实例上

  定义 push()、replace()、go()方法
 * @param {*}
 * @return {*}
 */
class MyRouter {
  constructor(options) {
    this.routes = options.routes || [];
    this.mode = options.mode || "hash"; // 模式 hash || history
    this.routesMap = createMap(this.routes); // 路由表装换成 key:value 形式
    this.history = null; // 存储实例化 HashRouter 或 HistoryRouter
    this.current = {
      // 记录当前路由
      name: "",
      meta: {},
      path: "/",
      hash: "",
      query: {},
      params: {},
      fullPath: "",
      component: null,
    };
    // 根据路由模式，实例化 HashRouter 类、HistoryRouter 等
    switch (options.mode) {
      case "hash":
        this.history = new HashRouter(this);
        break;
      case "history":
        // this.history = new HistoryRouter(this);
        break;
      default:
        this.history = new HashRouter(this);
        break;
    }
    this.init();
  }
  init() {
    this.history.init();
  }
  push(params) {
    this.history.push(params);
  }

  replace(params) {
    this.history.replace(params);
  }

  /**
   * 全局路由导航 brefore
   */
  beforeEach() {
    // this.beforeHooks.push()
  }
  /**
   * 全局路由导航 after
   */
  afterEach() {
    // this.afterHooks.push(fn)
  }
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
