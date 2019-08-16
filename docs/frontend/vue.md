# vue

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

> 参考资料：https://juejin.im/post/5d267dcdf265da1b957081a3