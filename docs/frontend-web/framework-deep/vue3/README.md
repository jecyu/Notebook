Vue 3 使用

看文档 → 学习新语法 → 做小 demo → 做几个实战项目 → 看源码 → 整理心得并分享

对于小 demo，可以使用在 codepen 沙箱进行练习，https://codesandbox.io/s/small-grass-1ju25?file=/src/App.vue。其他的技术使用同理，比如 React、Angular

## 组合式 API

子组件如何接收父组件的传值及注意事项、子组件如何触发父组件的方法

### setup  简介

什么叫组合 API（Composition API）

而 Vue 3.0 新增的 setup 方法，也是以选项的形式出现在抛出的对象中，但是诸如上述代码中的 watch、computed 等属性，都变成 hook 函数的形式，通过 vue 解构出来，在 setup 方法中使用

```js
// Composition API
import { watch, computed } from 'vue'
export default {
  name: 'App',
  setup() {
    watch(() => {
      // do something
    }, () => {
      // do something
    })
    const a = computed(() => {
      // do something
    })
  }
}
```


setup 存在的意义，就是为了让你能够使用新增的组合 API。并且这些组合 API 只能在 setup 函数内使用

setup 调用的时机是创建组件实例，然后初始化 props，紧接着就是调用 setup 函数。从生命周期钩子的角度来看，它会在 beforeCreate 钩子之前被调用，所以 setup 内是拿不到 this 上下文

### template 模版中使用 setup

```html
<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    const count = ref(0);
    const object = reactive({ foo: "bar" });

    setTimeout(() => {
      // 通过 ref 包裹的变量，需要通过 .value 的形式修改变量，在模板中使用无需使用 .value ，因为在 setup 内 return 的时候，已经帮你解开。
      count.value = 1;
      object.foo = "foo";
    }, 2000);

    // 暴露给模版
    return {
      count,
      object,
    };
  },
};
</script>
```

### h 渲染函数中使用 setup

setup 也可以返回一个函数，函数中也能使用当前 setup 函数作用域中的响应式数据

```html
<script>
import { ref, reactive, h } from "vue";
export default {
  setup() {
    const count = ref(1);
    const object = reactive({ foo: "bar" });

    return () => h("h1", [count.value, object.foo])
  },
};
</script>
```

### Setup 如何接受参数

setup 函数接收两个参数，第一个是 props 对象，第二个是 context 上下文

#### props 对象

src/App.vue

```html
<template>
  <Test :count="count"></Test>
</template>

<script>
import { ref } from "vue";
import Test from "./components/Test.vue";
export default {
  components: {
    Test,
  },
  setup() {
    const count = ref(0);
    setTimeout(() => {
      count.value = 1;
    }, 2000);
    return {
      count,
    };
  },
};
</script>
```

src/components/Test.vue

```html
<template>
  <div>{{ count }}</div>
</template>
<script>
import { watchEffect } from "vue";
export default {
  name: "Test",
  props: {
    count: Number,
  },
  setup(props) {
    // console.log("props", props);
    watchEffect(() => {
      console.log("props.count = ", props.count);
    });
  },
};
</script>
```

注意 props 不要进行解构，如 setup(...props)，这样会让 props 失去响应式。

#### context 上下文

ctx（context）参数提供了一个上下文对象，从原来的 Vue 2.0 中的 this 选择性的暴露一些属性。
ctx 为我们提供了三个属性，分别是：
* attrs
* slots
* emit
attrs 为我们提供了最新传入的数据，有人会问这里为什么不把 props 和 attrs 合并呢，官方文档是这样解释的。
出于一些原因将 props 作为第一个参数，而不是包含在上下文中：
* 组件使用 props 的场景更多，有时候甚至只使用 props
* 将 props 独立出来作为第一个参数，可以让 TypeScript 对 props 单独做类型推导，不会和上下文中的其他属性相混淆。这也使得 setup、render 和其他使用了 TSX 的函数式组件的签名保持一致。
这里也有一个注意点，在使用 attrs 时候，相同的变量不能在 options 中声明 props ，否则 attrs 取不到变量

```html
<!-- App.vue -->
<template>
  <Test :count="count" @add="add"></Test>
</template>

<script>
import { ref } from "vue";
import Test from "./components/Test.vue";
export default {
  components: {
    Test,
  },
  setup(props, cxt) {
    const count = ref(0);
    const add = (num) => (count.value += num);
    return {
      count,
      add
    };
  },
};
</script>
```

