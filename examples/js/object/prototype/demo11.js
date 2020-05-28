/*
 * @Description: instanceof 操作符
 * @Author: Jecyu
 * @Date: 2020-05-28 09:52:32
 * @LastEditTime: 2020-05-28 10:01:44
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");
function Person() {}
function Ninja() {}
Ninja.prototype = new Person();

const ninja = new Ninja();

assert.strictEqual(ninja instanceof Ninja, true, "Our ninja is a Ninja!");
assert.strictEqual(ninja instanceof Person, true, "A ninja is also a Person."); // ninja 是 Ninja 的实例，同时也是 Person 的实例
