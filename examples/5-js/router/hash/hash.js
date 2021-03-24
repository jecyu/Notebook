/*
 * @Author: Jecyu
 * @Date: 2021-03-07 08:33:03
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-07 08:44:55
 * @FilePath: /examples/3-js/router/hash/hash.js
 * @Description:
 */
export default class JSHashRouter {
  constructor(routerView) {
    this.routerView = routerView;
  }

  /**
   * @description: 首次页面渲染时，不会触发 window.onhashChange()，根据当前 hash 值，渲染 routerView。监听 window.onhashchange() 事件，一旦事件触发，重新渲染 routerView。
   * @param {*}
   * @return {*}
   */
  init() {
    // 首次渲染如果不存在 hash，那么重定向到 #/，若存在 hash 值，就渲染对应的 UI
    if (!window.location.hash) {
      window.location.hash = "#/";
    } else {
      this.routerView.innerHTML = "当前路由" + window.location.hash;
    }

    // 监听 hash 值改变
    window.addEventListener("hashchange", () => {
      this.routerView.innerHTML = "当前路由" + window.location.hash;
    });
  }

  push(path) {
    window.location.hash = path;
  }
}
