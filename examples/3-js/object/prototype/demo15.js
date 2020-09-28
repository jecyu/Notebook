/*
 * @Description: 在 ES6 实现继承
 * @Author: Jecyu
 * @Date: 2020-05-29 09:32:58
 * @LastEditTime: 2020-05-29 10:13:59
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");
class Person {
  constructor(name) {
    this.name = name;
  }
  dance() {
    return true;
  }
}

class Ninja extends Person { // 使用关键字 extends 实现继承
  constructor(name, weapon) {
    super(name); // 使用关键字 super 调用基类的构造函数
    this.weapon = weapon;
  }
  wieldWeapon() {
    return true;
  }
}

const person = new Person("Bob");
assert.strictEqual(person instanceof Person, true, "A person's a person");
assert.strictEqual(person.dance(), true, "A person can dance.");
assert.strictEqual(person.name === "Bob", true, "We can call it by name.");
assert.strictEqual(!(person instanceof Ninja), true, "But it's not a Ninja");

const ninja = new Ninja("Yoshi", "Wakizashi");
assert.strictEqual(ninja instanceof Ninja, true, "A ninja's a ninja");
assert.strictEqual(ninja.wieldWeapon(), true, "That can wield a weapon");
assert.strictEqual(ninja instanceof Person, true, "That can wield a weapon.");
