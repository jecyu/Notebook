# JS 原型概念与应用

头脑风暴：

核心问题：传统的面向对象语言是如何新建对象以及继承类的，而使用类是为了共享一些公共的方法和属性。

JS 又是如何通过原型这个概念来实现这两个概念的，原则上是基于类继承与基于原型继承的两种区别。

<!-- 再稿后，发布到 blogs 文件夹，之后同步掘金、个人博客-->

## 前言

如果向你请教“原型”这两个字是什么意思，你会怎么解释呢？不同领域的人可能有不同的见解。在文学电影作品领域，主线剧情便是一个原型，例如罗密欧与茱丽叶是是遭遇家人反对为爱殉情男女的原型，跟中国故事的梁山伯与祝英台很像。另外，故事中的人物也可以是原型，例如英雄的原型。在互联网领域更是细分不少，在游戏开发中，一个原型是可以快速试玩的 demo。对于网站开发，原型可以起始于产品经理手中的线框图。

那么原型是什么呢，接下来本文会从一般的原型说到 JS 的原型以及 JS 为什么需要原型。

**摘要**：

- 什么是原型
- JS 中的原型
- JS 为什么需要原型链
- **proto** 与 prototype 的区别
- 应用场景

**面向读者**：对于 JS 原型链概念模糊的前端工程师，说不清`proto` 与 `prototype` 的区别。

## 什么是原型？

举个例子，你还记得 2016 年大火的动画电影是什么？那就是新海诚的作品《你的名字》，且不说奏乐动听，在剧情上也让人很深刻。剧情并非以单纯恋爱题材为主，而是“有着见面的命运但迟迟无法相见的两人”。而这部作用的原型，便是以早期的新海城[《十字路口》视频链接]()为原型。

![](../.vuepress/public/images/2020-06-08-07-53-09-js-prototype-01.png)

在文学电影创作领域，除了剧情外，人物主角也是先从原型制作而来。可以看看《虐杀原型》这个游戏的主角纸面原型构造图，除了设定好人物的外表外，更重要的是要设定他的行为（功能）：

[虐杀原型，人物构造图]()

。无论是故事剧情、人物，还是制造一个工业产品，所谓原型就是最初的样例、模型（很多时候模型和原型视为同一个东西）或者是为了测试概念而构建的产品。

### 原型的特点与目的

原型最本质的特点是，它是你最终制作的成品的最小规模，但具有核心功能的东西。它的目的是为了让我们可以快速多次测试自己的想法是否正确，比如一个游戏设计师，他需要不断制作具备核心功能的游戏原型，测试游戏原型，以来测试游戏的机制、规则等是否合理。当然在制作制作原型，他也可以参考成功的游戏的原型。

最早视觉上可以交互的原型，便是纸面原型（也就是在纸上画画，以及使用一些玩具类的东西构建）。

原型的规模大小是相对成品而言的，而在每个阶段都可以成为下一个阶段的原型，也就是说原型之间可以进行`继承`，从纸面原型到真正可以进行交互的原型。

[一个机器人或虐杀原型，从纸面到真正可以动的模型 gif]()

### 原型经历的阶段

![](../.vuepress/public/images/2020-06-09-07-22-37-js-prototype-01.png)

从原型到成品，也不是一次到位，其中也经历了很多的版本迭代，跟我们编程一样的道理，肯定不是下面这样一次完成。

（画马）

## 计算机编程中的原型

<!-- ### 使用计算机语言描述程序

TODO 这块提纲使用计算机语言描述程序考虑是否还需要，后续考虑是否保留。

这里简单描述下如何让计算机实现我们的命令，以便更加好理解`面向过程`编程的由来。举个例子，如果我们要编写一个描述人物的程序，他具有从站立转为行走的功能。

对于计算机来说这样复杂的命令需要拆分为一系列简单命令，如何用简单命令指挥另外一个人从站立状态转为行走状态呢？

![](../.vuepress/public/images/2020-06-15-08-55-31-walk.png)

首先，让同伴站立在地板上，然后告诉他严格按你所发出的命令的字面含义做相应的动作。你的目标是向同伴发出一系列命令，使他走起来。但你不能使用“走起来”之类的复杂命令，只能向指挥机器人一样使用简单命令，例如。

1. 以左脚为支撑，提起你的右脚，以躯干为轴心，向前跨 30 度
2. 向前甩动你的左臂，右臂同时朝后摆动。
3. 以右脚为支撑，提起你的左脚，以躯干为轴心，向前跨 30 度
4. 向前甩动你的右臂，左臂同时朝后摆动。
5. 重新回到第 1 步骤。

