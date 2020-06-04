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
- 
## 参考

- [实现领域驱动设计](https://book.douban.com/subject/25844633/)
- [IDDD_Samples](https://github.com/VaughnVernon/IDDD_Samples)