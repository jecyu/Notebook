/*
 * @Description: 字符串中的第一个唯一字符
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * 1. 示例：
 * Input：s = “leetcode”
 * Input：s = “leetcode”
 * 2. 示例
 * Input：s = "loveleetcode"
 * Output：2
 *
 * @Author: Jecyu
 * @Date: 2020-06-07 10:35:51
 * @LastEditTime: 2020-06-08 09:51:10
 * @LastEditors: Jecyu
 */

const assert = require("assert");

/**
 * @description: 库函数
 * 思路：某个字符从头开始的索引和从尾开始找的索引如果相等，就说明这个字符只出现了一次。
 * 详解：
 * 1. 从头到尾遍历一遍字符串
 * 2. 判断每个位置的字符的 `index()` 和 `lastIndexOf()` 的结果是否相等
 * @param {String}
 * @return: number
 */
const firstUniqChar = function(s) {
  for (let i = 0; i < s.length; i += 1) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i;
    }
  }
  return -1;
};

assert.strictEqual(
  firstUniqChar("leetcode"),
  0,
  'Input："leetcode", Output: 0'
);
assert.strictEqual(
  firstUniqChar("leetcode"),
  0,
  'Input："loveleetcode", Output: 2'
);

// 复杂度分析
// - 时间复杂度：O(n²)
//   - 外层遍历，时间复杂度为 O(n)，调用 indexOf 的复杂度为 O(n)，得出总的时间复杂度为 O(n²)
// - 空间复杂度：O(1)
//   - 因为除了临时变量 i，没有开辟额外的空间

/**
 * @description: 哈希
 * 思路：遍历两次。第一次遍历，用一个哈希对象记录所有字符的出现次数；第二次遍历，找出哈希对象中只出现一次的字符的下标
 * 详解：
 * 1. 第一次遍历，用一个哈希对象记录所有字符的出现次数；
 * 2. 第二次遍历，找出哈希对象中只出现一次的字符的下标；
 * @param {type}
 * @return:
 */
const firstUniqChar2 = function(s) {
  const hash = {};
  for (let i = 0; i < s.length; i++) {
    if (!hash[[s[i]]]) {
      hash[s[i]] = 1;
    } else {
      hash[s[i]] += 1;
    }
  }

  for (let i = 0; i < s.length; i += 1) {
    if (hash[s[i]] === 1) {
      return i;
    } 
  }
  return -1;
};


assert.strictEqual(
  firstUniqChar2("leetcode"),
  0,
  'Input："leetcode", Output: 0'
);
assert.strictEqual2(
  firstUniqChar("leetcode"),
  0,
  'Input："loveleetcode", Output: 2'
);

// 复杂度分析
// - 空间复杂度：O(1)
//   - 因为变量只有 hash 和 i，开辟空间大小不随输入的变量变化
// - 时间复杂度：O(n)
//   - 因为有两次遍历，且每次遍历都只有一层没有嵌套，所以遍历的次数只和入参字符串 s 的长度线性正相关