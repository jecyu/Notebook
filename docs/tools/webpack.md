# webpack

## 构建工具

前端的发展中，不断产生各种可以**提高开发效率的新思想和框架被发明**。但是这些东西都有一个共同点：**源代码无法直接运行，必须通过转换后才可以正常运行。**

**构建就是做这件事情，把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码**，包括如下内容。

- **代码转换**：将 TypeScript 编译成 JavaScript、将 SCSS 编译成 CSS 等。
- **文件优化**：压缩 JavaScript、CSS、HTML 优化，压缩合并图片等。
- **代码分割**：提取多个页面的公共代码，提取首屏不需要执行部分的代码让其异步加载。
- **模块合并**：在采用模块化的项目里会有多个模块和文件，需要通过构建功能将模块分类合并成一个文件。
- **自动刷新**：监听本地源代码的变化，自动重新构建、刷新浏览器。
- **代码检验**：在代码被提交到仓库前需要检验代码是否符合规范，以及单元测试是否通过。
- **自动发布**：更新代码后，自动构建线上发布代码并传输给发布系统。

构建其实是**工程化、自动化思想**在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。

历史上先后出现了一系列构建工具，它们各有优缺点。由于前端工程师很熟悉 JavaScript，Node.js 又可以胜任所有构建需求，**所以大多数构建工具都是用 Node.js 开发的。**<u>这就不难理解很多构建工具的配置文件 js 里充满了 node.js 的写法了。</u>

### Npm Script

Npm Script 是一个任务执行者。<u>>Npm 是在安装 `Node.js` 时附带的包管理器，Npm Script 则是 Npm 内置的一个功能，</u>允许在 package.json 文件里面使用 scripts 字段定义任务：
```json
{
  "scripts": {
    "dev": "node dev.js",
    "pub": "node build.js"
  }
}
```

里面的 **scripts 字段是一个对象，每个属性对应一段 Shell 脚本**，以上代码定义了两个任务 dev 和 pub。 其底层实现原理是通过调用 Shell 去运行脚本命令，例如执行 npm run pub 命令等同于执行命令 node build.js。

Npm Script的优点是内置，无须安装其他依赖。其缺点是功能太简单，虽然提供了 pre 和 post 两个钩子，但不能方便地管理多个任务之间的依赖。

### Grunt

Grunt 和 Npm Script 类似，也是一个任务执行者。Grunt 有大量现成的插件封装了常见的任务，也能管理任务之间的依赖关系，自动化执行依赖的任务，每个任务的具体执行代码和依赖关系写在配置文件 Gruntfile.js 里

### Gulp

Gulp 是一个**基于流的自动化构建工具**。 除了可以管理和执行任务，还支持监听文件、读写文件。Gulp 被设计得非常简单，只通过下面5个方法就可以胜任几乎所有构建场景：

### Fis3

Fis3 是一个来自百度的优秀国产构建工具。相对于 Grunt、Gulp 这些只提供基本功能的工具，Fis3 集成了 Web 开发中的常用构建功能

### Webapck

Webpack 是一个打包模块化 `JavaScript` 的工具，在 Webpack 里一切文件皆模块，通过 `Loader` 转换文件，通过 `Plugin` 注入钩子，最后输出由**多个模块组合成的文件**。

一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，**这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。** 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。

Webpack的缺点是只能用于采用**模块化开发**的项目。

### Rollup

Rollup 是一个和 Webpack 很类似但专注于 ES6 的模块打包工具。 

Rollup 在用于打包 JavaScript 库时比 Webpack 更加有优势，因为其打包出来的代码更小更快。 但功能不够完善，很多场景都找不到现成的解决方案。

之前一直以为 rollup 可以打包 umd 模块，但是 webpack 也可以配置打包的。

### 为什么选择 Webpack

上面介绍的构建工具是按照它们诞生的时间排序的，它们是时代的产物，侧面反映出 Web 开发的发展趋势如下：

1. 在 Npm Script 和 Grunt 时代，Web 开发要做的事情变多，流程复杂，**自动化思想**被引入，用于简化流程；
2. 在 Gulp 时代开始出现一些新语言用于提高开发效率，流式处理思想的出现是为**了简化文件转换的流程**，例如将 ES6 转换成 ES5。
3. 在 Webpack 时代由于**单页应用**的流行，一个网页的功能和实现代码变得庞大，**Web 开发向模块化改进**。

这些构建工具都有各自的定位和专注点，它们之间既可以单独地完成任务，也可以相互搭配起来弥补各自的不足。 在了解这些常见的构建工具后，你需要根据自己的需求去判断应该如何选择和搭配它们才能更好地完成自己的需求。

经过多年的发展， Webpack 已经成为构建工具中的首选，这是有原因的：

