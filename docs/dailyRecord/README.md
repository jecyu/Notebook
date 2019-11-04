# 2019

## 十月

### 什么时候使用 Try Catch

### 如何处理垂直的高度自适应分配

场景：垂直的三个模块，如何自适应分布浏览器的高度。
calc 需要知道准确的高度，比较麻烦

可以通过 flex 布局来解决
```html
<div class="container">
  <div class="header">header</div>
  <div class="main">main</div>
</div>
```
```css
.container {
    height: 500px;
    background: gray;
    display: flex;
    flex-direction: column;
  }
  .header {
    height: 100px;
    background: yellow;
    border: 1px solid red;   
  }
  .main {
    /* 这个时候 main height 实际高度是多少，header + main 的总高度是否大于 500px */
    /* height: 100%; */
    border: 1px solid red;   
    background: skyblue;
    flex-grow: 1;
  }
```

但是上面的方法有风险，如果 header 的值是动态的话，那么 main 的高度也会跟着变化。

### 用户登录认证

公钥加密，私钥解密

```js
async userLogin({ commit }, { loginname, loginpwd }) {
  const key = await getRsaKey();
  // rsa加密
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(key);
  const rsapwd = encrypt.encrypt(loginpwd);
  const data = await loginRsa({
    loginName: loginname,
    loginPwd: rsapwd
  });
  const { userCode, ownRegion } = data;
  commit(SET_USER_INFO, data);
  commit(SET_LOGIN_STATUS, true);
  commit(SET_USER_SESSION, userCode); // todo
  setSession(userCode); // todo
  setUserRegionCode(ownRegion);
  setUserMapExtent(ownRegion);
  return data;
},
```

### 使用 JavaScript 获取 Base64 PNG 的像素颜色

https://stackoverflow.com/questions/3528299/get-pixel-color-of-base64-png-using-javascript
原理：通过把图片画到 canvas 上，通过 `getImageData` 获得。

```js
var image = new Image();
image.onload = function() {
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  var context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  // Now you can access pixel data from imageData.data.
  // It's a one-dimensional array of RGBA values.
  // Here's an example of how to get a pixel's color at (x,y)
  var index = (y * imageData.width + x) * 4;
  var red = imageData.data[index];
  var green = imageData.data[index + 1];
  var blue = imageData.data[index + 2];
  var alpha = imageData.data[index + 3];
};
```

### 计算容器顶部的高度

`Element.getBoundingClientRect()`

### webpack 编译时与运行时

#### 传递意义上的编译时与运行时

编译时

编译时顾名思义就是正在编译的时候，什么叫编译呢？就是编译器帮你把源代码翻译成机器能识别的代码。（**当然只是一般意义上这么说，实际上可能只是翻译成某个中间状态的语言。**比如 Java 只有 JVM 识别的字节码，React 的 JSX 代码经过 babel + react 编译。 ）编译时就是简单的作一些翻译工作，词法分析、语法分析之类的。

运行时

代码跑起来，被载入内存中，在内存中做些操作，做些判断。

例子一：

例如，常见的 C+和 C# 数组越界检查的例子，编译器编译时没有语法错误，但是运行时，数组越界了。

#### webpack 的编译时与运行时

### vueCli 添加环境变量

#### 导语

目的：根据不同环境下下部分打包出不同的系统。其中 `process.env` 是 webpack 自带的，`VUE_APP_`是 VueCli 下。

#### 原理

Todo: webpack 配置打包编译，vuecli 到 webpack，yarn permission 等

模式是 Vue CLI 项目中一个重要的概念。默认情况下，一个 Vue CLI 项目有三个模式。但是我们也可以自己新添加模式。一个模式可以包含多个环境变量。也就是说，每个模式都会将 `NODE_ENV` 的值设置为模式的名称。在项目根目录创建一个名为 `.env.partBuild` 的文件，那么在这个文件里声明过的变量就只会在 `partBuild` 模式下被载入。

`NODE_ENV`

```
"part-build": "vue-cli-service build --mode partBuild",
```

### 部分打包

第一步：根目录新建文件 `.env.partBuild`， 因为 Node_ENV 会被覆盖为 partBuild，因此需要重新设置为 production，这样就可以构建出生产环境应用，并且获得了`process.env.VUE_APP_PARTBUILD`的变量值。

```bash
NODE_ENV=production
VUE_APP_PARTBUILD = true
```

第二步：`package.json`里设置`--mode`为`partBuild`

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "partBuild": "vue-cli-service build --mode partBuild"
  }
}
```

第三步：在 JS 文件里进行使用

```js
if (process.env.VUE_APP_PERMISSION === 'true') {
}
```

#### 开发环境下开启运维

```js
/**
 *  判断是否为开发环境
 *  @returns Boolean
 */
export const isDev = () => process.env.NODE_ENV === 'development';
/**
 * @description: 判断是否开启运维
 * @returns {Boolean}
 */
export function isPermission() {
  // 开发环境根据 process.env 变量去判断
  if (isDev()) {
    return process.env.VUE_APP_PERMISSION === 'true' ? true : false;
  } else {
    // 非开发环境才去根据 window.__USEPERMISSION__ 去判断是否开发
    return window.__USEPERMISSION__;
  }
}
```

- [VueCli 环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)

### axios 取消请求

取消 http 请求，axios 文档里提供了两种用法：

```js
// 第一种：使用 CancelToken
const { CancelToken, isCanCel } = axios;
const source = CancelToken.source();

axios
  .get('/user/12345', {
    cancelToken: source.token
  })
  .catch(thrown => {
    if (isCancel(thrown)) {
      // 获取 取消请求 的相关信息
      console.log('Request canceled', thrown.message);
    } else {
      // 处理其他异常
    }
  });

axios.post(
  '/user/12345',
  {
    name: 'new name'
  },
  {
    cancelToken: source.token
  }
);

// 取消请求。参数是可选的，参数传递一个取消请求的相关信息，在 catch 钩子函数里能获取到
source.cancel('Operation canceled by the user.');

// 第二种：给构造函数 CancelToken 传递一个 executor 函数作为参数。这种方法的好处是，可以用同一个 cancel token 来取消多个请求
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // 参数 c 也是个函数
    cancel = c;
  })
});

// 取消请求，参数用法同上
cancel();
```

项目中用法示例
在一个真实的项目中，一般都会对 axios 进行二次封装，针对请求、响应、状态码、code 等做处理。贴一个项目里常用的 request.js:

```js
import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';

// 创建一个 axios 实例，并改变默认配置
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
});

