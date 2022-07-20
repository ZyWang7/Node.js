// import file/module in node.js
const http = require('http');

/*
function rqListener(req, res) {

};
// look for function rqListener and execute it for every incoming request
http.createServer(rqListener);
*/


const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    // peocess.exit();

    
});     // return a http.server

// not immediately exit script, but keep running to listen for requests
server.listen(3000);
