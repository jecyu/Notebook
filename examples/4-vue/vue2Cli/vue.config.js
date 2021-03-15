/*
 * @Author: Jecyu
 * @Date: 2020-12-08 22:11:03
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-08 11:28:03
 * @FilePath: /examples/4-vue/vue2Cli/vue.config.js
 * @Description:
 */
module.exports = {
  configureWebpack: {
    devtool: "source-map",
    externals: {
      vue: "window.Vue",
      vuex: "window.Vuex",
      vueRouter: "window.VueRouter"
    },
  },
  devServer: {
    open: true,
  },
};
