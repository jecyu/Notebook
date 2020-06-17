# Lua

Lua 是一种轻量小巧的脚本语言，用标准 C 语言编写并以源代码形式开放，其设计的目的是为了嵌入应用程序中，从而为应用程序提供灵活的`扩展`和`定制`功能。

应用：

- 热更新

Lua 不需要编译，可以在 Java、C# 等编译好后的代码中扩展功能，直接编写。

## 基础

<!-- 刚好够用的 lua  -->

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
  - 自动内存管理：只提供了一种通用类型的表（table），用它可以实现数组、哈希表、集合、对象。
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

### lua 编程

#### 交互式编程

Lua 提供了交互式编程模式，我们可以在命令行中输入程序并立即查看效果。

Lua 交互式编程可以通过命令 `lua -i` 或 `lua` 来启用。

```lua
$ lua
Lua 5.3.5  Copyright (C) 1994-2018 Lua.org, PUC-Rio
>
```

在命令行中输入：

```lua
> print("Hello World!")
Hello World!
>
```

#### 脚本式编程

我们可以将 Lua 程序代码保存到一个以 lua 结尾的文件，并执行，该模式称为脚本式编程。

```lua
$ lua hello.lua
```

### Lua 基本语法

end 表示一个代码块的结束

```lua
co2 = coroutine.create(
    function()
        for i=1,10 do
            print(i)
            if i == 3 then
                print(coroutine.status(co2))  --running
                print(coroutine.running()) --thread:XXXXXX
            end
            coroutine.yield()
        end
    end
)
```

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

Lua 是动态类型语言，变量不需要类型定义，只需要为变量赋值。值可以存储在变量中，作为参数传递或结果返回。Lua 中有 8 个基本类型分别为：nil、boolean、number、string、userdata、functon、thread 和 table。

```lua
> print(type("Hello world"))
string
> print(type(10.4 * 3))
number
> print(type(print))
function
> print(type(type))
function
> print(type(true))
boolean
> print(type(nil))
nil
> print(type(type(X)))
string
```

#### 基本数据

##### nil

nil 类型表示一种没有任何有效值，它只有一个 nil。

```lua
> print(type(a))
nil
```

对于全局变量和 table，nil 还有一个 “删除” 作用，给全局变量或 table 表里的变量赋予一个 nil 值，等同于把它们删掉。

```lua
> tab1 = { key1 = "val1", key2 = "val2", "val3"}
> for k, v in pairs(tab1) do
>> print(k .."-"..v)
>>
>> end
1-val3
key1-val1
key2-val2
> tab1.key1 = nil
> for k, v in pairs(tab1) do                                                    print(k .."-"..v)                                                                                                    end
1-val3
key2-val2
>
```

nit 作比较时应该加上双引号 `"`：

```lua
> type(X) == nil
false
> type(X) == 'nil'
true
```

##### boolean

boolean 类型只有两个可选值：true（真）和 false（假），Lua 把 false 和 nil 看作是 false，其他的都为 true，数字 0 也是 true：

```lua
> print(type(true))
boolean
> print(type(false))
boolean
> print(type(nil))
nil
```

```lua
> if false or nil then
>> print("至少有一个是 true")
>>
>> else
>> print("false 和 nil 都为 false")
>> end
false 和 nil 都为 false
> if 0 then
>> print("数字 0 是 true")
>> else
>> print("数字 0 为 false")
>> end
数字 0 是 true
```

##### number（数字）

Lua 默认只有一种 number 类型：double（双精度）类型（默认类型可以修改 luaconf.h 里定义），以下几种写法都被看作是 number 类型：

```lua
> print(type(2))
number
> print(type(2.2))
number
> print(type(0.2))
number
>
> print(type(2e+1))
number
> print(type(0.2e-1))
number
> print(type(7.8263692594256e-06))
number
```

##### string（字符串）

字符串由一对双引号或单引号来表示。

