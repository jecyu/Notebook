/*
 * @Author: naluduo233
 * @Date: 2021-04-08 13:13:02
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-08 13:36:37
 * @FilePath: /comment-app/src/reducers/commentReducer.js
 * @Description:
 */

// action Types
const INIT_COMMENTS = "INIT_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

export default function(state, action) {
  if (!state) {
    state = { comments: [] };
  }

  switch (action.type) {
    case INIT_COMMENTS:
      // 初始化评论
      return {
        comments: action.comments,
      };
    case ADD_COMMENT:
      // 新增评论
      return {
        comments: [...state.comments, action.comment],
      };
    case DELETE_COMMENT:
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex), // 不直接操作原数组 splice
          ...state.comments.slice(action.commentIndex + 1),
        ],
      };
    default:
      return state;
  }
}

// action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments };
};

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment };
};

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex };
};
