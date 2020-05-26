# 2020

<!-- ## Calc 坑 -->

<!-- 横向和纵向排版统一使用 flex 布局。 -->

## 五月

### 在同一个机器上安装 chrome 多个版本共存

#### 前言

一个兼容性的问题，flex 布局。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>chrome 60下，height： 100；无法继承外部flex-grow: 1的容器</title>
  <style>
    .parent {
      display: flex;
      flex-direction: column;
      height: 500px;
      background: gray;
    }
    .child1 {
      width: 100%;
      flex-grow: 1;
      /* display: flex;
      flex-direction: column; 解决方案 */ 
      background: lightgreen;
    }
    .child11 {
      height: 100%;
      /* webpack 环境中，能否直接用 browserlist 解决兼容问题.browserslistrc */
      /* flex-grow: 1; 解决方案：flex-grow */
      width: 100%;
      background: lightpink;
    }
    .child2 {
      width: 100%;
      height: 50px;
      background: lightblue;
    }
  </style>
</head>
<body>
  <div class="parent">
    parent
    <div class="child1">
      child1
      <div class="child11">child11</div>
    </div>
    <div class="child2">child2</div>
  </div>
</body>
</html>
```

window 版本

mac 版本


```bash
$ "/Applications/Google Chrome 60.app/Contents/MacOS/Google Chrome" --user-data-dir="/Users/linjy/Library/Application Support/Google/Chrome60" > /dev/null 2>&1 &
[2] 2119
[1]   Done                  
```

#### 如何禁用Chrome版本自动更新

#### 参考资料

- [在 macOS 上面安装多个版本的 Chrome](https://blog.leodots.me/post/36-install-multiple-chrome-macos.html)
- [https://www.slimjet.com/chrome/google-chrome-old-version.php](https://www.slimjet.com/chrome/google-chrome-old-version.php)

## 四月

### 分页功能

#### 分页组件

#### 前端做分页

```js
/**
 * 返回分页的数组
 * @param {Number} pageSize 每页条数
 * @param {Number} jumpPage 条码
 * @param {Array} arr 返回分页的数组
 */
export const pagination = (pageSize, jumpPage, arr) => {
  const skipNum = (jumpPage - 1) * pageSize;
  const newArr =
    skipNum + pageSize >= arr.length
      ? arr.slice(skipNum, arr.length)
      : arr.slice(skipNum, skipNum + pageSize);
  return newArr;
};
```

#### 后端做分页

##### 参数传输

```js
pageIndex: 1, // 页码
pageSize: 10, // 每页大小
```

##### 返回数据

```json
{
  "totalElements": 0,
  "data": [{}]
}
```

### 前端中 width、height 的获取

- clientWidth
- offsetWidth
- innerWidth
- scrollWidth
- getBoundingClientRect().width

### 转换文件大小

实现效果：不同值大小，显示不同的文件单位以及对应的数值。

主体思路：

1. 要显示的值存在数组上
   ````js
   const digitList = ["B", "KB", "MB", "GB", "TB"];```
   ````
2. 因为 1GB = 1024MB = 1024 _ 1024 KB = 1024_ 1024 \* 1024 B。
3. 要想知道显示那个值，只需要计算出`幂`即可。
4. 然后具体数值，则是对应的值：目标 size/1024^幂。

方法一：digit 控制显示单位

```js
const formatFileSize = (bytes) => {
  const scale = 1024;
  const digitList = ["B", "KB", "MB", "GB", "TB"];
  let _integer = bytes; //最小单位 Bytes
  let digit = 0;
  while (_integer > scale) {
    _integer = Math.round(_integer / scale);
    digit++;
  }
  return `${_integer}${digitList[digit]}`;
};
```

方法二：采用 [Math.log](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log) 使用数学的对数知识进行处理。

```js
export const readablizeBytes = (bytes: number) => {
  if (bytes === 0) {
    return String(bytes);
  }
  const s = ["B", "KB", "MB", "GB", "TB", "PB"];
  const e = Math.floor(Math.log(bytes) / Math.log(1024)); // log
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
};
```