```lua
> string1 = "this is string1"
> string1
this is string1
```

也可以用 2 个方括号 `[[]]` 来表示“一块”字符串。

```lua
> html = [[
>> <html>
>> <head></head>
>> <body>
>> <a href="http://www.jecyu.com">Jecyu</a>
>> </body>
>> </html>
>> ]]
> html
<html>
<head></head>
<body>
<a href="http://www.jecyu.com">Jecyu</a>
</body>
</html>
```

在对一个数字字符串上进行算术操作时，Lua 会尝试将这个数字字符串转成一个数字：

```lua
> "2" + 6
8.0
> "error" + 1
stdin:1: attempt to perform arithmetic on a string value
stack traceback:
	stdin:1: in main chunk
	[C]: in ?
```

以上 “error” + 1 执行报错了，字符串连接使用的是 `..`，如

```lua
> "error"..1
error1
```

使用 `#` 来计算字符串的长度，放在字符串前面：

```lua
> #html
85
> #string1
15
```

#### 数据结构

- userdata
- table

##### table

通过 table，可以实现`数组`、`哈希表`、`集合`和`对象`。

在 Lua 里，table 的创建是通过“`构造表达式`”来完成，最简单构造表达式是 `{}`，用来创建一个空表。也可以在表里添加一些数据，直接初始化表：

Lua 中的表（table）其实是一个“关联数组”（associative arrays），数组的索引可以是数字、字符串或表类型。

```lua
> a = {}
> a["key"] = "value"
> a
table: 0x7faaf1e02760
> key = 10
> a[key] = 22
> a[key] = a[key] + 11
> for k, v in pairs(a) do
>> print(k..":"..v)
>> end
10:33
key:value
```

不同于其他语言的数组把 0 作为数组的初始索引，在 Lua 里表的默认索引一般以 1 开始：

```lua
> tbl2 = {"apple", "pear", "orange", "grape"}
> tbl2
table: 0x7faaf1c0bd40
> for key, val in pairs(tbl2) do
>> print("Key", key)
>> end
Key	1
Key	2
Key	3
Key	4
>
```

table 不会固定长度大小，有新数据添加时 table 长度会自动增长，没初始的 table 都是 nil。

```lua
> a = {}
> for i = 1, 10 do
>> a[i] = i
>> end
> a[10]
10
> a3["key"] = "val"
> a["key"] = "val"
> a["key"]
val
> a[10]
10
```

##### userdata（自定义类型）

userdata 是一种用户自定义的数据，用于表示一种由应用程序或 C/C++ 语言库所创建的类型，可以将任意 C/C++ 的任意数据类型的数据（通常是 struct 和指针）存储到 Lua 变量中调用。

表示任意存储在变量中的 C 数据结构。

#### funciton（函数）

在 Lua 中，函数是被看作是“第一类值（First-Class Value）”，函数可以存在变量里：

```lua
> function factorial(n)
>> if n == 0 then
>> return 1
>> else
>> return n * factorial(n - 1)
>> end
>> end
> factorial(5)
120
> factorial2 = factorial
> factorial2(5)
120
```

funciton 可以通过匿名（anonymous function）的方式通过参数传递：

```lua
> function testFn(tab, fun)
>> for k, v in pairs(tab) do
>> print(fun(k, v))
>>
>> end
>> end
> tab = { key1 = "val1", key2="val2"}
t> testFn(tab, function(key, val) return key.."="..val end)
key2=val2
key1=val1
```

#### thread（线程）

在 Lua 里，最主要的线程是协同程序（coroutine）。它跟线程（thread）差不多，拥有自己`独立的栈、局部变量和指令指针，可以跟其他协同程序共享全局变量和其他大部分东西`。

线程与协程的区别：线程可以同时多个运行，而协同程序需要彼此协作的运行，任意时刻只能运行一个，并且处于运行状态的协程只有被挂起（suspend）时才会暂停。

