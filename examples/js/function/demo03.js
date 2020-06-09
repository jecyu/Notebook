/*
 * @Description: 函数声明和函数表达式
 * @Author: Jecyu
 * @Date: 2020-06-08 14:34:32
 * @LastEditTime: 2020-06-08 15:09:11
 * @LastEditors: Jecyu
 */

function myFunctionDeclaration() {
  // 独立的函数声明
  function innerFunction() {} // 内部函数声明
}

var myFunc = function() {}; // 函数表达式作为变量声明赋值语句中的一部分
myFunc(function() {
  // 函数表达式作为一次函数调用中的参数
  return function() {}; // 函数表达式作为返回值
});

(function namedFunctionExpression() {})(); // 作为函数调用的一部分，命名函数表达式会被立即调用

// 函数表达式可以作为一元操作符的参数立即调用
+function(){}();
-function(){}();
!function(){}();
~function(){}(); 