```js
// 实现一个 walk 程序，这里是伪代码语言。然后交给计算机运行 walk 程序进行计算处理。
main()
  Walk() {
    LiftRightFoot()
    SwingLeftAndRightArm()
    LiftLeftFoot()
    SwingLeftAndRightArm()
  }
```

可以看到对于人类来说一个简单的站立动作在计算机上需要拆分成多个步骤的，完全是面向过程的实现。 这也是为什么更低级的语言如 C 语言是使用面向过程的写法了。-->

### 计算机中的原型

在计算机编程中是通过`面向对象编程`概念实现原型的。要想了解何为面向对象编程，目的是为了什么？让我们先回顾`面向过程`编程。举个例子，假设我们需要在界面上画出四方形、圆形与三角形。当用户点选图形时，图形需要顺时钟方转 360度并依据形状的不同播放不同的 AIF 音效文件。

<!-- ![四方形、三角形、圆形，点击 gif 动图设计图]() -->

前面也提到计算机执行的是一条条命令，也就是面向过程的思维，这个程序要执行什么动作，我们会写出以下的代码：

```js
// 使用形状编号来找寻特定编号的图形
rotate(shapeNum) {
 // 旋转 360°
}

playSound(shapeNum) {
  // 查询播放哪个 AIF 音频文件
  // 播放
}
```

OK，看起来程序是满足需求。这个时候，要新增一个阿尔米巴原虫（Amoeba）形状并播放 .hif（高保真(HiFi) 音频）声音文件。原来的 rotate 程序还可以用，但是 playSound 需要修改。

```js
play(shapeNum) {
  if 不是 Amoeba
     // 查询使用哪个 AIF 文件
     // 播放
  else
    // 播放 amoeba.hif
}
```

这个时候已经对原来测试过的程序代码进行了一部分的修改。假设我们是默认对形状的旋转部分是这样写的：

1. 找出指定形状的外接四边形
2. 计算出四边形的中心点，以此点为轴做旋转。

![外接四边形]()

而程序进一步要求阿尔巴原虫的旋转轴心不是图形的中心，而是绕着一端旋转，类似秒针那样。现在，我们也要更改测试好的 rotate 程序了，给它加上轴心点的参数。

```js
rotate(shapNum, xPt, yPt) {
  if 不是 Amoeba
     // 计算中心点
     // 然后旋转
  else 
    // 以 xPt 和 yPt 作为旋转中心
    // 然后旋转
}
```

如果继续现在还要新的形状，可能不得不又要对 rotate 和 playSound 操刀了。可见这样的代码很脆弱，只要加入新的功能很可能影响现有正常的程序代码。

面向过程思考的角度是这个程序要执行什么动作，如果使用面向对象的思维是怎么做的呢？

那面向对象，首先得有个对象。生活中的对象应该是这样的

![男女结对编程👀鼓励师]() 

编程中，得通过类进行实例化生成。所以要实现面向对象，先要实现类的定义，因为对象是靠类的模型塑造出来的。

```java
// 定义
public class Person {
  private void walk() {}
}
// 实例化
Person personA = new Person();
personA.walk()
Person personB = new Person();
personB.walk()
```

这个时候 personA 和 personB 共享 Person 类对象中的属性和方法，都具有行走的功能，大大提高可维护性和复用性，这个时候思考的角度便是这个程序有什么样的事物与角度（Person）？这些事物有什么事件与动作（walk）？

现在，让我们使用面向对象的思维重构前面的代码，首先分别为 3 个形状各写出一个类：

![](../.vuepress/public/images/2020-06-22-07-43-50-class-diagram-01.png)

我们发现这三个类都有共同的类方法 rotate()、playSound()，我们可以考虑再抽象出一个父类出来：

![](../.vuepress/public/images/2020-06-22-08-02-01-class-inherit.png)

而对于新增的阿尔米巴原虫形状，我们只需要新建一个类，继承于 Shape 父类，但是只需要覆写父类的 rotate() 和 playSound 方法即可，无需改动另外三个类。

![](../.vuepress/public/images/2020-06-22-08-09-03-class-inherit-02.png)

总结下，面向对象的基本定义。

- 类（前面例子的 Person 类）
- 类方法（walk 方法）与属性
- 类实例（personA 和 personB）

基本概念：
- 封装（对于访问者来说，访问的权限如何）
- 继承（类、接口之间的继承，把共同的程序代码放在父类中）
- 多态（同一个方法，不同的对象表现出不同的行为，例如 rotate）
- 抽象（把子类的共同属性和行为抽象到父类中）

接下来我们要另外设计一个程序，可以让用户设定将一群动物丢到某种环境中以观察会发生什么事情，我们现在只关注设计，以便加深面向对象的理解。

