# 版式设计

满足自适应效果

## 基本布局

### 水平居中

### 垂直居中

### 水平垂直居中

### 两列自适应布局

两列自适应布局是指一列由内容（也可以设定宽度）撑开，另一列撑满剩余宽度的布局方式。

效果图

#### flex 实现

结构
```html
<div class="container">
  <div class="side"></div>
  <div class="content"></div>
</div>
```

样式
```css
.container {
  display: flex;
}
.content {
  margin-left: 20px;
  flex: 1;
}
```
实战例子：一个 vue 左右布局可折叠组件。
```vue
<template>
  <div class="layout">
    <transition name="slide">
      <div class="layout-left">
        <!-- 左栏展示区域 -->
        <slot name="left">
      </div>
      <div class="layout-right" :style=`width: calc(100% - ${isFold ? '0rem' : '16rem'})`>
        <Button class="btn" :icon="iconType" @click.prevent.stop="toogleFold">
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Layout",
  props: {
    // v-model
    value: {
      // 默认打开
      type: Boolean,
      default: () => false
    }
  },
  data({ value }) {
    return {
      isFold: value // 默认打开, isFold 控制组件内部状态
    };
  },
  computed: {
    iconType() {
      return this.isFold ? "ios-arrow-forward" : "ios-arrow-back";
    }
  },
  watch: {
    value(val) {
      // 外部传入折叠变化
      this.isFold = val;
    }，
    // v-model
    isFold(val) {
      // 折叠变化响应事件
      this.$emit("input", val);
    }
  },
  methods: {
    toogleFold() {
      this.isFold = !this.Fold;
    }
  }
}
</script>
<style>
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  &-left {
    width: 16rem;
    height: 100%;
    overflow-x: hidden;
  }
  &-right: {
    flex: 1;
    height: 100%;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s linear;
  }
  .slide-enter,
  .slide-leave-to {
    width: 0;
  }
}
</style>
```

## 组合布局

### 上中下布局

### 顶部-侧边布局-通栏

### 顶部-侧边布局

### 固定头部

### 固定侧边栏

