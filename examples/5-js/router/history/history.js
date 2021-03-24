/*
 * @Author: Jecyu
 * @Date: 2021-03-07 08:33:03
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-07 09:16:36
 * @FilePath: /examples/3-js/router/history/history.js
 * @Description:
 */
export default class JSHistoryRouter {
  constructor(routerView) {
    this.routerView = routerView;
  }

  init() {
    let that = this;
    let linkList = document.querySelectorAll("a[href]");
    linkList.forEach((el) =>
      el.addEventListener("click", function(e) {
        e.preventDefault(); // 阻止 <a> 默认跳转事件
        history.pushState(null, "", el.getAttribute("href")); // 获取 URL，跳转
        that.routerView.innerHTML = "当前路由" + location.pathname;
      })
    );

    // 监听 URL 改变，不能监听到 pushState、replaceState和 a 标签变化，主要用于监听 history.go()、history.back()、history.forword() 事件
    window.addEventListener("popstate", (e) => {
      console.log('e ->', e);
      this.routerView.innerHTML = "当前路由" + location.pathname;
    });
  }

  push(path) {
    history.pushState(null, "", path);
    this.routerView.innerHTML = "当前路由" + path;
  }

  replace(path) {
    history.replaceState(null, "", path);
    this.routerView.innerHTML = "当前路由" + path;
  }
}
