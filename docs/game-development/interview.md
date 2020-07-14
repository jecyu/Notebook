# 面试

Unity 初级客户端面试题

## C

<!-- 掌握：实现的算法、数据结构、工具类 -->

### 值类型与引用类型

#### 值类型

##### 整型类型

- 有符号
  - sbyte
  - short
  - int
  - long
- 无符号
  - byte
  - ushort
  - uint
  - ulong

```cs
// 整型数值类型
private sbyte _Jsbyte = -128; // -128 -> 127 => 8 位带符号整数
private byte _Jbyte = 255; // 0 -> 255 无符号的 => 8 位整数
private short _Jshort = -32768; // -32768 -> 32767 => 有符号的 16 位整数
private ushort _Jushort = 65535; // 0 -> 65535 => 无符号的 16 位整数
private int _Jint = -2147483648; // -2147483648 -> 2147483647 : 带符号的 32 位整数
private uint _Juint = 4294967295; // 0 -> 4,294,967,295 => 无符号的 32 位整数
private long _Jlong = -9223372036854775808; /* -9223372036854775808 - 9,223,372,036,854,775,807 => 64 位带符号整数 */
private ulong _Julong = 18446744073709551615; /* 0 到 18,446,744,073,709,551,615 => 无符号 64 位整数*/
```

整数文本可以是：

- 十进制
- 十六进制：使用 `0x` 或 `0X` 前缀
- 二进制：使用 `0b` 或 `0B` 前缀（在 C# 7.0 和更高版本可用）

##### 浮点型

- IEEE 二进制浮点数
  - float
  - double
- 高精度十进制浮点数
  - decimal

```cs
// 浮点型数值类型
private float _Jfloat = 0.2f; // 大致范围：+1.5 x 10⁻⁴⁵ 至 ± 3.4 x 10⁻³⁸，精度大约 6-9 位数字，4个字节
private double _Jdobule = 0.55; // ±5.0 × 10⁻³²⁴ 到 ±1.7 × 10³⁰⁸，精度大约 15-17 位，8个 字节
private decimal _Jdecimal = 2.1m; // ±1.0 x 10⁻²⁸ 至 ±7.9228 x 10²⁸，精度 28-29 位，16 个字节
```

与 decimal 和 float 相比，double 类型具有更高的精度和更小的范围，因此它适合于财务和货币计算。

##### 其他

- Unicode 字符：char
- 布尔：bool
- 结构类型：
  - 格式为 `struct S {...}`
- 枚举类型：enum
- 可以为 null 的值类型
- 元组值类型
  - 格式为 (T1, T2, ...) 的用户定义类型

###### 结构类型

#### 引用类型

- 类类型
  - 其他所有类型的基类：object
  - class：class C{...} 的用户定义类型
  - Unicode 字符串： string
- 接口类型
  - 格式为 interface I {...}
- 数组类型
  - 一维和多维，格式为 int[] 和 int[,]
- 委托类型
  - delegate int D(...)

用户可以定义以下物种类型：类类型、结构类型、接口类型、枚举类型和委托类型。

### 类型转换

- 隐式转换
- 显式转换（强制转换）

- 可以将任何`整型数值`类型转换为其他`整数数值类型`。 如果目标类型可以存储源类型的所有值，则转换是隐式的。 否则，需要使用强制转换表达式来执行显式转换。

#### 装箱与拆箱

- 装箱：把值类型转换成引用类型
- 拆箱：把引用类型转换成值类型

装箱和拆箱主要用在 ArrayList 这种强制 Object 类型的 list 上，它会自动装箱（简单类型转为引用类型），这个时候读取时，可以拆箱转为值类型。而 List 类型的元素都是同一种类型，List 只不过把数组的扩容也封装起来了。

#### 请简述 ArrayList 和 List 的主要区别？

ArrayList 存在不安全类型（ArrayList 会把所有插入其中的数据都当作 Object 来处理），装箱拆箱的操作（费时），List 是泛型类，功能跟 ArrayList 相似，但不存在 ArrayList 所说的问题。

ArrayList 是 C# 1 的特性，List 的出现便是解决 ArrayList 的不安全类型问题，List 可以让编译器提前知道类型检查。

在进行对 ArrayList 排序的时候，ArrayList.Sort 排序方法需要传入的类实现 IComparer 接口：

