/*
 * @Author: Jecyu
 * @Date: 2020-11-15 12:23:59
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-15 21:08:06
 * @FilePath: /examples/12-webpack/base/demo01/webpack.config.js
 * @Description:
 */
const path = require("path");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/main.js",
  mode: "development",
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader?minimize"],
      // },
      // {
      //   test: /\.css$/,
      //   loaders: ExtractTextPlugin.extract({
      //     use: ["css-loader"],
      //   }),
      // },
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
    ],
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: `[name].[contenthash:8].css`,
    // }),
  ],
  output: {
    filename: "bundle.js",
    //  filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "dist"),
  },
};
