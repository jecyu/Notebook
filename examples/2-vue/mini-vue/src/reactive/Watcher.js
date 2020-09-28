/**
 * 定义好每个类的职责
 * Watcher 是一个中介的角色，数据发生变化时通知它，然后它再通知其他地方。
 * vm.$watch('a.b.c', function(newVal, oldVal) {
 *   // do something
 * })
 */

const { expToFunc } = require("../util");

class Watcher {
  /**
   *
   * @param {*} exp 原始表达式
   * @param {*} scope 数据源
   * @param {*} cb DOM 更新函数
   */
  constructor(exp, scope, callback) {
    this.value = null; // 存放编译结果
    this.getValue = expToFunc(exp, scope); // 生成编译结果的函数
    this.callback = callback;
    this.update(); // 绑定时需要编译一次
  }

  get() {
    return this.getValue();
  }

  update() {
    let newVal = this.get(); // 获取最新编译结果
    if (this.value !== newVal) {
      // 如果最新编译结果和当前的不一样，则调用 callback
      this.value = newVal;
      this.callback && this.callback.call(newVal);
    }
  }
}

module.exports = Watcher;
