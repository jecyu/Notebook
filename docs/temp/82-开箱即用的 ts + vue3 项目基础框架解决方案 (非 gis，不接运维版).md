# 构建一个 TypeScript + Vue3 项目基础框架解决方案



## 0. 前言

为了紧跟上技术的发展，以及更好地帮助开发者维护软件，并提升协作的效率。xcli 新增一个 TS + Vue3 的项目基础框架，为后续新项目基于新技术的快速开展提供帮助。

文章大纲：

- 架构搭建
- 代码规范
- 提交规范
- 单元测试
- 自动部署

## 1. 系统整体需求分析

## 2. 系统整体架构设计

## 3. 系统整体前置基础知识准备

### vue3 相比 vue2 到底有多少改变

- 框架
  - 非兼容
    - 重大改变有 5、6 处
    - 小改变有 10 多处
  - VCA
  - 生命周期
  - Teleport 组件
  - 异步组件
  - ref、reactive、toRefs、toRef
  - watchEffects vs watch
  - fragment（片段）
  - emit
  - v-model
  - key attribute
  - 全局 API
  - 底层优化
    - Proxy 代理
    - 静态提升（hoistStatic）vdom
- 与 ts
  - defineComponent
  - props 推导
  - PropType
- build ｜ 更好的 tree-sharking（摇树优化）
- options api 与 compositon api 取舍

其中 Vuex、Vue Router 也有不少重大的变化。

### vue3 对 ts 的兼容有多大

以前的 vue2 要使用 class-api 的方案去处理 ts 的问题。

- （vue 3 对 TS 是可选的，而不是强制的）
- > 3.0 的一个主要设计目标是增强对 TypeScript 的支持。原本我们期望通过 Class API 来达成这个目标，但是经过讨论和原型开发，我们认为 Class 并不是解决这个问题的正确路线，基于 Class 的 API 依然存在类型问题。——尤雨溪

### vue2 的 UI 库、工具是否都适应 vue3 了？如何处理？

#### 已有的开源组件库

- Ant-design-vue 2.0 版本
- Vant 3.0 移动端组件库
- Element-plus vue3 重构版

- 没有适配的如何处理？如何考虑？
- fork quark 进行 vue3 的重构版本开发

建议：可以考虑先用 ant-design-vue 作为基础版本，之后再考虑替换为其他 quark（vue3 版本）内部版本。

### 打包库是使用 webpack 还是直接不用打包使用 vite？对于后续升级到使用 vite 是否方便？

#### webpack 模式

统一先使用 webpack，至少让当前的项目模版走通，尽量减少新的认知）是否应该更加激进呢？还是用 webpack 进行生产环境的处理，再逐步研究 vite。

- 使用 webpack 的话，直接用 vue-cli v4.5.0 直接开启 vue3 即可。

#### vite （开发模式与生产模式）

- 关于 vite 
  - 一个是 Vite 主要对应的场景是开发模式，原理是拦截浏览器发出的 ES imports 请求并做相应处理。（生产模式是用 rollup 打包）
  - 一个是 Vite 在开发模式下不需要打包，只需要编译浏览器发出的 HTTP 请求对应的文件即可，所以热更新速度很快。
  - 因此，要实现上述目标，需要要求项目里只使用原生 ES imports，如果使用了 require 将失效，所以要用它完全替代掉 Webpack 就目前来说还是不太现实的。上面也说了，生产模式下的打包不是 Vite 自身提供的，因此生产模式下如果你想要用 Webpack 打包也依然是可以的。从这个角度来说，Vite 可能更像是替代了 webpack-dev-server 的一个东西。

![](../.vuepress/public/images/2021-01-27-18-29-18.png)

可以分别对比一个用 vite 的项目以及一个用 vuecli 4.5.0 下的项目的开发、生产体验。

后续要使用 vite 重构成本会比较大的，后续可以提供两个版本的处理，先 vuecli 的 webpack 版本，然后再是 vite 版本，可能后续 vuecli 官方支持呢。

对比配置内容。

### Review 优秀的开源项目（比如 vue-vben-admin）

