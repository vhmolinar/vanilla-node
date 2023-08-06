const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const { pathname: path } = parsedUrl;

  // capture HTTP method from request
  const { method: httpMethod } = req;

  res.end(`Request received at ${path} with method ${httpMethod}`);
});

const port = process.env.PORT ?? 3000;
server.listen(port, () => console.log(`Server is listening on ${port}!`));