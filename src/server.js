import http from "node:http";

const server = http.createServer((req, res) => {
  console.log("teste");
  return res.end("hello world");
});

server.listen(4000);
console.log("teste1");
