#! /usr/bin/env node
// console.log("Hello, Jecyu!");

const fs = require("fs");
const path = require("path");

// 复制文件
function copyTemplate(from, to) {
  from = path.join(__dirname, "templates", from);
  console.log(from);
  write(to, fs.readFileSync(from, "utf-8"));
}

function write(path, str, mode) {
  fs.writeFileSync(path, str);
}

// 新建目录
function mkdir(path, fn) {
  fs.mkdir(path, function(err) {
    fn && fn();
  });
}

/**
 * 复制文件夹
 * 遍历整个文件夹，对遍历到的 path 进行判断，如果是文件则直接拷贝，如果是文件夹则递归；
 * @param src 源文件路径
 * @param dst 目标文件路径
 */
const copy = function(src, dst) {
  let paths = fs.readdirSync(src); // 同步读取当前目录（只能读取绝对路径，相对路径无法获取）
  console.log(paths);
  paths.forEach(function(path) {
    const _src = src + "/" + path;
    const _dst = dst + "/" + path;
    fs.stat(_src, function(err, stat) {
      // stat 包含文件属  性
      if (err) throw error;
      if (stat.isFile()) {
        // 如果是文件则拷贝
        let readable = fs.createReadStream(_src); // 创建读取流
        let writable = fs.createWriteStream(_dst); // 创建写入流
        readable.pipe(writable);
      } else if (stat.isDirectory()) {
        // 是目录则递归
        checkDirectory(_src, _dst, copy);
      }
    });
  });
};

const checkDirectory = function(src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  });
};

// 1. 复制文件
// const PATH = ".";
// mkdir(PATH + "/public", function() {
//   mkdir(PATH + "/public/js", function() {
//     copyTemplate("js/vue.min.js", PATH + "/public/js/vue.min.js");
//   });
// });

// 2. 复制文件夹
// const PATH = ".";
// mkdir(PATH + "/public", function() {
//   mkdir(PATH + "/public/js", function() {
//     checkDirectory("/Users/linjy/Documents/Developer/Frontend/Notebook/examples/node/cli/exercise-cli/templates/js", PATH + "/public/js", copy);
//   });
// });


// console.log(process.argv)
// 3. 接收命令行参数
// const config = {};
// process.argv.slice(2).forEach(item => {
//   if (item == '-l') {
//     config.layer = true;
//   }
// })
// const PATH = ".";
// mkdir(PATH + "/public", function() {
//   mkdir(PATH + "/public/js", function() {
//     checkDirectory("/Users/linjy/Documents/Developer/Frontend/Notebook/examples/node/cli/exercise-cli/templates/js", PATH + "/public/js", copy);
//     if (config.layer) {
//       checkDirectory("/Users/linjy/Documents/Developer/Frontend/Notebook/examples/node/cli/exercise-cli/templates/layerJS", PATH + "/public/js", copy);
//       // 此处注意 layerJS 存放在 templates 中的路径
//     }
//   });
// });

// commander
const program = require("commander"); // 全局寻找
program
  .version("1.0.0", "-v, --version")
  .command("check [checkname]")
  .alias("c")
  .description("yo yo check now")
  .option("-a, --name [moduleName]", "模块名称")
  .action((checkname, option) => {
    console.log("指令 install 后面跟的参数值 checkname" + checkname);
    console.log(option);
    // 获得了参数，可以在这里做响应的业务处理
  })
  .on("--help", function() {
    console.log("  下面我随便说两句:");
    console.log("");
    console.log("$ 人有多大胆，母猪多大产，i love xx");
    console.log("$ 广阔天地，大有所为，呱~");
  });
  program.parse(process.argv)
