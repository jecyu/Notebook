import Vue from "vue";
// 自动注册指令

const req = require.context("./", false, /\.\/(?!index\.)\w*\.js$/);

req.keys().forEach((fileName) => {
  const directiveName = fileName.replace(/\.\/|\.js/g, "");
  Vue.directive(directiveName, req(fileName).default);
});
