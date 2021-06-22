<script>
import { ref, reactive, h } from "vue";
export default {
  setup() {
    const count = ref(1);
    const object = reactive({ foo: "bar" });

    return () => h("h1", [count.value, object.foo])
  },
};
</script>
