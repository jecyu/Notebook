<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      msg: "33",
    };
  },
  watch: {
    msg() {
      console.log("msg ->", this.msg);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
