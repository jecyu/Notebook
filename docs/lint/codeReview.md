# CheckList

## 进行形式

项目迭代中：主要负责人以抽查浏览的形式快速审阅成员提交的代码，发现有问题的地方提出并打回改进。

团队定期：可以每周抽一个小时进行 code review + 后续的编写，针对 checklist 的某一个模块进行 review，成员之间互相审阅提交的编码，学习好的编码方式、探讨不好的编码的理由。

针对某几个模块 review，提出问题，然后再分配进行修改。1. review

2.  熟悉模块功能。

## 代码风格

- ESLINT + Prettier

## 命名规范

常用命名规范有四种：

- camelCase 驼峰式
- PascalCase 帕斯卡命名式
- kabab-case 短横线连接式
- Snake 下划线连接式

- 变量名需要能够表明其含义，以小写字母开头，使用驼峰式命名法。
- 函数名也是一样，但是函数名应该以大写字母开头，这样便于和变量名区分开来。

### CSS 类名采用横线命名规范

推荐：

```css
.block {
}
.block-element {
}
.block-element.modifier {
}
```

应用：

```css
.ivu-form {
}
.ivu-form-item {
}
.ivu-form-item.active {
}
.ivu-form-item-label {
}
.ivu-form-item-content {
}
```

一般不超过四级，超过 4 级后，到第 5 级时，起步。

```css
.ivu-xxxx第5级
```

### JS 命名规范

#### 采用 Camel Case 小驼峰式命名

```js
studentInfo;
```

#### 针对常量，采用全大写+下划线形式

```js
const TIMES = 10;
```

#### 避免名称冗余

推荐：

```js
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue",
};
```

不推荐：

```js
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue",
};
```

应用：

```js
const formModalStatus = {
  add: false,
  edit: false,
};
```

### Vue 命名规范

#### 文件

- `.js`文件， 除 index.js 外，其他都采用 camelCase 风格，如`export2Excel.js`
- `.vue`文件， 除 index.vue 外，其他统一用 PascalCase 风格, 如`VerticalNav.vue`
- `.scss`文件， 除 index.scss 外，其他统一用 camelCase 风格，如`controlBorderWarnPanel.scss`

- 组件名采用大写字母开头的驼峰式命名

### 命名符合语义化

命名需要符合语义化，如果`函数命名`，可以采用加上动词前缀：

| 动词 | 含义                   |
| ---- | ---------------------- |
| can  | 判断是否可执行某个动作 |
| has  | 判断是否含有某个值     |
| is   | 判断是否为某个值       |
| get  | 获取某个值             |
| set  | 设置某个值             |
| set  | 设置某个值             |

推荐：

```js
// 是否可阅读
function CanRead() {
  return true;
}

// 获取姓名
function GetName() {
  return this.name;
}
```

另外，针对处于类编码风格（TS + Vue）里的函数名统一首字母大写，以便区分变量名与函数名。

## JS 推荐写法

### 每个常量都需命名

每个常量应该命名，不然看代码的人不知道这个`常量`表示什么意思。

推荐：

```js
const COL_NUM = 10;
let row = Math.ceil(num / COL_NUM);
```

不推荐：

```js
let row = Math.ceil(num / 10);
```

对于多个状态的常量，抽离成一个对象进行枚举。

```js
const templateType = {
  extend: 0,
  system: 1,
};

const templates = {
  [this.templateType.extend]: "",
  [this.templateType.system]: "",
};
```

<!-- 表格下拉框选项数据，可以集中管理，模块化 -->
<!-- ```js
  // 枚举类型匹配
  private enumModuleOptionField = {
    required: "必填",
    filedValueFillWay: "模板填写方式",
    filedType: "模板字段类型"
  };

  // 选择类型
  private moduleOptions = {
    [this.enumModuleOptionField.required]: [
      { name: "是", code: true, id: 1 },
      { name: "否", code: false, id: 0 }
    ],
    [this.enumModuleOptionField.filedType]: [],
    [this.enumModuleOptionField.filedValueFillWay]: []
  };
``` -->

### Modal 框的控制

Before

html

```html
<Modal v-model="ysjCatalogModalStatus.add"></Modal>
```

```js
  let add =  false;
  let edit = false;
  let delete =  false;
  let showTemplate = false;
```

After 1，进行适当的层级处理，更具可读性

```js
private ysjCatalogModalStatus = {
  add: false,
  edit: false,
  delete: false,
  showTemplate: false
};
```

控制显示
```js
// hide
this.ysjCatalogModalStatus.add = true;
// show
this.ysjCatalogModalStatus.add = false;
```

