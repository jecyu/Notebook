#  TypeScript 项目总结（持续更新）

[[toc]]

## 前言

TypeScript 作为 JavaScript 语言的超集，它为 JavaScript 添加了可选择的类型标注，大大增强了代码的可读性和可维护性。同时，它提供最新和不断发展的 JavaScript 特性，能让我们建立更健壮的组件。

### TypeScript 的特点

TypeScript 主要有 3 大特点：

- **始于JavaScript，归于JavaScript**

TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的JavaScript 引擎中。

- **强大的工具构建大型应用程序**

类型允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。

类型是可选的，类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有 JavaScript 库的行为。

- **先进的 JavaScript**

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。

这些特性为高可信应用程序开发时是可用的，但是会被编译成简洁的 ECMAScript3（或更新版本）的JavaScript。

### 总结

TypeScript 在社区的流行度越来越高，它非常适用于一些大型项目，也非常适用于一些基础库，极大地帮助我们提升了开发效率和体验。都 2020 年了，如果你还没有开始学习 TypeScript，那么你可能要落后了哟，所以还等什么，快来和我一起学习并使用 TypeScript 吧，来感受一下它为我们带来的奇妙体验。
        

TypeScript 在这两年间一直很火，看看下面的语言趋势图。

![ts 路线图]()

它是 ES6 的超集，为什么它这么火呢，因为提供了类型系统，如下面这么一个函数：

```ts
const mySum = function(x: number, y: number): number {
  return x + y;
};
```

这样的好处是，很多有关于类型的 bug 都可以在编译时发现并解决。TypeScript 工作原理是通过 typescript 命令行工具，把 TypeScript 代码编译成 javaScript，从而支持在浏览器运行。听过 TypeScript 很久了，让笔者下决心上车的是这几个月发现很多 github 上的仓库都用了 ts 重构，这些想看下源码都很困难。还有就是尤大大对 vue 3.0 也采用了 ts 全面重构，还在观望的 vue 小伙伴赶紧上车了。

### [TypeScript是否有必要再次检查输入参数的类型？](https://segmentfault.com/q/1010000004333008)

TypeScript的主要目的，我想这个语言本身的名字已经说得很清楚了 “Type Script“。就是 javascript强类型版，它主要的工作在编译时检查，而不是运行时，因为它编译后的代码也只是普通的js代码。

其实ts的最大优势就在于 不用所有组内合作者都写ts。
ts本身就是js的超集，不会ts的人直接在.ts文件内写js代码就可以。会ts的可以用上ts自己的类型。

所以

- 解决方案1：如果你要向下兼容（兼容不写强类型的人）那就只能及写类型，又在代码里再用js检查类型一遍。
- 解决方案2：最简单的方法还是直接让你们组内所有人都用上就可以了。

## 安装 TypeScript

命令行运行如下命令，全局安装 TypeScript：

```bash
npm install -g typescript
```

安装完成后，在控制台运行如下命令，检查安装是否成功(3.x)：

```bash
tsc -V 
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

```json
{
  "files": [],
  "include": [],
  "exclude": [],
  "compileOnSave": false,
  "extends": "",
  "compilerOptions": {}
}
```

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

### 选择 TypeScript 的理由

#### TypeScript 想要解决的问题？实现目标？

- 为 JavaScript 提供可选的类型系统。
- 兼容当前及未来的 JavaScript 的特性。

#### 为什么使用 TypeScript ？

## 编写第一个 TypeScript 程序

在编辑器，将下面的代码输入到 greeter.ts 文件里：


```javascript
function greeter (person) {
  return 'Hello, ' + person
}

let user = 'Yee'

console.log(greeter(user))
```

### 编译代码

我们使用了 `.ts` 扩展名，但是这段代码仅仅是 JavaScript 而已。

在命令行上，运行 TypeScript 编译器：

```bash
tsc greeter.ts
```

输出结果为一个 `greeter.js` 文件，它包含了和输入文件中相同的 JavsScript 代码。

在命令行上，通过 Node.js 运行这段代码：

```bash
node greeter.js
```

控制台输出：

```
Hello, Yee
```

### 类型注解

接下来让我们看看 TypeScript 工具带来的高级功能。 给  `person` 函数的参数添加 `: string` 类型注解，如下：

```typescript
function greeter (person: string) {
  return 'Hello, ' + person
}

let user = 'Yee'

console.log(greeter(user))
```

TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式。 在这个例子里，我们希望 `greeter` 函数接收一个字符串参数。 然后尝试把 `greeter` 的调用改成传入一个数组：

```typescript
function greeter (person: string) {
  return 'Hello, ' + person
}

let user = [0, 1, 2]

console.log(greeter(user))
```

重新编译，你会看到产生了一个错误：

```
error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

类似地，尝试删除 `greeter` 调用的所有参数。 TypeScript 会告诉你使用了非期望个数的参数调用了这个函数。 在这两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

要注意的是尽管有错误，`greeter.js` 文件还是被创建了。 就算你的代码里有错误，你仍然可以使用 TypeScript。但在这种情况下，TypeScript 会警告你代码可能不会按预期执行。


### 接口

让我们继续扩展这个示例应用。这里我们使用接口来描述一个拥有 `firstName` 和 `lastName` 字段的对象。 在 `TypeScript` 里，只在两个类型内部的结构兼容，那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 `implements` 语句。

```typescript
interface Person {
  firstName: string
  lastName: string
}

function greeter (person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName
}

let user = {
  firstName: 'Yee',
  lastName: 'Huang'
}

console.log(greeter(user))
```

### 类

最后，让我们使用类来改写这个例子。 TypeScript 支持 JavaScript 的新特性，比如支持基于类的面向对象编程。

让我们创建一个 `User` 类，它带有一个构造函数和一些公共字段。因为类的字段包含了接口所需要的字段，所以他们能很好的兼容。

还要注意的是，我在类的声明上会注明所有的成员变量，这样比较一目了然。

```typescript
class User {
  fullName: string
  firstName: string
  lastName: string

  constructor (firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = firstName + ' ' + lastName
  }
}

interface Person {
  firstName: string
  lastName: string
}

function greeter (person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName
}

let user = new User('Yee', 'Huang')

console.log(greeter(user))
```

重新运行 `tsc greeter.ts`，你会看到 TypeScript 里的类只是一个语法糖，本质上还是 `JavaScript` 函数的实现。

### 总结

到这里，你已经对 TypeScript 有了一个大致的印象，那么下一章让我们来一起学习 TypeScript 的一些常用语法吧。

## 基础类型

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

很多 TypeScript 的原始类型比如 boolean、number、string等等，在JavaScript中都有类似的关键字 Boolean、Number、String，后者是 JavaScript 的构造函数，比如我们用 Number 用于数字类型转化或者构造 Number 对象用的，而 TypeScript 中的 number 类型仅仅是表示类型，两者完全不同。

ts 类型会区分大写与小写，因为类型 boolean（原始类型） 与 Boolean（引用类型），比如。在其他强类型语言的提醒呢有什么不同？

```ts
let isBool3: boolean = new Boolean(1); // 这里会编译报错，因为 new Boolean(1) 是一个 bool 对象

let isBool3: boolean = !!1; // 正确
```

### 布尔值

最基本的数据类型就是简单的 true/false 值，在JavaScript 和 TypeScript 里叫做 `boolean`（其它语言中也一样）。

```typescript
let isDone: boolean = false
```

### 数字

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015中引入的二进制和八进制字面量。

```typescript
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24
```

### 字符串

JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 `string` 表示文本数据类型。 和 JavaScript 一样，可以使用双引号（`"`）或单引号（`'`）表示字符串。

```typescript
let name: string = 'bob'
name = 'smith'
```

你还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（ ``` ` ```），并且以 `${ expr }` 这种形式嵌入表达式

```typescript
let name: string = `Yee`
let age: number = 37
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`
```

这与下面定义 `sentence` 的方式效果相同：

```typescript
let sentence: string = 'Hello, my name is ' + name + '.\n\n' +
    'I\'ll be ' + (age + 1) + ' years old next month.'
```

### 数组

TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```typescript
let list: number[] = [1, 2, 3]
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```typescript
let list: Array<number> = [1, 2, 3]
```

### 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 `string` 和 `number` 类型的元组。

```typescript
let x: [string, number]
x = ['hello', 10] // OK
x = [10, 'hello'] // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```typescript
console.log(x[0].substr(1)) // OK
console.log(x[1].substr(1)) // Error, 'number' 不存在 'substr' 方法
```

当访问一个越界的元素，会使用联合类型替代：

```typescript
x[3] = 'world' // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()) // OK, 'string' 和 'number' 都有 toString

x[6] = true // Error, 布尔不是(string | number)类型
```

联合类型是高级主题，我们会在以后的章节里讨论它。

**注意**：自从 TyeScript 3.1 版本之后，访问越界元素会报错，我们不应该再使用该特性。

### 枚举

`enum` 类型是对 JavaScript 标准数据类型的一个补充。 像 C# 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```

默认情况下，从 `0` 开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 `1` 开始编号：

```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green
```

或者，全部都采用手动赋值：

```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为 2，但是不确定它映射到 Color 里的哪个名字，我们可以查找相应的名字：

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName)  // 显示'Green'因为上面代码里它的值是2
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

### any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自**用户输入或第三方代码库**。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 `any` 类型来标记这些变量：

```typescript
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false // 也可以是个 boolean
```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。并且当你只知道一部分数据的类型时，`any` 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```typescript
let list: any[] = [1, true, 'free']

list[1] = 100
```

就是什么类型都行，当你无法确认在处理什么类型时可以用这个。

但要慎重使用，用多了就失去使用 Ts 的意义。

### void

某种程度上来说，`void` 类型像是与 `any` 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```typescript
function warnUser(): void {
  console.log('This is my warning message')
}

```

声明一个 `void` 类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`：

```typescript
let unusable: void = undefined
```

### null 和 undefined

TypeScript 里，`undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`。 和 `void` 相似，它们的本身的类型用处不是很大：

```typescript
let u: undefined = undefined
let n: null = null
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。

然而，当你指定了 `--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自，这能避免 很多常见的问题。 也许在某处你想传入一个 `string` 或 `null` 或 `undefined`，你可以使用联合类型 `string | null | undefined`。 再次说明，稍后我们会介绍联合类型。

### never

`never` 类型表示的是那些永不存在的值的类型。 例如， `never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never` 类型，当它们被永不为真的类型保护所约束时。

`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 `never` 的子类型或可以赋值给`never` 类型（除了 `never` 本身之外）。 即使 `any` 也不可以赋值给 `never`。

具体的行为是：

- throw new Error(message)
- return error("Something failed")
- while (true) {} // 存在无法达到的终点

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```

### object

`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null`或`undefined` 之外的类型。

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 `API`。例如：

```typescript
declare function create(o: object | null): void
// 可以直接类型声明，后续其他的函数就可以直接调用
// declare 声明相当于告诉 TypeScript 编译器，这儿有一个 create 函数，它的参数和返回值是怎样的，而 create 函数的实现并不是它关心的。
// 举一个 declare 的使用场景，比如你引入了一个 myLib 的库，这个库并没有任何 TypeScript 定义文件，但有一个全局的 myLib 变量可以使用。如果这个时候你在你的 TypeScript 文件中使用它，可以去这样声明它
// declare var myLib

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create('string') // Error
create(false) // Error
create(undefined) // Error
```

