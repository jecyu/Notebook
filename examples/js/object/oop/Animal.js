/*
 * @Description: JS 面向对象与继承
 * @Author: Jecyu
 * @Date: 2020-06-29 07:51:39
 * @LastEditTime: 2020-06-30 07:55:16
 * @LastEditors: Jecyu
 */

// constructor
function Animal(picture, food, hunger, boundaries) {
  this.picture = picture;
  this.food = food;
  this.hunger = hunger;
  this.boundaries = boundaries;
}

Animal.prototype.makeNoise = function() {
  console.log("Animal makeNoise!");
};

Animal.prototype.eat = function() {
  console.log("Animal eat!");
}

Animal.prototype.sleep = function() {
  console.log("Animal sleep!");
}

Animal.prototype.roam = function() {
  console.log("Animal roam!");
}

exports.Animal = Animal;