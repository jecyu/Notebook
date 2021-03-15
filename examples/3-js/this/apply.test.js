/*
 * @Author: Jecyu
 * @Date: 2021-03-07 21:29:57
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-12 09:39:00
 * @FilePath: /examples/3-js/this/apply.test.js
 * @Description:
 */
require("./apply.js");
describe("功能测试", () => {
  test("正常改变 this 指向 ", () => {
    const foo = {
      value: 1,
    };
    const bar = function() {
      return this;
    };
    expect(bar.apply2(foo).value).toBe(1);
  });

  test("传入数组参数", () => {
    const sum = function() {
      let result = 0;
      for (let n = 0; n < arguments.length; n++) {
        result += arguments[n];
      }
      this.result = result;
      return this;
    };
    let foo = {};
    expect(sum.apply2(foo, [1, 2, 3, 4]).result).toBe(10);
  });

  test("传入 null 或 undefined，默认为 window 对象", () => {
    const bar = function() {
      this.value = 1;
      return this;
    };
    bar.apply2(null);
    expect(window.value).toBe(1);
  });
});

describe("边界测试", () => {
  // 性能/判断
});

describe("负面测试", () => {
  // TODO 异常测试用例，如何编写
  test("传入非数组参数，报错提醒用户", () => {
    const foo = {
      value: 1,
    };
    const bar = function() {
      return this;
    };
    expect(bar.apply2(foo, 1).value).toBe(1);
  });
});
