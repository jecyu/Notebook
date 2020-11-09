const EventEmitter = require("./EventEmitter");
describe("Name of the group", () => {
  it("`on` callback function must be invoked after the related event emit.", () => {
    const eventEmitter = new EventEmitter();
    // 订阅事件
    const message = "Jecyu";
    const eventName = "someEvent";
    const func = (...args) => {
      expect(...args).toBe(message);
      console.log("message ->", message);
    };
    eventEmitter.on(eventName, func);
    // 发布事件
    eventEmitter.emit(eventName, message);
    // 移除事件
    eventEmitter.off(eventName, func);
    // 再次发布，不再有对应的函数响应
    eventEmitter.emit(eventName, message);
  });
  it("`once` callback function must be invoked and destroyed after the related event emit.", () => {
    const eventEmitter = new EventEmitter();
    // 订阅事件
    const message = "linjy";
    const eventName = "someEvent";
    // 订阅一次
    eventEmitter.once(eventName, (...args) => {
      expect(...args).toBe(message);
      console.log("message ->", message);
    });
    // 发布事件
    eventEmitter.emit(eventName, message);
    // 再次发布，不再有对应的函数响应
    eventEmitter.emit(eventName, message);
  });
});
