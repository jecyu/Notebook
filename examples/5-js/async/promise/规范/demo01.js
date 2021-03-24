/*
 * @Author: naluduo233
 * @Date: 2021-03-18 14:28:22
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-18 14:50:47
 * @FilePath: /examples/3-js/async/promise/demo01.js
 * @Description:
 */
var isMomHappy = false; // “isMomHappy”是个布尔值，定义老妈是否开心。

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

// call our promise
var askMom = function() {
  willGetNewPhone
    .then(function(fulfilled) {
      // yay, you got a new phone
      console.log("fulfilled ->", fulfilled);
      // output: { brand: 'Samsung', color: 'black'}
    })
    .catch(function(error) {
      // oops, mom don't buy it
      console.log(error.message);
      // output: 'mom is not happy'
    });
};

askMom();
