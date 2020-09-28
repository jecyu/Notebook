# 实现一个 迷你 Vue

100 行代码实现一个迷你 Vue

本文涉及的源码以及更多 API 的实现可在 github 查看。转载请注明出处和原文链接。
从 MVVM 谈起
MVVM 全称是 Model-View-ViewModel。经历过还没有 React、Vue 等框架的那个年代的前端们应该都知道，手动去同步页面上的数据与视图是一件多么麻烦的事情，特别是在数据和交互较复杂的页面上，手动同步会带来代码冗余、容易出错、难以追踪错误等问题。

MVVM 框架的出现解决了这个问题。我们只要建立好数据结构以及数据与视图的对应关系，在之后的开发中，只需要把关注点放在处理数据上，框架会自动帮我们处理好数据变动带来的视图更新。

如何造一个 MVVM
MVVM 的核心功能在于将数据和视图关联起来。即监听数据变动的事件，事件触发时对关联这个数据的视图进行更新。

我们先明确想要实现的功能，再去思考怎么实现。这里用一个例子来说明： 现在有格式如下的数据

```js
let data = { text: "world" };
```

以及语法如下的视图

```html
<body>
  <div>hello</div>
  <div>{{ text }}</div>
</body>
```

我们想要实现的是： 初始化后，`<div>{{ text }}</div>`会被解析为`<div>world</div>`渲染到页面上。执行 `data.text = 'vue'` 后，该 DOM 节点会被重新解析为 `<div>vue</div>`，并在页面上更新。

要达到这个效果，我们需要做的东西有：

能监听数据变化的观察者（Observer），来监听 data.text 的变化
编译 DOM 的编译器（Compiler），将`<div>{{ text }}</div>`中的 text 替换成对应数据，并更新该 DOM 节点。
连接 Observer 和 Compiler 的桥梁（Dependence & Watcher），它的作用是当 Observer 监听到某数据变化时，去通知所有依赖该数据的 Compiler，让它们重新编译并更新 DOM。
OK，思路整理完毕，接下来一步步实现。

## Observer

数据是存放在 data 对象上的，要监听数据变化也就是监听对象的键值变化（这里先不讨论有数组的情况），此时可以借助 Reflect 的 defineProperty 来实现。

先来做个小实验，执行下列代码

```js
let data = { text: "world" };
let val = data.text;
Reflect.defineProperty(data, "text", {
  get() {
    console.log("get: " + val);
    return val;
  },
  set(newVal) {
    console.log("set: " + newVal);
    val = newVal;
  },
});
data.text = "vue";
console.log(data.text);

// 控制台输出如下
// 'set: vue'
// 'get: vue'
// 'vue'
```

可以看到 date.text 设值和取值的过程都被监听到了，这样我们可以在 getter 和 setter 中加入逻辑来完成对数据变动的监听。

虽然监听成功了，但是还需要对这个方法加工一下，使其能够应对对象有多个键以及对象里面还有对象的情况

```js
let data = { text: "world" };

function observe(data) {
  // 监听对象
  if (Object.prototype.toString.call(data) === "[object Object]") {
    // 确保监听对象是 Object
    for (let prop in data) {
      defineReactive(data, prop, data[prop]);
    }
  }
}

function defineReactive(obj, key, val) {
  // 对对象的 key 进行监听
  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      observe(newVal); // 监听新的键值
    },
  });
  observe(val); // 递归监听对象的键值
}

observe(data);
```

这时我们已经能够对 data 对象里的数据变动进行监听了。这里要注意的是，直接对对象的一个新 key 赋值是不会被监听到的（因为这个新的 key 并没有被设置 getter/setter），所以需要在一开始就把 data 中需要的 key 先列出来，使其被监听到。

接下来我们为每个 key 构造一个容器。这个容器（Dependence）需要能够接受这个 key 的数据变动事件，然后通知给关心该事件的所有订阅者（Subscription），所以它的方法应该有：1. 添加订阅者 2. 删除订阅者 3. 通知所有订阅者。这一步我们不去管订阅者怎么实现，先把这个容器写出来，后面再完善。

```js
class Dep {
  constructor() {
    this.subs = new Set();
  }
  addSub(sub) {
    // 添加订阅者，因为用了 Set，所以这里可以保证添加进来的订阅者不会重复
    this.subs.add(sub);
  }
  removeSub(sub) {
    // 删除订阅者
    this.subs.delete(sub);
  }
  notify() {
    // 通知所有订阅者（调用每个订阅者的 update 方法）
    for (let sub of this.subs) {
      sub.update();
    }
  }
}
```

