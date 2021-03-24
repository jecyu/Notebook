# TypeScript 项目总结（持续更新）

[[toc]]

## 0. 前言

TypeScript 在这两年间一直很火，看看下面的语言趋势图。

![ts 路线图]()

它是 ES6 的超集，为什么它这么火呢，因为提供了类型系统，如下面这么一个函数：

```ts
const mySum = function(x: number, y: number): number {
  return x + y;
};
```

这样的好处是，很多有关于类型的 bug 都可以在编译时发现并解决。TypeScript 工作原理是通过 typescript 命令行工具，把 TypeScript 代码编译成 javaScript，从而支持在浏览器运行。听过 TypeScript 很久了，让笔者下决心上车的是这几个月发现很多 github 上的仓库都用了 ts 重构，这些想看下源码都很困难。还有就是尤大大对 vue 3.0 也采用了 ts 全面重构，还在观望的 vue 小伙伴赶紧上车了。

## 开发环境

### 安装 TypeScript

```sh
npm intall -g typescript
```

以下命令会在全局环境下安装 `tsc` 命令，安装完成之后，我们就可以在任何地方执行 `tsc` 命令了。

编译一个 `TypeScript` 文件很简单：

```bash
tsc hello.ts
```

我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时，以 `.tsx` 为后缀。

### vscode 编译器自动检查语法

打开 vscode -> setting -> 输入 check 即可看到 TypeScript 的检查配置，这样在你编辑代码的时候即可实时看到提示。

### ts 编译配置

TS 文件指拓展名为 `.ts`、`.tsx` 或 `.d.ts` 的文件。如果开启了 `allowJs` 选项，那 `.js` 和 `.jsx` 文件也属于 TS 文件。

编译的 js，后续 babel 进行处理。

```json
{
  "compilerOptions": {
    "target": "esnext", // 编译的js，后续 babel 进行处理？
    "module": "esnext", // 生成的模块
    "strict": true, // 严格模式
    "jsx": "preserve", // 支持 tsx 写法
    // 是否引入npm包tslib中的辅助函数,__extends等
    "importHelpers": true,
    "moduleResolution": "node", // 模块的解析规则
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    // 把 ts 文件编译成 js 文件的时候，同时生成对应的 map 文件
    "sourceMap": true,
    "baseUrl": ".", // 指定基础目录
    // typeRoots 用来指定默认的类型声明文件查找路径，默认为 node_modules/@types 。针对 npm
    // 如果不希望自动引入 typeRoots 指定路径下的所有声明模块，那可以使用 types 指定自动引入哪些模块。
    // types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来，只对通过 npm 安装的声明模块有效
    "types": ["webpack-env", "jest"],
    // 是相对于 “baseUrl” 进行解析
    "paths": {
      "@/*": ["src/*"]
    },
    // 添加需要的解析的语法，否则TS会检测出错
    // 编译时引入的 ES 功能库，对 babel 的按环境引入则需要提前锁定一组特定的 JavaScript 功能
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "src/icons/svg/index.js"
  ],
  "exclude": ["node_modules"]
}
```

指定待编译文件有两种方式：

- 使用 files 属性
- 使用 include 和 exclude 属性
  开发者可以按照自己的喜好使用其中任意一种。但它们不是互斥的，在某些情况下两者搭配起来使用效果更佳。

虽然 allowJS 没开启，但是只要 include 进来，一样会进行编译。

## 1. 基础入门

### 一、基本类型和扩展类型

- Boolean
- Number
- String
- Array
- Tuple
- Enum
- Any
- Void
- Null & Undefined
- Never
- Object

很多 TypeScript 的原始类型比如 boolean、number、string等等，在JavaScript中都有类似的关键字 Boolean、Number、String，后者是 JavaScript 的构造函数，比如我们用 Number 用于数字类型转化或者构造 Number 对象用的，而 TypeScript 中的 number 类型仅仅是表示类型，两者完全不同。

#### 1. 基本类型合集

```ts
// 数字，二、八、十六进制都支持
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;

// 字符串，单双引都行
let name: string = "bob";
let sentence: string = `Hello, my name is ${name}.`;

// 数组，第二种方式是使用数组泛型，Array<元素类型>：
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

let u: undefined = undefined;
let n: null = null;
```

ts 类型会区分大写与小写，因为类型 boolean（原始类型） 与 Boolean（引用类型），比如。在其他强类型语言的提醒呢有什么不同？

```ts
let isBool3: boolean = new Boolean(1); // 这里会编译报错，因为 new Boolean(1) 是一个 bool 对象

let isBool3: boolean = !!1; // 正确
```

#### 2. 特殊类型

##### （1）元组 Tuple

想象 元组 作为有组织的数组，你需要以正确的顺序预定义数据类型。

```ts
const messyArray = [" something", 2, true, undefined, null];
const tuple: [number, string, string] = [24, "Indrek", "Lasn"];
```

如果不遵循 为元组 预设排序的索引规则，那么 Typescript 会警告。

##### （2）枚举 enum

`enum` 类型是对 JavaScript 标准数据类型的一个补充。 像 C# 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```ts
// 默认情况从0开始为元素编号，也可手动为1开始
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;

