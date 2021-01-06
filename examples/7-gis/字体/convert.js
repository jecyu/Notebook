/*
 * @Author: Jecyu
 * @Date: 2021-01-05 17:13:22
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-01-05 18:51:19
 * @FilePath: /examples/7-gis/字体/convert.js
 * @Description:
 */
const fontnik = require("fontnik");
const fs = require("fs");
const path = require("path");

const convert = function(fileName, outputDir) {
  const font = fs.readFileSync(path.resolve(__dirname + "/", fileName));
  output2pbf(font, 0, 255, outputDir);
};

function output2pbf(font, start, end, outputDir) {
  if (start > 65535) {
    console.log("done!");
    return;
  }
  fontnik.range({ font, start, end }, (err, res) => {
    if (err) {
      console.error(err);
    }
    const outputFilePath = path.resolve(
      `${__dirname}/${outputDir}/${start}-${end}.pbf`
    );
    fs.writeFile(outputFilePath, res, function(err) {
      if (err) {
        console.error(err);
      } else {
        output2pbf(font, end + 1, end + 1 + 255, outputDir);
      }
    });
  });
}

// convert(
//   "./fonts/microsoft-yahei-regular.ttf",
//   "./fonts/pbf/microsoft-yahei-regular"
// );
convert("./fonts/microsoft-yahei-bold.ttf", "./fonts/pbf/microsoft-yahei-bold");
