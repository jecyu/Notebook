# 设计原则和编程技巧

## 基础知识

### 多态

多态的实际含义是：**统一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果**。换句话说，**给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。**

从字面上来理解多态不太容易，下面我们来举例说明一下。

主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令时，鸭会“嘎嘎嘎“地叫，而鸡会”咯咯咯“地叫。这两只动物都会以自己的方式来发出叫声。它们同样“都是动物，并且可以发出叫声”，但根据主人的指令，它们会各自发出不同的叫声。

#### 一段“多态” 的 JavaScript 代码

我们把上面的故事用 JavaScript 代码实现如下：

```js
var makeSound = function(animal) {
  if (animal instanceof Duck) {
    console.log("嘎嘎嘎");
  } else if (animal instanceof Chicken) {
    console.log("咯咯咯");
  }
};

var Duck = function() {};
var Chicken = function() {};

makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯
```

这段代码确实体现了 “多态性”，当我们分别向鸭和鸡发出“叫唤”的消息时，它们根据此消息作出了各自不同的反应。<u>但这样的“多态性”是无法令人满意，如果后来又增加了一只动物，比如狗，显然狗的叫声是“汪汪汪”，此时我们必须得改动 makeSound 函数，才能让狗也发出叫声。</u>修改代码总是危险的，修改的地方越多，程序出错的可能性就越大，而且当动物的种类越多时，makeSound 有可能变成一个巨大的函数。

<u>多态背后的思想是将“做什么” 和 “谁去做以及怎样去做”分离开来，也就是将“不变的事物”与“可能改变的事物”分离开来。</u>在这个故事中，动物都会叫，这是不变的，但是不同类型的动物具体怎么叫是可变的。<u>**把不变的部分隔离出来，把可变的部分封装起来**</u>这给予了我们扩展程序的能力，程序看起来是可生长的，也是符合开发-封闭原则的，**相对于修改代码来说，仅仅增加代码就能完成同样的功能，这显然优雅和安全得多。**

#### 对象的多态性

下面改写后的代码，首先我们把不变的部分隔离出来，那就是所有的动物都会发出叫声。

```js
var makeSound = function(animal) {
  animal.sound();
};
```

然后把可变的部分各自封装起来，我们刚才谈到的多态性的实际上指的是对象的多态性：

```js
var Duck = function() {};

Duck.prototype.sound = function() {
  console.log("嘎嘎嘎");
};

var Chicken = function() {};

Chicken.prototype.sound = function() {
  console.log("咯咯咯");
};

makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯
```

现在我们向鸭和鸡都发出“叫唤”的消息，它们接到消息后分别作出了不同的反应。如果有一天动物世界里又增加了一只狗，这时候只要简单追加一些代码就可以了，而不用改动以前的 makeSound 函数，如下所示：

```js
var Dog = function() {};

Dog.prototype.sound = function() {
  console.log("汪汪汪");
};

makeSound(new Dog()); // 汪汪汪
```

#### 类型检查和多态

类型检查是在表现出对象多态性之前的一个绕不开的话题，但 JavaScript 是一门不必进行类型检查的动态类型语言，为了真正了解多态的目的，我们需要转一个弯，从一门静态类型语言说起。

我们知道静态类型语言在编译时会进行类型匹配检查。以 Java 为例，由于在代码编译时要进行严格的类型检查，所以不能给变量赋予不同类型的值，这种类型检查有时候会让代码显得僵硬，代码如下：

```java
String str;
str = "abc"; // 没有问题
str = 2; // 报错
```

现在我们尝试把上面让鸭子和鸡叫唤的例子换成 Java 代码：

````java
public class Duck { // 鸭子类
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}

