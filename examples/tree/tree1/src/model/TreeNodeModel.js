/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-27 17:01:38
 * @LastEditTime: 2020-05-27 18:55:42
 * @LastEditors: Jecyu
 */ 
class TreeNodeModel {
  constructor(data, parent) {
    this.data = data; // node data
    this.parent = parent; // parent data
    this.children = [] // children data，存放 TreeNode 类型
  }
  add() {}
}