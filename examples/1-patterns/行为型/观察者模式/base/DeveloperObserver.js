const Observer = require("./Observer");

class DeveloperObserver extends Observer {
  constructor() {
    super();
    // 需求文档一开始还不存在，prd 初始为控对象
    this.prdState = {};
    console.log("DeveloperObserver.update invoked.");
  }

  // 重写一个具体的 update 方法
  update(publisher) {
    console.log("DeveloperObserver.update invoked.");
    // 更新需求文档
    this.prdState = publisher.getState();
    // 调用工作函数
    this.work();
  }

  // work 方法，一个专门搬砖的方法
  work() {
    // 获取需求文档
    const prd = this.prdState;
    // 开始基于需求的文档开始搬砖
    console.log("996 begins");
  }
}

module.exports = DeveloperObserver;