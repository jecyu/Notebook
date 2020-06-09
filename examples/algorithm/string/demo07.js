/*
 * @Description: 验证回文串
 * 描述：给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * 字符串："A man, a plan, a canal: Panama"
 * 删除空格和符号：AmanaplanacanalPanama
 * 以 c 为中心，左右两边是堆成的。
 * Amanaplana c analPanama
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 * 示例 1：
 *  - Input: "A man, a plan, a canal: Panama"
 *  - Output: trur
 * 示例 2:
 *  - Input: "race a car"
 *  - Output: false
 * @Author: Jecyu
 * @Date: 2020-06-09 09:30:45
 * @LastEditTime: 2020-06-09 10:41:26
 * @LastEditors: Jecyu
 */

const assert = require("assert");

const isPalindrome = (s) => {
  // 将传入的字符串，统一转化为小写，同时去除字母和数字，再转化为数组
  const arr = s.toLowerCase().replace(/[^A-Za-z0-9]/g, "").split('');
  let i = 0;
  let j = arr.length - 1;
  // 循环比较元素
  while(i < j) {
    // 从首尾开始，意义比较元素是否相等
    if (arr[i] === arr[j]) {
      // 若相等，即第二个元素和倒数第二个元素继续比较，依次类推
      i += 1;
      j -= 1;
    } else {
      // 只要有一个相对位置不相等，则不是回文串
      return false;
    }
  }
  // 是回文串
  return true;
};

// 复杂度分析 
// - 时间复杂度：O(n) 该解法中 while 循环最多执行 n/2 次，即回文时，因此，时间复杂度为 O(n)。
// - 空间复杂度: O(n)，该解法中，申请了 1 个大小为 n 的数组空间，因此，空间复杂度为 O(n)

assert.strictEqual(isPalindrome("A man, a plan, a canal: Panama"), true, '"A man, a plan, a canal: Panama" is a Palindrome.')