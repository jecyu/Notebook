/*
 * @Description: 报数
 * 报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：
 * 1. 1
 * 2. 11
 * 3. 21
 * 4. 1211
 * 5. 111221
 * 1 被读作“one 1”（“一个一”），即 11。11 被读作“two 1s”（“两个一”），即 21。21 被读作 “one 2”，“one 1”（“一个二”，“一个1”），即 1211
 * 给定一个正整数 n，（1 ≤ n ≤ 30），输出报数序列的第 n 项。
 * 注意：整数顺序将表示为一个字符串。
 * 1. 输入：1 => 输出："1"
 * 2. 输入：4 => 输出："1211"
 * @Author: Jecyu
 * @Date: 2020-06-05 09:26:47
 * @LastEditTime: 2020-06-05 10:29:46
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");

const countAndSay = function(n) {
  if (n === 1) {
    return "1";
  }
  const preResult = countAndSay(n - 1); // 获取第 n-1 项的结果
  /** 
   * \d 匹配一个数字
   * \1 匹配前面第一个括号内匹配的内容
   * (\d)\1* 匹配第一个括号相同的数字，0个多个，如1 => 1, 11 => 11, 112 => 11
   * g 会匹配所有符合规则的字符
  */
  return preResult.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`);
}

assert.strictEqual(countAndSay(1), "1", "输入：1 => 输出：'1'");
assert.strictEqual(countAndSay(4), "1211", "输入：1 => 输出：'1211'");

// 时间复杂度：O(n)，本算法涉及递归，代码的调用次数为 n 次。故而时间复杂度为 O(n)。
// 空间复杂度：O(n)，递归算法，调用次数随 n 增加而成线性增加，每次调用申明变量数相同。故而空间复杂度为 O(n)。

/**
 * @description: 循环法
 * @param {type} 
 * @return: 
 */
const countAndSay2 = function(n) {
  let result = "1";
  for (let i = 1; i < n; i++) { // 循环获取知道第 n 项
    result = result.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`)
  }  
  return result;
}

assert.strictEqual(countAndSay2(1), "1", "输入：1 => 输出：'1'");
assert.strictEqual(countAndSay2(4), "1211", "输入：1 => 输出：'1211'");
// 时间复杂度 O(n)，调用次数为 n 次。
// 空间复杂度：O(1)，申明对象数量为固定值。