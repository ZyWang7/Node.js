const fs = require('fs');

requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>'); 
        res.write('<head><title>My First Assignment</title></head>');
        res.write('<h1>Welcome to my first assignment</h1>');
        res.write('<body><form action = "/create-user" method = "POST">' +
                  '<input type = "text" name = "username">' +
                  '<button type = "submit">Create</button>' +
                  '</form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/user') {
        // read the username from the file
        fs.readFile('username.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            // console.log(data.toString());

            username = data.toString();
            splitdata = username.split('\n');
            var outputStr = '<ul>';
            for (user in splitdata) {
                outputStr = outputStr + '<li>' + splitdata[user] + '</li>';
            }
            outputStr += '</ul>';
            
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>'); 
            res.write('<head><title>User List</title></head>');
            res.write('<h1>User List</h1>');
            res.write('<body>' + outputStr + '</body>');
            res.write('</html>');
            return res.end();
        });
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];        // array of buffer chunks
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log('Welcome! ' + message);

            fs.appendFile('username.txt', ('\n' + message), err =>{
                if (err) throw err;
                // console.log('Saved!');
            });

            // res.setHeader('Location', '/');
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');    // write data to response
            res.write('<head><title>Create User</title></head>');
            res.write('<body>Hello! ' + message + '</body>');
            res.write('</html>');
            return res.end();
            
        });
    }
    // send a HTML response with some "Page not found text"
};

module.exports = requestHandler;
