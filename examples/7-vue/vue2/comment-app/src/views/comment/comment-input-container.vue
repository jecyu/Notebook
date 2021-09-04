<script>
// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import CommentInput from "@/components/comment-input.vue";
// // import { addComment } from "../reducers/comments";

// import { connect } from "dva";
import { addComment } from "@/stores/users";

import { mapState } from "vuex";
// 负责用户名的加载、保存，评论的发布
export default {
  name: "comment-input-container",
  data() {
    return {
      state: {
        username: "",
      },
    };
  },
  computed: {
    ...mapState({
      comments: (state) => state.users.comments,
    }),
  },
  created() {
    this._loadUsername();
  },
  methods: {
    // ...mapMutations(["ADD_COMMENT"]),
    _saveUsername(username) {
      localStorage.setItem("username", username);
    },

    _loadUsername() {
      // 从 LocalStorage 加载 username
      // 然后可以在 render 方法中传给 CommentInput
      const username = localStorage.getItem("username");
      if (username) {
        this.state.username = username;
      }
    },
    handleSubmitComment(comment) {
      console.log("comment ->", comment);

      // 评论数据的验证
      if (!comment) return;
      if (!comment.username) return alert("请输入用户名");
      if (!comment.content) return alert("请输入评论内容");

      // 新增评论保存到 LocalStorage 中
      const { comments } = this;
      const newComments = [...comments, comment];
      localStorage.setItem("comments", JSON.stringify(newComments));

      // 传递给 vuex
      // this.$emit("onSumbit", comment);
      // this.ADD_COMMENT(comment); // TODO mutation 混入
      const action = addComment(comment);
      this.$store.commit(action.type, action.payload);
    },
  },
  render() {
    return (
      <CommentInput
        username={this.state.username}
        ononUserNameInputBlur={this._saveUsername.bind(this)}
        ononSubmit={this.handleSubmitComment.bind(this)}
      />
    );
  },
};

// const mapDispatchProps = (dispatch) => {
//   return {
//     onSubmit: (comment) => {
//       dispatch(addComment(comment));
//     },
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchProps
// )(CommentInputContainer);
</script>
