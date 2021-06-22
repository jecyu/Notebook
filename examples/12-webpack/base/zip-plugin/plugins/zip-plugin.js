/*
 * @Author: naluduo233
 * @Date: 2021-04-14 22:22:33
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-06-19 22:04:27
 * @FilePath: /zip-plugin/plugins/zip-plugin.js
 * @Description:
 */
const JSZip = require("jszip");
const zip = new JSZip();
const path = require("path");
const RawSource = require("webpack-sources").RawSource;

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
      const folder = zip.folder(this.options.filename); 

      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source(); // 获取文件资源
        folder.file(filename, source);
      }

      zip.generateAsync({ type: "nodebuffer" }).then((content) => {
        const outputPath = path.join( // 绝对路径
          compilation.options.output.path,
          this.options.filename + ".zip"
        );

        const outputRelativePath = path.relative( // 获取相对路径
          compilation.options.output.path,
          outputPath
        );

        compilation.assets[outputRelativePath] = new RawSource(content); // zip 资源包甚至到 assets 对象上

        callback();
      });
    });
  }
};
