## 前言

TypeScript 在这两年间一直很火，看看下面的语言趋势图。

![ts 路线图]()

它是ES6 的超集，为什么它这么火呢，因为提供了类型系统，如下面这么一个函数：
```ts
const mySum = function(x: number, y: number): number {
  return x + y;
};
```

这样的好处是，很多有关于类型的 bug 都可以在编译时发现并解决。TypeScript 工作原理是通过 typescript 命令行工具，把 TypeScript 代码编译成 javaScript，从而支持在浏览器运行。听过 TypeScript 很久了，让笔者下决心上车的是这几个月发现很多 github 上的仓库都用了 ts 重构，这些想看下源码都很困难。还有就是尤大大对 vue 3.0 也采用了 ts 全面重构，还在观望的 vue 小伙伴赶紧上车了。

## TypeScript 前置知识

### 编译器

头脑风暴 webpack

### 装饰器

## 项目实战

下面两个都是基于 vueCli3 脚手架下进行处理的。

### 新项目打造 TS

使用 vuecli3 命令后工具打造

### 旧项目引入 TS

#### 项目说明

下面以一个简单的 vue 项目（小伙伴可以结合项目文件跑一下会更容易理解 https://github.com/Jecyu/daily）展开讲解，该项目的目录如下：

#### 开始使用 ts

安装 `yarn add typescript —dev`，这个是用来编译 ts 代码为 js 代码，可以在项目根目录下添加更详细的配置 `tsconfig.json`。

配置完成后，这个时候把项目的 .js 文件改成 .ts 文件即可以正常编译，如把 `main.js` 改为 `main.ts` 文件：

```ts
import Vue from "vue";
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h: any) => h(App)
}).$mount("#app");

```

你会发现在 vue 项目中的 ts 环境下，进行 `import Vue from 'vue'` 时，vscode 编辑器 ts 是识别不 Vue 这个类型的，因此还需要在项目添加 `typing` 文件夹添加 `.d.ts` 关于 vue 的类型声明文件才可以，包括 `shims-tsx.d.ts` 和 `shims-vue.d.ts`，`shims-tsx.d.ts`用于支持 jsx 写法。

```ts
// shims-vue.d.ts
// 主要为项目内所有的 vue 文件做模块声明
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

```

#### 处理 .vue 文件

我们知道一个 `.vue` 组件文件，通常包括三部分：`template`、`script`和 `style` 部分，`.vue` 支持 ts 文件只需要在 script 标签上添加属性 `lang="ts"`：

```html
<script lang="ts">
</script>
```

这个时候还需要另外安装两个 npm 包把 .vue 逻辑代码改成 class 类风格形式来支持 ts 的编译。

```bash
yarn add vue-class-component vue-property-decorator —dev
``` 

前者支持类风格形式，后者则是针对 vue 的 `prop`、`watch` 等我们习惯的声明风格添加 装饰器模式支持。（由于之前对装饰器不太理解，还特地去学习了这个设计模式，具体可以看看笔者写的文章总结《JS 实现装饰器模式》以及 [TypeScript 的装饰器篇章](https://www.tslang.cn/docs/handbook/decorators.html)）

#### 开始改写代码

安装上面依赖后，我们可以对原来的文件进行改写了，下面以 `App.vue` 为例：

Before 改动前：
```html
<script>
import index from "./components/index.vue";

export default {
  name: "app",
  components: {
    index
  }
};
</script>
```

After 改动后，这里注意 `import` vue 文件时不能省略 `.vue·`，否则 ts 会找不到。

```html
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import index from "./views/index.vue"; 

@Component({
  name: "app",
  components: {
    index
  }
})
export default class App extends Vue {}
</script>
```

#### 代码检查模块

`.vue ` 按照上面的形式进行更改后，基本没问题了。接下来便是代码检查模块，ts 提供 `tslint` 文件进行代码规范检查，这样会导致一个问题，tslint 并不会提示类似使用 `let` 而不使用 `var` 这样的提示，而 项目中的 eslint 设置不再起作用了。

好在 tslint 这个东西由于性能上的原因被官方放弃维护了。官方转而提供` @typescript-eslint/parser @typescript-eslint/eslint-plugin ` 这两个包来进行处理，这样我们只需要安装这两个包：

```bash
yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

然后在已有的 eslint 配置文件基础上添加 ts 的支持即可，并不会失去 eslint 的好处，

#### 自动化测试

针对 Jest 测试，具体可以看这个前端自动化测试的笔记 https://jecyu.github.io/Fe-Auto-Testing/practice/jest.html#mock-%E4%BD%BF%E7%94%A8

###  如何优雅的使用ESLint和Prettier

### axois 请求响应问题

### 自定义指令、Mixins

## 更进一步

### 路由

### 状态管理 vuex

### 自动化测试

## 小结

使用 ts 编写代码体验还是不错的，如一些小错误、类型的自动提示等，坏处就是需要写多点代码标注类型等（ts 跟 C# 很类似）但是对后期的维护是大大有益。针对 vue 项目的话，使用类风格编写代码的体验还是可以接受，目前使用装饰器如@Props 没有 vue 那些 props、computed 的体验好。vue 3.0  是采用 ts 实现的，应该会比 vue 2.0 的开发体验要好吧。

对于新的项目的话，可以考虑使用 ts 开发，期待 vue 3.0 的到来。

## 参考资料

- [Typescript+Vue大型后台管理系统实战](https://juejin.im/post/5e1bb2cb518825267f69964c#heading-14)