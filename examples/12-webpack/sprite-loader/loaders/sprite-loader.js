const Spritesmith = require("spritesmith");
const fs = require("fs");
const path = require("path");

module.exports = function(source) {
  const callback = this.async();
  const imgs = source.match(/url\((\S*)?__sprite/g); // 获取图片 url
  const matchedImgs = [];

  console.log(imgs);

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i].match(/url\((\S*)\?__sprite/)[1]; // 获取路径
    matchedImgs.push(path.join(__dirname, img));
  }

  console.log(matchedImgs);
  Spritesmith.run(  // 合并图片
    {
      src: matchedImgs,
    },
    (err, result) => {
      fs.writeFileSync(path.join(process.cwd(), "dist/sprite.jpg"), result.image); // 输出图片，生产环境使用 this.emit
      source = source.replace(/url\((\S*)\?__sprite/g, (match) => { // 替换路径
        return `url("dist/sprite.jpg"`;
      });
      fs.writeFileSync(path.join(process.cwd(), "dist/index.css"), source); // 生产环境使用 this.emit
      callback(null, source);
    }
  );
};
