# Java

## 入门

![java 编译输出流程图](../.vuepress/public/images/java-compiler.png)

### Java 虚拟机(JVM)

`JVM` 是 `Java Virtual Machine（Java虚拟机）` 的缩写，JVM 是一种用于计算设备的规范，**它是一个虚构出来的计算机**，是通过在实际的计算机上仿真模拟各种计算机功能来实现的。

Java 语言的一个非常重要的特点就是**与平台的无关性**。**而使用 Java 虚拟机是实现这一特点的关键。**<u>一般的高级语言如果要在不同的平台上运行，至少需要编译成不同的目标代码。</u>而**引入 Java 语言虚拟机后，Java 语言在不同平台上运行时不需要重新编译。**

Java 语言使用 Java 虚拟机屏蔽了与具体平台相关的信息，使得 Java 语言编译程序**只需生成在 Java 虚拟机上运行的目标代码(字节码)**，就可以在多种平台上不加修改地运行。Java 虚拟机在执行字节码时，把字节码解释成具体平台上的**机器指令(机器码)**执行。这就是 Java 的能够“一次编译，到处运行”的原因。

源文件 =》 字节码 =》JVM 读取 =》 机器码

### 机器码和字节码

首先，我们知道一段程序要想在电脑上运行，必须“翻译”成电脑能够听懂的，由 0，1 组成的二进制代码，这种类型的代码即称为机器码，机器码是计算机可以直接执行的、速度最快的代码。
在 Java 中，编写好的程序即通常的 `.java`文件需要经过编译器编译成 `.class` 文件，这段 `.class` 文件是一段包含着虚拟机指令、程序和数据片段的二进制文件，即`字节码`，为什么叫字节码？因为这种类型的代码以`一个字节 8bit 为最小单位储存`。

随着 Java 的发展，SUN 给 Java 又分出了三个不同版本：

- Java SE：Standard Edition
- Java EE：Enterprise Edition
- Java ME：Micro Edition

```bash
┌───────────────────────────┐
│Java EE                    │
│    ┌────────────────────┐ │
│    │Java SE             │ │
│    │    ┌─────────────┐ │ │
│    │    │   Java ME   │ │ │
│    │    └─────────────┘ │ │
│    └────────────────────┘ │
└───────────────────────────┘
```

简单来说，`Java SE` 就是标准版，包含标准的 JVM 和标准库，而 `Java E`E 是企业版，它只是 Java SE 的<u>基础上加上了大量的 API 和库</u>，以便方便开发 Web 应用、数据库、消息服务等，Java EE 的应用使用的虚拟机和 Java SE 完全相同。

Java ME 和 Java SE 不同，它是一个针对嵌入式的设备的“瘦身版”，JavaSE 的标准库无法在 Java ME 上使用，<u>Java ME 的虚拟机也是“瘦身版”。</u>

毫无疑问，Java SE 是整个 Java 平台，而 Java EE 是进一步学习 Web 应用所必须的。<u>我们熟悉的 `Spring` 等框架都是 `Java EE` 开源生态系统的一部分。</u>而不幸的，Java ME 从来没有真正流行起来，反而是 Android 开发成为了移动平台的标准之一，因此，没有特殊需求，不建议学习 Java ME。

因此我们推荐的 Java 学习路线图如下：

1. 首先要学习 Java SE，掌握 `Java 语言本身`、Java `核心开发技术`以及 `Java 标准库`的使用。
2. 如果继续学习 Java EE，那么 `Spring 框架`、`数据库开发`、`分布式架构`就是需要学习的。
3. 如果需要学习大数据开发，那么 Hadoop、Spark、Flink 这些大数据平台就是需要学习的，他们都基于 Java 或 Scala 开发；
4. 如果想要学习移动开发，那么就深入 Android 平台，掌握 Android App 开发。

### Java 版本

Java 版本
从 1995 年发布 1.0 版本开始，到目前为止，最新的 Java 版本是 Java 13：

| 时间   | 版本      |
| ------ | --------- |
| 1995   | 1.0       |
| 1998   | 1.2       |
| 2000   | 1.3       |
| 2002   | 1.4       |
| 2004   | 1.5 / 5.0 |
| 2005   | 1.6 / 6.0 |
| 2011   | 1.7 / 7.0 |
| 2014   | 1.8 / 8.0 |
| 2017/9 | 1.9 / 9.0 |
| 2018/3 | 10        |
| 2018/9 | 11        |
| 2019/3 | 12        |
| 2019/9 | 13        |
| 2020/3 | 14        |

### 名词解释

初学者学 Java，经常听到 `JDK`、`JRE` 这些名词，它们到底是什么？

- JDK：Java Development Kit（编译、调试）
- JRE：Java Runtime Enviroment（虚拟机）

(浏览器的 v8 引擎，解释并执行)

二者关系如下：

```bash
  ┌─    ┌──────────────────────────────────┐
  │     │     Compiler, debugger, etc.     │
  │     └──────────────────────────────────┘
 JDK ┌─ ┌──────────────────────────────────┐
  │  │  │                                  │
  │ JRE │      JVM + Runtime Library       │
  │  │  │                                  │
  └─ └─ └──────────────────────────────────┘
        ┌───────┐┌───────┐┌───────┐┌───────┐
        │Windows││ Linux ││ macOS ││others │
        └───────┘└───────┘└───────┘└───────┘
```

简单说，<u>`JRE` 就是运行 Java 字节码的`虚拟机`。但是如果只有 Java 源码，要编译成 Java 字节码，就需要 `JDK`，因为 JDK 除了包含 JRE，还提供了`编译器`、`调试器`等工具。</u>

要学习 Java 开发，当然需要安装 JDK 了。

那 JSR、JCP...... 又是啥？

- JSR 规范：Java Specification Request
- JCP 组织：Java Community Process

为了保证 Java 语言的规范性，SUN 公司搞了一个 JSR 规范，凡是想给 Java 平台加一个功能，比如说访问数据库的功能，大家要先创建一个 JSR 规范，定义好接口，这样，<u>各个数据库厂商都按照规范写出 Java 驱动程序，</u>开发者就不用担心自己写的数据库代码在 MySQL 上能跑，却不能跑在 PostgreSQL 上。

所以 JSR 是一系列的规范，为了

一个 JSR 规范发布时，为了让大家有个参考，还要同时发布一个“参考实现”，以及一个“兼容性测试套件”：

- RI：Reference Implementation
- TCK：Technology Compatibility Kit

比如有人提议要搞一个基于 Java 开发的消息服务器，这个提议很好啊，但是光有提议还不行，得贴出真正能跑的代码，这就是 RI。如果有其他人也想开发这样一个消息服务器，如何保证这些消息服务器对开发者来说接口、功能都是相同的？所以还得提供 TCK。

通常来说，RI 只是一个“能跑”的正确的代码，它不追求速度，所以，如果真正要选择一个 Java 的消息服务器，一般是没人用 RI 的，大家都会选择一个有竞争力的商用或开源产品。

### 编译器和解释器

#### 编译器

编译是从源代码（通常为**高级语言**）到能直接被计算机或虚拟机执行的目标代码（通常为**低级语言或机器语言**）的翻译过程。

#### 解释器

将相对高级的程序代码解释成电脑可以直接运行的机器码。

以 Java 为 例：

电脑是不能直接执行 Java 程序的，一个 `.java` 程序要想被执行，首先需要编译器将高级的 `.java` 程序文件编译成 `.class字节码`片段，字节码经过 `JVM(解释器)` 的处理后生成电脑可以直接执行的`机器码`，至此 `java程序` 才能得以正确运行。

#### 问题

##### C 有编译器，Python 有解释器，Java 有虚拟机，但这三个在原理上有区别和联系呢？尤其是从代码到底层机器运行的过程。

- 对于 C#，它源文件是通过 .Net 语言的编辑器（如 Visual Studio）下生成`可执行程序`或 `DLL`，而 C# 可以通过 Unity 引擎编译成不同的平台目标代码。
- `eclipse` 编译器自带了编译以及 jvm 的运行环境。

- `编译器`：把代码从这种语言改成哪种语言。

-（现代）解释器：`编译器`和`虚拟机`写在一起。

- `虚拟机`：通常指的是运行指令那样的`低级语言`。

因此，java 有 jvm 虚拟机可以跨平台，其他语言如 c、c#、python、js（v8 引擎解析）只要有现代（解释器）也一样可以跨平台执行中间代码，也不需要编译成适合平台的目标代码。例如，浏览器几乎是每台电脑上都可以安装，然后 v8 引擎解释执行 JavaScript 代码。

编译型语言如 C、C++、C#，<u>代码是直接编译成机器码运行，</u><u>但是不同的平台（x86、ARM 等）CPU 的`指令集`不同（还有就是同一个操作系统还分 x86、x64）</u>，因此，<u>需要编译出每一种平台的对应机器码</u>。解释型语言如 Python、Ruby 没有这个问题，可以由解释器加载源码然后运行，<u>代价是运行效率太低。</u>
Java 因为 JVM 运行效率高，原因是 Java 将代码编译成一种`“字节码”`，它类似于`抽象的 CPU 指令`，<u>然后针对不同平台编写虚拟机，</u>不同平台的虚拟机负责加载字节码并执行，这样就实现了“一次编写，到处运行”的效果。当然，这是针对 Java 开发者而言。<u>对于虚拟机，需要为每个平台分别开发。</u>为了保证不同平台、不同公司开发的虚拟机都能正确执行 Java 字节码，SUN 公司指定了一系列的 Java 虚拟机规范。（这个跟 W3C 制作不少规范，让浏览器去实现的道理一样）。从实践的角度看，`JVM` 的兼容性做得非常好，低版本的 Java 字节码完全可以正常运行在高版本的 JVM 上。

### 安装 JDK

因为 Java 程序必须运行在 JVM（JDK 中的 JRE），所以，我们第一件事情就是安装 JDK。

搜索 JDK 14，确保从 [Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) 的官网下载最新的稳定版 JDK：

#### 设置环境变量

安装完 JDK 后， 需要设置一个 `JAVA_HOME` 的环境变量，它指向 JDK 的安装目录。把 `JAVA_HOME` 的 `bin` 目录添加到系统的 `PATH` 中是为了在任意文件夹下都可以运行 `java`。

在 Mac 下，它在 `~/.bash_profile` 或 `~/.zprofile` 里，下面的命令设置默认的 `JAVA_HOME` 指向 `14`，并写入到 `~/.bash_profile` 文件中（这个文件是 Shell 配置文件，也可以看到其他程序的配置，如 vscode）

```bash
echo 'export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-14.0.1.jdk/Contents/Home"' >> ~/.bash_profile
```

然后，把 `JAVA_HOME` 的 `bin` 目录附加到系统变量 `PATH` 上。

```bash
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bash_profile
```

打开命令行终端，输入命令 `java -version`，如果一切正常，你会看到如下输出。

```bash
java -version # 查看默认的 Java_Home，即当前的运行环境
# java version "14" ...
#Java(TM) SE Runtime Environment
# Java HotSpot(TM) 64-Bit Server VM
```

也可以使用 `echo $JAVA_HOME` 查看默认的 java 版本。

```bash
/Library/Java/JavaVirtualMachines/jdk-14.0.1.jdk/Contents/Home
```

另外可以使用 -V 选项列出所有版本的 `JAVA_HOME`，列出所有的 `JAVA_HOME` 指向的 JDK 安装目录：

```bash
/usr/libexec/java_home -V

Matching Java Virtual Machines (2):
    14.0.1, x86_64:	"Java SE 14.0.1"	/Library/Java/JavaVirtualMachines/jdk-14.0.1.jdk/Contents/Home
    1.8.0_191, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home
```

（其实 JDK 跟前端工程化安装 Node 环境一样类似。）

如果你看到的版本号不是 `14`，而是`12`、`1.8`之类，说明系统存在多个 JDK，且默认 JDK 不是 JDK 14，需要把 JDK 14 提到 PATH 前面。

为了快速切换 java 版本，在 Mac 上可以使用 `jEnv` 工具。

1. 安装 jenv（类似 nvm 管理 node 版本工具，但 jenv 只能管理版本，并不能安装 JDK。）
2. 配置环境变量

```bash
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(jenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
```

3. 添加版本 `jenv add jdk安装的路径 # 这里的路径`，可以通过运行 `/usr/libexec/java_home -V` 查找 `JDK` 路径

```bash
jenv add /Library/Java/JavaVirtualMachines/jdk-14.0.1.jdk/Contents/Home
oracle64-14.0.1 added
14.0.1 added
14.0 added
```

4. 通过安装 jenv 插件，切换 JDK 版本时，将会同步设置 `${JAVA_HOME}` 变量。

```bash
jenv enable-plugin export
## 运行这个才会生效
```

4. 查看当前系统 jenv 管理所有 JDK 版本。

```bash
jenv versions
```

5. 切换版本

```bash
jenv local xxx # 这里需要注意的，jenv local 切换 JDK 版本只对当前文件夹有效,如果切换到其他文件夹，将会切换会当前默认 JDK 版本
jenv global xxxx # jenv global 将会设置一个全局默认的 JDK 版本，即使重启 Shell 窗口，该配置也不会改变
```

#### JDK

在 `JAVA_HOME` 指向 JDK 的 `bin` 目录下可以周到很多可执行文件：

- **java**：这个可执行程序其实就是 JVM，运行 Java 程序，就是启动 JVM ，然后让 JVM 执行指定的编译后的代码；
- **javac**：这是 Java 的编译器，它用于把 Java 源码文件（以 `.java` 后缀结尾）编译为 Java 字节码文件（以 `.class`后缀结尾）；
- **jar**：用于把一组 `.class` 文件打包成一个 `.jar` 文件，便于发布；
- **javadoc**：用于从 Java 源码中自动提取注释并生成文档；
- **jdb**：Java 调试器，用于开发阶段的运行调试。

### 第一个 Java 程序

```java
public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello, word!");
  }
}
```

在一个 Java 程序中，你总能找到一个类似：

```java
public class Hello {
  ...
}
```

的定义，这个定义被称为 class(类)，这里的类名是 `Hello`，大小写敏感，`class` 用来定义一个类，`public` 表示这个类是公开的，`public`、`class` 都是 Java 的关键字，必须小写，`Hello` 是类的名字，按照习惯，首字母 `H` 要大写。而花括号 `{}` 中间则是类的定义。

注意到类的定义中，我们定义了一个名为 `main` 的方法：

```java
public static void main(String[] args) {
  ...
}
```

方法是可执行的代码块，一个方法除了`main`，还有用 `()` 括起来的方法参数参数类型是 `String[]`，参数名是 `args`，`public`，`static` 用来修饰方法，这里表示它是一个公开的静态方法，`void` 是方法的返回类型，而花括号 `{}` 中间的就是方法的代码。

方法的代码每一行用 `;` 结束，这里只有一行代码，就是

```java
System.out.println("Hello, world!");
```

<u>Java 规定，某个类定义的 `public static void main(String[] args)` Java 程序的`固定入口`方法，因此，Java 程序总是从 `main` 方法执行的。</u>

注意到 Java 源码的缩进不是必须的，但是用缩进后，格式好看，很容易看出代码块的开始和结束，缩进一般是 4 个空格或者一个 tab。（生产环境下，则经过压缩，去掉不必要的空白符。）

最后，<u>当我们把代码保存为文件时，文件名必须时 `Hello.java`，而且文件名也要注意大小写，因为要和我们定义的类名 `Hello` 完全保持一致。</u>

#### 如何运行 Java 程序

Java 源码本质上是一个文本文件，我们需要先用 `javac` 把 `Hello.java` 编译成字节码文件 `Hello.class` ，然后，用 `java` 命令执行这个字节码文件：

```bash
┌──────────────────┐
│    Hello.java    │<─── source code
└──────────────────┘
          │ compile
          ▼
┌──────────────────┐
│   Hello.class    │<─── byte code
└──────────────────┘
          │ execute
          ▼
┌──────────────────┐
│    Run on JVM    │
└──────────────────┘
```

因此，可执行文件 `javac` 是编译器，而可执行文件 `java` 就是虚拟机。

第一步，在保存呢 `Hello.java` 的目录下执行命令：

```bash
$ javac Hello.java
```

如果源代码无误，上述命令不会有任何输出，而当前目录下会产生一个 `Hello.class` 文件：

```bash
$ ls
Hello.class Hello.java
```

第二步：执行 `Hello.class`，使用命令：

```
$ java Hello
Hello, world!
```

<u>注意：给虚拟机传递的参数 `Hello` 是我们定义的类名，虚拟机自动查找对应的 class 文件并执行。</u>

另外，直接运行 `java Hello.java` 也是可以的：

```bash
$ java Hello.java
Hello, world!
```

这是 Java 11 新增的一个功能，它可以直接运行一个单文件源码！

<u>需要注意的是，在实际项目中，单个不依赖第三方库的 Java 源码是非常罕见的，所以，绝不大多数情况下，我们无法直接运行一个 Java 源码文件，原因是它需要依赖其他的库。</u>

（备注：TODO，怎么运行，需要用例子来证明。）

打包 `jar` 文件命令：

```bash
$ jar cvf test.jar Hello.class
```

<!-- 第三库是打包成 `.class` 的 jar 包，因此可以使用命令行这样
```bash
// 同一目录
```
```
$ java -classpath xxxx.jar
// 不同目录
$ java
``` -->

