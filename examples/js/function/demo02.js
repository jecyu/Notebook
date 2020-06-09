/*
 * @Description: 函数定义
 * @Author: Jecyu
 * @Date: 2020-06-08 14:25:06
 * @LastEditTime: 2020-06-08 14:32:08
 * @LastEditors: Jecyu
 */

// 函数声明
function samurai() {
  // 在全局代码中定义 samurai 函数
  return "samurai here";
}

function ninja() {
  function hiddenNinja() { // 在 ninja 函数内定义 hiddenNinja 函数
    return "ninja here";
  }
  return hiddenNinja();
}

// 函数表达式
var a = 3;
myFunction(4);
// or
var b = function() {}
myFunction2(function() {}) 