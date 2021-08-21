const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length / 2; i++) { // 除以 2，主要是 node 的某些线程会使用到一些 cpu 资源，不会占用这些线程
    cluster.fork();
  }
} else {
  require("./app"); // 子进程
}
