/*
 * @Description: 实现原型实现继承
 * @Author: Jecyu
 * @Date: 2020-05-28 09:05:13
 * @LastEditTime: 2020-08-11 14:30:28
 * @LastEditors: Jecyu
 */ 
const assert = require('assert')
function Animal() {}
Animal.prototype.makeNoise = function() {}

function Canine() {}
Canine.prototype = new Animal(); // 通过将 Canine 的原型赋值为 Animal 的实例，实现 Canine 继承 Animal，Canine 指向新的原型，缺点是丢失了原来的 prototype 的 constructor 属性

const animal1 = new Animal();
const canine = new Canine();
assert.strictEqual(canine instanceof Canine, true, "canine receives functionlity from the Canine prototype.")
assert.strictEqual(canine instanceof Animal, true, "... and the Canine prototype.")
assert.strictEqual(typeof canine.makeNoise === "function", true, "... and the Object prototype.")
// const assert = require('assert')
// function Person() {}
// Person.prototype.dance = function() {}

// function Ninja() {}
// Ninja.prototype = new Person(); // 通过将 Ninja 的原型赋值为 Person 的实例，实现 Ninja 继承 Person，Ninja 指向新的原型，缺点是丢失了原来的 prototype constructor 属性
// const person1 = new Person();
// const ninja = new Ninja();
// assert.strictEqual(ninja instanceof Ninja, true, "ninja receives functionlity from the Ninja prototype.")
// assert.strictEqual(ninja instanceof Person, true, "... and the Person prototype.")
// assert.strictEqual(typeof ninja.dance === "function", true, "... and the Object prototype.")