// 请求拦截
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => response,
  error => {
    alert(error);
    return Promise.reject(error);
  }
);

export default service;
```

对于某一个请求添加取消的功能，要在调用 api 时，加上 cancelToken 选项，使用时的示例：

```js
// api.js
import request from 'request'
export function getUsers(page, options) {
  return request({
    url: 'api/users',
    params: {
      page
    },
    ...options
  })
}


// User.vue
import { CancelToken, isCancel } from 'axios'
import { getUsers } from 'api'

...

cancel: null

...

toCancel() {
  this.cancel('取消请求')
}

getUsers(1,
  {
    cancelToken:  new CancelToken(c => (this.cancel = c))
  }
)
.then(...)
.catch(err => {
  if (isCancel) {
    console.log(err.message)
  } else {
    ...
  }
})
```

以上，我们就可以顺顺利利地使用封装过的 axios，取消某一个请求了。其原理无非就是把 cancelToken 的配置项，在调用 api 时加上，然后就可以在业务代码取消特定请求了

- 参考资料：https://github.com/ohhoney1/notes/issues/3

## 九月

### 如何重新加载一个页面

JavaScript 1.0

```js
// creates a history entry
window.location.href =
  window.location.pathname + window.location.search + window.location.hash;
```

JavaScript 1.1

```js
// does not create a history entry
window.location.replace(
  window.location.pathname + window.location.search + window.location.hash
);
```

JavaScript 1.2

```js
// 从服务器加载所有的内容
window.location.reload(true);
```

### vuecli3 新建项目，main.js 引入 iview 样式报错

No PostCSS Config found
原因：应该是 vuecli3 对 postcss 没做处理。
解决：把 postcss.config 删除即可。

### 实现两个组件的互斥效果

### iview 合并指定两个或多个单元格

### 统计代码行数

#### 导语

最近需求问起了代码的统计行数是多少，主要是在申请软件著作权的时候，申请表格要求提交代码量。有两种方式统计，一是通过自定义脚本，二是通过第三方工具。

#### 自定义脚本

**脚本 1:**

```bash
find . "(" -name "*.m" -or -name "*.mm" -or -name "*.cpp" -or -name "*.h" -or -name "*.rss" ")" -print | xargs wc -l
```

缺点：

- 需要自定义脚本：不同的编程语言，有不同的文件后缀名，需要自行配置；
- 不能过滤掉注释；
- 不能过滤掉空行

**脚本 2**

```bash
find . -name "*.m" -or -name "*.h" -or -name "*.xib" -or -name "*.c" |xargs grep -v "^$"|wc -l
```

改进：
去掉空行
`xargs grep -v "^$"`

大家都知道用 `wc -l` 命令进行代码行数统计，但是它会将代码中的注释、空行所占用的文本行都统计在内。如果想查看一个 tar 包或一个项目目录中“实际”的代码行数并且不愿意自己去写一个脚本来做此类工作，那么可以考虑使用 cloc。

#### CLOC

[cloc](https://github.com/AlDanial/cloc) 是一个 perl 脚本，它可以统计很多种编程语言的代码文件中的空行、注释以及实际的代 码行数。

CLOC 是 Count Lines of Code 的意思，可以计算空行数、注释行数、各种语言的有效行数，还可以比较两个代码库在各种行数之间的不同。CLOC 是完全由 Perl 实现的，不依赖第三方组件，移植性强。

下载安装 cloc.

```bash
 brew install cloc
```

查看命令

```js
cloc --help
```

#### 拓展

- [git 代码统计](https://segmentfault.com/a/1190000008542123) —— 可以统计本地 Git 仓库中不同贡献者的代码行数的一些方法

### iframe 跨域通信

- 操作 iframe 的 dom 元素
  contetnWindow
- 操作 iframe 的父级元素

#### 前置知识

iframe 标签：

`window.postMessage` 的功能是允许浏览器跨域在两个窗口间发送数据信息。它不是浏览器跟服务器之间交互，而是在两个客户端之间通信。

`postMessage`是挂载在`window对象上`的，所以等`iframe`加载完毕后，用`iFrame.contentWindow`获取到`iframe`的`window`对象，然后调用`postMessage`方法，相当于给子页面发送了一条消息。我们只需要在子页面监听 message 事件，并且设置好回调函数即可

> MDN 文档 [window.postMessage
> ](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

技术难点：

- iframe 重新设置 src 不会重新加载的问题
- iframe 所在的页面中通知父页面关闭模态框以及其他操作的问题（父子通信）

需要注意传递值时，要确保好**对方准备接收数据**的时候，再发送信息过去。那么如果处理呢？设置通信的关键词，必要的时候还可以加密处理。

#### 返回数据

```js
/**
 * @vuese
 * 接收dataeye的消息
 * @arg res event
 */
