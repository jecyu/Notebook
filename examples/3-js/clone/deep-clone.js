/*
 * @Author: Jecyu
 * @Date: 2021-02-20 15:14:42
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-02-20 17:22:51
 * @FilePath: /examples/3-js/clone/deep-clone.js
 * @Description:
 */

// 版本一：支持深拷贝数组和对象

function isObject(val) {
  return typeof val === "object";
}

/**
 * @description: 
 * @param {*} source
 * @return {*}
 */
function deepClone(source) {
  if (source === null) return null;
  let dest = null;
  // 如果是数组
  if (Object.prototype.toString(source) === "[Object Array]") {
    dest = [];
  } else {
    dest = {};
  }
  for (let prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      const val = source[prop];
      if (isObject(val)) {
        dest[prop] = deepClone(val);
      } else {
        dest[prop] = val;
      }
    }
  }
  return dest;
}
// 当前版本
// * 1. 对传入参数进行校验，非对象应该返回自身
// * 2. 对于对象的判断逻辑不严谨，typeof null === "object"
// * 3. 考虑数组的兼容


// 测试用例
var a = {
  name: "muyiy",
  book: {
    title: "You Don't Know JS",
    price: "45",
  },
  a1: undefined,
  a2: null,
  a3: 123,
};

var b = deepClone(a);

a.name = "高级前端进阶";
a.book.price = "55";

console.log(b);
// {
//   name: 'muyiy',
//   book: { title: 'You Don\'t Know JS', price: '45' },
//   a1: undefined,
//   a2: null,
//   a3: 123
// }