协同程序有点类似同步的多线程，在等待同一个线程锁的几个线程有点类似协同。

##### 基本语法

| 方法                | 描述                                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| coroutine.create()  | 创建 coroutine，返回 coroutine，参数是一个函数，当和 resume 配合使用的时候就唤醒函数调用                    |
| coroutine.resume()  | 重启 coroutine，和 create 配合使用                                                                          |
| coroutine.yield()   | 挂起 coroutine，将 coroutine 设置为挂起状态，这个和 resume 配合使用能有很多有用的效果                       |
| coroutine.status()  | 查看 coroutine 的状态：<br>注：coroutine 的状态有三种：dead、supspended，runinng                            |
| coroutine.wrap()    | 创建 coroutine，返回一个函数，一旦你调用这个函数，就进去 coroutine，和 create 功能重复                      |
| coroutine.running() | 返回正在跑的 coroutine，一个 coroutine 就是一个线程，当使用 running 的时候，就是返回一个 coroutine 的线程号 |

```lua
> co = coroutine.create(function(i) print(i) end)
> coroutine.resume(co, 1)
1
true
> print(coroutine.status(co))
dead
```

```lua
> co = coroutine.wrap(
>>     function(i)
>>         print(i);
>>     end
>> )
>
> co(1)
1
```

```lua
> co2 = coroutine.create(
>>     function()
>>         for i=1,10 do
>>             print(i)
>>             if i == 3 then
>>                 print(coroutine.status(co2))  --running
>>                 print(coroutine.running()) --thread:XXXXXX
>>             end
>>             coroutine.yield()
>>         end
>>     end
>> )
>
> coroutine.resume(co2)
1
true
> coroutine.resume(co2)
2
true
> coroutine.resume(co2)
3
running
thread: 0x7fbf7be04ff8	false
true
> print(coroutine.status(co2))
suspended
> print(coroutine.running())
thread: 0x7fbf7c800008	true
>
```

`coroutine.running()` 可以看出，coroutine 在底层实现就是一个线程。当 `create` 一个 coroutine 的时候就是在新线程中`注册`了`事件`。当使用 `resume` 触发事件的时候，create 的 coroutine 函数就被执行了，当遇到 `yield` 的时候就代表挂起当前线程，等候再次 resume 触发事件。

resume 和 yield 的配合强大之处在于，resume 处于主程中，它将外部状态（数据）传入到协同程序内部；而 yield 则将内部的状态（数据）返回到主程序中。

#### 生产者和消费者问题

```lua
ocal newProductor

function productor()
     local i = 0
     while true do
          i = i + 1
          send(i)     -- 将生产的物品发送给消费者
     end
end

function consumer()
     while true do
          local i = receive()     -- 从生产者那里得到物品
          print(i)
     end
end

function receive()
     local status, value = coroutine.resume(newProductor)
     return value
end

function send(x)
     coroutine.yield(x)     -- x表示需要发送的值，值返回以后，就挂起该协同程序
end

-- 启动程序
newProductor = coroutine.create(productor)
consumer()
```

### 控制流

#### Lua 条件

控制结构的条件表达式结果可以是任何值，Lua 认为 false 和 nil 为假，true 和 非 nil 为真。要注意的是 Lua 中 0 为 true。

```lua
> if (0)
>> then
>> print("0 为 true")
>> end
0 为 true
```

#### Lua 循环

- while
- for
- repeat...until
- 循环嵌套（while do...end; for...do...end; repeat...until）

### 对象和方法

Lua 中的表不仅在某种意义上是一种对象。像对象一样，表也有状态（成员变量）；也有与对象的值独立的本性，特别是拥有两个不同值的对象（table）代表不同的对象；一个对象在不同的时候也可以有不同的值，但它始终是一个对象；与对象类似，表的生命周期与其由什么创建、在哪创建没有关系。对象有他们的成员函数。

