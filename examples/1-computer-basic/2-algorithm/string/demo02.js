/*
 * @Description: 有效的字母异位词
 * @Author: Jecyu
 * @Date: 2020-06-02 12:34:19
 * @LastEditTime: 2020-06-03 07:19:24
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");

/**
 * @description: 给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 思路：首先，对字符串字母进行排序，然后，比较两字符串是否相等
 * 详解：
 * 1. 首先，将字符串转为数组
 * 2. 利用数组 sort 方法进行排序
 * 3. 然后，转为字符串进行比较，如果相等返回 true，反之返回 false
 * @param {type} 
 * @return: 
 */
const isAnagram = (s, t) => {
  const sArr = s.split("");
  const tArr = t.split("");
  const sortFn = (a, b) => {
    return a.charCodeAt() - b.charCodeAt();
  };
  sArr.sort(sortFn);
  tArr.sort(sortFn);
  return sArr.join("") === tArr.join("");
}


assert.strictEqual(isAnagram("anagram", "nagaram"), true, "'anagram' and 'nagaram'")
assert.strictEqual(isAnagram("rat", "cat"), false, "'rat' and 'cat'")

const isAnagram2 = (s, t) => {

  
}
