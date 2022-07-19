// import file/module in node.js
const http = require('http');

/*
function rqListener(req, res) {

};
// look for function rqListener and execute it for every incoming request
http.createServer(rqListener);
*/

http.createServer((req, res) => {
    console.log(req);
});