分别对比一个用 vite 的项目以及一个用 vuecli 4.5.0 下的项目

- vue-vben-admin（vue3，vite2、antd-design-vue、ts） https://github.com/anncwb/vue-vben-admin

两个版本，一个是 vuecli 版本下的基础框架，一个是采用 vite 进行构建的版本。

先进行，再对比。

### 关于 TypeScript 的编译问题：使用 typescript 还是 babel 编译

注意：无论是使用 typescript 编译还是 babel 编译，都需要安装 ts-loader 对 ts 文件的读取处理。

#### 使用 TS-Loader 编译 TypeScript 文件

vueCli4 主要使用 [@vue/cli-plugin-typescript](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript)

> typescript plugin for vue-cli

Uses TypeScript + `ts-loader` + [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin) for faster off-thread type checking.

输入命令 `vue add typescript` 即可加入对应的插件

Injected webpack-chain Rules

- `config.rule('ts')`
- `config.rule('ts').use('ts-loader')`
- `config.rule('ts').use('babel-loader')` (when used alongside `@vue/cli-plugin-babel`)
- `config.rule('ts').use('cache-loader')`
- `config.plugin('fork-ts-checker')`

具体的验证可以通过 `vue inspect --> output.js` 查看输出的 webpack 配置文件，这个也可以作为后续自定义使用 babel 编译作参考。

#### 使用 babel 编译 TypeScript 文件

类型编译与类型检查分离，大大提升编译速度。**目前这块是 ts-loader 的编译，根本不是 babel 编译，后续需要处理。**

- 使用 @babel/typescript + babel.config.js 进行编译。

1. 第一步：安装 @babel/typescript

在 babel.config.js 中填写以下：

```js
module.exports = {

  presets: ["@babel/typescript", "@vue/cli-plugin-babel/preset"],

  plugins: [ // *支持*

​    "@babel/proposal-class-properties",

​    "@babel/proposal-object-rest-spread",

  ],

};
```

Babel 默认查找 .js 文件，现在还没办法在 Babel 的 config 文件中进行配置。如果使用 Babel CLI，添加 `--extensions '.ts'`。

2. 第二步：如果使用 Webpack，则在 resolve.extensions 数组中添加 `.ts`，否则会出现找不到 `xxx.ts`  模块文件。

vue.config.js

```js
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 9096,
    open: true,
  },
  configureWebpack: {
    entry: "./src/main.ts",
    resolve: {
      extensions: [".ts"], // <--新增
    },
  },
};
```

这个时候，运行 `vue serve` 还是会报错，无法处理 ts 文件的：

```shell
Module parse failed: Unexpected token (21:12)
File was processed with these loaders:
 * ./node_modules/eslint-loader/index.js
You may need an additional loader to handle the result of these loaders.
| import Home from "../views/Home.vue";
| 
> const routes: Array<RouteRecordRaw> = [
|   {
|     path: "/",

 @ ./src/main.ts 3:0-30 11:9-15
 @ multi (webpack)-dev-server/client?http://192.168.0.143:9096&sockPath=/sockjs-node (webpack)/hot/dev-server.js ./src/main.ts

```

3. 第三步：需要添加对应的 loader 进行解析 ts 文件：

```js
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 9096,
    open: true,
  },
  configureWebpack: {
    entry: "./src/main.ts",
    plugins: [new ForkTsCheckerWebpackPlugin()],
    resolve: {
      extensions: [".ts", ".tsx"],
    },
  },
  // Start 新增代码
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .test(/(\.ts)|(\.tsx)$/)
      .use("babel-loader")
      .loader("ts-loader")
      .end();
  },
  // End
};

```

- 使用 fork-ts-checker-webpack-plugin + typescript 包和 tsconfig.json 进行开发/生产环境的类型检查。

```js
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin"); // 新增
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 9096,
    open: true,
  },
  configureWebpack: {
    entry: "./src/main.ts",
    plugins: [new ForkTsCheckerWebpackPlugin()], // 新增
    resolve: {
      extensions: [".ts"],
    },
  },
};
```

#### TypeScript ESLint 处理

## 1. 需求分析：确定当前的基础模版功能

