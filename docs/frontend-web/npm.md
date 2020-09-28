# npm

## 初始化一个项目

在项目里没有安装任何 `npm` 时，先使用以下命令生成 package.json 描述文件，否则直接安装 `npm` 依赖包的话，会被安装到全局环境下。

```bash
yarn init 或 npm init
```

如果没有安装 yarn，推荐全局安装

```bash
npm install yarn -g
yarn help COMMAND
```

## npm 和 yarn 的区别，我们该如何选择？

Yarn 是什么？
“Yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。”这句话让我想起了使用 npm 时的坑了：

- npm install 的时候巨慢。特别是新的项目拉下来要等半天，删除 `node_modules`，重新 `install` 的时候依旧如此。
- 同一个项目，安装的时候无法保持一致性。由于 `package.json` 文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义。

- "5.0.3",
- "~5.0.3",
- "^5.0.3"

<u>“5.0.3”表示安装指定的 `5.0.3` 版本，“～ 5.0.3” 表示安装 `5.0.X` 中最新的版本，“^5.0.3” 表示安装 `5.X.X` 中最新的版本。这就麻烦了，常常会出现同一个项目，有的同事是 OK 的，有的同事会由于安装的版本不一致出现 bug。</u>

- 安装的时候，包会在同一时间下载和安装，中途某个时候，一个包抛出了一个错误，但是 npm 会继续下载和安装包。因为 npm 会把所有的日志输出到终端，有关错误包的错误信息就会在一大堆 npm 打印的警告中丢失掉，并且你甚至永远不会注意到实际发生的错误。

带着这些坑，我开始了解 Yarn 的优势及其解决的问题。

### Yarn 的优点？

- **速度快**。速度快主要来自以下两个方面：
  - 并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。《npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是同步执行所有任务，提高了性能。
  - 离线模式：如果之前已经安装过一个软件包，用 Yarn 再次安装时之间从缓存中获取，就不用像 npm 那样再从网络下载了。
- **安装版本统一**：为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）`yarn.lock` 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 `npm shrinkwrap` 命令。这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 `yarn.lock` 文件一个道理。npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，而 npm 要通过 `shrinkwrap` 命令生成 `npm-shrinkwrap.json` 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。
- **更简洁的输出**：npm 的输出信息比较冗长。在执行 npm install 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji 直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。
  多注册来源处理：所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。
- **更好的语义化**： yarn 改变了一些 npm 命令的名称，比如 `yarn add/remove`，感觉上比 npm 原本的 `install/uninstall` 要更清晰。

### yarn 的安装:

下载 node.js，使用 npm 安装
npm install -g yarn
查看版本：yarn --version
安装 node.js,下载 yarn 的安装程序:
提供一个.msi 文件，在运行时将引导您在 Windows 上安装 Yarn
Yarn 淘宝源安装，分别复制粘贴以下代码行到黑窗口运行即可
yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g

## npm vs yarn 命令

> yarn https://yarnpkg.com/en/docs/migrating-from-npm

<table>
  <thead>
    <tr>
      <td> npm(v5) </td>
      <td> Yarn </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>npm install</td>
      <td>yarn install</td>
    </tr>
    <tr>
      <td>npm install --no-package-lock</td>
      <td>yarn install --no-lockfile</td>
    </tr>
    <tr>
      <td>npm install [package] --save</td>
      <td>yarn add [package]</td>
    </tr>
    <tr>
      <td>npm install [package] --save-dev</td>
      <td>yarn add [package] --dev</td>
    </tr>
    <tr>
      <td>npm install [package] --global</td>
      <td>yarn global add [package]</td>
    </tr>
    <tr>
      <td>npm uninstall [package] --global</td>
      <td>yarn global remove [package]</td>
    </tr>
    <tr>
      <td>npm uninstall [package]</td>
      <td>yarn remove [package]</td>
    </tr>
    <tr>
      <td>npm cache clean</td>
      <td>yarn cache clean [package]</td>
    </tr>
    <tr>
      <td>rm -rf node_modules && npm install</td>
      <td>yarn upgrade</td>
    </tr>
    <tr>
      <td>npm update --global</td>
      <td>yarn global update</td>
    </tr>
  </tbody>
</table>

升级依赖包，直接 `yarn add xxx` 即可覆盖。

## npm 换源

一、使用淘宝镜像

1. 临时使用

```bash
npm --registry https://registry.npm.taobao.org install express
```

2. 持久使用

```bash
npm config set registry https://registry.npm.taobao.org
```

3. 通过 cnpm

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

二、使用官方镜像

```bash
npm config set registry https://registry.npmjs.org/
```

三、查看 npm 源地址

```bash
npm config get registry
```

## 关于 npm 包版本号前缀 `~` 和 `^` 区别

- `~` 会匹配安装最近的小版本依赖包，比如`~1.2.3`会匹配所有 1.2.x 版本，但是不包括 1.3.0

- `^` 会匹配安装最新的大版本依赖包，比如`^1.2.3`会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0

## 全局安装和本地安装

## 开发依赖和生产依赖

## yarn add

大多数的包会从 `npm registry` 目录里以包名来安装。

1. `yarn add package-name` 会安装 latest 最新版本。
2. `yarn add package-name@1.2.3` 会从 registry 里安装这个包的指定版本。
3. `yarn add package-name@tag` 会安装某个 “tag” 标识的版本（比如 beta、next 或者 latest）。

指定不同路径的包：

1. `yarn add file:/path/to/local/folder` 从本地系统里安装一个包，可以用这种方式测试还没发布的包。
2. `yarn add file:/path/to/local/tarball.tgz` 安装一个 gzipped 压缩包，此格式可以用于在发布之前分享你的包。
3. `yarn add <git remote url>` 从远程 git repo 里安装一个包。
4. `yarn add <git remote url>#<branch/commit/tag>` 从一个远程 git 仓库指定的 git 分支、git 提交记录或 git 标签安装一个包。
5. yarn add https://my-project.org/package.tgz 用一个远程 gzipped 压缩包来安装。

## 参考资料

- [npm 和 yarn 的区别，我们该如何选择？](https://zhuanlan.zhihu.com/p/27449990)
- [Yarn vs npm: Everything You Need to Know](https://www.sitepoint.com/yarn-vs-npm/)
