const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].boundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      // 处理 js 文件
      {
        test: /\.js/,
        use: [path.resolve(__dirname, "loaders/comment-require-loader.js")],
      },
      // 处理 css
      {
        test: /\.css/,
        use: [
          // "style-loader", // 结合 style-loader 才能让样式起作用
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // loader: "raw-loader",
          },
        ],
      },
      // 处理 scss 文件
      {
        test: /\.scss/,
        // scss 文件的处理顺序为 sass-loader -> css-loader -> style-loader
        use: [
          "style-loader",
          {
            loader: "css-loader",
            // options: {
            //   minimize: true,
            // },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
