// 字面量转化为函数
exports.expToFunc = function expToFunc(exp, scope) {
  return new Function("with(this) {return" + exp + "}").bind(scope);
};
