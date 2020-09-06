class Watcher {
  constructor(vm, exOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(exOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    window.target = this; // 设置 window.target 为当前 watcher 实例，然后再读一下 data.a.b.c 的值，从而触发 getter，收集 window.target 中的依赖
    let value = this.getter.call(this.vm, this.vm); // 调用指定属性 data.a.b.c 的 getter 方法
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

module.exports = Watcher;