### 1.0.0

- [x] Vue3 + Vue router 4 + Vuex 4 全家桶
- [x] 使用 babel 编译，解决 ts-loader 编译过慢的问题
- [x] TypeScript
- [x] antd-design-vue 2.0（后续使用 quark 可以需要替换）
- [x] 符合规范的组织结构
- [x] 配置文件自动读取
- [ ] 提供常用工具的配置
- [x] 自动加载全局组件，并可在 Demo 页面查看 &vuex modules
- [ ] eventBus 解决方案
- [ ] rem（自动处理响应式系统），这块需要另外研究下，如何更加好的适应。
- [x] svg 图标
- [x] 生产环境与正式环境配置文件自动切换
- [x] hjson
- [ ] ie 11
- [ ] bable 可选链
- [ ] dart-sass
- [x] jest
- [ ] 性能优化
  - [x] TS 编译
  - [ ] gzip
  - [ ] 更进一步优化自己的 svg

### 1.0.1

- [ ] .vscode 调试配置

## 2. 架构设计与实现

### 目录设计：使用 vuecli 初始化项目雏形

### 基于 xcli4 搭建开发环境

#### 使用 babel 编译 TypeScript ，解决 vue cli 使用 typescript 后打包巨慢的问题

参考：https://juejin.cn/post/6844903955638517773#comment

@babel/preset-typescript