```cs
class ProductNameComparer: IComparer
{
  public int Compare(object x, object y) {
    Product first = (Product)x;
    Product second = (Product)y;
    return first.Name.CompareTo(second.Name);
  }
}
...
ArrayList products = Product.GetSampleProducts();
product.Sort(new ProductNameComparer());
foreach(Product product in products) {
  Console.WriteLine(product);
}
```

这个时候会在 Compare 需要强制类型转换，并且在使用的时候 foreach 中也出现了隐式类型转换，还有 ArrayList 的类型有可能是字符串类型。

通过 `List<T>` 泛型来解决上面的问题。

```cs
class ProductNameComparer : IComparer<Product>
  {
    public int Compare(Product x, Product y)
    {
      return x.Name.CompareTo(y.Name);
    }
  }
class MainClass
{
  public static void Main(string[] args)
  {
    List<Product> products = Product.GetSampleProducts();
    products.Sort(new ProductNameComparer());
    foreach (Product product in products)
    {
      Console.WriteLine(product);
    }
  }
}
//
```

处理实现 IComparer 外，也可以直接通过委托来实现排序，可以很容易扩展到其他的值，例如通过价格排序。

```cs
// Lambda，简写的委托
products.Sort((x, y) => x.Name.CompareTo(y.Name));
```

更加简单且没有副作用的写法：OrderBy 扩展方法

```cs

```

##### 查询集合

ArrayList 耦合三个任务

```cs
ArrayList products = Product.GetSampleProducts();
foreach(Product product in products) {
  if (product.Price > 10m) {
    Console.WriteLine(product)
  }
}
```

List

```cs
List<Product> products = Product.GetSampleProducts();
      Predicate<Product> test = delegate (Product p) { return p.Price > 10m; };
      List<Product> matches = products.FindAll(test);

      Action<Product> print = Console.WriteLine;

      matches.ForEach(print);
```

使用 Lambda 表达式

#### 数组和排序

关于数组的排序，如果对象的对象类型的，可以实现 ICompare 接口，相当于传递了元素的比较函数。

对于对象类型，可以集成 ICompare 接口。

### GC（Garbage Collection）

### CLR（Common Language Runtime）

### 静态构造函数

### 文件 I/O

### 序列化与反序列化

序列化是<u>指把一个 C# 对象变成二进制内容，</u>本质上就是一个 `byte[]` 数组。

为什么要把 C# 对象序列化呢？因为序列化后可以把 `byte[]` 保存到文件中，或者把 `byte[]` 通过网络传输到远程，这样，就相当于把 Java 对象存储到文件或者通过网络传输出去了。

有序列化，就有反序列化，即把一个二进制内容（也就是 `byte[]` 数组）变回 Java 对象。有了反序列化，保存到文件中的 `byte[]` 数组又可以“变回” Java 对象，或者从网络上读取 `byte[]` “变回” Java 对象。

### （协程）

#### 枚举器与迭代器

