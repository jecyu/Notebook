<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld :msg="msg" /> -->
    <!-- <label>改变标题<input v-model="msg"/></label> -->
    <!-- <router-link to="/foo">Go to Foo</router-link> |
    <router-link to="/bar">Go to Bar</router-link>
    <router-view /> -->
    <my-router-link to="home" tag="p">首页</my-router-link>
    <my-router-link to="classify">分类</my-router-link> |
    <my-router-link to="cart">购物车</my-router-link>
    <my-router-view />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      msg: 33,
    };
  },
  watch: {
    msg() {
      console.log("msg ->", this.msg);
    },
  },
  mounted() {
    // console.log('this.$router', this.$myRouter)
    console.log("this.$router", this.$router);
    console.log("this.$route ->", this.$route);
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
