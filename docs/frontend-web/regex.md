# 正则表达式

## 前言

正则表达式是一个查找和替换字符串的强有力的工具。

完整的正则表达式由两种字符构成。特殊字符，例如 `*` 称为 `“元字符”（metacharacters）`，其他为`“文字”（literal）`，或者是普通文本字符（normal text characters）。

我们可以把正则表达式想象为普通的语言，普通字符对应普通语言中的单词，而元字符对应语法。根据语言的规则，按照语法把单词组合起来，就会得到能传达思想的文本。

抛出一个问题：使用正则读取 cookie

```js
const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie;
```

下面这行代码的具体意思是？先往下阅读，再回过头理解这行代码。

```js
new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
```

凡是涉及到文字处理的领域，大多数都可以使用（也有例外，Word里面不能用），尤其是程序员的日常开发，完全是和文本打交道的，所有的代码都是文本，写代码本身就是文字处理，所以与正则表达式是密不可分的。
## 正则表达式思想

> 在 mac shell 终端中可以使用检索文本文件：`Egrep` 命令行工具，进行以下正则表达式知识的实践使用。egrep 把第一个命令行参数视为一个正则表达式，剩下的v参数作为待检索的文件名。
> egrep '正则表达式' mailbox-file
### Egrep 元字符
#### 行的开始和结束

脱字符号 `^` 和 美元符号 `$`，在检查一行文本时，`^` 代表一行的开始，`$` 代表一行的结束。

比如正则表达式 `cat` 寻找的是一行文本中任意位置的 `c·a·t`，但是 `^cat`只寻找行首的 `c·a·t`——`^` 用来把匹配文本（这个表达式的其他部分匹配的字符）“锚定”（anchor）在这一行的开头。同样，`cat$` 只寻找位于行末的 `c·a·t`，例如以 scat 结尾的行。

正确的理解：`^cat` 匹配的是以 c 作为一行的第一个字符，紧接一个 a，紧接一个 t 的文本。

比如有以下文本：

catxxx
catany
batany

```sh
egrep "^cat" word.list 
catxxx
catany
```
#### 字符组
##### 匹配若干字符之一

如果我们需要搜索的是单词 “grey”，同时又不确定它是否写作 “grey”，就可以使用正则表达式结构体（contruct）`[...]`。它容许使用者列出在某处期望匹配的字符，通常被称做**字符组**。

`[e]`匹配字符 e，`[a]` 匹配字符 a，而正则表达式 `[ea]` 能匹配 a 或者 e。 所以，`[gr[ea]y]` 的意思是：先找到 g，跟着是一个 r，然后是一个 a 或则 e，最后是一个 y。

> mac 终端 egrep 正则 文件

```sh
egrep "h[123456]" index.html
```

结果
```sh
  <h1>1</h1>
  <h2>2</h2>
  <h3>3</h3>
  <h4>4</h4>
  <h5>5</h5>
  <h6>6</h6>
```

##### 排除型字符组

用 `[^...]` 取代 `[...]`，这个字符组就会匹配任何未列出的字符。例如，`[^1-6]` 匹配除了 1 到 6 以外的任何字符。**这个字符组中的 `^` 表示 “排除（negate）”，列出不希望匹配的字符。**

只有在字符串组内部（而且不是第一个字符的情况下），连字符才能表示范围。在字符串外部，**`^` 表示一个行锚点（line anchor），但是在字符组内部（而且必须是紧接在字符组的第一个中括号之后），它就是一个元字符**。

我们需要在一堆英文单词中搜索出一些特殊的单词：在这些单词中，字母 q 后面的字母不是 u。用正则表达式来表示，就是 `q[^u]`。
比如

qoph
queue
taskQueue
Qantans
Iraq
Iraqian
qasida

```sh
qoph
Iraqian
qasida
```

为什么无法匹配 `Iraq` 呢？正则表达式要求 q 之后跟一个 u 以外的字符，如果文本行的结尾有一个换行字符，就可以成功匹配到。因为 egrep 会在检查正则表达式之前把这些换行符去掉，所以在行尾的 q 之后，没有能够匹配到 u 以外的字符。

