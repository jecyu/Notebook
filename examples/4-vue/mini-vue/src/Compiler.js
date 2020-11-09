const Watcher = require("./reactive/Watcher");

function walkChildren(el, scope) {
  [].slice.call(el.childNodes).forEach((node) => {
    if (node.nodeType === 3) {
      // text node
      compileText(node, scope);
    } else if (node.nodeType === 1) {
      // element node
      //   walkAttributes(node, scope);
      walkChildren(node, scope);
    }
  });
}

function compileText(node, scope) {
  let exp = textToExp(node.textContent);
  new Watcher(exp, scope, (newVal) => {
    node.textContent = newVal;
  });
}

function textToExp(text) {
  let pieces = text.split(/({{.+?}})/g);
  pieces = pieces.map((piece) => {
    if (piece.match(/{{.+?}}/g)) {
      // {{}}内的代码，以js表达式输出
      piece = "(" + piece.replace(/^{{|}}$/g, "") + ")";
    } else {
      // {{}}外的代码，以字符串输出
      piece = "`" + piece.replace(/`/g, "\\`") + "`"; // 需要对字符串中的`转义
    }
    return piece;
  });
  return pieces.join("+");
}
/**
 * 遍历 DOM 树，并把需要编译的部分替换成编译的结果
 */
class Compiler {
  constructor(el, scope) {
    walkChildren(el, scope);
  }
}

module.exports = Compiler;
