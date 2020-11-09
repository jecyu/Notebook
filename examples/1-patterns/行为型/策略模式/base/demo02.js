/*
 * @Author: Jecyu
 * @Date: 2020-11-03 23:32:27
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-03 23:40:33
 * @FilePath: /examples/1-patterns/策略模式/base/demo02.js
 * @Description: 分步骤处理： 1.单一功能改造 2. 开发封闭原则
 */

///////// 1. 单一功能改造


// 处理预热价
function prePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 20;
  }
  return originPrice * 0.9;
}

// 处理大促价
function onSalePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 30;
  }
  return originPrice * 0.8;
}

// 处理返场价
function backPrice(originPrice) {
  if (originPrice >= 200) {
    return originPrice - 50;
  }
  return originPrice;
}

// 尝鲜价
function freshPrice() {
  return originPrice * 0.5;
}

// 处理新人价
function newUserPrice() {
  if (originPrice >= 100) {
    return originPrice - 50;
  }
  return originPrice;
}

// 分发询价逻辑
function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === "pre") {
    return prePrice(originPrice);
  }

  // 处理大促价
  if (tag === "onSale") {
    return onSalePrice(originPrice);
    
  }

  // 处理返场价
  if (tag === "back") {
    return backPrice(originPrice);
   
  }

  // 尝鲜价
  if (tag === "fresh") {
    return freshPrice(originPrice);

  }

  // 处理新人价
  if (tag === 'newUser') {
    return newUserPrice(originPrice);
  }
}

// 一个函数只做一件事

////// 2. 开放封闭改造