#### 排除字符串

```js
import Vue from "vue";
// 自动注册指令

const req = require.context("./", false, /\.\/(?!index\.)\w*\.js$/); // 排除 index

req.keys().forEach((fileName) => {
  const directiveName = fileName.replace(/\.\/|\.js/g, "");
  Vue.directive(directiveName, req(fileName).default);
});

```

#### 用点匹配任意字符

元字符 `[.]`（通常称为点号）用来匹配任意字符的字符组的简便写法。如果我们需要在表达式中使用一个“匹配任何字符”的占位符（placeholder），用点号就很方便。

例如，如果我们需要搜索 03/19/16、03-19-76 或则 03.09.76，不怕麻烦的话用一个明确允许 `/`、`-`、`.` 的字符组来构建正则表达式，例如 `03[-./]19[-./]76`，也可以简单用 `03.19.76`。

测试
03/19/16
03-19-16
03.19.16
03219316
03--19--16

```sh
egrep "03.19.16" word.list 

03/19/16
03-19-16
03.19.16
03219316
```

实际测中，发现正则表达式没有匹配到 `-` 或 `/` 的字符串。

值得一提的是，在 `03[-./]19[-./]76` 中，点号并不是元字符，因为它们在字符串组内部（记住，在字符串组里面和外面，元字符的定义和意义是不一样的）。这里的连字符也不是元字符，因为它们都紧接在 `[` 或者 `[^` 之后。
#### 多选结构
##### 匹配任意子表达式

`|` 是一个“或”（or）元字符，依靠它，我们能够把不同的子表达式组合成一个总的表达式，而这个总的表达式又能够匹配任意的子表达式。

例如 「Bob」 和 「Robert」是两个表达式，但 `Bob|Robert` 就是能够同时匹配其中的任意一个的正则表达式。在这样的组合中，子表达式称为“多选分分支（alternative）”

回头看 `gr[ea]y` 的例子，它还可以写作 `grey|gray`，或者是 `gr(a|e)y`。后者用括号来划定多选结构的范围（正常情况，括号也是元字符）是必须的，因为没有括号，它的意思就变成了 `gra` 或者 `ey`。

First
1st

```sh
$ egrep "(Fir|1)st" word.list

First
1st
```

`gr[ea]y` 与 `gr(a|e)y` 的例子可能会让人觉得多选结构与字符组没太大的区别，但是请留神不要混淆这两个概念。一个字符组只能匹配目标文本中的单个字符，而每个多选结构自身都可能是完整的正则表达式，都可以匹配任意长度的文本。

字符组基本可以算是一门独立的微型语言（例如，对于元字符，它们有自己的规定），而多选结构是“正则表达式语言主体”的一部分。

同时，在一个包含多选结构的表达式中使用脱字符和美元符的时候也要小心，比如 `^From|Subject|Date:` 和 `^(From|Subject|Date):` 就会发现，它们看起来一样，但结果却大不相同。第一个表达式由 3 个多选分支构成，所以它能够匹配 `^From` 或者 `Subject` 或者 `Date:` 。

而第二个表达式是每一个多选分支之前都有脱字符，通过括号的限制实现，匹配一行的起始位置，然后匹配 `From`、`Subject` 或者 `Date` 中的任意一个，然后匹配 `:`。这样在匹配 E-mail 文本信息很有用。

```sh
$ egrep '^(From|Subject|Date):' word.list 
From: jecyu.lin@gmail.com
Subject: be seein
Date: Web, 25 Oct 2006 8:37:24
```

#### 忽略大小写

E-mail header 的例子很适合用来说明不区分大小写（case-insensitive）的匹配的概念，可以使用 `[Ff][Rr][On][Mm]` 取代 `From`，这样就可以匹配任何形式的 "from"，但缺点就是很不方便。

egrep 的命令行参数 `-i` 表示进行忽略大小写的匹配，把 `-i` 写在正则表达式之前：

```sh
$ egrep -i '^(From|Subject|Date):' word.list 
From: jecyu.lin@gmail.com
Subject: be seein
Date: Web, 25 Oct 2006 8:37:24
`SUBJECT: MAKE MONEY FAST` --》大写
```