子 vue，子组件接收的方法，需要通过 emits 在 options 中注册，否则会报警告。通过上下文 ctx.emit 触发传进来的方法以及返回相应的回调参数，结果如下所示
```html
<template>
  <div>{{ attrs.count }}</div>
  <button @click="add">++++</button>
</template>
<script>
import { watchEffect } from "vue";
export default {
  name: "Test",
  props: {
    // count: Number,
    add: Function
  },
  emits: ["add"], 
  setup(props, ctx) {
    const add = () => {
      ctx.emit('add' ,50)
    }
    return {
      add,
      attrs: ctx.attrs
    };
  },
};
</script>
```
## 响应式系统 API

### reactive

```html
const state = reactive({
      title: '十三'
    })

reactive 是 Vue 3.0 中提供的实现响应式数据的方法。在 Vue 2.0 中实现响应式数据是通过 Object 的 defineProPerty 属性来实现的，而在 Vue 3.0 中的响应式是通过 ES2015 的 Proxy 来实现。

reactive 参数必须是对象
reactive 方法接受一个对象（json 或 Array）

reactive 返回的代理后的对象，内部的二级三级属性，都会被赋予响应式的能力，所以官方建议，使用 reactive 返回的值，而不要去使用原始值
```

### ref

ref 和 reactive 一样，同样是实现响应式数据的方法。在业务开发中，我们可以使用它来定义一些简单数据，

修改数据，可以通过 count.value = 1 类似这样的语法去修改。但是为什么它需要这样去修改变量，而 reactive 返回的对象可以直接修改如 state.count = 1 。
原因是 Vue 3.0 内部将 ref 悄悄的转化为 reactive，如上述代码会被这样转换：
ref(0) => reactive({ value: 0 })

所以 count 相当于 reactive 返回的一个值，根据 reactive 修改值的方式，就可以理解为什么 ref 返回的值是通过 .value 的形式修改值了。
还有一点需要注意，当 ref 作为渲染上下文的属性返回（即在 setup() 返回的对象中）并在模板中使用时，它会自动解套，无需在模板内额外书写 .value。之所以会自动解套，是因为 template 模板在被解析的时候，Vue 3.0 内部通过判断模板内的变量是否是 ref 类型。如果是，那就加上 .value，如果不是则为 reactive 创建的响应集代理数据。

￼
没错，就是通过上图 __v_isRef 变量去判断，模板内的变量是否为 ref 类型。判断类型也可以通过 isRef 方法

在 Vue 2.0 中，我们可以通过给元素添加 ref="xxx" 属性，然后在逻辑代码中通过 this.$refs.xxx 获取到对应的元素。
到了 Vue 3.0 后，setup 函数内没有 this 上下文，因此我们可以通过 ref 方法去获取，并且还需要在页面挂载以后才能拿到元素。

```html
<template>
  <div ref='shisanRef'>十三</div>
</template>
<script>
import { ref, onMounted } from 'vue'
export default{
  setup() {
    const shisanRef = ref(null)
    onMounted(() => {
      console.log(shisanRef.value)
    })
    return {
      shisanRef
    }
  }
}
</script>
```

### computed

Vue 2.0 时代，computed 作为选项出现在页面中，而到了 Vue 3.0 时代，它将会以钩子函数的形式出现

```html
<template>
  <p>{{ text }}</p>
</template>

<script>
import { reactive, computed } from 'vue'
export default {
  name: 'App',
  setup() {
    const state = reactive({
      name: '十三',
      desc: '你好'
    })
    
    const text = computed(() => {
      console.log('11')
      return state.name + state.desc
    })

    setTimeout(() => {
      state.name = '十六'
    }, 2000)
    
    return {
      text
    }
  }
}
</script>
```

### readonly

readonly 顾名思义，用于创建一个只读的数据，并且所有的内容都是只读，不可修改

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // works for reactivity tracking
  console.log(copy.count)
})

// mutating original will trigger watchers relying on the copy
original.count++

// mutating the copy will fail and result in a warning
copy.count++ // warning!
1
```
### watchEffect

首先 watchEffect 会追踪响应式数据的变化，并且还会在第一次渲染的时候立即执行

```html
<template>
  <div>
    <h1>{{ state.search }}</h1>
    <button @click="handleSearch">改变查询字段</button>
  </div>

</template>

<script>
import { reactive, watchEffect } from 'vue'

export default {
  setup() {
    let state = reactive({
      search: Date.now()
    })
    watchEffect(() => {
      console.log(`监听查询字段${state.search}`)
    })

    const handleSearch = () => {
      state.search = Date.now()
    }
    return {
      state,
      handleSearch
    }
  }
}
</script>
```

watchEffect 函数返回一个新的函数，我们可以通过执行这个函数或者当组件被卸载的时候，来停止监听行为。

watchEffect 的回调方法内有一个很重要的方法，用于清除副作用。它接受的回调函数也接受一个函数 onInvalidate。名字不重要，重要的是它将会在 watchEffect 监听的变量改变之前被调用一次


那么要它何用呢？用处非常大。举个例子，我们需要监听 search 的变化，去请求接口数据，此时接口是异步返回的，每当我改变 search 都会去请求一次接口，那么有可能 search 改变的很频繁，那就会频繁的去请求接口，导致服务端压力倍增。我们可以通过这个特性去降低服务端的压力，具体逻辑如下：

```html
<template>
  <h1>{{ state.search }}</h1>
  <button @click="handleSearch">改变查询字段</button>
