/*
 * @Author: naluduo233
 * @Date: 2021-04-05 11:40:13
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-07 13:40:40
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

  componentWillMount() {
    this._loadComments();
  }

  _saveComments(comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  _loadComments() {
    let comments = localStorage.getItem("comments");
    if (comments) {
      comments = JSON.parse(comments);
      this.setState({ comments });
    }
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert("请输入用户名");
    if (!comment.content) return alert("请输入评论内容");
    const comments = this.state.comments;
    comments.push(comment);
    this.setState({
      comments,
    });
    this._saveComments(comments);
  }

  handleDeleteComment(index) {
    const comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({ comments });
    this._saveComments(comments);
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)}
        />
      </div>
    );
  }
}

export default CommentApp;
