const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  // 主进程
  for (let i = 0; i < os.cpus().length / 2; i++) {
    const worker = cluster.fork();

    // 除以 2，主要是 node 的某些线程会使用到一些 cpu 资源，不会占用这些线程
    cluster.on("exit", () => {
      // 3.复活子进程
      setTimeout(() => {
        cluster.fork();
      }, 5000);
    });

    let missedPing = 0;
    let inter = setInterval(() => {
      console.log("ping");
      worker.send("ping");
      missedPing++;

      if (missedPing > 3) {
        clearInterval(inter);
        process.kill(worker.process.pid);
      }
    }, 300);

    worker.on("message", (str) => {
      if (str === "pong") {
        missedPing--;
      }
    });
  }
} else {
  require("./app"); // 子进程

  process.on("uncaughtException", (err) => {
    // 1. 对错误进行监控
    console.error(err); // 上报
    // 退出，避免服务不正常使用风险
    process.exit(1);
  });

  // 2. 监控内存
  setInterval(() => {
    if (process.memoryUsage().rss > 734003200) {
      console.oog("oom");
      process.exit(1);
    }
  }, 5000);

  // 3. 心跳
  process.on("message", (str) => {
    if (str === "ping") {
      console.log("pong");
      process.send("pong");
    }
  });
}
