const { declare } = require('@babel/helper-plugin-utils');
const importModule = require('@babel/helper-module-imports');

const autoTrackPlugin = declare((api, options, dirname) => {
    return {
        visitor: {
            Program: {
                // 第一步 模块引入，进入程序
                enter(path, state) { 
                    path.traverse({
                        ImportDeclaration(curPath) {
                            const requirePath = curPath.get('source').node.value;
                            if (requirePath === options.trackerPath) { // 判断是否已经引入 tracker 模块
                                const specifierPath = curPath.get('specifiers.0');
                                if (specifierPath.isImportSpecifier()) { // import { tracker } from "tracker";
                                    state.trackerImportId = specifierPath.toString();
                                } else if (specifierPath.isImportNamespaceSpecifier()) { // import * as tracker from 'tracker';
                                    state.trackerImportId = specifierPath.get('local').toString();
                                } else if (specifierPath.isImportDefaultSpecifier()) { // import tracker from 'tracker';
                                    state.trackerImportId = specifierPath.toString();
                                }
                                // 找到了就终止遍历
                                curPath.stop();
                            }
                        }
                    });
                    if (!state.trackerImportId) { // 未引入模块
                        state.trackerImportId = importModule.addDefault(path, 'tracker', { // 引入模块，并获取唯一的命名标识符
                            nameHint: path.scope.generateUid('tracker')
                        }).name;
                    }
                    state.trackerAST = api.template.statement(`${state.trackerImportId}()`)(); // 埋点代码的 AST
                }
            },
            // 第二步：函数插桩
            'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'(path, state) {
                const bodyPath = path.get('body');
                if (bodyPath.isBlockStatement()) { // 有函数体就在开始插入埋点代码
                    bodyPath.node.body.unshift(state.trackerAST);
                } else { // 没有函数体要包裹一下，处理下返回值
                    const ast = api.template.statement(`{${state.trackerImportId}();return PREV_BODY;}`)({ PREV_BODY: bodyPath.node });
                    bodyPath.replaceWith(ast);
                }
            }
        }
    }
}); 

module.exports = autoTrackPlugin;