如果要利用原始的 javac 编译整个 Java 项目，可以看这篇文章利用脚本批量编译。[利用原始的 javac 编译整个 Java 项目](https://zhuanlan.zhihu.com/p/29345229)，这也是有应用场景的，当你要部署的主机上没有任何软件。

（Java 中的 package 和 import，跟 C# 的 namespace 和 using 类似？后续研究）

#### 小结

- 一个 Java 源码只能定义一个 `public` 类型的 class，并且 class 名称和文件名要完全一致；
- 使用 `javac` 可以 `.java` 源码编译成 `.class` 字节码；
- 使用 `java` 可以运行一个已编译的 Java 程序，参数是类名。

### 使用 IDE

IDE 是集成开发环境：Integrated Development Environment 的缩写。

使用 IDE 的好处在于，<u>可以把编写代码、组织项目、编译、运行、调试等放到一个环境中运行，能极大地提高开发效率。</u>

IDE 提升开发效率主要靠以下几点：

- 编辑器的自动提示，可以大大提高敲代码的速度；
- 代码修改后可以自动重新编译，并直接运行；
- 可以方便地进行断点调试。

目前，流行的用于 Java 开发的 IDE 有：

**Eclipse**

[Eclipse](https://www.eclipse.org/) 是由 IBM 开发并捐赠给开源社区的一个 IDE，也是目前应用最广泛的 IDE。Eclipse 的特点是它本身是 Java 开发的，并且基于插件结构，即是对 Java 开发的支持也是通过插件 `JDT` 实现的。

**IntelliJ Idea**

[IntelliJ Idea](https://www.jetbrains.com/idea/) 是由 JetBrains 公司开发的一个功能强大的 IDE，分为免费版和商用付费版。JetBrains 公司的 IDE 平台也是基于 IDE
平台 + 语言插件的模式，支持 Python 开发环境、Ruby 开发环境、PHP 开发环境等，这些开发环境也分为免费版和付费版。

**NetBeans**

[NetBeans](https://netbeans.org/) 是最早由 SUN 开发的开源 IDE，由于使用人数较少，目前已不再流行。

[Eclipse](Eclipse) 是由 JetBrains 公司开发的一个功能强大的 IDE

#### 使用 Eclipse

- 完全免费
- 所有功能完全满足 Java 开发需求。

#### 安装 Eclipse

下载的版本是：Eclipe IDE for Java Developers：

![](../.vuepress/public/images/2020-05-18-23-21-19-java-developers.png)

#### 设置 Eclipse

下载并安装完成后，我们启动 Eclipse，对 IDE 环境做一个基本设置：

选择菜单“Eclipse” - “Preferences”，打开配置对话框：

![](../.vuepress/public/images/2020-05-18-23-25-52-eclipse-setting-01.png)

我们需要调整以下设置项：

##### General > Editors > Text Editors

钩上“Show me line numbers”，这样编辑器会显示行号；

##### General > Workspace

钩上“Refresh using native hooks or polling”，这样 Eclipse 会自动刷新文件夹的改动；

![](../.vuepress/public/images/2020-05-18-23-30-36-eclipse-setting-02.png)

对于 “Text file encoding”，如果 Default 不是 `UTF-8`，一定要改为“Ohter：UTF-8”，所有文本你文件均使用 `UTF-8` 编码；

对于 “New text file line delimiter”，建议使用 Unix，即换行符使用 `\n` 而不是 Windows 的 `\r\n`。

##### Java > Compiler

将 “Complier compliance level” 设置为 `14`，去掉“Use default compliance settings” 并钩上“Enable preview features for Java 14”，这样我们就可以使用 Java 14 的预览功能。

![](../.vuepress/public/images/2020-05-16-16-33-22-eclipse-jre-setting.png)

上图是 eclipse 添加安装到主机上的 jre ，供 eclipse 环境选择。IDE 工具并不是说编译、运行的 `JRE` 环境都安装了，它只不过是把前面安装的 JDK 工具引用集成到工具中，便于开发。（例如 visual studio code 运行 node 程序，也要先在电脑上安装了 Node.js 的编译运行环境，v8 引擎。）

然后进行 Java Compile 版本的设置

Eclipse 中 普通 Java 工程与 Java EE 工程 Java Compile 版本设置时是分开的。

普通 Java 工程

- Properties > Java Compiler

J2EE 工程

- Properties -> Project Facets -> Java facet

![](../.vuepress/public/images/2020-05-19-00-20-48-eclipse-setting-03.png)

### 使用 IDE 练习插件

Eclipse 安装反编译插件，查看 `.class` 文件的源码

#### 安装 IDE 练习插件

Eclipse 插件是什么？

- [Eclipse 插件开发基础实践（1）——一个 Hello World 插件](https://www.jianshu.com/p/11fe13b77777)
- [21 款好用的 Eclipse 插件](https://juejin.im/entry/5a055c3af265da4312806086)
- [Eclipse 插件终极攻略（一）:基本概念介绍](https://blog.csdn.net/canlets/article/details/27568885)

启动 Eclipse，选择菜单”Help“ - ”Install New Software...“，在打开的对话框：

点击 “Add”，对 Name 填写一个任意的名称，例如“Java Practive Plugin”，对于 Location，填入`https://liaoxuefeng.gitee.io/learn-java-update-site/`，然后点击“Add” 添加：

如果出现了该网站地址不可访问，可以到[https://gitee.com/liaoxuefeng/learn-java-update-site](https://gitee.com/liaoxuefeng/learn-java-update-site) 直接下载源码解压，然后从本地导入进来。

![](../.vuepress/public/images/2020-05-19-20-48-46-eclipse-install-software.png)

在列表中选中”Java Practice Feature“，然后点击”Next“ 安装。

在安装过程中，由于插件代码没有数字签名，所以会弹出一个警告：

![](../.vuepress/public/images/2020-05-19-20-52-38-eclipse-install-software-02.png)

选择 ”Install anyway“ 继续安装，安装成功后，根据提示重启 Eclipse 即可。

![](../.vuepress/public/images/2020-05-19-20-56-17-eclipse-install-software-03.png)

重启 Eclipse 后，选择菜单 ”Window“ - ”Show View（视图）“ - ”Other...“

![](../.vuepress/public/images/2020-05-19-20-57-32-eclipse-software-install-04.png)

#### 导入练习

在 “Java Practice” 面板中，双击 “hello.zip”，按照提示导入工程，即可直接下载并导入到 Eclipse 中：

![](../.vuepress/public/images/2020-05-20-23-49-43-java-import-project.png)

## 基础

### Java 程序基本结构

```java
/**
 *
 *
 * @author
 */
public class Main {

	public static void main(String[] args) {
		System.out.println("Hello Java!");
	}

}

```

因为 Java 是面向对象的语言，一个程序的基本单位就是 `class`，`class` 是关键字，这里定义的 `class` 名字就是 `Hello`：

```java
public class Hello { // 类名是 Hello
  // ...
  // class 定义结束
}
```

注意到 `public` 是访问修饰符，表示该 `class` 是公开的。

不写 `public`，也能正确编译，但是这个类将无法从命令行执行。（测试后，可以从命令行进行）

在 Eclipse 中提交了快捷键 `Ctrl + Shift + F`（macOS 是 ⌘+⇧+F）帮助我们快速格式代码的功能。Eclipse 应该也有类似的插件如 vscode 中的 preitter 等格式化代码。

### 变量和数据类型

#### 什么是变量？

变量就是初中数学的代数的概念，例如一个简单的方程，x，y 都是变量：

y = x^2 + 1

在 Java 中，变量分为两种：`基本类型`的变量和`引用类型`的变量。

执行 `int n = 100;`，该语句定义了变量 `n`，同时赋值为 `100`，因此，JVM 在内存中为变量 `n` 分配一个`存储单元`，填入值 `100`

```bash
      n
      │
      ▼
┌───┬───┬───┬───┬───┬───┬───┐
│   │100│   │   │   │   │   │
└───┴───┴───┴───┴───┴───┴───┘
```

#### 基本类型

<u>基本数据类型是 CPU 可以直接运算的类型。</u>Java 定义了以下几种基本数据类型：

- 整数类型：byte，short，int，long
- 浮点数类型：float，double
- 字符类型：char
- 布尔类型：boolean

Java 定义的这些基本数据类型有什么区别呢？要了解这些区别，我们就必须简单了解一下计算机内存的基本结构。

计算机内存的`最小存储单元`是`字节（byte）`，一个字节就是一个 8 位二进制数，即 `8` 个 `bit`。它的二进制表示范围从 `00000000`~`11111111`，换算成十进制是 `0~255`，换算成十六进制是 `00`~`ff`。

`内存单元`从 0 开始编号，称为`内存地址`。每个内存单元可以看作一间房间，内存地址就是门牌号。

```bash
  0   1   2   3   4   5   6  ...
┌───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │   │   │   │...
└───┴───┴───┴───┴───┴───┴───┘
```

<u>一个字节是 1 `byte`，1024 字节是 1k，1024K 是 1M，1024M 是 1G，1024G 是 1T</u>。一个拥有 4T 内存的计算机的字节数量就是：

```bash
4T = 4 x 1024G
   = 4 x 1024 x 1024M
   = 4 x 1024 x 1024 x 1024K
   = 4 x 1024 x 1024 x 1024 x 1024
   = 4398046511104
```

不同的数据离诶行占用的字节数不一样呢。我们看一下 Java 基本数据类型占用的字节数：

```bash
       ┌───┐
  byte │   │
       └───┘
       ┌───┬───┐
 short │   │   │
       └───┴───┘
       ┌───┬───┬───┬───┐
   int │   │   │   │   │
       └───┴───┴───┴───┘
       ┌───┬───┬───┬───┬───┬───┬───┬───┐
  long │   │   │   │   │   │   │   │   │
       └───┴───┴───┴───┴───┴───┴───┴───┘
       ┌───┬───┬───┬───┐
 float │   │   │   │   │
       └───┴───┴───┴───┘
       ┌───┬───┬───┬───┬───┬───┬───┬───┐
double │   │   │   │   │   │   │   │   │
       └───┴───┴───┴───┴───┴───┴───┴───┘
       ┌───┬───┐
  char │   │   │
       └───┴───┘
```

`byte` 恰好就是一个字节，而 `long` 和 `double` 需要 8 个字节。

#### 整型

对于整型类型，Java 只定义了带符号的整型。因此，最高位的 bit 表示符号位（0 表示正数，1 表示负数）。各种整型的最大范围如下：

- byte：-128 ～ 127
- short：-32768 ～ 32767
- int：-2147483648 ～ 2147483647
- long：-9223372036854775808 ~ 9223372036854775807

long 型的结尾需要加 L。

特别注意：同一个数的不同进制的表示是完全相同的，例如 `15` = `0xf` = `0b1111`。

#### 浮点型

浮点类型的数就是`小数`，<u>因为小树用科学计数法表示的时候，小数点是可以“浮动”</u>的，如 1234.5 可以表示成 12.345 _ 10^2，也可以表示成 1.2345 _ 10^3，所以称为浮点数。

```java
float f1 = 3.14f;
float f2 = 3.14e38f; // 科学计数法表示的 3.14*10^38
double d = 1.79e308;
double d2 = -1.79e308;
double d3 = 4.9e-324 // 科学计数表示的 4.9*10^-324
```

浮点数可表示的范围非常大，`float` 类型可最大表示 3.4 * 10^38，而 `double` 类型可最大表示 1.79*10^308。

计算：对于单精度浮点数（float）来说，有百一位符号位，指数位共 8 位，尾数共 23 位。指数能够表示的指数度范围为-128~127。尾数为 23 位。当尾数全 1 时再加上小数点知前面的 1，指数取到最大正数 127（8 位，正数最大 127，负数最小-128）,浮点数取得正数的最大值。

+1.111111111111111111111*2^道 127（1.后面 23 个 1，由于尾数的范围 1 ～ 2，其最高位总为 1，故只需存取小数部分，所以小数为版是 23 位 1），约等于 2*2^127=3.4*10^38。为 3.4*10^38 负数亦然。

Double 的计算与此类似，double 的符号位为 63 位，指数为 62 ～ 52 位，共权 11 位。表示的范围为-1024 ～ 1023。尾数为 51 ～ 0。表示的范围为+1.111111111111111111111*2^1023（1.后面 52 个 1）为 1.7*10^308。负数亦然。

#### 布尔类型

#### 字符类型

#### 引用类型

#### 常量

#### var 关键字

#### 变量的作用域范围

### 整数运算

### 浮点数运算

### 布尔运算

### 字符和字符串

### 数组类型

## 类与对象

## 异常处理

## 反射

## 注解

## 泛型

## 集合

## IO

### 基础

IO 是指 Input/Output，即输入和输出。以内存为中心：

- Input 指从`外部`读入数据`到内存`，例如，把文件从磁盘读取到内存，从网络读取数据到内存等等。
- Output 指从`内存`输出`到外部`，例如，把数据从内存写入到文件，把数据从内存输出到网络等。

为什么要把数据读到内存才能处理这些数据？因为代码是在内存中运行的，数据也必须读到内存，最终的表示方式无非是 `byte 数组`，`字符串`等，都必须存放到内存里。

从 Java 代码来看，输入实际上就是从外部，例如，硬盘上的某个文件，把内容读到内存，并且以 Java 提供的某种数据类型表示，例如，`byte[]`，`String`，这样，后续代码才能处理这些数据。

因为内存有“易失性”的特点，所以必须要把处理后的数据以某种方式输出，例如，写入到文件。Output 实际上就是把 Java 表示的数据格式，例如 `byte[]`，`String[]` 等输出到某个地方。

`字节`是最基本的计量单位，你可以使用`字节数组`来存储`二进制数据`的`集合`，例如文件的内容。这样做的缺点是<u>必须把`整个文件内容加载到内存中`。</u>对于大量二进制数据，如果语言支持，最好使用`流数据模型`。

IO 流是一种顺序读写数据的模式，它的特点是`单向流动`。数据类似自来水一样在水管中流动，所以我们把它称为 `IO 流`。

![](../.vuepress/public/images/2020-06-22-14-47-47-water.png)

#### InputStream/OutputStream

IO 流以 `byte（字节）`为最小单位，因此也称为`字节流`。例如，我们要从磁盘上读入一个文件，包含 6 个字节，就相当于读入了 6 个字节的数据。

```ascii
╔════════════╗
║   Memory   ║
╚════════════╝
       ▲
       │0x48
       │0x65
       │0x6c
       │0x6c
       │0x6f
       │0x21
 ╔═══════════╗
 ║ Hard Disk ║
 ╚═══════════╝
```

这 6 个字节是按顺序读入的，所以是输入字节流。

反过来，我们把 6 个字节从内存写入磁盘文件，就是输出字节流：

```ascii
╔════════════╗
║   Memory   ║
╚════════════╝
       │0x21
       │0x6f
       │0x6c
       │0x6c
       │0x65
       │0x48
       ▼
 ╔═══════════╗
 ║ Hard Disk ║
 ╚═══════════╝
```

在 Java 中，`InputStream` 代表输入字节流，`OutStream` 代表输出字节流，这是最基本的两种 IO 流。

#### Reader/Writer

如果我们需要读写的是字符，并且字符不全是单字节表示 ASCII 字符，那么，按照 `char` 来读写显然更方便，这种流称为 `字符流`。

例如，我们把 `char[]` 数组 `Hi你好`这 4 个字符用 `Writer` 字符流写入文件，并且使用 `UTF-8` 编码，得到最终文件内容是 8 （1+1+3+3）个字节，英文字符 `H` 和 `i` 各占一个字节，中文字符`你好`各占 3 各字节。

下面是 16 进制的表示

```bash
0x48
0x69
0xe4bda0
0xe5a5bd
```

反过来，我们用 `Reader` 读取以 `UTF-8` 编码的这 8 个字节，会从 `Reader` 中得到 `Hi你好` 这 4 个字符。

`Reader` 和 `Writer` 本质上是一个能自动`编解码`的 `InputStream` 和 `OutputStream` 。

使用 `Reader`，`数据源`虽然是字节，但我们读入的数据都是 `char` 类型的字符，<u>原因是 `Reader` 内部把读入的 `byte` 做了解码，转换成了 `char`。</u>使用 `InputStream`，我们读入的数据和原始二进制数据一摸一样，是 `byte[]` 数组，但是我们可以自己把二进制 `byte[]` 数组按照某种编码转换为字符串。<u>究竟使用 `Reader` 还是 `InputStream`，要取决于具体的使用场景。如果数据源不是文本，就只能用 `InputStream`，如果数据源是文本，使用 `Reader` 更方法一些。`Writer` 和 `OutputStream` 是类似的。</u>

#### 同步和异步

同步 IO 是指，读写 IO 时代码必须等待数据返回后才继续执行后续代码，它的优点是代码编写简单，缺点是 CPU 执行效率低。

而异步 IO 是指，读写 IO 时仅发出请求，然后立刻执行后续代码，它的优点是 CPU 执行效率高，缺点是代码编写复杂。

Java 标准库的包 `java.io` 提供了同步 IO，而 `java.nio` 则是异步 IO。上面我们讨论的 `InputStream`、`OutputStream`、`Reader` 和 `Writer` 都是同步 IO 的抽象类，对应的`具体实现类`，以文件为例，有 `FileInputStream`、`FileOutputStream`、`FileReader` 和 `FileWriter`。

#### 小结

IO 流是一种流式的数据输入/输出模型：

- 二进制数据以 `byte` 为最小单位在 `InputStream`/`OutputStream` 中单向流动；
- 字符数据以 `char` 为最小单位在 `Reader`/`Writer` 中单向流动。

Java 标准库的 `java.io` 提供了同步功能的 IO 功能：

- 字节流接口：`InputStream`/`OutputStream`
- 字符流接口：`Reader`/`Writer`

### File 对象

在计算机系统中，文件是非常重要的存储方式。Java 的标准库 `java.io` 提供了 `File` 对象来操作文件和目录。

要构造一个 `File` 对象，需要传入文件路径：

注意 Windows 平台使用 `\` 作为路径分隔符，在 Java 字符串中需要用 `\\` 表示一个 `\`。Linux 平台使用 `/` 作为路径分隔符：

可以用 `.` 表示当前目录，`..` 表示上级目录。

#### 文件和目录

#### 创建和删除文件

#### 遍历文件和目录

### InputStream

InputStream 就是 Java 标准库提供的最基本的输入流。它位于 java.io 这个包里。java.io 包提供了所有同步 IO 的功能。

要特别注意的一点是，InputStream 并不是一个接口，而是一个抽象类，它是所有输入流的超类。这个抽象类定义的一个最重要的方法就是 int read()，签名如下：

```java
public abstract int read() throws IOException;
```

`这个方法读取输入流的下一个字节，并返回字节表示的`int`值（0 ～ 255）。`如果已读到末尾，返回`-1` 表示不能继续读取了。

`FileInputStream` 是 InputStream 的一个子类。顾名思义，FileInputStream 就是从文件流中读取数据。

```java
public void readFile() throws IOException {
    // 创建一个FileInputStream对象:
    InputStream input = new FileInputStream("src/readme.txt");
    for (;;) {
        int n = input.read(); // 反复调用read()方法，直到返回-1
        if (n == -1) {
            break;
        }
        System.out.println(n); // 打印byte的值
    }
    input.close(); // 关闭流
}
```

在计算机中，类似文件、网络端口这些资源，都是由操作系统统一管理的。应用程序在运行的过程中，如果打开了一个文件进行读写，完成后要及时地关闭，以便让操作系统把资源释放掉，否则，应用程序占用的资源回越来越多，不但白白占用内存，还会影响其他应用程序的运行。

`InputStream` 和 `OutputStream` 都是通过 `close()` 方法来关闭流。关闭流就会释放对应的底层资源。

利用 Java 7 引入的新的 `try(resource)` 的语法，只需要写 `try` 语句，让编译器自动为我们关闭资源（无论读取过程中是否发生了 IO 错误）。

```java
	private static void InputStreamTest1() throws IOException {
		try (InputStream input = new FileInputStream("../file.txt")) {
			int n;
			while ((n = input.read()) != -1) {
				System.out.println(n);
			}
		}
	}
```

#### 缓冲

在读取流的时候，一次读取一个字节并不是最高效的方法。`很多流支持一次性读取多个字节到缓冲区，对于文件和网络流来说，利用缓冲区一次性读取多个字节流效率往往要高很多`。`InputStream` 提供了两个重载方法来支持读取多个字节：

- `int read(byte[] b)` ：读取若干字节并填充到 `byte[]` 数组，返回读取的字节数

```java
public void readFile() throws IOException {
    try (InputStream input = new FileInputStream("src/readme.txt")) {
        // 定义1000个字节大小的缓冲区:
        byte[] buffer = new byte[1000];
        int n;
        while ((n = input.read(buffer)) != -1) { // 读取到缓冲区
            System.out.println("read " + n + " bytes.");
        }
    }
}
```

#### 阻塞

在调用 `InputStream` 的 `read()` 方法读取数据时，我们说 `read()` 方法时阻塞（Blocking）的。

### OutputStream

和 `InputStream` 相反，`OutputStream` 是 Java 标准库提供的最基本的输出流。

和 `InputStream` 类似，`OutputStream` 也提供了 `close()` 方法关闭输出流，以便释放系统原理。要特别注意：`OutputStream` 还提供了一个 `flush` 方法，它的目的是将缓冲区的内容真正输出到目的地。

为什么要有 `flush` ？因为向磁盘、网络写入数据的时候，出于效率的考虑，操作系统并不是输出一个字节就立刻写入到文件或者发送到网络，而是把输出的字节先放到内存的一个`缓冲区`里（本质上就是一个 `byte[]` 数组），等到缓冲区写满了，再一次性写入文件或者网络。<u>对于很多 IO 设备来说，一次写一个字节和一次写 1000 个字节，花费的时间几句是一样的，所以 `OutputStream` 有个 `flush` 方法（这个方法也用到浏览器页面渲染），能强制把缓冲区内容输出。</u>

通常情况下，我们不需要调用这个 `flush()` 方法，因为缓冲区写满了 `OutputStream` 会自动调用它，并且，在调用 `close()` 方法关闭 `OutputStream` 之前，也会自动调用 `flush` 方法。

但是，在某些情况下，我们必须手动调用 `flush()` 方法。举个例子：

小明正在开发一款在线聊天软件，当用户输入一句话后，就通过 `OutputStream` 的 `write()` 方法写入网络流。小明测试的时候发现，发送方输入后，接收方根本收不到任何信息，怎么回事？

原因就在于写入网络流是先写入内存缓冲区，等缓冲区满了才会一次性发送到网络。如果缓冲区大小是 4K（4 \* 1024 个字节），则发送方要敲几千个自负后，操作系统才会把缓冲区的内容发送出去，这个时候，接收方会一次性收到大量信息。

解决方法就是<u>每输入一句话后，立刻调用 `flush()` ，不管当前缓冲区是否已满，强迫操作系统把缓冲区的内容立刻发送出去。 </u>

实际上，`InputStream` 也有缓冲区。例如，从 `FileInputStream` 读取一个字节时，操作系统往往会一次性读取若干字节到缓冲区，并维护一个指针指向未读的缓冲区。然后，每次我们调用 `int read()` 读取下一个字节时，可以直接返回缓冲区的下一个字节，避免每次读一个字节都导致 IO 操作。当缓冲区全部读完后继续调用 `read()`，则会触发操作系统的下一次读取并再次填满缓冲区。

#### FileOutputStream

```java
	public static void writeFile() throws IOException {
		OutputStream output = new FileOutputStream("./readme.txt");
		output.write(72); // H
		output.write(101); // e
		output.write(108); // l
		output.write(108); // l
		output.write(111); // o
		output.close();
	}
```

```java
public static void writeFile2() throws IOException {
		OutputStream output = new FileOutputStream("./readme.txt");
		output.write("Hello".getBytes("UTF-8")); // Hello
		output.close();
	}
```

和 `InputStream` 一样，上述代码没有考虑到在发生异常的情况下如何正确地关闭资源。写入过程也会经常发生 IO 错误。例如，磁盘已满，无权限写入等等。我们需要用 `try(resource)` 来保证 `OutputStream` 在无论是否发生 IO 错误的时候都能够正确地关闭：

```java
public static void writeFile3() throws IOException {
		try (OutputStream output = new FileOutputStream("./readme.txt")) {
			output.write("Hello".getBytes("UTF-8")); // Hello
		} // 编译器会在此自动为我们写入 finally 并调用 close()
	}
```

#### 阻塞

和 `InputStream` 一样，`OutputStream` 的 `write()` 方法也是阻塞的。

#### OutputStream 实现类

#### 小结

Java 标准库的 `java.io.OutputStream` 定义了所有输出流的超类：

- `FileOutStream` 实现了文件流输出；
  <!-- - `ByteArrayOutputStream` 在内存中模拟一个字节流输出。 -->

某些情况下需要手动调用 `OutputStream` 的 `flush()` 方法来强制输出缓冲区。

总是使用 `try(resource)` 来保证 `OutputStream` 正确关闭。

### Filter 模式（装饰器模式 Decorator）

Java 的 IO 标准库提供的 `InputStream` 根据来源可以包括：

- `FileInputStream`：从文件读取数据，是最终数据源；
- `ServletInputStream`：从 HTTP 请求读取数据，是最终数据源；
- `Socket.getInputStream()`：从 TCP 连接读取数据，是最终数据源；

为了解决依赖继承会导致子类数量失控的问题，JDK 首先将 `InputStream` 分为两大类：

一类是直接提供数据的基础 `InputStream`，例如：

- FileInputStream
- ByteArrayInputStream
- ServeletInputStream
- ...

一类是提供额外附加功能的 `InputStream`，例如：

- BufferedInputStream
- DigestInputStream
- CipherInputStream
- ...

### 操作 Zip

`ZipInputStream` 是一种 `FilterInputStream`，它可以直接读取 zip 包的内容：

```bash
┌───────────────────┐
│    InputStream    │
└───────────────────┘
          ▲
          │
┌───────────────────┐
│ FilterInputStream │
└───────────────────┘
          ▲
          │
┌───────────────────┐
│InflaterInputStream│
└───────────────────┘
          ▲
          │
┌───────────────────┐
│  ZipInputStream   │
└───────────────────┘
          ▲
          │
┌───────────────────┐
│  JarInputStream   │
└───────────────────┘
```

#### 读取 zip 包

我们要创建一个 `ZipInputStream`

#### 写入 zip 包

#### 小结

`ZipInputStream` 可以读取 zip 格式的流，`ZipOutputStream` 可以把多份数据写入 zip 包；

配合 `FileInputStream` 和 `FileOutputStream` 就可以读写 zip 文件。

### 读取 classpath 资源

我们知道，Java 存放 `.class` 的目录或 jar 包可以包含任意其他类型的文件，例如：

- 配置文件，例如 `.properties`。
- 图片文件，例如 `.jpg`。
- 文本文件，例如 `.txt`，`.csv`。

从 classpath 读取文件就可以避免不同环境下（window、linux）文件路径不一致的问题：如果我们把 `default.properties` 文件放到 classpath 中，就不用关心它的实际存放路径。

在 classpath 中的资源文件，路径总是以 `/` 开头，我们先获取当前的 `Class` 对象，然后调用 `getResourceAsStream()` 就可以直接从 classpath 读取任意的资源文件：

```java
try (InputStream input = getClass().getResourceAsStream("/default.properties")) {
  // TODO
}
```

#### 小结

把资源放在 classpath 可以避免文件路径依赖；

Class 对象的 `getResourceAsStream()` 可以从 classpath 中读取指定资源。

根据 classpath 读取资源时，需要检查返回的 `InputStream` 是否为 `null`。

### 序列化

`序列化`是<u>指把一个 Java 对象变成二进制内容，</u>本质上就是一个 `byte[]` 数组。

为什么要把 Java 对象序列化呢？因为序列化后可以把 `byte[]` 保存到文件中，或者把 `byte[]` 通过网络传输到远程，这样，就相当于把 `Java 对象存储到文件或者通过网络传输出去`了。

一个 Java 对象要能序列化，必须实现一个特殊的 `java.io.Serializable` 接口，它的定义如下：

```java
public interface Serializable {}
```

`Serializable` 接口没有定义任何方法，它是一个空接口。我们把这样的空接口称为“标记接口”（Marker Interface），实现了标记接口的类仅仅是给自身贴了个 “标记”，并没有增加任何方法。

有序列化，就有反序列化，即把一个二进制内容（也就是 `byte[]` 数组）变回 `Java 对象`。有了反序列化，保存到文件中的 `byte[]` 数组又可以“变回” Java 对象，或者从网络上读取 `byte[]` “变回” Java 对象。

#### 序列化

把一个 Java 对象变为 `byte[]` 数组，需要使用 `ObjectOutputStream`。它负责把一个 Java 对象写入一个字节流。

```java
	public static void serializableTest() throws IOException {
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		try (ObjectOutputStream output = new ObjectOutputStream(buffer)) {
			// 写入 int
			output.writeInt(12345);
			// 写入 String
			output.writeUTF("Hello");
			// 写入 object
			output.writeObject(Double.valueOf(123.456));
		}
		System.out.println(Arrays.toString(buffer.toByteArray()));
	}
```

`ObjectOutputStream` 既可以写入基本类型，如 `int`、`boolean`，也可以写入 `String`（以 UTF-8 编码），还可以写入实现了 `Serializable` 接口的 `Object`。

因为写入 `Object` 时需要大量的类型信息，所以写入的内容很大。

#### 反序列化

和 `objectOutputStream` 相反，`ObjectInputStream` 负责从一个字节流读取 Java 对象：

```java
try (ObjectInputStream input = new ObjectInputStream(...)) {
  int n = input.readInt();
  String s = input.readUTF();
  Double d = (Double) input.readObject();
}
```

除了能读取基本类型和 `String` 类型外，调用 `readObject()` 可以直接返回一个 `Object` 对象。要把它变成一个特定类型，必须强制转型。

`readObject()` 可能抛出的异常有：

- `ClassNotFoundException`：没有找到对应的 Class：
- `InvalidClassException`：Class 不匹配。

对于 `ClassNotFoundException` ，这种情况常见于一台电脑上的 Java 程序把一个 Java 对象，例如，`Person` 对象序列化以后，通过网络传输给另一台电脑上的另一个 Java 程序，但是这台电脑的 Java 程序并没有定义 `Person` 类，所以无法反序列化。

对于 `InvalidClassException`，这种情况常见于序列化的 `Person` 对象定义了一个 `int` 类型的 `age` 字段，但是反序列化时，`Person` 类定义的 `age` 字段被改成了 `long` 类型，所以导致 class 不兼容。

为了避免这种 class 定义变动导致的不兼容，Java 的序列化允许 class 定义一个特殊的 `serialVersionUID` 的静态变量，用于标识 Java 类的序列化 “版本”，通常可以由 IDE 自动生成。如果增加或修改了字段，可以改变 `serialVersionUID` 的值，这样就能自动阻止不匹配的 class 版本：

```java
public class Person implememts Serializable {
  private static final long serialVersionUID = 2709425275741743919L;
}
```

要特别注意反序列化的几个重要的特点：

<u>反系列化时，由 JVM 直接构造出 Java 对象，`不调用构造方法`，构造方法内部的代码，在反序列化时根本不可能执行。</u>

#### 安全性

因为 Java 的序列化机制可以导致一个实例能直接从 `byte[]` 数组创建，而不经过构造方法，因此，它存在一定的安全隐患。一个精心构造 `byte[]` 数组被反序列化后可以执行特定的 Java 代码，从而导致严重的安全漏洞。

实际上，Java 本身提供的基于对象的序列化和反序列化机制既存在`安全性`问题，也存在`兼容性`问题。更好的`序列化方法`是通过 `JSON` 这样的通用数据结构来实现，只输出基本类型（包括 String）的内容呢，而不存储任何与代码相关的信息。

#### 小结

Java 的序列化机制仅适用于 Java，如果需要与其它语言交换数据，必须使用通用的序列化方法，例如 JSON。

### Reader

`Reader` 是 Java 的 IO 库提供的另一个输入流接口。和 `InputStream` 的区别是，`InputStream` 是一个字节流，即以 `byte` 为单位读取，而 `Reader` 是一个字符流，即以 `char` （java 中为 2 个字节）为单位读取：

| InputStream                         | Reader                                    |
| ----------------------------------- | ----------------------------------------- |
| 字节流，以 `byte` 为单位            | 字符流，以 `char` 为单位                  |
| 读取字节（-1，0~255）：`int read()` | 读取字符（-1，0 ～ 65535 ）：`int read()` |
| 读到字节数组 `int read(byte[] b)`   | 读到字符数组：`int read(char[] c)`        |

`java.io.Reader` 是所有字符输入流的超类，它最主要的方法是：

```java
public int read() throws IOException;
```

这个方法读取字符流的`下一个字符`，并返回字符表示的 `int`，范围是 `0`～`65535`。如果已读到末尾，返回 `-1`。

#### FileReader

`FileReader` 是 `Reader` 的一个子类，它可以打开文件并获取 `Reader`。下面的代码演示了如何完整地读取一个 `FileReader` 的所有字符：

```java
public static void readFileByFileReader() throws IOException {
		// 创建一个 FileReader 对象
		Reader reader = new FileReader("./readme.txt");// 字符编码是
		for (;;) {
			int n = reader.read(); // 反复调用 read() 方法，直到返回 -1
			if (n == -1) {
				break;
			}
			System.out.println((char) n); // 打印 char 字符
		}
		reader.close(); // 关闭流
	}
```

如果我们读取一个纯 ASCII 编码的文本文件，上述代码工作是没有问题的。但如果文件中包含中文，就会出现乱码。因为 `FileReader` 默认的编码与系统相关，例如，Windows 系统的默认编码可能是 `GBX`，打开一个 `UTF-8` 编码的文本文件就会出现乱码。

要避免乱码问题，我们需要在创建 `FileReader` 时指定编码：

```java
Reader reader = new FileReader("./readme.txt", StandardCharsets.UTF_8);// 字符编码是 UTF-8
```

和 `InputStream` 类似，`Reader` 也是一种资源，需要保证出错的时候也能正确关闭，所以我们需要用 `try (resource)` 来保证 `Reader` 在无论有没有 IO 错误的时候都能够正确地关闭：

```java
try (Reader reader = new FileReader("src/readme.txt", StandardCharsets.UTF_8))
```

`Reader` 还提供了`一次性读取若干字符`并填充到 `char[]` 数组的方法：

```java
public int read(char[] c) throws IOException
```

它`返回实际读入的字符个数`，最大不超过 `char[]` 数组的长度。返回 `-1` 表示流结束。

利用这个方法，我们可以先设置一个缓冲区，然后，每次尽可能地填充缓冲区：

```java
	public static void readFileByFileReader2() throws IOException {
		try (Reader reader = new FileReader("./readme.txt", StandardCharsets.UTF_8)) {
			char[] buffer = new char[1000];
			int n;
			while ((n = reader.read(buffer)) != -1) {
				System.out.println("read " + n + " chars.");
			}
		}
	}
```

#### CharArrayReader

#### StringReader

#### InputStreamReader

`Reader` 和 `InputStream` 有什么关系？

除了特殊的 `CharArrayReader` 和 `StringReader`，普通的 `Reader` 实际上是基于 `InputStream` 中读入字节流（`byte`），然后，根据编码设置，再转换为 `char` 就可以实现字符流。如果我们查看 `FileReader` 的源码，它在内部实际上持有一个 `FileInputSream`。

既然 `Reader` 本质上是一个基于 `InputStream` 的 `byte` 到 `char` 的转换器，那么，如果我们已经有一个 `InputStream`，想把它转换为 `Reader`，是完全可行的。`InputStreamReader` 就是这样一个转换器，它可以把任何 `InputStream` 转换为 `Reader`。示例代码如下：

```java
// 持有 InputStream
InputStream input = new FileInputStream("./readme.txt");
// 百脑汇为 Reader
Reader reader = new InputStreamReader(input, "UTF-8");
```

构造 `InputStreamReader` 时，我们需要传入 `InputStream` ，还需要指定编码，就可以得到一个 `Reader` 对象。上述代码可以通过 `try (resource)` 更简洁地改写如下：

```java

```

#### 小结

`Reader` 定义了所有字符输入流的超类：

- `FileReader` 实现了文件字符流输入，使用时需要指定编码；
- `CharArrayReader` 和 `StringReader` 可以在内存中模拟一个字符流输入。

`Reader` 是基于 `InputStream` 构造的：可以通过 `InputStreamReader` 在指定编码的同时将任何 `InputStream` 转换为 `Reader`。

总是使用 `try (resource)` 保证 `Reader` 正确关闭。

### Writer

`Reader` 是带编码转换器的 `InputStream`，它把 `byte` 转换为 `char`，而 `Writer` 就是带编码转换器的 `OutputStream`，它把 `char` 转换为 `byte` 并输出。

`Writer` 和 `OutputStream` 的区别如下：

| OutputStream                            | Writer                                         |
| --------------------------------------- | ---------------------------------------------- |
| 字节流，以 `byte` 为单位                | 字符流，以 `char` 为单位                       |
| 写入字节（0 ～ 255）：void write(int b) | 写入字符（0 ～ 65535）：`void write(char c)`   |
| 写入字节数组：void write(byte[] b)      | 写入字符（0 ～ 65535）：`void write(char[] c)` |
| 无对应方法                              | 写入 String[]：`void write(String s)`          |

`Writer` 是所有字符输出流的超类，它提供的方法主要有：

- 写入一个字符 （0 ～ 65535）：`void write(int c)`
- 写入字符数组的所有字符：`void write(char[] c)`
- 写入 String 表示的字符：`void write(String s)`

#### FileWriter

`FileWriter` 就是向文件中写入字符流的 `Writer`。它的使用方法和 `FileReader` 类似。

```java
	public static void writeFileByFileWriter() throws IOException {
		try (Writer writer = new FileWriter("./readme.txt", StandardCharsets.UTF_8)) {
			writer.write('H'); // 写入单个字符
			writer.write("Hello".toCharArray()); // 写入 char[]
			writer.write("Hello"); // 写入 String
		}
	}

```

#### 小结

`Writer` 定义了所有字符输出流的超类：

- `FileWriter` 实现了文件字符流输出。
- `CharArrayWriter` 和 `StringWriter` 在内存中模拟一个字符流输出。

使用 `try (resource)` 保证 `Writer` 正确关闭。

`Writer` 是基于 `OutputStream` 构造的，可以通过 `OutputStreamWriter` 将 `OutputStream` 转为 `Writer`，转换时需要指定编码。

### PrintStream 和 PrintWriter

`PrintStream` 是一种 `FileOutputStream`，它在 `OutputStream` 的接口上，额外提供了一些写入各种数据类型的方法：

- 写入 `int`：`print(int)`
- 写入 `boolean`：`print(boolean)`
- 写入 `String`：`print(String)`
- 写入 `Object`：`print(Object)`，实际上相当于 `print(object.toString())`
- ...

以及对应的一组 `println()` 方法，它会自动加上换行符。

我们经常使用的 `System.out.println()` 实际上就是使用 `PrintStream` 打印各种数据。其中，`System.out` 是系统默认提供的 `PrintStream`，表示标准输出：

```java
System.out.print(12345);// 输出 12345
Sytem.out.print(new Object()); // 输出类似 java.lang.Object@3c7a835a
Sytem.out.println("Hello"); // 输出 Hello 并换行
```

`System.err` 是系统默认提供的标准错误输出。

`PrintStream` 和 `OutputStream` 相比，除了添加一组 `print()`/`println()` 方法，可以打印各种数据类型，比较方便外，它还有一个额外的优点，就是不会跑出 `IOException`，这样我们在编写代码的时候，就不必捕获 `IOException`。

#### PrintWriter

`PrintStream` 最终输出的总是 `byte` 数据（而在 print 后，在控制台会字节显示为对应的字符），而 `PrintWriter` 则是扩展了 `Writer` 接口，它的 `print()`/ `println()` 方法最终输出的是 `char` 数据。两者的使用方法几乎是一模一样的：

#### 小结

`PrintStream` 是一种能够接收各种数据类型的输出，打印数据时比较方便：

- `System.out` 是标准输出；
- `System.err` 是标准错误输出。

`PrintWriter` 是基于 `Writer` 的输出。

## 日期与时间

## 单元测试

## 加密与安全

在计算机系统中，什么是加密与安全呢？

我们举个来自：假设 Bob 要给 Alice 发一封邮件，在邮件发送的过程中，黑客可能会窃取到邮件的内容，所以需要防`窃听`。黑客还可能会篡改邮件的内容，Alice 必须有能力识别邮件有没有`篡改`。最后，黑客可能假冒 Bob 给 Alice 发邮件，Alice 必须有能力识别出`伪造`的邮件。

所以，应对潜在的安全威胁，需要做到三防：

- 防窃听
- 防篡改
- 防伪造

计算机加密技术就是为了实现上述目标，而现代计算机密码学理论是建立在严格的数学理论基础上的，密码学已经逐渐发展成一门科学。对于绝大多数开发者来说，设计一个安全的加密算法非常困难，验证一个加密算法是否安全更加困难，当前被认为安全的加密算法仅仅是迄今为止尚未被攻破。因此，要编写安全的计算机程序，我们要做到：

- 不要自己设计山寨的加密算法；
- 不要自己实现已有的加密算法；
- 不要自己修改已有的加密算法。

### 编码算法

要学习编码算法，我们先来看一看什么是编码。

ASCII 码就是一种编码，字母 `A` 的编码是十六进制的 `0x41`，字母 `B` 是 `0x42`，以此类推：

| 字母 | ASCII 编码 |
| ---- | ---------- |
| A    | 0x41       |
| B    | 0x42       |
| C    | 0x43       |
| D    | 0x44       |
| ...  | ...        |

因为 ASCII 编码最多只能有 127 个字符，要想对更多的文字进行编码，就需要用 Unicode。而中文的中使用 Unicode 编码就是 `0x4e2d`，使用 UTF-8 则需要 3 个字节编码：

| 汉字 | Unicode 编码 | UTF-8 编码 |
| ---- | ------------ | ---------- |
| 中   | 0x4e2d       | 0xe4b8ad   |
| 文   | 0x4e2d       | 0xe69687   |
| 编   | 0x6587       | 0xe7bc96   |
| 码   | 0x7f16       | 0xe7a081   |
| ...  | ...          | ...        |

因此，最简单的编码是直接给每个字符指定一个若干字节表示的整数，复杂一点的编码就需要根据一个已有的编码推算出来。

比如 UTF-8 编码，它是一种不定长编码，但可以从给定字符的 Unicode 编码推算出来。

#### URL 编码

URL 编码是浏览器发送数据给服务器时使用的编码，它通常附加在 URL 的参数部分，例如：

https://www.baidu.com/s?wd=%E4%B8%AD%E6%96%87

<u>之所以需要 URL 编码，是因为处于兼容性考虑，很多服务器只识别 ASCII 字符。</u>但如果 URL 中包含中文、日文这些非 ASCII 字符怎么办？不要紧，URL 编码有一套规则：

- 如果字符是 `A`~`Z`，`a`~`z`，`0`～`9`以及 `-`、`_`、`.`、`*`，则保持不变；
- 如果是其他字符，先转换为 UTF-8 编码，然后对每个字节以 `%xx` 表示。

例如：字符 `中` 的 UTF-8 编码是 `0xe4b8ad`，因此，它的 URL 编码是 `%E4%B8%AD`。URL 编码总是大写。

Java 标准库提供了一个 `URLEncoder` 类来对任意字符进行 URL 编码：

```java
	public static void urlEncode() {
		String encoded = URLEncoder.encode("中文!", StandardCharsets.UTF_8);
		System.out.println(encoded);
	}
```

上述代码运行的结果是 `%E4%B8%AD%E6%96%87%21`，`中`的 URL 编码 `%E4%B8%AD`，`文`的 URL 编码是 `%E6%96%87`，`!` 虽然是 ASCII 字符，也要对其编码为 `%21`。和标准的 URL 编码稍有不同，URL Encoder 把空格字符编码成 `+`，而现在的 URL 编码标准要求空格被编码为 `%20`，不过，服务器都可以处理这两种情况。

如果服务器收到 URL 编码的字符串，就可以对其进行解码，还原成原始字符串。Java 标准库的 `URLDecoder` 就可以解码：

```java
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
	public static void urlDecode() {
		String decoded = URLDecoder.decode("%E4%B8%AD%E6%96%87%21", StandardCharsets.UTF_8);
		System.out.println(decoded);
	}
```

要特别注意：URL 编码是编码算法，不是加密算法。URL 编码的目的是把任意文本数据编码为 `%` 前缀表示的文本，编码后的文本仅包含 `A`~`Z`，`a`~`z`，`0`～`9`以及 `-`、`_`、`.`、`*`，便于`浏览器和服务器处理`。

#### Base64 编码

URL 编码是对字符进行编码，表示成 `%xx` 的形式，而 Base64 编码是`对二进制数据进行编码，表示成文本格式`。

Base64 编码可以把任意长度的二进制数据变成文本，且只包含`A`~`Z`、`a`~`z`、`0`~`9`、`+`、`/`、`=` 这些字符。它的原理<u>是把 `3 字节`的二进制数据按 6 bit 一组，用 4 个 int 整数表示，然后查表，把 int 整数用索引对应到字符，得到编码后的字符串。</u>

举个例子：3 个 byte 数据分别是 `e4`、`b8`、`ad`，按 6 bit 分组得到 `39`、`0b`、`22` 和 `2d`：

```bash
┌───────────────┬───────────────┬───────────────┐
│      e4       │      b8       │      ad       │
└───────────────┴───────────────┴───────────────┘
┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
│1│1│1│0│0│1│0│0│1│0│1│1│1│0│0│0│1│0│1│0│1│1│0│1│
└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
┌───────────┬───────────┬───────────┬───────────┐
│    39     │    0b     │    22     │    2d     │
└───────────┴───────────┴───────────┴───────────┘
```

因为 6 位整数的范围总是 `0`~`63`，所以，能用 64 个字符表示：字符 `A`~`Z` 对应索引 `0`~`25`，字符 `a`~`z` 对应索引 `26`~`51`，字符 `0`~`9` 对应索引 `52`~`61`，最后两个索引 `62`、`63` 分别用字符 `+` 和 `/` 表示。

<u>在 Java 中，二进制数据就是 `byte[]` 数组。</u>Java 标准库提供了 `Base64` 来对 `byte[]` 数组进行编解码：

```java
	public static void base64Encode() {
		byte[] input = new byte[] { (byte) 0xe4, (byte) 0xb8, (byte) 0xad };
		String b64encoded = Base64.getEncoder().encodeToString(input);
		System.out.println(b64encoded);
	}
```

编码后得到 `5Lit` 4 个字符。要对 `base64` 解码，仍然用 `Base64` 这个类：

```java
	public static void base64Decode() {
		byte[] output = Base64.getDecoder().decode("5Lit");
		System.out.println(Arrays.toString(output));
	}
```

有的童鞋会问：如果输入的 `byte[]` 数组长度不是 3 的整数倍怎么办？这种情况下，需要对输入的末尾补一个或两个 `0x00`，编码后，在结尾加一个 `=` 表示补充了 1 个 `0x00`，加两个 `=` 表示补充了 2 个 `0x00`，解码的时候，去掉末尾补充的一个或两个 `0x00` 即可。

实际上，因为编码后的长度加上 `=` 总是 4 的倍数，所以即使不加 `=` 也可以计算出原始输入的 `byte[]`。Base64 编码的时候可以用 `withoutPadding()` 去掉 `=`，解码出来的结果是一样的：

```java
import java.util.Base64;
	// 如果输入的 `[byte]` 数组长度不是 3 的整数倍数
	public static void base64Encode2() {
		byte[] input = new byte[] { (byte) 0xe4, (byte) 0xb8, (byte) 0xad, 0x21 };
		String b64encoded = Base64.getEncoder().encodeToString(input);
		String b64encoded2 = Base64.getEncoder().withoutPadding().encodeToString(input);
		System.out.println(b64encoded); // 5LitIQ==
		System.out.println(b64encoded2); // 5LitIQ
		byte[] output = Base64.getDecoder().decode(b64encoded2);
		System.out.println(Arrays.toString(output)); // [-28, -72, -83, 33]
	}

```

因为标准的 Base64 编码会出现 `+`、`/` 和 `=`，所以不适合把 Base64 编码后的字符串放到 URL 中。一种针对 URL 的 Base64 编码可以在 URL 中使用的 Base64 编码，它仅仅是把 `+` 变成 `-`，`/` 变成 `_`：

```java
	// 针对兼容 URL 的 base64 编码
	public static void base64Encode3() {
		byte[] input = new byte[] { 0x01, 0x02, 0x7f, 0x00 };
		String b64encoded = Base64.getUrlEncoder().encodeToString(input);
		System.out.println(b64encoded); // AQJ_AA==
		byte[] output = Base64.getUrlDecoder().decode(b64encoded);
		System.out.println(Arrays.toString(output));
// [1, 2, 127, 0]
	}
```

`Base64 编码的目的是把二进制数据变成文本格式，这样在很多文本中就可以处理二进制数据`。例如，电子邮件协议就是文本协议，如果要在电子邮件中添加一个二进制文件，就可以用 Base64 编码，然后以文本的形式传送。（图标可以使用 base64 嵌入 css、html 中，减少对图片对服务器的请求。）

<u>Base64 编码的缺点是传输效率会较低，因为它把原始数据的长度增加了 `1/3`（补字节）</u>。

和 URL 编码一样，Base64 编码是一种编码算法，不是加密算法。

如果把 Base64 的 64 个字符编码表换成 32 个、48 个或者 58 个，就可以用 Base32 编码，Base 48 编码和 Base58 编码。<u>字符越少，编码的效率就会越低。</u>

#### 小结

URL 编码和 Base64 编码都是编码算法，它们不是加密算法；

URL 编码的目的实际把任意文本数据编码为 % 前缀表示的文本，便于浏览器和服务器处理；

Base64 编码的目的是把任意二进制数据编码为文本，但编码后数据量会增加 1/3。

### 哈希算法

`哈希算法（Hash）`又称`摘要算法（Digest）`，它的作用是：对任意一组输入数据进行计算，得到一个固定长度的输出摘要。

[哈希算法与 MD5、SHA](https://zhuanlan.zhihu.com/p/37165658)——MD5、SHA 属于哈希的范畴。

哈希算法最重要的特定就是：

- 相同的输入一定得到相同的输出；
- 不同的输入大概率得到不同的输出。

哈希算法的目的就是为了验证原始数据是否被篡改。

Java 字符串的 `hashCode()` 就是一个哈希算法，它的输入是任意字符串，输出是固定的 4 字节 `int` 整数：

```java
"hello".hashCode(); // 0x5e918d2 99162322
、
"hello, java".hashCode(); // 0x7a9d88e8  2057144552
"hello, bob".hashCode(); // 0xa0dbae2f
```

两个相同的字符串永远会计算出相同的 `hashCode`，否则基于 `hashCode` 定位的 `HashMap` 就无法正常工作。这也是为什么当我们自定义一个 class 时，复写 `equals()` 方法时我们必须正确覆写 `hashCode()` 方法。

#### 哈希碰撞

哈希碰撞是指，两个不同的输入得到了相同的输出。

```java
"AaAaAa".hashCode(); // 0x7460e8c0
"BBAaBB".hashCode(); // 0x7460e8c0
```

有童鞋会问：碰撞能不能避免？答案是不能。碰撞是一定会出现的，因为输出的字节长度是固定的，`String` 的 `hashCode()` 输出是 4 字节整数，最多只有（2^32） 4,294,967,296 种输出，但输入的数据长度是不固定的，有无数种输入。所以，哈希算法是`把一个无限的输入集合映射到一个有限的输出结合，必然会产生碰撞`。

碰撞不可怕，我们担心的不是碰撞，而是碰撞的概率，因为碰撞概率的高低关系到哈希算法的安全性。一个安全的哈希算法必须满足：

- 碰撞概率低；
- 不能猜测输出。

不能猜测输出是指，输入的任意一个 bit 的变化会造成输出完全不同，这样就很难从输出反推输入（只能依靠暴力穷举）。假设一种哈希算法有如下规律：

```java
hashA("java001") = "123456"
hashA("java002") = "123457"
hashA("java003") = "123458"
```

那么很容易从输出 `123456` 反推输入，这种哈希算法就不安全。安全的哈希算法从输出是看不出任何规律的：

```java
hashB("java001") = "123456"
hashB("java002") = "580271"
hashB("java003") = ???
```

常用的哈希算法有：

| 算法       | 输出长度（位） | 输出长度（字节） |
| ---------- | -------------- | ---------------- |
| MD5        | 128 bits       | 16 bytes         |
| SHA-1      | 160 bits       | 20 bytes         |
| RipeMD-160 | 160 bits       | 20 bytes         |
| SHA-256    | 256 bits       | 32 bytes         |
| SHA-512    | 512 bits       | 64 bytes         |

根据碰撞概率，`哈希算法的输出长度越长，就越难产生碰撞，也就越安全`。

Java 标准库提供了常用的哈希算法，并且有一套统一的接口。我们以 MD5 算法为例，看看如何对输入计算哈希：

```java
	public static void md5Test() throws Exception {
		// 创建一个 MessageDigest 实例：
		MessageDigest md = MessageDigest.getInstance("MD5");
		// 返回调用 update 输入数据
		md.update("Hello".getBytes("UTF-8"));
		md.update("World".getBytes("UTF-8"));
		byte[] result = md.digest(); // 16 bytes:
		System.out.println(new BigInteger(1, result).toString(16)); // 68e109f0f40ca72a15e05cc22786f8e6
	}
```

使用 `MessageDigest` 时，我们首先根据哈希算法获取一个 `MessageDigest` 实例，然后，反复调用 `update(byte[])` 输入数据。当输入结束后，调用 `digest()` 方法获得 `byte[]` 数组表示的摘要，最后，把它转换为十六机制的字符串。

运行上述代码，可以得到输入 `HelloWorld` 的 MD5 是 `68e109f0f40ca72a15e05cc22786f8e6`。

#### 哈希算法的用途

因为相同的输入永远会得到相同的输出，因此，如果输入被修改了，得到的输出就会不同。

我们在网站上下载软件的时候，经常看到下载页显示的哈希：

![](../.vuepress/public/images/2020-07-12-21-35-43-MD5.png)

如何判断下载到本地的软件是原始的、未经篡改的文件？我们只需要自己计算一下本地文件的哈希值，再与官网公开的哈希值对比，如果相同，说明文件下载正确，否则，说明文件已被篡改。

哈希算法的另一个重要用途是`存储用户口令`。如果直接将用户的原始口令存放到数据库中，会产生极大的安全风险：

- 数据库管理员能够看到用户明文口令。
- 数据库数据一旦泄漏，黑客即可获取用户明文口令。

不存储用户的`原始口令`，那么如何对用户进行认证？

方法是`存储用户口令的哈希`，例如，MD5.

在用户输入原始口令后，`系统计算用户输入的原始口令的 MD5 并与数据库存储的 MD5 对比`，如果一致，说明口令正确，否则，口令错误。（mac 中可以用 md5 命令工具进行测试）

因此，数据库存储用户名和口令的表内容应该像下面这样：

| username | password                         |
| -------- | -------------------------------- |
| bob      | f30aa7a662c728b7407c54ae6bfd27d1 |
| alice    | 25d55ad283aa400af464c76d713c07ad |
| tim      | bed128365216c019988915ed3add75fb |

这样一来，数据库管理员看不到用户的原始口令。即使数据库泄漏，黑客也无法拿到用户的原始口令。想要拿到用户的原始口令，必须用暴力穷举的方法，一个口令一个口令地试，直到某个口令计算的 MD5 恰好等于指定值。

`使用哈希口令时，还要注意防止彩虹表攻击`。

什么是`彩虹表`呢？上面讲到了，如果只拿到 MD5，从 MD5 反推明文口令，只能使用`暴力穷举`的方法。

然而黑客并不笨，暴力穷举会消耗大量的算力和时间。但是，如果有一个`预先计算好的常用口令和它们的 MD5对照表`：

| 常用口令 | MD5                              |
| -------- | -------------------------------- |
| hello123 | f30aa7a662c728b7407c54ae6bfd27d1 |
| 12345678 | 25d55ad283aa400af464c76d713c07ad |
| passw0rd | bed128365216c019988915ed3add75fb |
| 19700101 | 570da6d5277a646f6552b8832012f5dc |
| …        | …                                |
| 20201231 | 6879c0ae9117b50074ce0a0d4c843060 |

这个表就是彩虹表。如果用户使用了常用口令，黑客从 MD5 一下就能反查到原始口令：

bob 的 MD5：`f30aa7a662c728b7407c54ae6bfd27d1`，原始口令：`hello123`；

alice 的 MD5：`25d55ad283aa400af464c76d713c07ad`，原始口令：`12345678`；

tim 的 MD5：`bed128365216c019988915ed3add75fb`，原始口令：`passw0rd`。

这就是为什么不要使用常用密码，以及不要使用生日作为密码的原因。

即使用户使用了常用口令，我们也可以采取措施来抵御彩虹表攻击，方法是`对每个口令额外添加随机数`，这个方法称之为加盐（salt）：

```bash
digest = md5(salt + inputPassword)
```

经过加盐处理的数据库表，内容如下：

| username | salt   | password                         |
| -------- | ------ | -------------------------------- |
| bob      | H1r0a  | a5022319ff4c56955e22a74abcc2c210 |
| alice    | 7\$p2w | e5de688c99e961ed6e560b972dab8b6a |
| tim      | z5Sk9  | 1eee304b92dc0d105904e7ab58fd2f64 |

加盐的目的在于`使黑客的彩虹表失效，即使用户使用常用口令，也无法从 MD5 反推原始口令`。

#### SHA-1

SHA-1 也是一种哈希算法，它的输出是 160 bits，即 20 字节。SHA-1 是由美国国家安全局开发的，SHA 算法实际上是一个系列，包括 SHA-0（已废弃）、SHA-1、SHA-256、SHA-512 等。

在 Java 中使用 SHA-1，和 MD5 完全一样，只需要把算法名称改为 “SHA-1”：

```java
import java.security.MessageDigest;
	public static void sha1Test() throws Exception {
		// 创建一个 MessageDigest 实例：
		MessageDigest md = MessageDigest.getInstance("SHA-1");
		// 返回调用 update 输入数据
		md.update("Hello".getBytes("UTF-8"));
		md.update("World".getBytes("UTF-8"));
		byte[] result = md.digest(); // 16 bytes:
		System.out.println(new BigInteger(1, result).toString(16)); // 68e109f0f40ca72a15e05cc22786f8e6
	}
```

类似的，计算 SHA-256，我们需要传入名称 `SHA-256`，计算 SHA-512，我们需要传入名称 `SHA-512`。Java 标准库支持的所有哈希算法可以在[这里](https://docs.oracle.com/en/java/javase/14/docs/specs/security/standard-names.html#messagedigest-algorithms)查到。

> ⚠️ 注意：MD5 因为输出长度较短，短时间内破解是可能的，目前已经不推荐使用。

#### 小结

哈希算法可用于验证数据完整性，具有防篡改检测的功能；

常用的哈希算法有 MD5、SHA-1 等；

用哈希存储口令时要考虑彩虹表攻击。

### BouncyCastle

我们知道，Java 标准库提供了一系列常用的哈希算法。

但如果我们要用的某种算法，Java 标准库没有提供怎么办？

方法一：自己写一个，难度很大；

方法二：找一个现成的第三方库，直接使用。

[BouncyCastle](https://www.bouncycastle.org/) 就是一个提供了很多哈希算法和加密算法的第三方库。它提供了 Java 标准库没有的一些算法，例如，RipeMD160 哈希算法。

#### 小结

BouncyCastle 是一个开源的第三方算法提供商。

BouncyCastle 提供了很多 Java 标准库没有提供的哈希算法和加密算法；

使用第三方算法前需要通过 `Security.addProvider()`注册。

### Hmac 算法

在前面讲到哈希算法时，我们说，存储用户的`哈希口令`时，要`加盐`存储，目的就在于抵御`彩虹表`攻击。

我们回顾一下哈希算法：

```bash
digest = hash(input)
```

正是因为相同的输入会产生相同的输出，我们加盐的目的就在于，使得输入有所变化：

```bash
digest = hash(salt + input)
```

这个 salt 可以看作是一个额外的“认证码”，同样的输入，不同的认证码，会产生不同的输出。因此，要验证输出的哈希，必须同时提供`“认证码”`。

Hmac 算法就是`一种基于密钥的消息认证码算法`，它的全称是 Hash-based Message Authentication Code，是一种更安全的消息摘要算法。

Hmac 算法总是和某种哈希算法配合起来用的。例如，我们使用 MD5 算法，对应的就是 HmacMD5 算法，它相当于 “加盐”的 MD5：

```bash
HmacMD5 = md5(secure_random_key, input)
```

隐翠，HmacMD5 可以看作带有一个安全的 key 的 MD5。使用 HmacMD5 而不是用 MD5 加 salt，有如下好处：

- HmacMD5 使用的 key 长度是 64 字节，更安全；
- Hmac 是比爱哦准算法，同样适用于 SHA-1 等其他哈希算法；
- Hmac 输出和原有的哈希算法长度一致。

可见，Hmac 本质上就是把 key 混入摘要的算法。验证此哈希时，除了原始的输入数据，还要提供 key。

为了保证安全，我们不会自己指定 key，而是 通过 Java 标准库的 KeyGenerator 生成一个安全的随机的 key。下面是使用 HmacMD5 的代码：

```java
	public static void hmacTest() throws Exception {
		KeyGenerator keyGen = KeyGenerator.getInstance("HmacMD5");
		SecretKey key = keyGen.generateKey();
		// 打印随机生成的 key:
		byte[] skey = key.getEncoded();
		System.out.println(new BigInteger(1, skey).toString(16));
		Mac mac = Mac.getInstance("HmacMD5");
		mac.init(key);
		mac.update("HelloWorld".getBytes("UTF-8"));
		byte[] result = mac.doFinal();
		System.out.println(new BigInteger(1, result).toString(16));
	}
```

和 MD5 相比，使用 HmacMD5 的步骤是：

1. 通过名称 `HmacMD5` 获取 `KeyGenerator` 实例；
2. 通过 `KeyGenerator` 创建一个 `SecretKey` 实例；
3. 通过名称 `HmacMD5` 获取 `Mac` 实例；
4. 用 `SecretKey` 初始化 `Mac` 实例；
5. 对 `Mac` 实例反复调用 `update(byte[])` 输入数据；
6. 调用 `Mac` 实例的 `doFinal()` 获取最终的哈希追。

我们可以用 Hmac 算法取代原有的自定义的加盐算法，因此，存储用户名和口令的数据库结构如下：

| username | secret_key (64 bytes) | password                         |
| -------- | --------------------- | -------------------------------- |
| bob      | a8c06e05f92e...5e16   | 7e0387872a57c85ef6dddbaa12f376de |
| alice    | e6a343693985...f4be   | c1f929ac2552642b302e739bc0cdbaac |
| tim      | f27a973dfdc0...6003   | af57651c3a8a73303515804d4af43790 |

有了 Hmac 计算的哈希和 `SecretKey`，我们想要验证怎么办？这时，`SecretKey` 不能从 `KeyGenerator` 生成，而是从一个 `byte[]` 数组恢复：

```java
	public static void hmacTest2() throws Exception {
		byte[] hkey = new byte[] { 106, 70, -110, 125, 39, -20, 52, 56, 85, 9, -19, -72, 52, -53, 52, -45, -6, 119, -63,
				30, 20, -83, -28, 77, 98, 109, -32, -76, 121, -106, 0, -74, -107, -114, -45, 104, -104, -8, 2, 121, 6,
				97, -18, -13, -63, -30, -125, -103, -80, -46, 113, -14, 68, 32, -46, 101, -116, -104, -81, -108, 122,
				89, -106, -109 };

		SecretKey key = new SecretKeySpec(hkey, "HmacMD5");
		// 打印随机生成的 key:
//		byte[] skey = key.getEncoded();
//		System.out.println(new BigInteger(1, skey).toString(16));
		Mac mac = Mac.getInstance("HmacMD5");
		mac.init(key);
		mac.update("HelloWorld".getBytes("UTF-8"));
		byte[] result = mac.doFinal();
		System.out.println(Arrays.toString(result));
		// [126, 59, 37, 63, 73, 90, 111, -96, -77, 15, 82, -74, 122, -55, -67, 54]
	}
```

恢复 `SecretKey` 的语句就是 `new SecretKeySpec(hkey, "HmacMD5")`

#### 小结

Hmac 算法是一种标准的基于密钥的哈希算法，可以配合 MD5、SHA-1 等哈希算法，计算的摘要长度和原摘要算法长度相同。

### 对称加密算法

对称加密算法就是`传统的用一个密码进行加密和解密`。例如，我们常用的 WinZIP 和 WinRAR 对你压缩包的加密和解密，就是使用对称加密算法。

![](../.vuepress/public/images/2020-07-13-12-07-43-encrypt.png)

从程序的角度看，所谓加密，就是这样一个函数，它接收密码和明文，然后输出密文：

```bash
secret = encrypt(key, message);
```

而解密则相反，它接收密码和密文，然后输出明文：

```bash
plain = decrypt(key, secret);
```

在软件开发中，常用的对称加密算法有：

| 算法 | 密钥长度    | 工作模式                                        | 填充模式         |
| ---- | ----------- | ----------------------------------------------- | ---------------- |
| DES  | 56/64       | ECB/CBC/PCBC/CTR/... NoPadding/PKCS5Padding/... |
| AES  | 128/192/256 | ECB/CBC/PCBC/CTR/... NoPadding/PKCS5Padding/    | PKCS7Padding/... |
| IDEA | 128         | ECB PKCS5Padding/PKCS7Padding/...               |

密钥长度直接决定加密强度，而工作模式和填充模式可以看成是对称加密算法的参数和格式选择。Java 标准库的算法实现并不包括所有的工作模式和所有填充模式，但是通常我们只需要挑选常用的使用就可以了。

最后注意，DES 算法由于密钥过短，可以在短时间内被暴力破解，所以现在已经不安全了。

#### 使用 AES 加密

AES 算法是目前应用最广泛的加密算法。我们先用 ECB 模式加密并解密：

```java
public static void ecbTest() throws Exception {
		// 原文：
		String message = "Hello, world!";
		System.out.println("Message：" + message);
		// 128 位密钥
		byte[] key = "1234567890abcdef".getBytes("UTF-8");

		// 加密：
		byte[] data = message.getBytes("UTF-8");
		byte[] encrypted = encrypt(key, data);
		System.out.println("Encrypted：" + Base64.getEncoder().encodeToString(encrypted));
		// 解密：
		byte[] decrypted = decrypt(key, encrypted);
		System.out.println("Decrypted: " + new String(decrypted, "UTF-8"));
	}

	// 加密
	public static byte[] encrypt(byte[] key, byte[] input) throws GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
		SecretKey keySpec = new SecretKeySpec(key, "AES");
		cipher.init(Cipher.ENCRYPT_MODE, keySpec);
		return cipher.doFinal(input);
	}

	// 解密：
	public static byte[] decrypt(byte[] key, byte[] input) throws GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
		SecretKey keySpec = new SecretKeySpec(key, "AES");
		cipher.init(Cipher.DECRYPT_MODE, keySpec);
		return cipher.doFinal(input);
	}
```

Java 标准库提供的对称加密接口非常简单，使用时按以下步骤编写代码：

1. 根据算法名称/工作模式/填充模式获取 Cipher 实例；
2. 根据算法名称初始化一个 SecretKey 实例，密钥必须是指定长度；
3. 使用 SerectKey 初始化 Cipher 实例，并设置加密或解密模式；
4. 传入明文或密文，获得密文或明文。

ECB 模式是最简单的 AES 加密模式，它只需要一个固定长度的密钥，固定的明文会生成固定的密文，这种一对一的加密方式导致安全性降低，更好的方式是通过 CBC 模式，它需要一个随机数作为 IV 参数，这样对于同一份明文，每次生成的密文都不同。

```java

```

#### 小结

对称加密算法使用同一个密钥进行加密和解密，常用算法有 DES、AES 和 IDEA 等；

密钥长度由算法设计决定，AES 的密钥长度是 128/192/256 位；

使用对称加密算法需要指定算法名称、工作模式和填充模式。

### 口令加密算法

上一节我们讲的 AES 加密，细心的童鞋可能会发现，密钥长度是固定的 128/192/256 位，而不是我们 WinZip / WinRAR 那样，随便输入几位都可以。

但是我们平时使用的加密软件，输入 6 位、8 位都可以，难道加密方式不一样？

实际上用户输入的口令并不能直接作为 AES 的密钥进行加密（除非长度恰好是 128/192/256 位），并且用户输入的口令一般都有规律，安全性远远不如安全随机数产生的随机口令。因此，`用户输入的口令，通常还需要使用 PBE 算法，采用随机数杂凑计算出真正的密钥，再进行加密`。

PBE 就是 Password Based Encryption 的缩写，它的作用如下：

```bash
key = generate(userPassword, secureRandomPassword);
```

PBE 的作用是`把用户输入的口令和一个安全随机的口令用杂凑后计算出真正的密钥。`以 AES 密钥为例，我们让用户输入一个口令，然后生成一个随机数，通过 PBE 算法计算出真正的 AES 口令，再进行加密，代码如下：

#### 小结

PBE 算法通过用户口令和安全的随机 salt 计算出 Key，然后再进行加密；

Key 通过口令和安全的随机 salt 计算得出，大大提高了安全性；

PBE 算法内部使用的仍然是标准对称加密算法（例如 AES）。

### 密钥交换算法

更确切地说，DH 算法是一个密钥协商算法，双方最终协商出一个共同的密钥，而这个密钥不会通过网络传输。

如果我们把 `a` 看成甲的私钥，`A` 看成甲的公钥，`b` 看成乙的私钥，DH 算法的本质就是双方各自生成自己的私钥和公钥，私钥仅对你自己可见，然后交换公钥，并根据自己的私钥和对方的公钥，生成最终的 `secretKey` ，DH 算法通过数学定律保证了双方各自计算出的 `secretKey` 是相同。

```java
	public static void main(String[] args) {
		// Bob和Alice:
		Person bob = new Person("Bob");
		Person alice = new Person("Alice");

		// 各自生成KeyPair:
		bob.generateKeyPair();
		alice.generateKeyPair();

		// 双方交换各自的PublicKey:
		// Bob根据Alice的PublicKey生成自己的本地密钥:
		bob.generateSecretKey(alice.publicKey.getEncoded());
		// Alice根据Bob的PublicKey生成自己的本地密钥:
		alice.generateSecretKey(bob.publicKey.getEncoded());

		// 检查双方的本地密钥是否相同:
		bob.printKeys();
		alice.printKeys();
		// 双方的SecretKey相同，后续通信将使用SecretKey作为密钥进行AES加解密...
	}


class Person {

	public final String name;

	public PublicKey publicKey;
	private PrivateKey privateKey;
	private byte[] secretKey;

	public Person(String name) {
		this.name = name;
	}

	// 生成本地KeyPair:
	public void generateKeyPair() {
		try {
			KeyPairGenerator kpGen = KeyPairGenerator.getInstance("DH");
			kpGen.initialize(512);
			KeyPair kp = kpGen.generateKeyPair();
			this.privateKey = kp.getPrivate();
			this.publicKey = kp.getPublic();
		} catch (GeneralSecurityException e) {
			throw new RuntimeException(e);
		}
	}

	public void generateSecretKey(byte[] receivedPubKeyBytes) {
		try {
			// 从byte[]恢复PublicKey:
			X509EncodedKeySpec keySpec = new X509EncodedKeySpec(receivedPubKeyBytes);
			KeyFactory kf = KeyFactory.getInstance("DH");
			PublicKey receivedPublicKey = kf.generatePublic(keySpec);
			// 生成本地密钥:
			KeyAgreement keyAgreement = KeyAgreement.getInstance("DH");
			keyAgreement.init(this.privateKey); // 自己的PrivateKey
			keyAgreement.doPhase(receivedPublicKey, true); // 对方的PublicKey
			// 生成SecretKey密钥:
			this.secretKey = keyAgreement.generateSecret();
		} catch (GeneralSecurityException e) {
			throw new RuntimeException(e);
		}
	}

	public void printKeys() {
		System.out.printf("Name: %s\n", this.name);
		System.out.printf("Private key: %x\n", new BigInteger(1, this.privateKey.getEncoded()));
		System.out.printf("Public key: %x\n", new BigInteger(1, this.publicKey.getEncoded()));
		System.out.printf("Secret key: %x\n", new BigInteger(1, this.secretKey));
	}
}
```

<!-- SSH github 这些是哪种算法？ -->

但是 DH 算法并未解决`中间人攻击`，即甲乙双方并不能确保与自己通信的是否真的是对方。消除中间人攻击需要其他方法。

#### 小结

DH 算法是一种`密钥交换`协议，通信双方通过不安全的信道协商密钥，然后进行对称加密传输。

DH 算法没有解决中间人攻击。

### 非对称加密算法

从 DH 算法我们可以看到，`公钥—私钥组成的密钥对`是非常有用的加密方式，因为公钥是可以公开的，而私钥是完全保密的，由此奠定了非对称加密的基础。

`非对称加密就是加密和解密使用的不是相同的密钥：只有同一个公钥—私钥对才能正常加解密。`

因此，如果小明要加密一个文件发送给小红，他应该首先向小红索取她的公钥，然后，他用小红的公钥加密，把加密文件发送给小红，此文件只能由小红的私钥解开，因为小红的私钥在她自己手里，所以，除了小红，没有任何人能解开此文件。

非对称加密相比对称加密的显著优点在于，<u>对称加密需要协商密钥，而非对称加密可以安全地公开各自的公钥，在 N 个密钥对，每个人只管理自己的密钥对。而使用对称加密则需要 `N* (N-1)/2` 个密钥 </u>，因此每个人需要管理 `N-1` 个密钥，密钥管理难度大，而且非常容易泄漏。

既然非对称加密这么好，那我们抛弃对称加密，完全使用非对称加密行不行？也不行。因为非对称加密的缺点就是运算速度非常慢，比对称加密要慢很多。

所以，在实际应用的时候，非对称加密总是和对称加密一起使用。假设小明需要给小红传输加密文件，他们首先交换了各自的公钥，然后：

1. 小明生成一个随机的 AES 口令，然后用小红的公钥通过 RSA 加密这个口令，并发给小红；
2. 小红用自己的 RSA 私钥解密得到 AES 口令；
3. 双方使用这个共享的 AES 口令用 AES 加密通信。

可见非对称加密实际上应用在第一步，即加密“AES 口令”。这也是<u>我们在浏览器中常用的 HTTPS 协议的做法，即浏览器和服务器先通过 RSA 交换 AES 口令，接下来双方通信实际上采用的是速度较快的 AES 对称加密，而不是缓慢的 RSA 非对称加密。</u>

Java 标准库提供了 RSA 算法的实现：

```java
import java.math.BigInteger;
import java.security.*;

import javax.crypto.Cipher;

public class Main {
	public static void main(String[] args) throws Exception {
		// 明文:
		byte[] plain = "Hello，使用RSA非对称加密算法对数据进行加密！".getBytes("UTF-8");
		// 创建公钥／私钥对:
		Person alice = new Person("Alice");
		// 用Alice的公钥加密:
		byte[] pk = alice.getPublicKey();
		System.out.println(String.format("public key: %x", new BigInteger(1, pk)));
		byte[] encrypted = alice.encrypt(plain);
		System.out.println(String.format("encrypted: %x", new BigInteger(1, encrypted)));
		// 用Alice的私钥解密:
		byte[] sk = alice.getPrivateKey();
		System.out.println(String.format("private key: %x", new BigInteger(1, sk)));
		byte[] decrypted = alice.decrypt(encrypted);
		System.out.println(new String(decrypted, "UTF-8"));
	}
}

class Person {
	String name;
	// 私钥:
	PrivateKey sk;
	// 公钥:
	PublicKey pk;

	public Person(String name) throws GeneralSecurityException {
		this.name = name;
		// 生成公钥／私钥对:
		KeyPairGenerator kpGen = KeyPairGenerator.getInstance("RSA");
		kpGen.initialize(1024);
		KeyPair kp = kpGen.generateKeyPair();
		this.sk = kp.getPrivate();
		this.pk = kp.getPublic();
	}

	// 把私钥导出为字节
	public byte[] getPrivateKey() {
		return this.sk.getEncoded();
	}

	// 把公钥导出为字节
	public byte[] getPublicKey() {
		return this.pk.getEncoded();
	}

	// 用公钥加密:
	public byte[] encrypt(byte[] message) throws GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.ENCRYPT_MODE, this.pk);
		return cipher.doFinal(message);
	}

	// 用私钥解密:
	public byte[] decrypt(byte[] input) throws GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.DECRYPT_MODE, this.sk);
		return cipher.doFinal(input);
	}
}
```

#### 小结

非对称加密就是加密和解密使用的不是相同的密钥，只有同一个公钥—私钥对才能正常加解密；

`只使用非对称加密算法不能防止中间人攻击`。

### 签名算法

我们使用非对称加密算法的时候，对于一个公钥—私钥对，通常是用公钥加密，私钥解密。

如果使用私钥加密，公钥解密是否可行呢？实际上是完全可行的。

不过我们再仔细想一想，私钥是保密，而公钥是公开的，用私钥加密，那相当于所有人都可以用公钥解密。这个加密有什么意义？

这个加密的意义在于，如果小明用自己的私钥加密了一条消息，比如`小明喜欢小红`，然后他公开了加密消息，由于任何人都可以用小明的公钥解密，从而使得任何人都可以确认`小明喜欢小红`这条消息肯定是小明发出的，其他人不能伪造这个消息，小明也不能抵赖这条消息不是自己写的。

因此，<u>私钥加密得到的密文实际上就是数字签名，要验证这个签名是否正确，只能用私钥持有者的公钥进行解密验证。使用数字签名的目的是为了确认某个消息确实是由某个发送方发送的，任何人都不可能伪造消息，并且，发送方也不能抵赖。</u>

在实际应用的时候，签名实际上并不是针对原始消息，而是针对`原始信息的哈希进行签名`，就：

```bash
signature = ecrypt(privateKey, sha256(message));
```

对签名进行验证实际上就是公钥解密：

```bash
hash = decrypt(publicKey, signature)
```

然后把解密后的哈希与远水新秀的哈希进行对比。

因为用户总是使用自己的私钥进行签名，所以，私钥就相当于用户身份。而公钥用来给外部验证用户身份。

常用数字签名算法有：

- MD5withRSA
- SHA1withRSA
- SHA256withRSA

它们实际上就是指定某种哈希算法进行 RSA 签名的方式。

```java

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.*;

public class Main {
	public static void main(String[] args) throws GeneralSecurityException {
		// 生成RSA公钥/私钥:
		KeyPairGenerator kpGen = KeyPairGenerator.getInstance("RSA");
		kpGen.initialize(1024);
		KeyPair kp = kpGen.generateKeyPair();
		PrivateKey sk = kp.getPrivate();
		PublicKey pk = kp.getPublic();

		// 待签名的消息:
		byte[] message = "Hello, I am Bob!".getBytes(StandardCharsets.UTF_8);

		// 用私钥签名:
		Signature s = Signature.getInstance("SHA1withRSA");
		s.initSign(sk);
		s.update(message);
		byte[] signed = s.sign();
		System.out.println(String.format("signature: %x", new BigInteger(1, signed)));

		// 用公钥验证:
		Signature v = Signature.getInstance("SHA1withRSA");
		v.initVerify(pk);
		v.update(message);
		boolean valid = v.verify(signed);
		System.out.println("valid? " + valid);
	}
}`
```

<!-- 文件切片上传，也可以采用私钥加密，公钥处理，不仅仅是 MD5 值 -->

#### 小结

数字签名就是用发送方的私钥对原始数据进行签名，只有用发送方公钥才能通过签名验证。

数字签名用于：

- 防止伪造
- 防止抵赖
- 检测篡改。

常用的数字签名算法包括：MD5withRSA/SHA1withRSA/SHA256withRSA/SHA1with
DSA/SHA512withDSA/ECDSA 等。

### 数字证书

我们知道，摘要算法用来确保数据没有被篡改，非对称加密可以对数据进行加解密，签名算法可以确保数据完整性和抗否认性，把这些算法集合到一起，并搞一套完善的标准，这就是数字证书。

因此，数字证书就是集合了多种密码学算法，用于实现数据加解密、身份认证、签名等多种功能的一种安全标准。

`数字证书可以防止中间人`攻击，因为它采用链式认证，即通过根证书（Root CA）去签名下一级证书，这样层层签名，直到最终的用户证书。<u>而 Root CA 证书内置于操作系统中，所以你，任何经过 CA 认证的数字证书都可以对其本身进行校验，确保证书本身不是伪造的。</u>

我们在上网时常用的 HTTPS 协议就是数字证书的应用。浏览器会自动验证证书的有效性：

![](../.vuepress/public/images/2020-07-13-21-45-36-https.png)

要使用数字证书，首先需要创建证书。正常情况下，一个合法的数字证书需要经过 CA 签名，这需要`认证域名并支付一定的费用`。开发的时候，我们可以使用自签名的证书，这种证书可以正常开发调试，但不能对外作为服务使用，因为其他客户端并不认可未经 CA 签名的证书。

在 Java 程序中，数字证书存储在一种 Java 专用的 key store 文件中，JDK 提供了一系列命令来创建和管理 key store。

```java
public static void main(String[] args) throws Exception {
		byte[] message = "Hello, use X.509 cert!".getBytes("UTF-8");
		// 读取KeyStore:
		KeyStore ks = loadKeyStore("/my.keystore", "123456");
		// 读取私钥:
		PrivateKey privateKey = (PrivateKey) ks.getKey("mycert", "123456".toCharArray());
		// 读取证书:
		X509Certificate certificate = (X509Certificate) ks.getCertificate("mycert");
		// 加密:
		byte[] encrypted = encrypt(certificate, message);
		System.out.println(String.format("encrypted: %x", new BigInteger(1, encrypted)));
		// 解密:
		byte[] decrypted = decrypt(privateKey, encrypted);
		System.out.println("decrypted: " + new String(decrypted, "UTF-8"));
		// 签名:
		byte[] sign = sign(privateKey, certificate, message);
		System.out.println(String.format("signature: %x", new BigInteger(1, sign)));
		// 验证签名:
		boolean verified = verify(certificate, message, sign);
		System.out.println("verify: " + verified);
	}
```

以 HTTPS 协议为例，浏览器和服务器建立安全连接的步骤如下：

1. 浏览器向服务器发起请求，服务器向浏览器发送自己的数字证书；
2. 浏览器用操作系统内置的 Root CA 来验证服务器的证书是否有效，如果有效，就使用该证书加密一个随机的 AES 口令并发送给服务器；
3. 服务器用自己的私钥解密获得 AES 口令，并在后续通讯中使用 AES 解密。

上述流程只是一种最常见的单向验证。如果服务器还要验证客户端，那么客户端也需要把自己的证书发送给服务器验证，这种常见常见于网银等。

**注意**：数字证书存储的是公钥，以及相关的证书链和算法信息。私钥必须严格保密，如果数字证书对应的私钥泄漏，就会造成严重的安全威胁。如果 CA 证书的私钥泄漏，那么该 CA 证书签发的所有证书将不可信。数字证书服务商 [DigNotar](https://en.wikipedia.org/wiki/DigiNotar) 就发送过私钥泄漏导致公司破产的事故。

#### 小结

数字证书就是集合了多种密码学算法，用于实现数据加解密、身份认证、签名等多种功能的一种安全标准。

数字证书采用链式签名管理，顶级的 Root CA 证书已内置在操作系统中。

数字证书存储的是公钥，可以安全公开，而私钥必须严格保密。

## 多线程

### 多线程基础

[程序员内功——进程与线程](../temp/程序员内功——进程与线程.md)

### 创建新线程

Java 语言内置了

#### 每个 Thread 需要一个任务来执行，一个可以放在执行空间的任务

Thread 对象需要任务。任务是线程在启动时去执行的工作。该任务是新线程空间的第一个方法，且它一定要长得像下面这样：

```java
// Runnable 这个接口只有一个方法：public void run()
public void run() {
  // 会被新线程的执行的带墨镜
}
```

线程怎么会知道要先放上去哪个方法？因为 Runnable 定义了一个协约。因为 Runnable 是个接口，线程的任务可以被定义在任何实现 Runnable 的类上。线程只在乎传入给 Thread 的构造函数的参数是否为实现 Runnable 的类。

当你把 Runnable 传给 Thread 的构造函数时，实际上就是在给 Thread 取得 `run()` 的办法。

```java
public class Main {

	public static void main(String[] args) {
		Runnable threadJob = new MyRunnable();
		Thread myThread = new Thread(threadJob);
		myThread.start();
		System.out.println("back in main");
	}

}

class MyRunnable implements Runnable {
	public void run() {
		go();
	}
	public void go() {
		doMore();
	}
	public void doMore() {
		System.out.println("top o' the stack");
	}
 }
```

除了上面手动实现 runnable 外，也可以直接复写 Thread 的 run 方法，Thread 类本身也做好了继承 runnable 任务接口的实现。

```java
public class Main {
	public static void main(String[] args) {
		new Thread1().start();
		new Thread2().start();
		System.out.println("back in main");
	}

}
class Thread1 extends Thread {
  @Override
	public void run() {
			System.out.println("Thread-1: running...");
		}
	}
}

class Thread2 extends Thread {
  @Override
	public void run() {
			System.out.println("Thread-2: running...");
		}
	}
}

```

这种面向对象写法更加适合需要处理特殊工作的 Thread 类。

线程执行完 run() 后就不能重新启动了。

#### main 主线程与子线程的出现的不同执行结果

main() 启动新的线程，新的线程启动期间 main 的线程会`暂时`停止执行。

显示调度器会有多个不可预测的范例，
有时它会这样执行：

- main() 启动新的线程，调度器把主线程搁置以便执行新的线程。
- 调度器让新的程序执行完后，主线程恢复

有时它会这样执行

- main() 启动新的线程，调度器把主线程搁置以便执行新的线程。
- 调度器让新的程序执一下就回到主线程继续执行。
- 调度器回到新你的线程继续执行。
- 然后又回到主线程。

Java 虚拟机的调度器（底层 C 也是通过操作系统来调度）不能保证任何的执行时间和顺序，所以我们不能期待它会完全地平均分配执行，最多也只能影响 `sleep` 的最小保证时间。要模拟`并发执行`的效果，可以让线程睡眠。

```java
class MyRunnable implements Runnable {
	public void run() {
		go();
	}
	public void go() {
**		try {
			Thread.sleep(2000);
		} catch(InterruptedException ex) {
			ex.printStackTrace();
		}**
		doMore();
	}
	public void doMore() {
		System.out.println("top o' the stack");
	}
 }
```

除了使用 sleep 外，我们也可以给线程设置优先级，以便优先级高的线程被操作系统调度的优先级较高，操作系统对高优先级线程可能调度更频繁，但我们绝不能通过设置优先级来确保高优先级的线程一定会执行。根据操作系统、使用的 Java 虚拟机版本、CPU 等，你会运行出不一样的结果。

#### 小结

Java 用 `Thread` 对象表示一个线程，通过调用 `start()` 启动一个新线程。

### 线程的状态

## Maven 基础

Maven 是一个 Java 项目管理和构建工具，它可以定义项目结构、项目依赖，并使用统一的方式进行自动化构建，是 Java 项目不可缺少的工具。

## 网络编程

网络编程是 Java 最擅长的方向之一，使用 Java 进行网络编程时，由虚拟机实现了底层复杂的网络协议，Java 程序只需要调用 Java 标准库提供的接口，就可以简单高效地编写网络程序。

### 网络编程的基础

在学习 Java 网络编程之前，我们先来了解什么是计算机网络。

计算机网络是指两台或更多的计算机组成的网络，在同一个网络中，任意两台计算机都可以直接通信，因为所有计算机都需要遵循同一种网络协议。

那什么是互联网呢？互联网是网络的网络（internet），即把很多计算机网络连接起来，形成一个全球统一的互联网。

对某个特定的计算机网络来说，它可能使用网络协议 ABC，而另一个计算机网络可能使用网络协议 XYZ。如果计算机网络各自的通讯协议不统一，就没法把不同的网络连接形成互联网。因此，为了把计算机网络接入互联网，就必须使用 `TCP/IP` 协议。

<u>TCP/IP 协议泛指互联网协议，其中最重要的两个协议是 TCP 协议和 IP 协议。</u>只有使用 TCP/IP 协议的计算机才能够联入互联网，使用其他网络协议（例如 NetBIOS、AppleTale 协议等）是无法联入互联网的。

#### IP 地址

在互联网中，一个 IP 地址用于标识一个`网络接口（Network Interface）`。<u>一台接入互联网的计算机肯定有一个 IP 地址，但也可能有多个 IP 地址。</u>

IP 地址分为 `IPv4` 和 `IPv6` 两种。IPv4 采用 32 位地址，类似 `101.202.99.12`，而 IPv6 采用 128 位地址，类似 `2001:0DA8:100A:0000:0000:1020:F2F3:1428`。IPv4 骶椎总共有 2^32 个（大约 42 亿），而 IPv6 地址则总共有 2^128 个（大约 340 万亿亿亿），IPv4 的地址目前已耗尽，而 IPv6 的地址是根本用不完的。

IP 又分为`公网 IP 地址`和`内网 IP 地址`。公网 IP 地址可以直接被访问，内网 IP 地址只能在内网访问。内网 IP 地址类似于：

- 192.168.x.x
- 10.x.x.x

IPv4 实际上是一个 32 整数。例如：

```bash
106717964 = 0x65ca630c
					= 65  ca  63 0c
					= 101.202.99.12
```

如果一台计算机只有一个网卡，并且接入了网络，那么，它有一个本机地址 `127.0.0.1`，还有一个 IP 地址，还有一个 IP 地址，例如 `101.202.99.12`，可以通过这个 IP 地址接入网络。

如果一台计算机有两块网卡，那么除了本机地址，它可以有两个 IP 地址，可以分别接入两个网络。<u>通常连接两个网络的设备是路由器或者交换机，</u>它至少有两个 IP 地址，分别接入不同的网络，让网络之间连接起来。

如果两台计算机位于同一个网络，那么他们之间可以直接通信，因为他们的 IP 地址前段是相同，也就是`网络号`是相同的。<u>网络号是 IP 地址通过子网掩码过滤后得到的。</u>

例如：

某台计算机的 IP 是 `101.202.99.2`，子网掩码是 `255.255.255.0`，那么计算该计算机的网络号是：

```bash
IP = 101.202.99.2
Mask = 255.255.255.0
Network = IP & Mask = 101.202.99.0
```

`每台计算机都需要正确配置 IP 地址和子网掩码`，根据这两个就可以 计算网络号，如果两台计算机的`网络号`相同（可以用手机开热点给电脑，然后进行测试），说明两台计算机在同一个网络，可以直接通信。<u>如果计算机计算出的网络号不同，那么两台计算机不在同一个网络，不能直接通信，它们之间必须通过`路由器`或者交换机这样的网络设备间接通信，我们把这种设备称为`网关`。</u>

<u>网关的作用就是连接多个网络，负责把来自一个网络的数据包发到另一个网络，这个过程叫路由。</u>

所以，一台计算机的一个网卡会有 3 个关键配置：

![](../.vuepress/public/images/2020-07-13-22-19-59-computer-network.png)

上面的路由即是网卡。

- IP 地址，例如：`192.168.43.183`
- 子网掩码，例如：`255.255.255.0`
- 网关的 IP 地址：`192.168.43.1`

#### 域名

因为直接记忆 IP 地址非常困难，所以我们通常使用域名访问某个特定的服务。<u>域名解析服务器 DNS 负责把域名翻译成对应的 IP，客户端再根据 IP 地址访问服务器。</u>

用 `nslookup` 可以查看域名对应的 IP 地址：

```bash
$ nslookup www.baidu.com
Server:		172.20.10.1
Address:	172.20.10.1#53

Non-authoritative answer:
www.baidu.com	canonical name = www.a.shifen.com.
Name:	www.a.shifen.com
Address: 183.232.231.174
Name:	www.a.shifen.com
Address: 183.232.231.172
```

有一个特殊的本机域名 `localhost`，它对应的 IP 地址总是本机地址：`127.0.0.1`。

#### 网络模型

由于计算机网络从底层的传输到高层的软件十分复杂，要合理地设计计算机网络模型，必须采用分层模型，每一层负责处理自己的操作。OSI （Open System Interconnect） 网络模型是 ISO 组织定义的一个计算机互联的标准模型，注意它只是一个定义，目的是为了简化网络各层的操作，提供标准接口便于实现和维护。这个模型依次从上到下依次是：

- `应用层`:提供应用程序之间的通信；
- `表示层`：处理数据格式，加解密`等；
- `会话层`：负责建立和维护会话；
- `传输层`：负责提供端到端的可靠传输；
- `网络层`：负责根据目标地址选择路由来传输数据；
- `链路层`和`物理层`把数据进行分片并且真正通过物理网络传输，例如，无线网、光纤等。

互联网实际使用的 TCP/IP 模型并不是对应到 OSI 的 7 层模型，二水大致对应 OSI 的 5 层模型：

| OSI    | TCP/IP     |
| ------ | ---------- |
| 应用层 | 应用层     |
| 表示层 |            |
| 会话层 |            |
| 传输层 | 传输层     |
| 网络层 | IP 层      |
| 链路层 | 网络接口层 |
| 物理层 | 物理层     |

在 OSI 模型中，第三层网络层负责 IP 地址，第二层数据链路层则负责 MAC 位址 [1] 。MAC 地址用于在网络中唯一标示一个网卡，一台设备若有一或多个网卡，则每个网卡都需要并会有一个唯一的 [MAC](https://baike.baidu.com/item/MAC%E5%9C%B0%E5%9D%80) 地址（MAC 地址（英语：Media Access Control Address），直译为媒体存取控制位址，也称为局域网地址（LAN Address），MAC 位址，以太网地址（Ethernet Address）或物理地址（Physical Address），它是一个用来确认网络设备位置的位址，大多数接入 Internet 的方式是把主机通过局域网组织在一起，然后再通过交换机或路由器等设备和 Internet 相连接。`这样一来就出现了如何区分具体用户，防止 IP地址被盗用的问题`。由于 IP 地址只是逻辑上的标识，任何人都能随意修改，因此不能用来具体标识一个用户。而 MAC 地址则不然，它是固化在网卡里面的。从理论上讲，除非盗来硬件即网卡，否则一般是不能被冒名顶替的。基于 MAC 地址的这种特点，因此局域网采用了用 MAC 地址来标识具体用户的方法）。

#### 常用协议

IP 协议是一个分组交换，它不保证可靠传输。而 TCP 协议是传输控制协议，它是面向连接的协议，支持可靠传输和双向通信。TCP 协议是建立在 IP 协议之上，简单地说，IP 协议只负责发数据包，不保证顺序和正确性，而 TCP 协议负责控制数据包传输，它在传输数据之前需要先建立连接，建立连接后才能传输数据，传输完后还需要断开连接。<u>TCP 协议之所以能保证数据的可靠传输，是通过接收确认、超时重传这些机制实现的。</u>并且，TCP 协议允许双向通信，即通信双方可以同时发送和接收数据。

TCP 协议也是应用最广泛的协议，许多高级协议都是建立在 TCP 协议之上的，例如 HTTP、SMTP 等。

UDP 协议（User Datagram Protocol）是一种数据报文协议，它是无连接协议，不保证可靠传输。因为 UDP 协议在通信前不需要建立连接，因此它的传输效率比 TCP 高，而且 UDP 协议比 TCP 协议要简单得多。

选择 UDP 协议时，传输的数据通常是容忍丢失的，例如，一些语音视频通信的应用会选择 UDP 协议。

#### 小结

计算机网络的基本概念主要有：

- `计算机网络`：由两台或更多计算机组成的网络；
- `互联网`：连接网络的网络；
- `IP 地址`：计算机的网络接口（通常是`网卡`）在网络中的唯一标识；
- `网关`：负责连接多个网络，并在多个网络之间转发数据的计算机，通常是路由器或交换机；
- 网络协议：互联网使用 TCP/IP 协议，它泛指互联网协议簇；
- IP 协议：一种分组交换传输协议；
- TCP 协议：一种面向连接、可靠传输的协议；
- UDP 协议：一种无连接，不可靠传输的协议。

### TCP 编程

在开发网络应用程序的时候，我们又会遇到 Socket 这个概念。Socket 是一个抽象概念，<u>一个应用程序通过一个 Socket 来建立一个远程连接，而 socket 内部通过 TCP/IP 协议把数据传输到网络：</u>

```bash
┌───────────┐                                   ┌───────────┐
│Application│                                   │Application│
├───────────┤                                   ├───────────┤
│  Socket   │                                   │  Socket   │
├───────────┤                                   ├───────────┤
│    TCP    │                                   │    TCP    │
├───────────┤      ┌──────┐       ┌──────┐      ├───────────┤
│    IP     │<────>│Router│<─────>│Router│<────>│    IP     │
└───────────┘      └──────┘       └──────┘      └───────────┘
```

<u>Socket、TCP 和部分 IIP 的功能都是操作系统提供的，不同的编程语言只是提供了对操作系统调用的简单的封装。</u>例如，Java 提供的几个 Socket 相关的类就封装了操作系统提供的接口。

为什么需要 Socket 进行网络通信？因为仅仅通过 IP 地址进行通信是不够的，同一台计算机同一时间会运行多个网络应用程序，例如浏览器、QQ、邮件客户端等。当操作系统接收到一个数据包的时候，如果只有 IP 地址，它没法判断应用发给哪个应用程序，所以，操作系统抽象出 Socket 接口，每个应用程序需要各自对应到不同的 Socket，数据包才能根据 Socket 正确地发送到对应的应用程序。

一个 Socket 就是由 IP 地址和端口号（范围是 0 ～ 65535）组成，可以把 Socket 简单理解为 `IP 地址加端口号`。端口号总是由操作系统分配，它是一个 `0～65535` 之间的数字，其中，小于 1024 的端口属于`特权端口`，需要管理员权限，大于 1024 的端口可以由任意用户的应用程序打开。

- Chrome：101.202.99.2:1201
- QQ：101.202.99.2:1304
- 有道邮箱：101.202.99.2:15000

使用 Socket 进行网络编程时，本质上就是<u>两个进程间的网络通信</u>。其中一个进程必须充当服务端，它回`主动监听`某个指定的端口，另一个进程必须充当客户端，它必须`主动连接`服务器的 IP 地址和端口，如果连接成功，服务器端和客户端就成功地建立了一个 TCP 连接，双方后续就可以随时发送和接收数据。

因此，当 Socket 连接成功地在服务器端和客户端之间建立后：

- 对服务器端来说，它的 Socket 是指定的 IP 地址和指定的端口号；
- 对客户端来说，它的 Socket 是它在计算机的 IP 地址和一个操作系统分配的随机端口号。

#### 服务端器端

要使用 Socket 编程，我们首先要编写服务器端程序。Java 标准库提供了 `ServerSocket` 来实现对指定 IP 和指定端口的监听。`ServerSocket` 的典型实现代码如下：

```java
public class Server {
	public static void main(String[] args) throws IOException {
		ServerSocket ss = new ServerSocket(6666); // 监听指定端口
		System.out.println("server is running...");
		for (;;) {
			Socket sock = ss.accept();
			System.out.println("connected from " + sock.getRemoteSocketAddress());
			Thread t = new Handler(sock);
			t.start();
		}
	}
}

class Handler extends Thread {
	Socket sock;

	public Handler(Socket sock) {
		this.sock = sock;
	}

	@Override
	public void run() {
		try (InputStream input = this.sock.getInputStream()) {
			try (OutputStream output = this.sock.getOutputStream()) {
				handle(input, output);
			}
		} catch (Exception e) {
			try {
				this.sock.close();
			} catch (IOException ioe) {
			}
			System.out.println("client disconnected.");
		}
	}

	private void handle(InputStream input, OutputStream output) throws IOException {
		var writer = new BufferedWriter(new OutputStreamWriter(output, StandardCharsets.UTF_8));
		var reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
		writer.write("hello\n");
		writer.flush();
		for (;;) {
			String s = reader.readLine();
			if (s.equals("bye")) {
				writer.write("bye\n");
				writer.flush();
				break;
			}
			writer.write("ok: " + s + "\n");
			writer.flush();
		}
	}
}

```

服务端通过代码：

```java
ServerSocket ss = new ServerSocket(666);
```

在指定端口 `6666` 监听。这里我们没有指定 IP 地址，表示在计算机的所有网络接口上进行监听。

如果 `ServerSocket` 监听成功，我们就使用一个无限循环来处理客户端的连接：

```java
for (;;) {
	Socket sock = ss.accept();
	Thread t = new Handler(sock);
	t.start();
}
```

注意到代码 `ss.accept()` 表示每当有新的客户端连接进来后，就返回一个 `Socket` 实例，这个 `Socket` 实例就是用来和刚连接的客户端进行通信的。由于客户端很多，要实现并发处理，我们就必须为每个新的 `Socket` 创建一个新线程来处理，这样，`主线程`的作用就是接收新的连接，每当收到新连接后，就创建一个新线程进行处理。

我们在多线程编程的章节介绍过`线程池`，这里也完全可以利用线程池来处理客户端连接，能大大提高运行效率。

如果没有客户端连接进来，`accpet()` 方法会阻塞并一直等待。如果有多个客户端同时连接进来，`ServerSocket` 会把连接扔进到队列里，然后一个一个处理。对于 Java 程序而言，只需要通过循环不断调用 `accept()` 就可以获取新的连接。

#### 客户端

相比服务器端，客户端程序就要简单得多。一个典型的客户端程序如下：

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class Client {
	public static void main(String[] args) throws IOException {
		Socket sock = new Socket("localhost", 6666); // 连接指定服务器和端口
		try (InputStream input = sock.getInputStream()) {
			try (OutputStream output = sock.getOutputStream()) {
				handle(input, output);
			}
		}
		sock.close();
		System.out.println("disconnected.");
	}

	private static void handle(InputStream input, OutputStream output) throws IOException {
		var writer = new BufferedWriter(new OutputStreamWriter(output, StandardCharsets.UTF_8));
		var reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
		Scanner scanner = new Scanner(System.in);
		System.out.println("[server] " + reader.readLine());
		for (;;) {
			System.out.print(">>> "); // 打印提示
			String s = scanner.nextLine(); // 读取一行输入
			writer.write(s);
			writer.newLine();
			writer.flush();
			String resp = reader.readLine();
			System.out.println("<<< " + resp);
			if (resp.equals("bye")) {
				break;
			}
		}
	}
}

```

客户端程序通过：

```java
Socket sock = new  Socket("localhost", 6666);
```

连接到服务端，注意上述代码的服务器地址是“`localhost`”，表示本机地址，端口号是 `6666`，将返回一个 `Socket` 实例，用于后续通信。

目前 Chrome 46 以上的每个 tab 就是一个客户端进程。

#### socket 流

当 Socket 连接创建成功后，无论是服务器端，还是客户端，我们都使用 `Socket` 实例进行网络通信。因为 TCP 是一种基于流的协议，因此，Java 标准库使用 `InputStream` 和 `OutputStream` 来封装 Socket 的数据流，这样我们使用 Socket 的流，和普通的 IO 流类似：

```java
// 用于读取网络数据
InputStream in  = sock.getInputStream();
// 用于写入网络数据
OutputStream out = sock.getOutputStream();
```

最后我们重点来看看，为什么写入网络时，要调用 `flush` 方法。

如果不调用 `flush`，我们很可能会发现，客户端和服务器都收不到数据，这并不是 Java 标准库的设计问题，而是我们以流的形式写入数据的时候，并不是一写入就立刻发送到网络，而是先写入`内存缓冲区`，<u>直到缓冲区满了，才会一次性真正发送到网络，</u>这样设计的目的是为了提高传输效率。如果缓冲区的数据很少，而我们又想强制把这些数据发送到网络，就必须用 `flush()` 强制把缓冲区数据发送出去。

#### 小结

使用 Java 进行 TCP 编程时，需要使用 Socket 模型：

- 服务器端用 `ServerSocket` 监听指定端口；
- 客户端使用 `Socket(InetAddress, port)` 连接服务器；
- 服务器端用 `accept()` 接收连接并返回 `socket`；
- 双方通过 `Socket` 打开 `InputStream/OutputStream` 读写数据；
- 服务器端通常使用多线程同时处理多个客户端连接，利用线程池可大幅提升效率；
- `flush` 用于强制输出缓冲区到网络。

### UDP 编程

和 TCP 编程相比，UDP 编程就简单得多，因为 UDP 没有创建连接，数据包也是一次收发一个，所以`没有流的概念`。

在 Java 中使用 UDP 编程，仍然要使用 Socket，因为应用程序在使用 UDP 时必须指定网络接口（IP）和端口号。注意：UDP 端口和 TCP 端口虽然都使用 0 ～ 65535，但他们是两套独立的端口，`即一个应用程序用 TCP 占用了端口 1234，不影响另一个应用程序用 UDP 占用端口 1234。`

#### 服务器端

在服务器端，使用 UDP 也需要监听指定的端口。Java 提供了 `DatagramSocket` 来实现这个功能，代码如下：

```java
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Server {
	public static void main(String[] args) throws IOException {
		DatagramSocket ds = new DatagramSocket(6666); // 监听指定端口
		System.out.println("server is running...");
		for (;;) {
			// 接收:
			byte[] buffer = new byte[1024];
			DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
			ds.receive(packet);
			String cmd = new String(packet.getData(), packet.getOffset(), packet.getLength(), StandardCharsets.UTF_8);
			// 发送:
			String resp = "bad command";
			switch (cmd) {
			case "date":
				resp = LocalDate.now().toString();
				break;
			case "time":
				resp = LocalTime.now().withNano(0).toString();
				break;
			case "datetime":
				resp = LocalDateTime.now().withNano(0).toString();
				break;
			case "weather":
				resp = "sunny, 10~15 C.";
				break;
			}
			System.out.println(cmd + " >>> " + resp);
			packet.setData(resp.getBytes(StandardCharsets.UTF_8));
			ds.send(packet);
		}
	}
}

```

服务器首先使用如下语句在指定的端口监听 UDP 数据包：

```java
DatagramSocket  ds = new DatagramSocket(666);
```

如果没有其他应用程序占据这个端口，那么监听成功，我们就使用一个无限循环来处理收到的数据包：

```java
for(;;) {...}
```

要接收一个 UDP 数据包，需要准备一个 `byte[]` 缓冲区，并通过 `DatagramPacket` 实现接收：

```java
byte[] buffer = new byte[1024];
DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
```

假设我们收取到的是一个 `String`，那么，通过 `DatagramPacket` 返回的 `packet.getOffset()` 和 `packet.getLength()` 确定数据在缓冲区的起止位置：

```java
String s = new String(packet.getData(), packet.getOffset(), packet.getLength(), StandradCharset.UTF_8);
```

当服务器收到一个 DatagramPacket 后，<u>通常必须立刻回复一个或多个 UDP 包，因为客户端地址在 DatagramPacket 中，每次收到的 DatagramPacket 可能是不同的客户端，如果不回复，客户端就收不到任何 UDP 包。</u>

发送 UDP 包也是通过 `DatagramPacket` 实现的：

```java
byte[] data = ...
packet.setData(data);
ds.send(packet);
```

#### 客户端

和服务器端相比，客户端使用 UDP 时，只需要直接向服务器发送 UDP 包，然后接收返回的 UDP 包：

```java
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class Client {
	public static void main(String[] args) throws IOException, InterruptedException {
		DatagramSocket ds = new DatagramSocket();
		ds.setSoTimeout(1000);
		ds.connect(InetAddress.getByName("localhost"), 6666); // 连接指定服务器和端口
		DatagramPacket packet = null;
		for (int i = 0; i < 5; i++) {
			// 发送:
			String cmd = new String[] { "date", "time", "datetime", "weather", "hello" }[i];
			byte[] data = cmd.getBytes();
			packet = new DatagramPacket(data, data.length);
			ds.send(packet);
			// 接收:
			byte[] buffer = new byte[1024];
			packet = new DatagramPacket(buffer, buffer.length);
			ds.receive(packet);
			String resp = new String(packet.getData(), packet.getOffset(), packet.getLength());
			System.out.println(cmd + " >>> " + resp);
			Thread.sleep(1500);
		}
		ds.disconnect();
		System.out.println("disconnected.");
	}
}

```

客户端打开一个 `DatagramSocket` 使用以下代码：

```java
DatagramSocket ds = new DatagramSocket();
		ds.setSoTimeout(1000);
		ds.connect(InetAddress.getByName("localhost"), 6666); // 连接指定服务器和端口
```

客户端创建 `DatagramSocket` 实例时并不需要指定端口，而是由操作系统自动指定一个当前未使用的端口。紧接着，调用 `setSoTimeout(1000)` 设定超时 1 秒，意思是<u>后续接收 UDP 包时，等待时间最多不会超过 1 秒，否则在没有收到 UDP 包时，客户端会无限等待下去。这一点和服务器端不一样，服务器端可以无限等待，因为它本来就被设计成长时间运行。</u>

注意到客户端的 `DatagramSocket` 还调用了一个 `connect()` 方法“连接”到指定的服务器端。不是说 UDP 是无连接的协议吗？为啥还需要 `connect()` ？

这个 `connect()` 方法不是真连接，它是<u>为了在客户端的 `DatagramSocket` 实例中保存服务器端的 IP 和端口号，确保这个 `DatagramSocket` 实例只能往指定的地址和端口发送 UDP 包，不能往其他地址和端口发送。</u>这么做不是 UDP 的限制，而是 Java 内置了`安全检查`。

如果客户端希望向两个不同的服务器发送 UDP 包，那么它必须创建两个 `DatagramSocket` 实例。

后续的收发数据和服务器端是一致的。通常来说，<u>客户端必须先发 UDP 包，因为客户端步发 UDP 包，服务器端就根本不知道客户端的地址和端口号。</u>

如果客户端认为通信结束，就可以调用 `disconnect()` 断开连接：

```java
ds.disconnect()
```

注意到 `disconnect()` 也不是真正地断开连接，它只是清除了客户端 `DatagramSocket` 实例记录的远程服务器地址和端口号，这样，`DatagramSocket` 实例就可以连接另一个服务器端。

#### 小结

使用 UDP 协议通信时，服务器和客户端双方无需建立连接：

- 服务器端用 `DatagramSocket(port)` 监听端口；
- 客户端使用 `DatagramSocket.connect()` 指定远程地址和端口；
- 双方通过 `receive()` 和 `send()` 读写数据；
- `DatagramSocket` 没有 IO 流接口，数据被直接写入 `byte[]` 缓冲区。

### 发送 Email

Email 就是电子邮件。电子邮件的应用已经有几十年的历史了，我们熟悉的邮箱地址比如 `abc@example.com` ，邮件软件比如 Outlook 都是用来收发邮件的。

使用 Java 程序也可以 i 收发电子邮件。我们先来看一下传统的邮件是如何发送的。

传统的邮件是通过邮局传递，然后从一个邮局到另一个邮局，最终到达用户的邮箱：

```bash
           ┌──────────┐    ┌──────────┐
           │PostOffice│    │PostOffice│     .───.
┌─────┐    ├──────────┤    ├──────────┤    (   ( )
│═══ ░│───>│ ┌─┐ ┌┐┌┐ │───>│ ┌─┐ ┌┐┌┐ │───> `─┬─'
└─────┘    │ │░│ └┘└┘ │    │ │░│ └┘└┘ │       │
           └─┴─┴──────┘    └─┴─┴──────┘       │
```

电子邮件的发送过程也是类似的，只不过是电子邮件是从用户电脑的邮件软件，例如 Outlook，发送到邮件服务器上，可能经过若干个邮件服务器的中转，最终到达对方邮件服务器上，收件方就可以用软件接收邮件。

```bash
         ┌─────────┐    ┌─────────┐    ┌─────────┐
             │░░░░░░░░░│    │░░░░░░░░░│    │░░░░░░░░░│
┌───────┐    ├─────────┤    ├─────────┤    ├─────────┤    ┌───────┐
│░░░░░░░│    │░░░░░░░░░│    │░░░░░░░░░│    │░░░░░░░░░│    │░░░░░░░│
├───────┤    ├─────────┤    ├─────────┤    ├─────────┤    ├───────┤
│       │───>│O ░░░░░░░│───>│O ░░░░░░░│───>│O ░░░░░░░│<───│       │
└───────┘    └─────────┘    └─────────┘    └─────────┘    └───────┘
   MUA           MTA            MTA            MDA           MUA
```

我们把类似 Outlook 这样的邮件称为 `MUA：Mail User Agent`，意思是给用户服务的邮件代理；邮件服务器则称为 `MTA：Mail Transfer Agent`，意思是邮件中转的代理；最终到达的邮件服务器称为 `MDA：Mail Delivery Agent`，意思是邮件到达的代理。电子邮件一旦到达 MDA，就不再动了。实际上，电子邮件通常就存储在 MDA 服务器的硬盘上，然后等收件人通过软件或者登录浏览器查看邮件。

MTA 和 MAD 这样的服务器软件通常是现成的，我们不关心这些服务器内部是如何运行的。要发送邮件，我们关心的是<u>如何编写一个 MUA 的软件，把邮件发送到 MTA 上。</u>

MUA 到 MTA 发送邮件的协议就是 `SMTP` 协议，它是 Simple Mail Transport Protocol 的缩写，使用`标准端口 25`，也可以使用加密端口 `464` 或 `587`。

<u>SMTP 协议是一个建立在 TCP 之上的协议，任何程序发送邮件都必须遵守 SMTP 协议。</u>使用 Java 程序发送邮件时，我们无需关心 SMTP 协议的底层原理，只需要使用 JavaMail 这个标准 API 就可以直接发送邮件。

#### 准备 SMTP 登录信息

假设我们准备使用自己的邮件地址是 `me@example.com` 给小明发送邮件，已知小明的邮件地址是 `xiaoming@somewhere.com`，发送邮件前，我们首先要确定

#### 发送邮件

#### 发送 HTML 邮件

#### 发送附件

#### 发送内嵌图片的 HTML 邮件

#### 常见问题

#### 小结

### 接收 Email

### HTTP 编程

什么是 HTTP？HTTP 就是目前使用最广泛的 Web 应用程序的基础协议，例如，浏览器访问网站，手机 App 访问后台服务器，都是通过 HTTP 协议实现的 。

HTTP 是 HyperText Transfer Protocol 的缩写，翻译为超文本传输协议，它是基于 TCP 协议之上的一种`请求-响应`协议。

我们来看一下浏览器请求访问某个网站时发送的 HTTP 请求-响应。当浏览器希望访问某个网站时，浏览器和网站服务器之间首先建立 TCP 连接，且服务器总是使用 `80` 端口和加密端口 `443`。然后，浏览器向服务器发送一个 HTTP 请求，服务器收到后，返回一个 HTTP 响应，并且在响应中包含了 HTML 的网页内容，这样，浏览器解析 HTML 后就可以给用户显示网页了。一个完整的 HTTP 请求-响应如下：

```bash
            GET / HTTP/1.1
            Host: www.sina.com.cn
            User-Agent: Mozilla/5 MSIE
            Accept: */*                ┌────────┐
┌─────────┐ Accept-Language: zh-CN,en  │░░░░░░░░│
│O ░░░░░░░│───────────────────────────>├────────┤
├─────────┤<───────────────────────────│░░░░░░░░│
│         │ HTTP/1.1 200 OK            ├────────┤
│         │ Content-Type: text/html    │░░░░░░░░│
└─────────┘ Content-Length: 133251     └────────┘
  Browser   <!DOCTYPE html>              Server
            <html><body>
            <h1>Hello</h1>
            ...
```

HTTP 请求的格式是固定的，它由 HTTP Header 和 HTTP Body 两部分构成。第一行总是 `请求方法 路径 HTTP 版本`，例如，`GET / HTTP / 1.1` 表示使用 `GET` 请求，路径是 `/`，版本是 `HTTP/1.1`。

后续的每一行都是固定的 `Header: Value` 格式，我们称为 HTTP Header，服务器依靠某些特定的 Header 来识别客户端请求，例如：

- `Host`：表示请求的域名，因为一台服务器上可能有多个网站，因此有必要依靠 Host 来识别用于请求；
- `User-Agent`：表示客户端自身标识信息，不同的浏览器有不同的标识，服务器依靠 User-Agent 判断客户端类型；
- `Accept`：表示客户端能处理的 HTTP 响应格式，`*/*` 表示任意格式，`text/*` 表示任意文本，`image/png` 表示 PNG 格式的图片；
- `Accept-Language`：表示客户端接收的语言，多种语言按优先级排序，服务器依靠该字段给用户返回特定语言的网页版本。

如果是 `GET` 请求，那么该 HTTP 请求只有 HTTP Header，没有 HTTP Body。如果是 `POST` 请求，那么该 HTTP 请求带有 Body，以一个空行分隔。一个典型的带 Body 的 HTTP 请求如下：

```bash
POST /login HTTP/1.1
Host: www.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 30

username=hello&password=123456
```

`POST` 请求通常要设置 `Content-Type` 表示 Body 的类型，`Content-Lenght` 表示 Body 的长度，这样服务器就可以根据请求的 `Header` 和 `Body` 做出正确的响应。

此外，`GET` 请求的参数必须附加在 URL 上，并以 URLEncode 方式编码，例如：`http://www.example.com/?a=1&b=K%26R`，参数分别是 `a=1` 和 `b=K&R`。因为 URL 的长度限制，`GET` 请求的参数不能太多，而 `POST` 请求的参数就没有长度限制，因为 `POST` 请求的参数必须放到 Body 中。并且 `POST` 请求的参数不一定是 URL 编码，可以按任意格式编码，只需要在 `Content-Type` 中正确设置即可。常见的发送 JSON 的 `POST` 请求如下：

```bash
POST /login HTTP/1.1
Content-Type: application/json
Content-Length: 38

{"username":"bob","password":"123456"}
```

HTTP 响应也是由 Header 和 Body 两部分组成，一个典型的 HTTP 响应如下：

```bash
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 133251

<!DOCTYPE html>
<html><body>
<h1>Hello</h1>
...
```

响应的第一行总是 `HTTP 版本 响应代码 响应说明`，例如，`HTTP/1.1 200 OK`表示版本是 `HTTP/1.1`，响应代码是 `200`，响应说明是 `OK`。<u>客户端只依赖响应代码判断 HTTP 响应是否成功。</u> HTTP 有固定的响应代码：

- `1xx`：表示一个提示性响应，例如 101 表示将切换协议，常见于 WebSocket 连接；
- `2xx`：表示一个成功的响应，例如 200 表示成功，206 表示只发送了部分内容；
- `3xx`：表示一个重定向的响应，例如 301 表示永久重定向，303 表示客户端应该按指定路径重新发送请求；
- `4xx`：表示一个因为客户端问题导致的错误响应，例如 400 表示因为 `Content-Type` 等各种原因导致的无效请求，404 表示指定的路径不存在；
- `5xx`：表示一个因为服务器问题导致的错误响应，例如 500 表示服务器内部故障，503 表示服务器暂时无法响应。

当浏览器收到第一个 HTTP 响应后，它解析 HTML 后，又会发送一系列 HTTP 请求，例如，`GET /logo.jpg HTTP/1.1` 请求一个图片，服务器响应图片请求后，会直接把二进制内容的图片发送给浏览器：

```bash
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: 18391

????JFIFHH??XExifMM?i&??X?...(二进制的JPEG图片)
```

因此，服务器总是被动地接收客户端的一个 HTTP 请求，然后响应它。客户端则根据需要发送若干个 HTTP 请求。

对于最早期的 HTTP/1.0 协议，每次发送一个 HTTP 请求，客户端都需要先创建一个新的 TCP 连接，然后，收到服务器响应后，关闭这个 TCP 连接。由于建立 TCP 连接就比较耗时，因此，为了提供效率，HTTP/1.1 协议允许在一个 TCP 连接中反复发送-响应，这样就能大大提高效率。

```bash
                       ┌─────────┐
┌─────────┐            │░░░░░░░░░│
│O ░░░░░░░│            ├─────────┤
├─────────┤            │░░░░░░░░░│
│         │            ├─────────┤
│         │            │░░░░░░░░░│
└─────────┘            └─────────┘
     │      request 1       │
     │─────────────────────>│
     │      response 1      │
     │<─────────────────────│
     │      request 2       │
     │─────────────────────>│
     │      response 2      │
     │<─────────────────────│
     │      request 3       │
     │─────────────────────>│
     │      response 3      │
     │<─────────────────────│
     ▼                      ▼
```

因为 HTTP 协议是一个请求-响应协议，客户端在发送了一个 HTTP 请求后，必须等待服务器响应后，才能发送下一个请求，这样一来，如果某个响应太慢，它就会堵住后面的请求。

所以，为了进一步提速，<u>HTTP/2.0 允许客户端在没有收到响应的时候，发送多个 HTTP 请求，服务器返回响应的时候，不一定按顺序返回，只要双方能识别出哪个响应对应哪个请求，就可以做到并行发送和接收：</u>

```bash
                       ┌─────────┐
┌─────────┐            │░░░░░░░░░│
│O ░░░░░░░│            ├─────────┤
├─────────┤            │░░░░░░░░░│
│         │            ├─────────┤
│         │            │░░░░░░░░░│
└─────────┘            └─────────┘
     │      request 1       │
     │─────────────────────>│
     │      request 2       │
     │─────────────────────>│
     │      response 1      │
     │<─────────────────────│
     │      request 3       │
     │─────────────────────>│
     │      response 3      │
     │<─────────────────────│
     │      response 2      │
     │<─────────────────────│
     ▼                      ▼
```

可见，HTTP/2.0 进一步提高了效率。

#### HTTP 编程

既然 HTTP 涉及到客户端和服务端，和 TCP 类似，我们也需要针对客户端编程和针对服务器编程。

本节我们不讨论服务器端的 HTTP 编程，因为服务器端的 HTTP 编程上就是编程 Web 服务器，这是一个非常复杂的体系，也是 JavaEE 开发的核心内容。

本节我们只讨论作为客户端的 HTTP 编程。

因为浏览器也是一种 HTTP 客户端，所以，客户端的 HTTP 编程，它的行为本质上和浏览器是一样的，即发送一个 HTTP 请求，接收服务器响应后，获得响应内容。只不过浏览器进一步把响应内容解析后渲染并展示给了用户，而我们使用 Java 进行 HTTP 客户端编程仅限于获得响应内容。

我们来看一下 Java 如果使用 HTTP 客户端编程。

Java 标准库提供了基于 HTTP 的包，但是要注意，早期的 JDK 版本是通过 `HttpURLConnection` 访问 HTTP，典型代码如下：

```java
RL url = new URL("http://www.example.com/path/to/target?a=1&b=2");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("GET");
conn.setUseCaches(false);
conn.setConnectTimeout(5000); // 请求超时5秒
// 设置HTTP头:
conn.setRequestProperty("Accept", "*/*");
conn.setRequestProperty("User-Agent", "Mozilla/5.0 (compatible; MSIE 11; Windows NT 5.1)");
// 连接并发送HTTP请求:
conn.connect();
// 判断HTTP响应是否200:
if (conn.getResponseCode() != 200) {
    throw new RuntimeException("bad response");
}
// 获取所有响应Header:
Map<String, List<String>> map = conn.getHeaderFields();
for (String key : map.keySet()) {
    System.out.println(key + ": " + map.get(key));
}
// 获取响应内容:
InputStream input = conn.getInputStream();
...
```

上述代码编写比较繁琐，并且需要手动初六 `InputStream`，所以用起来很麻烦。

从 Java 11 开始，引入了新的 `HttpClient`，它使用链式调用的 API，能大大简化 HTTP 的处理。

我们来看看如何使用新版的 `HttpClient`。首先要创建一个全局 `HttpClient` 实例，因为 `HttpClient` 内部使用线程池优化多个 HTTP 连接，可以复用：

```java
static HttpClient httpClient = HttpClient.newBuilder().build();
```

使用 `GET` 请求获取文本内容代码如下：

```java
mport java.net.URI;
import java.net.http.*;
import java.net.http.HttpClient.Version;
import java.time.Duration;
import java.util.*;

public class Main {
    // 全局HttpClient:
    static HttpClient httpClient = HttpClient.newBuilder().build();

    public static void main(String[] args) throws Exception {
        String url = "https://www.sina.com.cn/";
        HttpRequest request = HttpRequest.newBuilder(new URI(url))
            // 设置Header:
            .header("User-Agent", "Java HttpClient").header("Accept", "*/*")
            // 设置超时:
            .timeout(Duration.ofSeconds(5))
            // 设置版本:
            .version(Version.HTTP_2).build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        // HTTP允许重复的Header，因此一个Header可对应多个Value:
        Map<String, List<String>> headers = response.headers().map();
        for (String header : headers.keySet()) {
            System.out.println(header + ": " + headers.get(header).get(0));
        }
        System.out.println(response.body().substring(0, 1024) + "...");
    }
}
```

如果我们要获取图片这样的二进制内容，只需要把 `HttpResponse.BodyHandlers.ofString()` 换成 `HttpResponse.BodyHandlers.ofByteArray()` ，就可以获得一个 `HttpResponse<byte[]>` 对象，如果响应的内容很大，不希望一次性全部加载到内存，可以使用 `HttpResponse.BodyHandlers.ofInputStream()` 获取一个 `InputStream` 流。

要使用 `POST` 请求，我们要准备好发送的 `Body` 数据并正确设置 `Content-Type`：

```java
String url = "http://www.example.com/login";
String body = "username=bob&password=123456";
HttpRequest request = HttpRequest.newBuilder(new URI(url))
    // 设置Header:
    .header("Accept", "*/*")
    .header("Content-Type", "application/x-www-form-urlencoded")
    // 设置超时:
    .timeout(Duration.ofSeconds(5))
    // 设置版本:
    .version(Version.HTTP_2)
    // 使用POST并设置Body:
    .POST(BodyPublishers.ofString(body, StandardCharsets.UTF_8)).build();
HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
String s = response.body();
```

这样的话，在服务端也可以对其他服务器进行接口的请求。

服务端

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Server {
	public static void main(String[] args) throws IOException {
		ServerSocket ss = new ServerSocket(5050); // 监听指定端口
		System.out.println("server is running...");
		for (;;) {
			Socket sock = ss.accept();
			System.out.println("connected from " + sock.getRemoteSocketAddress());
			Thread t = new Handler(sock);
			t.start();
		}
	}
}

class Handler extends Thread {
	Socket sock;

	public Handler(Socket sock) {
		this.sock = sock;
	}

	@Override
	public void run() {
		try (InputStream input = this.sock.getInputStream()) {
			try (OutputStream output = this.sock.getOutputStream()) {
				handle(input, output);
			}
		} catch (Exception e) {
			try {
				this.sock.close();
			} catch (IOException ioe) {
			}
			System.out.println("client disconnected.");
		}
	}

	private void handle(InputStream input, OutputStream output) throws IOException {
		System.out.println("Process new http request...");
		var reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
		var writer = new BufferedWriter(new OutputStreamWriter(output, StandardCharsets.UTF_8));
		// 读取HTTP请求:
		boolean requestOk = false;
		String first = reader.readLine();
		if (first.startsWith("GET / HTTP/1.")) {
			requestOk = true;
		}
		for (;;) {
			String header = reader.readLine();
			if (header.isEmpty()) { // 读取到空行时, HTTP Header读取完毕
				break;
			}
			System.out.println(header);
		}
		System.out.println(requestOk ? "Response OK" : "Response Error");
		if (!requestOk) {
			// 发送错误响应:
			writer.write("404 Not Found\r\n");
			writer.write("Content-Length: 0\r\n");
			writer.write("\r\n");
			writer.flush();
		} else {
			// 发送成功响应:
			String data = "<html><body><h1>Hello, world!</h1></body></html>";
			int length = data.getBytes(StandardCharsets.UTF_8).length;
			writer.write("HTTP/1.0 200 OK\r\n");
			writer.write("Connection: close\r\n");
			writer.write("Content-Type: text/html\r\n");
			writer.write("Content-Length: " + length + "\r\n");
			writer.write("\r\n"); // 空行标识Header和Body的分隔
			writer.write(data);
			writer.flush();
		}
	}
}

```

#### 小结

Java 提供了 `HttpClient` 作为新的 HTTP 客户端编程接口用于取代老的 `HttpURLConnection` 接口；

`HttpClient` 使用链式调用并通过内置的 `BodyPublishers` 和 `BodyHandlers` 来更方便地处理数据。

### RMI 远程调用

Java 的 RMI 远程调用是指，一个 JVM 中的代码可以通过网络实现远程调用另一个 JVM 的某个方法。RMI 是 Remote Method Invocation 的缩写。

## XML 与 JSON

XML 和 JSON 是两种经常在网络使用的数据表示格式，本章我们介绍如何使用 Java 读写 XML 和 JSON。

### XML 简介

XML 是可扩展标记语言（extensible Markup Language）的缩写，它是一种数据表示格式，可以描述非常复杂的数据结构，常用于传输和存储数据。

例如，一个描述书籍的 XML 文档可能如下：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE note SYSTEM "book.dtd">
<book id="1">
    <name>Java核心技术</name>
    <author>Cay S. Horstmann</author>
    <isbn lang="CN">1234567</isbn>
    <tags>
        <tag>Java</tag>
        <tag>Network</tag>
    </tags>
    <pubDate/>
</book>
```

XML 有几个特点：一是纯文本，默认使用 UTF-8 编码，二是可嵌套，适合表示结构化数据。如果把 XML 内容存为文件，那么它就是一个 XML 文件，例如 `book.xml`。此外，XML 内容经常通过网络作为消息传输。

#### XML 的结构

XML 有固定的结构，首行必定是 `<?xml version="1.0"?>`，可以加上可选的编码。紧接着，如果以类似 `<!DOCTYPE note SYSTEM "book.dtd>"` 声明的是文档定义类型（DTD：Document Type Definition），DTD 是可选的。接下来是 XML 的文档内容，一个 XML 文档有且仅有一个根元素，根元素可以包含任意个子元素，元素可以包含属性，例如，`<isbn lang="CN"></isbn>` 包含一个属性 `lang="CN"`，且元素必须正确嵌套。如果是空元素，可以用 `</tag>` 表示。

由于使用了 `<`、`>` 以及引号等标识符，需要使用 `&???` 表示转义。例如，`Java<tm>` 必须写成：

```bash
<name>Java&lt;tm&gt</name>
```

常见的特殊自负如下：

| 字符 | 表示   |
| ---- | ------ |
| <    | &lt;   |
| >    | &gt;   |
| &    | &amp;  |
| "    | &quot; |
| '    | &apos; |

<u>格式正确的 XML (Well Formed) 是指 XML 的格式是正确的，可以被解析器正常读取。而合法的 XML 是指，不但 XML 格式正确，而且它的数据结构可以被 DTD 或者 XSD 验证。 </u>

DTD 文档可以指定一系列规则，例如：

- 根元素必须是 `book`
- `book` 元素必须包含 `name`，`author` 等指定元素
- `isbn` 元素必须包含属性 `lang`
- ...

如何验证 XML 文件的正确性呢？最简单的方式是通过浏览器验证。可以直接把 XML 文件拖拽到浏览器窗口，如果格式错误，浏览器会报错。

和结构类似的 HTML 不同，浏览器对 HTML 有一定的 “容错性”，缺少关闭标签也可以被解析，但 XML 要求严格的格式，任何没有正确嵌套的标签都会导致错误。

XML 是一个技术体系，除了我们经常用到 XML 文档本身外，XML 还支持：

- DTD 和 XSD：验证 XML 数据结构和数据是否有效；
- Namespace：XML 节点和属性的的名字空间；
- XSLT：把 XML 转换为另一种文本；
- XPath：一种 XML 节点查询语言；
- ...

实际上，XML 的这些相关技术实现起来非常复杂，在实际应用中很少用到，通常了解一下就可以了。

#### 小结

XML 使用嵌套结构的数据表示方式，支持格式验证；

`XML 常用于配置文件、网络消息传输等。`(这个跟 JSON 的用处很像，而跟 HTML 有所区别，HTML 主要是网页的显示。)

### 使用 DOM

因为 XML 是一种树形结构的文档，它有两种标准的解析 API：

- `DOM`：一次性读取 XML，并在内存种表示为树形结构；
- `SAX`：以流的形式读取 XML，使用事件回调。

我们先来看看如何使用 DOM 来读取 XML。

DOM 是 Document Object Model 的缩写，DOM 模型就是把 XML 结构作为一个树形结构处理，从根节点开始，每个节点都可以包含任意个子节点。

我们以下面的 XML 为例：

```xml
<? xml version="1.0" encoding="UTF-8" ?>
<book id="1">
  <name>Java 核心技术</name>
	<author>Cay S. Horstman</author>
	<isbn lang="CN">1234567</isbn>
	<tags>
	  <tag>Java</tag>
	  <tag>Network</tag>
	</tags>
	<pubDate/>
</book>
```

如果解析为 DOM 结构，它大概长这样：

```bash

                      ┌─────────┐
                      │document │
                      └─────────┘
                           │
                           ▼
                      ┌─────────┐
                      │  book   │
                      └─────────┘
                           │
     ┌──────────┬──────────┼──────────┬──────────┐
     ▼          ▼          ▼          ▼          ▼
┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐
│  name   ││ author  ││  isbn   ││  tags   ││ pubDate │
└─────────┘└─────────┘└─────────┘└─────────┘└─────────┘
                                      │
                                 ┌────┴────┐
                                 ▼         ▼
                             ┌───────┐ ┌───────┐
                             │  tag  │ │  tag  │
                             └───────┘ └───────┘
```

注意到最顶层的 `docuement` 代表 XML 文档，它是真正的 “根”，而 `<book>` 虽然是根元素，但它是 `document` 的一个子节点。

Java 提供了 DOM API 来解析 XML，它使用下面的对象来表示 XML 的内容：

- Document：代表整个 XML 文档；
- Element：代表一个 XML 元素；
- Attribute：代表一个元素的某个属性。

使用 DOM API 解析一个 XML 文档的代码如下：

```java
Inputstream input = Main.class.getResourceAsStream("/book.xml");
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse(input);
```

`DocumentBuilder.parse()` 用于解析一个 XML，它可以接收 InputStream，File 或者 URL，如果解析无误，我们将获得一个 Document 对象，这个对象代表了整个 XML 文档的树形结构，需要遍历以便获取指定元素的值：

```java
import java.io.InputStream;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Node;

public class Main {

	public static void main(String[] args) throws Exception {
		InputStream input = Main.class.getResourceAsStream("/book.xml");
		// 解析并获取Document对象:
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		Document doc = db.parse(input);
		printNode(doc, 0);
	}

	static void printNode(Node n, int indent) {
		for (int i = 0; i < indent; i++) {
			System.out.print(' ');
		}
		switch (n.getNodeType()) {
		case Node.DOCUMENT_NODE:
			System.out.println("Document: " + n.getNodeName());
			break;
		case Node.ELEMENT_NODE:
			System.out.println("Element: " + n.getNodeName());
			break;
		case Node.TEXT_NODE:
			System.out.println("Text: " + n.getNodeName() + " = " + n.getNodeValue());
			break;
		case Node.ATTRIBUTE_NODE:
			System.out.println("Attr: " + n.getNodeName() + " = " + n.getNodeValue());
			break;
		case Node.CDATA_SECTION_NODE:
			System.out.println("CDATA: " + n.getNodeName() + " = " + n.getNodeValue());
			break;
		case Node.COMMENT_NODE:
			System.out.println("Comment: " + n.getNodeName() + " = " + n.getNodeValue());
			break;
		default:
			System.out.println("NodeType: " + n.getNodeType() + ", NodeName: " + n.getNodeName());
		}
		for (Node child = n.getFirstChild(); child != null; child = child.getNextSibling()) {
			printNode(child, indent + 1);
		}
	}
}

```

解析结构如下：

```bash
Document: #document
 Element: book
  Text: #text =

  Element: name
   Text: #text = Java核心技术
  Text: #text =

  Element: author
   Text: #text = Cay S. Horstmann
  Text: #text =

  Element: isbn
   Text: #text = 1234567
  Text: #text =

  Element: tags
   Text: #text =

   Comment: #comment =  this is comment
   Text: #text =

   Element: tag
    Text: #text = Java
   Text: #text =

   Element: tag
    Text: #text = Network
   Text: #text =

  Text: #text =

  Element: pubDate
  Text: #text =
```

对于 DOM API 解析出来的结构，我们从根节点 Document 出发，可以遍历所有子节点，获取所有元素、属性、文本数据，还可以包括注释，这些节点被统称为 Node，每个 Node 都有自己的 Type，根据 Type 来区分一个 Node 到底是元素、还是属性、还是文本，等等。

使用 DOM API 时，如果要读取某个元素的文本，需要访问它的 Text 类型的子节点，所以使用起来还是比较繁琐的。

#### 小结

Java 提供的 DOM API 可以将 XML 解析为 DOM 结构，以 Document 对象表示；

DOM 可在内存中完整表示 XML 数据结构；

DOM 解析速度慢，内存占用大。

### 使用 SAX

使用 DOM 解析 XML 的优点是用起来省事，但它的主要缺点是内存占用太大。

另一种解析 XML 的方式是 SAX。SAX 是 `Simple API for XML` 的缩写，<u>它是一种基于`流`的解析方式，边读取 XML 边解析，并以事件回调的方式让调用者获取数据。</u>因为是一边读一边解析，所以无论 XML 有多大，占用的内存都很小。

SAX 解析会触发一系列事件：

- `startDocument`：开始读取 XML 文档；
- `startElement`：读取到了一个元素，例如 `<book>`;
- `characters`: 读取到了字符；
- `endElement`：读取到了一个结束的元素，例如 `</book>`；
- `endDocument`：读取 XML 文档结束。

如果我们用 SAX API 解析 XML，Java 代码如下：

```java
InputStream input = Main.class.getResoureAsStream("/book.xml")
SAXParserFactory spf = SAXParserFactory.newInstance();
SAXParser saxParser = spf.newSAXParser();
saxParser.parse(input, new MyHandler());
```

关键代码 `SAXParser.parse()` 除了需要传入一个 `InputStream` 外，还需要传入一个回调对象，这个对象要继承自`DefaultHandler`：

```java
package com.itranswarp.learnjava;

import java.io.InputStream;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

public class Main {

	public static void main(String[] args) throws Exception {
		InputStream input = Main.class.getResourceAsStream("/book.xml");
		SAXParserFactory spf = SAXParserFactory.newInstance();
		SAXParser saxParser = spf.newSAXParser();
		saxParser.parse(input, new MyHandler());
	}
}

class MyHandler extends DefaultHandler {

	void print(Object... objs) {
		for (Object obj : objs) {
			System.out.print(obj);
			System.out.print(" ");
		}
		System.out.println();
	}

	@Override
	public void startDocument() throws SAXException {
		print("start document");
	}

	@Override
	public void endDocument() throws SAXException {
		print("end document");
	}

	@Override
	public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
		print("start element:", localName, qName);
	}

	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
		print("end element:", localName, qName);
	}

	@Override
	public void characters(char[] ch, int start, int length) throws SAXException {
		print("characters:", new String(ch, start, length));
	}

	@Override
	public void error(SAXParseException e) throws SAXException {
		print("error:", e);
	}
}

```

解析如下：

```bash

start element:  tag
characters: Network
end element:  tag
characters:

end element:  tags
characters:

start element:  pubDate
end element:  pubDate
characters:

end element:  book
end document
```

如果要读取 `<name>` 节点的文本，我们就必须在解析过程中根据 `startElement()` 和 `endElement()` 定位当前正在读取的节点，每遇到一个 `startElement()` 入栈，每遇到一个 `endElement()` 出栈，这样，读到 `characters()` 时我们才知道当前读取的文本是哪个节点的。可见，使用 SAX API 仍然比较麻烦。

#### 小结

SAX 是一种流式解析 XML 的 API；

SAX 通过事件触发，读取速度快，消耗内存少；

调用方必须通过回调方法获得解析过程中的数据。

### 使用 Jackson

前面我们介绍了 DOM 和 SAX 两种解析 XML 的标准接口。但是，无论是 DOM 还是 SAX，使用起来都不直观。

观察 XML 文档的结构：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<book id="1">
    <name>Java核心技术</name>
    <author>Cay S. Horstmann</author>
    <isbn lang="CN">1234567</isbn>
    <tags>
        <tag>Java</tag>
        <tag>Network</tag>
    </tags>
    <pubDate/>
</book>
```

我们发现，它完全可以对应到一个定义好的 JavaBean 中：

```java
public class Book {
	public long id;
	public String author;
	public String isbn;
	public List<String> tags;
	public String pubDate;
}
```

如果能直接从 XML 文档解析成一个 JavaBean，那比 DOM 或者 SAX 不知道容易到哪里去了。

幸运的是，一个名叫 Jackson 开源的第三方库可以轻松做到 XML 到 JavaBean 的转换。我们要使用 Jackson，先添加两个 Maven 的依赖：

- com.fasterxml.jackson.dataformat:jackson-dataformat-xml:2.10.1
- org.codehaus.woodstox:woodstox-core-asl:4.4.1

然后，定义好 JavaBean，就可以用下面几行代码解析：

```java
import java.io.InputStream;

import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class Main {
	public static void main(String[] args) throws Exception {
		InputStream input = Main.class.getResourceAsStream("/book.xml");
		JacksonXmlModule module = new JacksonXmlModule();
		XmlMapper mapper = new XmlMapper(module);
		Book book = mapper.readValue(input, Book.class);
		System.out.println(book.id);
		System.out.println(book.name);
		System.out.println(book.author);
		System.out.println(book.isbn);
		System.out.println(book.tags);
		System.out.println(book.pubDate);
	}
}

```

注意到 `XmlMapper` 就是我们需要创建的核心对象，可以用 `readValue(InputStream, Class)` 直接读取 XML 并返回一个 JavaBean。运行上述代码，就可以直接从 Book 对象中拿到数据：

```bash
1
Java核心技术
Cay S. Horstmann
1234567
[Java, Network]
null
```

如果要解析的数据格式不是 Jackson 内置的标准格式，那么需要编写一点额外的扩展来告诉 Jackson 如何自定义解析。

#### 小结

使用 Jackson 解析 XML，可以直接把 XML 解析为 JavaBean，十分方便。

### 使用 JSON

前面我们讨论了 XML 这种数据格式。XML 的特点是功能全面，但标签繁琐、格式复杂。在 Web 上使用的 XML 现在越来越少，取而代之的是 JSON 这种数据结构。

JSON 是 `JavaScript Object Notation` 的缩写，它去除了所有 JavaScript 执行代码，只保留 JavaScript 的对象格式。一个典型的 JSON 如下：

```json
{
  "id": 1,
  "name": "Java 核心技术",
  "author": {
    "firstName": "Abc",
    "lastName": "Xyz"
  },
  "isbn": "1234567",
  "tags": ["Java", "Network"]
}
```

JSON 作为数据传输的格式，有几个显著的优点：

- JSON 只允许使用 UTF-8 编码，不存在编码问题；
- JSON 只允许使用双引号作为 key，特殊字符用 `\` 转义，格式简单；
- `浏览器内置 JSON 支持，如果把数据用 JSON 发送给浏览器，可以用 JavaScript 直接处理`。（XML 不能直接处理）

因此，JSON 适合表示层次结构，因为它格式简单，仅支持以下几种数据类型：

- 键值对：`{"key": value}`
- 数组：`[1, 2, 3]`
- 字符串：`"abc"`
- 数值（整数和浮点数）：`12.34`
- 布尔值：`true` 或 `false`
- 空值：`null`

浏览器直接支持使用 JavaScript 对 JSON 进行读写：

```js
// JSON string to JavaScript object;
jsObj = JSON.parse(jsonStr);

// JavaScript object to JSON string:
jsonStr = JSON.stringify(jsObj);
```

所以，开发 Web 应用的时候，使用 JSON 作为数据传输，在浏览器端非常方便。因为 JSON 天生适合 JavaScript 处理，所以，绝大多数 REST API 都选择 JSON 作为数据传输格式。

现在问题来了：使用 Java 如何对 JSON 进行读写？

在 Java 中，针对 JSON 也有标准的 JSR 353 API，但是我们在前面讲 XML 的时候发现，如果能直接在 XML 和 JavaBean 之间互相转换是最好的。类似的，如果能直接在 JSON 和 JavaBean 之间转换，那么用起来就简单多了。

常用于解析 JSON 的第三方库有：

- Jackson
- Gson
- Fastjson
- ...

注意到上一节提到的那个可以解析 XML 的 Jackson 也可以解析 JSON。因此我们只需要引入以下 Maven 依赖：

- com.fasterxml.jackson.core:jackson-databind:2.10.0

就可以使用下面的代码解析一个 JSON 文件：

```java
import java.io.InputStream;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class Main {

	public static void main(String[] args) throws Exception {
		InputStream input = Main.class.getResourceAsStream("/book.json");
		ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());
		// 反序列化时忽略不存在的JavaBean属性:
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Book book = mapper.readValue(input, Book.class);
		System.out.println(book.id);
		System.out.println(book.name);
		System.out.println(book.author);
		System.out.println(book.isbn);
		System.out.println(book.tags);
		System.out.println(book.pubDate);
		System.out.println(book.price);
		// 序列化为JSON:
		String json = mapper.writeValueAsString(book);
		System.out.println(json);
	}
}

