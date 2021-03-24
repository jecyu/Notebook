/*
 * @Author: Jecyu
 * @Date: 2020-11-04 17:54:42
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-04 18:26:48
 * @FilePath: /examples/1-patterns/状态模式/base/demo02.js
 * @Description:
 * 1. 职责分离 
 */
class CoffeeMaker {
  constructor() {
    /**
     * 这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
     */
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
  }
  // 关注咖啡机状态
  changeState(state) {
    // 记录当前状态
    this.state = state;
    if (state === "american") {
      // 这里用 console 代指咖啡制作流程的业务逻辑
      return this.americanProcess();
    } else if (state === "latte") {
      return this.latteProcess();
    } else if (state === "vanilaLatte") {
      return this.vanilaLatteProcess();
    } else if (state === "mocha") {
      return this.mochaProcess();
    }
  }
  americanProcess() {
    return "我只吐黑咖啡";
  }

  latteProcess() {
    return this.americanProcess() + "加点奶";
  }

  vanilaLatteProcess() {
    return this.latteProcess() + "再加香草糖浆";
  }

  mochaProcess() {
    return this.latteProcess() + "再加巧克力";
  }
}

module.exports = CoffeeMaker;
