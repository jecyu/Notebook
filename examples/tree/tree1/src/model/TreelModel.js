/*
 * @Description: 树的根
 * @Author: Jecyu
 * @Date: 2020-05-27 17:01:31
 * @LastEditTime: 2020-05-29 21:57:58
 * @LastEditors: Jecyu
 */

import NodeModel from "./NodeModel";
export default class TreeModel {
  // 每个节点都 new 一个实例对象，可能对性能有影响，但是解耦
  /**
   *
   */
  constructor(data) {
    this._roots = []; // 多个根
    this.nodeModelMap = {}
    this.initTree(data);
  }

  initTree(data) {
    // ✅动态创建
    // this._root = new NodeModel({ name: "parent 1" }, null);
    // const parent1_1 = new NodeModel({ name: "parent 1-1" }, this._root);
    // const parent1_2 = new NodeModel({ name: "parent 1-2" }, this._root);
    // this._root.addChild(parent1_1);
    // this._root.addChild(parent1_2);
    // const parent1_1_1 = new NodeModel({ name: "parent 1-1-1" }, parent1_1);
    // parent1_1.addChild(parent1_1_1);
    // const parent1_1_2 = new NodeModel({ name: "parent 1-1-2" }, parent1_1);
    // parent1_1.addChild(parent1_1_2);
    this.convertDataToTree(data, this._roots);
  }

  /**
   * 针对多个 root，遍历
   */
  convertDataToTree(data, parent) {
    data.forEach(item => {
      const node = new NodeModel({ name: item.name }, null);
      this.nodeModelMap[node.id] = node;
      parent.push(node);
      if (item.children && item.children.length) {
        this.convertDataToTree(item.children, node.children);
      }
    })
  }

  /** 
   * 根据 id 设置节点的显示
  */
 setChildNodeVisible(id) {
    // 根据 id 找到 nodeModel
    const targetNodeModel = this.findNodeModel(id);
    if (!targetNodeModel) return;
    // 设置 visible 值
    if(!targetNodeModel.visible) {
      targetNodeModel.setChildNodesShow(targetNodeModel);
    } else {
      targetNodeModel.setChildNodesHide(targetNodeModel);

    }
  }

  findNodeModel(id) {
    return this.nodeModelMap[id];
  }

  getTreeRoot() {
    return this._roots;
  }
}