下面的函数返回以 x 为底 y 的对数（即 logx y）：

```js
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
```

如果你运行 `getBaseLog(10, 1000)`，则会返回 2.9999999999999996，非常接近实际答案：3，原因是浮点数精度问题。

在数学中，对数是对求幂的逆运算，正如除法是乘法的倒数，反之亦然

如果 a 的 x 次方等于 N（a>0，且 a 不等于 1），那么数 x 叫做以 a 为底 N 的对数（logarithm），记作 x=logaN。其中，a 叫做对数的底数，N 叫做真数。

### 前端排序还是后端排序

<!-- ## 处理滚动条跳动问题 -->

能否直接通过数据库查询进行排序。前端直接传递排序参数过去。

名称、档案类型、上传用户 按拼音首字母进行排序  
档案大小按数量进行排序
时间就按时间先后进行排序

主要考虑性能方面。

分页处理。排序。

#### 前端排序

#### 后端排序

### 转义

#### 什么是转义

#### 为什么要转义

字符的传输与显示

#### URL

encodeURI、decodeURI 和 encodeURIComponent、decodeURIComponent

`encodeURI` 和 `decodeURI` 函数操作的是完整的 URI；这俩函数假定 URI 中的任何保留字符都有特殊意义，所有不会编码它们。

`encodeURIComponent` 和 `decodeURIComponent` 函数操作的是组成 URI 的个别组件；这俩函数假定任何保留字符都代表普通文本，所以必须编码它们，所以它们（保留字符）出现在一个完整 URI 的组件里面时不会被解释成保留字符了。

#### encodeURI()是将字符串进行 UTF-8 编码。解码通过 decodeURI()。

- `ISO8859-1` 字符集内的字母（A-Z、a-z）、数字（0-9）、标点符号（ `- _ . ! ~ * ' ( )`）不会被转换。而且该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号（ ; / ? : @ & = + \$ , # ）也不会被转换。

- `ISO 8859-1` 字符集内其它字符，都会以 `%xy` 格式表示（xy 为字节的 16 进制表示）\*\*；

- 其它字符首先会按照 `UTF-8` 规则转换为字节串，每个字节再以 `%xy` 的形式表示。其中 xy 就是字节的 `16` 进制表示形式。

#### encodeURIComponent()

`encodeURIComponent()` 也是将字符串进行 UTF-8 编码，它比 `encodeURI` 的编码还要彻底，在 `encodeURI` 的基础上，将那些在 URI 中有特殊含义的标点符号也一起编码了。

- `ISO8859-1` 字符集内的字母（A-Z、a-z）、数字（0-9）、标点符号（ - \_ . ! ~ \* ' ( ) ）不会被转换。

- `ISO 8859-1` 字符集内其它字符，都会以 `%xy` 格式表示（xy 为字符的 16 进制表示）；

其它字符首先会按照 `UTF-8` 规则转换为字节串，每个字节再以 `%xy` 的形式表示。其中 `xy` 就是字节的 16 进制表示形式。

![encodeURI、decodeURI](../.vuepress/public/images/encodeURL&decodeURL.png)

### 正则表达式

### 参考资料

