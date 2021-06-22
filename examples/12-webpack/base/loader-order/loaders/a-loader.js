/*
 * @Author: naluduo233
 * @Date: 2021-04-14 21:39:42
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-06-19 16:11:13
 * @FilePath: /loader-order/loaders/a-loader.js
 * @Description:
 */
const loaderUtils = require("loader-utils");
module.exports = function(source) {
  console.log("Loader a is excuted!");
  const url = loaderUtils.interpolateName(this, "[name].[ext]", source);
  console.log(url);
  this.emitFile(url, source);
  return source;
};
