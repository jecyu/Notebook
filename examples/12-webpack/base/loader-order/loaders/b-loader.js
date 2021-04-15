/*
 * @Author: naluduo233
 * @Date: 2021-04-14 21:39:47
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-14 21:40:52
 * @FilePath: /Notebook/examples/12-webpack/base/loader-order/src/loaders/b-loader.js
 * @Description: 
 */
module.exports = function(source) {
  console.log("Loader b is excuted!");
  return source;
};