```lua
> Account = {balance = 0}                                                 > function Account.withdraw(v)                                                  Account.balance = Account.balance - v                                           end
> Account.withdraw(100.00)
> Account.balance
-100.0
```

### 类

我们知道，对象由属性和方法组成。LUA 中最基本的结构是 `table`，所以需要用 table 来描述对象的属性。

lua 中的 `function` 可以用来表示方法。**那么 LUA 中的类可以通过 table + function 模拟出来。**

```lua
> -- 1. 元类
> Rectangle = {area = 0, length = 0, breadth = 0}
>
> -- 2. 基本类的方法 new
> function Rectangle:new (o,length,breadth)
>>   o = o or {}
>>   setmetatable(o, self) -- 关键函数
>>   self.__index = self
>>   self.length = length or 0
>>   self.breadth = breadth or 0
>>   self.area = length*breadth;
>>   return o
>> end
>
> -- 3. 基本类的方法 printArea
> function Rectangle:printArea ()
>>   print("矩形面积为 ",self.area)
>> end
> Rectangle
table: 0x7fe732c0c460
```

```lua
> -- 创建对象
> r = Rectangle:new(nil, 10, 20)
> -- 访问属性
> r.length
10
> -- 访问成员函数
> r:printArea()
矩形面积为 	200
>
```

#### 继承

要实现继承，则需要在声明新变量时直接居于父类实例化一个值，然后再声明 new 函数：

```lua
-- 元类
> Shape = { area = 0}
-- 基础类方法 new
> function Shape:new(o, side)
>> o = o or {}
>> setmetatable(o, self) -- 关键函数
>> self.__index = self
>> side = side or 0
>> self.area = side * side
>> return o
-- 基础类方法 printArea
> function Shape:printArea()
>> print("面积为", self.area)
>> end
-- 创建对象
> myshape = Shape:new(nil, 10)
> myshape:printArea()
面积为	100


> Rectangle = Shape:new()
> -- 派生类方法 new
> function Rectangle:new (o,length,breadth)
>>   o = o or Shape:new(o)
>>   setmetatable(o, self)
>>   self.__index = self
>>   self.area = length * breadth
>>   return o
>> end
>
> -- 派生类方法 printArea，函数重写
> function Rectangle:printArea ()
>>   print("矩形面积为 ",self.area)
>> end
>
> -- 创建对象
> myrectangle = Rectangle:new(nil,10,20)
> myrectangle:printArea()
矩形面积为 	200
```

#### 模块和包

模块类似一个封装库，从 Lua 5.1 开始，Lua 假如了标准的模块管理机制，可以把一些公用的代码放在一个文件里，以 API 接口的形式在其他地方调用，有利于代码的重用和降低代码耦合度。

Lua 的模块是由变量、函数等已知元素组成的 table，因此创建一个模块很简单，就是创建一个 table，然后把需要导出的常量、函数放入其中，最后返回这个 table 就行。

```lua
-- 定义一个名为 module 的模块
module = {};

-- 定义一个常量
module.constant = "这是一个常量"

-- 定义一个函数
function module.func1()
  io.write("这是一个公有函数！\n")
end

local function func2()
  print("这是一个私有函数！")
end

function module.func3()
  func2()
end

return module;
```

使用：

```lua
local m = require("./demo01.lua")
print(m.constant)
m.func3()
```

##### 加载机制

对于自定义的模块，模块文件不是放到哪个文件目录都行，函数 require 有它自己的文件路径加载策略，它会尝试从 Lua 文件或 C 程序库中加载模块。

require 用于搜索 Lua 文件的路径是存放在全局变量 package.path 中，当 Lua 启动后，会以环境变量 LUA_PATH 的值来初始化这个环境变量。如果没有找到环境变量，则使用一个编译时定义的默认路径来初始化。

当然，如果没有 LUA_PATH 这个变量，也可以自定义设置，在当前用户根目录下打开 `.profile` 文件（没有则创建，打开 .bashrc 文件也可以），例如把 “~/lua/” 路径加入 LUA_PATH 环境变量里：

