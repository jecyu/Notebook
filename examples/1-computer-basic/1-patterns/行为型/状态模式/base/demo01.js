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
      return "我只吐黑咖啡";
    } else if (state === "latte") {
      return "给黑咖啡加点奶";
    } else if (state === "vanilaLatte") {
      return "黑咖啡加点奶再加香草糖浆";
    } else if (state === "mocha") {
      return "黑咖啡加点奶再加点巧克力";
    }
  }
}

module.exports = CoffeeMaker;
