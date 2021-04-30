/*
 * @Author: naluduo233
 * @Date: 2021-04-04 12:00:21
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-21 17:48:02
 * @FilePath: /examples/5-js/async/promise/设计维度/实现原理/v4/NaluduoPromise.test.js
 * @Description: 静态方法
 * Promise 规范 https://promisesaplus.com/
 */
// 三个状态
describe("手写 Promise ", () => {
  it("v3 版本 + Promise.resolve", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      static resolve(value) {
        if (value && value instanceof NaPromise) {
          // 参数是一个 Promise 实例
          return value;
        } else if (
          // 参数是一个 thenable 对象
          value &&
          typeof value === "object" &&
          typeof value.then === "function"
        ) {
          let then = value.then;
          return new NaPromise((resolve) => {
            then(resolve);
          });
        } else if (value) {
          //参数不是具有 then 方法的对象，或根本就不是对象
          return new NaPromise((resolve) => resolve(value));
        } else {
          // 不带任何参数
          return new NaPromise((resolve) => resolve());
        }
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
        return this.then(
          (value) => NaPromise.resolve(onDone()).then(() => value),
          (reason) =>
            NaPromise.resolve(onDone()).then(() => {
              throw reason;
            })
        );
      }
    }

    // ----- 不带参数的demo ---- //
    const result1 = NaPromise.resolve();
    expect(result1 instanceof NaPromise).toEqual(true);

    // ----- 参数不为thenable的demo ---- //
    expect(NaPromise.resolve(123)).resolves.toBe(123);

    // ---- 参数为thenable的 demo  ---- //
    expect(
      NaPromise.resolve({
        then: (onFulfilled) => onFulfilled("fulfilled!"),
      })
    ).resolves.toBe("fulfilled!");

    // ---- 参数为 Promise实例的 demo --- //
    /**
     * 随机返回 0-9，模拟获取到的UserId
     */
    const mockGetUserId = (callback) => {
      setTimeout(() => {
        callback(Math.floor(Math.random() * 10));
      }, 1000);
    };

    /**
     * 模拟返回id对应的Name
     */
    const mockGetNameById = (id, callback) => {
      setTimeout(() => {
        callback(id + "-Name");
      }, 1000);
    };
    const Id2NameMap = {};
    const getNameById = function(id) {
      if (Id2NameMap[id]) return Id2NameMap[id];

      return new NaPromise((resolve) => {
        mockGetNameById(id, function(name) {
          Id2NameMap[id] = name;
          resolve(name);
        });
      });
    };

    mockGetUserId(function(id) {
      NaPromise.resolve(getNameById(id)).then((name) => {
        expect(name.includes("-Name")).toEqual(true);
        done();
      });
    });
  });

  it("v3 版本 + Promise.resolve + Promise.reject", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }

      static resolve(value) {
        if (value && value instanceof NaPromise) {
          // 参数是一个 Promise 实例
          return value;
        } else if (
          // 参数是一个 thenable 对象
          value &&
          typeof value === "object" &&
          typeof value.then === "function"
        ) {
          let then = value.then;
          return new NaPromise((resolve) => {
            then(resolve);
          });
        } else if (value) {
          //参数不是具有 then 方法的对象，或根本就不是对象
          return new NaPromise((resolve) => resolve(value));
        } else {
          // 不带任何参数
          return new NaPromise((resolve) => resolve());
        }
      }

      static reject(value) {
        if (
          value &&
          typeof value === "object" &&
          typeof value.then === "function"
        ) {
          let then = value.then;
          return new NaPromise((resovle, reject) => {
            then(reject); // TODO 理解为什么直接传入 reject 为第一个参数
          });
        } else {
          return new Promise((resolve, reject) => reject(value));
        }
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
        return this.then(
          (value) => NaPromise.resolve(onDone()).then(() => value),
          (reason) =>
            NaPromise.resolve(onDone()).then(() => {
              throw reason;
            })
        );
      }
    }

    // ---- 非 Promise 实例  ---- //
    let promise = NaPromise.reject(42);
    promise.catch(function(value) {
      expect(value).toBe(42);
      done();
    });

    // ---- Promise 实例 ----- //
  });

  it("v3 版本 + Promise.resolve + Promise.reject + Promise.all", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }

      static resolve(value) {
        if (value && value instanceof NaPromise) {
          // 参数是一个 Promise 实例
          return value;
        } else if (
          // 参数是一个 thenable 对象
          value &&
          typeof value === "object" &&
          typeof value.then === "function"
        ) {
          let then = value.then;
          return new NaPromise((resolve) => {
            then(resolve);
          });
        } else if (value) {
          //参数不是具有 then 方法的对象，或根本就不是对象
          return new NaPromise((resolve) => resolve(value));
        } else {
          // 不带任何参数
          return new NaPromise((resolve) => resolve());
        }
      }

      static reject(value) {
        if (
          value &&
          typeof value === "object" &&
          typeof value.then === "function"
        ) {
          let then = value.then;
          return new NaPromise((resovle, reject) => {
            then(reject); // TODO 理解为什么直接传入 reject 为第一个参数
          });
        } else {
          return new NaPromise((resolve, reject) => reject(value));
        }
      }

      static all(promises) {
        return new NaPromise((resolve, reject) => {
          let fulfilledCount = 0;
          const itemNum = promises.length;
          const rets = Array.from({ length: itemNum });
          promises.forEach((promise, index) => {
            NaPromise.resolve(promise).then(
              (result) => {
                fulfilledCount++;
                rets[index] = result;
                if (fulfilledCount === itemNum) {
                  resolve(rets);
                }
              },
              (reason) => reject(reason)
            );
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
        return this.then(
          (value) => NaPromise.resolve(onDone()).then(() => value),
          (reason) =>
            NaPromise.resolve(onDone()).then(() => {
              throw reason;
            })
        );
      }
    }

    // 每一个 promise 都决议完成
    const p1 = new NaPromise((resolve, reject) => {
      setTimeout(() => resolve("p1"), 1000);
    });

    const p2 = new NaPromise((resolve, reject) => {
      setTimeout(() => resolve("p2"), 2000);
    });

    const p3 = NaPromise.all([p1, p2]);
    p3.then((rets) => {
      expect(rets).toEqual(["p1", "p2"]);
      done();
    });

    // 若传递给 NaPromise.all() 的任意 Promise 被拒绝了，那么方法所返回的 Promise 就会立刻被拒绝，而不必等待其他的 Promise 结束。
  });

  it("v3 版本 + Promise.resolve + Promise.reject + Promise.all + Promise.race", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      state = "pending"; // 增加状态
      value = null; // 保存结果
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }

      static resolve(value) {
        if (value && value instanceof NaPromise) {
          // 参数是一个 Promise 实例
          return value;
        } else if (
          // 参数是一个 thenable 对象
          value &&
          typeof value === "object" &&
          typeof value.then === "function"
        ) {
          let then = value.then;
          return new NaPromise((resolve) => {
            then(resolve);
          });
        } else if (value) {
          //参数不是具有 then 方法的对象，或根本就不是对象
          return new NaPromise((resolve) => resolve(value));
        } else {
          // 不带任何参数
          return new NaPromise((resolve) => resolve());
        }
      }

      static reject(value) {
        if (
          value &&
          typeof value === "object" &&
          typeof value.then === "function"
        ) {
          let then = value.then;
          return new NaPromise((resovle, reject) => {
            then(reject); // TODO 理解为什么直接传入 reject 为第一个参数
          });
        } else {
          return new Promise((resolve, reject) => reject(value));
        }
      }

      static all(promises) {
        return new Promise((resolve, reject) => {
          let fulfilledCount = 0;
          const itemNum = promises.length;
          const rets = Array.from({ length: itemNum });
          promises.forEach((promise, index) => {
            Promise.resolve(promise).then(
              (result) => {
                fulfilledCount++;
                rets[index] = result;
                if (fulfilledCount === itemNum) {
                  resolve(rest);
                }
              },
              (reason) => reject(reason)
            );
          });
        });
      }

      static race(promises) {
        return new Promise(function(resolve, reject) {});
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
        return this.then(
          (value) => NaPromise.resolve(onDone()).then(() => value),
          (reason) =>
            NaPromise.resolve(onDone()).then(() => {
              throw reason;
            })
        );
      }
    }

    // --- 只要有一个 promise 被解决，所返回的 Promise 就会立刻被解决
    let p1 = Promise.resolve(42);
    let p2 = new Promise(function(resovle, reject) {
      resovle(43);
    });
  });
});
