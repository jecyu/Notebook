/*
 * @Author: Jecyu
 * @Date: 2021-03-07 21:29:53
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-07 22:44:21
 * @FilePath: /examples/3-js/this/call.js
 * @Description:
 */

Function.prototype.call2 = function(val) {
  let context = val || window; // 在 node 环境中是 global
  // if (Object.prototype.toString.call2(val) === "[Object null]") {
  //   context = window;
  // }
  context.fn = this;
  let arr = [];
  for (let i = 1; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }

  const result = eval(`context.fn(${arr.toString()})`);
  delete context.fn;
  return result;
};

describe("功能测试", () => {
  test("正常改变 this 指向 ", () => {
    let foo = {
      value: 1,
    };

    function bar() {
      console.log(this.value);
      return this.value;
    }
    expect(bar.call2(foo)).toBe(1);
  });

  test("传入参数", () => {
    const juggle = () => {
      var result = 0;
      for (var n = 0; n < arguments.length; n++) {
        result += arguments[n];
      }
      this.result = result;
    };
    let ninja1 = {};

    juggle.call2(ninja1, 5, 6, 7, 8);
    assert.strictEqual(ninja1.result, 26);
  });

  test("传入 null 或 undefined，默认为 window 对象", () => {
    // test3 this 对象为 null
    juggle.call2(null, 5, 6, 7, 8);
    assert.strictEqual(window.result, 26);
  });
});

describe("边界测试", () => {});

describe("负面测试", () => {});
