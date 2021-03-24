/*
 * @Autyield 后可以不带任何表达式，返回的 value 为 undefinedor: naluduo233
 * @Date: 2021-03-19 14:51:18
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-03-24 11:24:51
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

  it("should ", () => {
    const greet = (function*() {
      console.log(yield);  // How
      console.log(yield);  // are
      console.log(yield);  // you
      return;
    })();

    const result1 = greet.next();
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
});
