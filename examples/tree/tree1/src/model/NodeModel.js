/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-27 17:01:38
 * @LastEditTime: 2020-05-28 10:45:16
 * @LastEditors: Jecyu
 */ 
export default class NodeModel {
  constructor({ name = "node", expand = true, visible = true }, parent) { 
    this.id = null;
    this.data = {
      name, 
      expand, 
      visible
    }; // node data 对象数据
    this.parent = parent; // nodeModel 类型
    this.children = [] // children data，存放 nodeModel 类型
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
}