let colorName: string = Color[2];
console.log(colorName); // 输出'Green'因为上面代码里它的值是2
```

另一个很好的例子是使用枚举来存储应用程序状态。

```ts
enum AppStates {
  hasErrors,
  isFetching
  isUserLoggedIn,
  doesUserHaveProfileImage
}
```

##### （3）Void

在 Typescript 中，你必须在函数中定义返回类型。像这样：

```ts
function sayMyname(name: string): string {
  return name;
}
console.log(sayMyName("Jecyu"));
s;
```

若没有返回值时，我们可以将其返回值定义为 `void`。

##### (4) Any

就是什么类型都行，当你无法确认在处理什么类型时可以用这个。

但要慎重使用，用多了就失去使用 Ts 的意义。

```ts
let person: any = "前端劝退师"
person = 25
person = true
复制代码
主要应用场景有：
```

主要应用场景有：

- 接入第三方库
- Ts 新手前期都用

##### （5）Never

用很粗浅的话来描述就是："Never 是你永远得不到的爸爸。"通用用于处理错误。

具体的行为是：

- throw new Error(message)
- return error("Something failed")
- while (true) {} // 存在无法达到的终点

```ts
const error = (message: string): never => {
  // 不会发生返回，因为抛出了错误
  throw new Error(message);
};
```

#### 3. 类型断言

简略的定义是：可以用来手动指定一个值的类型。
有两种写法，尖括号和 `as`:

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

使用例子有：

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

```ts
function getLength(something: string | number): number {
  return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

如果你访问长度将会报错，而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，此时需要断言才不会报错：

```ts
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
```

##### 解决 TS 类型报错的几个方法

1. 类型断言
   类型断言可以明确的告诉 Ts 值的详细类型，即使在某些情景下与 Ts 推断的类型不一致，但我们很明确值的类型时，可以使用类型断言：
   语法： ① <类型>值
   ② 值 as 类型 推荐这种，因为<>容易与泛型,react 起冲突
2. 类型守卫 typeof in instanceof 字面量类型保护
   ① typeof 用于判断 number、string、boolean 和 symbol 四种类型
   ② instanceof 用于判断一个实例是否属于某个类
   ③ in 用于判断一个属性/方法是否属于某个对象
   ④ 字面量类型保护

```ts
private padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    console.log(padding + 3);
  }
}
```

```ts
  class Man {
    handsome = 'handsome';
    type: 'man';
  }
  class Women {
    beautiful = 'beautiful';
    type: 'woman';
  }
  private Human(arg: Man | Women) {
  // instanceof
    if (arg instanceof Man) {
      console.log(arg.handsome);
    }
      // 字面量保护
    if(arg.type === 'man') {
      console.log(arg.handsome);
    }
  }
```

3. 双重断言
   因为有时候使用 as 也会报错，因为只有当 S 类型是 T 类型的子集或者 T 类型是 S 类型子集的时候，S 才能被断言成 T，所以使用双重断言解决报错

```ts
  private handler(event: Event) {
    const element = (event as any) as HTMLElement;
  }
```

### 二、泛型：Generics

软件工程的一个主要部分就是构建组件，构建的组件不仅需要具有明确的定义和统一的接口，同时也需要组件可复用。支持现有的数据类型和将来添加的数据类型的组件为大型软件系统的开发过程提供很好的灵活性。

在 `C#` 和 `Java` 中，可以使用"泛型"来创建可复用的组件，并且组件可支持多种数据类型。这样便可以让用户根据自己的数据类型来使用组件。

比如数组队列，在强类型中，显然` Arrary<T>` 比 `Array[int] `适应性更强。

#### 1. 泛型方法

在 TypeScript 里，声明泛型方法有以下两种方式：

```ts
function gen_func1<T>(arg: T): T {
  return arg;
}
// 或者
let gen_func2: <T>(arg: T) => T = function(arg) {
  return arg;
};
```

调用方式也有两种：

```ts
gen_func1<string>("Hello world");
gen_func2("Hello world");
// 第二种调用方式可省略类型参数，因为编译器会根据传入参数来自动识别对应的类型。
```

#### 2. 泛型与 Any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。那么我们可以使用 any 类型来标记这些变量。

Ts 的特殊类型 Any 在具体使用时，可以代替任意类型，咋一看两者好像没啥区别，其实不然：

```ts
// 方法一：带有any参数的方法
function any_func(arg: any): any {
  console.log(arg.length);
  return arg;
}

// 方法二：Array泛型方法
function array_func<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}
```

- 方法一，打印了 `arg` 参数的 `length` 属性。因为 `any` 可以代替任意类型，所以该方法在传入参数不是数组或者带有 `length` 属性对象时，会抛出异常。
- 方法二，定义了参数类型是 `Array` 的泛型类型，肯定会有 `length` 属性，所以不会抛出异常。

#### 3. 泛型类型

泛型接口：

```ts
interface Generics_interface<T> {
  (arg: T): T;
}

function func_demo<T>(arg: T): T {
  return arg;
}

let func1: Generics_interface<number> = func_demo;
func1(123); // 正确类型的实际参数
func1("123"); // 错误类型的实际参数
```

### 三、自定义类型 Interface vs type

Interface，国内翻译成接口。

Type alias，类型别名。

#### 1.相同点

#### 都可以用来描述一个对象或函数

```ts
interface User {
  name: string
  age: number
}

type User = {
  name: string
  age: number
};

interface SetUser {
  (name: string, age: number): void;
}
type SetUser = (name: string, age: number): void;
```

**赋值的时候，变量的属性多一个少一个都不行，变量的属性必须和接口的属性保持一致（前提对接口属性没做处理，可选）。 **

##### 都允许拓展（extends）：

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

**interface extends interface**

```ts
interface Name {
  name: string;
}
interface User extends Name {
  age: number;
}
```

**type extends type**

```ts
type Name = {
  name: string;
};
type User = Name & { age: number };
```

interface extends type

```ts
type Name = {
  name: string;
};
interface User extends Name {
  age: number;
}
```

**type extends interface**

```ts
interface Name {
  name: string;
}
type User = Name & {
  age: number;
};
```

#### 2.不同点

type 可以而 interface 不行

type 可以声明基本类型别名，联合类型，元组等类型

```ts
// 基本类型别名
type Name = string;

// 联合类型
interface Dog {
  wong();
}
interface Cat {
  miao();
}

type Pet = Dog | Cat;

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet];
```

type 语句中还可以使用 `typeof` 获取实例的 类型进行赋值

```ts
// 当你想获取一个变量的类型时，使用 `typeof`
let div = document.createElement("div");
type B = typeof div;
```

### 四、实现与继承：implements vs extends

`extends` 很明显就是 ES6 里面的类继承，那么 `implement` 又是做什么的呢？它和 `extends` 有什么不同？

`implement`，实现。与 C#或 Java 里接口的基本作用一样，`TypeScript` 也能够用它来明确的强制一个类去符合某种契约

implement 基本用法：

```ts
interface IDeveloper {
  name: string;
  age?: number;
}
// OK
class dev implements IDeveloper {
  name = "Alex";
  age = 20;
}
// OK
class dev2 implements IDeveloper {
  name = "Alex";
}
// Error
class dev3 implements IDeveloper {
  name = "Alex";
  age = "9";
}
```

而 `extends` 是继承父类，两者其实可以混着用：

```ts
class A extends B implements C,D,E
```

### 枚举类型

场景：实现一个档案检测功能时，需要控制几个状态。在以前，很可能这样写：

```js
function getXXXByXXXStatus(status) {
  if (status == 1) {
    // do somthing
  } else if (status == 2) {
    // do somthing
  } else if (status == 3) {
    // do somthing
  } else if (status == 4) {
    // do somthing
  } else if (status == 5) {
    // do somthing
  }
}
```

这样的代码可读性差，数字含义难以记住。可维护性方面更是牵一发动全身。如果项目中是 TS 的话，使用它的枚举类型就再合适不过。

```ts
enum checkStatus {
  success, // 检测成功
  error, // 检测错误
  checking, // 检测中
  waiting, // 等待中，点击暂停检测后
  uploading, // 上传中
}
```

#### TS 枚举的实现原理

编译的代码

```js
var checkStatus;
(function(checkStatus) {
  checkStatus[(checkStatus["success"] = 0)] = "success";
  checkStatus[(checkStatus["error"] = 1)] = "error";
  checkStatus[(checkStatus["checking"] = 2)] = "checking";
  checkStatus[(checkStatus["waiting"] = 3)] = "waiting";
  checkStatus[(checkStatus["uploading"] = 4)] = "uploading";
})(checkStatus || (checkStatus = {}));
```

反向映射:

1. 枚举被编译为对象
2. 枚举成员的名称被作为 key, 枚举成员的值被作为 value, 表达式返回 value
3. 然后,value 又被作为 key,成员名称又被作为 value,返回枚举成员的名称

这样的好处就是你既可以使用 `checkStatus.success` 获取 value，也可以使
用 `checkStaus[0]` 获取 key。在没有 ts 的项目中，我们也可以学习这种思路。把状态都封装到对象中，而不是使用 `if-else` 条件来硬编码。

#### 字符串枚举

```js
enum orderStatusDesc {
UN_PAYED = '未支付',
PAYED = '已支付',
CANCELED = '已取消',
CLOSED = '已关闭'
}
```

将枚举代码放入 typeScriptPlayGround 中查看编译后代码

```js
"use strict";
var orderStatusDesc;
(function(orderStatusDesc) {
  orderStatusDesc["UN_PAYED"] = "\u672A\u652F\u4ED8";
  orderStatusDesc["PAYED"] = "\u5DF2\u652F\u4ED8";
  orderStatusDesc["CANCELED"] = "\u5DF2\u53D6\u6D88";
  orderStatusDesc["CLOSED"] = "\u5DF2\u5173\u95ED";
})(orderStatusDesc || (orderStatusDesc = {}));
```

相比数字枚举,字符串枚举仅成员名称被作为 key,所以不支持反向映射

#### 异构枚举

异构枚举:数字枚举和字符串枚举混用

```ts
enum Status {
  UN_PAYED,
  PAYED = "已支付",
}
```

将枚举代码放入 typeScriptPlayGround 中查看编译后代码

```js
"use strict";
var Status;
(function(Status) {
  Status[(Status["UN_PAYED"] = 0)] = "UN_PAYED";
  Status["PAYED"] = "\u5DF2\u652F\u4ED8";
})(Status || (Status = {}));
```

虽然 TS 支持这种使用方法,但并不推荐这样去做,容易引起混淆

#### 枚举成员

枚举成员的值为只读类型

尝试对枚举值进行修改会报错

```ts
orderStatus.UN_PAYED = 0; // Cannot assign to 'UN_PAYED' because it is a read-only property.
```

##### 枚举成员的分类

1. const 常量枚举 ,包括三种情况: 1)没有初始值 2)对已有枚举成员的引用 3)常量的表达式
   常量枚举成员会在编译时计算出结果,然后以常量的形式出现在运行时环境