### 类型断言 🌟

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript 会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：

```typescript
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
```

另一个为 `as` 语法：

```typescript
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，**当你在 TypeScript 里使用 JSX 时，只有 `as` 语法断言是被允许的。**

使用例子有：

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

如果你访问长度将会报错，而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，此时需要断言才不会报错：

```tsx
function getLength(something: string | number): number {
  return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.

function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
```

vue3 应用例子：

```tsx
import type { PropType, ExtractPropTypes } from "vue";
export type SplitterOrientation = "vertical" | "horizontal";

export const splitterProps = {
  /**
   * 可选，指定 Splitter中窗格的方向，默认水平分割。
   */
  orientation: {
    type: String as PropType<SplitterOrientation>, // Vue 对定义了 type 的 prop 执行运行时验证。要将这些类型提供给 TypeScript，我们需要使用 PropType 强制转换构造函数，这样的话 String 会强制遵守为 "vertical" | "horizontal"
    default: "horizontal",
  },
  // 如果 type 不是复杂的类型，则不需要使用 PropType 转换
   /**
   * 分隔条大小
   */
  splitBarSize: {
    type: String,
    required: true,
  },
} as const;

export type SplitterProps = ExtractPropTypes<typeof splitterProps>;

```

vue3  https://blog.csdn.net/ZY_FlyWay/article/details/112695221

#### 非空断言

在上下文当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!`可以用于断言操作对象是否 `null` 和非 `undefined` 类型。**具体而言，x! 将 x 值域中排除 null 和 undefined。**

#### 确定赋值断言

## 变量声明

`let` 和 `const` 是 JavaScript 里相对较新的变量声明方式。`let` 在很多方面与 `var` 是相似的，但是可以帮助大家避免在 JavaScript 里常见一些问题。`const` 是对 `let` 的一个增强，它能阻止对一个变量再次赋值。

因为 TypeScript 是 JavaScript 的超集，所以它本身就支持 `let` 和 `const`。 下面我们会详细说明这些新的声明方式以及为什么推荐使用它们来代替 `var`。

 如果你已经对 `var` 声明的怪异之处了如指掌，那么你可以轻松地略过这节。

 ### var 声明

在 ES5 的时代，我们都是通过 `var` 关键字定义JavaScript 变量：

```javascript
var a = 10
```

大家都能理解，这里定义了一个名为 `a` 值为 `10` 的变量。

我们也可以在函数内部定义变量：

```javascript
function f() {
  var message = 'Hello World!'

  return message
}
```

并且我们也可以在其它函数内部访问相同的变量：

```javascript
function f() {
  var a = 10
  return function g() {
    var b = a + 1
    return b
  }
}

var g = f()
g() // returns 11
```

上面的例子是一个典型的闭包场景，`g` 可以获取到 `f` 函数里定义的 `a` 变量。 每当 `g` 被调用时，它都可以访问到 `f` 里的 `a` 变量。 即使当 `g` 在 `f` 已经执行完后才被调用，它仍然可以访问 `a`。

#### 作用域规则

`var` 声明有些奇怪的作用域规则。 看下面的例子：

```javascript
function f(shouldInitialize) {
  if (shouldInitialize) {
    var x = 10
  }

  return x
}

f(true)  // returns '10'
f(false) // returns 'undefined'
```

有些同学可能要多看几遍这个例子。 变量 `x` 是定义在 `if` 语句里面，但是我们却可以在语句的外面访问它。 这是因为 `var` 声明的作用域是函数作用域，函数参数也使用函数作用域。

这些作用域规则可能会引发一些错误。 其中之一就是，多次声明同一个变量并不会报错：

```javascript
function sumMatrix(matrix) {
  var sum = 0
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i]
    for (var i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }
  
  return sum
}
```

这里很容易看出一些问题，里层的 `for` 循环会覆盖变量 `i`，因为所有 `i` 都引用相同的函数作用域内的变量。 有经验的开发者们很清楚，这些问题可能在代码审查时漏掉，引发无穷的麻烦。

#### 捕获变量怪异之处

猜一下下面的代码会返回什么：

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i)
  }, 100 * i)
}
```

答案是，`setTimeout` 会在若干毫秒的延时后执行一个函数（等待其它代码执行完毕）：

``` javascript
10
10
10
10
10
10
10
10
10
10
```

很多 JavaScript 程序员对这种行为已经很熟悉了，但如果你很不解也没有关系，因为你并不是一个人。 大多数人期望输出结果是这样：

```javascript
0
1
2
3
4
5
6
7
8
9
```

> 我们传给 `setTimeout` 的每一个函数表达式实际上都引用了相同作用域里的同一个 `i`。

让我们花点时间思考一下这是为什么。 `setTimeout` 在若干毫秒后执行一个函数，并且是在 `for` 循环结束后。`for` 循环结束后，`i` 的值为 `10`。 所以当函数被调用的时候，它会打印出 `10`。

一个通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时 `i` 的值：

```javascript
for (var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i)
    }, 100 * i)
  })(i)
}
```

### let 声明

现在你已经知道了 `var` 存在一些问题，这恰好说明了为什么用 `let` 语句来声明变量。 除了名字不同外， `let` 与 `var` 的写法一致：

```javascript
let hello = 'Hello!'
```

主要的区别不在语法上，而是语义，我们接下来会深入研究。

#### 块作用域

当用 `let` 声明一个变量，它使用的是块作用域。 不同于使用 `var` 声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或 `for` 循环之外是不能访问的。

```typescript
function f(input: boolean) {
  let a = 100

  if (input) {
    // OK: 仍然能访问到 a
    let b = a + 1
    return b
  }

  // Error: 'b' 在这里不存在
  return b
}
```

这里我们定义了 2 个变量 `a` 和 `b`。 `a` 的作用域是 `f` 函数体内，而 `b` 的作用域是 `if` 语句块里。

在 `catch` 语句里声明的变量也具有同样的作用域规则。

```typescript
try {
  throw 'Oh no!';
}
catch (e) {
  console.log('Catch it.')
}

// Error: 'e' 在这里不存在
console.log(e)
```

拥有块级作用域的变量的另一个特点是，它们不能在被声明之前读或写。 虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于*暂时性死区*。 它只是用来说明我们不能在 `let` 语句之前访问它们，幸运的是 `TypeScript` 可以告诉我们这些信息。

```typescript
a++ // TS2448: Block-scoped variable 'a' used before its declaration.
let a
```

注意一点，我们仍然可以在一个拥有块作用域变量被声明前获取它。 只是我们不能在变量声明前去调用那个函数。 如果生成代码目标为 ES2015，现代的运行时会抛出一个错误；然而，现今 TypeScript 是不会报错的。

```typescript
function foo() {
  // okay to capture 'a'
  return a
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo()

let a
```

关于*暂时性死区*的更多信息，查看这里 [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let)。

#### 重定义及屏蔽

我们提过使用 `var` 声明时，它不在乎你声明多少次；你只会得到 1 个。

```javascript
function f(x) {
  var x
  var x

  if (true) {
    var x
  }
}
```

在上面的例子里，所有 `x` 的声明实际上都引用一个相同的`x`，并且这是完全有效的代码，但这经常会成为 `bug` 的来源。幸运的是 `let` 的声明就不会这么宽松了。

```typescript
let x = 10
let x = 20 // 错误，不能在 1 个作用域里多次声明 x
```

并不是要求两个均是块级作用域的声明 TypeScript 才会给出一个错误的警告。

```typescript
function f(x) {
  let x = 100 // Error: 干扰参数声明
}

function g() {
  let x = 100
  var x = 100 // Error: 不能同时具有 x 的两个声明
}
```

并不是说块级作用域变量不能用函数作用域变量来声明。 而是块级作用域变量需要在明显不同的块里声明。

```typescript
function f(condition, x) {
  if (condition) {
    let x = 100
    return x
  }

  return x
}

f(false, 0) // returns 0
f(true, 0)  // returns 100
```

在一个嵌套作用域里引入一个新名字的行为称做屏蔽。 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。 例如，假设我们现在用 `let` 重写之前的 `sumMatrix` 函数。

```typescript
function sumMatrix(matrix: number[][]) {
  let sum = 0
  for (let i = 0; i < matrix.length; i++) {
    let currentRow = matrix[i]
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }

  return sum
}
```

这个版本的循环能得到正确的结果，因为内层循环的 `i` 可以屏蔽掉外层循环的 `i`。

通常来讲应该避免使用屏蔽，因为我们需要写出清晰的代码。 同时也有些场景适合利用它，你需要好好权衡一下。

#### 块级作用域变量的获取

每次进入一个作用域时，`let` 会创建一个变量的环境。就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。

回想一下前面 `setTimeout` 的例子，我们最后需要使用立即执行的函数表达式来获取每次 `for` 循环迭代里的状态。 实际上，我们做的是为获取到的变量创建了一个新的变量环境。 这样做挺痛苦的，但是幸运的是，你不必在 `TypeScript` 里这样做了。

当 `let` 声明出现在循环体里时拥有完全不同的行为。不仅是在循环里引入了一个新的变量环境，而且针对每次迭代都会创建这样一个新作用域，这就相当于我们在使用立即执行的函数表达式时做的事。所以在 `setTimeout` 例子里我们仅使用 `let` 声明就可以了。

```typescript
for (let i = 0; i < 10 ; i++) {
  setTimeout(function() {
    console.log(i)
  }, 100 * i)
}
```

会输出与预料一致的结果：

```javascript
0
1
2
3
4
5
6
7
8
9
```

### const 声明

`const` 声明是声明变量的另一种方式。

```typescript
const numLivesForCat = 9
```

它们与 `let` 声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与 `let` 相同的作用域规则，但是不能对它们重新赋值。

这很好理解，它们引用的值是不可变的。

```typescript
const numLivesForCat = 9
const kitty = {
  name: 'Kitty',
  numLives: numLivesForCat
}

// Error
kitty = {
  name: 'Tommy',
  numLives: numLivesForCat
};

// OK
kitty.name = 'Jerry'
kitty.numLives--
```

除非你使用特殊的方法去避免，实际上 `const` 变量的内部状态是可修改的。 幸运的是，`TypeScript` 允许你将对象的成员设置成只读的。接口一章有详细说明。

### let vs. const

现在我们有两种作用域相似的声明方式，我们自然会问到底应该使用哪个。与大多数泛泛的问题一样，答案是：依情况而定。

使用最小特权原则，所有变量除了你计划去修改的都应该使用 `const`。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。使用 `const` 也可以让我们更容易的推测数据的流动。

### 解构

#### 解构数组

最简单的解构莫过于数组的解构赋值了：

```typescript
let input = [1, 2]
let [first, second] = input
console.log(first) // outputs 1
console.log(second) // outputs 2
```

这创建了 2 个命名变量 `first` 和 `second`。 相当于使用了索引，但更为方便：

```typescript
let first = input[0]
let second = input[1]
```

作用于函数参数：

```typescript
let input: [number, number] = [1, 2]

function f([first, second]: [number, number]) {
  console.log(first)
  console.log(second)
}

f(input)
```

你可以在数组里使用 `...` 语法创建剩余变量：

```typescript
let [first, ...rest] = [1, 2, 3, 4]
console.log(first) // outputs 1
console.log(rest) // outputs [ 2, 3, 4 ]
```

你也可以忽略你不关心的尾随元素：

```typescript
let [first] = [1, 2, 3, 4]
console.log(first) // outputs 1
```

或其它元素：

```typescript
let [, second, , fourth] = [1, 2, 3, 4]
```

#### 对象解构

你也可以解构对象：

```typescript
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
}
let { a, b } = o

