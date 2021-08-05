/**
 * graphql 协议
 */
const { buildSchema } = require("graphql");
const fs = require("fs");

/**
 * 使用 buildSchema 方法，把一个文本格式的 graphql 协议转换成 GraphqlSchema 实例
 * 很像 protocol-buffers 编译 .proto 文件的过程
 */

const schema = buildSchema(
  fs.readFileSync(__dirname + "/schema/comment.gql", "utf-8")
);

/**
 * 一个后台服务（可以理解为微服务）使用一个端口，所以对应前端也需要一个服务一个 rpcclient
 */
const commentClient = require("./rpc-client/comment-client.js"); // 评论
const praiseClient = require("./rpc-client/praise-client.js"); // 点赞

/**
 * 通过 RPC 调用获取数据
 */
schema.getQueryType().getFields().comment.resolve = () => {
  return new Promise((resolve, reject) => {
    commentClient.write(
      {
        columnid: 0,
      },
      function(err, res) {
        console.log('res ->', res);
        err ? reject(err) : resolve(res.comments);
      }
    );
  });
};

schema.getMutationType().getFields().praise.resolve = (arg0, { id }) => {
  return new Promise((resolve, reject) => {});
};

module.exports = schema;