2. computed 需要被计算的枚举成员,非常量表达式
   这些枚举变量的值不会在编译阶段被计算,而是被保留到程序执行阶段

```ts
enum Demo {
  // const
  a, // 没有初始值
  b = Demo.a, // 对已有枚举成员的引用
  c = 1 + 2, // 常量的表达式
  // computed
  d = Math.random(), // 需要被计算的枚举成员
  e = "abc".length, // 需要被计算的枚举成员
}
```

将枚举代码放入 typeScriptPlayGround 中查看编译后代码

```ts
"use strict";
var Demo;
(function(Demo) {
  // const
  Demo[(Demo["a"] = 0)] = "a";
  Demo[(Demo["b"] = 0)] = "b";
  Demo[(Demo["c"] = 3)] = "c";
  // computed
  Demo[(Demo["d"] = Math.random())] = "d";
  Demo[(Demo["e"] = "abc".length)] = "e"; // 需要被计算的枚举成员
})(Demo || (Demo = {}));
```

可以看到:

常量枚举成员的值在编译时就会被计算出结果

需要被计算的枚举成员值被保留了,在运行时环境才会被计算

注意:

在 computed 后面出现的枚举成员必须赋初始值，否则会提示错误

```ts
enum Demo {
  a = "abc".length, // 需要被计算的枚举成员
  b, // Enum member must have initializer.
}
```

#### 七，常量枚举

const 声明的枚举就是常量枚举:

```ts
const enum Month {
  Jan,
  Feb,
  Mar,
}
Í;
```

将枚举代码放入 [typeScriptPlayGround](https://www.typescriptlang.org/play?#code/MYewdgzgLgBApmArgWxgWXFAFjA3jAKQEMwAaGAMTgCNy0iAnGAXyA) 中查看编译后代码

```js
"use strict";
```

可以发现:

常量枚举编译后的输出为空

那么，常量枚举的作用是什么?

当不需要一个对象，而只需要对象的值时，就可以使用常量枚举,这样能够减少在编译环境的代码

比如,定义一个变量,将值定义为常量枚举

```ts
const enum Month {
  Jan,
  Feb,
  Mar,
}
let month = [Month.Jan, Month.Feb, Month.Mar];
```

将枚举代码放入 typeScriptPlayGround 中查看编译后代码

```js
"use strict";
let month = [0 /* Jan */, 1 /* Feb */, 2 /* Mar */];
```

可以看到:

枚举被直接替换成了常量,这样在运行时的代码就会变得非常的简洁

#### 八，枚举类型

在某些情况下,枚举和枚举成员都可以作为一种单独的类型:

```ts
// 1)枚举成员没有任何初始值
enum A {
  a,
  b,
}
// 2)所有枚举成员都是数字枚举
enum B {
  a = 0,
  b = 1,
}
// 3)所有枚举成员都是字符串枚举
enum C {
  a = "apple",
  b = "huawei",
}
```

比如:定义了两个枚举类型 A, B

可将任意 number 类型赋值给枚举类型,取值也可以超出枚举成员定义
两种不同类型的枚举,是不可以进行比较的,编辑器会报错

```ts
let a: A = 3;
let b: B = 3;
a === b; // This condition will always return 'false' since the types 'A' and 'B' have no overlap.
```

再定义三种枚举成员类型:

```ts
let a1: A.a;
let a2: A.b;
let a3: A.a;
```

a1 和 a2 是永远不能比较的

```ts
let a1: A.a;
let a2: A.b;
a1 === a2; // a1 和 a2 的枚举成员类型不同,不能比较
```

a1 和 a3 是相同类型的枚举成员,就可以进行比较

```ts
let a1: A.a = 1;
let a2: A.b;
let a3: A.a = 1;

a1 === a3; // a1 和 a3 的枚举成员类型相同,可以进行比较
```

字符串枚举的取值只能是枚举成员的类型

```ts
let c1: C = C.b; // C 枚举类型可以赋值为 c.b
let c2: C.a = C.a; // C.a 枚举类型只能被赋值为自身 C.a
```

### 装饰器

### 函数

#### 函数表达式

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

```
const mySum = function(x: number, y: number): number {
  return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边 `mySum`，是通过赋值操作进行类型推论（“按上下文归类”）而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```ts
const mySum: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
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

### 命名空间和模块

#### 命名空间

所有的 `.ts` 里声明的文件，编译后的文件是暴露一个全局变量。

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

  module.exports = {
    sum,
    mul,
    sub,
    div,
  };
}
```

编译后

```ts
var utils;
(function(utils) {
  var math;
  (function(math) {
    var sum = function(a, b) {
      // if (Object.prototype.toString.call(a) !== '[object Number]' || Object.prototype.toString.call(b) !== '[object Number]') {
      //   return null;
      // }
      return a + b;
    };
    var mul = function(a, b) {
      return a * b;
    };
    var sub = function(a, b) {
      return a - b;
    };
    var div = function(a, b) {
      return a / b;
    };
    module.exports = {
      sum: sum,
      mul: mul,
      sub: sub,
      div: div,
    };
  })((math = utils.math || (utils.math = {})));
})(utils || (utils = {}));
```

看 js 代码能发现, 在 js 中命名空间其实就是一个全局对象. 如果你开发的程序想要暴露一个全局变量就可以用`namespace`。命名空间对解决全局作用域里命名冲突很重要的，但是对于模块来说却不是一个问题。<u>模块具有其自己的作用域，并且只有导出的声明才会在模块外部可见。</u>

##### 使用命名空间

命名空间是位于**全局命名空间**下的一个普通的带有名字的 · `JavaScript 对象`。这令命名空间十分容易使用。它们可以在多文件中同时使用，并通过 `--outFile` 结合在一起。命名空间是帮你组织 Web 应用不错的方式，你可以把所有依赖都放在 HTML 页面的 `<script>` 标签里。

`但就像其他的全局命名空间污染一样，它很难去识别组件之间的`依赖关系`，尤其是在大型的应用中。`

#### 模块

##### 模块里不要使用命名空间

<u>当初次进入基于模块的开发模式时，可能总会控制不住要将到处包裹在一个命名空间里</u>。模块具有自己的`作用域`，并且只有导出的声明才会在模块外部`可见`。记住这点， 命名空间在使用模块时几乎没什么价值。

<u>在组织方面，命名空间对于在全局作用域内对逻辑上相关的对象和类型进行分组是很便利的。</u>例如，在 C# 里，你会从 `System.Collections` 里找到所有集合的类型。通过将类型有层次地组织在命名空间里，可以方便用户找到与使用那些类型。<u>然而，模块本身已经存在于文件系统之中，这是必须的。我们必须通过路径和文件名找到它们，这已经提供了一种逻辑上的组织形式。</u>我们可以创建 `/collections/generic` 文件夹，把相应模块放在里面。

`命名空间对解决全局作用域里命名冲突来说是很重要的`。比如，你可以有一个 `My.Application.Customer.AddForm` 和 `My.Application.Order.AddForm` -- 两个类型的名字相同，但命名空间不同。然而，这对于模块来说却不是一个问题。`在一个模块里，没有理由两个对象拥有同一个名字。`从模块的使用角度来说，使用者会挑出他们用来引用模块的名字，所以也没有理由发生重名的情况。

##### 使用模块

像命名空间一样，模块可以包含代码和声明。<u>不同的是`模块可以声明它的`依赖`(import 进来的)。</u>