- https://juejin.im/post/5835836361ff4b0061f38a5d
- [WEB：字符集、编码、乱码 —— 看这篇就够了](https://mp.weixin.qq.com/s/fYpSbKzQndihAQEe4zpVKw)

### pont 使用

#### 简介

自动帮你封装好类似 axios 的请求 api，并且与 swagger 模块一致，帮你写好以前需要手动编写 api/xxxmodule 里面的东西。也就是请求后端的 api。

优点：完全自动化同步 swagger，无需人工编写。
缺点：需要考虑如何拦截请求、

#### 步骤

1. 安装 `pont--engine` npm 包
2. 安装 pont vscode 插件
3. 编写 pont-config.json

```json
{
  "originUrl": "http://52.83.103.252:8086/dedms-application/v2/api-docs?group=Admin%20API", // 获取 json 数据
  "templatePath": "./pontTemplate",
  "outDir": "./services",
  "surrounding": "javaScript",
  "mocks": {
    "enable": true
  },
  "templateType": "fetch"
}
```

1. 生成 js 文件
2. 使用 axios 代替 fetch 请求

### vscode 打开新的文件会覆盖窗口中的，怎么改

在一个文件中，我们往往会用到其他文件的代码逻辑，通常在对应的引用函数 ctrl + 鼠标就可以跳转到源文件。

![](../.vuepress/public/images/vscode-hover-link-source.png)

但是我不希望打开的文件直接复用了当前的窗口，因为看完源文件我还要快速回到当前的文件进行编码，这时可以打开 vscode 中的 setting 进行设置：

打开 setting -> 搜索 enablePreview，关闭下图这个即可。

![](../.vuepress/public/images/vscode-tip-enable-preview.png)

## 三月

### 搜索关键词高亮

#### 前言

思路：把搜索功能与实现关键字高亮拆开实现，避免耦合。

例如，我们要实现在一棵树中过滤出满足搜索关键字的节点，那么步骤是：

1. 把符合规则的树节点过滤出来。
2. 在 view 层面上进行重新渲染。
3. 这个时候我们只需要对每一个节点里面的文字重新构造，对带有关键字的字符串使用标签包裹起来即可实现高亮效果。

逻辑层：

```ts
 private renderBrightenKeyword(
    val: string,
    keyword: string,
    html = `<span style="color: #409EFF;">${keyword}</span>`
  ) {
    if (!keyword) {
      return val;
    }
    const Reg = new RegExp(keyword, "i");
    if (val) {
      return val.replace(Reg, html);
    }
  }
```

view 层面：这里使用了 vue 的 v-html 指令，这样就可以解释到字符串中的 html 标签了。

```html
<span
  v-html="renderBrightenKeyword(row.name, queryText)"
  style="padding-left: 0.3rem;"
></span>
```

## 二月

### 使用 docker 部署 arcgis 离线的 web 网站文档

#### 方法一

用 docker 本地部署 supermap，arcgis 这些文档和库都非常方便，有了 docker，就无须把本地文件放到服务器里面，只需要启动个服务器的 docker 实例，分别把本地文档映射过去即可，一句 docker 命令

运行容器的时候指定本地的一个文件目录和容器中的一个文件目录的映射，通过这个可以做文件数据同步，两方无论是哪一方修改，另一方都会同步内容。

```bash
docker run -it -d -p 8081:80 --rm --name supermap -v (本地机器文档路径):/usr/share/nginx/html  nginx
```

- 使用 `-d` 参数启动后会返回一个唯一的 id，也可以通过 `docker container ls` 命令来查看容器信息。
- 使用 `-p` ，Docker 会随机映射一个 49000 ～ 49900 的端口到内部容器开发的网络端口。
- 通过 `docker container ls` 可以查看本地主机的端口 8081 映射到容器的 80 端口上。

`0.0.0.0:8081->80/tcp`

- 使用 `-v` 进行主机卷的映射。(PS: 对容器停止时，会自动销毁该容器 TODO 查明原因)。

配合 vscode 的 docker 插件，可以直观地看到当前 docker 的容器列表、镜像列表等，很方便进行 stop、remove、restart 等操作了。

##### 使用步骤

1. 启动容器：

```
 docker run -d -p 8081:80 --rm --name gis -v /Users/linjy/nginx/html:/usr/share/nginx/html  nginx
```

2. 在浏览器中访问页面

`http://localhost:8081/arcgis_js_v414_sdk/arcgis_js_api/sdk`

#### 方法二

安装 tomcat 服务器，然后把 web 应用放进 webapps 文件里，然后启动服务器即可访问。

#### 方法三

全局安装 live-server npm 包，然后在对应的 web 文档应用终端启动即可，方便快捷，也不用使用 docker 部署管理容器。

```
live-server --port=9000
```

live-server 好处是可以直接在浏览器下查看所有的目录文件。

上面三种方法中，安装了 supermap iclient 的文档后，访问网站时使用 tomcat 的和 docker 响应速度最好，使用 live-server 的最快捷，docker 的话麻烦点，则需要在电脑上安装好 docker 软件和 vscode 安装插件，但是 docker 的话对于需要数据库软件等配合的 web 应用，则很容易维护管理，只需要在 docker 上安装镜像即可。至于那一种方法则看情况需要了。

### Node-Sass 安装失败解决集锦

安装 node-sass 的时候总是会各种不成功。

首先要知道的是，安装 `node-sass` 时在 `node scripts/install` 阶段会从 github.com 上下载一个 `.node` 文件，大部分安装不成功的原因都源自这里，因为 GitHub Releases 里的文件都托管在 `s3.amazonaws.com` 上面，而这个网址在国内总是网路不稳定，所以我们需要通过第三方服务器下载这个文件。

#### 权限问题

在 mac OS 或 Linux 系统下，有时候在安装 node-sass 时会出现，`Permission Errors`，类似“user "root" does not have permission to access the dev dir”的错误

#### node 版本问题

##### 错误

一直显示下载中，通过设置淘宝源地址也无法解决，有可能是 node 版本问题。

##### 重新安装 node（推荐使用 nvm）

nvm 是个 node 版本管理工具，可以方便的下载安装 node，并且方便的切换 node 版本。[文档](https://juejin.im/post/5ad06d58518825619d4d2ff5#heading-4)

#### 参考资料

- [Node-Sass 安装失败引发的思考](https://juejin.im/post/5ad06d58518825619d4d2ff5#heading-5)
- [整理 node-sass 安装失败的原因及解决办法](https://segmentfault.com/a/1190000010984731)
- [安装 node-sass 的正确姿势](https://github.com/lmk123/blog/issues/28)

### 解决 .gitignore 文件忽略规则无效 git 依然跟踪修改的问题

#### 前言

最近，使用了 Jest 做自动化测试时，它会生成一个 coverage 的文件夹，下意识地不想把它提交到仓库上去，于是笔者在 `.gitignore` 添加以下规则 `coverage` 发现不起作用，后来在查阅相关资料才发现是已经被 git 跟踪的文件无法再设置 .gitignore 规则，需要把它们移除才能生效。

#### .gitignore 规则无效的原因

一般导致 `.gitignore` 里的忽略规则失效有两种情况：一种是忽略规则的语法错误，这种情形好处理，只要修正错误的语法就可以了。

文件 `.gitignore` 的格式规范如下：

- 所有空行或者以 `#` 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配。
- 匹配模式可以以（`/`）开头防止递归。
- 匹配模式可以以（`/`）结尾指定目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（`！`）取反。

另外一种则是：项目中的文件或目录已经被纳入到 Git 的版本管理里面/跟踪文件清单，此时你再往 `.gitignore` 里添加文件/目录的忽略规则就会发现毫无作用，因为已经被 Git 跟踪（track）的文件/目录无法被 `.gitignore` 忽略掉。

这里再对上面一段所说的进行详细说明，所谓“已经被纳入到 Git 的版本管理里面/跟踪文件清单”，大体上指的是下面的三种情况：

1. 已使用 `add` 命令开始跟踪项目文件或者将修改的文件放入暂存区/索引。
2. 已使用 `commit` 命令提交更新到本地仓库。
3. 已使用 `push` 命令将项目文件推送到了 Git 远程仓库（例如 Github）。

#### 参考资料

- [解决.gitignore 文件忽略规则无效 git 依然跟踪修改的问题](https://shiyousan.com/post/636470505667009340)
- [2.2 Git 基础 - 记录每次更新到仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93) git 文档
