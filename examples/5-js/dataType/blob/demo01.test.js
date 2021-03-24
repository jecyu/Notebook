/*
 * @Author: naluduo233
 * @Date: 2021-03-20 17:17:36
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-20 17:39:04
 * @FilePath: /examples/3-js/dataType/blob/demo01.test.js
 * @Description: var aBlob = new Blob(blobParts, options);
 */
describe("Blob 使用规范", () => {
  it("从字符串创建 Blob", () => {
    let myBlobParts = ["<html><h2>Hello Semlinker</h2></html>"]; // an array consisting of a single DOMString
    let myBlob = new Blob(myBlobParts, {
      type: "text/html",
      endings: "transparent",
    });

    expect(myBlob.size).toBe(37);
    expect(myBlob.type).toBe("text/html");
  });

  it("从类型化数组和字符串创建 Blob", () => {
    let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 “hello”
    let blob = new Blob([hello, " ", "semlinker"], { type: "text/plain" });
    console.log('blob ->', blob);
  });

  it("slice 方法测试 Blob", () => {
    // File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的上下文中
    let file = new File("a".repeat[10000], "test.txt");
    const chunkSize = 1000;
    function  chunkedUpload() {
      for (let start = 0; start < file.size; start += chunkSize) {
        const chunk = file.slice(start, start += chunkSize);
        const fd = new FormData();
        fd.append("data", chunk);
      }
    }
    chunkedUpload();
  });
});
