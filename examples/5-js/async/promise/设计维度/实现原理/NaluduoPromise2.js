/*
 * @Author: naluduo233
 * @Date: 2021-04-04 11:59:34
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-04 12:02:30
 * @FilePath: /examples/5-js/async/promise/设计维度/实现原理/NaluduoPromise2.js
 * @Description: 
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
       // 针对异步才resolve的，我们需要先将成功和失败的回调分别缓存起来起来，在executor()的异步任务被执行时，触发 resolve 或 reject，依次调用成功或失败的回调。
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
       if (this.status === FULFILLED) {
         onFulfilled(this.value); // 延迟绑定回调函数
       }

       if (this.status === onRejected) {
         onRejected(this.reason);
       }

       if (this.status === PENDING) {
         this.onResolvedCallbacks.push(() => {
           onFulfilled(this.value);
         });
         this.onRejectedCallbacks.push(() => {
           onRejected(this.reason);
         });
       }
     }
   }
  module.exports = NaluduoPromise;