/*
 * @Autyield 后可以不带任何表达式，返回的 value 为 undefinedor: naluduo233
 * @Date: 2021-03-19 14:51:18
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-03-28 14:36:59
 * @FilePath: /examples/5-js/async/generator/demo01.test.js
 * @Description: 生成器的基本语法
 */
describe("在生成器函数内部，通过 yield 或 yield* ，将当前生成器函数的控制权移交给外部，外部通过调用生成器的 next 或 throw 或 return 方法将控制权返还给生成器函数，并且还能够向其传递数据。", () => {
  it("yield 和 yield* 只能在生成器函数中使用 ", () => {
    const ceiledCounter = (function*(ceil) {
      let c = 0;
      while (true) {
        ++c;
        if (c === ceil) return c;
        yield c;
      }
    })(3);
    const result1 = ceiledCounter.next(); // { value: 1, done: false }
    expect(result1.value).toBe(1);
    expect(result1.done).toBe(false);

    const result2 = ceiledCounter.next(); // { value: 2, done: false }
    expect(result2.value).toBe(2);
    expect(result2.done).toBe(false);

    const result3 = ceiledCounter.next(); // { value: 3, done: true }
    expect(result3.value).toBe(3);
    expect(result3.done).toBe(true);

    const result4 = ceiledCounter.next(); // { value: undefined, done: true }
    expect(result4.value).toBe(undefined);
    expect(result4.done).toBe(true);
  });

  it("yield 后可以不带任何表达式，返回的 value 为 undefined ", () => {
    const gen = (function*() {
      yield;
    })();
    const result = gen.next();
    expect(result.value).toBe(undefined);
    expect(result.done).toBe(false);
  });
});

describe("生成器函数通过使用 yield* 表达式用于委托给另一个可迭代对象，包括生成器", () => {
  const genSomeArr = function*() {
    yield 1;
    yield* [2, 3];
  };
  it("委托给 JavaScript 内置的可迭代对象", () => {
    const someArr = genSomeArr();
    const result1 = someArr.next();
    expect(result1.value).toBe(1);
    expect(result1.done).toBe(false);

    const result2 = someArr.next();
    expect(result2.value).toBe(2);
    expect(result2.done).toBe(false);

    const result3 = someArr.next();
    expect(result3.value).toBe(3);
    expect(result3.done).toBe(false);

    const result4 = someArr.next();
    expect(result4.value).toBe(undefined);
    expect(result4.done).toBe(true);
  });

  it("委托给另一个生成器", () => {
    const genAnother = function*() {
      yield* genSomeArr();
      yield* [4, 5];
    };
    const anotherArr = genAnother();
    const aresult1 = anotherArr.next();
    expect(aresult1.value).toBe(1);
    expect(aresult1.done).toBe(false);

    const aresult2 = anotherArr.next();
    expect(aresult2.value).toBe(2);
    expect(aresult2.done).toBe(false);

    const aresult3 = anotherArr.next();
    expect(aresult3.value).toBe(3);
    expect(aresult3.done).toBe(false);

    const aresult4 = anotherArr.next();
    expect(aresult4.value).toBe(4);
    expect(aresult4.done).toBe(false);

    const aresult5 = anotherArr.next();
    expect(aresult5.value).toBe(5);
    expect(aresult5.done).toBe(false);

    anotherArr.next();
    const aresult6 = anotherArr.next();
    expect(aresult6.value).toBe(undefined);
    expect(aresult6.done).toBe(true);
  });
});

