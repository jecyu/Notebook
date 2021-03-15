/*
 * @Author: Jecyu
 * @Date: 2021-03-09 11:17:46
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-12 09:37:01
 * @FilePath: /examples/3-js/this/apply.js
 * @Description:
 */
Function.prototype.apply2 = function(cxt, arr) {
  // Jest 配置下，不指定环境则默认为浏览器环境
  // 参考资料：https://segmentfault.com/a/1190000015436897
  // 是否需要同时兼容 Node 和浏览器环境呢？
  let context = cxt || window;
  context.fn = this;
  let result = null;
  if (!arr) {
    result = eval(`context.fn()`);
    return result;
  }
  if (Object.prototype.toString.call(arr) === "[object Array]") {
    result = eval(`context.fn(${arr.toString()})`);
  } else {
    throw new Error("params must be array.");
  }
  delete context.fn;
  return result;
};
