/*
 * @Description: 通过构造函数实现对象类型
 * @Author: Jecyu
 * @Date: 2020-05-27 08:06:58
 * @LastEditTime: 2020-05-27 12:35:41
 * @LastEditors: Jecyu
 */ 

const assert = require('assert');
function Ninja() {}
const ninja = new Ninja();

assert(typeof ninja === "object", true, "The type of instance is object."); // 通过 typeof 检测 ninja 的类型，但从结果仅仅能够得知 ninja 是一个对象而已

assert(ninja instanceof Ninja, true, "instanceof identifies the constructor."); // 通过 instanceof 检测 ninja 的类型，其结果提供更多信息—— ninja 是由 Ninja 构造而来的

assert(ninja.constructor === Ninja, true, "The ninja object was created by the Ninja function.");