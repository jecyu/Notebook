# React

一个组件有自己的显示形态（HTML 结构和内容）行为，组件的显示形态和行为可以由数据状态（state）和配置参数（props）共同决定。数据状态何配置参数的改变都会影响到这个组件的显示形态。React.js 也提供了一种非常高效的方式帮助我们做到了数据和组件显示形态之间的同步。

React.js 是一个帮助你构建页面的 UI 的库。React.js 不是一个框架，它只是一个库。它只提供 **UI （view）**层面的解决方案。React.js 将帮助我们将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。

在实际的项目中，它并不能解决我们所有的问题，需要结合其他的库，例如 Redux、React-route 等来协助完整的解决方法。
通过命令快速生成一个 React 应用。
```bash 
npx create-react-app comment-app
```

[[toc]]

## 入门

### 前端组件化

抽象公共组件类，不需要说实现其他组件，也要重新 setState 等方法
```js
// 我们需要这个点赞功能的 HTML 字符串表示的 DOM 结构，才能添加事件
  const createDOMFromString = domString => {
    const div = document.createElement('div');
    div.innerHTML = domString;
    return div;
  };
  
  class Component {
    constructor(props) {
      this.props = props; // 定制化配置
    }
    setState(state) {
      const oldEl = this.el;
      this.state = state;
      this._renderDOM();
      if (this.onStateChange) this.onStateChange(oldEl, this.el);
    }
    /**
     * @description: 构建 DOM 元素并监听 onClick 事件
     * @param {type}
     * @return: el
     */
    _renderDOM() {
      this.el = createDOMFromString(this.render());
      if (this.onClick) {
        this.el.addEventListener('click', this.onClick.bind(this), false);
      }
      return this.el;
    }
  }
  /**
   * @description: 把组件的 DOM 元素插入到页面中
   * @param {Object}
   * @param {Object}
   * @return: null
   */
  const mount = (component, wrapper) => {
    wrapper.appendChild(component._renderDOM());
    component.onStateChange = (oldEl, newEl) => {
      wrapper.insertBefore(newEl, oldEl);
      wrapper.removeChild(oldEl);
    };
  };
```

业务组件类：
```js
  class LikeButton extends Component {
    constructor(props) {
      super(props); // 调用父类的构造函数
      this.state = { isLiked: false };
    }
    onClick() {
      this.setState({
        isLiked: !this.state.isLiked
      });
    }
    /**
     * @description: 返回 HTML 字符串
     * @param {type}
     * @return:
     */
    render() {
      return `
        <button id='like-btn' style="background-color: ${
          this.props.bgColor
        }">
          <span class="like-text">${
            this.state.isLiked ? '取消' : '点赞'
          }</span>
          <span>👍</span>
        </button>
      `;
    }
  }
  
  class RedBlueButton extends Component {
    constructor(props) {
      super(props);
      this.state = {
        color: 'red'
      };
    }
    onClick() {
      this.setState({ color: 'blue' });
    }
    render() {
      return `
        <div style="color: ${this.state.color};">${this.state.color}</div>
      `
    }
  }
```

实际应用：
```js
  const wrapper = document.querySelector('.wrapper');
  mount(new LikeButton({ bgColor: 'green' }), wrapper);
  mount(new RedBlueButton(), wrapper);
```


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
```js
...
render() {
    const likedText = this.props.likedText || '取消';
    const unlikedText = this.props.unlikedText || '点赞';
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? likedText : unlikedText}
      </button>
    )
  }
...
```
从 `rendner` 函数可以看出，组件内部是通过 `this.props` 的方式获取组件的参数的，如果 `this.props` 里面有需要的属性我们就采用相应的属性，没有的话就用默认的属性。

那么，怎么把 `props` 传进去呢？在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 `props`  对象的键值：
```js
class Index extends Component {
  render() {
    return (
      <div>
        <LikeButton likedText='已赞' unlikedText='赞' />
      </div>
    )
  }
}
```
就像你在用普通的 `HTML` 标签的属性一样，可以把参数放在表示组件的标签上，组件内部就可以通过 `this.props` 来访问这些配置参数。前面说过JSX 的表达式可以在标签属性上使用。因此可以把任何类型的数据作为组件的参数，包括字符串、数字、对象、数组、甚至是函数等等。

