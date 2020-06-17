# Ruby

## 基础

### 交互式 Ruby Shell

在终端输入 `irb`，就可以运行 IRB 了。IRB 显示提示符 >> 时，表明当前可以输入一个 Ruby 表达式。输入一个表达式并敲回车键后，代码执行，结果会显示提示符 `=>` 之后：

多行代码，使用 end 结束，end 之间可以进行嵌套。

```ruby
irb(main):012:0> class Calculator
irb(main):013:1> def divide(x, y)
irb(main):014:2> x / y
irb(main):015:2> end
```

### 值

Ruby 是一种`面向表达式`的语言：每一段有效的代码执行之后都要产生一个值。

#### 基本数据

- 布尔型（Boolean）
- 数值型
- 字符串

```ruby
irb(main):001:0> 1+2
=> 3
irb(main):002:0> "hello world".length
=> 11
irb(main):003:0> true && false
=> false
irb(main):004:0> true && false || true
=> true
irb(main):005:0> (3+3) * (14/ 2)
=> 42
irb(main):006:0> 'hello world'.slice(6)
=> "w"

```

一个 Ruby 符号表示一个名字，是一个轻量级、不可变的值。作为字符串的简单化、非内存密集化（less memory-intensive）的替身，符号在 Ruby 中被广泛使用——通常是作为散列表中的键使用。符号字面量的开头会有一个冒号：

```ruby
irb(main):007:0> :my_symbol
=> :my_symbol
irb(main):008:0> :my_symbol == :my_symbol
=> true
irb(main):009:0> :my_symbol == :another_symbol
=> false
```

特殊值 `nil` 用来表示不存在任何有用的值：

```ruby
irb(main):105:0> "hello world".slice(11)
=> nil
```

#### 数据结构

##### 数组

```ruby
numbers = ["zero", "one", "two"]
```

##### 范围 （range）

范围（range）表示最小值和最大值之间值的集合。范围的写法是两个值之间加两个点：

```ruby
irb(main):192:0> ages = 18..30
=> 18..30
irb(main):193:0> ages.entries
=> [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
irb(main):194:0> ages.include?(25)
=> true
irb(main):195:0> ages.include?(44)
=> false
irb(main):196:0>
```

##### 散列表

```ruby
fruit = {"a" => "apple", "b" => "banana", "c" => "cocount"}
=> {"a"=>"apple", "b"=>"banana", "c"=>"cocount"}
```

符号作键：

```ruby
irb(main):015:0> dimensions = {width: 1000, height: 2250, depth: 250}
=> {:width=>1000, :height=>2250, :depth=>250}
```

#### proc

```ruby
irb(main):016:0> multiply = -> x, y {x * y}
=> #<Proc:0x00007f984f949230@(irb):16 (lambda)>
irb(main):017:0> multiply.call(6, 9)
=> 54
```

### 控制流

Ruby 有 if、case 和 while 表达式，它们都以通常的方式工作：

### 对象和方法

每个值都是一个对象，而且独享彼此之间靠`发送信息`进行通信。每个对象都有自己的方法集合，这些方法决定了它`如何响应`特定的消息。

一个`消息`有一个名字，并且根据需要可以有一些`参数`。一个对象收到一个消息的时候，`它对应的方法`就会使用`消息中的参数`作为自己的参数执行。

通过向一个特殊内建对象 object 发送 new 信息来新建一个对象；

```ruby
irb(main):007:0> o = Object.new
=> #<Object:0x00007ffb6e83bbe0>
```

给 o 对象定义方法：

```ruby
irb(main):008:0> def o.add(x, y)
irb(main):009:1> x + y
irb(main):010:1> end
```

在所有的方法定义之外，当前对象是一个叫 main 的特殊顶层对象，任何没有指明接收者的消息都会被发送给它。同样，renew 没有指明对象的方法定义都可以通过 main 使用。

