<template>
  <div>
    <router-link to="/home">home</router-link>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: "About",
  setup() {
    const route = useRoute();
    // const { id } = route.query;
    const { id } = route.params;
    console.log("id=", id);
  },
};
</script>
