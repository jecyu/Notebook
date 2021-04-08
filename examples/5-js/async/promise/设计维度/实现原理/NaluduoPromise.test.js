/*
 * @Author: naluduo233
 * @Date: 2021-03-19 14:34:37
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-05 22:37:19
 * @FilePath: /Notebook/examples/5-js/async/promise/设计维度/实现原理/NaluduoPromise.test.js
 * @Description:
 */
const NaluduoPromise = require("./NaluduoPromise4.js");

describe("手写 Promise", () => {
  // it("Promise 之延迟绑定回调函数 ", () => {
  //   function NaluduoPromise(executor) {
  //     var onResolve_ = null; // 记录外部传递的 resolve 函数
  //     var onReject_ = null;
  //     // 模拟实现 resolve 和 then，暂不支持 reject
  //     this.then = function(onResolve, onReject) {
  //       onResolve_ = onResolve;
  //     };
  //     function resolve(value) {
  //       // 记录一开始
  //       setTimeout(() => {
  //         // Promise 之所以要使用微任务是由 Promise 回调函数延迟绑定技术导致的，需要用微任务代替
  //         onResolve_(value);
  //       }, 0);
  //     }
  //     executor(resolve, null); // 执行 executor 函数
  //   }

  //   function executor(resolve, reject) {
  //     resolve(100);
  //   }
  //   let demo = new NaluduoPromise(executor);
  //   function onResolve(value) {
  //     console.log(value);
  //   }
  //   demo.then(onResolve); // Jest 异步测试 Promise
  // });
  it("Promise-支持同步操作，核心逻辑实现", () => {});

  it("Promise——支持异步操作", () => {});

  it("Promise——then 的链式调用&值穿透", () => {
  });

  it("Promise.resolve", () => {});

  it("Promise.reject", () => {});

  it("Promise.prototype.catch", () => {});

  it("Promise.prototype.finally", () => {});

  it("Promise.all", () => {});
  it("Promise.race", () => {});
});