```

核心代码是创建一个 `ObjectMapper` 对象。关闭 `DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES` 功能使得解析时如果 JavaBean 不存在该属性时解析不会报错。

<u>把 JSON 解析为 JavaBean 的过程称为反序列化。如果把 JavaBean 变为 JSON，那就是序列化。</u>要实现 JavaBean 到 JSON 的序列化，只需要一行代码：

```java
String json = mapper.writeValueAsString(book);
```

要把 JSON 的某些值解析为特定的 Java 对象，例如 `LocalDate`，也是完全可以的。例如：

```json
{
  "name": "Java 核心技术",
  "pubDate": "2016-09-01"
}
```

要解析为：

```java
public class Book {
	public String name;
	public LocalDate pubDate;
}
```

只需要引入标准的 JSR 310 关于 JavaTime 的数据格式定义至 Maven：

- com.fasterxml.jackson.datatype:jackson-datatype

然后，在创建 `objectMapper` 时，注册一个新的 `JavaTimeModule`：

```java
ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());
```

有时候，内置的解析规则和扩展的解析规则如果都不满足我们的需求，还可以自定义解析。

举个例子，假设 `Book` 类的 `isbn` 是一个 `BigInteger`：

```java
public class Book {
	public String name;
	public BigInteger isbn;
}
```

但 JSON 数据并不是标准的整形格式：

```json
{
  "name": "Java 核心技术",
  "isbn": "978-7-111-54742-6"
}
```

直接解析，肯定报错，我们需要自定义一个 `IsbnDeserializer`，用于解析含有非数字的字符串：

```java
import java.io.IOException;
import java.math.BigInteger;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class IsbnDeserializer extends JsonDeserializer<BigInteger> {
	@Override
	public BigInteger deserializer(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		// 读取原始的 JSON 字符串内容
		String s = p.getValueAsString();
		if (s != null) {
			try {
				return new BigInteger(s.replace("-", ""));
			} catch (NumberFormatException e) {
				throw new JsonParseException(p, s, e);
			}
		}
		return null;
	}
}
```

然后，在 `Book` 类中使用注解标注：

```java
public class Book {
	public  String name;
	// 表示反序列化 isbn 时使用自定义的 IsbnDeserializer:
	@JsonDeserialize(using = IsbnDeserializer.class)
	public BigInteger isbn;
}
```

类似的，自定义序列化时我们需要自定义一个 `IsbnSerialiizer`，然后在 `Book` 类中标注 `@JsonSerialize(using = ...)` 即可。

#### 小结

JSON 是轻量级的数据表示方式，常用于 Web 应用；

Jackson 可以实现 JavaBean 和 JSON 之间的转换；

可以通过 Module 扩展 Jackson 能处理的数据类型；

可以自定义 `JsonSerialler` 和 `JsonDeserialler` 来定制序列化和反序列化。

## JDBC 编程

程序运行的时候，往往需要存取数据。现代应用程序最基本的，也是使用最广泛的数据存储库就是关系数据库。

Java 为关系数据库定义了一套标准的访问接口：`JDBC`（Java Database Connectivity）。

### JDBC 简介

在介绍 JDBC 之前，我们先简单介绍一下关系数据库。

程序运行的时候，数据都是在内存中的。当程序终止的时候，通常都需要将数据保存到磁盘上，无论是保存到本地磁盘，还是通过网络保存到服务器上，<u>最终都会将数据写入磁盘文件。</u>。

而如何定义数据的存储格式就是一个大问题。如果我们自己来定义存储格式，比如保存一个班级所有学生的成绩单：

|名字|成绩|
|--|--|
|Michael|99|
|Bob|85|
|Bart|59|
|Lisa|87|

你可以用一个文本文件保存，一行保存一个学生，用 `,` 隔开：

```bash
Michael,99
Bob,85
Bart,59
Lisa,87
```

你还可以用 JSON 格式保存，也是文本文件：

```json
[
  {"name":"Michael","score":99},
  {"name":"Bob","score":85},
  {"name":"Bart","score":59},
  {"name":"Lisa","score":87}
]
```

你还可以定义保存格式，但是问题来了：

存储和读取需要自己实现，JSON 还是标准，自己定义的格式就各式各样了；

不能做快速查询，只有把数据全部读到内存中才能自己遍历，但有时候数据的大小远远超过了内存（比如蓝光电影，40 GB 的数据），根本无法全部读入内存。

<u>为了便于程序保存和读取数据，而且，能直接通过条件快速查询到指定的数据，就出现了数据库（Database）这种专门用于集中存储和查询的软件。</u>

数据库软件诞生的历史非常久远，早在 1950 年数据库就诞生了。经历了网状数据库，层次数据库，我们现在广泛使用的关系数据库是 20 世纪 70 年代基于关系模型的基础上诞生的。

`关系模型`有一套复杂的数学理论，但是从概念上是十分容易理解的。举个学校的例子：

假设某个 XX 省 YY 市 ZZ 县第一实验小学有 3 个年纪，要表示出这 3 个年纪，可以在 Excel 中用一个表格画出来：

|Grade_ID|Name|
|--|--|
|1|一年级|
|2|二年级|
|3|三年级|

每个年级又有若干个班级，要把所有班级表示出来，可以咋 Excel 中再画一个表格：

|Grade_ID|Class_ID|Name|
|--|--|--|
|1|11|一年级一班|
|1|12|一年级二班|
|1|13|一年级三班|
|2|21|二年级一班|
|2|22|二年级二班|
|2|23|二年级三班|
|3|31|三年级一班|
|3|32|三年级二班|
|3|33|三年级三班|
|3|34|三年级四班|

这两个表格有个`映射关系`，就是根据 Grade_ID 可以在班级表中查找到对应的所有班级：（这里还可以把 Grade_ID 抽出来，新建个班级和年级关联表）

![](../.vuepress/public/images/2020-07-30-08-37-26-mysql.png)

也就是 Grade 表的每一行对应 Class 表的多行，在关系数据库中，<u>这种基于表（Table）的`一对多`的关系就是关系数据库的基础。</u>

根据某个年级的 ID 就可以查找所有班级的行，这种查询语句在关系数据库中称为 SQL 语句，可以写成：

```bash
SELECT * FROM classes WHERE grade_id = '1';
```

结果也是一个表：

|Grade_ID|Class_ID|Name|
|--|--|--|
|1|11|一年级一班|
|1|12|一年级二班|
|1|13|一年级三班|

类似的，Class 表的一行记录又可以关联到 Student 表的多行记录：

![](../.vuepress/public/images/2020-07-30-08-41-23-mysql.png)

#### NoSQL

关系数据库与非关系数据库是主从关系。

#### 数据库类别

既然我们要使用关系数据库，就必须选择一个关系数据库。目前广泛使用的关系数据库也就这么几种：

付费的商用数据库：
- Oracle，典型的高富帅；
- SQL Server，微软自家产品，Windows 定制专款；
- DB2，IBM 的产品
- Sybase，曾经跟微软是好基友，后来关系破裂，现在家境惨淡。

这些数据库都是不开源而且付费的，最大的好处是花了钱出了问题可以找厂家解决，不过在 Web 的世界里，常常需要部署成千上万的数据库服务器，当然不能把大把大把的银子扔给厂家，所以，无论是 Google、Facebook，还是国内的 BAT，无一例外都选择了免费的开源数据库：
- MySQL，大家都在用，一般错不了；
- PostgreSQL，学术气息有点重，其实挺不错，但知名度没有 MySQL 高；
- sqlite，嵌入式数据库，适合桌面和移动应用。

对于 Java 来说，选择哪个免费数据库呢？当然是 MySQL。因为 MySQL 普及率最高，出了错，可以很容易找到解决方法。而且，围绕 MySQL 有一大堆监控和运维的工具，安装和使用很方便。

#### 安装 MySQL

为了能继续后面的学习，你需要从 MySQL 官方网站下载并安装[MySQL Community Server 5.6](http://dev.mysql.com/downloads/mysql/)，这个版本是免费的，其他高级版本是要收钱的（请放心，收钱的功能我们用不上）。MySQL 是跨平台的，选择对应的平台下载安装文件，安装即可。

安装时，MySQL 会提示输入 `root` 用户的口令，请务必记住。如果怕记不住，就把口令设置为 `password`。

在 Windows 上，安装时请选择 `UTF-8` 编码，以便正确地处理中文。

![](../.vuepress/public/images/2020-07-29-10-30-01-mysql.png)

Mysql command not found in OS X 10.7

This is the problem with your \$PATH:

Your PATH might not setup. Go to terminal and type:

```bash
echo 'export PATH="/usr/local/mysql/bin:$PATH"' >> ~/.bash_profile
```

Essentially, this allows you to access mysql from anywhere.

Type cat .bash_profile to check the PATH has been setup.

Check mysql version now: mysql --version

```bash
$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor...
...
mysql> show variables like "%char%";
+--------------------------+-----------------------------------------------------------+
| Variable_name            | Value                                                     |
+--------------------------+-----------------------------------------------------------+
| character_set_client     | utf8mb4                                                   |
| character_set_connection | utf8mb4                                                   |
| character_set_database   | utf8mb4                                                   |
| character_set_filesystem | binary                                                    |
| character_set_results    | utf8mb4                                                   |
| character_set_server     | utf8mb4                                                   |
| character_set_system     | utf8                                                      |
| character_sets_dir       | /usr/local/mysql-8.0.11-macos10.13-x86_64/share/charsets/ |
+--------------------------+-----------------------------------------------------------+
```

看到 `utf8`字样就表示编码设置正确。

注：如果 MySQL 的版本 >= 5.5.3，可以把编码设置为 `utf8mb4`，`utf8mb4` 和 `utf8` 完全兼容，但它支持最新的 Unicode 标准，可以显示 emoji 字符。

#### JDBC

什么是 JDBC？JDBC 是 `Java DataBase Connectivity` 的缩写，它是 Java 程序访问数据库的标准接口。

使用 Java 程序访问数据库时，<u>Java 代码并不是直接通过 TCP 连接去访问数据库，而是通过 `JDBC 接口`来访问，而 JDBC 接口则通过 `JDBC 驱动`来实现真正对数据库的访问。</u>

例如，我们在 Java 代码中如果要访问 MySQL，那么必须编写代码操作 JDBC 接口。注意到 JDBC 接口是 Java 标准库自带的，所以可以直接编译。而具体的 JDBC 驱动是由数据库厂商提供的，例如，MySQL 的 JDBC 驱动由 Oracle 提供。因此，<u>访问某个具体的数据库，我们只需要引入该厂商提供的 JDBC 驱动，就可以通过 JDBC 接口来访问，这样保证了 Java 程序编写的是一套数据库访问代码，却可以访问各种不同的数据库，因为他们都提供了标准的 JDBC 驱动；</u>

```bash
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐

