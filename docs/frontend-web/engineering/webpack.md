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

## 参考资料

- [Webpack之treeShaking](https://mp.weixin.qq.com/s/Ue0kNOMQS7mH-2-9BhYk8Q) 很详细
- https://time.geekbang.org/course/detail/100028901-100679 视频