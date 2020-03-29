# webpack

webpack 作为一个模块打包机，能做什么？
- 代码转换：TypeScript 编译成 JavaScript、SCSS、LESS 编译成 CSS
- 文件优化：压缩 JS、CSS、HTML 代码，压缩合并图片
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码使其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。

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

### 优化

## 原理

## Webpack 插件开发

## 最佳实践

## 参考资料

- [四大维度解锁Webpack3.0前端工程化](https://coding.imooc.com/class/chapter/171.html#Anchor) -- 由浅入深 webpack。
- [webpack 最简打包结果分析](https://segmentfault.com/a/1190000018205656) -- 清晰明了，说明 webapck 的打包文件流程。