#### 单词分界符

使用正则表达式时经常会遇到的一个问题，期望匹配的 “单词” 在另一个单词之中。

如果你的 egrep 支持 “元字符序列（metasequences）” `\<` 和 `\>`，就可以使用它们来匹配单词分界的位置，可以把它们想象为单词版本的 `^` 和 `$`，分别用来匹配单词的开头和结尾。

cat
catxxx
catany

```sh
$ egrep -i '\<cat\>' word.list 
cat // 只匹配到 cat
```

如果使用 `cat` 会把上面三行都匹配上。

请注意，`<` 和 `>` 本身并不是元字符——只有当它们与斜线结合起来的时候，整个序列才具有特殊意义，这也是称为元字符序列的原因。

#### 小结

至今为止所见的元字符小结

| 元字符                           | 名称                                                 | 匹配对象                                                     |
| -------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| `.`<br />`[...]`<br />`[^...]`   | 点号<br />字符组<br />排除型字符组                   | 单个任意字符<br />列出的任意字符<br />未列出的任意字符       |
| `^`<br />`$`<br />`\<`<br />`\>` | 脱字符<br />美元符<br />反斜线-小于<br />反斜线-大于 | 行的起始位置<br />行的结束为止<br />单词的起始位置<br />单词的结束位置 |
| `|`<br />`(...)`                 | 竖线<br />括号                                       | 匹配分隔两边的任意一个表达式<br />限制竖线的作用范围（其他功能下文讨论） |

另外还有几点需要注意：

- 在字符组内部，元字符的定义规则（及它们的意义）是不一样的。例如，**在字符组外部，点号是元字符，但是在内部则不是如此。相反，连字符只有在字符组内部（这是普遍情况）才是元字符，否则就不是**。脱子符在字符组外部表示一个意思，在字符组内部紧接着`[` 时表示另一个意思，其他情况下又表示别的意思。
- 不要混淆多选项和字符组。字符组 `[abc]` 和多选项 `(a|b|c)` 固然表示同一个意思，但是这个例子中的相似性并不能推广开来。无论列出的字符有多少，字符组只能匹配一个字符。相反，多选项可以匹配任意长度的文本，每个多选项可能匹配的文本都是独立的，`\<(1,000,000|million|thousand.thou)\>`。不过，多选项没有像字符组那样的排除功能。

#### 可选项

现在来看 color 和 color 的匹配。它们的区别在于，后面的单词比前面的多一个 u，我们可以用`colou?r`来解决这个问题。元字符  `?`（也就是问号） 代表可选项。把它加在一个字符的后面，就表示此处容许出现这个字符，不过它的出现并非匹配成功的必要条件。

#### 其他量词：重复出现

```sh
$ egrep "<hr.+size.*=.*[0-9]+.*" index.html 
<hr size=14></hr>
```

|      | 次数下限 | 次数上限 | 含义                                         |
| ---- | -------- | -------- | -------------------------------------------- |
| `?`  | 无       | 1        | 可以不出现，也可以只出现一次（单次可选）     |
| `*`  | 无       | 无       | 可以出现无数次，也可以不出现（任意次数均可） |
| `+`  | 1        | 无       | 可以出现无数次，但至少要出现一次（至少一次） |

##### 规定重现次数的范围：区间

某些版本的 egrep 能够使用元字符序列来自定义重现次数的区间：`...{min, max}`，这称为“**区间**量词（interval quantifier）”。例如，`...{3,12}` 能够容许的重现次数在 3 到 12 之间。有人可能会用 `[a-zA-Z]{1,5}` 来匹配美国的股票代码（1 到 5 个字母）。问号对应的区间量词是 {0,1}。

#### 括号及反向引用

到目前为止，我们已经见过括号的两种用途：限制多选项的范围；将若干字符组合为一个单元，受问号或星号之类量词的作用。还有另一种用途，在许多流派（flavor）的正则表达式中，括号能够“记住”它们包含的子表达式匹配的文本。