This preset is recommended if you use [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), a typed superset of JavaScript. It includes the following plugins:[@babel/plugin-transform-typescript](https://babeljs.io/docs/en/babel-plugin-transform-typescript)You will need to specify `--extensions ".ts"` for `@babel/cli` & `@babel/node` cli's to handle `.ts` files. 这里 vuecli 已经配置了相关的 babel-loader 针对 ts、tsx 的识别。

@babel/plugin-transform-typescript

This plugin adds support for the syntax used by the [TypeScript programming language](https://www.typescriptlang.org/). However, this plugin does not add the ability to type-check the JavaScript passed to it. For that, you will need to install and set up TypeScript.

1. 安装上述两个任意一个文件：

```
yarn add @babel/preset-typescript --dev
```

2. 去掉 ts-loader 的处理

```js
module.exports = {
  chainWebpack: config => {
      config.module.rule('ts').uses.delete('ts-loader')
      config.module.rule('tsx').uses.delete('ts-loader')
  }
}
```

3. 在 babel.config.js 配置：

```js
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset", "@babel/preset-typescript"],
};

```

4. TypeScript 支持 vue 文件

```sh
ERROR in src/main.ts:2:17
TS2307: Cannot find module './App.vue' or its corresponding type declarations.
    1 | import { createApp } from 'vue'
  > 2 | import App from './App.vue'
      |                 ^^^^^^^^^^^
    3 | 
    4 | createApp(App).mount('#app')
    5 | 
```


新建 shims-vue.d.ts，放到 types 文件夹下：

```ts
declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

```

5. 让 vue 文件里的 `<script lang="ts">` 通过 vue-loader 中转到 babel 上来

   设置 `allExtensions: true` （将每个文件都作为 TS 或 TSX （取决于 `isTSX` 参数）进行解析）和 `isTSX: true`。

```js
["@babel/preset-typescript", { allExtensions: true, isTSX: true }] 
```

强制开启 `jsx` 解析。否则，尖括号将被视为 typescript 的类型断言。会出现，`.vue` 文件中一些 ts 代码的语法报错。（这块具体要看下 webpack 的整体，使用 webpack 搭建一个。再来区分 vue-cli 的处理。）

#### 提交规范

### 手动搭建

## 3. 需求逐个实现

### Svg 支持

```html
  <i :class="['svg-icon', `svg-icon-${name}`]" :style="svgStyle">
    <svg fill="currentColor" aria-hidden="true" :width="width" :height="height">
      <use :xlink:href="iconName" />
    </svg>
  </i>
```

### 使用 Vuex 4.x

 新版 devtool-beta 目前没支持 vuex

#### 使用 Vue Router 4.x

- new Router 变成 createRouter

- 新的 history 配置取代 mode

- TypeScript 变化

  | vue-router@3 | vue-router@4            |
  | ------------ | ----------------------- |
  | RouteConfig  | RouteRecordRaw          |
  | Location     | RouteLocation           |
  | Route        | RouteLocationNormalized |
  

参考资料：
- 文档：https://next.router.vuejs.org/zh/guide/migration/index.html
- 源码：https://github.com/vuejs/vue-router-next
#### 支持 vue3

xcli 4.5.0 生成支持 vue3 的基础版本。     **"vue": "^3.0.0"**。
```js
  "dependencies": {
    "core-js": "^3.6.5", // 包含各种 polyfill
    "vue": "^3.0.0"
  },
  "devDependencies": {
    "@babel/preset-typescript": "^7.12.7",
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/compiler-sfc": "^3.0.0", // 单文件组件渲染器
    "babel-esslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^7.0.0-0",
    "fork-ts-checker-webpack-plugin": "^6.1.0",
    "typescript": "^4.1.3"
  },
```
#### 支持 TypeScript（TS、TSX）

类型编译与类型检查分离，大大提升编译速度。

- 使用 @babel/typescript + babel.config.js 负责编译。


- 使用 fork-ts-checker-webpack-plugin + typescript 包和 tsconfig.json 进行开发/生产环境的类型检查。

```js
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 9096,
    open: true,
  },
  configureWebpack: {
    entry: "./src/main.ts",
    // 只检查不编译
    plugins: [new ForkTsCheckerWebpackPlugin()],
  },
};

```

#### TypeScript 支持 vue 文件

```sh
ERROR in src/main.ts:2:17
TS2307: Cannot find module './App.vue' or its corresponding type declarations.
    1 | import { createApp } from 'vue'
  > 2 | import App from './App.vue'
      |                 ^^^^^^^^^^^
    3 | 
    4 | createApp(App).mount('#app')
    5 | 
```


新建 shims-vue.d.ts，放到 types 文件夹下：
```ts
declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

```



### UI 组件库引入

antd-design-vue 2.0

#### 配置文件自动读取

```json
{
  "SYSNAME": "{{SYSNAME}}",
  "VERSION": "{{VERSION}}",
  "development": {
    "API": "http://192.168.1.136:8088",
    "API_FILE_DIR": "/dgp-gis-server-web/"
  },
  "production": {
    "API": "http://192.168.1.136:8088",
    "API_FILE_DIR": "/dgp-gis-server-web/"
  }
}
```

这里的模版是如何被替换的，涉及到 xcli 生成模版时的处理。

主要逻辑：

```js
// 初始化配置文件
import initConfig from "./initAppConfig";

function renderPage() {
  createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
}

async function init() {
  await initConfig();
  renderPage();
}
init();
```



## 4. 小结

## 参考资料

- [从 0 开始手把手带你搭建一套规范的 Vue3.x 项目工程环境](https://juejin.cn/post/6951649464637636622#heading-18)
- 模版参考
  - xcli-ui
  - edms
  - 南宁项目
  - default 模版
  - vue-vben-admin-main
- [手摸手，带你优雅的使用 icon](https://juejin.cn/post/6844903517564436493#heading-10)
- [ TypeScript 牵手 Babel：一场美丽的婚姻](https://juejin.cn/post/6844903792865984520)
- 参考 vue3-admin 的开源库是如何组织的，可以放进去。
- [Vite 原理浅析](https://juejin.cn/post/6844904146915573773#heading-4) 整体思路解析。
- [备战2021：vite工程化实践，建议收藏](https://juejin.cn/post/6910014283707318279?utm_source=gold_browser_extension#heading-26) 
- [Vue3 丨从 5 个维度来讲 Vue3 变化](https://juejin.cn/post/6910009240053055496#heading-16)
- Vue 2 + TS 版本：https://gitee.com/annsion/vue-vben-admin#%E4%BD%BF%E7%94%A8%E5%88%B0%E7%9A%84%E6%8A%80%E6%9C%AF
- [为什么 Babel 要支持编译 TypeScript](https://juejin.cn/post/6844904031643664397)