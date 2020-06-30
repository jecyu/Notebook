/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-06-29 08:08:40
 * @LastEditTime: 2020-06-30 08:11:40
 * @LastEditors: Jecyu
 */ 
const Animal = require('./Animal');
function Canine(picture, food, hunger, boundaries) {
  
}

Canine.prototype = new Animal();
Object.defineProperty(Canine.prototype, "constructor", {
  enumerable: false,
  value: Canine,
  writable: true
})
exports.Canine = Canine;