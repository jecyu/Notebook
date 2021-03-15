/*
 * @Author: Jecyu
 * @Date: 2021-03-12 23:10:50
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-15 14:48:55
 * @FilePath: /examples/4-vue/vue2Cli/src/utils/my-router-link.js
 * @Description:
 */
export default {
  name: "MyRouterLink",
  functional: true, // 无状态（没有响应式数据）、没有实例（this 上下文），性能提升https://juejin.cn/post/6922641008106668045#heading-0
  props: {
    to: {
      // 目标导航
      type: [String, Object],
      required: true,
    },
    tag: {
      // 定义导航标签
      type: String,
      default: "a",
    },
    event: {
      // 触发事件
      type: String,
    },
  },
  render: (createElement, context) => {
    const { props, parent } = context;
    let toRoute = // 使用父组件引用获得父路由对象信息
      parent.$myRoute && parent.$myRoute.mode == "hash"
        ? `#/${props.to}`
        : `/${props.to}`;
    let on = { click: guardEvent }; // 默认已监听单击事件
    on[props.event] = (e) => {
      guardEvent(e); // 阻止导航标签的默认事件
      parent.$myRouter.push(props.to); // props.to 的值传到 router.push()
    };
    return createElement(
      props.tag,
      {
        attrs: {
          href: toRoute,
        },
        on
      },
      context.children
    );
  },
};

function guardEvent(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
}
