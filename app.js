// import file/module in node.js
const http = require('http');

/*
function rqListener(req, res) {

};
// look for function rqListener and execute it for every incoming request
http.createServer(rqListener);
*/


const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    // peocess.exit();

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');    // write data to response
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>Hello from my Node.js Server!</body>');
    res.write('</html>');
    res.end();
    // res.write();     //-> will cause an error
});     // return a http.server

// not immediately exit script, but keep running to listen for requests
server.listen(3000);
