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