```

这通过 `o.a` 和 `o.b` 创建了 `a` 和 `b` 。 注意，如果你不需要 `c` 你可以忽略它。

你可以在对象里使用 `...` 语法创建剩余变量：

```typescript
let { a, ...passthrough } = o
let total = passthrough.b + passthrough.c.length
```

#### 属性重命名

你也可以给属性以不同的名字：

```typescript
let { a: newName1, b: newName2 } = o
```

这里的语法开始变得混乱。 你可以将 `a: newName1` 读做 `"a 作为 newName1"`。 方向是从左到右，好像你写成了以下样子：

```typescript
let newName1 = o.a
let newName2 = o.b
```

令人困惑的是，这里的冒号不是指示类型的。 如果你想指定它的类型，仍然需要在其后写上完整的模式。

```typescript
let {a, b}: {a: string, b: number} = o
```

#### 默认值

默认值可以让你在属性为 `undefined` 时使用缺省值：

```typescript
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject
}
```

现在，即使 `b` 为 `undefined` ， `keepWholeObject` 函数的变量 `wholeObject` 的属性 `a` 和 `b` 都会有值。

#### 函数声明

解构也能用于函数声明。 看以下简单的情况：

```typescript
type C = { a: string, b?: number }
function f({ a, b }: C): void {
  // ...
}
```
但是，通常情况下更多的是指定默认值，解构默认值有些棘手。 首先，你需要在默认值之前设置其格式。

```typescript
function f({ a = '', b = 0 } = {}): void {
  // ...
}
f()
```

> 上面的代码是一个类型推断的例子，将在后续章节介绍。

其次，你需要知道在解构属性上给予一个默认或可选的属性用来替换主初始化列表。 要知道 C 的定义有一个 b 可选属性：

```typescript
function f({ a, b = 0 } = { a: '' }): void {
  // ...
}
f({ a: 'yes' }) // OK, 默认 b = 0
f() // OK, 默认 a: '', b = 0
f({}) // Error, 一旦传入参数则 a 是必须的
```

要小心使用解构。 从前面的例子可以看出，就算是最简单的解构表达式也是难以理解的。 尤其当存在深层嵌套解构的时候，就算这时没有堆叠在一起的重命名，默认值和类型注解，也是令人难以理解的。 解构表达式要尽量保持小而简单。

### 展开

```typescript
let first = [1, 2]
let second = [3, 4]
let bothPlus = [0, ...first, ...second, 5]
```
这会令 `bothPlus` 的值为 `[0, 1, 2, 3, 4, 5]`。 展开操作创建了 `first` 和 `second的` 一份浅拷贝。 它们不会被展开操作所改变。

你还可以展开对象：

```typescript
let defaults = { food: 'spicy', price: '$10', ambiance: 'noisy' }
let search = { ...defaults, food: 'rich' }
```

search的值为 `{ food: 'rich', price: '$10', ambiance: 'noisy' }`。 对象的展开比数组的展开要复杂的多。像数组展开一样，它是从左至右进行处理，但结果仍为对象。这就意味着出现在展开对象后面的属性会覆盖前面的属性。因此，如果我们修改上面的例子，在结尾处进行展开的话：

```typescript
let defaults = { food: 'spicy', price: '$10', ambiance: 'noisy' }
let search = { food: 'rich', ...defaults }
```

那么，`defaults` 里的 `food` 属性会重写 `food: 'rich'`，在这里这并不是我们想要的结果。

## 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

### 接口初探

下面通过一个简单示例来观察接口是如何工作的：

```typescript
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
```

类型检查器会查看 `printLabel` 的调用。`printLabel` 有一个参数，并要求这个对象参数有一个名为 `label` 类型为 `string` 的属性。 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，以及其类型是否匹配。 然而，有些时候 TypeScript  却并不会这么宽松（对对象字面量的检查比较严格），我们下面会稍做讲解。

下面我们重写上面的例子，这次使用接口来描述：必须包含一个`label` 属性且类型为 `string`：

```typescript
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = {size: 10, label: 'Size 10 Object'}
printLabel(myObj)
```

`LabelledValue` 接口就好比一个名字，用来描述上面例子里的结构。 它代表了有一个 `label` 属性且类型为`string` 的对象。 需要注意的是，我们在这里并不能像在其它语言里一样，说传给 `printLabel` 的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。(ps：java 中需要实现这个接口)

还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

### 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。例如给函数传入的参数对象中只有部分属性赋值了。

```typescript
interface Square {
  color: string,
  area: number
}

interface SquareConfig {
  color?: string
  width?: number
}

function createSquare (config: SquareConfig): Square {
  let newSquare = {color: 'white', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({color: 'black'})
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将 `createSquare` 里的 `color` 属性名拼错，就会得到一个错误提示：

```typescript
interface Square {
  color: string,
  area: number
}

interface SquareConfig {
   color?: string;
   width?: number;
}
 
function createSquare(config: SquareConfig): Square {
   let newSquare = {color: 'white', area: 100}
   if (config.clor) {
     // Error: 属性 'clor' 不存在于类型 'SquareConfig' 中
     newSquare.color = config.clor
   }
   if (config.width) {
     newSquare.area = config.width * config.width
   }
   return newSquare
 }
 
 let mySquare = createSquare({color: 'black'})
```

### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:

```typescript
interface Point {
  readonly x: number
  readonly y: number
}
```

你可以通过赋值一个对象字面量来构造一个 `Point`。 赋值后，`x` 和 `y` 再也不能被改变了。

```typescript
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // error!
```

TypeScript 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```typescript
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!
```

上面代码的最后一行，可以看到就算把整个 `ReadonlyArray` 赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：

```typescript
a = ro as number[]
```

#### readonly vs const

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用 `readonly`。

一个应用例子，可以通过 as 把对象断言为 const。

```tsx
import type { CSSProperties, ExtractPropTypes, PropType, h } from 'vue'
export const toastProps = {
  /**
   * 必选，消息内容数组，Message 对象定义见下文。
   */
  value: {
    type: Array as PropType<Message[]>,
    required: true,
    default: () => []
  },
  /**
   * 可选，超时时间，超时后自动消失，鼠标悬停可以阻止消失，单位毫秒。
   *
   * @description 普通、成功、提示类默认为 5000 毫秒，错误、警告类默认为 10000 毫秒。
   */
  life: {
    type: Number,
    default: null
  },
  /**
   * 可选，超时时间模式，预设值为 global 和 single 。
   *
   * @description
   * 默认为 global，所有消息使用 life 或群组第一个消息的预设超时时间；
   * 设置为 single 时，每个消息使用自身的超时时间，参见 Message 中的 life 定义。
   *
   * @default 'global'
   */
  lifeMode: {
    type: String as PropType<IToastLifeMode>,
    default: 'global'
  },
  /**
   * 可选，是否常驻，默认自动关闭。
   *
   * @default false
   */
  sticky: {
    type: Boolean,
    default: false
  },
  /**
   * 可选，样式。
   */
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * 可选，类名。
   */
  styleClass: {
    type: String
  },
  onCloseEvent: {
    type: Function as PropType<(message: Message) => void>
  },
  onValueChange: {
    type: Function as PropType<(restMessages: Message[]) => void>
  }
} as const // 这样就可以看到 ToastProps 把每个属性都设为 readonly 类型，

export type ToastProps = ExtractPropTypes<typeof toastProps>
```

### 额外的属性检查

我们在第一个例子里使用了接口，TypeScript 让我们传入 `{ size: number; label: string; }` 到仅期望得到 `{ label: string; }` 的函数里, 并且我们已经学过了可选属性。

然而，天真地将这两者结合的话就会像在 JavaScript 里那样搬起石头砸自己的脚。 比如，拿 `createSquare` 例子来说：

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare (config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: 'white', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}


let mySquare = createSquare({ colour: 'red', width: 100 })
```

注意传入 `createSquare` 的参数拼写为 `colour` 而不是 `color`。 在 JavaScript 里，这会默默地失败。

你可能会争辩这个程序已经正确地类型化了，因为 `width` 属性是兼容的，不存在 `color` 属性，而且额外的 `colour` 属性是无意义的。

然而，TypeScript 会认为这段代码可能存在 bug。 对象字面量会被特殊对待而且会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

```typescript
// error: 'colour' 不存在于类型 'SquareConfig' 中
let mySquare = createSquare({ colour: 'red', width: 100 })
```

绕开这些检查非常简单。 最简便的方法是使用类型断言：

```typescript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```

然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果 `SquareConfig` 带有上面定义的类型的 `color` 和 `width` 属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：

```typescript
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
```

我们稍后会讲到索引签名，但在这我们要表示的是`SquareConfig` 可以有任意数量的属性，并且只要它们不是 `color` 和 `width`，那么就无所谓它们的类型是什么。

还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为 `squareOptions` 不会经过额外属性检查，所以编译器不会报错。

```typescript
let squareOptions = { colour: 'red', width: 100 }
let mySquare = createSquare(squareOptions)
```

要留意，在像上面一样的简单代码里，**你可能不应该去绕开这些检查**。 对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大多数额外属性检查错误是真正的bug。也就是说你遇到了额外类型检查出的错误，你应该去审查一下你的类型声明。 在这里，如果支持传入 `color` 或 `colour` 属性到 `createSquare`，你应该修改 `SquareConfig` 定义来体现出这一点。

### 函数类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean
}
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```typescript
let mySearch: SearchFunc
mySearch = function(source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1
}
```

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配（保证参数类型和参数个数相同即可)。 比如，我们使用下面的代码重写上面的例子：

```typescript
let mySearch: SearchFunc
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1
}
```

函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，TypeScript 的类型系统会推断出参数类型，因为函数直接赋值给了  `SearchFunc` 类型变量。 函数的返回值类型是通过其返回值推断出来的（此例是 `false` 和 `true`）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与 `SearchFunc` 接口中的定义不匹配。

```typescript
let mySearch: SearchFunc
mySearch = function(src, sub) {
  let result = src.search(sub)
  return result > -1
}
```

### 可索引的类型

与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如 `a[10]` 或 `ageMap['daniel']`。 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 让我们看一个例子：

```typescript
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]
```

上面例子里，我们定义了 `StringArray` 接口，它具有索引签名。 这个索引签名表示了当用 `number` 去索引 `StringArray` 时会得到 `string` 类型的返回值。

TypeScript 支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，**但是数字索引的返回值必须是字符串索引返回值类型的子类型**。 这是因为当使用 `number` 来索引时，JavaScript 会将它转换成`string` 然后再去索引对象。 也就是说用 `100`（一个 `number`）去索引等同于使用`'100'`（一个 `string` ）去索引，因此两者需要保持一致。


```typescript
class Animal {
  name: string
}
class Dog extends Animal {
  breed: string
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  [x: number]: Animal
  [x: string]: Dog
}
```

字符串索引签名能够很好的描述 `dictionary` 模式，并且它们也会确保所有属性与其返回值类型相匹配。 因为字符串索引声明了 `obj.property` 和 `obj['property']` 两种形式都可以。 下面的例子里， `name` 的类型与字符串索引类型不匹配，所以类型检查器给出一个错误提示：

```typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
```

最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：

```typescript
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
myArray[2] = 'Mallory'; // error!
```

应用例子：

```js
const obj: { [index: string]: number } = {
    y: date.getFullYear(), // year，note: use getFullYear
    M: date.getMonth() + 1, // month，from 0 - 11
    d: date.getDate(), // date
    q: Math.floor((date.getMonth() + 3) / 3), // season
    w: date.getDay(), // 0 - 6
    H: date.getHours(), // 24 hour
    h: date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12 hour
    m: date.getMinutes(),
    s: date.getSeconds(),
    S: date.getMilliseconds()
  }

