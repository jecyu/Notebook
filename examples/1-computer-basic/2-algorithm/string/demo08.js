/*
 * @Description: 实现 strStr()
 * 描述：给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置（从 0 开始）。如果不存在，则返回 -1
 * 1. 示例：
 * - Input：haystack = 'hello world', needle = 'll'
 * - Output： 2
 * @Author: Jecyu
 * @Date: 2020-06-10 13:45:05
 * @LastEditTime: 2020-06-10 14:03:03
 * @LastEditors: Jecyu
 */

const assert = require("assert");

const strStr = (haystack, needle) => {
  if (needle.length === 0) {
    return 0;
  } else if (needle.length > haystack.length) {
    return -1;
  } else {
    for (let i = 0; i <= haystack.length - needle.length; i++) { // 当遍历 haystack 能够截取的值已经不够了，就没必要继续执行，因此 haystack.length - needle.length
      if (haystack[i] !== needle[0]) { // 比对首位，不相同直接进行移动 i
        continue;
      }
      if (needle === haystack.slice(i, i + needle.length)) {
        return i;
      }
    }
  }
};

assert.strictEqual(strStr("hello world", "ll"), 2, 'strStr("hello world", "ll") === 2')

// 复杂度分析：
// 时间复杂度：O(n)
// 空间复杂度：O(1) haystack, needle