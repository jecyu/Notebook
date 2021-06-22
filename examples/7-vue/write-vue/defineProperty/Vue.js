const Vue = (function() {
  let uid = 0;
  // 用于储存订阅者并发布消息
  class Dep {
    constructor() {
      // 设置 id ，用于区分新 Watcher 和只改变属性值后新产生的 Watcher
      this.id = uid++;
      // 储存订阅者的数组
      this.subs = [];
    }
    depend() {
      // 触发 target 上的 Watcher 中的 addDep 方法，参数为 dep 的实例本身
      Dep.target.addDep(this);
    }
    // 添加订阅者
    addSub(sub) {
      this.subs.push(sub);
    }
    notify() {
      // 通知所有的订阅者（Watcher），触发订阅者的相应逻辑处理
      this.subs.forEach((sub) => sub.update());
    }
  }
  // 为 Dep 类设置一个静态属性，默认为 null，工作时指向当前的 Watcher
  Dep.target = null;

  // 监听者，监听对象属性值的变化
  class Observer {
    constructor(value) {
      this.value = value;
      this.walk(value);
    }
    // 遍历属性值并监听
    walk(value) {
      Object.keys(value).forEach((key) => this.convert(key, value[key]));
    }
    // 执行监听的具体方法
    convert(key, val) {
      defineReactive(this.value, key, val);
    }
  }

  // 数据劫持 + 订阅发布
  function defineReactive(obj, key, val) {
    // 每个属性值，都新建一个 Dep 用于管理当前属性的订阅者
    const dep = new Dep();
    // 给当前属性的值添加监听
    let childOb = observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        // 如果 Dep 类存在 target 属性，将其添加到 dep 实例的 subs 数组中
        // target 指向一个 Watcher 实例，每个 Watcher 都是一个订阅者
        // Watcher 实例在实例化过程中，会读取 data 中的某个属性，从而触发当前 get 方法
        if (Dep.target) {
          dep.depend();
        }
      },
      set: (newVal) => {
        if (val === newVal) return;
        val = newVal;
        // 对新值进行监听
        childOb = observe(newVal);
        // 通知所有订阅者，数值被改变了
        dep.notify();
      },
    });
  }

  function observe(value) {
    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
    if (!value || typeof value !== "object") {
      return;
    }
    return new Observer(value);
  }

  class Watcher {
    constructor(vm, expOrFn, cb) {
      this.depIds = {}; // hash 储存订阅者的 id，避免重复的订阅者添加对应的数据的订阅管理中心上
      this.vm = vm; // 被订阅的数据一定来自于当前 Vue 实例
      this.cb = cb; // 当数据更新时想要做的事情
      this.expOrFn = expOrFn; // 被订阅的数据
      this.val = this.get(); // 维护更新之前的数据
    }

    update() {
      this.run();
    }
    addDep(dep) { // 这里保证 watcher 跟 dep 是一对多关系，也就是说同一个 dep 不能添加多个相同的 watcher 值
      // 如果在 depIds 的 hash 没有当前的 id，可以判断是新 Watcher，因此可以添加到 dep 的数组中储存
      // 此判断是避免同 id 的 Watcher 被多次储存
      // if (!this.depIds.hasOwnProperty(dep.id)) {
        dep.addSub(this);
        this.depIds[dep.id] = dep;
      // }
    }
    run() {
      const val = this.get();
      console.log(val);
      if (val !== this.val) {
        this.val = val;
        this.cb.call(this.vm, val);
      }
    }
    get() {
      // 当前订阅（Watcher）读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
      Dep.target = this;
      const val = this.vm._data[this.expOrFn]; // 触发 get
      // 置空，用于下一个 Watcher 使用
      Dep.target = null;
      console.log(Dep.target, 2);
      return val;
    }
  }

  // main
  class Vue {
    constructor(options = {}) {
      // 简化了 $options 的处理
      this.$options = options;
      // 简化了对 data 的处理
      let data = (this._data = this.$options.data);
      // 将所有 data 最外层属性代理到 Vue 实例上
      Object.keys(data).forEach((key) => this._proxy(key));
      // 1. 响应式数据处理
      observe(data);
    }
    // 2. 添加订阅者
    // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
    $watch(expOrFn, cb) {
      new Watcher(this, expOrFn, cb); // 订阅者
    }

    _proxy(key) {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get: () => this._data[key],
        set: (val) => {
          this._data[key] = val;
        },
      });
    }
  }

  return Vue;
})();

let demo = new Vue({
  data: {
    text: "",
  },
});

const p = document.getElementById("p");
const input = document.getElementById("input");

// 3. 值更新
input.addEventListener("keyup", function(e) {
  demo.text = e.target.value;
});

demo.$watch("text", (str) => (p.innerHTML = str)); // 监听数据值，更新视图
