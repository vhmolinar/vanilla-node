const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const { pathname: path } = parsedUrl;
  const { method: httpMethod } = req;

  // capture query params from parsed url
  const { query } = parsedUrl;

  console.log(`Request received at ${path} with method ${httpMethod} and params`, {...query})
  res.end('Ok');
});

const port = process.env.PORT ?? 3000;
server.listen(port, () => console.log(`Server is listening on ${port}!`));