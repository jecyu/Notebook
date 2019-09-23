# vue

## 插槽

> 插槽，也就是 slot，是组件的一块 HTML 模版，这块模版显示不显示、以及怎样显示由父组件来决定。一个 slot 的核心两个问题是：显示不显示和怎样显示。

由于插槽是一块模板，所以，对于任何一个组件，从模板种类的角度来分，其实都可以分为非插槽模板和插槽模板两大类。
非插槽模板指的是html模板，比如‘div、span、ul、table’这些，非插槽模板的显示与隐藏以及怎样显示由组件自身控制；插槽模板是slot，它是一个空壳子，因为它的显示与隐藏以及最后用什么样的html模板显示由父组件控制。**但是插槽显示的位置却由子组件自身决定，slot写在组件template的什么位置，父组件传过来的模板将来就显示在什么位置**

### 单个插槽 | 默认插槽 | 匿名插槽

单个插槽可以放置在组件的任意位置，但是就像它的名字一样，一个组件中只能有一个该类插槽。相对应的，具名插槽就可以有很多个，只要名字（name属性）不同就可以了。

```js
// child
export default {
  name: "Child",
  render() {
    return (
      <div class="child">
        <h3>这里是子组件</h3>
        {/* <slot /> */}
        {this.$slots.default}
      </div>
    );
  }
};

// template 写法
//   <template>
//   <div class='wrapper'>
//     <span>I am a component</span>
//     <slot></slot>
//     <slot name='namedSlot'></slot>
//   </div>
// </template>

// // main.vue
// <template>
//   <wrapper>
//     <div>
//       I am the slot
//     </div>

//     <div slot='namedSlot'>I am the named slot</div>
//   </wrapper>
// </template>
```

```js
// parent
<template>
  <div class="default-wrapper">
    <h1>Vue 单个插槽</h1>
    <Child1>
      <div class="tmpl">
        <span>菜单1</span>
        <span>菜单2</span>
        <span>菜单3</span>
        <span>菜单4</span>
      </div>
    </Child1>
  </div>
</template>
```

### 具名插槽

匿名插槽没有name属性，所以是匿名插槽，那么，插槽加了name属性，就变成了具名插槽。具名插槽可以在一个组件中出现N次，出现在不同的位置。

```js
export default {
  name: "Child",
  render() {
    return (
      <div class="child">
        <h3>这里是子组件</h3>
        {/* <slot /> */}
        {/* 具名插槽 */}
        {this.$slots.up}
      </div>
    );
  }
};
```

```js
// parent 
<template>
  <div class="named-wrapper">
    <h1>Vue 具名插槽</h1>
    <Child2>
      <div class="tmpl" slot="up">
        <span>菜单1</span>
        <span>菜单2</span>
        <span>菜单3</span>
        <span>菜单4</span>
      </div>
    </Child2>
  </div>
</template>
```

### 作用域插槽

作用域插槽跟单个插槽和具名插槽的区别，因为单个插槽和具名插槽不绑定数据，而作用域插槽，父组件只需要提供一套样式（在确实用作用域插槽绑定的数据的前提下），数据使用的都是子组件插槽自己绑定的s数据，在slot上面绑定数据。

```js
export default {
  name: "Child",
  data() {
    return {
      list: ["js", "java", "c++"]
    }
  },
  render() {
    return (
      <div class="child">
        <h3>这里是子组件</h3>
        {/* <slot /> */}
        {/* 具名插槽 */}
        {this.$scopedSlots.up({
          data: this.list
        })}
      </div>
    );
  }
};

// Template 写法
// Child.vue
//   <template>
//   <div class='wrapper'>
//     <span>I am a component</span>
//     <slot :data='data'></slot>
//   </div>
// </template>

// // main.vue
// <template>
//   <wrapper>
//     <div slot-scope='{ data }'>
//     </div>
//   </wrapper>
// </template>
```

```js
// parent 
<template>
  <div class="slot-scoped">
    <h1>Vue 作用域插槽 | 带数据的插槽</h1>
    <Child3>
      <div class="tmpl" slot="up" slot-scope="user">
        {{ user.data }}
      </div>
    </Child3>
  </div>
</template>
```