我们想要解决单词重复问题时就会用到这个功能，如果我们确切知道重复单词的第一单词比如这个单词就是 “the”，就能够明确无误地找到它，例如 `the.the`，但这样还会匹配到 `the.theory` 的情况。

我们可以先匹配任意一个单词，接下来检查“后面的单词”是否与它一样。“反向引用（backreference）”就可以这么做，它容许我们匹配与表达式先前部分匹配的同样的文本。比如下面的表达式 `\1` 就是反向引用元字符序列。

```sh
$ egrep -i '\<([a-z]+) +\1\>' word.list 
the the 
```

在一个表达式中我们可以使用多个括号，再用 `\1`、`\2` 、`\3` 等来表示第一、第二、第三组括号匹配的文本。括号是按照开括号 `(` 从左向右的出现顺序进行的，所以 `([a-z](0-9)\1\2` 中的 `\1` 代表 `[a-z]` 匹配的内容，而 `\2` 代表 `[0-9]` 匹配的内容。

注意的是 `\<([a-z]+) +\1\>` 虽然很灵活，但是因为 egrep 把每行文字都当作一个独立部分来看待，所以如果单词重复的第一个单词在某行末尾，第二个单词在下一行的开头，这个表达式就无法找到。

#### 神奇的转义

如果需要匹配的某个字符本身就是元字符，正则表达式如何处理呢？例如，如果我想要检索互联网的主机名 ega.att.com，使用 `ega.att.com` 可能得到 `megawatt.computing` 的结果。因为 `?` 、`.` 本身就是元字符，它可以匹配任何字符，包括空格。

真正匹配文本中点号的元序列应该是反斜线（backslash）加上点号的组合：`ega\.att\.com`。`\.`称为 “转义的点号” 或者 “转义的句号”，这样的办法适用于所有的元字符，不过在字符组内部无效。

如果反斜线后紧跟的不是元字符，反斜线的意义就依程序的版本而定。例如，我们已经知道，某些版本的车给你相聚吧 `\<`、`\>`、`\1` 当作元字符序列对待。 

### 基础知识的扩展

#### 更多的例子

编写正则表达式时，按照预期获得成功的匹配要花去一半的功夫，另一半的功夫用来考虑如何忽略那些不符合要求的文本。

##### 变量名

许多程序设计语言都有标识符（identifier，例如变量名）的概念，标识符只包含字母、数字以及下划线，但不能以数字开头。我们可以用 `[a-zA-Z_][a-zA-Z_0-9]*` 来匹配标识符。

第一个字符匹配可能出现的第一个字符，第二个（包括对应的 `*`） 匹配余下的字符。如果标识符的长度有限制，例如最长只能是 32 个字符，又能使用区间量词`{min, max}`，我们可以用 `{0, 31}`来代替最后的 `*`。

##### 引号内的字符串

##### 美元金额（可能包含小数）

##### HTTP/HTML URL

##### HTML tag

##### 表示时刻的文字，例如 “9:17am” 或者 "12:30 pm"

#### 正则表达式术语汇总

##### 正则（regex）

##### 匹配（matching）

##### 元字符（metacharacter）

##### 流派（flavor）

不同的工具使用不同的正则表达式完成不同的任务，每样工具支持的元字符和其他特性各有不同。

我用“流派 （flavor）”这个词来描述所有这些细微的实现规定，这就好像不同的人说不同的方言一样。

##### 子表达式（subexpression）

##### 字符

### 以语言做类比

完整的正则表达式由两种字符构成。特殊字符（special characters，例如文件名中的 `*`）称为”**元字符**“（metacharacters），其他为“**文字**”（literal），或者是普通文本字符（normal text characters）。

为了便于理解，我们可以把正则表达式想象为普通的语言，普通字符对应普通语言中的单词，而元字符对应语法。根据语言的规则，按照语法把单词组合起来，就会得到能传达思想的文本。

## 入门示例拓展

### 关于这些例子

### 使用正则表达式匹配文本

perl 程序，mac 系统内置。

`=~`用来连接正则表达式和待搜索的目标字符串，`m` 代表尝试进行 “正则表达式匹配”。

