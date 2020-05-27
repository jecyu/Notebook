/** 
 * 理解原型
*/
const assert = require("assert");

const yoshi = { skulk: true };
const hattori = { sneak: true };
const kuma = { creep: true };

assert.deepEqual(("skulk" in yoshi), true, "Yoshi can skulk");
assert.deepEqual(("sneak" in yoshi), false, "Yoshi cannot sneak");
assert.deepEqual(("creep" in yoshi), false, "Yoshi cannot creep"); // yoshi 对象只能访问自身的属性 skulk

Object.setPrototypeOf(yoshi, hattori); // Object.setPrototypeof 方法，将对象 hattori 设置为 yoshi 对象的原型

assert("sneak" in yoshi, true, "Yoshi can now sneak"); // 通过将 hattori 对象设置为 yoshi 对象的原型，现在 yoshi 可以访问 hattori 对象的属性
assert.deepEqual(("creep" in hattori), false, "hattori cannot creep"); // 目前 hattori 对象还不具有属性 creep

Object.setPrototypeOf(hattori, kuma); // 将 kuma 对象设置为 hattoria 对象的原型

assert("creep" in hattori, true, "Hattori can now creep"); // 现在 hattori 对象可以访问属性 creep
assert("creep" in yoshi, true, "Yoshi can also creep"); // 通过将 hattori 对象设置为 yoshi 对象的原型，现在 yoshi 对象也可以访问属性 creep
