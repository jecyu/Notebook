/*
 * @Description: 使用 constructor 的引用创建新对象
 * @Author: Jecyu
 * @Date: 2020-05-27 08:07:14
 * @LastEditTime: 2020-05-27 13:46:00
 * @LastEditors: Jecyu
 */ 

const assert = require("assert");
function Ninja() {}
const ninja = new Ninja();
const ninja2 = new ninja.constructor(); // 通过第一个实例化对象的 constructor 方法创建第 2 个实例化对象

assert.strictEqual(ninja2 instanceof Ninja, true, "It's Ninja!"); // 说明新创建的对象 ninja2 是 Ninja 的实例
assert.strictEqual(ninja !== ninja2, true, "But not the same Ninja!"); // ninja 与 ninja2 不是同一个对象，是两个截然不同的实例