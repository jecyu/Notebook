/*
 * @Description: 树的根
 * @Author: Jecyu
 * @Date: 2020-05-27 17:01:31
 * @LastEditTime: 2020-05-27 18:51:02
 * @LastEditors: Jecyu
 */ 
class TreeModel { // 每个节点都 new 一个实例对象，可能对性能有影响
  constructor(data) {
    this.data = data ; // treeData
    this._root = new TreeNodeModel();
    // this._root.
    // 添加其他节点
  }
}