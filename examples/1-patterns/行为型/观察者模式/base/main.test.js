const DeveloperObserver = require("./DeveloperObserver");
const PrdPublisher = require("./ProPublisher");

describe("The Observe process", () => {
  // 创建订阅者：前端开发李雷
  const lilei = new DeveloperObserver();
  // 创建测试者：小 A
  const A = new DeveloperObserver();
  // 创建测试者 小 B
  const B = new DeveloperObserver();
  // 韩梅梅出现了
  const hanMeiMei = new PrdPublisher();
  // 需求文档出现了
  const prd = {
    name: "first time",
  };

  // 韩梅梅开发拉群
  hanMeiMei.add(lilei);
  hanMeiMei.add(A);
  hanMeiMei.add(B);
  // 韩梅梅发送了需求文档，并@了所有人
  hanMeiMei.setState(prd);
  it("should ", () => {});
});
