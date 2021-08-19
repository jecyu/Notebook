# webpack5

mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev

## Tree Shaking

DEC（Elimination）

代码不会被执行，不可到达

代码执行的结果不会被用到

代码只会影响死变量（只写不读）

```js
if (false) {
  console.log('这段代码永远不会执行')
}
```

利用 ES6 模块的特点

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable 的

代码擦除：uglify 阶段删除无用代码

### 类处理

```js
// util.js
export default class Util {
  hello() {
    return "hello";
  }

  bye() {
    return "bye";
  }
}

//// index.js
import Util from './util'
let util = new Util()
let result1 = util.hello()
console.log(result1)
```

注意 webpack 对于类是整体进行标记的（标记为使用），而不是分别针对两个方法，因此最终打包的代码依然会包含 bye 方法。这表明 webpack tree shaking 只处理顶层内容，例如类和对象内部都不会再被分别处理。

这主要也是由于 JS 的动态语言特性所致。如果把 `bye()` 删除，考虑如下代码：

```js
// index.js
import Util from './util'
let util = new Util()
let result1 = util[Math.random() > 0.5 ? 'hello', 'bye']()
console.log(result1);
```

编译器并不能识别一个方法名字究竟是以直接调用的形式出现（util.hello()) 还是以字符串的形式（util['hello']） 或者其他更加离奇的方式。因此误删方法只会导致运行出错，得不偿失。

### 副作用

#### 模块引入带来的副作用

#### 方法调用带来的副作用

## 原理

#### 基本概念

- **Entry**：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象或输入。
- **Module**：模块，在 Webpack 里一切皆模块，一个模块对应一个文件。Webpack 会从配置的 Entry 开始，递归找出所有依赖的模块。
- **Chunk**：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- **Loader**：模块转换器，用于将模块的原内容按照需求转换成新内容。
- **Plugin**：扩展插件，在 Webpack 构建流程中的特定时机会广播对应的事件，插件可以监听这些事件的发生，在特定的时机做对应的事情。

### 工作原理概括

#### 流程概括

1. **初始化流程**：从配置文件和 `shell` 语句中读取与合并参数，使用参数实例化 `Compiler` 对象，加载所有配置的插件，执行对象的 `run` 方法开始编译
2. **编译构建流程**：根据配置确定 `entry` 文件，从入口文件出发，针对每个 `Module` 串行调用对应配置的` Loader` 去翻译文件内容，再找到该 `Module` 依赖的 `Module`，递归地进行编译处理，得到每个模块被翻译的内容和它们之间的依赖关系。
3. **输出流程**：根据入口和模块依赖关系，对编译后的 `Module` 组合成包含多个模块的 `Chunk`，再把 `Chunk` 转换成一个个文件，输出到文件系统。
4. 在以上过程，Webpakc 会在特定的时间点广播特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

#### 流程细节

##### 初始化阶段

| 事件名          | 解释 |
| --------------- | ---- |
| 初始化参数      |      |
| 实例化 Compiler |      |
|                 |      |



##### 编译阶段

##### 输出阶段

### 输出文件分析

### 编写 Loader

### 编写插件

一个最基础的 Plugin 的代码是这样的：

```js
class BasicPlugin {
  // 在构造函数中获取用户为该插件传入的配置
  constrctor(options) {
    
  }
  
  // Webpack 会调用 BasicPlugin 实例的 apply 方法为插件实例传入 compiler 对象
  apply(compiler) {
    compiler.plugin('compilation', function(compilation) {
    })
  }
}
module.exports = BasicPlugin
```



### 调试 Webpack

## 插件



## loader



## 参考资料

- [Webpack之treeShaking](https://mp.weixin.qq.com/s/Ue0kNOMQS7mH-2-9BhYk8Q) 很详细
- https://time.geekbang.org/course/detail/100028901-100679 视频
- 《深入浅出 Webpack》