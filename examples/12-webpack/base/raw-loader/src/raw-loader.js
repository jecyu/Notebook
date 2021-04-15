/*
 * @Author: naluduo233
 * @Date: 2021-04-14 22:01:49
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-14 22:03:54
 * @FilePath: /Notebook/examples/12-webpack/base/raw-loader/src/raw-loader.js
 * @Description:
 */
module.exports = function(source) {
  const json = JSON.stringify(source)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  return `export default ${json}`;
};
