/**
 *
 * 当项目在开启观察者watch模式的时候，监听每一次资源的改动
 * 当每次资源变动了，将改动资源的个数以及改动资源的列表输出到控制台中
 * 监听结束之后，在控制台输出"本次监听停止了哟～"
 */

function WatcherWebpackPlugin(options) {
  this.options = options || {};
}

WatcherWebpackPlugin.prototype.apply = function(compiler) {
  // const isWebpack5 = compiler.webpack
  //   ? parseInt(compiler.webpack.version, 10) === 5
  //   : false; // 判断版本

  compiler.hooks.watchRun.tapAsync("WatcherPlugin", (compiler, cb) => {
    // const changedTimes = isWebpack5
    //   ? compiler.watchFileSystem.watcher.getTimes()
    //   : (compiler.watchFileSystem.wfs || compiler.watchFileSystem).watcher
    //       .mtimes;
    // console.log("changedTimes->", changedTimes);
    const fileWatchers = compiler.watchFileSystem.watcher.fileWatchers;
    console.log("fileWatchers", Object.prototype.toString.call(fileWatchers));
    let paths = Array.from(fileWatchers)
      .map((watcher) => watcher[1].path) 
      .filter((path) => !/node_modules/.test(path));
    console.log("我可是时刻监听着的 🚀🚀🚀");
    if (paths.length > 0) {
      console.log(`本次一共改动了 ${paths.length} 个文件，目录为：`); // 这里把其他的目录都添加上了。
      console.log(paths);
      console.log("-----------分割线--------------");
    }

    cb();
  });

  compiler.hooks.watchClose.tap("WatcherPlugin", () => {
    console.log("本次监听停止了哟～👋👋👋");
  });
};

module.exports = WatcherWebpackPlugin;
