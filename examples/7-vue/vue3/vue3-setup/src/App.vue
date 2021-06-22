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
