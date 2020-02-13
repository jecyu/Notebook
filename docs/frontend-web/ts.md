
# TypeScript

<!-- <TOC /> -->
[[toc]]

## 基础入门

### 基础类型

#### Any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。那么我们可以使用 any 类型来标记这些变量：

### 函数

#### 函数表达式

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

```ts
const mySum = function(x: number, y: number): number {
  return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边 `mySum`，是通过赋值操作进行类型推论（“按上下文归类”）而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```ts
const mySum: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
};
```

注意不要混淆了 TypeScript 的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

在 ES6 中，`=>` 叫做箭头函数，应用十分广泛。

#### 接口定义


下面的例子使用接口的形式来加持 ES6 的函数
```ts
interface Function {
  (x: number, y: number): number
}

const function: Function = (x: number, y: number) => x + y;
```

### 命名空间

所有的 .ts 里声明的文件，编译后的文件是暴露一个全局变量。

编译前
```ts
namespace utils.math {
  const sum = function(a: number, b: number) {
    // if (Object.prototype.toString.call(a) !== '[object Number]' || Object.prototype.toString.call(b) !== '[object Number]') {
    //   return null;
    // }
    return a + b;
  };
  const mul = (a: number, b: number): number => a * b;
  const sub = (a: number, b: number): number => a - b;
  const div = (a: number, b: number): number => a / b;
  
  module.exports =  {
    sum,
    mul,
    sub,
    div
  }
}
```

编译后
```ts
var utils;
(function (utils) {
    var math;
    (function (math) {
        var sum = function (a, b) {
            // if (Object.prototype.toString.call(a) !== '[object Number]' || Object.prototype.toString.call(b) !== '[object Number]') {
            //   return null;
            // }
            return a + b;
        };
        var mul = function (a, b) { return a * b; };
        var sub = function (a, b) { return a - b; };
        var div = function (a, b) { return a / b; };
        module.exports = {
            sum: sum,
            mul: mul,
            sub: sub,
            div: div
        };
    })(math = utils.math || (utils.math = {}));
})(utils || (utils = {}));

```

看js代码能发现, 在js中命名空间其实就是一个全局对象. 如果你开发的程序想要暴露一个全局变量就可以用`namespace`。命名空间对解决全局作用域里命名冲突很重要的，但是对于模块来说 却不是一个问题。模块具有其自己的作用域，并且只有导出的声明才会在模块外部可见。

### 模块

#### 模块里不要使用命名空间

当初次进入基于模块的开发模式时，可能总会控制不住要将到处包裹在一个命名空间里。模块具有自己的作用域，并且只有导出的声明才会在模块外部可见。记住这点，命名空间在使用模块时几乎没什么价值。

在组织方面，命名空间对于在全局作用域内对逻辑上相关的对象和类型进行分组是很便利的。例如，在 C# 里，你会从 `System.Collections` 里找到所有集合的类型。通过将类型有层次地组织在命名空间里，可以方便用户找到与使用那些类型。<u>然而，模块本身已经存在于文件系统之中，这是必须的。我们必须通过路径和文件名找到它们，这已经提供了一种逻辑上的组织形式。</u>我们可以创建 `/collections/generic` 文件夹，把相应模块放在里面。

命名空间对解决全局作用域里命名冲突来说是很重要的。比如，你可以有一个 `My.Application.Customer.AddForm` 和 `My.Application.Order.AddForm` -- 两个类型的名字相同，但命名空间不同。然而，这对于模块来说却不是一个问题。在一个模块里，没有理由两个对象拥有同一个名字。从模块的使用角度来说，使用者会挑出他们用来引用模块的名字，所以也没有理由发生重名的情况。

### 命名空间和模块

#### 使用命名空间

命名空间是位于**全局命名空间**下的一个普通的带有名字的 JavaScript 对象。这令命名空间十分容易使用。它们可以在多文件中同时使用，并通过 `--outFile` 结合在一起。命名空间是帮你组追 Web 应用不错的方式，你可以把所有依赖都放在 HTML 页面的 `<script>` 标签里。

但就像其他的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中。

#### 使用模块

像命名空间一样，模块可以包含代码和声明。<u>不同的是模块可以声明它的依赖。</u>

模块会把依赖添加到模块加载器上（例如 CommonJs/Require.js）。对于小型的 JS 应用来说可能没必要，但是对于大型应用，这一点点的花费会带来长久的模块化和可维护性的便利。模块也提供了更好的代码重用，更强的封闭性以及更好的使用工具进行优化。

对于 Node.js 应用来说，模式是默认并推荐的组织代码的方式。

从 ECMAScript 2015 开始，模块成为了语言内置的部分，应该会被所有正常的解释引擎所支持。因此，对于新项目来说推荐使用模块做为组织代码的方式。

### 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class` 声明全局类
- `declare enum` 声明全局枚举类型
- `declare namspace` 声明（含有子属性）的全局对象
- `interface` 和 `type` 声明全局类型
- `export default` ES6 默认导出
- `export =` commonjs 导出模块
- `export as namespace` UMD 库声明全局变量
- `declare global` 扩展全局变量
- `declare module` 扩展模块
- `/// <reference />` 三斜线指令