模块会把依赖添加到模块加载器上（例如 CommonJs/Require.js）。对于小型的 JS 应用来说可能没必要，但是对于大型应用，这一点点的花费会带来长久的模块化和可维护性的便利。模块也提供了更好的代码重用，更强的封闭性以及更好的使用工具进行优化。

对于 Node.js 应用来说，模式是默认并推荐的组织代码的方式。

从 ECMAScript 2015 开始，模块成为了语言内置的部分，应该会被所有正常的解释引擎所支持。因此，对于新项目来说推荐使用模块做为组织代码的方式。

<!-- #### 模块解析

#### Classic

#### Node -->

##### TypeScript 如何解析模块

TypeScript 是模仿 Node.js 运行时的解析策略来在编译阶段定位模块定义文件。因此，TypeScript 在 Node 解析逻辑基础上增加了 TypeScript 源文件的扩展名 (.ts，.tsx 和 .d.ts) 。同时，TypeScript 在 `package.json` 里使用字段 `types` 来表示类型 `main` 的意义——编译器会使用它来找到要使用的 `main` 定义文件。

指定了 `types` 为 `foo.d.ts` 之后，导入此库的时候，就会去找 foo.d.ts 作为此库的类型声明文件了。

typings 与 types 一样，只是另一种写法。

1. 先识别 package.json 中是否存在 `types` 或 typings 字段。
2. 发现不存在，那么就会寻找是否存在 `index.d.ts` 文件。
3. 如果还是不存在，那么就会寻找是否存在 `lib/index.d.ts` 文件。假如说连 `lib/index.d.ts` 都不存在的话，就会被认为是一个没有提供类型声明文件的库了。
4. 这个时候可以进行 `install @types` 里面的类型文件，这样在编译的时候，ts 也会从这个文件下寻找对应的模块类型声明文件，然后重复 1-3 的步骤。
5. 如果 @types 也没有，就需要自己编写了。
6. 另外，而有的库为了支持导入子模块如导入 vue 后缀的文件，比如 import bar from 'foo/lib/bar.vue'，就需要额外再编写一个类型声明文件 lib/bar.d.ts 或者 lib/bar/index.d.ts，
7. 假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `xxxx.d.ts` 文件。

### 声明文件

```ts
// shims-tsx.d.ts
import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

#### ts 文件模块组织

在 C# 里面我们习惯于将每个类都单独放在一个文件中，并使用命名空间将这些类组合在一起。而在 TypeScript 中 namespace 的概念与 C# 完全不一样，类似的概念就是放在全局空间 namespace 了，当然也有放置在模块内部的。

<u>模块除了可以解决命名空间的冲突问题外，还能明确依赖关系，只有导出的模块在外部才可见。</u>而就算 C# 无论是否使用 using，都可以通过命名空间访问。

#### 模块（module） vs 命名空间（namespace） vs declare（声明）

在 ts 中，分为普通文件与类型声明文件。

普通文件与文件的组织也是以模块（以前是命名空间）的形式进行的。对于正常的 ts 文件，它也是采用 ES6 模式进行 import/export 的

而对于类型声明文件来说，就使用到了 declare 和 namespace，module，无论是 `declare namespace` 还是 `declare module` 只要写了 **export，都是声明在局部模块内的，也就是别的模块需要使用的话，则需要 import 进来**。**否则，就是声明在全局命名空间下的**。

因此，要看你写的 ts 普通文件要在哪个场景下使用，es6 还是 umd 否则是全局变量 `<script>` 引入，然后编写不同的类型声明文件。

#### 什么是声明语句

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

例如 引入 vue 后缀文件的模块，tsc 是识别不了，会显示找不到模块的错误。

```ts
import Vue from "vue"; // 因为 vue 已经提供了声明文件，因此不会报错
import App from "./App.vue";
// 这里会报错：Cannot find module './App.vue'
```

因此需要声明模块，这样引入 `.vue` 后缀的文件就不会报编译错误了。

```ts
// shims-vue.d.ts // 这里是声明模块，对 "*.vue" 模块的，一个文件就是一个模块
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

上面的代码告诉 TypeScript `*.vue` 后缀的文件可以交给 vue 模块来处理。

`declare module "*.vue"` 针对 .vue 后缀的文件（ts 中一个文件就是一个模块）进行声明，也就是对模块进行声明。除此之外，还有 `declare module "xxx"` 进行对模块的扩展。

```ts
// 扩展 node_modules/vue/types/vue 模块
import vue from "vue/types/vue";
declare module "vue/types/vue" {
  interface Vue {
    $lodash: any;
  }
}
```

同理，在 ts 文件中，使用了其他模块如 `*.scss` 文件，也需要声 scss 模块的类型定义，否则 tsc 找不到，会报编译错误。

```ts
declare module "*.scss" {
  // 全局声明
  const content: { [className: string]: string };
  export default content;
}
```

新增模块声明，需要重新编译。

- 全局声明
  - `declare var` 声明全局变量
  - `declare function` 声明全局方法
  - `declare class` 声明全局类
  - `declare enum` 声明全局枚举类型
  - `declare namspace` 声明（含有子属性）的全局对象
  - `interface` 和 `type` 声明全局类型
- npm 包（npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。）
- export
- `export default` ES6 默认导出
- `export =` commonjs 导出模块
- UMD 库
- `export as namespace` UMD 库声明全局变量
- `declare global` 扩展全局变量
- `declare module` 扩展模块
- `/// <reference />` 三斜线指令

#### 什么是声明文件

通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件：