```js
class LikeButton extends Component {
  constructor() {
    super()
    this.state = { name: 'Jecyu', isLiked: false }
  }
  handleClickOnLikeButton() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
  render() {
    const wordings = this.props.wordings || {
      likedText: '取消',
      unlikedText: '点赞'
    }
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? wordings.likedText : wordings.unlikedText}
      </button>
    )
  }
}
```

```js
class Index extends Component {
  render () {
    return (
      <div>
        <LikeButton
          wordings={{likedText: '已赞', unlikedText: '赞'}}
          onClick={() => console.log('Click on like button!')}/>
      </div>
    )
  }
}
```
当每次点击按钮的时候，控制台显示'Click on like button!'。但这个行为不是点赞组件自己实现的，而是我们传进去的。所以，一个组件的行为、显示形态都可以用`props`来控制，就可以达到很好的可配置性。

#### 默认配置 defaultProps

上面的组件默认配置我们是通过 `||`操作符来实现。这种需要默认配置的情况在 React.js 中非常常见，所以 React.js 提供了一种方式 `defaultProps`，可以方便做到默认配置。

```js
class LikeButton extends Component {
  // 默认配置 defaultProps
  static defaultProps = {
    wordings: {
      likedText: '取消',
      unlikedText: '点赞'
    }
  }

  constructor() {
    super()
    this.state = { name: 'Jecyu', isLiked: false }
  }
  handleClickOnLikeButton() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
  render() {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? this.props.wordings.likedText : this.props.wordings.unlikedText}
      </button>
    )
  }
}
``` 
`defaultProps` 作为点赞按钮组件的类属性，里面是对`props`中各个属性的默认配置。这样我们就不需要判断配置属性是否传进来了：如果没有传进来，会直接实用 `defaultProps` 中的默认属性。所以，在 `render` 函数中，我们会直接实用 `this.props` 而不需要再做判断。

#### props 不可变
 
`props` 一旦传入进来就不改变。**但是如果这个 props 是引用类型的话，则可以改变它的子属性。直接赋值才会报错。**
```js
...
handleClickOnLikeButton() {
    // this.props.wordings = {} // 报错
    // this.props.wordings.likedText = '暂时' // 不会报错
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
...
```
你不能改变一个组件被渲染的时候传进来的 `props`。React.js 希望一个组件在输入确定的 `props` 的时候，能够输出确定的 UI 显示形态。如果 `props` 渲染过程中可以被修改，那么就会导致这个组件显示形态喝行为变得不可预测，这样可能给组件使用者带来困惑。

但这并不意味着由 `props` 形态不能被修改，组件的使用者可以主动地通过重新渲染的方式把新的 `props` 传入组件当中，这样这个组件由 `props` 决定的显示形态也会得到相应的改变。

```js
class Index extends Component {
  constructor () {
    super()
    this.state = {
      likedText: '已赞',
      unlikedText: '赞'
    }
  }

  handleClickOnChange () {
    this.setState({
      likedText: '取消',
      unlikedText: '点赞'
    })
  }

  render () {
    return (
      <div>
        <LikeButton
          likedText={this.state.likedText}
          unlikedText={this.state.unlikedText} />
        <div>
          <button onClick={this.handleClickOnChange.bind(this)}>
            修改 wordings
          </button>
        </div>
      </div>
    )
  }
}
```
通过 setState 重新渲染，所以 `LikeButton` 会接收到新的 `props`，并且重新渲染，于是它的显示形态也会得到更新。（这个跟 Vue 是不一样的）

### state `vs` props

`state` 的主要作用是用于保存、控制、修改自己的可变状态。`state` 在组件内部初始化，可以被组件自身修改，而外部不能访问也不鞥修改。你可以认为 `state` 是一个局部的、只能被组件自身控制的数据源。`state`中状态可以通过 `this.setState` 方法进行更新，`setState` 会导致组件的重新渲染。

`props` 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 `props`，否则组件的 `props` 永远保持不变。
 
`state` 和 `props` 有着千丝万缕的关系。它们都可以决定组件的行为和显示形态。一个组件的 `state` 中的数据可以通过 `props` 传给子组件，一个组件可以使用外部传入的 `props` 来初始化自己的 `state`。**但是它们的职责其实非常清晰分明：`state`是让组件控制自己的状态，`props` 是让外部对组件自己进行配置。**

