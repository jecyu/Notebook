/*
 * @Author: naluduo233
 * @Date: 2021-04-14 22:04:08
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-06-19 15:21:15
 * @FilePath: /12-webpack/base/raw-loader/run-loader.js
 * @Description:
 */
const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

runLoaders(
  {
    resource: path.join(__dirname, "./src/demo.txt"),
    loaders: [{
      loader: path.join(__dirname, "./src/raw-loader.js"),
      options: {
        name: 'test'
      }
    }],
    context: {
      minimize: true,
    },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    err ? console.log(err) : console.log(result);
  }
);
