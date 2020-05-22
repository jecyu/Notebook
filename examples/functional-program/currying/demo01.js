/*
 * @Description: 柯里化入门
 * @Author: Jecyu
 * @Date: 2020-05-21 10:17:45
 * @LastEditTime: 2020-05-21 14:48:04
 * @LastEditors: Jecyu
 */

// 柯里化为了惰性求值，先传入一部分参数，利用闭包的特性返回了一个记住前面的参数的新函数，在调用的时候，让这个新函数处理剩下的参数。也就是延迟执行。
const assert = require('assert');
// 原始版本
function add(x, y) {
  return x + y;
}

// 假设实现效果
// curriedAdd(1)(3) === 4

// curriedAdd 版本
function curriedAdd(x) {
  return function(y) {
    return x + y;
  };
}

const increment = curriedAdd(1);
const result = increment(2);
console.assert(increment(2) === 3, "3成功");
// console.assert(increment(2) === 2, "失败");

/**
 * 进一步抽象，使柯里化更加通用，接收需要转换
 * 在这个版本里，柯里化的函数柯里化的返回值是一个接收剩余参数并立即返回计算值的参数。返回的函数没有被柯里化。
 * */

function currying(fn, ...arg1) {
  // 复用了 arg1 参数，并且延迟执行
  return function(...arg2) {
    return fn(...arg1, ...arg2);
  };
}

// const increment2 = currying(add, 1);
// console.assert(increment2(2) === 3, "1+2 = 3 ");

/**
 * 返回的函数也能被柯里化
 * const increment = currying(add, 1);
 * increment(2) === 3
 * const increment2 = increment(2)
 * increment2(3) ===
 */
(function() {
  function trueCurrying(fn, ...args) {
    if (args.length >= fn.length) {
      // 当接收的参数数量大于等于被 Currying 函数的传入参数数量时，就返回计算结果，大于才需要延迟执行，复用参数
      return fn(...args);
    }
    return function(...arg2) {
      // 否则，就返回一个继续接收参数的函数
      return trueCurrying(fn, ...args, ...arg2);
    };
  }

  function add2(x, y, z) {
    return x + y + z;
  }
  // console.assert(trueCurrying(add2, 1, 2, 3)=== 6, "1+2+3 = 6"); // 浏览器可以使用这个断言测试，如果是node环境可以使用 assert 模块
  // assert.strictEqual
  // (trueCurrying(add2, 1, 2, 3), 6) // 错误才会提醒，严格相等才会有更具体的错误信息，实际值，期望值比较
  // assert.strictEqual(trueCurrying(add2, 1, 2)(3), 6)
  assert.strictEqual(trueCurrying(add2, 1)(2)(3), 6)
})();
