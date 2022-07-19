// import file/module in node.js
const http = require('http');
const fs = require('fs');

/*
function rqListener(req, res) {

};
// look for function rqListener and execute it for every incoming request
http.createServer(rqListener);
*/


const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    // peocess.exit();

    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>'); 
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action = "/message" method = "POST">' +
                  '<input type = "text" name = "message">' +
                  '<button type = "submit">Send</button>' +
                  '</form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        // get the user's message
        const body = [];
        req.on('data', (chunk) => {
            console.log(body);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            // create a new file to store the user's message
            fs.writeFileSync('message.txt', message);
        });
        
        // redirecting
        // fs.writeHead(302, {});     // write meta information
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

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
