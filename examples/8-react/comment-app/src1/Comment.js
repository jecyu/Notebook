/*
 * @Author: naluduo233
 * @Date: 2021-04-05 11:41:13
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-05 12:29:45
 * @FilePath: /comment-app/src/Comment.js
 * @Description:
 */
import React, { Component } from "react";

class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{this.props.comment.username}</span>
        </div>
        <p>{this.props.comment.content}</p>
      </div>
    );
  }
}
export default Comment;
