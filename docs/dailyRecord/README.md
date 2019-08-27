# 2019

## 八月

### vue 中绑定常量数组出现的奇怪 bug

### 根据权限不同加载不同的路由表

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

```js
// xxxx/module.js 模块封装的函数
import { GET, POST, PUT, DELETE } from "@/plugins/axios";
export function getCityByIndicators(params) {
  return GET(
    `rest/pas/v1/naturalRes/indicator/dimension/city`,
    "根据指标获取以行政区排序的城市数据",
    params
  );
} 
```

在组件中请求
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

### vueCli 本地开发设置个区分明显的 favicon

#### 导语

日常开发某个功能后，成功部署上线，测试人员测试发现严重bug，立马打开项目仓库，查看代码思路，发现可疑之处，改正非常迅速，刷新屏幕后，发现还有错误哦。于是继续排查代码，清缓存，最好才发现是线上地址。

#### 分析问题

居然知道这个痛点了，由于 ip 地址很难注意到，就搞一个明显的 favicon 来处理吧，线上保持不变，本地代码添加多点，弄个 favion 图片。


#### 解决

**第一种处理**：直接动态添加 link 标签中，这种是直接在 dom 生成后引入脚本处理。
```js
if (process.env.NODE_ENV === "development") {
  changeFavicon("../public/favicon_dev.ico");
}
function changeFavicon(src) {
  const link = document.createElement("link");
  const oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon"; 
  link.ref = "shortcut icon";
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}
```
动态设置：
这种动态创建 link 标签，然后添加元素，可以从服务器动态获取图片，随意更换 favicon。

**第二种处理**

VueCli3 以前，webpack 的配置是暴露出来的，我们可以直接修改 webpack 的配置：
webpack.dev.config
```js
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html',
  inject: true,
  favicon: path.resolve('favicon.icon')
})
```

VueCli3 以后，调整 webpack 配置是通过 `vue.config.js` 文件配置的，有两种配置方式：

简单配置方式：
```js
// vue.config.js
module.export = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境作配置
    } else {
      // 为开发环境做配置
    }
  }
}
```

链式操作：
Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义剧名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们做改造。
```js
chainWebpack: config => {
    config.plugin('html').tap(
        args => {
      if (process.env.NODE_ENV === 'development') {
        args[0].favicon = path.resolve('public/favicon_dev.ico');
      }
      return args; /* 传递给 html-webpack-plugin's 构造函数的新参数 */
    })
  },
```
注意的是：本次配置 favicon 用链式操作，这样就不会覆盖原来的 `html-webpack-plugin` 的配置选项。使用 configureWebpack 简单配置方式的话，需要重新制定其他的 `html-webpack-plugin` 的选项。

#### 参考资料

- webpack 相关的配置 [Vue CLI 官网](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F) 
- 有关于 html-webpack-plugin 在 webpack-chain 中的配置看这里[webpack-chain](https://github.com/jantimon/html-webpack-plugin#options)

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

- 需求：需要对 iview 的模态框的样式进行自定义覆盖，因此就是 transfer:false 把 Modal 渲染到父组件内。此时会出现问题。
- 症状：使用了 iview Modal 组件时，如果设置了 transfer: false 属性时，有时候会出现无法打开Modal 框的现象，原因可能在于父元素设置了
transform 属性。因此
- 原因：应用了transform属性的元素会导致该元素形成一个新的包含块，然后其后代元素如果有fixed定位的属性，那么其元素将会以该父元素作为包含块。
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

### flex布局中使用iview的table表格的宽度会计算出错,导致很长的宽度

场景：两边固定，中间自适应

- 原因：设置了flex-grow元素的子级宽度问题
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
需要注意的是, babel-loader和babel-polyfill。前者负责语法转化，比如：箭头函数；后者负责内置方法和函数，比如：new Set()。

#### babel

Babel什么都不做，它的行为就像const Babel = code => code;通过解析代码，然后再次生成相同的代码。您将需要为Babel添加一些插件来执行诸如置换es6、JSX之类的操作

#### babel-core

如果你想在你的真实项目中使用babel，你需要安装babel但是
没有 `babel` 包可用。

babel将它分成两个独立的包：`babel-cli`和`babel-core`
**babel-cli**：可用于从命令行编译文件。
**babel-core**：如果你想使用 Node API，你可以安装`babel-core`
，与“babel-cli”相同，除非您在应用程序内以编程方式使用它。

在生产之前使用`babel-cli`或`babel-core`编译文件。

#### preset vs plugin

我们可以使用`babel插件(es2015)`一次添加一个特性(es6,JSX)，或者我们可以使用`babel预置`来包含特定年份的所有特性(es6)。预置使设置更容易。

#### babel-preset-es2015

`babel-preset-env`支持es2015特性，并取代了es2015、es2016、es2017和最新版本。因此，使用`babel-preset-env`，它的行为与`babel-preset-latest`完全相同(或者将babel-preset-es2015、babel-preset-es2016和babel-preset-es2017放在一起)。

#### babel-preset-react

将`JSX`转换为`createElement`调用，如将`react`纯类转换为函数，并删除`prop`类型。

#### babel-polyfill

没有`babel-polyfill`, babel只允许您使用箭头函数、析构、默认参数和ES6中引入的其他特定于语法的特性。新的ES6内置组件(如Set、Map和Promise)必须是polyfill，以包含应用程序入口点顶部需要的polyfill。

#### babel-loader

你理解了babel-core，babel-cli，以及为什么需要预设，插件，现在
你每次都是从`babel-cli`逐个文件地编译ES6到ES5。
要摆脱这个，你需要捆绑任务`/ js`文件。 因此你需要用`WebPack`。

`loader` 有点像任务，它们通过将各种文件转换为webpack可以处理的有效模块，为各种文件提供了利用webpack捆绑功能的能力。

Webpack通过`Babel -loader`提供了强大的Babel支持。

#### devDependencies

当您部署应用程序时，需要安装依赖项中的模块，否则应用程序将无法工作。devDependencies中的模块不需要安装在生产服务器上，因为您不是在这台机器上开发的。

这些包只用于开发和测试。

#### 难道没有任何单一的依赖来取代它们吗？

当您阅读上述时，您的确需要一些预置和加载器来转换es2015或JSX文件。

#### babel -> @babel

从`Babel 7`开始，Babel团队就开始使用[scoped包](https://babeljs.io/docs/en/next/v7-migration#scoped-packages)，这样做是为了更好地区分哪些包是官方的，哪些包是第三方的。
所以你现在必须使用@ babel / core而不是babel-core。

您的依赖项需要像这样修改：

babel-cli - > @ babel / cli。 例如：babel-与@ babel /。

