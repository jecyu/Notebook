<template>
  <div id="app">
    <VirtualList :data="data"></VirtualList>
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
    for (let i = 0; i < 10000; i++) {
      data.push({ value: i });
    }
    return {
      data,
    };
  },
};
</script>