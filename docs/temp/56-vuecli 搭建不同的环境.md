# vuecli3 搭建不同的环境

blog 进行总结。sync 同步后。
## 前言

重新理顺一遍，在写 blog 可以正常处理的。后续重构环境。文档说明。
- 地址配置：主要

- sourcemap
## 为什么需要多环境

开发：development
  - 读取测试环境的配置 static-dev：yarn permission
  - 读取正式环境的配置 static-prod：yarn permission 
  - 带权限/或不带权限

测试：直接访问 http://localhost:9096/static/appConfig.json

后续再整合
  
这里的配置

打包：production
  - build:test
  - build:prod

提交：- 本地的配置，根据情况进行提交。

复盘，是否有更好的方案来处理这个环境的问题
## 如何设置多环境

可以参考 devTool 对于 sourcemap 的配置表格显示。

### 场景一
### 静态文件拷贝

- static-dev
- static-prod

最终只有一个 static 处理，因此开发中注意的是 static 的请求，而不是 static-dev 或 static-prod，这样需要约定好。

如何做到只需要通过 package.json 命令行启动即可，不需要手动更改配置。

Before：

```js
new CopyWebpackPlugin(
      [
        {
          from: '/Users/kayliang/Documents/linjy/DIST/nn-project/scst-natural-resources-cli3/public',
          to: '/Users/kayliang/Documents/linjy/DIST/nn-project/scst-natural-resources-cli3/dist',
          toType: 'dir',
          ignore: [
            'index.html',
            '.DS_Store'
          ]
        }
      ]
    ),
```

可以看到 CopyWebpackPlugin 是接受一个数组的，这样就可以把需要添加的东西进行动态修改文件夹。

进行设置：

```js
```

After

```js
config.plugin("copy").tap((args) => {
  const ignore = args[0][0].ignore;
  const option = {
    from: path.resolve(__dirname, "public", "static-dev"),
    to: path.resolve(__dirname, "dist", "static"),
  };
  args[0].push(option);
  // 忽略文件夹
  args[0][0].ignore = [...ignore, "**/static-dev/**/*", "**/static-prod/**/*"];
  return args;
});
```

### 修改插件选项

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      return [
        /* 传递给 html-webpack-plugin's 构造函数的新参数 */
      ];
    });
  },
};
```

```js
  /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        templateParameters: function () { /* omitted long function */ },
        template: '/Users/kayliang/Documents/linjy/DIST/nn-project/scst-natural-resources-cli3/public/index.html',
        favicon: '/Users/kayliang/Documents/linjy/DIST/nn-project/scst-natural-resources-cli3/public/favicon_dev.ico'
      }
    ),
```

可以在 vue --inpect 查看 webpack 的插件设置，然后在 vue.config.js 进行处理，反过来也一样。

```js
config.plugin("html").tap((args) => {
  if (process.env.NODE_ENV === "development") {
    args[0].favicon = path.resolve("public/favicon_dev.ico");
  }
  return args;
});
```

https://webpack.js.org/plugins/copy-webpack-plugin/#globoptions

https://stackoverflow.com/questions/56670264/copywebpackplugin-ignore-a-folder

## 小结

- devTool 的合理设置，开发环境下可以提升速度
  - https://webpack.js.org/configuration/devtool/#root
## 参考资料
