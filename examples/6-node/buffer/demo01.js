// Buffer.from
// const b1 = Buffer.from('10');
// const b2 = Buffer.from('10', 'utf8');
// const b3 = Buffer.from([10]);
// const b4 = Buffer.from(b3);

// console.log(b1, b2, b3, b4); // <Buffer 31 30> <Buffer 31 30> <Buffer 0a> <Buffer 0a>

// Buffer.alloc

// const bAlloc1 = Buffer.alloc(10);
// const bAlloc2 = Buffer.alloc(10, 1);
// console.log(bAlloc1);
// console.log(bAlloc2);

// const buffer = Buffer.from("你好");
// console.log(buffer);
// // <Buffer e4 bd a0 e5 a5 bd>
// const str = buffer.toString();
// console.log(str);
// // 你好

// 如果编码与解码不是相同的格式则会出现乱码的情况，如下
const buffer = Buffer.from("你好", "utf-8");
console.log(buffer);

const str = buffer.toString("ascii");
console.log(str);
