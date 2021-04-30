/*
 * @Author: naluduo233
 * @Date: 2021-04-04 11:59:34
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-20 16:43:47
 * @FilePath: /examples/5-js/async/promise/设计维度/实现原理/v3/NaluduoPromise.test.js
 * @Description:
 */

describe("手写 Promise ", () => {
  it("v2 版本 + 构造函数错误处理 onRejected", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      _resolve(value) {
        if (
          (value && typeof value === "object") ||
          typeof value === "function"
        ) {
          // 为什么 typeof 这里的判断 promise 对象可以是函数？
          const then = value.then;
          if (typeof then === "function") {
            // 判断 resolve 的值是否为 Promise实例，如果是 Promise 实例，那么就把当前 Promise 实例的状态改变接口重新注册到 resolve 的值对应的 Promise 的 onFulfilled 中，也就是说当前 Promise3 实例的状态要依赖 resolve 的值的 Promise2 实例的状态。 Promise2.onFullfilled = Promise3._resolve
            then.call(value, this._resolve.bind(this)); // TODO，这里需要回顾理解。
            return;
          }
        }
        this.state = "fulfilled";
        this.value = value;

        // 3. 当异步操作执行成功后，会调用 _resolve 方法，将回调数组中的 callbacks 队列中的回调一一执行。
        this.callbacks.forEach((callback) => this._handle(callback));
      }
      _reject(error) {
        this.state = "rejeceted";
        this.value = error;
        this.callbacks.forEach((callback) => this._handle(callback));
      }

      // then 方法中，创建并返回了新的 Promise 实例，这是串行 Promise的基础，是实现真正链式调用的根本
      // then 方法传入的形参 onFulfilled 以及创建新 Promise 实例时传入的 resolve 放在一起，被push到当前 Promise 的 callbacks 队列中，这是衔接当前 Promise 和后邻 Promise 的关键所在
      then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
          this._handle({
            // 2. 延迟绑定，添加回调函数到数组中
            onFulfilled: onFulfilled || null,
            resolve: resolve,
            onRejected: onRejected || null,
            reject: reject,
          });
        });
      }

      // 新增链式连接逻辑代码
      _handle(callback) {
        if (this.state === "pending") {
          this.callbacks.push(callback);
          return;
        }

        let cb =
          this.state === "fulfilled"
            ? callback.onFulfilled
            : callback.onRejected;

        // 如果 then 中没有传递任何东西
        if (!cb) {
          // 根据规范，onFulfilled 是可以为空的，为空时不调用 onFulfilled
          cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
          cb(this.value);
          return;
        }

        // Promise-1 的 onFulfilled 被执行，然后再调用 Promise-2.resolve
        const ret = cb(this.value);
        cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
        cb(ret);
        // const ret = callback.onFulfilled(this.value);
        // callback.resolve(ret);
      }
    }

    const mockAjax = (url, s, callback) => {
      setTimeout(() => {
        callback(url + "异步请求耗时" + s + "秒", "出错了!");
      }, 1000 * s);
    };

    new NaPromise((resolve, reject) => {
      mockAjax("getUserId", 1, function(result, error) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }).then(
      (result) => {
        expect(result).toBe(`getUserId异步请求耗时1秒`);
        done();
      },
      (error) => {
        expect(error).toBe(`出错了!`);
        done();
      }
    );
  });

  it("v2 版本 + 构造函数错误处理 + 异常处理 catch", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      _resolve(value) {
        if (
          (value && typeof value === "object") ||
          typeof value === "function"
        ) {
          // 为什么 typeof 这里的判断 promise 对象可以是函数？
          const then = value.then;
          if (typeof then === "function") {
            // 判断 resolve 的值是否为 Promise实例，如果是 Promise 实例，那么就把当前 Promise 实例的状态改变接口重新注册到 resolve 的值对应的 Promise 的 onFulfilled 中，也就是说当前 Promise3 实例的状态要依赖 resolve 的值的 Promise2 实例的状态。 Promise2.onFullfilled = Promise3._resolve
            then.call(value, this._resolve.bind(this)); // TODO，这里需要回顾理解。
            return;
          }
        }
        this.state = "fulfilled";
        this.value = value;

        // 3. 当异步操作执行成功后，会调用 _resolve 方法，将回调数组中的 callbacks 队列中的回调一一执行。
        this.callbacks.forEach((callback) => this._handle(callback));
      }
      _reject(error) {
        this.state = "rejeceted";
        this.value = error;
        this.callbacks.forEach((callback) => this._handle(callback));
      }

      // then 方法中，创建并返回了新的 Promise 实例，这是串行 Promise的基础，是实现真正链式调用的根本
      // then 方法传入的形参 onFulfilled 以及创建新 Promise 实例时传入的 resolve 放在一起，被push到当前 Promise 的 callbacks 队列中，这是衔接当前 Promise 和后邻 Promise 的关键所在
      then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
          this._handle({
            // 2. 延迟绑定，添加回调函数到数组中
            onFulfilled: onFulfilled || null,
            resolve: resolve,
            onRejected: onRejected || null,
            reject: reject,
          });
        });
      }

      catch(onError) {
        // ---- 新增
        return this.then(null, onError);
      }

      // 新增链式连接逻辑代码
      _handle(callback) {
        if (this.state === "pending") {
          this.callbacks.push(callback);
          return;
        }

        let cb =
          this.state === "fulfilled"
            ? callback.onFulfilled
            : callback.onRejected;

        // 如果 then 中没有传递任何东西
        if (!cb) {
          // 根据规范，onFulfilled 是可以为空的，为空时不调用 onFulfilled
          cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
          cb(this.value);
          return;
        }

        // Promise-1 的 onFulfilled 被执行，然后再调用 Promise-2.resolve
        // const ret = cb(this.value);
        // cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
        // cb(ret);
        let ret;
        try {
          ret = cb(this.value);
          cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
        } catch (error) {
          ret = error;
          cb = callback.reject;
        } finally {
          cb(ret);
        }
      }
    }

    const mockAjax = (url, s, callback) => {
      setTimeout(() => {
        callback(url + "异步请求耗时" + s + "秒", "出错了!");
      }, 1000 * s);
    };

    new NaPromise((resolve, reject) => {
      mockAjax("getUserId", 1, function(result, error) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }).catch((error) => {
      expect(error).toBe(`出错了!`);
      done();
    });
  });

  it("v2 版本 + 构造函数错误处理 + 异常处理 catch + finally", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      _resolve(value) {
        if (
          (value && typeof value === "object") ||
          typeof value === "function"
        ) {
          // 为什么 typeof 这里的判断 promise 对象可以是函数？
          const then = value.then;
          if (typeof then === "function") {
            // 判断 resolve 的值是否为 Promise实例，如果是 Promise 实例，那么就把当前 Promise 实例的状态改变接口重新注册到 resolve 的值对应的 Promise 的 onFulfilled 中，也就是说当前 Promise3 实例的状态要依赖 resolve 的值的 Promise2 实例的状态。 Promise2.onFullfilled = Promise3._resolve
            then.call(value, this._resolve.bind(this)); // TODO，这里需要回顾理解。
            return;
          }
        }
        this.state = "fulfilled";
        this.value = value;

        // 3. 当异步操作执行成功后，会调用 _resolve 方法，将回调数组中的 callbacks 队列中的回调一一执行。
        this.callbacks.forEach((callback) => this._handle(callback));
      }
      _reject(error) {
        this.state = "rejeceted";
        this.value = error;
        this.callbacks.forEach((callback) => this._handle(callback));
      }

      // 新增链式连接逻辑代码
      _handle(callback) {
        if (this.state === "pending") {
          this.callbacks.push(callback);
          return;
        }

        let cb =
          this.state === "fulfilled"
            ? callback.onFulfilled
            : callback.onRejected;

        // 如果 then 中没有传递任何东西
        if (!cb) {
          // 根据规范，onFulfilled 是可以为空的，为空时不调用 onFulfilled
          cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
          cb(this.value);
          return;
        }

        // Promise-1 的 onFulfilled 被执行，然后再调用 Promise-2.resolve
        // const ret = cb(this.value);
        // cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
        // cb(ret);
        let ret;
        try {
          ret = cb(this.value);
          cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
        } catch (error) {
          ret = error;
          cb = callback.reject;
        } finally {
          cb(ret);
        }
      }

      // then 方法中，创建并返回了新的 Promise 实例，这是串行 Promise的基础，是实现真正链式调用的根本
      // then 方法传入的形参 onFulfilled 以及创建新 Promise 实例时传入的 resolve 放在一起，被push到当前 Promise 的 callbacks 队列中，这是衔接当前 Promise 和后邻 Promise 的关键所在
      then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
          this._handle({
            // 2. 延迟绑定，添加回调函数到数组中
            onFulfilled: onFulfilled || null,
            resolve: resolve,
            onRejected: onRejected || null,
            reject: reject,
          });
        });
      }

      catch(onError) {
        // ---- 新增
        return this.then(null, onError);
      }

      finally(onDone) {
        if (typeof onDone !== "function") return this.then(); // TODO 这一步为什么调用 this.thne() 待理解
        let NaPromise = this.constructor; 
        // TODO 这里依赖 NaPromise.resolve 先实现
        return this.then(
          (value) => NaPromise.resolve(onDone()).then(() => value),
          (reason) =>
            NaPromise.resolve(onDone()).then(() => {
              throw reason;
            })
        );
      }
    }

    const mockAjax = (url, s, callback) => {
      setTimeout(() => {
        callback(url + "异步请求耗时" + s + "秒", "出错了!");
      }, 1000 * s);
    };

    new NaPromise((resolve, reject) => {
      mockAjax("getUserId", 1, function(result, error) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }).catch((error) => {
      expect(error).toBe(`出错了!`);
      done();
    });
  });
});
