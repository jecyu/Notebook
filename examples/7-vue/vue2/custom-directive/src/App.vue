<template>
  <div id="app">
    <button @click="sayHello" v-throttle>sayHello</button>
    <button v-copy="666">一键 copy</button>
    <img alt="Vue logo" src="./assets/logo.png" />
    <LazyLoad />
  </div>
</template>

<script>
import LazyLoad from "./components/LazyLoad.vue";

export default {
  name: "App",
  components: {
    LazyLoad,
  },
  methods: {
    sayHello() {
      console.log("hello");
    },
  },
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
