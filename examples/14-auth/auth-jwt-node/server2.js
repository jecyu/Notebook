/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-07-26 16:57:06
 * @LastEditTime: 2020-07-27 22:42:22
 * @LastEditors: Jecyu
 */

require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const jwt = require("jsonwebtoken");

const posts = [
  {
    username: "Jecyu",
    title: "Post 1",
  },
  {
    username: "Linjy",
    title: "Post 2",
  },
];
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// app.post("/login", (req, res) => {
//   // assume the user has been authenticated by password and username

//   const username = req.body.username;
//   const user = { name: username };

//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); // include user information inside of it
//   res.json({ accessToken });
// });

// verify the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // token is no longer valid
    if (err) return res.sendStatus(403);
    req.user = user; // get userId for suspended request
    next();
  });
}

app.listen(4000);
