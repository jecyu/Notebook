# 系统架构

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

### 同步

同步不仅仅是同步的`读取`数据，还包括`回写`。假设一份数据被三个视图所用，如果其他一个视图对数据发生了修改，那么修改应该也同时反馈到另外两个视图上。

关于数据我们应该存一份，还是存在 N 个视图中都保存一份副本（Vue 则是每个视图都有一份副本）

### 多个消费者

数据的消费放不一定是视图，还有可能是 selector。它不一定被展示，还有可能被用于计算。

### MVC 带来的问题

## 参考

- [实现领域驱动设计](https://book.douban.com/subject/25844633/)
- [IDDD_Samples](https://github.com/VaughnVernon/IDDD_Samples)