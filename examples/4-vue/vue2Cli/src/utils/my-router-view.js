/*
 * @Author: Jecyu
 * @Date: 2021-03-12 23:10:50
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-15 14:57:18
 * @FilePath: /examples/4-vue/vue2Cli/src/utils/my-router-view.js
 * @Description:
 */
export default {
  name: "MyRouterView",
  functional: true, // 无状态（没有响应式数据）、没有实例（this 上下文），性能提升https://juejin.cn/post/6922641008106668045#heading-0
  render: (createElement) => {
    let temp =
      parent.$myRoute && parent.$myRoute.component
        ? parent.$myRoute.component.default
        : "";
    return createElement(temp);
  },
};
