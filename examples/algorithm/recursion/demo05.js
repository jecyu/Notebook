/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-05-20 12:47:16
 * @LastEditTime: 2020-05-20 21:08:05
 * @LastEditors: Jecyu
 */

// 普通递归版本
function factorial(n) {
  console.trace();
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorial(n - 1); // 先入栈，再出栈
}

// 尾递归改造-第 1 步：
function tailFactorial(n, total = 1) {
  // 'use strict';
  if (n === 1 || n === 0) {
    return total;
  }
  // 把 total * n 传递过去，直接计算 total 值，当 n === 1 || n === 0 的时候，
  return tailFactorial(n - 1, total * n); // 在尾部调用的是函数本身，而不是  n * factorial(n - 1)，total 变量
}
// console.log("tailFactorial(5): ", tailFactorial(10000));  // 这个时候还是会出现爆栈问题。

// 尾递归改造-第 2 步：
function tailFactorial(n, total = 1) {
  // 'use strict';
  if (n === 1 || n === 0) {
    return total;
  }
  // 把 total * n 传递过去，直接计算 total 值，当 n === 1 || n === 0 的时候，
  // return tailFactorial(n - 1, total * n)  // 在尾部调用的是函数本身，而不是  n * factorial(n - 1)
  return tailFactorial.bind(null, n - 1, total * n); // 直接返回一个新版本的函数，而不是递归调用，并且使用了 total 记录了下来。这样就不用记录中间层的栈信息了。
}

function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
// 缺点：需要改造原来的递归调用，产生歧义
// 优点：


// 尾递归改造版本2：第 1 步
// 版本2有点反人类，还不如使用循环了
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments); // 每次都推入新的参数
    if (!active) { // active 控制每次入栈一次，又出栈。避免递归调用
      active = true;
      while (accumulated.length) { // 跳出循环条件
        value = f.apply(this, accumulated.shift()); // 执行函数，只要返回是函数，都会跳出去
      }
      active = false;
      return value;
    }
    // else 的话，跳动的递归上一层 aaa 函数，这样就不会出现层层递归入栈，相当于一种及时抽身的感觉。
  }; 
}

// 尾递归改造版本2：第 2 步
// 这里的 tco，返回新的函数 function accumulator() {....}
const tcoTailFactorial = tco(function aaa(n, total = 1) {
  // 'use strict';
  if (n === 1 || n === 0) {
    return total;
  }
  // 把 total * n 传递过去，直接计算 total 值，当 n === 1 || n === 0 的时候，
  return tcoTailFactorial(n - 1, total * n);  // 这个时候调用 tcoTailFactorial 后，再
  // 直接对原来的递归进行改造，这样不直观，相当于改造了原来的递归，使用新的处理
});

// 版本1
// const val = trampoline(tailFactorial(5));
// console.log('trampoline;', val);

// 版本2  结果 
const val2 = tcoTailFactorial(5);
console.log("tcoTailFactorial", val2); // 优化后，每次调用时先入栈，然后计算到结果马上出栈，而不用保留中间层状态（变量和调用地址）