public class Chicken { // 鸡类
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

public class AnimalSound {
  public void makeSound(Duck duck) {
    duck.makeSound();
  }
}


```java
public class Test {
  public static void main(String args[]) {
    AnimalSound animalSound = new AnimalSound();
    Duck duck = new Duck();
    animalSound.makeSound( duck ); // 输出：嘎嘎嘎
  }
}
````

某些时候，在享受静态语言类型检查带来的**安全性**的同时，我们亦会感觉被束缚住了手脚。

<u>为了解决这一问题，静态类型的面向对象语言通常被设计为可以向上转型：当给一个类变量赋值时，这个变量的类型既可以使用这个类本身，也可以使用这个类的超类。</u>这就像我们在描述天上的一只麻雀或一只喜鹊时，通常说“一只麻雀在飞”或者“一只喜鹊在飞”。但如果想忽略它们的具体类型，那么也可以说“一只鸟在飞”。

同理，当 Duck 对象和 Chicken 对象的类型都隐藏在超类型 Animal 身后，Duck 对象和 Chicken 对象就能被交换使用**，这是让对表现出多态性的必经之路，而多态性的表现正是实现众多设计模式的目标。**

#### 使用继承得到多态效果

使用继承来得到多态效果，是让对象表现出多态性的最常用手段。**继承通常包括实现继承和接口继承。**本节我们讨论实现继承，接口继承在接口和面向接口编程一章。

我们先创建一个 Animal** 抽象类**，再分别让 Duck 和 Chicken 都继承自 Animal 抽象类，下述代码中（1）处和（2）处的赋值语句显然是成立的，因为鸭子和鸡也是动物：

```java
public abstract class Animal {
  abastract void makeSound(); // 抽象方法
}

public class Chicken extends Animal {
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

public class Duck extends Animals {
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}

Animal duck = new Duck(); // (1)
Animal chicken = new Chicken(); // (2)
```

现在剩下就是让 AnimalSound 类的 makeSound 方法接收 Animal 类型的参数，而不是具体的 Duck 类型或者 Chicken 类型：

```java
public class AnimalSound {
  public void makeSound(Animal animal) { // 接收 Animal 类型的参数
    animal.makeSound(();
  }
}

public class Test {
  public static void main(String args[]) {
    Animal animalSound = new AnimalSound();
    Animal duck = new Duck();
    Animal chicken = new Chicken();
    animalSound.makeSound( duck ); // 输出嘎嘎嘎
    animalSound.makeSound( chicken ); // 输出咯咯咯
  }
}
```

#### JavaScript 的多态

从前面的讲解我们得知，<u>多态的思想实际上是把“做什么”和“谁去做”分离开来，要实现这一点，归根结底先要消除类型之间的耦合关系。</u>如果类型之间的耦合关系没有被消除，那么我们在 makeSound 方法中指定了发出叫声的对象是某个类型，它就不可能再被替换为另外一个类型。**在 Java 中，可以通过向上转型（继承抽象类、接口）来实现多态。**

<u>而 JavaScript 的变量类型在运行期是可变的。</u>一个 JavaScript 对象，既可以表示 Duck 类型的对象，又可以表示 Chicken 类型的对象，这意味着 JavaScript 对象的多态性是与生俱来的。

这种与生俱来的多态性并不难解释。<u>JavaScript 作为一门动态类型语言，它在编译时没有类型检查的过程，既没有检查创建的对象类型，又没有检查传递的参数类型。</u>在前面的代码示例中，我们既可以往 makeSound 函数里传递 duck 对象当作参数，也可以传递 chicken 对象当作参数。

<u>由此可见，某一种动物能否发出叫声，只取决于它有没有 makeSound 方法，而不取决于它是否是某种类型的对象，这里不存在任何成都上的 “类型耦合”。</u>这也是实现接口可以实现向上转型的原因。<u>在 JavaScript 中，并不需要诸如向上转型之类的技术来取得多态的效果。</u>

#### 多态在面向对象程序设计中的作用、

有许多人认为，多态是面向对象编程语言中最重要的技术。但我们目前还很难看出这一点，毕竟大部分人都不关心鸡是怎么叫的，也不想知道鸭是怎么叫的。让鸡和鸭在同一个消息之下发出不同的叫声，这跟程序员有什么关系呢？

Martin Fowler 在《重构：改善既有代码的设计》里写到：

<u>多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为——你只管调用该行为就是了，其他的一切多态机制都会为你安排妥当。</u>

换句话说，多态最根据本的作用就是通过<u>把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。</u>

Martin Fowler 的话可以用下面这个例子很好地诠释：

在电影的拍摄现场，当导演喊出“action” 时，主角开始背台词，照明师负责打灯光，后面的群众演员假装中枪倒地，道具师往镜头里撒上雪花。<u>在得到同一个消息时，每个对象都知道自己应该做什么。如果不利用对象的多态性，而是用面向过程的方式来编写这一段代码，那么相当于在电影开始拍摄之后，导演每次都要走到每个人的面前，确认它们的职业分工（类型），然后告诉他们要做什么。</u>如果映射到程序中，那么程序中将充斥着条件分支语句。

<u>利用对象的多态性，导演在发布消息时，就不必考虑各个对象接到消息后应该做什么。对象应该做什么并不是临时决定的，而是已经事先约定和排练完毕的。每个对象应该做什么，已经成为了该对象的一个方法，被安装到对象的内部，每个对象负责它们自己的行为。</u>所以这些对象可以根据同一个消息，有条不紊地分别进行各自的工作。

<u>将行为分布在各个对象中，并让这些对象各自负责自己的行为。</u>这正式面向对象设计的优点。

再看一个现实开发中遇到的例子，这个例子的思想和动物叫声的故事非常相似。

假设我们要编写一个地图应用。现在有两家可选的地图 API 提供商供我们接入自己的应用。目前我们选择的是谷歌地图，谷歌地图的 API 提示及了 show 方法，负责在页面上展示整个地图。

示例代码如下：

```js
var googleMap = {
  show: function() {
    console.log("开始渲染谷歌地图");
  }
};

var renderMap = function() {
  googleMap.show();
};

renderMap(); // 输出：开始渲染谷歌地图
```

后来因为某些原因，要把谷歌地图换成百度，为了让 renderMap 函数保持一定的弹性，我们用一些条件分支来让 renderMap 函数同时支持谷歌地图和百度地图：

```js
var googleMap = {
  show: function() {
    console.log("开始渲染谷歌地图");
  }
};

var baiduMap = {
  show: function() {
    console.log("开始渲染百度地图");
  }
};

var renderMap = function(type) {
  if (type === "google") {
    googleMap.show();
  } else if (type === "baidu") {
    baiduMap.show();
  }
};

renderMap("google"); // 输出开始渲染谷歌地图
renderMap("baidu"); // 输出开始渲染百度地图
```

可以看到，虽然 renderMap 函数目前保持了一定的弹性，但这种弹性是很脆弱的，一旦需要替换成搜搜地图，那无疑必须得改动 renderMap 函数，继续往里面堆砌条件分支语句。

我们还是先把程序中相同的部分抽象出来，那就是显示某个地图。

```js
var renderMap = function(map) {
  if (map.show instanceof Function) {
    map.show();
  }
};

renderMap(googleMap); // 输出：开始渲染谷歌地图
renderMap(baiduMap); // 输出：开始渲染百度地图
```

现在来找找这段代码中的多态性。当我们向谷歌地图对象和百度地图对象分别发出“展示地图”的消息时，会分别调用它们的 show 方法，就会产生各自不同的执行结果。<u>对象的多态性提示我们，“做什么” 和 “怎么去做”是可以分开的，</u>即使以后增加了搜索地图，renderMap 函数仍然不需要做任何改变，如下所示：

```js
var sosoMap = {
  show: function() {
    console.log("开始渲染搜搜地图");
  }
};

renderMap(sosoMap); // 输出：开始渲染搜搜地图
```

在这个例子中，我们假设每个地图 API 提供展示地图的方法名都是 show，在实际开发中不会如此顺利，这时候我们可以借助**适配器模式**来解决问题。

#### 设计模式与多态

GoF 所著的《设计模式》一书的副书名是“可复用面向对象软件的基础”。<u>该书完全是从面向对象设计的角度出发的，通过对封装、继承、多态、组合等技术的反复使用，提炼出一些可重复使用的面向对象设计技巧。而多态在其中又是重中之中，绝大部分设计模式的部分都离不开多态性的思想。</u>

拿命令模式来说，请求被封装在一些命令对象中，这使得命令的调用者和命令的接收者可以完全解耦开来，当调用命令的 `execute` 方法时，不同的命令会做不同的事情，从而会产生不同的执行结果。<u>而做这些事情的过程是早已被封装在命令对象内部的，作为调用命令的客户，根本不必去关心命令执行的具体过程。</u>

在组合模式中，<u>多态性使得客户可以完全忽略组合对象和叶子对象之间的区别</u>，这正是组合模式最大的作用所在。<u>对组合对象和叶子节点对象发出同一个消息的时候，它们会各自做自己应该做的事情，组合对象把消息继续转发给下面的叶子节点对象，叶子节点对象则会对这些消息作出真实的反馈。</u>

在策略模式中，<u>Context 并没有执行算法的能力，而是把这个职责委托给了某个策略对象。每个策略对象负责的算法已被各自封装在对象内部。当我们对这些策略对象发出“计算”的消息时，它们会返回各自不同的计算结果。</u>

在 JavaSc 这种将函数作为一等对象的语言中，函数本身也是对象，函数用来封装行为并且能够被四处传递。<u>当我们对一些函数发出“调用”消息时，这些函数会返回不同的执行结果，这是“多态性”的一种体现，也是很多设计模式在 JavaScript 可以用高阶函数来代替实现的原因。</u>（PS：例如 walkTree，传入不同的 callback 会返回不同的处理结果。）

#### 实战

##### 像下面这种应该如何处理呢？不属于多态的范畴。但是也是根据 layer 的类型，返回不同的实例化对象。

```js
/**
 * 创建图层
 * @param {String} layerType 图层类型
 * @param {Object} layerOption 图层的属性配置：type, url, opactiy, visible
 * @return 返回图层
 */
export const createLayer = async layerOption => {
  const { type, url } = layerOption;
  const {
    TileLayer,
    GraphicsLayer,
    MapImageLayer,
    FeatureLayer
  } = await loadModules(
    "esri/layers/TileLayer",
    "esri/layers/GraphicsLayer",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer"
  );
  const LayerConfig = {
    tileLayer() {
      const layer = new TileLayer({ url });
      if (layerOption.opacity) {
        layer.opacity = layerOption.opacity;
      }
      return layer;
    },
    dynamicLayer() {
      return new MapImageLayer({ url });
    },
    graphicsLayer() {
      return new GraphicsLayer();
    },
    featureLayer() {
      return new FeatureLayer({ url });
    }
  };

  if (LayerConfig[type]) {
    return LayerConfig[type](layerOption);
  } else {
    throw new Error(`创建图层${url}失败！`);
  }
};
```

优化后的代码，好处是抽象出 newMapLayer 保证这里不会被改动。

```js
export const createLayer = async (layerOption) => {
  const {
    TileLayer,
    GraphicsLayer,
    MapImageLayer,
    FeatureLayer,
  } = await loadModules(
    "esri/layers/TileLayer",
    "esri/layers/GraphicsLayer",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer"
  );
 // 实例化图层，不变的部分
  const newMapLayer = (layerClass, layOption) {
    if (Object.prototype.toString.call(layerClass) === 'object') {
      return new layerClass(layOption);
    } else {
      throw new Error("layerClass is undefined.");
    }
  }

  const { type, url } = layerOption;
  // 配置的图层，变的部分，用函数封装起来。策略模式。
  const LayerConfig = {
    tileLayer() {
      return newMapLayer(TileLayer, layerOption);
    },
    dynamicLayer() {
      return newMapLayer(MapImageLayer, layerOption)
    },
    graphicsLayer() {
      return newMapLayer(GraphicsLayer, layerOption)
    },
    featureLayer() {
      return newMapLayer(FeatureLayer, layerOption)
    },
  }
  // 返回图层对象
  if (LayerConfig[type]) {
    return LayerConfig[type](layerOption);
  } else {
    throw new Error(`创建图层${url}失败！`);
  }
}
```

##### 一段遍历树的回调函数

callback 函数对象

```js
const walkData = (data: any[], callback) => {
  data.forEach(item => {
    callback(item);
    if (item.children) {
      walkData(item.children);
    }
  });
};
walkData(data);
```

### 封装

#### 封装数据

#### 封装实现

#### 封装类型

#### 封装变化

### 原型模式和基于原型继承的 JavaScript 对象系统

### 闭包和高阶函数

## 接口和面向接口编程

当我们谈到接口的时候，通常会涉及以下几种含义，下面先简单介绍。

我们经常<u>说一个库或者模块对外提供了某某 API 接口。通过主动暴露的接口来通信，可以隐藏软件系统内部的工作细节。</u>

第二种接口是一些语言提供的关键字，比如 Java 的 interface。interface 关键字可以产生一个完全抽象的类。<u>这个完全抽象的类用来表示一种契约，专门负责建立类与类之间的联系。</u>如下面即将要说到的 Duck 类与 AnimalSound 类。

第三种接口即是<u>我们谈论的“面向接口编程”中的接口，接口的含义在这里提体现得更为抽象。</u>用《设计模式》中的话就是：

**接口是对象能响应的请求的集合**。

本章主要讨论的是第二种和第三种接口。首先要讲清楚的是，本章的前半部分都是针对 Java 语言的讲解，这是因为 JavaScript 并没有从语言层面提供对<u>抽象类（Abstract class）或者接口（interface）的支持，我们有必要从一门提供了抽象类和接口的语言开始，逐步了解“面向接口编程”在面向对象程序设计中的作用。</u>

### 回到 Java 的抽象类

首先让我们来回顾一下 1.2 节中的动物世界。目前我们有一个鸭子类 Duck，还有一个让鸭子发出叫声的 `AnimalSound` 类，该类有一个 `makeSound` 方法，接口 `Duck` 类型的对象作为参数，这几个类一直合作，代码如下：

```java
public class Duck { // 鸭子类
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}

public class AnimalSound {
  public void makeSound(Duck duck) {// 只接受 Duck 类型的参数
    duck.makeSound();
  }
}

public class Test {
  public static void main(String args[]) {
    AnimalSound animalSound = new AnimalSound();
    Duck duck = new Duck();
    animalSound.makeSound(duck); // 输出：嘎嘎嘎
  }
}
```

目前已经可以顺利地让鸭子发出叫声。后来动物世界那里又增加一些鸡，现在我们想让鸡也叫唤起来，<u>但发现这是一件不可能完成的事情，因为在上面这段代码的(1)处，即 AnimalSound 类的 sound 方法里，被规定只能接受 Duck 类型的对象作为参数：</u>

```java
public class Chicken {
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

public class Test {
  public static void main(String args[]) {
    AnimalSound animalSound = new AnimalSound();
    Chicken chicken = new Chicken();
    animalSound.makeSound( chicken );
    // 报错，animalSound.makeSound 只能接受 Duck 类型的参数
  }
}
```

<u>在享受静态语言类型检查带来的安全性的同时，我们也失去了一些编写代码的自由。</u>

通过前面基础知识封装一节，我们知道，<u>静态类型语言通常设计为可以“向上转型”。当给一个类变量赋值时，这个变量的类型既可以使用这个类本身，也可以使用这个类的超类。</u>就像看到天上有只麻雀，我们既可以说“一只麻雀在飞”，也可以说“一只鸟在飞”，甚至可以说成“一只动物在飞”。<u>通过向上转型，对象的具体类型被隐藏在“超类型”身后。**当对象类型之间的耦合关系被解除之后，这些对象才能在类型检查系统的监视下相互替换使用，这样才能看到对象的多态性**。</u>

所以如果想让鸡也叫唤起来，<u>必须先把 duck 对象和 chicken 对象都向上转型为它们的超类型 Animal
类，进行向上转型的工具就是抽象类或者 interface 。</u>我们随即使用的是抽象类。

先创建一个 Animal 抽象类：

```java
public abstract class Animal {
  abstract void makeSound(); // 抽象方法
}
```

然后让 Duck 类和 Chicken 类都继承自抽象类 Animal：

```java
public class Chicken extends Animal {
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

public class Duck extends Animal {
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}
```

<u>也可以把 Animal 定义为一个具体类而不是抽象类，但一般不这么做。Soctt Meyes 曾指出，只要有可能，不要从具体类继承。</u>（PS：具体类还有其他不需要继承的专门属性、方法，产生冗余）。

现在剩下的就是让 AnimalSound 类的 makeSound 方法接收 Animal 类型的参数，而不是具体 Duck 类型或者 Chicken 类型：

```java
public class AnimalSound {
  public void makeSound(Animal animal) {// 接收 Animal 类型的参数，而非 Duck 类型或 Chicken 类型
    animal.makeSound();
  }
}

public class Test {
  public static void main(String args[]) {
    AnimalSound animalSound = new AnimalSound();
    Animal duck = new Duck(); // 向上转型
    Animal chicken = new Chicken(); // 向上转型
    animalSound.makeSound( duck ); // 输出：嘎嘎嘎
    animalSound.makeSound( chicken ); // 输出：咯咯咯
  }
}
```

本节通过抽象类完成了一个体现对象多态性的例子。但目前的重点并非讲解多态，而是在于说明抽象类。抽象类在这里主要有以下两个作用。

- <u>向上转型。</u>让 Duck 对象 和 Chicken 对象的类型都隐藏在 Animal 类型身后，隐藏对象的具体类型之后，duck 对象和 chicken 对象才能被交换使用，这是让对象表现出多态性的必经之路。
- <u>建立一些契约。继承自抽象类的具体类都会继承抽象类型里的 abstract 方法，并且要求覆写它们。</u>这些契约在实际编程中非常重要，可以帮助我们编写可靠性更高的代码。比如在命令模式中，各个子命令都必须实现 execute 方法，才能保证调用 command.execute 的时候不会抛出异常。如果让子命令类 OpenTvCommand 继承自抽象类 Command：

```java
abstract class Command {
  public abstract void execute();
}

public class OpenTvCommand extends Command {
  public OpenTvCommand () {};
  public void execute();
  System.out.println("打开电视机");
}
```

<u>那么自然有编译器帮助我们检查和保证子命令类 OpenTvCommand 覆写了抽象类 `Command` 中的 `execute` 抽象方法。如果没有这样做，编译器回你尽可能早地抛出错误来提醒正在编写这段代码的程序员。</u>

<u>总而言之，不关注对象的具体类型，而仅仅针对超类型中的“契约方法”来编写程序，可以产生可靠性高的程序，也可以极大地减少子系统实现之间的相互依赖关系，</u>这就是我们本章要讨论的主题：

<u>面向接口编程，而不是面向实现编程。</u> （

ps：抽象类提供了接口：即遵守约定的契约行为，继承类实现了这个契约。从而可以让继承类对象相互替换使用。实现多态的效果。）

奇怪的是，本节我们一直讨论的是抽象类，跟接口又有什么关系呢？**实际上这里的接口并不是指 interface，而是一个抽象的概念。**

<u>从过程上来看，“面向接口编程”其实是“面向超类型编程”。当对象的具体类型被隐藏在超类型身后时，这些对象就可以相互替换使用，我们的关注点才能从对象的类型上转移到对象的行为上。</u>**“面向接口编程”也可以看成面向抽象编程**，即针对超类型中的 abstract 方法编程，接口在这里被当成 abstract 方法中约定的契约行为。<u>这些契约行为暴露了一个类或者对象能够做什么，但是不关心具体如何去做。</u>

### interface

除了用抽象类来完成面向接口编程之外，使用 `interface` 也可以达到同样的效果。虽然很多人在实际使用中刻意区分抽象类和 interface，<u>但使用 interface 实际上也是继承的一种方式，叫做接口继承。</u>

<u>相对于单继承的抽象类，一个类可以实现多个 `interface`。抽象类中除了 `abstract` 方法之外，还可以有一些供子类公用的具体方法。`interface` 使用抽象的概念更进一步，它产生一个完全抽象的类，不提供任何具体实现和方法体。（java8 已经有了提供实现方法的 interface），但允许该 interface 的创建者确定方法名、参数列表和返回类型，这相当于提供一些行为上的约定，但不关心该行为的具体实现过程。</u>

<u>`interface` 同样可以用于转型，这也是让对象表现出多态性的一条途径，实现了同一个接口的两个类就可以被相互替换使用。</u>

再回到用抽象类实现让鸭子和鸡发出叫声的故事。这个故事得以完美收场的关键是让抽象类 Animal 给 duck 和 chicken 进行向上转型。<u>但此时也引入了一个限制，抽象类是基于单继承，也就是说我们不可能让 Duck 和 Chicken 再继承另一个家禽类。如果使用 `interface`，可以仅仅针对发出叫声这个行为来编写程序，同时一个类也可以实现多个 `interface`</u>。

下面用 `interface` 来改写基于抽象类的代码。我们先定义 Animal 接口，所有实现了 Animal 接口的动物类都**将拥有 Animal 接口中约定的行为**。

```java
public interface Animal {
  abstract  void makeSound();
}

public class Duck implements Animal {
  public void makeSound() { // 重写 Animal 接口的 makeSound 抽象方法
    System.out.println("嘎嘎嘎");
  }
}

public class Chicken implements Animal {
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

public class AnimalSound {
  publi void makeSound(Animal animal) {
    animal.makeSound();
  }
}

public class Test {
  public static void main(String args[]) {
    AnimalSound animalSound = new AnimalSound();
    Animal duck = new Duck(); // 向上转型
    Animal chicken = new Chicken(); // 向上转型
    animalSound.makeSound( duck ); // 输出：嘎嘎嘎
    animalSound.makeSound( chicken ); // 输出：咯咯咯
  }
}
```

### JavaScript 是否需要抽象类和 interface

通过前面的讲解，我们明白了抽象类和 interface 的作用主要都是以下两点。

- 通过向上转型来隐藏对象的真正类型，以表现对象多态性。
- 约定类与类之间的一些契约行为。

对于 JavaScript 而言，因为 JavaScript 是一门动态类型语言，类型本身在 JavaScript 中是一个相对模糊的概念。<u>也就是说，不需要利用抽象类或者 interface 给对象进行 “向上转型”。</u>**除了 number、string、boolean 等基本数据类型之外，其他的对象都可以被看成“天生” 被 “向上转型” 成了 Object 类型。**

```js
var ary = new Array();
var date = new Date();
```

如果 JavaScript 是一门静态类型语言，上面的代码也许可以理解为：

```js
Array ary = new Array();
Date date = new Date();
```

或者：

```js
Object ary = new Array();
Object date = new Date();
```

很少有人在 JavaScript 开发中去关心对象的真正类型。在动态类型语言中，对象的多态性是与生俱来的，<u>但在另外一些静态类型语言中，对象类型之间的解耦非常重要，甚至有一些设计模式的主要目的就是专门隐藏对象的真正类型。</u>

<u>因为不需要向上转型，接口在 JavaScript 中的最大作用就退化到了检查代码的规范性。</u>比如检查某个对象是否实现了某个方法，或者检查是否给函数传入了预期类型的参数。如果忽略了这两点，有可能会在代码中留下一些隐藏的 bug。比如我们尝试执行 obj 对象的 show 方法，但是 obj 对象本身却没有实现这个方法，代码如下：

```js
function show(obj) {
  obj.show(); // Uncaught TypeError: undefined is not a function
}

var myObject = {}; // myObject 对象没有 show 方法
show(myObject);
```

或者

```js
function show(obj) {
  obj.show(); // TypeError: number is not a function
}

var myObject = {
  // myObject.show 不是 Function 类型
  show: 1
};
show(myObject);
```

<u>此时，我们不得不加上一些防御性代码：</u>

```js
function show( obj ) {]
  if ( obj && typeof obj.show === 'function') {
    obj.show();
  }
 }
```

或者

```js
function show(obj) {
  try {
    obj.show();
  } catch (e) {}
}

var myObject = {}; // myObject 没有 show 方法
// var myObject = { // myObject.show 补水 Function 类型
// show: 1
// }
show(myObject);
```

<u>如果 JavaScript 有编译器帮我们检查代码的规范性，那事情要比现在美好得多，我们不用在业务代码中到处插入一些跟业务逻辑无关的防御性代码。作为一门解释执行的动态类型语言，把希望寄托在编译器上是不可能了。如果要处理这类异常情况，我们只有手动编写一些接口检查的代码。</u>

### 用鸭子类型进行接口检查

回顾鸭子类型的概念：

“如果它走起来像鸭子，叫起来也是鸭子，那么它就是鸭子。”

<u>鸭子类型是动态类型语言面向对象设计中的一个重要概念。利用鸭子类型的思想，不必借助超类型的帮助，就能在动态类型语言中轻松实现本章提到的设计原则：面向接口编程，而不是面向实现编程。</u>比如，一个对象如果有 push 和 pop 方法，并且提供了正确的实现，它就能被当作栈来使用；一个对象如果有 length 属性，也可以依照下标来存取属性，这个对象就可以被当作数组来使用。如果两个对象拥有相同的方法，则有很大的可能性它们可以被相互替换使用。

<u>在 `Object.prototype.toString.call([]) === '[object Array]'` 被发现之前，我们经常用鸭子类型的来判断一个对象是否是一个数组，</u>代码如下：

```js
var isArray = function(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.length === "number" &&
    typeof obj.splice === "function"
  );
};
```

当然在 JavaScript 开发中，总是进行接口检查是不明智的，也是没有必要的，毕竟现在还找不到一种好用并且通用的方式来模拟接口检查，跟业务逻辑无关的接口检查也会让很多 JavaScript 程序员觉得不值得和不习惯。所以才会有 lodash 这样优秀的 js 库出现：

lodash 中的类数组判断

```js
const MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  // 正整数
  return (
    typeof value == "number" &&
    value > -1 &&
    value % 1 == 0 &&
    value <= MAX_SAFE_INTEGER
  ); // value % 1 必须是整数
}

function isArrayLike(value) {
  return value != null && typeof value != "function" && isLength(value.length); // 鸭子类型
}
```

### 用 TypeScript 编写基于 interface 的命令模式

虽然在大多数时候 `interface` 给 JavaScript 开发带来的价值并不像在静态类型语言中那么大，但如果我们正在编写一个复杂的应用，还是会经常怀念接口的帮助。

下面我们以基于命令模式的示例来说明 interface 如何规范程序的代码编写，这段代码本身没有说明实用价值，<u>在 JavaScript 中，我们一般用闭包和高阶函数来实现命令模式。</u>

为了防止粗心的程序员忘记在某个子命令对象实现 `execute` 方法，<u>我们只能在高层函数里添加一些防御性的代码，这样当程序在最终被执行的时候，有可能抛出异常来提醒我们，代码如下：</u>

```js
var setCommand = function(command) {
  document.getElementById("exeCommand").onClick = function() {
    if (typeof command.execute !== "function") {
      throw new Error("command 对象必须实现 execute 方法");
    }
    command.execute();
  };
};
```

如果确实不喜欢重复编写这些防御性代码，我们还可以尝试使用 TypeScript 来编写这个程序。

TypeScript 是微软开发的一种编程语言，是 JavaScript 的一个超集。跟 CoffeeScript 类似，TypeScript 代码最终会被编译成原生的 JavaScript 代码执行。<u>通过 TypeScript，我们可以使用静态语言的方式来编写 JavaScript 程序。用 TypeScript 来实现一些设计模式，显得更加原汁原味。</u>

TypeScript 目前的版本还没有提供对抽象类的支持，但是提供了 `interface`。下面我们就来编写一个 TypeScript 版本的命令模式。

首先定义 Command 接口：

```js
interface Command {
  execute: Function;
}
```

接下来定义 RefreshMenuBarCommand、AddSubMenuCommand 和 DelSubMenuCommand 这 3 个类，它们分别都实现了 Command 接口，这可以保证它们都拥有 execute 方法：

```ts
class RefreshMenuBarCommand implements Command {
  constructor() {}

