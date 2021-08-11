const EasySock = require("easy_sock");

const protobuf = require("protocol-buffers");
const fs = require("fs");
const schemas = protobuf(
  fs.readFileSync(`${__dirname}/../schema/comment.proto`)
);

const easySock = new EasySock({
  ip: "127.0.0.1",
  port: 4002,
  timeout: 500,
  keepAlive: true,
});

easySock.encode = function(data, seq) {
  const body = schemas.PraiseRequest.encode(data);

  const head = Buffer.alloc(8);
  head.writeInt32BE(seq);
  head.writeInt32BE(body.length, 4);

  return Buffer.concat([head, body]);
};

easySock.decode = function(buffer) {
  const seq = buffer.readInt32BE();
  const body = schemas.PraiseResponse.decode(buffer.slice(8));

  return {
    result: body,
    seq,
  };
};

easySock.isReceiveComplete = function(buffer) {
  // 判断当前数据包是否完整
  if (buffer.length < 8) {
    //没有 body
    return 0;
  }

  const bodyLength = buffer.readInt32BE(4);
  if (buffer.length >= bodyLength + 8) {
    // 返回当前 body + head 的长度，也就是一个数据包
    return bodyLength + 8;
  } else {
    return 0;
  }
};

module.exports = easySock;
