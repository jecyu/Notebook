# ES6 

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

## 导入

### 常规导入

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