  execute() {
    console.log("刷新菜单界面");
  }
}

class AddSubMenuCommand implements Command {
  constructor() {}

  execute() {
    console.log("增加子菜单");
  }
}

class DelSubMenuCommand implements Command {
  constructor() {}

  // 忘记重写 execute 方法
}

var refreshMenuBarCommand = new RefreshMenuBarCommand();
var addSubMenuCommand = new AddSubMenuCommand();
var delSubMenuCommand = new DelSubMenuCommand();

refreshMenuBarCommand.execute(); // 输出：刷新菜单界面
addSubMenuCommand.execute(); // 输出：添加子菜单
delSubMenuCommand.execute(); // Uncaught TypeError: undefined is not a function
```

当我们忘记在 DelSubMenuCommand 类中重写 execute 方法时，TypeScript 提供的编译器及时给出了错误提示。`Interface`在 ts 除了给予类实现外，也可以作为对象的类型声明，从而让对象也实现这个接口：

```ts
interface ArchiveDto {
  id: number; // id
  name: string; // 档案名称
  archiveCatalog: number; // 档案目录
  type: number; // 档案类型
  createDate: string; // 创建时间
}
class Vue {
  private selectedContactArchives: ArchiveDto[] = [];
}
```

这段 TypeScript 代码翻译过来的 JavaScript 代码如下：

es2017

```js
"use strict";
class RefreshMenuBarCommand {
    constructor() { }
    execute() {
        console.log("刷新菜单界面");
    }
}
class AddSubMenuCommand {
    constructor() { }
    execute() {
        console.log("增加子菜单");
    }

```

es5

```js
"use strict";
var RefreshMenuBarCommand = /** @class */ (function() {
  function RefreshMenuBarCommand() {}
  RefreshMenuBarCommand.prototype.execute = function() {
    console.log("刷新菜单界面");
  };
  return RefreshMenuBarCommand;
})();
var AddSubMenuCommand = /** @class */ (function() {
  function AddSubMenuCommand() {}
  AddSubMenuCommand.prototype.execute = function() {
    console.log("增加子菜单");
  };
  return AddSubMenuCommand;
})();
```

### 实战

使用 ts 编写接口，编译前后对比。

## 单一职责原则

## 最少知识原则

## 参考资料

- 《JavaScript 设计模式与开发实践》