onmessage(res) {
  if (this.dataeyeUrl.includes(res.origin)) { // 注意本地开发时的 origin
    this.validateMessage(res.data);
  }
},
```

### iframe 在更改了 src 之后对应的网页并未刷新

子系统是通过 iframe 嵌入到父系统的，父系统会通过子系统发送的消息 URL，会直接访问子系统。出现了 iframe 在更改了 src 之后对应的网页并不是对应的内容。于是看了网上的方案，在更改 `iframe src` 属性值之前加上这一句。

```js
document.getElementId('iframeId').contentWindow.location.reload(true);
```

`window.Location.reload` 是重新加载当前需要的所有内容，`Location.reload()` 方法用来刷新当前页面。该方法只有一个参数，当值为 `true`时，将强制浏览器从服务器加载页面资源，当值为 `false` 或者未传参时，浏览器则可能从缓存中读取页面。引用 MDN [Location.reload()
](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload)

```js
// 无缓存刷新页面（但页面引用的资源还是可能使用缓存，
// 大多数浏览器可以通过设置在打开开发者工具时禁用缓存实现无缓存需求）
window.location.reload(true);
```

与之对应的方法是 `window.Re`

通过上面的设置后，仍然不能实现效果。继续往下分析

#### 解决

由于系统的技术是 Vue，通过排查问题后，让子系统是立即监听路由的变化，来加载对应的组件。

```js
watch: {
  id: {
    handler(val) {
      val ? (this.pageId = val) : (this.pageId = this.$route.params.pageId);
    },
    deep: true,
    immediate: true
  },
  pageId: {
    handler() {
      this.$nextTick(() => this.setPageSize())
    },
    immediate: true
  }
},
```

并且在父系统上，把已有的 iframe 先移除，再重新加载，避免使用 `reload` 不生效的情况。

```js
this.dataeyeShow = false; // 先关闭
this.$nextTick(() => {
  this.enterdataeyeUrl = `${this.$store.getters.config.DATAEYE}releasePage/${pageId}`;
  this.dataeyeShow = true; // 后开启，重新渲染
});
```

#### iframe 有哪些缺点？

- iframe 会阻塞主页面的 `onload` 事件
- 搜索引擎的检索程序无法解读这种页面，不利于 SEO

可以通过 `JavaScript` 动态给 `iframe` 添加 `src` 属性值，这样就可以绕开上面两个问题。

### 表单锁定与解锁

#### 头脑风暴

- 动态绑定指令。https://codeday.me/bug/20190406/896886.html

应用场景：

复盘：todo: 看下具体的 iview 或者是 ant-design 都是怎么处理 disable 属性的。

- 使用 fieldSet 的属性，

- 直接给组件添加`disabled`属性，但是这样的话，如果需要禁用多个组件的话，就很很麻烦了。因此，我们需要用指令来代替。
- 改写现有的指令，提供颜色。

- 自定义指令
  动态判断。

```js
export default {
  inserted(el, binding) {
    if (binding.value && binding.value.disabled) {
      el.classList.add('system-model-disabled');
    }
  },
  // 所在组件  vnode 更新时调用
  update(el, binding) {
    if (binding.value && binding.value.disabled) {
      el.classList.add('system-model-disabled');
    } else if (el.classList.contains('system-model-disabled')) {
      el.classList.remove('system-model-disabled');
    }
  }
};
```

#### 参考资料

- [如何 disabled 禁用所有表单 input 输入框元素](https://www.zhangxinxu.com/wordpress/2019/04/disabled-all-form-elements/)

### 节点的属性

- 树
- 列表
- 是否可以取消选中

应用

```js
 handleClickItem(data) {
    const { id } = data;
    this.selectedItem = this.onSelectedChange(id);
    // this.$emit("update:condition", this.topicList);
    this.$emit("on-selected-change", this.selectedItem);
  },
  onSelectedChange(id) {
    // 找到对应的项目
    const node = this.topicList.find(val => {
      return val.id === id;
    });
    if (node) {
      this.$set(node, "selected", !node.selected);
    }
    // 取得补集，均设置为 false
    const elseNodes = this.topicList.filter(val => {
      return val.id !== id;
    });
    if (elseNodes && elseNodes.length > 0) {
      elseNodes.forEach(val => {
        this.$set(val, "selected", false);
      });
    }

    // 取得选中的项目
    const selectedItem = this.topicList.find(val => {
      return val.selected;
    });
    if (!selectedItem) return {};
    return selectedItem;
  },
```

在 vue 中，动态设置节点属性的话，要用`$set`才能保持响应式。

```js
if (!data.hasData) {
  // 设置禁用
  this.$set(data, 'disabled', true);
}
```

### CSS 伪类的应用

激活的状态下，需要禁止 hover 的引用。

### 用 CSS 隐藏页面元素的 5 种方法

#### 导语

日常中，我们可能会遇到不少跨域通信的问题，其中一个可以实现跨域通信的方案是通过`postMessage iframe 跨域`来通信，但是我不希望`iframe`元素占用我的 CSS 布局，我想要视觉上隐藏它，但是不能影响它的正常功能如通信。用 CSS 隐藏页面元素有许多种方法，

- opacity 设为 0
- visibility 设置 hidden。
- 将 display 设置 none
- 将 position 设为 absolute

#### Opacity

`opactiy` 属性的意思时设置一个元素的透明度。它不是为改变元素的边界框（bounding box）而设计的。这意味着将 opacity 设为 0 只能从视觉上隐藏元素。而元素本身依然占据自己的位置并对网页的布局起作用。它也将响应用户的交互。

```js
.hide {
  opacity: 0;
}
```

除了用来隐藏元素外，我们可以用 `opacity` 实现一些体验比较好的动画。

```css
.o-hide {
  opacity: 0;
  transition: all ease 0.8s;
}

.o-hide:hover {
  opacity: 1;
}
```

#### Visibility

第二个属性 `visibility` ，将它的值设为 `hidden` 将隐藏我们的元素。跟 `opacity` 属性一样，被隐藏的元素依然会对我们的网页布局起作用。与 `opacity` 不同的是它不会响应任何用户交互。

注意：如果一个元素的 `visibility` 被设置为 `hidden`，同时想要显示它的某个子孙元素 A，只要将这个 A 的 `visibility` 显式设为 `visible` 即可。

#### Display

`display` 属性真正隐藏元素，将 `display` 属性设为 `none` 确保元素不可见并且连盒模型也不生成，使用这个属性被隐藏的元素不占据任何空间，而且任何对该元素直接的用户交互操作都不生效。为这个属性添加过度动画是无效的，它的任何不同状态值的之间的切换总是会立即生效。

注意的是，通过 DOM 依然可以访问到这个元素。Vue 中的 `v-show` 指令即是操作了这个属性。`v-if` 则完全不渲染这个 dom 元素。

#### Position

假设有一个元素你想要与它交互，但是你又不想让它影响你的网页布局，没有合适的属性可以处理这种情况（opacity 和 visibility 影响布局， display 不影响布局但又无法直接交互。在这种情况下，你只能考虑将元素移出可视区域。这个办法既不会影响布局，有能让元素保持可以操作。下面是采用这种办法的 CSS：

```css
.hide {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
```

用 DOM 模拟复选框和单选按钮，但用这个方法隐藏真正的 checkbox 和 radio 元素来“接收”焦点切换.

#### Clip-path

隐藏元素的另一种方法是通过剪裁它们来实现。在以前，这可以通过 clip 属性来实现，但是这个属性被废弃了，换成一个更好的属性叫做 clip-path。

```css
.hide {
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);
}
```

#### 参考资料

- [用 CSS 隐藏页面元素的 5 种方法](https://75team.com/post/five-ways-to-hide-elements-in-css.html)

### 正则表达式验证——过滤掉带有分析方式的名称

```js
this.indicatorNames = indicatorNames.filter(item => {
  return !/增长率|增长比|增减量/.test(item);
});
```

### vuepress 添加支持图片缩放

使用 vuepress 过程中，难免需要引入图片解释。有时候图片过大，小图会很不清晰，这时候就很有必要支持图片可缩放。vuepress 官方提供了插件
`vuepress-plugin-zooming`。注意如果： vuepress 版本小于 1.0 过低不支持，应该升级 vuepress 版本，删除旧的版本，重新安装。

#### 安装

```bash
yarn add vuepress-plugin-zooming
```

#### 使用

在配置文件中引入`vuepress-plugin-zooming`。

```js
// .vuepress/config.js
module.esxports = {
  plugins: [
    'vuepress-plugin-zooming',
    {
      // 支持点击缩放的图片元素的选择器
      selector: 'img',
      // 进入一个页面后，经过一定延迟后使页面中的图片支持缩放
      delay: 1000,

      // medium-zoom 的 options
      // 默认值: {}
      options: {
        bgColor: 'black',
        zIndex: 10000
      }
    }
  ]
};
```

#### 参考

- [VuePress 社区](https://vuepress.github.io/zh/plugins/nprogress/#%E5%AE%89%E8%A3%85)

## 八月

<!-- ### 行政区划的分层分级 -->

### 正则表达式的应用

```js
Selector containing string (case-sensitive)