```ts
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

```ts
// src/index.ts
jQuery("#foo");
```

声明文件必需以 `.d.ts` 为后缀。

一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuery` 的类型定义了。

```bash
/path/to/project
|——src
|  |——index.ts
|  |__jQuery.d.ts
|__tsconfig.json
```

假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件

##### 第三方声明文件

#### 书写声明文件

当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。在不同的场景下，声明文件的内容和使用方式会有所区别。
库的使用场景主要有以下几种：

- `全局变量`：通过 `<script>` 标签引入第三方库，注入全局变量。
- `npm 包`：通过 `import foo from 'foo'`导入，符合 ES6 模块规范
- `UMD 库`：既可以通过 `<script` 标签引入后，又可以通过 `import` 导入。
- `直接扩展全局变量`：通过 `<script>` 标签引入后，改变一个全局变量的结构
- `在 npm 包或 UMD 库中扩展全局变量`：引用 npm 包或 UMD 库后，改变一个全局变量的结构
- `模块插件`：通过 `<script>` 或 import 导入后，改变另一个模块的结构

##### 全局变量

- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型

##### declare namespace

namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。

由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 `module` 关键字表示`内部模块`。但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为`命名空间`。

随着 ES6 的广泛应用，<u>现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了，</u>故我们不再需要学习 namespace 的使用了。

namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。

因此有两种方式声明特定的模块

```ts
declare module "buffer" {} // with quotes，表示导出的 es6 外部模块

declare module buffer {} // without quotes => 表示为declare namespace buffer {}
```

##### 声明接口

```ts
// eslint-disable-next-line no-unused-vars
interface Window {
  // 声明全局全局接口
  __NETWORK__: string;
}
```

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
    "target": "esnext", // 输出的目标 js 文件
    "module": "esnext", // 模块化
    "strict": true,
    "jsx": "preserve", // 支持 tsx 写法
    "importHelpers": true, //
    "moduleResolution": "node",
    "experimentalDecorators": true, // 支持实验性的装饰器
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": "./",
    "paths": {
      "*": ["types/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "src/icons/svg/index.js"
  ],
  "exclude": ["node_modules"]
}
```

paths、和 baseUrl 可以在 ts 引入模块时省略根路径，`include` 则是需要编译的文件

##### 模块插件

如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 `declare module` 扩展原有模块：

方式 1：

```ts
// types/moment-plugin/index.d.ts

import * as moment from "moment";

declare module "moment" {
  export function foo(): moment.CalendarKey;
}
```

方式 2:

```ts
import vue from "vue/types/vue";
// 扩展 node_modules/vue/types/vue 模块
declare module "vue/types/vue" {
  interface Vue {
    $lodash: any;
  }
}
```

### 接口

接口可以作为对象的类型描述。下面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
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
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
https: export function Prop(
  options: PropOptions | Constructor[] | Constructor = {}
) {
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

### TypeScript 给 window 对象添加全局变量

```ts
// typings/declare.globar.ts
// eslint-disable-next-line no-unused-vars
interface Window {
  // 声明全局全局接口
  __NETWORK__: string;
}

```

## 项目实战

### TypeScript + Vue 3.0 项目开发

#### 类型报错

##### DOM 元素类型

需要这样声明，否则报 style 下这些的错误。

```js
 const $html: HTMLElement | null = document.querySelector("html");
        const $body: HTMLElement | null = document.querySelector("body");
if ($html && $body) {
      $html.style.fontSize = scale * 16 + "px";
      $html.style.opacity = "1";
    }
```



Render 中的类型报错问题处理：

```js
  render() {
    const { SvgIcon } = this.$options.components; 
    /*  类型报错，找不到对应的类型
    const SvgIcon: any
    Property 'SvgIcon' does not exist on type 'Record<string, Component<any, any, any, ComputedOptions, MethodOptions>> | undefined'.Vetur(2339)*/
    return (
      <div class="icon-view">
        <p>点一点图标就能取代码</p>
        {icons.map(iconName => (
          <div class="icon" on-click={() => this.handleIconClick(iconName)}>
            <SvgIcon name={iconName} />
            <span class="icon-name">{iconName}</span>
          </div>
        ))}
      </div>
    );
  }
```

解决：添加类型声明的处理

```tsx
<script lang="tsx">
import SvgIcon from "@/components/SvgIcon.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { SvgIcon },
  name: "SvgViewer",
  setup() {
    // methods
    const handleIconClick = async (iconName: string) => { // =1 这里一直会报错，说冒号这里要写为逗号
      await navigator.clipboard.writeText(`<SvgIcon name='${iconName}'/>`);
      alert(`${iconName}图标代码已复制到剪切板`);
    };
    return {
      handleIconClick
    };
  },
  render() {
    const { SvgIcon } = this.$options.components as any; // 2.
    return (
      <div class="icon-view">
        <p>点一点图标就能取代码</p>
        {icons.map(iconName => (
          <div class="icon" on-click={() => this.handleIconClick(iconName)}>
            <SvgIcon name={iconName} />
            <span class="icon-name">{iconName}</span>
          </div>
        ))}
      </div>
    );
  }
});
</script>
```

由于存在上述标注 1 的报错，后来把改文件从` .vue` 改为 `.tsx` 文件后，即可正常运行。应该是原来的单文件组件的类型检查有问题，所以如果使用 tsx 的话，最好就使用单独的 tsx 文件。具体可以参考：[为什么我推荐使用JSX开发Vue3](https://juejin.cn/post/6911175470255964174#heading-0) 

> 注意：在 Template 中的变量，是不会收到 TypeScript 的类型检查的，除非编写为 `render()` 函数。

#### 如何给第三方模块添加类型声明（模块和命名空间）

如要使用`qqmap`这个js库，直接在`src`文件夹的任意地方创建一个`qqmap.d.ts`文件（不过还是推荐放到`@types`文件夹中）。

然后在`qqmap.d.ts`文件中编写声明：

```text
declare module "qqmap";
```

好的，这些就大工告成了，直接ts文件中使用

```text
import qqmap from "qqmap";
```

就可以引入这个第三方JavaScript库。

### TSX 如何引入 Vue scoped 样式

**CSS Module**

>  [CSS Modules](https://github.com/css-modules/css-modules) 它不是将 CSS 改造成编程语言，而是功能很单纯，只加入了局部作用域和模块依赖，这恰恰是网页组件最急需的功能。http://www.ruanyifeng.com/blog/2016/06/css_modules.html

Vue 默认是 scoped 方式引入css ，防止样式污染 ，通过vue模板使用也很方便。实际CSS 选择器使用 scoped 这种方式效率低于 CSS Module，使用TSX渲染时样式也只能通过 CSS Module 这样方式引用。

如何让 Vue 3.x 项目支持 CSS Module 呢？

1. VueCLI 生成的项目，默认支持了 CSS Module 。
2. 编写



### TypScript + vue 2.0 项目开发

在 Vue 里面使用 TS 有很多种方式。一种是通过 import 默认引入 Vue 的声明文件。一种是使用它的 class 风格。还有一种是最常见的，通过 Vue 的插件 Vetur 自动匹配它的声明文件。

<!-- 在我写过的 typescript 的项目中, Vue 使用typescript项目是最扯淡了.

类型优势一个没用上, 问题到时引出一大堆

ng 不知道.  至少 react 和 typescript 的结合的体验上不是一个等级的.

不吹不黑. 真实感受.

真心觉得 vue 不适合 typescript

vue 更适合小项目用.   配合模板的优势.

如果要和ts 很好的结合  要么ts 有更牛的 types系统
要么vue api 大改，Vue 3.0 -->

#### 开发环境搭建

##### 快速创建

新项目通过 vuecli3 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-typescript#readme

```bash
vue add typescript
```

<!-- ##### 快速创建


使用了 vuecli3/4 的项目情况下，在已创建的项目中安装，https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-typescript/README.md
```ts
vue add @vue/typescript
​``` -->
<!-- 测试报错，找不到 Home.vue -->

##### 手动创建

手动一步步搭建 vue + ts 的开发环境

1. 安装 `yarn add typescript —dev`，这个是用来编译 ts 代码为 js 代码，可以在项目根目录下添加更详细的配置 `tsconfig.json`。

2. 使 webpack 支持 ts，要安装 `ts-loader`，编写 loader 规则。

​```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .test(/\.ts$/)
      .use("ts-loader")
      .loader("ts-loader");
  },
};
```

这个时候，loader 解析 `.ts` 文件后，经过 typescript 把 ts 编译为 js。

<!--  是否安装 fork-ts-checker-webpack-plugin 实现线程外的快速类型检查 -->

3. tsconfig 输出的 js，是否还经过 babel 的处理呢？

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "es5",
    "strict": true,
    "jsx": "preserve", // 支持 tsx 写法
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true, // 支持装饰器
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true, // 支持源码映射
    "baseUrl": ".",
    "types": ["webpack-env", "jest"],
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "src/icons/svg/index.js"
  ],
  "exclude": ["node_modules"]
}
```

