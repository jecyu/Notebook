const Dep = require("./Dep");

/**
 * 监听数据变动
 * Observer 类会附加到每一个被侦测的 object 上。
 * 一旦被附加上，Observer 会将 object 的所有属性转换为 getter/setter 的形式
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖。
 */
class Observer {
  constructor(data) {
    if (!data) return;
    observe(data);
  }
}

function observe(obj, dep) {
  if (Array.isArray(obj) && dep) {
    // TODO Array
  } else if (Object.prototype.toString.call(obj) === "[object Object]") {
    for (let prop in obj) {
      defineReactive(obj, prop, obj[prop]);
    }
  }
}

function defineReactive(data, key, val) {
  // 每一项属性都有自己的被依赖列表，当值有变化时通知它们
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend(); // 添加 watcher
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      dep.notify();
    },
  });
  // 递归子属性
  observe(val, dep);
}

// 只要将一个 object 传到 Observer 中，那么这个 object 就会变成响应实际的 object。

module.exports = Observer;
