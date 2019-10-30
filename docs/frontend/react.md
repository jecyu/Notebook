# React

一个组件有自己的显示形态（HTML 结构和内容）行为，组件的显示形态和行为可以由数据状态（state）和配置参数（props）共同决定。数据状态何配置参数的改变都会影响到这个组件的显示形态。React.js 也提供了一种非常高效的方式帮助我们做到了数据和组件显示形态之间的同步。

React.js 是一个帮助你构建页面的 UI 的库。React.js 不是一个框架，它只是一个库。它只提供 **UI （view）**层面的解决方案。React.js 将帮助我们将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。

在实际的项目中，它并不能解决我们所有的问题，需要结合其他的库，例如 Redux、React-route 等来协助完整的解决方法。

## 基础

### 使用 JSX 描述 UI 信息

#### JSX 原理

![jsx](../.vuepress/public/images/jsx.png)

```html
<div class='box' id='content'>
  <div class='title'>Hello</div>
  <button>Click</button>
</div>
```
每个 DOM 元素的结构都可以用 JavaScript 的对象来表示。一个DOM 元素包含的信息其实只有三个：标签名，属性，子元素。
```js
const dom = {
  tag: 'div',
  attrs: { className: 'box', id: 'content'},
  children: [
    {
      tag: 'div',
      arrts: {className: 'title'},
      children: ['Hello']
    },
    {
      tag: 'button',
      attrs: null,
      children: ['Click']
    }
  ]
}
```

1. JSX 是 JavaScript 语言的一种语言扩展，长得像 HTML，但不是 HTML。
2. React.js 可以用 JSX 来描述你的组件长什么样的。
3. JSX 在编译的时候会变成相应的 JavaScript 对象描述。
4. `react-dom` 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。

React 的 JSX 代码经过 babel + react 编译。
```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
会编译为：
```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

### 组件的 Render 方法
 
一个组件必须要实现一个 `render`方法，这个 `render` 方法必须要返回一个 `JSX`元素。但这里要注意的是，必须要用外层的 JSX 元素把所有内容包裹起来。
```js
...
render() {
  return (
    <div>
      <div>第一个</div>
      <div>第二个</div>
    </div>
  ) 
}
```

#### 表达式插入

在 JSX 当中通过 `{}` 插入 JavaScript 的表达式，包括变量、表达式计算、函数执行，`render` 会把这些代码渲染到页面上。
```js
render() {
  const word = 'is good'
  return (
    <div>
      <h1>React {word}</h1>
    </div>
  )
}
```

表达式不仅仅可以用在标签内部，也可以用在标签的属性上，例如：
```js
render() {
  const className = 'header'
  return (
    <div className={className}>
      <h1>React 小书</h1>
    </div>
  )
}
```
注意，直接使用`class` 在 React.js 的元素上添加类名如 `<div class="xxx"></div>`这种方式是不合法的。因为 `class` 是 JavaScript 的关键字，所以 `React.js` 中定义了一种新的方式：`className` 来帮助我们给元素添加类名。

还有一个特例是 `for` 属性，例如`<label for='male'>Male</label>`，因为 `for` 也是 JavaScript 的关键字，所以在 JSX 用 `htmlFor` 替代，即`<label htmlFor='male'>Male</label>`。而其他的 HTML 属性例如 `style``data-*` 等就可以像普通的 HTML 属性那样直接添加上去。
 
#### 条件返回

`{}` 可以放置任何表达式内容。我们可以在 `render` 函数内部根据不同条件返回不同的 JSX。例如：
```js
render() {
  cosnt isGoodWord = true
  return (
    <div>
      <h1>
        React 小书
        {isGoodWord ? 
          <strong>is good</strong>
          : <span>is not good</span>
        }
      </h1>
    </div>
  )
}
```

如果在表达式插入里面返回`null`，那么 React.js 会什么都不显示，相当于忽略了该表达式插入。结合条件返回的话，我们就可以做到显示或者隐藏某些元素：
```js
...
render() {
  const isGoodWord = true
  <div>
    <h1>
      React 小书
      {isGoodWord}
        ? <strong>is good</strong>
        : null
    </h1>
  </div>
}
...
```
另外，布尔类型、Null 以及 Undefined 将会忽略，`false`，`null`，`undefined`，`true`都是合法的子元素，但它们不会被渲染，这有助于我们根据特定条件渲染其他的 React 元素。注意的是，有一些"falsy"值，如数字0，仍然会被 React 渲染。因此，需要确保把它转为布尔类型。
```jsx
<div>{props.messages.length && <span>{props.messages}</span>}</div>
```

