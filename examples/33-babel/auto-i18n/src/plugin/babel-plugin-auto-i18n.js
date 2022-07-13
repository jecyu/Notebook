const { declare } = require('@babel/helper-plugin-utils');
const fse = require('fs-extra')
const path = require('path');
const generate = require('@babel/generator').default;
const importModule = require('@babel/helper-module-imports');


let intlIndex = 0;
function nextIntlKey() {
    ++intlIndex;
    return `intl${intlIndex}`;
}

// 1. 引入 intl 模块
// 2. 标记不需要处理的字符串
// 3. 存储字符串的值到语言资源文件
// 4. 替换字符串，值从语言资源文件中获取
const autoi18nPlugin = declare((api, options, dirname) => {
    api.assertVersion(7);
    if (!options.outputDir) {
        throw new Error('outputDir in empty');
    }

    /**
     * 字符串 const desc = `desc`; => const desc = intl.t('intl1')
     * 模版字符串 const desc3 = `aaa ${ title + desc} bbb ${ desc2 } ccc`; => const desc3 = `intl.t('intl2', title + desc, desc2)`
     * JSX <div name='测试'></div> => <div name={intl.t('intl3')}></div>，没有 jsx 表达式符号包含的需要加上
     * @param {*} path 
     * @param {*} key 
     * @param {*} intlUid 
     */
    function getReplaceExpression(path, key, intlUid) {
        const expressionParams = path.isTemplateLiteral() ? path.node.expressions.map(item => generate(item).code) : null;
        let replaceExpression = api.template.ast(`${intlUid}.t('${key}'${expressionParams ? ',' + expressionParams.join(',') : ''})`).expression;
        if (path.findParent(p => p.isJSXAttribute()) && !path.findParent(p => p.isJSXExpressionContainer())) {
            replaceExpression = api.types.jSXExpressionContainer(replaceExpression);
        }
        return replaceExpression;
    }

    function save(file, key, value) {
        const allText = file.get('allText');
        allText.push({
            key,
            value
        });
        file.set('allText', allText);
    }

    return {
        pre(file) {
            file.set('allText', []); // 用于存储语言资源文件
        },
        visitor: {
            Program: {
                enter(path, state) {
                     // 1. 模块引入
                    path.traverse({
                        ImportDeclaration(curPath) {
                            const requirePath = curPath.get('source').node.value;
                            if (requirePath === options.intlPath) { // 判断是否已经引入 intl 模块
                                const specifierPath = curPath.get('specifiers.0'); // 默认获取第一个
                                if (specifierPath.isImportSpecifier()) { // import { intl } from "intl";
                                    state.intlImportId = specifierPath.toString();
                                } else if (specifierPath.isImportNamespaceSpecifier()) { // import * as intl from 'intl';
                                    state.intlImportId = specifierPath.get('local').toString();
                                } else if (specifierPath.isImportDefaultSpecifier()) { // import intl from 'intl';
                                    state.intlImportId = specifierPath.toString();
                                }
                                // 找到了就终止遍历
                                curPath.stop();
                            }
                        }
                    })
                    if (!state.intlImportId) { // 未引入模块
                        state.intlImportId = importModule.addDefault(path, 'intl', { // 引入模块，并获取唯一的命名标识符
                            nameHint: path.scope.generateUid('intl')
                        }).name;
                        // 手动引入
                        // const intlAST = api.template.ast(`import ${state.intlImportId} from 'intl'`); // 埋点代码的 AST
                        // path.node.body.unshift(intlAST);
                    }
                    // 2 对所有的有 `/*i18n-disable*/
                    /* 注释的字符串和模版字符串节点打个标记，用于之后跳过处理。然后把这个注释节点从 ast 中去掉
                    */ 
                    path.traverse({
                        'StringLiteral|TemplateLiteral'(path) {
                            if (path.node.leadingComments) {
                                path.node.leadingComments = path.node.leadingComments.filter(
                                    (comment, index) => {
                                        if (comment.value.includes('i18n-disable')) {
                                            path.node.skipTransform = true;
                                            return false;
                                        }
                                        return true;
                                    }
                                )
                            }
                            // 跳过引入模块的声明字符串节点
                            if (path.findParent(p => p.isImportDeclaration())) {
                                path.node.skipTransform = true;
                            }
                        }
                    });
                }
            },
            StringLiteral(path, state) {
                if (path.node.skipTransform) {
                    return;
                }
                let key = nextIntlKey();
                save(state.file, key, path.node.value);
                const replaceExpression = getReplaceExpression(path, key, state.intlImportId);
                path.replaceWith(replaceExpression);
                path.skip(); // 跳过新生成的节点
            },
            TemplateLiteral(path, state) {
                if (path.node.skipTransform) {
                    return;
                }
                const value = path.get('quasis').map(item => item.node.value.raw).join('{placeholder}');
                if (value) {
                    let key = nextIntlKey();
                    save(state.file, key, value);

                    const replaceExpression = getReplaceExpression(path, key, state.intlImportId);
                    path.replaceWith(replaceExpression);
                    path.skip(); // 跳过新生成的节点
                }
            }
        }, 
        /**
         * 输出 module.exports = { intl1: '中文', intl2: 'hello {placeholder}'}
         * 输出 module.exports = { intl1: 'English', intl2: 'hello {placeholder}'}
         * @param {*} file 
         */
        post(file) {
            const allText = file.get('allText');
            const intlData = allText.reduce((obj, item) => {
                obj[item.key] = item.value;
                return obj;
            }, {});
            const content = `const resource = ${JSON.stringify(intlData, null, 4)};\nexport default resource;`;
            fse.ensureDirSync(options.outputDir);
            fse.writeFileSync(path.join(options.outputDir, 'zh_CN.js'), content);
            fse.writeFileSync(path.join(options.outputDir, 'en_US.js'), content);
        }
    }
});

module.exports = autoi18nPlugin;