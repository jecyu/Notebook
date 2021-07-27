const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, "public")));

app.listen(port, () => {
  console.log(`Example app listening at http://login.codeshop.com:${port}`);
});
