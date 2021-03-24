/*
 * @Description: 在 ES6 中的静态方法 
 * @Author: Jecyu
 * @Date: 2020-05-29 09:15:47
 * @LastEditTime: 2020-05-29 09:30:09
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");
class Ninja {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }

  swingSword() {
    return true;
  }

  static compare(ninja1, ninja2) { // 使用关键字 static 创建静态方法，在 es5 中其实就是直接给函数添加属性值
    return ninja1.level - ninja2.level; 
  }
}

const ninja1 = new Ninja("Yoshi", 4);
const ninja2 = new Ninja("Hattori", 3);

assert.strictEqual(!("compare" in ninja1) && !("compare" in ninja2), true, "A ninja instance doesn't know how to compare"); // ninja 实例不可访问 compare 方法
assert.strictEqual(Ninja.compare(ninja1, ninja2) > 0, true, "The Ninja class can do the comparition!"); // Ninja 类可访问 compare 方法
assert.strictEqual(!("swingSword" in Ninja), true, "The Ninja class cannot swing a sword");