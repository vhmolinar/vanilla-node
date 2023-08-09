const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const router = require('./router.js');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const { pathname: path } = parsedUrl;
  const { query: queryParams } = parsedUrl;
  const { method, headers } = req;

  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    // add support for json parser on payload
    const body = headers['content-type'] === 'application/json'
      ? JSON.parse(buffer)
      : buffer;
    
    // prepare request object for the handler
    const formattedRequest = {
      path,
      body,
      headers,
      method,
      queryParams
    };

    // prepare response object for the handler
    const formattedResponse = function (res) {
      this.selfStatus = null;
      return {
        status: function (s) {
          this.selfStatus = s;
          res.writeHead(s);
          return this;
        },
        send: function (msg) {
          if (!this.selfStatus) {
            this.status(204);
          }
          res.send(msg);
        },
        json: function (obj)  {
          this.status(200);
          res.end(JSON.stringify(obj));
        }
      }
    }(res);

    // find a route or return default 404
    const route = router.match(method, path);

    // invoke route
    route(formattedRequest, formattedResponse);
  });

});

// declare two handlers
function helloWorld(req, res) {
  console.log('Req', req);
  res.json({'message': 'hello'});
}

function saySomething(req, res) {  
  console.log('Req', req);
  res.json({'return': req.body});
}

// register handlers on router
router.builder()
  .get('/hello', helloWorld)
  .post('/say', saySomething);

const port = process.env.PORT ?? 3000;
server.listen(port, () => console.log(`Server is listening on ${port}!`));