</template>

<script>
import { reactive, watchEffect } from "vue";
export default {
  name: "App",
  components: {},
  setup() {
    let timer = null;
    let state = reactive({
      search: Date.now(),
    });
    watchEffect((onInvalidate) => {
      console.log(`监听查询字段 ${state.search}`);
      timer = setTimeout(() => {
        console.log("模拟接口异步请求，3 秒之后返回详情信息");
      }, 3000);
      onInvalidate(() => {
        console.log("清除");
        clearInterval(timer);
      });
    });
    const handleSearch = () => {
      state.search = Date.now();
    };
    return {
      state,
      handleSearch,
    };
  },
};
</script>
```

在 watchEffect 回调函数内，我用 setTimeout 的形式去模拟响应时间为 3 秒的异步请求，上面代码可以理解为 3 秒之内如果你不去改变 search 变量，那么页面就成功返回接口数据，如果在 3 秒之内你再次点击按钮改变了 search 变量，onInvalidate 将会被触发，从而清理掉上一次的接口请求，然后根据新的 search 变量去执行新的请求
### watch

watch 的功能和之前的 Vue 2.0 的 watch 是一样的。和 watchEffect 相比较，区别在 watch 必须制定一个特定的变量，并且不会默认执行回调函数，而是等到监听的变量改变了，才会执行。并且你可以拿到改变前和改变后的值

```html
<template>
  <div>
    <h1>{{ state.search }}</h1>
    <button @click="handleSearch">改变查询字段</button>
  </div>

</template>

<script>
import { reactive, watch } from 'vue'

export default {
  setup() {
    let timer = null
    let state = reactive({
      search: Date.now()
    })
    watch(() => {
      return state.search
    }, (nextData, preData) => {
      console.log('preData', preData)
      console.log('nextData', nextData)
    })

    const handleSearch = () => {
      state.search = Date.now()
    }
    return {
      state,
      handleSearch
    }
  }
}
</script>
```

## 生命周期钩子函数、提供/注入（provide/inject）

### Vue 3.0 生命周期解读

生命周期钩子函数，Vue 2.0 对应 Vue 3.0 的写法如下：
* beforeCreate -> setup。
* created -> setup。
* beforeMount -> onBeforeMount。
* mounted -> onMounted。
* beforeUpdate -> onBeforeUpdate。
* updated -> onUpdated。
* beforeDestroy -> onBeforeUnmount。
* destroyed -> onUnmounted。
* errorCaptured -> onErrorCaptured。

我们来看看在 Vue 3.0 中生命周期运行顺序和使用情况，通过 Vite 新建文件，修改 App.vue 文件：

```html
<!--App.vue-->
<template>
  <div>
    <h1>生命周期{{ state.count }}</h1>
    <div v-if="state.show">
      <Test />
    </div>
  </div>

</template>

<script>
import Test from './components/Test.vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured, reactive } from 'vue'

export default {
  components: {
    Test
  },
  setup() {
    const state = reactive({
      count: 0,
      show: true
    })
    setTimeout(() => {
      state.count = 2
      state.show = false
    }, 2000)

    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    
    onMounted(() => {
      console.log('onMounted')
    })

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })

    onUpdated(() => {
      console.log('onUpdated')
    })

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })

    onUnmounted(() => {
      console.log('onUnmounted')
    })

    onErrorCaptured(() => {
      console.log('onErrorCaptured')
    })

    return {
      state
    }
  }
}
</script>
```

```html
<!--src/components/Test.vue-->
<template>
  <div>我是子组件</div>
</template>

<script>
import { onBeforeUnmount, onUnmounted } from 'vue'
export default {
  name: 'Test',
  setup() {
    onBeforeUnmount(() => {
      console.log('子组件-onBeforeUnmount')
    })

    onUnmounted(() => {
      console.log('子组件-onUnmounted')
    })
  }
}
</script>
```

首先是页面渲染前执行 onBeforeMount，紧接着是 onMounted。当组件有变量更新导致页面变化的时候，先执行 onBeforeUpdate，但是没有马上执行 onUpdated，而是先执行了子组件的销毁生命周期钩子 onBeforeUnmount 和 onUnmounted，这是因为子组件在父组件中渲染，在页面变化没有完全结束前，是不会执行父组件的 onUpdated 生命周期钩子函数

我们请求数据还是写在 onMounted 钩子函数内，它支持 async await 写法，如下：
onMounted(async () => {
  const data = await serviceApi(params)
})
从这可以看出，写过 Vue 2.0 的同学，只要对照着生命周期，就能很轻松的将 Vue 2.0 的项目升级至 Vue 3.0。

### 提供/注入（provide/inject）
#### Vue 2.0 写法

```html
<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>