│  ┌───────────────┐  │
   │   Java App    │
│  └───────────────┘  │
           │
│          ▼          │
   ┌───────────────┐
│  │JDBC Interface │<─┼─── JDK
   └───────────────┘
│          │          │
           ▼
│  ┌───────────────┐  │
   │  JDBC Driver  │<───── Vendor
│  └───────────────┘  │
           │
└ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ┘
           ▼
   ┌───────────────┐
   │   Database    │
   └───────────────┘
```

从代码来看，Java 标准库自带的 JDBC 接口其实就是定义了一组接口，而某个具体的 JDBC 驱动其实就是实现了这些接口的类：

```bash
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐

│  ┌───────────────┐  │
   │   Java App    │
│  └───────────────┘  │
           │
│          ▼          │
   ┌───────────────┐
│  │JDBC Interface │<─┼─── JDK
   └───────────────┘
│          │          │
           ▼
│  ┌───────────────┐  │
   │ MySQL Driver  │<───── Oracle
│  └───────────────┘  │
           │
└ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ┘
           ▼
   ┌───────────────┐
   │     MySQL     │
   └───────────────┘
```

实际上，一个 MySQL 的 JDBC 的驱动就是一个 jar 包，它本身也是纯 Java 编写的。我们自己编写的代码只需要引用 Java 标准库提供的 java.sql 包下面的相关接口，由此再间接地通过 MySQL 驱动的 jar 包通过网络访问 MySQL 服务器，所有复杂的网络通讯都被封装到 JDBC 驱动中，因此，Java 程序本身只需要引入一个 MySQL 驱动的 jar 包就可以正常访问 MySQL 服务器：

```bash
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
   ┌───────────────┐
