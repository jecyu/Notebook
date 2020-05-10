/*
 * @Description: 分组和分支结构
 * @Author: Jecyu
 * @Date: 2020-05-01 12:20:11
 * @LastEditTime: 2020-05-06 19:07:40
 * @LastEditors: Jecyu
 */

// ##  分组

(function() {
  const regex = /(ab)+/g;
  const string = "ababa abbb ababab";
  const result = regex.exec(string);
  console.log("string match =>", result);
  // => Array(2) [0: "abab", 1: "ab", groups: undefined, input: "ababa abbb ababab"]
})();

// ## 分支结构

(function() {
  const regex = /^I love JavaScript|Regular Expression$/;
  console.log('分支1 =>', regex.test("I love JavaScript"));
  console.log('分支2 =>', regex.test("I love Regular Expression"));
  // => true
  // => true
})()