</template>

<script>
import Father from './components/Father.vue'

export default {
  components: {
    Father
  },
  provide: {  // 提供
    name: '陈尼克'
  }
}
</script>
```

在 src/components 文件夹新建两个文件 Father.vue 和 Son.vue 如下：

```html
<!--Father.vue-->
<template>
  <div>我是父亲</div>
  <Son />
</template>

<script>
import Son from './Son.vue'
export default {
  name: 'Father',
  components: {
    Son
  }
}
</script>
<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
</template>

<script>
export default {
  name: 'Son',
  inject: ['name']   // 注入
}
</script>
```

上述的写法 options API Vue3 也是兼容的。（后续可能慢慢就不兼容 optionAPI了，现在只是给予一个过渡升级）

#### Vue 3. 0 写法

之前说过 Vue 3.0 作出最大的改动就是将 options 的书写形式改成了 hooks 的钩子函数形式。privide/inject 也不例外，我们使用它们需要通过 vue 去解构出来，

```html
<!--App.vue-->
<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>

</template>

<script>
import { provide } from 'vue'
import Father from './components/Father.vue'

export default {
  components: {
    Father
  },
  setup() {
    provide('name', '陈尼克') // 单个声明形式
    provide('info', {
      work: '前端开发',
      age: '18'
    }) // 多个声明形式
  }
}
</script>
```

```html
<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
  <div>职业：{{ info.work }}</div>
  <div>年龄：{{ info.age }}</div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'Son',
  setup() {
    const name = inject('name', '嘻嘻') // 第二个参数为默认值，可选
    const info = inject('info')

    return {
      name,
      info
    }
  }
}
</script>
```

当我们需要修改传入的数据时，Vue 不建议我们直接在接收数据的页面修改数据源，用上述的例子就是不建议在 Son.vue 组件内去修改数据源，我们可以在 App.vue 组件内通过 provide 传递一个修改数据的方法给 Son.vue，通过在 Son.vue 内调用该方法去改变值。我们将代码做如下修改：

```html
<!--App.vue-->
<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>

</template>

<script>
import { provide, ref } from 'vue'
import Father from './components/Father.vue'

export default {
  components: {
    Father
  },
  setup() {
    const name = ref('陈尼克')
    provide('name', name) // 单个声明形式
    provide('info', {
      work: '前端开发',
      age: '18'
    }) // 多个声明形式

    const changeName = () => {
      name.value = '李尼克'
    }

    provide('changeName', changeName)
  }
}
</script>
```

```html
<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
  <div>职业：{{ info.work }}</div>
  <div>年龄：{{ info.age }}</div>
  <button @click="changeName">修改名字</button>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'Son',
  setup() {
    const name = inject('name', '嘻嘻') // 第二个参数为默认值，可选
    const info = inject('info')
    const changeName = inject('changeName')

    return {
      name,
      info,
      changeName
    }
  }
}
</script>
```

这里解释一下，在 Son.vue 组件中，你可以直接修改 inject 传进来的 name 值。但是你细想，数据源存在于 App.vue 中，你在 Son.vue 中私自修改了数据源传进来的值，那两边的值就会产生紊乱，上述业务逻辑属于简单的，当你在公司正式项目中这样做的时候，数据源就会变得杂乱无章，页面组件变得难以维护。综上所述，一定要控制好数据源，保持单一数据流。

## Vue 3.0 性能和业务层面上的提升

### 虚拟 DOM 性能优化

模板转化网站，官方展示。

#### PatchFlag（静态标记）

Vue 2.0 中的虚拟 DOM 是全量对比的模式，而到了 Vue 3.0 开始，新增了静态标记（PatchFlag）。在更新前的节点进行对比的时候，只会去对比带有静态标记的节点。并且 PatchFlag 枚举定义了十几种类型，用以更精确的定位需要对比节点的类型。下面我们通过图文实例分析这个对比的过程。假设我们有下面一段代码：
```html
<div>
  <p>老八食堂</p>
  <p>{{ message }}</p>