#### JSX 元素变量

JSX 元素就是 JavaScript 对象，因此JSX 元素其实可以像 JavaScript 对象那样自由地赋值给变量，或者作为函数参数传递、或者作为函数的返回值。
```js
render() {
    const isGoodWord = true
    const className = 'header'
    const goodWord = <strong>is good</strong>
    const badWord = <strong>is not good</strong>
    return (  // 直接返回 HTML 代码，JSX 写法，需要经过编译成果 JavaScript 对象
      <div className={className}>
        <h1>React 小书 {isGoodWord ? goodWord : badWord}</h1>
      </div>
    )
  }
```

接收两个 JSX 元素作为参数
```js
 render() {
    const isGoodWord = true
    const className = 'header'
    const goodWord = <strong>is good</strong> // JSX 直接赋值给两个变量
    const badWord = <strong>is not good</strong>
    return (  // 直接返回 HTML 代码，JSX 写法，需要经过编译成果 JavaScript 对象
      <div className={className}>
        <h1>React 小书 {isGoodWord ? goodWord : badWord}</h1>
        <h1>React 小书 {this.renderGoodWord(goodWord, badWord)}</h1>
      </div>
    )
  }
  renderGoodWord(goodWord, badWord) {
    const isGoodWord = true;
    return isGoodWord ? goodWord : badWord
  }
```

### 组件组合、嵌套和组件树

组件组合，自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头。
```js
class Title extends Component {
  render() {
    return (
      <h1>Jecyu</h1>
    )
  }
}

class Header extends Component { // 继承 React.js 的组件父类 Component
  render() {
    const className = 'header'
    return (  // 直接返回 HTML 代码，JSX 写法，需要经过编译成果 JavaScript 对象
      <div className={className}>
        <Title /> 
        {/* 自定义的组件都必须要用大写字母开头，另外如果没有子元素，则可以自闭合标签 */}
      </div>
    )
  }
}
```

把组建组合起来，构成一个组件树。下面的页面是由`Header`，`Main`，`Footer` 几个部分组成，由一个 `Index` 把它们组合起来。
```js
class Title extends Component {
  render() {
    return (
      <h1>Jecyu</h1>
    )
  }
}

class Header extends Component { // 继承 React.js 的组件父类 Component
  render() {
    // const isGoodWord = true
    const className = 'header'
    return (  // 直接返回 HTML 代码，JSX 写法，需要经过编译成果 JavaScript 对象
      <div className={className}>
        <Title /> 
        <h2>This is Header</h2>
      </div>
    )
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <h2>This is main content</h2>
      </div>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <div>
        <h2>This is footer</h2>
      </div>
    )
  }
}

class Index extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}
 // ReactDOM 可以帮助我们把 React 组件渲染到页面中
ReactDOM.render(<Index />, document.getElementById('root'))
```
![组件树](../.vuepress/public/images/component_tree.png)
理解组件树的概念有利于我们理解数据是如何在组件树内自上而下流动过程。

### 事件监听