- [对 Unity 中 Coroutines 的理解](https://wuzhiwei.net/unity_coroutines/)

### 线程同步

### 抽象类 abstract class 与接口 interface 的异同

### 类 class 和结构体 struct 的异同

结构体是一种值类型，而类是引用类型。（值类型、引用类型就是根据数据存储的角度来分的）就是值类型用于存储数据的值，引用类型用于存储对实际数据的引用。那么结构体就是当成值来使用的，类则通过引用来度实际数据操作。

### using 关键字的使用场景 https://blog.csdn.net/Iqingshuifurong/article/details/53129536

### 委托与事件

- 飞行射击
- HUD 与场景通信

### 重载（reload）与重写（override）的区别

方法的重写(Overriding)和重载(Overloading)是 c#多态性的不同表现，重写是父类与子类之间多态性的一种表现，重载可以理解成多态的具体表现形式。

(1)方法重载是一个类中定义了多个方法名相同,而他们的参数的数量不同或数量相同而类型和次序不同,则称为方法的重载(Overloading)。
(2)方法重写是在子类存在方法与父类的方法的名字相同,而且参数的个数与类型一样,返回值也一样的方法,就称为重写(Overriding)。
(3)方法重载是一个类的多态性表现,而方法重写是子类与父类的一种多态性表现。

- https://www.runoob.com/java/java-override-overload.html

### return 执行顺序

### switch（expression）

### 反射 Reflection

### property 与 attribute 的区别

### 请简述 sealed 关键字用在类声明时与函数声明时的作用

### 访问修饰符，请简述 private，public，protected，internal 的区别

Unity 3D、2D 手机游戏《面向对象编程部分》

### static 关键字的应用

### 文件编码格式

### 值传递与引用传递

### 参数传递 ref 与 out 的区别

ref 和 out 只要是为了解决 return 多个值的问题，并且对于值类型也可以通过方法进行修改。

ref 和 out 参数的效果一样，都是通过关键字找到定义在主函数里面的变量的内存地址，并通过方法体内改变它的值。区别在于：

#### ref

- 使用 ref 引用参数时，必须在方法的声明和调用中都是用 ref 修饰符。
- 实参必须是变量，在用作实参前必须被赋值。如果是引用类型，可以赋值为一个引用或 null。

对于值参数，系统在栈上为形参分配内存。相反，引用参数具有以下特征：

- 不会为形参在栈上分配内存
- 实际情况是，`形参的参数名将作为实参变量的别名`，指向相同的位置。

#### out

- 必须在声明和调用中都使用修饰符。
- 和引用参数相似，实参必须是变量，而不是其他类型的表达式。这是有道理的，因为方法需要内存位置保存返回值。

对于输出参数，形参就好像是实参的别名一样，但是还有一个需求，那就是`它必须在方法内进行赋值`。

### 浅拷贝与深拷贝

### 容器

### 迭代器

### 数据库

#### 数据库操作的相关类

#### 事务

#### 索引

#### 视图

#### 存储过程

## Unity

### 动态加载资源的方式？它们之间的区别

#### Resource.Load()

#### AssetBoundle

### .Net 与 Mono 的关系

mono 是 .net 的一个开源跨平台工具，就类似 java 虚拟机，java 本身不是跨平台语言，但运行在虚拟机上就能够实现了跨平台。.net 只能在 windows 下运行，mono 可以实现跨平台跑，可以运行于 linux，Unix，Mac OS 等。

### 简述 Unity 3D 支持的作为脚本的语言的名称

Unity 的脚本语言基于 Mono 的 .Net 平台上运行，可以使用 .Net 库，这也为 XML、数据库、正则表达式等问题提供了很好的解决方案。Unity 里的脚本都会经过变异，他们的运行速度也很快。这三种语言实际上的功能和运行速度是一样的，区别主要在于语言特性上。JavaScript、C#、Boo。

### 简述一下对象池，你觉得在 FPS 里哪些东西适合使用对象池

对象池就存放需要被反复调用资源的一个空间，当一个对象会大量生成的时候如果每次都销毁创建会很费时间，通过对象池把暂时不同的对象放到一个池中（也就是一个`集合`），当下次要重新生成这个对象的时候先去池中查找一下是否有可用的对象，如果有的话就直接拿出来使用，不需要再创建，如果池中没有可用的对象，才需要重新创建，利用空间换时间来达到游戏的高速运行效果，在 FPS 游戏中要常被大量的复制的对象包括子弹、敌人、粒子等。

### 简述 prefab 的用处

在游戏运行时实例化，prefab 相当于一个模版，对你已有的素材、脚本、参数做一个默认的配置，以便于以后的修改，同时 prefab 打包的内容简化了导出的操作，便于团队的交流。

### CharacterController 和 Rigidbody 的区别

Rigidbody 具有完全真实物理的特性，Unity 中物理系统最基本的一个组件，包含了常用的物理特性，而 CharacterController 可以说是受限的 Rigidbody，具有一定的物理效果但不是完全真实的，是 Unity 为了使开发者能方便的开发第一人称视角而封装的一个组件。

### 使用 Unity3d 实现 2d 游戏，有几种方式？

### 在物体发生碰撞的整个过程中，有几个阶段，分别列出对应的函数

三个阶段：

1. OnCollisonEnter
2. OnCollisionStay
3. OnCollisionExit

### 如何安全的在不同工程间安全地迁移 asset 数据？三种方法

### 什么叫做链条关节？

Hinge Joint，可以模拟两个物体间用一根链条连接在一起的情况，能保持两个物体在一个固定内部相互移动而不产生作用力，但是达到固定距离后就会产生拉力。

### OnEnable、Awake、Start 运行时的发生顺序？哪些可能在同一个对象周期中反复的发生

### MeshRender 中 material 和 sharedmaterial 的区别？

### Unity 提供了几种光源，分别是什么

### 渲染流程

1. 你觉得为什么 UI 摄像机和场景摄像机能协同工作，而且工作的这么尽如人意呢？
   答案：UI 摄像机和场景摄像机分别属于两个渲染层（Layer），所以它们之间的渲染互不干扰。它们工作得尽如人意（没有发生先后错乱，UI 永远位于场景之上层）的原因就是因为摄像机深度（depth）控制的好。

### UGUI（优先）

#### 你觉得怎么防止 UI 控件被点穿（如何过滤掉点击事件）

例如，卡背与卡面两个图形对象

#### 你对 UI 功能模块之间相互通信有什么好看法。（或者问成 Broadcast 和 sendMessage 的看法）

#### 关于 UIGrid 问题

#### 众里寻他千百度，你怎么样能迅速找到某一个 UI 控件

通过 GameObject.Find("/xxx/xxx") 路径。

#### 你对遮挡关系有什么好的策略

在同一个镜头中，Cavans 中所有的物体在进行渲染时，会按照先后顺序，即后渲染的会遮住先渲染的。因此在设定一些比如按钮的遮挡关系的时候，可以将想要在最上层的 UI 放到最后去渲染，修改 Hierarchy 层级面板从上往下的顺序。

而对于在游戏中动态产生的物体，可以使用代码来调整子物体的顺序。

```cs
rectTran.SetAsLastSibling();
```

#### 你对屏幕适配有什么好主意

- ![屏幕适配实用技巧](https://zhuanlan.zhihu.com/p/42779882)

NGUI 很好的解决了这一点，屏幕分辨率的自适应性，原理就是计算出屏幕的宽高比跟原来的预设的屏幕分辨率求出一个比值，然后修改摄像机的 size。UGUI 通过锚点和中心点、分辨率也解决了这个问题。

## Lua

<!-- 掌握使用：实现的算法、数据结构、工具类、游戏脚本 -->

- 元表
- 面向对象
- 协同程序

## 算法和数据结构

数据逻辑层

1. 请简述一下你对数据结构的选取有什么看法
2. 请把这份配置文件解析成你想要的数据结构，给我看看
3. 请简述一下 C# 中，结构体和 class 的用法
4. 接受到网络发来的数据，你会怎么办

游戏控制流程：

<!-- 1. 你对资源加载有什么看法。 -->

2. 请给我设计一个状态机，完成一个简单的 xxxx 情景。
   <!-- 3. 角色换装，技能释放你会怎么做。 -->
3. 动态更新有什么看法。

### 数组

### 链表

#### 单链表

```cs
using System;
namespace DataStructures.Lists
{
  /*
   * 思路：位置
   */
  public class Node
  {
    public Node next;
    public int data;
    public Node(int data)
    {
      this.data = data;
    }
  }

  public class SingleLinkedList
  {

    private Node head; // 头指针
    private Node last;  // 尾指针，为了尾部插入的方便所用
    private int size; // 链表实际长度

    public SingleLinkedList()
    {
    }

    /*
     * 链表插入节点
     */
    public Node Insert(int data, int index)
    {
      if (index < 0 || index > size)
      {
        throw new IndexOutOfRangeException("超出链表节点范围");
      }
      // 新节点
      Node insertedNode = new Node(data);

      // 空链表
      if (size == 0)
      {
        head = insertedNode;
        last = insertedNode;
      }
      // 插入头部
      else if (index == 0)
      {
        insertedNode.next = head; // 移动旧的头部节点 next 指向新节点
        head = insertedNode; // 改变头部指针指向为新节点
      }
      // 插入尾部
      else if (size == index)
      {
        last.next = insertedNode; // 移动旧的尾部节点 next 指向新节点
        last = insertedNode; // 改变尾部指针指向为新节点
      }
      // 插入中间
      else
      {
        // 寻找 index 上一个节点
        Node prevNode = Get(index - 1);
        // 插入
        insertedNode.next = prevNode.next; // 链接新节点到原来的节点
        prevNode.next = insertedNode; // 改变上一个节点的 next 指向

      }
      size++;
      return insertedNode;
    }

    /*
     * 删除节点
     * @param {int} index
     * @return 返回删除的节点 {Node} s
     */
    public Node Remove(int index)
    {
      if (index < 0 || index > size)
      {
        throw new IndexOutOfRangeException("超出链表节点范围");
      }
      Node removeNode;

      // 删除头部节点
      if (index == 0)
      {
        removeNode = head;
        head = head.next;
      }
      // 删除尾部节点
      else if (index == size)
      {
        Node prevNode = Get(index - 1);
        removeNode = prevNode.next;
        prevNode.next = removeNode.next;
        last = prevNode; // 移动 last 指针
      }
      // 删除中间节点
      else
      {
        Node prevNode = Get(index - 1);
        Node nextNode = prevNode.next.next;
        removeNode = prevNode.next;
        prevNode.next = nextNode;
      }
      size--;
      return removeNode;
    }

    /*
     * 查找节点
     */
    public Node Get(int index)
    {
      if (index < 0 || index >= size)
      {
        throw new IndexOutOfRangeException("超出链表节点范围");
      }
      Node temp = head;
      for (int i = 0; i < index; i++)
      {
        temp = temp.next;
      }
      return temp;
    }

    public void Print()
    {
      Node temp = head;
      while (temp != null)
      {
        Console.Write(temp.data);
        temp = temp.next;
      }
    }
    public static void Main() { }
  }
}

```

### 散列表

### 栈

通过栈可以把绝大数的递归，改成非递归写法。

```cs
using System;
using System.Collections.Generic;
namespace DataStructures.Lists
{
  public class StackByList<T>
  {
    private int topOfStack = -1; // 栈顶的位置
    private List<T> collections = new List<T>();
    public StackByList()
    {

    }

    // 是否为空
    bool IsStackEmpty
    {
      get
      {
        return topOfStack < 0;
      }
    }

    // 添加元素
    public void Push(T element)
    {
      collections.Add(element);
      topOfStack++;
    }

    public T Pop()
    {
      if (!IsStackEmpty)
      {
        T removedItem = collections[collections.Count - 1];
        collections.RemoveAt(topOfStack);
        topOfStack--;
        return removedItem;
      }
      return collections[0];
    }
  }
}

```

### 队列

```cs
using System;
using System.Collections.Generic;

namespace DataStructures.Lists
{
  public class Queue<T>
  {
    private int headOfQueue = -1;
    private List<T> collections = new List<T>();
    public Queue()
    {

    }

    bool IsQueueEmpty
    {
      get
      {
        return headOfQueue < 0;
      }
    }

    public void Insert(T element)
    {
      collections.Add(element);
      headOfQueue = 0;
    }

    public T Remove()
    {
      if (!IsQueueEmpty)
      {
        T removedItem = collections[headOfQueue];
        collections.RemoveAt(headOfQueue);
        return removedItem;
      }
      return collections[0];
    }
    public static void Main() { }
  }
}

```

### 堆

### 树

### 冒泡排序

### 选择排序

### 快速排序

### 计数排序

## 设计模式

### 单例模式

```cs
using System;
namespace Design.Patterns
{
  public class Singleton
  {
    private static Singleton uniqueInstance;

    private Singleton()
    {
    }

    public static Singleton GetSingleton()
    {
      if (uniqueInstance == null)
      {
        uniqueInstance = new Singleton();
      }
      return uniqueInstance;
    }

    public void Say()
    {
      Console.WriteLine("Hello, I am Singleton.");
    }

    public static void Main(string[] args)
    {

    }
  }

```

### 工厂模式

## 架构

### Unity 的状态管理

对于各个脚本的状态管理问题，比如，对于 A 脚本改变 B 脚本组件的状态时，B 都应用提供一个方法来设置。而不是直接改变状态值，这样也是为了更有效的状态跟踪。

跟 web 前端的状态区别。

### Unity 中模块化、组件化、自动化、规范化是如何实现的？

#### 模块化

### MVC

依赖注入到组件和事件广播组件。

参考资料：

- [前端架构 101： MVC 初探](https://mp.weixin.qq.com/s/8ILlKiZIGCqqVoKhH4VDtA)
- [Unity with MVC: How to Level Up Your Game Development](https://www.toptal.com/unity-unity3d/unity-with-mvc-how-to-level-up-your-game-development)
- [MVC in Unity](https://www.gamasutra.com/blogs/TabeaIseli/20160926/282062/MVC_in_Unity.php)
- [Model View Controller (MVC) Design Pattern](https://riptutorial.com/unity3d/example/32513/model-view-controller--mvc--design-pattern)

## 其他

### 游戏与其他软件的区别

- 游戏比大多数网站与编写其他类型的软件本质上没有什么区别（都是跟用户交互），但是会有更多的交互，而且会包含很多不同类型的代码，但制作所用的技术和方法很相似。

拿网站来说，游戏中的场景相当于不同的页面 URL，而游戏对象则像页面中一个个模块，游戏对象的组件也像是页面中的组件。对于交互来说，一样是各种输入设备（鼠标、键盘）等，只不过游戏比网站多了游戏世界观，更多地与用户互动，让用户一步步解密，得到快乐。而网站则是辅助用户完成工作、生活中的事情。

游戏跟真实的世界很像，如著名电影《楚门的世界》，只不过它可以通过人为模拟出来。

游戏开发中的开发者指的是为游戏开发工作的任何人，除了编程人员，还有艺术家和设计师。

### 研发、发行和渠道

游戏行业公司大体可以分为四类：`研发商`、`发行商`、`游戏平台`或渠道、其他`辅助相关公司`。

一般一款游戏在`研发`出来（也可能在 demo 阶段）时，`发行商`获得发行授权（发行商需要付出版权金加流水分成），然后发行商将游戏在各家`渠道`发布，并通过广告和市场活动来推广该产品，最终收益按照一定的比例三方分成，在其中会有一些其他辅助公司从中牟利。

- 研发商做游戏
- 发行商经销游戏
  - 市场工作
  - 运营
  - 客服
- 游戏平台/渠道：苹果商店
- 辅助公司：游戏直播公司

如果是纯研发公司，自己不做发行，一般能拿到流水的 20%-30%（如果研发拥有 IP，那么比例会更高），如果发行很强势，那研发可能只能拿到 10%-15%。

### 软件开发流程

### .NET Core 与 .NET Framework 的区别

.NET Core 是.NET Framework 的新一代版本，是微軟開發的第一個跨平台 (Windows、Mac OSX、Linux) 的應用程式開發框架（Application Framework），未來也將會支援 FreeBSD 與 Alpine 平台。.Net Core 也是微軟在一開始發展時就開源的軟體平台[1]，它經常也會拿來和現有的開源 .NET 平台 Mono 比較。

.NET Core 是现代的

- 与一些较旧的框架不同，.NET Core 旨在解决当今的现代需求，包括移动友好、构建一次在任何地方运行、可伸缩和高性能。.NET Core 旨在构建针对各种设备的应用程序，包括物联网和游戏机。

.NET 在 C# 8 的帮助下支持现代语言结构，如面向对象和模块化编程、泛型、集合、lambdas、语言集成查询(LINQ)和异步编程，这使开发人员更加高效。

在这里了解更多关于 C#7 和 C#8 特性的信息，

C#7.1、7.2 和 7.3 新特性

C#8 特性

## 参考资料

- [十分钟，看懂研发、发行和渠道的那些事儿](https://zhuanlan.zhihu.com/p/34964309)
- [UGUI 系列导航帖](https://blog.csdn.net/zcaixzy5211314/article/details/86515168)
- [C# 面试题归纳](https://zhuanlan.zhihu.com/p/56522099)
- [.NET Core](https://zh.wikipedia.org/zh/.NET_Core)
- [通俗易懂，什么是.NET Core 以及.NET Core 能做什么](https://www.cnblogs.com/yilezhu/p/10880884.html#:~:text=%E4%B8%8E%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6%E6%A1%86%E6%9E%B6%E4%B8%8D%E5%90%8C,%E4%B8%8E%E5%85%B6%E4%BB%96%E6%A1%86%E6%9E%B6%E4%B8%8D%E5%90%8C%EF%BC%8C.&text=NET%20Core%E6%8F%90%E4%BE%9B%E4%BA%86%E6%9C%80,%E5%A4%9A%E8%AF%AD%E8%A8%80%E6%94%AF%E6%8C%81%E5%92%8C%E5%B7%A5%E5%85%B7%E3%80%82)
- [类型和变量](https://docs.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/types-and-variables)
- [Unity 面试题（包含答案）](https://zhuanlan.zhihu.com/p/61925255?utm_source=wechat_session&utm_medium=social&utm_oi=710800537397764096&utm_content=sec)
- [lua 面试题](https://www.jianshu.com/p/d4c535791b5e)
