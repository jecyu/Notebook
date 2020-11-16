/*
 * @Author: Jecyu
 * @Date: 2020-11-11 17:06:05
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-13 16:10:43
 * @FilePath: /examples/12-webpack/demo02/main.js
 * @Description: javascript-obfuscator
 */
const code = `
let x = '1' + 1 + 'regiontype'
console.log('x', x)
`;

const options = {
  compact: false,
  controlFlowFlattening: true,
  shuffleStringArray: true,
  // splitStrings: true,
};

const obfuscator = require("javascript-obfuscator");
function obfuscate(code, options) {
  return obfuscator.obfuscate(code, options).getObfuscatedCode();
}
console.log(obfuscate(code, options));
