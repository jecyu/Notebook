// webpack.config.js
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  entry: {
    "jecyu-dash": "./src/main.js",
    "jecyu-dash.min": "./src/main.js",
  },
  output: { // 输出文件
    path: path.join(__dirname, './dist'),
    library: "jecyuDash", // 指定库的全局变量
    // libraryExport: "default", // 入口文件，必须为 export default ...
    libraryTarget: "umd",
    filename: '[name].js' // 输出文件名，多文件导出时[name] 为占位符
  },
  mode: 'none', // 将 mode 设置为 none 不进行任何优化，不设置则在构建时默认是 production 
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      })
    ]
  }
  // 引入loader 和 plugin 处理相关文件
  // module: {
  //   rules: [
  //     {
  //       // test: 正则表达式,
  //       // use: [对应的 loader]
  //     }
  //   ]
  // },
  // plugin: {}
}