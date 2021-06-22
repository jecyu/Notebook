const fs = require("fs");

fs.stat("./5-1.js", (err, stats) => {
  console.log("stats ->", stats);
});
