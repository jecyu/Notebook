/*
 * @Author: Jecyu
 * @Date: 2021-03-05 14:33:08
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-05 15:04:03
 * @FilePath: /examples/4-vue/vue2Cli/src/store/index.js
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); // 使用插件

const store = new Vuex.Store({ // 响应式化处理
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});


export default store;
