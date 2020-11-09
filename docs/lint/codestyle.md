# 规范

1、目的
本规范主要目的是定义数据中心前端团队编码整体风格，保持编码人员代码的一贯风格，提高代码编写的可读性、规范性、可维护性。

2、总体原则
符合 Web 标准，结构表现行为分离，兼容性优良。代码须简洁明了有序，尽可能减小服务器负载，保证最快解析速度。
保持代码可读性，严格按照团队规范进行编码，保持风格统一。

3、目录结构规范
├── public
│ ├── favicon.ico
│ ├── index.html
│ └── static
├── src
│ ├── App.vue --------------------------- Root 组件
│ ├── api ------------------------------- 接口管理
│ ├── assets ---------------------------- 静态文件，一般用来放图片
│ ├── components ------------------------ 全局组件
│ │ ├── demo ---------------------------- 全局组件 demo 示例
│ ├── svg ------------------------------ icon 管理
│ ├── initAppConfig.js -------------------初始化系统配置信息
│ ├── layout ---------------------------- layout 层管理
│ ├── main.js --------------------------- app 入口
│ ├── router --------------------------- 路由表管理
│ ├── store ---------------------------- vuex
│ ├── styles ---------------------------- 全局 css 和 scss 函数变量
│ ├── utils ----------------------------- 工具函数管理
│ └── views ----------------------------- 子系统页面模块
├── vue.config.js
├── babel.config.js
├── jsconfig.json
├── package.json
├── postcss.config.js
├── prettier.config.js
├── yarn.lock

4、命名规范

4.1、命名分类

camelCase（驼峰式 ）

kebab-case（短横线连接式）

PascalCase（帕斯卡命名式）

snake_case（下划线连接式）

4.2 项目命名
统一使用 kebab-case 风格命名。

4.3、目录命名
组件目录使用 PascalCase 方式命名，其他目录统一使用 kebab-case 方式命名

4.4、文件命名

4.4.1 Component 文件

全局组件全部以一个特定的前缀开头，采用 PascalCase

在单文件组件和字符串模板中组件名采用 PascalCase 方式
路由组件采用 kebab-case 方式

JS/JSX 中的组件名采用 PascalCase 方式
在 DOM 模板中采用 kebab-case 方式

### 4.4.2 View 文件

在 views 文件下，代表路由的.vue 文件都使用 kebab-case 方式

### 4.4.3 javascript 文件

类文件采用 PascalCase 方式，其他文件均采用 `kebab-case` 方式

4.4.4css/scss 文件
统一采用 kebab-case 方式

4.4.5 其他静态资源文件
统一采用 kebab-case 方式

4.5、路由命名

path 采用 kebab-case 方式，且 path 必须以/开头
name 采用 kebab-case 方式

4.6、Data/Prop 命名
在声明 data 和 prop 的时候，其命名始终使用 camelCase,prop 在使用的时候采用 kebab-case
props: {
greetingText: String
}

<WelcomeMessage greeting-text="hi"/>

4.6、Method 命名

采用 camelCase 命名方式
使用动宾短语（例如 openMapDialog）
主动触发类事件(click、input、enter)响应方法统一命名为 handlexxx(.e.g. handleLogin)
后台通信类方法统一按请求方式命名 getXXX、postXXX、putXXX、deleteXXX

4.7 组件事件命名

采用 kebab-case 命名方式

一个事件的名字对应组件外的一组意义操作，加上前缀 on-(例如 on-upload-success)

5、编码规范

5.1 vue 组件开发规范

每一个 Vue 组件（等同于模块）首先必须专注于解决一个单一的问题，独立的、可复用的、微小的 和 可测试的。
必须使用 ES6+语法
组件 props 原子化，尽量只使用 JavaScript 原始类型（字符串、数字、布尔值）和函数，尽量避免复杂的对象
使用\$\_作为 mixins 的私有属性前缀
mixin 中使用的方法或者属性应该直接在 mixin 中读取
对 props 使用 type 进行类型校检，提供默认值
ajax 请求在 created 生命周期中发起
必须设置 name 属性，采用 PascalCase 方式
组件内选项顺序为 name -> mixins -> directives -> components -> props -> data -> computed -> watch -> lifecycle methods -> methods

文件结构顺序 template -> script -> style

递归过多情况下，建议使用 render 方法（jsx 语法）
避免使用 this.\$parent

组件样式设置作用域

5.2 Vue Router 规范

页面跳转数据传递使用路由参数,尽量保证链接内容能复原整个页面

使用路由懒加载

router 尽量按照 views 中的结构保持一致，按业务拆分

5.3 注释规范

单行注释：使用//，注释应单独一行写在被注释对象的上方，不要追加在语句的后面，且注释内容和注释符之间需要有一个空格

多行注释：使用/\*_ ... _/

文件注释，按约定在头部书写固定格式，如注明作者，文件描述

方法注释，注明功能描述，参数对象类型等等，使用 jsdoc 规范

例：
/\*\*

- @description 函数描述的 必填
- @param id {Number} 传入需要获取名称的人物 id 参数必填
- @return {String} 返回的姓名 返回值必填，空为 void
- @author shi 2015/07/21 作者可选
- @version 1.1.0 可以不写 版本可选
- @example 示例代码，可选
  \*/
  function getTaskName(id) {
  let name = "test";
  return name;
  }

5.4 CSS 规范

采用原子化方式 (Tailwind.css)
应当采用 scoped + /deep/ (dart-sass 则用 >>> )深度选择器方案，覆盖 UI 组件库默认样式

5.5 JS 规范

尽量遵循单功能函数原则，一个函数只做一件事

所有后续需要优化和重构的部分必须添加 TODO 注释

必须使用 ES6+ 语法

使用 async/await 而不用 Promise.then()

尽可能减少 if else-if else 条件语法，改用 switch case 或者使用策略模式

非项目负责人避免修改 eslint 规则，无法处理的 eslint 错误考虑通过//eslint-disable-next-line 注释头处理

复杂的数据操作优先考虑使用工具库，如 lodash

删除确定无用的注释掉的代码，保持代码整洁