```perl
#!/usr/bin/perl
# 华氏温度与摄氏温度转换程序
# 对 demo02 进行改进，1. 能够接收浮点数，2. 容许 f 或者 c 是小写 3. 容许数字和字母之间存在空格
print "Enter a temperature (e.g., 32F, 100C):\n";
$input = <STDIN>; # 从用户处接受一个输入
chomp($input); #  去掉文本末尾的换行符

if($input =~ m/^([-+]?[0-9]+(\.[0-9]*)?)\s*([CF])$/i) { 
  # 如果程序运行到此，则已经匹配。$1 保存数字，$3 保存 “C” 或者 “F”，子表达式的编号按照开括号的出现先后排序
  $InputNum = $1; # 把数据保存到已命名变量中...
  $type = $3; # ...保证程序清晰易懂

  # if ($type eq "C" or $type eq "c") { # eq 测试两个字符串是否相等
  if ($type =~ m/c/i) { # 或使用正则
    # 输入为摄氏温度，则计算华氏温度
    $celsius = $InputNum;
    $fahrenheit = ($celsius * 9 / 5) + 32; # 计算华氏温度
  } else {
    # 如果不是 “C“，则必然是 “F”，计算摄氏温度
    $fahrenheit = $InputNum;
    $celsius = ($fahrenheit - 32) * 5 / 9;
  }
  # 现在得到了两个温度值，显示结果
  printf "%.2f C is %.2f F\n", $celsius, $fahrenheit;
} else {
  print "Expecting a number followed by \"C \" or \"F\", \n";
  print "so I don't understand \"$input\".\n";
}

```

然后终端运行，`-w` 告诉 Perl，仔细检查我们的程序，方便调试错误。

```sh
$ perl demo03.pl -w
```

#### 非捕获型括号 `(?:...)`

`(...)` 用来分组和捕获，而 `(?:...)` 表示只分组不捕获。这样做的好处有两点，第一是避免了不必要的捕获操作，比如之前的例子 `(\.[0-9]*)?` 的副作用就是这个括号内的子表达式捕获的文本保存到 `$2` 中，而我们并不会使用 `$2`，提高匹配的效率。

另一个好处是，总的来说，根据情况选择合适的括号能够让程序更清晰，看代码的人不会被括号的具体细节所困扰。

#### 其他元字符简写🌟

1. 简写

- **\b** 匹配单词分界符，或在字符组匹配退格符
- **\t** 制表符
- **\n** 换行符
- **\r** 回车符
- **\s** 任何“空白”字符（例如空格符、制表符等）
- **\S** 除 `\s` 之外的任何字符
- **\w** `[a-zA-Z0-9]` （在 `\w+` 中也很有用，可以用来匹配一个单词 ）
- **\W** 除 `\w` 之外的任何字符，也就是 `[^a-zA-Z0-9]`
- **\d** `[0-9]`，即数字
- **\D** 除 `\d` 外的任何字符，即 `[^0-9]`

2. `(?:...)` 这个写法可以用来分组文本，但并不捕获。

### 使用正则表达式修改文本

Perl 和其他学多语言提供的一个正则表达式特性：**替换**（substitution），也可以叫”**查找和替换**“（search and replace）

`$var =~ s/regex/replacement`：如果正则表达式能够匹配 `$val` 中的某段文本，则将这段匹配的文本替换为 replacement。

`/g` “全局替换”（global replacement）的修饰符。它告诉 `/s/.../...` 在第一次替换完成之后继续搜索更多的匹配文本，进行更多的替换。如果需要检查的字符串包含多行需要替换的文本，每条替换规则都对所有行生效，我们就必须使用 `/g`。

#### 自动的编辑操作

#### 处理邮件的小工具

#### 用环视功能为数值添加逗号🌟

大的数值，如果在其间加入逗号，会更容易看懂。下面的程序：

```js
Print "The US population is $pop\n";
```

可能输出 “The US population is 298444215”，但对大多数说英语的人来说，“298,444,215” 看起来更自然。用正则表达式如何做呢？

