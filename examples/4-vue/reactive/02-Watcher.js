/** 
 * Watcher 是一个中介的角色，数据发生变化时通知它，然后它再通知其他地方。
 * vm.$watch('a.b.c', function(newVal, oldVal) {
 *   // do something
 * })
*/

export default class Watcher {
  constructor(vm, exOrFn, cb) {
    this.vm = vm;
    // 执行 this.getter()，就可以读取 data.a.b.c 的内容
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

function parsePath(path) {
  
}