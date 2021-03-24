/**
 * Observer 类会附加到每一个被侦测的 object 上。
 * 一旦被附加上，Observer 会将 object 的所有属性转换为 getter/setter 的形式
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖。
 */
export class Observer {
  constructor(value) {
    this.value = value;

    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }

  /**
   * walk 会将每一个属性都转换成 getter/setter
   */
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}

function defineReactive(data, key, val) {
  // 新增，递归子属性
  if (typeof val === 'object') {
    new Observer(val);
  }
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      dep.depend();  // 添加依赖
      return val;
    },
    set: function(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  })
}

// 只要将一个 object 传到 Observer 中，那么这个 object 就会变成响应实际的 object。