// jQuery
$("selector:contains('text')");

// Native
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.from(elements).filter(function(element) {
    return RegExp(text).test(element.textContent);
  });
}
```

检测文件时，跑 lint，从多个文件进行处理。
（场景：检测是否带有 es6 语法导致创建微件错误，低版本浏览器）

```js
yarn lint widgets/**/Widget.js
```

### vue 动态增减组表单

输入数据，回收数据。
多个弹框带来的问题。

#### 导语

要实现这样的一个需求，渲染多个组的表单，每组包含相同的表单控件，需要对表单进行双向绑定，之所以要绑定是因为要实现历史的条件的恢复，也就是默认的选中功能。下面通过两个业务场景来阐述。

抽象：输入 ➡️ 输出
对应：存入以及取出

### 双向绑定

是否用 iview 等第三方组件

#### 实现表格里存取表单的数据

问题：一开始没有绑定唯一的 key 时，会出现这样的情况。选择一个下拉框时，其他下拉框的值也被同步设定了，因为它们的 key 值相同。

解决方案一：动态生成每个下拉框需要的 key 值，然后通过 v-model 进行双向绑定，存到父组件的一个对象 selectedRule 里，当前一个组件几十个一个 key 不会出现页面卡顿的情况，如果超过几百个的话可能会有操作延迟的情况。

解决方案二：不用 v-model 绑定。

#### 动态添加组控件表单

```js
 handleFormModAdd() {
      const { modules, module } = this;
      let newModule = JSON.parse(JSON.stringify(module)); // 通过深拷贝 copy 来避免相同 key 名称 的关联
      // modules.push(module);  key 相同会导致选择问题
      modules.push(newModule);
    },
```

<!-- ### vue 中绑定常量数组出现的奇怪 bug

### 根据权限不同加载不同的路由表 -->

### JS 求出两个数组的交集

#### 导语

需要针对指标项进行分类，后台把所有的指标项都返回，数据格式为数组形式，数组里包含指标对象，分类文件通过前端 JSON 配置。因此在渲染的时候（这里我最终渲染的 UI 为树），需要求它们的交集，也就是抽象成为求两个数组的交集。

```js
// 获取的信息
const a = [
  {
    id: 1,
    title: '耕地面积',
    dims: []
  },
  {
    id: 2,
    title: '常住人口',
    dims: []
  }
];
// 配置文件
const b = [
  {
    title: '分类一',
    value: [{ id: 1, title: '耕地面积' }]
  },
  {
    title: '分类二',
    value: [{ id: 2, title: '常住人口' }]
  }
];
// 目标输出
const target = [
  {
    title: '分类一',
    children: [{ id: 1, title: '耕地面积' }]
  },
  {
    title: '分类二',
    children: [{ id: 2, title: '常住人口' }]
  }
];
```

#### 解决方案

一开始考虑用原生 JS 这样实现，但是发现不行，因为我的需求是希望通过比对数组里的对象某个属性，下面这种方式既无法比较对象，也无法比较到对象里面的值。

```js
let intersection = a.filter(v => b.includes(v));
```

由于业务的关系，先使用了 lodash 提供了这个 api，传入两个数组以及它们共同的属性即可。

```js
intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
```

具体业务实现

```js
const data = [];
const [indexDataCategory, indicators] = await Promise.all([
  this.fetchIndexDataCategory(),
  this.fetchIndicators()
]);
// 取得分类后的指标项
const data = [];
// 取出 value 对象的 title/id 作为 key 对比
indexDataCategory.forEach(item => {
  const obj = {};
  obj.title = item.label;
  obj.children = this.$lodash.intersectionBy(indicators, item.value, 'title');
  data.push(obj);
});
```

#### lodash 的实现原理

当然，我们不会满足于仅仅实现效果，接下里我们看看 lodash 的实现原理。
待补充。

#### 总结

### Vue CLI 请求本地的 JSON 文件

有些时候，需要在前端配置 JSON 文件，通常是把静态文件放到本地项目的 static 文件夹下。我们可以通过使用 axios 进行请求，具体如下：

```js
async fetchIndustryApplication() {
  try {
    const res = await this.$http.get(
      "static/mockdata/FZBZ_JSON/ai_analysis_indexData_industryApplication.json"
    );
    const data = res.data;
    this.industryApplications = data.data;
  } catch (err) {
    console.log(err);
  }
}
```

### 在项目开发中，新安装一个包，应该放到 package.json 的 dependencies 还是 dependencies 上呢？

结论：其实放到哪里都没关系，当我们 `npm install` 的时候两种包都会下载。但是如果将 NODE_ENV 设置为 produciton 就只会安装 dependencies，这样在持续集成的时候，进行自动化部署的时候就会花更少的时间。(但是如果要在线上跑测试的话，就需要 npm install 安装所有依赖。因为测试框架 Jest 安装在开发依赖对象里。）
这里当然我们也可以使用下面的命令：

```bash
npm install  - -prod[uction] 安装 dependencies 或 NODE_ENV=production npm install
npm install  - -dev[elopment] 安装 devDependencies
```

这里是社区的建议：

- dependencies
  - 框架：React，AngularJS，Vue.js
  - 工具库：lodash
- devDependencies
  - 测试框架：Jest，Mocha，Jasmine
  - 格式化工具：ESLint，Prettier
  - 构建工具、预处理器：webpack，Babel（因为生产环境的代码已经被转换和压缩过了。）

### axios 不会对 URL 中的功能性字符进行编码

#### 导语

在使用 axios 的 get 请求参数出现了错误。
`http://10.10.67.67/dgp-server-web-nr/rest/pas/v1/naturalRes/indicator/dimension/date?ids[]=500565`

