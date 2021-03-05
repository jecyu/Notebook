/*
 * @Author: Jecyu
 * @Date: 2021-03-02 17:17:26
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-04 11:26:44
 * @FilePath: /examples/12-webpack/scenario/writeWebpack/leo_webpack.js
 * @Description:
 */
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser"); // 用于分析通过 fs.readFileSync  读取的文件内容，并返回 AST (抽象语法树) ；
const traverse = require("@babel/traverse").default; // 用于遍历 AST, 获取必要的数据；

const babel = require("@babel/core"); // babel 核心模块，提供 transformFromAst 方法，用于将 AST 转化为浏览器可运行的代码；

// @babel/preset-env : 将转换后代码转化成 ES5 代码；

let moduleId = 0;
function createAssets(filename) {
  const content = fs.readFileSync(filename, "utf-8");

  // 将读取文件流 buffer 转换为 AST
  const ast = parser.parse(content, {
    sourceType: "module", // 指定源码类型
  });
  // console.log("ast ->", ast);

  const dependencies = []; // 用于收集文件依赖的路径
  // 通过 traverse 提供的操作 AST 的方法，获取每个节点的依赖路径
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      // console.log('node.source ->', node.source);

      dependencies.push(node.source.value);
    },
  });
  console.log("dependencies ->", dependencies);

  // 将 AST 转换为浏览器可运行代码
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"],
  });
  // console.log("code ->", code);

  let id = moduleId++; // 设置当前处理的模块 ID
  return {
    id,
    filename,
    code,
    dependencies,
  };
}
// createAssets("./src/index.js");

/**
 * @description:
 * @param {*} entry 入口文件的路径
 * @return {*}
 */
function createGraph(entry) {
  const mainAsset = createAssets(entry); // 获取入口文件下的内容
  const queue = [mainAsset]; // 入口文件的结果作为第一项
  for (const asset of queue) {
    const dirname = path.dirname(asset.filename);
    asset.mapping = {}; // 用来保存文件的相对路径和模块 ID 的对应关系
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath); // 转换文件路径为绝对路径
      // console.log("absolutePath ->", absolutePath);

      const child = createAssets(absolutePath);
      asset.mapping[relativePath] = child.id; // 保存模块ID
      queue.push(child); // 递归去遍历所有子节点的文件
    });
  }
  return queue;
}

/**
 * @description:
 * @param {*} graph
 * @return {*}
 */
function bundle(graph) {
  let modules = "";
  // 读取所有模块信息 // 构建工具无法判断是否支持require / module / exports 这三种模块方法，因此需要 require、module、exports 三种方法
  graph.forEach((item) => {
    modules += `
        ${item.id}: [
            function (require, module, exports){ // 外部声明
                ${item.code}
            },
            ${JSON.stringify(item.mapping)}
        ],
    `;
  });

  return `
  (function(modules){
      function require(id){
          const [fn, mapping] = modules[id];
          function localRequire(relativePath){
              return require(mapping[relativePath]); // 根据mapping的路径，找到对应的模块id
          }
          const module = {
              exports: {}
          } 
          // 注入 require 方法，module，modulex.export 属性，对应前面的 modules 声明
          // 执行每个模块的代码
          fn(localRequire, module, module.exports); 
          return module.exports;
      }
      require(0); // 执行入口文件
  })({${modules}})
`;
}
const graph = createGraph("./src/index.js");
console.log(graph);
const result = bundle(graph);
console.log("result ->", result);
eval(result);
