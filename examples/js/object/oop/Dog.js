/*
 * @Description: Dog 类 -> Canine
 * @Author: Jecyu
 * @Date: 2020-07-03 07:49:47
 * @LastEditTime: 2020-07-03 07:58:11
 * @LastEditors: Jecyu
 */

const { Canine } = require("./Canine");
const { inheri } = require("./utils");

function Dog(picture, food, hunger, boundaries) {
  Canine.call(this, picture, food, hunger, boundaries);
}
inheri(Dog, Canine);

exports.Dog = Dog;
