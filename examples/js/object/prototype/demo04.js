/*
 * @Description: JavaScript 动态特性的副作用
 * @Author: Jecyu
 * @Date: 2020-05-27 07:15:59
 * @LastEditTime: 2020-05-27 07:59:58
 * @LastEditors: Jecyu
 */ 
const assert = require('assert');
function Ninja() {  // 定义了一个构造函数，该狗函数中创建了一个 swung 属性，初始化为布尔值
  this.swung = true;
}
const ninja1 = new Ninja(); // 通过 new 操作符调用构造函数，创建实例 Ninja

Ninja.prototype.swingSword = function() { // 在实例对象创建完成之后，在原型上添加一个方法
  return this.swung; 
}
assert.strictEqual(ninja1.swingSword(), true, "Method exists, even out of order.");

Ninja.prototype = { // 使用字面量对象完全重写 Ninja 的原型对象，仅有一个 pierce 方法，新申请了内存，指向了别处（之前的对象只有以前实例过的例子，才能访问）
  pierce: function() {
    return true;
  }
}

assert(ninja1.swingSword(), true, "Our ninja can still swing!"); // 尽管我们已经完全替换了 Ninja 的构造器原型，但是实例化后的 Ninja 对象仍然具有 swingSword 方法，因为 对象 ninja1 仍然保持着对旧的 Ninja 原型的引用 

const ninja2 = new Ninja();
assert(ninja2.pierce(), true, "Newly created ninjas can pierce");
assert(ninja2.swingSword, undefined, "But they cannot swing!"); // 新创建的 ninja2 实例拥有新原型的引用，因此不具有 swingSword 方法，仅具有 pierce 方法

