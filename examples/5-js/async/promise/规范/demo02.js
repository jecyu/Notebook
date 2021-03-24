/*
 * @Author: naluduo233
 * @Date: 2021-03-18 14:51:54
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-18 14:59:37
 * @FilePath: /examples/3-js/async/promise/demo02.js
 * @Description: Promises都是可链的。
 */
var isMomHappy = false; // “isMomHappy”是个布尔值，定义老妈是否开心。

// 1st promise
var willGetNewPhone = new Promise(function(resolve, reject) {
  // 生成一个 Promise 对象
  if (isMomHappy) {
    var phone = {
      brand: "Samsung",
      color: "black",
    };
    resolve(phone); // fulfilled
  } else {
    var reason = new Error("mom is not happy");
    reject(reason); // reject
  }
});



// 2nd promise
var showOff = function(phone) {
  return new Promise(function(resolve, reject) { // 再返回一个 Promise
    var message =
      "Hey friend, I have a new " +
      new phone.color() +
      " " +
      phone.brand +
      " phone";
    resolve(message);
  });
};

// call our promise
var askMom = function() {
  willGetNewPhone
    .then(function(fulfilled) {
      // yay, you got a new phone
      console.log("fulfilled ->", fulfilled);
      // output: { brand: 'Samsung', color: 'black'}
    })
    .then(showOff) // chain it here 链式调用
    .catch(function(error) {
      // oops, mom don't buy it
      console.log(error.message);
      // output: 'mom is not happy'
    });
};

askMom();