# 前端系统架构

## 状态管理

- 某一状态能够被有效记录
  - dom attribute
  - jq（事件 dom）
- 状态的变化能被有效感知和响应
  - backbone（事件 model）
- 状态的改变能驱动界面的变化
  - angular（脏检查机制）
  - 单向数据流
- 界面是状态的映射
  - vue
  - 集中管理
- 集中管理状态
  - 观察者
  - mobx、redux、vuex
  - 框架层、UI层只是应用的壳，而状态以及状态的驱动才是应用的魂
  - 一旦进入中心化状态管理器，那么就遇到内存持久不能释放，还要解决数据重置等问题。（不一定是共享状态，共享一个函数，共享一个模块，共享一个类的实例，都会遇到）
  - 简单是对使用者说的，而扩展性则是对开发者说的。通过扩展性，简单工具可以变成功能强大的功能，扩展性设计是考验能力的，并非每个开发者都能做到，但是，这是基本面。


- 性能的改变
- 效率的改变
- 编程范式
  - 直接对DOM节点操作
  - 单向数据流

```js
onNodeExpand(evt) {
    const id = evt.target.id;
    // 改变 model 状态
    this.treeModel.setNodeModelVisible(id); // 同步子节点的 visible 状态

    // 直接改变 dom 的展开、收缩
    // 找到当前节点 dom的父亲的兄弟元素，进行显示处理，这里不得不使用 attribute 作为状态的管理。这样后续维护困难，没有用上 model 的状态管理 view 的更新
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
    // TODO 后续看看是否需要通过 model 改变来更新视图。
  }
```

jquery 中只针对 DOM 的事件系统，而 backbone 可以脱离DOM，对数据变化进行监听。

- jquery
- backbone
- 事件派发与更新

## 分布式系统

## MVC

- Model（除了数据，里面也有 controller，用于控制数据变化的业务逻辑。）
- View（渲染视图的逻辑，数据依赖于 Model）
- Controller（用于控制视图变化的交互逻辑）

通常 controller 通常分为两部分，很少把 controller 单独抽离出来的。
- 一部分是位于 Model 里
- 一部分位于 view 里
像一个业务 vue 组件，操作业务数据与视图交互的逻辑明显是混合在一起了。

- model 改变，触发 view 里的 controller 进行视图更新。
- view 交互，触发 model 里的 controller 进行数据改变。
- view 的显示依赖于 model。

### 事件系统

### virtual dom

## 参考资料

- 前端架构 101系列
  - [前端架构 101（一）：在谈论它们之前我们需要达成的共识](https://zhuanlan.zhihu.com/p/145441907)
  - [前端架构 101（三）：MVC 启示录：模块的职责，作用域和通信](https://zhuanlan.zhihu.com/p/145443596)
- 《前端框架设计》
- 状态管理
  - [前端状态管理](https://cdc.tencent.com/2020/05/22/frontend-state-management-research/) 挺有深度的文章，值得精读。
  - [浅谈前端状态管理（上）](https://zhuanlan.zhihu.com/p/25800767)
  - [浅谈前端状态管理（下）](https://zhuanlan.zhihu.com/p/25908872)
  - [vue 状态管理的一点思考](https://zhuanlan.zhihu.com/p/29237682)
- [Trie 树与不可变数据结构](https://zhuanlan.zhihu.com/p/63207283)