假设现在程序只有一部分的动物，后续会加入其他的动物。每个动物都用一个对象来表示，且动物会在环境中活动，执行任何被设计出的行为，分析步骤如下：

1. 分析找出具有共同属性和行为的对象（picture、food、hunger、boundaries、makeNodes、eat、roam）。
2. 设计代表共同状态与行为的类（Animal）。
3. 决定子类是否需要让某项行为有特定不同的运作方式。（覆盖 eat、makeNoise）
4. 通过寻找使用共同行为的子类找出更多抽象化的机会（Canine 犬科、Feline 猫科）。

![](../.vuepress/public/images/2020-06-23-07-56-58-inhert-Animal.png)

最终得出一个简单的分类结构。

- Animal（动物类）
  - Canine（犬科）
    - Dog（狗）
    - Wolf（狼）
  - Feline（猫科）
    - Lion（狮子）
    - Tiger（老虎）
    - Cat（猫）

实现面向对象思想有两种方法，基于类实现和基于原型实现，下面将使用 Java 和 JS 来实现。

### 传统面向对象语言

要理解面向对象编程，最重要的特点就是根据`类封装创建对象`与`类之间继承`的概念了。在 Java 中，我们可以通过声明一个类作为基类，然后通过继承这个基类定义一个新类。

根据之前的树状结构，我们首先定义 Animal 类：

```java
public class Animal {
	public String picture; // 动物 JPEG 图像的名称
	public String food; // 此动物所吃的食物
	public int hunger; // 代表饥饿程度。它会根据动物吃了多少东西而改变
	public Boundaries boundaries; // 代表动物活动范围区域的长宽

	public Animal(String picture, String food, int hunger, Boundaries boundaries) {
		this.picture = picture;
		this.food = food;
		this.hunger = hunger;
		this.boundaries = boundaries;
	}

	public void makeNoise() { // 动物发出声音的行为
		System.out.println("Animal makeNoise!");
	}

	public void eat() { // 动物遇到食物时的行为程序
		System.out.println("Animal eat!");
	}

	public void sleep() { // 睡眠的行为程序
		System.out.println("Animal sleep!");
	}

	public void roam() { // 不在进食或睡眠时的行为程序
		System.out.println("Animal roam!");
	}
}
```

然后，基于 Animal 继续扩展出一个 Canine 和 Feline 类，它们都覆盖了 Animal 的 makeNoise 和 eat 方法。

```java
public class Canine extends Animal {

	public Canine(String picture, String food, int hunger, Boundaries boundaries) {
		super(picture, food, hunger, boundaries);
	}

	public void makeNoise() {
		System.out.println("Canine makeNoise!");
	}

	public void eat() {
		System.out.println("Canine eat!");
	}
}
```

```java
public class Feline extends Animal {

	public Feline(String picture, String food, int hunger, Boundaries boundaries) {
		super(picture, food, hunger, boundaries);
	}

	public void makeNoise() {
		System.out.println("Feline makeNoise!");
	}

	public void eat() {
		System.out.println("Feline makeNoise!");
	}
}

```

然后，再构建继承于 Feline 和 Canine 类的 Dog 类 和 Cat 类：

```java
public class Cat extends Feline {
	public Cat(String picture, String food, int hunger, Boundaries boundaries) {
		super(picture, food, hunger, boundaries);
	}
}
```

```java
public class Dog extends Canine {

	public Dog(String picture, String food, int hunger, Boundaries boundaries) {
		super(picture, food, hunger, boundaries);
	}
}
```

最后，我们可以根据 Dog 类和 Cat 类进行实例化并进行调用：

```java
public class Main {

	public static void main(String[] args) {
		Boundaries boundariesDog = new Boundaries();
		Boundaries boundariesCat = new Boundaries();
		Dog keji = new Dog("柯基", "骨头", 100, boundariesDog);
		Cat meiduan = new Cat("美短", "鱼", 100, boundariesCat);
		keji.makeNoise(); // Canine makeNoise!
		meiduan.makeNoise(); // Feline makeNoise!
	}
}
```

可以看出男人 man 和女人 woman，这个人物类是 man 和 woman 的原型。

这里的基类和人物类都是原型，男人和女人对象的原型是人物类，而人物类的原型又是。

除了这种直观的原型外，还有数据原型（数据的迁移、集成）等。

### 基于原型继承的面向对象 JS

在传统的基于 Class 语言如 Java、C++、C# 中，继承的本质是扩展一个已有的 Class，并生成新的 Subclass。这类语言严格区分类和实例，继承实际上是类型的扩展。但是，JavaScript 无法直接扩展一个 Class。

对于如何定义类和继承，JS 则使用`构造函数（constructor）`与`原型（prototype）`间接实现面向对象的思想。

对比传统面向对象 java 通过类的构造函数进行实例化，通过 extend 进行类的继承。