```ruby
irb(main):008:0> def o.add(x, y)
irb(main):009:1> x + y
irb(main):010:1> end
=> :add
irb(main):011:0> o.add(2, 3)
=> 5
```

### 类和模块

<u>能在许多对象之间共享方法定义是件很便利的事。</u>在 Ruby 中我们可以把方法定义放到一个类里，然后通过给那个类发送 new 信息来新建对象。所获的的对象是包括方法在内的这个类的实例。

```ruby
irb(main):012:0> class Calculator
irb(main):013:1> def divide(x, y)
irb(main):014:2> x / y
irb(main):015:2> end
irb(main):016:1> end
=> :divide
irb(main):017:0> c = Calculator.new
=> #<Calculator:0x00007ffb6e849150>
irb(main):018:0> c.class
=> Calculator
irb(main):019:0> c.divide(10, 2)
=> 5
```

```ruby
irb(main):020:0> divide(10, 2)
NoMethodError: undefined method `divide' for main:Object
```

另一种共享方法定义的方式是在`模块（module）`中声明它们，这样它们就能被任意类包括。

声明模块：

```ruby
irb(main):045:0> module Addition
irb(main):046:1> def add(x, y)
irb(main):047:2> x + y
irb(main):048:2> end
irb(main):049:1> end
=> :add

```

使用模块：

```ruby
irb(main):059:0> class AddingCalculator
irb(main):060:1> include Addition
irb(main):061:1> end
=> AddingCalculator
irb(main):062:0> ac = AddingCalculator.new
=> #<AddingCalculator:0x00007ffb6e05d6a8>
irb(main):063:0> ac.add(10, 2)
=> 12

```

这个概念很像装饰器，或者 Unity 中的组件概念。

### 其他特性

#### 局部变量和赋值

Ruby 仅允许**通过赋值声明局部变量**：

```ruby
irb(main):064:0> greet = "hello"
=> "hello"
irb(main):065:0> greeting
NameError: undefined local variable or method `greeting' for main:Object
Did you mean?  greet
	from (irb):65
	from /usr/bin/irb:11:in `<main>'
irb(main):066:0> greet
=> "hello"
```

通过数组一次给多个变量并行赋值

```ruby
irb(main):067:0> width, height, depth = [1000, 2250, 250]
=> [1000, 2250, 250]
irb(main):068:0> height
=> 2250
irb(main):069:0>
```

#### 字符串插值

字符串可以使用单引号也可以使用双引号表示。对双引号中的字符串，Ruby 会自动用表达式的结果替换 `#{表达式}`，以执行字符串插值操作。

```ruby
irb(main):070:0> "hello #{'dlrow'.reverse}"
=> "hello world"
```

如果被插入的表达式返回的不是一个字符串类型的对象，那么这个对象就会自动收到一个 `to_s` 消息以返回能顶替其位置的字符串。

```ruby

irb(main):071:0> o = Object.new
=> #<Object:0x00007ffb6e03df60>
irb(main):072:0> def o.to_s
irb(main):073:1> 'a new object'
irb(main):074:1> end
=> :to_s
irb(main):075:0> "here is #{o}"
=> "here is a new object"

```

#### 检查对象

每当 IRB 需要一个对象，类似下面的一些事情就会发生：向这个对象发送 `inspect` 消息，然后这个对象返回自身的字符串表示。Ruby 当中所有对象默认都有对 `#inpect` 的合理实现，但是通过提供自己的定义，我们就可以控制如何在控制台显示对象：

```ruby
irb(main):094:0> o = Object.new
=> #<Object:0x00007ffb6e116fb8>
irb(main):095:0> def o.inspect
irb(main):096:1> '[my object]'
irb(main):097:1> end
=> :inspect
irb(main):098:0> o
=> [my object]
```

#### 打印字符串

```ruby
irb(main):099:0> x = 128
=> 128
irb(main):100:0> while x < 1000
irb(main):101:1> puts "x is #{x}"
irb(main):102:1> x = x * 2
irb(main):103:1> end
x is 128
x is 256
x is 512
=> nil
```