- 大多数团队在开发新项目时会采用紧跟时代的技术，这些技术几乎都会采用“**模块化+新语言+新框架**”，Webpack 可以为这些新项目提供**一站式**的解决方案；
- Webpack 有良好的生态链和维护团队，能提供良好的开发体验和保证质量；
- Webpack 被全世界的大量 Web 开发者使用和验证，能找到各个层面所需的教程和经验分享。
下面开始跨入 Webpack 的大门吧！

![](../.vuepress/public/images/webpack-learn-route.jpeg)

## 基础

使用 webpack4，因为抽离了 webpack-cli，所以至少需要安装 webpack 和 webpack cli。

webpack 支持 `es6`，`CommonJS`，`AMD`。

### 打包 JS

如何运行 webpack？

#### 第一步：创建配置文件

首先需要创建一个 webpack.config.js  的文件，添加基础配置

```js
// webpack.config.js
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js', // 以当前目录为根目录，入口文件
  output: { // 输出文件
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // 引入loader 和 plugin 处理相关文件
  module: {
    rules: [
      {
        test: 正则表达式,
        use: [对应的 loader]
      }
    ]
  },
  plugin: {}
}
```

`module.exports` 就是导出一个模块包，符合 CommonJS 规范

配置说明：
- `entry`：代表入口文件，webpack 回你找到该文件进行解析
- `output`：代表输出文件配置
- `module`：打包规则，不同后缀的文件用不同的包处理
- `plugin`：实现一些功能需要用到的插件

#### 第二步：配置 package.json 

安装 webpack 后，找到 package.json 文件，增加 

```json
"scripts":{ "build": "webpack ./webpack.config.js"}
```

webpack 4版本以上 直接运行 `npx webpack` 命令就能打包文件。
命令行敲 `yarn build` 就能打包初我们需要的 bundle.js 文件了。

#### 检验 webpack 规范支持

`webpack` 支持 `es6`，`CommonJS`，`AMD`。

通过不同的模块引入方式进行测试。

### 编译 ES6

### 多页面解决方案——提取公共代码

### Webpack 环境配置

## 进阶

### 配置


### 分析打包结果

设置 devtool 属性改为 `source-map`。
源文件中的所有 `import` 和 `export` 都会转换成对应的辅助函数。

