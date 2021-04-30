/*
 * @Author: naluduo233
 * @Date: 2021-03-19 14:34:37
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-19 15:58:31
 * @FilePath: /examples/5-js/async/promise/设计维度/实现原理/v1/NaluduoPromise.test.js
 * @Description: 基础实现
 */
describe("手写 Promise", () => {
  //极简的实现
  it("Promise 基础版本——回调函数依次执行", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      then(onFulfilled) {
        this.callbacks.push(onFulfilled); // 2. 延迟绑定，添加回调函数到数组中
      }
      _resolve(value) {
        this.callbacks.forEach((fn) => fn(value)); // 3. 当异步操作执行成功后，会调用 _resolve 方法，将回调数组中的 callbacks 队列中的回调一一执行。
      }
      _reject() {}
    }

    //Promise应用
    const executor = (resolve) => {
      setTimeout(() => {
        resolve("1秒后触发");
      }, 1000);
    };
    new NaPromise(executor).then((tip) => {
      expect(tip).toBe("1秒后触发");
      done();
    });
  });

  it("Promise 基础版本 + then 方法支持链式调用", (done) => {
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      then(onFulfilled) {
        this.callbacks.push(onFulfilled); // 2. 延迟绑定，添加回调函数到数组中
        return this; // <-- 新增返回 this，支持链式调用
      }
      _resolve(value) {
        this.callbacks.forEach((fn) => fn(value)); // 3. 当异步操作执行成功后，会调用 _resolve 方法，将回调数组中的 callbacks 队列中的回调一一执行。
      }
      _reject() {}
    }

    const executor = (resolve) => {
      setTimeout(() => {
        resolve("1s后触发");
      }, 1000);
    };
    new NaPromise(executor)
      .then((tip) => {
        expect(tip).toBe("1s后触发");
      })
      .then((tip) => {
        expect(tip).toBe("1s后触发");
        done();
      });

    // 上面 Promise 的实现存在一个问题：如果在 then 方法注册 onFulfilled 之前，resolve 就执行了，onFulfilled 就不会执行到了。比如上面的例子中我们把 setTimout 去掉，下一步添加延迟机制
    //同步执行了resolve
    const callback = jest.fn();
    new NaPromise((resolve) => {
      console.log("同步执行");
      resolve("同步执行");
    })
      .then((value) => {
        callback(value);
      })
      .then((value) => {
        callback(value);
        done();
      });
    expect(callback).not.toBeCalled();

    // 执行结果显示，只有 "同步执行" 被打印了出来，后面的 "then" 函数均没有被调用。再回去看下 Promise 的源码，也很好理解，resolve 执行时，callbacks 还是空数组，还没有onFulfilled 注册上来。
  });

  it("Promise 基础版本 + then 方法支持链式调用 + 延迟机制", (done) => {
    // Promises/A+规范明确要求回调需要通过异步方式执行，用以保证一致可靠的执行顺序
    class NaPromise {
      callbacks = []; // 存储要执行的回调函数
      constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this)); // 1. 立即调用 executor
      }
      then(onFulfilled) {
        this.callbacks.push(onFulfilled); // 2. 延迟绑定，添加回调函数到数组中
        return this;
      }
      _resolve(value) {
        // <-- 新增返回异步回调，支持延迟调用回调函数机制，在 resolve 中增加定时器，通过 setTimeout 机制，将 resolve 中执行回调的逻辑放置到 JS任务队列末尾，以保证在 resolve 执行时，then方法的 onFulfilled 已经注册完成。
        setTimeout(() => {
          //看这里
          this.callbacks.forEach((fn) => fn(value)); // 3. 当异步操作执行成功后，会调用 _resolve 方法，将回调数组中的 callbacks 队列中的回调一一执行。
        });
      }
      _reject() {}
    }

    const callback = jest.fn();
    const p = new NaPromise((resolve) => {
      resolve("同步执行");
    })
      .then(() => {
        // 同步执行
        callback();
        expect(callback).toBeCalledTimes(1);
      })
      .then(() => {
        // 同步执行
        callback();
        expect(callback).toBeCalledTimes(2);
        done();
      });

    //  通过测试用例，上述调整这样依然存在问题，在 resolve 执行后，再通过 then 注册上来的 onFulfilled 都没有机会执行了。如下所示，我们加了延迟后，then1 和 then2 可以调用回调函数，但是 setTimeout 调用的的 then 没有执行。所以下一步我们需要增加状态，并且保存 resolve 的值，根据状态来调用 resolve。
    // 异步绑定
    setTimeout(() => {
      // 不会被调用，TODO 考虑如何编写对应的测试例子，never 发生的情况
      p.then(() => {
        callback();
        expect(callback).not.toBeCalledTimes(3);
      });
    });
  });

  it("Promise 基础版本 + then 方法支持链式调用 + 延迟机制 + 状态", (done) => {
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

    const callback = jest.fn();
    const p = new NaPromise((resolve) => {
      resolve("同步执行");
    })
      .then(() => {
        // 同步执行
        callback();
        expect(callback).toBeCalledTimes(1);
      })
      .then(() => {
        // 同步执行
        callback();
        expect(callback).toBeCalledTimes(2);
      });

    // 异步绑定
    setTimeout(() => {
      p.then(() => {
        callback();
        expect(callback).toBeCalledTimes(3);
        done();
      });
    });
  });
});

