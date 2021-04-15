/*
 * @Author: naluduo233
 * @Date: 2021-04-14 22:04:08
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-14 22:07:35
 * @FilePath: /Notebook/examples/12-webpack/base/raw-loader/src/run-loader.js
 * @Description:
 */
const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

runLoaders(
  {
    resource: path.join(__dirname, "./src/demo.txt"),
    loaders: [path.join(__dirname, "./src/raw-loader.js")],
    context: {
      minimize: true,
    },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    err ? console.log(err) : console.log(result);
  }
);
