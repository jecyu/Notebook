/*
 * @Author: naluduo233
 * @Date: 2021-04-14 21:39:42
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-14 21:40:45
 * @FilePath: /Notebook/examples/12-webpack/base/loader-order/src/loaders/a-loader.js
 * @Description:
 */
module.exports = function(source) {
  console.log("Loader a is excuted!");
  return source;
};
