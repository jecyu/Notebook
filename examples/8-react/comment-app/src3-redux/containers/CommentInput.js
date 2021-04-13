/*
 * @Author: naluduo233
 * @Date: 2021-04-09 13:41:45
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-09 14:05:38
 * @FilePath: /comment-app/src/containers/CommentInput.js
 * @Description:
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentInput from "../components/CommentInput";
import { addComment } from "../reducers/comments";

// CommentInputContainer
// 负责用户名的加载、保存，评论的发布
class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func,
  };

  constructor() {
    super();
    this.state = { username: "" };
  }

  componentWillMount() {
    this._loadUsername();
  }

  _loadUsername() {
    // 从 LocalStorage 加载 username
    // 然后可以在 render 方法中传给 CommentInput
    const username = localStorage.getItem("username");
    if (username) {
      this.setState({ username });
    }
  }

  _saveUsername(username) {
    // 看看 render 方法的 onUserNameInputBlur
    // 这个方法会在用户名输入框 blur 的时候被调用，保存用户名
    localStorage.setItem("username", username);
  }

  handleSubmitComment(comment) {
    // 评论数据的验证
    if (!comment) return;
    if (!comment.username) return alert("请输入用户名");
    if (!comment.content) return alert("请输入评论内容");

    // 新增评论保存到 LocalStorage 中
    const { comments } = this.props;
    const newComments = [...comments, comment];
    localStorage.setItem("comments", JSON.stringify(newComments));
    // this.props.onSubmit 是 connect 传进来的
    // 会 dispatch 一个 action 去新增评论
    if (this.props.onSubmit) {
      this.props.onSubmit(comment);
    }
  }

  render() {
    return (
      <CommentInput
        username={this.state.username}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(CommentInputContainer);
