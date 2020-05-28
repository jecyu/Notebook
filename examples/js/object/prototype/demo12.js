/*
 * @Description: 当心构造函数原型的改变
 * @Author: Jecyu
 * @Date: 2020-05-28 10:14:12
 * @LastEditTime: 2020-05-28 10:17:16
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");
function Ninja() {}
const ninja = new Ninja();

assert.strictEqual(ninja instanceof Ninja, true, "Our ninja is a Ninja!");

Ninja.prototype = {}; // 修改 Ninja 的原型
assert.strictEqual(!(ninja instanceof Ninja), true, "The ninja is now not a Ninja!?");