在 axios 中的 GET 基本使用

```js
axios
  .get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })
  .then(function() {
    // always executed
  });
```

这里是对 GET 进行了一个此封装。

实际中的调用：

```js
// xxxx/module.js 模块封装的函数
import { GET } from '@/plugins/axios';
export function getCityByIndicators(params) {
  return GET(
    `rest/pas/v1/naturalRes/indicator/dimension/city`,
    '根据指标获取以行政区排序的城市数据',
    params
  );
}
```

在实际的 Vue 组件中进行请求

```js
// xxx.vue
async getCityRegionData() {
    try {
      const params = {
        "ids[]": this.itemData.indicatorIds.join()
      };
      const cityRegionData = await getCityByIndicators(params);
      this.cityRegionData = cityRegionData;
    } catch (err) {
      console.log(err);
    }
  },
```

经过排查后，发现是 axios 中会对 get 请求的整个 url 进行 encodeURI，导致有些 get 方法不能传 []。

#### URL 包含特殊字符

在请求中如果 url 包含特殊字符的话，可能导接口接收参数失败，所以前端需要对特殊自负进行 encode，方法有两种：

- encodeURI()

对整个 url 进行编码，会避开 url 中的功能性字符，例如，&?[]

编码前：http://10.10.67.67:8080/api/chain/basic/users?params=+[

编码后：http://10.10.67.67:8080/api/chain/basic/users?params=+%5B

- encodeURIComponent()

对某个参数进行编码，会编码所有特殊字符

编码前：http://10.10.67.67:8080/api/chain/basic/users?params=+[
编码后：http://10.10.67.67:8080/api/chain/basic/users?params=%2B%5B

#### 针对对象形式的请求

#### 解决

通过以上分析可知，我们需要在 axios 中对 get 方法进行处理，可以在请求拦截器中对 get 方法进行单独处理，避开 axios 的 encodeURI，注意的是参数 针对 key 和 value 都需要进行 encodeURIComponent 编码。

```js
interceptors(instance = this.instance) {
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 处理 axios 不会对 url 中的功能进行编码
      let url = config.url;
      // 针对 get 参数编码
      if (config.method === 'get' && config.params) {
        url +='?';
        let keys = Object.keys(config.params);
        for (let key of keys) {
          url += `${encodeURIComponent(key)}=${encodeURIComponent(
            config.params[key]
          )}&`
        }
        url = url.substring(0, url.length - 1);
        config.params = {}; // 清空
      }
      config.url = url;
      return config;
    }
  )
}
```

#### 总结

虽然我们在实际项目中，前后端请求遵循 restful 风格，但是遇到老项目时，后端的接口不能动的情况下，就需要改动前端代码的 axios 代码了。

### vueCli 本地开发设置个区分明显的 favicon

