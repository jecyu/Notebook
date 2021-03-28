# rollup

> [rollup](https://github.com/rollup/rollup)

对于前端项目来说，因为有静态资源（如图片、字体等）加载与按需加载的需求，所以使用 `webpack` 是不二选择，但对于第三方库来说，其实还有更好的选择：`rollup`。

webpack 在打包成第三方库的时候只能导出 `amd/commonjs/umd`，而 rollup 能够导出 `amd/commonjs/umd/es6`。使用 rollup 导出 es6 模块，就可以在使用这个库的项目中构建时使用 `tree-shaking` 功能。

对于有样式文件（css、less、scss）、静态资源文件（图片、字体）的前端组件来说，可以使用 `rollup-plugin-postcss` 插件配合 rollup 处理样式文件与静态资源文件。

## 0. 前言
## 1. 基础

## 2. 项目实战

### 搭建一个 TypeScript 库项目

## 3. 原理

### 不提供热更新

可以下载 `npm-run-all` 以及 `live-server` 来加载浏览器。

## 参考资料

- [Rollup.js 教程](https://www.zcfy.cc/article/how-to-bundle-stylesheets-and-add-livereload-with-rollup) —— 比较详细的系列教程。