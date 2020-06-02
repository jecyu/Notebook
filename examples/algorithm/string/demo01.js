/*
 * @Description: 翻转整数
 * @Author: Jecyu
 * @Date: 2020-05-29 12:28:41
 * @LastEditTime: 2020-06-02 12:33:55
 * @LastEditors: Jecyu
 */

 // 假设我们的环境只能存储 32 位的有符号整数

const assert = require("assert");

/**
 * @description:
 * @param {Number} x
 * @return: Number
 */
const reverse = (x) => {
  // 非空判断
  if (typeof x !== "number") {
    return;
  }

  // 极值
  const MAX = 2147483647;
  const MIN = -2147483648;

  // 识别数字剩余部分并翻转
  const rest =
    x > 0
      ? String(x)
          .split("")
          .reverse()
          .join("")
      : String(x)
          .slice(1)
          .split("")
          .reverse()
          .join("");
  // 转换为正常值，区分正负数
  const result = x > 0 ? parseInt(rest, 10) : 0 - parseInt(rest, 10);

  //边界情况
  if (result >= MIN && result <= MAX) {
    return result;
  }
  return 0;
};

/**
 * @description: 类似欧几里得算法
 * @param {type} 
 * @return: 
 */
const reverse2 = (x) => {
    // 非空判断
    if (typeof x !== "number") {
      return;
    }
  
    // 极值
    const MAX = 2147483647;
    const MIN = -2147483648;
    let num = 0;
    
    // 循环遍历生成每一位数字
}


assert.strictEqual(reverse(123), 321, "翻转整数123 =》321")
assert.strictEqual(reverse(-123), -321, "翻转整数 -123 =》-321")
assert.strictEqual(reverse(120), 21, "翻转整数 120 =》21")