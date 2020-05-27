/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-05-26 15:11:24
 * @LastEditTime: 2020-05-27 19:07:26
 * @LastEditors: Jecyu
 */

// mvc
// 原型：先渲染树，展开、收缩。
// 后续 checkbox，增删改查、上下移动、拖拽
// 把数据与视图分离开
// new Tree({data: []}).mount("#container")
// const new Tree({data}).init()
// init
// 思路：
// 1. view：所有的模版都实现创建，树的容器、树节点
// ```html
// <ul class="tiny-tree">  //
//   <li class="tiny-tree-node">
//     <div class="tiny-tree-node-content"></div>
//     <ul class="tiny-tree-node-children"></ul>  <!-- 孩子节点-->
//   </li>
// </ul>
// </div>
// ```


// initState model 存储数据
// render view +（包括 bindEvent）
// 外部 controller 触发事件

export default class EasyTree {
  constructor(props) {
    // 传入配置，初始化
    this.defaultOpt = {
      baseNode: null,
      paddingLeft: 16,
      treeNodes: [],
    };
    this.opts = assign(defaultOpts, props);
    this.init(); // 初始化
  }
  init() {
    this.initState();
    this.render();
  }
  initState() {
    // 实例化 TreeStore，存储数据
    // 实例化一棵树
    // 1. new TreeModel(data)
    // 2. 添加子数据
  }
  render() {
    // 渲染树
    // 渲染节点
    // <ul class="tiny-tree">
    // new TreeNode() 渲染
     // </ul>
    // 渲染完成再添加进 web 浏览器
    // 给 ul 树容器添加事件委托，展开、收缩如何处理？改变 dom 数据的 expand 属性
  }
}

// const createTree = (...args) => {
//   return new TinyTree
// };
 