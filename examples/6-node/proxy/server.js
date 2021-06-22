const http = require("http");
const app = http.createServer(function(request, response) {
  console.log("request received");
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });
  response.write("I'm service A");
  response.end();
});
app.listen(8000, () => {
  console.log("service started");
});