而 JS 没有类的概念，也没有 extend 这类东西。但是可以定义构造函数，通过构造函数创建对象，任何的 javaScript 函数都可以是构造函数。使用 prototype 定义公共的属性和方法以此替代没有类的定义。

<!-- 在 js 面向对象编程中，除了原型（`prototype`） 这个词外，构造器（`contructor`）也是我们接触比较多的术语。两者有什么区别呢，有哪些应用场景。 -->

<!-- 因为在 js 语言中没有类的概念（为什么没有？），因此使用原型来实现新对象实例的创建和继承。 -->

### 一张图对比

<!-- 一张图对比看是否需要放到其他位置 -->

无论是基于类的 java 还是基于原型的 js ，都是为了实现面向对象的概念，可以统一理解为基于原型的实现。只不过 java 通过 class 和类的构造函数定义原型，而 js 通过 prototype 和构造函数来定义原型，本质上都是基于原型开发。

### 构造器（构造函数）与原型的关系

构造器（构造函数），英文是 contructor，它是可以根据原型构造实例对象的机器，提供消费者（用户）可以基于这个原型（在传统面向对象中就是当前整个类）进行初始化状态所用。

例如 `new bar()` 这个 `bar` 是原型，而 `bar` 继承的类也是原型。通常我们 `a = new bar()` 也是调用 `bar` 类的构造函数，然后基于以整个类为原型进行创建新的对象。`bar` 为 `a` 的构造函数，则 `a` 为 `bar` 的一个实例。而 bar 作为原型还可以继承其他的原型例如 `foo`。

C#、Java 都通过 class 进行原型的定义，JS 通过 prototype 属性，让我们来具体看看 JS 中基于原型的实现过程。

## 细说 JS 中的原型

下面具体说说 JS 中的原型。

### 什么是原型链

- 层层访问

<!-- 同样使用上面的传统面向对象的继承例子 -->

### 为什么需要原型链

- 使用原型链进行继承

### JS 是如何使用原型链进行类的继承的

- 对象构造器
- 重写 contructor 的问题
- 一些操作符 instanceof typeof in 操作符

### 使用 ES6 的 class 实现继承

## 属性 __proto、prototype、constructor 区别

js 中的 constructor 跟传统面向对象的构造函数是一样的道理。

### **proto** 与 prototype 的区别

### constructor 与 prototype 的区别

### 在 调试器（debugger）中查看属性

## 应用场景

除了继承之外，理解计算机中的原型可以让我们做什么

### 更新轮子：给第三方库、框架增加属性

[vue-plugin-event-bus](https://github.com/shooterRao/vue-plugin-event-bus/blob/master/src/index.ts)

给 vue 写插件。
除了在 window 对象外
要注意在大型项目中，prototype 属性的冲突问题。

### 写个轮子：一棵树

## 小结

<!-- 构造器。面向过程、面向对象，稍微提下函数式编程，像面向过程的 C 语言是如何提高写法的呢 -->

另外，像 UML 建模，顾名思义建立模型，也是建立原型的过程，之后再对系统进行具体的编码。

## 参考资料

- [Details of the object model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model) 值得精读的 MDN 文档，关于基于类继承与基于原型继承的区别说得挺清楚的。
- [Object.prototype.constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
- [深入探究 Function & Object 鸡蛋问题](https://github.com/yygmind/blog/issues/35)
- [【进阶 5-2 期】图解原型链及其继承优缺点](https://github.com/yygmind/blog/issues/35)
- [【进阶 5-1 期】重新认识构造函数、原型和原型链](https://juejin.im/post/5c6a9c10f265da2db87b98f3)
- [wiki 原型](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%9E%8B)
- [Prototype](https://en.wikipedia.org/wiki/Prototype#cite_note-:0-1)
- [所谓原型，是个什么东西？](http://www.woshipm.com/pd/144880.html)
- [廖雪峰 JavaScript 教程](https://www.liaoxuefeng.com/wiki/1022910821149312/1023021997355072)
- [再谈 JavaScript 面向对象思想及继承](https://segmentfault.com/a/1190000011770117)
- [JS 和其他面向对象语言的区别](https://www.jianshu.com/p/387677d13f99?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)
- [Trying to understand the difference between prototype and constructor in JavaScript](https://stackoverflow.com/questions/28600238/trying-to-understand-the-difference-between-prototype-and-constructor-in-javascr)
- [java 继承](https://www.liaoxuefeng.com/wiki/1252599548343744/1260454548196032)
- [简单粗暴地理解 js 原型链–js 面向对象编程](https://mp.weixin.qq.com/s/93CQRYj8TraDIKeJxNGPAQ)
- 《Head First Java》