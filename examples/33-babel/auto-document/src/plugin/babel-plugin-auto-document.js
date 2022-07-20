const { declare } = require('@babel/helper-plugin-utils');
const doctrine = require('doctrine');
const fse = require('fs-extra');
const path = require('path');
const renderer = require('./renderer');

// path.getTypeAnnotation 取到的类型需要做进一步的处理，更易读
function resolveType(tsType) {
    const { type } = tsType;
    if (!type) {
        return;
    }
    switch (type) {
        case 'TSStringKeyword':
            return 'string';
        case 'TSNumberKeyword':
            return 'number';
        case 'TSBooleanKeyword':
            return 'boolean';
    }
} 

function parseComment(commentStr) {
    if (!commentStr) {
        return;
    }
    return doctrine.parse(commentStr, {
        unwrap: true
    });
}

function generate(docs, format = 'json') {
    if (format === 'markdown') {
        return {
            ext: 'md',
            content: renderer.markdown(docs),
        }
    } else if (format === 'html') {
        return {
            ext: HTMLAllCollection,
            content: renderer.html(docs)
        }
    } else {
        return {
            ext: 'json',
            content: renderer.json(docs)
        }
    }
}

// 1. 提出源码关键信息
// 1.1 分别处理 classDeclaration、FunctionDeclaration 或其他节点，然后从 ast 取出名字、注释等信息
// 2. 渲染信息为指定文件格式，通过 renderer 拼接成不同的字符串
const autoDocumentPlugin = declare((api, options, dirname) => {
    api.assertVersion(7);
    return {
        pre(file) {
            file.set('docs', []);
        },
        visitor: {
            FunctionDeclaration(path, state) {
                const docs = state.file.get('docs');
                docs.push({
                    type: 'function',
                    name: path.get('id').toString(),
                    params: path.get('params').map(paramPath => {
                        return {
                            name: paramPath.toString(),
                            type: resolveType(paramPath.getTypeAnnotation()) 
                        }
                    }),
                    return: resolveType(path.get('returnType').getTypeAnnotation()),
                    doc: path.node.leadingComments && parseComment(path.node.leadingComments[0].value)
                })
                state.file.set('docs', docs);
            },
            ClassDeclaration (path, state) {
                const docs = state.file.get('docs');
                const classInfo = {
                    type: 'class',
                    name: path.get('id').toString(),
                    constructorInfo: {}, // 构造器信息
                    methodsInfo: [], // 方法信息
                    propertiesInfo: [] // 属性信息
                };
                if (path.node.leadingComments) {
                    classInfo.doc = parseComment(path.node.leadingComments[0].value);
                }
                path.traverse({
                    ClassProperty(path) {
                        classInfo.propertiesInfo.push({
                            name: path.get('key').toString(),
                            type: resolveType(path.getTypeAnnotation()),
                            doc: [path.node.leadingComments, path.node.trailingComments].filter(Boolean).map(comment => {
                                return parseComment(comment.value)
                            }).filter(Boolean)
                        })
                    },
                    ClassMethod(path) {
                        if (path.node.kind === 'constructor') {
                            classInfo.constructorInfo = {
                                params: path.get('params').map(paramPath => {
                                    return {
                                        name: paramPath.toString(),
                                        type: resolveType(paramPath.getTypeAnnotation()),
                                        doc: parseComment(path.node.leadingComments[0].value)
                                    }
                                })
                            }
                        } else {
                            classInfo.methodsInfo.push({
                                name: path.get('key').toString(),
                                doc: parseComment(path.node.leadingComments[0].value),
                                params: path.get('params').map(paramPath => {
                                    return {
                                        name: paramPath.toString(),
                                        type: resolveType(paramPath.getTypeAnnotation())
                                    }
                                }),
                                return: resolveType(path.getTypeAnnotation())
                            })
                        }
                    }
                });
                docs.push(classInfo);
                state.file.set('docs', docs);
            }
        },
        post(file) {
            const docs = file.get('docs');
            const res = generate(docs, options.format);
            fse.ensureDirSync(options.outputDir);
            fse.writeFileSync(path.join(options.outputDir, 'docs.' + res.ext), res.content);
        }
    }
});

module.exports = autoDocumentPlugin;