describe("next、throw 和 return 方法，生成器函数外部正是通过这三个方法去控制生成器函数的内部执行过程的", () => {
  it("next——生成器函数外部可以向 `next` 方法传递一个参数，这个参数会被当作上一个 `yield` 表达式的返回值，如果不传递任何参数，`yield` 表达式返回 `undefined`", () => {
    const canBeStoppedCounter = (function*() {
      let c = 0;
      let shouldBreak = false;
      while (true) {
        shouldBreak = yield ++c;
        if (shouldBreak) return;
      }
    })();

    const result1 = canBeStoppedCounter.next();
    expect(result1.value).toBe(1);
    expect(result1.done).toBe(false);

    const result2 = canBeStoppedCounter.next();
    expect(result2.value).toBe(2);
    expect(result2.done).toBe(false);

    const result3 = canBeStoppedCounter.next(true);
    expect(result3.value).toBe(undefined);
    expect(result3.done).toBe(true);
  });

  it("Generator.prototype.next() ", () => {
    const greet = (function*() {
      console.log(yield); // How
      console.log(yield); // are
      console.log(yield); // you
      return;
    })();

    const result1 = greet.next(); // 注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
    expect(result1.value).toBe(undefined);
    expect(result1.done).toBe(false);

    const result2 = greet.next("How");
    expect(result2.value).toBe(undefined);
    expect(result2.done).toBe(false);

    const result3 = greet.next("are");
    expect(result3.value).toBe(undefined);
    expect(result3.done).toBe(false);

    const result4 = greet.next("you");
    expect(result4.value).toBe(undefined);
    expect(result4.done).toBe(true);
  });

  it("Generator.prototype.throw()：生成器函数外部可以向 throw 方法传递一个参数，这个参数会被 catch 语句捕获，如果不传递任何参数，catch 语句捕获到的将会是 undefined，catch 语句捕获到之后会恢复生成器的执行，返回带有 IteratorResult", () => {
    const caughtInsideCounter = (function*() {
      let c = 0;
      while (true) {
        try {
          yield ++c;
        } catch (e) {
          console.log(e);
        }
      }
    })();

    const result = caughtInsideCounter.next(); // throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
    expect(result.value).toBe(1);
    expect(result.done).toBe(false);

    const result2 = caughtInsideCounter.throw(new Error("An error occurred!"));
    expect(result2.value).toBe(2);
    expect(result2.done).toBe(false);
  });

  it("Generator.prototype.return()：生成器的 return 方法会结束生成器，并且会返回一个 IteratorResult，其中 done 是 true，value 是向 return 方法传递的参数，如果不传递任何参数，value 将会是 undefined", () => {
    const g = (function*() {
      yield 1;
      yield 2;
      yield 3;
    })();
    const result1 = g.next();
    expect(result1.value).toBe(1);
    expect(result1.done).toBe(false);

    const result2 = g.return("foo");
    expect(result2.value).toBe("foo"); // yield 返回为 return 传入的参数
    expect(result2.done).toBe(true);

    const result3 = g.next();
    expect(result3.result).toBe(undefined);
    expect(result3.done).toBe(true);
  });
});

