/*
 * @Description: 代码组合（compose）
 * @Author: Jecyu
 * @Date: 2020-05-28 12:36:06
 * @LastEditTime: 2020-05-28 13:17:41
 * @LastEditors: Jecyu
 */ 
const assert = require('assert');
const compose = function(f, g) {
  return function(x) {
    return f(g(x));
  }
}

const toUpperCase = function(x) {
  return x.toUpperCase();
}

const exclaim = function(x) {
  return x + "!";
}

const shout = compose(exclaim, toUpperCase);
shout('send in clowns');
assert.strictEqual(shout('send in clowns'), "SEND IN CLOWNS!", "compose call")