for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function(m) {
      `let val = obj[i] + '' `
      if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[Number(val)]

      // padded zeros in front of the value such as month, day.
      for (let j = 0; j < m.length - val.length; j++) {
        val = '0' + val
      }
    
      // handle "yy -- 2019 --> 19"
      return m.length == 1 ? val : val.substring(val.length - m.length)
    })
  }
```

### 类类型

#### 实现接口

与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```typescript
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) { }
}
```

你也可以在接口中描述一个方法，在类里实现它，如同下面的 `setTime` 方法一样：

```typescript
interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) { }
}
```

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

#### 类静态部分与实例部分的区别

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

```typescript
interface ClockConstructor {
  new (hour: number, minute: number)
}

// error
class Clock implements ClockConstructor {
  currentTime: Date
  constructor(h: number, m: number) { }
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。`constructor` 存在于类的静态部分，所以不在检查的范围内。

看下面的例子，我们定义了两个接口，  `ClockConstructor` 为构造函数所用和 `ClockInterface` 为实例方法所用。 为了方便我们定义一个构造函数 `createClock`，它用传入的类型创建实例。

```typescript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}
interface ClockInterface {
  tick()
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('beep beep')
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock')
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)
```

因为 `createClock` 的第一个参数是 `ClockConstructor` 类型，在 `createClock(AnalogClock, 7, 32)` 里，会检查 `AnalogClock` 是否符合构造函数签名。

### 继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```typescript
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = {} as Square
square.color = 'blue'
square.sideLength = 10
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```typescript
interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = {} as Square
square.color = 'blue'
square.sideLength = 10
square.penWidth = 5.0
```

### 混合类型

先前我们提过，接口能够描述 JavaScript 里丰富的类型。 因为 JavaScript 其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象可以同时作为函数和对象使用，并带有额外的属性。

```typescript
interface Counter {
  (start: number): string // 不带有名称，针对 Counter 做声明
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = (function (start: number) { }) as Counter
  counter.interval = 123
  counter.reset = function () { }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

在使用 JavaScript 第三方库的时候，你可能需要像上面那样去完整地定义类型。比如要用 ts 重构`axios` 库就是一个很好的例子。

```js
export interface Axios {
  // Axois 类
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {  // 混合类型
  (config: AxiosRequestConfig): AxiosPromise
}
```

### 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的 `private` 和 `protected` 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。例：

```typescript
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// Error：“ImageC”类型缺少“state”属性。
class ImageC implements SelectableControl {
  select() { }
}
```
在上面的例子里，`SelectableControl` 包含了 `Control` 的所有成员，包括私有成员 `state`。 因为 `state` 是私有成员，所以只能够是 `Control` 的子类们才能实现 `SelectableControl` 接口。 因为只有 `Control` 的子类才能够拥有一个声明于`Control` 的私有成员 `state`，这对私有成员的兼容性是必需的。

在 `Control` 类内部，是允许通过 `SelectableControl` 的实例来访问私有成员 `state` 的。 实际上，`SelectableControl` 接口和拥有 `select` 方法的 `Control` 类是一样的。`Button`和 `TextBox` 类是 `SelectableControl` 的子类（因为它们都继承自`Control` 并有 `select` 方法），但 `ImageC` 类并不是这样的。

## 类

对于传统的 JavaScript 程序我们会使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员使用这些语法就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从 ECMAScript 2015，也就是 ES6 开始， JavaScript 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行，而不需要等到下个 JavaScript 版本。

### 基本示例

下面看一个使用类的例子：

```typescript
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')
```

如果你使用过 C# 或 Java，你会对这种语法非常熟悉。 我们声明一个 `Greeter` 类。这个类有 3 个成员：一个叫做 `greeting` 的属性，一个构造函数和一个 `greet` 方法。

你会注意到，我们在引用任何一个类成员的时候都用了 `this`。 它表示我们访问的是类的成员。

最后一行，我们使用 `new` 构造了 `Greeter` 类的一个实例。它会调用之前定义的构造函数，创建一个 `Greeter` 类型的新对象，并执行构造函数初始化它。

### 继承

在 TypeScript 里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

看下面的例子：

```typescript
class Animal {
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)
```

这个例子展示了最基本的继承：类从基类中继承了属性和方法。 这里，`Dog` 是一个 派生类，它派生自 `Animal` 基类，通过 `extends` 关键字。 派生类通常被称作*子类*，基类通常被称作*超类*。

因为 `Dog` 继承了 `Animal` 的功能，因此我们可以创建一个 `Dog` 的实例，它能够 `bark()` 和 `move()`。

下面我们来看个更加复杂的例子。

```typescript
class Animal {
  name: string
  constructor(name: string) { 
    this.name = name
  }
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) { 
    super(name)
  }
  move(distance: number = 5) {
    console.log('Slithering...')
    super.move(distance)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 45) {
    console.log('Galloping...')
    super.move(distance)
  }
}

let sam = new Snake('Sammy')
let tom: Animal = new Horse('Tommy')

sam.move()
tom.move(34)
```

这个例子展示了一些上面没有提到的特性。 这一次，我们使用 `extends` 关键字创建了 Animal的两个子类：`Horse` 和 `Snake`。

与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 `super()`，它会执行基类的构造函数。 而且，在构造函数里访问 `this` 的属性之前，我们 一定要调用 `super()`。 这个是 TypeScript 强制执行的一条重要规则。相当于 super.constructor()，调用 super() 会调用父类构造函数，并将返回的实例赋值给 this（子类）。 `super.constructor.call(this, ...args)`

这个例子演示了如何在子类里可以重写父类的方法。`Snake`类和 `Horse` 类都创建了 `move` 方法，它们重写了从 `Animal` 继承来的 `move` 方法，使得 `move` 方法根据不同的类而具有不同的功能。注意，即使 `tom` 被声明为 `Animal` 类型，但因为它的值是 `Horse`，调用 `tom.move(34)` 时，它会调用 `Horse` 里重写的方法。

```shell
Slithering...
Sammy moved 5m.
Galloping...
Tommy moved 34m.
```

### 公共，私有与受保护的修饰符

####  默认为 public

在上面的例子里，我们可以自由的访问程序里定义的成员。 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 `public` 来做修饰；例如，C# 要求必须明确地使用 `public` 指定成员是可见的。 在 TypeScript 里，成员都默认为 `public`。

你也可以明确的将一个成员标记成 `public`。 我们可以用下面的方式来重写上面的 `Animal` 类：

```typescript
class Animal {
  public name: string
  public constructor(name: string) {
    this.name = name
  }
  public move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}
```

#### 理解 private

当成员被标记成 `private` 时，它就不能在声明它的类的外部访问。比如：

```typescript
class Animal {
  private name: string
  constructor(name: string) { 
    this.name = name
  }
}

new Animal('Cat').name // 错误: 'name' 是私有的.
```

TypeScript 使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

然而，当我们比较带有 `private` 或 `protected` 成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 `private` 成员，那么只有当另外一个类型中也存在这样一个 `private` 成员，并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 `protected` 成员也使用这个规则。

下面来看一个例子，更好地说明了这一点：

```typescript
class Animal {
  private name: string
  constructor(name: string) { 
    this.name = name 
  }
}

class Rhino extends Animal {
  constructor() { 
    super('Rhino')
  }
}

class Employee {
  private name: string
  constructor(name: string) { 
    this.name = name
  }
}

let animal = new Animal('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')

animal = rhino
animal = employee // 错误: Animal 与 Employee 不兼容.
```

这个例子中有 `Animal` 和 `Rhino` 两个类， `Rhino` 是 `Animal` 类的子类。 还有一个 `Employee` 类，其类型看上去与 `Animal` 是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。 因为 `Animal` 和 `Rhino` 共享了来自 `Animal` 里的私有成员定义 `private name: string`，因此它们是兼容的。然而 `Employee` 却不是这样。当把 `Employee` 赋值给 `Animal` 的时候，得到一个错误，说它们的类型不兼容。尽管 `Employee` 里也有一个私有成员 `name`，但它明显不是 `Animal` 里面定义的那个。

#### 理解 protected

`protected` 修饰符与 `private` 修饰符的行为很相似，但有一点不同，`protected`成员在派生类中仍然可以访问。例如：

```typescript
class Person {
  protected name: string
  constructor(name: string) { 
    this.name = name 
  }
}

class Employee extends Person {
  private department: string

  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }
  
  getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee('Howard', 'Sales')
console.log(howard.getElevatorPitch())
console.log(howard.name) // error
```

注意，我们不能在 `Person` 类外使用 `name`，但是我们仍然可以通过 `Employee` 类的实例方法访问，因为 `Employee` 是由 `Person`  派生而来的。

构造函数也可以被标记成 `protected`。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如：

```typescript
class Person {
  protected name: string
  protected constructor(name: string) {
    this.name = name
  }
}

// Employee 能够继承 Person
class Employee extends Person {
  private department: string

  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee('Howard', 'Sales')
let john = new Person('John') // 错误: 'Person' 的构造函数是被保护的.
```

### readonly 修饰符


你可以使用 `readonly` 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

```typescript
class Person {
  readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

let john = new Person('John')
john.name = 'peter'
```

#### 参数属性

在上面的例子中，我们必须在 `Person` 类里定义一个只读成员 `name` 和一个参数为 `name` 的构造函数，并且立刻将 `name` 的值赋给 `this.name`，这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 `Person` 类的修改版，使用了参数属性：

```typescript
class Person {
  constructor(readonly name: string) {
  }
}
```

注意看我们是如何舍弃参数 `name`，仅在构造函数里使用 `readonly name: string` 参数来创建和初始化 `name` 成员。 我们把声明和赋值合并至一处。

参数属性通过给构造函数参数前面添加一个访问限定符来声明。使用 `private` 限定一个参数属性会声明并初始化一个私有成员；对于 `public` 和 `protected` 来说也是一样。

（ps：不建议使用参数属性，因为这样不够清晰，特别是一个庞大的类。）

### 存取器

`TypeScript` 支持通过 `getters/setters` 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

下面来看如何把一个简单的类改写成使用 `get` 和 `set`。 首先，我们从一个没有使用存取器的例子开始。

```typescript
class Employee {
  fullName: string
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName)
}
```

我们可以设置 `fullName`，因为它是 `public` 的，<u>有时候当我们去修改它的时候触发一些额外逻辑</u>，存取器就派上用场了。

下面这个版本里，我们先检查用户密码是否正确，然后再允许其修改员工信息。我们把对 `fullName` 的直接访问改成了可以检查密码的 `set` 方法。 我们也加了一个 `get` 方法，让上面的例子仍然可以工作。

```typescript
let passcode = 'secret passcode'

class Employee {
  private _fullName: string

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (passcode && passcode == 'secret passcode') {
      this._fullName = newName
    }
    else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName)
}
```

我们可以修改一下密码，来验证一下存取器是否是工作的。当密码不对时，会提示我们没有权限去修改员工。

对于存取器有下面几点需要注意的：

首先，存取器要求你将编译器设置为输出 ECMAScript 5 或更高（ps：可以查看 tsc index.ts --target es5 编译后的代码，内部使用了 Object.defineProperty 进行改写的）。 不支持降级到 ECMAScript 3。其次，只带有 `get` 不带有 `set` 的存取器自动被推断为 `readonly`。这在从代码生成 `.d.ts` 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。

### 静态属性

到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。 在这个例子里，我们使用 `static` 定义 `origin`，因为它是所有网格都会用到的属性。 每个实例想要访问这个属性的时候，都要在 `origin` 前面加上类名。 如同在实例属性上使用 `this.xxx` 来访问属性一样，这里我们使用 `Grid.xxx` 来访问静态属性。

```typescript
class Grid {
  static origin = {x: 0, y: 0}

