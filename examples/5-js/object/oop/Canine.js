/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-06-29 08:08:40
 * @LastEditTime: 2020-08-13 14:15:59
 * @LastEditors: Jecyu
 */ 
const { Animal } = require('./Animal');
const { inheri } = require("./utils");

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