</div>
```

在 Vue 2.0 的全量对比模式下，如下图所示：
￼
通过上图，我们发现，Vue 2.0 的 diff 算法将每个标签都比较了一次，最后发现带有 {{ message }} 变量的标签是需要被更新的标签，显然这还有优化的空间。
在 Vue 3.0 中，对 diff 算法进行了优化，在创建虚拟 DOM 时，根据 DOM 内容是否会发生变化，而给予相对应类型的静态标记（PatchFlag），如下图所示：
￼
观察上图，不难发现视图的更新只对带有 flag 标记的标签进行了对比（diff），所以只进行了 1 次比较，而相同情况下，Vue 2.0 则进行了 3 次比较。这便是 Vue 3.0 比 Vue 2.0 性能好的第一个原因。
我们再通过把模板代码转译成虚拟 DOM，来验证我们上述的分析是否正确。我们可以打开模板转化网站，对上述代码进行转译：
￼
上图蓝色框内为转译后的虚拟 DOM 节点，第一个 p 标签为写死的静态文字，而第二个 p 标签则为绑定的变量，所以打上了 1 标签，代表的是 TEXT（文字），标记枚举类型如下：

```js
export const enum PatchFlags {
  
  TEXT = 1,// 动态的文本节点
  CLASS = 1 << 1,  // 2 动态的 class
  STYLE = 1 << 2,  // 4 动态的 style
  PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
  FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
  HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
  NEED_PATCH = 1 << 9,   // 512
  DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
  HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
  BAIL = -2 // 一个特殊的标志，指代差异算法
}
```

#### hoistStatic（静态提升）

我们平时在开发过程中写函数的时候，定义一些写死的变量时，都会将变量提升出去定义，如下所示：

```js
const PAGE_SIZE = 10
function getData () {
	$.get('/data', {
  	data: {
    	page: PAGE_SIZE
    },
    ...
  })
}
```

诸如上述代码，如果将 PAGE_SIZE = 10 写在 getData 方法内，每次调用 getData 都会重新定义一次变量。
Vue 3.0 在这方面也做了同样的优化，继续用我们上一个例子写的代码，观察编译之后的虚拟 DOM 结构，如下所示。
没有做静态提升前：
￼
选择 Option 下的 hoistStatic：
￼
静态提升后：
￼
细心的同学会发现， 老八食堂 被提到了 render 函数外，每次渲染的时候只要取 _hoisted_1 变量便可。认真看文章的同学又会发现一个细节， _hoisted_1 被打上了 PatchFlag ，静态标记值为 -1 ，特殊标志是负整数表示永远不会用作 diff。也就是说被打上 -1 标记的，将不在参与 diff 算法，这又提升了 Vue 的性能。

#### cacheHandler（事件监听缓存）

默认情况下 @click 事件被认为是动态变量，所以每次更新视图的时候都会追踪它的变化。但是正常情况下，我们的 @click 事件在视图渲染前和渲染后，都是同一个事件，基本上不需要去追踪它的变化，所以 Vue 3.0 对此作出了相应的优化叫 事件监听缓存，我们在上述代码中加一段：

```html
<div>
  <p @click="handleClick">屋里一giao</p>
</div>
```

编译后如下图所示（还未开启 cacheHandler）：
￼
在未开启 事件监听缓存 的情况下，我们看到这串代码编译后被静态标记为 8，之前讲解过被静态标记的标签就会被拉去做比较，而静态标记 8 对应的是“动态属性，不包括类名和样式”。 @click 被认为是动态属性，所以我们需要开启 Options 下的 cacheHandler 属性，如下图所示：
￼
细心的同学又会发现，开启 cacheHandler 之后，编译后的代码已经没有静态标记（PatchFlag），也就表明图中 p 标签不再被追踪比较变化，进而提升了 Vue 的性能。

#### SSR 服务端渲染

当你在开发中使用 SSR 开发时，Vue 3.0 会将静态标签直接转化为文本，相比 React 先将 jsx 转化为虚拟 DOM，再将虚拟 DOM 转化为 HTML，Vue 3.0 已经赢了。
#### StaticNode（静态节点）

上述 SSR 服务端渲染，会将静态标签直接转化为文本。在客户端渲染的时候，只要标签嵌套得足够多，编译时也会将其转化为 HTML 字符串，如下图所示：
￼
需要开启 Options 下的 hoistStatic

### Tree-shaking

说到 Tree-shaking 这个属于，官方的解释用大白话说就是，没有被应用到的代码，编译后自动将其剔除。
我个人是这么记住 Tree-shaking 的，翻译成中文就是 摇树，树上有枯叶和绿叶，我摇动树干，枯叶掉了，新叶留着。这里的枯叶就是指没用到的代码，新叶指被应用到的代码，这么记就完全可以技术这个技术点。
在 Vue 2.0 中，无论有没有用到全部的功能，这些功能的代码都会被打包到生产环境中。究其原因，主要还是怪 Vue 2.0 生成实例是单例，这样打包的时候就无法检测到实例中的各个方法是否被引用到。如下：

```js
import Vue from 'vue'