│  │   App.class   │  │
   └───────────────┘
│          │          │
           ▼
│  ┌───────────────┐  │
   │  java.sql.*   │
│  └───────────────┘  │
           │
│          ▼          │
   ┌───────────────┐     TCP    ┌───────────────┐
│  │ mysql-xxx.jar │──┼────────>│     MySQL     │
   └───────────────┘            └───────────────┘
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
          JVM
```

#### 小结

使用 JDBC 的好处是：
- 各数据库厂商使用相同的接口，Java 代码不需要针对不同数据库分别开发；
- Java 程序`编译期`仅依赖 `java.sql` 包，不依赖具体数据的 jar 包；
- 可随时替换底层数据库，访问数据库的 Java 代码基本不变。

### JDBC 查询

前面我们讲了 Java 程序要通过 JDBC 接口来查询数据库。JDBC 是一套接口规范，它在哪呢？就在 Java 标准库 `java.sql` 里放着，不过这里面大部分都是接口。<u>接口并不能直接实例化，而是必须实例化对应的实现类，然后通过接口引用这个实例。</u>那么问题来了：JDBC 接口的实现类在哪？

因为 JDBC 接口并不知道我们要使用哪个数据库，所以，<u>用哪个数据库，我们就去使用哪个数据库的“实现类”，我们把某个数据库实现了 JDBC 接口的 jar 包称为 JDBC 驱动。</u>

如果我们选择了 MySQL 5.x 作为数据库，所以我们首先得找一个 MySQL 的 JDBC 驱动。所谓 JDBC 驱动，其实就是一个第三方 jar 包，我们直接添加一个 Maven 依赖就可以了：

```bash
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
    <scope>runtime</scope>
