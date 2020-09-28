/**
 * Module dependencies
 */
const fs = require("fs");
const stdin = process.stdin;
const stdout = process.stdout;
fs.readdir(process.cwd(), function(err, files) {
  console.log("");

  if (!files.length) {
    return console.log("   \033[31m No files to show!\033[39m\n");
  }

  console.log("  Select which file or directory you want to see\n");

  let stats = [];
  function file(i) {
    const filename = files[i];
    fs.stat(__dirname + "/" + filename, function(err, stat) {
      stats[i] = stat;
      if (stat.isDirectory()) {
        // console.log(stat)
        console.log("       " + i + "    \033[36m" + filename + "/\033[39m");
      } else {
        console.log("       " + i + "    \033[90m" + filename + "\033[39m");
      }

      i++;
      if (i === files.length) {
        console.log("");
        read();
      } else {
        file(i);
      }
    });
  }
  file(0);
  /**
   * read user input when files are shown
   */
  function read() {
    stdout.write("     \033[33mEnter your choice: \033[39m");
    stdin.resume();
    stdin.setEncoding("utf-8");
    stdin.on("data", option);
  }

  /**
   * called with the option supplied by the user
   */
  function option(data) {
    var filename = files[Number(data)];
    if (!files[Number(data)]) {
      stdout.write("     \033[33mEnter your choice: \033[39m");
    } else {
      stdin.pause();
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + "/" + filename, function(err, files) {
          console.log("");
          console.log("  (" + files.length + " files");
          files.forEach(function(file) {
            console.log("    -      " + file);
          });
        });
        console.log("");
      } else {
        fs.readFile(__dirname + "/" + filename, "utf8", function(err, data) {
          console.log("");
          console.log(
            "\033[90m" + data.replace(/(.*)/g, "     $1") + "\033]39m"
          );
        });
      }
    }
  }
});
