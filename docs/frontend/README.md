# 工程化

## 使用 ESLint + Prettier 统一代码风格

![使用 ESLint + Prettier 统一代码风格](../.vuepress/public/images/codeFormat.png)

> 参考资料：https://juejin.im/post/5b27a326e51d45588a7dac57

## webpack require.context()

你还可以通过 require.context() 函数来创建自己的 context。

可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。

```js
require.context(directory, useSubdirectories = false, regExp = /^\.\//);
```

demo
```js
require.context('./test', false, /\.test\.js$/);
// （创建出）一个 context，其中文件来自 test 目录，request 以 `.test.js` 结尾。
require.context('../', true, /\.stories\.js$/);
// （创建出）一个 context，其中所有文件都来自父文件夹及其所有子级文件夹，request 以 `.stories.js` 结尾。
```

### Vue 全局组件

### 首字母大写

### 利用require.context遍历目录所有图片

### 加载所有的图片

## Webpack sourceMap 的作用