4. 用了 ts 编译，编译流程是这样的：TS > TS Compiler > JS > Babel > Js (again)。如果使用 vuecli 勾选了 babel 兼容就不用额外配置了。否则，需要继续安装 babel 的处理。

5.. 配置完成后，这个时候把项目的 .js 文件改成 .ts 文件即可以正常编译，如把 `main.js` 改为 `main.ts` 文件，然后设置 vscode 编译器自动检查语法：打开 vscode -> setting -> 输入 check 即可看到 TypeScript 的检查配置，这样在你编辑代码的时候即可实时看到提示。

```ts
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h: any) => h(App),
}).$mount("#app");
```

你会发现在 vue 项目中的 ts 环境下，进行 `import Vue from 'vue'` 时，vscode 编辑器 ts 是识别不 Vue 这个类型的，因此还需要在项目添加 `typing` 文件夹添加 `.d.ts` 关于 vue 的类型声明文件才可以，包括 `shims-tsx.d.ts` 和 `shims-vue.d.ts`，`shims-tsx.d.ts`用于支持 jsx 写法。

```ts
// shims-vue.d.ts
declare module "*.vue" {
  // 声明一个模块，应用于所有的 vue 组件的 import 语句中
  import Vue from "vue";
  export default Vue; // 模块内声明
}
```

这里的声明文件可能会出现 eslint 报错，
Parsing error: Only declares and type imports are allowed inside declare module，因此需要把 `/**/*.d.ts` 添加进 .eslintignore 文件。

6. 前面都是在编译的时候，进行了代码提醒。我们还要在写代码的时候进行实时类型检查提醒，这时候需要设置 vscode 设置类型检查。

另外，对于代码检查，因此还要安装 typescript-eslint 插件，写好配置文件，让 eslint 扩展能够对 ts 代码也进行代码检查。

<!-- @typescript-eslint -->

<!-- `"@vue/typescript/recommended",`
    `"@vue/prettier/@typescript-eslint"`
然后添加进 eslint 配置文件，extends： [] 里面。 -->

后续可以考虑用一个编译器 babel 来处理，见：https://iamturns.com/typescript-babel/？

有一些特殊情况，我们需要禁用检查

```js
// @ts-ignore
```

##### 采用 babel 7 编译 typescript

