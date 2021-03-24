/*
 * @Author: Jecyu
 * @Date: 2021-03-12 23:10:50
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-22 21:30:06
 * @FilePath: /examples/7-vue/vue2Cli/src/plugins/myRouter/my-router-link.js
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
    let on = {
      click: (e) => {
        guardEvent(e); // 阻止导航标签的默认事件
        parent.$myRouter.push(props.to); // props.to 的值传到 router.push()
      },
    }; // 默认已监听单击事件
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
        on,
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
