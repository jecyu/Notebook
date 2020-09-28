<template>
  <div>
    <h1>Hello!</h1>
    <h2>{{ user.name }}</h2>
    <button @click="handleChange">change</button>
    <slot name="child"></slot>
    <!-- <Child></Child> -->
  </div>
</template>
<script>
// import Child from "./Child.vue";
export default {
  components: {
    // Child,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    console.log("created");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  methods: {
    handleChange() {
      //   this.$set(this.user, "name", "Jecyu");
      this.user.name = String(new Date());
      this.$forceUpdate();
    },
  },
};
</script>
