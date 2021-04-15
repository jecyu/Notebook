/*
 * @Author: naluduo233
 * @Date: 2021-04-14 21:36:58
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-14 22:27:05
 * @FilePath: /my-plugin/webpack.config.js
 * @Description:
 */
const path = require("path");
const MyPlugin = require("./plugins/my-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
  },
  mode: "production",
  plugins: [new MyPlugin({ name: "my plugin" })],
};
