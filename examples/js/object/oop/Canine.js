/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-06-29 08:08:40
 * @LastEditTime: 2020-07-03 08:04:02
 * @LastEditors: Jecyu
 */ 
const { Animal } = require('./Animal');

function inheri(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype); // 实现继承
  subClass.__proto__ = superClass;  // 子类的原型指向父类
  // 这里的继承比直接 subClass.prototype =  new superClass，灵活，不用实例化传递参数
  // 补回丢失的属性
  Object.defineProperty(subClass, "constructor", {
    enumerable: false,
    value: subClass,
    writable: true
  })
}

function Canine(picture, food, hunger, boundaries) {
  return Animal.call(this, picture, food, hunger, boundaries);
}
inheri(Canine, Animal);
// Canine.prototype = new Animal(picture, food, hunger, boundaries);
// 对方法进行覆盖
Canine.prototype.makeNoise = function() {
  console.log("Canine makeNoise!");
  return "Canine makeNoise!"
};

Canine.prototype.eat = function() {
  console.log("Canine eat!");
}

exports.Canine = Canine;