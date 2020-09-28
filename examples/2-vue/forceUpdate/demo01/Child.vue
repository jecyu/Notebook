<template>
  <div>
    <p>{{ username }}</p>
    <!-- <div v-show="visible">可以被隐藏的元素</div> -->
    <input type="text" />
  </div>
</template>
<script>
export default {
  props: {
    username: {
      default: "Jecyu",
      type: String,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  beforeUpdate() {
    console.log("beforeUpdate-child");
  },
  updated() {
    console.log("update-child");
  },
};
</script>
