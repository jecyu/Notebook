const Observer = require("./reactive/Observer");
const Compiler = require("./Compiler");
/**
 * 将 options 中的 data、computed、methods 挂载到 Vue 实例上
 */
function proxy(options) {
  for (let prop in options.data) {
    Object.defineProperty(this, prop, {
      enumerable: true,
      configurable: true,
      get() {
        return this.$options.data[prop];
      },
      set(newVal) {
        this.$options.data[prop] = newVal;
      },
    });
  }
  // computed
}
class Vue {
  constructor(options) {
    this.$options = options;
    new Observer(options.data); // 1. 处理为响应式
    proxy.call(this, options); // 2. 添加代理

    // 模版处理
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
    if (!(this.$el instanceof HTMLElement)) {
      this.$el = document.body;
    }
    if (options.template) {
      this.$el.innerHTML = options.template;
    }

    new Compiler(this.$el, this); // 3. 进行编译，设置 watcher 等
  }
}

module.exports = Vue;
