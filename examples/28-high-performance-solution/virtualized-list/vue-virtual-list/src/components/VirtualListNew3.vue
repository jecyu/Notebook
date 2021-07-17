<template>
  <div class="list-view" @scroll="handleScroll">
    <div
      class="list-view-phantom"
      :style="{ height: contentHeight + 'px' }"
    ></div>
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
// 优化 contentHeight 的计算结果
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
    // 新增  contentHeight 就等于缓存过的列表项的高度和 + 未缓存过的列表项的数量 * estimatedItemSize。
    estimatedItemSize: {
      // 避免计算所有的 itemSizeGetter
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      lastMeasuredIndex: -1, // 记录最后一次计算尺寸、偏移的 index，startIndex
      startIndex: 0,
      sizeAndOffsetCache: {},
      visibleData: [],
    };
  },
  computed: {
    // 修改，避免计算所有的 itemSizeGetter
    contentHeight() {
      // // 2. 总的内容高度，赋值 phantom
      // const { data, itemSizeGetter } = this;
      // let total = 0;
      // for (let i = 0, j = data.length; i < j; i++) {
      //   total += itemSizeGetter.call(null, data[i], i);
      // }
      // return total;
      const { data, estimatedItemSize, lastMeasuredIndex} = this;
      let itemCount = data.length;
      if (lastMeasuredIndex >= 0) {
        // 有缓存
        const lastMeasuredSizeAndOffset = this.getLastMeasureSizeAndOffset();
        return (
          lastMeasuredSizeAndOffset.offset +
          lastMeasuredSizeAndOffset.size +
          (itemCount - lastMeasuredSizeAndOffset - 1) * estimatedItemSize
        );
      } else {
        // 初始化
        return itemCount * estimatedItemSize;
      }
    },
  },
  mounted() {
    this.updateVisibleData();
  },
  methods: {
    handleScroll() {
      const scrollTop = this.$el.scrollTop;
      this.updateVisibleData(scrollTop);
    },
    // 3. 找到总的 item 高度和与 scrollTop 相等时，start 的索引
    findNearestItemIndex(scrollTop) {
      const { data } = this;
      let total = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        // total += itemSizeGetter.call(null, data[i], i);
        total += this.getItemSizeAndOffset(i).size;
        if (total >= scrollTop || i === j - 1) {
          // 当 total >= scrollTop 滚动的距离，或者已经遍历到最后一个
          return i;
        }
      }
      return 0;
    },
    // 4. 根据索引，求出索引之前的 offset 偏移位置
    getItemSizeAndOffset(index) {
      // const { data, itemSizeGetter } = this;
      // let total = 0;
      // for (let i = 0, j = Math.min(index, data.length - 1); i <= j; i++) {
      //   const size = itemSizeGetter.call(null, data[i], i);

      //   if (i === j) {
      //     return {
      //       offset: total,
      //       size,
      //     };
      //   }
      //   total += size;
      // }

      // return {
      //   offset: 0,
      //   size: 0,
      // };
      const {
        lastMeasuredIndex,
        sizeAndOffsetCache,
        data,
        itemSizeGetter,
      } = this;
      if (lastMeasuredIndex >= index) {
        // 直接读取缓存返回
        return sizeAndOffsetCache[index];
      }

      let offset = 0;
      // 读取上一次的缓存
      if (lastMeasuredIndex >= 0) {
        const lastMeasured = sizeAndOffsetCache[lastMeasuredIndex];
        if (lastMeasured) {
          offset = lastMeasured.offset + lastMeasured.size; // 上一次计算的索引对应的偏移量和列表项的大小
        }
      }

      // 在上一次缓存基础上，继续更新 offset
      for (let i = lastMeasuredIndex + 1; i <= index; i++) {
        const item = data[i];
        const size = itemSizeGetter.call(null, item, i);
        sizeAndOffsetCache[i] = { size, offset };
      }

      if (index > lastMeasuredIndex) {
        this.lastMeasuredIndex = index; // 更新索引
      }
      return sizeAndOffsetCache[index]; // 返回 index 对应的缓存值
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
    // 新增. 因为需要得知计算过高度的列表项的高度和，需要增加方法 getLastMeasuredSizeAndOffset
    getLastMeasureSizeAndOffset() {
      return this.lastMeasuredIndex >= 0
        ? this.sizeAndOffsetCache[this.lastMeasuredIndex]
        : { offset: 0, size: 0 };
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
