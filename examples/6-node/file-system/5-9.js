// const CVS = require("csv");

// const generator = CVS.generate({ seed: 1, columns: 2, length: 20 });
// const parser = CVS.parse();
// const transformer = CVS.transform(function(data) {
//   return data.map(function(value) {
//     return value.toUpperCase();
//   });
// });
// const stringifier = csv.stringify();

// generator.on("readable", function() {
//   while ((data = generator.read())) {
//     parser.write(data);
//   }
// });

// // 解析生成的 CSV 文件
// parser.on("readable", function() {
//   while ((data = transformer.read())) {
//     stringifier.write(data);
//   }
// });

// stringifier.on("readable", function() {
//   while ((data = stringifier.read())) {
//     process.stdout.write(data);
//   }
// });

// Import the package main module
const csv = require('csv')
// Use the module
csv
// Generate 20 records
.generate({
  delimiter: '|',
  length: 20
})
// Parse the records
.pipe(csv.parse({
  delimiter: '|'
}))
// Transform each value into uppercase
.pipe(csv.transform(function(record){
   return record.map(function(value){
     return value.toUpperCase()
   });
}))
// Convert the object into a stream
.pipe(csv.stringify({
  quoted: true
}))
// Print the CSV stream to stdout
.pipe(process.stdout)