Vue.nextTick(() => {})
而 Vue 3.0 经过改良之后，引入了 Tree-shaking 的特性，所有的方法通过模块化导入的形式。如下：
import { nextTick, onMounted } from 'vue'

nextTick(() => {})
```

nextTick 方法会被打进生产包，而 onMounted 在代码里没有用到，最终不会出现在编译后的代码里。
Tree-shaking 做了两件事：
* 编译阶段利用 ES 的模块化判断有哪些模块已经加载。
* 判断哪些模块和变量，没有被使用或者引用到，从而删除对应的代码。
光看文字没有说服力，我们通过代码实例来演示一遍，通过 Vue CLI 启动一个 Vue 2.0 的项目，修改 App.vue 如下所示：

```html
<template>
  <div>{{ test }}</div>
</template>
<script>
  export default {
    data() {
      return {
        test: '十三'
      }
    }
  }
</script>
```

运行打包指令 npm run build，打完包后体积如下：
￼
我们再加一个 Option，如下所示：

```html
<template>
  <div>{{ test }}</div>
</template>
<script>
  export default {
    data() {
      return {
        test: '十三'
      }
    },
    computed: {
      testc: function () {
        return this.test + '测试'
      }
    }
  }
</script>
```

再次运行 npm run build，如下所示：
￼
业务代码从 2.04 -> 2.10，而工具包还是 89.66。由此可见，增减代码，并不会影响工具包的打包大小。
我们再来看看 Vue 3.0 的表现，通过 Vue CLI 启动一个 Vue 0.0 的项目，App.vue 作如下修改：

```html
<template>
  <div>{{ test }}</div>
</template>
<script>
import { reactive, toRefs } from 'vue'
  export default {
    setup() {
      const state = reactive({
        test: '十三'
      })

      return {
        ...toRefs(state)
      }
    }
  }
</script>
```

运行 npm run build，打包后，体积如下：
￼
我们加一个添加一个 computed 方法，如下所示：

```html
<template>
  <div>{{ test }}</div>
</template>
<script>
import { reactive, toRefs, computed } from 'vue'
  export default {
    setup() {
      const state = reactive({
        test: '十三'
      })

      const testc = computed(() => {
        return state.test + '测试'
      })

      return {
        ...toRefs(state),
        testc
      }
    }
  }
</script>
```

添加了 computed 之后，可以看到，工具包的大小从 87.35 -> 87.39，变大了。也就是说，之前没有用到 computed，它是不会被打包到生产环境的工具包里的。
综上所述，Vue 3.0 的 Tree-shaking 为我们带来了一下几个升级：
* 减少打包后的静态资源体积
* 程序执行更快

## Vite 2.0 构建项目及原理分析

Vite（法语意思是 “快”，发音为 /vit/，类似 veet）是一种全新的前端构建工具。你可以把它理解为一个开箱即用的开发服务器 + 打包工具的组合，但是更轻更快。
Vite 利用浏览器原生的 ES 模块支持和用编译到原生的语言开发的工具（如 esbuild）来提供一个快速且现代的开发体验。它到底比起 Webpack，有什么优势

* vite 解决了两个问题：1. 开发环境服务器启动缓慢 2. 更改代码时，页面更新缓慢。
    * 内部用了 esbuild 进行预编译构建依赖，而 esbuild 采用了 go 语言开发。这个特点也是 vite 作为开发服务器更新依赖特别快的另外一个原因。 
    * 以 原生 ESM 方式服务源码，让浏览器接管了打包程序的部分工作。


### ES module

ES module 是 Vite 的核心，我们先来看看 ES module 的浏览器支持情况。

可以看到主流浏览器 Edge、Firefox、Chrome、Safari、Opera 的较新版本都已经支持了 ES module，除了万恶的 IE 浏览器。
它最大的特点就是在浏览器端直接使用 export 和 import 的方式进行导入和导出模块，前提必须在 script 标签里设置 type=module。大致使用如下所示：
<script type="module">
  import { name } from './foo.js'
</script>

上述代码运行时，浏览器会发起 http 请求，请求 http server 托管的 foo.js，在 foo.js 内，我们可以使用 export 导出模块：
```js
// foo.js
export const name = 'Nick'
￼
我们通过 Vite 初始化一个 vue3-vite 项目，在页面中打开控制台，点击 Sources，如下所示：

