# 内存泄漏

- vue 组件destroyed 做了哪些工作

## 前言

本文主要讲述以下几点内容：

面向读者：

## 应用场景

### destroy 函数

例如写一个 tree 组件，是否需要提供 destroyed 函数呢？ vue 中的 destroyed 做了哪些事情？

```js
let tree = new easyTree({ baseNode: wrapper, data: treeData });
document.querySelector("#remove").addEventListener("click", () => {
  // 移除 tree
  wrapper.removeChild(document.querySelector(".easy-tree"));
  tree = null;
});
```

普通的 dom 引用以及点击事件都会被回收，因为 tree = null 了，但是如果内部存在定时器等则会有问题，为避免有遗漏。

普通的 dom 引用以及点击事件都会被回收，但是对于 `window.addEventList("resize")` 这种挂载在全局对象上的事件，是会一直监听的。因为 tree = null 了，但是如果内部存在定时器等则会有问题。如果一些 dom 引用被绑定到全局变量上也会有问题。

对于 vue 来说，destroy 不仅仅是消除引用，也实际做了移除 dom 的请求。写一个 vue 组件，在移除组件后即 v-if 后，vue 已经把我们解绑事件了吗？

例子 2：

```js
class Test {
  constructor() {
    this.elements = {
      button: document.querySelector("#button"),
      div: document.querySelector("#div"),
      span: document.querySelector("#span"),
    };
  }
  removeButton() {
    document.body.removeChild(this.elements.button);
    // this.elements.button = null
  }
}

const a = new Test();
a.removeButton();
```

上面的例子 button 元素 虽然在页面上移除了，但是内存指向换为了 this.elements.button，内存占用还是存在的。所以上面的代码还需要这样写： this.elements.button = null，手动释放这个内存。

如果直接设置 `a = null` 则全部解放回收。

```js
 unbindTree: function (setting) {
        var o = setting.treeObj;
        o.unbind('selectstart', handler.onSelectStart)
          .unbind('click', event.proxy)
          .unbind('dblclick', event.proxy)
          .unbind('mouseover', event.proxy)
          .unbind('mouseout', event.proxy)
          .unbind('mousedown', event.proxy)
          .unbind('mouseup', event.proxy)
          .unbind('contextmenu', event.proxy);
      },
```

```js
iconDom.onclick = this.onNodeExpand.bind(this); // // 采用事件委托，需要分配多个栈内存空间，存储地址

// 方式二：这里分配了多个堆空间，占用内存更大
iconDom.onclick = (evt) => { 
  // 这种方式内存暂用大
  const e = evt || window.event;
  const target = e.target || e.srcElement;
  const tagName = target.tagName.toLowerCase();
  let treeNodeCon = tagName === "div" ? target : target.parentNode;
  let childrenDom = treeNodeCon.nextElementSibling;
  if (treeNodeCon.getAttribute("expand") === "false") {
    treeNodeCon.firstChild.classList.remove("cl-icon-unfold");
    treeNodeCon.setAttribute("expand", "true");
    childrenDom.style.display = "block";
  } else {
    treeNodeCon.firstChild.classList.add("cl-icon-unfold");
    childrenDom.style.display = "none";
    treeNodeCon.setAttribute("expand", "false");
  }
}; 

// 第三种：更好的方式，采用事件委托
```

对于 vue 组件这种模版的，在渲染列表的时候是直接绑定到每个节点上的，这种如何做性能优化呢？

## 分析寻找

事件委托与直接绑定的性能分析。

## 参考资料

- [深入了解 JavaScript 内存泄露](https://juejin.im/post/5d68baf6e51d4561e224a384)
- [内存术语](https://developers.google.com/web/tools/chrome-devtools/memory-problems/memory-101?hl=zh-cn)
- 视频操作
- https://www.youtube.com/results?search_query=chrome+devtool
