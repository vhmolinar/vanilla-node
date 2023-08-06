const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // retrieve and parse request url
  const parsedUrl = url.parse(req.url, true);

  // retrieve path name
  const { pathname: path } = parsedUrl;

  // gather resources
  const resources = path.split('/').filter((r) => r.length > 0);

  console.log('Path', path);
  console.log('Resources', resources);

  res.end(`Request received at ${path}`);
});

const port = process.env.PORT ?? 3000;
server.listen(port, () => console.log(`Server is listening on ${port}!`));