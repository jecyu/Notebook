const fs = require("fs");
const protobuf = require("protocol-buffers");
const schemas = protobuf(
  fs.readFileSync(`${__dirname}/../3.play/schema/comment.proto`)
);

// 假数据
const commentData = require("./mockdata/comment");

// 服务端的编解包逻辑
const server = require("./lib/geeknode-rpc-server.js")(
  schemas.CommentListRequest,
  schemas.CommentListResponse
);

server
  .createServer((request, response) => {
    // 直接返回假数据
    response.end({ comments: commentData });
  })
  .listen(4001, () => {
    // rpc 端口
    console.log("rpc server listened: 4001");
  });
