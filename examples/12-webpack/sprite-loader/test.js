const Spritesmith = require("spritesmith");
const fs = require("fs");
const path = require("path");

const sprites = ["./loaders/images/1.jpeg", "./loaders/images/2.png"];

Spritesmith.run(
  {
    src: sprites,
  },
  (err, result) => {
    console.log(result.image); // Buffer representation of image
    console.log(result.coordinates); // Object mapping filename to {}
    console.log(result.properties); // Object with metadata
    fs.writeFileSync(path.join(__dirname, "dist/sprite.jpg"), result.image);
  }
);
