const EasySock = require("easy_sock");

const protobuf = require("protocol-buffers");
const fs = require("fs");
const schemas = protobuf(fs.readFileSync(`${__dirname}/../schema/comment.proto`));

const easySock = new EasySock({
  ip: "127.0.0.1",
  port: 4001,
  timeout: 500,
  keepAlive: true, // 全双工通信
});

// 将需要发送的数据按协议进行二进制编码
easySock.encode = function(data, seq) {
  const body = schemas.CommentListRequest.encode(data); // 序列化数据

  // 协商
  const head = Buffer.alloc(8); // 前后端约定 head 的长度
  head.writeInt32BE(seq);
  head.writeInt32BE(body.length, 4); // 记录 seq 和 body 的长度，body 长度不固定

  return Buffer.concat([head, body]); // 发送 head 和 body
};

// 将接收到的包进行解码，转换成js可操作的格式
easySock.decode = function(buffer) {
  const seq = buffer.readInt32BE();
  const body = schemas.CommentListResponse.decode(buffer.slice(8));
  
  return {
    result: body,
    seq,
  };
};

easySock.isReceiveComplete = function(buffer) { // 判断当前数据包是否完整
  if (buffer.length < 8) { // 没有 body
      return 0
  }
  const bodyLength = buffer.readInt32BE(4); // 读取 body 的长度

  if (buffer.length >= bodyLength + 8) {
      return bodyLength + 8 // 返回当前 body + head 的长度，也就是一个数据包

  } else {
      return 0
  }
}

module.exports = easySock;