</dependency>
```

注意到这里添加依赖的是 `scope` 是 `runtime`，因为编译 Java 程序并不需要 MySQL 的这个 jar 包，只有在运行期才需要使用。如果把 `runtime` 改成 `compile`，虽然也能正常编译，但是在 IDE 里写程序的时候，会多出来一大堆类似 `com.mysql.jdbc.Connection` 这样的类，非常容易与 Java 标准库的 JDBC 接口混淆，所以坚决不要设置为 `compile`。

有了驱动，我们还要确保 MySQL 在本机正常运行，并且还需要准备一点数据。这里我们用一个脚本创建数据库和表，然后插入一些数据。

```bash
-- 创建数据库learjdbc:
DROP DATABASE IF EXISTS learnjdbc;
CREATE DATABASE learnjdbc;

-- 创建登录用户learn/口令learnpassword
CREATE USER IF NOT EXISTS 
learn@'%' IDENTIFIED BY 'learnpassword';
GRANT ALL PRIVILEGES ON learnjdbc.* TO learn@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- 创建表students:
USE learnjdbc;
CREATE TABLE students (
  id BIGINT AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL,
  gender TINYINT(1) NOT NULL,
  grade INT NOT NULL,
  score INT NOT NULL,
  PRIMARY KEY(id)
) Engine=INNODB DEFAULT CHARSET=UTF8;

