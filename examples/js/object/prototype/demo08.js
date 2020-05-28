/*
 * @Description: 实现原型实现继承
 * @Author: Jecyu
 * @Date: 2020-05-28 09:05:13
 * @LastEditTime: 2020-05-28 09:26:15
 * @LastEditors: Jecyu
 */ 
const assert = require('assert')
function Person() {}
Person.prototype.dance = function() {}

function Ninja() {}
Ninja.prototype = new Person(); // 通过将 Ninja 的原型赋值为 Person 的实例，实现 Ninja 继承 Person，Ninja 指向新的原型，缺点是丢失了原来的 prototype constructor 属性

const ninja = new Ninja();
assert.strictEqual(ninja instanceof Ninja, true, "ninja receives functionlity from the Ninja prototype.")
assert.strictEqual(ninja instanceof Person, true, "... and the Person prototype.")
assert.strictEqual(typeof ninja.dance === "function", true, "... and the Object prototype.")
