/**
 * 在每次 webpack 打包之后，自动产生一个打包文件清单，实际上就是一个 markdown 文件，上面记录了打包之后的文件夹 dist 里所有的文件的一些信息。
 * 拆分需求：
 * 1. 首先要确定我们的插件是不是需要传递参数进去
 *    module.exports = {
          new FileListPlugin({
          filename: 'fileList.md'
        })
      }
 * 2. 确定我们的插件是要在那个钩子函数中执行 -> emit
 * 3. 我们如何创建一个markdown文件并塞到dist里，不需要用 node 的 fs 
 * 4. markdown文件内的内容是长什么样的
 * # 一共有 2 个文件
   * 
   * - main.bundle.js
   * - index.html
 */

function FileListWebpackPlugin(options) {
  this.options = options || {};
  this.filename = this.options.filename || "fileList.md";
}

FileListWebpackPlugin.prototype.apply = function(compiler) {
  // 1. 通过 compiler.hooks.emit.tapAsync()来触发生成资源到 output 目录之前的钩子，且回调函数会有两个参数，一个是 compilation，一个是 cb 回调函数
  // compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, cb) => {
  //   // 2. 要生成的 markdown 文件的名称
  //   const filename = this.filename;
  //   // 3. 通过 compilation.assets 获取到所有待生成的文件，这里是获取它的长度
  //   const len = Object.keys(compilation.assets).length;
  //   // 4. 定义 markdown 文件的内容，也就是先定义一个一级标题，\n表示的是换行符
  //   let content = `# 一共有 ${len} 个文件\n\n`;
  //   // 5. 将每一项文件的名称写入 markdown 文件内
  //   for (let filename in compilation.assets) {
  //     content += `-${filename}\n`;
  //   }
  //   // 6. 给我们即将生成的 dist 文件夹里添加一个新的资源，资源的名称就是 fileListName 变量
  //   compilation.assets[filename] = {
  //     // 7. 写入资源的内容
  //     source: function() {
  //       return content;
  //     },
  //     // 8. 指定新资源的大小，用于 webpack 展示
  //     size: function() {
  //       return content.length;
  //     },
  //   };
  //   // 9. 由于我们使用的是 tapAsync 异步调用，所以必须执行一个回调函数cb，否则打包后就只会创建一个空的 dist 文件夹。
  //   cb();
  // });

  // 写法二 Promise
  // // 1. 通过 compiler.hooks.emit.tapPromise()来触发生成资源到 output 目录之前的钩子
  // compiler.hooks.emit.tapPromise("FileListPlugin", (compilation) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 1000);
  //     // 2. 要生成的 markdown 文件的名称
  //     const filename = this.filename;
  //     // 3. 通过 compilation.assets 获取到所有待生成的文件，这里是获取它的长度
  //     const len = Object.keys(compilation.assets).length;
  //     // 4. 定义 markdown 文件的内容，也就是先定义一个一级标题，\n表示的是换行符
  //     let content = `# 一共有 ${len} 个文件\n\n`;
  //     // 5. 将每一项文件的名称写入 markdown 文件内
  //     for (let filename in compilation.assets) {
  //       content += `-${filename}\n`;
  //     }
  //     // 6. 给我们即将生成的 dist 文件夹里添加一个新的资源，资源的名称就是 fileListName 变量
  //     compilation.assets[filename] = {
  //       // 7. 写入资源的内容
  //       source: function() {
  //         return content;
  //       },
  //       // 8. 指定新资源的大小，用于 webpack 展示
  //       size: function() {
  //         return content.length;
  //       },
  //     };
  //   });
  // });

  // 写法三 async/await
  // 1. 通过 compiler.hooks.emit.tapPromise()来触发生成资源到 output 目录之前的钩子
  compiler.hooks.emit.tapPromise("FileListPlugin", async (compilation) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
      // 2. 要生成的 markdown 文件的名称
      const filename = this.filename;
      // 3. 通过 compilation.assets 获取到所有待生成的文件，这里是获取它的长度
      const len = Object.keys(compilation.assets).length;
      // 4. 定义 markdown 文件的内容，也就是先定义一个一级标题，\n表示的是换行符
      let content = `# 一共有 ${len} 个文件\n\n`;
      // 5. 将每一项文件的名称写入 markdown 文件内
      for (let filename in compilation.assets) {
        content += `-${filename}\n`;
      }
      // 6. 给我们即将生成的 dist 文件夹里添加一个新的资源，资源的名称就是 fileListName 变量
      compilation.assets[filename] = {
        // 7. 写入资源的内容
        source: function() {
          return content;
        },
        // 8. 指定新资源的大小，用于 webpack 展示
        size: function() {
          return content.length;
        },
      };
    });
  });
};

module.exports = FileListWebpackPlugin;
