// import file/module in node.js
const http = require('http');
// custom file
const routes = require('./routes');

/*
function rqListener(req, res) {

};
// look for function rqListener and execute it for every incoming request
http.createServer(rqListener);
*/

// const server = http.createServer(routes);
const server = http.createServer(routes.handler);
console.log(routes.someText);

// not immediately exit script, but keep running to listen for requests
server.listen(3000);