  scale: number

  constructor (scale: number) {
    this.scale = scale
  }

  calculateDistanceFromOrigin(point: {x: number; y: number}) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
  }
}

let grid1 = new Grid(1.0)  // 1x scale
let grid2 = new Grid(5.0)  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 3, y: 4}))
console.log(grid2.calculateDistanceFromOrigin({x: 3, y: 4}))
```

### 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。<u>>不同于接口，抽象类可以包含成员的实现细节</u>。 `abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```typescript
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earth...')
  }
}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 `abstract` 关键字并且可以包含访问修饰符。

```typescript
abstract class Department {
  name: string

  constructor(name: string) {
     this.name = name
  }

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department // 允许创建一个对抽象类型的引用
department = new Department() // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printName()
department.printMeeting()
department.generateReports() // 错误: 方法在声明的抽象类中不存在，需要在前面声明改为派生类类型
```

### 高级技巧

#### 构造函数

当你在 TypeScript 里声明了一个类的时候，实际上同时声明了很多东西。首先就是类的*实例*的类型。

```typescript
class Greeter {
  static standardGreeting = 'Hello, there'
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter: Greeter
greeter = new Greeter('world')
console.log(greeter.greet())
```

这里，我们写了 `let greeter: Greeter`，意思是 `Greeter` 类的实例的类型是 `Greeter`。 这对于用过其它面向对象语言的程序员来讲已经是老习惯了。

我们也创建了一个叫做*构造函数的值*。 这个函数会在我们使用 `new` 创建类实例的时候被调用。 下面我们来看看，上面的代码被编译成JavaScript后是什么样子的：

```javascript
var Greeter = /** @class */ (function () {
  function Greeter(message) {
    this.greeting = message;
  }
  Greeter.prototype.greet = function () {
    return 'Hello, ' + this.greeting;
  };
  Greeter.standardGreeting = 'Hello, there';
  return Greeter;
}());
var greeter;
greeter = new Greeter('world');
console.log(greeter.greet());
```

上面的代码里，`var Greeter` 将被构造函数赋值。 当我们调用 `new` 并执行了这个函数后，便会得到一个类的实例。**这个构造函数也包含了类的所有静态属性。 换个角度说，我们可以认为类具有*实例部分*与*静态部分*这两个部分**。

让我们稍微改写一下这个例子，看看它们之间的区别：

```typescript
class Greeter {
  static standardGreeting = 'Hello, there'
  
  greeting: string

  constructor(message?: string) {
    this.greeting = message
  }

  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}

let greeter: Greeter
greeter = new Greeter()
console.log(greeter.greet())

let greeterMaker: typeof Greeter
greeterMaker.standardGreeting = 'Hey there'

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())
```

这个例子里， `greeter1` 与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与我们之前看到的一样。

再之后，我们直接使用类。 我们创建了一个叫做 `greeterMaker` 的变量。这个变量保存了这个类或者说保存了类构造函数。 **然后我们使用 `typeof Greeter`，意思是取 `Greeter` 类的类型，而不是实例的类型。**或者更确切的说，"告诉我 `Greeter` 标识符的类型"，也就是构造函数的类型。 **这个类型包含了类的所有静态成员和构造函数**。 之后，就和前面一样，我们在 `greeterMaker` 上使用 `new`，创建 `Greeter` 的实例。

#### 把类当做接口使用

如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```typescript
class Point {
  x: number
  y: number
}

interface Point3d extends Point {
  z: number
}

let point3d: Point3d = {x: 1, y: 2, z: 3}
```

## 函数

函数是 JavaScript 应用程序的基础，它帮助你实现抽象层，模拟类，信息隐藏和模块。在 TypeScript 里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。TypeScript 为 JavaScript 函数添加了额外的功能，让我们可以更容易地使用。

和 JavaScript 一样，TypeScript 函数可以创建有名字的函数和匿名函数。你可以随意选择适合应用程序的方式，不论是定义一系列 API 函数还是只使用一次的函数。

通过下面的例子可以迅速回想起这两种 JavaScript 中的函数：

```javascript
// 命名函数
function add(x, y) {
  return x + y
}

// 匿名函数
let myAdd = function(x, y) { 
  return x + y;
}
```

在 JavaScript 里，函数可以使用函数体外部的变量。 当函数这么做时，我们说它‘捕获’了这些变量。 至于为什么可以这样做以及其中的利弊超出了本文的范围，但是深刻理解这个机制对学习 JavaScript 和 TypeScript 会很有帮助。

### 基本示例

和 JavaScript 一样，TypeScript 函数可以创建有名字的函数和匿名函数。你可以随意选择适合应用程序的方式，不论是定义一系列 API 函数还是只使用一次的函数。

通过下面的例子可以迅速回想起这两种 JavaScript 中的函数：

```javascript
// 命名函数
function add(x, y) {
  return x + y
}

// 匿名函数
let myAdd = function(x, y) { 
  return x + y;
}
```

在 JavaScript 里，函数可以使用函数体外部的变量。 当函数这么做时，我们说它‘捕获’了这些变量。 至于为什么可以这样做以及其中的利弊超出了本文的范围，但是深刻理解这个机制对学习 JavaScript 和 TypeScript 会很有帮助。

```javascript
let z = 100

function addToZ(x, y) {
  return x + y + z
}
```

### 函数类型

#### 为函数定义类型

让我们为上面那个函数添加类型：

```typescript
function add(x: number, y: number): number {
  return x + y
}

let myAdd = function(x: number, y: number): number { 
  return x + y
}
```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。TypeScript 能够根据返回语句自动推断出返回值类型。

#### 书写完整函数类型

现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。

```typescript
let myAdd: (x: number, y: number) => number = 
function(x: number, y: number): number {
  return x + y
}

```

函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。 我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。这个名字只是为了增加可读性。 我们也可以这么写：

```typescript
let myAdd: (baseValue: number, increment: number) => number = 
function(x: number, y: number): number {
  return x + y
}
```

只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

第二部分是返回值类型。 对于返回值，我们在函数和返回值类型之前使用(`=>`)符号，使之清晰明了。 如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 `void` 而不能留空。

函数的类型只是由参数类型和返回值组成的。 函数中使用的捕获变量不会体现在类型里。 实际上，这些变量是函数的隐藏状态并不是组成 API 的一部分。

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

#### 推断类型

尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型：

```typescript
let myAdd = function(x: number, y: number): number { 
  return x + y
}

let myAdd: (baseValue: number, increment: number) => number = 
function(x, y) {
  return x + y
}
```

这叫做“按上下文归类”，是类型推论的一种。它帮助我们更好地为程序指定类型。

### 可选参数和默认参数

TypeScript 里的每个函数参数都是必须的。 这不是指不能传递 `null` 或 `undefined` 作为参数，而是说编译器检查用户是否为每个参数都传入了值。编译器还会假设只有这些参数会被传递进函数。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

```typescript
function buildName(firstName: string, lastName: string) {
    return firstName + ' ' + lastName;
}

let result1 = buildName('Bob')                  // Error, 参数过少
let result2 = buildName('Bob', 'Adams', 'Sr.');  // Error, 参数过多
let result3 = buildName('Bob', 'Adams');         // OK
```

JavaScript 里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是 `undefined`。 在TypeScript 里我们可以在参数名旁使用 `?` 实现可选参数的功能。 比如，我们想让 `lastName` 是可选的：

```typescript
function buildName(firstName: string, lastName?: string): string {
  if (lastName)
    return firstName + ' ' + lastName
  else
    return firstName
}

let result1 = buildName('Bob');  // 现在正常了
let result2 = buildName('Bob', 'Adams', 'Sr.')  // Error, 参数过多
let result3 = buildName('Bob', 'Adams')  // OK
```

可选参数必须跟在必须参数后面。 如果上例我们想让 `firstName` 是可选的，那么就必须调整它们的位置，把 `firstName` 放在后面。

在 TypeScript 里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是 `undefined` 时。 它们叫做有默认初始化值的参数。 让我们修改上例，把`lastName` 的默认值设置为 `"Smith"`。

```typescript
function buildName(firstName: string, lastName = 'Smith'): string {
  return firstName + ' ' + lastName
}

let result1 = buildName('Bob')                  // 返回 "Bob Smith"
let result2 = buildName('Bob', undefined)     // 正常, 同样 "Bob Smith"
let result3 = buildName('Bob', 'Adams', 'Sr.')  // 错误, 参数过多
let result4 = buildName('Bob', 'Adams')        // OK
```

与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 `undefined` 值来获得默认值。 例如，我们重写最后一个例子，让 `firstName` 是带默认值的参数：

```typescript
function buildName(firstName = 'Will', lastName: string): string {
  return firstName + ' ' + lastName
}

let result1 = buildName('Bob')                  // Error, 参数过少
let result2 = buildName('Bob', 'Adams', "Sr.")  // Error, 参数过多
let result3 = buildName('Bob', 'Adams')         // OK， 返回 "Bob Adams"
let result4 = buildName(undefined, 'Adams')     // OK，  返回 "Will Adams"
```

#### 剩余参数

要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在 JavaScript 里，你可以使用 `arguments` 来访问所有传入的参数。

在 TypeScript 里，你可以把所有参数收集到一个变量里：

```typescript
function buildName(firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ')
}

let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie')
```

剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（ `...`）后面给定的名字，你可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：

```typescript
function buildName(firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ')
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName
```

### this

学习如何在 JavaScript 里正确使用 `this` 就好比一场成年礼。由于 TypeScript 是 JavaScript 的超集，TypeScript 程序员也需要弄清 `this` 工作机制并且当有 bug 的时候能够找出错误所在。 幸运的是，TypeScript 能通知你错误地使用了 `this` 的地方。 如果你想了解 JavaScript 里的 this是如何工作的，那么首先阅读 Yehuda Katz 写的 [Understanding JavaScript Function Invocation and "this"](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)。 Yehuda 的文章详细的阐述了 `this` 的内部工作原理，因此我们这里只做简单介绍。

#### this 和箭头函数

JavaScript里，`this` 的值在函数被调用的时候才会指定。 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

下面看一个例子：

```typescript
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
```

可以看到 `createCardPicker` 是个函数，并且它又返回了一个函数。如果我们尝试运行这个程序，会发现它并没有输出而是报错了。 因为 `createCardPicker` 返回的函数里的 `this` 被设置成了 `global` 而不是 `deck` 对象。 因为我们只是独立的调用了 `cardPicker()`。 顶级的非方法式调用会将 `this` 视为 `global`。

为了解决这个问题，我们可以在函数被返回时就绑好正确的`this`。 这样的话，无论之后怎么使用它，都会引用绑定的`deck` 对象。 我们需要改变函数表达式来使用 ECMAScript 6 箭头语法。 箭头函数能保存函数创建时的 `this` 值，而不是调用时的值：

```typescript
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    // 注意：这里使用箭头函数
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
```

#### this 参数🌟

在上述的例子中 `this.suits[pickedSuit]` 的类型为 `any`，这是因为 `this` 来自对象字面量里的函数表达式。 修改的方法是，提供一个显式的 `this` 参数。 `this` 参数是个假的参数，它出现在参数列表的最前面：

```typescript
function f(this: void) {
  // 确保“this”在此独立函数中不可用
}
```

让我们往例子里添加一些接口，`Card` 和 `Deck`，让类型重用能够变得清晰简单些：

```typescript
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]

