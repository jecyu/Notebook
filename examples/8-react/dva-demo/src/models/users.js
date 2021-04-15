/*
 * @Author: naluduo233
 * @Date: 2021-04-14 14:01:07
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-15 13:49:42
 * @FilePath: /dva-demo/src/models/users.js
 * @Description:
 */

import { hashHistory } from "dva/router";
// import { create, remove, update, query } from "../services/users";

// 处理异步请求
import { query } from "../services/users";

export default {
  namespace: "users",
  state: {
    list: [],
    total: null,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    modalVisible: false, // 弹出窗的显示状态
    modalType: "create" // 弹出
  },

  // 订阅路由改变
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/users") {
          dispatch({
            type: "query",
            payload: {}
          });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { select, call, put }) {
      yield put({ type: "showLoading" });
      const { data } = yield call(query);
      if (data) {
        yield put({
          type: "querySuccess",
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *create() {},
    *delete() {},
    *update() {}
  },
  reducers: {
    showLoading(state, action) {
      return {
        ...state,
        loading: true
      };
    }, // 控制加载状态的 reducer
    showModal() {}, // 控制 Modal 显示状态的 reducer
    hideModal() {},
    querySuccess(state, action) {
      // const mock = {
      //   total: 3,
      //   current: 1,
      //   loading: false,
      //   list: [
      //     {
      //       name: "张三",
      //       age: 23,
      //       address: "成都"
      //     },
      //     {
      //       name: "李四",
      //       age: 24,
      //       address: "杭州"
      //     },
      //     {
      //       name: "王五",
      //       age: 25,
      //       address: "上海"
      //     }
      //   ]
      // };
      return { ...state, ...action.payload, loading: false };
    },

    createSuccess() {},
    deleteSuccess() {},
    updateSuccess() {}
  }
};
