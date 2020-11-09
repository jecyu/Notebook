/**
 * @description: 询价方法，接受价格标签和原价为入参
 * @param {*} tag
 * @param {*} originPrice
 * @return {*}
 */
function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === "pre") {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  }

  // 处理大促价
  if (tag === "onSale") {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  }

  // 处理返场价
  if (tag === "back") {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  }

  // 尝鲜价
  if (tag === "fresh") {
    return originPrice * 0.5;
  }

  // 处理新人价（新增的：违背单一原则和开放封闭原则）
  if (tag === 'newUser') {
    if (originPrice >= 100) {
      return originPrice - 50;
    }
    return originPrice;
  }
}
