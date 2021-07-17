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
// 优化已缓存结果的搜索性能
// 使用过缓存的虚拟列表实际上还有优化的空间，比如 findNearestItemIndex 的搜索方式是顺序查找的，时间复杂度为 O(N)。实际上列表项的计算结果天然就是一个有序的数组（因为偏移量不断增大），可以使用二分查找来优化已缓存的结果的搜索性能，把时间复杂度降低到 O(lgN)
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
      const { data, estimatedItemSize, lastMeasuredIndex } = this;
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
      const lastMeasuredOffset = this.getLastMeasureSizeAndOffset().offset;
      if (lastMeasuredOffset > scrollTop) {
        // 对于已缓存的结果使用二分查找，logN
        return this.binarySearch(0, this.lastMeasuredIndex, scrollTop);
      } else {
        let total = 0;
        for (let i = 0, j = data.length; i < j; i++) {
          total += this.getItemSizeAndOffset(i).size;
            // 当 total >= scrollTop 滚动的距离，或者已经遍历到最后一个
          if (total >= scrollTop || i === j - 1) {
            return i;
          }
        }
      }
      return 0;
    },
    // 4. 根据索引，求出索引之前的 offset 偏移位置
    getItemSizeAndOffset(index) {
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
    // 找出目标偏移量
    binarySearch(low, high, offset) {
      
      let index;
      while (low <= high) {
        const middle = low + Math.floor((high - low) / 2); // 求得中间索引
        const middleOffset = this.getItemSizeAndOffset(middle).offset;

        if (middleOffset === offset) {
          index = middle;
          break;
        } else if (middleOffset > offset) {
          high = middle - 1;
        } else {
          low = middle + 1;
        }
      }

      if (low > 0) { // 这里的作用是？待处理
        console.log('low -> ', low)
        index = low - 1; // 为什么要 - 1？
      }

      if (typeof index === "undefined") { 
        // 任何情况下都不会返回 - 1，因为最小的数据索引从 0 开始，给 findNearestItemIndex 使用
        index = 0;
      }

      return index;
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
