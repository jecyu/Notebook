# 正则表达式

## 正则表达式字符匹配

## 正则表达式位置匹配

## 正则表达式括号的作用

## 正则表达式回溯法原理

## 正则表达式的拆分

## 应用案例

### 检索目录下的模块

```js
function registerGlobalComponent() {
  const req = require.context(".", true, /\.vue$/);
  req.keys().forEach(fileName => {
    const componentConfig = req(fileName);
    console.log(componentConfig);
    const name =
      fileName.name ||
      fileName.replace(/^\.\/(.*\/)?/, "").replace(/\.vue$/, "");
    console.log(name);
    Vue.component(name, componentConfig.default || componentConfig);
  });
}
export default registerGlobalComponent;
```