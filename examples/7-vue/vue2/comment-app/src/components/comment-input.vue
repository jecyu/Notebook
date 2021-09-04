<script>
export default {
  name: "CommentInput",
  props: {
    username: {
      type: String,
      default: "",
    },
  },
  data({ username }) {
    return {
      state: {
        username: username,
        content: "",
        textareaRef: null,
      },
    };
  },
  mounted() {
    // this.$refs.textareaRef.focus();
    document.querySelector("textarea").focus();
  },
  methods: {
    handleUsernameChange(event) {
      this.state.username = event.target.value;
    },
    handleContentChange(event) {
      this.state.content = event.target.value;
    },
    handleUsernameBlur(event) {
      // jsx 中必须这样传递带有 on 前缀，外部才能监听到
      this.$emit("onUserNameInputBlur", event.target.value);
    },
    handleSubmit() {
      const { username, content } = this.state;
      this.$emit("onSubmit", { username, content, createdTime: +new Date() });
      this.state.content = "";
    },
  },
  render() {
    return (
      <div class="comment-input">
        <div class="comment-field">
          <span class="comment-field-name">用户名：</span>
          <div class="comment-field-input">
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div class="comment-field">
          <span class="comment-field-name">评论内容：</span>
          <div class="comment-field-input">
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>
        <div class="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    );
  },
};
</script>