尽量少用 `state`，尽量多用 `props`。

没有 `state` 的组件叫无状态组件（stateless component），设置了 `state` 的叫做有状态组件（stateful component）。因为状态回带来管理的复杂性，我们尽量多写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。

React.js 非常鼓励无状态组件，引入了一种定义不能使用 `state` 组件，例如一个原来这样写的组件：
```js
class HelloWorld extends Component {
  constructor() {
    super()
  }

  sayHi() {
    alert('Hello World')
  }

  render() {
    return (
      <div onClick={this.sayHi.bind(this)}>Hello World</div>
    )
  }
}
```

用函数式组件的编写方式就是：
```js
const HelloWorld = (props) => {
  const sayHi = (event) => alert('Hello World')
  return (
    <div onnClick={sayHi}>Hello World</div>
  )
}
```
以前一个组件是通过继承 `Component` 来构建，一个子类就是一个组件。而用函数式的组件编写方式就是一个函数就是一个组件，你可以和以前一样通过`<HelloWorld/>` 使用该组件。不同的是，函数式组件只能接受 `props` 而无法像类组件一样可以在 `contructor`里面初始化 `state`。函数式组件就是一种只能接受 `props` 合提供 `render` 方法的类组件。

### 渲染列表数据

#### 渲染存放 JSX 元素的数组

假设现在我们有这么一个用户列表数据，存放在一个数组当中：
```js
const users = [
  {
    username: "Jerry", age: 21, gender: "male"  
  },
  {
    username: "Crazy", age: 19, gender: "male"  
  },
  {
    username: "Lily", age: 221, gender: "female"  
  },
]
```

如果现在要把这个数组里面的数据渲染页面上要怎么做？回忆下，JSX 的表达式插入 `{}` 里面可以放任何数据，如果我们往 `{}` 里面存放一个 `JSX` 元素的数组会怎么样？
```js
...
class Index extends Component {
  constructor() {
    super()
    this.state = {
      likedText: '已赞',
      unlikedText: '赞'
    }
  }
  handlClickOnChange() {
    this.setState({
      likedText: '取消',
      unlikedText: '点赞'
    })
  }
  render() {
    return (
      <div>
         {
           [
             <span>React.js</span>,
             <span>is</span>,
             <span>good</span>
           ]
         }
      </div>
    )
  }
}
...
```

我们往 JSX 里面塞了一个数组，这个数组里面放了一些 JSX 元素（其实就是 JavaScript 对象）。到浏览器中，在页面上将会被渲染。
```html
<div>
  <span>React.js</span>
  <span>is</span>
  <span>good</span>
</div>
```
React.js 把插入表达式数组里面的每一个 JSX 元素一个个罗列下来，渲染到页面上。所以这里有个关键点：如果你往`{}`放一个数组，React.js 会帮你把数组里面一个个元素罗列并且渲染出来。

#### 使用 map 渲染列表数据

知道这一点以后你就可以知道怎么用循环把元素渲染到页面上：循环上面用户数组里面的每一个用户，为每个用户数据构建一个 JSX，然后把 JSX 放到一个新的数组里面，再把新的数组插入 `render` 方法的 JSX 里面。

```js
class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div>姓名：{user.username}</div>
        <div>年龄：{user.age}</div>
        <div>性别：{user.gender}</div>
      </div>
    )
  }
}
class Index extends Component {
  constructor() {
    super()
    this.state = {
      likedText: '已赞',
      unlikedText: '赞'
    }
  }
  render() {
    return (
      <div>
        <div>{ users.map((user, index) => <User user={user} key={index} />)}</div>
      </div>
    )
  }
}
```

### 实战分析：评论功能（一）

#### 组件划分

React.js 中一切都是组件，用 React.js 构建的功能其实也就是由各种组件组合而成。所以拿到一个需求以后，我么要做的第一件事就是理解需求、分析需求、划分这个需求由哪些组件构成。

组件的划分没有特别明确的标准。划分组件的目的性是为了代码可复用性、可维护性。只要某个部分有可能复用到别的地方，你都可以把它抽离出来当成一个组件；或者把某一部分抽离出来对代码的组织和管理带来帮助，你也可以毫不犹豫地把它抽离出来。
 
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