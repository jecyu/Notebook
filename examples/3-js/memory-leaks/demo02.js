/*
 * @Description: 被遗忘的定时器（闭包引用）导致的内存泄漏
 * @Author: Jecyu
 * @Date: 2020-05-26 07:16:22
 * @LastEditTime: 2020-05-26 10:25:44
 * @LastEditors: Jecyu
 */ 
function Test() {
  this.obj = {};
  this.index = 1;
  this.timer = null;
  var cache = []; // 内存变量，内存隐患
  this.timer = window.setInterval(function doSomething() {
    // debugger;
    this.index += 1;
    this.obj = {
      val: "_timerxxxxxbbbbxxxxx_" + this.index,
      junk: [...cache] // 异步函数拿取了 cache 
    };
    cache.push(this.obj);
  }, 1)
  console.warn("create Test instance..");
}
test = new Test(); // JS 对象开启定时器不断分配内存

