// # 入门

// ## 使用 RegExp 构造函数

// ### 优点：

// ### 缺点：二次转义的问题非常容易导致 bug
(function(){
  // 错误
  const reg = new RegExp(`\d+`);
  const result = reg.test("1");
  const result2 = reg.test("ddd");
  console.log('输出结果1 =>', result); // => false
  console.log('输出结果2 =>', result2); // => true

  // 正确，需要添加斜杠转义
  const reg2 = new RegExp(`\\d+`);
  const result3 = reg2.test("1");
  const result4 = reg2.test("ddd");
  console.log('输出结果 result3 =>', result3); // =>
  console.log('输出结果 result4 =>', result4); // =>
})()


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
