const http = require("http");
const server = http.createServer((req, res) => {
  // res.writeHead(200, 
  //   {'Access-Control-Allow-Origin': '*'}
  //   );
  res.setHeader('Content-Type','application/json')
  res.setHeader('Access-Control-Allow-Origin','*')
    const obj = {
      name: "jecyu"
    }
  setTimeout(() => {
    debugger;
    res.end(JSON.stringify(obj));
  }, 100000)
});

server.listen(8000, () => {
  console.log("listening on port 8000");
})