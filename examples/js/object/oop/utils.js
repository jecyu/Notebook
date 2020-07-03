/*
 * @Description: utils 工具类
 * @Author: Jecyu
 * @Date: 2020-07-03 07:51:21
 * @LastEditTime: 2020-07-03 07:52:47
 * @LastEditors: Jecyu
 */ 

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

exports.inheri = inheri;