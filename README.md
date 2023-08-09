# Vanilla NodeJS
Practice nodejs without relying on any package **(no NPM)**. Using pure vanilla and built in libraries!

## Node Version
I used v.14 for this project

## Rest API (without Express)
I'm creating a rest api from scratch. Run the following commands to understand the construction

### 1 - Server start
Run and start the server
```shell
node rest-api/01-server_start/
```
Send a simple GET request and watch the server receive it
```shell
curl localhost:3000
```

### 2 - Request URL Parser
Run and start the server with a minimum request URL parser
```shell
node rest-api/02-request_parser/
```
Send a simple GET with a path resource and watch the server parse it
```shell
curl localhost:3000/hi
```
### 3 - Method Parser
Run and start the server with a simple HTTP method parser
```shell
node rest-api/03-method_parser/
```
Send a simple GET and look for the server response with proper HTTP method identification
```shell
curl localhost:3000/hi
```
The same for a POST request
```shell
curl -x POST localhost:3000/send
```
### 4 - Query Params parser
Run and start the server with a simple Query Params parser
```shell
node rest-api/04-query_parser/
```
Send a GET request with a Query Param and watch the server identifying it
```shell
curl localhost:3000?p=10
```
### 5 - Headers parser
Run and start the server with a simple Headers parser
```shell
 node rest-api/05-headers_parser/
```
Send a POST request with application/json header so the server can identify it
```shell
curl -X POST -H 'Content-Type: application/json' localhost:3000
```
### 6 - Body parser
Run and start the server with a streamed body parser
```shell
node rest-api/06-payload_parser/
```

Send a form request `application/x-www-form-urlencoded` and watch the server extracting it
```shell
curl -X POST -F 'name=ok' http://localhost:3000
```

Send a json request `application/json` and watch the server parsing it
```shell
curl -X POST -H 'Content-Type: application/json' -d '{"attr":"value"}' http://localhost:3000
```

### 7 - Router
Run the server with a basic router implementation 
```shell
node rest-api/07-router/
```

Send a GET request to a mapped route and watch the handler being invoked
```shell
curl http://localhost:3000/hello
```

Send a POST request to a mapped route and watch the handler being invoked
```shell
curl -X POST -H 'Content-Type: application/json' -d '{"attr":"value"}' http://localhost:3000/say
```

Send a GET request to a non existing route and watch the Route Not Found handler being invoked
```shell
curl http://localhost:3000/other
```