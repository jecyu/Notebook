/*
 * @Author: Jecyu
 * @Date: 2020-12-18 10:36:26
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-18 11:57:25
 * @FilePath: /examples/3-js/object/元编程/get-set.js
 * @Description: 判断禁用属性的对象是否为空
 */
const obj = {};
Object.defineProperty(d, "year", {});
console.log('obj ->', obj);
