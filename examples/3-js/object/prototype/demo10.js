/*
 * @Description: 解决 constructor 属性的问题
 * @Author: Jecyu
 * @Date: 2020-05-28 09:40:27
 * @LastEditTime: 2020-08-11 14:38:31
 * @LastEditors: Jecyu
 */

const assert = require("assert");
function Animal() {}
Animal.prototype.makeNoise = function() {};

function Canine() {}
Canine.prototype = new Animal();

Object.defineProperty(Canine.prototype, "constructor", { // 定义一个新的不可枚举的 constructor 属性，属性值为 Canine
  enumerable: false,
  value: Canine,
  writable: true
});

const canine = new Canine();
assert.strictEqual(canine.constructor === Canine, true, "Connection from canine instances to Canine constructor reestablished!"); // 重新建立 canine 实例与 Canine 构造器的联系
for(let prop in Canine.prototype) {
  assert.strictEqual(prop === "makeNoise", true, "The only enumerable property is makeNoise!"); // 在 Canine.prototype 上没有定义可枚举的属性
}

// const assert = require("assert");
// function Person() {}
// Person.prototype.dance = function() {};

// function Ninja() {}
// Ninja.prototype = new Person();

// Object.defineProperty(Ninja.prototype, "constructor", { // 定义一个新的不可枚举的 constructor 属性，属性值为 Ninja
//   enumerable: false,
//   value: Ninja,
//   writable: true
// });

// const ninja = new Ninja();
// assert.strictEqual(ninja.constructor === Ninja, true, "Connection from ninja instances to Ninja constructor reestablished!"); // 重新建立 ninja 实例与 Ninja 构造器的联系
// for(let prop in Ninja.prototype) {
//   assert.strictEqual(prop === "dance", true, "The only enumerable property is dance!"); // 在 Ninja.prototype 上没有定义可枚举的属性
// }