# Code Review CheckList

## 进行形式

项目迭代中：主要负责人以抽查浏览的形式快速审阅成员提交的代码，发现有问题的地方提出并打回改进。

团队定期：可以每周抽一个小时进行 code review + 后续的编写，针对 checklist 的某一个模块进行review，成员之间互相审阅提交的编码，学习好的编码方式、探讨不好的编码的理由。

针对某几个模块 review，提出问题，然后再分配进行修改。1. review
 2. 熟悉模块功能。
  
## 代码风格

- ESLINT + Prettier

## 命名规范

- 变量名需要能够表明其含义，以小写字母开头，使用驼峰式命名法。
- 函数名也是一样，但是函数名应该以大写字母开头，这样便于和变量名区分开来。
  
### JS 命名规范

#### 采用 Camel Case 小驼峰式命名

```js
studentInfo
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
  color: "Blue"
}
```

不推荐：

```js
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue"
}
```

应用：

```js
const formModalStatus = {
  add: false,
  edit: false
}
```

### CSS 类名采用横线命名规范

推荐：

```css
.block {}
.block-element {}
.block-element.modifier {}
```

应用：

```css
.ivu-form {}
.ivu-form-item {}
.ivu-form-item.active {}
.ivu-form-item-label {}
.ivu-form-item-content {}
```

### Vue 命名规范

- 组件名采用大写字母开头的驼峰式命名

### 命名符号语义化

命名需要符合语义化，如果`函数命名`，可以采用加上动词前缀：

|动词|含义|
|--|--|
|can| 判断是否可执行某个动作|
|has| 判断是否含有某个值|
|is| 判断是否为某个值|
|get| 获取某个值|
|set| 设置某个值|
|set| 设置某个值|

推荐：

```js
// 是否可阅读
function canRead() {
  return true;
}

// 获取姓名
function getName() {
  return this.name;
}
```
  
## JS 推荐写法

### 每个常量都需命名

每个常量应该命名，不然看代码的人不知道这个`常量`表示什么意思。

推荐：

```js
const COL_NUM = 10;
let row = Math.ceil(num/COL_NUM);
```

不推荐：
```js
let row = Math.ceil(num/10);
```

### 推荐使用

### 函数参数写法

函数参数越少越好，如果参数超过两个，要使用 `ES6` 的解构语法

### 推荐函数式编程

### 使用多态替换条件语句

举个例子，策略模式

## Vue

## TS

## 错误列表

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
- 程序是否正确处理类似于“File Not Found” 这样的错误？

## 其他

- [ES6规范](../lint/es6.md)
- [VUE 规范](../lint/vue.md)

### 尽量不手动操作 DOM

### 删除弃用代码

因为团队现在使用 `vue` 框架，所以在项目开发中尽量使用 `vue` 的特性去满足我们的需求，尽量不要手动操作 `DOM`，包括：增删改 `dom` 元素、以及更改样式、添加事件等。

## 参考资料

- [前端团队代码评审 CheckList 清单](https://juejin.im/post/5d1c6550518825330a3bfa01#heading-37)
- [如何保障前端项目的代码质量](https://juejin.im/post/5b911f306fb9a05cdb1013b9)