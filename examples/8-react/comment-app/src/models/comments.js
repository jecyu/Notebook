/*
 * @Author: naluduo233
 * @Date: 2021-04-10 14:56:59
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-15 15:03:19
 * @FilePath: /Notebook/examples/8-react/comment-app/src/models/comments.js
 * @Description:
 */
// action Types
const INIT_COMMENTS = "INIT_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// export default function(state, action) {
//   if (!state) {
//     state = { comments: [] };
//   }

//   switch (action.type) {
//     case INIT_COMMENTS:
//       // 初始化评论
//       return {
//         comments: action.comments,
//       };
//     case ADD_COMMENT:
//       // 新增评论
//       return {
//         comments: [...state.comments, action.comment],
//       };
//     case DELETE_COMMENT:
//       return {
//         comments: [
//           ...state.comments.slice(0, action.commentIndex), // 不直接操作原数组 splice state，而是返回新的 state
//           ...state.comments.slice(action.commentIndex + 1),
//         ],
//       };
//     default:
//       return state;
//   }
// }

export default {
  namespace: "comments",
  state: { comments: [] },
  reducers: {
    [INIT_COMMENTS](state, { payload: comments }) {
      return {
        comments,
      };
    },
    [ADD_COMMENT](state, { payload: comment }) {
      return {
        comments: [...state.comments, comment],
      };
    },
    [DELETE_COMMENT](state, { payload: commentIndex }) {
      return {
        comments: [
          ...state.comments.slice(0, commentIndex), // 不直接操作原数组 splice state，而是返回新的 state
          ...state.comments.slice(commentIndex + 1),
        ],
      };
    },
  },
  // effects: {
  //   // 异步
  //   *addAfter1Second(action, { call, put }) {
  //     yield call(delay, 1000);
  //     yield put({ type: ADD_COMMENT });
  //   },
  // },
};

// action creators
export const initComments = (comments) => {
  return { type: `comments/${INIT_COMMENTS}`, payload: comments };
};

export const addComment = (comment) => {
  return { type: `comments/${ADD_COMMENT}`, payload: comment };
};

export const deleteComment = (commentIndex) => {
  return { type: `comments/${DELETE_COMMENT}`, payload: commentIndex };
};