然后把这个容器和前面的 defineReactive 函数结合起来

```js
function defineReactive(obj, key, val) {
  const dep = new Dep(); // 为每个 key 构造一个存放关心该 key 的订阅者的容器
  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      observe(newVal);
      dep.notify(); // 当 key 变化时通知该容器下的所有订阅者
    },
  });
  observe(val);
}
```

观察者（Observer）已经基本上完成了。下一步我们来实现编译器（Compiler）。

Compiler
现在我们需要一个编译器来遍历 DOM 树，并把需要编译的部分替换成编译的结果。

第一步是模板编译。

我们以一个简单例子开始，定义一个数据源

```js
let data = { text: "world" };
```

以及这样一段模板：`hello {{ text }} !`

我们想要的编译效果是，把{{}}之外的内容用字符串原封不动地输出，把{{}}之内的代码作为 js 表达式输出，然后把它们拼接到一起，供之后的代码使用。要实现这个效果，需要对模板进行正则解析

```js
function textToExp(text) {
  let pieces = text.split(/({{.+?}})/g);
  pieces = pieces.map((piece) => {
    if (piece.match(/{{.+?}}/g)) {
      // {{}}内的代码，以 js 表达式输出
      piece = "(" + piece.replace(/^{{|}}\$/g, "") + ")";
    } else {
      // {{}}外的代码，以字符串输出
      piece = "`" + piece.replace(/`/g, "\\`") + "`"; // 需要对字符串中的`转义
    }
    return piece;
  });
  return pieces.join("+");
}

console.log(textToExp("hello {{ text }} !"));

// 控制台输出
// '`hello`+( text )+`!`'
```

拼接好的这段字符串可以用 Function 的构造函数转化成可执行代码，用法类似这样

```js
function expToFunc(exp) {
  return new Function("return " + exp);
}

let fn = expToFunc("`hi` + name");
let name = "nossika";

console.log(fn());

// 控制台输出
// 'hi nossika'
```

但这样有一个问题，数据源 data 是一个对象，如何把表达式中的变量对应到 data 的属性上（比如 text 要对应到 data.text）？

这个问题好像只要编译的时候在变量前面加上前缀 data.编译成 data.key 这样的格式就可以解决。但是表达式不一定只是类似于{{ text }}的一个简单变量，也有可能是类似于 {{ 'hi ' + { key: text }['key'] }}的一些复杂情况，这时候可能就得再引入一个词法解析器来把表达式解析成抽象语法树，才能找出并操作里面的变量。

有个方法可以方便地解决这个加前缀的问题：使用 with。虽然 with 并不被推荐使用，但对于这个问题使用 with 确实能省事不少。下面使用 with 来改造一下 expToFunc 函数，结合模板编译的例子 测试一下：

```js
let data = { text: "world" };

function expToFunc(exp, scope) {
  // 把数据源绑定到函数的 this，函数内部加上 with(this){}，这样函数内的变量访问的就是数据源上的 key
  return new Function("with(this){return " + exp + "}").bind(scope);
}

let fn = expToFunc("`hello`+( text )+`!`", data);

console.log(fn());

// 控制台输出
// 'hello world !'
```

现在我们已经能够结合数据源对文本进行编译了，但我们需要的功能是：传入一个 DOM 树和数据源，DOM 树上的节点会被遍历并编译，所以得再封装一下：

```js
function textToExp(text) {
  // ...
}
function expToFunc(exp, scope) {
  // ...
}

function walkChildren(el, scope) {
  // el.childNodes 获取到的是 NodeList 对象，先把它转化 Array
  [].slice.call(el.childNodes).forEach((node) => {
    if (node.nodeType === 3) {
      // 对文本节点编译并替换文本内容
      compileText(node, scope);
    } else if (node.nodeType === 1) {
      // 对元素节点则继续遍历
      walkChildren(node, scope);
    }
  });
}

function compileText(node, scope) {
  // 结合 textToExp 和 expToFunc 来完成文本编译
  let exp = textToExp(node.textContent);
  node.textContent = expToFunc(exp, scope)();
}
```

然后结合 DOM 测试一下 walkChildren：

```html
<body>
  <div id="app">
    <div>hello</div>
    <div>{{ text }}</div>
  </div>
</body>
<script>
  // ...
  let data = { text: "world" };
  walkChildren(document.querySelector("#app"), data);
</script>
```

执行完 walkChildren 后，页面上最终的 DOM 被渲染成：

```html
<body>
  <div id="app">
    <div>hello</div>
    <div>world</div>
  </div>
