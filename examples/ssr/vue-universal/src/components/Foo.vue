<template>
  <div>{{ fooCount }}</div>
</template>

<script>
// import the module here instead of in `store/index.js`
import fooStoreModule from "../store/modules/foo";

export default {
  computed: {
    fooCount() {
      return this.$store.state.foo.count;
    },
  },

  // Server-side only
  serverPrefetch() {
    this.$store.registerModule("foo", fooStoreModule);
    return this.fooInc();
  },

  // Client-side only
  mounted() {
    // We already incremented 'count' on the server
    // We know by checking if the 'foo' state already exists
    const alreadyIncremented = !!this.$store.state.foo;

    // We register the foo module
    // Preseve the previous state if it was injected from the server
    this.$store.registerModule("foo", fooStoreModule, { preserveState: true });

    if (!alreadyIncremented) {
      this.fooInc();
    }
  },

  // IMPORTANT: avoid duplicate module registration on the client
  // when the route is visited multiple times;
  destroyed() {
    this.$store.unregisterModule("foo");
  },

  methods: {
    fooInc() {
      return this.$store.dispatch("foo/inc");
    },
  },
};
</script>
