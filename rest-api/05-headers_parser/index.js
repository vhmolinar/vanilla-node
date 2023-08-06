const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const { pathname: path } = parsedUrl;
  const { query } = parsedUrl;
  // capture headers from request
  const { method: httpMethod, headers } = req;

  console.log('Request received at',path);
  console.log('\tMethod', httpMethod);
  console.log('\tQuery Params', {...query});
  console.log('\tHeaders', {...headers});
  res.end('Ok');
});

const port = process.env.PORT ?? 3000;
server.listen(port, () => console.log(`Server is listening on ${port}!`));