-- 插入初始数据:
INSERT INTO students (name, gender, grade, score) VALUES ('小明', 1, 1, 88);
INSERT INTO students (name, gender, grade, score) VALUES ('小红', 1, 1, 95);
INSERT INTO students (name, gender, grade, score) VALUES ('小军', 0, 1, 93);
INSERT INTO students (name, gender, grade, score) VALUES ('小白', 0, 1, 100);
INSERT INTO students (name, gender, grade, score) VALUES ('小牛', 1, 2, 96);
INSERT INTO students (name, gender, grade, score) VALUES ('小兵', 1, 2, 99);
INSERT INTO students (name, gender, grade, score) VALUES ('小强', 0, 2, 86);
INSERT INTO students (name, gender, grade, score) VALUES ('小乔', 0, 2, 79);
INSERT INTO students (name, gender, grade, score) VALUES ('小青', 1, 3, 85);
INSERT INTO students (name, gender, grade, score) VALUES ('小王', 1, 3, 90);
INSERT INTO students (name, gender, grade, score) VALUES ('小林', 0, 3, 91);
INSERT INTO students (name, gender, grade, score) VALUES ('小贝', 0, 3, 77);
```

在控制台输入 `mysql -u root -p`，输入 `root` 口令后以 `root` 身份，把上述 SQL 贴到控制台执行一遍就行。如果你运行的是最新版 MySQL 8.x，需要调整一下 `CREATE USER` 语句。

#### JDBC 连接

使用 JDBC 时，我们先了解什么是 Connection。Connectiion 代表一个 JDBC 连接，它相当于 Java 程序员到数据库的连接（通常是 TCP 连接）。打开一个 Connection 时，需要<u>准备 URL、用户名和口令，才能成功连接到数据库。</u>

URL 是由数据库厂商指定的格式，例如，MySQL 的 URL 是：

```bash
jdbc:mysql://<hostname>:<port>/<db>?key1=value1&key2=value2
```

假设数据库运行在本机 `localhost`，端口使用标准的 `3306`，数据库名称是 `learnjdbc`，那么 URL 如下：

```bash
jdbc:mysql://localhost:3306/learnjdbc?useSSL=false&characterEncoding=utf8
```

后面的两个参数表示不使用 SSL 加密，使用 UTF-8 作为字符编码（注意 MySQL 的 UTF-8 是 `utf-8`）。

要获取数据库连接，使用如下代码：

```java

