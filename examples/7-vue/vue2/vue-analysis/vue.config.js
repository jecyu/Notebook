module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js", // 使用 Node_Modules 里的 Runtime + Compiler 版本
      },
    },
  },
};
