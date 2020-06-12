# Lua

热更新

可以

## 基础

<!-- 刚好够用的 lua  -->

### Lua 是什么

Lua 不需要编译，可以在 Java、C# 等编译好后的代码中扩展功能，直接编写。

### 游戏选择 Lua 的主要原因

所以需要将部分代码作为资源进行管理，随时可以修改更新。更新资源不需要发布新版本，也不需要苹果爸爸审核，用 lua 的优势就体现出来了。

<u>无论是需要及时调整数值或是修 bug，这样的发布流程都是灾难。某些运营的新版本比如说春节大版本，所有的开发人员都在家过年了，没人来发版本。</u>

所以需要<u>将部分代码作为资源进行管理，随时可以修改更新。更新资源不需要发布新版本，也不需要苹果爸爸审核，用 lua 的优势几句体现出来了。</u>

在手游时代，脚本就是刚需。因为客户端发一个安装包很麻烦，在 ios 上每次更新都需要提交给苹果爸爸审核，审核通过以后才可以发出来给用户下载。

不需要重新编译工程，直接写 lua 源代码就可以执行，实现热更新。

lua 本身表现好也是它被选择的必然原因，它轻量级、高效并且简单。只增加几百 k；lua 的执行速度大概是 C++ 的几十分之一，比绝大部分脚本性能都要高得多；lua 很简单，它是真的只需要半天都能学会的语言。

lua 驱动的 GUI。

### Lua 和 C# 的区别

需要重新下载安装包，才能更新。

C# 不能在移动平台上编译，而 lua 可以直接在操作系统运行（类似 javaScript 可以直接在浏览器运行一样）。

可以直接下载 lua 到移动平台上，只要操作系统本身支持编译的环境，具有 ISO（ANSI）C 编译器，就可以编译执行 Lua，开箱即用。不用像其他语言 C# 等要编译，lua 是解释型语言。

### lua 特性

- 轻量级
- 可扩展
- 其他特性
  - 支持面向过程和`函数式编程`
- 兼容大部分可以编译 C 语言的系统

### Lua 环境安装

#### Mac OS X 系统上安装

这里下载的是编译后的二进制文件，如果直接下载源码的话，还要用 C 编译器编译成 lua 程序。

```bash
curl -R -O http://www.lua.org/ftp/lua-5.3.0.tar.gz
tar zxf lua-5.3.0.tar.gz
cd lua-5.3.0
make macosx test
sudo make install # 环境变量
```
进入 lua 环境，输入 `print("Hello World!")` 命令。
```bash
$ lua
Lua 5.3.5  Copyright (C) 1994-2018 Lua.org, PUC-Rio
> print("Hello World!")
Hello World!
> 
```

直接通过 lua 解释器执行 `HelloWorld.lua` 文件：

```bash
$ lua HelloWorld.lua 
Hello World!
```

从上面看到的结果，跟安装完 node 后的环境很像，node 是 v8 引擎下执行 js，node 是 C++编写。而 lua 则是 C 编写，安装编译后的 lua 环境，即可解释执行 lua （编译执行一起）的文件程序。

可以直接输入 `lua` 进入 lua 运行环境：


### Lua 基本语法

#### 注释

```lua
print("Hello World")
-- 单行注释
--[[ 多行注释
--]]
```

#### 标志符 

#### 关键词

```bash
and	break	do	else
elseif	end	false	for
function	if	in	local
nil	not	or	repeat
return	then	true	until
while	goto
```

#### 全局变量

在默认情况下，变量总是认为是全局的。

全局变量不需要声明，给一个变量赋值即创建了这个全局变量，访问一个没有初始化的变量也不会出错，只不过得到的结果是：nil。

```bash
$ lua
> b = 10
> 
> print(b)
10
> b
10
> 
> b = nil
> print(b)
nil
> 
```

### 值

#### 基本数据

#### 数据结构

#### proc 

### 控制流

### 对象和方法

### 类和模块

### 其他特性

## 参考资料

- [Lua 为什么在游戏编程领域被广泛运用？](https://www.zhihu.com/question/21717567)
- [菜鸟Lua 教程](https://www.runoob.com/lua/lua-tutorial.html)
- [siki 学院](http://www.sikiedu.com/course/85/task/16032/show#)
- [lua 官网](https://www.lua.org/download.html)
- [为什么 lua 在游戏开发中应用普遍？](https://www.zhihu.com/question/395593519/answer/1236733229)
- [知乎 lua 话题 ](https://www.zhihu.com/topic/19612186/top-answers)
- 《lua 游戏开发》