  createCardPicker (this: Deck): () => Card
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  // NOTE: 函数现在显式指定其被调用方必须是 deck 类型
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
```

现在 TypeScrip t知道 `createCardPicker` 期望在某个 `Deck` 对象上调用。也就是说 `this` 是 `Deck` 类型的，而非 `any`。

#### this 参数在回调函数里

你可以也看到过在回调函数里的 `this` 报错，当你将一个函数传递到某个库函数里稍后会被调用时。 因为当回调被调用的时候，它们会被当成一个普通函数调用，`this` 将为 `undefined`。 稍做改动，你就可以通过 `this` 参数来避免错误。 首先，库函数的作者要指定 `this` 的类型：

```typescript
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void
}
```

`this: void` 意味着 `addClickListener` 期望传入的 `onclick` 方法不需要 `this`

```typescript
interface UIElement {
  addClickListener (onclick: (this: void, e: Event) => void): void
}

class Handler {
  type: string

  onClickBad (this: Handler, e: Event) {
    this.type = e.type
  }
}

let h = new Handler()

let uiElement: UIElement = {
  addClickListener () {
  }
}

uiElement.addClickListener(h.onClickBad) // error!

```

指定了 `this` 类型后，你显式声明 `onClickBad` 必须在 `Handler` 的实例上调用。 然后 TypeScript 会检测到 `addClickListener` 要求函数带有 `this: void`。 改变 `this` 类型来修复这个错误：

```typescript
class Handler {
  type: string;

  onClickBad (this: void, e: Event) {
    console.log('clicked!')
  }
}

let h = new Handler()

let uiElement: UIElement = {
  addClickListener () {
  }
}

uiElement.addClickListener(h.onClickBad)
```

因为 `onClickGood` 指定了 `this` 类型为 `void`，因此传递 `addClickListener` 是合法的。 当然了，这也意味着不能使用 `this.info`。 如果你两者都想要，你不得不使用箭头函数了：

```typescript
class Handler {
  type: string
  onClickGood = (e: Event) => {
    this.type = e.type 
  }
}
```

这是可行的因为箭头函数不会捕获 `this`，所以你总是可以把它们传给期望 `this: void` 的函数。

addClickListener 中 onclick 回调函数不是接受两个参数吗？一个 this、一个 e，但在 onClickBad 只有一个参数 e，这是为什么？

答：这个是 this 参数，它是一个假的参数，它在这里是相当于告诉 TypeScript 编译器，在执行 onClick 回调函数中，这个 this 是空。

1. 假参数的意思是虽然你定义了 this 参数，实际上是没有这个参数的.
2. 定义不写参数是可以兼容接口的，但是调用函数的时候是必须参数要匹配的

### 重载

JavaScript 本身是个动态语言。JavaScript 里函数根据传入不同的参数而返回不同类型的数据的场景是很常见的。


```typescript
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x): any {
  if (Array.isArray(x)) {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pickedCard1 = myDeck[pickCard(myDeck)]; // 这里是没有类型检查和约束的，即传入字符串也可以，可以通过函数重载。
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)

let pickedCard2 = pickCard(15)
console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
```

`pickCard` 方法根据传入参数的不同会返回两种不同的类型。如果传入的是代表纸牌的对象数组，函数作用是从中抓一张牌。如果用户想抓牌，我们告诉他抓到了什么牌。 但是这怎么在类型系统里表示呢。

方法是为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用。 下面我们来重载 `pickCard` 函数。


```typescript
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x: {suit: string; card: number }[]): number
function pickCard(x: number): {suit: string; card: number }

function pickCard(x): any {
  if (Array.isArray(x)) {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)

let pickedCard2 = pickCard(15)
console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
```

这样改变后，重载的 `pickCard` 函数在调用的时候会进行正确的类型检查。

为了让编译器能够选择正确的检查类型，它与 JavaScript 里的处理流程相似。它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。因此，在定义重载的时候，一定要把最精确的定义放在最前面。

注意，`function pickCard(x): any` 并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象数组，另一个接收数字。 以其它参数调用 `pickCard` 会产生错误。

## 泛型

软件工程中，我们不仅要创建定义良好且一致的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

在像 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

比如数组队列，在强类型中，显然` Arrary<T>` 比 `Array[int] `适应性更强。

### 基础示例

下面来创建第一个使用泛型的例子：`identity` 函数。 这个函数会返回任何传入它的值。 你可以把这个函数当成是 `echo` 命令。

不用泛型的话，这个函数可能是下面这样：

```typescript
function identity(arg: number): number {
  return arg
}
```

或者，我们使用 `any` 类型来定义函数：

```typescript
function identity(arg: any): any {
  return arg
}
```

使用 `any` 类型会导致这个函数可以接收任何类型的 `arg` 参数，**但是这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。如果我们传入一个数字**，我们只知道任何类型的值都有可能被返回。

因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。这里，我们使用了*类型变量*，它是一种特殊的变量，只用于表示类型而不是值。

```typescript
function identity<T>(arg: T): T {
  return arg
}

// 或
let identity: <T>(arg: T) => T = function(arg) {
  return arg;
};
```

我们给 `identity` 添加了类型变量 `T`。 `T` 帮助我们捕获用户传入的类型（比如：`number`），之后我们就可以使用这个类型。 之后我们再次使用了 `T` 当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。这允许我们跟踪函数里使用的类型的信息。

我们把这个版本的 `identity` 函数叫做泛型，因为它可以适用于多个类型。 不同于使用 `any`，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。

我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：

```typescript
let output = identity<string>('myString')
```

这里我们明确的指定了 `T` 是 `string` 类型，并做为一个参数传给函数，使用了 `<>` 括起来而不是 `()`。

第二种方法更普遍。利用了*类型推论* -- 即编译器会根据传入的参数自动地帮助我们确定 `T` 的类型：

```typescript
let output = identity('myString')
```

注意我们没必要使用尖括号（`<>`）来明确地传入类型；编译器可以查看 `myString` 的值，然后把 `T` 设置为它的类型。 类型推论帮助我们保持代码精简和高可读性。如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入 `T` 的类型，在一些复杂的情况下，这是可能出现的。

### 使用泛型变量

使用泛型创建像 `identity` 这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型。

看下之前 `identity` 例子：

```typescript
function identity<T>(arg: T): T {
  return arg
}
```

如果我们想打印出 `arg` 的长度。 我们很可能会这样做：

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

如果这么做，编译器会报错说我们使用了 `arg` 的 `.length` 属性，但是没有地方指明 `arg` 具有这个属性。记住，这些类型变量代表的是任意类型，所以使用这个函数的人可能传入的是个数字，而数字是没有 `.length` 属性的。

现在假设我们想操作 `T` 类型的数组而不直接是 `T`。由于我们操作的是数组，所以 `.length` 属性是应该存在的。我们可以像创建其它数组一样创建这个数组：

```typescript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
```

你可以这样理解 `loggingIdentity` 的类型：泛型函数 `loggingIdentity`，接收类型参数 `T` 和参数 `arg`，它是个元素类型是 `T` 的数组，并返回元素类型是`T` 的数组。 如果我们传入数字数组，将返回一个数字数组，因为此时 `T` 的的类型为 `number`。 这可以让我们把泛型变量 `T` 当做类型的一部分使用，而不是整个类型，增加了灵活性。

### 泛型类型

上一节，我们创建了 `identity` 通用函数，可以适用于不同的类型。 在这节，我们研究一下函数本身的类型，以及如何创建泛型接口。

泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: <T>(arg: T) => T = identity
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: <U>(arg: U) => U = identity
```

我们还可以**使用带有调用签名的对象字面量来定义泛型函数**：（对象字面量直接作为类型声明）

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: {<T>(arg: T): T} = identity
```

这引导我们去写第一个泛型接口了。我们把上面例子里的对象字面量拿出来做为一个接口：

```typescript
interface GenericIdentityFn {
  <T>(arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn = identity
```

我们甚至可以把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型（比如： `Dictionary<string>` 而不只是` Dictionary`）。这样接口里的其它成员也能知道这个参数的类型了。


```typescript
interface GenericIdentityFn<T> {
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn<number> = identity
```

注意，我们的示例做了少许改动。 不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分。 当我们使用 `GenericIdentityFn` 的时候，还得传入一个类型参数来指定泛型类型（这里是：`number`），锁定了之后代码里使用的类型。对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的。

除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间。

### 泛型类

泛型类看上去与泛型接口差不多。 泛型类使用（ `<>`）括起泛型类型，跟在类名后面。

```typescript
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y 
}
```

`GenericNumber` 类的使用是十分直观的，并且你可能已经注意到了，没有什么去限制它只能使用 `number` 类型。 也可以使用字符串或其它更复杂的类型。

```typescript
let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ''
stringNumeric.add = function(x, y) { 
  return x + y
}

console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))
```

与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。

我们在类那节说过，类有两部分：静态部分和实例部分。**泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型**。

### 泛型约束🌟

我们有时候想操作某类型的一组值，并且我们知道这组值具有什么样的属性。在 `loggingIdentity` 例子中，我们想访问 `arg` 的 `length` 属性，但是编译器并不能证明每种类型都有 `length` 属性，所以就报错了。

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

相比于操作 `any` 所有类型，我们想要限制函数去处理任意带有 `.length` 属性的所有类型。 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。为此，我们需要列出对于 `T` 的约束要求。

我们定义一个接口来描述约束条件，创建一个包含 `.length` 属性的接口，**使用这个接口和 `extends` 关键字来实现约束**：

```typescript
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) // OK
  return arg
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```typescript
loggingIdentity(3);  // Error
```

我们需要传入符合约束类型的值，必须包含必须的属性：

```typescript
loggingIdentity({length: 10, value: 3}) // OK
```

类类型

```js
class Beekeeper {
  hasMark: boolean;
}

class LionKeeper {
  nametag: string;
}

class Animal {
  numLengs: number;
}

class Bee extends Animal {
  keeper: Beekeeper;
}

class Lion extends Animal {
  keeper: LionKeeper;
}

class Foo {
  keeper: Beekeeper
}

function createInstance<T extends Animal>(c: new () => T): T {
  return new c();
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMark
createInstance(Foo).keeper.hasMark // error, Foo 没有继承 Animal
```

### 泛型工具类型

#### typeof

在 TypeScript 中，`typeof` 操作符可以用来获取一个变量声明或对象的类型。

```tsx
interface Person {
  name: string;
  age: number
}

const sem: Person = { name: 'semlinker', age: 33};
type Sem = typeof sem; // -> Person

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
```

#### keyof

`keyof` 操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

