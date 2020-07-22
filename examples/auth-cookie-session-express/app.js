/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-07-20 22:42:14
 * @LastEditTime: 2020-07-20 23:34:44
 * @LastEditors: Jecyu
 */

const express = require("express");
const app = express();
const session = require("express-session");

// use middleware
app.use(
  session({
    secret: "keyborad cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000, secure: false },
  })
);

app.use("/login", (req, res) => {
  // set session
  req.session.userinfo = "Jecyu";
  res.send("login success!");
})

app.use("/", (req, res) => {
  if (req.session.userinfo) {
    res.send(`hello ${req.session.userinfo}, welcome`);
  } else {
    res.send("login fail!");
  }
})

module.exports = app;
