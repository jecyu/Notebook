/*
 * @Author: naluduo233
 * @Date: 2021-04-14 22:01:49
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-06-19 15:40:02
 * @FilePath: /12-webpack/base/raw-loader/src/raw-loader.js
 * @Description:
 */

const loaderUtils = require("loader-utils");
const fs = require("fs");
const path = require("path");

module.exports = function(source) {
  const { name } = loaderUtils.getOptions(this);
  this.cacheable(false);
  const callback = this.async(); // 异步 loader
  console.log("name", name);
  const json = JSON.stringify(source)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  // return `export default ${json}`; // 同步
  // throw new Error("Error");
  // this.callback(null, json, 2, 3, 4);
  fs.readFile(path.join(__dirname, "./async.txt"), "utf-8", (err, data) => {
    if (err) {
      callback(err, "");
    }
    callback(null, data);
  });
};
