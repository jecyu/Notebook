# 剖析 iview-\$message 的实现过程

头脑风暴

- 编写插件与编写 vue 组件的使用区别
  - Vue.use('xxxx')

无论是看想注册全局组件，还是给 Vue 添加全局方法或实例属性，最后消费者都是 `Vue.use()` 这个方法，然后在提供者里添加 `install()` 供消费者使用。只不过是 install 方法里的逻辑不太一样而已。看使用场景。

install 方法里使用 Vue.component

```js
import Vuetable from "./components/Vuetable.vue";
import VuetablePagination from "./components/VuetablePagination.vue";
import VuetablePaginationDropDown from "./components/VuetablePaginationDropdown.vue";
import VuetablePaginationInfo from "./components/VuetablePaginationInfo.vue";
import VuetablePaginationMixin from "./components/VuetablePaginationMixin.vue";
import VuetablePaginationInfoMixin from "./components/VuetablePaginationInfoMixin.vue";
import Promise from "promise-polyfill";

if (!window.Promise) {
  window.Promise = Promise;
}

function install(Vue) {
  Vue.component("vuetable", Vuetable);
  Vue.component("vuetable-pagination", VuetablePagination);
  Vue.component("vuetable-pagination-dropdown", VuetablePaginationDropDown);
  Vue.component("vuetable-pagination-info", VuetablePaginationInfo);
}
export {
  Vuetable,
  VuetablePagination,
  VuetablePaginationDropDown,
  VuetablePaginationInfo,
  VuetablePaginationMixin,
  VuetablePaginationInfoMixin,
  install,
};

export default Vuetable;
```

使用， `<vue-xxx-plugin></vue-xxx-plugin>`

install 方法里给 Vue prototype 添加实例属性，`Vue.toast = Vue.prototype.$toast = toast`

```js
import Vue from 'vue'
import EasyToastVue from './EasyToast'

export default {
  install(Vue, defaultOptions = {}) {
    const CONSTRUCTOR = Vue.extend(EasyToastVue)
    const CACHE = {}
    Object.assign(EasyToastVue.DEFAULT_OPT, defaultOptions)

    function toast(msg, options = {}) {
      options.message = msg
      let toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR)
      if (!toast.$el) {
        let vm = toast.$mount()
        document.querySelector(options.parent || 'body').appendChild(vm.$el)
      }
      toast.queue.push(options)
    }
    Vue.toast = Vue.prototype.$toast = toast
  }
}
```

使用 this.$xxxx

我们可以将一些开发环境中经常需要使用到的函数，总结为一个单独的插件，之后在使用中只需要简单的调用即可，不需要引入多余的文件或者包；如时间格式的函数 dateformat, 挂载到 Vue 的 prototype 中,之后持续需要 this.dateformate(new Date, 'yyyy-mm-dd')这种调用形式即可。这就是面向对象的代码复用了。要注意命名冲突问题。iview 中很多 $xxx 组件都可以这样处理。

作者：\_zysndy
链接：https://juejin.im/post/6844903586845966350
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 参考资料

- [awesome-vue](awesome-vue) 集合了大量由社区贡献的插件和库。
- [如何写一个 Vue 的插件](https://juejin.im/post/6844903586845966350)
- [Vuejs 开发插件](https://cn.vuejs.org/v2/guide/plugins.html#ad)
