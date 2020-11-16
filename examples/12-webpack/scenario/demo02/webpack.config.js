/*
 * @Author: Jecyu
 * @Date: 2020-11-11 16:25:45
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-11 16:46:39
 * @FilePath: /examples/12-webpack/demo02/webpack.config.js
 * @Description:
 */
"use strict";
const path = require("path");
const WebpackObfuscator = require("webpack-obfuscator");

module.exports = {
  entry: {
    abc: "./test/index.js",
    cde: "./test/index1.js",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js", // output: abc.js, cde.js
  },
  module: { 
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "index2.js")],
        enforce: "post",
        use: {
          loader: WebpackObfuscator.loader,
          options: {
            rotateStringArray: true,
          },
        },
      },
    ],
  }
  // plugins: [
  //   new JavaScriptObfuscator(
  //     {
  //       rotateStringArray: true,
  //     },
  //     ["abc.js"]
  //   ),
  // ],
};
