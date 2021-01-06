/*
 * @Author: Jecyu
 * @Date: 2020-12-08 22:11:03
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-23 00:08:00
 * @FilePath: /examples/4-vue/vue2Cli/vue.config.js
 * @Description:
 */
module.exports = {
  configureWebpack: {
    devtool: "source-map",
    externals: {
      vue: "window.Vue",
    },
  },
  devServer: {
    open: true,
  },
};
