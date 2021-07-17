<template>
  <div id="app">
    <!-- <VirtualList :data="data"></VirtualList> -->
    <VirtualList :data="data" :item-size-getter="itemSizeGetter"></VirtualList>
  </div>
</template>

<script>
import VirtualList from "./components/VirtualList.vue";
export default {
  name: "App",
  components: {
    VirtualList,
  },
  data() {
    const data = [];
    for (let i = 0; i < 100000; i++) {
      data.push({ value: i });
    }
    return {
      data,
    };
  },
  methods: {
    itemSizeGetter(item) {
      return 30 + (item.value % 10);
    },
  },
};
</script>
