/*
 * @Description: 配置属性
 * @Author: Jecyu
 * @Date: 2020-05-28 09:25:17
 * @LastEditTime: 2020-05-28 09:37:52
 * @LastEditors: Jecyu
 */

const assert = require("assert");
const ninja = {};
ninja.name = "Yoshi";
ninja.weapon = "kusarigama"; // 创建一个空对象，通过赋值语句添加对象属性

// 使用内置的 Object.defineProperty 方法设置对象属性的配置信息
Object.defineProperty(ninja, "sneaky", {
  configurable: false,
  enumerable: false,
  value: true,
  writable: true
})
assert("sneaky" in ninja, true, "We can access the new property.");
for (let prop in ninja) {
  assert(prop !== undefined, "An enumerated property: " + prop);
}