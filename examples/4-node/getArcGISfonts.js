const baseUrl = "https://static.arcgis.com/fonts/arial-unicode-ms-regular/";
const baseUrl2 = "https://static.arcgis.com/fonts/microsoft-yahei-regular/";
const baseUrl3 = "https://static.arcgis.com/fonts/microsoft-yahei-bold/";

const outputPath = "../public";
const https = require("https");
const fs = require("fs");

function downLoadFonts() {
  for (let i = 0; i <= 256; i++) {
    let fileName = `${i * 256}-${((i + 1) * 256 - 1)}.pbf`;
    let url = baseUrl3 + fileName;
    https
      .request(url, (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          if (res.statusCode === 200) {
            writeFile(fileName, body);
          }
        });
      })
      .end();
  }
}

function writeFile(fileName, data) {
  fs.writeFile(fileName, data, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log("数据写入成功！");
  });
}

downLoadFonts();
