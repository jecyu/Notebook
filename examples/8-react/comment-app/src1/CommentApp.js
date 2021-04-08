/*
 * @Author: naluduo233
 * @Date: 2021-04-05 11:40:13
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-06 13:16:17
 * @FilePath: /comment-app/src/CommentApp.js
 * @Description:
 */
import React, { Component } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

class CommentApp extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
    };
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert("请输入用户名");
    if (!comment.content) return alert("请输入评论内容");
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments,
    });
  }
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentApp;
