<template>
  <div>
    <!-- <router-link to="/about">Home</router-link> -->
    <button @click="linkTo">Home</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const linkTo = () => {
      router.push({
        // path: "/about",
        // query: {
        //   id: 1
        // },
        name: "about",
        params: {
          id: 1
        }
      });
    };
    return {
      linkTo
    }
  },
};
</script>