#### 什么是声明语句

#### 什么是声明文件

通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件：

```ts
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

```ts
// src/index.ts
jQuery('#foo');
```

声明文件必需以 `.d.ts` 为后缀。

一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuyer` 的类型定义了。

```bash
/path/to/project
|——src
|  |——index.ts
|  |__jQuery.d.ts
|__tsconfig.json
```

##### 第三方声明文件

#### 书写声明文件

##### npm 包

一般我们通过 `import foo from 'foo'` 导入一个 npm 包，这是符合 ES6 模块规范。

在我们尝试给一个 npm 包创建声明之前，需要先看看它的声明文件是否已经存在。一般来说，npm 包的声明文件可能存在于两个地方：

1. 与该 npm 包绑定在一起。判断依据是 `package.json` 中有 `types` 字段，或者有一个 `index.d.ts` 声明文件。这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，最好也将声明文件和 npm 包绑定在一起。
2. 发布到 `@types` 里。我们只需要尝试安装一下对应的 `@types` 包就知道是否存在该声明文件，安装命令是 `npm install @types/foo --save-dev`。这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 `@types` 里了。

假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 `import` 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：

1. 创建一个 `node_modules/@types/foo/index.d.ts` 文件，存放 `foo` 模块的声明文件。这种方式不需要额外的配置，但是 `node_modules` 目录步不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心北删除的风险，故不太建议用这种方案，一般只用作临时测试。
2. 创建一个 `types`或 `typings` 目录，专门用来管理自己写的声明文件，将 `foo` 的声明文件放到 `type/foo/index.d.ts` 中。这种方式需要配置下 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段。
   （这里为什么需要配置 `paths` 和 `baseUrl` 只不过可以让 `import xxx from 'xxx' 省略前缀`）

目录结构：

```bash
/path/to/project
|——src
|  |__index.ts
|——types
|  |——foo
|     |__jQuery.d.ts
|__tsconfig.json
```

`tsconfig.json` 内容

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {
      "*": ["types/*"]
    }
  }
}
```

### 模块解析

#### Classic

#### Node

##### TypeScript 如何解析模块

TypeScript 是模仿 Node.js 运行时的解析策略来在编译阶段定位模块定义文件。因此，TypeScript 在 Node 解析逻辑基础上增加了 TypeScript 源文件的扩展名 (.ts，.tsx 和 .d.ts) 。同时，TypeScript 在 `package.json` 里使用字段 `types` 来表示类型 `main` 的意义——编译器会使用它来找到要使用的 `main` 定义文件。

### 接口

接口可以作为对象的类型描述。下面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25
};
```

1. 接口是用来声明对象的区别？接口与抽象类的区别？
2. 修饰符 private 这些声明只是警告作用吗？编译后，还是可以使用的？相当于更清楚的编码？
3. static 修饰符是不是相当于类方法
   类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
