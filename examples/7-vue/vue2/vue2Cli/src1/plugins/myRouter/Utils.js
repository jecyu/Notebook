// import router from "../router";

/*
 * @Author: Jecyu
 * @Date: 2021-03-16 11:02:12
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-22 22:06:20
 * @FilePath: /examples/7-vue/vue2Cli/src/plugins/myRouter/Utils.js
 * @Description:
 */
export const createMap = (routes) => {
  let nameMap = {}; // 以每个路由的名称创建 key value 对象
  let pathMap = {}; // 以每个路由的路径创建 key value 对象
  routes.forEach((route) => {
    let record = {
      path: route.path || "/",
      component: route.component,
      meta: route.meta || {},
      name: route.name || "",
    };
    if (route.name) {
      nameMap[route.name] = record;
    }
    if (route.path) {
      pathMap[route.path] = record;
    }
  });
  return {
    nameMap,
    pathMap,
  };
};

export const getProperty = (value) => {
  // 获取属性类型
  let Rex = /^\[object\s(.*)\]$/;
  let type = Object.prototype.toString.call(value);
  return Rex.exec(type)[1];
};