在 React.js 只需要给需要监听事件的元素加上属性类似于 `on*` 的属性，`on*`紧接着一个表达式插入，这表达式返回一个`Title`自己的一个实例方法。这些事件属性的名都必须用驼峰命名法。没有经过特殊处理的话，这些`on*`的事件监听智能用到普通的 HTML 标签上，而不能用在组件标签上。（ [SyntheticEvent - React](https://reactjs.org/docs/events.html#supported-events)——React 封装了不同类型的事件，不需要我们考虑不同浏览器兼容的问题。）
```js
class Title extends Component {
  handleClickOnTitle() {
    console.log('Click on title');
  }
  render() {
    return (
      <h1 onClick={this.handleClickOnTitle}>Jecyu</h1>
    )
  }
}

```

### event 对象

和普通浏览器一样，事件监听函数会被自动传入一个 event 对象，这个对象和普通的浏览器 event 对象所包含的方法和属性都基本一致。不同的是 React.js 中的 event 对象并不是浏览器提供的，而是它自己内部所构建的。

React.js 会给每个事件监听传入一个 event 对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。

### 关于事件中的 this

一般在某个类的实例方法里面的`this`指的是这个实例本身。但是在 `handleClickOnTitle`打印的 `this`是 `null`或者`undefined`。
```js
...
handleClickOnTitle() {
  console.log('this :', this); // null
}
...
```
这是因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（`this.handleClickOnTitle`），而是直接通过函数调用（`handleClickOnTitle`），所以以事件监听函数内并不能通过 `this`获取实例。

如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 `bind` 到当前实例上再传入给 React.js。
```js

class Title extends Component {
  handleClickOnTitle(word, event) {
    console.log('event.target.innerHTML :', event.target.innerHTML);
    console.log('this :', this);
    console.log(this, word);
  }
  render() {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>Jecyu</h1> // 把实例方法绑定到当前实例上，这样才可以在事件函数当中使用当前的实例
    )
  }
}
```
React.js 的事件监听方法需要手动 bind 到当前实例，这种模式在 React.js 中非常常用。

### 组件的 state 和 setState

#### state

一个组件的显示状态是可以由它数据状态和配置参数决定的。一个组件可以拥有自己的状态，就像一个点赞按钮，可以有“已点赞”和“未点赞”状态，并且可以在这两种状态之间进行切换。React.js 的 `state` 就是用来存储这种可变化的状态的。
```js
// 点赞、取消按钮
class LikeButton extends Component {
  constructor() {
    super()
    this.state = { isLiked: false }
  }
  handleClickOnLikeButton() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
  render() {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? '取消' : '点赞'}
      </button>
    )
  }
}
```

#### setState 接受对象参数

`setState` 方法由父类`Component`提供。当我们调用这个函数的时候，React.js 会更新组件的状态`state`，并且重新调用`render`方法，然后再把`render`方法渲染的最新的内容显示到页面上。

注意，当我们要改变组件的状态的时候，不能直接用`this.state=xxx`这种方式来修改，如果这样做 React.js 就没办法知道你修改了组件的状态，它也就没有办法更新页面。所以，一定要使用 React.js 提供的 `setState` 方法，它接受一个对象或者函数作为参数。

传入一个对象的时候，这个对象表示改组件的新状态。但你只需要传入需要更新的部分就可以了，而不需要传入整个对象。
```js
...
  constructor() {
    super()
    this.state = { name: 'Jecyu', isLiked: false }
  }
  handleClickOnLikeButton() {
    this.setState({
      isLiked: !this.state.isLiked  /// name 不需要传入
    })
  }
...
```

#### setState 接受函数参数

这里还有要注意的是，当你调用 `setState` 的时候，React.js 并不会马上修改 state。而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新。

```js
....handleClickOnLikeButton() {
  this.setState({ count: 0}) // => this.state.counte 还是 undefined
  this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
  this.setState({ count: this.state.count + 2}) // => undefined + 2 = NaN
}
```
上面的代码的运行结果并不能达到我们的预期，我们希望 `count` 的运行结果是 3，最后得到却是 `NaN`。但是这种后续操作依赖前一个 `setState` 的结果的情况并不罕见。

因此，这里引出 `setState` 的第二种使用方式，可以接受一个函数作为参数。React.js 会把上一个 `setState` 的结果传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 `state` 的对象
```js
....handleClickOnLikeButton() {
  this.setState(prevState => return { count: 0}) // => this.state.counte 还是 undefined
  this.setState(prevState => return { count: prevState.count + 1}) // => undefined + 1 = NaN
  this.setState(prevState => return { count: prevState.count + 2}) // => undefined + 2 = NaN
}
```

#### setState 合并

上面我们进行了三次 `setState`，但是实际上组件只会重新渲染一次，而不是三次；**这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的`setState`都进行合并以后再重新更新渲染组件**。因此，在使用 React.js 的时候，并不需要担心多次进行 `setState` 会带来性能问题。

### 配置组件的 props

组件是相互独立、可复用的单元，一个组件可能在不同地方被用到。但是在不同的场景下对这个组件的需求可能会根据情况有所不同，例如一个点赞按钮上面显示的文本。如何让组件能适应不同场景下的需求，我们就需要让组件具有一定的“可配置”性。
 
React.js 的 `props` 就可以帮助我们达到这个效果。每个组件都可以接受一个 `props` 参数，它是一个对象，包含了所有你对这个组件的配置。

#### 默认配置 defaultProps

#### props 不可变

### 生命周期

### 性能优化

### 通信

#### 父子通信

#### 兄弟组件通信

#### 跨多层次组件通信

#### 任意组件

## 进阶
 
## 参考资料

- [深入 JSX](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#___gatsby)