const net = require("net");

const socket = new net.Socket({});

socket.connect({
  // 连接到 TCP 服务器上
  host: "127.0.0.1",
  port: 4000,
});

const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582",
];

let index = Math.floor(Math.random() * LESSON_IDS.length);

socket.on("data", (buffer) => {
  // 处理包
  // 取出 seqBuffer
  const seqBuffer = buffer.slice(0, 2);
  const titleBUffer = buffer.slice(2);

  // 发包
  index = Math.floor(Math.random() * LESSON_IDS.length);

  console.log(seqBuffer.readInt16BE(), titleBUffer.toString());
  socket.write(encode(index)); // 写入
});

let seq = 0; // 添加序号
/**
 * 二进制包编码函数
 * 在一段rpc调用里，客户端需要经常编码rpc调用时，业务数据的请求包
 */
function encode(index) {
  // 正常情况下，这里应该是使用 protobuf 来 encode一段代表业务数据的数据包
  // 为了不要混淆重点，这个例子比较简单，就直接把课程id转buffer发送

  // 一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
  // 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信
  buffer = Buffer.alloc(6);
  buffer.writeInt16BE(seq); // 前 2 位写序号
  buffer.writeInt32BE(LESSON_IDS[index], 2);

  console.log(seq, LESSON_IDS[index]);
  seq++;
  return buffer;
}

// 每 50 秒发送一次，全双工
// setInterval(function() {
//   index = Math.floor(Math.random() * LESSON_IDS.length);
//   socket.write(encode(index));
// }, 50);

for (let k = 0; k < 100; k++) {
  index = Math.floor(Math.random() * LESSON_IDS.length);
  socket.write(encode(index));
}

// socket.write(encode(index));
