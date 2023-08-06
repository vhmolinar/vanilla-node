// require built-in module
const http = require('http');

// create server
const server = http.createServer((req, res) => {
  console.log('Request received!');
  res.end('Ok');
})

// start server
const port = process.env.PORT ?? 3000;
server.listen(port, () => console.log(`Server is listening on ${port}!`));