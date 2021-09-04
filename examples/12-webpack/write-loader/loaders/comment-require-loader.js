/**
 * 将在 JavaScript 代码中的注释语法：
 * // @require '../style/index.css'
 * 转换成
 * require('../style/index.css');
 * 该 Loader 的使用场景是正确加载针对 Fis3（http://fis.baidu.com/fis3/docs/user-dev/require.html）编写的 JavaScript，这些 JavaScript 中存在通过注释的方式加载依赖的 CSS 文件。
 */

// replace
// @require '../style/index.css'
// to
// require('../style/index.css');
function replace(source) {
  return source.replace(/(\/\/ *@require) +(('|").+('|")).*/, "require($2);");
}
module.exports = function(content) {
  return replace(content);
};
