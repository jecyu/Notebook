/*
 * @Description: 在 ES6 中创建类
 * @Author: Jecyu
 * @Date: 2020-05-29 08:55:14
 * @LastEditTime: 2020-05-29 09:03:55
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");
class Ninja { // 使用 ES6 指定的关键字
  constructor(name) { // 定义一个构造函数，当使用关键字 new 调用类时，会调用这个构造函数
    this.name = name;
  }
  swingSword() { // 定义一个所有 Ninja 实例均可访问的方法
    return true; 
  }
}

const ninja = new  Ninja("Yoshi"); // 使用 new 创建实例对象 ninja
assert.strictEqual(ninja instanceof Ninja, true, "Our ninja is a Ninja");
assert.strictEqual(ninja.name === "Yoshi", true, "named Yoshi");
assert.strictEqual(ninja.swingSword(), true, "and  he can swing a sword");