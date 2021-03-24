/*
 * @Author: Jecyu
 * @Date: 2021-02-20 15:14:36
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-02-20 16:52:53
 * @FilePath: /examples/3-js/clone/shadow-clone.js
 * @Description:
 */

// ES5
// v1 最简单的版本
// 没有考虑参数是什么，是否是对象，是否是原始值
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
// let c = Object.assign(a, b);
let c = NaluduoAssign(a, b);
let d = NaluduoAssign(1, b);

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