```

#### JDBC 查询

#### SQL 注入

#### 数据类型

### JDBC 更新

#### 插入

插入的操作是 `INSERT`

#### 插入并获取主键

#### 更新

更新操作是 `UPDATE` 语句，它可以一次更新若干列的记录。更新操作和插入操作在 JDBC 代码的层面上实际上没有区别，除了 SQL 语句不同：

#### 删除

删除

#### 小结

使用 JDBC 执行 `INSERT`、`UPDATE` 和 `DELETE` 都可视为更新操作；

更新操作使用 `PreparedStatement` 的 `executeUpdate()` 进行，返回受影响的行数。

### JDBC 事务

<u>数据库事务（Transaction）是由若干个 SQL 语句构成的一个操作序列，</u>有点类似于 Java 的 `synchronized` 同步。数据库系统保证在一个事务中的所有 SQL 要么全部执行成功，要么全部不执行，即数据库事务具有 ACID 特性：

- Atomicity：原子性
- Consistency：一致性
- Isolation：隔离性
- Durability：持久性

数据事务可以并发执行，而数据库从效率考虑，对事务定义了不同的隔离级别。SQL 标准定义了 4 种隔离级别，分别对应可能出现的数据不一致的情况：

对应用程序来说，数据库事务非常重要，很多运行着关键任务的应用程序，都必须依赖数据库事务保证程序的结果正常。

举个例子：假设小明准备给小红支付 100，两人在数据库的记录主键分别是 `123` 和 `456`，那么用两条 SQL 语句操作如下：

```bash
UPDATE accounts SET balance = balance - 100 WHERE id=123 AND balance >= 100;
UPDATE accounts SET balance = balance + 100 WHERE id =456;
```

这两条语句必须以事务方式执行才能保证业务的正确性，因为一旦第一条 SQL 执行成功而第二条 SQL 失败的话，系统的钱就会凭空减少 100，而有了事务，要么这笔转账成功，要么转账失败，双方账户的钱都不变。

#### 小结



### JDBC Batch

使用 JDBC 操作数据库的时候，经常会执行一些批量操作。

例如，一次性给会员增加可用优惠券若干，我们可以执行以下 SQL 代码：

例如，一次性给会员增加可用

批量添加一堆记录。（批量删除、批量新增）

#### 小结

使用 JDBC 的 batch 操作会大大提高执行效率，对内容相同，参数不同的 SQL，要优先考虑 batch 操作。

### JDBC 连接池

我们在讲多线程的时候说过，创建线程是一个昂贵的操作，如果有大量的小任务需要执行，并且频繁地创建和销毁线程，实际上会消耗大量的系统资源，往往创建和消耗线程所耗费的时间比执行任务的时间还长，所以，为了提高效率，可以用`线程池`。

类似的，在执行 JDBC 的增删改查的操作时，如果每一次操作都来一次<u>打开连接，操作，关闭连接</u>，那么创建和销毁 JDBC 连接的开销就太大了。为了避免频繁地创建和销毁 JDBC 连接，我们可以通过连接池（Connection Pool）复用已经创建好的连接。

JDBC 连接池有一个标准

#### 小结

数据库连接池是一种复用 `Connection` 的组件，它可以避免反复创建新连接，提高 JDBC 代码的运行效率。

## 函数式编程

## 设计模式

## Web 开发

JavaEE 并不是一个软件产品，它更多的是一种软件架构和设计思想。我们可以把 JavaEE 看作是在 JavaSE 的基础上，开发的一系列基于服务器的组件、API 标准和通用架构。

JavaEE 最核心的组件就是<u>基于 Servlet 标准的 `Web 服务器`，开发者编写的应用程序是基于 `Servlet API` 并运行在 Web 服务器内部的：</u>

```bash
┌─────────────┐
│┌───────────┐│
││ User App ││
│├───────────┤│
││Servlet API││
│└───────────┘│
│ Web Server │
├─────────────┤
│ JavaSE │
└─────────────┘
```

此外，JavaEE 还有一系列技术标准：

- EJB：Enterprise JavaBean，企业级 JavaBean，早期经常用于实现应用程序的业务逻辑，现在基本被轻量级框架如 Spring 所取代；
- JAAS：Java Authentication and Authorization Service，一个标准的认证和授权服务，常用于企业内部，Web 程序通常使用更轻量级的自定义认证；
- JCA：JavaEE Connector Architecture，用于连接企业内部的 EIS 系统等；
- JMS：Java Message Service，用于消息服务；
- JTA：Java Transaction API，用于分布式事务；
- JAX-WS：Java API for XML Web Services，用于构建基于 XML 的 Web 服务；
  ...

目前流行的基于 Spring 的轻量级 JavaEE 开发架构，使用最广泛的是 Servlet 和 JMS，以及一系列开源组件。

### Web 基础

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

/**
 * Learn Java from https://www.liaoxuefeng.com/
 * 
 * @author liaoxuefeng
 */
public class Server {
	public static void main(String[] args) throws IOException {
		ServerSocket ss = new ServerSocket(5050); // 监听指定端口
		System.out.println("server is running...");
		for (;;) {
			Socket sock = ss.accept();
			System.out.println("connected from " + sock.getRemoteSocketAddress());
			Thread t = new Handler(sock);
			t.start();
		}
	}
}

class Handler extends Thread {
	Socket sock;

	public Handler(Socket sock) {
		this.sock = sock;
	}

	@Override
	public void run() {
		try (InputStream input = this.sock.getInputStream()) {
			try (OutputStream output = this.sock.getOutputStream()) {
				handle(input, output);
			}
		} catch (Exception e) {
			try {
				this.sock.close();
			} catch (IOException ioe) {
			}
			System.out.println("client disconnected.");
		}
	}

	private void handle(InputStream input, OutputStream output) throws IOException {
		System.out.println("Process new http request...");
		var reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
		var writer = new BufferedWriter(new OutputStreamWriter(output, StandardCharsets.UTF_8));
		// 读取HTTP请求:
		boolean requestOk = false;
		String first = reader.readLine();
		if (first.startsWith("GET / HTTP/1.")) {
			requestOk = true;
		}
		for (;;) {
			String header = reader.readLine();
			if (header.isEmpty()) { // 读取到空行时, HTTP Header读取完毕
				break;
			}
			System.out.println(header);
		}
		System.out.println(requestOk ? "Response OK" : "Response Error");
		if (!requestOk) {
			// 发送错误响应:
			writer.write("404 Not Found\r\n");
			writer.write("Content-Length: 0\r\n");
			writer.write("\r\n");
			writer.flush();
		} else {
			// 发送成功响应:
			String data = "<html><body><h1>Hello, Jecyu!</h1></body></html>";
			int length = data.getBytes(StandardCharsets.UTF_8).length;
			writer.write("HTTP/1.0 200 OK\r\n");
			writer.write("Connection: close\r\n");
			writer.write("Content-Type: text/html\r\n");
			writer.write("Content-Length: " + length + "\r\n");
			writer.write("\r\n"); // 空行标识Header和Body的分隔
			writer.write(data);
			writer.flush();
		}
	}
}

```

### Servlet 入门

在上一节中，我们看到，编写 HTTP 服务器其实是非常简单的，只需要先编写基于多线程的 TCP 服务器，然后在一个 TCP 连接中读取 HTTP 请求，发送 HTTP 响应即可。

但是，要编写一个完善的 HTTP 服务器，以 HTTP/1.1 为例，需要考虑的包括：

- 识别正确和错误的 HTTP 请求；
- 识别正确和错误的 HTTP 头；
- 复用 TCP 连接；
- 复用线程；
- IO 异常处理；
- ...

这些基础工作需要耗费大量的时间，并且经过长期测试才能稳定运行。如果我们只需要输出一个简单的 HTML 页面，就不得不编写上千行底层代码，那就根本无法做到高效可靠地开发。

因此，在 JavaEE 平台上，<u>处理 TFCP 连接，解析 HTTP 协议这些底层工作统统扔给现成的 Web 服务器去做，我们只需要把自己的应用程序跑在 Web 服务器上。为了实现，这一目的，JavaEE 提供了 Servlet API，我们使用 Servlet API 编写自己的 Servlet 来处理 HTTP 请求， Web 服务器实现 Servlet API 接口，实现底层功能：</u>

```bash
                 ┌───────────┐
                 │My Servlet │
                 ├───────────┤
                 │Servlet API│
┌───────┐  HTTP  ├───────────┤
│Browser│<──────>│Web Server │
└───────┘        └───────────┘
```

对于开发者来说，Java 的网络编程比 Node 更加底层，Node 已经封装的很好了，并且拥有大量的中间件来处理基础工作，再进一步可以使用 Express 框架。

因此，Java 才需要 Sevlet API，让服务器 （例如 Tomcat ）实现我们编写的 Servlet API 接口，实现 Web 应用的底层工作。而 node 就很方便编写响应。

编写完，还要把服务端程序打包到服务器上。可能不如 Node 那么方便。

## Spring 开发

## 综合应用——旅行 TODO 应用

## 附录

### 概念

## 参考资料

- [Tomcat(一) Tomcat 是什么：Tomcat 与 Java 技术 Tomcat 与 Web 应用 以及 Tomcat 基本框架及相关配置](https://blog.csdn.net/tjiyu/article/details/54590258)
- [Java 虚拟机——字节码、机器码和 JVM](https://zhuanlan.zhihu.com/p/44657693) 本文主要讲解 Java 虚拟机的概念，字节码、机器码、编译器、解释器的概念。
- [廖雪峰 Java 教程](https://www.liaoxuefeng.com/wiki/1252599548343744)
- [如何设置或更改 PATH 系统变量？](https://www.java.com/zh_CN/download/help/path.xml)
- [Mac 上管理多个 java 版本](https://segmentfault.com/a/1190000004332179)jenv 是一个命令行工具，可以在 Linux/OS X 平台使用，可以管理多个版本 JDK，方便在多个版本 JDK 之间切换，另外其还可以设置 JAVA_HOME 环境变量。
- [Java 又双叒叕发布新版本，这么多版本如何灵活管理？](http://www.justdojava.com/2019/11/20/jenv/)
- [JAVA-包 package、import 使用](https://www.cnblogs.com/lifexy/p/10855188.html)
- [Java 包(package)](https://www.runoob.com/java/java-package.html)
- [Eclipse 安装反编译插件
  ](https://www.cnblogs.com/JealousGirl/p/setup_Decompiler.html)
- 数据类型
