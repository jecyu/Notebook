# 函数式编程

## 命令式编程（Imperative） vs 声明式编程（Declarative）

简单的定义
命令式编程（Imperative）：详细的命令机器怎么（How）去处理一件事情以达到你想要的结果（What）；
声明式编程（ Declarative）：只告诉你想要的结果（What），机器自己摸索过程（How）
以生活中打车到王府井大街作为例子

命令式编程（imperative）：详细描述路径

- 下个路口左转
- 下个有红灯的路口右转
- 前进100米
- 在下个路口掉头
- 前进1500米
- 到达王府井大街出租车停车区
  
声明式编程（Declarative）：只告诉目的地
- 带我到王府井大街。

两者之间各有自己的优缺点，以打车为例子命令式编程（imperative）会给出详细的路线，这样做的问题就是如果出租车司机自己知道一条更加优化的路线或者导航软件知道前方的交通状况提供了其他路线，但是在命令式编程（imperative）的情况下就司机只能无条件执行用户命令而无法做出改变。

当你面临在两者之间做出选择使用谁时，最关键的是你需要想明白，是否需要给程序详细的命令。
例子

例子一：SQL数据库

其实你很早就接触过声明式编程语言， SQL语言就是很典型的例子：

```cs
SELECT * from user
WHERE user_name = Ben
```
上面是一个很普通的SQL查询语句，我只只声明我想要找一个叫Ben的用户（What) , 就是不说SQL该怎么（How）去寻找怎么做。接下来我们看看如果用命令式语言写会是什么样的

```cs
//user=[{user_name:'ou',user_id=1},.....]
var user
for(var i=0;i<user.length;i++)
{
    if(user.user_name=="Ben")
    {
     print("find");
     break;
    }
}
```

通过上面的对比你可以看出声明式语言的优势-短小精悍，你并不会知道程序的控制流（control flow）我们不需要告诉程序如何去寻找（`How`），而是只告诉程序我们想要的结果（`What`），让程序自己来解决过程（`How`）。当然 SQL 具体的细节还是用命令式的编程风格来实现的。

例子二：c#

命令式编程（Imperative)会一步一步的告诉程序该怎么运行

```cs
List<int> array = new List<int> { 1, 2, 3, 4, 5，6，7，8 };
List<int> results = new List<int>();
foreach(var num in array)
{
    if (num % 2 != 0)
          results.Add(num);
}
```

如果使用声明式编程（ Declarative）则会是这样

```cs
List<int> array = new List<int> { 1, 2, 3, 4, 5，6，7，8 };
var results = array.Where( num => num % 2 != 0);

```

例子三：JavaScript

命令式编程（Imperative)会一步一步的告诉程序该怎么运行

```js
var array = [1,2,3]
var output = []
for(var i = 0; i < array.length; i++) 
{
  var tmp = array[i] * 2
  output.push (tmp)
}
console.log (output) //=> [2,4,6]
如果使用声明式编程（ Declarative）则会是这样

var array = [1,2,3,]
var output = array.map (function (n) 
{
  return n * 2
})
console.log (output) //=> [2,4,6]
```

在这里我们使用了 map 函数，我们不需要详细的命令程序做什么，只需要告诉程序我们需要一个2倍输出。

通常情况下我们常用的大部分编程语言：c，java，c++等都是命令式编程语言。而像正则表达式（regular expressions）或者逻辑语言（Prolog）则为声明式语言。

### 总结

命令式编程更加的精细化，更严谨，程序也会一是不够的执行你的命令。然后声明式编程能在特定的更高层面代码领域是给我们带来效率的提升，程序员只需要对想要的结果（What）进行深思熟虑，程序会自动的解决过程（How），并且有效地分离 Waht 与 How 的逻辑代码。

## 参考资料

- 关于函数式编程的性能？
- [命令式编程（Imperative） vs声明式编程（ Declarative）](https://zhuanlan.zhihu.com/p/34445114)