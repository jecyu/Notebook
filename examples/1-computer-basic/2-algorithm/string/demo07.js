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
 * @LastEditTime: 2020-06-10 13:44:40
 * @LastEditors: Jecyu
 */

const assert = require("assert");

/**
 * @description: 验证回文串
 * 思路：首先，去除字符串中的非字母和数字，再将字符串转换为数组，再对数组首尾一一比较，即可得出结果。
 * 详解：
 * 1. 将传入的字符串，利用 toLowerCase() 方法统一转化为小写，再利用正则表达式 /[A-Za-z0-9]/g 在字符串中去除非字母和数字，最后将字符串转换为数组。
 * 2. 转换数组后，利用循环一一比较元素，先比较第一个和最后一个，再比较第二个和倒数二个，依次类推，若中间有不相等则不是回文串，反之，则是回文串。
 * @param {type}
 * @return:
 */
const isPalindrome = (s) => {
  // 将传入的字符串，统一转化为小写，同时去除字母和数字，再转化为数组
  const arr = s
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, "")
    .split("");
  let i = 0;
  let j = arr.length - 1;
  // 循环比较元素
  while (i < j) {
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

assert.strictEqual(
  isPalindrome("A man, a plan, a canal: Panama"),
  true,
  '"A man, a plan, a canal: Panama" is a Palindrome.'
);

/**
 * @description: 利用数组反转字符串，跟方法一不同的是不是比较元素，而是直接比较整个字符串
 * 思路：首先，去除字符串中的非字母和数字，然后，利用数组将字符串翻转，再和原字符串进行比较，即可得到结果
 * 详解：
 * 1. 将传入的字符串，利用 toLowerCase() 方法统一转化为小写，再利用正则表达式 /[^A-Za-z0-9]/g 在字符串中去除非字母和数字，得到字符串 arr。
 * 2. 将字符串 arr 转换为数组，利用数组的方法翻转数组，再将数组转为字符串 newArr。
 * @param {type}
 * @return:
 */
const isPalindrome2 = (s) => {
  // 方便比较，统一转化为小写，并去除字母和数字
  const arr = s
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, "")
    .split("");
  // 将新字符串转化为数组，利用数组的方法获得反转的字符串
  const newArr = arr
    .split("")
    .reverse()
    .join("");
  // 将 2 个字符进行比较得出结果
  return arr === newArr;
};
assert.strictEqual(
  isPalindrome2("A man, a plan, a canal: Panama"),
  true,
  '"A man, a plan, a canal: Panama" is a Palindrome.'
);

// 复杂度分析：
// - 时间复杂度： O(n)
//   - 该解法中，toLowerCase()，replace()、split()，reverse()，join() 的时间复杂度都为 O(n) ，且都在独立的循环中执行，因此，总的时间复杂度都为 O(n)，且都在独立的循环中执行，因此，总的时间复杂度依然为 O(n)。
// - 空间复杂度：O(n)
//   - 该解法中，申请了 1 个大小为 n 的字符串和 1 个大小为 n 的数组空间，因此，空间复杂度为 O(n * 2)，即 O(n)。
