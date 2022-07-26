// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

// create an express application -> valid request handler
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/*
app.use('/', (req, res, next) => {      // every route starts with a '/'
    // console.log('This always runs!');
    next();
});
*/


// register some middleware
app.use(bodyParser.urlencoded({extended: false}));

// order does matter!
app.use('/admin', adminRoutes);

app.use(shopRoutes);

// handle 404 not found page
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);



/*
// add a middleware function
// accepts an array of request handlers
//                 next: a function that will be passed to 
// this [(req, res, next) => {} ]function by express.js
app.use((req, res, next) => {
    console.log('In the middleware!');
    next();         // allows the request to go to the next middleware in line
});      // () => {}: will be executed for every incoming request
*/
