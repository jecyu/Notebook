/*
 * @Author: naluduo233
 * @Date: 2021-04-14 09:33:16
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-14 09:36:03
 * @FilePath: /examples/babel.config.js
 * @Description:
 */
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: ["@babel/plugin-proposal-class-properties"],
};
