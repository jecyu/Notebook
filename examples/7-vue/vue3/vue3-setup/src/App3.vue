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
