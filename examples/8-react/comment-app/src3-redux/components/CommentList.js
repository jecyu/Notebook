/*
 * @Author: naluduo233
 * @Date: 2021-04-05 11:41:08
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-09 13:19:15
 * @FilePath: /comment-app/src/components/CommentList.js
 * @Description:
 */
import React, { Component } from "react";
import Comment from "./Comment";

class CommentList extends Component {
  static defaultProps = {
    comments: [],
  };

  handleDeleteComment(index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  render() {
    // const comments = [
    //   {
    //     username: "Jerry",
    //     content: "Hello",
    //   },
    //   {
    //     username: "Tomy",
    //     content: "World",
    //   },
    //   {
    //     username: "Lucy",
    //     content: "Good",
    //   },
    // ];
    return (
      <div>
        {this.props.comments.map((comment, i) => (
          <Comment
            comment={comment}
            index={i}
            key={i}
            onDeleteComment={this.handleDeleteComment.bind(this)}
          />
        ))}
      </div>
    );
  }
}
export default CommentList;