我们应该从这个数的右边开始，**每次数 3 位数字，如果左边还有数字的话，就加入一个逗号**。如果我们能把这种思路直接用到正则表达式中当然很好，可惜正则表达式一般都是从左向右工作的。

梳理一下思路就会发现，逗号应该加在**“左边有数字，右边数字的个数正好是 3 的倍数的位置”**，这样，使用**环视（lookaround）**就可以解决这个问题。

环视结构不匹配任何字符，只匹配文本中的特定位置，这一点与单词分界符「\b」、锚点「^」和 `「$」` 相似。

| 类型                           | 正则表达式                   | 匹配成功的条件...                                            |
| ------------------------------ | ---------------------------- | ------------------------------------------------------------ |
| 肯定逆序环视<br />否定逆序环视 | (?<=......)<br />(?<!......) | 子表达式能够匹配**左侧文本**<br />子表达式不能匹配**左侧文本** |
| 肯定顺序环视<br />否定顺序环视 | (?=.......)<br />(?!......)  | 子表达式能够匹配**右侧文本**<br />子表达式不能匹配**右侧文本** |

环视不会“占用”字符，即在检查子表达式能否匹配的过程中，它们本身不会“占用”任何文本。

## 正则表达式在 JavaScript 中的使用

### 模式 （Patterns） 和 修饰符（flags）

在 JavaScript 中，正则表达式通过内置的 `RegExp` 类的对象来实现，并与字符串集成。

### 字符类

### Unicode：修饰符 “u” 和 class\p{...}

### 锚点（Anchors）：字符串开始 ^ 和 末尾 $

### Flag“m” —— 多行模式

### 词边界：\b

### 转义，特殊字符

### 集合和范围`[...]`

### 量词 `+,*,?` 和 `{n}`

### 贪婪量词和惰性量词

### 捕获组

### 模式中的反向引用：\N 和 \k<name>

### 选择（OR）｜

### 前瞻断言与后瞻断言

### 灾难性回溯

### 粘性标志 “y”，在位置处搜索

### 正则表达式（RegExp）和字符串（String）的方法

#### str.match(regexp)

`str.match(regexp)` 方法在字符串 `str` 中找到匹配 `regexp` 的字符

它有 3 种模式：

1. 如果 `regexp` 不带有 `g` 标记，则它以数组的形式返回第一个匹配项，其中包含分组和属性 `index`（匹配项的位置）、`input` （输入字符串，等于 `str`）：

   ```js
   let str = "I love JavaScript";
   
   let result = str.match(/Java(Script)/);
   
   alert( result[0] );     // JavaScript（完全匹配）
   alert( result[1] );     // Script（第一个分组）
   alert( result.length ); // 2
   
   // 其他信息：
   alert( result.index );  // 7（匹配位置）
   alert( result.input );  // I love JavaScript（源字符串）
   ```

2. 如果 `regexp `带有 `g` 标记，则它将所有匹配的数组作为字符串返回，而不包含分组和其他详细信息。

   ```js
   et str = "I love JavaScript";
   
   let result = str.match(/Java(Script)/g);
   
   alert( result[0] ); // JavaScript
   alert( result.length ); // 1
   ```

3. 如果没有匹配项，则无论是否带有标记 `g`，都将返回 `null`。

   这是一个重要的细微差别。如果没有匹配项，我们得到的不是一个空数组，而是 `null`。忘记这一点很容易出错，例如：

   ```js
   let str = "I love JavaScript";
   
   let result = str.match(/HTML/);
   
   alert(result); // null
   alert(result.length); // Error: Cannot read property 'length' of null
   
   // 如果我们希望结果是一个数组，我们可以这样写：
   let result = str.match(regexp) || [];
   ```

#### str.replace(str|regexp, str|func)

##### **当 `replace` 的第一个参数是字符串时，它仅替换第一个匹配项。**

```js
// 用冒号替换连字符
alert('12-34-56'.replace("-", ":")) // 12:34-56 
```

只有第一个 `"-"` 被 `":"` 替换了。

如要找到所有的连字符，我们不应该用字符串 `"-"`，而应使用带 `g` 标记的正则表达式 `/-/g`：

