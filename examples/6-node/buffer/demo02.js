const mybuffer = new Buffer('==ii1j2i3h1i23h', 'base64')
console.log(mybuffer)
require('fs').writeFile('logo.png', mybuffer, function() {
  console.log("数据写入成功！")
});