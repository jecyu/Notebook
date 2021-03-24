/*
 * @Author: Jecyu
 * @Date: 2020-11-04 17:54:42
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-04 19:53:27
 * @FilePath: /examples/1-patterns/状态模式/base/demo04.js
 * @Description:
 * 记录状态到处理器上
 */

class CoffeeMaker {
  constructor() {
    /**
     * 这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
     */
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
    // 初始化牛奶的存储量
    this.leftMilk = "500ml";
    this.stateToProcessor = {
      that: this,
      american() {
        return (
          "我只吐黑咖啡" +
          "," +
          "咖啡机现在的牛奶存储量是：" +
          this.that.leftMilk
        );
      },
      latte() {
        return this.american() + "," + "加点奶";
      },
      vanilaLatte() {
        return this.latte() + "," + "再加香草糖浆";
      },
      mocha() {
        return this.latte() + "," + "再加巧克力";
      },
    };
  }

  // 关注咖啡机状态
  changeState(state) {
    // 记录当前状态
    this.state = state;
    if (!this.stateToProcessor[state]) {
      return;
    } else {
      return this.stateToProcessor[state]();
    }
  }
}

module.exports = CoffeeMaker;