#### 可变参数方法（variadic method）

定义方法时可以使用 `*` 运算符，以支持数目可变的参数：

```ruby
irb(main):106:0> def join_with_commas(*words)
irb(main):107:1> words.join(",")
irb(main):108:1> end
=> :join_with_commas
irb(main):109:0> join_with_commas("one", "two", "three")
=> "one,two,three"
```

一个方法只有一个可变参数，而常规参数放到可变参数的前后都可以：

```ruby
irb(main):115:0> def join_with_commas(before, *words, after)
irb(main):116:1> before + words.join(',') + after
irb(main):117:1> end
=> :join_with_commas

irb(main):119:0> join_with_commas("Tesing: ", "one", "two", "three", ".")
=> "Tesing: one,two,three."
```

在发送消息的时候，`*` 运算符还可以把每一个数组元素当作单个参数处理：

```ruby
irb(main):120:0> arguments = ['Testing: ', 'one', 'two', 'three', '.']
=> ["Testing: ", "one", "two", "three", "."]
irb(main):121:0> join_with_commas(*arguments)
=> "Testing: one,two,three."
irb(main):122:0>
```

`*` 也可以使用并行赋值方式：

```ruby
irb(main):122:0> before, *words, after = ['Testing: ', 'one', 'two', 'three', '.']
=> ["Testing: ", "one", "two", "three", "."]
irb(main):123:0> before
=> "Testing: "
irb(main):124:0>
irb(main):125:0* words
=> ["one", "two", "three"]
irb(main):126:0>
irb(main):127:0* after
=> "."

```

#### 代码块

代码块 （block）是由 `do/end` 或者大括号围住的一段 Ruby 代码。方法可以带一个`隐式代码`块参数，并使用 `yield` 关键字表示对代码块中那段代码的调用：

```ruby
irb(main):157:0> def do_three_times
irb(main):158:1> yield
irb(main):159:1> yield
irb(main):160:1> yield
irb(main):161:1> end
```

代码块可以带参数：

```ruby
irb(main):163:0> def do_three_times
irb(main):164:1> yield('first')
irb(main):165:1> yield('second')
irb(main):166:1> yield('third')
irb(main):167:1> end

irb(main):169:0> do_three_times {|n| puts "#{n}: hello" }
first: hello
second: hello
third: hello
=> nil

```

`yield` 返回执行代码块的结果：

```ruby
irb(main):001:0> def number_names
irb(main):002:1> [yield('one'), yield('two'), yield('three')].join(', ')
irb(main):003:1> end
=> :number_names
irb(main):004:0> number_names { |name| name.upcase.reverse}
=> "ENO, OWT, EERHT"
irb(main):005:0>
```

#### 枚举类型

Ruby 有一个 Enumerable 的内置模块，被数组（Array）、散列表（Hash）、范围（Range）以及其他表示值的集合的类包含。Enumerable 提供的方法可以帮助我们对集合进行遍历、搜索和排序，其中的很多方法都可以在调用时都可以带上一个代码块。通常，代码块中的代码会根据集合中的一些值或全部值来运行，以此承担方法的一部分工作。

#### 结构体

结构体（Struct）是 Ruby 中一个特殊的类，它的工作是<u>生成其他类。</u>根据传进 Struct.new 的每个属性名，Struct 产生的类会包含相应的获取方法和设置方法。要使用结构体生成的类，常见方式是对其进行子类化；我们可以给子类起个名字，然后在里边定义其他任意的方法。

Ruby 中的 Struct 类还为它包含的每个属性提供了一对 `getter/setter` 方法。

```ruby
irb(main):001:0> class Point < Struct.new(:x, :y) 
irb(main):002:1> def +(other_point)
irb(main):003:2> Point.new(x + other_point.x, y + other_point.y)
irb(main):004:2> end
irb(main):005:1> def inspect
irb(main):006:2> "#<Point (#{x}, #{y})>"
irb(main):007:2> end
irb(main):008:1> end
=> :inspect
```


