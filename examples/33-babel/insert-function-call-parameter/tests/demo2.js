const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template');

const sourceCode = `
    console.log(1);

    const jsx = <div>{console.log(1)}</div>;
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
});

const targeCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

traverse(ast, {
    CallExpression(path, state) {
        if (path.node.isNew) { // 跳过新节点
            return;
        }
        
        const calleeName = generate(path.node.callee).code;
        if (targeCalleeName.includes(calleeName)) {
            const { line, column } = path.node.loc.start;

            const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
            newNode.isNew = true;

            if (path.findParent(path => path.isJSXElement())) {
                path.replaceWith(types.arrayExpression([newNode, path.node]));
                path.skip(); // 跳过子节点的遍历
            } else {
                path.insertBefore(newNode);
            }
        }
    }
});

const { code, map } = generate(ast);
console.log(code);