- [深入理解vue中的slot与slot-scope](https://juejin.im/post/5a69ece0f265da3e5a5777ed#heading-2)

## vue 组件重置状态（强制刷新）

### 父子组件，可以访问组件的情况下

- 子组件对外提供重置方法或Prop
- V-if 强制刷新
- key 强制刷新（`key: this.id = +new Date()`）

通过 key,v-if 整体刷新用户体验不太友好。

### 跨级组件

如实现互斥关系（eventBus 太多也乱）

## nextTick 事件队列

### 前置知识

### CPU 

### 进程

### 线程

### 浏览器时多进程

### 浏览器包含了哪些进程？

### 浏览器内核（渲染进程）

### 从 Event Loop 看 JS 的运行机制

查看已选功能

```js
  // 当前选中的专题
selectedIndustryApplication: {
  handler(val) {
    if (val) {
      this.$set(this.disabledCondition, "disabled", true);
      this.$nextTick(() => { // 第一次事件队列，defaultOption.indicators 拿到值
        this.$nextTick(() => {
          if (this.indicators.length > 0) {
            this.isViewChecked = true; // 查看已选 // 需要等待 tree 指标勾选完毕
          }
        });
      });
    } else {
      this.$set(this.disabledCondition, "disabled", false);
      // this.isViewChecked = false;
    }
```

## 存储路由参数，解决存储 params 的刷新丢失问题

```js
// 存储路由参数数据
localStorage.save(PRODUCTROUTERPARAMS, {
  resultCatalog
});
```

## 自定义指令

## Vue.js 组件

## Vue 实例初始化

- 如果 `props` 依赖的值是异步传递的，那么这个时候在 `created()` 里能否拿到这个值?
- 业务组件与基础组件的 `props` 区别

## vue-router

### vue 路由 按需 keep-alive

- https://juejin.im/post/5cdcbae9e51d454759351d84#heading-4

### 获取路由文件

获取配置的路由
```js
vm.$router.options.routes
```

### query 与 params 的区别与使用

### 记录用户的历史页面

系统有个功能，就是如果获取用户权限表失败的时候，会跳回到登录页，跳回之前会把用户要进入的路由记录到 cookie，然后下次登录重定向到此路由页面，xxx 有几个页面是携带路由参数的，我们发现修复之前 cookie 上记录的是没带参数的，所以重定向渲染页面就会报错，解决方法就是要把参数写入到 cookie 里，本来打算去把路由的 query 对象格式化存到 cookie 里，后来看了下文档，发现有个`fullPath`值可以解决
这样就不用写对象格式化参数的逻辑或者用`qs`库，vue-router 确实很贴心了。

## 双向绑定

- v-model
  父可以改变子（数据）， 但子不能直接改变父（数据）！， 父中数据的变动只能由它自己决定
- 对象（选择下拉树），但是改变不够直观。
- `.sync` (props + emit: update)，直观明了，注意的是如果传递对象的话，子组件不要直接引用`prop`，要做好深拷贝。
  与 v-model 的区别就是父子组件的地位是平等的。 父可以改变子（数据）， 子也可以改变父（数据）。

```js
/// parent.vue
<DropStatusList :currentSelectedTask.sync="currentSelectedTask"></DropStatusList>

// child.vue
props: {
  currentSelectedTask: {
    type: Object,
    default: () => {}
  }
},
// 下拉点击事件
handleClick(name) {
  const item = this.listData.find(v => v.label === name);
  this.$emit("update:currentSelectedTask", item);
},
```

## watch 高级应用

### 避免性能开销，只监听对象里指定的属性

```js
// 只要筛选里的请求参数变化，就重新查询，不用手动点击查询
  "queryParams.queryMap": {
    handler(v) {
      this.queryResult = {};
      if (v.indicator && v.indicator.length > 0) {
        this.query(this.queryParams);
      }
    },
    deep: true
  }
```

### 利用 immediate 的场景

#### 场景一

？？？

因为：Props -》 Methods -》 Data -》Computed -》
所以在初始化组件还没添加进去时，此时 watch 是否就需要处理

父组件初始化 `queryResult` 都为空，然后异步赋值给子组件。子组件会`watch`

区别是组件的 vif 是否使用 props 的数据

这里用 v-if，从头到尾就是 queryResult 处理后的数据，所以需要 `immediate` 才能调用数据

```js
<PreviewTable v-if="Object.keys(queryResult).length > 0" :queryParams="queryParam" :resultData="queryResult"></PreviewTable>
```

这里没有使用 vif，

```js
<div class="result">
  <Spin v-if="isShowLoading" fix></Spin>
  <ResultReview :resultData="queryResult"></ResultReview>
</div>
```

#### 场景二

从其他组件，路由直接跳转过来的数据、视图更新。

```js
watch: {
  defaultIndexDataCondition: {
    handler(v) {
      if (v && Object.keys(v).length > 0) {
        this.viewHistory(v);
      }
    },
    deep: true
    // immdiate 代替了 create 的更新，vue 源码怎么说，生命周期
  },
}
async created() {
    const data = await this.getIndicatorSystem();
    this.indexSystems = data.map(item => {
      const obj = {};
      obj.value = item.id;
      obj.label = item.name;
      Object.assign(obj, item);
      return obj;
    });
    // 过滤默认值
    if (Object.keys(this.defaultIndexDataCondition).length > 0) {
      this.viewHistory(this.defaultIndexDataCondition);
    }
  },
```

## 组件通信方式

- props/\$emit
- $children/$parent
- provide/inject
- ref
- eventBus
- Vuex
- localStorage/seeionStorage
- $attrs与$listeners

### eventBus

#### 适用

小数据量的传输，缺点：eventBus 太多也乱。

#### 初始化

#### 发送事件

```js
EventBus.$emit("setFeatureLegend", {
    num:this.num,
    deg:this.deg
});
```

#### 接收事件

```js
  beforeMount() {
    this.eventBus.$on("setFeatureLegend", this.setFeatureLegend);
  },
  beforeDestroy() {
    this.eventBus.$off("setFeatureLegend", this.setFeatureLegend);
  },
```

#### provide/inject

```js
// 把 map、mapView 注入到子组件中
provide() {
  return {
    map: this.map,
    mapView: this.mapView,
    eventBus: this.eventBus,
    shadowMapView: this.shadowMapView,
    curSubSystemName: ""
  };
},
```

### $attrs与$listeners

## 进一步阅读

- [vue 中 8 种组件通信方式, 值得收藏!](https://juejin.im/post/5d267dcdf265da1b957081a3)
- [Vue.js 组件编码规范](https://github.com/pablohpsilva/vuejs-component-style-guide/blob/master/README-CN.md)
- [前端组件设计原则](https://juejin.im/post/5c49cff56fb9a049bd42a90f#heading-4)
- [https://juejin.im/post/5bb355dae51d450ea4020b42](https://juejin.im/post/5bb355dae51d450ea4020b42)
- [从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)
