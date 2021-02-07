# 构建一个 TS + Vue3 项目基础框架解决方案

## 前言

为了紧跟上技术的发展，以及更好地帮助开发者维护软件，并提升协作的效率。xcli 新增一个 TS + Vue3 的项目基础框架，为后续新项目基于新技术的快速开展提供帮助。

## 一些需要提前考虑的问题

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

### 优化关于 ts 的编译问题：使用 typescript 还是 babel 编译

类型编译与类型检查分离，大大提升编译速度。

- 使用 @babel/typescript + babel.config.js 进行编译。

- 使用 fork-ts-checker-webpack-plugin + typescript 包和 tsconfig.json 进行开发/生产环境的类型检查。

## 需求分析：确定当前的基础模版功能

- [ ] vue3 + vue router 4 + vuex 全家桶
- [x] ts
- [ ] antd-design-vue 2.0（后续使用 quark 可以需要替换）
- [ ] 符合规范的组织结构
- [ ] 提供常用工具的配置
- [ ] 配置文件读取
- [ ] 自动加载全局组件&vuex modules
- [ ] eventBus 解决方案
- [ ] rem（自动处理响应式系统）
- [ ] svg 图标
- [ ] hjson
- [ ] ie 11
- [ ] bable 可选链
- [ ] gzip
- [ ] dart-sass
- [ ] jest
- [ ] 性能优化
  - [ ] TS 编译


## 设计实现：详细说明

### TS 支持 vue 文件

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

## 小结

## 参考资料

- xcli-ui
- edms
- 南宁项目
- default 模版
- vue-vben-admin-main

- 参考 vue3-admin 的开源库是如何组织的，可以放进去。
- [Vite 原理浅析](https://juejin.cn/post/6844904146915573773#heading-4) 整体思路解析。
- [备战2021：vite工程化实践，建议收藏](https://juejin.cn/post/6910014283707318279?utm_source=gold_browser_extension#heading-26) 
- [Vue3 丨从 5 个维度来讲 Vue3 变化](https://juejin.cn/post/6910009240053055496#heading-16)

- Vue 2 + TS 版本：https://gitee.com/annsion/vue-vben-admin#%E4%BD%BF%E7%94%A8%E5%88%B0%E7%9A%84%E6%8A%80%E6%9C%AF
- [为什么 Babel 要支持编译 TypeScript](https://juejin.cn/post/6844904031643664397)