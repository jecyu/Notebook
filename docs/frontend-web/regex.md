# 正则表达式

## 入门

### 正则表达式的创建和使用

#### 使用正则表达式字面量

```js
const reg = /[a-z]\d+[a-z]/i;
```

**优点**

- 简单方便
- 不需要考虑二次转义

**缺点**

- 子内容无法重复使用
- 过长的正则导致可读性差

#### 使用 RegExp 构造函数

```js
const alphabet = "[a-z]";
const reg = new RegExp(`${alphabet}\\d+${alphabet}`, "i");
```

**优点：**

- 子内容可以重复使用。
- 可以通过控制子内容的粒度提高可读性。

**缺点**

- 二次转义的问题非常容易导致 bug

```js
// 错误
const reg = new RegExp(`\d+`);
const result = reg.test("1");
const result2 = reg.test("ddd");
console.log("输出结果1 =>", result); // => false
console.log("输出结果2 =>", result2); // => true

// 正确，需要添加斜杠转义
const reg2 = new RegExp(`\\d+`);
const result3 = reg2.test("1");
const result4 = reg2.test("ddd");
console.log("输出结果 result3 =>", result3); // =>
console.log("输出结果 result4 =>", result4); // =>
```

需要注意转义问题。

- 在字符串中，两个反斜杠被解释为一个反斜杠，然后在作为正则表达式， `\\` 则被正则表达式引擎解释为 `\`，所以在正则表达式中需要使用四个反斜杠。
- 同理，要匹配点号时，需要在点号之前加上两个反斜杠，否则将被正则表达式当作一个`点`号，一个点号在正则表达式中表示匹配任意字符了。

避免混淆，统一：针对 `\`、`.` 统一进行转义。无论是字面量用法还是构造函数。

#### 常见用法

```js
// Reg.prototype.exec() 和 String.prototype.match()
const regex = /[a-z]\d+[a-z]/i;
const result3 = regex.exec("a1a");
const result4 = regex.exec("1a1");
// ["a1a", index: 0, input: "a1a", groups: undefined]
const result5 = "a1a".match(regex3);
// result5 => ["a1a", index: 0, input: "a1a", groups: undefined]
const result6 = "1a1".match(regex3);
```

```js
// match 和 exec 对 g 的输出结果不同
const reg = /(a)/g;
const result1 = reg.exec("a1a");
// result1 => ["a", "a", index: 0, input: "a1a", groups: undefined]
const result2 = "a1a".match(reg);
// result2 => ["a", "a"]
// match 返回的数据格式不固定,
```

### 两种模糊匹配

#### 横向模糊匹配

横向模糊指的是，一个正则可匹配的字符串的**长度不是固定**的，可以是多种情况的。

其实现的方式是使用**量词**。譬如 `{m,n}`，表示连续出现最少 m 次，最多 n 次。

比如正则 /ab{2,5}c/ 表示匹配这样一个字符串：第一个字符是“a”，接下来是 2 到 5 个字符 “b”，最后是字符 “c”。

测试如下：

```js
const regex1 = /ab{2,5}c/g;
const string1 = "abc abbc abbbc abbbbbc abbbbbbc";
const result1 = string1.match(regex1);
// result1 => Array(3) ["abbc", "abbbc", "abbbbbc"]
```

#### 纵向模糊匹配

纵向模糊匹配指的是，一个正则匹配的字符串，具体到某一位字符时，它可以**不是某个确定的字符**，可以有多种可能。

其实现的方式是使用**字符组。**譬如 [abc]，表示该字符是可以是字符 “a”、“b”、“c”中的任何一个。

比如 /a[123]b/ 可以匹配如下三种字符串：“a1b”、“a2b”、“a3b”

```js
const regex = /a[123]b/g;
const string = "a0b a1b a2b a3b a4b";
const result = string.match(regex);
// result => Array(3) ["a1b", "a2b", "a3b"]
```

### 字符组

#### 常见的间写形式

| 字符组 | 具体含义                                                                                                                                                                          |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \d     | 表示[0-9]。表示是一位数字                                                                                                                                                         |
| \D     | 表示[^0-9]。表示除数字以外的任意字符                                                                                                                                              |
| \w     | 表示[0-9a-zA-Z_]。表示数字、大小写字母和下划线                                                                                                                                    |
| \W     | 表示[^0-9a-za-z_]。表示非单词字符                                                                                                                                                 |
| \s     | 表示[ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、回车符、换页符。记忆方式：s 是 space 的首字母，空白符的单词是 white space                                        |
| \S     | 表示[^\t\v\n\r\f]。非空白符                                                                                                                                                       |
| .      | 表示 [^\n\r\u2028\u2029]。通配符，表示几乎任意字符。<u>换行符、回车符、行分隔符和段分隔符除外。</u> 记忆方式：想想省略号 ... 中的每个点，都可以理解成占位符，表示任何类似的东西。 |

如果想要匹配任意字符怎么办？可以使用 [\d\D]、[\w\W]、[\s\S]、[^] 中的任何一个。

### 量词

#### 简写形式

| 量词 | 具体含义                                                                                                             |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
| {m,} | 表示至少出现 m 次。                                                                                                  |
| {m}  | 等价于 {m,m}，表示出现 m 次                                                                                          |
| ?    | 等价于 {0,1}，表示出现或者不出现。记忆方式：问号的意思表示，有吗？                                                   |
| +    | 等价于 {1,}, 表示出现至少一次。记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。                              |
| \*   | 等价于 {0}，表示出现任意次，有可能不出现。记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来。 |

## 正则表达式字符匹配

## 正则表达式位置匹配

### ^ 和 \$

^（脱字符）匹配开头，在多行匹配中匹配行开头。
\$（美元符号）匹配结尾，在多行匹配中匹配行结尾。

### i 和 g

i 代表忽略大小写

g 代表全局匹配

```bash
> "1211".replace(/(\d)\1*/g, `a`)
'aaa'
> "1211".replace(/(\d)\1*/, `a`)
'a211'
>
```

## 正则表达式括号的作用

不管哪门语言中都有括号。正则表达式也是一门语言，而括号的存在使这门语言更为强大。

### 分组和分支结构

这二者是括号最直觉的作用，也是最原始的功能，强调括号内的正则是一个整体，即**提供子表达式。**

#### 分组

我们知道 `/a+/` 匹配连续出现的 `"a"`，而要匹配连续出现的 "ab" 时，需要使用 `/(ab)+/`。

其中括号是提供分组功能，使量词 `+` 作用于 `"ab"` 这个整体，测试如下：

```js
const reg = /(a)/g;
const result = reg.exec("a1a");
// result => ["a", "a", index: 0, input: "a1a", groups: undefined]
```

#### 分支结构

#### 分组引用

##### 提取数据

```js
/(\d{4})-(\d{2})-(\d{2})/.exec("2020-06-05");
// =>[ '2020-06-05','2020','06','05',index: 0,input: '2020-06-05',groups: undefined ]
```

##### 替换数据

```js
"2020-06-05".replace(/(\d{4})-(\d{2})-(\d{2})/, (all, year, month, day) => `${month}/${day}/${year}`)
// => '06/05/2020'
```

#### 反向引用

报数
```js
/**
 * \d 匹配一个数字
 * \1 匹配前面第一个括号内匹配的内容
 * (\d)\1* 匹配第一个括号相同的数字，0个多个，如1 => 1, 11 => 11, 112 => 11
 * g 会匹配所有符合规则的字符
 */
