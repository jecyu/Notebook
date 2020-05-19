/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-17 15:52:12
 * @LastEditTime: 2020-05-17 16:00:03
 * @LastEditors: Jecyu
 */ 
let buffer = new ArrayBuffer(8); // 开启一个8个字节长度的 buffer
let int8Array = new Int8Array(buffer); // 使用 int8Array 操作 buffer
int8Array[0] = 30; // 写入 buffer
int8Array[1] = 41;
const buffer1 = int8Array[0]; // 读取 buffer
console.log('buffer', buffer);
console.log('int8Array', int8Array);
