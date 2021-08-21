const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length / 2; i++) {
    // 除以 2，主要是 node 的某些线程会使用到一些 cpu 资源，不会占用这些线程
    cluster.fork();

    // cluster.on('exit' , () => {
    //   cluster.fork()
    // })
  }
} else {
  require("./app"); // 子进程
  process.on("uncaughtException", (err) => { // 1. 对错误进行监控
    console.error(err); // 上报
    // 退出，避免服务不正常使用风险
    process.exit(1);
  });
}
