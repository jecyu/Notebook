/*
 * @Author: naluduo233
 * @Date: 2021-04-14 21:36:58
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-14 21:42:56
 * @FilePath: /Notebook/examples/12-webpack/base/loader-order/webpack.config.js
 * @Description:
 */
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve("./loaders/a-loader"),
          path.resolve("./loaders/b-loader"),
        ],
      },
    ],
  },
};