After2，使用一个 modelType 变量以及 map 组合，更加容易管理，而不用设置 true 或 false。<u>适用于默认只显示一个弹框的情况下。</u>

```html
<Modal v-model="modelType === modelTypeMap.add"></Modal>
```

```js
let modelTypeMap = {
  add: "add",
  edit: "edit",
  delete: "delete",
  showTemplate: "showTemplate",
};
let modelType = "";
```

控制显示
```js
// hide
this.modelType = "";
// show
this.modelType = this.modelTypeMap.add;
```

### 推荐使用字面量

创建对象和数组推荐使用字面量，因为这不仅是性能最优（[js 为什么说对象字面量赋值比 new Object()高效？](https://www.jianshu.com/p/2abed1d35e38)）也有助于节省代码量。

good

```js
let obj = {
  name: "tom",
  age: 15,
  sex: "男",
};
```

不推荐：

```js
let obj = {};
obj.name = "tom";
obj.age = 15;
obj.sex = "男";
```

### 对象设置默认属性的推荐写法

推荐 1:

```js
const menuConfig = {
  title: "Order",
  // User did not include 'body' key
  buttonText: "Send",
  cancellable: true,
};

function createMenu(config) {
  config = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancellable: true,
    },
    config
  );
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancelable}
}
createMenu(menuConfig);
```

推荐 2：

```js
const menuConfig = {
  title: "Order",
  // User did not include 'body' key
  buttonText: "Send",
  cancellable: true
}

function createMenu({title = "Foo", body = "Bar",   buttonText: "Baz", cancellable = true}) {
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancelable}
}
createMenu(menuConfig);
```

推荐 1 和推荐 2 都是把默认属性内置到函数里面，这样这个函数就不会受到外部状态的影响，由参数决定。

不推荐：

```js
const menuConfig = {
  title: null,
  body: "Bar",
  buttonText: null,
  cancellable: true,
};

function createMenu(config) {
  config.title = config.title || "Foo";
  config.body = config.body || "Bar";
  config.buttonText = config.buttonText || "Baz";
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}
createMenu(menuConfig);
```

### 遍历

![](../.vuepress/public/images/2020-05-13-10-51-270-js-coder-review-1.png)

1. 使用 map。
2. 临时数组

### 相同功能的业务逻辑放在一块

```js
// 元数据
// del
// add
// edit
// 字典
```

### 函数参数写法

函数参数越少越好，如果参数超过两个，要使用 `ES6` 的解构语法，不用考虑参数的顺序。

推荐：

```js
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true,
});
```

### 使用函数默认值

使用参数默认值替代使用条件语句进行赋值。

推荐：

```js
function createMicrobrewery(name = "Hipster Brew Co.") {
  //...
}
```

不推荐：

```js
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
}
```

### 最小函数准则

避免函数过长，可以把函数拆分为更小的函数。可以遵循这样的原则：每当感觉需要以注释来说明点什么的时候，我们就把需要说明的东西写进一个独立函数中，并以其用途（而非实现手法）命名。<u>关键不在于函数的长度，而在于函数“做什么”和“如何做”之间的语义距离。</u>

Before:

```java
void printOwing(double amount) {
  printBanner();

  // print details
  System.out.println("name: " + _name);
  System.out.println("amount: " + _amount);
}
```

After:

```java
void printOwing(double amount) {
  printBanner(amount); // 把参数传递过去
}
// 命名是什么：打印细节，而不是做什么：打印name 和 amout
void printDetails(double amount) {
  System.out.println("name: " + _name);
  System.out.println("amount: " + _amount);
}
```

除了注释，条件表达式和循环常常也是提炼的信号。

<!-- ### 不要写全局方法 -->

<!-- TODO -->

### 推荐函数式编程

过程式的编程是把过程具体的流程描述出来，而函数式编程更多是描述性，并且不依赖外部状态的纯函数，举个例子，使用 map 是函数式编程（传入一个回调函数），而使用 for 循环则是过程式编程，需要把具体的流程编写出来。

函数式编程使用的一些技术：

- 头等函数，函数可以像对象一样使用，参数传递、reture 出去、赋值、嵌套等。
- 递归&尾递归（复用调用栈），写递归要注意事项：
  - 爆栈
  - 重复计算
  - 循环引用
- pipeline 管道
- 柯里化（复用参数、延迟执行）
- 高阶函数（尽量使用 map、reduce、filter 代替普通的循环）

#### map&reduce

推荐：

```js
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500,
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500,
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000,
  },
];

let totalOutput = programmerOutput
  .map((output) => output.lineOfCode)
  .reduce((totalLines, lines) => totalLines + lines, 0);
```

不推荐：

```js
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500,
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500,
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000,
  },
];
let totalOutput = 0;
for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```

应用：

```ts
/**
* 处理进度条样式
*/
private ProgressStyle(row: any) {
  const style: any = {};
  style.left = `${row.uploadProgress - 100}%`;
  style.height = `${this.rowHeights[row._index]}px`; // 获取行高
  style.top = `${this.rowHeights
    .filter((item, index) => index < row._index)
    .reduce((item, sum) => item + sum, 0)}px`; // 过滤高度
  return style;
}

```

### 使用多态替换条件语句

遵循原则：策略模式 > switch > if

<!-- ### 时间复杂度&空间复杂度 -->

### 内存泄漏

- 定时器是否在不使用时清除，如 `setTimeout` 和 `setInterval`。
- 事件监听器（addEventListener、EventBus.emit）

## SCSS 推荐写法

## CSS 布局

- 遵循原则：flex 布局 > calc() > position: absolute

<!-- 考虑 flex 中，iview table 的影响 -->

## Vue 项目规范

### 使用动态组件代替 v-if 渲染

推荐：

```html
<transition enter-active-class="fadeIn">
  <component v-bind:is="currentTabComponent"></component>
</transition>

<script lang="ts">
private tabsNav = [
 {
   label: "元数据",
   value: YSJ
 },
 {
   label: "字典表",
   value: DictionaryTable
 }
];

get currentTabComponent() {
 const tab: any = this.tabsNav.find(
   (item: any) => this.activeTab === item.label
 );
 return tab.value;
}
<script>
```

不推荐：

```html
<div class="ysjgl-body">
  <transition enter-active-class="fadeIn">
    <div class="tab-box" v-if="activeTab === '元数据'">
      <YSJ></YSJ>
    </div>
  </transition>
  <transition enter-active-class="fadeIn">
    <div class="tab-box" v-if="activeTab === '字典表'">
      <dictionary-table></dictionary-table>
    </div>
  </transition>
</div>
```

<!-- 为什么 iview select v-model 只接收 string | number
 不接受 boolean -->

### 少见的控制结构

#### Return 语句

#### 递归调用

### 异常处理

## Vue 项目规范

## TS 项目规范

<!-- ## 错误列表

### 数据引用错误

### 数据声明错误

## 运算错误

### 比较错误

### 控制流程错误

### 接口错误

### 输入/输出错误

- 如果对文件明确声明过，其属性是否正确？
- 打开文件中的语句中各项属性的设置是否正确？
- 格式规范中是否与 I/O 语句中的信息相吻合？举例来说，在 FORTRAN 语言中，是否每个 FORMAT 语句都与相应的 READ 或 WRITE 语句相一致（就各项的数量和属性而言）？
- 是否有足够的可用内存空间，来保留程序将读取的文件？
- 是否所有的文件在使用之前都打开了？（undefined）
- 是否所有的文件在使用之后都关闭了？（内存泄漏）
- 是否判断文件结束的条件，并正确处理？
- 对 I/O 出错情况处理是否正确？
- 任何打印或显示的文本信息中是否存在拼写或语法错误？
- 程序是否正确处理类似于“File Not Found” 这样的错误？ -->

## 其他

- [ES6 规范](../lint/es6.md)
- [VUE 规范](../lint/vue.md)
- [VUE 风格指南](https://cn.vuejs.org/v2/style-guide/)

### 尽量不手动操作 DOM

### 删除弃用代码

因为团队现在使用 `vue` 框架，所以在项目开发中尽量使用 `vue` 的特性去满足我们的需求，尽量不要手动操作 `DOM`，包括：增删改 `dom` 元素、以及更改样式、添加事件等。

### 编码规范

### 注释规范

## 参考资料

- [前端团队代码评审 CheckList 清单](https://juejin.im/post/5d1c6550518825330a3bfa01#heading-37)
- [如何保障前端项目的代码质量](https://juejin.im/post/5b911f306fb9a05cdb1013b9)
- 《代码大全》
- 《重构，改善现有的代码》
- [CSS 样式书写规范最佳实践](https://juejin.im/entry/5967040451882568af7f426f)
- [CSS 学习笔记(十六) CSS 最佳实践之可维护性篇](https://segmentfault.com/a/1190000003999308#item-8)
- [Web 前端开发最佳实践](https://book.douban.com/subject/26305106/)
- TS 最佳实践
- [TS 常见问题整理（60 多个，持续更新 ing）](https://juejin.im/post/5e33fcd06fb9a02fc767c427#heading-5)
- [ts 规范 Do's and Don'ts
  ](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [VSCode常用插件之EditorConfig for vs code 使用
](https://www.cnblogs.com/jiaoshou/p/11252055.html)