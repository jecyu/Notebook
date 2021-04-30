/*
 * @Author: naluduo233
 * @Date: 2021-04-04 11:57:44
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-20 10:56:41
 * @FilePath: /examples/5-js/async/promise/设计维度/实现原理/v2/NaluduoPromise.test.js
 * @Description: v1 基础上增强功能
 */
// 三个状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
describe("手写 Promise", () => {
  it("Promise v1 版本 + 链式调用 return this 的问题", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      then(onFulfilled) {
        if (this.state === "pending") {
          this.callbacks.push(onFulfilled); // 2. 延迟绑定，添加回调函数到数组中
        }
        if (this.state === "fulfilled") {
          onFulfilled(this.value); // resolve 直接执行回调
        }
        return this;
      }
      _resolve(value) {
        this.state = "fulfilled";
        this.value = value;
        // 当增加完状态之后，原先的_resolve中的定时器可以去掉了。当reolve同步执行时，虽然callbacks为空，回调函数还没有注册上来，但没有关系，因为后面注册上来时，判断状态为fulfilled，会立即执行回调。
        //看这里
        this.callbacks.forEach((fn) => fn(value)); // 3. 当异步操作执行成功后，会调用 _resolve 方法，将回调数组中的 callbacks 队列中的回调一一执行。
      }
      _reject() {}
    }
  });

  it("Promise v1 版本 + 真正的链式调用实现", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      // then 方法中，创建并返回了新的 Promise 实例，这是串行Promise的基础，是实现真正链式调用的根本
      // then 方法传入的形参 onFulfilled 以及创建新 Promise 实例时传入的 resolve 放在一起，被push到当前 Promise 的 callbacks 队列中，这是衔接当前 Promise 和后邻 Promise 的关键所在
      then(onFulfilled) {
        return new Promise((resolve) => {
          this._handle({
            onFulfilled: onFulfilled || null,
            resolve: resolve,
          });
        });
        // 以下逻辑封装到 _handle 函数里
        // if (this.state === "pending") {
        //   this.callbacks.push(onFulfilled); // 2. 延迟绑定，添加回调函数到数组中
        // }
        // if (this.state === "fulfilled") {
        //   onFulfilled(this.value); // resolve 直接执行回调
        // }
        // return this;
      }
      _resolve(value) {
        this.state = "fulfilled";
        this.value = value;
        // 当增加完状态之后，原先的_resolve中的定时器可以去掉了。当reolve同步执行时，虽然callbacks为空，回调函数还没有注册上来，但没有关系，因为后面注册上来时，判断状态为fulfilled，会立即执行回调。
        //看这里
        // this.callbacks.forEach((fn) => fn(value)); // 3. 当异步操作执行成功后，会调用 _resolve 方法，将回调数组中的 callbacks 队列中的回调一一执行。
        this.callbacks.forEach((callback) => this._handle(callback));
      }
      _reject() {}

      // 新增链式连接逻辑代码
      _handle(callback) {
        if (this.state === "pending") {
          this.callbacks.push(callback);
          return;
        }
        // 如果 then 中没有传递任何东西
        if (!callback.onFulfilled) {
          // 根据规范，onFulfilled 是可以为空的，为空时不调用 onFulfilled
          callback.resolve(this.value);
          return;
        }

        // Promise-1 的 onFulfilled 被执行，然后再调用 Promise-2.resolve
        const ret = callback.onFulfilled(this.value);
        callback.resolve(ret);
      }
    }

    const mockAjax = (url, s, callback) => {
      setTimeout(() => {
        callback(url + "异步请求耗时" + s + "秒");
      }, 1000 * s);
    };

    // 同步调用
    new NaPromise((resolve) => {
      resolve("getUserId同步请求");
    }).then((result) => {
      expect(result).toBe("getUserId同步请求");
    });

    // 异步调用
    new NaPromise((resolve) => {
      mockAjax("getUserId", 1, function(result) {
        resolve(result);
      });
    }).then((result) => {
      expect(result).toBe("getUserId异步请求耗时1秒");
      done();
    });

    new Promise((resolve) => {
      mockAjax("getUserId", 1, function(result) {
        resolve(result);
      });
    })
      .then((result) => {
        expect(result).toBe("getUserId异步请求耗时1秒");
        //对result进行第一层加工
        let exResult = "前缀:" + result;
        return exResult;
      })
      .then((result) => {
        expect(result).toBe("前缀:getUserId异步请求耗时1秒");
        done();
      });
  });

  it("Promise v1 版本 + 链式调用的意义", (done) => {
    const mockAjax = (url, s, callback) => {
      setTimeout(() => {
        callback(url + "异步请求耗时" + s + "秒");
      }, 1000 * s);
    };
    // 刚才演示的都是 onFulfilled 返回值是 value 的情况，如果是一个 Promise 呢？是不是就可以通过 onFulfilled，由使用 Promise 的开发者决定后续 Promise 的状态。
    // 于是在 _resolve 中增加对前一个 Promise onFulfilled 返回值的判断：
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      // then 方法中，创建并返回了新的 Promise 实例，这是串行Promise的基础，是实现真正链式调用的根本
      // then 方法传入的形参 onFulfilled 以及创建新 Promise 实例时传入的 resolve 放在一起，被push到当前 Promise 的 callbacks 队列中，这是衔接当前 Promise 和后邻 Promise 的关键所在
      then(onFulfilled) {
        return new Promise((resolve) => {
          this._handle({
            // 2. 延迟绑定，添加回调函数到数组中
            onFulfilled: onFulfilled || null,
            resolve: resolve,
          });
        });
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
      _reject() {}

      // 新增链式连接逻辑代码
      _handle(callback) {
        if (this.state === "pending") {
          this.callbacks.push(callback);
          return;
        }
        // 如果 then 中没有传递任何东西
        if (!callback.onFulfilled) {
          // 根据规范，onFulfilled 是可以为空的，为空时不调用 onFulfilled
          callback.resolve(this.value);
          return;
        }

        // Promise-1 的 onFulfilled 被执行，然后再调用 Promise-2.resolve
        const ret = callback.onFulfilled(this.value);
        callback.resolve(ret);
      }
    }

    const pUserId = new NaPromise((resolve) => {
      mockAjax("getUserId", 1, function(result) {
        resolve(result);
      });
    });
    const pUserName = new NaPromise((resolve) => {
      mockAjax("getUserName", 2, function(result) {
        resolve(result);
      });
    });

    pUserId
      .then((id) => {
        expect(id).toBe(`getUserId异步请求耗时1秒`);
        return pUserName;
      })
      .then((name) => {
        expect(name).toBe(`getUserName异步请求耗时2秒`);
        done();
      });
  });
});
