u/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-27 16:51:15
 * @LastEditTime: 2020-05-28 10:44:40
 * @LastEditors: Jecyu
 */ 
import { createDOMFromString } from "../utils/base"
export default class Node {
  constructor(nodeModel) { // nodeModel
    // 获得渲染的数据
    this.nodeModel = nodeModel;
  }
  render() {
    // 渲染节点。绑定事件，后续再看怎么处理
    // 递归渲染
    // 调用 TreeNode.render() 获得渲染的值
    // <li>
    //   <div class="easy-tree-node-content"></div>
    //   {renderChildren}
    // </li>
    const { name } = this.nodeModel;
    const li = `<li class="easy-tree-node"></li>`
    const div = `<div class="easy-tree-node-content">${name}</div>`
    const liNode = createDOMFromString(li);
    const divNode = createDOMFromString(div);
    liNode.appendChild(divNode);
    if (this.nodeModel.hasChild()) {
      liNode.appendChild(this.renderChildren());
    }
    return liNode;
  }
  renderChildren() {
    // renderTreeNode
    // <ul class="easy-tree-node-children">
    // {render}
    // {render}
    // </ul> 
    const nodeList = this.nodeModel.getChildNodes();
    const ul = `<ul class="easy-tree-node-children""></ul>`
    const ulDom = createDOMFromString(ul);
    nodeList.forEach(node => {
      this.renderTreeNode(node);
    })
  }
}