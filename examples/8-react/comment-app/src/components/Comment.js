/*
 * @Author: naluduo233
 * @Date: 2021-04-05 11:41:13
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-06-03 23:33:51
 * @FilePath: /Notebook/examples/8-react/comment-app/src/components/Comment.js
 * @Description:
 */
import React, { Component } from "react";
import Say from "./Say";

class Comment extends Component {
  constructor() {
    super();
    this.state = { timeString: "" };
  }

  componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(this._updateTimeString.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _updateTimeString() {
    const comment = this.props.comment;
    const duration = (+Date.now() - comment.createdTime) / 1000;
    this.setState({
      timeString:
        duration > 60
          ? `${Math.round(duration / 60)} 分钟前`
          : `${Math.round(Math.max(duration, 1))}秒前`,
    });
  }

  _getProcessedContent(content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039")
      .replace(/`([\S\s]+?)`/g, "<code>$1</code>");
  }

  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  render() {
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{this.props.comment.username}</span>
          <p
            dangerouslySetInnerHTML={{
              __html: this._getProcessedContent(this.props.comment.content),
            }}
          ></p>
        </div>
        <span className="comment-createdtime">{this.state.timeString}</span>
        <span
          className="comment-delete"
          onClick={this.handleDeleteComment.bind(this)}
        >
          删除
        </span>
        <Say textMsg={this.props.comment.content}></Say>
      </div>
    );
  }
}
export default Comment;
