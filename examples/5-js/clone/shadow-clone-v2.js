/*
 * @Author: Jecyu
 * @Date: 2021-02-20 15:14:36
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-02-20 17:02:41
 * @FilePath: /examples/3-js/clone/shadow-clone-v2.js
 * @Description: 模拟 Object.assign 实现
 */

function NaluduoAssign(target) {
  if (target === null) return null;
  for (let index = 1; index < arguments.length; index++) {
    let source = arguments[index];
    for (let prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

/**
 * @description:
 * 注意点处理：
 * 1. 可枚举性
 * 2. 判断参数是否正确
 * 3. 原始类型被包装为对象
 * 4. 存在性
 * @param {*} target
 * @return {*}
 */
if (typeof Object.assign2 !== "function") {
  // Attention1
  Object.defineProperty(Object, "assign2", {
    value: function assign2(target) {
      "use strict";
      if (target === null || target === undefined) {
        // Attention 2
        throw new TypeError("Cannot convert undefined or null to object");
      }

      // Attention 3 -->原始类型被包装为对象
      var to = Object(target);

      for (let index = 1; index < arguments.length; index++) {
        let nextSource = arguments[index];
        // Attention 2
        if (target !== null && target !== undefined) {
          // Attention 4
          for (let prop in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, prop)) {
              to[prop] = nextSource[prop];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: false,
  });
}

// 第一步
let a = {
  name: "advanced",
  age: 18,
};
let b = {
  name: "muyiy",
  book: {
    title: "You Don't Know JS",
    price: "45",
  },
};
let c = Object.assign2(a, b);
console.log(c);
// {
// 	name: "muyiy",
//  age: 18,
// 	book: {title: "You Don't Know JS", price: "45"}
// }
console.log(a === c);
// true

// 第二步
b.name = "change";
b.book.price = "55";
console.log(b);
// {
// 	name: "change",
// 	book: {title: "You Don't Know JS", price: "55"}
// }

// 第三步
console.log(a);
// {
// 	name: "muyiy",
//  age: 18,
// 	book: {title: "You Don't Know JS", price: "55"}
// }

/* 例子2*/
{
  // 第一步
  let a = {
    name: "muyiy",
    age: 18,
  };
  let b = {
    b1: Symbol("muyiy"),
    b2: null,
    b3: undefined,
  };
  let c = NaluduoAssign(a, b);
  console.log(c);
  // {
  // 	name: "muyiy",
  //  age: 18,
  // 	b1: Symbol(muyiy),
  // 	b2: null,
  // 	b3: undefined
  // }
  console.log(a === c);
  // true
}
