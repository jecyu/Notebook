// 客户端

const query = require("./index");
query('{ hello }').then((res) => {
  console.log(res);
});
