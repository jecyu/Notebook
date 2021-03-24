const Publisher = require("./Publisher");
// 定义一个具体的需求文档（pro）发布类
class PrdPublisher extends Publisher {
  constructor() {
    super();
    // 初始化需求文档
    this.prdState = null;
  }

  // 该方法用于获取档期的 prdState
  getState() {
    console.log("PrdPublisher.getState invoked!");
    return this.prdState;
  }

  // 该方法用于改变 prdState 的值
  setState(state) {
    console.log("PrdPublisher.setState invoked!");
    this.prdState = state;
    // 需求文档变更，立刻通知所有开发者
    this.notify();
  }
}
module.exports = PrdPublisher;
