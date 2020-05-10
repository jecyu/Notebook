# 二次封装 iview Tree 实现搜索树踩坑总结

## 旧版本实现

主目录：
- checkTree.vue
- tree.vue 
- 状态乱。

### 暴露出来的 bug

## 重写版本

主目录：

以及编码前先要考虑好每个对象组件的动作集合，影响的关系。像分析游戏一样。

分析在一次交互中各个对象的动作、依赖关系。游戏是分析每一帧。不要觉得这一步浪费时间，理清所有的关系。

**知识点：**
- 深拷贝
- 引用类型
- 函数副作用
- 二次封装属性事件（v-bind、v-listener 的覆盖、重复、例如封装里也要使用等）
- 代码竞态条件（同时 watch 多个属性，执行的顺序要求有先后次序）

针对上面的问题：看看一些优秀的开源项目（小型项目、大型项目）是如何解决的。


先分析好思路，状态，考虑全面再编写

避免封装时使用相同 emit

字典记录状态，有时候仅仅靠着 iview tree 本身的触发事件，获得的 selected 值是不够准确的。

## 函数副作用

如果真的产生了函数之外的

如果需要产生副作用的，则最好通过函数传参的形式进行处理。这样后续也明确修改状态。

## 是否要深拷贝

有些东西不需要深拷贝，例如进度条的显示状态，跟上传的请求是挂钩的

## 记录状态

```js

  // 创建{id: _showChildren}字典对象, 记录当前目录展开闭合状态
  private treeDic(tree: any[]): void {
    tree.forEach((value, item) => {
      this.showChildrenStatusDic[value.id] = Boolean(value._showChildren);
      if (value.children && value.children.length) {
        this.treeDic(value.children);
      }
    });
  }

```

左耳听风-函数式编程。

## 参考资料