- 避免维护两个 `js 编译文件，Webpack 经常用于解决这个问题，调整 Webpack 的配置。将 \*.ts 提供给 TypeScript，然后将运行的结果提供给 Babel。

- 它还精简了整个 JavaScript 生态系统。取代了 ESLint、测试 runner、build 系统，以及开发模板提供的不同的编译器，它们只需要支持 Babel 即可。然后配置 Babel 来处理具体的需求。向 ts-loader、ts-jest、ts-karma、create-react-app-typescript 等等说再见就好啦，使用 Babel 代替它们。
- j查。

- `@babel/preset-typescript`的作用是把 `typescript` 干掉，在这里不做 ts 检查，只是进行编译。继续用 `babel` 的其他转换设置。
- 而 `tsconfig.json` 中的配置其实是给 `npm run check-types` 也就是 `tsc` 去做类型检查使用的。

这种事情发生的频率并不高，等到功能开发完，再跑 `npm run check-types` 只会让你更想干掉 ts。对于实时的类型检查，可以开启 vscode 编辑器进行提醒（它也会读取 tsconfig.json ）

- 如果真要`打包`的时候，也进行类型检查，可以安装这个插件： `fork-ts-checker-webpack-plugin`，这个 webpack 插件会在一个单独的进程并行的进行 TypeScript 的类型检查。可以不需要这样处理了，如果是为了保证 ts 质量，可以把 `check-types`添加进去提交代码的检测。

设置：

1. 安装

```bash
yarn --dev @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread
```

babel 配置文件（`.babelrc` 或 `babel.config.js`）

```js
{
	"presets": [
		"@babel/typescript"
	],
	"plugins": [
		"@babel/proposal-class-properties",
		"@babel/proposal-object-rest-spread"
	]
}
```

2. Babel 默认查找 `.js` 文件，遗憾的是，你还没办法在 Babel 的 config 文件中进行配置。

- 如果使用 Babel CLI，添加 --extensions '.ts'。
- 如果使用 Webpack，向 `resolve.extensions` 数组中添加 'ts'。

在 vuecli.config.js 配置中：

```js
const module = {
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .test(/\.ts$/)
      .use("babel-loader")
      .loader("babel-loader");
    // config.resolve.extensions[".ts"] // 上面已经⬆️进行引入了
  },
};
```

3. 给 package.json 添加 check-types 命令，并且安装好 typescript 和添加 `tsconfig.json` 文件：

```json
{
  "scripts": {
    "check-types": "tsc"
  }
}
```

添加 tsconfig.json 文件。

4. 选择性是否安装 `ForkTsCheckerWebpackPlugin` 进行打包检查，配置：

```js
new ForkTsCheckerWebpackPlugin({
  memoryLimit: 1024 * 2,
  tsconfig: "./tsconfig.json",
});
```

总结整个流程：typescript + babel + fork-ts-checker-webpack-plugin。

这个时候，可以同时使用 js 和 ts 无缝开发了。

![](../.vuepress/public/images/2020-06-09-17-47-50-ts-jest.png) 

#### jest 单元测试

安装两个包 `ts-jest` 和 `@types/jest`
```bash
yarn add ts-jest @types/jest --dev
```

然后更高 jest.config.js 配置，使支持 ts

```js
module.exports = {
   // 这里添加 ts
  moduleFileExtensions: ["ts", "js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    `"^.+\\.ts?$": "ts-jest",` // 添加这行
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**src/components/**/*.spec.(js|jsx]ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  verbose: true
};

```

最终可以同时支持 ts 和 js 的编译以及测试。

![](../.vuepress/public/images/2020-06-09-17-48-17-ts-jest-01.png)


#### 处理 .vue 文件

我们知道一个 `.vue` 组件文件，通常包括三部分：`template`、`script`和 `style` 部分，`.vue` 支持 ts 文件只需要在 script 标签上添加属性 `lang="ts"`：

```html
<script lang="ts"></script>
```

这个时候还需要另外安装两个 npm 包，把 .vue 逻辑代码改成 class 类风格形式来支持 ts 的编译。

```bash
yarn add vue-class-component vue-property-decorator —dev
```

`vue-property-decorator` 在 `vue-class-component` 的基础上增加了更多与 Vue 相关的装饰器，使 Vue 组件更好的跟 TS 结合使用。这两者都是离不开装饰器的，（decorator）装饰器已在 ES 提案中。Decorator 是装饰器模式的实践。装饰器模式呢，它是继承关系的一个替代方案。动态地给对象添加额外的职责。在不改变接口的前提下，增强类的性能。

`vue-class-component` 支持类风格形式，`vue-property-decorator`则是针对 vue 的 `prop`、`watch` 等我们习惯的声明风格添加装饰器模式支持。

<!-- （由于之前对装饰器不太理解，还特地去学习了这个设计模式，具体可以看看笔者写的文章总结《JS 实现装饰器模式》以及 [TypeScript 的装饰器篇章](https://www.tslang.cn/docs/handbook/decorators.html)） -->


#### 修饰器

```ts
import {
  Vue,
  Component,
  Prop,
  Component,
  Emit,
  Provice,
  Inject,
  Watch,
  Model,
  Minxins,
} from "vue-property-decorator";
```

#### @Component 类装饰器

首先，Vue 页面中的 script 部分要加一个 lang=ts，这样安装好 typescript 才能引用。

```html
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import BaseHeader from "@/components/BaseHeader";

  //公共头部组件
  @Component({
    components: {
      BaseHeader,
    },
  })
  export default class extends Vue {
    private stateA: boolean = true;
    private stateB: string = "";
    private stateC: number = 0;
    private stateD: any = {};
    stateE: any[] = [];
  }
</script>
```

等同于

```html
<script>
  import Vue from "vue";
  import BaseHeader from "@/components/BaseHeader"; //公共头部组件

  export default {
    components: {
      BaseHeader,
    },

    data() {
      return {
        stateA: true,
        stateB: "",
        stateC: 0,
        stateD: {},
        stateE: [],
      };
    },
  };
</script>
```

#### @Prop

父子组件之间的属性传值

```ts
export default class extends Vue {
@Prop({ default: 0 }) private propA!: number
@Prop({ default: () => [10, 20, 30, 50] }) private propB!: number[]
@Prop({ default: 'total, sizes, prev, pager, next, jumper' }) private propC!: string
@Prop({ default: true }) private propD!: boolean,
@prop([String, Boolean]) propE: string | boolean;
}
```

代码等同于

```js
export default {
  props: {
    propA: {
      type: Number,
    },
    propB: {
      type: Array,
      default: [10, 20, 30, 50],
    },
    propC: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    propD: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    propE: {
      type: [String, Boolean],
    },
  },
};
```

这里有两个常用修饰符`!` `?`，!和可选参数 `?` 是相对的, `!` 表示强制解析（也就是告诉 typescript 编译器，我这里一定有值），你写`?` 的时候再调用，typescript 会提示可能为 `undefined`

#### @Emit

【注意】：实践证明，其实不使用 @Emit 修饰符也是可以的，按照以前 `this.$emit()` 的写法

```ts
@Component
export default class YourComponent extends Vue {
  count = 0;

  @Emit("reset")
  resetCount() {
    this.count = 0;
  }

  @Emit()
  returnValue() {
    return 10;
  }

  @Emit()
  onInputChange(e) {
    return e.target.value;
  }
}
```

代码等同于

```js
export default {
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    resetCount() {
      this.count = 0;
      this.$emit("reset");
    },

    returnValue() {
      this.$emit("return-value", 10);
    },

    onInputChange(e) {
      this.$emit("on-input-change", e.target.value, e);
    },
  },
};
```

@Emit 装饰器的函数会在运行之后触发等同于其函数名(驼峰式会转为横杠式写法)的事件, 并将其函数传递给\$emit
@Emit 触发事件有两种写法

@Emit()不传参数,那么它触发的事件名就是它所修饰的函数名.
@Emit(name: string),里面传递一个字符串,该字符串为要触发的事件名。

#### @Watch 观察属性装饰器

@Watch 装饰器主要用于替代 Vue 属性中的 watch 属性，监听依赖的变量值变化而做一系列的操作

```ts
@Component
export default class YourComponent extends Vue {
  @Watch("child")
  onChildChanged(val: string, oldVal: string) {}

  @Watch("person", { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) {}
}
```

```js
export default {
  watch: {
    child(val, oldVal) {},
    person: {
      handler(val, oldVal) {},
      immediate: true,
      deep: true,
    },
  },
};
```

#### @Minxins

```ts
// myMixin.ts

@Component
export default class MyMixin extends Vue {
  mixinValue: string = "Hello World!!!";
}
```

```ts
// 引用mixins
import MyMixin from "./myMixin.ts";

@Component
export default class extends mixins(MyMixin) {
  created() {
    console.log(this.mixinValue); // -> Hello World!!!
  }
}
```

#### @Model

@Model 装饰器允许我们在一个组件上自定义 v-model，接收两个参数：

event: string 事件名。
options: Constructor | Constructor[] | PropOptions 与@Prop 的第一个参数一致。

```ts
import { Vue, Component, Model } from "vue-property-decorator";

@Component
export default class MyInput extends Vue {
  @Model("change", { type: String, default: "Hello world!!!" })
  readonly value!: string;
}
```

代码等同于

```html
<template>
  <input
    type="text"
    :value="value"
    @change="$emit('change', $event.target.value)"
  />
</template>

export default { model: { prop: 'value', event: 'change' }, props: { value: {
type: String, default: 'Hello world!!!' } } }
```

#### @Provide @Inject

`@Provide` 声明一个值 , 在其他地方用 `@Inject` 接收，一般用于不依赖于任何第三方状态管理库（如 vuex）的组件编写

#### @Ref(refKey?: string)

@Ref(refKey?: string)
@Ref 装饰器接收一个可选参数，用来指向元素或子组件的引用信息。如果没有提供这个参数，会使用装饰器后面的属性名充当参数

```ts
import { Vue, Component, Ref } from "vue-property-decorator";
import { Form } from "element-ui";

@Componentexport
class MyComponent extends Vue {
  @Ref() readonly loginForm!: Form;
  @Ref("changePasswordForm") readonly passwordForm!: Form;