```ts
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
type k3 = keyof { [x: string]: Person }; // string | number
```

- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#support-number-and-symbol-named-properties-with-keyof-and-mapped-types

在 TypeScript 中支持两种索引类型，数字索引和字符串索引：

```ts
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string;
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string;
}
```

为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。所以 `keyof { [x: string]: Person }` 的结果会返回 `string | number`。

#### infer

#### extends

#### Partial

## 类型推断🌟

这节介绍 TypeScript 里的类型推断。即，类型是在哪里如何被推断的。

### 基础

TypeScript 里，在有些没有明确指出类型的地方，类型推断会帮助提供类型。如下面的例子：

```typescript
let x = 3
```

变量 `x` 的类型被推断为数字。 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

大多数情况下，类型推断是直截了当地。后面的小节，我们会浏览类型推断时的细微差别。

### 最佳通用类型

有些时候我们需要从几个表达式中推断类型，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，

```typescript
let x = [0, 1, null]
```

为了推断 `x` 的类型，我们必须考虑所有元素的类型。 这里有两种选择：`number` 和 `null`。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。

由于最终的通用类型取自候选类型，有些时候候选类型共享一个公共结构，但是却没有一个类型能做为所有候选类型的超级类型。例如：

```typescript
class Animal {
  numLegs: number
}

class Bee extends Animal {
}

class Lion extends Animal {
}

let zoo = [new Bee(), new Lion()]
```
这里，我们想让 `zoo` 被推断为 `Animal[]` 类型，但是这个数组里没有对象是 `Animal` 类型的，因此不能推断出这个结果。 **为了更正，我们可以明确的声明我们期望的类型**：

```typescript
let zoo: Animal[] = [new Bee(), new Lion()]
```

如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，`(Bee | Lion)[]`

### 上下文类型

有些时候，TypeScript 类型推断会按另外一种方式，我们称作“上下文类型”；上下文类型的出现和表达式的类型以及所处的位置相关。比如：

```typescript
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.clickTime)  // Error
}
```

这个例子会得到一个类型错误，TypeScript 类型检查器使用 `window.onmousedown` 函数的类型来推断右边函数表达式的类型。 因此，就能推断出 `mouseEvent` 参数的类型了，所以 `mouseEvent` 访问了一个不存在的属性，就报错了。

如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略。重写上面的例子：

```typescript
window.onmousedown = function(mouseEvent:any) {
  console.log(mouseEvent.clickTime)  // OK
}
```

这个函数表达式有明确的参数类型注解，上下文类型被忽略。这样的话就不报错了，因为这里不会使用到上下文类型。

上下文类型会在很多情况下使用到。通常包含函数的参数，赋值表达式的右边，类型断言，对象成员，数组字面量和返回值语句。上下文类型也会做为最佳通用类型的候选类型。比如：

```typescript
function createZoo(): Animal[] {
  return [new Bee(), new Lion()]
}

let zoo = createZoo()
```

这个例子里，最佳通用类型有 `3` 个候选者：`Animal`，`Bee` 和 `Lion`。 其中，`Animal` 会被做为最佳通用类型。

## 高级类型🌟

### 交叉类型（与 &）

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如，`Person & Loggable` 同时是 `Person` 和 `Loggable`。 就是说这个类型的对象同时拥有了这两种类型的成员。

我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在 JavaScript 里发生这种情况的场合很多！） 下面是如何创建混入的一个简单例子：


```typescript
function extend<T, U> (first: T, second: U): T & U {
  let result = {} as T & U
  for (let id in first) {
    result[id] = first[id] as any
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      result[id] = second[id] as any
    }
  }
  return result
}

class Person {
  constructor (public name: string) {
  }
}

interface Loggable {
  log (): void
}

class ConsoleLogger implements Loggable {
  log () {
    // ...
  }
}

var jim = extend(new Person('Jim'), new ConsoleLogger())
var n = jim.name // 包含了 Person 属性
jim.log() // 包含了 ConsoleLogger 成员
```

项目示例：vue3 类型系统

```ts
export declare type ExtractPropTypes<O> = O extends object ? {
    [K in keyof O]?: unknown; // 获取 O 的所有键，返回联合类型
} & // This is needed to keep the relation between the option prop and the props, allowing to use ctrl+click to navigate to the prop options. see: #3656
{
    [K in RequiredKeys<O>]: InferPropType<O[K]>;
} & {
    [K in OptionalKeys<O>]?: InferPropType<O[K]>;
} : {
    [K in string]: any;
};

```

### 联合类型（或 |）

联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入 `number` 或 `string` 类型的参数。 例如下面的函数：

```typescript
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft('Hello world', 4) // returns "    Hello world"

```

`padLeft` 存在一个问题，`padding` 参数的类型指定成了 `any`。 这就是说我们可以传入一个既不是 `number` 也不是 `string` 类型的参数，但是 TypeScript 却不报错。

```typescript
let indentedString = padLeft('Hello world', true) // 编译阶段通过，运行时报错
```

为了解决这个问题，我们可以使用 联合类型做为 `padding` 的参数：

```typescript
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft('Hello world', true) // 编译阶段报错
```

联合类型表示一个值可以是几种类型之一。我们用竖线（`|`）分隔每个类型，所以 `number | string` 表示一个值可以是 `number` 或 `string`。

如果一个值是联合类型，我们只能访问此联合类型的所有类型里`共有的成员`。

```typescript
interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet()
pet.layEggs() // okay
pet.swim()    // error
```

这里的联合类型可能有点复杂：如果一个值的类型是 `A | B`，我们能够确定的是它包含了 `A` 和 `B` 中共有的成员。这个例子里，`Fish` 具有一个 `swim` 方法，我们不能确定一个 `Bird | Fish` 类型的变量是否有 `swim`方法。 如果变量在运行时是 `Bird` 类型，那么调用 `pet.swim()` 就出错了。

### 类型保护（或类型守卫）🌟

联合类型适合于那些值可以为不同类型的情况。 但当我们想确切地了解是否为 `Fish` 或者是 `Bird` 时怎么办？ JavaScript 里常用来区分这 2 个可能值的方法是检查成员是否存在。如之前提及的，我们只能访问联合类型中共同拥有的成员。

```typescript
let pet = getSmallPet()

// 每一个成员访问都会报错
if (pet.swim) {
  pet.swim()
} else if (pet.fly) {
  pet.fly()
}
```

为了让这段代码工作，我们要使用类型断言：

```typescript
let pet = getSmallPet()

if ((pet as Fish).swim) {
  (pet as Fish).swim()
} else {
  (pet as Bird).fly()
}
```

#### 用户自定义的类型保护

这里可以注意到我们不得不多次使用类型断言。如果我们一旦检查过类型，就能在之后的每个分支里清楚地知道 `pet` 的类型的话就好了。

TypeScript 里的*类型保护*机制让它成为了现实。 <u>类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型</u>。定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个*类型谓词*：

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
```

在这个例子里，`pet is Fish` 就是类型谓词。谓词为 `parameterName is Type` 这种形式， `parameterName` 必须是来自于当前函数签名里的一个参数名。

每当使用一些变量调用 `isFish` 时，`TypeScript` 会将变量缩减为那个具体的类型。

```typescript
if (isFish(pet)) {
  pet.swim()
}
else {
  pet.fly()
}
```

注意 `TypeScript` 不仅知道在 `if` 分支里 `pet` 是 `Fish` 类型；它还清楚在 `else` 分支里，一定不是 Fish类型而是 `Bird` 类型。

#### typeof 类型保护

现在我们回过头来看看怎么使用联合类型书写 `padLeft` 代码。我们可以像下面这样利用类型断言来写：

```typescript
function isNumber (x: any):x is number {
  return typeof x === 'number'
}

function isString (x: any): x is string {
  return typeof x === 'string'
}

function padLeft (value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value // 这样在里面 padding 都是 number
  }
  if (isString(padding)) {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
```

然而，你必须要定义一个函数来判断类型是否是原始类型，但这并不必要。其实我们不必将 `typeof x === 'number' `抽象成一个函数，因为 TypeScript 可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了。


```typescript
function padLeft (value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
```

这些 `typeof` 类型保护只有两种形式能被识别：`typeof v === "typename"` 和 `typeof v !== "typename"`， `"typename"`必须是 `"number"`， `"string"`，`"boolean"` 或 `"symbol"`。 但是 TypeScript 并不会阻止你与其它字符串比较，只是 TypeScript 不会把那些表达式识别为类型保护。

#### instanceof 类型保护

如果你已经阅读了 `typeof` 类型保护并且对 JavaScript 里的 `instanceof` 操作符熟悉的话，你可能已经猜到了这节要讲的内容。

`instanceof` 类型保护是通过构造函数来细化类型的一种方式。我们把之前的例子做一个小小的改造：

```typescript
class Bird {
  fly () {
    console.log('bird fly')
  }

  layEggs () {
    console.log('bird lay eggs')
  }
}

class Fish {
  swim () {
    console.log('fish swim')
  }

  layEggs () {
    console.log('fish lay eggs')
  }
}

function getRandomPet () {
  return Math.random() > 0.5 ? new Bird() : new Fish()
}

let pet = getRandomPet()

if (pet instanceof Bird) {
  pet.fly()
}
if (pet instanceof Fish) {
  pet.swim()
}
```

### 可以为 null 的类型

TypeScript 具有两种特殊的类型，`null` 和 `undefined`，它们分别具有值 `null` 和 `undefined`。我们在基础类型一节里已经做过简要说明。 默认情况下，类型检查器认为 `null` 与 `undefined` 可以赋值给任何类型。 `null` 与 `undefined` 是所有其它类型的一个有效值。 这也意味着，你阻止不了将它们赋值给其它类型，就算是你想要阻止这种情况也不行。`null`的发明者，Tony Hoare，称它为[价值亿万美金的错误](https://en.wikipedia.org/wiki/Null_pointer#History)。

`--strictNullChecks` 标记可以解决此错误：当你声明一个变量时，它不会自动地包含 `null` 或 `undefined`。 你可以使用联合类型明确的包含它们：

```typescript
let s = 'foo'
s = null // 错误, 'null'不能赋值给'string'
let sn: string | null = 'bar'
sn = null // 可以

sn = undefined // error, 'undefined'不能赋值给'string | null'
```

注意，按照 JavaScript 的语义，TypeScript 会把 `null` 和 `undefined` 区别对待。`string | null`，`string | undefined` 和 `string | undefined | null` 是不同的类型。

#### 可选参数和可选属性

使用了 `--strictNullChecks`，可选参数会被自动地加上 `| undefined`:

使用了 `--strictNullChecks`，可选参数会被自动地加上 `| undefined`:

```typescript
function f(x: number, y?: number) {
  return x + (y || 0)
}
f(1, 2)
f(1)
f(1, undefined)
f(1, null) // error, 'null' 不能赋值给 'number | undefined'
```

可选属性也会有同样的处理：

```typescript
class C {
  a: number
  b?: number
}
let c = new C()
c.a = 12
c.a = undefined // error, 'undefined' 不能赋值给 'number'
c.b = 13
c.b = undefined // ok
c.b = null // error, 'null' 不能赋值给 'number | undefined'
```

#### 类型保护和类型断言🌟

由于可以为 `null` 的类型能和其它类型定义为联合类型，那么你需要使用类型保护来去除 `null`。幸运地是这与在 `JavaScript` 里写的代码一致：

```typescript
function f(sn: string | null): string {
  if (sn === null) {
    return 'default'
  } else {
    return sn
  }
}
```

这里很明显地去除了 `null`，你也可以使用短路运算符：

```typescript
function f(sn: string | null): string {
  return sn || 'default'
}
```

如果编译器不能够去除 `null` 或 `undefined`，你可以使用类型断言手动去除。语法是添加 `!` 后缀： `identifier!` 从 `identifier` 的类型里去除了 `null` 和 `undefined`：

```typescript
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet // error, 'name' 可能为 null
  }
  name = name || 'Bob' // 编译器无法得知 name 不为 null 的情况
  return postfix('great')
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet // ok
  }
  name = name || 'Bob'
  return postfix('great')
}

