<template>
  <div class="list-view" @scroll="handleScroll">
    <div class="list-view-phantom" :style="{ height: contentHeight + 'px' }"></div>
    <div class="list-view-content" ref="content">
      <div
        :style="{ height: itemSizeGetter(item) + 'px' }"
        v-for="item in visibleData"
        :key="item.id"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
// 动态计算高度
export default {
  name: "App",
  props: {
    data: {
      type: Array,
      required: true,
    },
    itemHeight: {
      type: Number,
      default: 30,
    },
    itemSizeGetter: {
      // 1. 获取每个列表项的高度
      type: Function,
    },
  },
  data() {
    return {
      visibleData: [],
    };
  },
  computed: {
    contentHeight() {
      // 2. 总的内容高度，赋值 phantom
      const { data, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        total += itemSizeGetter.call(null, data[i], i);
      }
      return total;
    },
  },
  mounted() {
    this.updateVisibleData();
  },
  methods: {
    // 3. 找到总的 item 高度和与 scrollTop 相等时，start 的索引
    findNearestItemIndex(scrollTop) {
      const { data, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        total += itemSizeGetter.call(null, data[i], i);
        if (total >= scrollTop || i === j - 1) {
          // 当 total >= scrollTop 滚动的距离，或者已经遍历到最后一个
          return i;
        }
      }
      return 0;
    },
    // 4. 根据索引，求出索引之前的 offset 偏移位置
    getItemSizeAndOffset(index) {
      const { data, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = Math.min(index, data.length - 1); i <= j; i++) {
        const size = itemSizeGetter.call(null, data[i], i);

        if (i === j) {
          return {
            offset: total,
            size,
          };
        }
        total += size;
      }

      return {
        offset: 0,
        size: 0,
      };
    },
    // 5.
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      // const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
      // const start = Math.floor(scrollTop / this.itemHeight);
      // const end = start + visibleCount; // 计算终点位置
      // this.visibleData = this.data.slice(start, end);
      // 移动内容容器，向上移动，表现滚动效果
      // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
      // this.$refs.content.style.webkitTransform = `
      // translate3d(0, ${start * this.itemHeight}px, 0)`;

      const start = this.findNearestItemIndex(scrollTop); // 计算起始位置
      const end = this.findNearestItemIndex(scrollTop + this.$el.clientHeight); // 计算结束位置
      this.visibleData = this.data.slice(
        start,
        Math.min(end + 1, this.data.length) // end + 1，包含 end 
      );
      this.$refs.content.style.webkitTransform = `
      translate3d(0, ${this.getItemSizeAndOffset(start).offset}px, 0)`;
    },
    handleScroll() {
      const scrollTop = this.$el.scrollTop;
      this.updateVisibleData(scrollTop);
    },
  },
};
</script>

<style>
.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #aaa;
}

/* 使用一个不可见元素（.list-view-phantom）撑起这个列表，让列表的滚动条出现
 */
.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-view-item {
  padding: 5px;
  color: #666;
  line-height: 30px;
  box-sizing: border-box;
}
</style>
