# ES6 

## Promise 基础

Promise: 三个状态、两个过程、一个方式
- 三个状态：`pending`、`fulfilled`、`rejected`
- 两个过程（单向不可逆）
  - `pending` -> `fulfilled`
  - `pending` -> `rejected`
- 一个方法`then`：Promise 本质上只有一个方法，`catch` 和 `all`方法都是基于 then 方法实现的。

```js
// 构造 Promise 时候，内部函数立即执行
new Promise((resolve, reject) => {
  console.log('new Promise);
  resolve('success);
})
console.log('finish);

// then 中用到了 return，那么 return 的值会被 Promise.resolve() 包装
Promise.resolve(1) 
  .then(res => {
    console.log(res); // => 1
    return 2; // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res); // => 2
  })
```

## 类

## Class 的继承

### super 关键字

`super`既可以当作函数使用，也可以当作对象使用。

第一种情况，`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 `super` 函数

```js
class A {}
class B extends A {
  constructor() {
    super()
  }
}
```
注意，`super` 虽然代表了父类 A 的构造韩素好，但是返回的是子类 B 的实例，即`super`内部的 `this` 指的是 B 的实例，因此 `super()` 在这里相当于 `A.prototype.connstructor.call(this)`

## 模块

### 命名导出（Named exports）

就是每一个需要导出的数据类型都要有一个`name`，**统一引入一定要带有`{}`**，即便只有一个需要导出的数据类型。

#### export 直接放到声明前面就可以省略 `{}`

导出模块
```js
// lib.js
export const sqrt = Math.sqrt;
export function square(x) {
  return x * x;
}
export function diag(x) {
  return sqrt(square(x) + square(y))
}
```

导入模块
```js
// main.js
import { square, diag } from 'lib';				
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

#### export 放到最后

导出模块
```js
//------ lib.js ------
const sqrt = Math.sqrt;
function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}

export {sqrt, square, diag}
```

导入模块
```js
// main.js
import { square, diag } from 'lib';				
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

无论怎样导出，引入的时候都需要`{} `

### 导入

#### 常规导入

```js
import { square, diag } from 'a.js';	
import diag from 'b.js';	
```

### 默认导出（Default exports）

```js
// export.js
export default function foo() {}
```

注意：这里引入不用加花括号，因为只导出一个默认函数 `foo`
```js
// import.js
import foo from './export.js'
```

除了上面的引入方式外，导入模块的方式还有别名引入和命名空间引入。

#### 别名导入

1. 当从不同模块引入的变量名相同的时候

Before:
```js
import { speak } from './cow.js'
import { speak } from './goat.js'
```
After:
```js
import { speak as cowSpeak } from '.cow.js'
import { speak as goatSpeak } from 'goat.js'
```

或者是想从其他功能文件夹，引入到当前功能的文件下，改为更加语义的名称。

#### 命名空间导入

注意解决上面，当从每个模块需要引入的方法很多的时候，避免冗长、繁琐。
```js
import * as cow from "./cow.js"
import * as goat from "./goat.js"
```

### 变量的解构赋值

#### 交换变量的值

#### 从函数返回多个值