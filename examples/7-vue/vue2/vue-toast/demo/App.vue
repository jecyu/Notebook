<template>
  <div><h2>Hello, MyPlugin</h2></div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$toast("Hello, Jecyu!"));
  },
};
</script>
