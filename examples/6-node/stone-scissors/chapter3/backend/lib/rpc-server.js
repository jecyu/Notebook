const net = require("net");

/**
 * RPC 服务器类，提供编码和解码包，检测包的对外配置
 */
module.exports = class RPC {
  constructor({ encodeResponse, decodeRequest, isCompleteRequest }) {
    this.encodeResponse = encodeResponse;
    this.decodeRequest = decodeRequest;
    this.isCompleteRequest = isCompleteRequest;
  }

  createServer(callback) {
    let buffer = null;

    const tcpServer = net.createServer((socket) => {
      socket.on("data", (data) => {
        buffer = // 有遗留数据才做拼接操作
          buffer && buffer.length > 0 ? Buffer.concat([buffer, data]) : data;
        let checkLength = null;
        
        while (buffer && (checkLength = this.isCompleteRequest(buffer))) {
          let requestBuffer = null;
          if (checkLength === buffer.length) { // 检查的长度刚好为 buffer 长度
            requestBuffer = buffer;
            buffer = null; // 重新置空
          } else {
            requestBuffer = buffer.slice(0, checkLength); // 截取一个请求包的长度
            buffer = buffer.slice(checkLength); // 更新 buffer
          }

          const request = this.decodeRequest(requestBuffer); // 解码请求
          callback( // 执行回调
            {
              // request
              body: request.result,
              socket,
            },
            {
              // response
              end: (data) => {
                const buffer = this.encodeResponse(data, request.seq);
                socket.write(buffer);
              },
            }
          );
        }
      });
    });
    return {
      listen() {
        tcpServer.listen.apply(tcpServer, arguments);
      },
    };
  }
};
