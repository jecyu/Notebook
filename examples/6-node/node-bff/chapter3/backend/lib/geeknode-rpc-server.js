const RPC = require("./rpc-server");

/**
 * 因为所有服务用的包头格式都一样，不一样的只有 protobuf 协议，所以这里可以将这段逻辑封装成一个模块
 * 日常做项目的时候一定要注意把重复代码做封装
 */
module.exports = function(protobufRequestSchema, protobufResponseSchema) {
  // 导出实例化 rpc 服务器类
  return new RPC({
    // 解码请求包
    decodeRequest(buffer) {
      const seq = buffer.readUInt32BE();

      return {
        seq,
        result: protobufRequestSchema.decode(buffer.slice(8)),
      };
    },
    // 判断请求是不是接收完成
    isCompleteRequest(buffer) {
      const bodyLength = buffer.readUInt32BE(4); // 内容体，偏移 4 个字节，读取 client 记录的，读取 4个字节 32 位，获得客户端写在 head 的 body 长度

      return 8 + bodyLength; // 8 个字节为约定的 head 头长度
    },
    // 编码返回包
    encodeResponse(data, seq) {
      const body = protobufResponseSchema.encode(data);

      const head = Buffer.alloc(8);
      head.writeInt32BE(seq);
      head.writeInt32BE(body.length, 4); // 4 为偏移的长度，写入 body 的长度

      return Buffer.concat([head, body]);
    },
  });
};
