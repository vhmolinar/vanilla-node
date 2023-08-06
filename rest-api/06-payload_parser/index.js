const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const { pathname: path } = parsedUrl;
  const { query } = parsedUrl;
  const { method: httpMethod, headers } = req;

  // create utf 8 decoder
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  // start stream listener in order to grab payload
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    res.end('Ok');

    console.log('Request received at',path);
    console.log('\tMethod', httpMethod);
    console.log('\tQuery Params', {...query});
    console.log('\tHeaders', {...headers});
    console.log('\tPayload', buffer);
  });

});

const port = process.env.PORT ?? 3000;
server.listen(port, () => console.log(`Server is listening on ${port}!`));