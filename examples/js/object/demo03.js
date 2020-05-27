/*
 * @Description: 观察初始化过程的优先级
 * @Author: Jecyu
 * @Date: 2020-05-26 16:27:33
 * @LastEditTime: 2020-05-26 16:34:21
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");
function Ninja() {
  this.swung = false; // 创建布尔类型的实例变量，并初始化该变量的默认值为 false
  this.swingSword = function() { // 创建实例方法，该方法的返回值为实例变量 swung 取反
    return !this.swung;
  }
}
Ninja.prototype.swingSword = function() { // 定义一个与实例方法同名的原型方法，将会优先使用哪一个呢？
  return this.swung;
};

const ninja = new Ninja();
assert.strictEqual(ninja.swingSword(), true, "Called the instance method, not the prototype method."); // 创建 Ninja 的一个实例，并验证实例方法会重写与之重名的原型方法

