const reg = /^(dui)?/i;

// 横向模糊匹配
const regex1 = /ab{2,5}c/g;
const string1 = "abc abbc abbbc abbbbbc abbbbbbc";
const result1 = string1.match(regex1);

// 纵向模糊匹配
const regex2 = /a[123]b/g;
const string2 = "a0b a1b a2b a3b a4b";
const result2 = string2.match(regex2);

// Reg.prototype.exec() 和 String.prototype.match()
const regex3 = /[a-z]\d+[a-z]/i;
const result3 = regex3.exec('a1a');
const result4 = regex3.exec('1a1');
// ["a1a", index: 0, input: "a1a", groups: undefined]
const result5 = "a1a".match(regex3);
// result5 => ["a1a", index: 0, input: "a1a", groups: undefined]
const result6 = "1a1".match(regex3);

// match 和 exec 对 g 的输出结果不同
(function() {
  const reg = /(a)/g;
  const result1 = reg.exec("a1a"); 
  // result1 => ["a", "a", index: 0, input: "a1a", groups: undefined]
  const result2 = "a1a".match(reg); 
  // result2 => ["a", "a"]
}()) 
// match 返回的数据格式不固定, 