broken(null)

```

本例使用了嵌套函数，因为编译器无法去除嵌套函数的 `null`（除非是立即调用的函数表达式）。因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。如果无法知道函数在哪里被调用，就无法知道调用时 `name` 的类型。

### 字符串字面量类型🌟

字符串字面量类型允许你指定字符串必须具有的确切值。在实际应用中，字符串字面量类型可以与联合类型，类型保护很好的配合。通过结合使用这些特性，你可以实现类似枚举类型的字符串。

```typescript
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'

class UIElement {
  animate (dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
      // error! 不能传入 null 或者 undefined.
    }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy') // error

```

你只能从三种允许的字符中选择其一来做为参数传递，传入其它值则会产生错误。

```
Argument of type '"uneasy"' is not assignable to parameter of type '"ease-in" | "ease-out" | "ease-in-out"'
```

### 总结

么到这里，我们的 TypeScript 常用语法学习就告一段落了，当然 TypeScript 还有其他的语法我们并没有讲，我们只是讲了 TypeScript 的一些常用语法，你们把这些知识学会已经足以开发一般的应用了。如果你在使用 TypeScript 开发项目中遇到了其他的 TypeScript 语法知识，你可以通过 TypeScript 的[官网文档](https://www.typescriptlang.org/docs/home.html)学习。因为学基础最好的方法还是去阅读它的官网文档，敲上面的小例子。其实我们课程的基础知识结构也是大部分参考了官网文档，要记住学习一门技术的基础官网文档永远是最好的第一手资料。

但是 TypeScript 的学习不能仅仅靠看官网文档，你还需要动手实践，在实践中你才能真正掌握 TypeScript。相信很多同学学习到这里已经迫不及待想要大展身手了，那么下面我们就开始把理论转换为实践，一起来用 TypeScript 重构 axios 吧！

`ReturnType<typeof setTimeout>`

##### 解决 TS 类型报错的几个方法

1. 类型断言
   类型断言可以明确的告诉 Ts 值的详细类型，即使在某些情景下与 Ts 推断的类型不一致，但我们很明确值的类型时，可以使用类型断言：
   语法： ① <类型>值
   ② 值 as 类型 推荐这种，因为<>容易与泛型，react 起冲突
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

###

## 声明文件

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

### 书写声明文件

当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。在不同的场景下，声明文件的内容和使用方式会有所区别。
库的使用场景主要有以下几种：

- `全局变量`：通过 `<script>` 标签引入第三方库，注入全局变量。
- `npm 包`：通过 `import foo from 'foo'`导入，符合 ES6 模块规范
- `UMD 库`：既可以通过 `<script` 标签引入后，又可以通过 `import` 导入。
- `直接扩展全局变量`：通过 `<script>` 标签引入后，改变一个全局变量的结构
- `在 npm 包或 UMD 库中扩展全局变量`：引用 npm 包或 UMD 库后，改变一个全局变量的结构
- `模块插件`：通过 `<script>` 或 import 导入后，改变另一个模块的结构

#### 全局变量

- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型

只要写了 **export，都是声明在局部模块内的，也就是别的模块需要使用的话，则需要 import 进来**。**否则，就是声明在全局命名空间下的**。

比如 vue3 的 computed 定义：

```ts
// runtime-core.d.ts
export declare function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>;

export declare function computed<T>(options: WritableComputedOptions<T>): WritableComputedRef<T>;

export declare type ComputedOptions = Record<string, ComputedGetter<any> | WritableComputedOptions<any>>;
export { ComputedRef }
```



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

## 命名空间和模块

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

### 模块

#### import type 特性



TypeScript 3.8 带来了一个新特性：`仅仅导入 / 导出声明`。

```ts
import type { CSSProperties } from "vue"
function setStyle(style: CSSProperties, options: {}): CSSProperties {
  //...
}
```

避免 TypeScript 会混淆导出的究竟是一个类型还是一个值。

比如在下面的例子中， MyThing 究竟是一个值还是一个类型？

```js
import { MyThing } from './some-module.js';
export { MyThing };
```

如果单从这个文件来看，我们无从得知答案。

如果 Mything 仅仅是一个类型，Babel 和 TypeScript 使用的 transpileModule API 编译出的代码将无法正确工作，并且 TypeScript 的 isolatedModules 编译选项将会提示我们，这种写法将会抛出错误。

> TypeScript 做了两件事
>
> 1. 将静态类型检查添加到 JavaScript 代码中。
> 2. 将 TS + JS 代码转换为各种JS版本。
>
> 先删除类型，后进行转换

`import type ... from`—让编译器知道你要导入的内容绝对是一种类型。

`export type ... from` —一样，仅用作导出。

```js
// src/lib-type-re-export.ts
export type { Track, Playlist } from "./types";
export type { CreatePlaylistRequestParams } from "./api";
export { createPlaylist } from "./api";

// 会被编译为：

// dist/lib-type-re-export.js
export { createPlaylist } from "./api";
```

import type 仅仅导入被用于类型注解或声明的声明语句，它总是会被完全删除，因此在运行时将不会留下任何代码。

与此相似，export type 仅仅提供一个用于类型的导出，在 TypeScript 输出文件中，它也将会被删除。

详细看参考资料继续～

参考资料：

- [你不知道的 「 import type 」](https://juejin.cn/post/6949060229610864654)

#### 模块里不要使用命名空间

<u>当初次进入基于模块的开发模式时，可能总会控制不住要将到处包裹在一个命名空间里</u>。模块具有自己的`作用域`，并且只有导出的声明才会在模块外部`可见`。记住这点， 命名空间在使用模块时几乎没什么价值。

<u>在组织方面，命名空间对于在全局作用域内对逻辑上相关的对象和类型进行分组是很便利的。</u>例如，在 C# 里，你会从 `System.Collections` 里找到所有集合的类型。通过将类型有层次地组织在命名空间里，可以方便用户找到与使用那些类型。<u>然而，模块本身已经存在于文件系统之中，这是必须的。我们必须通过路径和文件名找到它们，这已经提供了一种逻辑上的组织形式。</u>我们可以创建 `/collections/generic` 文件夹，把相应模块放在里面。

`命名空间对解决全局作用域里命名冲突来说是很重要的`。比如，你可以有一个 `My.Application.Customer.AddForm` 和 `My.Application.Order.AddForm` -- 两个类型的名字相同，但命名空间不同。然而，这对于模块来说却不是一个问题。`在一个模块里，没有理由两个对象拥有同一个名字。`从模块的使用角度来说，使用者会挑出他们用来引用模块的名字，所以也没有理由发生重名的情况。

#### 使用模块

像命名空间一样，模块可以包含代码和声明。<u>不同的是`模块可以声明它的`依赖`(import 进来的)。</u>

模块会把依赖添加到模块加载器上（例如 CommonJs/Require.js）。对于小型的 JS 应用来说可能没必要，但是对于大型应用，这一点点的花费会带来长久的模块化和可维护性的便利。模块也提供了更好的代码重用，更强的封闭性以及更好的使用工具进行优化。

对于 Node.js 应用来说，模式是默认并推荐的组织代码的方式。

从 ECMAScript 2015 开始，模块成为了语言内置的部分，应该会被所有正常的解释引擎所支持。因此，对于新项目来说推荐使用模块做为组织代码的方式。

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

## 区别

### 泛型与 Any

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

### 自定义类型 Interface vs type

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

### 实现与继承：implements vs extends

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

#### 常量枚举

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

#### 枚举类型

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

https://v3.vuejs.org/guide/typescript-support.html#editor-support

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

```ts
declare module "qqmap";
```

好的，这些就大工告成了，直接ts文件中使用

```js
import qqmap from "qqmap";
```

就可以引入这个第三方JavaScript库。

#### Vue3 插件编写类型

```js
import { App, Plugin } from 'vue';
import Map from "./Map";
export const install = (app: App, options = {}) => {
  app.component("b-map", Map);
}

const plugin:Plugin = { install }
export default plugin;
```





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
​```ts
vue add @vue/typescript
​``` -->
<!-- 测试报错，找不到 Home.vue -->

##### 手动创建

手动一步步搭建 vue + ts 的开发环境

1. 安装 `yarn add typescript —dev`，这个是用来编译 ts 代码为 js 代码，可以在项目根目录下添加更详细的配置 `tsconfig.json`。

2. 使 webpack 支持 ts，要安装 `ts-loader`，编写 loader 规则。

```js
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

​```json
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



## axios 库 TS 重写

## vue2 项目

模块声明，模块的声明顺序是否会对 TypeScript 类型产生，比如 声明 vue 模块和 扩展 vue 模块，这两个是否必须先扩展 vue 模块类型。

```js
import vue from "vue/types/vue";
// 扩展 node_modules/vue/types/vue 模块
declare module "vue/types/vue" {
  interface Vue {
    $lodash: any;
    $eyeMapApiPromiseLazy: any;
  }
}
```

再声明整个 vue 模块，需要单独一个文件 shim-vue.d.ts 放置

```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue; // 模块内声明
}
```

否则会出现错误。

#### 可选链

#### 枚举遍历&继承



## 最佳实践

虽然 typeScript 提供了编译时的检查，但是不代表运行时的检查就不必要。只不过 ts 可以让我们减少更多的运行时错误。
## 🔥常见 TypeScript 类型声明问题

## 与 Java 对比

在 Java 中，所有的类型声明几乎都有显示的声明，可以通过 import xxx 查看。而 TypeScript 一些类型，比如 setTimeout 的返回值，需要像下面 这种处理 `ReturnType<typeof setTimeout>`，见文档 https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype

 ```js
 export default class PollingAction {
   private running: boolean = false
   private time: number // interval
   private immediate: boolean
   private callback: Function
  `private timer!: ReturnType<typeof setTimeout>`
   constructor(callback: Function, time: number = 100, immediate: boolean = false) {
     // run status
     this.running = false
     this.time = time
     this.immediate = immediate
     if (callback) {
       this.callback = callback
     } else {
       this.callback = () => {}
     }
   }
 
   start() {
     if (this.immediate) {
       this.callback && this.callback()
     }
     this.running = true
     const onAction = () => {
       this.timer = setTimeout(() => {
         if (this.running) {
           try {
             this.callback && this.callback()
           } catch (error) {
             console.log(error)
             this.cancel()
           }
           return onAction() // invoke the function recursively
         } else {
           return
         }
       }, this.time)
     }
     return onAction()
   }
 
   cancel() {
     this.running = false
     this.timer && clearTimeout(this.timer)
   }
 }
 
 ```

## 参考资料

- 《重学 TypeScript》
- [Ts高手篇：22个示例深入讲解Ts最晦涩难懂的高级类型工具](https://juejin.cn/post/6994102811218673700)
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