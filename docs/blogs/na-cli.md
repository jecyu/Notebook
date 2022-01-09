# Node 命令行工具脚手架实战

## 前言

「这是我参与11月更文挑战的第 1 天，活动详情查看：[2021最后一次更文挑战](https://juejin.cn/post/7023643374569816095/)」

最近开发小程序，进行了个首页改版，涉及到不少图片的更新，由于图片是打包在项目里的，在 web 开发场景，减少代码体积虽然是性能优化的一个方向，还没到锱铢必较的程度。但是在小程序场景，由于代码包上传阶段限制了主包 **2M **和总包 **20M**，超过就会面临无法发版的风险，代码包体积的优化就变得特别重要。

一般交互设计师输出的图片有 1x、2x、3x 倍，体积相对还是比较大的，我们可以通过 https://tinypng.com/ 保证图片高清的同时，尽量的减小图片的体积。

一个个去拖拽压缩、查看压缩质量，费时费力。能否通过自动压缩图片来解决呢？本文会以实现一个自动压缩图片命令来实现一个命令行脚手架工具。

- 自动压缩图片脚本
- 命令行工具底盘搭建
- 发布 npm 包与安装使用

## 自动压缩图片脚本

### 需求描述

1. 要能按需选择图片压缩，压缩后返回压缩大小和数据等指标供使用者检测图片质量。
2. 必要时，可以提供 ui 在线预览图片。

### 思路分析

可以采用在线压缩或者本地压缩方式，执行时机让开发者自由选择。最开始，我思考的方向是考虑可以在项目打包的时候，自动压缩项目所有的图片。由于使用的是 taro 项目，暂没有找到相关方案。并且考虑到以前在 pc 项目引入打包压缩时自动压缩所有图片，会大大增加项目打包的时间，依赖于 `imagemin`、`imagemin-jpegtran`、`imagemin-pngquant` 几个包，但是在安装 `imagemin-pngquant`时会安装不了，找到了一个原因是说这个库是基于一些底层语言实现，所以不能直接安装，需要在电脑上安装另一个依赖 `libpng`，非常麻烦。

因此换了个思路，由于一般是开发新功能时添加新的图片，需要进行压缩。那么可以提供一个自动压缩脚本，自动压缩开发者选择的图片。自动压缩脚本可以采用本地压缩或在线压缩，本文主要讲在线压缩，自动发起请求到 https://tinypng.com/ 压缩图片。

### 代码实现

1. 全局配置，配置的 EntryFolder 后面通过命令行输入获取。

```js
const tinyConfig = {
  files: [],
  entry: '',
  deepLoop: false, // 是否递归处理
  replace: false, // 是否覆盖源文件
  Exts: ['.jpg', '.png', 'jpeg'],
  Max: 5120000 // 5MB
}
```

2. 读取本地图片，会对一些非图片后缀的文件进行过滤。

```js
/**
 * 过滤待处理文件夹，得到待处理文件列表
 */
function fileFilter(sourcePath) {
  const fileStat = fs.statSync(sourcePath)
  if (fileStat.isDirectory()) {
    fs.readdirSync(sourcePath).forEach((file) => {
      const fullFilePath = path.join(sourcePath, file)
      // 读取文件信息
      const fileStat = fs.statSync(fullFilePath)
      // 过滤大小、后缀名
      if (
        fileStat.size <= tinyConfig.max &&
        fileStat.isFile() &&
        tinyConfig.exts.includes(path.extname(file))
      ) {
        tinyConfig.files.push(fullFilePath)
      } else if (tinyConfig.deepLoop && fileStat.isDirectory()) {
        // 是否要深度递归
        fileFilter(fullFilePath)
      }
    })
  } else {
    if (
      fileStat.size <= tinyConfig.max &&
      fileStat.isFile() &&
      tinyConfig.exts.includes(path.extname(sourcePath))
    ) {
      tinyConfig.files.push(sourcePath)
    }
  }
}
```

3. 上传图片，可以手动上传一张图片到 tinyPng 网站，然后查看 NetWork 的请求响应报文，我们可以构造这样的请求报文来实现自动化脚本处理。

```js
/**
 * Tiny 远程压缩 HTTPS 请求的配置，构造浏览器请求信息
 */
function getAjaxOptions() {
  return {
    method: 'POST',
    hostname: 'tinypng.com',
    path: '/web/shrink',
    headers: {
      rejectUnauthorized: false,
      'X-Forwarded-For': Array(4).fill(1).map(() => parseInt(Math.random() * 254) + 1).join('.'), // 伪造随机 ip，避免限制
      'Postman-Token': Date.now(),
      'Cache-control': 'no-cache',
      'Content-type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Window NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'

    }
  }
}

/**
 * TinyPng 远程压缩 HTTPS 请求
 * success {
 *   "input": { "size": 887, "type": "image/png"},
 *   "output": {
 *     "size": 785, "type": "image/png", "width": 81, "height": 81, "ratio": 0.885,
 *     "url": "https://tinypng.com/web/output/xxx"
 *   }
 * }
 */
function fileUpload(imgPath) {
  const req = https.request(getAjaxOptions(), (res) => {
    res.on('data', (buf) => {
      const obj = JSON.parse(buf.toString())
      if (obj.error) {
        console.log(`压缩失败! \n 当前文件：${imgPath} \n ${obj.message}`)
      } else {
        fileUpdate(imgPath, obj) // 更新文件到本地
      }
    })
  })
  req.write(fs.readFileSync(imgPath), 'binary')
  req.on('error', (err) => {
    console.error(`请求错误 \n 当前文件：${imgPath} \n ${err}`)
  })
  req.end()
}
```

4. 获得压缩后的图片，写到本地磁盘中。

```js
/**
 * 请求压缩好的图片，更新到本地路径
 */
function fileUpdate(entryImgPath, obj) {
  const url = new URL(obj.output.url)
  const req = https.request(url, (res) => {
    let body = ''
    res.setEncoding('binary')
    res.on('data', (data) => {
      body += data
    })
    res.on('end', () => {
      const [filename, extendsion] = entryImgPath.split('.')
      if (!tinyConfig.replace) {
        // 是否覆盖源文件
        entryImgPath = filename + '_tiny' + '.' + extendsion
      }
      fs.writeFile(entryImgPath, body, 'binary', (err) => {
        if (err) return console.log(err)
        let log = '压缩成功：'
        log += `优化比例：${((1 - obj.output.ratio) * 100).toFixed(2)}%，`
        log += `原始大小：${(obj.input.size / 1024).toFixed(2)}KB，`
        log += `压缩大小：${(obj.output.size / 1024).toFixed(2)}KB，`
        log += `文件：${entryImgPath}`
        console.log(log)
      })
    })
  })
  req.on('error', (e) => console.log(e))
  req.end()
}
```

自动压缩图片脚本写好了，可以先写死 tinyConfig 的读取图片文件夹路径，然后通过 `node index.js` 进行测试。

```js
tinyConfig.entry = './tests/'
fileFilter(tinyConfig.entry)
tinyConfig.files.forEach((img) => fileUpload(img))
```

脚本测试没问题后，接下来，我们希望通过命令行选择压缩的图片路径。

## 命令行工具底盘搭建

### 认识命令行工具

命令行工具运行在终端上，比如 mac 的 shell 是系统的用户界面，提供了用户与内核进行交互操作的一种接口（命令解释器）

Shell 可以执行

- 内部命令
- 应用程序
- shell 脚本

用户输入命令 -> 提交给 Shell - > 是否为内置命令 -> 在系统中查找该命令的文件并调入内存执行 -> 内核中的系统功能调用。

在 Linux 中，**可执行的文件**也进行了分类：

- **内置命令**：出于效率的考虑，将一些常用命令的解释程序**构造在 Shell 内部**。

- **外置命令**：存放在 /bin、/sbin 目录下的命令。

- **实用程序**：存放在 /usr/bin、/usr/sbin、/usr/share、/usr/local/bin 等目录下的实用程序。

- **用户程序**：用户程序经过编译生成可执行文件后，可作为 Shell 命令运行
-  **Shell 脚本**：由 Shell 语言编写的批处理文件，可作为 Shell 命令运行。

以上都可以称为命令行工具。比如 clear、ls、pwd 这些能够「在终端执行的系统命令」，被称为系统内置命令。可以使用 `which` 查看它们的来源：

```shell
$ which clear
/usr/bin/clear

$ which vue # vue cli 脚手架
/usr/local/bin/vue
```

使用  `ls -lah $(which vue)` 进一步解析命令：

```sh
$  ls -lah $(which vue)
lrwxr-xr-x  1 naluduo233  admin    65B  9 27 15:13 /usr/local/bin/vue -> ../../../Users/naluduo233/.config/yarn/global/node_modules/.bin/vue
```

可以看到 `/usr/local/bin/vue` 的真正执行命令是指向 yarn 下安装的目录 `.bin/vue`，

而这些 `/usr/local/bin`  目录在环境变量 PATH 中，**「在环境变量的PATH 中路径的命令可在 shell 终端 任意地方执行」**。

由此得出 Node 全局命令行的原理: 「环境变 Path」+ 「符号链接」

1. npm 全局下载某个 package 到路径 `/usr/local/lib/node_modules` 下 (yarn 同理，对应路径 `~/.config/yarn/global/node_modules`)
2. 根据该库的 package.json 中 `bin` 字段的指示，把对应的命令行路径通过符号索引挂载到 PATH 路径
3. 对应的二进制脚本添加 x 权限 (可执行文件权限)

### 构建 Node 命令行工具底盘

1. 首先建立入口文件，index.js，并在 package.json 中声明

```json
{
  "bin": {
    "naluduo": "./bin/naluduo.js" // 在 「package.json 中的 bin 字段」，用以指定最终的命令行工具的名字
  }
}

```

2. 在 `naluduo.js` 指明执行环境，首行添加一行说明，使用 node 解释器来执行这个脚本，而通过 env node 能够正确定位到 node 解释器的位置。

```js
#!/usr/bin/env node  
```

3. 前面说到需要全局安装包到本地，由于我们这个包还没发布，且需要在本地调试。

   可以进入项目根目录下， `yarn link` 根据该包使用这个包的 `package.json` 进行全局软链接。

```sh
yarn link
```

4. 然后可以查看，naluduo 已经放置在 `/usr/local/bin` 下。

```sh
$ which naluduo
/usr/local/bin/naluduo
$ ls -lah $(which naluduo)
lrwxr-xr-x  1 naluduo233  admin    65B 10 31 23:36 /usr/local/bin/naluduo -> ../../../Users/naluduo233/.config/yarn/link/nalu-cli/bin/naluduo.js
```

可以看到 `yarn link`把项目复制到 yarn 的 配置下，并且做好相关的软链接，`/usr/local/bin` 下目录下的脚本可以在 shell 终端任意地方被解析执行。

```sh
naluduo 
```

直接运行命令，会执行我们写好的脚步文件。

### 解析用户入口命令，添加自动压缩图片命令

现在让我们添加自动压缩图片命令，希望这样执行：

```sh
naluduo tinyimg -r -d  # -r，replace 是否替换源文件、-d，deep 是否递归处理文件夹
```

然后进入选择要压缩的图片文件夹或图片路径，选中后即可进入自动压缩图片环节。

现在要解决的问题，是**解析用户输入命令**，通过 **process.argv** 可获取用户输入：

```sh
$ node cmd.js 1 2 3

// Output: [
//   '/usr/local/bin/node',
//   '/Users/shanyue/cmd.js',
//   '1',
//   '2',
//   '3',
// ]

```

根据解析 **process.argv** 可以定制格式来获取各式各样的参数作为命令行的输入。解析参数参照 POSIX 兼容的基本规律: 格式、可选、必选、简写、说明、帮助等等。

为快速实现开发，这里使用第三方库 `commander` ，`yarn add commander --dev`，然后编写入口文件

```js
const { Command } = require('commander')
const program = new Command()
+ const { tinyimg } = require('./commands/tinyimg')

program
  .command('tinyimg')
  .description('压缩图片')
  .option('-d, --deep', '是否递归处理图片文件夹', false)
  .option('-r, --replace', '是否覆盖源文件', false)
  .action((commandAndOptions) => { // 参数为 option 对象
    tinyimg(commandAndOptions)
  })

program.version('0.1.0') // 设置了版本后，命令行会输出当前的版本号
program.parse(process.argv) // 解析命令行输入的参数
```


现在可以输入  `naluduo ` 进行测试：

```sh
$ naluduo
Usage: naluduo [options] [command]

Options:
  -V, --version      output the version number
  -h, --help         display help for command

Commands:
  tinyimg [options]  压缩图片
  help [command]     display help for command
```

执行 `naluduo tinyimg -d -r`，可以获得的`commandAndOptions` 对象为：

```js
{
  deepLoop: true,
  replace: true
}
```

完成图片命令的引入后，接下来要做的事情是，让用户选择要压缩的图片路径，然后传入 tinyimg 脚本。

### 添加可交互性，让用户选择要压缩的图片路径

在 Web 中，可使用 Input 来展现丰富多彩的表单，如开关、多选、单选、输入框等。而在命令行工具中，也可借用多种库来实现强交互性。

naluduo233 主要使用 [Inquirer.js](https://www.npmjs.com/package/inquirer) 库和它的插件 [inquirer-file-tree-selection-prompt](https://www.npmjs.com/package/inquirer-file-tree-selection-prompt) 实现用户自定义选择图片路径。

```sh
yarn add inquirer inquirer-file-tree-selection-prompt --dev
```

现在改造自动压缩图片脚本，接收从命令行输入的参数即可。

```js
const inquirer = require('inquirer')
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt')

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)

exports.tinyimg = async (commandAndOptions) => {
  const answer = await inquirer.prompt([
    {
      name: 'path', // 键
      type: 'file-tree-selection',
      message: '(必选) 压缩的图片文件夹路径/文件'
    }
  ])
  const { path } = answer

  tinyConfig.entry = path
  tinyConfig.replace = commandAndOptions && commandAndOptions.replace
  tinyConfig.deepLoop = commandAndOptions && commandAndOptions.deepLoop

  fileFilter(tinyConfig.entry)
  console.log('本次执行脚本的配置：', tinyConfig)
  console.log('等待处理文件的数量：', tinyConfig.files.length)
  tinyConfig.files.forEach((img) => fileUpload(img))
}

```

最终，实现的效果如下：

```sh
$ naluduo tinyimg -r -d
? (必选) 压缩的图片文件夹路径/文件 
  ↓ .(root directory)/
    → .git/
      .gitignore
      README.md
    → bin/
    → node_modules/
      package-lock.json
      package.json
    → src/
    → tests/
(Move up and down to reveal more choices)
```

选中 tests 文件夹：

```sh
$ naluduo tinyimg
? (必选) 压缩的图片文件夹路径/文件 ~/Documents/develop/nalu-cli/tests
本次执行脚本的配置： {
  files: [],
  entry: '~/Documents/develop/nalu-cli/tests',
  deepLoop: undefined,
  replace: false,
  exts: [ '.jpg', '.png', '.jpeg' ],
  max: 5120000
}
等待处理文件的数量： 3
```

自动压缩图片压缩率产高，但是也会遇到压缩的质量不好，这时候可以考虑使用 PhotoShop 自己手动检查图片质量作为兜底方案。

## 发布 npm 包与安装使用

现在本地写完命令行工具了，可以发布到 npm 仓库上，这样所有人都可以使用你的命令行工具。让我们先给 package.json 补充发布的配置： 

```json
{
  "name": "nalu-cli", // 指定包名，发布之前都要去NPM 官网上搜索一遍，确认想要使用的包名，是否已经被占用。
  "version": "0.1.0",
  "main": "src/index.js", // 指定包的入口文件
  "private": false,
  "bin": {
    "naluduo": "./bin/naluduo.js"
  }
}
```

然后进行登录和发布，注意的是，如果你是新用户，一定要点击激活 npm 发送给你的邮件，否则发包会出现 403 错误。激活后，要重新登录，重新发布。

```sh
$ npm login # 进行登录
Username: xxx
Password: 
Email: (this IS public) xxx
Logged in as naluduo233 on xxx

$ npm publish 
npm notice 
npm notice 📦  nalu-cli@0.1.0
npm notice === Tarball Contents === 
npm notice 435B  src/index.js           
npm notice 47B   bin/naluduo.js         
npm notice 4.6kB src/commands/tinyimg.js
npm notice 455B  package.json           
npm notice 75B   README.md              
npm notice === Tarball Details === 
npm notice name:          nalu-cli                                
npm notice version:       0.1.0                                   
npm notice package size:  2.7 kB                                  
npm notice unpacked size: 5.6 kB                                  
npm notice shasum:        4f71dd896bac28c4c1b284975d4df1c737e43292
npm notice integrity:     sha512-+NkZL5w0VFAGB[...]ODzboPWQ4Q7FA==
npm notice total files:   5                                       
npm notice 
+ nalu-cli@0.1.0
```

发布成功后，下载命令行工具，即可使用测试。也可以直接 `npx naluduo tiny` 的方式进行调用。

```sh
$ npm i -g naluduo
```

**这里踩了个坑，执行 naluduo 命令时发现报错，找不到 commander**。

```sh
$ naluduo 
Error: Cannot find module 'commander'
Require stack:
- /Users/kayliang/.nvm/versions/node/v14.17.5/lib/node_modules/nalu-cli/src/index.js
- /Users/kayliang/.nvm/versions/node/v14.17.5/lib/node_modules/nalu-cli/bin/naluduo.js
```

查看对应的文件 nalu-cli后，发现没有 node_modules 包，查看 package.json 发现：

```json
 "devDependencies": {
    "commander": "^8.3.0",
    "inquirer": "^8.2.0",
    "inquirer-file-tree-selection-prompt": "^1.0.13"
 }
```

依赖包都放在 `devDependencies` 上了，平时写项目代码时，`devDependencies` 和 `dependencies` 没有差别，但是如果发布库和包就要严格区分开来。否则声明在 `devDependencies` 的包不会被安装。

## 小结

本文主要从自动压缩图片需求入手，然后一步步构建一个命令行工具，我们主要学习到了：

- 全局可执行的命令行工具原理
- 使用 Node 如何开发一个命令工具
- 以及如何发布 npm 包以及使用

当然，这只是一个开始，很多脚本我们都可以封装成命令来使用。

> 代码地址 https://github.com/naluduo233/nalu-cli
> 持续更新...

### **支持多选图片【TODO】，改造 file-tree**处理



怎么区分，本地 `yarn link` 的包以及全局下载的包呢？

### rollup 打包源文件，输出最终可执行文件【针对 ts、等】

【从前面可知，命令行工具依赖的不仅仅是 node，还依赖 `commander` 、`inquirer` 等安装包，如果我们不进行打包，直接把源文件发布到 npm 上。这个时候如果别人 `npm i -g nalu-cli` 的话，执行 `naluduo` 时就会报错，找不到相关的依赖包。不可能要求用户都安装了你想要的依赖包。】【不需要，通过查看其他的命令行工具，全局按照的包，它的依赖包会自动安装到 node_modules 文件夹里，不知道为什么我的包，不会自动下载。】

因此我们需要引入打包工具，把依赖到的脚本打包在一起，还有我们尽量保证命令行工具包的大小，所以要进行压缩，都可以交给 rollup 来做。

安装 `rollup` 和 `rollup-plugin-terser`，配置如下：

```js
import { terser } from 'rollup-plugin-terser'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    production && terser() // minify, but only in production
  ]
}
```

添加打包和调试命令：

```json
{  
  "scripts": {
    "build": "rollup -c",
    "watch": "rollup -c -w"
	}
}
```

修改 `bin/naluduo.js` 的引用：

```diff
#!/usr/bin/env node 
- require('../src/index.js')
+ require('../dist/index.js')
```

### 调试九法命令【TODO】

## 添加字体转换命令【TODO】

【更新于】

## 添加自动升级命令【TODO】



## 参考资料

- [使用 Node，如何制作一个专业的命令行工具？](https://mp.weixin.qq.com/s/rUqUdugIY4pNMndrILCsnQ)
- [《大前端进阶 Node.js》系列 P6必备脚手架/CI构建能力（下）](https://juejin.cn/post/6844904111263973384)
- [前端脚手架搭建（一）node全局命令和调试方式](https://juejin.cn/post/6844903892090634247)
- [NodeJs 交互式命令行工具 Inquirer.js开箱指南](https://juejin.cn/entry/6844903480700698638 )
- [node 全自动使用 Tinypng](https://segmentfault.com/a/1190000015467084)

对于一些比较火的包，也可以把对应的脚本拿过来使用。不仅仅是片段。

- [ ] ✨ 前端一键自动部署工具 https://juejin.im/post/6872914108979609614?utm_source=gold_browser_extension#heading-1
- [ ] xcli 删除任意的文件脚本，可以输入 node_modules 等，提供测试所用。
  ```bash
  find . -name '*node_modules' -exec rm -rf {} \;
  find . -name '*gz' -exec rm {} \;
  ```
- [x] [EPSG.io](https://epsg.io/) 查询坐标系，也集成到 xcli 上去。
- [x] xcli-ui
- [ ] gis 坐标系转换工具
- [ ] xcli 添加支持搜索当前项目下 package.json 下某个依赖包是否存在，并且给出提示，包括读取依赖里面的内容文件 YUI（因此，这个搜索算法需要做好，可以像 vue build 这样的区别，添加参数，比如 --gis 查询 gis 相关，--npm，查询当前依赖包下的东西，这个应用场景是三级等保，查询依赖包的过程）
- [ ] xcli 可以参加 github-cli 的实现，快速查看当前工作项目的一些状态。
- [ ] tomcat 配置跨域（对指定资源）、gzip 压缩方案自动生成
- [ ] chrome same-site 设置，允许跨域携带 cookie
- [ ] linux 命令行
- [ ] Frontend 扩展工具需要用到的（压缩图片）
- [ ] 30-seconds-codes 常用代码集成
- [ ] 通过脚本替换测试环境与正式环境。
- [ ] ssh 配置说明
- [ ] 推荐一个程序员必备网站之一：Dev Hints ，非常实用！
- [ ] xcli 以 HTML 形式美化在页面上查看 markdown 文件。
- [ ] 批量把 md 文件生成一个 pdf 电子书脚本，比如之前宋哥发的 JavaScript 高级程序设计 。先研究单个转换、再是批量转换。
- [ ] 给 xcli 添加图片压缩命令，先支持命令行，参考 tinypng-cli。 后续再在 ui 界面中处理。每天学习一个命令：使用 jpegoptim 和 optipng 优化压缩图片。
  - [ ] 方案有两种：第一种也是使用 tinypng 在线服务，跳过图片上传、下载的限制。需要等待时间。
  - [ ] 本地压缩，方便快捷，但是没有 tinypng 的智能压缩算法。

## nvm

在多环境中，npm 该如何使用呢？
每个版本的 Node 都会自带一个不同版本的 npm，可以用 npm -v 来查看 npm 的版本。全局安装的 npm 包并不会在不同的 Node 环境中共享，因为这会引起兼容问题。它们被放在了不同版本的目录下，例如 `~/.nvm/versions/node/<version>/lib/node_modules</version>` 这样的目录。这刚好也省去我们在 Linux 中使用 sudo 的功夫了。因为这是用户的主文件夹，并不会引起权限问题。

yarn link 软链接 yarn 的配置下，这样即使没有安装到全局上，也可以使用当前命令。比如 xcli。

## yarn vs npm

安装了 yarn 后，还需要用 npm 命令吗？

## 查询页面命令

技术选型：

- 使用 node 原生爬取页面，但是少了很多选择器，可以快速获取 dom？
- puppeteer 是 Node.js 工具引擎，本身就是一个 Node.js 包。

puppeteer 是一个 Chrome 官方出品的 headless Chrome node 库(没有图形用户界面的的 web 浏览器)。它提供了一系列的 API, 可以在无 UI 的情况下调用 Chrome 的功能, 适用于爬虫、自动化处理等各种场景

使用 puppeteer 的话，而不是 node 原生的话，那么使用安装时也要安装 puppeteer 这么大的包？？况且这个包下载总是有问题。

需要完全使用 node.js 脚本来执行。

优缺点：

- puppeteer 功能强大，但是安装包比较大，50 多 m。

// 1. 拼接成 url
// 2. 启动 puppeteer
// 3. 进行访问
// 4. 获取结果
// 5. 进行显示

可以直接用 node 实现

```js
const puppeteer = require("puppeteer");
const search = 4490;
const s_proj4_text = "#s_proj4_text";
async function main() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  //   await page.goto(`https://epsg.io/?q=${search}`); // 两种方式
  await page.goto(`https://epsg.io/${search}`);
  //   await page.screenshot({path: './screenshots/epsg.png'});
  //   await page.click(proj4Selector);
  //   const handle = await page.$(".padt-2");
  const searchValue = await page.$eval(s_proj4_text, (el) => el.innerText);
  console.log(searchValue);
  browser.close();
}

main();
```

## 需求设计

异常处理：

unExpectInput

## 技术选型

- commander (解析命令)
- fs-extra (fs 模块拓展)
- execa (better child_process)
- download-git-repo (下载 git 仓库工具)
- boxen (终端中方框输出)
  -cfonts (终端炫酷的字体输出)
- chalk (给文字增加色彩)
- ora (loading 工具)
- handlebars (模板插值)
- module-alias (模板别名映射)
- inquirer (交互式询问并记录结果)
- listr (多任务串行执行，并提供 loading 效果)

### commander

通过 yarn link 可以把当前的仓库的 link 过去，进行实时 xcli 调试。然后通过 ts-node 进行命令行启动调试。

### pupeter 使用

### UI 界面

看懂 vue-cli ui 界面的实现套路。vue-cli 的 ui 是如何单独称为一个库呢，需要打包。

## 调试

xcli 与 xcli-server】xcli-ui 三者的协作关系：

本地开发时：可以通过 yarn link 把 xcli-server 和 xcli-ui 链接到 xcli 文件夹内使用。

内部测试时：
xcli 安装了 xcli-server 和 xcli-ui 两个安装包，指明仓库地址和分支。

需要考虑私服/公有 npm 包。
### 方式一

发布的 npm 包里带有 .npmrc，里面声明有私服的包注册源：

```npmrc
@dist/xcli-ui:registry=xxx/repository/dist-front/
@dist/xcli-server:registry=xxx/repository/dist-front/
```

这个是开发环境下的源声明。

使用 nrm 添加包源，然后单独 `yarn add xcli-server` 也行。
```js
$ nrm add ynpm http://XXXXXX:4873 # 添加私服的npm镜像地址
$ nrm use ynpm # 使用私服的镜像地址
```

前提是还要登录 npm 用户才能有权限把包下载下来，具体看安装使用的添加用户。
### 方式二

```json
{
  "name": "@dist/xcli",
  "version": "1.1.2",
  "description": "前端脚手架",
  "main": "dist/index.js",
  "bin": {
    "xcli": "bin/index.js"
  },
  "dependencies": {
    "xcli-server": "ssh://git@elbgit-1200450932.cn-northwest-1.elb.amazonaws.com.cn:5337/xdata/xdata-FE/xcli-server.git#dev",
    "xcli-ui": "ssh://git@elbgit-1200450932.cn-northwest-1.elb.amazonaws.com.cn:5337/xdata/xdata-FE/xcli-ui.git#dev"
  }
}
```

````sh
# 可以这样下载/更新依赖包
yarn add/upgrade xcli-server@ssh://git@elbgit-1200450932.cn-northwest-1.elb.amazonaws.com.cn:5337/xdata/xdata-FE/xcli-server.git#dev```
````

然后进行 yarn 安装即可在 node_modules 查看这两个包。

在运行 xcli ui 时，xcli-server 读取的界面静态文件来自于 xcli-ui 的 dist 文件，可以通过下面的代码进行替换：

也就是在运行 xcli ui 命令时，

xcli 的 ui.ts

```js
const { appListenStart } = require("xcli-server");

function opneUi() {
  appListenStart();
}
export default opneUi;
```

xcli-server 里的 init.ts

```js
function appListenStart() {
  let url = __dirname;
  const app = express();
  url = getUiUrl(url);
  const isXcli = isHasDirectory(url);
  if (isXcli) {
    app.use(express.static(url));
  }
  registerMiddle(app);
  const server = app.listen(8081, () => {
    openUi(server);
  });
}

// 跨平台
function getUiUrl(url) {
  url = path.normalize(url);
  url =
    url.split(path.normalize("xcli-server/dist"))[0] +
    path.normalize("xcli-server/dist");

  url = url.replace(
    path.normalize("xcli-server/dist"),
    path.normalize("xcli-ui/dist")
  );
  return url;
}
```

```sh
cli ui


 ██╗  ██╗  ██████╗ ██╗      ██╗
 ╚██╗██╔╝ ██╔════╝ ██║      ██║
  ╚███╔╝  ██║      ██║      ██║
  ██╔██╗  ██║      ██║      ██║
 ██╔╝ ██╗ ╚██████╗ ███████╗ ██║
 ╚═╝  ╚═╝  ╚═════╝ ╚══════╝ ╚═╝


url -> /Users/kayliang/Documents/linjy/DIST/xcli/node_modules/xcli-server/dist/services
url -> /Users/kayliang/Documents/linjy/DIST/xcli/node_modules/xcli-server/dist
url -> /Users/kayliang/Documents/linjy/DIST/xcli/node_modules/xcli-ui/dist
xcli-ui，访问地址为 http://127.0.0.1:8081
```

发布 npm 版本时，需要先发布 xcli-server、xcli-ui，然后到 xcli 里下载 xcli-server、xcli-ui 对应的 npm 版本包，再发布 xcli npm 包供外部使用。

需要发布 xcli、xcli-server、xcli-ui

同版本可以覆盖的，就是 package 里的 version 不改也没关系。

### 方式三

1. 在使用的模块目录进行：yarn link，注意包装 package.json 包含入口的字段 main，比如 `"main": "dist/index.js",`

```sh
xcli-server kayliang$ yarn link
yarn link v1.22.10
success Registered "xcli-server".
info You can now run `yarn link "xcli-server"` in the projects where you want to use this package and it will be used instead.
```

2. 然后去使用的 npm 包文件夹里：

```sh
yarn link "xcli-server"
```

3. 最后在文件夹里使用，注意这里必须跟第二步的包名一致

```js
// const { gisSystem, regionSystem } = require('xcli-ui-server'); 这是发布在 node_module 的包。
const { gisSystem, regionSystem } = require("xcli-server");
```

如何链接不到，请看这个。

`warning There's already a package called "vega" registered. This command has had no effect. If this command was run in another folder with the same name, the other folder is still linked. Please run yarn unlink in the other folder if you want to register this folder.`

For anyone else coming here, you can delete the link in `~/.config/yarn/link`

## 发布 npm 包
### 切换发布源

安装 nrm 管理注册源，可以实时切换各种源，进行发布。

```sh
$ npm install -g nrm
$ nrm ls　　# 查看所有的支持源（有*号的表示当前所使用的源,以下[name]表示源的名称）

$ nrm use [name]　　# 将npm下载源切换成指定的源

$ nrm help　　# 查看nrm帮助

$ nrm home [name]　　# 跳转到指定源的官网
$ nrm add ynpm http://XXXXXX:4873 # 添加私服的npm镜像地址
```

1. 选择私服 npm 镜像源
2. 申请账号和密码 ，进行登录
3. 在项目根目录下运行$ npm publish发布新包。
### dist 文件冲突如何解决

因为 dist 是作为发布的包版本，每个 package 声明的 main 都是读取的 dist 文件。

![](../.vuepress/public/images/2021-01-19-23-18-52.png)

为避免 gitignore 的冲突，要忽略 dist，然后在本地打包时，可以在 package.json 里声明 files 字段，然后添加 dist 和 bin 即可。
## 如何使用（外部消费者）
### 安装步骤

> 环境要求: NodeJS 版本 >= 10

#### 创建用户

```sh
npm adduser --registry xxx/repository/dist-front/
username: xdata
password: dist1234
email: 填自己的
```

```sh
KaydeMBP:xcli kayliang$ npm adduser --registry  http://xxxx/repository/dist-front/
Username: xdata
Password: 
Email: (this IS public) linjy@dist.com.cn
Logged in as xdata on http://xxxx/repository/dist-front/
```
#### 添加全局镜像源

使用`npm config set @dist:registry xxx/repository/dist-front/ --global`

#### 全局安装命令行工具

安装即可，这样会安装 xcli 以及里面所需要的私服包

`npm i -g @dist/xcli`

### 使用

`xcli` 选择一个功能

`xcli --help` 查看脚手架使用帮助

`xcli create || xcli c` 创建项目

`xcli script || xcli s` 选择脚本执行

`xcli commit || xcli cm` 填写 git message 并提交

`xcli update` 升级脚手架

## 如何新增功能
### create 命令
#### create 命令实现分析

#### 如何新增项目模版

##### 开箱即用的 ts + vue3 项目基础框架解决方案 (非 gis，不接运维版)

目前的 xcli-ui 是使用 ts +vue3 + antd-vue-design，xcli 新增的模版应该也是使用 vue3 才比较有意义，且作为一个基本的预研项目。目前框架只有 antd-vue-design 和 element-plus 支持。

后续可以考虑用上 **quark 3.0 版本，可以参与其中重构 quark，fork 一版 vue3**。

下周需要跟罗总沟通下接入的细节，是否确认是 vue3，因为 vue2 + ts 意义不大。

quark 2.0 支持 vue3 版本

功能点
- 优化的生产环境依赖


vue3 项目基础框架
- TS + Vue3
- UI 组件库如何处理（对于 vue2 的组件适配吗？能够用吗？）这些都需要先实践 vue3，知道有哪些不同，以前的 vue2 插件、组件是如何添加的

主要就是 ts 和 vue3 、ui 组件库了，剩下再考虑地图
- [ ] Arcgis

### 新增命令
## 参考资料

- 爬虫
  - [50 行代码，Node 爬虫练手项目 🕷️](https://juejin.im/post/6844903827024396296)
  - [万物皆可爬-puppeteer 实战](https://juejin.im/post/6844903944645246984)
  - [结合项目来谈谈 Puppeteer](https://juejin.im/post/6844903903000166407#heading-23)
  - [Node：使用 Puppeteer 完成一次复杂的爬虫](https://zhuanlan.zhihu.com/p/35758104)
  - [Puppeteer 与 Chrome Headless —— 从入门到爬虫](https://juejin.im/entry/6844903494076334087)
- [vue-cli]
- webpack-cli
- [如何开发企业级前端脚手架 xcli](http://52.83.238.168:9000/ks/doc-fe-web-engineer/%E8%84%9A%E6%89%8B%E6%9E%B6/%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%89%8D%E7%AB%AF%E8%84%9A%E6%89%8B%E6%9E%B6xcli.html)
- [Chrome 浏览器改变 SameSite 设置](https://juejin.im/post/6844904096655212558)
- [server-configs](https://github.com/h5bp/server-configs) 服务器配置
- 官方文档 可以在安装后的 tomcat 首页查看配置文档
- [从零搭建一个 node 脚手架工具（一）](https://segmentfault.com/a/1190000019791588)
- [🎉 用 Node.js 开发一个 Command Line Interface (CLI)](https://zhuanlan.zhihu.com/p/38730825)
- [用一次就会爱上的 cli 工具开发](https://juejin.im/post/6844903831994630158#heading-1)
- https://github.com/justjavac/deno_thanos Deno 灭霸，随机删除当前目录里一半的文件 ⚠️ 慎用 可以用 node 模仿一个，用来学习文件操作。
- [使用 Deno 构建一个命令行天气预报程序](https://juejin.im/post/6864824992626901005?utm_source=gold_browser_extension#heading-5)
- [How to create a real-world Node CLI app with Node](https://medium.com/free-code-camp/how-to-create-a-real-world-node-cli-app-with-node-391b727bbed3)
- [【手把手】15 分钟搭一个企业级脚手架](https://juejin.im/post/6844903925666037773#heading-20)
