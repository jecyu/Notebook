/*
 * @Description: 尝试实现原型继承
 * @Author: Jecyu
 * @Date: 2020-05-27 14:04:50
 * @LastEditTime: 2020-05-28 09:00:33
 * @LastEditors: Jecyu
 */ 
const assert = require('assert');

function Person() {}
Person.prototype.dance = function() {}; // 通过构造函数及其原型，创建一个具有 dance 方法的 Person 类型

function Ninja() {} // 定义 Ninja 构造函数
Ninja.prototype = { // 试图附着 Person 的原型方法 dance 到 Ninja 的原型上 
  dance: Person.prototype.dance 
}

const ninja = new Ninja();
assert.strictEqual(ninja instanceof Ninja, true, "ninja receives functionality from the Ninja prototype");

assert.strictEqual(ninja instanceof Person, false, "... and the Person prototype.")
assert.strictEqual(ninja instanceof Object, true, "... and the Object prototype.")