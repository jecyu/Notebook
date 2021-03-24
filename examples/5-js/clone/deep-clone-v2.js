/*
 * @Author: Jecyu
 * @Date: 2021-02-20 15:14:42
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-02-21 16:24:10
 * @FilePath: /examples/3-js/clone/deep-clone-v2.js
 * @Description:
 */

function isObject(val) {
  return typeof val === "object" && val != null;
}

/**
 * @description:
 * 边界处理主要是考虑入参有哪些情况，对应又要输出哪些情况。
 * 1. 支持非对象返回本身
 * 2. 支持循环引用（哈希表）、同时也解决引用丢失的问题
 * 3. 支持拷贝 Symbol 属性的值
 * @param {*} source
 * @param {Object} hash 处理循环引用
 * @return {*}
 */
function deepClone(source, hash = new WeakMap()) {
  if (!isObject(source)) return source; // 非对象返回本身
  if (hash.has(source)) return hash.get(source); // 查哈希表

  // 如果是数组
  var dest = Array.isArray(source) ? [] : {};
  hash.set(source, dest); // 哈希表没值

  // Start 支持拷贝 Symbol 属性的值
  let symKeys = Object.getOwnPropertySymbols(source); // 查找
  if (symKeys.length) {
    // 查找成功
    symKeys.forEach((symKey) => {
      if (isObject(source[symKey])) {
        dest[symKey] = deepClone(source[symKey]);
      } else {
        dest[symKey] = source[symKey];
      }
    });
  }
  // End

  for (let prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      if (isObject(source[prop])) {
        dest[prop] = deepClone(source[prop], hash); // 传入哈希表
      } else {
        dest[prop] = source[prop];
      }
    }
  }
  return dest;
}

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
  a4: Symbol(), // Symbol 类型
};

// 循环引用
a.circleRef = a;

// Symbol 属性
var sym1 = Symbol("a"); // 创建新的symbol类型
var sym2 = Symbol.for("b"); // 从全局的symbol注册?表设置和取得symbol

a[sym1] = "localSymbol";
a[sym2] = "globalSymbol";

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
