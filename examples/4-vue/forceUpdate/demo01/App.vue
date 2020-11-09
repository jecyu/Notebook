<template>
  <div>
    <Parent>
      <template slot="child">
        <Child :username="username"></Child>
      </template>
    </Parent>
  </div>
</template>
<script>
import Parent from "./Parent.vue";
import Child from "./Child.vue";
export default {
  components: {
    Parent,
    Child,
  },
  data() {
    return {
      username: String(new Date())
    };
  },

  methods: {},
};
</script>
