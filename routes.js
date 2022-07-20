const fs = require('fs');


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
    // listen to certain events
    req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
    });
    return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        // console.log(parsedBody);
        const message = parsedBody.split('=')[1];
        // create a new file to store the user's message
        // writeFileSync -> block execution until the file is created
        // fs.writeFileSync('message.txt', message);
        fs.writeFile('message.txt', message, err => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    });
    /*  
    // redirecting
    // fs.writeHead(302, {});     // write meta information
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
    // send response != event listener were dead
    // -> will execute even the response is already gone
    */
}

res.setHeader('Content-Type', 'text/html');
res.write('<html>');    // write data to response
res.write('<head><title>My First Page</title></head>');
res.write('<body>Hello from my Node.js Server!</body>');
res.write('</html>');
res.end();
// res.write();     //-> will cause an error