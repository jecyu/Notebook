const generate = require('@babel/generator').default;

const targeCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

module.exports = function({types, template}) {
    return {
        visitor: {
            CallExpression(path, state) { // state 可以读取插件 options 的配置
                if (path.node.isNew) {
                    return;
                }
                
                const calleeName = generate(path.node.callee).code;
                if (targeCalleeName.includes(calleeName)) {
                    const { line, column } = path.node.loc.start;
        
                    const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
                    newNode.isNew = true;
        
                    if (path.findParent(path => path.isJSXElement())) {
                        path.replaceWith(types.arrayExpression([newNode, path.node]));
                        path.skip(); // 跳过新节点的遍历
                    } else {
                        path.insertBefore(newNode);
                    }
                }
            }
        }
    }
}