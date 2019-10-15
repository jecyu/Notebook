# npm

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
3. 通过cnpm
```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

二、使用官方镜像
```bash
npm config set registry https://registry.npmjs.org/
```
三、查看npm源地址
```bash
npm config get registry
```

## 关于 npm 包版本号前缀 ~ 和 ^ 区别

- ~ 会匹配安装最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0

- ^ 会匹配安装最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0

## yarn add 

大多数的包会从 `npm registry` 目录里以包名来安装。
1. yarn add package-name 会安装 latest 最新版本。
2. yarn add package-name@1.2.3 会从 registry 里安装这个包的指定版本。
3. yarn add package-name@tag 会安装某个 “tag” 标识的版本（比如 beta、next 或者 latest）。

指定不同路径的包：
1. yarn add file:/path/to/local/folder 从本地系统里安装一个包，可以用这种方式测试还没发布的包。
2. yarn add file:/path/to/local/tarball.tgz 安装一个 gzipped 压缩包，此格式可以用于在发布之前分享你的包。
3. yarn add <git remote url> 从远程 git repo 里安装一个包。
4. yarn add <git remote url>#<branch/commit/tag> 从一个远程 git 仓库指定的 git 分支、git 提交记录或 git 标签安装一个包。
5. yarn add https://my-project.org/package.tgz 用一个远程 gzipped 压缩包来安装。
