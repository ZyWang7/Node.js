const http = require('http');
const routes = require('./uRoute');

const server = http.createServer(routes);

server.listen(3000);