红框内就是引入了 type=module 属性，并且 src 引入 /src/main.js，我们打开它如下所示：
￼
script 标签内的内容如下：
import { createApp } from '/node_modules/.vite/vue.js?v=5f7bc028'
import App from '/src/App.vue'

createApp(App).mount('#app')
```
从上述代码我们可以得到一些信息：
1. createApp 方法是从 http://localhost:3001/node_modules/.vite/vue.js?v=5f7bc028 中获取的。
2. 入口页面 App.vue 是从 http://localhost:3001/src/App.vue 中获取的。
3. 通过 createApp 方法，将应用挂在到了 #app 下。
createApp 是 Vue 3.0 新增的 API，它用于创建应用。Vue 2.0 时代的创建应用需要将代码通过 webpack 工具打包之后才能在浏览器运行，而 Vite 通过 ES module 的能力，省去了打包过程，直接在浏览器内通过 /node_modules/.vite/vue.js?v=5f7bc028 的形式引入代码。


通过 webpack 打包实现编译，很难做到按需加载，因为都是静态资源，不管模块代码是否被使用到，都会被打包到 bundle 文件里。随着业务量增大，打包后的 bundle 随之越来越大。后来为了减小 bundle 的体积，开发者们使用 import() 的方式实现按需加载的形式，但是被引入的模块依然需要提前打包，后来使用 tree shaking 等方式去掉未使用到的代码块。但是上述的努力均没能比 Vite 更加优雅，Vite 可以在需要某个模块的时候动态引入，并且不需要提前打包。要注意的是，目前 Vite 这种形式只能用于开发环境，但是就这样已经能大大的提升开发的效率了，这就足够了。

上面这段话，需要对比下 webpack 和 vite 的具体模式，怎么支持按需引入和打包的。

### vite.config.js 常用配置介绍

#### plugins

插件配置，接收一个数组，在数组内执行需要的插件。插件能帮助我们完成很多事情，比如 Vite 2.0 默认通过 @vitejs/plugin-vue 支持 vue，书写形式如下所示：
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
})
```
插件分为两个类型，一个是官方的，一个是社区的：
官方插件	社区插件
在线地址	在线地址

#### base

base 配置项在开发或生产环境服务的 公共基础路径，打完包后在 /dist/index.html 中体现。默认值是 /，我们不妨把值设置成 ./，如下所示：
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
  base: './'
})
```
尝试着运行 npm run build，得到打包后的文件如下所示：
￼
静态资源的引入形式如上图所示，如果不加 ./ 路径，则在 index.html 内，引入的路径就会是绝对路径 /xxx/xxx 的形式。通过启动 web 服务的形式将 index.html 启动，如下所示：
￼


#### resolve.alias

此配置想必大家也不陌生，就是为了方便在组件内部引用文件时，方便书写。配置如下所示：
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
  base: './',
  resolve: {
    // 别名设置
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  }
})
```
Vite 1.0 是需要用 /@/ ，加斜杠的形式，Vite 2.0 后，便优化了。

#### resolve.extensions

导入文件时，需要省略的扩展名列表，不过官方建议是尽量不要将 .vue 给省略了。配置如下：
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
  base: './',
  resolve: {
    // 别名设置
    alias: {
      '@': path.resolve(__dirname, '/src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // 默认值
  }
})
```

#### server

该配置内置多种开发时常用的选项，我们通过代码来分析：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
  base: './',
  resolve: {
    // 别名设置
    alias: {
      '@': path.resolve(__dirname, '/src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // 默认值
  },
  server: {
    // 指定服务器主机名
    host: '0.0.0.0',
    // 开发环境启动的端口号
    port: 3008,
    // 是否在开发环境下自动打开应用程序
    open: true,
    // 代理
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```
和 webpack-dev-server 的配置相差不大，同学们几乎可以无缝对接。


## Vue-Router 4.x 新旧路由方法对比

在平时的业务开发中，Vue-Router 是必不可少的插件，它的作用也很明确，就是通过路径匹配出响应的组件，单页面有了它，才算是如虎添翼，否则就是一只 Hello Kitty

### 初始化

通过 Vite 初始化一个空项目，运行指令：
npm init @vitejs/app vue3-vite --template vue
创建两个页面，用于路由切换，在 src 目录下新建 views 目录，添加 Home.vue 和 About.vue 文件，如下所示：
```html
<!--Home.vue-->
<template>
  Home
</template>

<script>
export default {
  name: 'Home'
}
</script>
<!--About.vue-->
<template>
  About
</template>

<script>
export default {
  name: 'About'
}
</script>
```

然后通过 npm install vue-router@next 下载最新的路由插件。成功之后，在 src 目录下新建 router/index.js，添加如下代码：