describe("生成器的异步应用", () => {
  // Promise 方式，过多的then话，也会比较繁琐
  // fetch("https://www.geekbang.org")
  //   .then((response) => {
  //     console.log(response);
  //     return fetch("https://www.geekbang.org/test");
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  it("should ", () => {
    // 使用同步的方式编写异步代码
    function* foo() {
      let response1 = yield fetch(
        "https://api.github.com/repos/naluduo233/naluduo233.github.io/issues"
      );
      let response2 = yield fetch(
        "https://api.github.com/repos/naluduo233/naluduo233.github.io/issues/7"
      );
    }

    //执行foo函数的代码
    let gen = foo();
    function getGenPromise(gen) {
      // 手动处理
      return gen.next().value;
    }
    getGenPromise(gen)
      .then((response) => {
        console.log("response1");
        console.log(response);
        return getGenPromise(gen);
      })
      .then((response) => {
        console.log("response2");
        console.log(response);
      });
    // 虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段，需要用 Promise.then 去对应编写）
  });

  it("通过使用生成器配合执行器 co，自动进行异步流程管理", () => {
    function* foo() {
      let response1 = yield fetch(
        "https://api.github.com/repos/naluduo233/naluduo233.github.io/issues"
      );
      console.log("response1");
      console.log(response1);
      let response2 = yield fetch(
        "https://api.github.com/repos/naluduo233/naluduo233.github.io/issues/7"
      );
      console.log("response2");
      console.log(response2);

      let response3 = yield fetch(
        "https://api.github.com/repos/naluduo233/naluduo233.github.io/issues/7"
      );
      console.log("response3");
      console.log(response3);
    }

    // co 自动执行器，核心原理在于生成器不断 yield 出来，又不断通过 promise 把控制权返回给生成器函数。
    // yield 后面必须是一个 Promise 对象
    // 具体为初始调用 gen.next 时，生成器内部 yield promise 出来，外部通过 then 又不断传入 res 给 next 参数，并递归调用 next，直到所有异步函数执行完毕。
    function co(gen) {
      return new Promise((resolve, reject) => {
        onFulfilled();
        function onFulfilled(res) {
          var ret;
          try {
            ret = gen.next(res); // 第一步，初始化调用 next，内部调用 yield 传出来
          } catch (e) {
            return reject(e);
          }
          next(ret); // 第二步，调用 next，传入生成器返回值
        }
        function next(ret) {
          if (ret.done) return resolve(ret.value); // 如果执行完毕，直接返回
          var value = ret.value;
          // if (true) {
          //   // 这里假设返回的对象都是 Promise 对象
          value.then(onFulfilled, onRejected); //  第三步，使用 then 方法，为返回值加上回调函数，然后通过 onFulfilled 函数再次调用 next 函数
          // }
          // 非 Promise 对象抛出错误
          // return onRejected(
          //   new TypeError(
          //     "You may only yield a function, promise, generator, array, or object, " +
          //       'but the following object was passed: "' +
          //       String(ret.value) +
          //       '"'
          //   )
          // );
          function onRejected(error) {
            throw error;
          }
        }
      });
    }
    co(foo());

    // 模拟 async
    function fn(args) {
      return co(function*(params) {});
    }
    fn();
  });

  it("通过使用生成器配合执行器 thunk ，自动进行异步流程管理", () => {
    var Thunk = function(fn) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        return function(callback) {
          args.push(callback);
          return fn.apply(this, args);
        };
      };
    };
    function f(a, cb) {
      cb(a);
    }
    const ft = Thunk(f);

    ft(1)(console.log); // 1
  });
});

describe("async/await 的出现， async/await 技术背后的秘密就是 Promise 和生成器应用，往低层说就是微任务和协程应用", () => {
  it("async 是一个通过异步执行并隐式返回 Promise 作为结果的函数", () => {
    // 隐式返回 Promise
    async function foo() {
      return 2;
    }
    console.log(foo()); // Promise {<resolved>: 2}
  });

  it("await：await 可以等待两种类型的表达式：可以是任何普通表达式 ;也可以是一个 Promise 对象的表达式。", () => {
    // 和生成器函数一样，使用了 async 声明的函数在执行时，也是一个单独的协程，我们可以使用 await 来暂停该协程，由于 await 等待的是一个 Promise 对象，我们可以 resolve 来恢复该协程。
    async function foo() {
      console.log(1);
      let a = await 100;
      console.log(a);
      console.log(2);
    }
    console.log(0);
    foo();
    console.log(3);
  });

  function HaveResolvePromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(100);
      }, 0);
    });
  }
  // 这里的 async/await 相当于生成器函数经过 co 执行器执行。标记 async v8 会自动通过执行器执行 async 标记的生成器函数。
  // 在异步处理上，async 函数就是 Generator 函数的语法糖。
  async function getResult() {
    console.log(1);
    let a = await HaveResolvePromise();
    console.log(a);
    console.log(2);
  }
  console.log(0);
  getResult();
  console.log(3);
  // async function foo(){
  //   try{
  //     let response1 = await fetch('https://www.geekbang.org')
  //     console.log('response1')
  //     console.log(response1)
  //     let response2 = await fetch('https://www.geekbang.org/test')
  //     console.log('response2')
  //     console.log(response2)
  //   }catch(err) {
  //        console.error(err)
  //   }
  // }
  // async function fn(args) {
  //   // ...
  // }

  // // 等同于

  // function fn(args) {
  //   return spawn(function* () {
  //     // ...
  //   });
  // }
});