</body>
```

编译器（Compiler）也基本上完成了，现在还剩下最后一步：我们需要在 data 中的数据改变的时候，重新触发对应的 Compiler 来对 DOM 进行更新。所以我们再引入一个 Watcher，来把 Observer 和 Compiler 关联起来。

## Watcher

在前面的 Observer 一节中，我们为数据源的每个 key 创建了一个 Dep 实例，这个 Dep 能够容纳多个订阅者，并且能够在 key 改变的时候通知这些订阅者（即触发订阅者的 update 方法）。这里所说的订阅者就是本节的 Watcher，订阅者的 update 方法就是去调用 Compiler。

为满足我们的需求，Watcher 应该存放三样东西：原始表达式（exp）、数据源（scope）、DOM 更新函数（callback）。当触发它的 update 方法时，它会根据数据源和原始表达式来编译出最新的文本，然后调用 DOM 更新函数来更新 DOM。下面先把 Watcher 的大致样子写出来：

```js
class Watcher {
  constructor(exp, scope, callback) {
    this.value = null; // 存放当前编译结果
    this.getValue = expToFunc(exp, scope); // 生成编译结果的函数
    this.callback = callback;
    this.update(); // 绑定时需要编译一次
  }
  get() {
    return this.getValue();
  }
  update() {
    let newVal = this.get(); // 获取最新编译结果
    if (this.value !== newVal) {
      // 如果最新编译结果和当前的不一样，则调用 callback 更新 DOM
      this.value = newVal;
      this.callback && this.callback(newVal);
    }
  }
}
```

然后修改一下 Compiler 中的逻辑，编译文本节点时，为这个文本节点创建一个 Watcher，把它交给 Watcher 来更新。其实就是对 compileText 函数小小的修改一下：

```js
// 原来的 compileText
function compileText(node, scope) {
  let exp = textToExp(node.textContent);
  node.textContent = expToFunc(exp, scope)();
}
```

改为

```js
// 结合 Watcher 的原来的 compileText
function compileText(node, scope) {
  let exp = textToExp(node.textContent);
  // Watcher 绑定时会先编译一次，所以这里不需要再手动修改 node.textContent
  new Watcher(exp, scope, (newVal) => {
    node.textContent = newVal;
  });
}
```

现在再理一下思路，我们整理出来的流程是：数据源的 key 改变时，会去调用该 key 下的 Dep 中的每个 Watcher 的 update 方法来更新 DOM。现在 Dep 有了，Watcher 也有了。

接下来就是最关键的一步了，怎么把 Watcher 添加到对应的 Dep 中呢？

似乎应该在绑定 Watcher 的时候，去解析表达式中关联了数据源中的哪些 key，然后把这个 Watcher 添加到这些 key 下的 Dep 中。如果这样处理的话还是得引入一个词法解析器才能解析出表达式中关联的 key。

Vue 中用了一个非常精妙的方法解决了这个问题：利用 getter。

Watcher 的编译是用到了 expToFunc(this.exp, this.scope)()，这个过程会把表达式变成类似 with(scope){return prop1 + prop2}的函数，写得更直观一点就是 return scope.prop1 + scope.prop2，并且执行它来求表达式的值。所以在这个过程中其实已经调用了表达式中关联的 scope 的 key 的 getter。所以只要在 key 的 getter 中把这个 Watcher 添加到 Dep 就可以了。

为实现这个效果，我们需要引入一个全局标记，初始值是 null，在 Watcher 执行编译前把这个标记指向当前 Watcher 实例。编译过程中会触发各个 key 的 getter，getter 中需要判断标记指向的是否指向一个 Watcher，是的话把该 Watcher 添加到 Dep 中。编译结束后再把这个标记指向 null。

这个全局标记可以挂在 Dep 的静态属性上，我们给 Dep 添加一条静态属性 target：

```js
class Dep {
  static target = null;
  // ...
}
```

然后修改一下 Watcher，在编译前后改变 target 的指向：

```js
class Watcher {
  // ...
  get() {
    Dep.target = this; // 编译前把 target 指向当前 Watcher 实例
    let value = this.getValue(); // 这个编译过程中会触发关联的 key 的 getter
    Dep.target = null; // 编译后把 target 重置
    return value;
  }
  // ...
}
```

最后修改一下 Observer 中 defineReactive，在 getter 中把 target 指向的 Watcher 添加到 Dep：

```js
function defineReactive(obj, key, val) {
  const dep = new Dep();
  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 如果 target 指向了 Watcher，就把这个 Watcher 添加到 Dep
      // Dep 的 addSub 是一个 Set，所以不会把一个相同的 Watcher 添加多次
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      observe(newVal);
      dep.notify();
    },
  });
  observe(val);
}
```

到这里我们已经把所有的部分（Observer，Compiler，Dep，Watcher）都实现了，现在把它们组装到一起：

```js
class Vue {
  constructor(options) {
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    observe(this.$data);
    walkChildren(this.$el, this.\$data);
  }
}
```

然后像这样去调用：

```js
let vm = new Vue({
  el: "#app",
  data: {
    text: "world",
  },
});
```

这里还可以做一个优化，目前改变数据需要像 vm.\$data.text = 'new value'这样写，如果能够像 vm.text = 'new value'这样就要方便多了。我们加个代理函数 proxy：

```js
function proxy(vm, options) {
  for (let prop in options.data) {
    Reflect.defineProperty(vm, prop, {
      enumerable: true,
      configurable: true,
      get() {
        return vm.$data[prop]; // 调用vm.$data 的 getter
      },
      set(newVal) {
        vm.$data[prop] = newVal; // 调用vm.$data 的 setter
      },
    });
  }
}

