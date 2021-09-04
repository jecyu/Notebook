/*
 * @Author: Jecyu
 * @Date: 2021-03-12 23:10:50
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-03-28 13:50:51
 * @FilePath: /vue2Cli/src/plugins/myRouter/my-router-view.js
 * @Description:
 */
export default {
  name: "MyRouterView",
  functional: true, // 无状态（没有响应式数据）、没有实例（this 上下文），性能提升https://juejin.cn/post/6922641008106668045#heading-0
  // eslint-disable-next-line
  render: (createElement, { props, children, parent, data }) => {
    // console.log('parent.$myRoute.component ->', parent.$myRoute.component);
    let temp =
      parent.$myRoute && parent.$myRoute.component
        ? parent.$myRoute.component
        : "";
    
    return createElement(temp);
  },
};
