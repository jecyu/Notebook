# vue

## vue-router 记录用户的历史页面

系统有个功能，就是如果获取用户权限表失败的时候，会跳回到登录页，跳回之前会把用户要进入的路由记录到cookie，然后下次登录重定向到此路由页面，xxx有几个页面是携带路由参数的，我们发现修复之前cookie上记录的是没带参数的，所以重定向渲染页面就会报错，解决方法就是要把参数写入到cookie里，本来打算去把路由的query对象格式化存到cookie里，后来看了下文档，发现有个`fullPath`值可以解决
这样就不用写对象格式化参数的逻辑或者用`qs`库，vue-router确实很贴心了。

## watch 高级应用

避免性能开销，只监听对象里指定的属性
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

## 组件通信方式

- props/$emit
- $children/$parent
- provide/inject
- ref
- eventBus
- Vuex
- localStorage/seeionStorage
- $attrs与$listeners

### eventBus


> 参考资料：https://juejin.im/post/5d267dcdf265da1b957081a3