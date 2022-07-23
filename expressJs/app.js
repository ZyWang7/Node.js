const http = require('http');

const express = require('express');

// create an express application -> valid request handler
const app = express();

const server = http.createServer(app);

server.listen(3000);
