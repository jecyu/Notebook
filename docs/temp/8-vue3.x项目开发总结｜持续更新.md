# vue3.x 项目开发总结（持续更新）

## 基础

### 响应式 API

#### ref，reactive，toRef，toRefs 的区别使用

1. ref  对我们的值创建了一个**响应式引用**

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

2. reactive

3. toRefs

   > 官方：因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性。

   为了方便我们对它进行包装，`toRefs` 可以理解成批量包装 props 对象，如：

   ```js
   const { name } = toRefs(props);
   const handleClick = () => {
     // 因为是包装对象，所以读取的时候要用.value
     console.log('name :>> ', name.value);
   };
   复制代码
   ```

   **可以理解这一切都是因为我们要用解构，`toRefs` 所采取的解决方案。**

4. toRef

### composition API

我们从 `setup` 返回的所有内容都将暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板

props 的属性，不需要在 `setup` 中进行返回。

- TS 支持
- 复杂组件逻辑进行分离
- 组件间逻辑分享

#### 生命周期钩子注册内部 `setup`

```js
// in our component
setup (props) {
  const repositories = ref([])
  // methods
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  onMounted(getUserRepositories) // on `mounted` call `getUserRepositories`

  return {
    repositories,
    getUserRepositories
  }
}
```

#### Watch 响应式更改

```js
import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('The new counter value is: ' + counter.value)
})
```

Vue3.0升级_老版本项目升级改造指南

变化大吗？

- 90% 以上代码可与 vue2.0 复用
- Composition API 作为新增 API 不会影响旧的逻辑代码
- Mixin 不再推荐（需要改造）

我不会 TS，我好慌

TS 可选

Vite

考虑未来会不会有这个使用场景。

import API

## 参考资料

- [vue 3官方文档]( https://vue3js.cn/docs/zh/guide/migration/introduction.html#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)
- [https://github.com/blacksonic/awesome-vue-3](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A7%88)
- [Vue3丨从 5 个维度来讲 Vue3 变化](https://juejin.cn/post/6910009240053055496#heading-0)
- [【第2072期】 或许这就是下一代组件库](https://mp.weixin.qq.com/s/hwzxIvE8OFkSaWvRL5M59A)
- [基于Vue3.0开发知乎日报实战](https://juejin.im/post/6854573216459915277#heading-7)
- [Vue3.0 && Vue3.0初体验 一](https://juejin.im/post/6847902215458258958)
- [Vue 3.0 来了，我们该做些什么？](https://juejin.im/post/6874604408030789640?utm_source=gold_browser_extension#comment)
- 视频
  - [Vue3.0 + Vite开发快速入门（2）：经典案例实战入门ToDoList项目](https://www.bilibili.com/video/BV1Ph411R7gg?t=1040)
  - [前端新工具vite，快速上手vue 3.0+ vite开发](https://www.bilibili.com/video/BV1LC4y1h7BF/?spm_id_from=333.788.videocard.3)
  - [https://github.com/vitejs/vite](https://github.com/vitejs/vite) 把 readme 看完。