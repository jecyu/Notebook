# 正则表达式

## 入门
 
### 正则表达式的创建和使用

#### 使用正则表达式字面

### 两种模糊匹配

### 字符组

#### 常见的间写形式

|字符组|具体含义|
| --- | --- |
| \d | 表示[0-9]。表示是一位数字 |
| \D | 表示[^0-9]。表示除数字以外的任意字符 |
| \w | 表示[0-9a-zA-Z_]。表示数字、大小写字母和下划线|
| \W | 表示[^0-9a-zA-Z_]。表示非单词字符|
| \s | 表示[ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、回车符、换页符。记忆方式：s 是 space 的首字母，空白符的单词是 white space|
| \S | 表示[^\t\v\n\r\f]。非空白符|
| . | 表示 [^\n\r\u2028\u2029]。通配符，表示几乎任意字符。<u>换行符、回车符、行分隔符和段分隔符除外。</u> 记忆方式：想想省略号 ... 中的每个点，都可以理解成占位符，表示任何类似的东西。|

如果想要匹配任意字符怎么办？可以使用 [\d\D]、[\w\W]、[\s\S]、[^] 中的任何一个。


### 量词

#### 简写形式

|量词|具体含义|
| --- | --- |
|{m,}|表示至少出现 m 次。|
|{m}| 等价于 {m,m}，表示出现 m 次|
|?| 等价于 {0,1}，表示出现或者不出现。记忆方式：问号的意思表示，有吗？|
|+|等价于 {1,}, 表示出现至少一次。记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。|
|*|等价于 {0}，表示出现任意次，有可能不出现。记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来。|

## 正则表达式字符匹配

## 正则表达式位置匹配

### ^ 和 $

^（脱字符）匹配开头，在多行匹配中匹配行开头。
$（美元符号）匹配结尾，在多行匹配中匹配行结尾。

## 正则表达式括号的作用

## 正则表达式回溯法原理

## 正则表达式的拆分

## 应用案例

### 正则与数值

### 正则与颜色

### 正则与 URL

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

### 读取获取二进制时响应头的名称

```js
const reg = /filename=(\S.*?\.\w+)$/;  // \S 表示匹配非空白符 .表示通配符 *任意多个 \. \w 表示数字、大小写字母和下划线
const fileInfo = headers["content-disposition"]; // Content-Disposition: attachment;fileName=档案日志导出2020-04-16 11:01:20.xlsx
console.log(fileInfo);
const filename = fileInfo && fileInfo.match(reg);
```

### webpack 文件配置

webpack.config.js，引入 loader 和 plugin 需要处理的文件，使用了 test 正则表达式处理
```js
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js', // 以当前目录为根目录，入口文件
  output: { // 输出文件
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // 引入loader 和 plugin 处理相关文件
  module: {
    rules: [
      {
        test: 正则表达式, // 这里
        use: [对应的 loader]
      }
    ]
  },
  plugin: {}
}
```

## 参考资料

- [《360前端星计划》](https://study.qiyun.360.cn/course/festar2020)
- 《JavaScript 正则迷你书》