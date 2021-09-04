const path = require("path");
const HtmlWeapackPlugin = require("html-webpack-plugin");
// const No1WebpackPlugin = require("./plugins/No1-webpack-plugin");
// const No2WebpackPlugin = require("./plugins/No2-webpack-plugin");
const FileListWebpackPlugin = require("./plugins/File-list-webpack-plugin");
const WatcherWebpackPlugin = require("./plugins/Watch-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWeapackPlugin({ title: "custom-plugin" }),
    // new No1WebpackPlugin({ msg: "good boy" }),
    // new No2WebpackPlugin({ msg: "bad boy" }),
    // new FileListWebpackPlugin(),
    new WatcherWebpackPlugin(),
  ],
};
