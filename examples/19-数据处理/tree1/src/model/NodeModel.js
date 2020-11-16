/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-27 17:01:38
 * @LastEditTime: 2020-05-28 22:16:34
 * @LastEditors: Jecyu
*/ 
let nodeIdSeed = 0;
export default class NodeModel {
  constructor(options, parent) { 
    // data 数据
    this.id = nodeIdSeed++;
    this.name = null; 
    this.expand = false;
    this.visible = true; 
    
    this.parent = parent; // nodeModel 类型
    this.children = [] // children data，存放 nodeModel 类型

    // 添加使用者的数据
    for (let name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }
  }
  addChild(value) {
    if (value instanceof NodeModel) {
      this.children.push(value);
    }
  }

  hasChild() {
    return this.children.length > 0;
  }

  getChildNodes() {
    return this.children;
  }

  setChildNodesShow(nodeModel) {
    if (nodeModel.hasChild()) {
      const children = nodeModel.getChildNodes();
      children.forEach(item => {
        if (!item.visible) {
          item.visible = true;
        }
        this.setChildNodesShow(item);
      });
    }
  }

  setChildNodesHide(nodeModel) {
    if (nodeModel.hasChild()) {
      const children = nodeModel.getChildNodes();
      children.forEach(item => {
        if (item.visible) {
          item.visible = false;
        }
        this.setChildNodesShow(item);
      });
    }
  }
}
