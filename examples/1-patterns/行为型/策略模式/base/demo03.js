/*
 * @Author: Jecyu
 * @Date: 2020-11-04 08:26:23
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-04 08:32:14
 * @FilePath: /examples/1-patterns/策略模式/base/demo03.js
 * @Description:
 */
///////// 1. 定义一个询价处理器对象

const priceProcessor = {
  pre(originPrice) {
    // 处理预热价
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },
  // 处理大促价
  onSale(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },
  // 处理返场价
  back(originPrice) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },

  // 尝鲜价
  fresh() {
    return originPrice * 0.5;
  },

  // 处理新人价
  newUser() {
    if (originPrice >= 100) {
      return originPrice - 50;
    }
    return originPrice;
  },
};

// 分发询价逻辑
////// 2. 开放封闭改造
function askPrice(tag, originPrice) {
  priceProcessor[tag](originPrice);
}
