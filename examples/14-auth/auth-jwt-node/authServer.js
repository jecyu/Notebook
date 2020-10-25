/*
 * @Description:
 * login/logout
 * refreshToken(when the normal token is expired)
 * @Author: Jecyu
 * @Date: 2020-07-26 16:57:06
 * @LastEditTime: 2020-07-28 23:23:50
 * @LastEditors: Jecyu
 */

require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const jwt = require("jsonwebtoken");

// const posts = [
//   {
//     username: "Jecyu",
//     title: "Post 1",
//   },
//   {
//     username: "Linjy",
//     title: "Post 2",
//   },
// ];
// app.get("/posts", authenticateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.name));
// });
let refreshTokens = []; // Temp Storage

app.post("/login", (req, res) => {
  // assume the user has been authenticated by password and username

  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user); // include user information inside of it
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET); // expire by logout rather than time
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token) // delete the target refreshToken to prevent forever request refresh
  res.sendStatus(204);
})

// verify the token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     // token is no longer valid
//     if (err) return res.sendStatus(403);
//     req.user = user; // get userId for suspended request
//     next();
//   });
// }

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

app.listen(5000);
