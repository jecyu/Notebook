<script>
// import React, { Component } from "react";
// import PropTypes from "prop-types";
// // import { connect } from "react-redux";
import CommentList from "@/components/comment-list.vue";
// // import { initComments, deleteComment } from "../reducers/comments";

// import { connect } from "dva";
import { initComments, deleteComment } from "@/stores/users";
import { mapState } from "vuex";
export default {
  name: "comment-list-container",
  created() {
    this._loadComments();
  },
  computed: {
    ...mapState({
      comments: (state) => state.users.comments,
    }),
  },
  methods: {
    _loadComments() {
      let comments = localStorage.getItem("comments");
      comments = comments ? JSON.parse(comments) : [];
      
      // this.props.initComments 是 connect 传进来的
      // 可以帮我们把数据初始化到 state 里面去
      const action = initComments(comments);
      this.$store.commit(action.type, action.payload);
    },
    handleDeleteComment(index) {
      const { comments } = this;
      // 不要直接改变 props，所以这里新建一个删除了特定下标的评论列表
      const newComments = [
        ...comments.slice(0, index),
        ...comments.slice(index + 1),
      ];
      // 保存最新的评论列表到 LocalStorage
      localStorage.setItem("comments", JSON.stringify(newComments));

      // 同步到 vuex 上
      const action = deleteComment(index);
      this.$store.commit(action.type, action.payload);
    },
  },
  render() {
    return (
      <CommentList
        comments={this.comments}
        ononDeleteComment={this.handleDeleteComment.bind(this)}
      ></CommentList>
    );
  },
};
</script>
