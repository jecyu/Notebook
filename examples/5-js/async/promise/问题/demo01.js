/*
 * @Author: naluduo233
 * @Date: 2021-03-19 14:13:39
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-19 14:21:04
 * @FilePath: /examples/3-js/async/promise/问题/demo01.js
 * @Description: 多次错误处理
 */

function executor(resolve, reject) {
  let rand = Math.random();
  console.log("1 ->", 1);
  console.log("rand ->", rand);
  if (rand > 0.5) {
    resolve();
  } else {
    reject();
  }
}

var p0 = new Promise(executor);

var p1 = p0.then((value) => {
  console.log("succeed-1");
  return new Promise(executor);
});

var p3 = p1.then((value) => {
  console.log("succeed-2");
  return new Promise(executor);
});

var p4 = p3.then((value) => {
  console.log("succeed-3");
  return new Promise(executor);
});

p4.catch((error) => {
  console.log("error");
});

console.log("2 ->", 2);
