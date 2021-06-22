/*
 * @Author: naluduo233
 * @Date: 2021-04-14 21:36:58
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-06-19 18:12:12
 * @FilePath: /zip-plugin/webpack.config.js
 * @Description:
 */
const path = require("path");
const ZipPlugin = require("./plugins/zip-plugin");


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
  },
  mode: "production",
  plugins: [new ZipPlugin({ filename: "offline" })],
};