```js
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PackDataStructuresAlogrithms", [], factory);
	else if(typeof exports === 'object')
		exports["PackDataStructuresAlogrithms"] = factory();
	else
		root["PackDataStructuresAlogrithms"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/data-structures/stack-array.js":
/*!***********************************************!*\
  !*** ./src/js/data-structures/stack-array.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StackArray; });
// LIFO：只能用 push, pop 方法添加和删除栈中元素，满足 LIFO 原则
class StackArray {
  constructor() {
    this.items = [];
  }
  /**
   * @description 向栈添加元素，该方法只添加元素到栈顶，也就是栈的末尾。
   * @param {*} element 
   * @memberof Stack
   */


  push(element) {
    this.items.push(element);
  }
  /**
   * @description 从栈移除元素
   * @returns 移出最后添加进去的元素
   * @memberof Stack
   */


  pop() {
    return this.items.pop();
  }
  /**
   * @description 查看栈顶元素
   * @returns 返回栈顶的元素
   * @memberof Stack
   */


  peek() {
    return this.items[this.items.length - 1];
  }
  /**
   * @description 检查栈是否为空
   * @returns
   * @memberof Stack
   */


  isEmpty() {
    return this.items.length === 0;
  }
  /**
   * @description 返回栈的长度
   * @returns
   * @memberof Stack
   */


  size() {
    return this.items.length;
  }
  /**
   * @description 清空栈元素
   * @memberof Stack
   */


  clear() {
    this.items = [];
  }

}

/***/ }),

/***/ "./src/js/data-structures/stack.js":
/*!*****************************************!*\
  !*** ./src/js/data-structures/stack.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stack; });
/**
 * @description 创建一个基于 JavaScript 对象的 Stack 类
 * 使用 JavaScript 对象来存储所有的栈元素，保证它们的顺序并且遵循 LIFO 原则。
 * @class Stack
 */
class Stack {
  constructor() {
    this.count = 0; // 记录栈的大小，以及帮助我们从数据结构中添加和删除元素。保证顺序

    this.items = {};
  }
  /**
   * @description 向栈中插入元素
   * @param {*} element
   * @memberof Stack
   */


  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  /**
   * @description 从栈中弹出元素
   * @returns 移出最后添加进去的元素
   * @memberof Stack
   */


  pop() {
    if (this.isEmpty()) {
      // {1}检验栈是否空
      return undefined; // 如果为空，则返回 undefined
    }

    this.count--; // 如果栈不为空的话，我们会讲 count 属性减1

    const result = this.items[this.count]; // 保存栈顶的

    delete this.items[this.count]; // 删除该属性

    return result;
  }
  /**
   * @description 返回栈的长度
   * @returns
   * @memberof Stack
   */


  size() {
    return this.count;
  }
  /**
   * @description 检查栈是否为空
   * @returns
   * @memberof Stack
   */


  isEmpty() {
    return this.count === 0;
  }
  /**
  * @description 查看栈顶元素
  * @returns 返回栈顶的元素
  * @memberof Stack
  */


  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count - 1];
  }
  /**
   * @description 清空栈元素
   * @memberof Stack
   */


  clear() {
    this.items = {};
    this.count = 0; // 或者 LIFO 原则
    // while (!this.isEmpty()) { this.pop(); }
  }
  /**
   * @description 打印栈的内容
   * @returns
   * @memberof Stack
   */


  toString() {
    if (this.isEmpty()) {
      return ''; // 如果栈是空的，我们只需返回一个空字符串
    }

    let objString = `${this.items[0]}`; // 如果不是空的，就用它底部的第一个元素作为字符串的初始值

    for (let i = 1; i < this.count; i++) {
      // 迭代整个栈的键
      objString = `${objString},${this.items[i]}`;
    }

    return objString;
  }

}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: StackArray, Stack, decimalToBinary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_structures_stack_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-structures/stack-array */ "./src/js/data-structures/stack-array.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackArray", function() { return _data_structures_stack_array__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _data_structures_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-structures/stack */ "./src/js/data-structures/stack.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return _data_structures_stack__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _others_base_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./others/base-converter */ "./src/js/others/base-converter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decimalToBinary", function() { return _others_base_converter__WEBPACK_IMPORTED_MODULE_2__["decimalToBinary"]; });

// stack





/***/ }),

/***/ "./src/js/others/base-converter.js":
/*!*****************************************!*\
  !*** ./src/js/others/base-converter.js ***!
  \*****************************************/
/*! exports provided: decimalToBinary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decimalToBinary", function() { return decimalToBinary; });
/* harmony import */ var _data_structures_stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-structures/stack */ "./src/js/data-structures/stack.js");

function decimalToBinary(decNumber) {
  const remStack = new _data_structures_stack__WEBPACK_IMPORTED_MODULE_0__["default"]();
  let number = decNumber; // 十进制数字

  let rem; // 余数

  let binaryString = '';

  while (number > 0) {
    // 当结果不为0，获得一个余数
    rem = Math.floor(number % 2);
    remStack.push(rem); // 入栈

    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

/***/ })

/******/ });
});
//# sourceMappingURL=PackDataStructuresAlogrithms.min.js.map
```

- import 对应 `__webpack_require`
- export 对应 `__webpack_exports__['defalut']` 直接赋值和 `__webpack_require__.d`。

整理一下整个流程：
1. 定义 `__webpack_require__`及其辅助函数。
2. 使用 `__webpack_require__`引入入口模块。
3. `__webpack_require__`函数载入模块，将模块放到模块缓存。
4. 调用模块
   1. 同样使用 `__webpack_require__`读取依赖（回到第3步）。
   2. 运行模块内部功能。
   3. 使用`__webpack_exports__['default']` 直接赋值和 `__webpack_require__.d`输出。
5. 运行结束。

### 优化打包速度

### 长缓存优化

## 实战

### 使用 TypeScript 语言

### Webpack 插件开发

## 原理

### 输出文件分析

#### webpack 是如何实现各种模块化方案的？

通过打包工具快速实现各种模块化方案，前端就可以实现整个模块的封装，模块里包括封装数据、封装实现、封装类型、封装变化。

分析 boundle 文件。

##### commonjs

实现效果：

```js
// 导出
module.exports = moduleA.someFunc;
// 导入
const moduleA = require("./moduleA");
```

实现原理：

webpack 实现效果：

单文件 node.js 进行测试。

##### amd

实现效果：

```js
// 定义一个模块
define("module", ["dep"], function(dep) {  // dep 依赖的模块
  return exports;
});

// 导入和使用
require(['module'], function(module) {})
```

##### es6

实现效果：

```js
// 导出
export function hello() {};
export default {}

// 导入
import { readFile } from "fs";
import React from "react";
```

##### umd

输出的文件，同时支持多种模块化方案引入。

#### 整个文件模块封装分析

## 最佳实践

## 参考资料

- [四大维度解锁Webpack3.0前端工程化](https://coding.imooc.com/class/chapter/171.html#Anchor) -- 由浅入深 webpack。
- [webpack 最简打包结果分析](https://segmentfault.com/a/1190000018205656) -- 清晰明了，说明 webapck 的打包文件流程。
- [全面的Webpack教程《深入浅出Webpack》电子书 http://webpack.wuhaolin.cn](https://github.com/gwuhaolin/dive-into-webpack/)