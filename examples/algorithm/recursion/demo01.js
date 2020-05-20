/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-05-20 00:15:00
 * @LastEditTime: 2020-05-20 12:43:10
 * @LastEditors: Jecyu
 */
"use strict";
function factorialIterative(number) {
  if (number < 0) {
    return undefined;
  }
  let total = 1;
  for (let n = number; n > 1; n--) {
    total = total * n; // 每次计算都直接返回新值，刷新旧值，不需要占存中间变量
  }
  return total;
}
console.time("factorialIterative");
console.log("factorialIterative(5): ", factorialIterative(5)); // 可以计算
// console.log('factorialIterative(10000): ', factorialIterative(10000)); // 可以计算
console.timeEnd("factorialIterative"); // 0.542236328125ms
// console.log('factorialIterative(100000): ', factorialIterative(100000)); // 可以计算

// 函数地址和临时变量都会入栈，临时变量 n
function factorial(n) {
  debugger;
  console.trace();
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorial(n - 1); // 先入栈，再出栈
}
console.time("factorial");
console.log("factorial(5): ", factorial(5)); // 可以计算
// console.log("factorial(10000): ", factorial(10000));
console.timeEnd("factorial"); // 递归花费的时间更长  2.0810546875ms
// console.log("factorial(100000): ", factorial(100000)); // 爆栈


function tailFactorial(n, total = 1) {
  debugger;
  if (n === 1 || n === 0) {
    return total;
  } 
  // 把 total * n 传递过去，直接计算 total 值，当 n === 1 || n === 0 的时候，
  return tailFactorial(n - 1, total * n)  // 在尾部调用的是函数本身，而不是  n * factorial(n - 1)
}
console.log("tailFactorial(5): ", tailFactorial(5)); 
// 跟普通的递归一样，函数的调用地址是需要入栈的。但是 tailFactorial 直接返回递归的函数调用，不需要对其进行运算（节省时间）
// 对栈空间是线性的，但是还是可能会有爆栈的。为什么尾递归只保存一条记录？

// 对于刚刚修改的结果是无效的，那些积累的状态一样会缓存，除非了编译器做优化，把之前所积累下的各种状态对于递归调用结果已经没有任何意义，因此完全可以把本次方法中留在堆栈中的数据完全清除，把空间让给最后的递归调用。这样就是尾递归了。

// 对于没有对尾递归优化的编译器，则需要手动转换为循环。