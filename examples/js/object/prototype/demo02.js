/*
 * @Description: 通过原型方法创建新的实例
 * @Author: Jecyu
 * @Date: 2020-05-26 15:52:36
 * @LastEditTime: 2020-05-26 16:06:42
 * @LastEditors: Jecyu
 */ 
const assert = require('assert').strict;
function Ninja() {
  Ninja.prototype.swingSword = function() {
    return true;
  }
} // 每个函数都有具有内置的原型对象，我们可以对其自由更改

const ninja1 = Ninja();
assert.strictEqual(ninja1, undefined, "No instannce of Ninja created."); // 作为函数调用你 Ninja，验证该函数没有任何返回值

const ninja2 = new Ninja();
assert(ninja2 && ninja2.swingSword && ninja2.swingSword(), true, "Instance exists and method is callable."); // 作为构造函数调用 Ninja，验证不仅创建了新的实例，并且该实例具有原型上的方法
