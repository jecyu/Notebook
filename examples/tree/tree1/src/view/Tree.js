/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-05-26 15:11:24
 * @LastEditTime: 2020-05-28 16:27:20
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
import TreeModel from "../model/TreelModel";
// import Node from "../view/Node";
import { createDOMFromString } from "../utils/base";
export default class EasyTree {
  constructor(prop) {
    // 传入配置，初始化
    this.defaultOpt = {
      baseNode: null,
      paddingLeft: 16,
      data: [],
    };
    this.opts = Object.assign(this.defaultOpt, prop);
    this.init(); // 初始化
    this.prefix = "easy"
  }
  init() {
    this.initState();
    this.render();
  }
  initState() {
    // 实例化 TreeStore，存储数据
    // 实例化一棵树
    // 1. new TreeModel(data)
    const treeModel = new TreeModel(this.opts.data);
    this.roots = treeModel.getTreeRoot();
  }
  render() {
    // 渲染树
    // 渲染节点
    // <ul class="easy-tree">
    // new TreeNode() 渲染
    // </ul>
    // 
    const treeWrapper = createDOMFromString(`<ul class="easy-tree"></ul>`);
    // const treeNode = new node(this.root).render();
    this.roots.forEach(nodeModel => {  // 遍历渲染
      const treeNode =  this.renderTreeNode(nodeModel);
      treeWrapper.appendChild(treeNode); // 添加进根节点
    })
    this.opts.baseNode.appendChild(treeWrapper); // 渲染完成再添加进 web 浏览器，添加到外部容器
    // 给 ul 树容器添加事件委托，展开、收缩如何处理？改变 dom 数据的 expand 属性
    // 给 ul 容器添加事件，给每个节点分配 id，然后点击事件的时候，通过 id 寻找对应的 nodeData，进行属性值的更改，如 expand、visiable等。 settArribute，原始是通过
  }
  renderTreeNode(nodeModel) {
    // 渲染节点。绑定事件，后续再看怎么处理
    // 递归渲染
    // 调用 TreeNode.render() 获得渲染的值
    // <li>
    //   <div class="easy-tree-node-content"></div>
    //   {renderChildren}
    // </li>
    const { data } = nodeModel;
    debugger;
    const li = `<li class="easy-tree-node"></li>`; // 节点模版
    const div = `<div class="easy-node-content">${data.name}</div>`;
    const liDom = createDOMFromString(li);
    const divDom = createDOMFromString(div);
    liDom.appendChild(divDom);
    if (nodeModel.hasChild()) {
      const nodeModels = nodeModel.getChildNodes();
      liDom.appendChild(this.renderChildren(nodeModels));
    }
    return liDom;
  }
  renderChildren(nodeModelList) {
    // renderTreeNode
    // <ul class="easy-tree-node-children">
    // {render}
    // {render}
    // </ul>
    const ul = `<ul class="easy-tree-node-children"></ul>`;
    const ulDom = createDOMFromString(ul);
    nodeModelList.forEach((node) => {
      ulDom.appendChild(this.renderTreeNode(node)); // 递归渲染
    });
    return ulDom;
  }
}

// const createTree = (...args) => {
//   return new TinyTree
// };
