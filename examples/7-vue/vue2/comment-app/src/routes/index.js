/*
 * @Author: naluduo233
 * @Date: 2021-04-16 14:00:07
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-16 14:20:27
 * @FilePath: /comment-app/src/routes/index.js
 * @Description:
 */
import CommentApp from "@/views/comment/comment-app.vue";
const routes = [
  {
    path: "/comments",
    name: "comments",
    component: CommentApp,
  },
];
export default routes;
