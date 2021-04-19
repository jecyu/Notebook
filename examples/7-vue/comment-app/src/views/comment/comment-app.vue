<script>
import CommentInputContainer from "./comment-input-container.vue";
import CommentListContainer from "./comment-list-container.vue";

export default {
  name: "CommentApp",
  data() {
    return {
      state: { comments: [] },
    };
  },
  created() {},
  methods: {},
  render() {
    return (
      <div className="wrapper">
        <CommentInputContainer />
        <CommentListContainer />
      </div>
    );
  },
};
</script>
<style>

</style>
