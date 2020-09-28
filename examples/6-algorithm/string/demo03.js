/*
 * @Description: 字符串转整数（解决其他问题的时候，也可以采用下面这种思路，描述需求，给出测试用例，测试驱动开发）
 * 1. 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
 * 2. 当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；
 * 3. 假如一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
 * 4. 该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应造成影响。
 * 5. 注意：假如第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。
 * 6. 在任何情况下，若函数不能进行有效的转换时，请返回 0。
 * 示例1: IO："42" => 42
 * 示例2：IO："-42" => -42
 * 示例3：IO："4193 with words" => 4193
c // 数字 -91283472332 超过 32 位有效符号整数范围。因此返回 INT_MIN(-2147483648)
 * 说明：你可以假设给定的 k 总是合理的，且 1 <= k <= 数组中不相同的元素的个数。你算法的时间复杂度必须优于 O(nlogn)，n 是数组的大小。
 * @Author: Jecyu
 * @Date: 2020-06-03 07:20:27
 * @LastEditTime: 2020-06-03 09:00:26
 * @LastEditors: Jecyu
 */
const assert = require('assert');
/**
 * @description: 正则匹配
 * 1. 第一步，使用正则提取满足条件的字符，/^(-|\+)?\d+/g，
 * @param {type} 
 * @return: 
 */
const myAtoi = function(str) {
  // 提取需要的字符
  const result = /^(-|\+)?\d+/g.exec(str.trim());
  return result
    ? Math.max(
        Math.min(Number(result[0]), Math.pow(2, 31) - 1),
        -Math.pow(2, 31)
      )
    : 0;
};

assert.strictEqual(myAtoi('42'), 42, 'IO："42 => 42');
assert.strictEqual(myAtoi('-42'), -42, `"-42" => -42`);
assert.strictEqual(myAtoi('4193 with words'), 4193, `"4193 with words" => 4193`);
// 时间复杂度：O(1) 不随着某个变量的增长而增长
// 空间复杂度：O(1) 不随着某个变量的增长而增长

/**
 * @description: 
 * @param {type} 
 * @return: 
 */
const myAtoi = function(str) {
  const news = str.trim();
  if (parseInt(news)) {
    return returnNum(parseInt(news))
  } else {
    return 0;
  }
}
const returnNum = function(num) {
  if (num >= -Math.pow(2, 31) && num <= Math.pow(2, 31) - 1) {
    return num;
  } else {
    return 0;
  }
}
