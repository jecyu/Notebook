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
