/*
 * @Author: Jecyu
 * @Date: 2021-03-16 11:16:36
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-22 22:05:08
 * @FilePath: /examples/7-vue/vue2Cli/src/plugins/myRouter/HashRouter.js
 * @Description:
 */
// import { getProperty } from "./Utils";
export default class HashRouter {
  constructor(router) {
    this.router = router; // 存储 MyRouter 对象
  }

  init() {
    this.createRoute(); // 页面首次加载时，判断当前路由
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }

  handleHashChange() {
    this.createRoute();
  }

  createRoute() {
    let path = location.hash.slice(1) ? location.hash.slice(1) : "/";
    let route = this.router.routesMap.pathMap[path];
    // 更新当前路由
    this.router.current = {
      name: route.name || "",
      meta: route.meta || {},
      path: route.path || "",
      query: location.query || {},
      params: location.params || {},
      fullPath: location.href,
      component: route.component, // 路由组件
    };
  }

  push(params) {
    window.location.href = this.getUrl(params);
  }

  replace() {}

  go() {}

  /**
   * @description: 动态导航方法可以是字符串，也可以是描述地址的对象
   * @param {*} path
   * @return {*}
   */
  getUrl(params) {
    let path = "";
    if (Object.prototype.toString.call(params) == "[object String]") {
      path = params;
    } else if (params.name || params.path) {
      path = params.name ? params.name : params.path;
    }
    const fullPath = window.location.href;
    const pos = fullPath.indexOf("#");
    const p = pos > 0 ? fullPath.slice(0, pos) : fullPath;
    return `${p}#/${path}`;
  }
}