```js
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHashHistory(), // createWebHashHistory 为哈希模式的路由，如果需要选择 histiry 模式，可以用 createWebHistory 方法。
  routes: [ // routes 属性和 vue-router 3.0 的配置一样，通过数组对象的形式，配置路径对应展示的组件。
    {
      path: '/',
      name: '/',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router
```

完成上述操作之后，我们来到 main.js 把上述通过 export default router 抛出的路由实例引入 Vue 生成的实例，代码如下所示：

```html
 <!-- App.vue -->
<template>
  <router-view></router-view>
</template>

<script>
import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'

// 生成 app 实例。
const app = createApp(App)
// 通过 use 引入 路由实例。
app.use(router)
// 将实例挂载到 #app 节点上。
app.mount('#app')
</script>
```

通过指令 npm run dev 运行项目，浏览器展示如下所示表示成功：
￼
如上图所示，/ 匹配到了 Home 组件；/about 匹配到了 About 组件。

### 路由之间的跳转

#### 组件形式跳转

我们可以使用 vue-router 为我们提供的全局组件 router-link。修改 Home.vue 如下所示：
```html
<template>
  <router-link to='/about'>Home</router-link>
</template>

<script>
export default {
  name: 'Home'
}
</script>
```
#### 方法形式跳转

我们也可以通过调用方法的形式，实现路由的跳转，修改 Home.vue 如下所示：
```html
<template>
  <button @click="linkTo">Home</button>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const linkTo = () => {
      router.push({
        path: '/about'
      })
    }

    return {
      linkTo
    }
  }
}
</script>
```
通过 useRouter 生成路由实例 router，其内部都是路由相关的方法，如跳转方法、路由守卫、返回方法等等。可以通过打印 router 查看内部的一些属性方法。

### 参数传递

路由参数传递有两种方式，一种是通过浏览器查询字符串的形式，另外一种是通过 params 形式传递，我们来逐一分析：

#### 浏览器查询字符串 query

router-link：
<!--Home.vue-->
<template>
  <router-link :to="{ path: '/about', query: { id: 1 } }">Home</router-link>
</template>

<script>
export default {
  name: 'Home'
}
</script>
router.push：
<template>
  <button @click="linkTo">Home</button>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    console.log('router', router)
    const linkTo = () => {
      router.push({
        path: '/about',
        query: {
          id: 1
        }
      })
    }

    return {
      linkTo
    }
  }
}
</script>
接收参数的话，我们修改 About.vue 如下所示：
<template>
  About
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  name: 'Abput',
  setup() {
    const route = useRoute()
    const { id } = route.query
    console.log('id=', id)
  }
}
</script>
上述两种形式效果如下图所示：
￼


#### params 形式

果我们不想污染浏览器查询字符串，但又想通过路由传参，params 是最好的选择。
router-link：
<!--Home.vue-->
<template>
  <router-link :to="{ name: 'about', params: { id: 1 } }">Home</router-link>
</template>

<script>
export default {
  name: 'Home'
}
</script>
router.push：
<template>
  <button @click="linkTo">Home</button>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const linkTo = () => {
      router.push({
        name: 'about',
        params: {
          id: 1
        }
      })
    }

    return {
      linkTo
    }
  }
}
</script>
这里要注意，通过 params 穿插，跳转的属性要通过 name 来控制，否则是拿不到传递的变量的。
接收组件 About.vue 修改如下：
<template>
  About
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  name: 'About',
  setup() {
    const route = useRoute()
    const { id } = route.params
    console.log('id=', id)
  }
}
</script>
浏览器展示如下：
￼

这里提醒大家，如果使用 params 的形式传参，在目标页面 About.vue 手动刷新的话，就拿不到 params 参数了，所以我个人使用 query 居多。

### 路由守卫

很多时候你需要监听路由的变化，从而来实现一个业务逻辑，那么在全新的 Vue-Router 4.0 中是如何实现路由守卫的呢？

#### beforeEach 和 afterEach

<template>
  <router-view></router-view>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  setup() {
    const router = useRouter()
    router.afterEach(() => {
      console.log('path::', router.currentRoute.value.path)
    })
  }
}
</script>
浏览器表现如下所示：
￼

### 路由原理浅析

端路由 会根据浏览器地址栏 pathname 的变化，去匹配相应的页面组件。然后将其通过创建 DOM 节点的形式，塞入根节点 `<div id="root"></div>` 。这就达到了无刷新页面切换的效果，从侧面也能说明正因为无刷新，所以 React、Vue、Angular 等现代框架在创建页面组件的时候，每个组件都有自己的 生命周期 。

## Vue 3.0 实战项目启动篇

## 参考资料

- [轻松学会 React 钩子：以 useEffect() 为例](http://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)
- https://juejin.cn/book/6933939264455442444/section/6933954409923608584


