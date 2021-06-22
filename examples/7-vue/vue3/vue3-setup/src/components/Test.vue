<template>
  <div>
    <div>{{ attrs.count }}</div>
    <button @click="add">++++</button>
  </div>
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