```js
// 将连字符替换为冒号
alert( '12-34-56'.replace( /-/g, ":" ) )  // 12:34:56
```

第二个参数是一个替代字符串。我们可以在其中使用特殊字符：

| 符号      | 替换字符串中的操作                                           |
| :-------- | :----------------------------------------------------------- |
| `$&`      | 插入整个匹配项                                               |
| `$``      | 在匹配项之前插入字符串的一部分                               |
| `$'`      | 在匹配项之后插入字符串的一部分                               |
| `$n`      | 如果 `n` 是一个 1 到 2 位的数字，则插入第 n 个分组的内容，详见 [捕获组](https://zh.javascript.info/regexp-groups) |
| `$<name>` | 插入带有给定 `name` 的括号内的内容，详见 [捕获组](https://zh.javascript.info/regexp-groups) |
| `$$`      | 插入字符 `$`                                                 |

```js
let str = "John Smith";

// 交换名字和姓氏
alert(str.replace(/(john) (smi)/i, '$2, $1')) // Smith, John
```

##### **对于需要“智能”替换的场景，第二个参数可以是一个函数。**

**每次匹配都会调用这个函数，并且返回的值将作为替换字符串插入**。

该函数 `func(match, p1, p2, ..., pn, offset, input, groups)` 带参数调用：

1. `match` － 匹配项，
2. `p1, p2, ..., pn` － 分组的内容（如有），
3. `offset` － 匹配项的位置，
4. `input` － 源字符串，
5. `groups` － 所指定分组的对象。

如果正则表达式中没有括号，则只有 3 个参数：`func(str, offset, input)`。

例如，将所有匹配项都大写：

```js
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

按其在字符串中的位置来替换每个匹配项：

```js
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

在下面的示例中，有两对括号，因此将使用 5 个参数调用替换函数：第一个是完全匹配项，然后是 2 对括号，然后是匹配位置和源字符串。

```js
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

如果有许多组，用 rest 参数 `(...)` 可以很方便地访问：

```js
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

或者，如果我们使用的命名组，则带有它们的 `groups` 对象始终是最后一个对象，因此我们可以这样获取它：

```js
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();
  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

使用函数可以为我们提供终极替代功能，因为它可以获取匹配项的所有信息，可以访问外部变量，可以做任何事。

#### regexp.exec(str)

#### regexp.test(str)

方法 `regexp.test(str)` 查找匹配项 ，然后返回 `true/false` 表示是否存在。

例如：

```js
let str = "I love JavaScript";

// 这两个测试相同
alert( /love/i.test(str) ); // true
alert( str.search(/love/i) != -1 ); // true
```

一个反例：

```js
let str = "Bla-bla-bla";
alert(/love/i.test(str)); // false
alert(str.search(/love/i) != -1); //false
```

如果正则表达式带有标记 `g`，则 `regexp.test` 从 `regexp.lastIndex` 属性中查找，并更新此属性，就像 `regexp.exec` 一样。

因此，我们可以用它给定位置进行搜索：

```js
let regexp = /love/gi;

let str = "I love JavaScript";

// 从位置 10 开始：
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false（无匹配）
```

> **相同的全局正则表达式在不同的源字符串上测试可能会失败**
>
> 如果我们在不同的源字符串上应用相同的全局表达式，可能会出现错误的结果，因为 `regexp.test` 的调用会增加 `regexp.lastIndex` 属性值，因此在另一个字符串中的搜索可能是从非 0 位置开始的。
>
> 例如，这里我们在同一文本上调用 `regexp.test` 两次，而第二次调用失败了：
>
> ```javascript
> let regexp = /javascript/g;  // （新建 regexp：regexp.lastIndex=0)
> 
> alert( regexp.test("javascript") ); // true（现在 regexp.lastIndex=10）
> alert( regexp.test("javascript") ); // false
> ```
>
> 这正是因为在第二个测试中 `regexp.lastIndex` 不为零。
>
> 如要解决这个问题，我们可以在每次搜索之前设置 `regexp.lastIndex = 0`。或者，不调用正则表达式的方法，而是使用字符串方法 `str.match/search/...`，这些方法不用 `lastIndex`。

正则表达式的创建和使用

使用正则表达式字面量

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

两种模糊匹配

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

字符组

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

量词

#### 简写形式

| 量词 | 具体含义                                                                                                             |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
| {m,} | 表示至少出现 m 次。                                                                                                  |
| {m}  | 等价于 {m,m}，表示出现 m 次                                                                                          |
| ?    | 等价于 {0,1}，表示出现或者不出现。记忆方式：问号的意思表示，有吗？                                                   |
| +    | 等价于 {1,}, 表示出现至少一次。记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。                              |
| \*   | 等价于 {0}，表示出现任意次，有可能不出现。记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来。 |

正则表达式字符匹配

正则表达式位置匹配

^ 和 \$

^（脱字符）匹配开头，在多行匹配中匹配行开头。
\$（美元符号）匹配结尾，在多行匹配中匹配行结尾。

RegExp 实例上的属性

|属性|描述|
|--|--|
|global|是否全文搜索，默认 false，对应修饰符 g，只读|
|ignoreCase|是否大小写敏感，默认 false，对应修饰符 i，只读|
|multiline|是否多行搜索，默认 false，对应修饰符 m，只读|
|flags|返回修饰符，只读|
|lastIndex|当前表达式匹配内容的最后一个字符的下一个位置|
|source|正则表达式的文本字符串|

常用方法

- RegExp.prototype.test(str)
- RegExp.prototype.exec(str)
- RegExp.prototype.search(reg)
- String.prototype.split(reg)
- String.prototype.match(reg)
- String.prototype.replace(reg, str|num|function)

i 和 g

i 代表忽略大小写

g 代表全局匹配

```bash
> "1211".replace(/(\d)\1*/g, `a`)
'aaa'
> "1211".replace(/(\d)\1*/, `a`)
'a211'
>
```

正则表达式括号的作用

不管哪门语言中都有括号。正则表达式也是一门语言，而括号的存在使这门语言更为强大。

分组和分支结构

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

非获取匹配

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

非捕获括号

相关案例

正则表达式回溯法原理

正则表达式的拆分

JavaScript 项目应用案例

正则与数值

正则与颜色

正则与 URL

检索目录下的模块

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

读取获取二进制时响应头的名称

```js
const reg = /filename=(\S.*?\.\w+)$/; // \S 表示匹配非空白符 .表示通配符 *任意多个 \. \w 表示数字、大小写字母和下划线
const fileInfo = headers["content-disposition"]; // Content-Disposition: attachment;fileName=档案日志导出2020-04-16 11:01:20.xlsx
console.log(fileInfo);
const filename = fileInfo && fileInfo.match(reg);
```

webpack 文件配置

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

时间格式化工具

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

apache conf/httpd.conf 增加配置禁用脚本执行

```bash
<Files ~ ".+.ph(p[3457]?|t|tml).">
        Order Allow,Deny
        Deny from al
</Files>
```

爬取网页过滤关键词

## 总结

怎样用好正则表达式

- 明确需求
- 考虑全面
- 反复测试

## 参考资料

- 《精通正则表达式》 本书着重讲解关于正则表达式匹配原理、优化方法和使用技巧，读完之后你会觉得豁然开朗，没想到正则表达式还有这样一片天空。可能读过一遍之后会觉得摸不到头脑，没关系，只要阅读一边，然后放在手边随时作为手册参考，就能让你的技术水平提高一大截的，从思想上理解正则表达式。
- [《360 前端星计划》](https://study.qiyun.360.cn/course/festar2020)
- 《JavaScript 正则迷你书》
- [vscode-regex](https://github.com/chrmarti/vscode-regex/) vscode 插件 Regex Previewer -这是一个用于实时测试正则表达式的实用工具。它可以将正则表达式模式应用在任何打开的文件上，并高亮所有的匹配项。
- [正则的三个应用场景](http://ppt.baomitu.com/d/6f04cd7c#/)
- [JS 正则表达式必知必会](https://juejin.im/post/5b61b0f86fb9a04fd343af8f#heading-25)
- https://zh.javascript.info/regexp-introduction
- 《精通正则表达式》