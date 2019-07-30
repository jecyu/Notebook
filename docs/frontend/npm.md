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