创建 Point 的一些实例，然后在 IRB 中进行检查， 并给它们发送信息：

```ruby
irb(main):009:0> a = Point.new(2, 3)
=> #<Point (2, 3)>
irb(main):010:0> b = Point.new(10, 20)
=> #<Point (10, 20)>
irb(main):011:0> a + b
=> #<Point (12, 23)>
```

和我们定义的方法一样，Point 实例会响应消息 x 和 x=，以便获取和设置属性 x 的值。

```ruby	
irb(main):012:0> a.x
=> 2
irb(main):013:0> a.x = 35
=> 35

```

由 Struct.new 生成的类还有其他实用功能，像判断是否相等的方法 #== 的实现，就可以比较两个结构体的属性是否相等：

```ruby
irb(main):018:0> Point.new(4, 5) == Point.new(4, 5)
=> true
irb(main):019:0> Point.new(4, 5) == Point.new(6, 7)
=> false
```

#### 给内置对象扩展方法

我们随时都可以给类或模块增加方法。这是一个强大的特性，通常叫做 Monkey Patching，可以让我们扩展已有类的行为。

```ruby
irb(main):024:0> class Point
irb(main):025:1> def -(other_point)
irb(main):026:2> Point.new(x - other_point.x, y - other_point.y)
irb(main):027:2> end
irb(main):028:1> end

```

我们甚至可以扩展 Ruby 内置的类：

```ruby
irb(main):035:0> class String
irb(main):036:1> def shout
irb(main):037:2> upcase + "!!!"
irb(main):038:2> end

irb(main):043:0> "hello world".shout
=> "HELLO WORLD!!!"
```

#### 定义常量

Ruby 支持一种叫做常量的特殊变量。一般而言，常量一旦创建，就不能再被重新赋值。（Ruby 并不会阻止一个常量被重新赋值，但它会产生警告，以便我们知道自己做错了事。）任何以大写字母开头的变量都是常量。可以在顶层或者在一个类或模块中定义新的常量：

```ruby
irb(main):044:0> NUMBERS = [4, 8, 15, 16, 23, 42]
=> [4, 8, 15, 16, 23, 42]
irb(main):045:0> class Greetings
irb(main):046:1> ENGLISH = "hello"
irb(main):047:1> FRENCH = "bonjour"
irb(main):048:1> 
irb(main):049:1* GERMAN = "guten Tag"
irb(main):050:1> end
=> "guten Tag"
irb(main):051:0> NUMBERS.last
=> 42
irb(main):052:0> Greetings::FRENCH
=> "bonjour"
irb(main):053:0> NUMBERS = [1]
(irb):53: warning: already initialized constant NUMBERS
(irb):44: warning: previous definition of NUMBERS was here
=> [1]
```

类和模块的名字总是以`大写字母开头`，所以类和模块的名字也是常量。

#### 删除常量

在使用 IRB 进行探索时，如果我们想重新定义某个类或模块，而不是要扩展它们，实用的做法是让 Ruby 完全忽略该常量。一个顶层常量可以通过给 Object 发送信息 remove_const 来删除，同时还要把常量名作为`符号（symbol）`对象传进去：

```ruby
irb(main):057:0> NUMBERS.last
=> 1
irb(main):058:0> Object.send(:remove_const, :NUMBERS)
=> [1]
irb(main):059:0> NUMBERS.last
NameError: uninitialized constant NUMBERS
Did you mean?  Numeric
	from (irb):59
	from /usr/bin/irb:11:in `<main>'
irb(main):060:0> 
```

只能使用 `Object.send(:remove_const, :常量名)` 而非 Object.remove_const(:常量名)，这是因为 remove_const 是一个私有（private）方法，只能通过从 Object 类的自身内部发送消息来调用；使用 Object.send 时，我们可以暂时跳过这个限制。
 