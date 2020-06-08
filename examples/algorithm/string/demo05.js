/*
 * @Description: 反转字符串
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组，使用 O(1) 的额外空间解决这一个问题
 * 示例1：
 * Input：["h", "e", "l", "l", "O"]
 * Output: ["o", "l", "l", "e", "h"]
 * 示例2
 * Input: ["H", "a", "n", "n", "a", "h"]
 * Output: ["h", "a", "n", "n", "a", "H"]
 * @Author: Jecyu
 * @Date: 2020-06-07 10:06:40
 * @LastEditTime: 2020-06-08 09:30:09
 * @LastEditors: Jecyu
 */

const assert = require("assert");

/**
 * @description: 首尾替换法
 * 首尾替换法，逐位遍历，进行交换
 * 1. 设置变量 i = 0；
 * 2. 替换字符串的第 i 位和倒数第 i 位，替换方式：使用 es6 的解构赋值进行变量的交换；
 * 3. 变量 i + 1，继续替换字符串的第 i 位和倒数第 i 位
 * 4. 直到 i 大于字符串 s 的长度的中位数，完成整个字符串的反转
 * @param {character[]} s 
 * @return: {void} Do not return anything, modify s in-place instead.
 */
const reverseString = function(s) {
  for (let i = 0; i < s.length / 2; i++) {
    [s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]];
  }
  return s;
};

assert.deepStrictEqual(
  reverseString(["h", "e", "l", "l", "o"]),
  ["o", "l", "l", "e", "h"],
  '反转字符串 ["h", "e", "l", "l", "O"] => ["o", "l", "l", "e", "h"]'
);

// 复杂度分析
// 时间复杂度：O(n)，遍历次数：如果字符串长度为 n，n 是偶数，遍历次数位 n/2，如果 n 是奇树，遍历次数为 (n + 1) /2。
// 空间复杂度：O(1)，没有开辟新的内存空间

const reverseString2 = function(s) {
  for (let i = 0; i < s.length / 2; i++) {
    const a = s[i];
    s[i] = s[s.length - i - 1];
    s[s.length - i - 1] = a;
  }
  return s;
}

assert.deepStrictEqual(
  reverseString2(["h", "e", "l", "l", "o"]),
  ["o", "l", "l", "e", "h"],
  '反转字符串 ["h", "e", "l", "l", "O"] => ["o", "l", "l", "e", "h"]'
);

// 复杂度分析
// 时间复杂度：O(n)，遍历次数：如果字符串长度为 n，n 是偶数，遍历次数位 n/2，如果 n 是奇树，遍历次数为 (n + 1) /2。
// 空间复杂度：O(1)，1 个临时变量