class Vue {
  constructor(options) {
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    observe(this.$data);
    proxy(this, options);
    walkChildren(this.$el, this.\$data);
  }
}
```

这样就可以直接对 vm.text 直接取值和赋值了。

到这里，我们要做的迷你 Vue 已经全部完成了，它实现了 MVVM 核心的数据视图绑定功能。有兴趣的读者可移步到 github:little-vue 自行查看源码，其中实现了更多 Vue 的 api（支持对数组监听，支持 v-if 等属性节点编译、更多 options 选项，nextTick 优化等）。

## 完整代码

```js
// Observer

function observe(data) {
  if (Object.prototype.toString.call(data) === "[object Object]") {
    for (let prop in data) {
      defineReactive(data, prop, data[prop]);
    }
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      observe(newVal);
      dep.notify();
    },
  });
  observe(val);
}

// Dep

class Dep {
  constructor() {
    this.subs = new Set();
  }
  addSub(sub) {
    this.subs.add(sub);
  }
  removeSub(sub) {
    this.subs.delete(sub);
  }
  notify() {
    for (let sub of this.subs) {
      sub.update();
    }
  }
}
Dep.target = null;

// Compiler

function textToExp(text) {
  let pieces = text.split(/({{.+?}})/g);
  pieces = pieces.map((piece) => {
    if (piece.match(/{{.+?}}/g)) {
      piece = "(" + piece.replace(/^{{|}}\$/g, "") + ")";
    } else {
      piece = "`" + piece.replace(/`/g, "\\`") + "`";
    }
    return piece;
  });
  return pieces.join("+");
}

function expToFunc(exp, scope) {
  return new Function("with(this){return " + exp + "}").bind(scope);
}

function walkChildren(el, scope) {
  [].slice.call(el.childNodes).forEach((node) => {
    if (node.nodeType === 3) {
      compileText(node, scope);
    } else if (node.nodeType === 1) {
      walkChildren(node, scope);
    }
  });
}

function compileText(node, scope) {
  let exp = textToExp(node.textContent);
  new Watcher(exp, scope, (newVal) => {
    node.textContent = newVal;
  });
}

// Watcher

class Watcher {
  constructor(exp, scope, callback) {
    this.value = null;
    this.getValue = expToFunc(exp, scope);
    this.callback = callback;
    this.update();
  }
  get() {
    Dep.target = this;
    let value = this.getValue();
    Dep.target = null;
    return value;
  }
  update() {
    let newVal = this.get();
    if (this.value !== newVal) {
      this.value = newVal;
      this.callback && this.callback(newVal);
    }
  }
}

// Vue

function proxy(vm, options) {
  for (let prop in options.data) {
    Reflect.defineProperty(vm, prop, {
      enumerable: true,
      configurable: true,
      get() {
        return vm.$data[prop];
      },
      set(newVal) {
        vm.$data[prop] = newVal;
      },
    });
  }
}

class Vue {
  constructor(options) {
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    observe(this.$data);
    proxy(this, options);
    walkChildren(this.$el, this.\$data);
  }
}
```

## 参考资料

- [100 行代码实现一个迷你 Vue](https://zhuanlan.zhihu.com/p/29629337?utm_source=wechat_session&utm_medium=social&utm_oi=710800537397764096)
- https://github.com/nossika/little-vue/blob/master/src/compiler/index.js