return preResult.replace(/(\d)\1*/g, (item) => `${item.length}${item[0]}`);
```

这里的 `\1` 便是反向引用，表示引用第一个分组匹配的内容，后续还可以添加上量词表示 0 到多个。

### 非获取匹配

`?!`负向预查，非获取匹配

```js
/^(?!index)\w*.ts$/.exec("aaa.ts");
// => [ 'aaa.ts', index: 0, input: 'aaa.ts', groups: undefined ]
```

```js
/^(?!index)\w*.ts$/.exec("index.ts");
// => null
```

```js
const req = require.context(".", false, /\.\/(?!index)\w*\.ts$/); // 排除 index 入口文件，第三个参数匹配子目录
```

### 非捕获括号

### 相关案例

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
  req.keys().forEach((fileName) => {
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
const reg = /filename=(\S.*?\.\w+)$/; // \S 表示匹配非空白符 .表示通配符 *任意多个 \. \w 表示数字、大小写字母和下划线
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

### 时间格式化工具

```js
/**
 * @description 时间格式化工具
 * @param {Date} date对象
 * @param {String} fmt YYYY-MM-DD HH:mm:ss => 2019-03-07 21:43:43
 * @returns {String}
 */
export const FormateDate = (date: Date, fmt: string) => {
  function padLeftZero(n: any) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  const o: any = {
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + "";
      // 根据模板来替换
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
};
```

### apache conf/httpd.conf 增加配置禁用脚本执行

```bash
<Files ~ ".+.ph(p[3457]?|t|tml).">
        Order Allow,Deny
        Deny from al
</Files>
```

### 爬取网页过滤关键词

## 总结

怎样用好正则表达式

- 明确需求
- 考虑全面
- 反复测试

## 参考资料

- [《360 前端星计划》](https://study.qiyun.360.cn/course/festar2020)
- 《JavaScript 正则迷你书》
- [vscode-regex](https://github.com/chrmarti/vscode-regex/) vscode 插件 Regex Previewer -这是一个用于实时测试正则表达式的实用工具。它可以将正则表达式模式应用在任何打开的文件上，并高亮所有的匹配项。
- [正则的三个应用场景](http://ppt.baomitu.com/d/6f04cd7c#/)
