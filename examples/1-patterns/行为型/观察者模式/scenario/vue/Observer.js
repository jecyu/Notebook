const Dep = require("./Dep");

// observe 方法便利并包装对象属性
function observe() {
  // 若 target 是一个对象，则遍历它
  if (target && typeof target === "object") {
    Object.keys(target).forEach((key) => {
      // defineReactive 方法会给目标属性装上“监听器”
      defineReactive(target, key, target[key]);
    });
  }
}

// 定义 defineReactive 方法
function defineReactive(target, key, val) {
  // 属性值也可能是 object 类型，这种情况下需要调用 observe 进行递归遍历
  const dep = new Dep();
  observe(val);
  // 为当前属性安装监听器
  Object.defineProperty(target, key, {
    // 可枚举
    enumerable: true,
    // 不可配置
    configurable: false,
    get: function() {
      return val;
      // 收集依赖
    },
    // 监听器函数
    set: function(value) {
      console.log(`${target}属性的${key}属性从${val}值变成了${value}`);
      val = value;
      // 通知所有订阅者
      dep.notify();
    },
  });
}
