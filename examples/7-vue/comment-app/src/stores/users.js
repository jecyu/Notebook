/*
 * @Author: naluduo233
 * @Date: 2021-04-16 13:33:21
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-16 13:54:11
 * @FilePath: /comment-app/src/stores/users.js
 * @Description:
 */
// action Types
const INIT_COMMENTS = "INIT_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

export default {
  namespaced: true,
  state: () => ({ comments: [] }),
  mutations: {
    [INIT_COMMENTS](state, comments) {
      // mutate state
      state.comments = comments;
    },
    [ADD_COMMENT](state, comment) {
      state.comments = [...state.comments, comment];
    },
    [DELETE_COMMENT](state, commentIndex) {
      state.comments = [
        ...state.comments.slice(0, commentIndex), // 不直接操作原数组 splice state，而是返回新的 state
        ...state.comments.slice(commentIndex + 1),
      ];
    },
  },
  actions: {},
};

// action creators
export const initComments = (comments) => {
  return { type: `users/${INIT_COMMENTS}`, payload: comments };
};

export const addComment = (comment) => {
  return { type: `users/${ADD_COMMENT}`, payload: comment };
};

export const deleteComment = (commentIndex) => {
  return { type: `users/${DELETE_COMMENT}`, payload: commentIndex };
};
