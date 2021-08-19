const fs = require("fs");
const protobuf = require("protocol-buffers");
const schemas = protobuf(fs.readFileSync(`${__dirname}/../2.detail/detail.proto`));

// 假数据
const columnData = require("./mockdata/column");

// 服务端的编解包逻辑
const server = require("./lib/geeknode-rpc-server.js")(
  schemas.ColumnRequest,
  schemas.ColumnResponse
);

server
  .createServer((request, response) => {
    // 因为都是假数据，这里就没有使用栏目 id。真实项目会拿这个 columnid 去请求数据库
    const columnid = request.body;

    // 直接返回假数据
    response.end({
      column: columnData[0],
      recommendColumns: [columnData[1], columnData[2]],
    });
  })
  .listen(4000, () => { // rpc 端口
    console.log("rpc server listened: 4000");
  });