- 掘金文章：[vueCli 本地开发设置个区分明显的 favicon](https://juejin.im/post/5d61566c5188251e69336f3b)

## 七月

### Vue 执行默认选中

```js
async created() {
  // 这里执行初始化数据获取
  if (/*xxx*/) {
    this.panelData = this.getData();
   //  ....
  }
  // 默认选中第一项, 默认选中第一项，nextTick 等待 pageData 拿到数据，渲染 dom 后更新完毕
  await this.$nextTick();
  if (this.panelData[0].children.length > 0) {
    this.handleSelectList(this.panelData[0].children[0]);
  }
},
methods: {
  checkIsSelected(data) {
    this.defaultSelectedItems.forEach(v => {
      if (v.name === data.name) {
        this.$set(data,'isSelected', true);
      }
    })
  }
}
```

### async/await 使用

#### 捕获错误

```js
async function asyncAwaitTryCatch() {
  try {
    const api = new Api();
    const user = await api.getUser();
    const friends = await api.getFriend();

    await api.throwError();
    console.log('Error was not thrown');

    const photo = await api.getPhoto(user.id);
    console.log('async/await', { user, friends, photo });
  } catch (err) {
    console.log(err);
  }
}
```

#### 组合

- 调用 async 函数作为一个 promise 对象来返回数据

```js
async function getUserInfo() {
  const api = new Api()
  const user = await api.getUser()
  const friends= await api.getFriends(user.id)
  const photo = await api.getPhoto(user.id)
  return {user, friends, photo }
}

function promiseUserInfo() {
  getUserInfo().then({ user, friends, photo }) => {
    console.log('promiseUserInfo', { user, friends, photo })
  }
}

// 或者继续使用 async/await 语法
async function awaitUserInfo () {
  const { user, friends, photo } = await getUserInfo()
  console.log('awaitUserInfo', { user, friends, photo })
}
```

- 检索前十个用户的所有数据

```js
async function getLotsOfUserData() {
  const users = [];
  while (users.length < 10) {
    users.push(await getUserInfo());
  }
  console.log('getLotsOfUserData', users);
}
```

- 并发请求

```js
async function getLotsOfUserDataFaster() {
  try {
    const userPromises = Array(10).fill(getUserInfo());
    const users = await Promise.all(userPromises);
    console.log('getLotsOfUserDataFaster', users);
  } catch (err) {
    console.log(err);
  }
}
```

### transform 对 fixed 的影响

- 需求：需要对 iview 的模态框的样式进行自定义覆盖，因此就是 transfer:false 把 Modal 渲染到父组件内。此时会出现问题。
- 症状：使用了 iview Modal 组件时，如果设置了 transfer: false 属性时，有时候会出现无法打开 Modal 框的现象，原因可能在于父元素设置了
  transform 属性。因此
- 原因：应用了 transform 属性的元素会导致该元素形成一个新的包含块，然后其后代元素如果有 fixed 定位的属性，那么其元素将会以该父元素作为包含块。
- 分析：iview 使用了 transfer-dom 指令来解决上面的问题，把 modal 移动到 body 下面。
- 解决：因此如果需要自定义覆盖 modal 的样式，又不能渲染到父组件内，要想避免污染全局样式，此时建议通过类名去限制作用域。

测试样例

```html
<div style="transform: translateX(-50%); height: 900px;">
  <div>
    <Modal v-model="ModalTest.isShow" :transfer="false" title="Modal"></Modal>
  </div>
</div>
```

### flex 布局中使用 iview 的 table 表格的宽度会计算出错,导致很长的宽度

场景：两边固定，中间自适应

- 原因：设置了 flex-grow 元素的子级宽度问题
- 解决：给该子元素设置 `overflow: auto;` 或 `width: 0;`

```css
.container {
  display: flex;
  height: 100%;
}
.left {
  width: 300px;
  /* flex: 0 0 300px; */
  flex-shrink: 0;
  background: chocolate;
}
.right {
  width: 200px;
  flex-shrink: 0;
  /* flex: 0 0 200px; */
  background: cadetblue;
}
.content {
  flex-grow: 1;
  background: hotpink;
  overflow: hidden;
}
```

### 了解 babel

1. babel-loader: 负责 es6 语法转化
2. babel-preset-env: 包含 es6、7 等版本的语法转化规则
3. babel-polyfill: es6 内置方法和函数转化垫片
4. babel-plugin-transform-runtime: 避免 polyfill 污染全局变量
   需要注意的是, babel-loader 和 babel-polyfill。前者负责语法转化，比如：箭头函数；后者负责内置方法和函数，比如：new Set()。

#### babel

Babel 什么都不做，它的行为就像 const Babel = code => code;通过解析代码，然后再次生成相同的代码。您将需要为 Babel 添加一些插件来执行诸如置换 es6、JSX 之类的操作

#### babel-core

如果你想在你的真实项目中使用 babel，你需要安装 babel 但是
没有 `babel` 包可用。

babel 将它分成两个独立的包：`babel-cli`和`babel-core`
**babel-cli**：可用于从命令行编译文件。
**babel-core**：如果你想使用 Node API，你可以安装`babel-core`
，与“babel-cli”相同，除非您在应用程序内以编程方式使用它。

在生产之前使用`babel-cli`或`babel-core`编译文件。

#### preset vs plugin

我们可以使用`babel插件(es2015)`一次添加一个特性(es6,JSX)，或者我们可以使用`babel预置`来包含特定年份的所有特性(es6)。预置使设置更容易。

#### babel-preset-es2015

`babel-preset-env`支持 es2015 特性，并取代了 es2015、es2016、es2017 和最新版本。因此，使用`babel-preset-env`，它的行为与`babel-preset-latest`完全相同(或者将 babel-preset-es2015、babel-preset-es2016 和 babel-preset-es2017 放在一起)。

#### babel-preset-react

将`JSX`转换为`createElement`调用，如将`react`纯类转换为函数，并删除`prop`类型。

#### babel-polyfill

没有`babel-polyfill`, babel 只允许您使用箭头函数、析构、默认参数和 ES6 中引入的其他特定于语法的特性。新的 ES6 内置组件(如 Set、Map 和 Promise)必须是 polyfill，以包含应用程序入口点顶部需要的 polyfill。

#### babel-loader

你理解了 babel-core，babel-cli，以及为什么需要预设，插件，现在
你每次都是从`babel-cli`逐个文件地编译 ES6 到 ES5。
要摆脱这个，你需要捆绑任务`/ js`文件。 因此你需要用`WebPack`。

`loader` 有点像任务，它们通过将各种文件转换为 webpack 可以处理的有效模块，为各种文件提供了利用 webpack 捆绑功能的能力。

Webpack 通过`Babel -loader`提供了强大的 Babel 支持。

#### devDependencies

当您部署应用程序时，需要安装依赖项中的模块，否则应用程序将无法工作。devDependencies 中的模块不需要安装在生产服务器上，因为您不是在这台机器上开发的。

这些包只用于开发和测试。

#### 难道没有任何单一的依赖来取代它们吗？

当您阅读上述时，您的确需要一些预置和加载器来转换 es2015 或 JSX 文件。

#### babel -> @babel

从`Babel 7`开始，Babel 团队就开始使用[scoped 包](https://babeljs.io/docs/en/next/v7-migration#scoped-packages)，这样做是为了更好地区分哪些包是官方的，哪些包是第三方的。
所以你现在必须使用@ babel / core 而不是 babel-core。

您的依赖项需要像这样修改：

babel-cli - > @ babel / cli。 例如：babel-与@ babel /。

## 三月

### js 修改对象的 key 值

ES5

```bash
var array = [
  {
    id: 1,
    name: '小明'
  },
  {
    id: 2,
    name: '小红'
  }
]

// 旧 key 到新 key 的应用
for (var i = 0; i < array.length; i++) {
  var obj = arrray[i];
  for (var key in obj) {
    var newkey = keyMap[key];
    if (newkey) {
      obj[newKey] = obj[key];
      delete obj[key];
    }
  }
}
```

ES6

```bash
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );
```

### Echarts 如何调整 legend 和图表的间距

在 opotions 中加入属性：

```bash
grid: {
  top:'25%', //距上边距
  left:'25%', //距离左边距
  right:'25%', //距离右边距
  bottom:'25%', //距离下边距
}
```

### vue 父子组件数据传递

1. 通过 props 的方式向子组件传递(父子组件)
2. vuex 进行状态管理(父子组件和非父子组件) vuex
3. 非父子组件的通信传递 Vue Event Bus，使用 Vue 的实例，实现事件的监听和发布，实现组件之间的传递。
4. inheritAttrs + $attrs + $listeners

### $attrs、$listeners、inheritAttrs

**\$attrs:** 继承所有的父组件属性（除了 prop 传递的属性、class 和 style ）

**inheritAttrs:** 默认值 true,继承所有的父组件属性（除 props 的特定绑定）作为普通的 HTML 特性应用在子组件的根元素上，如果你不希望组件的根元素继承特性设置 inheritAttrs: false,但是 class 属性和 style 会继承。

**\$listeners:**，它是一个对象，里面包含了作用在这个组件上的所有监听器，你就可以配合 v-on="\$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。

**可以使用 $attrs 和 $listeners 对 iview 组件进行二次封装**，如 modal(主要用于解决 iview 默认点击确定会关闭自动模态框的问题，
( `closeByOuter`属性 + `@on-confirm`事件 ))， 通过 v-bind="\$attrs" 将父组件的 attrs 一起传给子组件。`$listeners` 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="\$listeners" 传入内部组件--在创建更高层次的组件时非常有用，简言之：\$attrs 可以打包父组件的属性，同样的，`$listeners` 则打包父组件的事件。通过 v-on="\$listeners" 可以在子组件触发父组件的父组件的事件。

```bash
<template>
  <Modal v-model="show" v-bind="$attrs" v-on="$listeners">
    <div slot="header" class="modal-header">
      <span class="title">{{$attrs.title}}</span>
    </div>
    <slot></slot>
    <div slot="footer" class="modal-footer">
      <span class="close-btn" @click="handleClose">取消</span>
      <NrButton @click="handleConfirm">确定</NrButton>
    </div>
  </Modal>
</template>

export default {
  inheritAttrs: false,
  name: "NrModal",
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    // 点击确定后，是否在外部控制弹窗消失
    closeByOuter: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      show: this.value
    };
  },
  watch: {
    show(n) {
      this.$emit("input", n);
    },
    value(n) {
      this.show = n;
    }
  },
  methods: {
    handleClose() {
      this.$emit("on-close");
      this.show = false;
    },
    handleConfirm() {
      this.$emit("on-confirm");  # 通过 v-on="\$listeners" 可以在子组件触发父组件的父组件的事件。
      if (!this.closeByOuter) {
        this.show = false;
      }
    }
  }
};
```

## 二月

### 日期显示

```bash
week(day) {
      let weekday = new Array(7);
      weekday[0] = "周日";
      weekday[1] = "周一";
      weekday[2] = "周二";
      weekday[3] = "周三";
      weekday[4] = "周四";
      weekday[5] = "周五";
      weekday[7] = "周六";
      return weekday[day];
},
timeFormate() {
    let year = new Date().getFullYear();
    let month =
      new Date().getMonth() + 1 >= 10
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1);
    let date =
      new Date().getDate() >= 10
        ? new Date().getDate()
        : "0" + new Date().getDate();
    this.yearData =
      year +
      "年" +
      month +
      "月" +
      date +
      "日" +
      " " +
    this.week(new Date().getDay());
    // 时钟
    let hh =
    new Date().getHours() >= 10
          ? new Date().getHours()
          : "0" + new Date().getHours();
    let mm =
        new Date().getMinutes() >= 10
          ? new Date().getMinutes()
          : "0" + new Date().getMinutes();
    let hhcopy = "";
      if (hh > 12) {
        hhcopy = hh - 12;
        this.unit = "pm";
      } else {
        hhcopy = hh;
        this.unit = "am";
      }
    this.timeData = hhcopy + ":" + mm;
},
```

### 设置 npm 源

npm, yarn 查看源和换源：

```bash
npm config get registry // 查看 npm 当前镜像源

npm config set registry https://registry.npm.taobao.org/ // 设置 npm 镜像源为淘宝镜像

yarn config get registry // 查看 yarn 当前镜像源

yarn config set registry https://registry.npm.taobao.org/ // 设置 yarn 镜像源为淘宝镜像
```

镜像源地址部分如下：

```bash
npm --- https://registry.npmjs.org/

cnpm --- https://r.cnpmjs.org/

taobao --- https://registry.npm.taobao.org/

nj --- https://registry.nodejitsu.com/

rednpm --- https://registry.mirror.cqupt.edu.cn/

npmMirror --- https://skimdb.npmjs.com/registry/

deunpm --- http://registry.enpmjs.org/
```

## 一月

### 利用 Coverage 检测可以懒加载的 modules

1、打开 devTools,，按`Ctrl+shift+p`，mac(`cmd+shift+p`)，输入`Coverage`，选`Drawer: Coverage`

2、reload

3、可以看到哪些 modules 可以用`import()`懒加载了

### nginx vue history 爬坑

按照官方`nginx`的参考配置：

```bash
location / {
  try_files $uri $uri/ /index.html;
}
```

如果是项目在根目录倒没啥问题，但如果项目在 xxx 路径下，比如在`http://ip/vue/`路径下，点击跳转到路由`http://ip/vue/about`下是 ok 的，但是一刷新页面，你会发现就不好使了。原因很简单，就在上面的配置中:

`try_files $uri $uri/ /index.html` => `http://ip/vue/about/index.html`

所以，这种情况正确的操作是：

```bash
location /vue/ {
  try_files $uri $uri/ /vue/index.html;# 全部跳回到vue/index.html页面中
}
```

注意， `/vue/`实际上你上面配的`root`下的 vue 文件夹，比如你的`root`是`/app`，`location /vue/`即为 `location /app/vue/`

### 前端请求错误后，重新请求

需要满足：按照原来的逻辑进行请求，按照原来的步骤进行请求成功后的处理

- jQuery（\$(this)）

```bash
$.ajax({
    url : 'someurl',
    type : 'POST',
    data :  ....,
    tryCount : 0,
    retryLimit : 3,
    success : function(json) {
        //do something
    },
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                $.ajax(this);
                return;
            }
            return;
        }
        if (xhr.status == 500) {
            //handle error
        } else {
            //handle error
        }
    }
});
```

- dojo 或其他库
  可以通过一个包装函数来实现调用自己

```bash
ServerUtil.excuteGetRequest = function(serviceSign, serviceName) {
    if (!serviceName) {
      serviceName = "未知服务";
    }
    var deferred = new Deferred();
    var requestUrl = window.appInfo.serverUrl + serviceSign;
    script.get(requestUrl, { jsonp: "callback" }).then(
      function(response) {
        if (response.status == "success") {
          deferred.resolve(response.data);
        } else {
          var msg = "未成功从服务--" + serviceName + "--获取数据";
          deferred.reject(msg);
        }
      },
      function(error) {
        if (error.response.status == 401) {
          // handle errror
          // ...
          ServerUtil.excuteGetRequest(requestUrl, serviceName);
        }
        var msg = "调用服务--" + serviceName + "--失败 " + error.response.url;
        deferred.reject(msg);
      }
    );
    return deferred.promise;
  };
```

<!-- ### Nodejs 静态资源的处理

1. 剖析 request 请求地址，分割出文件名，后缀名。
2. 根据后缀补全相关文件在文件系统中的全路径。
3. 根据全路径读取内容，返回给客户端。

```bash
const http = require('http');
function handle_request(req, res) {

    // 不管是什么请求，对文件的请求的话，应该是针对后缀名进行内容读取发放。
    const suffix = req.url.substr(req.url.length - 4, req.url.length); // 待验证
    const realpath = __dirname + '\\' + 'public' + '\\';
    const filename = req.url.substr(req.url.length - 9); // 待验证
    if (suffix === '.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(getFileContent(realpath + '\\css\\' + filename));
    } else if (suffix === '.gif') {
        res.writeHead(200, {'Content-Type': 'image/gif'});
        res.end(getFileContent(realpath+'\\imgs\\1.gif'));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getFileContent(__dirname + '\\' + 'html' + '\\' + 'index.html'));
    }
}

function getFileContent(filepath) {
    return fs.readFileSync(filepath);
}

var server = http.createServer(handle_request);
server.listen(8080);

``` -->

<!-- ### postMessage 实现跨域通信 -->

## 四月

### 多维数组指定子项扁平化函数

```bash
/**
  * 多维数组指定子项扁平化函数
  * @param array              要执行的扁平化数组
  * @param childrenKeys       要参与扁平的子键名数组 默认 ['children']
  * @param flattenParent      默认的父数组
  * @param flattenParentKey   被压平后子项父数组存放键名
  * @returns {Array}
  */ arrayChildrenFlatten(
      array,
      { childrenKeys, flattenParent, flattenParentKey } = {}
    ) {
      childrenKeys = childrenKeys || ["children"];
      flattenParent = flattenParent || [];
      flattenParentKey = flattenParentKey || "flattenParent";
      const result = [];
      array.forEach(item => {
        const flattenItem = JSON.parse(JSON.stringify(item));
        flattenItem[flattenParentKey] = flattenParent;
        result.push(flattenItem);
        childrenKeys.forEach(key => {
          if (item[key] && Array.isArray(item[key])) {
            const children = this.arrayChildrenFlatten(item[key], {
              childrenKeys,
              flattenParent: [...flattenParent, item],
              flattenParentKey
            });
            result.push(...children);
          }
        });
      });
      return result;
    }
```

### 服务器状态码错误原因

```bash
HTTP 400 - 请求无效
HTTP 401.1 - 未授权：登录失败
HTTP 401.2 - 未授权：服务器配置问题导致登录失败
HTTP 401.3 - ACL 禁止访问资源
HTTP 401.4 - 未授权：授权被筛选器拒绝
HTTP 401.5 - 未授权：ISAPI 或 CGI 授权失败

HTTP 403 - 禁止访问
HTTP 403 - 对 Internet 服务管理器 的访问仅限于 Localhost
HTTP 403.1 禁止访问：禁止可执行访问
HTTP 403.2 - 禁止访问：禁止读访问
HTTP 403.3 - 禁止访问：禁止写访问
HTTP 403.4 - 禁止访问：要求 SSL
HTTP 403.5 - 禁止访问：要求 SSL 128
HTTP 403.6 - 禁止访问：IP 地址被拒绝
HTTP 403.7 - 禁止访问：要求客户证书
HTTP 403.8 - 禁止访问：禁止站点访问
HTTP 403.9 - 禁止访问：连接的用户过多
HTTP 403.10 - 禁止访问：配置无效
HTTP 403.11 - 禁止访问：密码更改
HTTP 403.12 - 禁止访问：映射器拒绝访问
HTTP 403.13 - 禁止访问：客户证书已被吊销
HTTP 403.15 - 禁止访问：客户访问许可过多
HTTP 403.16 - 禁止访问：客户证书不可信或者无效
HTTP 403.17 - 禁止访问：客户证书已经到期或者尚未生效 HTTP 404.1 -

无法找到 Web 站点
HTTP 404- 无法找到文件
HTTP 405 - 资源被禁止
HTTP 406 - 无法接受
HTTP 407 - 要求代理身份验证
HTTP 410 - 永远不可用
HTTP 412 - 先决条件失败
HTTP 414 - 请求 - URI 太长

HTTP 500 - 内部服务器错误
HTTP 500.100 - 内部服务器错误 - ASP 错误
HTTP 500-11 服务器关闭
HTTP 500-12 应用程序重新启动
HTTP 500-13 - 服务器太忙
HTTP 500-14 - 应用程序无效
HTTP 500-15 - 不允许请求 global.asa
Error 501 - 未实现
HTTP 502 - 网关错误
```

### ESlint 错误原因及解决方案

```bash
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    // 新增一些重要rules
    // 要求使用 let 或 const 而不是 var
    "no-var": 2,
    // 注释前空格
    "spaced-comment": ["error", "always"],
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    // 要求或禁止 var 声明中的初始化(初值)
    "init-declarations": 0,
    // 禁用 eval()
    "no-eval": 2,
    // 要求 for-in 循环中有一个 if 语句
    "guard-for-in": 2,
    // 禁止重复声明变量
    "no-redeclare": 2
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

```

这里使用了 airbnb 规范，要注意

```bash
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 在这里自定义修改
    'linebreak-style': 0,
    semi: [2, 'never'], // 不加分号
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true
    }], // 允许三元
    'no-plusplus': 0, // 开启i++
    'comma-dangle': [2, 'never'], // 结尾不使用逗号
    'import/no-unresolved': [2, {
      ignore: ['esri', 'dojo']
    }], // 解决import esri/xxx编译不通过
    'import/extensions': 0,
    // 'no-console': 0,
    'arrow-parens': [2, 'as-needed'], // 箭头函数参数只有一个时无需加括号
    'no-param-reassign': [2, {
      props: false
    }],
    'no-mixed-operators': 0,
    // 'max-len': [2, {
    //  "code": 100
    //}],
    "max-len": 0, // 关闭最大长度
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```

## 五月

### async-await 遇上 forEach

适用场景：在开发过程中，我们需要在循环中异步处理 item，直接使用 forEach 是不能并行遍历
解决：使用 for of 更加方便，可以使用于嵌套循环下的需求（先执行外层 1，再执行内层 1，2，3，外层 2，内层 1，2，3）

#### 解决方案一

```bash
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function test() {
  const nums = await getNumbers();
  asyncForEach(nums, async x => {
    const res = await multi(x);
    console.log(res);
  });
}
```

#### 解决方案二

```bash
async function test() {
  const nums = await getNumbers();
  for (let x of nums) {
    const res = await multi(x);
    console.log(res);
  }
}
```

## 六月

### eslint+lint-staged 禁用老项目中的 ES6

用惯了 es6，在编写广州一体化中，会在有些地方使用了 es6 语法，导致在低版本的浏览器中出现微件加载错误。于是我就用了 eslint 在提交的代码时进行语法检查。列下步骤，复习下。

1. 步骤一：本地仓库安装 yarn add eslint 或者 npm install eslint
2. 步骤二：安装后，进行初始化 eslint —init，生成配置文件 .eslintrc.js

```bash
module.exports = {
  env: {
    browser: true,
    // 'commonjs': true,
    es6: false
  }
}
```

3. 步骤三：npm install --D lint-staged husky 或 yarn add lint-staged husky，然后进行配置，最后提交文件即可自动触发。

```bash
{
  "name": "gxxxx",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "test": "eslint",
    "commit": "git-cz"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "eslint",
      "git add"
    ]
  },
  "devDependencies": {
    "eslint": "^6.0.0",
    "husky": "^2.4.1",
    "lint-staged": "^8.2.1",
    "git-cz": "^3.0.1"
  },
}

```
