/*
 * @Author: naluduo233
 * @Date: 2021-04-13 14:09:41
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-13 14:22:14
 * @FilePath: /Notebook/examples/8-react/comment-app/src/router.js
 * @Description:
 */
import React from "react";
import { Router, Route, Switch } from "dva/router";
import CommentApp from "./routes/CommentApp";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CommentApp}></Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
