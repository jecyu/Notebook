/*
 * @Description: 一等函数
 * @Author: Jecyu
 * @Date: 2020-05-22 07:26:02
 * @LastEditTime: 2020-05-22 07:52:03
 * @LastEditors: Jecyu
 */

const assert = require("assert");

/////// JavaScript 函数是对象
function greeting() {
  console.log("Hello World");
}
greeting();

greeting.lang = "English";
assert.strictEqual(greeting.lang, "English");

(function() {
  //////// 将函数赋给变量
  const square = function(x) {
    return x * x;
  };
  assert.strictEqual(square(5), 25);
  // 也可以传递它们
  const foo = square;
  assert.strictEqual(foo(6), 36);
})();

// 将函数作为参数传递给其他函数
function formalGreeting() {
  console.log("How are you?");
}
function casualGreeting() {
  console.log("What's up?");
}
function greet(type, greetFormal, greetCasual) {
  if (type === "formal") {
    // 这种还可以采用策略函数处理
    greetFormal();
  } else if (type === "casual") {
    greetCasual();
  }
}
// print "What's up?"
greet("casual", formalGreeting, casualGreeting);
