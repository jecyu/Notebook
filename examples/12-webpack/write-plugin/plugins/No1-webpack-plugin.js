// 1. 创建一个构造函数
function No1WebpackPlugin(options) {
  this.options = options;
}
// 2. 重写构造函数原型对象上的 apply 方法
No1WebpackPlugin.prototype.apply = function(compiler) {
  console.log(compiler.hooks.done);
  // 传统写法
  // compiler.plugin('done', () => {
  //   console.log(this.options.msg)
  // })

  // 推荐写法
  compiler.hooks.done.tap("No1", () => { // 注册一个 done 的执行回调
    console.log(this.options.msg);
  });
};
// 3. 将我们的自定义插件导出
module.exports = No1WebpackPlugin;
