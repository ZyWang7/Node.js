const http = require('http');

const express = require('express');

// create an express application -> valid request handler
const app = express();

// add a middleware function
// accepts an array of request handlers
//                 next: a function that will be passed to 
// this [(req, res, next) => {} ]function by express.js
app.use((req, res, next) => {
    console.log('In the middleware!');
    next();         // allows the request to go to the next middleware in line
});      // () => {}: will be executed for every incoming request

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from express</h1>');    // sending a response
});

const server = http.createServer(app);

server.listen(3000);