```bash
# LUA_PATH
export LUA_PATH = "~/lua/?.lua"
```

##### C 包（模块）

Lua 和 C 是很容易结合的，使用 C 为 lua 写包。
与 Lua 中写包不同，C 包在使用前必须首先加载并连接，在大多数系统中最容易的实现方式是通过动态链接库机制。

Lua 在一个叫 loadlib 的函数内提供了所有的动态连接的功能。这个函数有两个参数：库的绝对路径和初始化函数。

```lua
local path = "/usr/local/lua/lib/libluasocket.so"
local f = loadlib(path, "luaopen_socket")
```

loadlib 函数加载指定的库并且连接到 Lua，然后它并不打开库（也就是说没有调用初始化函数），反之他返回初始化函数作为 Lua 的一个函数，这样我们就可以直接在 Lua 中调用它。

```lua
local path = "/usr/local/lua/lib/libluasocket.so"
-- 或者 path = "C:\\windows\\luasocket.dll"，这是 Window 平台下
local f = assert(loadlib(path, "luaopen_socket"))
f()  -- 真正打开库
```

### 其他特性

#### Lua 变量

### Lua 断点调试

#### vscode

在 vscode 中搜索 -> lua debug，按照插件。

然后在项目根目录下新建 .vscode 文件夹，新建 launch.json 文件，写入以下配置：

```json
{
  "name": "launch lua process",
  "type": "lua",
  "request": "launch",
  "stopOnEntry": true,
  "program": "${workspaceFolder}/examples/lua/demo01.lua",
  "path": "${workspaceFolder}/?.lua",
  "cpath": "${workspaceFolder}/?.dll",
  "arg": []
}
```

##### Lua Debug

模块功能
- `vscode-debugger-client.exe` 代理客户端。在 `launch` 模式中，vscode-debug-client.exe 会用 vscode-debug.dll 创建一个调试器进行调试。在 attach 模式中，vscode-debug-client.exe 会连接一个远程的调试器（也是由 vscode-debug.dll 创建的），vscode-debug-client.exe 只负责在 vscode-debug.dll 和 vscode 之间转发信息。
- `vscode-debug.dll` 调试器的核心模块。你可以在你的程序中加载 vscode-debug.dll 并创建调试器，这样 vscode 就可以通过 attach 模式进行调试。
- `luacore.dll` lua 核心模块。如果你的程序定制了 lua，你可以替换掉它。

1. launch 模式，等同于使用 lua.exe 执行的入口文件
   1. program，lua.exe 执行的入口文件
   2. cwd，lua.exe 的当前目录
   3. stopOnEntry，开始调试时是否先暂停
   4. lua带来了，指定 lua dll 的路径，如有不填会加载 luacore.dll
   5. path，用于初始化 package.path
   6. cpath，用于初始化 package。cpath
   7. arg，lua.exe 的命令行参数，用于初始化 arg
   8. console，lua 的标准输出的编码，可选择 utf8、ansi、none。为 none 时不会重定向标准输出到 vscode
   9. soureMaps 源码定向

## 参考资料

- 调试
  - [lua 5.3开发调试环境搭建](https://blog.csdn.net/x356982611/article/details/53029389)
  - [LuaIde](https://www.showdoc.cc/luaide?page_id=687553326343048)
- [Lua 为什么在游戏编程领域被广泛运用？](https://www.zhihu.com/question/21717567)
- [菜鸟 Lua 教程](https://www.runoob.com/lua/lua-tutorial.html)
- [siki 学院](http://www.sikiedu.com/course/85/task/16032/show#)
- [lua 官网](https://www.lua.org/download.html)
- [为什么 lua 在游戏开发中应用普遍？](https://www.zhihu.com/question/395593519/answer/1236733229)
- [知乎 lua 话题 ](https://www.zhihu.com/topic/19612186/top-answers)
- 《lua 游戏开发》