4. 使用了接口的类与普通的类声明有什么区别？普通的 type 类声明也有类型声明？是否都需要实现接口来显示。
   普通的类需要看里面的代码，而实现接口的类，可以让使用者对提供的接口使用清晰。

有了接口声明，我们在使用该模块的时候可以清晰的看到它到底有哪些接口，方法的入参是什么，返回值是什么。同时也有代码的自动提示，提升开发效率，减少拼写错误导致的低级 Bug。

5. implement 与 extends 的区别？
   implement 是实现接口里声明的东西，而 extends 则是继承。
6. 范型与抽象类的区别？
7. 一句话描述装饰器。
   在 ES6 中增加了对类对象的相关定义和操作（比如 class 和 extends ），这就使得我们在多个不同类之间共享或者扩展一些方法或者行为的时候，变得并不是那么优雅。这个时候，我们就需要一种更优雅的方法来帮助我们完成这些事情。
   类似 mixin 的功能，一个对象可以使用其他对象的方法。
8. assigned

### 接口的定义

### 泛型

软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

在像 C#和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

### 装饰器

```ts
//github.com/kaorun343/vue-property-decorator/blob/master/src/vue-property-decorator.ts
https: /**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export function Prop(options: PropOptions | Constructor[] | Constructor = {}) {
  return (target: Vue, key: string) => {
    applyMetadata(options, target, key);
    createDecorator((componentOptions, k) => {
      (componentOptions.props || ((componentOptions.props = {}) as any))[
        k
      ] = options;
    })(target, key);
  };
}
```

```ts
// vue-property-decorator.d.ts 声明文件
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export declare function Prop(
  options?: PropOptions | Constructor[] | Constructor
): (target: Vue, key: string) => void;
```

## 进阶活用

## 项目实战

见文章：xxx

### 在 Vue 里使用 TS

在 Vue 里面使用 TS 有很多种方式。一种是通过 import 默认引入 Vue 的声明文件。一种是使用它的 class 风格。还有一种是最常见的，通过 Vue 的插件 Vetur 自动匹配它的声明文件。

<!-- 在我写过的 typescript 的项目中, Vue 使用typescript项目是最扯淡了.

类型优势一个没用上, 问题到时引出一大堆

ng 不知道.  至少 react 和 typescript 的结合的体验上不是一个等级的.

不吹不黑. 真实感受.

真心觉得 vue 不适合 typescript

vue 更适合小项目用.   配合模板的优势.

如果要和ts 很好的结合  要么ts 有更牛的 types系统
要么vue api 大改，Vue 3.0 -->

### 在 React 里使用 TS

### 常见问题

1. import \* as React from 'react' 和 import React from 'react' 有什么区别

第一种写法是将所有用 export 导出的成员赋值给 React ，导入后用 React.xxx 访问
第二种写法仅是将默认导出（export default）的内容赋值给 React

3. 解决 import \* as xxx from 'xxx' 这种奇怪的引入方式

配置 tsconfig.json

```json
{
  // 允许 默认导入 没有设置默认导出（export default xxx）的模块
  // 可以以 import xxx from 'xxx' 的形式来引入模块
  "allowSyntheticDefaultImports": true
}
```

```ts
// before
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// after
import React from 'react';
import ReactDOM from 'react-dom';
```

## 底层原理

## 参考资料

- [TypeScript 中文网](https://www.tslang.cn/docs/handbook/module-resolution.html)
- [由 shims-vue.d.ts 引发的思考](https://juejin.im/post/5d22b12251882509057e11e9#heading-2)
- [tsconfig.json 入门指南](https://juejin.im/post/5e34d967f265da3dfa49bdc3#heading-22)
- [TS 常见问题整理（60 多个，持续更新 ing）](https://juejin.im/post/5e33fcd06fb9a02fc767c427?utm_source=gold_browser_extension#heading-44)
- [TS in JS 实践指北](https://juejin.im/post/5e0176b4f265da33a159d9e0#heading-16)
