# 2019

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

eslint+lint-staged 禁用老项目中的 ES6
用惯了 es6，在编写广州一体化中，会在有些地方使用了 es6 语法，导致在低版本的浏览器中出现微件加载错误。于是我就用了 eslint 在提交的代码时进行语法检查。列下步骤，复习下。
步骤一：本地仓库安装 yarn add eslint 或者 npm install eslint
步骤二：安装后，进行初始化 eslint —init，生成配置文件 .eslintrc.js

```bash
module.exports = {
  env: {
    browser: true,
    // 'commonjs': true,
    es6: false
  }
}
```

步骤三：npm install --D lint-staged husky 或 yarn add lint-staged husky，然后进行配置，最后提交文件即可自动触发。

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
    console.log('async/await', { user, friends, photo })
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
  const users = []
  while(users.length < 10) {
    users.push(await getUserInfo())
  }
  console.log('getLotsOfUserData', users)
}
```
- 并发请求
```js
async function getLotsOfUserDataFaster() {
  try {
    const userPromises = Array(10).fill(getUserInfo())
    const users = await Promise.all(userPromises)
    console.log('getLotsOfUserDataFaster', users)
  } catch (err) {
    console.log(err)
  }
}
```

### transform 对 fixed 的影响

需求：需要对 iview 的模态框的样式进行自定义覆盖，因此就是 transfer:false 把 Modal 渲染到父组件内。此时会出现问题。
症状：使用了 iview Modal 组件时，如果设置了 transfer: false 属性时，有时候会出现无法打开Modal 框的现象，原因可能在于父元素设置了
transform 属性。因此
原因：应用了transform属性的元素会导致该元素形成一个新的包含块，然后其后代元素如果有fixed定位的属性，那么其元素将会以该父元素作为包含块。
分析：iview 使用了 transfer-dom 指令来解决上面的问题，把 modal 移动到 body 下面。
解决：因此如果需要自定义覆盖 modal 的样式，又不能渲染到父组件内，要想避免污染全局样式，此时建议通过类名去限制作用域。