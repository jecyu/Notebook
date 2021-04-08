/*
 * @Author: naluduo233
 * @Date: 2021-04-04 12:00:21
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-05 22:28:29
 * @FilePath: /Notebook/examples/5-js/async/promise/设计维度/实现原理/NaluduoPromise3.js
 * @Description: 链式调用和值穿透
 * Promise 规范 https://promisesaplus.com/
 */
// 三个状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class NaluduoPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined; // 存放成功状态的值
    this.reason = undefined; // 存放失败状态的值
    // 针对异步才resolve的，我们需要先将成功和失败的回调分别存放起来，在 executor()的异步任务被执行时，触发 resolve 或 reject，依次调用成功或失败的回调。
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 调用此方法就是成功
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    // 调用此方法就是失败
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFUlfilled、onRejected
  then(onFulfilled, onRejected) {
    //解决 onFufilled，onRejected 没有传值的问题
    //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    // 因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    // 每次调用 then 都返回一个新的 promise Promise/A+ 2.2.7
    let promise2 = new NaluduoPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //Promise/A+ 2.2.2
        //Promise/A+ 2.2.4 --- 先执行完调用栈的代码，再执行 Promise 回调任务（微任务，这里用 setTimeout 模拟）
        setTimeout(() => {
          try {
            //Promise/A+ 2.2.7.1
            let x = onFulfilled(this.value); // 获取成功回调函数的执行结果
            resolvePromise(promise2, x, resolve, reject); // 传入传入resolvePromise 集中处理
          } catch (e) {
            //Promise/A+ 2.2.7.2
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            //Promise/A+ 2.2.7.1 // 值穿透，使用上一个 then 的 return 值作为回调参数
            let x = onRejected(this.reason); // 获取成功回调函数的执行结果
            resolvePromise(promise2, x, resolve, reject); // 传入传入resolvePromise 集中处理
          } catch (e) {
            //Promise/A+ 2.2.7.2
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // 自动等待自己完成是错误的实现，用一个类型错误，结束掉 promise Promise/A+ 2.3.1
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  // 只能调用一次
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      // 为了判断 resovle 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）Promise/A+ 2.3.3.1
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise）Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            // 只要失败就失败 Promise/A 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果， Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 普通值
    resolve(x);
  }
}