  public handleLogin() {
    this.loginForm.validate((valide) => {
      if (valide) {
        // login...
      } else {
        // error tips
      }
    });
  }
}
```

等同于

```js
export default {
  computed: {
    loginForm: {
      cache: false,
      get() {
        return this.$refs.loginForm;
      },
    },
    passwordForm: {
      cache: false,
      get() {
        return this.$refs.changePasswordForm;
      },
    },
  },
};
```

#### 钩子函数

以下的 `public`、`private` 在引入 `tslint` 后是必写的，否则会有警告，如果没有引的话是可以不写的

| Ts                          | Js                              | 说明         |
| --------------------------- | ------------------------------- | ------------ |
| public created() {}         | created() {}                    | 初始化       |
| public mounted() {}         | mounted() {}                    | 挂载完毕     |
| private \_getInitData() {}  | methods: { \_getInitData() {} } | 方法         |
| private get \_userName() {} | computed: { \_userName() {} }   | 计算属性     |
| public destroyed() {}       | destroyed() {}                  | 销毁生命周期 |

### 状态管理 Vuex

传统的 vuex 在 vue+ts 的项目里面是行不通的，`vue 2.0` 版本对 ts 的兼容性本身并不是特别友好，所以要达到状态管理的效果，这里要额外引用一个类库 `vuex-module-decorators`，它是基于 `vue-class-component` 所做的拓展，它提供了一系列的装饰器，让 `vue+ts` 结合的项目达到状态管理的作用。

`vue-class-component` 主要提供了以下的装饰器，接下来让我们一一的了解一遍吧

> import { VuexModule, Module, Action, Mutation, getModule, State } from 'vuex-module-decorators'

| TS           | JS        |
| ------------ | --------- |
| public State | state     |
| @Mutations   | mutations |
| @Action      | action    |
| get          | getters   |

`index.ts`

```ts
import Vue from "vue";
import Vuex from "vuex";
import { IAppState } from "./modules/app";
import { IUserState } from "./modules/user";

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  user: IUserState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
```

等同于

```js
import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
  },
});

export default store;
```

#### 定义 module

定义一个 `modules`，直接使用装饰器 `@Module`

#### state

这里所有的 state 属性则是添加上 public 修饰的 class 属性，其它的用法都是相似的

#### Getters

原始的 `getters` 计算函数，在这里对应的即使 `get` 方法，即

原始的 getters 计算函数，在这里对应的即使 get 方法，即

```ts
@Module
export default class UserModule extends VuexModule {
  public permission = null;

  get storePermission() {
    return this.permission;
  }
}
```

等同于

```js
export default {
  state: {
    permission: null,
  },
  getters: {
    storePermission: (state) => state.permission,
  },
};
```

#### Mutations

```ts
@Mutation
private [SET_USER_INFO](userInfo) {
  this.userInfo = userInfo
}
```

等同于

```js
mutations: {
 [SET_USER_INFO](state, userInfo) {
  state.userInfo = userInfo;
}
```

两者的区别其实就是语法糖，原始的 `Mutation` 同步方法都是定义在 `mutations` 内，而 ts 版的每一个 `Mutation` 都要加上装饰器`@Mutation` 修饰。

注意：
一旦使用 `@Mutation` 装饰某一函数后, 函数内的 `this`上下文即指向当前的 `state`，所以想引用 `state` 的值，可以直接`this.userInfo`访问即可。

`Muation` 函数不可为 `async` 函数, 也不能使用`箭头函数`来定义, 因为在代码需要在运行重新绑定执行的上下文。（不能使用箭头函数代验证）

#### Actions

```ts
@Action
public async Login(userInfo: { username: string, password: string}) {
    ...
    this.SET_TOKEN(data.accessToken)
}
```

```js
actions: {
    async Login({ commit }, data) {
        ...
        commit('SET_TOKEN', data.accessToken)
    }
}
```

### tsx

vue 组件中使用了 render 写法的，需要把 `<script lang="ts">` 改为 `<script lang="tsx">`

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
import * as React from "react";
import * as ReactDOM from "react-dom";

// after
import React from "react";
import ReactDOM from "react-dom";
```

## 底层原理

## 最佳实践

虽然 typeScript 提供了编译时的检查，但是不代表运行时的检查就不必要。只不过 ts 可以让我们减少更多的运行时错误。
## 总结

## 参考资料

- 综合
  [https://webpack.js.org/guides/typescript/](https://webpack.js.org/guides/typescript/)
  - [传送门--TypeScript 入门教程 (墙裂推荐)](https://github.com/xcatliu/typescript-tutorial/blob/master/README.md)
  - [一篇朴实的文章带你 30 分钟捋完 TypeScript,方法是正反对比](https://juejin.im/post/5d53a8895188257fad671cbc#heading-15)
  - [Vue3.0 前的 TypeScript 最佳入门实践](https://juejin.im/post/5d0259f2518825405d15ae62)
  - [TypeScript 中文网](https://www.tslang.cn/docs/handbook/module-resolution.html)
  - [Typescript+Vue 大型后台管理系统实战](https://juejin.im/post/5e1bb2cb518825267f69964c#heading-14)
- 类型
  - [TypeScript 实战-04-TS 枚举类型](https://blog.csdn.net/ABAP_Brave/article/details/100737210)
- 编译
  - [从零开始配置 react + typescript（三）：webpack](https://juejin.im/post/5e4cef8d518825497467efcc#heading-17)
  - [[译] TypeScript 牵手 Babel：一场美丽的婚姻](https://juejin.im/post/5c822e426fb9a04a0a5ffb49)
  - [ts 官网完整的配置](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
  - [tsconfig.json 入门指南](https://juejin.im/post/5e34d967f265da3dfa49bdc3#heading-22)
  - [TS 常见问题整理（60 多个，持续更新 ing）](https://juejin.im/post/5e33fcd06fb9a02fc767c427?utm_source=gold_browser_extension#heading-44)
- [TS in JS 实践指北](https://juejin.im/post/5e0176b4f265da33a159d9e0#heading-16)
- [TypeScript - 一种思维方式](https://zhuanlan.zhihu.com/p/63346965) 本文介绍了 TS 能强化了「面向接口编程」这一理念。我们知道稍微复杂一点的程序都离不开不同模块间的配合，不同模块的功能理应是更为清晰的，TS 能帮我们梳理清不同的接口。
- [Typescript 编译过程](https://zhuanlan.zhihu.com/p/45898674)
- 开发环境
  - [vue-docs-zh-cn](https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-typescript/README.md) vuecli
  - [ts 在线编译工具](https://www.typescriptlang.org/play)
  - [现有 vue 项目中使用 typeScript](https://blog.csdn.net/zyx1303031629/article/details/87856915)
- 模块声明
  - [声明文件](https://ts.xcatliu.com/basics/declaration-files.html)
  - [Can't import CSS/SCSS modules. TypeScript says “Cannot Find Module”
    ](https://stackoverflow.com/questions/40382842/cant-import-css-scss-modules-typescript-says-cannot-find-module)
  - [由 shims-vue.d.ts 引发的思考](https://juejin.im/post/5d22b12251882509057e11e9#heading-2)
  - [Re: TypeScript - Namespace? Module?](https://blog.higan.me/namespace-and-module-in-typescript/)
  - [What is the difference between `declare namespace` and `declare module`](https://stackoverflow.com/questions/41932585/what-is-the-difference-between-declare-namespace-and-declare-module)
  - [TypeScript 的两种声明文件写法的区别和根本意义](https://my.oschina.net/fenying/blog/747184)
